'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Clock, Users, Star, Shield, Award, CheckCircle, MessageCircle, Play, Eye, MapPin, Timer, TrendingUp, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')

  const liveAuctions = [
    {
      id: 1,
      title: "Leilão Fazenda Santa Rita",
      type: "Gado de Corte",
      currentBid: 15000,
      timeLeft: "02:45:30",
      participants: 47,
      image: "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Leilão Elite Genética",
      type: "Cavalos",
      currentBid: 85000,
      timeLeft: "01:12:15",
      participants: 23,
      image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Leilão Sêmen Premium",
      type: "Sêmen Bovino",
      currentBid: 2500,
      timeLeft: "05:30:45",
      participants: 31,
      image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&h=300&fit=crop"
    }
  ]

  const featuredProducts = [
    {
      id: 1,
      title: "Touro Nelore PO",
      category: "Gado de Corte",
      price: 45000,
      location: "Goiás, GO",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=400&h=300&fit=crop",
      seller: "Fazenda Boa Vista"
    },
    {
      id: 2,
      title: "Égua Mangalarga",
      category: "Cavalos",
      price: 25000,
      location: "Minas Gerais, MG",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=400&h=300&fit=crop",
      seller: "Haras São João"
    },
    {
      id: 3,
      title: "Vaca Holandesa",
      category: "Gado de Leite",
      price: 8500,
      location: "São Paulo, SP",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&h=300&fit=crop",
      seller: "Fazenda Três Rios"
    },
    {
      id: 4,
      title: "Sêmen Angus Premium",
      category: "Sêmen",
      price: 150,
      location: "Rio Grande do Sul, RS",
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=400&h=300&fit=crop",
      seller: "Genética Elite"
    }
  ]

  const topSellers = [
    {
      id: 1,
      name: "Fazenda Boa Vista",
      location: "Goiás, GO",
      rating: 4.9,
      sales: 156,
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=100&h=100&fit=crop",
      verified: true
    },
    {
      id: 2,
      name: "Haras São João",
      location: "Minas Gerais, MG",
      rating: 4.8,
      sales: 89,
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=100&h=100&fit=crop",
      verified: true
    },
    {
      id: 3,
      name: "Fazenda Três Rios",
      location: "São Paulo, SP",
      rating: 4.7,
      sales: 234,
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=100&h=100&fit=crop",
      verified: true
    }
  ]

  return (
    <div className="min-h-screen bg-[#F7F6F2]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-[#1E4D2B]">
                AgroMarket
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-[#2B2E2B] hover:text-[#C89F45] transition-colors duration-300">Início</Link>
              <Link href="/catalogo" className="text-[#2B2E2B] hover:text-[#C89F45] transition-colors duration-300">Catálogo</Link>
              <Link href="/leiloes" className="text-[#2B2E2B] hover:text-[#C89F45] transition-colors duration-300">Leilões</Link>
              <Link href="/vender" className="text-[#2B2E2B] hover:text-[#C89F45] transition-colors duration-300">Vender</Link>
              <Link href="/sobre" className="text-[#2B2E2B] hover:text-[#C89F45] transition-colors duration-300">Sobre</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="outline" className="border-[#1E4D2B] text-[#1E4D2B] hover:bg-[#1E4D2B] hover:text-white transition-all duration-300">
                  Entrar
                </Button>
              </Link>
              <Link href="/cadastro">
                <Button className="bg-[#1E4D2B] hover:bg-[#163B20] text-white transition-all duration-300 transform hover:scale-105">
                  Cadastrar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1E4D2B] to-[#2F6C3F] text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
            O Maior Marketplace do Agronegócio
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-[#E0E0E0] max-w-3xl mx-auto">
            Conectamos produtores rurais em todo o Brasil. Compre, venda e participe de leilões com segurança e transparência.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex rounded-lg overflow-hidden shadow-2xl">
              <Input
                type="text"
                placeholder="Buscar gado, cavalos, sêmen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 border-0 text-lg py-4 px-6 focus:ring-0 text-[#2B2E2B]"
              />
              <Link href={`/catalogo?search=${searchQuery}`}>
                <Button className="bg-[#C89F45] hover:bg-[#B8913D] text-white px-8 py-4 rounded-none transition-all duration-300">
                  <Search className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/leiloes">
              <Button className="bg-[#C89F45] hover:bg-[#B8913D] text-white px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                <Zap className="w-5 h-5 mr-2" />
                Participar de Leilão
              </Button>
            </Link>
            <Link href="/cadastro">
              <Button className="bg-[#1E4D2B] hover:bg-[#163B20] text-white px-8 py-4 text-lg font-semibold border-2 border-white/20 transition-all duration-300 transform hover:scale-105">
                Cadastrar Gratuitamente
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-16 bg-[#F7F6F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#1E4D2B] mb-2">50k+</div>
              <div className="text-[#6E7D5B] font-medium">Animais Vendidos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#1E4D2B] mb-2">2.5k+</div>
              <div className="text-[#6E7D5B] font-medium">Fazendas Cadastradas</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#1E4D2B] mb-2">R$ 2.8B</div>
              <div className="text-[#6E7D5B] font-medium">Volume Negociado</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#1E4D2B] mb-2">98%</div>
              <div className="text-[#6E7D5B] font-medium">Satisfação</div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Auctions */}
      <section className="py-16 bg-[#FFFDF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2B2E2B] mb-4">
              🔥 Leilões ao Vivo
            </h2>
            <p className="text-xl text-[#6E7D5B] max-w-2xl mx-auto">
              Participe agora dos leilões em andamento e garante os melhores animais
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {liveAuctions.map((auction) => (
              <Card key={auction.id} className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0">
                <div className="relative">
                  <img src={auction.image} alt={auction.title} className="w-full h-48 object-cover" />
                  <Badge className="absolute top-4 left-4 bg-[#B8413D] text-white font-semibold">
                    <Play className="w-3 h-3 mr-1" />
                    AO VIVO
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg text-[#2B2E2B] mb-2">{auction.title}</h3>
                  <Badge className="bg-[#C89F45] text-white mb-4">{auction.type}</Badge>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-[#6E7D5B]">Lance atual:</span>
                      <span className="font-bold text-[#1E4D2B] text-lg">
                        R$ {auction.currentBid.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#6E7D5B]">Tempo restante:</span>
                      <span className="font-bold text-[#B8413D] flex items-center">
                        <Timer className="w-4 h-4 mr-1" />
                        {auction.timeLeft}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#6E7D5B]">Participantes:</span>
                      <span className="font-bold text-[#2B2E2B] flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {auction.participants}
                      </span>
                    </div>
                  </div>

                  <Link href={`/leilao/${auction.id}`}>
                    <Button className="w-full bg-[#1E4D2B] hover:bg-[#163B20] text-white transition-all duration-300 transform hover:scale-105">
                      Entrar no Leilão
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2B2E2B] mb-4">
              Destaques da Semana
            </h2>
            <p className="text-xl text-[#6E7D5B] max-w-2xl mx-auto">
              Os melhores animais selecionados pela nossa equipe de especialistas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0">
                <div className="relative">
                  <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
                  <Badge className="absolute top-4 left-4 bg-[#C89F45] text-white font-semibold">
                    {product.category}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg text-[#2B2E2B] mb-2">{product.title}</h3>
                  <div className="flex items-center mb-2">
                    <MapPin className="w-4 h-4 text-[#6E7D5B] mr-1" />
                    <span className="text-[#6E7D5B] text-sm">{product.location}</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-[#F1C40F] fill-current' : 'text-gray-300'}`} />
                      ))}
                      <span className="ml-2 text-sm text-[#6E7D5B]">({product.rating})</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-[#1E4D2B]">
                      R$ {product.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-sm text-[#6E7D5B] mb-4">
                    Vendido por: {product.seller}
                  </div>
                  <Link href={`/produto/${product.id}`}>
                    <Button className="w-full bg-[#1E4D2B] hover:bg-[#163B20] text-white transition-all duration-300 transform hover:scale-105">
                      <Eye className="w-4 h-4 mr-2" />
                      Ver Detalhes
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/catalogo">
              <Button className="bg-[#C89F45] hover:bg-[#B8913D] text-white px-8 py-3 text-lg transition-all duration-300 transform hover:scale-105">
                Ver Todo o Catálogo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Top Sellers */}
      <section className="py-16 bg-[#FFFDF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2B2E2B] mb-4">
              Vendedores Recomendados
            </h2>
            <p className="text-xl text-[#6E7D5B] max-w-2xl mx-auto">
              Fazendas e criadores com as melhores avaliações da plataforma
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {topSellers.map((seller) => (
              <Card key={seller.id} className="text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0">
                <CardContent className="p-8">
                  <div className="relative mb-6">
                    <img src={seller.image} alt={seller.name} className="w-20 h-20 rounded-full mx-auto object-cover" />
                    {seller.verified && (
                      <Badge className="absolute -top-2 -right-2 bg-[#C89F45] text-white font-bold px-2 py-1 text-xs">
                        TOP
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-bold text-lg text-[#2B2E2B] mb-2">{seller.name}</h3>
                  <div className="flex items-center justify-center mb-2">
                    <MapPin className="w-4 h-4 text-[#6E7D5B] mr-1" />
                    <span className="text-[#6E7D5B] text-sm">{seller.location}</span>
                  </div>
                  <div className="flex items-center justify-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(seller.rating) ? 'text-[#F1C40F] fill-current' : 'text-gray-300'}`} />
                      ))}
                      <span className="ml-2 text-sm text-[#6E7D5B]">({seller.rating})</span>
                    </div>
                  </div>
                  <div className="text-sm text-[#6E7D5B] mb-6">
                    {seller.sales} vendas realizadas
                  </div>
                  <Link href={`/vendedor/${seller.id}`}>
                    <Button className="w-full bg-[#1E4D2B] hover:bg-[#163B20] text-white transition-all duration-300 transform hover:scale-105">
                      Ver Perfil
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#8A5A32] mb-4">
              Como Funciona
            </h2>
            <p className="text-xl text-[#6E7D5B] max-w-2xl mx-auto">
              Processo simples e seguro para comprar e vender no agronegócio
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1E4D2B] rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#8A5A32] mb-4">1. Cadastrar</h3>
              <p className="text-[#6E7D5B]">
                Crie sua conta gratuita e complete a verificação KYC rural com seus documentos
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#C89F45] rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#8A5A32] mb-4">2. Explorar</h3>
              <p className="text-[#6E7D5B]">
                Navegue pelo catálogo, use filtros avançados e encontre os melhores animais
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1E4D2B] rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#8A5A32] mb-4">3. Negociar</h3>
              <p className="text-[#6E7D5B]">
                Converse com vendedores, participe de leilões ou faça ofertas diretas
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#C89F45] rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#8A5A32] mb-4">4. Finalizar</h3>
              <p className="text-[#6E7D5B]">
                Complete a compra com pagamento seguro e receba toda documentação
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Trust */}
      <section className="py-16 bg-[#1E4D2B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Segurança e Confiança
            </h2>
            <p className="text-xl text-[#E0E0E0] max-w-2xl mx-auto">
              Tecnologia e processos que garantem transações seguras no agronegócio
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">KYC Rural</h3>
              <p className="text-[#E0E0E0]">
                Verificação completa de documentos rurais, CPF/CNPJ e localização das fazendas
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Pagamento Seguro</h3>
              <p className="text-[#E0E0E0]">
                Transações protegidas com garantia de entrega e sistema de escrow
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Certificação</h3>
              <p className="text-[#E0E0E0]">
                Todos os animais com documentação completa e certificados de origem
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-[#F6E3B4] to-[#8A5A32]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#5E3C1B] mb-6">
            Pronto para Começar?
          </h2>
          <p className="text-xl text-[#5E3C1B]/80 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de produtores que já confiam no AgroMarket para suas negociações
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/cadastro">
              <Button className="bg-[#1E4D2B] hover:bg-[#C89F45] text-white px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                <TrendingUp className="w-5 h-5 mr-2" />
                Começar a Vender
              </Button>
            </Link>
            <Button 
              className="bg-transparent border-2 border-[#C89F45] text-[#5E3C1B] hover:bg-[#C89F45] hover:text-white px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
              onClick={() => {
                // Implementar chat interno
                alert('Chat com especialista em breve!')
              }}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Falar com Especialista
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#4A3218] text-[#F7F6F2] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-[#C89F45] mb-4">AgroMarket</h3>
              <p className="text-[#F7F6F2]/80 mb-4">
                A maior plataforma de negócios do agronegócio brasileiro.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-[#C89F45] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">f</span>
                </div>
                <div className="w-8 h-8 bg-[#C89F45] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">i</span>
                </div>
                <div className="w-8 h-8 bg-[#C89F45] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">t</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-[#C89F45]">Categorias</h4>
              <ul className="space-y-2">
                <li><Link href="/catalogo?categoria=gado-corte" className="hover:text-[#C89F45] transition-colors duration-300">Gado de Corte</Link></li>
                <li><Link href="/catalogo?categoria=gado-leite" className="hover:text-[#C89F45] transition-colors duration-300">Gado de Leite</Link></li>
                <li><Link href="/catalogo?categoria=cavalos" className="hover:text-[#C89F45] transition-colors duration-300">Cavalos</Link></li>
                <li><Link href="/catalogo?categoria=semen" className="hover:text-[#C89F45] transition-colors duration-300">Sêmen</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-[#C89F45]">Empresa</h4>
              <ul className="space-y-2">
                <li><Link href="/sobre" className="hover:text-[#C89F45] transition-colors duration-300">Sobre Nós</Link></li>
                <li><Link href="/blog" className="hover:text-[#C89F45] transition-colors duration-300">Blog</Link></li>
                <li><Link href="/contato" className="hover:text-[#C89F45] transition-colors duration-300">Contato</Link></li>
                <li><Link href="/carreiras" className="hover:text-[#C89F45] transition-colors duration-300">Carreiras</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-[#C89F45]">Suporte</h4>
              <ul className="space-y-2">
                <li><Link href="/ajuda" className="hover:text-[#C89F45] transition-colors duration-300">Central de Ajuda</Link></li>
                <li><Link href="/termos" className="hover:text-[#C89F45] transition-colors duration-300">Termos de Uso</Link></li>
                <li><Link href="/privacidade" className="hover:text-[#C89F45] transition-colors duration-300">Política de Privacidade</Link></li>
                <li><Link href="/seguranca" className="hover:text-[#C89F45] transition-colors duration-300">Segurança</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#C89F45]/20 mt-8 pt-8 text-center">
            <p className="text-[#F7F6F2]/60">
              © 2024 AgroMarket. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}