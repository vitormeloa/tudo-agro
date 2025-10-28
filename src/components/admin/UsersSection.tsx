'use client'

import { useState } from 'react'
import UserDetailsModal from './modals/UserDetailsModal'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ResponsiveButton } from '@/components/ui/responsive-button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ResponsiveCard, ResponsiveGrid } from '@/components/ui/responsive-card'
import { 
  Search, Filter, Download, Eye, Edit, Ban, CheckCircle,
  User, Mail, Phone, MapPin, Calendar, Activity
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function UsersSection() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const users = [
    {
      id: 1,
      name: 'João Silva Santos',
      email: 'joao.silva@email.com',
      phone: '(11) 99999-9999',
      city: 'São Paulo',
      state: 'SP',
      type: 'PF',
      status: 'ativo',
      origin: 'orgânico',
      joinDate: '2024-01-15',
      lastActivity: '2024-01-20',
      adsCount: 5,
      auctionsCount: 12,
      favoritesCount: 23,
      purchasesCount: 3,
      isVerified: true
    },
    {
      id: 2,
      name: 'Fazenda Boa Vista Ltda',
      email: 'contato@fazendaboavista.com.br',
      phone: '(16) 3333-4444',
      city: 'Ribeirão Preto',
      state: 'SP',
      type: 'PJ',
      status: 'ativo',
      origin: 'indicação',
      joinDate: '2024-01-10',
      lastActivity: '2024-01-20',
      adsCount: 15,
      auctionsCount: 8,
      favoritesCount: 45,
      purchasesCount: 7,
      isVerified: true
    },
    {
      id: 3,
      name: 'Maria Oliveira',
      email: 'maria.oliveira@gmail.com',
      phone: '(21) 88888-7777',
      city: 'Rio de Janeiro',
      state: 'RJ',
      type: 'PF',
      status: 'pendente',
      origin: 'rede social',
      joinDate: '2024-01-18',
      lastActivity: '2024-01-19',
      adsCount: 0,
      auctionsCount: 2,
      favoritesCount: 8,
      purchasesCount: 0,
      isVerified: false
    },
    {
      id: 4,
      name: 'Carlos Mendes',
      email: 'carlos.mendes@hotmail.com',
      phone: '(31) 77777-6666',
      city: 'Belo Horizonte',
      state: 'MG',
      type: 'PF',
      status: 'inativo',
      origin: 'leilão',
      joinDate: '2024-01-05',
      lastActivity: '2024-01-12',
      adsCount: 2,
      auctionsCount: 15,
      favoritesCount: 12,
      purchasesCount: 1,
      isVerified: true
    },
    {
      id: 5,
      name: 'Agropecuária Três Rios',
      email: 'vendas@agrotresrios.com.br',
      phone: '(62) 5555-4444',
      city: 'Goiânia',
      state: 'GO',
      type: 'PJ',
      status: 'ativo',
      origin: 'orgânico',
      joinDate: '2023-12-20',
      lastActivity: '2024-01-20',
      adsCount: 28,
      auctionsCount: 25,
      favoritesCount: 67,
      purchasesCount: 12,
      isVerified: true
    }
  ]

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      ativo: { color: 'bg-green-100 text-green-800', label: 'Ativo' },
      inativo: { color: 'bg-gray-100 text-gray-800', label: 'Inativo' },
      pendente: { color: 'bg-orange-100 text-orange-800', label: 'Pendente' },
      bloqueado: { color: 'bg-red-100 text-red-800', label: 'Bloqueado' }
    }
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.ativo
    return <Badge className={config.color}>{config.label}</Badge>
  }

  const getOriginBadge = (origin: string) => {
    const originConfig = {
      orgânico: { color: 'bg-blue-100 text-blue-800', label: 'Orgânico' },
      'rede social': { color: 'bg-purple-100 text-purple-800', label: 'Rede Social' },
      indicação: { color: 'bg-green-100 text-green-800', label: 'Indicação' },
      leilão: { color: 'bg-orange-100 text-orange-800', label: 'Leilão' }
    }
    const config = originConfig[origin as keyof typeof originConfig] || originConfig.orgânico
    return <Badge variant="outline" className={config.color}>{config.label}</Badge>
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    const matchesType = typeFilter === 'all' || user.type === typeFilter
    
    return matchesSearch && matchesStatus && matchesType
  })

  const handleViewDetails = (user: any) => {
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header com Filtros */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-[#1E4D2B]" />
                    <span className="text-base sm:text-lg font-semibold">Gerenciamento de Usuários</span>
                </CardTitle>
            </div>
            
            <div className="flex items-center gap-2">
              <ResponsiveButton 
                variant="outline" 
                size="sm"
                icon={<Download className="w-4 h-4" />}
                text="Exportar CSV"
                fullWidthOnMobile={false}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4">
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
            
            {/* Filtros */}
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos Status</SelectItem>
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="inativo">Inativo</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="bloqueado">Bloqueado</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="PF">PF</SelectItem>
                  <SelectItem value="PJ">PJ</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Usuários */}
      <div className="grid gap-4">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 bg-[#1E4D2B] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                      {user.name.charAt(0)}
                    </div>
                    
                    {/* Informações Principais */}
                    <div className="flex-1 w-full">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-[#2B2E2B]">{user.name}</h3>
                        <div className="flex items-center gap-2 flex-wrap">
                          {user.isVerified && (
                            <CheckCircle className="w-5 h-5 text-green-500" title="Verificado" />
                          )}
                          {getStatusBadge(user.status)}
                          <Badge variant="outline" className="text-xs">
                            {user.type}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-[#6E7D5B]">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          {user.email}
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          {user.phone}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {user.city}, {user.state}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Desde {new Date(user.joinDate).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-3">
                        {getOriginBadge(user.origin)}
                        <div className="flex items-center gap-1 text-xs text-[#6E7D5B]">
                          <Activity className="w-3 h-3" />
                          Última atividade: {new Date(user.lastActivity).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Estatísticas */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-100">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-[#1E4D2B]">{user.adsCount}</p>
                      <p className="text-xs text-[#6E7D5B]">Anúncios</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-[#1E4D2B]">{user.auctionsCount}</p>
                      <p className="text-xs text-[#6E7D5B]">Leilões</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-[#1E4D2B]">{user.favoritesCount}</p>
                      <p className="text-xs text-[#6E7D5B]">Favoritos</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-[#1E4D2B]">{user.purchasesCount}</p>
                      <p className="text-xs text-[#6E7D5B]">Compras</p>
                    </div>
                  </div>
                </div>
                
                {/* Ações */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-2 ml-0 sm:ml-4 mt-4 sm:mt-0">
                  <ResponsiveButton 
                    variant="outline" 
                    size="sm"
                    icon={<Eye className="w-4 h-4" />}
                    text="Ver Detalhes"
                    onClick={() => handleViewDetails(user)}
                    fullWidthOnMobile={true}
                  />
                  <ResponsiveButton 
                    variant="outline" 
                    size="sm"
                    icon={<Edit className="w-4 h-4" />}
                    text="Editar"
                    fullWidthOnMobile={true}
                  />
                  {user.status === 'ativo' ? (
                    <ResponsiveButton 
                      variant="outline" 
                      size="sm" 
                      icon={<Ban className="w-4 h-4" />}
                      text="Bloquear"
                      className="text-red-600 hover:text-red-700"
                      fullWidthOnMobile={true}
                    />
                  ) : (
                    <ResponsiveButton 
                      variant="outline" 
                      size="sm" 
                      icon={<CheckCircle className="w-4 h-4" />}
                      text="Ativar"
                      className="text-green-600 hover:text-green-700"
                      fullWidthOnMobile={true}
                    />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Resumo */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between text-sm text-[#6E7D5B]">
            <span>Mostrando {filteredUsers.length} de {users.length} usuários</span>
            <div className="flex items-center gap-4">
              <span>Total de usuários ativos: {users.filter(u => u.status === 'ativo').length}</span>
              <span>Aguardando verificação: {users.filter(u => u.status === 'pendente').length}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal de Detalhes do Usuário */}
      {selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedUser(null)
          }}
        />
      )}
    </div>
  )
}