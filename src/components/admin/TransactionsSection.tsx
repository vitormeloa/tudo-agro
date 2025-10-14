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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#1E4D2B]" />
              Controle de Transações
            </div>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Exportar CSV
            </Button>
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
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Ver Detalhes
                      </Button>
                      {transaction.status === 'pendente' && (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Aprovar
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