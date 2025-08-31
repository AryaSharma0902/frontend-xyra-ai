"use client"

import { HTMLAttributes, forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-white border-gray-200 text-gray-900 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-50",
        destructive: "border-red-500/50 text-red-900 dark:border-red-500 [&>svg]:text-red-500 bg-red-50 dark:bg-red-900/10 dark:text-red-400",
        warning: "border-yellow-500/50 text-yellow-900 dark:border-yellow-500 [&>svg]:text-yellow-500 bg-yellow-50 dark:bg-yellow-900/10 dark:text-yellow-400",
        success: "border-green-500/50 text-green-900 dark:border-green-500 [&>svg]:text-green-500 bg-green-50 dark:bg-green-900/10 dark:text-green-400",
        info: "border-blue-500/50 text-blue-900 dark:border-blue-500 [&>svg]:text-blue-500 bg-blue-50 dark:bg-blue-900/10 dark:text-blue-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants> & {
    icon?: boolean
  }
>(({ className, variant, icon = true, children, ...props }, ref) => {
  const icons = {
    default: <Info className="h-4 w-4" />,
    destructive: <AlertCircle className="h-4 w-4" />,
    warning: <AlertTriangle className="h-4 w-4" />,
    success: <CheckCircle className="h-4 w-4" />,
    info: <Info className="h-4 w-4" />
  }

  return (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      {icon && variant && icons[variant]}
      {children}
    </div>
  )
})
Alert.displayName = "Alert"

const AlertTitle = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
