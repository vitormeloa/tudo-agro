'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProductCard from '@/components/ui/cards/ProductCard'

import { mockAuctions } from '@/lib/mock-auctions'
import { mockProducts } from '@/lib/mock-products'
import { mockAnimals } from '@/lib/mock-animals'
import { useToast } from '@/hooks/use-toast'
import { 
  Search, 
  Filter, 
  Star, 
  TrendingUp, 
  Shield, 
  Users, 
  Award,
  ArrowRight,
  Play,
  Clock,
  MapPin,
  Heart,
  Eye,
  MessageCircle,
  ChevronRight,
  CheckCircle,
  Zap,
  ShoppingCart,
  UserCheck,
  Building2,
  Gavel,
  BarChart3
} from 'lucide-react'

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const { toast } = useToast()

  // Verificar se há mensagem de sucesso na URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const message = urlParams.get('message')
    if (message) {
      toast({
        title: "Sucesso!",
        description: message,
      })
      // Limpar a URL
      window.history.replaceState({}, document.title, window.location.pathname)
    }
  }, [toast])

  // Detectar se é mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 640) // sm breakpoint
    }
    
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  // Função auxiliar para formatar tempo restante
  const formatTimeLeft = (endTime: Date) => {
    const now = new Date()
    const diff = endTime.getTime() - now.getTime()
    
    if (diff <= 0) return "Encerrado"
    
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    
    return `${hours}h ${minutes}m`
  }

  // Usar animais do mock (primeiros 3)
  const featuredProducts = mockAnimals.slice(0, 3).map(a => ({
    id: a.id,
    title: a.title,
    category: a.category,
    price: a.price,
    location: a.location,
    rating: 4.8,
    reviews: 24,
    image: a.images[0],
    seller: a.seller.name,
    verified: a.seller.verified,
    featured: a.featured,
    age: a.age,
    weight: a.weight,
    breed: a.breed,
    type: "animal" as const
  }))

  // Usar leilões ao vivo do mock (primeiros 2)
  const liveAuctionsBase = mockAuctions.filter(a => a.status === 'live').slice(0, 2)
  
  // Calcular tempo restante apenas no cliente para evitar problemas de hidratação
  const liveAuctions = liveAuctionsBase.map(a => ({
    id: a.id,
    title: a.title,
    type: a.type,
    currentBid: a.currentBid || 0,
    participants: a.participants,
    timeLeft: isMounted && a.endTime ? formatTimeLeft(a.endTime) : "Carregando...",
    endTime: a.endTime,
    image: a.image,
    location: a.location
  }))

  // Usar produtos do mock (primeiros 3)
  const featuredProductsAgro = mockProducts.slice(0, 3).map(p => ({
    id: p.id,
    title: p.title,
    category: p.category,
    price: p.price,
    location: p.location,
    rating: p.rating,
    reviews: p.reviews,
    image: p.image,
    seller: p.seller,
    verified: p.verified,
    featured: p.featured,
    weight: p.weight,
    brand: p.brand,
    stock: p.stock,
    type: "product" as const
  }))

  const stats = [
    { icon: Users, value: "50k+", label: "Usuários Ativos" },
    { icon: Award, value: "R$ 2.8B", label: "Volume Negociado" },
    { icon: Heart, value: "98%", label: "Satisfação" },
    { icon: Shield, value: "100%", label: "Segurança" }
  ]

  const features = [
    {
      icon: UserCheck,
      title: "Use como quiser: comprador, vendedor ou ambos",
      description: "Cadastre-se e escolha seu perfil: compre com segurança, anuncie seus produtos ou faça os dois com o mesmo login."
    },
    {
      icon: ShoppingCart,
      title: "Marketplace completo de produtos agropecuários",
      description: "Tudo o que o produtor precisa — de suplementos e ração a ferramentas, vestuário rural e muito mais. Produtos agropecuários de A a Z, em um único lugar."
    },
    {
      icon: Shield,
      title: "Segurança com KYC Rural + Escrow",
      description: "Todas as transações são verificadas com KYC e protegidas por sistema de garantia (escrow). Confiança para quem compra e para quem vende."
    },
    {
      icon: Building2,
      title: "Rede ativa com milhares de fazendas e empresas",
      description: "Acesse uma comunidade real de produtores e compradores de todo o Brasil, com histórico, avaliações e contatos verificados."
    },
    {
      icon: Gavel,
      title: "Leilões digitais em tempo real",
      description: "Participe de leilões de elite com lances online, estrutura profissional e gestão de lotes integrada."
    },
    {
      icon: BarChart3,
      title: "Painel completo de controle e gestão",
      description: "Tenha uma visão clara dos seus anúncios, favoritos, negociações e histórico — tudo em um painel simples e funcional."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <Header variant="transparent" />
      
      {/* Hero Section */}
        <section className="relative h-screen overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover scale-105"
            poster="/videos/agro-hero-poster.jpg"
          >
            <source src="/videos/agro-hero-video.mp4" type="video/mp4" />
            {/*<source src="/videos/agro-hero-video.webm" type="video/webm" />*/}
            {/* Fallback para navegadores que não suportam vídeo */}
            <div className="w-full h-full bg-gradient-to-br from-emerald-50 via-white to-green-50"></div>
          </video>
        </div>

        {/* Overlay moderno com gradiente suave */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-emerald-950/60 to-black/70"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>

        {/* Elementos decorativos modernos */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

        {/* Container centralizado */}
        <div className="relative h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center py-20">
          <div className="text-center space-y-4 sm:space-y-6 md:space-y-7 lg:space-y-8">

            {/* Título principal modernizado */}
            <div className="animate-fade-in-up space-y-3 sm:space-y-4 md:space-y-5" style={{ animationDelay: '0.1s' }}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-white leading-[1.1] tracking-tight px-2">
                O marketplace{' '}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 bg-clip-text text-transparent">
                    agro
                  </span>
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/20 to-green-400/20 blur-xl -z-10"></div>
                </span>
                <br />
                mais completo do Brasil
              </h1>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light px-4">
                Compre e venda gado, cavalos, genética e produtos agropecuários<br className="hidden sm:block" /> com segurança e praticidade.
              </p>
            </div>

            {/* Search Bar modernizada */}
            <div className="animate-fade-in-up max-w-2xl mx-auto" style={{ animationDelay: '0.2s' }}>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative flex items-center">
                  <Search className="absolute left-4 sm:left-5 md:left-6 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 transition-colors group-focus-within:text-emerald-500" />
                  <input
                    type="text"
                    placeholder={isMobile ? "Buscar..." : "Buscar animais, raças, produtos e muito mais…"}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 sm:pl-14 md:pl-16 pr-28 sm:pr-32 md:pr-40 py-3 sm:py-3.5 md:py-4 lg:py-5 text-sm sm:text-base md:text-lg border-2 border-white/20 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 transition-all duration-300 shadow-2xl bg-white/95 backdrop-blur-xl text-gray-900 placeholder-gray-500 hover:border-white/30"
                  />
                  <Button className="absolute right-1.5 sm:right-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    Buscar
                  </Button>
                </div>
              </div>
            </div>

            {/* CTA Buttons modernizados */}
            <div className="animate-fade-in-up pt-2 sm:pt-4" style={{ animationDelay: '0.3s' }}>
              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 md:gap-4 justify-center items-center max-w-5xl mx-auto">
                <Link href="/catalogo" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 lg:py-5 text-sm sm:text-base md:text-lg font-semibold rounded-full shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105 group">
                    Explorar Catálogo
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/leiloes" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-white/80 text-white hover:bg-white hover:text-emerald-700 px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 lg:py-5 text-sm sm:text-base md:text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 bg-white/5 backdrop-blur-sm hover:shadow-xl group">
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:scale-110 transition-transform" />
                    Ver Leilões
                  </Button>
                </Link>
                <Link href="/produtos" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-white/80 text-white hover:bg-white hover:text-emerald-700 px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 lg:py-5 text-sm sm:text-base md:text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 bg-white/5 backdrop-blur-sm hover:shadow-xl group">
                    <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:scale-110 transition-transform" />
                    Mercado Agro
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
            <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/30 rounded-full p-1">
              <div className="w-1 h-2 sm:w-1.5 sm:h-3 bg-white/50 rounded-full mx-auto animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-b from-white via-slate-50/50 to-white relative">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-green-500/5"></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent rounded-full"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in-up group" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-green-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <stat.icon className="w-10 h-10 text-emerald-600" />
                </div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">{stat.value}</div>
                <div className="text-gray-600 font-medium text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-gradient-to-b from-white via-emerald-50/30 to-slate-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-100/20 via-transparent to-transparent"></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent rounded-full"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-emerald-800 to-gray-900 bg-clip-text text-transparent mb-6">
              Destaques da Semana
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Os melhores animais selecionados especialmente para você
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className="animate-fade-in-up group" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="transform group-hover:scale-105 transition-all duration-300">
                  <ProductCard product={product} variant="detailed" />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/catalogo">
              <Button size="lg" variant="outline" className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Ver Todos os Animais
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Live Auctions */}
      <section className="py-24 bg-gradient-to-b from-slate-50 via-white to-emerald-50/20 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-emerald-500/5"></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-red-400 to-transparent rounded-full"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-red-600 to-gray-900 bg-clip-text text-transparent mb-6">
              Leilões ao Vivo
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Participe dos leilões mais emocionantes da agropecuária
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {liveAuctions.map((auction, index) => (
              <Card key={auction.id} className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 bg-white/80 backdrop-blur-sm animate-fade-in-up group" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative">
                  <img src={auction.image} alt={auction.title} className="w-full h-48 object-cover group-hover:scale-100 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-red-500 text-white font-semibold animate-pulse shadow-lg">
                      <Play className="w-3 h-3 mr-1" />
                      AO VIVO
                    </Badge>
                    <Badge className="bg-emerald-600 text-white shadow-lg">{auction.type}</Badge>
                  </div>
                  {isMounted && (
                    <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 rounded-lg text-sm font-bold backdrop-blur-sm">
                      <Clock className="w-4 h-4 inline mr-1" />
                      {auction.endTime ? formatTimeLeft(auction.endTime) : "0h 0m"}
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl text-gray-900 mb-4 group-hover:text-emerald-700 transition-colors duration-300">{auction.title}</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                      <span className="text-gray-600 font-medium">Lance atual:</span>
                      <span className="font-bold text-emerald-600 text-xl">
                        R$ {auction.currentBid.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Participantes:</span>
                      <span className="font-bold text-gray-900 flex items-center">
                        <Users className="w-4 h-4 mr-1 text-emerald-600" />
                        {auction.participants} online
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Local:</span>
                      <span className="font-semibold text-gray-900 flex items-center">
                        <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                        {auction.location}
                      </span>
                    </div>
                  </div>

                  <Link href={`/leilao/${auction.id}`}>
                    <Button className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-3 text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                      <Zap className="w-5 h-5 mr-2" />
                      Entrar no Leilão
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/leiloes">
              <Button size="lg" variant="outline" className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Ver Todos os Leilões
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Agro Section */}
      <section className="py-24 bg-gradient-to-b from-emerald-50/20 via-white to-slate-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-100/20 via-transparent to-transparent"></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent rounded-full"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-green-700 to-gray-900 bg-clip-text text-transparent mb-6">
              Mercado Agro
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                A vitrine do agro moderno: produtos, marcas e experiências únicas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProductsAgro.map((product, index) => (
              <div key={product.id} className="animate-fade-in-up group" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="transform group-hover:scale-105 transition-all duration-300">
                  <ProductCard product={product} variant="detailed" />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/produtos">
              <Button size="lg" variant="outline" className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Ver Todos os Produtos
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-emerald-50 via-green-50/50 to-slate-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-200/10 via-transparent to-transparent"></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent rounded-full"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-emerald-700 to-gray-900 bg-clip-text text-transparent mb-6 leading-tight">
              🌱 O TudoAgro é mais que uma plataforma de compra e venda — é o ecossistema digital do agronegócio brasileiro
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Conectamos produtores, compradores e empresas do setor agro para anunciar, vender e comprar gado, cavalos, genética, insumos, equipamentos e muito mais — tudo com segurança, tecnologia e liberdade total de uso.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 bg-white/80 backdrop-blur-sm animate-fade-in-up group" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-green-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <feature.icon className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-emerald-700 transition-colors duration-300">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-700 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-transparent to-green-500/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Pronto para começar?
          </h2>
          <p className="text-xl text-emerald-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Junte-se a milhares de produtores que já transformaram seus negócios com o TudoAgro
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/cadastro">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <Users className="w-5 h-5 mr-2" />
                Criar Conta Gratuita
              </Button>
            </Link>
            <Link href="/catalogo">
              <Button size="lg" variant="outline" className="border-2 border-white/80 text-white hover:bg-white hover:text-emerald-600 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm bg-white/10">
                <Eye className="w-5 h-5 mr-2" />
                Explorar Agora
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      

      <Footer />
    </div>
  )
}
