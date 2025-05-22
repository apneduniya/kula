import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    // Parse the request body to get the binary question
    const { question } = await request.json();

    if (!question || typeof question !== 'string') {
      return NextResponse.json(
        { error: 'A valid question is required' },
        { status: 400 }
      );
    }

    // Use OpenAI to analyze the question and make a decision
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content: "You are a decision-making assistant. You will be given a binary question that requires a YES or NO answer. Research the question thoroughly and provide your final decision as either 'YES' or 'NO' only."
        },
        {
          role: "user",
          content: `Please analyze this binary question and provide a definitive YES or NO answer: "${question}"`
        }
      ],
      temperature: 0.2, // Lower temperature for more deterministic responses
      max_tokens: 50,   // Keep response concise
    });

    // Extract the decision from the response
    const decision = completion.choices[0]?.message?.content?.trim().toUpperCase();
    
    // Validate that the response is either YES or NO
    if (decision === 'YES' || decision === 'NO') {
      return NextResponse.json({ decision });
    } else {
      // If the model didn't respond with a clear YES or NO, make a fallback decision
      const fallbackDecision = Math.random() > 0.5 ? 'YES' : 'NO';
      return NextResponse.json({ 
        decision: fallbackDecision,
        note: 'The AI did not provide a clear YES/NO answer, so a random decision was made.'
      });
    }
  } catch (error) {
    console.error('Error generating decision:', error);
    return NextResponse.json(
      { error: 'Failed to generate decision' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic'; // Disable caching for this route
