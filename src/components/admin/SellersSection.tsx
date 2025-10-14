'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { 
  Search, Store, CheckCircle, XCircle, Clock, FileText,
  User, Mail, Phone, MapPin, Calendar, TrendingUp, AlertTriangle, Eye
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

export default function SellersSection() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedSeller, setSelectedSeller] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<'view' | 'approve' | 'reject' | 'documents'>('view')
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
      specialization: 'Gado de Corte',
      address: 'Rua das Flores, 123 - Centro',
      cpf: '123.456.789-00',
      bankAccount: 'Banco do Brasil - Ag: 1234 - CC: 56789-0'
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
      specialization: 'Gado Leiteiro',
      address: 'Fazenda Boa Vista, Km 15 - Zona Rural',
      cnpj: '12.345.678/0001-90',
      bankAccount: 'Itaú - Ag: 5678 - CC: 12345-6'
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
      specialization: 'Cavalos',
      address: 'Rua Minas Gerais, 789 - Centro',
      cpf: '456.789.123-00',
      bankAccount: 'Caixa Econômica - Ag: 9876 - CC: 54321-9'
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
      specialization: 'Sêmen Bovino',
      address: 'Av. Copacabana, 456 - Copacabana',
      cpf: '987.654.321-00',
      bankAccount: 'Bradesco - Ag: 2468 - CC: 13579-2'
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
      specialization: 'Gado de Corte',
      address: 'Setor Agropecuário, Lote 10 - Zona Rural',
      cnpj: '98.765.432/0001-10',
      bankAccount: 'Santander - Ag: 1357 - CC: 24680-1'
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

  const handleAction = (seller: any, action: 'view' | 'approve' | 'reject' | 'documents') => {
    setSelectedSeller(seller)
    setModalType(action)
    setShowModal(true)
    setJustification('')
  }

  const confirmAction = () => {
    if (!selectedSeller) return

    switch (modalType) {
      case 'approve':
        console.log(`Aprovando vendedor ${selectedSeller.id} com observação: ${justification}`)
        break
      case 'reject':
        if (!justification.trim()) return
        console.log(`Recusando vendedor ${selectedSeller.id} com motivo: ${justification}`)
        break
    }
    
    setShowModal(false)
    setSelectedSeller(null)
  }

  const renderModalContent = () => {
    if (!selectedSeller) return null

    switch (modalType) {
      case 'view':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-[#2B2E2B] mb-3">Informações Pessoais</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Nome:</strong> {selectedSeller.name}</p>
                  <p><strong>Email:</strong> {selectedSeller.email}</p>
                  <p><strong>Telefone:</strong> {selectedSeller.phone}</p>
                  <p><strong>Endereço:</strong> {selectedSeller.address}</p>
                  <p><strong>Cidade/Estado:</strong> {selectedSeller.city}, {selectedSeller.state}</p>
                  <p><strong>Especialização:</strong> {selectedSeller.specialization}</p>
                  {selectedSeller.cpf && <p><strong>CPF:</strong> {selectedSeller.cpf}</p>}
                  {selectedSeller.cnpj && <p><strong>CNPJ:</strong> {selectedSeller.cnpj}</p>}
                  <p><strong>Conta Bancária:</strong> {selectedSeller.bankAccount}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-[#2B2E2B] mb-3">Status da Solicitação</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Status:</strong> {getStatusBadge(selectedSeller.status)}</p>
                  <p><strong>Data da Solicitação:</strong> {new Date(selectedSeller.requestDate).toLocaleDateString('pt-BR')}</p>
                  {selectedSeller.approvalDate && (
                    <p className="text-green-600"><strong>Aprovado em:</strong> {new Date(selectedSeller.approvalDate).toLocaleDateString('pt-BR')}</p>
                  )}
                  {selectedSeller.rejectionDate && (
                    <p className="text-red-600"><strong>Recusado em:</strong> {new Date(selectedSeller.rejectionDate).toLocaleDateString('pt-BR')}</p>
                  )}
                  {selectedSeller.rejectionReason && (
                    <p className="text-red-600"><strong>Motivo:</strong> {selectedSeller.rejectionReason}</p>
                  )}
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-[#2B2E2B] mb-3">Documentos Enviados</h4>
              <div className="flex flex-wrap gap-2">
                {selectedSeller.documentsSubmitted.map((doc: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    <FileText className="w-3 h-3 mr-1" />
                    {doc}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-[#2B2E2B] mb-3">Estatísticas de Vendas</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-[#F7F6F2] rounded-lg">
                  <p className="text-2xl font-bold text-[#1E4D2B]">{selectedSeller.activeAds}</p>
                  <p className="text-xs text-[#6E7D5B]">Anúncios Ativos</p>
                </div>
                <div className="text-center p-3 bg-[#F7F6F2] rounded-lg">
                  <p className="text-2xl font-bold text-[#1E4D2B]">{selectedSeller.completedSales}</p>
                  <p className="text-xs text-[#6E7D5B]">Vendas Finalizadas</p>
                </div>
                <div className="text-center p-3 bg-[#F7F6F2] rounded-lg">
                  <p className="text-2xl font-bold text-[#1E4D2B]">
                    {selectedSeller.rating > 0 ? selectedSeller.rating.toFixed(1) : '-'}
                  </p>
                  <p className="text-xs text-[#6E7D5B]">Avaliação</p>
                </div>
              </div>
            </div>
          </div>
        )

      case 'approve':
        return (
          <div className="space-y-4">
            <p className="text-[#6E7D5B]">Tem certeza que deseja aprovar este vendedor?</p>
            <div className="p-4 bg-[#F7F6F2] rounded-lg">
              <h4 className="font-semibold text-[#2B2E2B]">{selectedSeller.name}</h4>
              <p className="text-sm text-[#6E7D5B]">{selectedSeller.email}</p>
              <p className="text-sm text-[#6E7D5B]">Especialização: {selectedSeller.specialization}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-[#2B2E2B] block mb-2">
                Observações (opcional):
              </label>
              <Textarea
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
                placeholder="Adicione observações sobre a aprovação..."
                className="min-h-20"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowModal(false)}>Cancelar</Button>
              <Button onClick={confirmAction} className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="w-4 h-4 mr-2" />
                Aprovar Vendedor
              </Button>
            </div>
          </div>
        )

      case 'reject':
        return (
          <div className="space-y-4">
            <p className="text-[#6E7D5B]">Por que você está recusando este vendedor?</p>
            <div className="p-4 bg-[#F7F6F2] rounded-lg">
              <h4 className="font-semibold text-[#2B2E2B]">{selectedSeller.name}</h4>
              <p className="text-sm text-[#6E7D5B]">{selectedSeller.email}</p>
              <p className="text-sm text-[#6E7D5B]">Especialização: {selectedSeller.specialization}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-[#2B2E2B] block mb-2">
                Motivo da recusa:
              </label>
              <Textarea
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
                placeholder="Explique o motivo da recusa..."
                className="min-h-20"
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowModal(false)}>Cancelar</Button>
              <Button 
                onClick={confirmAction}
                className="bg-red-600 hover:bg-red-700"
                disabled={!justification.trim()}
              >
                <XCircle className="w-4 h-4 mr-2" />
                Recusar Vendedor
              </Button>
            </div>
          </div>
        )

      case 'documents':
        return (
          <div className="space-y-4">
            <p className="text-[#6E7D5B]">Documentos enviados pelo vendedor:</p>
            <div className="p-4 bg-[#F7F6F2] rounded-lg">
              <h4 className="font-semibold text-[#2B2E2B]">{selectedSeller.name}</h4>
              <p className="text-sm text-[#6E7D5B]">{selectedSeller.email}</p>
            </div>
            <div className="space-y-3">
              {selectedSeller.documentsSubmitted.map((doc: string, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#6E7D5B]" />
                    <span className="font-medium">{doc}</span>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Visualizar
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setShowModal(false)}>Fechar</Button>
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
                  <Button variant="outline" size="sm" onClick={() => handleAction(seller, 'view')}>
                    <Eye className="w-4 h-4 mr-2" />
                    Ver Detalhes
                  </Button>
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
                  <Button variant="outline" size="sm" onClick={() => handleAction(seller, 'documents')}>
                    <FileText className="w-4 h-4 mr-2" />
                    Ver Documentos
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Store className="w-5 h-5 text-[#1E4D2B]" />
              {modalType === 'view' && 'Detalhes do Vendedor'}
              {modalType === 'approve' && 'Aprovar Vendedor'}
              {modalType === 'reject' && 'Recusar Vendedor'}
              {modalType === 'documents' && 'Documentos do Vendedor'}
            </DialogTitle>
          </DialogHeader>
          {renderModalContent()}
        </DialogContent>
      </Dialog>
    </div>
  )
}