'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
    Search, Filter, Plus, Eye, Edit, Trash2, Star, Pause, Play,
    CheckCircle, XCircle, Clock, AlertTriangle, DollarSign, Calendar,
    User, Tag, BarChart3, TrendingUp, Download, Store
} from 'lucide-react'
import { useState } from 'react'
import { useAdminPermissions } from '@/hooks/useAdminPermissions'

interface Ad {
  id: string
  title: string
  description: string
  category: string
  price: number
  status: 'active' | 'paused' | 'pending' | 'rejected' | 'featured'
  seller: string
  sellerId: string
  createdAt: string
  updatedAt: string
  views: number
  featured: boolean
  priority: 'low' | 'medium' | 'high'
  images: string[]
  tags: string[]
}

export default function AdsSection() {
  const { isAdmin, isSeller, isBuyer, canExecuteAction } = useAdminPermissions()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')

  // Dados mockados - em produção viria da API
  const ads: Ad[] = [
    {
      id: '1',
      title: 'Gado Nelore de Elite - 50 cabeças',
      description: 'Lote de gado nelore selecionado, vacinado e vermifugado. Idade entre 18-24 meses.',
      category: 'Gado de Corte',
      price: 250000,
      status: 'active',
      seller: 'Fazenda São José',
      sellerId: 'seller-1',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20',
      views: 1247,
      featured: true,
      priority: 'high',
      images: ['/images/gado1.jpg', '/images/gado2.jpg'],
      tags: ['nelore', 'gado', 'corte', 'elite']
    },
    {
      id: '2',
      title: 'Cavalos Árabes Puro Sangue',
      description: 'Cavalos árabes puro sangue, ideais para competição e reprodução.',
      category: 'Cavalos',
      price: 45000,
      status: 'pending',
      seller: 'Haras Real',
      sellerId: 'seller-2',
      createdAt: '2024-01-18',
      updatedAt: '2024-01-18',
      views: 89,
      featured: false,
      priority: 'medium',
      images: ['/images/cavalo1.jpg'],
      tags: ['cavalos', 'arabe', 'puro-sangue', 'competição']
    },
    {
      id: '3',
      title: 'Sêmen Bovino - Touros Campeões',
      description: 'Sêmen de touros campeões das melhores linhagens do país.',
      category: 'Sêmen',
      price: 150,
      status: 'rejected',
      seller: 'Genética Premium',
      sellerId: 'seller-3',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-12',
      views: 234,
      featured: false,
      priority: 'low',
      images: ['/images/semen1.jpg'],
      tags: ['semen', 'touros', 'genética', 'reprodução']
    }
  ]

  const getStatusBadge = (status: Ad['status']) => {
    const statusConfig = {
      active: { label: 'Ativo', variant: 'default' as const, icon: CheckCircle },
      paused: { label: 'Pausado', variant: 'secondary' as const, icon: Pause },
      pending: { label: 'Pendente', variant: 'outline' as const, icon: Clock },
      rejected: { label: 'Rejeitado', variant: 'destructive' as const, icon: XCircle },
      featured: { label: 'Destaque', variant: 'default' as const, icon: Star }
    }
    
    const config = statusConfig[status]
    const Icon = config.icon
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    )
  }

  const getPriorityBadge = (priority: Ad['priority']) => {
    const priorityConfig = {
      low: { label: 'Baixa', variant: 'outline' as const, color: 'text-gray-500' },
      medium: { label: 'Média', variant: 'secondary' as const, color: 'text-yellow-600' },
      high: { label: 'Alta', variant: 'destructive' as const, color: 'text-red-600' }
    }
    
    const config = priorityConfig[priority]
    
    return (
      <Badge variant={config.variant} className={config.color}>
        {config.label}
      </Badge>
    )
  }

  const filteredAds = ads.filter(ad => {
    const matchesSearch = ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ad.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ad.seller.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || ad.status === statusFilter
    const matchesCategory = categoryFilter === 'all' || ad.category === categoryFilter
    
    return matchesSearch && matchesStatus && matchesCategory
  })

  const handleAction = (action: string, adId: string) => {
    console.log(`Ação: ${action} no anúncio: ${adId}`)
    // Implementar lógica de ação
  }

  const canManageAds = isAdmin || (isSeller && canExecuteAction('ad:write'))
  const canApproveAds = isAdmin && canExecuteAction('ad:approve')
  const canFeatureAds = isAdmin && canExecuteAction('ad:feature')

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header e Filtros */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                    <Store className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    <span className="text-base sm:text-lg font-semibold">Gerenciamento de Anúncios</span>
                </CardTitle>
            </div>
            
            {canManageAds && (
              <Button className="w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                Novo Anúncio
              </Button>
            )}
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Busca */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-4 h-4" />
                <Input
                  placeholder="Buscar anúncios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            {/* Filtros */}
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="active">Ativos</SelectItem>
                  <SelectItem value="pending">Pendentes</SelectItem>
                  <SelectItem value="paused">Pausados</SelectItem>
                  <SelectItem value="rejected">Rejeitados</SelectItem>
                  <SelectItem value="featured">Destaque</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-[160px]">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="Gado de Corte">Gado de Corte</SelectItem>
                  <SelectItem value="Cavalos">Cavalos</SelectItem>
                  <SelectItem value="Sêmen">Sêmen</SelectItem>
                  <SelectItem value="Outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Anúncios */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {filteredAds.map((ad) => (
          <Card key={ad.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-base sm:text-lg font-semibold text-[#101828] line-clamp-2">
                    {ad.title}
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {ad.description}
                  </p>
                </div>
                {ad.featured && (
                  <Star className="w-5 h-5 text-yellow-500 fill-current flex-shrink-0 ml-2" />
                )}
              </div>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {getStatusBadge(ad.status)}
                {getPriorityBadge(ad.priority)}
                <Badge variant="outline" className="text-xs">
                  {ad.category}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="space-y-3">
                {/* Informações do Vendedor */}
                <div className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-gray-600" />
                  <span className="text-[#101828] font-medium">{ad.seller}</span>
                </div>
                
                {/* Preço */}
                <div className="flex items-center gap-2 text-lg font-bold text-primary">
                  <DollarSign className="w-4 h-4" />
                  R$ {ad.price.toLocaleString('pt-BR')}
                </div>
                
                {/* Estatísticas */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {ad.views} visualizações
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(ad.createdAt).toLocaleDateString('pt-BR')}
                  </div>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {ad.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {ad.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{ad.tags.length - 3}
                    </Badge>
                  )}
                </div>
                
                {/* Ações */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-1" />
                    Ver
                  </Button>
                  
                  {canManageAds && (
                    <>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      
                      {ad.status === 'active' ? (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleAction('pause', ad.id)}
                        >
                          <Pause className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleAction('resume', ad.id)}
                        >
                          <Play className="w-4 h-4" />
                        </Button>
                      )}
                    </>
                  )}
                  
                  {canApproveAds && ad.status === 'pending' && (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleAction('approve', ad.id)}
                        className="text-primary hover:text-primary"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleAction('reject', ad.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                  
                  {canFeatureAds && !ad.featured && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAction('feature', ad.id)}
                      className="text-yellow-600 hover:text-yellow-700"
                    >
                      <Star className="w-4 h-4" />
                    </Button>
                  )}
                  
                  {canManageAds && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAction('delete', ad.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
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
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {ads.filter(ad => ad.status === 'active').length}
              </div>
              <div className="text-sm text-gray-600">Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {ads.filter(ad => ad.status === 'pending').length}
              </div>
              <div className="text-sm text-gray-600">Pendentes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {ads.filter(ad => ad.featured).length}
              </div>
              <div className="text-sm text-gray-600">Destaque</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {ads.reduce((sum, ad) => sum + ad.views, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Visualizações</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}