"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './button'

interface NavItem {
  label: string
  href: string
  active?: boolean
}

interface NavbarProps {
  brand?: {
    name: string
    href: string
    logo?: React.ReactNode
  }
  items: NavItem[]
  actions?: React.ReactNode
  className?: string
  fixed?: boolean
  transparent?: boolean
}

export function Navbar({ 
  brand, 
  items, 
  actions, 
  className, 
  fixed = false, 
  transparent = false 
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className={cn(
      "w-full border-b border-gray-200 dark:border-gray-800",
      fixed && "fixed top-0 left-0 right-0 z-50",
      transparent ? "bg-transparent" : "bg-white dark:bg-gray-900",
      !transparent && "backdrop-blur-sm",
      className
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          {brand && (
            <Link href={brand.href} className="flex items-center space-x-2">
              {brand.logo}
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                {brand.name}
              </span>
            </Link>
          )}

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-white",
                  item.active 
                    ? "text-gray-900 dark:text-white" 
                    : "text-gray-600 dark:text-gray-400"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {actions}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4">
            <div className="flex flex-col space-y-4">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-white",
                    item.active 
                      ? "text-gray-900 dark:text-white" 
                      : "text-gray-600 dark:text-gray-400"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {actions && (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  {actions}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
