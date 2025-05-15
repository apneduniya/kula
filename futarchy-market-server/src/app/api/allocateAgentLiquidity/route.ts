// providing liquidity means more USDC in the AMM for YES & NO/USDC
import { NextRequest, NextResponse } from 'next/server';
import { AnchorProvider, BN, Wallet } from "@coral-xyz/anchor";
import { Connection, PublicKey, Transaction, TransactionInstruction, clusterApiUrl } from "@solana/web3.js";
import { AUTOCRAT_VERSIONS, FutarchyRPCClient } from "@metadaoproject/futarchy-sdk";
import { db } from '@/lib/db';
import { createTransferInstruction, getAssociatedTokenAddress, getOrCreateAssociatedTokenAccount } from "@solana/spl-token";

type AgentType = { 
  walletAddress: string;
  personality: string;
}

// USDC mint address on Solana mainnet
const USDC_MINT = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");

/**
 * Get all agent wallets for a specific chat ID
 * In a real implementation, this would query a database or external service
 */
async function getAgentWalletsByChatId(chatId: string): Promise<string[]> {
  try {
    console.log(`Fetching agent wallets for chat ID: ${chatId}`);
    
    // In a real implementation, this would query your database:
    const agentWallets = await db.agents.findMany({ 
      where: { chatId },
      select: { walletAddress: true }
    });
    return agentWallets.map((agent: AgentType) => agent.walletAddress);

  } catch (error) {
    console.error("Error fetching agent wallets:", error);
    throw new Error(`Failed to fetch agent wallets: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userAddress, userLiquidityAmount, chatId } = body;

    if (!chatId) {
      return NextResponse.json(
        { success: false, message: "Chat ID is required" },
        { status: 400 }
      );
    }

    if (!userAddress) {
      return NextResponse.json(
        { success: false, message: "User address is required" },
        { status: 400 }
      );
    }

    if (!userLiquidityAmount || userLiquidityAmount <= 0) {
      return NextResponse.json(
        { success: false, message: "Valid liquidity amount is required" },
        { status: 400 }
      );
    }

    const agentWalletAddresses = await getAgentWalletsByChatId(chatId);
    
    if (!agentWalletAddresses.length) {
      return NextResponse.json(
        { success: false, message: "No agent wallets found for this chat ID" },
        { status: 404 }
      );
    }

    // Calculate amount per agent
    const agentsCount = agentWalletAddresses.length;
    const amountPerAgent = Math.floor(userLiquidityAmount / agentsCount);
    
    if (amountPerAgent <= 0) {
      return NextResponse.json(
        { success: false, message: "Amount per agent is too small" },
        { status: 400 }
      );
    }

    const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
    const transaction = new Transaction();
    
    const userPubkey = new PublicKey(userAddress);
    const userUsdcAddress = await getAssociatedTokenAddress(
      USDC_MINT,
      userPubkey
    );

    const transferInstructions = await Promise.all(
      agentWalletAddresses.map(async (agentAddress) => {
        try {
          const agentPubkey = new PublicKey(agentAddress);
          
          // Ensure the agent has a token account
          // In production, you might want to handle this differently
          const destinationAccount = await getAssociatedTokenAddress(
            USDC_MINT, 
            agentPubkey
          );
          
          // Create transfer instruction
          return createTransferInstruction(
            userUsdcAddress,
            destinationAccount,
            userPubkey,
            amountPerAgent
          );
        } catch (error) {
          console.error(`Error creating transfer instruction for ${agentAddress}:`, error);
          return null;
        }
      })
    );
    
    // Filter out null values and add valid instructions to transaction
    const validInstructions = transferInstructions.filter((ix): ix is TransactionInstruction => ix !== null);
    transaction.add(...validInstructions);
    
    // Set recent blockhash and fee payer
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.lastValidBlockHeight = lastValidBlockHeight;
    transaction.feePayer = userPubkey;

    // Serialize the transaction to send back to the client
    const serializedTransaction = transaction.serialize({
      requireAllSignatures: false,
      verifySignatures: false
    });

    const transactionBase64 = Buffer.from(serializedTransaction).toString('base64');

    // Return transaction for user to sign
    return NextResponse.json(
      { 
        success: true,
        transaction: transactionBase64,
        agentsCount,
        amountPerAgent,
        totalAmount: amountPerAgent * agentsCount,
        agents: agentWalletAddresses
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

/**
 * Helper function to create a liquidity provision transaction.
 * This is a placeholder that needs to be implemented with the actual SDK method calls.
