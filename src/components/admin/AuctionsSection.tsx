'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Gavel, Clock, Users, DollarSign, AlertTriangle, Eye } from 'lucide-react'

export default function AuctionsSection() {
  const auctions = [
    {
      id: 1247,
      title: 'Leilão de Gado Nelore - Fazenda Santa Rita',
      seller: 'Fazenda Santa Rita',
      status: 'ativo',
      bids: 23,
      currentPrice: 'R$ 45.000',
      endTime: '2024-01-21 18:00',
      participants: 12,
      alerts: 0
    },
    {
      id: 1248,
      title: 'Cavalos Mangalarga - Haras Boa Esperança',
      seller: 'Haras Boa Esperança',
      status: 'encerrado',
      bids: 18,
      currentPrice: 'R$ 32.500',
      endTime: '2024-01-20 20:00',
      participants: 8,
      alerts: 0
    },
    {
      id: 1249,
      title: 'Sêmen Bovino Premium - Genética Superior',
      seller: 'Central de Sêmen Brasil',
      status: 'suspenso',
      bids: 5,
      currentPrice: 'R$ 2.500',
      endTime: '2024-01-22 16:00',
      participants: 4,
      alerts: 2
    }
  ]

  const getStatusBadge = (status: string) => {
    const config = {
      ativo: 'bg-green-100 text-green-800',
      encerrado: 'bg-gray-100 text-gray-800',
      suspenso: 'bg-red-100 text-red-800'
    }
    return <Badge className={config[status as keyof typeof config]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gavel className="w-5 h-5 text-[#1E4D2B]" />
            Gerenciamento de Leilões
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {auctions.map((auction) => (
              <Card key={auction.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-[#2B2E2B]">#{auction.id}</h3>
                        {getStatusBadge(auction.status)}
                        {auction.alerts > 0 && (
                          <Badge className="bg-red-100 text-red-800">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            {auction.alerts} alerta{auction.alerts > 1 ? 's' : ''}
                          </Badge>
                        )}
                      </div>
                      <h4 className="font-medium text-[#2B2E2B] mb-2">{auction.title}</h4>
                      <p className="text-sm text-[#6E7D5B] mb-4">Vendedor: {auction.seller}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-[#1E4D2B]">{auction.bids}</p>
                          <p className="text-xs text-[#6E7D5B]">Lances</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-[#1E4D2B]">{auction.participants}</p>
                          <p className="text-xs text-[#6E7D5B]">Participantes</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-[#1E4D2B]">{auction.currentPrice}</p>
                          <p className="text-xs text-[#6E7D5B]">Lance Atual</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium text-[#2B2E2B]">{auction.endTime}</p>
                          <p className="text-xs text-[#6E7D5B]">Encerramento</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Ver Leilão
                      </Button>
                      {auction.status === 'ativo' && (
                        <Button variant="outline" size="sm" className="text-red-600">
                          <Clock className="w-4 h-4 mr-2" />
                          Encerrar
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}