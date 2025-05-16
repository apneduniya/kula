'use client';

import React, { useState } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  placeholder = "What decision do you want to finalize?" 
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
    <div className={`flex items-center w-full p-1 border ${isFocused ? 'border-pink-500' : 'border-gray-700'} rounded-md bg-gray-800 transition-colors`}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="flex-grow px-3 py-2 bg-transparent text-white outline-none placeholder-gray-500 text-sm"
      />
      <button 
        onClick={handleSubmit}
        className="flex items-center justify-center w-8 h-8 text-white bg-pink-500 rounded-md hover:bg-pink-600 active:bg-pink-700 transition-colors ml-1 cursor-pointer"
        disabled={!message.trim()}
      >
        <span className="text-sm">→</span>
      </button>
    </div>
  );
};

export default ChatInput; 