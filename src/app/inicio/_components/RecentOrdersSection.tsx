'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { DashboardSection } from './DashboardSection'

interface OrderItem {
  id: string
  title: string
  image: string
  status: 'aguardando' | 'em_transporte' | 'entregue'
  updatedAt: string
}

const MOCK_ORDERS: OrderItem[] = [
  {
    id: 'order-101',
    title: 'Lote 12 - Novilhas Guzerá',
    image: '/fotos/animais/novilha-brahman.jpg',
    status: 'em_transporte',
    updatedAt: 'Atualizado há 2h',
  },
  {
    id: 'order-102',
    title: 'Suplemento Proteico 30kg',
    image: '/fotos/produtos/proteinados.jpg',
    status: 'aguardando',
    updatedAt: 'Aguardando pagamento',
  },
  {
    id: 'order-103',
    title: 'Sêmen Angus Alta Genética',
    image: '/fotos/produtos/promotor.webp',
    status: 'entregue',
    updatedAt: 'Entregue há 5 dias',
  },
]

const STATUS_LABELS: Record<OrderItem['status'], { label: string; badgeClass: string }> = {
  aguardando: {
    label: 'Aguardando',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-200',
  },
  em_transporte: {
    label: 'Em transporte',
    badgeClass: 'bg-blue-100 text-blue-800 border-blue-200',
  },
  entregue: {
    label: 'Entregue',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  },
}

export function RecentOrdersSection() {
  const [orders, setOrders] = useState<OrderItem[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    const timer = setTimeout(() => {
      if (active) {
        setOrders(MOCK_ORDERS)
        setLoading(false)
      }
    }, 550)

    return () => {
      active = false
      clearTimeout(timer)
    }
  }, [])

  return (
    <DashboardSection
      title="Últimas compras"
      description="Acompanhe seus pedidos em andamento e finalizados."
      contentClassName="pt-4"
      actions={<Button variant="ghost">Ver todas</Button>}
    >
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-24 rounded-xl" />
          ))}
        </div>
      ) : orders && orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map(order => {
            const statusInfo = STATUS_LABELS[order.status]
            return (
              <div
                key={order.id}
                className="flex flex-col gap-3 rounded-2xl border border-emerald-100 p-4 shadow-sm sm:flex-row sm:items-center"
              >
                <div className="relative h-20 w-full overflow-hidden rounded-xl sm:h-20 sm:w-20">
                  <Image src={order.image} alt={order.title} fill className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col gap-1">
                  <h3 className="text-sm font-semibold text-[#1F2A1F]">{order.title}</h3>
                  <span className="text-xs text-[#66735D]">{order.updatedAt}</span>
                </div>
                <Badge className={statusInfo.badgeClass}>{statusInfo.label}</Badge>
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  Ver detalhes
                </Button>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-emerald-200 p-8 text-center text-sm text-[#66735D]">
          Nenhum conteúdo disponível ainda.
        </div>
      )}
    </DashboardSection>
  )
}
