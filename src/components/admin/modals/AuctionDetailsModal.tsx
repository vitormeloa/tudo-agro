'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  X, Gavel, Clock, Users, DollarSign, AlertTriangle, 
  Eye, Play, Pause, Square, CheckCircle, XCircle,
  Calendar, MapPin, Package, TrendingUp, MessageCircle
} from 'lucide-react'

interface AuctionDetailsModalProps {
  auction: {
    id: number
    title: string
    seller: string
    status: string
    bids: number
    currentPrice: string
    endTime: string
    participants: number
    alerts: number
  }
  isOpen: boolean
  onClose: () => void
}

export default function AuctionDetailsModal({ auction, isOpen, onClose }: AuctionDetailsModalProps) {
  const [isManaging, setIsManaging] = useState(false)

  if (!isOpen) return null

  const getStatusBadge = (status: string) => {
    const config = {
      ativo: 'bg-emerald-100 text-emerald-800',
      encerrado: 'bg-gray-100 text-gray-800',
      suspenso: 'bg-red-100 text-red-800'
    }
    return <Badge className={config[status as keyof typeof config]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
  }

  const handleStatusChange = (newStatus: string) => {
    console.log(`Alterando status do leilão ${auction.id} para: ${newStatus}`)
    // Implementar lógica de mudança de status
  }

  const mockBids = [
    { id: 1, bidder: 'João Silva', amount: 'R$ 45.000', time: '2024-01-20 17:45', isHighest: true },
    { id: 2, bidder: 'Fazenda Boa Vista', amount: 'R$ 44.500', time: '2024-01-20 17:30', isHighest: false },
    { id: 3, bidder: 'Carlos Mendes', amount: 'R$ 44.000', time: '2024-01-20 17:15', isHighest: false },
    { id: 4, bidder: 'Maria Santos', amount: 'R$ 43.500', time: '2024-01-20 17:00', isHighest: false },
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <Gavel className="w-6 h-6 text-emerald-800" />
            <div>
              <h2 className="text-xl font-bold text-[#101828]">Detalhes do Leilão #{auction.id}</h2>
              <p className="text-sm text-gray-600">{auction.title}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Informações Principais */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <DollarSign className="w-5 h-5 text-emerald-800" />
                  Informações Financeiras
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-emerald-800">{auction.currentPrice}</p>
                  <p className="text-sm text-gray-600">Lance Atual</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-emerald-800">{auction.bids}</p>
                    <p className="text-xs text-gray-600">Total de Lances</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-emerald-800">{auction.participants}</p>
                    <p className="text-xs text-gray-600">Participantes</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="w-5 h-5 text-emerald-800" />
                  Status e Tempo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  {getStatusBadge(auction.status)}
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-[#101828]">{auction.endTime}</p>
                  <p className="text-sm text-gray-600">Data de Encerramento</p>
                </div>
                {auction.alerts > 0 && (
                  <div className="flex items-center justify-center gap-2 p-2 bg-red-50 rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-red-700">{auction.alerts} alerta{auction.alerts > 1 ? 's' : ''}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="w-5 h-5 text-emerald-800" />
                  Vendedor
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#1E4D2B] rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-2">
                    {auction.seller.charAt(0)}
                  </div>
                  <p className="font-semibold text-[#101828]">{auction.seller}</p>
                  <p className="text-sm text-gray-600">Vendedor Verificado</p>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <Eye className="w-4 h-4 mr-2" />
                  Ver Perfil
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Histórico de Lances */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-800" />
                Histórico de Lances
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockBids.map((bid, index) => (
                  <div key={bid.id} className={`flex items-center justify-between p-3 rounded-lg ${
                    bid.isHighest ? 'bg-emerald-50 border border-emerald-200' : 'bg-gray-50'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        bid.isHighest ? 'bg-emerald-500 text-white' : 'bg-gray-300 text-gray-700'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-[#101828]">{bid.bidder}</p>
                        <p className="text-sm text-gray-600">{bid.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-emerald-800">{bid.amount}</p>
                      {bid.isHighest && (
                        <Badge className="bg-emerald-100 text-emerald-800 text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Maior Lance
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Ações de Gerenciamento */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gavel className="w-5 h-5 text-emerald-800" />
                Ações de Gerenciamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {auction.status === 'ativo' && (
                  <>
                    <Button 
                      variant="outline" 
                      onClick={() => handleStatusChange('suspenso')}
                      className="text-orange-600"
                    >
                      <Pause className="w-4 h-4 mr-2" />
                      Suspender
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleStatusChange('encerrado')}
                      className="text-red-600"
                    >
                      <Square className="w-4 h-4 mr-2" />
                      Encerrar Agora
                    </Button>
                  </>
                )}
                {auction.status === 'suspenso' && (
                  <Button 
                    variant="outline" 
                    onClick={() => handleStatusChange('ativo')}
                    className="text-emerald-600"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Reativar
                  </Button>
                )}
                <Button variant="outline">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contatar Vendedor
                </Button>
                <Button variant="outline">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Reportar Problema
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}