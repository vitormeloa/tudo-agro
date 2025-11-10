'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { 
  Clock, 
  Users, 
  Play, 
  Calendar, 
  MapPin, 
  Trophy, 
  Zap, 
  Timer, 
  TrendingUp,
  Gavel,
  Star
} from 'lucide-react'
import { mockAuctions } from '@/lib/mock-auctions'

const brazilianStates = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
];

export default function LeiloesPage() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setCurrentTime(new Date())
    
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const liveAuctions = mockAuctions.filter(a => a.status === 'live').map(a => ({
    id: a.id,
    title: a.title,
    type: a.type,
    currentBid: a.currentBid || 0,
    startingBid: a.startingBid || 0,
    endTime: a.endTime || new Date(),
    participants: a.participants,
    totalLots: a.totalLots,
    currentLot: a.currentLotNumber || 0,
    image: a.image,
    videoUrl: a.videoUrl,
    location: a.location,
    auctioneer: a.auctioneer,
    status: a.status
  }))

  const upcomingAuctions = mockAuctions.filter(a => a.status === 'scheduled').map(a => ({
    id: a.id,
    title: a.title,
    type: a.type,
    startTime: a.startTime || new Date(),
    estimatedValue: a.estimatedValue || 0,
    totalLots: a.totalLots,
    image: a.image,
    location: a.location,
    auctioneer: a.auctioneer,
    status: a.status
  }))

  const formatTimeLeft = (endTime: Date) => {
    if (!currentTime || !mounted) return "--:--:--"
    
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
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {}
        <section className="relative pt-16 pb-20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-primary to-primary/90"></div>
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute inset-0 opacity-40">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">
                    Leilões Online
                </h1>
                <p className="text-base sm:text-lg md:text-xl mb-0 text-white/90 max-w-3xl mx-auto leading-relaxed">
                    Participe dos melhores leilões do agronegócio em tempo real
                </p>
            </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {}
        <Card className="shadow-lg border-0 mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Select>
                <SelectTrigger className="h-10">
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
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="live">Ao Vivo</SelectItem>
                  <SelectItem value="scheduled">Agendados</SelectItem>
                  <SelectItem value="finished">Finalizados</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Localização" />
                </SelectTrigger>
                <SelectContent>
                  {brazilianStates.map(state => (
                    <SelectItem key={state.value} value={state.value.toLowerCase()}>{state.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="h-10">
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
          </CardContent>
        </Card>

        {}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-3"></div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#101828]">
                Leilões ao Vivo
              </h2>
            </div>
            <Badge className="ml-4 bg-red-500 text-white font-semibold">
              {liveAuctions.length} ATIVOS
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {liveAuctions.map((auction, index) => (
              <Card key={auction.id} className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 bg-gradient-to-br from-white to-gray-50 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative">
                  <img src={auction.image} alt={auction.title} className="w-full h-48 object-cover" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-red-500 text-white font-semibold animate-pulse">
                      <Play className="w-3 h-3 mr-1" />
                      AO VIVO
                    </Badge>
                    <Badge className="bg-primary text-white">{auction.type}</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-black/70 text-white px-2 py-1 rounded text-sm font-bold">
                      Lote {auction.currentLot || 0}/{auction.totalLots}
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg text-[#101828] mb-3 line-clamp-2">{auction.title}</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Lance atual:</span>
                      <div className="text-right">
                        <div className="font-bold text-primary text-xl">
                          R$ {auction.currentBid.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          (inicial: R$ {auction.startingBid.toLocaleString()})
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Tempo restante:</span>
                      <div className="font-bold text-red-500 flex items-center text-lg">
                        <Timer className="w-4 h-4 mr-1" />
                        {formatTimeLeft(auction.endTime)}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Participantes:</span>
                      <span className="font-bold text-[#101828] flex items-center">
                        <Users className="w-4 h-4 mr-1 text-primary" />
                        {auction.participants} online
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Local:</span>
                      <span className="font-semibold text-[#101828] flex items-center">
                        <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                        {auction.location}
                      </span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 mb-4">
                    Leiloeiro: <span className="font-semibold text-[#101828]">{auction.auctioneer}</span>
                  </div>

                  <Link href={`/leilao/${auction.id}`}>
                    <Button className="w-full bg-primary hover:bg-[#2E7A5A] text-white text-lg py-3 transition-all duration-300 transform hover:scale-105">
                      <Zap className="w-5 h-5 mr-2" />
                      Entrar no Leilão
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {}
        <section>
          <div className="flex items-center mb-6">
            <Calendar className="w-6 h-6 text-primary mr-3" />
            <h2 className="text-2xl md:text-3xl font-bold text-[#101828]">
              Próximos Leilões
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingAuctions.map((auction, index) => (
              <Card key={auction.id} className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative">
                  <img src={auction.image} alt={auction.title} className="w-full h-48 object-cover" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-amber-500 text-white font-semibold">
                      <Calendar className="w-3 h-3 mr-1" />
                      AGENDADO
                    </Badge>
                    <Badge className="bg-primary text-white">{auction.type}</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg text-[#101828] mb-3 line-clamp-2">{auction.title}</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Início:</span>
                      <span className="font-bold text-primary">
                        {auction.startTime ? formatDateTime(auction.startTime) : 'A definir'}
                      </span>
                    </div>
                    
                    {auction.estimatedValue && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Valor estimado:</span>
                        <span className="font-bold text-primary text-lg">
                          R$ {auction.estimatedValue.toLocaleString()}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total de lotes:</span>
                      <span className="font-bold text-[#101828] flex items-center">
                        <Trophy className="w-4 h-4 mr-1 text-primary" />
                        {auction.totalLots} lotes
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Local:</span>
                      <span className="font-semibold text-[#101828] flex items-center">
                        <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                        {auction.location}
                      </span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 mb-4">
                    Leiloeiro: <span className="font-semibold text-[#101828]">{auction.auctioneer}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-amber-500 hover:bg-amber-600 text-white transition-all duration-300 transform hover:scale-105">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Agendar Lembrete
                    </Button>
                    <Link href={`/leilao/${auction.id}`} className="flex-1">
                      <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white">
                        Ver Detalhes
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {}
        <section className="mt-16 bg-gradient-to-br from-teal-600 to-primary/90 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Quer organizar seu próprio leilão?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
            Nossa plataforma oferece todas as ferramentas para você realizar leilões profissionais
          </p>
          <Link href="/login">
            <Button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 text-lg transition-all duration-300 transform hover:scale-105">
              <Gavel className="w-5 h-5 mr-2" />
              Criar Meu Leilão
            </Button>
          </Link>
        </section>
      </div>

      <Footer />
    </div>
  )
}
