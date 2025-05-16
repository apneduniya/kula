'use client';

import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarFooter,
  SidebarSeparator,
} from './ui/sidebar';
import { Plus as PlusIcon } from 'lucide-react';

interface Decision {
  id: number;
  title: string | null;
  isResolved: boolean | null;
  passPrice: number | null;
  failPrice: number | null;
  chatId: string | number | null;
}

interface ChatData {
  id: string | number;
  createdAt: Date;
}

interface ChatSidebarProps {
  chats: ChatData[];
  currentChatId: string | number;
  decisions: Decision[];
  decisionsLoading: boolean;
  onCreateNewChat: () => void;
  onSwitchChat: (chatId: string | number) => void;
}

export default function ChatSidebar({
  chats,
  currentChatId,
  decisions,
  decisionsLoading,
  onCreateNewChat,
  onSwitchChat,
}: ChatSidebarProps) {
  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - new Date(date).getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };

  return (
    <div className="h-full bg-black flex flex-col">
      <SidebarProvider defaultOpen={true}>
        <Sidebar className="border-r border-zinc-800 bg-black h-full flex flex-col">
          <SidebarHeader className="flex h-16 items-center border-b border-zinc-800 px-6 bg-black flex-shrink-0">
            <h2 className="text-lg font-medium text-white">Chats</h2>
          </SidebarHeader>
          
          <SidebarContent className="bg-black overflow-y-auto flex-grow">
            <SidebarGroup>
              <div className="flex items-center justify-between px-6 py-4 mt-2">
                <SidebarGroupLabel className="text-sm font-medium text-zinc-400">
                  Recent
                </SidebarGroupLabel>
                <button
                  onClick={onCreateNewChat}
                  className="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-900 text-white hover:bg-[#FF9EC5] hover:text-black transition-colors cursor-pointer"
                  title="New chat"
                >
                  <PlusIcon size={16} />
                </button>
              </div>
              
              <SidebarGroupContent className="space-y-2 px-3">
                <SidebarMenu>
                  {chats.map((chat) => (
                    <SidebarMenuItem key={chat.id} className="my-1">
                      <div
                        onClick={() => onSwitchChat(chat.id)}
                        className={`px-4 py-3 rounded-md cursor-pointer transition-colors ${
                          chat.id === currentChatId 
                            ? 'bg-[#FF9EC5]/20 hover:bg-[#FF9EC5]/30 border border-[#FF9EC5]/40' 
                            : 'hover:bg-zinc-900'
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className={`font-medium ${chat.id === currentChatId ? 'text-[#FF9EC5]' : 'text-white'}`}>
                            Chat {chats.indexOf(chat) + 1}
                          </span>
                          <span className="text-xs text-zinc-400 mt-1">
                            {getTimeAgo(chat.createdAt)}
                          </span>
                        </div>
                      </div>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarSeparator className="my-4 bg-zinc-800" />
            
            <SidebarGroup>
              <div className="px-6 py-4">
                <SidebarGroupLabel className="text-sm font-medium text-zinc-400">
                  Decision Markets
                </SidebarGroupLabel>
              </div>
              
              <SidebarGroupContent className="space-y-2 px-3">
                {decisionsLoading ? (
                  <div className="px-5 py-3 text-sm text-zinc-400">
                    Loading decisions...
                  </div>
                ) : decisions.length > 0 ? (
                  <SidebarMenu>
                    {decisions.map((decision) => (
                      <SidebarMenuItem key={decision.id} className="my-1">
                        <div className="px-4 py-3 rounded-md hover:bg-zinc-900 cursor-pointer transition-colors">
                          <p className="text-sm font-medium text-white">
                            {decision.title || 'Untitled Decision'}
                          </p>
                          <div className="flex justify-between text-xs text-zinc-400 mt-2">
                            <span>Created {getTimeAgo(new Date())}</span>
                            <span className={decision.isResolved ? 'text-green-500' : 'text-[#FF9EC5]'}>
                              {decision.isResolved ? 'Resolved' : 'Active'}
                            </span>
                          </div>
                        </div>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                ) : (
                  <div className="px-5 py-3 text-sm text-zinc-400">
                    No decision markets found.
                  </div>
                )}
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="border-t border-zinc-800 p-6 bg-black mt-auto flex-shrink-0">
            <div className="text-xs text-zinc-500">
              Kula Futarchy Markets
            </div>
          </SidebarFooter>
        </Sidebar>
      </SidebarProvider>
    </div>
  );
} 