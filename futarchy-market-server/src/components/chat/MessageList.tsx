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
    <div className="flex flex-col space-y-3 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
      {messages.map((message) => (
        <div key={message.id} className="flex flex-col">
          {/* Regular message bubble */}
          <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-md p-2.5 rounded-lg ${
                message.sender === 'user' 
                  ? 'bg-[#FF9EC5] text-black' 
                  : 'bg-zinc-900 text-white border border-zinc-800'
              }`}
            >
              <p className="text-base leading-snug tracking-tight">{message.content}</p>
              <span className={`text-xs block mt-1 opacity-75 ${
                message.sender === 'user' ? 'text-black/70' : 'text-zinc-400'
              }`}>
                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
          
          {/* Card as a separate component centered below the message */}
          {message.cardData && renderCard && (
            <div className="mt-3 self-center w-full max-w-md">
              {renderCard(message)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageList; 