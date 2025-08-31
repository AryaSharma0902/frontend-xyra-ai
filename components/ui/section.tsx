"use client"

import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps extends HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'muted' | 'dark'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  fullHeight?: boolean
  centerContent?: boolean
}

const sectionVariants = {
  default: 'bg-white dark:bg-gray-900',
  muted: 'bg-gray-50 dark:bg-gray-950',
  dark: 'bg-gray-900 dark:bg-black text-white dark:text-white'
}

const sectionPadding = {
  none: '',
  sm: 'py-8',
  md: 'py-12',
  lg: 'py-16',
  xl: 'py-24'
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ 
    className, 
    variant = 'default', 
    padding = 'md', 
    fullHeight = false,
    centerContent = false,
    children, 
    ...props 
  }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          "w-full",
          sectionVariants[variant],
          sectionPadding[padding],
          fullHeight && "min-h-screen",
          centerContent && "flex items-center justify-center",
          className
        )}
        {...props}
      >
        {children}
      </section>
    )
  }
)
Section.displayName = "Section"

export { Section }
