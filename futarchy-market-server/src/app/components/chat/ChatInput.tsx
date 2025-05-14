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
    <div className="flex items-center w-full p-2 bg-gray-100 rounded-lg">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="flex-grow px-4 py-2 bg-gray-100 outline-none"
      />
      <button 
        onClick={handleSubmit}
        className="flex items-center justify-center w-10 h-10 text-white bg-teal-500 rounded-full hover:bg-teal-600 transition-colors"
      >
        <span className="text-xl font-bold">+</span>
      </button>
    </div>
  );
};

export default ChatInput; 