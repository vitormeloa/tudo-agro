'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CreditCard, Download, Eye, CheckCircle, Clock, XCircle } from 'lucide-react'

export default function TransactionsSection() {
  const transactions = [
    {
      id: 'TXN-001',
      type: 'Compra Direta',
      user: 'João Silva',
      amount: 'R$ 25.000,00',
      status: 'aprovado',
      date: '2024-01-20',
      method: 'PIX',
      description: 'Touro Nelore PO'
    },
    {
      id: 'TXN-002',
      type: 'Leilão',
      user: 'Maria Santos',
      amount: 'R$ 18.500,00',
      status: 'pendente',
      date: '2024-01-20',
      method: 'PIX',
      description: 'Égua Mangalarga #1247'
    },
    {
      id: 'TXN-003',
      type: 'Cashback',
      user: 'Carlos Mendes',
      amount: 'R$ 450,00',
      status: 'pago',
      date: '2024-01-19',
      method: 'PIX',
      description: 'Resgate de cashback'
    },
    {
      id: 'TXN-004',
      type: 'Saque Vendedor',
      user: 'Fazenda Boa Vista',
      amount: 'R$ 12.300,00',
      status: 'recusado',
      date: '2024-01-18',
      method: 'TED',
      description: 'Saque de vendas'
    }
  ]

  const getStatusBadge = (status: string) => {
    const config = {
      aprovado: { color: 'bg-primary/10 text-primary', icon: CheckCircle },
      pendente: { color: 'bg-orange-100 text-orange-800', icon: Clock },
      pago: { color: 'bg-primary/10 text-primary', icon: CheckCircle },
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

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                    <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    <span className="text-base sm:text-lg font-semibold">Gerenciamento de Transações</span>
                </CardTitle>
            </div>
            
            <Button variant="outline" size="sm" className="text-xs sm:text-sm">
              <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Exportar CSV</span>
              <span className="sm:hidden">Exportar</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          <div className="grid gap-3 sm:gap-4">
            {transactions.map((transaction) => (
              <Card key={transaction.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-3 sm:p-6">
                  <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
                    <div className="flex-1 w-full">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                        <h3 className="font-semibold text-[#101828] text-sm sm:text-base">{transaction.id}</h3>
                        {getStatusBadge(transaction.status)}
                        <Badge variant="outline" className="text-xs">{transaction.type}</Badge>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
                        <div>
                          <p className="font-medium">Usuário:</p>
                          <p className="break-words">{transaction.user}</p>
                        </div>
                        <div>
                          <p className="font-medium">Valor:</p>
                          <p className="text-sm sm:text-lg font-bold text-primary break-words">{transaction.amount}</p>
                        </div>
                        <div>
                          <p className="font-medium">Método:</p>
                          <p className="break-words">{transaction.method}</p>
                        </div>
                        <div>
                          <p className="font-medium">Data:</p>
                          <p className="break-words">{new Date(transaction.date).toLocaleDateString('pt-BR')}</p>
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 mt-2 break-words">{transaction.description}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row lg:flex-col gap-2 w-full lg:w-auto">
                      <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">Ver Detalhes</span>
                        <span className="sm:hidden">Ver</span>
                      </Button>
                      {transaction.status === 'pendente' && (
                        <Button size="sm" className="bg-primary hover:bg-[#2E7A5A] text-xs sm:text-sm">
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                          <span className="hidden sm:inline">Aprovar</span>
                          <span className="sm:hidden">Aprovar</span>
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