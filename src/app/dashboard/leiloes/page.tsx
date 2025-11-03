'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import ProtectedRoute from '@/components/ProtectedRoute'
import AdminLayout from '@/components/admin/AdminLayout'
import { 
  Clock, 
  Users, 
  Play, 
  Calendar, 
  MapPin, 
  Trophy, 
  Zap, 
  Timer, 
  TrendingUp
} from 'lucide-react'
import { mockAuctions } from '@/lib/mock-auctions'

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

  // Usar leil?es ao vivo do mock
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

  // Usar pr?ximos leil?es do mock
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
    <ProtectedRoute>
      <AdminLayout>
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Filters */}
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
                      <SelectItem value="semen">S?men</SelectItem>
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
                      <SelectValue placeholder="Localiza??o" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="go">Goi?s</SelectItem>
                      <SelectItem value="mg">Minas Gerais</SelectItem>
                      <SelectItem value="sp">S?o Paulo</SelectItem>
                      <SelectItem value="rs">Rio Grande do Sul</SelectItem>
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

            {/* Live Auctions */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-3"></div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Leil?es ao Vivo
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
                        <Badge className="bg-emerald-600 text-white">{auction.type}</Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <div className="bg-black/70 text-white px-2 py-1 rounded text-sm font-bold">
                          Lote {auction.currentLot || 0}/{auction.totalLots}
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2">{auction.title}</h3>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Lance atual:</span>
                          <div className="text-right">
                            <div className="font-bold text-emerald-600 text-xl">
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

                      <div className="text-sm text-gray-600 mb-4">
                        Leiloeiro: <span className="font-semibold text-gray-900">{auction.auctioneer}</span>
                      </div>

                      <Link href={`/dashboard/leilao/${auction.id}`}>
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-lg py-3 transition-all duration-300 transform hover:scale-105">
                          <Zap className="w-5 h-5 mr-2" />
                          Entrar no Leil?o
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
                <Calendar className="w-6 h-6 text-emerald-600 mr-3" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Pr?ximos Leil?es
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
                        <Badge className="bg-emerald-600 text-white">{auction.type}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2">{auction.title}</h3>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">In?cio:</span>
                          <span className="font-bold text-emerald-600">
                            {auction.startTime ? formatDateTime(auction.startTime) : 'A definir'}
                          </span>
                        </div>
                        
                        {auction.estimatedValue && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Valor estimado:</span>
                            <span className="font-bold text-emerald-600 text-lg">
                              R$ {auction.estimatedValue.toLocaleString()}
                            </span>
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Total de lotes:</span>
                          <span className="font-bold text-gray-900 flex items-center">
                            <Trophy className="w-4 h-4 mr-1 text-emerald-600" />
                            {auction.totalLots} lotes
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

                      <div className="text-sm text-gray-600 mb-4">
                        Leiloeiro: <span className="font-semibold text-gray-900">{auction.auctioneer}</span>
                      </div>

                      <div className="flex gap-2">
                        <Button className="flex-1 bg-amber-500 hover:bg-amber-600 text-white transition-all duration-300 transform hover:scale-105">
                          <TrendingUp className="w-4 h-4 mr-2" />
                          Agendar Lembrete
                        </Button>
                        <Link href={`/dashboard/leilao/${auction.id}`} className="flex-1">
                          <Button variant="outline" className="w-full border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white">
                            Ver Detalhes
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  )
}
