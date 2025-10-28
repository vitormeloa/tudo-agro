'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProductCard from '@/components/ui/cards/ProductCard'
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

  const featuredProducts = [
    {
      id: 1,
      title: "Touro Nelore PO Certificado",
      category: "Gado de Corte",
      price: 45000,
      location: "Goiás, GO",
      rating: 4.8,
      reviews: 24,
      image: "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=400&h=300&fit=crop",
      seller: "Fazenda Boa Vista",
      verified: true,
      featured: true,
      age: "3 anos",
      weight: "850kg",
      breed: "Nelore",
      type: "animal"
    },
    {
      id: 2,
      title: "Égua Mangalarga Marchador",
      category: "Cavalos",
      price: 25000,
      location: "Minas Gerais, MG",
      rating: 4.9,
      reviews: 18,
      image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=400&h=300&fit=crop",
      seller: "Haras São João",
      verified: true,
      featured: false,
      age: "5 anos",
      weight: "450kg",
      breed: "Mangalarga",
      type: "animal"
    },
    {
      id: 3,
      title: "Vaca Holandesa Produtiva",
      category: "Gado de Leite",
      price: 8500,
      location: "São Paulo, SP",
      rating: 4.7,
      reviews: 31,
      image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&h=300&fit=crop",
      seller: "Fazenda Três Rios",
      verified: true,
      featured: true,
      age: "4 anos",
      weight: "650kg",
      breed: "Holandesa",
      type: "animal"
    }
  ]

  const liveAuctions = [
    {
      id: 1,
      title: "Leilão Fazenda Santa Rita - Elite Nelore",
      type: "Gado de Corte",
      currentBid: 15000,
      participants: 47,
      timeLeft: "2h 45m",
      image: "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=400&h=300&fit=crop",
      location: "Goiás, GO"
    },
    {
      id: 2,
      title: "Leilão Elite Genética - Cavalos Premium",
      type: "Cavalos",
      currentBid: 85000,
      participants: 23,
      timeLeft: "1h 12m",
      image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=400&h=300&fit=crop",
      location: "Minas Gerais, MG"
    }
  ]

  const featuredProductsAgro = [
    {
      id: 1,
      title: "Ração para Gado de Corte Premium",
      category: "Rações",
      price: 45.90,
      location: "São Paulo, SP",
      rating: 4.8,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
      seller: "AgroNutri",
      verified: true,
      featured: true,
      weight: "50kg",
      brand: "NutriMax",
      stock: "Em estoque",
      type: "product"
    },
    {
      id: 2,
      title: "Sementes de Milho Híbrido",
      category: "Sementes",
      price: 89.50,
      location: "Minas Gerais, MG",
      rating: 4.9,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop",
      seller: "Sementes Elite",
      verified: true,
      featured: false,
      weight: "60.000 sementes",
      brand: "Pioneer",
      stock: "Em estoque",
      type: "product"
    },
    {
      id: 3,
      title: "Fertilizante NPK 20-10-10",
      category: "Fertilizantes",
      price: 125.00,
      location: "Goiás, GO",
      rating: 4.7,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
      seller: "FertilAgro",
      verified: true,
      featured: true,
      weight: "50kg",
      brand: "Yara",
      stock: "Em estoque",
      type: "product"
    }
  ]

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Header variant="transparent" />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="/videos/agro-hero-poster.jpg"
          >
            <source src="/videos/agro-hero-video.mp4" type="video/mp4" />
            {/*<source src="/videos/agro-hero-video.webm" type="video/webm" />*/}
            {/* Fallback para navegadores que não suportam vídeo */}
            <div className="w-full h-full bg-gradient-to-br from-emerald-50 via-white to-green-50"></div>
          </video>
        </div>
        
        {/* Overlay para melhorar legibilidade do texto */}
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 via-black/30 to-green-900/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-fade-in-up">
              
              <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight text-shadow-2xl">
                  O marketplace
                  {' '}
                <span className="gradient-text text-shadow-xl">agro</span>
                <br />
                mais completo do Brasil
              </h1>
              
              <p className="text-lg md:text-2xl text-white/95 mb-8 max-w-3xl mx-auto leading-relaxed text-shadow-lg font-medium">
                  Compra e venda de gado, cavalos, sêmen e produtos do agronegócio com um clique.
              </p>
            </div>

            {/* Search Bar */}
            <div className="animate-fade-in-up max-w-2xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 sm:left-6 sm:w-6 sm:h-6" />
                <input
                  type="text"
                  placeholder={isMobile ? "Buscar..." : "Buscar animais, raças, localização..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-24 py-4 text-base sm:pl-16 sm:pr-32 sm:py-6 sm:text-lg border-2 border-white/30 rounded-2xl focus:ring-4 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all duration-300 shadow-xl bg-white/95 backdrop-blur-sm text-gray-900 placeholder-gray-600"
                />
                <Button className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 text-sm font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 sm:right-2 sm:px-8 sm:py-4 sm:text-lg">
                  Buscar
                </Button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="animate-fade-in-up">
              {/* Desktop Layout - 3 buttons in a row */}
              <div className="hidden sm:flex flex-row gap-4 justify-center">
                <Link href="/catalogo">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
                    Explorar Catálogo
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/leiloes">
                  <Button size="lg" variant="outline" className="border-2 border-white/80 text-white hover:bg-white hover:text-emerald-600 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm bg-white/10">
                    <Play className="w-5 h-5 mr-2" />
                    Ver Leilões
                  </Button>
                </Link>
                <Link href="/produtos">
                  <Button size="lg" variant="outline" className="border-2 border-white/80 text-white hover:bg-white hover:text-emerald-600 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm bg-white/10">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Acessar Mercado Agro
                  </Button>
                </Link>
              </div>

              {/* Mobile Layout - 1 button on top, 2 buttons below */}
              <div className="flex sm:hidden flex-col gap-4">
                <Link href="/catalogo" className="w-full">
                  <Button size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
                    Explorar Catálogo
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/leiloes">
                    <Button size="lg" variant="outline" className="w-full border-2 border-white/80 text-white hover:bg-white hover:text-emerald-600 px-4 py-4 text-base font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm bg-white/10">
                      <Play className="w-4 h-4 mr-1" />
                      Ver Leilões
                    </Button>
                  </Link>
                  <Link href="/produtos">
                    <Button size="lg" variant="outline" className="w-full border-2 border-white/80 text-white hover:bg-white hover:text-emerald-600 px-4 py-4 text-base font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm bg-white/10">
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      Mercado Agro
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-emerald-600" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Destaques da Semana
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Os melhores animais selecionados especialmente para você
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <ProductCard product={product} variant="detailed" />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/catalogo">
              <Button size="lg" variant="outline" className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300">
                Ver Todos os Animais
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Live Auctions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-3"></div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Leilões ao Vivo
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Participe dos leilões mais emocionantes da agropecuária
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {liveAuctions.map((auction, index) => (
              <Card key={auction.id} className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative">
                  <img src={auction.image} alt={auction.title} className="w-full h-48 object-cover" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-red-500 text-white font-semibold animate-pulse">
                      <Play className="w-3 h-3 mr-1" />
                      AO VIVO
                    </Badge>
                    <Badge className="bg-emerald-600 text-white">{auction.type}</Badge>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-bold">
                    <Clock className="w-4 h-4 inline mr-1" />
                    {auction.timeLeft}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl text-gray-900 mb-3">{auction.title}</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Lance atual:</span>
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
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 text-lg transition-all duration-300 transform hover:scale-105">
                      <Zap className="w-5 h-5 mr-2" />
                      Entrar no Leilão
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/leiloes">
              <Button size="lg" variant="outline" className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300">
                Ver Todos os Leilões
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Agro Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Mercado Agro
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Os melhores produtos agropecuários para sua fazenda
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProductsAgro.map((product, index) => (
              <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <ProductCard product={product} variant="detailed" />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/produtos">
              <Button size="lg" variant="outline" className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300">
                Ver Todos os Produtos
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              🌱 O TudoAgro é mais que uma plataforma de compra e venda — é o ecossistema digital do agronegócio brasileiro
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Conectamos produtores, compradores e empresas do setor agro para anunciar, vender e comprar gado, cavalos, genética, insumos, equipamentos e muito mais — tudo com segurança, tecnologia e liberdade total de uso.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 bg-white animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-green-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Pronto para começar?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de produtores que já transformaram seus negócios com o TudoAgro
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/cadastro">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Users className="w-5 h-5 mr-2" />
                Criar Conta Gratuita
              </Button>
            </Link>
            <Link href="/catalogo">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-emerald-600 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105">
                <Eye className="w-5 h-5 mr-2" />
                Explorar Agora
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
