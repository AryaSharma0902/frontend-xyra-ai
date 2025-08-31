"use client"

import { HTMLAttributes, forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12",
        xl: "h-16 w-16",
        "2xl": "h-20 w-20",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

interface AvatarProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string
  alt?: string
  fallback?: string
  status?: 'online' | 'offline' | 'away' | 'busy'
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, src, alt, fallback, status, ...props }, ref) => {
    const getInitials = (name?: string) => {
      if (!name) return '?'
      return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }

    const statusColors = {
      online: 'bg-green-500',
      offline: 'bg-gray-400',
      away: 'bg-yellow-500',
      busy: 'bg-red-500'
    }

    const statusSizes = {
      sm: 'h-2 w-2',
      md: 'h-2.5 w-2.5',
      lg: 'h-3 w-3',
      xl: 'h-4 w-4',
      '2xl': 'h-5 w-5'
    }

    return (
      <div ref={ref} className={cn(avatarVariants({ size }), className)} {...props}>
        {src ? (
          <img
            src={src}
            alt={alt || 'Avatar'}
            className="aspect-square h-full w-full object-cover"
            onError={(e) => {
              // Hide image on error and show fallback
              e.currentTarget.style.display = 'none'
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
            <span className="text-sm font-medium">
              {getInitials(fallback || alt)}
            </span>
          </div>
        )}
        
        {status && (
          <div className={cn(
            "absolute bottom-0 right-0 rounded-full border-2 border-white dark:border-gray-900",
            statusColors[status],
            statusSizes[size || 'md']
          )} />
        )}
      </div>
    )
  }
)
Avatar.displayName = "Avatar"

interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  max?: number
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, children, max = 5, size = 'md', ...props }, ref) => {
    const childrenArray = Array.isArray(children) ? children : [children]
    const visibleChildren = childrenArray.slice(0, max)
    const remaining = childrenArray.length - max

    return (
      <div ref={ref} className={cn("flex -space-x-2", className)} {...props}>
        {visibleChildren}
        {remaining > 0 && (
          <div className={cn(avatarVariants({ size }), "flex items-center justify-center bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border-2 border-white dark:border-gray-900")}>
            <span className="text-xs font-medium">+{remaining}</span>
          </div>
        )}
      </div>
    )
  }
)
AvatarGroup.displayName = "AvatarGroup"

export { Avatar, AvatarGroup, avatarVariants }
