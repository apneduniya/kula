// this needs to be done by agent wallet, which is server side(privy)
// so better return the txn IXN

import { NextRequest, NextResponse } from 'next/server';
import { FutarchyRPCClient, AUTOCRAT_VERSIONS, getMidPrice, SwapPreview, AmmMarket, FutarchyAmmMarketsClient } from "@metadaoproject/futarchy";
import { AnchorProvider, Wallet } from "@coral-xyz/anchor";
import { Connection, PublicKey, TransactionInstruction, clusterApiUrl } from "@solana/web3.js";

export async function POST(req: NextRequest, { params }: { params: { chatId: string } }) {
  try {
    const chatId = params.chatId;
    const body = await req.json();
    const { userAddress, marketSide, amountInUSDC, agentWalletAddress, passMarketAccount, failMarketAccount } = body;

    if (marketSide == 'YES') {
        // agent buys X USDC worth of PASS -> GETS relevant amount of YES tokens + X fUSDC
        // 1. get price of YES to calculate Y(no of YES tokens bought with X USDC)
        // 2. make the buy IXN + return the txn IXN/signature
        
        const price = await getMidPrice() // price in USDC per YES token
        const outputAmountInYESTokens = amountInUSDC/price;

        // getting the apt price quote
        // const quote = 
        // const BuyammSwap = SwapType.buy(amountInUSDC, baseQuote)

        const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed")
        const wallet = { publicKey: new PublicKey(userAddress) } as Wallet
        const provider = new AnchorProvider(connection, wallet);
        const programVersion = AUTOCRAT_VERSIONS[0];
        const client = FutarchyRPCClient.make(provider, undefined);

        const ammClient = FutarchyAmmMarketsClient(
          provider,
          connection,
          client
        );

        const preview = await ammClient.getSwapPreview(passMarketAccount, amountInUSDC, true, 0.01);

        const tx = await ammClient.swap(
          passMarketAccount,
          { buy: {} },
          amountInUSDC,
          preview.outputUnits,
          0.01
        );
        const quote = 

    }
    else if(marketSide == 'NO'){
        // agent buys X USDC worth of FAIL -> GETS relevant amount of NO tokens + X pUSDC
        // similar as w YES
    }
    return NextResponse.json(
      { 
        success: true,
        txSignature: tx,
        swapResponse: ,
        amountofConditionalTokensReceived: ,
      }, 
      { status: 200 }
    );
    
  } catch (error) {
    console.error("Error processing buy order:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to process buy order" 
      }, 
      { status: 500 }
    );
  }
}
