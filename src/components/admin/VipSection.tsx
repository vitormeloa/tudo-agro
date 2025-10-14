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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-[#1E4D2B]" />
            Planos VIP e Clube
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {vipUsers.map((user) => (
              <Card key={user.id} className="hover:shadow-lg transition-shadow border-2 border-yellow-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Crown className="w-5 h-5 text-yellow-600" />
                        <h3 className="font-semibold text-[#2B2E2B]">{user.name}</h3>
                        <Badge className="bg-yellow-100 text-yellow-800">{user.plan}</Badge>
                        <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[#6E7D5B] mb-4">
                        <div>
                          <p className="font-medium">Período:</p>
                          <p>{new Date(user.startDate).toLocaleDateString('pt-BR')} - {new Date(user.endDate).toLocaleDateString('pt-BR')}</p>
                        </div>
                        <div>
                          <p className="font-medium">Uso dos Benefícios:</p>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-gray-200 rounded-full">
                              <div 
                                className="h-full bg-yellow-500 rounded-full"
                                style={{ width: `${user.usage}%` }}
                              ></div>
                            </div>
                            <span>{user.usage}%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <p className="font-medium text-[#2B2E2B] mb-2">Benefícios Ativos:</p>
                        <div className="flex flex-wrap gap-2">
                          {user.benefits.map((benefit, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              <Star className="w-3 h-3 mr-1" />
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 ml-4">
                      <Button variant="outline" size="sm">
                        <User className="w-4 h-4 mr-2" />
                        Ver Perfil
                      </Button>
                      <Button variant="outline" size="sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        Renovar
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