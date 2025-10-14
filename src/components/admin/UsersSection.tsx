'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export default function UsersSection() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<'view' | 'edit' | 'block' | 'activate'>('view')
  const [blockReason, setBlockReason] = useState('')

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
      isVerified: true,
      address: 'Rua das Flores, 123 - Centro',
      cpf: '123.456.789-00',
      birthDate: '1985-03-15'
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
      isVerified: true,
      address: 'Fazenda Boa Vista, Km 15 - Zona Rural',
      cnpj: '12.345.678/0001-90',
      responsibleName: 'Carlos Silva'
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
      isVerified: false,
      address: 'Av. Copacabana, 456 - Copacabana',
      cpf: '987.654.321-00',
      birthDate: '1990-07-22'
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
      isVerified: true,
      address: 'Rua Minas Gerais, 789 - Centro',
      cpf: '456.789.123-00',
      birthDate: '1978-11-30'
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
      isVerified: true,
      address: 'Setor Agropecuário, Lote 10 - Zona Rural',
      cnpj: '98.765.432/0001-10',
      responsibleName: 'Ana Santos'
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

  const handleAction = (user: any, action: 'view' | 'edit' | 'block' | 'activate') => {
    setSelectedUser(user)
    setModalType(action)
    setShowModal(true)
    setBlockReason('')
  }

  const handleConfirmAction = () => {
    if (!selectedUser) return

    switch (modalType) {
      case 'block':
        if (!blockReason.trim()) return
        console.log(`Bloqueando usuário ${selectedUser.id} com motivo: ${blockReason}`)
        break
      case 'activate':
        console.log(`Ativando usuário ${selectedUser.id}`)
        break
      case 'edit':
        console.log(`Editando usuário ${selectedUser.id}`)
        break
    }
    
    setShowModal(false)
    setSelectedUser(null)
  }

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Nome,Email,Telefone,Cidade,Estado,Tipo,Status,Data Cadastro\n" +
      filteredUsers.map(user => 
        `${user.name},${user.email},${user.phone},${user.city},${user.state},${user.type},${user.status},${user.joinDate}`
      ).join("\n")
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "usuarios.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const renderModalContent = () => {
    if (!selectedUser) return null

    switch (modalType) {
      case 'view':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-[#2B2E2B] mb-3">Informações Pessoais</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Nome:</strong> {selectedUser.name}</p>
                  <p><strong>Email:</strong> {selectedUser.email}</p>
                  <p><strong>Telefone:</strong> {selectedUser.phone}</p>
                  <p><strong>Endereço:</strong> {selectedUser.address}</p>
                  <p><strong>Cidade/Estado:</strong> {selectedUser.city}, {selectedUser.state}</p>
                  {selectedUser.type === 'PF' ? (
                    <>
                      <p><strong>CPF:</strong> {selectedUser.cpf}</p>
                      <p><strong>Data de Nascimento:</strong> {new Date(selectedUser.birthDate).toLocaleDateString('pt-BR')}</p>
                    </>
                  ) : (
                    <>
                      <p><strong>CNPJ:</strong> {selectedUser.cnpj}</p>
                      <p><strong>Responsável:</strong> {selectedUser.responsibleName}</p>
                    </>
                  )}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-[#2B2E2B] mb-3">Informações da Conta</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Status:</strong> {getStatusBadge(selectedUser.status)}</p>
                  <p><strong>Tipo:</strong> <Badge variant="outline">{selectedUser.type}</Badge></p>
                  <p><strong>Origem:</strong> {getOriginBadge(selectedUser.origin)}</p>
                  <p><strong>Verificado:</strong> {selectedUser.isVerified ? 'Sim' : 'Não'}</p>
                  <p><strong>Data de Cadastro:</strong> {new Date(selectedUser.joinDate).toLocaleDateString('pt-BR')}</p>
                  <p><strong>Última Atividade:</strong> {new Date(selectedUser.lastActivity).toLocaleDateString('pt-BR')}</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-[#2B2E2B] mb-3">Estatísticas de Atividade</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-[#F7F6F2] rounded-lg">
                  <p className="text-2xl font-bold text-[#1E4D2B]">{selectedUser.adsCount}</p>
                  <p className="text-xs text-[#6E7D5B]">Anúncios</p>
                </div>
                <div className="text-center p-3 bg-[#F7F6F2] rounded-lg">
                  <p className="text-2xl font-bold text-[#1E4D2B]">{selectedUser.auctionsCount}</p>
                  <p className="text-xs text-[#6E7D5B]">Leilões</p>
                </div>
                <div className="text-center p-3 bg-[#F7F6F2] rounded-lg">
                  <p className="text-2xl font-bold text-[#1E4D2B]">{selectedUser.favoritesCount}</p>
                  <p className="text-xs text-[#6E7D5B]">Favoritos</p>
                </div>
                <div className="text-center p-3 bg-[#F7F6F2] rounded-lg">
                  <p className="text-2xl font-bold text-[#1E4D2B]">{selectedUser.purchasesCount}</p>
                  <p className="text-xs text-[#6E7D5B]">Compras</p>
                </div>
              </div>
            </div>
          </div>
        )

      case 'edit':
        return (
          <div className="space-y-4">
            <p className="text-[#6E7D5B]">Editar informações do usuário:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#2B2E2B] mb-1">Nome:</label>
                <Input defaultValue={selectedUser.name} />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2B2E2B] mb-1">Email:</label>
                <Input defaultValue={selectedUser.email} />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2B2E2B] mb-1">Telefone:</label>
                <Input defaultValue={selectedUser.phone} />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2B2E2B] mb-1">Status:</label>
                <Select defaultValue={selectedUser.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="inativo">Inativo</SelectItem>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="bloqueado">Bloqueado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowModal(false)}>Cancelar</Button>
              <Button onClick={handleConfirmAction} className="bg-blue-600 hover:bg-blue-700">
                <Edit className="w-4 h-4 mr-2" />
                Salvar Alterações
              </Button>
            </div>
          </div>
        )

      case 'block':
        return (
          <div className="space-y-4">
            <p className="text-[#6E7D5B]">Por que você está bloqueando este usuário?</p>
            <div className="p-4 bg-[#F7F6F2] rounded-lg">
              <h4 className="font-semibold text-[#2B2E2B]">{selectedUser.name}</h4>
              <p className="text-sm text-[#6E7D5B]">{selectedUser.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2B2E2B] mb-2">Motivo do bloqueio:</label>
              <Textarea
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
                placeholder="Explique o motivo do bloqueio..."
                className="min-h-20"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowModal(false)}>Cancelar</Button>
              <Button 
                onClick={handleConfirmAction} 
                className="bg-red-600 hover:bg-red-700"
                disabled={!blockReason.trim()}
              >
                <Ban className="w-4 h-4 mr-2" />
                Bloquear Usuário
              </Button>
            </div>
          </div>
        )

      case 'activate':
        return (
          <div className="space-y-4">
            <p className="text-[#6E7D5B]">Deseja ativar este usuário?</p>
            <div className="p-4 bg-[#F7F6F2] rounded-lg">
              <h4 className="font-semibold text-[#2B2E2B]">{selectedUser.name}</h4>
              <p className="text-sm text-[#6E7D5B]">{selectedUser.email}</p>
              <p className="text-sm text-[#6E7D5B]">Status atual: {getStatusBadge(selectedUser.status)}</p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowModal(false)}>Cancelar</Button>
              <Button onClick={handleConfirmAction} className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="w-4 h-4 mr-2" />
                Ativar Usuário
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
      {/* Header com Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-[#1E4D2B]" />
              Gerenciamento de Usuários
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleExportCSV}>
                <Download className="w-4 h-4 mr-2" />
                Exportar CSV
              </Button>
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
            
            {/* Filtros */}
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
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
                <SelectTrigger className="w-32">
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
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 bg-[#1E4D2B] rounded-full flex items-center justify-center text-white font-bold">
                      {user.name.charAt(0)}
                    </div>
                    
                    {/* Informações Principais */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-[#2B2E2B]">{user.name}</h3>
                        {user.isVerified && (
                          <CheckCircle className="w-5 h-5 text-green-500" title="Verificado" />
                        )}
                        {getStatusBadge(user.status)}
                        <Badge variant="outline" className="text-xs">
                          {user.type}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-[#6E7D5B]">
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
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-100">
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
                <div className="flex flex-col gap-2 ml-4">
                  <Button variant="outline" size="sm" onClick={() => handleAction(user, 'view')}>
                    <Eye className="w-4 h-4 mr-2" />
                    Ver Detalhes
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleAction(user, 'edit')}>
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                  {user.status === 'ativo' ? (
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700" onClick={() => handleAction(user, 'block')}>
                      <Ban className="w-4 h-4 mr-2" />
                      Bloquear
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" className="text-green-600 hover:text-green-700" onClick={() => handleAction(user, 'activate')}>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Ativar
                    </Button>
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

      {/* Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-[#1E4D2B]" />
              {modalType === 'view' && 'Detalhes do Usuário'}
              {modalType === 'edit' && 'Editar Usuário'}
              {modalType === 'block' && 'Bloquear Usuário'}
              {modalType === 'activate' && 'Ativar Usuário'}
            </DialogTitle>
          </DialogHeader>
          {renderModalContent()}
        </DialogContent>
      </Dialog>
    </div>
  )
}