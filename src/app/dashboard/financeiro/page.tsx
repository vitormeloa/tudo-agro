'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import ProtectedRoute from '@/components/ProtectedRoute'
import AdminLayout from '@/components/admin/AdminLayout'
import { mockPurchases, getTypeIcon, getPaymentMethodLabel, type PurchaseType } from '@/lib/mock-purchases'
import { 
  DollarSign, 
  Calendar, 
  CreditCard, 
  FileText, 
  Download, 
  Eye,
  MessageCircle,
  TrendingUp,
  ShoppingCart,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react'

type PaymentStatus = 'pago' | 'aguardando_pagamento' | 'cancelado'

export default function FinanceiroPage() {
  const [dateFilter, setDateFilter] = useState('mes_atual')
  const [typeFilter, setTypeFilter] = useState<PurchaseType | 'todos'>('todos')
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | 'todos'>('todos')
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null)

  // Converter compras em transações financeiras
  const transactions = mockPurchases.map(purchase => ({
    id: purchase.id,
    type: purchase.type,
    itemName: purchase.itemName,
    value: purchase.value,
    paymentMethod: purchase.paymentMethod,
    status: purchase.status === 'cancelado' ? 'cancelado' as PaymentStatus : 
            purchase.status === 'entregue' ? 'pago' as PaymentStatus : 
            'aguardando_pagamento' as PaymentStatus,
    date: purchase.purchaseDate,
    sellerName: purchase.sellerName,
    receiptUrl: purchase.receiptUrl,
    invoiceUrl: purchase.invoiceUrl
  }))

  const filteredTransactions = transactions.filter(t => {
    if (typeFilter !== 'todos' && t.type !== typeFilter) return false
    if (statusFilter !== 'todos' && t.status !== statusFilter) return false
    
    // Filtro de data
    const now = new Date()
    const transactionDate = new Date(t.date)
    
    if (dateFilter === 'hoje') {
      return transactionDate.toDateString() === now.toDateString()
    } else if (dateFilter === 'ultimos_7_dias') {
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      return transactionDate >= sevenDaysAgo
    } else if (dateFilter === 'mes_atual') {
      return transactionDate.getMonth() === now.getMonth() && 
             transactionDate.getFullYear() === now.getFullYear()
    }
    
    return true
  })

  const selectedTransactionData = selectedTransaction 
    ? transactions.find(t => t.id === selectedTransaction)
    : null

  // Estatísticas
  const totalThisMonth = transactions
    .filter(t => {
      const now = new Date()
      const transactionDate = new Date(t.date)
      return transactionDate.getMonth() === now.getMonth() && 
             transactionDate.getFullYear() === now.getFullYear() &&
             t.status === 'pago'
    })
    .reduce((sum, t) => sum + t.value, 0)

  const totalPurchases = transactions.length
  const totalInvested = transactions
    .filter(t => t.status === 'pago')
    .reduce((sum, t) => sum + t.value, 0)
  const pendingPayments = transactions.filter(t => t.status === 'aguardando_pagamento').length

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const getStatusBadge = (status: PaymentStatus) => {
    switch (status) {
      case 'pago':
        return <Badge className="bg-green-100 text-green-800 border-green-200"><CheckCircle className="w-3 h-3 mr-1" />Pago</Badge>
      case 'aguardando_pagamento':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200"><Clock className="w-3 h-3 mr-1" />Aguardando</Badge>
      case 'cancelado':
        return <Badge className="bg-red-100 text-red-800 border-red-200"><XCircle className="w-3 h-3 mr-1" />Cancelado</Badge>
    }
  }

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="min-h-screen bg-gray-50 p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Financeiro</h1>
            <p className="text-gray-600">Acompanhe todas as suas movimentações financeiras</p>
          </div>

          {/* Resumo do Topo */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total no Mês</p>
                    <p className="text-lg font-semibold text-emerald-600">
                      R$ {totalThisMonth.toLocaleString('pt-BR')}
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-emerald-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total de Compras</p>
                    <p className="text-lg font-semibold text-gray-900">{totalPurchases}</p>
                  </div>
                  <ShoppingCart className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Investido</p>
                    <p className="text-lg font-semibold text-gray-900">
                      R$ {totalInvested.toLocaleString('pt-BR')}
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Pagamentos Pendentes</p>
                    <p className="text-lg font-semibold text-red-600">{pendingPayments}</p>
                  </div>
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filtros */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Período</label>
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hoje">Hoje</SelectItem>
                      <SelectItem value="ultimos_7_dias">Últimos 7 dias</SelectItem>
                      <SelectItem value="mes_atual">Mês atual</SelectItem>
                      <SelectItem value="personalizado">Personalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Tipo de Transação</label>
                  <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v as PurchaseType | 'todos')}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="animal">Compra Animal</SelectItem>
                      <SelectItem value="genetica">Compra Genética</SelectItem>
                      <SelectItem value="produto">Compra Produto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Status do Pagamento</label>
                  <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as PaymentStatus | 'todos')}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="pago">Pago</SelectItem>
                      <SelectItem value="aguardando_pagamento">Aguardando Pagamento</SelectItem>
                      <SelectItem value="cancelado">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Transações */}
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <Card key={transaction.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="text-3xl">{getTypeIcon(transaction.type)}</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {transaction.itemName}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>{formatDate(transaction.date)}</span>
                          <span>{getPaymentMethodLabel(transaction.paymentMethod)}</span>
                          <span>Vendedor: {transaction.sellerName}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-lg font-bold text-emerald-600">
                          R$ {transaction.value.toLocaleString('pt-BR')}
                        </p>
                        {getStatusBadge(transaction.status)}
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedTransaction(transaction.id)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Modal de Detalhes */}
          {selectedTransactionData && (
            <Dialog open={!!selectedTransaction} onOpenChange={() => setSelectedTransaction(null)}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl">Detalhes da Transação</DialogTitle>
                  <DialogDescription>
                    Informações completas sobre a transação financeira
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Item Comprado</h4>
                    <p className="text-gray-700">{selectedTransactionData.itemName}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Categoria: {selectedTransactionData.type === 'animal' ? 'Animal' : 
                                  selectedTransactionData.type === 'genetica' ? 'Genética' : 'Produto'}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Valor</h4>
                      <p className="text-2xl font-bold text-emerald-600">
                        R$ {selectedTransactionData.value.toLocaleString('pt-BR')}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Forma de Pagamento</h4>
                      <p className="text-gray-700">{getPaymentMethodLabel(selectedTransactionData.paymentMethod)}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Data</h4>
                      <p className="text-gray-700">{formatDate(selectedTransactionData.date)}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Status</h4>
                      {getStatusBadge(selectedTransactionData.status)}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Vendedor</h4>
                    <p className="text-gray-700">{selectedTransactionData.sellerName}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-4 border-t">
                    {selectedTransactionData.receiptUrl && (
                      <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Comprovante de Pagamento (PDF)
                      </Button>
                    )}
                    {selectedTransactionData.invoiceUrl && (
                      <Button variant="outline">
                        <FileText className="w-4 h-4 mr-2" />
                        Nota Fiscal (PDF)
                      </Button>
                    )}
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Falar com Vendedor
                      </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </AdminLayout>
    </ProtectedRoute>
  )
}
