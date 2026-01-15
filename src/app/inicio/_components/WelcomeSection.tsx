'use client'

import { useEffect, useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { DashboardSection } from './DashboardSection'

const MOCK_USER = {
  name: 'João da Silva',
  preferences: ['Nelore', 'Corte', 'Suplementação'],
}

function getGreeting(date: Date) {
  const hours = date.getHours()
  if (hours < 12) return 'Bom dia'
  if (hours < 18) return 'Boa tarde'
  return 'Boa noite'
}

export function WelcomeSection() {
  const [userName, setUserName] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const greeting = useMemo(() => getGreeting(new Date()), [])

  useEffect(() => {
    let active = true
    const timer = setTimeout(() => {
      if (active) {
        setUserName(MOCK_USER.name)
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
      title={loading ? 'Carregando...' : `${greeting}, ${userName?.split(' ')[0]}!`}
      description={
        loading
          ? 'Buscando seu painel personalizado'
          : 'Aqui você encontra seus leilões, compras, treinamentos e novidades mais recentes.'
      }
      contentClassName="pt-4"
    >
      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <Skeleton className="h-24 rounded-xl" />
          <Skeleton className="h-24 rounded-xl" />
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl bg-gradient-to-br from-emerald-100 via-white to-emerald-50 p-6 shadow-inner">
            <p className="text-base text-[#3F4D3C]">
              Personalizamos sua experiência com base nas suas preferências:
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {MOCK_USER.preferences.map(preference => (
                <span
                  key={preference}
                  className="rounded-full bg-emerald-600/10 px-3 py-1 text-sm font-medium text-emerald-700"
                >
                  {preference}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4 rounded-2xl border border-dashed border-emerald-200 p-6">
            <div>
              <h3 className="text-lg font-semibold text-[#1F2A1F]">
                Pronto para continuar suas compras?
              </h3>
              <p className="mt-2 text-sm text-[#66735D]">
                Acesse seu carrinho, confira pedidos em andamento ou descubra novos leilões.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button className="flex-1 sm:flex-none">Ir para meu carrinho</Button>
              <Button variant="outline" className="flex-1 sm:flex-none">
                Explorar leilões
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardSection>
  )
}
