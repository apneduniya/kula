import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { PrivyClient } from '@privy-io/server-sdk';
import { ChatOpenAI } from '@langchain/openai';
import { AgentExecutor, createReactAgent } from 'langchain/agents';
import { TavilySearchResults } from '@langchain/community/tools/tavily_search';
import { ChainTool } from '@langchain/langgraph/tools';

// Initialize Privy client with your API key
const privyClient = new PrivyClient(process.env.PRIVY_API_KEY!);

// Initialize OpenAI model for the agent
const model = new ChatOpenAI({
  modelName: "gpt-4o",
  temperature: 0.5,
  openAIApiKey: process.env.OPENAI_API_KEY
});

// Create a search tool for the agent
const searchTool = new TavilySearchResults({
  apiKey: process.env.TAVILY_API_KEY!,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, agentName, agentDescription } = body;
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Create a new Privy wallet for the agent
    const walletResponse = await privyClient.createWallet({
      userId,
      walletClientId: `agent-wallet-${uuidv4()}`,
      chainIds: ['solana'],
      recoverable: true,
    });

    if (!walletResponse.success) {
      return NextResponse.json({ error: 'Failed to create wallet' }, { status: 500 });
    }

    // Get the wallet address
    const walletAddress = walletResponse.data.address;

    // Create the agent using LangChain
    const tools = [searchTool];
    
    const agent = await createReactAgent({
      llm: model,
      tools,
    });

    const agentExecutor = new AgentExecutor({
      agent,
      tools,
    });

    // Create a metadata object for the agent
    const agentData = {
      id: uuidv4(),
      name: agentName || 'Unnamed Agent',
      description: agentDescription || 'A Futarchy agent powered by LangChain',
      walletAddress,
      userId,
      createdAt: new Date().toISOString(),
    };

    // Here you would typically store the agent data in your database
    // For example: await db.insert('agents', agentData);

    return NextResponse.json({
      success: true,
      data: agentData
    });
    
  } catch (error) {
    console.error('Error creating agent:', error);
    return NextResponse.json(
      { error: 'Failed to create agent', details: (error as Error).message },
      { status: 500 }
    );
  }
}
