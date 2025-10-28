'use client'

import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  className?: string
  fullScreen?: boolean
}

export default function LoadingSpinner({ 
  size = 'md', 
  text = 'Carregando...', 
  className,
  fullScreen = false
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  }

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }

  const containerClasses = fullScreen 
    ? "min-h-screen bg-[#F7F6F2] flex items-center justify-center"
    : "flex items-center justify-center"

  return (
    <div className={cn(containerClasses, className)}>
      <div className="text-center">
        <div className={cn(
          "animate-spin rounded-full border-b-2 border-[#1E4D2B] mx-auto",
          fullScreen ? "mb-4" : "mb-2",
          sizeClasses[size]
        )}></div>
        {text && (
          <p className={cn("text-[#6E7D5B]", textSizeClasses[size])}>
            {text}
          </p>
        )}
      </div>
    </div>
  )
}