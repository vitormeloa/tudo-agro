'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Crown, Star, Calendar, User } from 'lucide-react'

export default function VipSection() {
  const vipUsers = [
    {
      id: 1,
      name: 'Fazenda Boa Vista',
      plan: 'VIP Premium',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'ativo',
      benefits: ['Acesso antecipado', 'Cashback 5%', 'Suporte prioritário'],
      usage: 85
    },
    {
      id: 2,
      name: 'João Silva',
      plan: 'VIP Basic',
      startDate: '2024-01-15',
      endDate: '2024-07-15',
      status: 'ativo',
      benefits: ['Cashback 3%', 'Anúncios destacados'],
      usage: 42
    }
  ]

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card>
                <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                    <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-[#1E4D2B]" />
                    <span className="text-base sm:text-lg font-semibold">Gerenciamento de VIP</span>
                </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          <div className="grid gap-3 sm:gap-4">
            {vipUsers.map((user) => (
              <Card key={user.id} className="hover:shadow-lg transition-shadow border-2 border-yellow-200">
                <CardContent className="p-3 sm:p-6">
                  <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
                    <div className="flex-1 w-full">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                        <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 flex-shrink-0" />
                        <h3 className="font-semibold text-[#2B2E2B] text-sm sm:text-base break-words">{user.name}</h3>
                        <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                          <Badge className="bg-yellow-100 text-yellow-800 text-xs">{user.plan}</Badge>
                          <Badge className="bg-green-100 text-green-800 text-xs">Ativo</Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm text-[#6E7D5B] mb-3 sm:mb-4">
                        <div>
                          <p className="font-medium">Período:</p>
                          <p className="break-words">{new Date(user.startDate).toLocaleDateString('pt-BR')} - {new Date(user.endDate).toLocaleDateString('pt-BR')}</p>
                        </div>
                        <div>
                          <p className="font-medium">Uso dos Benefícios:</p>
                          <div className="flex items-center gap-2">
                            <div className="w-16 sm:w-20 h-2 bg-gray-200 rounded-full">
                              <div 
                                className="h-full bg-yellow-500 rounded-full"
                                style={{ width: `${user.usage}%` }}
                              ></div>
                            </div>
                            <span className="text-xs sm:text-sm">{user.usage}%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <p className="font-medium text-[#2B2E2B] mb-2 text-xs sm:text-sm">Benefícios Ativos:</p>
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          {user.benefits.map((benefit, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              <Star className="w-3 h-3 mr-1" />
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row lg:flex-col gap-2 w-full lg:w-auto">
                      <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                        <User className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">Ver Perfil</span>
                        <span className="sm:hidden">Perfil</span>
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">Renovar</span>
                        <span className="sm:hidden">Renovar</span>
                      </Button>
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