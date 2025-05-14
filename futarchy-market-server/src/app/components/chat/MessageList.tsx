'use client';

import React from 'react';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'system';
  timestamp: Date;
}

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  if (messages.length === 0) {
    return null;
  }
  
  return (
    <div className="flex flex-col space-y-4 p-4 overflow-y-auto">
      {messages.map((message) => (
        <div 
          key={message.id}
          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div 
            className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl p-3 rounded-lg ${
              message.sender === 'user' 
                ? 'bg-teal-500 text-white' 
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            <p className="text-sm">{message.content}</p>
            <span className="text-xs opacity-70 block mt-1">
              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList; 