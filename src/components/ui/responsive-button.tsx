'use client'

import { Button, ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface ResponsiveButtonProps extends ButtonProps {
  icon?: ReactNode
  text?: string
  showTextOnMobile?: boolean
  fullWidthOnMobile?: boolean
  touchOptimized?: boolean
}

export function ResponsiveButton({
  icon,
  text,
  showTextOnMobile = true,
  fullWidthOnMobile = false,
  touchOptimized = true,
  className,
  children,
  ...props
}: ResponsiveButtonProps) {
  return (
    <Button
      className={cn(
        'transition-all duration-200',
        touchOptimized && 'min-h-[44px] min-w-[44px]',
        fullWidthOnMobile && 'w-full sm:w-auto',
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        {icon}
        {(text || children) && (
          <span className={cn(
            showTextOnMobile ? 'block' : 'hidden sm:block'
          )}>
            {text || children}
          </span>
        )}
      </div>
    </Button>
  )
}

interface ResponsiveIconButtonProps extends Omit<ButtonProps, 'children'> {
  icon: ReactNode
  label: string
  touchOptimized?: boolean
}

export function ResponsiveIconButton({
  icon,
  label,
  touchOptimized = true,
  className,
  ...props
}: ResponsiveIconButtonProps) {
  return (
    <Button
      className={cn(
        'transition-all duration-200',
        touchOptimized && 'min-h-[44px] min-w-[44px]',
        className
      )}
      title={label}
      {...props}
    >
      {icon}
    </Button>
  )
}