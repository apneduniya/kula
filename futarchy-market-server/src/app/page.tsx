'use client';

import { useEffect, useState } from 'react';
import Chat from '../components/chat';
import ChatSidebar from '../components/ChatSidebar';
import { v4 as uuidv4 } from 'uuid';
import WalletButton from '../components/wallet-connect-button';
import { ChevronRight, ChevronLeft } from 'lucide-react';

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
  const [sidebarOpen, setSidebarOpen] = useState(true);

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

  const switchToChat = (chatId: string | number) => {
    setCurrentChatId(chatId);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

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
    <div className="min-h-screen flex flex-col bg-black text-white">
      <header className="bg-black text-white p-4 border-b border-zinc-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-medium">Kula</h1>
          <div className="flex items-center space-x-4">
            <WalletButton />
          </div>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden relative bg-black">
        {/* Sidebar */}
        <div 
          className={`w-80 h-[calc(100vh-4rem)] bg-black transition-all duration-300 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed md:fixed top-[4rem] left-0 z-10`}
          style={{ backgroundColor: 'black' }}
        >
          <ChatSidebar 
            chats={chats}
            currentChatId={currentChatId}
            decisions={previousDecisions}
            decisionsLoading={decisionsLoading}
            onCreateNewChat={createNewChat}
            onSwitchChat={switchToChat}
          />
        </div>
        
        {/* Sidebar toggle button */}
        <button 
          className="fixed left-0 top-1/2 -translate-y-1/2 z-20 bg-zinc-900 text-white hover:bg-[#FF9EC5] hover:text-black w-7 h-14 flex items-center justify-center rounded-r-md border border-l-0 border-zinc-800 transition-all duration-300 cursor-pointer"
          onClick={toggleSidebar}
          style={{ 
            left: sidebarOpen ? '320px' : '0px'
          }}
        >
          {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
        
        {/* Main Chat Area */}
        <div className={`flex-1 overflow-hidden transition-all duration-300 bg-black ${
          sidebarOpen ? 'ml-80' : 'ml-0'
        }`}>
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
