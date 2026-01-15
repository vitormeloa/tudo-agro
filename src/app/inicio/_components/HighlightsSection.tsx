'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Skeleton } from '@/components/ui/skeleton'
import { DashboardSection } from './DashboardSection'

interface HighlightItem {
  id: string
  title: string
  category: string
  description: string
  image: string
}

const MOCK_HIGHLIGHTS: HighlightItem[] = [
  {
    id: 'animal-1',
    title: 'Matriz Nelore PO',
    category: 'Animal recém-cadastrado',
    description: 'Genética premiada pronta para reprodução.',
    image: '/fotos/animais/touro-nelore.jpeg',
  },
  {
    id: 'auction-1',
    title: 'Leilão Elite Pantanal',
    category: 'Leilão próximo',
    description: 'Evento especial nesta sexta às 20h.',
    image: '/fotos/leiloes/leilao-fazenda.jpg',
  },
  {
    id: 'product-1',
    title: 'Suplemento Mineral Premium',
    category: 'Promoção de produto',
    description: 'Compre 2 e ganhe 10% off com o cupom AGRO10.',
    image: '/fotos/produtos/proteinados-para-pasto.jpeg',
  },
  {
    id: 'training-1',
    title: 'Treinamento: Gestão de Pastagens',
    category: 'Treinamento liberado',
    description: 'Aulas novas disponíveis para você continuar assistindo.',
    image: '/fotos/blog/educavalo.webp',
  },
]

export function HighlightsSection() {
  const [items, setItems] = useState<HighlightItem[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    const timer = setTimeout(() => {
      if (active) {
        setItems(MOCK_HIGHLIGHTS)
        setLoading(false)
      }
    }, 600)

    return () => {
      active = false
      clearTimeout(timer)
    }
  }, [])

  return (
    <DashboardSection
      title="Destaques do dia"
      description="Confira animais, leilões, produtos e treinamentos selecionados para você."
      contentClassName="pt-4"
      actions={<Badge variant="outline">Atualizado agora</Badge>}
    >
      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-64 rounded-xl" />
          ))}
        </div>
      ) : items && items.length > 0 ? (
        <Carousel className="relative" opts={{ align: 'start' }}>
          <CarouselContent className="-ml-2">
            {items.map(item => (
              <CarouselItem
                key={item.id}
                className="pl-2 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
                  <div className="relative h-36 w-full">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-4">
                    <Badge variant="secondary" className="w-fit">
                      {item.category}
                    </Badge>
                    <div className="space-y-2">
                      <h3 className="text-base font-semibold text-[#1F2A1F]">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#66735D]">{item.description}</p>
                    </div>
                    <Button size="sm" className="mt-auto w-full">
                      Ver mais
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4 hidden md:flex" />
          <CarouselNext className="-right-4 hidden md:flex" />
        </Carousel>
      ) : (
        <div className="rounded-xl border border-dashed border-emerald-200 p-8 text-center text-sm text-[#66735D]">
          Nenhum conteúdo disponível ainda.
        </div>
      )}
    </DashboardSection>
  )
}
