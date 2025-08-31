"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Chrome, Github, Twitter, Loader2 } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

export default function LoginPage() {
  const router = useRouter()
  const [loadingStates, setLoadingStates] = useState({
    google: false,
    github: false,
    twitter: false
  })
  const [isIncognitoMode, setIsIncognitoMode] = useState(false)

  const handleLogin = async (provider: string) => {
    // Set loading state for specific provider
    setLoadingStates(prev => ({ ...prev, [provider]: true }))
    
    setTimeout(() => { 
      setLoadingStates(prev => ({ ...prev, [provider]: false }))
      console.log(`Logging in with ${provider}`)
      // After login, redirect to dashboard
      router.push('/dashboard')
    }, 2000)
  }

  const getButtonContent = (provider: string) => {
    const isLoading = loadingStates[provider as keyof typeof loadingStates]
    
    if (!isLoading) {
      // Return normal button content
      switch (provider) {
        case 'google':
          return (
            <>
              <Chrome className="w-5 h-5" />
              <span>Sign in with Google</span>
            </>
          )
        case 'github':
          return (
            <>
              <Github className="w-5 h-5" />
              <span>Sign in with GitHub</span>
            </>
          )
        case 'twitter':
          return (
            <>
              <Twitter className="w-5 h-5" />
              <span>Sign in with X</span>
            </>
          )
        default:
          return null
      }
    } else {
      // Return loading state content
      switch (provider) {
        case 'google':
          return (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Signing in with Google...</span>
            </>
          )
        case 'github':
          return (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Signing in with GitHub...</span>
            </>
          )
        case 'twitter':
          return (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Signing in with X...</span>
            </>
          )
        default:
          return null
      }
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="absolute top-6 right-6">
          <ThemeToggle />
        </div>
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-black dark:bg-white rounded-5 mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl font-bold text-white dark:text-black">X</span>
          </div>
          <h1 className="text-3xl font-bold text-black dark:text-white mb-2">Xyra AI</h1>
          <p className="text-gray-600 dark:text-gray-400">Professional AI Assistant</p>
        </div>
        <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-600 rounded-5 p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-center mb-6 text-black dark:text-white">Sign in to continue</h2>
          <div className="space-y-4">
            <button 
              onClick={() => handleLogin('google')} 
              disabled={loadingStates.google || loadingStates.github || loadingStates.twitter} 
              className="w-full xyra-button flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {getButtonContent('google')}
            </button>
            <button 
              onClick={() => handleLogin('github')} 
              disabled={loadingStates.google || loadingStates.github || loadingStates.twitter} 
              className="w-full xyra-button-secondary flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {getButtonContent('github')}
            </button>
            <button 
              onClick={() => handleLogin('twitter')} 
              disabled={loadingStates.google || loadingStates.github || loadingStates.twitter} 
              className="w-full xyra-button-secondary flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {getButtonContent('twitter')}
            </button>
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              By signing in, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
