'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  Award,
  CheckCircle,
  Gauge,
  Layers,
  MapPin,
  MessageCircle,
  Play,
  Radar,
  Search,
  Shield,
  Sparkles,
  Star,
  Timer,
  TrendingUp,
  Users,
  Zap,
  Eye,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

const palette = {
  accentSoft: 'rgba(36, 224, 132, 0.12)',
  highlightSoft: 'rgba(247, 183, 51, 0.12)',
}

type LiveAuction = {
  id: number
  title: string
  type: string
  currentBid: number
  timeLeft: string
  participants: number
  image: string
}

type Product = {
  id: number
  title: string
  category: string
  price: number
  location: string
  rating: number
  image: string
  seller: string
}

type Seller = {
  id: number
  name: string
  location: string
  rating: number
  sales: number
  image: string
  verified: boolean
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')

  const liveAuctions: LiveAuction[] = useMemo(
    () => [
      {
        id: 1,
        title: 'Leilão Fazenda Santa Rita',
        type: 'Gado de Corte',
        currentBid: 15000,
        timeLeft: '02:45:30',
        participants: 47,
        image: 'https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=900&h=700&fit=crop',
      },
      {
        id: 2,
        title: 'Leilão Elite Genética',
        type: 'Cavalos',
        currentBid: 85000,
        timeLeft: '01:12:15',
        participants: 23,
        image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=900&h=700&fit=crop',
      },
      {
        id: 3,
        title: 'Leilão Sêmen Premium',
        type: 'Sêmen Bovino',
        currentBid: 2500,
        timeLeft: '05:30:45',
        participants: 31,
        image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=900&h=700&fit=crop',
      },
    ],
    []
  )

  const featuredProducts: Product[] = useMemo(
    () => [
      {
        id: 1,
        title: 'Touro Nelore PO',
        category: 'Gado de Corte',
        price: 45000,
        location: 'Goiás, GO',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=900&h=700&fit=crop',
        seller: 'Fazenda Boa Vista',
      },
      {
        id: 2,
        title: 'Égua Mangalarga',
        category: 'Cavalos',
        price: 25000,
        location: 'Minas Gerais, MG',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=900&h=700&fit=crop',
        seller: 'Haras São João',
      },
      {
        id: 3,
        title: 'Vaca Holandesa',
        category: 'Gado de Leite',
        price: 8500,
        location: 'São Paulo, SP',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=900&h=700&fit=crop',
        seller: 'Fazenda Três Rios',
      },
      {
        id: 4,
        title: 'Sêmen Angus Premium',
        category: 'Sêmen',
        price: 150,
        location: 'Rio Grande do Sul, RS',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=900&h=700&fit=crop',
        seller: 'Genética Elite',
      },
    ],
    []
  )

  const topSellers: Seller[] = useMemo(
    () => [
      {
        id: 1,
        name: 'Fazenda Boa Vista',
        location: 'Goiás, GO',
        rating: 4.9,
        sales: 156,
        image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=200&h=200&fit=crop',
        verified: true,
      },
      {
        id: 2,
        name: 'Haras São João',
        location: 'Minas Gerais, MG',
        rating: 4.8,
        sales: 89,
        image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=200&h=200&fit=crop',
        verified: true,
      },
      {
        id: 3,
        name: 'Fazenda Três Rios',
        location: 'São Paulo, SP',
        rating: 4.7,
        sales: 234,
        image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=200&h=200&fit=crop',
        verified: true,
      },
    ],
    []
  )

  const platformPillars = [
    {
      title: 'Liquidez Global',
      description:
        'Integração com as maiores redes de fazendas, centrais de sêmen e leilões presenciais do país.',
      icon: Gauge,
      accent: palette.accentSoft,
    },
    {
      title: 'Inteligência de Mercado',
      description:
        'Dados em tempo real sobre genética, performance e histórico de preços para negociações assertivas.',
      icon: Radar,
      accent: palette.highlightSoft,
    },
    {
      title: 'Operações Assistidas',
      description:
        'Equipe especializada acompanha todo o ciclo da transação, do cadastro à entrega.',
      icon: MessageCircle,
      accent: 'rgba(59,130,246,0.12)',
    },
    {
      title: 'Infraestrutura Escalável',
      description:
        'Arquitetura cloud-native com disponibilidade 24/7, monitoramento contínuo e SLA corporativo.',
      icon: Layers,
      accent: 'rgba(124,58,237,0.12)',
    },
  ]

  const trustSignals = [
    {
      title: 'Compliance e Auditoria',
      description:
        'Processos alinhados às normas do MAPA com auditoria contínua de sanidade animal e rastreabilidade.',
      icon: Shield,
    },
    {
      title: 'Escrow Inteligente',
      description:
        'Pagamento protegido em múltiplas etapas com liberação condicionada a vistorias técnicas.',
      icon: CheckCircle,
    },
    {
      title: 'Certificação Premium',
      description:
        'Parceiros certificados e curadoria técnica garantem genética e procedência superiores.',
      icon: Award,
    },
  ]

  const metrics = [
    { label: 'Volume negociado', value: 'R$ 2,8 bi', trend: '+32% YoY' },
    { label: 'Fazendas conectadas', value: '2.5k+', trend: '+180 novas' },
    { label: 'Leilões mensais', value: '120+', trend: 'live & on-demand' },
    { label: 'Índice de satisfação', value: '98%', trend: 'NPS 72' },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#010706] text-white">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#010908] via-[#041511] to-[#03120E]" />
        <div className="absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(circle_at_top,_rgba(36,224,132,0.2),_transparent_60%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[380px] bg-[radial-gradient(circle_at_bottom,_rgba(247,183,51,0.18),_transparent_62%)]" />
        <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-[#24E084]/20 blur-3xl" />
      </div>

      <header className="sticky top-0 z-40 border-b border-white/5 bg-[#051410]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#24E084] via-[#1BA667] to-[#0E4735] text-lg font-semibold text-[#051410] shadow-[0_0_25px_rgba(36,224,132,0.35)]">
              AM
            </span>
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#73F7B8]">AgroMarket</p>
              <p className="text-xs text-[#A7C0B6]">Market intelligence para o agro</p>
            </div>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium text-[#C9E6DD] md:flex">
            <Link href="/" className="transition-colors hover:text-white">
              Início
            </Link>
            <Link href="/catalogo" className="transition-colors hover:text-white">
              Catálogo
            </Link>
            <Link href="/leiloes" className="transition-colors hover:text-white">
              Leilões
            </Link>
            <Link href="/vender" className="transition-colors hover:text-white">
              Vender
            </Link>
            <Link href="/sobre" className="transition-colors hover:text-white">
              Sobre
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button
                variant="outline"
                className="border-white/10 bg-white/5 text-[#C9E6DD] transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white"
              >
                Entrar
              </Button>
            </Link>
            <Link href="/cadastro">
              <Button className="group relative overflow-hidden border border-[#24E084]/50 bg-[#24E084] px-5 text-[#04100B] shadow-[0_0_25px_rgba(36,224,132,0.3)] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_15px_35px_-15px_rgba(36,224,132,0.75)]">
                <span className="absolute inset-0 translate-y-[120%] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-all duration-700 group-hover:translate-y-[-10%] group-hover:opacity-100" />
                <span className="relative font-semibold">Cadastre sua fazenda</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section className="px-4 pb-24 pt-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-10">
              <Badge className="w-fit border border-[#24E084]/40 bg-[#24E084]/15 text-[#73F7B8]">
                Plataforma líder em inteligência agropecuária
              </Badge>
              <div className="space-y-6">
                <h1 className="text-4xl font-semibold leading-tight text-white md:text-6xl">
                  Um ecossistema completo para leilões, genética e negócios do campo
                </h1>
                <p className="max-w-xl text-lg text-[#C0D7D0]">
                  Centralize compras, vendas e operações de leilões em uma infraestrutura digital com curadoria técnica,
                  dados em tempo real e segurança transacional nível enterprise.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex flex-1 items-center overflow-hidden rounded-2xl border border-white/5 bg-white/5 backdrop-blur">
                  <Input
                    type="text"
                    placeholder="Buscar gado elite, sêmen, genética..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 border-0 bg-transparent text-base text-white placeholder:text-[#4A5F57] focus-visible:ring-0"
                  />
                  <Link href={`/catalogo?search=${encodeURIComponent(searchQuery)}`}>
                    <Button className="h-full rounded-none bg-[#24E084] px-6 text-[#05140F] transition-colors hover:bg-[#1AC773]">
                      <Search className="h-5 w-5" />
                    </Button>
                  </Link>
                </div>
                <Link href="/leiloes" className="flex items-center justify-center">
                  <Button className="h-full min-h-12 w-full gap-2 border border-white/5 bg-white/10 text-white transition-colors hover:border-[#24E084]/60 hover:bg-[#24E084]/20">
                    <Zap className="h-4 w-4" />
                    Ver leilões ao vivo
                  </Button>
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.06] p-6 backdrop-blur-xl transition-transform duration-200 hover:-translate-y-1 hover:border-[#24E084]/40"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(36,224,132,0.12),_transparent_65%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <p className="text-sm uppercase tracking-[0.2em] text-[#6D8C80]">{metric.label}</p>
                    <p className="mt-2 text-3xl font-semibold text-white">{metric.value}</p>
                    <p className="mt-3 text-sm text-[#73F7B8]">{metric.trend}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 -z-10 rounded-[32px] border border-white/5 bg-gradient-to-br from-white/10 via-transparent to-white/5 blur-[2px]" />
              <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0A1915]/80 p-8 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm font-medium text-[#73F7B8]">
                    <Sparkles className="h-4 w-4" />
                    Operações inteligentes
                  </span>
                  <Badge className="border border-[#F7B733]/40 bg-[#F7B733]/10 text-[#F7E0B4]">Live analytics</Badge>
                </div>
                <div className="mt-6 space-y-6">
                  {liveAuctions.map((auction) => (
                    <div
                      key={auction.id}
                      className="rounded-3xl border border-white/5 bg-white/[0.04] p-4 shadow-[0_20px_40px_-35px_rgba(0,0,0,0.45)] transition-all duration-200 hover:border-[#24E084]/40 hover:bg-white/[0.07]"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl">
                          <img src={auction.image} alt={auction.title} className="h-full w-full object-cover" />
                          <span className="absolute inset-0 rounded-2xl border border-white/10" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-white">{auction.title}</p>
                            <Badge className="border border-[#24E084]/40 bg-[#24E084]/15 text-[#73F7B8]">{auction.type}</Badge>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-xs text-[#A7C0B6]">
                            <span className="flex items-center gap-1">
                              <TrendingUp className="h-3.5 w-3.5" /> R$ {auction.currentBid.toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1 text-[#F7B733]">
                              <Timer className="h-3.5 w-3.5" /> {auction.timeLeft}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-3.5 w-3.5" /> {auction.participants}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/leiloes" className="mt-8 block">
                  <Button className="w-full border border-[#24E084]/30 bg-[#24E084]/20 text-[#73F7B8] transition-all hover:bg-[#24E084]/30">
                    Abrir centro de leilões
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl space-y-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#4D7969]">Leilões ao vivo</p>
                <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
                  Transmissão simultânea com auditoria digital
                </h2>
              </div>
              <Link href="/leiloes">
                <Button className="border border-white/10 bg-white/10 text-white transition-colors hover:border-[#24E084]/40 hover:bg-[#24E084]/20">
                  Acessar agenda completa
                </Button>
              </Link>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {liveAuctions.map((auction) => (
                <Card
                  key={auction.id}
                  className="group relative overflow-hidden border border-white/5 bg-white/5 transition-all duration-300 hover:-translate-y-2 hover:border-[#24E084]/50 hover:bg-white/10"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img src={auction.image} alt={auction.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/50" />
                    <Badge className="absolute left-4 top-4 border border-[#F25555]/50 bg-[#F25555]/80 text-white">
                      <Play className="mr-1 h-3.5 w-3.5" /> AO VIVO
                    </Badge>
                  </div>
                  <CardContent className="space-y-6 p-6">
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-white">{auction.title}</h3>
                      <p className="text-sm text-[#7D9D92]">Certificado e auditado em blockchain de rastreabilidade animal.</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm text-white/80">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-[#4D7969]">Lance atual</p>
                        <p className="mt-1 font-semibold">R$ {auction.currentBid.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-[#4D7969]">Tempo</p>
                        <p className="mt-1 font-semibold text-[#F7B733]">{auction.timeLeft}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-[#4D7969]">Participantes</p>
                        <p className="mt-1 font-semibold">{auction.participants}</p>
                      </div>
                    </div>
                    <Link href={`/leilao/${auction.id}`}>
                      <Button className="w-full border border-[#24E084]/30 bg-[#24E084]/15 text-[#73F7B8] transition-colors hover:bg-[#24E084]/30">
                        Abrir sala de lances
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl space-y-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#4D7969]">Curadoria genética</p>
                <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
                  Destaques com avaliação zootécnica especializada
                </h2>
              </div>
              <Link href="/catalogo">
                <Button className="border border-[#24E084]/40 bg-[#24E084]/15 text-[#73F7B8] transition-colors hover:bg-[#24E084]/25">
                  Ver catálogo completo
                </Button>
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group relative overflow-hidden border border-white/5 bg-[#0C1C18]/80 transition-all duration-300 hover:-translate-y-2 hover:border-[#24E084]/40"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img src={product.image} alt={product.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
                    <Badge className="absolute left-4 top-4 border border-[#F7B733]/30 bg-[#F7B733]/20 text-[#F7E0B4]">
                      {product.category}
                    </Badge>
                  </div>
                  <CardContent className="space-y-4 p-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{product.title}</h3>
                      <div className="mt-2 flex items-center gap-2 text-sm text-[#7D9D92]">
                        <MapPin className="h-4 w-4" />
                        {product.location}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex items-center gap-1 text-[#F7B733]">
                        {[...Array(5)].map((_, index) => (
                          <Star
                            key={index}
                            className={`h-4 w-4 ${index < Math.round(product.rating) ? 'fill-current text-[#F7B733]' : 'text-[#2A3F39]'}`}
                          />
                        ))}
                      </div>
                      <span className="text-[#7D9D92]">{product.rating.toFixed(1)} / 5.0</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-[#4D7969]">Oferta</p>
                        <p className="text-2xl font-semibold text-white">R$ {product.price.toLocaleString()}</p>
                      </div>
                      <p className="text-xs text-[#7D9D92]">{product.seller}</p>
                    </div>
                    <Link href={`/produto/${product.id}`}>
                      <Button className="w-full gap-2 border border-white/10 bg-white/10 text-white transition-all hover:border-[#24E084]/40 hover:bg-[#24E084]/20">
                        <Eye className="h-4 w-4" />
                        Ver ficha técnica
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl space-y-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#4D7969]">Trusted sellers</p>
                <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
                  Fazendas e haras com performance comprovada
                </h2>
              </div>
              <Link href="/vendedores">
                <Button className="border border-white/10 bg-white/10 text-white transition-colors hover:border-[#24E084]/40 hover:bg-[#24E084]/20">
                  Ver todos os parceiros
                </Button>
              </Link>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {topSellers.map((seller) => (
                <Card
                  key={seller.id}
                  className="group relative overflow-hidden border border-white/5 bg-[#0C1C18]/80 transition-all duration-300 hover:-translate-y-2 hover:border-[#24E084]/40"
                >
                  <CardContent className="space-y-6 p-8">
                    <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-3xl border border-white/10">
                      <img src={seller.image} alt={seller.name} className="h-full w-full object-cover" />
                      {seller.verified && (
                        <Badge className="absolute -top-3 -right-2 border border-[#24E084]/40 bg-[#24E084]/80 text-white">
                          Elite
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-2 text-center">
                      <h3 className="text-xl font-semibold text-white">{seller.name}</h3>
                      <div className="flex items-center justify-center gap-2 text-sm text-[#7D9D92]">
                        <MapPin className="h-4 w-4" />
                        {seller.location}
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-3 text-sm text-[#7D9D92]">
                      <div className="flex items-center gap-1 text-[#F7B733]">
                        {[...Array(5)].map((_, index) => (
                          <Star
                            key={index}
                            className={`h-4 w-4 ${index < Math.round(seller.rating) ? 'fill-current text-[#F7B733]' : 'text-[#2A3F39]'}`}
                          />
                        ))}
                      </div>
                      <span>{seller.rating.toFixed(1)} na plataforma</span>
                      <span>{seller.sales} negociações concluídas</span>
                    </div>
                    <Link href={`/vendedor/${seller.id}`}>
                      <Button className="w-full border border-white/10 bg-white/10 text-white transition-all hover:border-[#24E084]/40 hover:bg-[#24E084]/20">
                        Abrir portfólio
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl space-y-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#4D7969]">Por que AgroMarket</p>
                <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
                  Tecnologia, dados e pessoas a favor do agronegócio
                </h2>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {platformPillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="group relative overflow-hidden rounded-3xl border border-white/5 bg-[#0B1E1A]/80 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[#24E084]/40"
                >
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: `radial-gradient(circle at top, ${pillar.accent}, transparent 70%)` }}
                  />
                  <div className="relative flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#73F7B8]">
                      <pillar.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{pillar.title}</h3>
                      <p className="mt-3 text-sm text-[#8BAC9F]">{pillar.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative px-4 py-24 sm:px-6 lg:px-8">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0E241E] via-[#071712] to-[#030C09]" />
          <div className="absolute inset-x-0 top-0 -z-10 h-48 bg-[radial-gradient(circle_at_top,_rgba(36,224,132,0.25),_transparent_65%)]" />
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 md:grid-cols-3">
              {trustSignals.map((signal) => (
                <div
                  key={signal.title}
                  className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#24E084]/40"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(36,224,132,0.12),_transparent_70%)] opacity-0 transition-opacity duration-300 hover:opacity-100" />
                  <div className="relative flex flex-col gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#24E084]/15 text-[#73F7B8]">
                      <signal.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{signal.title}</h3>
                    <p className="text-sm text-[#9EBBB1]">{signal.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[32px] border border-[#24E084]/30 bg-gradient-to-br from-[#122720] via-[#0B1B16] to-[#07120E] p-10 text-center shadow-[0_40px_120px_-60px_rgba(36,224,132,0.55)]">
            <Badge className="border border-[#24E084]/40 bg-[#24E084]/15 text-[#73F7B8]">Expanda seus negócios</Badge>
            <h2 className="mt-6 text-4xl font-semibold text-white md:text-5xl">
              Conecte sua operação agro a compradores e investidores do Brasil inteiro
            </h2>
            <p className="mt-6 text-lg text-[#C0D7D0]">
              Tenha suporte especializado, auditoria técnica e dados estratégicos para alavancar seus leilões, vendas diretas e
              marketplace.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/cadastro" className="w-full sm:w-auto">
                <Button className="w-full gap-2 border border-[#24E084]/60 bg-[#24E084] px-8 text-[#04100B] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#1AC773]">
                  <TrendingUp className="h-5 w-5" />
                  Quero vender no AgroMarket
                </Button>
              </Link>
              <Button
                className="w-full border border-white/10 bg-white/10 px-8 text-white transition-colors hover:border-[#24E084]/40 hover:bg-[#24E084]/20 sm:w-auto"
                onClick={() => alert('Chat com especialista em breve!')}
              >
                <MessageCircle className="h-5 w-5" />
                Falar com um especialista
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 bg-[#040C09]/90 py-16 text-[#8BAC9F]">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:px-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-white">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#24E084] via-[#1BA667] to-[#0E4735] text-lg font-semibold text-[#051410]">
                AM
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#73F7B8]">AgroMarket</p>
                <p className="text-xs text-[#8BAC9F]">Plataforma oficial do agronegócio brasileiro</p>
              </div>
            </div>
            <p>
              A maior infraestrutura digital para leilões, marketplace de animais, sêmen e soluções financeiras do agro.
            </p>
            <div className="flex gap-3">
              {['in', 'ig', 'yt'].map((item) => (
                <span
                  key={item}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm uppercase tracking-[0.2em] text-white/70"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-white">Categorias</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/catalogo?categoria=gado-corte" className="transition-colors hover:text-white">
                  Gado de Corte
                </Link>
              </li>
              <li>
                <Link href="/catalogo?categoria=gado-leite" className="transition-colors hover:text-white">
                  Gado de Leite
                </Link>
              </li>
              <li>
                <Link href="/catalogo?categoria=cavalos" className="transition-colors hover:text-white">
                  Cavalos
                </Link>
              </li>
              <li>
                <Link href="/catalogo?categoria=semen" className="transition-colors hover:text-white">
                  Sêmen
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-white">Empresa</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/sobre" className="transition-colors hover:text-white">
                  Sobre nós
                </Link>
              </li>
              <li>
                <Link href="/blog" className="transition-colors hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contato" className="transition-colors hover:text-white">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/carreiras" className="transition-colors hover:text-white">
                  Carreiras
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-white">Suporte</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/ajuda" className="transition-colors hover:text-white">
                  Central de ajuda
                </Link>
              </li>
              <li>
                <Link href="/termos" className="transition-colors hover:text-white">
                  Termos de uso
                </Link>
              </li>
              <li>
                <Link href="/privacidade" className="transition-colors hover:text-white">
                  Política de privacidade
                </Link>
              </li>
              <li>
                <Link href="/seguranca" className="transition-colors hover:text-white">
                  Segurança
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-white/5 pt-8 text-center text-xs text-[#4D7969]">
          © {new Date().getFullYear()} AgroMarket. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  )
}
