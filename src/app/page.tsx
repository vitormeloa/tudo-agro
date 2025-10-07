'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  BadgeCheck,
  CalendarRange,
  CheckCircle2,
  Droplet,
  Handshake,
  Leaf,
  MapPin,
  MessageSquare,
  Search,
  ShieldCheck,
  Sprout,
  Tractor,
  Wheat,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

type LiveAuction = {
  id: number
  title: string
  category: string
  currentBid: number
  timeLeft: string
  image: string
}

type Product = {
  id: number
  title: string
  breed: string
  price: number
  location: string
  image: string
  seller: string
}

type Seller = {
  id: number
  name: string
  location: string
  specialty: string
  rating: number
  image: string
}

const formatCurrency = (value: number) =>
  value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
  })

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')

  const liveAuctions: LiveAuction[] = useMemo(
    () => [
      {
        id: 1,
        title: 'Leilão Nelore do Cerrado',
        category: 'Gado de corte',
        currentBid: 18500,
        timeLeft: '1h 45min',
        image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=900&h=700&fit=crop',
      },
      {
        id: 2,
        title: 'Genética leiteira Serra Azul',
        category: 'Gado de leite',
        currentBid: 9200,
        timeLeft: '3h 10min',
        image: 'https://images.unsplash.com/photo-1562310501-1496c3167871?w=900&h=700&fit=crop',
      },
      {
        id: 3,
        title: 'Sêmen Angus Prime',
        category: 'Material genético',
        currentBid: 240,
        timeLeft: '6h 25min',
        image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=900&h=700&fit=crop',
      },
    ],
    []
  )

  const featuredProducts: Product[] = useMemo(
    () => [
      {
        id: 1,
        title: 'Touro Nelore PO',
        breed: 'Nelore',
        price: 52000,
        location: 'Goiás, GO',
        image: 'https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=900&h=700&fit=crop',
        seller: 'Fazenda Santa Luzia',
      },
      {
        id: 2,
        title: 'Vacas Girolando 3/4',
        breed: 'Girolando',
        price: 13800,
        location: 'Minas Gerais, MG',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&h=700&fit=crop',
        seller: 'Fazenda Bela Vista',
      },
      {
        id: 3,
        title: 'Sêmen Brangus provado',
        breed: 'Brangus',
        price: 180,
        location: 'Rio Grande do Sul, RS',
        image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=900&h=700&fit=crop',
        seller: 'Genética do Pampa',
      },
      {
        id: 4,
        title: 'Pacote embriões Senepol',
        breed: 'Senepol',
        price: 8600,
        location: 'Mato Grosso, MT',
        image: 'https://images.unsplash.com/photo-1548685913-fe6678babe8e?w=900&h=700&fit=crop',
        seller: 'AgroInova Bio',
      },
    ],
    []
  )

  const topSellers: Seller[] = useMemo(
    () => [
      {
        id: 1,
        name: 'Fazenda Santa Luzia',
        location: 'Prata, MG',
        specialty: 'Gado leiteiro de alta produção',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1529688530647-93a7d66a2208?w=200&h=200&fit=crop',
      },
      {
        id: 2,
        name: 'Haras Vale do Sol',
        location: 'Itu, SP',
        specialty: 'Equinos de linhagem esportiva',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1496440737103-cd596325d314?w=200&h=200&fit=crop',
      },
      {
        id: 3,
        name: 'Central AgroGen',
        location: 'Cascavel, PR',
        specialty: 'Sêmen e embriões certificados',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop',
      },
    ],
    []
  )

  const platformHighlights = [
    {
      icon: Tractor,
      title: 'Negócios do campo',
      description:
        'Catálogo completo de gado, genética, insumos e equipamentos com curadoria técnica agropecuária.',
    },
    {
      icon: ShieldCheck,
      title: 'Transações seguras',
      description:
        'Acompanhamento jurídico e sanitário em cada etapa, com contratos digitais e seguro de entrega.',
    },
    {
      icon: CalendarRange,
      title: 'Leilões integrados',
      description:
        'Agenda nacional com transmissão ao vivo, lances pelo app e acompanhamento em tempo real.',
    },
    {
      icon: Sprout,
      title: 'Informação confiável',
      description:
        'Relatórios de produtividade, índices zootécnicos e histórico de desempenho para embasar decisões.',
    },
  ]

  const agroValues = [
    {
      icon: Wheat,
      title: 'Raiz no campo',
      description: 'Equipe formada por técnicos, pecuaristas e agrônomos que conhecem a rotina da fazenda.',
    },
    {
      icon: Droplet,
      title: 'Sustentabilidade real',
      description: 'Boas práticas ambientais e rastreabilidade para valorizar quem produz com responsabilidade.',
    },
    {
      icon: Handshake,
      title: 'Parceria de confiança',
      description: 'Suporte humano para conectar comprador e vendedor com transparência e simplicidade.',
    },
  ]

  return (
    <div className="min-h-screen bg-[#f4f8f3] text-[#2f3d2b]">
      <header className="border-b border-[#dbe8d2] bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6ca75f] text-lg font-semibold text-white">
              AG
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a8f5d]">AgroHub</p>
              <p className="text-xs text-[#5e6a4a]">Marketplace rural completo</p>
            </div>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium text-[#3f4f34] md:flex">
            <Link href="/" className="transition-colors hover:text-[#6ca75f]">
              Início
            </Link>
            <Link href="/catalogo" className="transition-colors hover:text-[#6ca75f]">
              Catálogo
            </Link>
            <Link href="/leiloes" className="transition-colors hover:text-[#6ca75f]">
              Leilões
            </Link>
            <Link href="/vender" className="transition-colors hover:text-[#6ca75f]">
              Anunciar
            </Link>
            <Link href="/sobre" className="transition-colors hover:text-[#6ca75f]">
              Sobre nós
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" className="text-[#2f3d2b] hover:bg-[#e7f1e1]">
                Entrar
              </Button>
            </Link>
            <Link href="/cadastro">
              <Button className="bg-[#6ca75f] text-white hover:bg-[#5c8f52]">Cadastre sua fazenda</Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-[#dbe8d2] bg-[#edf4e7]">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1400&h=800&fit=crop"
              alt="Paisagem rural"
              fill
              className="object-cover opacity-30"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#edf4e7] via-[#edf4e7]/95 to-[#edf4e7]/80" />
          </div>
          <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
            <div className="space-y-8">
              <Badge className="w-fit border-[#c9dfbe] bg-white/80 text-[#5c8f52]">
                Negócios que fortalecem o agro brasileiro
              </Badge>
              <div className="space-y-4">
                <h1 className="text-4xl font-semibold leading-tight text-[#253220] sm:text-5xl">
                  Conecte sua fazenda ao melhor do mercado agropecuário
                </h1>
                <p className="max-w-xl text-lg text-[#47563b]">
                  Compre e venda animais, sêmen, embriões e insumos com segurança, transparência e suporte de quem
                  entende o campo.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex flex-1 items-center rounded-full border border-[#c9dfbe] bg-white/80 px-4 shadow-sm">
                  <Search className="mr-3 h-5 w-5 text-[#6ca75f]" />
                  <Input
                    type="text"
                    placeholder="Buscar gado, genética, fazendas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-12 border-0 bg-transparent px-0 text-base text-[#2f3d2b] placeholder:text-[#98a487] focus-visible:ring-0"
                  />
                </div>
                <Link href={`/catalogo?search=${encodeURIComponent(searchQuery)}`} className="sm:w-auto">
                  <Button className="h-12 w-full rounded-full bg-[#6ca75f] text-white hover:bg-[#5c8f52]">
                    Buscar ofertas
                  </Button>
                </Link>
              </div>
              <div className="grid gap-4 text-sm text-[#47563b] sm:grid-cols-3">
                <div>
                  <p className="text-xl font-semibold text-[#253220]">+2.500</p>
                  <p>produtores ativos</p>
                </div>
                <div>
                  <p className="text-xl font-semibold text-[#253220]">R$ 3,2 bi</p>
                  <p>em negócios mediados</p>
                </div>
                <div>
                  <p className="text-xl font-semibold text-[#253220]">98%</p>
                  <p>satisfação dos clientes</p>
                </div>
              </div>
            </div>
            <div className="grid gap-4">
              {platformHighlights.map(({ icon: Icon, title, description }) => (
                <Card key={title} className="border-[#dbe8d2] bg-white/85">
                  <CardContent className="flex items-start gap-4 p-5">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e7f1e1] text-[#6ca75f]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="space-y-1">
                      <p className="font-semibold text-[#2f3d2b]">{title}</p>
                      <p className="text-sm text-[#556347]">{description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-[#253220]">Leilões ao vivo</h2>
              <p className="text-[#556347]">Acompanhe os principais remates sem sair da fazenda.</p>
            </div>
            <Link href="/leiloes">
              <Button variant="outline" className="border-[#c9dfbe] text-[#2f3d2b] hover:bg-[#e7f1e1]">
                Ver agenda completa
              </Button>
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {liveAuctions.map((auction) => (
              <Card key={auction.id} className="overflow-hidden border-[#dbe8d2] bg-white">
                <div className="relative h-44">
                  <Image src={auction.image} alt={auction.title} fill className="object-cover" />
                </div>
                <CardContent className="space-y-3 p-5">
                  <Badge className="border-[#c9dfbe] bg-[#edf4e7] text-[#5c8f52]">{auction.category}</Badge>
                  <div>
                    <p className="text-lg font-semibold text-[#253220]">{auction.title}</p>
                    <p className="text-sm text-[#556347]">Lance atual {formatCurrency(auction.currentBid)}</p>
                  </div>
                  <div className="flex items-center justify-between text-sm text-[#556347]">
                    <span className="flex items-center gap-2">
                      <Leaf className="h-4 w-4 text-[#6ca75f]" />
                      Lote selecionado
                    </span>
                    <span className="font-medium text-[#2f3d2b]">{auction.timeLeft}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="border-y border-[#dbe8d2] bg-white/80">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-[#253220]">Ofertas selecionadas</h2>
                <p className="text-[#556347]">Animais e genética avaliados pela nossa equipe técnica.</p>
              </div>
              <Link href="/catalogo">
                <Button variant="outline" className="border-[#c9dfbe] text-[#2f3d2b] hover:bg-[#edf4e7]">
                  Explorar catálogo
                </Button>
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <Card key={product.id} className="border-[#dbe8d2] bg-white">
                  <div className="relative h-40">
                    <Image src={product.image} alt={product.title} fill className="object-cover" />
                  </div>
                  <CardContent className="space-y-3 p-5">
                    <div>
                      <p className="text-sm font-medium uppercase tracking-wide text-[#7a8f5d]">{product.breed}</p>
                      <p className="text-lg font-semibold text-[#253220]">{product.title}</p>
                    </div>
                    <div className="space-y-1 text-sm text-[#556347]">
                      <p>{product.location}</p>
                      <p>Oferta por {product.seller}</p>
                    </div>
                    <p className="text-lg font-semibold text-[#6ca75f]">{formatCurrency(product.price)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-[#253220]">Quem comercializa com a gente</h2>
              <p className="text-[#556347]">
                Fazendas referência, centrais de genética e criatórios de todo o país anunciam no AgroHub para ampliar a
                visibilidade e negociar com agilidade.
              </p>
              <div className="grid gap-6 sm:grid-cols-2">
                {topSellers.map((seller) => (
                  <Card key={seller.id} className="border-[#dbe8d2] bg-white">
                    <CardContent className="flex items-start gap-4 p-5">
                      <Image
                        src={seller.image}
                        alt={seller.name}
                        width={64}
                        height={64}
                        className="h-16 w-16 rounded-full object-cover"
                      />
                      <div className="space-y-1">
                        <p className="text-lg font-semibold text-[#253220]">{seller.name}</p>
                        <p className="text-sm text-[#556347]">{seller.specialty}</p>
                        <div className="flex items-center gap-2 text-sm text-[#7a8f5d]">
                          <MapPin className="h-4 w-4" />
                          {seller.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#7a8f5d]">
                          <BadgeCheck className="h-4 w-4" />
                          Avaliação {seller.rating.toFixed(1)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <div className="space-y-6 rounded-3xl border border-[#dbe8d2] bg-[#edf4e7] p-8">
              <Badge className="w-fit border-[#c9dfbe] bg-white/80 text-[#5c8f52]">Nossa essência</Badge>
              <h3 className="text-xl font-semibold text-[#253220]">
                Um marketplace feito para quem vive o agronegócio com paixão e profissionalismo.
              </h3>
              <div className="space-y-6">
                {agroValues.map(({ icon: Icon, title, description }) => (
                  <div key={title} className="flex gap-4">
                    <span className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#6ca75f]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="space-y-1">
                      <p className="font-semibold text-[#2f3d2b]">{title}</p>
                      <p className="text-sm text-[#556347]">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#dbe8d2] bg-white/80">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="space-y-6">
                <Badge className="w-fit border-[#c9dfbe] bg-[#edf4e7] text-[#5c8f52]">Por dentro da fazenda</Badge>
                <h2 className="text-2xl font-semibold text-[#253220]">Conteúdos para fortalecer sua produção</h2>
                <p className="text-[#556347]">
                  Receba insights de manejo, genética, bem-estar animal e mercado para tomar decisões mais seguras e
                  rentáveis.
                </p>
                <div className="space-y-4 text-sm text-[#47563b]">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 text-[#6ca75f]" />
                    <p>Análises semanais sobre preços de boi gordo, leite e grãos.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 text-[#6ca75f]" />
                    <p>Relatórios comparativos de genética e produtividade por raça.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 text-[#6ca75f]" />
                    <p>Alertas de leilões especiais e oportunidades direto dos criatórios.</p>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl border border-[#dbe8d2] bg-white p-8 shadow-sm">
                <h3 className="text-lg font-semibold text-[#253220]">Cadastre-se para receber novidades</h3>
                <p className="mt-2 text-sm text-[#556347]">
                  Informações selecionadas pela nossa equipe técnica direto no seu e-mail ou WhatsApp.
                </p>
                <form className="mt-6 space-y-4">
                  <Input
                    type="text"
                    placeholder="Nome"
                    className="h-11 border-[#c9dfbe] bg-[#f7fbf3] text-[#2f3d2b] placeholder:text-[#98a487] focus-visible:ring-[#6ca75f]"
                  />
                  <Input
                    type="email"
                    placeholder="E-mail"
                    className="h-11 border-[#c9dfbe] bg-[#f7fbf3] text-[#2f3d2b] placeholder:text-[#98a487] focus-visible:ring-[#6ca75f]"
                  />
                  <Button className="h-11 w-full rounded-full bg-[#6ca75f] text-white hover:bg-[#5c8f52]">
                    Quero receber
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#dbe8d2] bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 text-sm text-[#47563b] sm:px-6 md:grid-cols-4">
          <div className="space-y-3">
            <p className="text-lg font-semibold text-[#2f3d2b]">AgroHub</p>
            <p>
              Plataforma criada para aproximar produtores, centrais de genética e compradores em um ambiente simples e
              seguro.
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-[#2f3d2b]">Soluções</p>
            <ul className="space-y-1">
              <li>Marketplace completo</li>
              <li>Leilões transmitidos ao vivo</li>
              <li>Gestão de contratos</li>
              <li>Serviços logísticos</li>
            </ul>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-[#2f3d2b]">Suporte</p>
            <ul className="space-y-1">
              <li>Central do produtor</li>
              <li>Atendimento especializado</li>
              <li>Planos corporativos</li>
              <li>Treinamentos</li>
            </ul>
          </div>
          <div className="space-y-3">
            <p className="font-semibold text-[#2f3d2b]">Fale conosco</p>
            <p>contato@agrohub.com.br</p>
            <p>WhatsApp (34) 99999-0000</p>
            <p className="text-xs text-[#7a8f5d]">Segunda a sexta, 8h às 18h</p>
          </div>
        </div>
        <div className="border-t border-[#dbe8d2] bg-[#f7fbf3] py-4">
          <p className="mx-auto max-w-6xl px-4 text-xs text-[#7a8f5d] sm:px-6">
            © {new Date().getFullYear()} AgroHub. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
