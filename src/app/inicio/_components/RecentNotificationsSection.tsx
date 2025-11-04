'use client'

import { useEffect, useState } from 'react'
import { Bell, Gavel, PackageCheck, Tag } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { DashboardSection } from './DashboardSection'

interface NotificationItem {
  id: string
  type: 'pedido' | 'leilao' | 'produto' | 'geral'
  message: string
  createdAt: string
}

const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'pedido',
    message: 'Pedido #101 - Lote 12 saiu para entrega. Previsão para 28/04.',
    createdAt: 'Há 30 min',
  },
  {
    id: 'notif-2',
    type: 'leilao',
    message: 'O leilão Digital Corte Premium começará em 1 hora. Prepare seus lances.',
    createdAt: 'Há 1h',
  },
  {
    id: 'notif-3',
    type: 'produto',
    message: 'Suplemento Proteico 30kg da sua lista de desejos está com 10% de desconto.',
    createdAt: 'Há 2h',
  },
  {
    id: 'notif-4',
    type: 'geral',
    message: 'Novo artigo: Checklist de saúde animal antes de embarcar para leilões.',
    createdAt: 'Ontem',
  },
]

function getNotificationIcon(type: NotificationItem['type']) {
  switch (type) {
    case 'pedido':
      return <PackageCheck className="h-4 w-4" />
    case 'leilao':
      return <Gavel className="h-4 w-4" />
    case 'produto':
      return <Tag className="h-4 w-4" />
    default:
      return <Bell className="h-4 w-4" />
  }
}

function getBadgeStyle(type: NotificationItem['type']) {
  switch (type) {
    case 'pedido':
      return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'leilao':
      return 'bg-purple-100 text-purple-800 border-purple-200'
    case 'produto':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200'
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200'
  }
}

export function RecentNotificationsSection() {
  const [notifications, setNotifications] = useState<NotificationItem[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    const timer = setTimeout(() => {
      if (active) {
        setNotifications(MOCK_NOTIFICATIONS)
        setLoading(false)
      }
    }, 750)

    return () => {
      active = false
      clearTimeout(timer)
    }
  }, [])

  return (
    <DashboardSection
      title="Notificações recentes"
      description="Acompanhe atualizações de pedidos, leilões e conteúdos relevantes."
      contentClassName="pt-4"
    >
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-20 rounded-xl" />
          ))}
        </div>
      ) : notifications && notifications.length > 0 ? (
        <div className="space-y-3">
          {notifications.map(notification => (
            <div
              key={notification.id}
              className="flex flex-col gap-2 rounded-2xl border border-emerald-100 bg-white/80 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600/10 text-emerald-700">
                  {getNotificationIcon(notification.type)}
                </div>
                <p className="text-sm text-[#1F2A1F]">{notification.message}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge className={getBadgeStyle(notification.type)}>
                  {notification.type === 'pedido'
                    ? 'Pedido'
                    : notification.type === 'leilao'
                      ? 'Leilão'
                      : notification.type === 'produto'
                        ? 'Produto'
                        : 'Atualização'}
                </Badge>
                <span className="text-xs text-[#66735D]">{notification.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-emerald-200 p-8 text-center text-sm text-[#66735D]">
          Nenhum conteúdo disponível ainda.
        </div>
      )}
    </DashboardSection>
  )
}
