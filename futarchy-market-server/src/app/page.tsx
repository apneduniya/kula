'use client';

import { useEffect, useState } from 'react';
import Chat from './components/chat';
import { v4 as uuidv4 } from 'uuid';

// Define the type for a decision
interface Decision {
  id: number;
  title: string | null;
  isResolved: boolean | null;
  passPrice: number | null;
  failPrice: number | null;
  chatId: string | number | null;
}

// Define the type for a chat
interface ChatData {
  id: string | number;
  createdAt: Date;
}

export default function Home() {
  const [previousDecisions, setPreviousDecisions] = useState<Decision[]>([]);
  const [chats, setChats] = useState<ChatData[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | number>('');
  const [loading, setLoading] = useState(true);
  const [decisionsLoading, setDecisionsLoading] = useState(true);

  // Initialize with a default chat or load from localStorage
  useEffect(() => {
    const loadChats = async () => {
      try {
        // Try to load chats from the API
        const response = await fetch('/api/chat');
        if (response.ok) {
          const chatData = await response.json();
          setChats(chatData);
          
          if (chatData.length > 0) {
            setCurrentChatId(chatData[0].id);
          } else {
            createNewChat();
          }
        } else {
          createNewChat();
        }
      } catch (error) {
        console.error('Error loading chats:', error);
        // Create a default chat on error
        createNewChat();
      } finally {
        setLoading(false);
      }
    };

    loadChats();
  }, []);

  // Load previous decisions from the API
  useEffect(() => {
    const fetchDecisions = async () => {
      try {
        setDecisionsLoading(true);
        const response = await fetch('/api/decision');
        if (response.ok) {
          const decisions = await response.json();
          setPreviousDecisions(decisions);
        }
      } catch (error) {
        console.error('Error fetching decisions:', error);
      } finally {
        setDecisionsLoading(false);
      }
    };

    if (!loading) {
      fetchDecisions();
    }
  }, [loading]);

  // Create a new chat
  const createNewChat = async () => {
    const newChatId = uuidv4();
    const newChat: ChatData = {
      id: newChatId,
      createdAt: new Date()
    };

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newChat),
      });

      if (response.ok) {
        const savedChat = await response.json();
        setChats(prev => [savedChat, ...prev]);
        setCurrentChatId(savedChat.id);
      } else {
        setChats(prev => [newChat, ...prev]);
        setCurrentChatId(newChat.id);
      }
    } catch (error) {
      console.error('Error creating chat:', error);

      setChats(prev => [newChat, ...prev]);
      setCurrentChatId(newChat.id);
    }
  };

  // Switch to a specific chat
  const switchToChat = (chatId: string | number) => {
    setCurrentChatId(chatId);
  };

  // Format the date for display (e.g., "2 days ago")
  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - new Date(date).getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-black text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <header className="bg-black text-white p-4 border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold">Kula</h1>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar for previous proposals/decisions and chats - Fixed */}
        <div className="w-64 bg-black text-white overflow-y-auto border-r border-gray-800 fixed top-16 bottom-0 left-0">
          <div className="p-4">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Chats</h2>
                <button 
                  onClick={createNewChat}
                  className="w-6 h-6 flex items-center justify-center bg-gray-800 rounded-md hover:bg-pink-500 transition-colors cursor-pointer"
                >
                  <span className="text-sm font-bold">+</span>
                </button>
              </div>
              
              <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700">
                {chats.map(chat => (
                  <div 
                    key={chat.id} 
                    className={`p-2 rounded-md cursor-pointer transition-colors ${
                      chat.id === currentChatId 
                        ? 'bg-pink-500 text-white' 
                        : 'bg-gray-900 hover:bg-gray-800 text-white'
                    }`}
                    onClick={() => switchToChat(chat.id)}
                  >
                    <p className="font-medium truncate">Chat {chats.indexOf(chat) + 1}</p>
                    <div className="text-xs opacity-70">
                      {getTimeAgo(chat.createdAt)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <h2 className="text-xl font-bold mb-4">Previous Decisions</h2>
            
            {decisionsLoading ? (
              <div className="text-gray-400">Loading decisions...</div>
            ) : previousDecisions.length > 0 ? (
              <div className="space-y-3">
                {previousDecisions.map((decision) => (
                  <div 
                    key={decision.id} 
                    className="p-3 rounded-md bg-gray-900 cursor-pointer hover:bg-gray-800 border border-gray-800 transition-colors"
                  >
                    <p className="font-medium">{decision.title || 'Untitled Decision'}</p>
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>Created {getTimeAgo(new Date())}</span>
                      <span>{decision.isResolved ? 'Resolved' : 'Active'}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-400">No previous decisions found.</div>
            )}
          </div>
        </div>
        
        {/* Main Chat Area - With left margin to account for fixed sidebar */}
        <div className="flex-1 overflow-hidden ml-64">
          {currentChatId && (
            <Chat 
              className="h-full" 
              chatId={currentChatId}
              onNewChat={createNewChat}
            />
          )}
        </div>
      </div>
    </div>
  );
}
