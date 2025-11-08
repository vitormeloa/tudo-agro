'use client'

import { ResponsiveCard, ResponsiveGrid } from '@/components/ui/responsive-card'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, TrendingDown, Users, DollarSign, 
  Activity, AlertTriangle, CheckCircle, Clock 
} from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string
  change: string
  trend: 'up' | 'down' | 'neutral'
  icon: React.ComponentType<{ className?: string }>
  color: 'blue' | 'green' | 'orange' | 'purple' | 'red'
  description?: string
}

function MetricCard({ 
  title, 
  value, 
  change, 
  trend, 
  icon: Icon, 
  color, 
  description 
}: MetricCardProps) {
  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-500 text-white',
      green: 'bg-primary/50 text-white',
      orange: 'bg-orange-500 text-white',
      purple: 'bg-purple-500 text-white',
      red: 'bg-red-500 text-white'
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-[#3D9970]" />
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />
      default:
        return <Activity className="w-4 h-4 text-gray-500" />
    }
  }

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-primary'
      case 'down':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <ResponsiveCard hoverable className="h-full">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getColorClasses(color)}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex items-center gap-1">
          {getTrendIcon()}
          <span className={`text-sm font-medium ${getTrendColor()}`}>
            {change}
          </span>
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600 mb-1 truncate">{title}</p>
        <p className="text-2xl font-bold text-[#101828] mb-1">{value}</p>
        {description && (
          <p className="text-xs text-gray-600 truncate">{description}</p>
        )}
      </div>
    </ResponsiveCard>
  )
}

interface MetricsDashboardProps {
  metrics: MetricCardProps[]
  title?: string
  className?: string
}

export default function MetricsDashboard({ 
  metrics, 
  title = "Métricas Principais",
  className 
}: MetricsDashboardProps) {
  return (
    <div className={className}>
      {title && (
        <h3 className="text-lg font-semibold text-[#101828] mb-4">{title}</h3>
      )}
      <ResponsiveGrid 
        cols={{ default: 1, sm: 2, lg: 3, xl: 4, '2xl': 5 }}
        className="gap-4 sm:gap-6"
      >
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </ResponsiveGrid>
    </div>
  )
}

interface AlertCardProps {
  type: 'success' | 'warning' | 'error' | 'info' | 'urgent'
  title: string
  message: string
  count?: number
  action?: string
  onAction?: () => void
}

export function AlertCard({ 
  type, 
  title, 
  message, 
  count, 
  action, 
  onAction 
}: AlertCardProps) {
  const getAlertConfig = () => {
    const configs = {
      success: {
        icon: CheckCircle,
        bgColor: 'bg-primary/5',
        borderColor: 'border-primary/20',
        iconColor: 'text-[#3D9970]',
        textColor: 'text-primary'
      },
      warning: {
        icon: AlertTriangle,
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        iconColor: 'text-orange-500',
        textColor: 'text-orange-800'
      },
      error: {
        icon: AlertTriangle,
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        iconColor: 'text-red-500',
        textColor: 'text-red-800'
      },
      urgent: {
        icon: AlertTriangle,
        bgColor: 'bg-red-100',
        borderColor: 'border-red-300',
        iconColor: 'text-red-600',
        textColor: 'text-red-900'
      },
      info: {
        icon: Clock,
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        iconColor: 'text-blue-500',
        textColor: 'text-primary'
      }
    }
    return configs[type] || configs.info
  }

  const config = getAlertConfig()
  const Icon = config?.icon || Clock

  return (
    <ResponsiveCard 
      className={`${config.bgColor} ${config.borderColor} border-2`}
      hoverable
      onClick={onAction}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <Icon className={`w-5 h-5 ${config.iconColor} mt-0.5 flex-shrink-0`} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className={`font-semibold ${config.textColor} truncate`}>{title}</h4>
              {count && count > 0 && (
                <Badge className={`${config.textColor} bg-opacity-20`}>
                  {count}
                </Badge>
              )}
            </div>
            <p className={`text-sm ${config.textColor} opacity-80 line-clamp-2`}>
              {message}
            </p>
            {action && onAction && (
              <button 
                className={`text-xs font-medium ${config.textColor} mt-2 hover:underline`}
                onClick={(e) => {
                  e.stopPropagation()
                  onAction()
                }}
              >
                {action}
              </button>
            )}
          </div>
        </div>
      </div>
    </ResponsiveCard>
  )
}