'use client'

import { ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface ResponsiveCardProps {
  title?: string
  icon?: ReactNode
  children: ReactNode
  className?: string
  headerClassName?: string
  contentClassName?: string
  onClick?: () => void
  hoverable?: boolean
}

export function ResponsiveCard({
  title,
  icon,
  children,
  className,
  headerClassName,
  contentClassName,
  onClick,
  hoverable = false
}: ResponsiveCardProps) {
  return (
    <Card 
      className={cn(
        'transition-all duration-200',
        hoverable && 'hover:shadow-lg',
        onClick && 'cursor-pointer active:scale-[0.98]',
        className
      )}
      onClick={onClick}
    >
      {(title || icon) && (
        <CardHeader className={cn('pb-3', headerClassName)}>
          <CardTitle className={cn(
            'flex items-center gap-2 text-base sm:text-lg',
            'truncate'
          )}>
            {icon}
            {title && <span className="truncate">{title}</span>}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className={cn('p-4 sm:p-6', contentClassName)}>
        {children}
      </CardContent>
    </Card>
  )
}

interface ResponsiveGridProps {
  children: ReactNode
  className?: string
  cols?: {
    default: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    '2xl'?: number
  }
}

export function ResponsiveGrid({ 
  children, 
  className,
  cols = { default: 1, sm: 2, lg: 3, xl: 4, '2xl': 5 }
}: ResponsiveGridProps) {
  const gridCols = Object.entries(cols)
    .map(([breakpoint, colCount]) => {
      if (breakpoint === 'default') {
        return `grid-cols-${colCount}`
      }
      return `${breakpoint}:grid-cols-${colCount}`
    })
    .join(' ')

  return (
    <div className={cn('grid gap-4 sm:gap-6', gridCols, className)}>
      {children}
    </div>
  )
}