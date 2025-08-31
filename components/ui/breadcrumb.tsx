"use client"

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  label: string
  href?: string
  icon?: React.ReactNode
  active?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  showHome?: boolean
  homeHref?: string
  separator?: React.ReactNode
  className?: string
}

export function Breadcrumb({ 
  items, 
  showHome = true, 
  homeHref = '/', 
  separator = <ChevronRight className="h-4 w-4" />,
  className 
}: BreadcrumbProps) {
  const allItems = showHome 
    ? [{ label: 'Home', href: homeHref, icon: <Home className="h-4 w-4" /> }, ...items]
    : items

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center space-x-1", className)}>
      <ol className="flex items-center space-x-1">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1
          const isActive = item.active || isLast

          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <span className="mx-2 text-gray-400 dark:text-gray-600">
                  {separator}
                </span>
              )}
              
              {item.href && !isActive ? (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-1 text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-white",
                    isActive 
                      ? "text-gray-900 dark:text-white cursor-default" 
                      : "text-gray-600 dark:text-gray-400"
                  )}
                >
                  {item.icon && <span>{item.icon}</span>}
                  <span>{item.label}</span>
                </Link>
              ) : (
                <span
                  className={cn(
                    "flex items-center space-x-1 text-sm font-medium",
                    isActive 
                      ? "text-gray-900 dark:text-white" 
                      : "text-gray-600 dark:text-gray-400"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.icon && <span>{item.icon}</span>}
                  <span>{item.label}</span>
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
