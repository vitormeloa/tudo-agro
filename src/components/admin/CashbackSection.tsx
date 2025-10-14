'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Gift, DollarSign, CheckCircle, Clock, User } from 'lucide-react'

export default function CashbackSection() {
  const cashbackData = [
    {
      id: 1,
      user: 'João Silva',
      amount: 'R$ 450,00',
      origin: 'Compra',
      status: 'pendente',
      requestDate: '2024-01-19',
      description: 'Cashback de compra - Touro Nelore'
    },
    {
      id: 2,
      user: 'Maria Santos',
      amount: 'R$ 125,00',
      origin: 'Indicação',
      status: 'aprovado',
      requestDate: '2024-01-18',
      description: 'Cashback por indicação de novo usuário'
    },
    {
      id: 3,
      user: 'Carlos Mendes',
      amount: 'R$ 890,00',
      origin: 'VIP',
      status: 'pago',
      requestDate: '2024-01-17',
      description: 'Cashback VIP - Bônus mensal'
    }
  ]

  const getStatusBadge = (status: string) => {
    const config = {
      pendente: 'bg-orange-100 text-orange-800',
      aprovado: 'bg-green-100 text-green-800',
      pago: 'bg-blue-100 text-blue-800'
    }
    return <Badge className={config[status as keyof typeof config]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
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
            <div className="text-sm text-[#6E7D5B]">
              Total distribuído: R$ 89.432,00
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
                      {cashback.status === 'pendente' && (
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