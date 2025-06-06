'use client';

import React, { useState } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  placeholder = "Type a question to create a decision market..." 
}) => {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className={`flex items-center w-full px-4 py-2.5 bg-zinc-900 rounded-full transition-all ${
      isFocused ? 'border border-[#FF9EC5]/50 shadow-sm shadow-[#FF9EC5]/20' : 'border border-zinc-800'
    }`}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="flex-grow bg-transparent text-white outline-none placeholder-zinc-500 text-sm"
        autoComplete="off"
      />
      <div className={`text-xs ml-2 transition-opacity ${message.length > 0 ? 'opacity-100' : 'opacity-0'}`}>
        <span className={`${
          message.length > 1500 
            ? (message.length > 1900 ? 'text-red-500' : 'text-amber-500') 
            : 'text-zinc-500'
        }`}>
          {message.length}/2000
        </span>
      </div>
      <button 
        onClick={handleSubmit}
        className={`flex items-center justify-center ml-2 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
          message.trim() ? 'text-[#FF9EC5] hover:text-[#FF9EC5]/80' : 'text-zinc-600'
        }`}
        disabled={!message.trim()}
        aria-label="Send message"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
};

export default ChatInput; 