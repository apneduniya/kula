'use client';

import React, { ReactNode } from 'react';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'system';
  timestamp: Date;
  cardData?: {
    state: 'creation' | 'unresolved' | 'resolved';
    question: string;
    currentPrice?: number;
    ifApprovedPrice?: number;
    ifRejectedPrice?: number;
    chartData?: Array<{
      name: string;
      currentPrice: number;
      ifApproved: number;
      ifRejected: number;
    }>;
    yesPrice?: number;
    noPrice?: number;
  };
}

interface MessageListProps {
  messages: Message[];
  renderCard?: (message: Message) => ReactNode;
}

const MessageList: React.FC<MessageListProps> = ({ messages, renderCard }) => {
  if (messages.length === 0) {
    return null;
  }
  
  return (
    <div className="flex flex-col space-y-6 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
      {messages.map((message) => (
        <div key={message.id} className="flex flex-col">
          {/* Regular message bubble */}
          <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-md p-3 rounded-md ${
                message.sender === 'user' 
                  ? 'bg-pink-500 text-white' 
                  : 'bg-gray-800 text-white border border-gray-700'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <span className="text-xs text-gray-300 block mt-1">
                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
          
          {/* Card as a separate component centered below the message */}
          {message.cardData && renderCard && (
            <div className="mt-6 self-center">
              {renderCard(message)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageList; 