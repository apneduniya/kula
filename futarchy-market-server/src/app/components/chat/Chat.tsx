'use client';

import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ChatInput from './ChatInput';
import MessageList, { Message } from './MessageList';

interface ChatProps {
  className?: string;
  onSendMessage?: (message: string) => void;
}

const Chat: React.FC<ChatProps> = ({ className = '', onSendMessage }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (content: string) => {
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
    

    setTimeout(() => {
      const systemResponse: Message = {
        id: uuidv4(),
        content: `You sent: "${content}"`,
        sender: 'system',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, systemResponse]);
    }, 1000);
  };

  return (
    <div className={`flex flex-col h-full ${className}`}>
      <div className="flex-grow overflow-y-auto">
        <MessageList messages={messages} />
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default Chat; 