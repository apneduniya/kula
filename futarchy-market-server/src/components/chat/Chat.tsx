'use client';

import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ChatInput from './ChatInput';
import MessageList, { Message } from './MessageList';
import Card from '../card';

interface ChatProps {
  className?: string;
  chatId: string | number;
  onNewChat?: () => void;
  onSendMessage?: (message: string) => void;
}

// Define the type for a decision
interface Decision {
  id: number;
  title: string | null;
  isResolved: boolean | null;
  passPrice: number | null;
  failPrice: number | null;
  chatId: string | number;
}

// Sample static data for the unresolved market state
const staticChartData = [
  { name: '1h', currentPrice: 20.22, ifApproved: 20.30, ifRejected: 20.15 },
  { name: '2h', currentPrice: 20.25, ifApproved: 20.40, ifRejected: 20.18 },
  { name: '3h', currentPrice: 20.30, ifApproved: 20.60, ifRejected: 20.20 },
  { name: '4h', currentPrice: 20.28, ifApproved: 20.70, ifRejected: 20.21 },
  { name: '5h', currentPrice: 20.35, ifApproved: 20.90, ifRejected: 20.22 },
  { name: '6h', currentPrice: 20.37, ifApproved: 21.10, ifRejected: 20.22 },
];

// Sample static data for the resolved market state
const staticResolvedData = {
  yesPrice: 0.570,
  noPrice: 0.461
};

