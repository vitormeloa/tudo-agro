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
import { 
  mockFinancialTransactions,
  getTransactionTypeLabel,
  getTransactionTypeIcon,
  getTransactionTypeColor,
  getPaymentMethodLabel,
  type TransactionType,
  type PaymentStatus,
  type FinancialTransaction
} from '@/lib/mock-financial-transactions'
import { formatDateBR } from '@/lib/date-utils'
import { formatCurrencyBR } from '@/lib/format-utils'
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
  Clock,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  Gift
} from 'lucide-react'

export default function FinanceiroPage() {
  const [dateFilter, setDateFilter] = useState('mes_atual')
  const [typeFilter, setTypeFilter] = useState<TransactionType | 'todos'>('todos')
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | 'todos'>('todos')
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null)

  // Usar transações financeiras completas
  const transactions = mockFinancialTransactions

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
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Ordenar por data mais recente

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
    .reduce((sum, t) => {
      // Somar receitas e subtrair despesas
      if (t.type === 'venda' || t.type === 'deposito' || t.type === 'cashback' || t.type === 'reembolso' || t.type === 'estorno') {
        return sum + t.value
      } else {
        return sum - t.value
      }
    }, 0)

  const totalTransactions = transactions.length
  const totalRevenue = transactions
    .filter(t => (t.type === 'venda' || t.type === 'deposito' || t.type === 'cashback' || t.type === 'reembolso' || t.type === 'estorno') && t.status === 'pago')
    .reduce((sum, t) => sum + t.value, 0)
  const totalExpenses = transactions
    .filter(t => (t.type === 'compra' || t.type === 'taxa' || t.type === 'saque') && t.status === 'pago')
    .reduce((sum, t) => sum + t.value, 0)
  const pendingPayments = transactions.filter(t => t.status === 'aguardando_pagamento' || t.status === 'processando').length
  const balance = totalRevenue - totalExpenses

  // Usar utilitário centralizado para formatação de datas
  const formatDate = (date: Date) => {
    return formatDateBR(date, true)
  }

  const getStatusBadge = (status: PaymentStatus) => {
    switch (status) {
      case 'pago':
        return <Badge className="bg-green-100 text-green-800 border-green-200"><CheckCircle className="w-3 h-3 mr-1" />Pago</Badge>
      case 'aguardando_pagamento':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200"><Clock className="w-3 h-3 mr-1" />Aguardando</Badge>
      case 'processando':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200"><RefreshCw className="w-3 h-3 mr-1" />Processando</Badge>
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
                    <p className="text-sm text-gray-600 mb-1">Saldo do Mês</p>
                    <p className={`text-lg font-semibold ${totalThisMonth >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {formatCurrencyBR(Math.abs(totalThisMonth), { minimumFractionDigits: 0 })}
                    </p>
                  </div>
                  <DollarSign className={`w-8 h-8 ${totalThisMonth >= 0 ? 'text-emerald-600' : 'text-red-600'}`} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total de Transações</p>
                    <p className="text-lg font-semibold text-gray-900">{totalTransactions}</p>
                  </div>
                  <ShoppingCart className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Saldo Total</p>
                    <p className={`text-lg font-semibold ${balance >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {formatCurrencyBR(Math.abs(balance), { minimumFractionDigits: 0 })}
                    </p>
                  </div>
                  <TrendingUp className={`w-8 h-8 ${balance >= 0 ? 'text-emerald-600' : 'text-red-600'}`} />
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
            {filteredTransactions.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-gray-500 text-lg">Nenhuma transação encontrada com os filtros selecionados.</p>
                </CardContent>
              </Card>
            ) : (
              filteredTransactions.map((transaction) => {
                const isIncome = transaction.type === 'venda' || transaction.type === 'deposito' || 
                                 transaction.type === 'cashback' || transaction.type === 'reembolso' || 
                                 transaction.type === 'estorno'
                const valueColor = isIncome ? 'text-emerald-600' : 'text-red-600'
                const valuePrefix = isIncome ? '+' : '-'
                
                return (
                  <Card key={transaction.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="text-3xl">{getTransactionTypeIcon(transaction.type)}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {transaction.description}
                              </h3>
                              {transaction.category && (
                                <Badge variant="outline" className="text-xs">
                                  {transaction.category}
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
                              <span>{formatDate(transaction.date)}</span>
                              <span>{getPaymentMethodLabel(transaction.paymentMethod)}</span>
                              {transaction.sellerName && (
                                <span>Vendedor: {transaction.sellerName}</span>
                              )}
                              {transaction.buyerName && (
                                <span>Comprador: {transaction.buyerName}</span>
                              )}
                            </div>
                            {transaction.notes && (
                              <p className="text-xs text-gray-500 mt-1 italic">{transaction.notes}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className={`text-lg font-bold ${valueColor}`}>
                              {valuePrefix} R$ {transaction.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
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
                )
              })
            )}
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
                    <h4 className="font-semibold text-gray-900 mb-2">Descrição</h4>
                    <p className="text-gray-700">{selectedTransactionData.description}</p>
                    {selectedTransactionData.category && (
                      <p className="text-sm text-gray-600 mt-1">
                        Categoria: {selectedTransactionData.category}
                      </p>
                    )}
                    <p className="text-sm text-gray-600 mt-1">
                      Tipo: {getTransactionTypeLabel(selectedTransactionData.type)}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Valor</h4>
                      <p className={`text-2xl font-bold ${
                        selectedTransactionData.type === 'venda' || selectedTransactionData.type === 'deposito' || 
                        selectedTransactionData.type === 'cashback' || selectedTransactionData.type === 'reembolso' || 
                        selectedTransactionData.type === 'estorno' ? 'text-emerald-600' : 'text-red-600'
                      }`}>
                        {(selectedTransactionData.type === 'venda' || selectedTransactionData.type === 'deposito' || 
                          selectedTransactionData.type === 'cashback' || selectedTransactionData.type === 'reembolso' || 
                          selectedTransactionData.type === 'estorno' ? '+' : '-')} 
                        {formatCurrencyBR(selectedTransactionData.value)}
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

                  {(selectedTransactionData.sellerName || selectedTransactionData.buyerName) && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {selectedTransactionData.sellerName ? 'Vendedor' : 'Comprador'}
                      </h4>
                      <p className="text-gray-700">
                        {selectedTransactionData.sellerName || selectedTransactionData.buyerName}
                      </p>
                    </div>
                  )}

                  {selectedTransactionData.relatedTransactionId && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Transação Relacionada</h4>
                      <p className="text-gray-700">ID: {selectedTransactionData.relatedTransactionId}</p>
                    </div>
                  )}

                  {selectedTransactionData.notes && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Observações</h4>
                      <p className="text-gray-700 italic">{selectedTransactionData.notes}</p>
                    </div>
                  )}

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
