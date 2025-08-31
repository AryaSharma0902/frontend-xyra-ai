"use client"

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, MessageSquare, Settings, LogIn, PanelLeftClose, FolderOpen, Compass, MoreVertical, Edit, Trash2, Crown, Gem, Briefcase, FolderPlus } from 'lucide-react'
import { ThemeToggle } from './theme-toggle'


interface Chat {
  id: number
  title: string
  lastMessage: string
  timestamp: string
}

interface SidebarProps {
  isOpen: boolean
  position: 'left' | 'right'
  onToggle: () => void
  onTogglePosition: () => void
  onPageChange: (page: 'chat' | 'spaces' | 'discover' | 'projects') => void
  currentPage: 'chat' | 'spaces' | 'discover' | 'projects'
  onSignIn: () => void
  onNewChat: () => void
  chats: Chat[]
  onDeleteChat: (chatId: number) => void
  currentChat: Chat | null
  onSelectChat: (chat: Chat) => void
  hasUnusedNewChat: boolean
  onOpenSettings: () => void
}

export function Sidebar({ isOpen, position, onToggle, onTogglePosition, onPageChange, currentPage, onSignIn, onNewChat, chats, onDeleteChat, currentChat, onSelectChat, hasUnusedNewChat, onOpenSettings }: SidebarProps) {
  const router = useRouter()
  const [openMenuId, setOpenMenuId] = useState<number | null>(null)

  const menuRef = useRef<HTMLDivElement>(null)

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  if (!isOpen) return null

  const handleMenuAction = (chatId: number, action: string) => {
    if (action === 'delete') {
      onDeleteChat(chatId)
    }
    setOpenMenuId(null)
  }

  const handleNewChat = () => {
    if (hasUnusedNewChat) {
      return // Don't allow creating new chat if there's an unused one
    }
    onNewChat()
    onPageChange('chat')
  }

  return (
    <div className={`
      w-80 sm:w-80 bg-white dark:bg-black border-r border-gray-200 dark:border-white/20
      flex flex-col h-full transition-all duration-300 ease-in-out
      ${position === 'left' ? 'border-r' : 'border-l'}
    `}>
      {/* Header with Xyra AI title, close button, and theme toggle */}
      <div className="p-4 border-b border-gray-200 dark:border-white/20">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Xyra AI</h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={onToggle}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-5 transition-colors"
              title="Close sidebar"
            >
              <PanelLeftClose className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="p-3 sm:p-4 space-y-2 sm:space-y-3 border-b border-gray-200 dark:border-white/20">
        <button
          onClick={() => onPageChange('spaces')}
          className={`w-full flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 rounded-5 transition-all duration-200 text-sm sm:text-base ${currentPage === 'spaces'
              ? 'bg-black dark:bg-white text-white dark:text-black'
              : 'bg-gray-100 dark:bg-black text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-white/10'
            }`}
        >
          <FolderOpen className="w-4 h-4" />
          <span>Spaces</span>
        </button>

        <button
          onClick={() => onPageChange('discover')}
          className={`w-full flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 rounded-5 transition-all duration-200 text-sm sm:text-base ${currentPage === 'discover'
              ? 'bg-black dark:bg-white text-white dark:text-black'
              : 'bg-gray-100 dark:bg-black text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-white/10'
            }`}
        >
          <Compass className="w-4 h-4" />
          <span>Discover</span>
        </button>

        <button
          onClick={() => onPageChange('projects')}
          className={`w-full flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 rounded-5 transition-all duration-200 text-sm sm:text-base ${currentPage === 'projects'
              ? 'bg-black dark:bg-white text-white dark:text-black'
              : 'bg-gray-100 dark:bg-black text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-white/10'
            }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Projects</span>
        </button>

        <button
          onClick={handleNewChat}
          disabled={hasUnusedNewChat}
          className={`w-full flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 rounded-5 transition-all duration-200 text-sm sm:text-base ${hasUnusedNewChat
              ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              : currentPage === 'chat'
                ? 'bg-black dark:bg-white text-white dark:text-black'
                : 'bg-gray-100 dark:bg-black text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-white/10'
            }`}
          title={hasUnusedNewChat ? "Please use the existing new chat first" : "Create a new chat"}
        >
          <Plus className="w-4 h-4" />
          <span>New Chat</span>
        </button>
      </div>

      {/* Chat List - Always visible */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-3 sm:p-4 space-y-2">
          {chats.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="w-8 h-8 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
              <p className="text-sm text-gray-500 dark:text-gray-400">No chats yet</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">Start a conversation to see it here</p>
            </div>
          ) : (
            chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => onSelectChat(chat)}
                                className={`group relative p-2 sm:p-3 rounded-5 cursor-pointer transition-all duration-200 ${currentChat && currentChat.id === chat.id
                     ? 'bg-black dark:bg-white text-white dark:text-black'
                     : 'hover:bg-gray-100 dark:hover:bg-white/10'
                   }`}
              >
                <div className="flex items-center space-x-2">
                  <MessageSquare className={`w-4 h-4 ${currentChat && currentChat.id === chat.id
                      ? 'text-white dark:text-black'
                      : 'text-gray-500 dark:text-gray-400'
                    }`} />
                  <div className="flex-1 min-w-0">
                                         <h3 className={`text-xs sm:text-sm font-medium truncate ${currentChat && currentChat.id === chat.id
                         ? 'text-white dark:text-black'
                         : 'text-gray-900 dark:text-gray-100'
                       }`}>
                       {chat.title}
                     </h3>
                     <p className={`text-xs truncate ${currentChat && currentChat.id === chat.id
                         ? 'text-white/70 dark:text-black/70'
                         : 'text-gray-500 dark:text-white/70'
                       }`}>
                       {chat.lastMessage}
                     </p>
                  </div>

                  {/* Three Dots Menu */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      if (openMenuId === chat.id) {
                        setOpenMenuId(null)
                      } else {
                        setOpenMenuId(chat.id)
                      }
                    }}
                    className={`opacity-0 group-hover:opacity-100 w-6 h-6 rounded-full transition-colors flex items-center justify-center ${currentChat && currentChat.id === chat.id
                        ? 'hover:bg-gray-800 dark:hover:bg-gray-200'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    title="More options"
                  >
                    <MoreVertical className={`w-3 h-3 ${currentChat && currentChat.id === chat.id
                        ? 'text-white dark:text-black'
                        : 'text-gray-500 dark:text-gray-400'
                      }`} />
                  </button>
                </div>

                {/* Dropdown Menu */}
                {
                  openMenuId === chat.id && (
                    <div ref={menuRef} className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-black border border-gray-200 dark:border-gray-600 rounded-5 shadow-lg z-20 transition-all duration-200 opacity-100 translate-y-0" >
                      <div className="py-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleMenuAction(chat.id, 'edit')
                          }}
                          className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors flex items-center space-x-2 rounded-t-5"
                        >
                          <Edit className="w-4 h-4" />
                          <span>Rename</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleMenuAction(chat.id, 'add-to-space')
                          }}
                          className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors flex items-center space-x-2"
                        >
                          <FolderOpen className="w-4 h-4" />
                          <span>Add to Space</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleMenuAction(chat.id, 'add-to-project')
                          }}
                          className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors flex items-center space-x-2"
                        >
                          <Briefcase className="w-4 h-4" />
                          <span>Add to Project</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleMenuAction(chat.id, 'delete')
                          }}
                          className="w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center space-x-2 rounded-b-5"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  )
                }
              </div>
            ))
          )}
        </div>
      </div>

      {/* Footer - Always visible and fixed */}
      <div className="p-3 sm:p-4 border-t border-gray-200 dark:border-white/20">
        <div className="flex items-center space-x-2">
          {/* Sign In: outlined, icon + text */}
          <button
            onClick={onSignIn}
            className="flex-1 min-w-0 h-10 sm:h-11 rounded-5 border border-gray-300 dark:border-white/20 bg-white dark:bg-black text-black dark:text-white flex items-center justify-center space-x-1 sm:space-x-2 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          >
            <LogIn className="w-4 sm:w-5 h-4 sm:h-5" />
            <span className="text-xs sm:text-sm font-medium hidden sm:inline">Sign In</span>
          </button>

          {/* Upgrade: filled primary, icon + text */}
          <button
            onClick={() => router.push('/upgrade')}
            className="flex-1 min-w-0 h-10 sm:h-11 rounded-5 bg-black text-white dark:bg-white dark:text-black flex items-center justify-center space-x-1 sm:space-x-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            title="Upgrade">
            <Gem className="w-4 sm:w-5 h-4 sm:h-5" />
            <span className="text-xs sm:text-sm font-semibold hidden sm:inline">Upgrade</span>
          </button>

          {/* Settings: icon-only circular */}
          <button
            onClick={onOpenSettings}
            className="h-10 w-10 sm:h-11 sm:w-11 rounded-full border border-gray-300 dark:border-white/20 bg-white dark:bg-black hover:bg-gray-100 dark:hover:bg-white/10 flex items-center justify-center transition-colors"
            title="Settings"
            aria-label="Settings"
          >
            <Settings className="w-4 sm:w-5 h-4 sm:h-5 text-black dark:text-white" />
          </button>
        </div>
      </div>


    </div>
  )
}
