'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { 
  Search, FileText, CheckCircle, XCircle, Clock, Eye,
  AlertTriangle, Star, DollarSign, Calendar, User
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

export default function AdsSection() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [selectedAd, setSelectedAd] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<'view' | 'approve' | 'reject' | 'investigate' | 'feature' | 'pause'>('view')
  const [rejectionReason, setRejectionReason] = useState('')

  const ads = [
    {
      id: 1,
      title: 'Touro Nelore PO - Excelente Genética',
      seller: 'Fazenda Boa Vista',
      price: 'R$ 25.000',
      type: 'Gado de Corte',
      status: 'ativo',
      createdDate: '2024-01-15',
      views: 234,
      favorites: 12,
      reports: 0,
      featured: true,
      description: 'Touro Nelore PO com excelente genética, ideal para reprodução. Animal saudável e com todas as vacinas em dia.',
      images: ['touro1.jpg', 'touro2.jpg', 'touro3.jpg']
    },
    {
      id: 2,
      title: 'Égua Mangalarga Marchador - Registrada',
      seller: 'João Silva',
      price: 'R$ 18.500',
      type: 'Cavalos',
      status: 'pendente',
      createdDate: '2024-01-18',
      views: 45,
      favorites: 3,
      reports: 0,
      featured: false,
      description: 'Égua Mangalarga Marchador registrada, com excelente marcha e temperamento dócil.',
      images: ['egua1.jpg', 'egua2.jpg']
    },
    {
      id: 3,
      title: 'Sêmen Bovino - Touro Campeão',
      seller: 'Agropecuária Três Rios',
      price: 'R$ 150',
      type: 'Sêmen',
      status: 'recusado',
      createdDate: '2024-01-16',
      views: 12,
      favorites: 1,
      reports: 2,
      featured: false,
      rejectionReason: 'Imagens de baixa qualidade',
      description: 'Sêmen de touro campeão, com certificado de qualidade.',
      images: ['semen1.jpg']
    },
    {
      id: 4,
      title: 'Vaca Holandesa - Alta Produção',
      seller: 'Maria Oliveira',
      price: 'R$ 8.500',
      type: 'Gado Leiteiro',
      status: 'pausado',
      createdDate: '2024-01-12',
      views: 156,
      favorites: 8,
      reports: 1,
      featured: false,
      description: 'Vaca Holandesa com alta produção de leite, excelente para pecuária leiteira.',
      images: ['vaca1.jpg', 'vaca2.jpg'],
      reportDetails: [
        { reporter: 'Usuário Anônimo', reason: 'Preço suspeito', date: '2024-01-19' }
      ]
    }
  ]

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      ativo: { color: 'bg-green-100 text-green-800', label: 'Ativo', icon: CheckCircle },
      pendente: { color: 'bg-orange-100 text-orange-800', label: 'Pendente', icon: Clock },
      recusado: { color: 'bg-red-100 text-red-800', label: 'Recusado', icon: XCircle },
      pausado: { color: 'bg-gray-100 text-gray-800', label: 'Pausado', icon: Clock }
    }
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.ativo
    const Icon = config.icon
    return (
      <Badge className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    )
  }

  const filteredAds = ads.filter(ad => {
    const matchesSearch = ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ad.seller.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || ad.status === statusFilter
    const matchesType = typeFilter === 'all' || ad.type === typeFilter
    
    return matchesSearch && matchesStatus && matchesType
  })

  const handleAction = (ad: any, action: 'view' | 'approve' | 'reject' | 'investigate' | 'feature' | 'pause') => {
    setSelectedAd(ad)
    setModalType(action)
    setShowModal(true)
    setRejectionReason('')
  }

  const handleConfirmAction = () => {
    if (!selectedAd) return

    switch (modalType) {
      case 'approve':
        console.log(`Aprovando anúncio ${selectedAd.id}`)
        // Aqui seria feita a ação real de aprovação
        break
      case 'reject':
        if (!rejectionReason.trim()) return
        console.log(`Recusando anúncio ${selectedAd.id} com motivo: ${rejectionReason}`)
        // Aqui seria feita a ação real de recusa
        break
      case 'feature':
        console.log(`Destacando anúncio ${selectedAd.id}`)
        // Aqui seria feita a ação real de destaque
        break
      case 'pause':
        console.log(`Pausando anúncio ${selectedAd.id}`)
        // Aqui seria feita a ação real de pausa
        break
      case 'investigate':
        console.log(`Investigando anúncio ${selectedAd.id}`)
        // Aqui seria feita a ação real de investigação
        break
    }
    
    setShowModal(false)
    setSelectedAd(null)
  }

  const renderModalContent = () => {
    if (!selectedAd) return null

    switch (modalType) {
      case 'view':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-[#2B2E2B] mb-2">Informações do Anúncio</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Vendedor:</strong> {selectedAd.seller}</p>
                  <p><strong>Preço:</strong> {selectedAd.price}</p>
                  <p><strong>Categoria:</strong> {selectedAd.type}</p>
                  <p><strong>Data de Criação:</strong> {new Date(selectedAd.createdDate).toLocaleDateString('pt-BR')}</p>
                  <p><strong>Status:</strong> {getStatusBadge(selectedAd.status)}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-[#2B2E2B] mb-2">Estatísticas</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Visualizações:</strong> {selectedAd.views}</p>
                  <p><strong>Favoritos:</strong> {selectedAd.favorites}</p>
                  <p><strong>Denúncias:</strong> {selectedAd.reports}</p>
                  <p><strong>Em Destaque:</strong> {selectedAd.featured ? 'Sim' : 'Não'}</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-[#2B2E2B] mb-2">Descrição</h4>
              <p className="text-sm text-[#6E7D5B] bg-[#F7F6F2] p-3 rounded-lg">{selectedAd.description}</p>
            </div>
            <div>
              <h4 className="font-semibold text-[#2B2E2B] mb-2">Imagens ({selectedAd.images.length})</h4>
              <div className="flex flex-wrap gap-2">
                {selectedAd.images.map((image: string, index: number) => (
                  <div key={index} className="w-20 h-20 bg-[#F7F6F2] rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-[#6E7D5B]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'approve':
        return (
          <div className="space-y-4">
            <p className="text-[#6E7D5B]">Tem certeza que deseja aprovar este anúncio?</p>
            <div className="p-4 bg-[#F7F6F2] rounded-lg">
              <h4 className="font-semibold text-[#2B2E2B]">{selectedAd.title}</h4>
              <p className="text-sm text-[#6E7D5B]">Por: {selectedAd.seller}</p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowModal(false)}>Cancelar</Button>
              <Button onClick={handleConfirmAction} className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="w-4 h-4 mr-2" />
                Aprovar Anúncio
              </Button>
            </div>
          </div>
        )

      case 'reject':
        return (
          <div className="space-y-4">
            <p className="text-[#6E7D5B]">Por que você está recusando este anúncio?</p>
            <div className="p-4 bg-[#F7F6F2] rounded-lg">
              <h4 className="font-semibold text-[#2B2E2B]">{selectedAd.title}</h4>
              <p className="text-sm text-[#6E7D5B]">Por: {selectedAd.seller}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2B2E2B] mb-2">Motivo da recusa:</label>
              <Textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Explique o motivo da recusa..."
                className="min-h-20"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowModal(false)}>Cancelar</Button>
              <Button 
                onClick={handleConfirmAction} 
                className="bg-red-600 hover:bg-red-700"
                disabled={!rejectionReason.trim()}
              >
                <XCircle className="w-4 h-4 mr-2" />
                Recusar Anúncio
              </Button>
            </div>
          </div>
        )

      case 'investigate':
        return (
          <div className="space-y-4">
            <p className="text-[#6E7D5B]">Investigação de denúncias para este anúncio:</p>
            <div className="p-4 bg-[#F7F6F2] rounded-lg">
              <h4 className="font-semibold text-[#2B2E2B]">{selectedAd.title}</h4>
              <p className="text-sm text-[#6E7D5B]">Por: {selectedAd.seller}</p>
              <p className="text-sm text-red-600 mt-2">
                <AlertTriangle className="w-4 h-4 inline mr-1" />
                {selectedAd.reports} denúncia(s) recebida(s)
              </p>
            </div>
            {selectedAd.reportDetails && (
              <div>
                <h4 className="font-semibold text-[#2B2E2B] mb-2">Detalhes das Denúncias:</h4>
                <div className="space-y-2">
                  {selectedAd.reportDetails.map((report: any, index: number) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <p className="text-sm"><strong>Denunciante:</strong> {report.reporter}</p>
                      <p className="text-sm"><strong>Motivo:</strong> {report.reason}</p>
                      <p className="text-sm"><strong>Data:</strong> {new Date(report.date).toLocaleDateString('pt-BR')}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowModal(false)}>Fechar</Button>
              <Button onClick={handleConfirmAction} className="bg-blue-600 hover:bg-blue-700">
                <Eye className="w-4 h-4 mr-2" />
                Marcar como Investigado
              </Button>
            </div>
          </div>
        )

      case 'feature':
        return (
          <div className="space-y-4">
            <p className="text-[#6E7D5B]">Deseja colocar este anúncio em destaque?</p>
            <div className="p-4 bg-[#F7F6F2] rounded-lg">
              <h4 className="font-semibold text-[#2B2E2B]">{selectedAd.title}</h4>
              <p className="text-sm text-[#6E7D5B]">Por: {selectedAd.seller}</p>
            </div>
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <Star className="w-4 h-4 inline mr-1" />
                Anúncios em destaque aparecem no topo dos resultados de busca.
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowModal(false)}>Cancelar</Button>
              <Button onClick={handleConfirmAction} className="bg-yellow-600 hover:bg-yellow-700">
                <Star className="w-4 h-4 mr-2" />
                Colocar em Destaque
              </Button>
            </div>
          </div>
        )

      case 'pause':
        return (
          <div className="space-y-4">
            <p className="text-[#6E7D5B]">Deseja pausar este anúncio?</p>
            <div className="p-4 bg-[#F7F6F2] rounded-lg">
              <h4 className="font-semibold text-[#2B2E2B]">{selectedAd.title}</h4>
              <p className="text-sm text-[#6E7D5B]">Por: {selectedAd.seller}</p>
            </div>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-800">
                <Clock className="w-4 h-4 inline mr-1" />
                Anúncios pausados não aparecem nas buscas mas podem ser reativados.
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowModal(false)}>Cancelar</Button>
              <Button onClick={handleConfirmAction} className="bg-gray-600 hover:bg-gray-700">
                <Clock className="w-4 h-4 mr-2" />
                Pausar Anúncio
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
              <FileText className="w-5 h-5 text-[#1E4D2B]" />
              Gerenciamento de Anúncios
            </div>
            <div className="flex items-center gap-4 text-sm text-[#6E7D5B]">
              <span>Ativos: {ads.filter(a => a.status === 'ativo').length}</span>
              <span>Pendentes: {ads.filter(a => a.status === 'pendente').length}</span>
              <span>Denúncias: {ads.reduce((sum, a) => sum + a.reports, 0)}</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6E7D5B] w-4 h-4" />
                <Input
                  placeholder="Buscar anúncios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="recusado">Recusado</SelectItem>
                  <SelectItem value="pausado">Pausado</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos Tipos</SelectItem>
                  <SelectItem value="Gado de Corte">Gado de Corte</SelectItem>
                  <SelectItem value="Gado Leiteiro">Gado Leiteiro</SelectItem>
                  <SelectItem value="Cavalos">Cavalos</SelectItem>
                  <SelectItem value="Sêmen">Sêmen</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Anúncios */}
      <div className="grid gap-4">
        {filteredAds.map((ad) => (
          <Card key={ad.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    {/* Imagem Placeholder */}
                    <div className="w-20 h-20 bg-[#F7F6F2] rounded-lg flex items-center justify-center">
                      <FileText className="w-8 h-8 text-[#6E7D5B]" />
                    </div>
                    
                    {/* Informações do Anúncio */}
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-[#2B2E2B] flex-1">{ad.title}</h3>
                        {ad.featured && (
                          <Star className="w-5 h-5 text-yellow-500 fill-current" title="Anúncio em Destaque" />
                        )}
                        {getStatusBadge(ad.status)}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-[#6E7D5B] mb-3">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          {ad.seller}
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          {ad.price}
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          {ad.type}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(ad.createdDate).toLocaleDateString('pt-BR')}
                        </div>
                      </div>

                      {ad.rejectionReason && (
                        <div className="flex items-center gap-2 text-red-600 text-sm mb-3">
                          <AlertTriangle className="w-4 h-4" />
                          Motivo da recusa: {ad.rejectionReason}
                        </div>
                      )}

                      {/* Estatísticas */}
                      <div className="flex items-center gap-6 text-sm text-[#6E7D5B]">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {ad.views} visualizações
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          {ad.favorites} favoritos
                        </div>
                        {ad.reports > 0 && (
                          <div className="flex items-center gap-1 text-red-600">
                            <AlertTriangle className="w-4 h-4" />
                            {ad.reports} denúncia{ad.reports > 1 ? 's' : ''}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Ações */}
                <div className="flex flex-col gap-2 ml-4">
                  <Button variant="outline" size="sm" onClick={() => handleAction(ad, 'view')}>
                    <Eye className="w-4 h-4 mr-2" />
                    Ver Anúncio
                  </Button>
                  
                  {ad.status === 'pendente' && (
                    <>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleAction(ad, 'approve')}>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Aprovar
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600" onClick={() => handleAction(ad, 'reject')}>
                        <XCircle className="w-4 h-4 mr-2" />
                        Recusar
                      </Button>
                    </>
                  )}
                  
                  {ad.status === 'ativo' && (
                    <>
                      <Button variant="outline" size="sm" onClick={() => handleAction(ad, 'feature')}>
                        <Star className="w-4 h-4 mr-2" />
                        Destacar
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleAction(ad, 'pause')}>
                        <Clock className="w-4 h-4 mr-2" />
                        Pausar
                      </Button>
                    </>
                  )}
                  
                  {ad.reports > 0 && (
                    <Button variant="outline" size="sm" className="text-orange-600" onClick={() => handleAction(ad, 'investigate')}>
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Investigar
                    </Button>
                  )}
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
              <FileText className="w-5 h-5 text-[#1E4D2B]" />
              {modalType === 'view' && 'Detalhes do Anúncio'}
              {modalType === 'approve' && 'Aprovar Anúncio'}
              {modalType === 'reject' && 'Recusar Anúncio'}
              {modalType === 'investigate' && 'Investigar Denúncias'}
              {modalType === 'feature' && 'Destacar Anúncio'}
              {modalType === 'pause' && 'Pausar Anúncio'}
            </DialogTitle>
          </DialogHeader>
          {renderModalContent()}
        </DialogContent>
      </Dialog>
    </div>
  )
}