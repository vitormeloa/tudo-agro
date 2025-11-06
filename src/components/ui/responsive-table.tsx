'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ResponsiveTableProps {
  children: ReactNode
  className?: string
  scrollable?: boolean
}

export function ResponsiveTable({ 
  children, 
  className,
  scrollable = true 
}: ResponsiveTableProps) {
  return (
    <div className={cn(
      scrollable && 'overflow-x-auto',
      'w-full'
    )}>
      <table className={cn(
        'w-full border-collapse',
        className
      )}>
        {children}
      </table>
    </div>
  )
}

interface ResponsiveTableHeaderProps {
  children: ReactNode
  className?: string
}

export function ResponsiveTableHeader({ 
  children, 
  className 
}: ResponsiveTableHeaderProps) {
  return (
    <thead className={cn(
      'bg-gray-50 border-b border-gray-200',
      className
    )}>
      {children}
    </thead>
  )
}

interface ResponsiveTableBodyProps {
  children: ReactNode
  className?: string
}

export function ResponsiveTableBody({ 
  children, 
  className 
}: ResponsiveTableBodyProps) {
  return (
    <tbody className={cn(
      'divide-y divide-gray-200',
      className
    )}>
      {children}
    </tbody>
  )
}

interface ResponsiveTableRowProps {
  children: ReactNode
  className?: string
  hoverable?: boolean
  onClick?: () => void
}

export function ResponsiveTableRow({ 
  children, 
  className,
  hoverable = false,
  onClick 
}: ResponsiveTableRowProps) {
  return (
    <tr 
      className={cn(
        'transition-colors duration-200',
        hoverable && 'hover:bg-gray-50',
        onClick && 'cursor-pointer active:bg-gray-100',
        className
      )}
      onClick={onClick}
    >
      {children}
    </tr>
  )
}

interface ResponsiveTableCellProps {
  children: ReactNode
  className?: string
  header?: boolean
  align?: 'left' | 'center' | 'right'
  mobileHidden?: boolean
}

export function ResponsiveTableCell({ 
  children, 
  className,
  header = false,
  align = 'left',
  mobileHidden = false
}: ResponsiveTableCellProps) {
  const Component = header ? 'th' : 'td'
  
  return (
    <Component
      className={cn(
        'px-3 py-4 text-sm',
        header ? 'font-medium text-[#101828]' : 'text-gray-700',
        align === 'center' && 'text-center',
        align === 'right' && 'text-right',
        mobileHidden && 'hidden sm:table-cell',
        className
      )}
    >
      {children}
    </Component>
  )
}