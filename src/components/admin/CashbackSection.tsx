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
      aprovado: 'bg-primary/10 text-primary',
      pago: 'bg-primary/10 text-primary'
    }
    return <Badge className={config[status as keyof typeof config]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card>
        <CardHeader className="p-3 sm:p-6">
          <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2">
              <Gift className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <span className="text-base sm:text-lg font-semibold">Controle de Cashback</span>
            </div>
            <div className="text-xs sm:text-sm text-gray-600">
              Total distribuído: R$ 89.432,00
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          <div className="grid gap-3 sm:gap-4">
            {cashbackData.map((cashback) => (
              <Card key={cashback.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-3 sm:p-6">
                  <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
                    <div className="flex-1 w-full">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 flex-shrink-0" />
                        <h3 className="font-semibold text-[#101828] text-sm sm:text-base break-words">{cashback.user}</h3>
                        <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                          {getStatusBadge(cashback.status)}
                          <Badge variant="outline" className="text-xs">{cashback.origin}</Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
                        <div>
                          <p className="font-medium">Valor:</p>
                          <p className="text-sm sm:text-lg font-bold text-primary break-words">{cashback.amount}</p>
                        </div>
                        <div>
                          <p className="font-medium">Data da Solicitação:</p>
                          <p className="break-words">{new Date(cashback.requestDate).toLocaleDateString('pt-BR')}</p>
                        </div>
                        <div className="sm:col-span-2 lg:col-span-1">
                          <p className="font-medium">Descrição:</p>
                          <p className="break-words">{cashback.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row lg:flex-col gap-2 w-full lg:w-auto">
                      {cashback.status === 'pendente' && (
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