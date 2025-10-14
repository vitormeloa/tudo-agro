'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { CreditCard, Download, Eye, CheckCircle, Clock, XCircle, AlertTriangle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export default function TransactionsSection() {
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<'view' | 'approve' | 'reject'>('view')
  const [rejectionReason, setRejectionReason] = useState('')

  const transactions = [
    {
      id: 'TXN-001',
      type: 'Compra Direta',
      user: 'João Silva',
      amount: 'R$ 25.000,00',
      status: 'aprovado',
      date: '2024-01-20',
      method: 'PIX',
      description: 'Touro Nelore PO',
      details: {
        seller: 'Fazenda Boa Vista',
        product: 'Touro Nelore PO - Excelente Genética',
        pixKey: 'joao.silva@email.com',
        transactionId: 'PIX123456789'
      }
    },
    {
      id: 'TXN-002',
      type: 'Leilão',
      user: 'Maria Santos',
      amount: 'R$ 18.500,00',
      status: 'pendente',
      date: '2024-01-20',
      method: 'PIX',
      description: 'Égua Mangalarga #1247',
      details: {
        seller: 'João Silva',
        product: 'Égua Mangalarga Marchador - Registrada',
        pixKey: 'maria.santos@gmail.com',
        auctionId: 'LEILAO-1247'
      }
    },
    {
      id: 'TXN-003',
      type: 'Cashback',
      user: 'Carlos Mendes',
      amount: 'R$ 450,00',
      status: 'pago',
      date: '2024-01-19',
      method: 'PIX',
      description: 'Resgate de cashback',
      details: {
        cashbackPercentage: '3%',
        originalPurchase: 'R$ 15.000,00',
        pixKey: 'carlos.mendes@hotmail.com',
        transactionId: 'CASH789123456'
      }
    },
    {
      id: 'TXN-004',
      type: 'Saque Vendedor',
      user: 'Fazenda Boa Vista',
      amount: 'R$ 12.300,00',
      status: 'recusado',
      date: '2024-01-18',
      method: 'TED',
      description: 'Saque de vendas',
      rejectionReason: 'Dados bancários incorretos',
      details: {
        bank: 'Banco do Brasil',
        agency: '1234-5',
        account: '67890-1',
        salesPeriod: '01/01/2024 - 15/01/2024',
        totalSales: 'R$ 15.000,00',
        platformFee: 'R$ 2.700,00'
      }
    }
  ]

  const getStatusBadge = (status: string) => {
    const config = {
      aprovado: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      pendente: { color: 'bg-orange-100 text-orange-800', icon: Clock },
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

  const handleAction = (transaction: any, action: 'view' | 'approve' | 'reject') => {
    setSelectedTransaction(transaction)
    setModalType(action)
    setShowModal(true)
    setRejectionReason('')
  }

  const handleConfirmAction = () => {
    if (!selectedTransaction) return

    switch (modalType) {
      case 'approve':
        console.log(`Aprovando transação ${selectedTransaction.id}`)
        break
      case 'reject':
        if (!rejectionReason.trim()) return
        console.log(`Recusando transação ${selectedTransaction.id} com motivo: ${rejectionReason}`)
        break
    }
    
    setShowModal(false)
    setSelectedTransaction(null)
  }

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "ID,Tipo,Usuario,Valor,Status,Data,Metodo,Descricao\n" +
      transactions.map(t => 
        `${t.id},${t.type},${t.user},${t.amount},${t.status},${t.date},${t.method},${t.description}`
      ).join("\n")
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "transacoes.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const renderModalContent = () => {
    if (!selectedTransaction) return null

    switch (modalType) {
      case 'view':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-[#2B2E2B] mb-3">Informações da Transação</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>ID:</strong> {selectedTransaction.id}</p>
                  <p><strong>Tipo:</strong> {selectedTransaction.type}</p>
                  <p><strong>Usuário:</strong> {selectedTransaction.user}</p>
                  <p><strong>Valor:</strong> {selectedTransaction.amount}</p>
                  <p><strong>Status:</strong> {getStatusBadge(selectedTransaction.status)}</p>
                  <p><strong>Data:</strong> {new Date(selectedTransaction.date).toLocaleDateString('pt-BR')}</p>
                  <p><strong>Método:</strong> {selectedTransaction.method}</p>
                  <p><strong>Descrição:</strong> {selectedTransaction.description}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-[#2B2E2B] mb-3">Detalhes Específicos</h4>
                <div className="space-y-2 text-sm">
                  {Object.entries(selectedTransaction.details).map(([key, value]) => (
                    <p key={key}>
                      <strong>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:</strong> {value as string}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            {selectedTransaction.rejectionReason && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2 text-red-600 mb-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="font-semibold">Motivo da Recusa</span>
                </div>
                <p className="text-sm text-red-700">{selectedTransaction.rejectionReason}</p>
              </div>
            )}
          </div>
        )

      case 'approve':
        return (
          <div className="space-y-4">
            <p className="text-[#6E7D5B]">Tem certeza que deseja aprovar esta transação?</p>
            <div className="p-4 bg-[#F7F6F2] rounded-lg">
              <h4 className="font-semibold text-[#2B2E2B]">{selectedTransaction.id}</h4>
              <p className="text-sm text-[#6E7D5B]">Usuário: {selectedTransaction.user}</p>
              <p className="text-sm text-[#6E7D5B]">Valor: {selectedTransaction.amount}</p>
              <p className="text-sm text-[#6E7D5B]">Tipo: {selectedTransaction.type}</p>
            </div>
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                <CheckCircle className="w-4 h-4 inline mr-1" />
                Ao aprovar, a transação será processada e o valor será transferido.
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowModal(false)}>Cancelar</Button>
              <Button onClick={handleConfirmAction} className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="w-4 h-4 mr-2" />
                Aprovar Transação
              </Button>
            </div>
          </div>
        )

      case 'reject':
        return (
          <div className="space-y-4">
            <p className="text-[#6E7D5B]">Por que você está recusando esta transação?</p>
            <div className="p-4 bg-[#F7F6F2] rounded-lg">
              <h4 className="font-semibold text-[#2B2E2B]">{selectedTransaction.id}</h4>
              <p className="text-sm text-[#6E7D5B]">Usuário: {selectedTransaction.user}</p>
              <p className="text-sm text-[#6E7D5B]">Valor: {selectedTransaction.amount}</p>
              <p className="text-sm text-[#6E7D5B]">Tipo: {selectedTransaction.type}</p>
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
                Recusar Transação
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
              <CreditCard className="w-5 h-5 text-[#1E4D2B]" />
              Controle de Transações
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4 text-sm text-[#6E7D5B]">
                <span>Pendentes: {transactions.filter(t => t.status === 'pendente').length}</span>
                <span>Aprovadas: {transactions.filter(t => t.status === 'aprovado').length}</span>
                <span>Pagas: {transactions.filter(t => t.status === 'pago').length}</span>
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
            {transactions.map((transaction) => (
              <Card key={transaction.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-[#2B2E2B]">{transaction.id}</h3>
                        {getStatusBadge(transaction.status)}
                        <Badge variant="outline">{transaction.type}</Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-[#6E7D5B]">
                        <div>
                          <p className="font-medium">Usuário:</p>
                          <p>{transaction.user}</p>
                        </div>
                        <div>
                          <p className="font-medium">Valor:</p>
                          <p className="text-lg font-bold text-[#1E4D2B]">{transaction.amount}</p>
                        </div>
                        <div>
                          <p className="font-medium">Método:</p>
                          <p>{transaction.method}</p>
                        </div>
                        <div>
                          <p className="font-medium">Data:</p>
                          <p>{new Date(transaction.date).toLocaleDateString('pt-BR')}</p>
                        </div>
                      </div>
                      <p className="text-sm text-[#6E7D5B] mt-2">{transaction.description}</p>
                      {transaction.rejectionReason && (
                        <div className="flex items-center gap-2 text-red-600 text-sm mt-2">
                          <AlertTriangle className="w-4 h-4" />
                          Motivo da recusa: {transaction.rejectionReason}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <Button variant="outline" size="sm" onClick={() => handleAction(transaction, 'view')}>
                        <Eye className="w-4 h-4 mr-2" />
                        Ver Detalhes
                      </Button>
                      {transaction.status === 'pendente' && (
                        <>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleAction(transaction, 'approve')}>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Aprovar
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600" onClick={() => handleAction(transaction, 'reject')}>
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
              <CreditCard className="w-5 h-5 text-[#1E4D2B]" />
              {modalType === 'view' && 'Detalhes da Transação'}
              {modalType === 'approve' && 'Aprovar Transação'}
              {modalType === 'reject' && 'Recusar Transação'}
            </DialogTitle>
          </DialogHeader>
          {renderModalContent()}
        </DialogContent>
      </Dialog>
    </div>
  )
}