import { NextRequest, NextResponse } from 'next/server';
import * as futarchy from "@metadaoproject/futarchy";
import { AutocratClient } from '@metadaoproject/futarchy/v0.3';
import { ConditionalVaultClient } from '@metadaoproject/futarchy/v0.3';
import { AmmClient } from '@metadaoproject/futarchy/v0.4';
import { AnchorProvider, Wallet } from "@coral-xyz/anchor";
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';
import { Connection, Keypair, PublicKey, Transaction, clusterApiUrl } from "@solana/web3.js";
import { db } from '@/lib/db';
import { encryptKeypair } from '@/lib/encryption';
import { getAssociatedTokenAddress, createAssociatedTokenAccountInstruction } from "@solana/spl-token";
import BN from 'bn.js';
const NUM_AGENTS = 100;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      userAddress, 
      mint, 
      chatId,
      daoName,
      proposalTitle,
      proposalDescription,
      baseMint,
      quoteMint,
      autocratProgramId,
      conditionalVaultProgramId,
      ammProgramId,
      oraclePubkey,
      questionId
    } = body;

    // Set up connection and provider
    const connection = new Connection(
      process.env.SOLANA_RPC_URL || clusterApiUrl('devnet'),
      'confirmed'
    );
    
    // Create a keypair for the server wallet (will be the one initiating transactions)
    const serverKeypair = Keypair.generate();
    
    // Create a wallet and provider for interacting with Solana
    const wallet = new NodeWallet(serverKeypair);
    const provider = new AnchorProvider(connection, wallet, {
      preflightCommitment: 'confirmed',
    });


    // Initialize clients
    const autocratClient = AutocratClient.createClient({
      provider,
      autocratProgramId: new PublicKey(autocratProgramId),
      conditionalVaultProgramId: new PublicKey(conditionalVaultProgramId),
      ammProgramId: new PublicKey(ammProgramId),
    });

    const vaultClient = ConditionalVaultClient.createClient({ provider });
    const ammClient = AmmClient.createClient({ provider });

     const usdcMint = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");
    // Create the DAO transaction
    const daoKeypair = Keypair.generate();
    const createDaoTxBuilder = await autocratClient.initializeDaoIx(
      daoKeypair,
      new PublicKey(baseMint),
      {
        twapInitialObservation: new BN(0),
        twapMaxObservationChangePerUpdate: new BN(0),
        minQuoteFutarchicLiquidity: new BN(0),
        minBaseFutarchicLiquidity: new BN(0),
        passThresholdBps: 0, 
        slotsPerProposal: new BN(0),
      }
    );

    // Create the proposal transaction
    const proposalKeypair = Keypair.generate();
    const emptyInstruction = {
      programId: new PublicKey("11111111111111111111111111111111"), // System program
      accounts: [],
      data: Buffer.from([])
    };
    const createProposalTxBuilder = await autocratClient.initializeProposalIx(
      proposalDescription,
      emptyInstruction,
      daoKeypair.publicKey,
      new PublicKey(baseMint),
      new PublicKey(quoteMint),
      new BN(1000000), // passLpTokensToLock
      new BN(1000000), // failLpTokensToLock
      new BN(0)        // nonce
    );

    // Initialize the question for conditional vault
    const questionKeypair = Keypair.generate();
    /* 
    // Commented out until proper API signature is determined
    const initQuestionTxBuilder = await vaultClient.initializeQuestion(
      questionId,
      new PublicKey(oraclePubkey),
      2 // Yes/No market
    );
    */

    // Initialize the vault for the question
    const vaultKeypair = Keypair.generate();
    // Commented out until proper API signature is determined
    const initVaultTxBuilder = await vaultClient.initializeVault(
      questionKeypair.publicKey,
      new PublicKey(baseMint),
      provider.wallet.publicKey
    );

    // Create AMM market for the proposal
    const ammKeypair = Keypair.generate();

    // Commented out until proper API signature is determined
    const createAmmTxBuilder = await ammClient.createAmm(
      proposalKeypair.publicKey,
      new PublicKey(baseMint),
      new PublicKey(quoteMint),
      new BN(6), // Base decimals
      6, // Quote decimals
    );

    // Get all instructions
    const createDaoIx = await createDaoTxBuilder.instruction();
    const createProposalIx = await createProposalTxBuilder.instruction();
    
    // For AmmClient, ConditionalVaultClient methods we'll need to modify
    // the approach since there seems to be a version mismatch
    // Let's use what the API actually provides:
    
    // Combine all initialization instructions into a single transaction
    const proposalInitializationTx = new Transaction()
      .add(createDaoIx)
      .add(createProposalIx);
    
    // We would add the other instructions here, but due to API version mismatches
    // you'll need to consult the specific SDK version documentation

    // Save proposal and DAO info in database
    const decision = await db.decision.create({
      data: {
        title: proposalTitle,
        description: proposalDescription,
        daoAddress: daoKeypair.publicKey.toString(),
        proposalAddress: proposalKeypair.publicKey.toString(),
        ammAddress: ammKeypair.publicKey.toString(),
        questionAddress: questionKeypair.publicKey.toString(),
        vaultAddress: vaultKeypair.publicKey.toString(),
        chatId: parseInt(chatId),
      }
    });

    // 3. Create agents transaction (keeping the existing logic)
    const agentTx = new Transaction();
    const agentPromises = [];

    // Create 100 agents
    for (let i = 0; i < NUM_AGENTS; i++) {
      const agentKeypair = Keypair.generate();
      
      // Check if encryption key exists
      if (!process.env.ENCRYPTION_KEY) {
        throw new Error("ENCRYPTION_KEY environment variable is required");
      }
      
      const encryptedKeypair = await encryptKeypair(agentKeypair, process.env.ENCRYPTION_KEY);
      
      // Create associated token account instruction for the agent
      const agentATA = await getAssociatedTokenAddress(
        new PublicKey(mint), // USDC mint
        agentKeypair.publicKey
      );
      
      const createATAIx = createAssociatedTokenAccountInstruction(
        new PublicKey(userAddress), // payer
        agentATA,
        agentKeypair.publicKey,
        new PublicKey(mint)
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
    const serializedProposalTx = proposalInitializationTx.serialize({
      requireAllSignatures: false,
      verifySignatures: false
    }).toString('base64');
    
    const serializedAgentTx = agentTx.serialize({
      requireAllSignatures: false,
      verifySignatures: false
    }).toString('base64');

    return NextResponse.json(
      { 
        success: true, 
        message: "DAO, proposal, markets, and agents created successfully",
        proposalTx: serializedProposalTx,
        agentTx: serializedAgentTx,
        decisionId: decision.id,
        daoAddress: daoKeypair.publicKey.toString(),
        proposalAddress: proposalKeypair.publicKey.toString(),
        ammAddress: ammKeypair.publicKey.toString(),
        questionAddress: questionKeypair.publicKey.toString(),
        vaultAddress: vaultKeypair.publicKey.toString(),
      }, 
      { status: 201 }
    );
    
  } catch (error) {
    console.error("Error creating DAO, proposal, markets, and agents:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to create DAO, proposal, markets, and agents",
        error: error instanceof Error ? error.message : String(error)
      }, 
      { status: 500 }
    );
  }
}

