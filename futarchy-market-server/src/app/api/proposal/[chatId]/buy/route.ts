// this needs to be done by agent wallet, which is server side(privy)
// so better return the txn IXN

import { NextRequest, NextResponse } from 'next/server';
import { AmmClient } from '@metadaoproject/futarchy/v0.4';
import { AnchorProvider, Wallet } from "@coral-xyz/anchor";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

export async function POST(req: NextRequest, { params }: { params: { chatId: string } }) {
  try {
    const chatId = params.chatId;
    const body = await req.json();
    const { userAddress, marketSide, amountInUSDC, agentWalletAddress, passMarketAccount, failMarketAccount } = body;

    const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
    const wallet = { publicKey: new PublicKey(userAddress) } as Wallet;
    const provider = new AnchorProvider(connection, wallet, {});
    
    const ammClient = AmmClient.createClient({ provider });
    
    let txSignature;
    let outputAmount;
    
    if (marketSide === 'YES') {
      // buy YES tokens
      const passMarketPubkey = new PublicKey(passMarketAccount);

      const tx = await ammClient.swap(
        passMarketPubkey,
        { buy: {} },  // buy option for YES tokens
        amountInUSDC,
        Math.floor(amountInUSDC * 0.95) // Allow 5% slippage by default
      );
      
      txSignature = tx;
      outputAmount = Math.floor(amountInUSDC * 0.95); // Estimate
    } 
    else if (marketSide === 'NO') {
      // For NO tokens, use the FAIL market account
      const failMarketPubkey = new PublicKey(failMarketAccount);
      
      // buy NO tokens
      const tx = await ammClient.swap(
        failMarketPubkey,
        { buy: {} },  
        amountInUSDC, 
        Math.floor(amountInUSDC * 0.95) // Allow 5% slippage by default
      );
      
      txSignature = tx;
      outputAmount = Math.floor(amountInUSDC * 0.95); 
    }
    
    return NextResponse.json(
      { 
        success: true,
        txSignature: txSignature,
        amountofConditionalTokensReceived: outputAmount,
      }, 
      { status: 200 }
    );
    
  } catch (error: any) {
    console.error("Error processing buy order:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to process buy order",
        error: error.toString()
      }, 
      { status: 500 }
    );
  }
}
