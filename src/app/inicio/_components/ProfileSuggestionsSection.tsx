'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { DashboardSection } from './DashboardSection'

interface SuggestionItem {
  id: string
  title: string
  highlight: string
  image: string
  description: string
}

const MOCK_SUGGESTIONS: SuggestionItem[] = [
  {
    id: 'nelore-mt',
    title: 'Gado Nelore MT',
    highlight: 'Selecionamos para você',
    description: 'Lote especial com manejo sustentável e entrega garantida.',
    image: '/fotos/animais/touro-nelore.jpeg',
  },
  {
    id: 'suplemento-corte',
    title: 'Suplemento para recria',
    highlight: 'Com base no seu histórico',
    description: 'Ideal para recria de bezerros com ganho comprovado de peso.',
    image: '/fotos/produtos/proteinados.jpg',
  },
  {
    id: 'treinamento-pasto',
    title: 'Treinamento: Intensificação de Pastagens',
    highlight: 'Continuar aprendendo',
    description: 'Veja como otimizar a lotação da sua fazenda em 4 módulos.',
    image: '/fotos/blog/nelore.webp',
  },
]

export function ProfileSuggestionsSection() {
  const [items, setItems] = useState<SuggestionItem[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    const timer = setTimeout(() => {
      if (active) {
        setItems(MOCK_SUGGESTIONS)
        setLoading(false)
      }
    }, 700)

    return () => {
      active = false
      clearTimeout(timer)
    }
  }, [])

  return (
    <DashboardSection
      title="Sugestões para o seu perfil"
      description="Baseadas nas suas categorias favoritas e visitas recentes."
      contentClassName="pt-4"
    >
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-28 rounded-xl" />
          ))}
        </div>
      ) : items && items.length > 0 ? (
        <div className="space-y-4">
          {items.map(item => (
            <div
              key={item.id}
              className="flex flex-col gap-4 rounded-2xl border border-emerald-100 p-4 shadow-sm sm:flex-row sm:items-center"
            >
              <div className="relative h-24 w-full overflow-hidden rounded-xl sm:h-24 sm:w-24">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <Badge variant="secondary" className="w-fit">
                  {item.highlight}
                </Badge>
                <h3 className="text-lg font-semibold text-[#1F2A1F]">{item.title}</h3>
                <p className="text-sm text-[#66735D]">{item.description}</p>
              </div>
              <Button className="w-full sm:w-auto">Ver produto</Button>
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
