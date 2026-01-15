'use client'

import { useEffect, useState } from 'react'
import { Gift, Percent } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { DashboardSection } from './DashboardSection'

interface CampaignItem {
  id: string
  title: string
  description: string
  code: string
  expiresAt: string
  type: 'frete' | 'desconto'
}

const MOCK_CAMPAIGNS: CampaignItem[] = [
  {
    id: 'frete-gratis',
    title: 'Frete grátis para Centro-Oeste',
    description: 'Válido para pedidos acima de R$ 2.500 em produtos físicos selecionados.',
    code: 'FRETEGRATIS',
    expiresAt: 'Válido até 25/05',
    type: 'frete',
  },
  {
    id: 'desconto-suple',
    title: '10% OFF em suplementos minerais',
    description: 'Aplique o cupom na finalização da compra e economize com o AgroPrime.',
    code: 'AGRO10',
    expiresAt: 'Válido até 30/05',
    type: 'desconto',
  },
]

export function ActiveCampaignsSection() {
  const [campaigns, setCampaigns] = useState<CampaignItem[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    const timer = setTimeout(() => {
      if (active) {
        setCampaigns(MOCK_CAMPAIGNS)
        setLoading(false)
      }
    }, 500)

    return () => {
      active = false
      clearTimeout(timer)
    }
  }, [])

  return (
    <DashboardSection
      title="Campanhas e cupons ativos"
      description="Aproveite benefícios exclusivos enquanto estiverem disponíveis."
      contentClassName="pt-4"
    >
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 2 }).map((_, index) => (
            <Skeleton key={index} className="h-28 rounded-xl" />
          ))}
        </div>
      ) : campaigns && campaigns.length > 0 ? (
        <div className="space-y-4">
          {campaigns.map(campaign => (
            <div
              key={campaign.id}
              className="rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-400 p-5 text-white shadow-lg"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm uppercase tracking-wide">
                    {campaign.type === 'frete' ? (
                      <Gift className="h-4 w-4" />
                    ) : (
                      <Percent className="h-4 w-4" />
                    )}
                    Campanha ativa
                  </div>
                  <h3 className="text-lg font-semibold">{campaign.title}</h3>
                  <p className="text-sm opacity-90">{campaign.description}</p>
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="outline" className="border-white text-white">
                      Cupom: {campaign.code}
                    </Badge>
                    <span className="text-xs font-medium uppercase opacity-90">
                      {campaign.expiresAt}
                    </span>
                  </div>
                </div>
                <Button variant="secondary" className="w-full bg-white text-emerald-700 hover:bg-emerald-50 lg:w-auto">
                  Aproveitar agora
                </Button>
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
