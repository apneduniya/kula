'use client';

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { userInput } = await req.json();
    
    if (!userInput) {
      return NextResponse.json(
        { error: 'User input is required' }, 
        { status: 400 }
      );
    }

    // Call to an AI service to extract a clear decision question
    const extractedQuestion = await extractDecisionQuestion(userInput);
    
    return NextResponse.json({ question: extractedQuestion });
  } catch (error) {
    console.error('Error in extract-question API:', error);
    return NextResponse.json(
      { error: 'Failed to extract question' }, 
      { status: 500 }
    );
  }
}

// Function to send user input to AI and get a cleaned decision question
async function extractDecisionQuestion(userInput: string): Promise<string> {
  try {
    // Call the OpenAI API (you can replace this with any AI service you prefer)
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `Extract a clear, concise decision question from the user input. Follow these rules:
            1. The question should be formatted as one that can be answered with yes/no or should/should not
            2. Make it simple, direct, and suitable for a prediction market
            3. Start with "Should", "Will", "Is", or similar question words when appropriate
            4. Remove any expressions of confusion or uncertainty
            5. If the input is already a clear decision question, preserve its original form
            6. The question must end with a question mark
            7. Keep the question under 15 words if possible
            8. Only return the question itself, no explanation or additional text
            
            Example transformations:
            - "am confused whether X should get passed or not" → "Should X get passed?"
            - "I wonder if the proposal will be accepted" → "Will the proposal be accepted?"
            - "not sure about whether to invest in this project" → "Should we invest in this project?"
            - "thinking about if the market will crash next month" → "Will the market crash next month?"`
          },
          {
            role: "user",
            content: userInput
          }
        ],
        temperature: 0.3,
        max_tokens: 60
      })
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    const extractedQuestion = data.choices[0].message.content.trim();
    
    // If for some reason the AI doesn't return a valid question
    if (!extractedQuestion || extractedQuestion.length < 3) {
      return userInput.trim().endsWith('?') ? 
        userInput.trim() : 
        `Should ${userInput.trim()}?`;
    }
    
    return extractedQuestion;
    
  } catch (error) {
    console.error('Error in AI question extraction:', error);
    
    // If AI service fails, return a basic formatted question
    // without any regex or complex logic
    return userInput.trim().endsWith('?') ? 
      userInput.trim() : 
      `Should ${userInput.trim()}?`;
  }
}