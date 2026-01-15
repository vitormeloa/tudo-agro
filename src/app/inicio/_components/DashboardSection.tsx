import { ReactNode } from 'react'

import { cn } from '@/lib/utils'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface DashboardSectionProps {
  title: string
  description?: string
  actions?: ReactNode
  className?: string
  contentClassName?: string
  children: ReactNode
}

export function DashboardSection({
  title,
  description,
  actions,
  className,
  contentClassName,
  children,
}: DashboardSectionProps) {
  return (
    <Card className={cn('border-emerald-50/80 bg-white/95', className)}>
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <CardTitle className="text-xl font-semibold text-[#1F2A1F]">
            {title}
          </CardTitle>
          {description ? (
            <CardDescription className="text-sm text-[#66735D]">
              {description}
            </CardDescription>
          ) : null}
        </div>
        {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
      </CardHeader>
      <CardContent className={cn('pt-0', contentClassName)}>
        {children}
      </CardContent>
    </Card>
  )
}
