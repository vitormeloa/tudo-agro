'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { 
  Search, Store, CheckCircle, XCircle, Clock, FileText,
  User, Mail, Phone, MapPin, Calendar, TrendingUp, AlertTriangle
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export default function SellersSection() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedSeller, setSelectedSeller] = useState<any>(null)
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null)
  const [justification, setJustification] = useState('')

  const sellers = [
    {
      id: 1,
      name: 'João Silva Santos',
      email: 'joao.silva@email.com',
      phone: '(11) 99999-9999',
      city: 'São Paulo',
      state: 'SP',
      status: 'pendente',
      requestDate: '2024-01-18',
      documentsSubmitted: ['RG', 'CPF', 'Comprovante'],
      activeAds: 0,
      completedSales: 0,
      rating: 0,
      specialization: 'Gado de Corte'
    },
    {
      id: 2,
      name: 'Fazenda Boa Vista Ltda',
      email: 'contato@fazendaboavista.com.br',
      phone: '(16) 3333-4444',
      city: 'Ribeirão Preto',
      state: 'SP',
      status: 'aprovado',
      requestDate: '2024-01-10',
      approvalDate: '2024-01-12',
      documentsSubmitted: ['CNPJ', 'Contrato Social', 'Comprovante'],
      activeAds: 15,
      completedSales: 23,
      rating: 4.8,
      specialization: 'Gado Leiteiro'
    },
    {
      id: 3,
      name: 'Carlos Mendes',
      email: 'carlos.mendes@hotmail.com',
      phone: '(31) 77777-6666',
      city: 'Belo Horizonte',
      state: 'MG',
      status: 'recusado',
      requestDate: '2024-01-15',
      rejectionDate: '2024-01-17',
      rejectionReason: 'Documentos ilegíveis',
      documentsSubmitted: ['RG', 'CPF'],
      activeAds: 0,
      completedSales: 0,
      rating: 0,
      specialization: 'Cavalos'
    },
    {
      id: 4,
      name: 'Maria Oliveira',
      email: 'maria.oliveira@gmail.com',
      phone: '(21) 88888-7777',
      city: 'Rio de Janeiro',
      state: 'RJ',
      status: 'pendente',
      requestDate: '2024-01-19',
      documentsSubmitted: ['RG', 'CPF', 'Comprovante', 'Certificado'],
      activeAds: 0,
      completedSales: 0,
      rating: 0,
      specialization: 'Sêmen Bovino'
    },
    {
      id: 5,
      name: 'Agropecuária Três Rios',
      email: 'vendas@agrotresrios.com.br',
      phone: '(62) 5555-4444',
      city: 'Goiânia',
      state: 'GO',
      status: 'aprovado',
      requestDate: '2023-12-20',
      approvalDate: '2023-12-22',
      documentsSubmitted: ['CNPJ', 'Contrato Social', 'Comprovante', 'Licenças'],
      activeAds: 28,
      completedSales: 45,
      rating: 4.9,
      specialization: 'Gado de Corte'
    }
  ]

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pendente: { color: 'bg-orange-100 text-orange-800', label: 'Pendente', icon: Clock },
      aprovado: { color: 'bg-green-100 text-green-800', label: 'Aprovado', icon: CheckCircle },
      recusado: { color: 'bg-red-100 text-red-800', label: 'Recusado', icon: XCircle }
    }
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pendente
    const Icon = config.icon
    return (
      <Badge className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    )
  }

  const filteredSellers = sellers.filter(seller => {
    const matchesSearch = seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         seller.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || seller.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const handleAction = (seller: any, action: 'approve' | 'reject') => {
    setSelectedSeller(seller)
    setActionType(action)
    setJustification('')
  }

  const confirmAction = () => {
    // Aqui seria feita a ação real
    console.log(`${actionType} seller ${selectedSeller.id} with justification: ${justification}`)
    setSelectedSeller(null)
    setActionType(null)
    setJustification('')
  }

  return (
    <div className="space-y-6">
      {/* Header com Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Store className="w-5 h-5 text-[#1E4D2B]" />
              Gerenciamento de Vendedores
            </div>
            <div className="flex items-center gap-4 text-sm text-[#6E7D5B]">
              <span>Pendentes: {sellers.filter(s => s.status === 'pendente').length}</span>
              <span>Aprovados: {sellers.filter(s => s.status === 'aprovado').length}</span>
              <span>Recusados: {sellers.filter(s => s.status === 'recusado').length}</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Busca */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6E7D5B] w-4 h-4" />
                <Input
                  placeholder="Buscar por nome ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            {/* Filtro de Status */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos Status</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="aprovado">Aprovado</SelectItem>
                <SelectItem value="recusado">Recusado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Vendedores */}
      <div className="grid gap-4">
        {filteredSellers.map((seller) => (
          <Card key={seller.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 bg-[#1E4D2B] rounded-full flex items-center justify-center text-white font-bold">
                      {seller.name.charAt(0)}
                    </div>
                    
                    {/* Informações Principais */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-[#2B2E2B]">{seller.name}</h3>
                        {getStatusBadge(seller.status)}
                        <Badge variant="outline" className="text-xs">
                          {seller.specialization}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-[#6E7D5B] mb-4">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          {seller.email}
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          {seller.phone}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {seller.city}, {seller.state}
                        </div>
                      </div>

                      {/* Documentos */}
                      <div className="mb-4">
                        <p className="text-sm font-medium text-[#2B2E2B] mb-2">Documentos Enviados:</p>
                        <div className="flex flex-wrap gap-2">
                          {seller.documentsSubmitted.map((doc, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              <FileText className="w-3 h-3 mr-1" />
                              {doc}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Datas Importantes */}
                      <div className="text-sm text-[#6E7D5B] space-y-1">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Solicitação: {new Date(seller.requestDate).toLocaleDateString('pt-BR')}
                        </div>
                        {seller.approvalDate && (
                          <div className="flex items-center gap-2 text-green-600">
                            <CheckCircle className="w-4 h-4" />
                            Aprovado em: {new Date(seller.approvalDate).toLocaleDateString('pt-BR')}
                          </div>
                        )}
                        {seller.rejectionDate && (
                          <div className="flex items-center gap-2 text-red-600">
                            <XCircle className="w-4 h-4" />
                            Recusado em: {new Date(seller.rejectionDate).toLocaleDateString('pt-BR')}
                          </div>
                        )}
                        {seller.rejectionReason && (
                          <div className="flex items-center gap-2 text-red-600">
                            <AlertTriangle className="w-4 h-4" />
                            Motivo: {seller.rejectionReason}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Estatísticas */}
                  <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-[#1E4D2B]">{seller.activeAds}</p>
                      <p className="text-xs text-[#6E7D5B]">Anúncios Ativos</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-[#1E4D2B]">{seller.completedSales}</p>
                      <p className="text-xs text-[#6E7D5B]">Vendas Finalizadas</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-[#1E4D2B]">
                        {seller.rating > 0 ? seller.rating.toFixed(1) : '-'}
                      </p>
                      <p className="text-xs text-[#6E7D5B]">Avaliação</p>
                    </div>
                  </div>
                </div>
                
                {/* Ações */}
                <div className="flex flex-col gap-2 ml-4">
                  {seller.status === 'pendente' && (
                    <>
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => handleAction(seller, 'approve')}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Aprovar
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                        onClick={() => handleAction(seller, 'reject')}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Recusar
                      </Button>
                    </>
                  )}
                  <Button variant="outline" size="sm">
                    <FileText className="w-4 h-4 mr-2" />
                    Ver Documentos
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog de Confirmação */}
      <Dialog open={!!selectedSeller} onOpenChange={() => setSelectedSeller(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === 'approve' ? 'Aprovar Vendedor' : 'Recusar Vendedor'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-[#6E7D5B]">
              {actionType === 'approve' 
                ? `Tem certeza que deseja aprovar ${selectedSeller?.name} como vendedor?`
                : `Tem certeza que deseja recusar a solicitação de ${selectedSeller?.name}?`
              }
            </p>
            
            <div>
              <label className="text-sm font-medium text-[#2B2E2B] block mb-2">
                {actionType === 'approve' ? 'Observações (opcional):' : 'Motivo da recusa:'}
              </label>
              <Textarea
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
                placeholder={actionType === 'approve' 
                  ? 'Adicione observações sobre a aprovação...'
                  : 'Explique o motivo da recusa...'
                }
                className="min-h-20"
                required={actionType === 'reject'}
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSelectedSeller(null)}>
                Cancelar
              </Button>
              <Button 
                onClick={confirmAction}
                className={actionType === 'approve' 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-red-600 hover:bg-red-700'
                }
                disabled={actionType === 'reject' && !justification.trim()}
              >
                {actionType === 'approve' ? 'Aprovar' : 'Recusar'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}