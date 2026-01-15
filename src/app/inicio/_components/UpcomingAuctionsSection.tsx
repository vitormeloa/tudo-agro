'use client'

import { useEffect, useMemo, useState } from 'react'
import { CalendarClock, MapPin } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { DashboardSection } from './DashboardSection'

interface AuctionItem {
  id: string
  title: string
  status: 'agendado' | 'ao vivo'
  startTime: string
  location: string
}

const MOCK_AUCTIONS: AuctionItem[] = [
  {
    id: 'agendado-1',
    title: 'Leilão Digital Corte Premium',
    status: 'agendado',
    startTime: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
    location: 'Cuiabá - MT',
  },
  {
    id: 'agendado-2',
    title: 'Leilão Touros Nelore Valor',
    status: 'agendado',
    startTime: new Date(Date.now() + 1000 * 60 * 60 * 5).toISOString(),
    location: 'Uberaba - MG',
  },
  {
    id: 'ao-vivo-1',
    title: 'Leilão ao Vivo Fazenda Terra Boa',
    status: 'ao vivo',
    startTime: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    location: 'Transmissão online',
  },
]

function formatCountdown(startTime: string, reference: number) {
  const start = new Date(startTime).getTime()
  const diff = start - reference

  if (diff <= 0) {
    const elapsed = Math.abs(diff)
    const minutes = Math.floor(elapsed / (1000 * 60))
    return `Começou há ${minutes} min`
  }

  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  if (hours === 0) {
    return `Começa em ${minutes} min`
  }

  return `Começa em ${hours}h ${minutes}min`
}

export function UpcomingAuctionsSection() {
  const [items, setItems] = useState<AuctionItem[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    let active = true
    const timer = setTimeout(() => {
      if (active) {
        setItems(MOCK_AUCTIONS)
        setLoading(false)
      }
    }, 650)

    return () => {
      active = false
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now())
    }, 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  const sortedItems = useMemo(() => {
    if (!items) return []
    return [...items].sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
  }, [items])

  return (
    <DashboardSection
      title="Leilões em breve e ao vivo"
      description="Fique atento aos eventos agendados e participe com um clique."
      contentClassName="pt-4"
    >
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-28 rounded-xl" />
          ))}
        </div>
      ) : sortedItems.length > 0 ? (
        <div className="space-y-4">
          {sortedItems.map(item => (
            <div
              key={item.id}
              className="flex flex-col gap-4 rounded-2xl border border-emerald-100 p-4 shadow-sm md:flex-row md:items-center md:justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge
                    variant={item.status === 'ao vivo' ? 'destructive' : 'secondary'}
                    className="uppercase"
                  >
                    {item.status === 'ao vivo' ? 'Ao vivo' : 'Agendado'}
                  </Badge>
                  <span className="flex items-center gap-1 text-sm text-[#3F4D3C]">
                    <CalendarClock className="h-4 w-4" />
                    {formatCountdown(item.startTime, now)}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-[#1F2A1F]">{item.title}</h3>
                <div className="flex items-center gap-2 text-sm text-[#66735D]">
                  <MapPin className="h-4 w-4" />
                  {item.location}
                </div>
              </div>
              <Button className="w-full md:w-auto">Participar</Button>
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
