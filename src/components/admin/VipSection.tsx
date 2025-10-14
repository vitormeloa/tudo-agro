'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Crown, Star, Calendar, User, Eye, Settings, CheckCircle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export default function VipSection() {
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<'view' | 'renew' | 'manage'>('view')

  const vipUsers = [
    {
      id: 1,
      name: 'Fazenda Boa Vista',
      plan: 'VIP Premium',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'ativo',
      benefits: ['Acesso antecipado', 'Cashback 5%', 'Suporte prioritário'],
      usage: 85,
      monthlyFee: 'R$ 299,00',
      totalSpent: 'R$ 2.990,00',
      savings: 'R$ 1.450,00'
    },
    {
      id: 2,
      name: 'João Silva',
      plan: 'VIP Basic',
      startDate: '2024-01-15',
      endDate: '2024-07-15',
      status: 'ativo',
      benefits: ['Cashback 3%', 'Anúncios destacados'],
      usage: 42,
      monthlyFee: 'R$ 99,00',
      totalSpent: 'R$ 594,00',
      savings: 'R$ 280,00'
    }
  ]

  const handleAction = (user: any, action: 'view' | 'renew' | 'manage') => {
    setSelectedUser(user)
    setModalType(action)
    setShowModal(true)
  }

  const handleConfirmAction = () => {
    if (!selectedUser) return

    switch (modalType) {
      case 'renew':
        console.log(`Renovando plano VIP do usuário ${selectedUser.id}`)
        break
      case 'manage':
        console.log(`Gerenciando benefícios do usuário ${selectedUser.id}`)
        break
    }
    
    setShowModal(false)
    setSelectedUser(null)
  }

  const renderModalContent = () => {
    if (!selectedUser) return null

    switch (modalType) {
      case 'view':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-[#2B2E2B] mb-3">Informações do Plano</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Nome:</strong> {selectedUser.name}</p>
                  <p><strong>Plano:</strong> <Badge className="bg-yellow-100 text-yellow-800">{selectedUser.plan}</Badge></p>
                  <p><strong>Status:</strong> <Badge className="bg-green-100 text-green-800">Ativo</Badge></p>
                  <p><strong>Início:</strong> {new Date(selectedUser.startDate).toLocaleDateString('pt-BR')}</p>
                  <p><strong>Vencimento:</strong> {new Date(selectedUser.endDate).toLocaleDateString('pt-BR')}</p>
                  <p><strong>Mensalidade:</strong> {selectedUser.monthlyFee}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-[#2B2E2B] mb-3">Estatísticas</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Uso dos Benefícios:</strong></p>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-32 h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-full bg-yellow-500 rounded-full"
                        style={{ width: `${selectedUser.usage}%` }}
                      ></div>
                    </div>
                    <span>{selectedUser.usage}%</span>
                  </div>
                  <p><strong>Total Gasto:</strong> {selectedUser.totalSpent}</p>
                  <p><strong>Economia Gerada:</strong> <span className="text-green-600">{selectedUser.savings}</span></p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-[#2B2E2B] mb-3">Benefícios Ativos</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedUser.benefits.map((benefit: string, index: number) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-[#F7F6F2] rounded-lg">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">{benefit}</span>
                    <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'renew':
        return (
          <div className="space-y-4">
            <p className="text-[#6E7D5B]">Renovar plano VIP do usuário:</p>
            <div className="p-4 bg-[#F7F6F2] rounded-lg">
              <h4 className="font-semibold text-[#2B2E2B]">{selectedUser.name}</h4>
              <p className="text-sm text-[#6E7D5B]">Plano atual: {selectedUser.plan}</p>
              <p className="text-sm text-[#6E7D5B]">Vencimento: {new Date(selectedUser.endDate).toLocaleDateString('pt-BR')}</p>
            </div>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium">Renovação Automática</h5>
                    <p className="text-sm text-[#6E7D5B]">Renovar por mais 12 meses</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">Recomendado</Badge>
                </div>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium">Upgrade de Plano</h5>
                    <p className="text-sm text-[#6E7D5B]">Migrar para plano superior</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowModal(false)}>Cancelar</Button>
              <Button onClick={handleConfirmAction} className="bg-yellow-600 hover:bg-yellow-700">
                <Calendar className="w-4 h-4 mr-2" />
                Renovar Plano
              </Button>
            </div>
          </div>
        )

      case 'manage':
        return (
          <div className="space-y-4">
            <p className="text-[#6E7D5B]">Gerenciar benefícios e configurações:</p>
            <div className="p-4 bg-[#F7F6F2] rounded-lg">
              <h4 className="font-semibold text-[#2B2E2B]">{selectedUser.name}</h4>
              <p className="text-sm text-[#6E7D5B]">Plano: {selectedUser.plan}</p>
            </div>
            <div className="space-y-3">
              <h5 className="font-medium text-[#2B2E2B]">Benefícios Disponíveis:</h5>
              {selectedUser.benefits.map((benefit: string, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                    <Button variant="outline" size="sm">
                      Configurar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowModal(false)}>Fechar</Button>
              <Button onClick={handleConfirmAction} className="bg-blue-600 hover:bg-blue-700">
                <Settings className="w-4 h-4 mr-2" />
                Salvar Configurações
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
              <Crown className="w-5 h-5 text-[#1E4D2B]" />
              Planos VIP e Clube
            </div>
            <div className="flex items-center gap-4 text-sm text-[#6E7D5B]">
              <span>Usuários VIP: {vipUsers.length}</span>
              <span>Receita Mensal: R$ 398,00</span>
            </div>
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
                      <Button variant="outline" size="sm" onClick={() => handleAction(user, 'view')}>
                        <Eye className="w-4 h-4 mr-2" />
                        Ver Detalhes
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleAction(user, 'renew')}>
                        <Calendar className="w-4 h-4 mr-2" />
                        Renovar
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleAction(user, 'manage')}>
                        <Settings className="w-4 h-4 mr-2" />
                        Gerenciar
                      </Button>
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
              <Crown className="w-5 h-5 text-[#1E4D2B]" />
              {modalType === 'view' && 'Detalhes do Plano VIP'}
              {modalType === 'renew' && 'Renovar Plano VIP'}
              {modalType === 'manage' && 'Gerenciar Benefícios'}
            </DialogTitle>
          </DialogHeader>
          {renderModalContent()}
        </DialogContent>
      </Dialog>
    </div>
  )
}