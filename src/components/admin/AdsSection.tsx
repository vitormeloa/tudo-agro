'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
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

export default function AdsSection() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')

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
      featured: true
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
      featured: false
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
      rejectionReason: 'Imagens de baixa qualidade'
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
      featured: false
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

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header com Filtros */}
      <Card>
        <CardHeader className="p-3 sm:p-6">
          <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-[#1E4D2B]" />
              <span className="text-base sm:text-lg font-semibold">Gerenciamento de Anúncios</span>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-[#6E7D5B]">
              <span>Ativos: {ads.filter(a => a.status === 'ativo').length}</span>
              <span>Pendentes: {ads.filter(a => a.status === 'pendente').length}</span>
              <span>Denúncias: {ads.reduce((sum, a) => sum + a.reports, 0)}</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6E7D5B] w-4 h-4" />
                <Input
                  placeholder="Buscar anúncios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-sm"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-32">
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
                <SelectTrigger className="w-full sm:w-40">
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
      <div className="grid gap-3 sm:gap-4">
        {filteredAds.map((ad) => (
          <Card key={ad.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-3 sm:p-6">
              <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
                <div className="flex-1 w-full">
                  <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                    {/* Imagem Placeholder */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#F7F6F2] rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-[#6E7D5B]" />
                    </div>
                    
                    {/* Informações do Anúncio */}
                    <div className="flex-1 w-full min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3 mb-2">
                        <h3 className="text-base sm:text-lg font-semibold text-[#2B2E2B] flex-1 break-words">{ad.title}</h3>
                        <div className="flex items-center gap-2">
                          {ad.featured && (
                            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 fill-current flex-shrink-0" title="Anúncio em Destaque" />
                          )}
                          {getStatusBadge(ad.status)}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm text-[#6E7D5B] mb-3">
                        <div className="flex items-center gap-2 min-w-0">
                          <User className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span className="truncate">{ad.seller}</span>
                        </div>
                        <div className="flex items-center gap-2 min-w-0">
                          <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span className="truncate">{ad.price}</span>
                        </div>
                        <div className="flex items-center gap-2 min-w-0">
                          <FileText className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span className="truncate">{ad.type}</span>
                        </div>
                        <div className="flex items-center gap-2 min-w-0">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span className="truncate">{new Date(ad.createdDate).toLocaleDateString('pt-BR')}</span>
                        </div>
                      </div>

                      {ad.rejectionReason && (
                        <div className="flex items-center gap-2 text-red-600 text-xs sm:text-sm mb-3">
                          <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span className="break-words">Motivo da recusa: {ad.rejectionReason}</span>
                        </div>
                      )}

                      {/* Estatísticas */}
                      <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-[#6E7D5B]">
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span>{ad.views} visualizações</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span>{ad.favorites} favoritos</span>
                        </div>
                        {ad.reports > 0 && (
                          <div className="flex items-center gap-1 text-red-600">
                            <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                            <span>{ad.reports} denúncia{ad.reports > 1 ? 's' : ''}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Ações */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-2 w-full lg:w-auto lg:ml-4">
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                    <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Ver Anúncio</span>
                    <span className="sm:hidden">Ver</span>
                  </Button>
                  
                  {ad.status === 'pendente' && (
                    <>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-xs sm:text-sm">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">Aprovar</span>
                        <span className="sm:hidden">Aprovar</span>
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 text-xs sm:text-sm">
                        <XCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">Recusar</span>
                        <span className="sm:hidden">Recusar</span>
                      </Button>
                    </>
                  )}
                  
                  {ad.status === 'ativo' && (
                    <>
                      <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">Destacar</span>
                        <span className="sm:hidden">Destacar</span>
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">Pausar</span>
                        <span className="sm:hidden">Pausar</span>
                      </Button>
                    </>
                  )}
                  
                  {ad.reports > 0 && (
                    <Button variant="outline" size="sm" className="text-orange-600 text-xs sm:text-sm">
                      <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Investigar</span>
                      <span className="sm:hidden">Investigar</span>
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}