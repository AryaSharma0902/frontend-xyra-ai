"use client"

import { cn } from '@/lib/utils'

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'spinner' | 'dots' | 'pulse' | 'skeleton'
  className?: string
  text?: string
}

const sizes = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12'
}

export function Loading({ size = 'md', variant = 'spinner', className, text }: LoadingProps) {
  if (variant === 'spinner') {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <div className="flex flex-col items-center space-y-2">
          <div className={cn(
            "animate-spin rounded-full border-2 border-gray-300 border-t-black dark:border-gray-600 dark:border-t-white",
            sizes[size]
          )} />
          {text && <p className="text-sm text-gray-600 dark:text-gray-400">{text}</p>}
        </div>
      </div>
    )
  }

  if (variant === 'dots') {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <div className="flex flex-col items-center space-y-2">
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={cn(
                  "bg-black dark:bg-white rounded-full animate-pulse",
                  size === 'sm' && "w-1 h-1",
                  size === 'md' && "w-2 h-2",
                  size === 'lg' && "w-3 h-3",
                  size === 'xl' && "w-4 h-4"
                )}
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '1s'
                }}
              />
            ))}
          </div>
          {text && <p className="text-sm text-gray-600 dark:text-gray-400">{text}</p>}
        </div>
      </div>
    )
  }

  if (variant === 'pulse') {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <div className="flex flex-col items-center space-y-2">
          <div className={cn(
            "bg-black dark:bg-white rounded-full animate-pulse",
            sizes[size]
          )} />
          {text && <p className="text-sm text-gray-600 dark:text-gray-400">{text}</p>}
        </div>
      </div>
    )
  }

  if (variant === 'skeleton') {
    return (
      <div className={cn("animate-pulse", className)}>
        <div className="space-y-3">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
        </div>
      </div>
    )
  }

  return null
}

// Skeleton components for specific use cases
export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("animate-pulse space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-4 bg-gray-300 dark:bg-gray-700 rounded",
            i === lines - 1 ? "w-3/4" : "w-full"
          )}
        />
      ))}
    </div>
  )
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse", className)}>
      <div className="bg-gray-300 dark:bg-gray-700 h-48 rounded-t-lg mb-4"></div>
      <div className="space-y-3 p-4">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
      </div>
    </div>
  )
}

export function SkeletonAvatar({ size = 'md', className }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const avatarSizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  return (
    <div className={cn(
      "animate-pulse bg-gray-300 dark:bg-gray-700 rounded-full",
      avatarSizes[size],
      className
    )} />
  )
}
