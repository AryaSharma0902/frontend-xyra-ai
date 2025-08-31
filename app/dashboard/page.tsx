"use client"

import { useState, useEffect } from 'react'
import { Sidebar } from '@/components/sidebar'
import { ChatArea } from '@/components/chat-area'
import { SpacesPage } from '@/components/spaces-page'
import { DiscoverPage } from '@/components/discover-page'
import { ProjectsPage } from '@/components/projects-page'
import { InputBar } from '@/components/input-bar'
import { SettingsPopup } from '@/components/settings-popup'
import { PanelLeftOpen, MoreVertical, Bookmark, Share } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Chat {
  id: number
  title: string
  lastMessage: string
  timestamp: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [sidebarPosition, setSidebarPosition] = useState<'left' | 'right'>('left')
  const [currentMessage, setCurrentMessage] = useState<string>('')
  const [currentImages, setCurrentImages] = useState<Array<{ file: File; preview: string; id: string }>>([])
  const [currentPage, setCurrentPage] = useState<'chat' | 'spaces' | 'discover' | 'projects'>('chat')
  const [chats, setChats] = useState<Chat[]>([])
  const [nextChatId, setNextChatId] = useState(1)
  const [currentChat, setCurrentChat] = useState<Chat | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [messages, setMessages] = useState<any[]>([])

  // Check screen size for mobile behavior
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (mobile) {
        setSidebarOpen(false) // Close sidebar on mobile by default
      } else {
        setSidebarOpen(true) // Open sidebar on desktop
      }
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const toggleSidebarPosition = () => setSidebarPosition(position => position === 'left' ? 'right' : 'left')

  const handleSendMessage = (message: string, images?: Array<{ file: File; preview: string; id: string }>) => {
    setCurrentMessage(message)
    setCurrentImages(images || [])
    
    // Mark the current chat as used if it's a new chat
    if (currentChat && currentChat.title === 'New Chat' && currentChat.lastMessage === 'Start a new conversation') {
      setChats(prev => prev.map(chat => 
        chat.id === currentChat.id 
          ? { ...chat, lastMessage: message || 'Image shared' }
          : chat
      ))
    }
    
    // Reset after a short delay to allow the effect to trigger
    setTimeout(() => {
      setCurrentMessage('')
      setCurrentImages([])
    }, 100)
  }

  const handlePageChange = (page: 'chat' | 'spaces' | 'discover' | 'projects') => {
    setCurrentPage(page)
  }

  const handleSignIn = () => {
    router.push('/')
  }

  const handleNewChat = () => {
    const newChat: Chat = {
      id: nextChatId,
      title: 'New Chat',
      lastMessage: 'Start a new conversation',
      timestamp: new Date().toLocaleDateString()
    }
    setChats(prev => [...prev, newChat])
    setCurrentChat(newChat)
    setNextChatId(prev => prev + 1)
  }

  const handleDeleteChat = (chatId: number) => {
    setChats(prev => prev.filter(chat => chat.id !== chatId))
    if (currentChat && currentChat.id === chatId) {
      setCurrentChat(null)
    }
  }

  const handleSelectChat = (chat: Chat) => {
    setCurrentChat(chat)
    setCurrentPage('chat')
  }

  const renderPageContent = () => {
    switch (currentPage) {
      case 'spaces':
        return <SpacesPage />
      case 'discover':
        return <DiscoverPage />
      case 'projects':
        return <ProjectsPage chats={chats} />
      case 'chat':
      default:
        return <ChatArea newMessage={currentMessage} newImages={currentImages} currentChat={currentChat} onMessagesChange={setMessages} />
    }
  }

  return (
    <div className="h-screen bg-white dark:bg-black flex overflow-hidden relative">
      {/* Mobile Backdrop Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`${isMobile ? 'fixed inset-y-0 left-0 z-50' : 'relative'} ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <Sidebar 
          isOpen={sidebarOpen}
          position={sidebarPosition}
          onToggle={toggleSidebar}
          onTogglePosition={toggleSidebarPosition}
          onPageChange={handlePageChange}
          currentPage={currentPage}
          onSignIn={handleSignIn}
          onNewChat={handleNewChat}
          chats={chats}
          onDeleteChat={handleDeleteChat}
          currentChat={currentChat}
          onSelectChat={handleSelectChat}
          hasUnusedNewChat={chats.some(chat => chat.title === 'New Chat' && chat.lastMessage === 'Start a new conversation')}
          onOpenSettings={() => setShowSettings(true)}
        />
      </div>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col min-w-0 ${isMobile ? 'w-full' : ''}`}>
        {/* Mobile Header with Menu Button */}
        {isMobile && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600 bg-white dark:bg-black">
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleSidebar}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-5 transition-colors"
              >
                <PanelLeftOpen className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Xyra AI</h1>
            </div>
            
            {/* Mobile Action Buttons */}
            {currentPage === 'chat' && messages.length > 0 && (
              <div className="flex items-center space-x-2">
                {/* Three Dots Menu */}
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-5 transition-colors">
                  <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
                
                {/* Bookmark */}
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-5 transition-colors">
                  <Bookmark className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
                
                {/* Share */}
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-5 transition-colors">
                  <Share className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Chat Area */}
        <div className="flex-1 overflow-hidden relative">
          {/* Desktop Reopen Button - Only show when sidebar is closed on desktop */}
          {!isMobile && !sidebarOpen && (
            <button
              onClick={toggleSidebar}
              className="absolute top-4 left-4 z-10 p-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-600 rounded-5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 shadow-sm"
              title="Open sidebar"
            >
              <PanelLeftOpen className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
          )}
          
          {/* Page Content with responsive padding */}
          <div className={`h-full transition-all duration-300 ease-in-out ${
            !isMobile && sidebarOpen 
              ? 'w-full' 
              : !isMobile && !sidebarOpen
                ? 'w-full max-w-4xl mx-auto px-8'
                : 'w-full px-4'
          }`}>
            {renderPageContent()}
          </div>
        </div>

        {/* Input Bar - Only show for chat page */}
        {currentPage === 'chat' && (
          <div className="border-t border-gray-200 dark:border-gray-600">
            <InputBar onSendMessage={handleSendMessage} />
          </div>
        )}
      </div>

      {/* Settings Popup - Rendered at root level */}
      <SettingsPopup
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </div>
  )
}
