"use client"

import { useState, useEffect, useRef } from 'react'
import { Send, Search, Zap, Upload, Image, Sparkles, ChevronDown, BookOpen, Youtube, MessageSquare, TrendingUp, Bitcoin, Paperclip, Mic } from 'lucide-react'

interface InputBarProps {
  onSendMessage?: (message: string, images?: Array<{ file: File; preview: string; id: string }>) => void
}

export function InputBar({ onSendMessage }: InputBarProps) {
  const [message, setMessage] = useState('')
  const [selectedSearchMode, setSelectedSearchMode] = useState('search')
  const [selectedModel, setSelectedModel] = useState('best')
  const [showSearchDropdown, setShowSearchDropdown] = useState(false)
  const [showModelDropdown, setShowModelDropdown] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<{ id: string; file: File; preview: string }[]>([])
  const [tooltipText, setTooltipText] = useState('')
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0, buttonCenterX: 0 })
  const [showTooltip, setShowTooltip] = useState(false)

  const searchDropdownRef = useRef<HTMLDivElement>(null)
  const modelDropdownRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Auto-resize textarea
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
    adjustTextareaHeight()
  }

  const searchModes = [
    { id: 'search', name: 'Search', description: 'General web search', icon: Search },
    { id: 'deep-research', name: 'Deep Research', description: 'Comprehensive analysis', icon: Zap },
    { id: 'academic', name: 'Academic', description: 'Research papers & studies', icon: BookOpen },
    { id: 'youtube', name: 'YouTube', description: 'Video content search', icon: Youtube },
    { id: 'reddit', name: 'Reddit Posts', description: 'Community discussions', icon: MessageSquare },
    { id: 'stocks', name: 'Stocks', description: 'Market data & analysis', icon: TrendingUp },
    { id: 'crypto', name: 'Crypto', description: 'Cryptocurrency insights', icon: Bitcoin },
  ]

  const aiModels = [
    { id: 'best', name: 'Best', description: 'Auto-select best model' },
    { id: 'gpt-4', name: 'GPT-5', description: 'Most capable model' },
    { id: 'gpt-3.5', name: 'Deepseek V3', description: 'Fast and efficient' },
    { id: 'claude-3', name: 'Claude Sonnet 4.1', description: 'Advanced reasoning' },
    { id: 'gemini', name: 'Gemini 2.5 Pro', description: 'Multimodal AI' },
  ]

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchDropdownRef.current && !searchDropdownRef.current.contains(event.target as Node)) {
        setShowSearchDropdown(false)
      }
      if (modelDropdownRef.current && !modelDropdownRef.current.contains(event.target as Node)) {
        setShowModelDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSend = () => {
    if (message.trim() || uploadedImages.length > 0) {
      if (onSendMessage) {
        // Send only the user's text message (can be empty), images are handled separately
        onSendMessage(message || '', uploadedImages)
      }
      setMessage('')
      setUploadedImages([])
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const getSearchModeIcon = (modeId: string) => {
    const mode = searchModes.find(m => m.id === modeId)
    if (mode) {
      const IconComponent = mode.icon
      return <IconComponent className="w-5 h-5" />
    }
    return <Search className="w-5 h-5" />
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const newImages = files.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      file,
      preview: URL.createObjectURL(file),
    }))
    setUploadedImages(prev => [...prev, ...newImages])
  }

  const removeImage = (id: string) => {
    setUploadedImages(prev => prev.filter(img => img.id !== id))
  }

  const showTooltipHandler = (text: string, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const tooltipWidth = 200 // Approximate tooltip width
    const tooltipHeight = 40 // Approximate tooltip height

    // Calculate initial position
    let x = rect.left + rect.width / 2
    let y = rect.top - 45

    // Store the button's center position for arrow alignment
    const buttonCenterX = rect.left + rect.width / 2

    // Check if tooltip would go outside left edge
    if (x - tooltipWidth / 2 < 10) {
      x = tooltipWidth / 2 + 10
    }

    // Check if tooltip would go outside right edge
    if (x + tooltipWidth / 2 > window.innerWidth - 10) {
      x = window.innerWidth - tooltipWidth / 2 - 10
    }

    // Check if tooltip would go outside top edge
    if (y - tooltipHeight < 10) {
      y = rect.bottom + 10
    }

    // For send button, always position directly above the button
    if (text === 'Send') {
      x = rect.left + rect.width / 2
      y = rect.top - 45
    }

    setTooltipText(text)
    setTooltipPosition({ x, y, buttonCenterX })
    setShowTooltip(true)
  }

  const hideTooltip = () => {
    setShowTooltip(false)
  }

  return (
    <div className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-600 p-3 sm:p-4">
      <div className="max-w-6xl mx-auto">
        {/* Mobile Dropdowns Row - Only visible on mobile */}
        <div className="sm:hidden mb-3 flex items-center space-x-2">
          {/* Mobile Search Mode Dropdown */}
          <div className="relative flex-1">
            <button
              onClick={() => setShowSearchDropdown(!showSearchDropdown)}
              className="w-full p-2.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-5 transition-all duration-200 flex items-center justify-between"
            >
              <div className="flex items-center space-x-2">
                {getSearchModeIcon(selectedSearchMode)}
                <span className="text-sm font-medium truncate">{searchModes.find(m => m.id === selectedSearchMode)?.name}</span>
              </div>
              <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${showSearchDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showSearchDropdown && (
              <div className="absolute bottom-full left-0 mb-2 w-full bg-white dark:bg-black border border-gray-200 dark:border-gray-600 rounded-5 shadow-lg z-20">
                <div className="max-h-48 overflow-y-auto">
                  {searchModes.map((mode, index) => {
                    const IconComponent = mode.icon
                    const isFirst = index === 0
                    const isLast = index === searchModes.length - 1
                    return (
                      <button
                        key={mode.id}
                        onClick={() => {
                          setSelectedSearchMode(mode.id)
                          setShowSearchDropdown(false)
                        }}
                        className={`w-full text-left px-3 py-2.5 transition-colors flex items-center space-x-2 ${isFirst ? 'rounded-t-5' : ''
                          } ${isLast ? 'rounded-b-5' : ''
                          } ${selectedSearchMode === mode.id
                            ? 'bg-black dark:bg-white text-white dark:text-black'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                          }`}
                      >
                        <IconComponent className={`w-4 h-4 flex-shrink-0 ${selectedSearchMode === mode.id ? 'text-white dark:text-black' : 'text-gray-500 dark:text-gray-400'
                          }`} />
                        <div className="flex-1 min-w-0">
                          <div className={`text-sm font-medium ${selectedSearchMode === mode.id ? 'text-white dark:text-black' : 'text-gray-900 dark:text-gray-100'
                            }`}>{mode.name}</div>
                          <div className={`text-xs ${selectedSearchMode === mode.id ? 'text-gray-200 dark:text-gray-800' : 'text-gray-500 dark:text-gray-400'
                            }`}>{mode.description}</div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Mobile AI Model Dropdown */}
          <div className="relative flex-1">
            <button
              onClick={() => setShowModelDropdown(!showModelDropdown)}
              className="w-full p-2.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-5 transition-all duration-200 flex items-center justify-between"
            >
              <span className="text-sm font-medium truncate">{aiModels.find(m => m.id === selectedModel)?.name}</span>
              <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${showModelDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showModelDropdown && (
              <div className="absolute bottom-full right-0 mb-2 w-full bg-white dark:bg-black border border-gray-200 dark:border-gray-600 rounded-5 shadow-lg z-20">
                <div className="max-h-48 overflow-y-auto">
                  {aiModels.map((model, index) => {
                    const isFirst = index === 0
                    const isLast = index === aiModels.length - 1
                    return (
                      <button
                        key={model.id}
                        onClick={() => {
                          setSelectedModel(model.id)
                          setShowModelDropdown(false)
                        }}
                        className={`w-full text-left px-3 py-2.5 transition-colors ${isFirst ? 'rounded-t-5' : ''
                          } ${isLast ? 'rounded-b-5' : ''
                          } ${selectedModel === model.id
                            ? 'bg-black dark:bg-white text-white dark:text-black'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                          }`}
                      >
                        <div className={`text-sm font-medium ${selectedModel === model.id ? 'text-white dark:text-black' : 'text-gray-900 dark:text-gray-100'
                          }`}>{model.name}</div>
                        <div className={`text-xs ${selectedModel === model.id ? 'text-gray-200 dark:text-gray-800' : 'text-gray-500 dark:text-gray-400'
                          }`}>{model.description}</div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Input Row */}
        <div className="flex flex-col space-y-2 sm:space-y-3">
          {/* Input Field with Controls Inside */}
          <div className="relative">
            {/* Image Previews */}
            {uploadedImages.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {uploadedImages.map((image) => (
                  <div
                    key={image.id}
                    className="inline-flex items-center space-x-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-5 border border-gray-200 dark:border-gray-600"
                    style={{ width: 'fit-content' }}
                  >
                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-5 overflow-hidden flex-shrink-0">
                      <img
                        src={image.preview}
                        alt="Uploaded preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate max-w-[120px]">
                        {image.file.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {(image.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      onClick={() => removeImage(image.id)}
                      className="p-1 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors flex-shrink-0"
                      title="Remove image"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Main Input Field */}
            <textarea
              value={message}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Ask Xyra AI"
              className="xyra-input resize-none min-h-[50px] sm:min-h-[60px] max-h-32 w-full pr-[120px] sm:pr-[300px] lg:pr-[400px]"
              rows={1}
              ref={textareaRef}
            />

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              multiple
              className="hidden"
            />

            {/* Controls Positioned Inside Input Field */}
            <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 flex items-center space-x-1 sm:space-x-2">
              
              {/* Search Modes Dropdown */}
              <div className="relative hidden sm:block" ref={searchDropdownRef}>
                <button
                  onClick={() => setShowSearchDropdown(!showSearchDropdown)}
                  onMouseEnter={(e) => showTooltipHandler('Select Mode', e)}
                  onMouseLeave={hideTooltip}
                  className="p-1.5 sm:p-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-5 transition-all duration-200 flex items-center space-x-1 sm:space-x-2 min-w-[80px] sm:min-w-[100px] justify-between"
                >
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    {getSearchModeIcon(selectedSearchMode)}
                    <span className="text-xs font-medium truncate hidden lg:inline">{searchModes.find(m => m.id === selectedSearchMode)?.name}</span>
                  </div>
                  <ChevronDown className={`w-4 sm:w-5 h-4 sm:h-5 flex-shrink-0 transition-transform duration-200 ${showSearchDropdown ? 'rotate-180' : ''}`} />
                </button>

                <div className={`absolute bottom-full right-0 mb-2 w-56 bg-white dark:bg-black border border-gray-200 dark:border-gray-600 rounded-5 shadow-lg z-10 transition-all duration-200 ${showSearchDropdown
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 translate-y-2 pointer-events-none'
                  }`}>
                  <div className="max-h-64 overflow-y-auto scrollbar-hide">

                    {searchModes.map((mode, index) => {
                      const IconComponent = mode.icon
                      const isFirst = index === 0
                      const isLast = index === searchModes.length - 1
                      return (
                        <button
                          key={mode.id}
                          onClick={() => {
                            setSelectedSearchMode(mode.id)
                            setShowSearchDropdown(false)
                          }}
                          className={`w-full text-left px-3 py-2 transition-colors flex items-center space-x-2.5 ${isFirst ? 'rounded-t-5' : ''
                            } ${isLast ? 'rounded-b-5' : ''
                            } ${selectedSearchMode === mode.id
                              ? 'bg-black dark:bg-white text-white dark:text-black'
                              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                            }`}
                        >
                          <IconComponent className={`w-5 h-5 flex-shrink-0 ${selectedSearchMode === mode.id ? 'text-white dark:text-black' : 'text-gray-500 dark:text-gray-400'
                            }`} />
                          <div>
                            <div className={`font-medium ${selectedSearchMode === mode.id ? 'text-white dark:text-black' : 'text-gray-900 dark:text-gray-100'
                              }`}>{mode.name}</div>
                            <div className={`text-xs ${selectedSearchMode === mode.id ? 'text-gray-200 dark:text-gray-800' : 'text-gray-500 dark:text-gray-400'
                              }`}>{mode.description}</div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* AI Models Dropdown */}
              <div className="relative hidden lg:block" ref={modelDropdownRef}>
                <button
                  onClick={() => setShowModelDropdown(!showModelDropdown)}
                  onMouseEnter={(e) => showTooltipHandler('Select AI Model', e)}
                  onMouseLeave={hideTooltip}
                  className="p-1.5 sm:p-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-5 transition-all duration-200 flex items-center space-x-1 min-w-[60px] sm:min-w-[80px] justify-between"
                >
                  <span className="text-xs font-medium truncate">{aiModels.find(m => m.id === selectedModel)?.name}</span>
                  <ChevronDown className={`w-4 sm:w-5 h-4 sm:h-5 flex-shrink-0 transition-transform duration-200 ${showModelDropdown ? 'rotate-180' : ''}`} />
                </button>

                <div className={`absolute bottom-full right-0 mb-2 w-52 bg-white dark:bg-black border border-gray-200 dark:border-gray-600 rounded-5 shadow-lg z-10 transition-all duration-200 ${showModelDropdown
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 translate-y-2 pointer-events-none'
                  }`}>
                  <div className="max-h-64 overflow-y-auto scrollbar-hide">
                    {aiModels.map((model, index) => {
                      const isFirst = index === 0
                      const isLast = index === aiModels.length - 1
                      return (
                        <button
                          key={model.id}
                          onClick={() => {
                            setSelectedModel(model.id)
                            setShowModelDropdown(false)
                          }}
                          className={`w-full text-left px-3 py-2 transition-colors ${isFirst ? 'rounded-t-5' : ''
                            } ${isLast ? 'rounded-b-5' : ''
                            } ${selectedModel === model.id
                              ? 'bg-black dark:bg-white text-white dark:text-black'
                              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                            }`}
                        >
                          <div className={`font-medium ${selectedModel === model.id ? 'text-white dark:text-black' : 'text-gray-900 dark:text-gray-100'
                            }`}>{model.name}</div>
                          <div className={`text-xs ${selectedModel === model.id ? 'text-gray-200 dark:text-gray-800' : 'text-gray-500 dark:text-gray-400'
                            }`}>{model.description}</div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Upload Image Button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                onMouseEnter={(e) => showTooltipHandler('Upload Image', e)}
                onMouseLeave={hideTooltip}
                className="p-1.5 sm:p-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-5 transition-all duration-200"
              >
                <Upload className="w-4 sm:w-5 h-4 sm:h-5" />
              </button>

              {/* Upload Document Button - Hidden on small screens */}
              <button
                onMouseEnter={(e) => showTooltipHandler('Upload Document', e)}
                onMouseLeave={hideTooltip}
                className="hidden sm:block p-1.5 sm:p-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-5 transition-all duration-200"
              >
                <Paperclip className="w-4 sm:w-5 h-4 sm:h-5" />
              </button>

              {/* Enhance Prompt Button - Hidden on small screens */}
              <button
                onMouseEnter={(e) => showTooltipHandler('Enhance Prompt', e)}
                onMouseLeave={hideTooltip}
                className="hidden md:block p-1.5 sm:p-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-5 transition-all duration-200"
              >
                <Sparkles className="w-4 sm:w-5 h-4 sm:h-5" />
              </button>

              {/* Voice Assistant Button */}
              <button
                onMouseEnter={(e) => showTooltipHandler('Voice Assistant', e)}
                onMouseLeave={hideTooltip}
                className="p-1.5 sm:p-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-5 transition-all duration-200"
              >
                <Mic className="w-4 sm:w-5 h-4 sm:h-5" />
              </button>

              {/* Send Button */}
              <button
                onClick={handleSend}
                disabled={!message.trim() && uploadedImages.length === 0}
                onMouseEnter={(e) => showTooltipHandler('Send', e)}
                onMouseLeave={hideTooltip}
                className="p-1.5 sm:p-2 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-5 transition-all duration-200"
              >
                <Send className="w-4 sm:w-5 h-4 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Tooltip */}
      {showTooltip && (
        <div
          className="fixed z-50 px-4 py-2.5 text-sm font-medium text-white bg-black dark:bg-white dark:text-black rounded-5 shadow-2xl pointer-events-none transition-all duration-200 opacity-100 scale-100 whitespace-nowrap"
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            transform: 'translateX(-50%)'
          }}
        >
          {tooltipText}

        </div>
      )}
    </div>
  )
}
