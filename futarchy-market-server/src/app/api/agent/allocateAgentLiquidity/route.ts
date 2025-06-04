// providing liquidity means more USDC in the AMM for YES & NO/USDC
import { NextRequest, NextResponse } from 'next/server';
import { Connection, PublicKey, Transaction, TransactionInstruction, clusterApiUrl } from "@solana/web3.js";
import { db } from '@/lib/db';
import { createTransferInstruction, getAssociatedTokenAddress } from "@solana/spl-token";

export async function POST(req: NextRequest) {
  try {
    const { chatId, proposalId, question, userAllocatedUSDCAmount } = await req.json();

    if (!chatId || !userAllocatedUSDCAmount) {
      return NextResponse.json(
        { success: false, message: "Missing required parameters" },
        { status: 400 }
      );
    }

    const agents = await db.agent.findMany({
      where: {
        chatId: parseInt(chatId)
      }
    });

    if (!agents || agents.length === 0) {
      return NextResponse.json(
        { success: false, message: "No agents found for this chat" },
        { status: 404 }
      );
    }

    const amountPerAgent = Math.floor(userAllocatedUSDCAmount / agents.length);
    
    // Create a new transaction
    const transaction = new Transaction();

    // For each agent, create a transfer instruction
    for (const agent of agents) {
      if (!agent.walletAddress) continue;

      const recipientPubkey = new PublicKey(agent.walletAddress);
      
      // Get the associated token account for the recipient
      const recipientATA = await getAssociatedTokenAddress(
        new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"), // USDC mint
        recipientPubkey // recipient's wallet
      );

      // Create transfer instruction
      const transferIx = createTransferInstruction(
        recipientATA, // from (user's ATA)
        agents[0].walletAddress,
        recipientPubkey, // owner
        amountPerAgent, // amount in base units
        [], // multisig signers (empty array if not multisig)
      );

      transaction.add(transferIx);
    }

    // Serialize the transaction
    const serializedTransaction = transaction.serialize({
      requireAllSignatures: false,
      verifySignatures: false
    });

    // Return transaction for user to sign
    return NextResponse.json(
      { 
        success: true,
        tx: serializedTransaction.toString('base64'),
        amountPerAgent,
        totalAgents: agents.length
      }, 
      { status: 200 }
    );
    
  } catch (error) {
    console.error("Error providing liquidity:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to provide liquidity",
        error: error instanceof Error ? error.message : String(error)
      }, 
      { status: 500 }
    );
  }
}
