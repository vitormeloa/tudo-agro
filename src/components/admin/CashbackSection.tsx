'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Gift, DollarSign, CheckCircle, Clock, User, Eye, XCircle, Download } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export default function CashbackSection() {
  const [selectedCashback, setSelectedCashback] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<'view' | 'approve' | 'reject'>('view')
  const [rejectionReason, setRejectionReason] = useState('')

  const cashbackData = [
    {
      id: 1,
      user: 'João Silva',
      amount: 'R$ 450,00',
      origin: 'Compra',
      status: 'pendente',
      requestDate: '2024-01-19',
      description: 'Cashback de compra - Touro Nelore',
      details: {
        originalPurchase: 'R$ 15.000,00',
        percentage: '3%',
        transactionId: 'TXN-001'
      }
    },
    {
      id: 2,
      user: 'Maria Santos',
      amount: 'R$ 125,00',
      origin: 'Indicação',
      status: 'aprovado',
      requestDate: '2024-01-18',
      description: 'Cashback por indicação de novo usuário',
      details: {
        referredUser: 'Carlos Mendes',
        bonusType: 'Indicação',
        percentage: '5%'
      }
    },
    {
      id: 3,
      user: 'Carlos Mendes',
      amount: 'R$ 890,00',
      origin: 'VIP',
      status: 'pago',
      requestDate: '2024-01-17',
      description: 'Cashback VIP - Bônus mensal',
      details: {
        vipLevel: 'Premium',
        period: 'Janeiro 2024',
        percentage: '5%'
      }
    }
  ]

  const getStatusBadge = (status: string) => {
    const config = {
      pendente: { color: 'bg-orange-100 text-orange-800', icon: Clock },
      aprovado: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      pago: { color: 'bg-blue-100 text-blue-800', icon: CheckCircle },
      recusado: { color: 'bg-red-100 text-red-800', icon: XCircle }
    }
    const { color, icon: Icon } = config[status as keyof typeof config] || config.pendente
    return (
      <Badge className={color}>
        <Icon className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const handleAction = (cashback: any, action: 'view' | 'approve' | 'reject') => {
    setSelectedCashback(cashback)
    setModalType(action)
    setShowModal(true)
    setRejectionReason('')
  }

  const handleConfirmAction = () => {
    if (!selectedCashback) return

    switch (modalType) {
      case 'approve':
        console.log(`Aprovando cashback ${selectedCashback.id}`)
        break
      case 'reject':
        if (!rejectionReason.trim()) return
        console.log(`Recusando cashback ${selectedCashback.id} com motivo: ${rejectionReason}`)
        break
    }
    
    setShowModal(false)
    setSelectedCashback(null)
  }

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "ID,Usuario,Valor,Origem,Status,Data,Descricao\n" +
      cashbackData.map(c => 
        `${c.id},${c.user},${c.amount},${c.origin},${c.status},${c.requestDate},${c.description}`
      ).join("\n")
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "cashback.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const renderModalContent = () => {
    if (!selectedCashback) return null

    switch (modalType) {
      case 'view':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-[#2B2E2B] mb-2">Informações do Cashback</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>ID:</strong> #{selectedCashback.id}</p>
                  <p><strong>Usuário:</strong> {selectedCashback.user}</p>
                  <p><strong>Valor:</strong> {selectedCashback.amount}</p>
                  <p><strong>Origem:</strong> {selectedCashback.origin}</p>
                  <p><strong>Status:</strong> {getStatusBadge(selectedCashback.status)}</p>
                  <p><strong>Data:</strong> {new Date(selectedCashback.requestDate).toLocaleDateString('pt-BR')}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-[#2B2E2B] mb-2">Detalhes</h4>
                <div className="space-y-2 text-sm">
                  {Object.entries(selectedCashback.details).map(([key, value]) => (
                    <p key={key}>
                      <strong>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:</strong> {value as string}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-[#2B2E2B] mb-2">Descrição</h4>
              <p className="text-sm text-[#6E7D5B] bg-[#F7F6F2] p-3 rounded-lg">{selectedCashback.description}</p>
            </div>
          </div>
        )

      case 'approve':
        return (
          <div className="space-y-4">
            <p className="text-[#6E7D5B]">Tem certeza que deseja aprovar este cashback?</p>
            <div className="p-4 bg-[#F7F6F2] rounded-lg">
              <h4 className="font-semibold text-[#2B2E2B]">#{selectedCashback.id}</h4>
              <p className="text-sm text-[#6E7D5B]">Usuário: {selectedCashback.user}</p>
              <p className="text-sm text-[#6E7D5B]">Valor: {selectedCashback.amount}</p>
              <p className="text-sm text-[#6E7D5B]">Origem: {selectedCashback.origin}</p>
            </div>
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                <CheckCircle className="w-4 h-4 inline mr-1" />
                O cashback será aprovado e ficará disponível para saque pelo usuário.
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowModal(false)}>Cancelar</Button>
              <Button onClick={handleConfirmAction} className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="w-4 h-4 mr-2" />
                Aprovar Cashback
              </Button>
            </div>
          </div>
        )

      case 'reject':
        return (
          <div className="space-y-4">
            <p className="text-[#6E7D5B]">Por que você está recusando este cashback?</p>
            <div className="p-4 bg-[#F7F6F2] rounded-lg">
              <h4 className="font-semibold text-[#2B2E2B]">#{selectedCashback.id}</h4>
              <p className="text-sm text-[#6E7D5B]">Usuário: {selectedCashback.user}</p>
              <p className="text-sm text-[#6E7D5B]">Valor: {selectedCashback.amount}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2B2E2B] mb-2">Motivo da recusa:</label>
              <Textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Explique o motivo da recusa..."
                className="min-h-20"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowModal(false)}>Cancelar</Button>
              <Button 
                onClick={handleConfirmAction} 
                className="bg-red-600 hover:bg-red-700"
                disabled={!rejectionReason.trim()}
              >
                <XCircle className="w-4 h-4 mr-2" />
                Recusar Cashback
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
              <Gift className="w-5 h-5 text-[#1E4D2B]" />
              Controle de Cashback
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-[#6E7D5B]">
                Total distribuído: R$ 89.432,00
              </div>
              <Button variant="outline" size="sm" onClick={handleExportCSV}>
                <Download className="w-4 h-4 mr-2" />
                Exportar CSV
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {cashbackData.map((cashback) => (
              <Card key={cashback.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <User className="w-5 h-5 text-[#6E7D5B]" />
                        <h3 className="font-semibold text-[#2B2E2B]">{cashback.user}</h3>
                        {getStatusBadge(cashback.status)}
                        <Badge variant="outline">{cashback.origin}</Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-[#6E7D5B]">
                        <div>
                          <p className="font-medium">Valor:</p>
                          <p className="text-lg font-bold text-[#1E4D2B]">{cashback.amount}</p>
                        </div>
                        <div>
                          <p className="font-medium">Data da Solicitação:</p>
                          <p>{new Date(cashback.requestDate).toLocaleDateString('pt-BR')}</p>
                        </div>
                        <div>
                          <p className="font-medium">Descrição:</p>
                          <p>{cashback.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <Button variant="outline" size="sm" onClick={() => handleAction(cashback, 'view')}>
                        <Eye className="w-4 h-4 mr-2" />
                        Ver Detalhes
                      </Button>
                      {cashback.status === 'pendente' && (
                        <>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleAction(cashback, 'approve')}>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Aprovar
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600" onClick={() => handleAction(cashback, 'reject')}>
                            <XCircle className="w-4 h-4 mr-2" />
                            Recusar
                          </Button>
                        </>
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
              <Gift className="w-5 h-5 text-[#1E4D2B]" />
              {modalType === 'view' && 'Detalhes do Cashback'}
              {modalType === 'approve' && 'Aprovar Cashback'}
              {modalType === 'reject' && 'Recusar Cashback'}
            </DialogTitle>
          </DialogHeader>
          {renderModalContent()}
        </DialogContent>
      </Dialog>
    </div>
  )
}