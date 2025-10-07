'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Clock, Users, Play, Calendar, MapPin, Trophy, Zap, Timer, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function LeiloesPage() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const liveAuctions = [
    {
      id: 1,
      title: "Leilão Fazenda Santa Rita - Elite Nelore",
      type: "Gado de Corte",
      currentBid: 15000,
      startingBid: 8000,
      endTime: new Date(Date.now() + 2 * 60 * 60 * 1000 + 45 * 60 * 1000 + 30 * 1000),
      participants: 47,
      totalLots: 25,
      currentLot: 8,
      image: "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=400&h=300&fit=crop",
      location: "Goiás, GO",
      auctioneer: "Leiloeiro João Silva",
      status: "live"
    },
    {
      id: 2,
      title: "Leilão Elite Genética - Cavalos Premium",
      type: "Cavalos",
      currentBid: 85000,
      startingBid: 45000,
      endTime: new Date(Date.now() + 1 * 60 * 60 * 1000 + 12 * 60 * 1000 + 15 * 1000),
      participants: 23,
      totalLots: 12,
      currentLot: 4,
      image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=400&h=300&fit=crop",
      location: "Minas Gerais, MG",
      auctioneer: "Leiloeiro Maria Santos",
      status: "live"
    },
    {
      id: 3,
      title: "Leilão Sêmen Premium - Genética Certificada",
      type: "Sêmen Bovino",
      currentBid: 2500,
      startingBid: 800,
      endTime: new Date(Date.now() + 5 * 60 * 60 * 1000 + 30 * 60 * 1000 + 45 * 1000),
      participants: 31,
      totalLots: 50,
      currentLot: 15,
      image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&h=300&fit=crop",
      location: "São Paulo, SP",
      auctioneer: "Leiloeiro Carlos Oliveira",
      status: "live"
    }
  ]

  const upcomingAuctions = [
    {
      id: 4,
      title: "Leilão Fazenda Boa Esperança",
      type: "Gado de Leite",
      startTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
      estimatedValue: 500000,
      totalLots: 35,
      image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&h=300&fit=crop",
      location: "Rio Grande do Sul, RS",
      auctioneer: "Leiloeiro Ana Costa",
      status: "scheduled"
    },
    {
      id: 5,
      title: "Leilão Haras Três Corações",
      type: "Cavalos",
      startTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      estimatedValue: 1200000,
      totalLots: 18,
      image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=400&h=300&fit=crop",
      location: "Minas Gerais, MG",
      auctioneer: "Leiloeiro Roberto Lima",
      status: "scheduled"
    },
    {
      id: 6,
      title: "Leilão Genética Premium",
      type: "Sêmen",
      startTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      estimatedValue: 150000,
      totalLots: 80,
      image: "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=400&h=300&fit=crop",
      location: "Goiás, GO",
      auctioneer: "Leiloeiro Pedro Alves",
      status: "scheduled"
    }
  ]

  const formatTimeLeft = (endTime: Date) => {
    const now = currentTime
    const diff = endTime.getTime() - now.getTime()
    
    if (diff <= 0) return "Encerrado"
    
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const formatDateTime = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

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
              <Link href="/leiloes" className="text-[#C89F45] font-semibold">Leilões</Link>
              <Link href="/vender" className="text-[#2B2E2B] hover:text-[#C89F45] transition-colors duration-300">Vender</Link>
              <Link href="/sobre" className="text-[#2B2E2B] hover:text-[#C89F45] transition-colors duration-300">Sobre</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="outline" className="border-[#1E4D2B] text-[#1E4D2B] hover:bg-[#1E4D2B] hover:text-white">
                  Entrar
                </Button>
              </Link>
              <Link href="/cadastro">
                <Button className="bg-[#1E4D2B] hover:bg-[#163B20] text-white">
                  Cadastrar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2B2E2B] mb-4">
            🔥 Leilões Online
          </h1>
          <p className="text-xl text-[#6E7D5B] max-w-2xl mx-auto">
            Participe dos melhores leilões do agronegócio em tempo real
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gado-corte">Gado de Corte</SelectItem>
                <SelectItem value="gado-leite">Gado de Leite</SelectItem>
                <SelectItem value="cavalos">Cavalos</SelectItem>
                <SelectItem value="semen">Sêmen</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="live">Ao Vivo</SelectItem>
                <SelectItem value="scheduled">Agendados</SelectItem>
                <SelectItem value="finished">Finalizados</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Localização" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="go">Goiás</SelectItem>
                <SelectItem value="mg">Minas Gerais</SelectItem>
                <SelectItem value="sp">São Paulo</SelectItem>
                <SelectItem value="rs">Rio Grande do Sul</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tempo">Tempo Restante</SelectItem>
                <SelectItem value="participantes">Mais Participantes</SelectItem>
                <SelectItem value="valor">Maior Valor</SelectItem>
                <SelectItem value="recente">Mais Recentes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Live Auctions */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-[#B8413D] rounded-full animate-pulse mr-3"></div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#2B2E2B]">
                Leilões ao Vivo
              </h2>
            </div>
            <Badge className="ml-4 bg-[#B8413D] text-white font-semibold">
              {liveAuctions.length} ATIVOS
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {liveAuctions.map((auction) => (
              <Card key={auction.id} className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 bg-gradient-to-br from-white to-[#FFFDF7]">
                <div className="relative">
                  <img src={auction.image} alt={auction.title} className="w-full h-48 object-cover" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-[#B8413D] text-white font-semibold animate-pulse">
                      <Play className="w-3 h-3 mr-1" />
                      AO VIVO
                    </Badge>
                    <Badge className="bg-[#C89F45] text-white">{auction.type}</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-black/70 text-white px-2 py-1 rounded text-sm font-bold">
                      Lote {auction.currentLot}/{auction.totalLots}
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg text-[#2B2E2B] mb-3 line-clamp-2">{auction.title}</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-[#6E7D5B]">Lance atual:</span>
                      <div className="text-right">
                        <div className="font-bold text-[#1E4D2B] text-xl">
                          R$ {auction.currentBid.toLocaleString()}
                        </div>
                        <div className="text-xs text-[#6E7D5B]">
                          (inicial: R$ {auction.startingBid.toLocaleString()})
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-[#6E7D5B]">Tempo restante:</span>
                      <div className="font-bold text-[#B8413D] flex items-center text-lg">
                        <Timer className="w-4 h-4 mr-1" />
                        {formatTimeLeft(auction.endTime)}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-[#6E7D5B]">Participantes:</span>
                      <span className="font-bold text-[#2B2E2B] flex items-center">
                        <Users className="w-4 h-4 mr-1 text-[#C89F45]" />
                        {auction.participants} online
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-[#6E7D5B]">Local:</span>
                      <span className="font-semibold text-[#2B2E2B] flex items-center">
                        <MapPin className="w-4 h-4 mr-1 text-[#6E7D5B]" />
                        {auction.location}
                      </span>
                    </div>
                  </div>

                  <div className="text-sm text-[#6E7D5B] mb-4">
                    Leiloeiro: <span className="font-semibold text-[#2B2E2B]">{auction.auctioneer}</span>
                  </div>

                  <Link href={`/leilao/${auction.id}`}>
                    <Button className="w-full bg-[#1E4D2B] hover:bg-[#163B20] text-white text-lg py-3 transition-all duration-300 transform hover:scale-105">
                      <Zap className="w-5 h-5 mr-2" />
                      Entrar no Leilão
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Upcoming Auctions */}
        <section>
          <div className="flex items-center mb-6">
            <Calendar className="w-6 h-6 text-[#C89F45] mr-3" />
            <h2 className="text-2xl md:text-3xl font-bold text-[#2B2E2B]">
              Próximos Leilões
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingAuctions.map((auction) => (
              <Card key={auction.id} className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0">
                <div className="relative">
                  <img src={auction.image} alt={auction.title} className="w-full h-48 object-cover" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-[#8A5A32] text-white font-semibold">
                      <Calendar className="w-3 h-3 mr-1" />
                      AGENDADO
                    </Badge>
                    <Badge className="bg-[#C89F45] text-white">{auction.type}</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg text-[#2B2E2B] mb-3 line-clamp-2">{auction.title}</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-[#6E7D5B]">Início:</span>
                      <span className="font-bold text-[#1E4D2B]">
                        {formatDateTime(auction.startTime)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-[#6E7D5B]">Valor estimado:</span>
                      <span className="font-bold text-[#1E4D2B] text-lg">
                        R$ {auction.estimatedValue.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-[#6E7D5B]">Total de lotes:</span>
                      <span className="font-bold text-[#2B2E2B] flex items-center">
                        <Trophy className="w-4 h-4 mr-1 text-[#C89F45]" />
                        {auction.totalLots} lotes
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-[#6E7D5B]">Local:</span>
                      <span className="font-semibold text-[#2B2E2B] flex items-center">
                        <MapPin className="w-4 h-4 mr-1 text-[#6E7D5B]" />
                        {auction.location}
                      </span>
                    </div>
                  </div>

                  <div className="text-sm text-[#6E7D5B] mb-4">
                    Leiloeiro: <span className="font-semibold text-[#2B2E2B]">{auction.auctioneer}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-[#C89F45] hover:bg-[#B8913D] text-white transition-all duration-300 transform hover:scale-105">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Agendar Lembrete
                    </Button>
                    <Button variant="outline" className="border-[#1E4D2B] text-[#1E4D2B] hover:bg-[#1E4D2B] hover:text-white">
                      Ver Detalhes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-16 bg-gradient-to-br from-[#1E4D2B] to-[#2F6C3F] rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Quer organizar seu próprio leilão?
          </h2>
          <p className="text-xl text-[#E0E0E0] mb-6 max-w-2xl mx-auto">
            Nossa plataforma oferece todas as ferramentas para você realizar leilões profissionais
          </p>
          <Link href="/vender">
            <Button className="bg-[#C89F45] hover:bg-[#B8913D] text-white px-8 py-3 text-lg transition-all duration-300 transform hover:scale-105">
              Criar Meu Leilão
            </Button>
          </Link>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-[#4A3218] text-[#F7F6F2] py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-[#C89F45] mb-4">AgroMarket</h3>
              <p className="text-[#F7F6F2]/80 mb-4">
                A maior plataforma de negócios do agronegócio brasileiro.
              </p>
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
                <li><Link href="/contato" className="hover:text-[#C89F45] transition-colors duration-300">Contato</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-[#C89F45]">Suporte</h4>
              <ul className="space-y-2">
                <li><Link href="/ajuda" className="hover:text-[#C89F45] transition-colors duration-300">Central de Ajuda</Link></li>
                <li><Link href="/termos" className="hover:text-[#C89F45] transition-colors duration-300">Termos de Uso</Link></li>
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