'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { DashboardSection } from './DashboardSection'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  image: string
  publishedAt: string
}

const MOCK_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: '3 estratégias para turbinar a recria de bezerros',
    excerpt: 'Conheça protocolos alimentares que aceleram o ganho de peso no primeiro ano.',
    image: '/fotos/blog/eduardo-costa-1.webp',
    publishedAt: 'Há 1 dia',
  },
  {
    id: 'post-2',
    title: 'Checklist de saúde antes do embarque para leilões',
    excerpt: 'Garanta um transporte seguro e sem surpresas para o comprador.',
    image: '/fotos/blog/edufazenda.webp',
    publishedAt: 'Há 3 dias',
  },
  {
    id: 'post-3',
    title: 'Como analisar dados do marketplace para comprar melhor',
    excerpt: 'Aprenda a interpretar indicadores e maximizar negociações.',
    image: '/fotos/blog/dr-bernardo.webp',
    publishedAt: 'Há 5 dias',
  },
]

export function RecentPostsSection() {
  const [posts, setPosts] = useState<BlogPost[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    const timer = setTimeout(() => {
      if (active) {
        setPosts(MOCK_POSTS)
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
      title="Últimos posts do blog"
      description="Fique por dentro das novidades e melhores práticas do agronegócio."
      contentClassName="pt-4"
      actions={
        <Button variant="ghost" className="gap-2">
          Ver blog
          <ArrowRight className="h-4 w-4" />
        </Button>
      }
    >
      {loading ? (
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-64 rounded-xl" />
          ))}
        </div>
      ) : posts && posts.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-3">
          {posts.map(post => (
            <div
              key={post.id}
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-emerald-100 shadow-sm"
            >
              <div className="relative h-32 w-full">
                <Image src={post.image} alt={post.title} fill className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-4">
                <span className="text-xs uppercase tracking-wide text-emerald-700">
                  {post.publishedAt}
                </span>
                <h3 className="text-base font-semibold text-[#1F2A1F] line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-[#66735D] line-clamp-3">{post.excerpt}</p>
                <Button variant="link" className="mt-auto w-fit px-0 text-emerald-700">
                  Ler mais
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
