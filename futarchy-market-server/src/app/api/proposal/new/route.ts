import { NextRequest, NextResponse } from 'next/server';
import {FutarchyRPCClient, AUTOCRAT_VERSIONS} from "@metadaoproject/futarchy-sdk"
import {AnchorProvider, Wallet} from "@coral-xyz/anchor"
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';
import { Connection, Keypair, PublicKey, Transaction, clusterApiUrl } from "@solana/web3.js"
import { db } from '@/lib/db';
import { encryptKeypair } from '@/lib/encryption';
import { getAssociatedTokenAddress, createAssociatedTokenAccountInstruction } from "@solana/spl-token";
import { firstValueFrom } from 'rxjs';

const NUM_AGENTS = 100;

interface TransactionUpdate {
  rawTransaction: Uint8Array;
  [key: string]: unknown;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, content, url, proposalDescription, userId, chatId, baseLiquidity, quoteLiquidity, daoName, daoSlug, daos, mintAddress, socials, userAddress } = body;
    
    if (!process.env.ENCRYPTION_KEY) {
      throw new Error("Server configuration error: Missing encryption key");
    }

    // 1. Create proposal transaction
    const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed")
    const wallet = { publicKey: new PublicKey(userAddress) } as Wallet
    const provider = new AnchorProvider(connection, wallet);
    const programVersion = AUTOCRAT_VERSIONS[0];
    const client = FutarchyRPCClient.make(provider, undefined);

    const mint = new PublicKey(mintAddress);

    const instructionParams = {
        type: "memo" as const,
        message: title,
    }; 

    const marketParams = {
        baseLiquidity,
        quoteLiquidity
    }; 

    const proposalInputs = {
      title: title,
      content: content,
      description: proposalDescription,
      url: url,
    }; 

    const daoAggregate = {
      name: daoName,
      slug: daoSlug,
      daos: daos,
      socials: socials,
      joinedAt: new Date()
    };
    
    // Get proposal creation transaction
    const proposalResult = await client.proposals.createProposal(
      daoAggregate,
      programVersion.label,
      instructionParams,
      marketParams,
      proposalInputs
    );

    if (!proposalResult) {
      throw new Error("Failed to create proposal transaction");
    }

    // Get the transaction from the observable
    const proposalUpdate = await firstValueFrom(proposalResult[0]);
    
    if (!proposalUpdate || !('rawTransaction' in proposalUpdate)) {
      throw new Error("Invalid proposal transaction format");
    }

    const typedUpdate = proposalUpdate as TransactionUpdate;

    // 2. Create and store decision in database
    const decision = await db.decision.create({
      data: {
        title: title,
        isResolved: false,
        chatId: parseInt(chatId),
      }
    });

    // 3. Create agents transaction
    const agentTx = new Transaction();
    const agentPromises = [];

    // Create 100 agents
    for (let i = 0; i < NUM_AGENTS; i++) {
      const agentKeypair = Keypair.generate();
      const encryptedKeypair = await encryptKeypair(agentKeypair, process.env.ENCRYPTION_KEY);
      
      // Create associated token account instruction for the agent
      const agentATA = await getAssociatedTokenAddress(
        mint, // USDC mint
        agentKeypair.publicKey
      );
      
      const createATAIx = createAssociatedTokenAccountInstruction(
        new PublicKey(userAddress), // payer
        agentATA,
        agentKeypair.publicKey,
        mint
      );
      
      agentTx.add(createATAIx);

      // Store agent in database
      agentPromises.push(
        db.agent.create({
          data: {
            walletAddress: agentKeypair.publicKey.toString(),
            encryptedKeypair: encryptedKeypair,
            chatId: parseInt(chatId),
            decisions: {
              connect: {
                id: decision.id
              }
            }
          }
        })
      );
    }

    // Wait for all agents to be created in the database
    await Promise.all(agentPromises);

    // Serialize both transactions
    const serializedProposalTx = Buffer.from(typedUpdate.rawTransaction).toString('base64');
    const serializedAgentTx = agentTx.serialize({
      requireAllSignatures: false,
      verifySignatures: false
    }).toString('base64');

    // WE ARE RETURNING BOTH THE PROPOSAL CREATION + 100 AGENT WALLET CREATION TXN, IDEALLY THEY SHOULD BE SIGNED PARALLELY FROM THE CLIENT SIDE, UPON CLICKING ADD LIQUDITY AND CREATE PROPOSAL
    return NextResponse.json(
      { 
        success: true, 
        message: "Proposal and agents created successfully",
        proposalTx: serializedProposalTx,
        agentTx: serializedAgentTx,
        decisionId: decision.id
      }, 
      { status: 201 }
    );
    
  } catch (error) {
    console.error("Error creating proposal and agents:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to create proposal and agents",
        error: error instanceof Error ? error.message : String(error)
      }, 
      { status: 500 }
    );
  }
}