const Chat: React.FC<ChatProps> = ({ className = '', chatId, onNewChat, onSendMessage }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [qs, setQs] = useState('')
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const [cardState, setCardState] = useState<'creation' | 'unresolved' | 'resolved' | null>(null);
  const [showUsdcPopup, setShowUsdcPopup] = useState(false);
  const [usdcAmount, setUsdcAmount] = useState('');
  const [currentDecisionId, setCurrentDecisionId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat messages and decisions when chatId changes
  useEffect(() => {
    const loadChatData = async () => {
      setLoading(true);
      setMessages([]);
      
      try {
        // Fetch decisions for this chat
        const response = await fetch(`/api/decision?chatId=${chatId}`);
        
        if (response.ok) {
          const decisions = await response.json();
          
          // Create a welcome message
          const welcomeMessage: Message = {
            id: uuidv4(),
            content: "Welcome to Kula! Type a question to create a new decision market",
            sender: 'system',
            timestamp: new Date(),
          };
          
          let chatMessages: Message[] = [welcomeMessage];
          
          // Create messages from decisions
          if (decisions.length > 0) {
            decisions.forEach((decision: Decision) => {
              // User message for the question
              const userMessage: Message = {
                id: uuidv4(),
                content: decision.title ?? 'Untitled Decision',
                sender: 'user',
                timestamp: new Date(), // Use current date as fallback
              };
              
              // System response with card
              const cardState = decision.isResolved 
                ? 'resolved' 
                : (decision.passPrice || decision.failPrice) 
                  ? 'unresolved'
                  : 'creation';
              
              const systemMessage: Message = {
                id: uuidv4(),
                content: getSystemMessageForState(cardState),
                sender: 'system',
                timestamp: new Date(),
                cardData: {
                  state: cardState,
                  question: decision.title ?? 'Untitled Decision',
                  currentPrice: decision.passPrice || 20.37,
                  ifApprovedPrice: decision.passPrice || 21.10,
                  ifRejectedPrice: decision.failPrice || 20.22,
                  chartData: cardState === 'unresolved' ? staticChartData : undefined,
                  yesPrice: cardState === 'resolved' ? (decision.passPrice || staticResolvedData.yesPrice) : undefined,
                  noPrice: cardState === 'resolved' ? (decision.failPrice || staticResolvedData.noPrice) : undefined
                }
              };
              
              chatMessages.push(userMessage, systemMessage);
            });
          }
          
          setMessages(chatMessages);
        } else {
          // If API call fails, just show the welcome message
          const welcomeMessage: Message = {
            id: uuidv4(),
            content: "Welcome to Kula! Type a question to create a new decision market",
            sender: 'system',
            timestamp: new Date(),
          };
          setMessages([welcomeMessage]);
        }
      } catch (error) {
        console.error('Error loading chat data:', error);
        // Show welcome message on error
        const welcomeMessage: Message = {
          id: uuidv4(),
          content: "Welcome to Kula! Type a question to create a new decision market",
          sender: 'system',
          timestamp: new Date(),
        };
        setMessages([welcomeMessage]);
      } finally {
        setLoading(false);
        scrollToBottom();
      }
    };
    
    loadChatData();
  }, [chatId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getSystemMessageForState = (state: 'creation' | 'unresolved' | 'resolved') => {
    switch (state) {
      case 'creation':
        return "I've created a new prediction market based on your question.";
      case 'unresolved':
        return "Market created successfully!";
      case 'resolved':
        return "The market has been resolved!";
      default:
        return "I've created a new prediction market based on your question.";
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Client-side function to extract a decision question
  const extractDecisionQuestion = (userInput: string): Promise<string> => {
    return new Promise(async (resolve) => {
      try {
        if (!userInput) {
          resolve("Should this decision be approved?");
          return;
        }

        // Regular expressions for common patterns
        const isAlreadyQuestion = /^(?:should|will|is|are|can|could|would|do|does|has|have|had|may|might|must|shall|was|were)\b.+\?$/i.test(userInput.trim());
        
        if (isAlreadyQuestion) {
          // If it's already formatted as a question, just return it
          resolve(userInput.trim());
          return;
        }

        // Check if there's a question API key available
        if (process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
          try {
            // Try to use OpenAI to extract a better question
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
              },
              body: JSON.stringify({
                model: "gpt-4o",
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
                    8. Only return the question itself, no explanation or additional text`
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
            
            if (response.ok) {
              const data = await response.json();
              const extractedQuestion = data.choices[0].message.content.trim();
              
              if (extractedQuestion && extractedQuestion.length > 3) {
                resolve(extractedQuestion);
                return;
              }
            }
          } catch (error) {
            console.error('Error in OpenAI question extraction:', error);
            // Fall through to the fallback method
          }
        }
        
        // Fallback method if API call fails or no API key
        // Basic logic to transform text to a question
        let question = userInput.trim();
        
        // // Remove expressions of confusion or uncertainty
        // question = question.replace(/^(?:i am|am|i'm|i am being|being|i feel|feeling|i'm feeling|i am feeling) (?:confused|uncertain|not sure|unsure|wondering|thinking|unclear|ambivalent) (?:about|whether|if|on|regarding|concerning)/i, '');
        
        // // Clean up any leftover artifacts
        // question = question.replace(/^(or not|or no)/, '').trim();
        
        // // If it doesn't start with a question word, add "Should"
        // if (!/^(?:should|will|is|are|can|could|would|do|does|has|have|had|may|might|must|shall|was|were)\b/i.test(question)) {
        //   question = "Should " + question;
        // }
        
        // Ensure it ends with a question mark
        if (!question.endsWith('?')) {
          question += '?';
        }
        
        resolve(question);
      } catch (error) {
        console.error('Error extracting question:', error);
        // Ultimate fallback
        resolve(userInput.trim().endsWith('?') ? userInput.trim() : `Should ${userInput.trim()}?`);
      }
    });
  };

  const handleSendMessage = async (content: string) => {
    const newMessage: Message = {
      id: uuidv4(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, newMessage]);
    
    if (onSendMessage) {
      onSendMessage(content);
    }
    
    // Extract a clean decision question from the user input
    const extractedQuestion = await extractDecisionQuestion(content);
    setCurrentQuestion(extractedQuestion);
    setCardState('creation');

    try {
      // Create a new decision using the API route with the extracted question
      const response = await fetch('/api/decision', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          title: extractedQuestion,
          chatId: chatId
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create decision');
      }

      const decision = await response.json();
      
      // Set the current decision ID
      setCurrentDecisionId(decision.id);

      // Add a system response with the card
      setTimeout(() => {
        const systemResponse: Message = {
          id: uuidv4(),
          content: 'I\'ve created a new decision market based on your question.',
          sender: 'system',
          timestamp: new Date(),
          cardData: {
            state: 'creation',
            question: extractedQuestion,
          }
        };
        setMessages((prev) => [...prev, systemResponse]);
      }, 500);
    } catch (error) {
      console.error('Error creating decision:', error);
      
      // Still show the card even if API call fails
      setTimeout(() => {
        const systemResponse: Message = {
          id: uuidv4(),
          content: 'I\'ve created a new prediction market based on your question.',
          sender: 'system',
          timestamp: new Date(),
          cardData: {
            state: 'creation',
            question: extractedQuestion,
          }
        };
        setMessages((prev) => [...prev, systemResponse]);
      }, 500);
    }
  };

  const handleAddUsdc = () => {
    setShowUsdcPopup(true);
  };

  const handleSubmitUsdc = async () => {
    // Handle USDC submission logic here
    setShowUsdcPopup(false);

    // Placeholder for the provideLiquidityAndCreateAgents function
    // This would be replaced with the actual implementation later
    const provideLiquidityAndCreateAgents = (amount: string, question: string) => {
      console.log(`Adding ${amount} USDC to market: ${question}`);
      // Simulate API call or contract interaction
      return new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 1000);
      });
    };

    // Show a processing message
    const processingMessage: Message = {
      id: uuidv4(),
      content: `Processing your transaction of ${usdcAmount} USDC...`,
      sender: 'system',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, processingMessage]);

    try {
      // Call the function and update the card state when done
      await provideLiquidityAndCreateAgents(usdcAmount, currentQuestion || '');
      
      
      // Update the decision using the API route
      if (currentDecisionId) {
        const response = await fetch('/api/decision', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: currentDecisionId,
            passPrice: 21.10,  // Default YES token price
            failPrice: 20.22   // Default NO token price
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to update decision');
        }
      }

      setCardState('unresolved');
      
      // Add a new system message with the updated card
      const updatedMessage: Message = {
        id: uuidv4(),
        content: `Market created successfully with ${usdcAmount} USDC!`,
        sender: 'system',
        timestamp: new Date(),
        cardData: {
          state: 'unresolved',
          question: currentQuestion || '',
          currentPrice: 20.37,
          ifApprovedPrice: 21.10,
          ifRejectedPrice: 20.22,
          chartData: staticChartData
        }
      };
      setMessages((prev) => [...prev, updatedMessage]);
      setUsdcAmount('');
    } catch (error) {
      console.error('Error updating decision:', error);
      
      // Still show the card even if API call fails
      setCardState('unresolved');
      
      const updatedMessage: Message = {
        id: uuidv4(),
        content: `Market created successfully with ${usdcAmount} USDC!`,
        sender: 'system',
        timestamp: new Date(),
        cardData: {
          state: 'unresolved',
          question: currentQuestion || '',
          currentPrice: 20.37,
          ifApprovedPrice: 21.10,
          ifRejectedPrice: 20.22,
          chartData: staticChartData
        }
      };
      setMessages((prev) => [...prev, updatedMessage]);
      setUsdcAmount('');
    }
  };

  const handleAddAgents = () => {
    // Placeholder for adding agents
    const systemResponse: Message = {
      id: uuidv4(),
      content: 'Added new agents to the market.',
      sender: 'system',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, systemResponse]);
  };

  const handleAddLiquidity = () => {
    // Placeholder for adding liquidity
    const systemResponse: Message = {
      id: uuidv4(),
      content: 'Added more liquidity to the market.',
      sender: 'system',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, systemResponse]);
  };

  const handleResolveMarket = async () => {
    try {
      if (currentDecisionId) {
        const response = await fetch('/api/decision', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: currentDecisionId,
            isResolved: true,
            passPrice: staticResolvedData.yesPrice,
            failPrice: staticResolvedData.noPrice
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to resolve decision');
        }
      }

      setCardState('resolved');
      
      // Add a new system message with the resolved card
      const resolvedMessage: Message = {
        id: uuidv4(),
        content: 'The market has been resolved!',
        sender: 'system',
        timestamp: new Date(),
        cardData: {
          state: 'resolved',
          question: currentQuestion || '',
          yesPrice: staticResolvedData.yesPrice,
          noPrice: staticResolvedData.noPrice
        }
      };
      setMessages((prev) => [...prev, resolvedMessage]);
    } catch (error) {
      console.error('Error resolving decision:', error);
      
      // Still show the resolved card even if API call fails
      setCardState('resolved');
      
      const resolvedMessage: Message = {
        id: uuidv4(),
        content: 'The market has been resolved!',
        sender: 'system',
        timestamp: new Date(),
        cardData: {
          state: 'resolved',
          question: currentQuestion || '',
          yesPrice: staticResolvedData.yesPrice,
          noPrice: staticResolvedData.noPrice
        }
      };
      setMessages((prev) => [...prev, resolvedMessage]);
    }
  };

  const handleRedeemTokens = () => {
    // Placeholder for redeeming tokens
    const systemResponse: Message = {
      id: uuidv4(),
      content: 'Tokens redeemed successfully!',
      sender: 'system',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, systemResponse]);
  };

  return (
    <div className={`flex flex-col h-full bg-gray-900 ${className}`}>
      <div className="flex items-center justify-between border-b border-gray-800 p-4">
        <h2 className="text-xl font-bold text-white">Futarchy Chat</h2>
        <button 
          onClick={onNewChat}
          className="flex items-center justify-center w-8 h-8 text-white bg-gray-800 rounded-md hover:bg-pink-500 transition-colors cursor-pointer"
          title="Create new chat"
        >
          <span className="text-xl font-bold">+</span>
        </button>
      </div>
      
      <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="text-white">Loading chat...</div>
          </div>
        ) : (
          <MessageList 
            messages={messages} 
            renderCard={(message) => 
              message.cardData ? (
                <Card 
                  state={message.cardData.state}
                  question={message.cardData.question}
                  currentPrice={message.cardData.currentPrice}
                  ifApprovedPrice={message.cardData.ifApprovedPrice}
                  ifRejectedPrice={message.cardData.ifRejectedPrice}
                  chartData={message.cardData.chartData}
                  yesPrice={message.cardData.yesPrice}
                  noPrice={message.cardData.noPrice}
                  onAddUsdc={handleAddUsdc}
                  onAddAgents={handleAddAgents}
                  onAddLiquidity={handleAddLiquidity}
                  onResolveMarket={handleResolveMarket}
                  onRedeemTokens={handleRedeemTokens}
                />
              ) : null
            }
          />
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-gray-800">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>

        {/* UPON CLICKING ON ADD USDC -> txn = (proposal creation ixn(/api/proposal/new, which also creates 100 Agents) + USDC transfer to each of the agent wallets IXN) */}
      {/* USDC Popup */}
      {showUsdcPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-96 max-w-full border border-gray-700">
            <h3 className="text-xl font-bold mb-4 text-white">Add USDC</h3>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Enter USDC amount:</label>
              <input
                type="number"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-pink-400 text-white"
                value={usdcAmount}
                onChange={(e) => setUsdcAmount(e.target.value)}
                placeholder="0.00"
                min="0"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 cursor-pointer"
                onClick={() => setShowUsdcPopup(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 active:bg-pink-700 cursor-pointer"
                onClick={handleSubmitUsdc}
                disabled={!usdcAmount || parseFloat(usdcAmount) <= 0}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;