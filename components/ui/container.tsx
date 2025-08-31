"use client"

import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  centerContent?: boolean
  noPadding?: boolean
}

const containerSizes = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  xl: 'max-w-[1400px]',
  full: 'max-w-full'
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'lg', centerContent = false, noPadding = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-full mx-auto",
          containerSizes[size],
          !noPadding && "px-4 sm:px-6 lg:px-8",
          centerContent && "flex items-center justify-center",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Container.displayName = "Container"

export { Container }
