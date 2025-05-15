import { NextRequest, NextResponse } from 'next/server';
import {FutarchyRPCClient, AUTOCRAT_VERSIONS} from "@metadaoproject/futarchy-sdk"
import {AnchorProvider, Wallet} from "@coral-xyz/anchor"
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';
import { Connection, Keypair, PublicKey, clusterApiUrl } from "@solana/web3.js"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, content, url, proposalDescription, userId, chatId, baseLiquidity, quoteLiquidity, daoName, daoSlug, daos, mintAddress, socials, userAddress } = body;
    
    // create proposal w title, pMETA and fMETA
    // return all the details + current price of PASS/FAIL to user
    // either return an a TXN IXN OR take the wallet details and sign the txn, in this case the user will create proposal so its signature is needed
    // just return txn ixn
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
    
    await client.proposals.createProposal(
      daoAggregate,
      programVersion.label,
      instructionParams,
      marketParams,
      proposalInputs
    );

    return NextResponse.json(
      { 
        success: true, 
        message: "Proposal created successfully",
      }, 
      { status: 201 }
    );
    
  } catch (error) {
    console.error("Error creating proposal:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to create proposal" 
      }, 
      { status: 500 }
    );
  }
}

