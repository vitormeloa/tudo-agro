'use client'

import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  className?: string
  fullScreen?: boolean
  showLogo?: boolean
}

export default function LoadingSpinner({ 
  size = 'md', 
  text = 'Carregando...', 
  className,
  fullScreen = false,
  showLogo = true
}: LoadingSpinnerProps) {
  const logoSizeClasses = {
    sm: 'h-12 w-auto sm:h-16',
    md: 'h-20 w-auto sm:h-28 md:h-36 lg:h-44',
    lg: 'h-24 w-auto sm:h-32 md:h-40 lg:h-48'
  }

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }

  const containerClasses = fullScreen 
    ? "min-h-screen bg-gradient-to-br from-[#F7F6F2] to-[#FFFDF7] flex items-center justify-center px-4"
    : "flex items-center justify-center"

  return (
    <div className={cn(containerClasses, className)}>
      <div className="text-center">
        {/* Logo - apenas em fullScreen */}
        {fullScreen && showLogo && (
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-3">
              <img 
                src="/fotos/tudo-agro-logo.png" 
                className={cn("w-auto", logoSizeClasses[size])}
                alt="TudoAgro Logo"
              />
            </div>
          </div>
        )}

        {/* Loading Animation - estilo unificado */}
        <div className="flex items-center justify-center space-x-2">
          <div className="w-3 h-3 bg-[#6E7D5B] rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-[#6E7D5B] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-[#6E7D5B] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
        
        {text && (
          <p className={cn("mt-4 text-gray-600", textSizeClasses[size])}>
            {text}
          </p>
        )}
      </div>
    </div>
  )
}