'use client';

import React, { useState } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  placeholder = "What decision do you wanna finalize on?" 
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
    <div className={`flex items-center w-full p-1 border border-gray-700 rounded-lg ${isFocused ? 'border-pink-400' : 'border-gray-700'}`}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="flex-grow px-4 py-2 bg-transparent text-white outline-none placeholder-gray-500"
      />
      <button 
        onClick={handleSubmit}
        className="flex items-center justify-center w-10 h-10 text-white bg-black rounded-md hover:bg-gray-800 active:bg-pink-500 transition-colors ml-1 cursor-pointer"
      >
        <span className="text-xl font-bold">→</span>
      </button>
    </div>
  );
};

export default ChatInput; 