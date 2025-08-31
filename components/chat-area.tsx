"use client"

import { useState, useEffect, useRef } from 'react'
import { Search, FileText, Image as ImageIcon, List, MoreVertical, Bookmark, Share2, Plus, FileText as FileTextIcon, FileDown, Trash2, MessageSquare } from 'lucide-react'

interface Message {
  id: number
  type: 'user' | 'ai'
  content: string
  timestamp: string
  isLoading?: boolean
  images?: Array<{ file: File; preview: string; id: string }>
}

interface Chat {
  id: number
  title: string
  lastMessage: string
  timestamp: string
}

interface ChatAreaProps {
  newMessage?: string
  newImages?: Array<{ file: File; preview: string; id: string }>
  currentChat?: Chat | null
  onMessagesChange?: (messages: Message[]) => void
}

export function ChatArea({ newMessage, newImages, currentChat, onMessagesChange }: ChatAreaProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isThinking, setIsThinking] = useState(false)
  const [activeTab, setActiveTab] = useState<'answer' | 'sources' | 'images' | 'steps'>('answer')
  const [showHeaderMenu, setShowHeaderMenu] = useState(false)
  const [showResponseMenu, setShowResponseMenu] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isIncognitoMode, setIsIncognitoMode] = useState(false)
  const [editingMessageId, setEditingMessageId] = useState<number | null>(null)
  const [editingContent, setEditingContent] = useState('')
  const [tabCounts, setTabCounts] = useState({ sources: 0, images: 0, steps: 0 })
  const [hasLoadedCounts, setHasLoadedCounts] = useState(false)
  const headerMenuRef = useRef<HTMLDivElement>(null)
  const responseMenuRef = useRef<HTMLDivElement>(null)

  // Notify parent about messages change
  useEffect(() => {
    onMessagesChange?.(messages)
  }, [messages, onMessagesChange])

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerMenuRef.current && !headerMenuRef.current.contains(event.target as Node)) {
        setShowHeaderMenu(false)
      }
      if (responseMenuRef.current && !responseMenuRef.current.contains(event.target as Node)) {
        setShowResponseMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Auto-scroll to user's message when new messages arrive
  useEffect(() => {
    if (messages.length > 0) {
      // Find the last user message
      const lastUserMessageIndex = messages.map((msg, index) => ({ msg, index }))
        .reverse()
        .find(({ msg }) => msg.type === 'user')?.index

      if (lastUserMessageIndex !== undefined) {
        // Scroll to the user message element
        const userMessageElement = document.querySelector(`[data-message-id="${messages[lastUserMessageIndex].id}"]`)
        if (userMessageElement) {
          userMessageElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center' // Center the user message in view
          })
        }
      }
    }
  }, [messages])

  // Sample AI response data
  const sampleResponse = {
    answer: "Here are the top news highlights for August 28, 2025:\n\n**Top National News:**\n• Delhi's per capita income is now close to ₹5 lakh, ranking second among Indian states.\n• The US has imposed a 50% extra duty on Indian goods; officials say that dialogue channels remain open between India and the US.\n• Vaishno Devi landslide has claimed 28 more lives, raising the Jammu and Kashmir toll to 38.\n• Water levels in several rivers are rising; the Yamuna in Delhi and the Ganga in Varanasi have reached danger marks.\n• A Delhi court has issued a non-bailable warrant against ex-RAW officer Vikash Vaday.",
    sources: [
      { name: "NDTV", url: "ndtv.com", title: "School Assembly News Headlines (Aug 28) - NDTV" },
      { name: "Jagran Josh", url: "jagranjosh.com", title: "Schools Closed in THESE States Due to Rains &..." },
      { name: "Angel One", url: "angelone.in", title: "Top Gainers and Losers on August 28, 2025: Titan,..." },
      { name: "BitMart", url: "twitter.com/bitmart", title: "BitMartExchange", verified: true }
    ],
    images: [
      { url: "/api/placeholder/300/200", alt: "Delhi News Coverage", caption: "Delhi's latest developments" },
      { url: "/api/placeholder/300/200", alt: "Weather Update", caption: "River water levels rising" },
      { url: "/api/placeholder/300/200", alt: "Economic News", caption: "Trade relations update" }
    ],
    steps: [
      "Analyzed current news sources and verified information",
      "Cross-referenced multiple news outlets for accuracy",
      "Identified key national and international developments",
      "Compiled comprehensive summary with source attribution"
    ]
  }

  // Effect to handle new messages from parent
  useEffect(() => {
    if (newMessage && newMessage.trim()) {
      addMessage(newMessage, 'user', newImages)
    }
  }, [newMessage, newImages])

  // Effect to handle new chat creation
  useEffect(() => {
    if (currentChat && currentChat.title.includes('New Chat')) {
      setMessages([])
      setIsThinking(false)
      setActiveTab('answer')
      setShowHeaderMenu(false)
      setShowResponseMenu(false)
      setIsBookmarked(false)
      setIsIncognitoMode(false)
      setTabCounts({ sources: 0, images: 0, steps: 0 })
      setHasLoadedCounts(false)
    }
  }, [currentChat])

  const addMessage = (content: string, type: 'user' | 'ai', images?: Array<{ file: File; preview: string; id: string }>) => {
    const newMessage: Message = {
      id: Date.now(),
      type,
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      images
    }
    setMessages(prev => [...prev, newMessage])

    if (type === 'user') {
      // Don't reset tab counts for existing chat to preserve the numbers
      if (messages.length === 0) {
        setTabCounts({ sources: 0, images: 0, steps: 0 })
        setHasLoadedCounts(false)
      }
      
      // Simulate AI thinking and response
      setIsThinking(true)
      setTimeout(() => {
        setIsThinking(false)
        const aiMessage: Message = {
          id: Date.now() + 1,
          type: 'ai',
          content: 'response',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isLoading: true
        }
        setMessages(prev => [...prev, aiMessage])
        
        // Simulate loading the actual response content
        setTimeout(() => {
          setMessages(prev => prev.map(msg => 
            msg.id === aiMessage.id 
              ? { ...msg, isLoading: false }
              : msg
          ))
          
          // Only load tab counts if they haven't been loaded yet
          if (!hasLoadedCounts) {
            // Progressive tab count loading
            setTimeout(() => {
              setTabCounts(prev => ({ ...prev, sources: sampleResponse.sources.length }))
            }, 500)
            setTimeout(() => {
              setTabCounts(prev => ({ ...prev, images: sampleResponse.images.length }))
            }, 1000)
            setTimeout(() => {
              setTabCounts(prev => ({ ...prev, steps: sampleResponse.steps.length }))
              setHasLoadedCounts(true)
            }, 1500)
          }
        }, 3000)
      }, 2000)
    }
  }

  const handleMenuAction = (action: string) => {
    console.log(`Action: ${action}`)
    setShowHeaderMenu(false)
    setShowResponseMenu(false)
  }

  const handleEditMessage = (messageId: number, currentContent: string) => {
    setEditingMessageId(messageId)
    setEditingContent(currentContent)
  }
  
  const handleSaveEdit = (messageId: number) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, content: editingContent }
        : msg
    ))
    setEditingMessageId(null)
    setEditingContent('')
  }
  
  const handleCancelEdit = () => {
    setEditingMessageId(null)
    setEditingContent('')
  }
  
  const handleCopyMessage = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content)
      console.log('Message copied to clipboard')
    } catch (err) {
      console.error('Failed to copy message:', err)
    }
  }

  const handleRelatedQuestion = (question: string) => {
    console.log(`Related question: ${question}`)
    // Add the question as a new user message
    addMessage(question, 'user')
  }

  // Skeleton components for different tabs
  const AnswerSkeleton = () => (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
        {/* First paragraph skeleton */}
        <div className="mb-6">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-3 animate-pulse"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5 mb-3 animate-pulse"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
        </div>
        
        {/* Second paragraph skeleton */}
        <div className="mb-6">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-3 animate-pulse"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-3 animate-pulse"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-3 animate-pulse"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
        </div>
        
        {/* Bullet points skeleton */}
        <div className="mb-6">
          <div className="flex items-start space-x-3 mb-3">
            <div className="w-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
          </div>
          <div className="flex items-start space-x-3 mb-3">
            <div className="w-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5 animate-pulse"></div>
          </div>
          <div className="flex items-start space-x-3 mb-3">
            <div className="w-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 animate-pulse"></div>
          </div>
          <div className="flex items-start space-x-3 mb-3">
            <div className="w-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
          </div>
        </div>
        
        {/* Final paragraph skeleton */}
        <div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-3 animate-pulse"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/5 animate-pulse"></div>
        </div>
      </div>
    </div>
  )

  const SourcesSkeleton = () => (
    <div className="space-y-3">
      <h4 className="font-medium text-gray-900 dark:text-gray-100">Sources:</h4>
      <div className="grid gap-3">
        {[1, 2, 3, 4].map((index) => (
          <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-5">
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center animate-pulse"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
            </div>
            <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  )

  const ImagesSkeleton = () => (
    <div className="space-y-3">
      <h4 className="font-medium text-gray-900 dark:text-gray-100">Images:</h4>
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((index) => (
          <div key={index} className="space-y-2">
            <div className="w-full h-32 bg-gray-200 dark:bg-gray-700 rounded-5 flex items-center justify-center animate-pulse">
              <ImageIcon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            </div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  )

  const StepsSkeleton = () => (
    <div className="space-y-3">
      <h4 className="font-medium text-gray-900 dark:text-gray-100">Steps:</h4>
      <div className="space-y-2">
        {[1, 2, 3, 4].map((index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'answer':
        return (
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed break-words">
              {sampleResponse.answer}
            </div>
          </div>
        )

      case 'sources':
        return (
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900 dark:text-gray-100">Sources:</h4>
            <div className="grid gap-3">
              {sampleResponse.sources.map((source, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-5">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                      {source.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                      {source.title}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {source.url}
                    </div>
                  </div>
                  {source.verified && (
                    <div className="text-gray-600 dark:text-gray-400">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )

      case 'images':
        return (
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900 dark:text-gray-100">Images:</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {sampleResponse.images.map((image, index) => (
                <div key={index} className="space-y-2">
                  <div className="w-full h-32 bg-gray-200 dark:bg-gray-700 rounded-5 flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                    {image.caption}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )

      case 'steps':
        return (
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900 dark:text-gray-100">Steps:</h4>
            <div className="space-y-2">
              {sampleResponse.steps.map((step, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                      {index + 1}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{step}</p>
                </div>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const renderSkeletonContent = () => {
    switch (activeTab) {
      case 'answer':
        return <AnswerSkeleton />
      case 'sources':
        return <SourcesSkeleton />
      case 'images':
        return <ImagesSkeleton />
      case 'steps':
        return <StepsSkeleton />
      default:
        return <AnswerSkeleton />
    }
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Top Action Bar - Fixed at very top of chat area */}
      {messages.length > 0 && (
        <div className="sticky top-0 z-10 bg-white dark:bg-black px-3 sm:px-4 py-2 sm:py-3">
          <div className="flex items-center justify-between">
            <div className="flex-1"></div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Three Dots Menu */}
              <div className="relative" ref={headerMenuRef}>
                <button
                  onClick={() => {
                    if (showHeaderMenu) {
                      setShowHeaderMenu(false)
                    } else {
                      setShowHeaderMenu(true)
                    }
                  }}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors w-8 h-8 flex items-center justify-center"
                  title="More options"
                >
                  <MoreVertical className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>

                <div className={`absolute right-0 top-full mt-2 w-48 bg-white dark:bg-black border border-gray-200 dark:border-gray-600 rounded-5 shadow-lg z-20 transition-all duration-200 ${showHeaderMenu
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 translate-y-2 pointer-events-none'
                  }`}>
                  <div className="py-1">
                    <button
                      onClick={() => handleMenuAction('add-to-space')}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors flex items-center space-x-2 rounded-t-5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add to Space</span>
                    </button>
                    <button
                      onClick={() => handleMenuAction('export-pdf')}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors flex items-center space-x-2"
                    >
                      <FileDown className="w-4 h-4" />
                      <span>Export as PDF</span>
                    </button>
                    <button
                      onClick={() => handleMenuAction('export-docs')}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors flex items-center space-x-2"
                    >
                      <FileTextIcon className="w-4 h-4" />
                      <span>Export as Docs</span>
                    </button>
                    <div className="border-t border-gray-200 dark:border-gray-600 my-1"></div>
                    <button
                      onClick={() => handleMenuAction('delete-chat')}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center space-x-2 rounded-b-5"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete Chat</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Bookmark Icon */}
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2 rounded-5 transition-colors ${isBookmarked
                  ? 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                title={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>

              {/* Share Section */}
              <button className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-5 transition-colors">
                <Share2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Share</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Content with padding */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col">

        {messages.length === 0 && (
          <div className="absolute top-6 right-6 z-20">
            <button
              onClick={() => setIsIncognitoMode(!isIncognitoMode)}
              className={`p-2 rounded-full transition-colors ${isIncognitoMode
                ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              title={isIncognitoMode ? 'Exit Incognito Mode' : 'Enter Incognito Mode'}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </button>
          </div>
        )}

        {messages.length === 0 ?
          (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-5 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-gray-500 dark:text-gray-400">X</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {isIncognitoMode ? 'Incognito Mode' : 'Welcome to Xyra AI'}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">
                {isIncognitoMode
                  ? "This chat won't appear in your history. For safety purposes, we may keep a copy of this chat for up to 30 days."
                  : "I'm here to help you with any questions, tasks, or creative projects. Start a conversation by typing below."
                }
              </p>

              {/* Quick Prompt Suggestions */}
              <div className="grid grid-cols-2 gap-3 max-w-md">
                <button className="p-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-5 text-sm text-gray-700 dark:text-gray-300 transition-colors">
                  Start researching
                </button>
                <button className="p-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-5 text-sm text-gray-700 dark:text-gray-300 transition-colors">
                  Write code
                </button>
                <button className="p-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-5 text-sm text-gray-700 dark:text-gray-300 transition-colors">
                  Generate image
                </button>
                <button className="p-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-5 text-sm text-gray-700 dark:text-gray-300 transition-colors">
                  Analyze data
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-start' : 'justify-start'}`}>
                  <div
                    data-message-id={message.id}
                    className={`max-w-4xl ${message.type === 'user' ? 'bg-black dark:bg-white text-white dark:text-black' : 'bg-white dark:bg-black border border-gray-200 dark:border-gray-600'} rounded-5 ${message.type === 'user' ? 'px-5 py-3' : 'p-6'} shadow-sm`}
                  >
                    {message.type === 'user' ? (
                      <div>
                        {/* User's text message - only show if there's actual text */}
                        {message.content && message.content.trim() && (
                          <div className="whitespace-pre-wrap text-base leading-relaxed font-medium">{message.content}</div>
                        )}
                        {/* Image Previews for User Messages - only show if there are images */}
                        {message.images && message.images.length > 0 && (
                          <div className={`flex flex-wrap gap-3 ${message.content && message.content.trim() ? 'mt-3' : 'mt-0'}`}>
                            {message.images.map((image) => (
                              <div
                                key={image.id}
                                className="inline-flex items-center space-x-3 p-3 bg-white dark:bg-gray-700 rounded-5 border border-gray-200 dark:border-gray-600 shadow-sm"
                                style={{ width: 'fit-content' }}
                              >
                                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-5 overflow-hidden flex-shrink-0">
                                  <img
                                    src={image.preview}
                                    alt="Uploaded image"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="min-w-0">
                                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate max-w-[140px]">
                                    {image.file.name}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {(image.file.size / 1024 / 1024).toFixed(2)} MB
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {/* AI Response with Tabs */}
                        <div className="border-b border-gray-200 dark:border-gray-600">
                          <div className="flex space-x-3 sm:space-x-4 lg:space-x-6 overflow-x-auto">
                            <button
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                setActiveTab('answer')
                              }}
                              className={`pb-2 px-1 border-b-2 transition-all duration-200 flex items-center space-x-1 sm:space-x-2 whitespace-nowrap text-sm sm:text-base ${activeTab === 'answer'
                                ? 'border-black dark:border-white text-black dark:text-white font-medium'
                                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                                }`}
                            >
                              <MessageSquare className="w-4 h-4" />
                              <span>Answer</span>
                            </button>

                            <button
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                setActiveTab('sources')
                              }}
                              className={`pb-2 px-1 border-b-2 transition-all duration-200 flex items-center space-x-1 sm:space-x-2 whitespace-nowrap text-sm sm:text-base ${activeTab === 'sources'
                                ? 'border-black dark:border-white text-black dark:text-white font-medium'
                                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                                }`}
                            >
                              <Search className="w-4 h-4" />
                              <span>Sources</span>
                              {tabCounts.sources > 0 && (
                              <div className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium px-2 py-1 rounded-full min-w-[20px] text-center">
                                  {tabCounts.sources}
                              </div>
                              )}
                            </button>

                            <button
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                setActiveTab('images')
                              }}
                              className={`pb-2 px-1 border-b-2 transition-all duration-200 flex items-center space-x-1 sm:space-x-2 whitespace-nowrap text-sm sm:text-base ${activeTab === 'images'
                                ? 'border-black dark:border-white text-black dark:text-white font-medium'
                                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                                }`}
                            >
                              <ImageIcon className="w-4 h-4" />
                              <span>Images</span>
                              {tabCounts.images > 0 && (
                              <div className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium px-2 py-1 rounded-full min-w-[20px] text-center">
                                  {tabCounts.images}
                              </div>
                              )}
                            </button>

                            <button
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                setActiveTab('steps')
                              }}
                              className={`pb-2 px-1 border-b-2 transition-all duration-200 flex items-center space-x-1 sm:space-x-2 whitespace-nowrap text-sm sm:text-base ${activeTab === 'steps'
                                ? 'border-black dark:border-white text-black dark:text-white font-medium'
                                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                                }`}
                            >
                              <List className="w-4 h-4" />
                              <span>Steps</span>
                              {tabCounts.steps > 0 && (
                              <div className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium px-2 py-1 rounded-full min-w-[20px] text-center">
                                  {tabCounts.steps}
                              </div>
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Tab Content */}
                        <div className="min-h-[200px]">
                          {message.isLoading ? renderSkeletonContent() : renderTabContent()}
                        </div>

                        {/* Action Buttons Below AI Response */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
                          {/* Left side - Main actions */}
                          <div className="flex items-center space-x-3">
                            <button className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-5 transition-colors">
                              <Share2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Share</span>
                            </button>
                            <button className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-5 transition-colors">
                              <FileDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Export</span>
                            </button>
                          </div>

                          {/* Right side - Feedback and options */}
                          <div className="flex items-center space-x-2">
                            {/* Like button */}
                            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                              <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                              </svg>
                            </button>

                            {/* Dislike button */}
                            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                              <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v2a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2" />
                              </svg>
                            </button>

                            {/* Copy button */}
                            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                              <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            </button>

                            {/* Three dots menu */}
                            <div className="relative" ref={responseMenuRef}>
                              <button
                                onClick={() => {
                                  if (showResponseMenu) {
                                    setShowResponseMenu(false)
                                  } else {
                                    setShowResponseMenu(true)
                                  }
                                }}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                                title="More options"
                              >
                                <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                              </button>

                              <div className={`absolute right-0 bottom-full mb-2 w-48 bg-white dark:bg-black border border-gray-200 dark:border-gray-600 rounded-5 shadow-lg z-20 transition-all duration-200 ${showResponseMenu
                                ? 'opacity-100 translate-y-0 pointer-events-auto'
                                : 'opacity-0 translate-y-2 pointer-events-none'
                                }`}>
                                <div className="py-1">
                                  <button
                                    onClick={() => handleMenuAction('view-sources')}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center space-x-2 rounded-t-5"
                                  >
                                    <Search className="w-4 h-4" />
                                    <span>View Sources</span>
                                  </button>
                                  <button
                                    onClick={() => handleMenuAction('report')}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center space-x-2"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                    <span>Report</span>
                                  </button>
                                  <div className="border-t border-gray-200 dark:border-gray-600 my-1"></div>
                                  <button
                                    onClick={() => handleMenuAction('delete')}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center space-x-2 rounded-b-5"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                    <span>Delete</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Related Questions Section */}
                        <div className="pt-6">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Related</h4>
                          <div className="space-y-3">
                            {[
                              "What are the top international headlines for today?",
                              "Which major events are driving markets today?",
                              "What important India-specific stories broke today?",
                              "What new developments in technology or science appeared today?",
                              "How are sports results and updates shaping headlines today?"
                            ].map((question, index) => (
                              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-5 transition-colors group">
                                <span className="text-sm text-gray-700 dark:text-gray-300 flex-1 pr-3">
                                  {question}
                                </span>
                                <button
                                  onClick={() => handleRelatedQuestion(question)}
                                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                                  title="Ask this question"
                                >
                                  <Plus className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Thinking Spinner */}
              {isThinking && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-600 rounded-5 p-4 shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 border-2 border-gray-300 dark:border-gray-600 border-t-gray-600 dark:border-t-gray-300 rounded-full animate-spin"></div>
                      <span className="text-gray-600 dark:text-gray-300">Xyra AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
      </div>
    </div>
  )
} 