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
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Ver Anúncio
                  </Button>
                  
                  {ad.status === 'pendente' && (
                    <>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Aprovar
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600">
                        <XCircle className="w-4 h-4 mr-2" />
                        Recusar
                      </Button>
                    </>
                  )}
                  
                  {ad.status === 'ativo' && (
                    <>
                      <Button variant="outline" size="sm">
                        <Star className="w-4 h-4 mr-2" />
                        Destacar
                      </Button>
                      <Button variant="outline" size="sm">
                        <Clock className="w-4 h-4 mr-2" />
                        Pausar
                      </Button>
                    </>
                  )}
                  
                  {ad.reports > 0 && (
                    <Button variant="outline" size="sm" className="text-orange-600">
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
    </div>
  )
}