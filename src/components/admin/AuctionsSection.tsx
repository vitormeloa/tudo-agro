'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Gavel, Clock, Users, DollarSign, AlertTriangle, Eye, XCircle, CheckCircle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export default function AuctionsSection() {
  const [selectedAuction, setSelectedAuction] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<'view' | 'end' | 'suspend' | 'investigate'>('view')
  const [reason, setReason] = useState('')

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
      alerts: 0,
      description: 'Leilão de gado Nelore PO com excelente genética',
      items: ['Touro Nelore #001', 'Touro Nelore #002', 'Vaca Nelore #003']
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
      alerts: 0,
      description: 'Leilão de cavalos Mangalarga Marchador registrados',
      items: ['Égua Mangalarga #001', 'Potro Mangalarga #002']
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
      alerts: 2,
      description: 'Leilão de sêmen bovino de touros campeões',
      items: ['Sêmen Touro Campeão A', 'Sêmen Touro Campeão B'],
      suspensionReason: 'Documentação pendente'
    }
  ]

  const getStatusBadge = (status: string) => {
    const config = {
      ativo: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      encerrado: { color: 'bg-gray-100 text-gray-800', icon: Clock },
      suspenso: { color: 'bg-red-100 text-red-800', icon: XCircle }
    }
    const { color, icon: Icon } = config[status as keyof typeof config] || config.ativo
    return (
      <Badge className={color}>
        <Icon className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const handleAction = (auction: any, action: 'view' | 'end' | 'suspend' | 'investigate') => {
    setSelectedAuction(auction)
    setModalType(action)
    setShowModal(true)
    setReason('')
  }

  const handleConfirmAction = () => {
    if (!selectedAuction) return

    switch (modalType) {
      case 'end':
        console.log(`Encerrando leilão ${selectedAuction.id}`)
        break
      case 'suspend':
        if (!reason.trim()) return
        console.log(`Suspendendo leilão ${selectedAuction.id} com motivo: ${reason}`)
        break
      case 'investigate':
        console.log(`Investigando leilão ${selectedAuction.id}`)
        break
    }
    
    setShowModal(false)
    setSelectedAuction(null)
  }

  const renderModalContent = () => {
    if (!selectedAuction) return null

    switch (modalType) {
      case 'view':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-[#2B2E2B] mb-2">Informações do Leilão</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>ID:</strong> #{selectedAuction.id}</p>
                  <p><strong>Vendedor:</strong> {selectedAuction.seller}</p>
                  <p><strong>Status:</strong> {getStatusBadge(selectedAuction.status)}</p>
                  <p><strong>Encerramento:</strong> {selectedAuction.endTime}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-[#2B2E2B] mb-2">Estatísticas</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Lances:</strong> {selectedAuction.bids}</p>
                  <p><strong>Participantes:</strong> {selectedAuction.participants}</p>
                  <p><strong>Lance Atual:</strong> {selectedAuction.currentPrice}</p>
                  <p><strong>Alertas:</strong> {selectedAuction.alerts}</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-[#2B2E2B] mb-2">Descrição</h4>
              <p className="text-sm text-[#6E7D5B] bg-[#F7F6F2] p-3 rounded-lg">{selectedAuction.description}</p>
            </div>
            <div>
              <h4 className="font-semibold text-[#2B2E2B] mb-2">Itens do Leilão</h4>
              <div className="space-y-2">
                {selectedAuction.items.map((item: string, index: number) => (
                  <div key={index} className="p-2 bg-[#F7F6F2] rounded text-sm">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            {selectedAuction.suspensionReason && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">
                  <strong>Motivo da Suspensão:</strong> {selectedAuction.suspensionReason}
                </p>
              </div>
            )}
          </div>
        )

      case 'end':
        return (
          <div className="space-y-4">
            <p className="text-[#6E7D5B]">Tem certeza que deseja encerrar este leilão?</p>
            <div className="p-4 bg-[#F7F6F2] rounded-lg">
              <h4 className="font-semibold text-[#2B2E2B]">#{selectedAuction.id}</h4>
              <p className="text-sm text-[#6E7D5B]">{selectedAuction.title}</p>
              <p className="text-sm text-[#6E7D5B]">Lance atual: {selectedAuction.currentPrice}</p>
            </div>
            <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-sm text-orange-800">
                <Clock className="w-4 h-4 inline mr-1" />
                O leilão será encerrado imediatamente e o lance atual será considerado vencedor.
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowModal(false)}>Cancelar</Button>
              <Button onClick={handleConfirmAction} className="bg-orange-600 hover:bg-orange-700">
                <Clock className="w-4 h-4 mr-2" />
                Encerrar Leilão
              </Button>
            </div>
          </div>
        )

      case 'suspend':
        return (
          <div className="space-y-4">
            <p className="text-[#6E7D5B]">Por que você está suspendendo este leilão?</p>
            <div className="p-4 bg-[#F7F6F2] rounded-lg">
              <h4 className="font-semibold text-[#2B2E2B]">#{selectedAuction.id}</h4>
              <p className="text-sm text-[#6E7D5B]">{selectedAuction.title}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2B2E2B] mb-2">Motivo da suspensão:</label>
              <Textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Explique o motivo da suspensão..."
                className="min-h-20"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowModal(false)}>Cancelar</Button>
              <Button 
                onClick={handleConfirmAction} 
                className="bg-red-600 hover:bg-red-700"
                disabled={!reason.trim()}
              >
                <XCircle className="w-4 h-4 mr-2" />
                Suspender Leilão
              </Button>
            </div>
          </div>
        )

      case 'investigate':
        return (
          <div className="space-y-4">
            <p className="text-[#6E7D5B]">Investigação de alertas para este leilão:</p>
            <div className="p-4 bg-[#F7F6F2] rounded-lg">
              <h4 className="font-semibold text-[#2B2E2B]">#{selectedAuction.id}</h4>
              <p className="text-sm text-[#6E7D5B]">{selectedAuction.title}</p>
              <p className="text-sm text-red-600 mt-2">
                <AlertTriangle className="w-4 h-4 inline mr-1" />
                {selectedAuction.alerts} alerta(s) recebido(s)
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowModal(false)}>Fechar</Button>
              <Button onClick={handleConfirmAction} className="bg-blue-600 hover:bg-blue-700">
                <Eye className="w-4 h-4 mr-2" />
                Marcar como Investigado
              </Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Gavel className="w-5 h-5 text-[#1E4D2B]" />
              Gerenciamento de Leilões
            </div>
            <div className="flex items-center gap-4 text-sm text-[#6E7D5B]">
              <span>Ativos: {auctions.filter(a => a.status === 'ativo').length}</span>
              <span>Encerrados: {auctions.filter(a => a.status === 'encerrado').length}</span>
              <span>Suspensos: {auctions.filter(a => a.status === 'suspenso').length}</span>
            </div>
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
                      <Button variant="outline" size="sm" onClick={() => handleAction(auction, 'view')}>
                        <Eye className="w-4 h-4 mr-2" />
                        Ver Leilão
                      </Button>
                      {auction.status === 'ativo' && (
                        <>
                          <Button variant="outline" size="sm" className="text-orange-600" onClick={() => handleAction(auction, 'end')}>
                            <Clock className="w-4 h-4 mr-2" />
                            Encerrar
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600" onClick={() => handleAction(auction, 'suspend')}>
                            <XCircle className="w-4 h-4 mr-2" />
                            Suspender
                          </Button>
                        </>
                      )}
                      {auction.alerts > 0 && (
                        <Button variant="outline" size="sm" className="text-blue-600" onClick={() => handleAction(auction, 'investigate')}>
                          <AlertTriangle className="w-4 h-4 mr-2" />
                          Investigar
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

      {/* Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Gavel className="w-5 h-5 text-[#1E4D2B]" />
              {modalType === 'view' && 'Detalhes do Leilão'}
              {modalType === 'end' && 'Encerrar Leilão'}
              {modalType === 'suspend' && 'Suspender Leilão'}
              {modalType === 'investigate' && 'Investigar Alertas'}
            </DialogTitle>
          </DialogHeader>
          {renderModalContent()}
        </DialogContent>
      </Dialog>
    </div>
  )
}