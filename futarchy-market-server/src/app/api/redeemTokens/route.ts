// 1. WHERE DO THE YES/NO TOKENS EXIST? THEY ARE CREATED USING CONDITIONAL VAULT PROGRAM, BUT IN THE END THEY ARE IN THE AMMS AND EXCHANGED WITH THE AGENT DURING BUY/SELL.
// 2. PROPOSAL GETS CREATED(with x USDC) -> 100 AGENTS GETS CREATED -> CREATE N YES TOKENS + N NO TOKENS + x f/pUSDC + AMM (this should be handled by the FutarchyRPCClient) 
// 3. NOW THE 100 AGENTS WOULD NOT HAVE ALL THE N TOKENS, SINCE BY DEFINITION OF TWAP PRICE EVERYONE SHOULD HAVE VARIABLE NO OF TOKENS
// 4. SO TAKE THE WINNING SIDE(YES/NO) AS REQ INPUT, AND THEN SORT BY WHICH AGENTS CONTAIN THOSE TOKENS, THEN RETURN A TX = TRANSFER OF YES/NO FROM AGENTS TO USER
// 5. PLUS SOME TOKENS ARE ALREADY IN THE VAULT, RETURN THOSE TO THE USER AS WELL.

// OR BETTER, if YES is the outcome -> return x fUSDC from the vault, else return x pUSDC. 
// f/p USDC will always be fixed(x amount)

import { NextRequest, NextResponse } from 'next/server';
import { AnchorProvider, Wallet } from "@coral-xyz/anchor";
import { Connection, PublicKey, Transaction, clusterApiUrl } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, createTransferInstruction, getAssociatedTokenAddress } from "@solana/spl-token";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      userAddress, 
      outcome, // 'YES' or 'NO'
      originalAmount, // original USDC amount invested
      agentWalletAddress, // agent wallet that holds the tokens
      usdcMint, // USDC mint address
      profitAmount // additional profit amount if outcome matches prediction
    } = body;

    // Create connection and provider
    const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
    const wallet = { publicKey: new PublicKey(userAddress) } as Wallet;
    const provider = new AnchorProvider(connection, wallet, {});
    
    // Create a transaction
    const transaction = new Transaction();
    
    // Get the agent's public key
    const agentPubkey = new PublicKey(agentWalletAddress);
    
    // Get token accounts for agent and user
    const agentTokenAccount = await getAssociatedTokenAddress(
      new PublicKey(usdcMint),
      agentPubkey
    );
    
    const userTokenAccount = await getAssociatedTokenAddress(
      new PublicKey(usdcMint),
      new PublicKey(userAddress)
    );
    
    // Calculate amount to transfer based on outcome
    const transferAmount = outcome ? 
      originalAmount + (profitAmount || 0) : // Return original + profit if outcome matches
      Math.floor(originalAmount * 0.1); // Return 10% as consolation if outcome doesn't match
    
    // Create transfer instruction
    const transferIx = createTransferInstruction(
      agentTokenAccount,
      userTokenAccount,
      agentPubkey,
      transferAmount
    );
    
    transaction.add(transferIx);
    
    // Return the serialized transaction for the frontend to sign and send
    const serializedTransaction = transaction.serialize({
      requireAllSignatures: false,
      verifySignatures: false
    }).toString('base64');
    
    return NextResponse.json(
      { 
        success: true,
        transaction: serializedTransaction,
        amountToReceive: transferAmount
      }, 
      { status: 200 }
    );
    
  } catch (error: any) {
    console.error("Error processing token redemption:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to process token redemption",
        error: error.toString()
      }, 
      { status: 500 }
    );
  }
}