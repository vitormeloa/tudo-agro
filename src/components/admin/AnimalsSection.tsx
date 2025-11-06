'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { 
  Search, Heart, CheckCircle, XCircle, Clock, FileText,
  User, Mail, Phone, MapPin, Calendar, TrendingUp, AlertTriangle,
  Plus, Eye, Edit, Trash2, ShoppingCart, DollarSign, Star, 
  Tag, BarChart3, Zap, Shield, Award
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
import { useAdminPermissions } from '@/hooks/useAdminPermissions'

interface Animal {
  id: string
  name: string
  breed: string
  category: string
  age: number
  weight: number
  price: number
  status: 'available' | 'sold' | 'reserved' | 'auction'
  seller: string
  sellerId: string
  location: string
  createdAt: string
  updatedAt: string
  views: number
  featured: boolean
  healthStatus: 'excellent' | 'good' | 'fair' | 'poor'
  pedigree: boolean
  images: string[]
  tags: string[]
  description: string
  offers: number
  auctionEnd?: string
}

export default function AnimalsSection() {
  const { isAdmin, isSeller, isBuyer, canExecuteAction } = useAdminPermissions()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [breedFilter, setBreedFilter] = useState('all')
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null)
  const [actionType, setActionType] = useState<'approve' | 'reject' | 'feature' | null>(null)
  const [justification, setJustification] = useState('')

  // Dados mockados - em produção viria da API
  const animals: Animal[] = [
    {
      id: '1',
      name: 'Touro Nelore Elite',
      breed: 'Nelore',
      category: 'Gado de Corte',
      age: 24,
      weight: 450,
      price: 8500,
      status: 'available',
      seller: 'Fazenda São José',
      sellerId: 'seller-1',
      location: 'São Paulo, SP',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20',
      views: 1247,
      featured: true,
      healthStatus: 'excellent',
      pedigree: true,
      images: ['/images/touro1.jpg', '/images/touro2.jpg'],
      tags: ['nelore', 'touro', 'elite', 'pedigree'],
      description: 'Touro nelore de linhagem elite, com excelente conformação e genética comprovada.',
      offers: 3
    },
    {
      id: '2',
      name: 'Égua Árabe Puro Sangue',
      breed: 'Árabe',
      category: 'Cavalos',
      age: 5,
      weight: 420,
      price: 25000,
      status: 'auction',
      seller: 'Haras Real',
      sellerId: 'seller-2',
      location: 'Minas Gerais, MG',
      createdAt: '2024-01-18',
      updatedAt: '2024-01-18',
      views: 89,
      featured: false,
      healthStatus: 'excellent',
      pedigree: true,
      images: ['/images/cavalo1.jpg'],
      tags: ['cavalo', 'arabe', 'puro-sangue', 'competição'],
      description: 'Égua árabe puro sangue, ideal para competição e reprodução.',
      offers: 0,
      auctionEnd: '2024-02-15T18:00:00Z'
    },
    {
      id: '3',
      name: 'Vaca Leiteira Holandesa',
      breed: 'Holandesa',
      category: 'Gado Leiteiro',
      age: 3,
      weight: 380,
      price: 12000,
      status: 'reserved',
      seller: 'Fazenda Leiteira Premium',
      sellerId: 'seller-3',
      location: 'Rio Grande do Sul, RS',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-12',
      views: 234,
      featured: false,
      healthStatus: 'good',
      pedigree: false,
      images: ['/images/vaca1.jpg'],
      tags: ['vaca', 'leiteira', 'holandesa', 'produção'],
      description: 'Vaca leiteira holandesa com boa produção de leite.',
      offers: 1
    }
  ]

  const getStatusBadge = (status: Animal['status']) => {
    const statusConfig = {
      available: { label: 'Disponível', variant: 'default' as const, icon: CheckCircle },
      sold: { label: 'Vendido', variant: 'secondary' as const, icon: CheckCircle },
      reserved: { label: 'Reservado', variant: 'outline' as const, icon: Clock },
      auction: { label: 'Leilão', variant: 'destructive' as const, icon: Zap }
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

  const getHealthBadge = (health: Animal['healthStatus']) => {
    const healthConfig = {
      excellent: { label: 'Excelente', variant: 'default' as const, color: 'text-emerald-600' },
      good: { label: 'Bom', variant: 'secondary' as const, color: 'text-emerald-600' },
      fair: { label: 'Regular', variant: 'outline' as const, color: 'text-yellow-600' },
      poor: { label: 'Ruim', variant: 'destructive' as const, color: 'text-red-600' }
    }
    
    const config = healthConfig[health]
    
    return (
      <Badge variant={config.variant} className={config.color}>
        {config.label}
      </Badge>
    )
  }

  const filteredAnimals = animals.filter(animal => {
    const matchesSearch = animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         animal.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         animal.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         animal.seller.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || animal.status === statusFilter
    const matchesCategory = categoryFilter === 'all' || animal.category === categoryFilter
    const matchesBreed = breedFilter === 'all' || animal.breed === breedFilter
    
    return matchesSearch && matchesStatus && matchesCategory && matchesBreed
  })

  const handleAction = (action: string, animal: Animal) => {
    setSelectedAnimal(animal)
    setActionType(action as any)
    setJustification('')
  }

  const confirmAction = () => {
    if (!selectedAnimal || !actionType) return
    
    console.log(`Ação: ${actionType} no animal: ${selectedAnimal.id}`)
    console.log('Justificativa:', justification)
    
    // Implementar lógica de ação
    setSelectedAnimal(null)
    setActionType(null)
    setJustification('')
  }

  const canManageAnimals = isAdmin || (isSeller && canExecuteAction('animal:write'))
  const canOfferAnimals = isBuyer && canExecuteAction('animal:offer')
  const canPurchaseAnimals = isBuyer && canExecuteAction('animal:purchase')

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header e Filtros */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-800" />
                    <span className="text-base sm:text-lg font-semibold">Gerenciamento de Animais</span>
                </CardTitle>
            </div>
            
            {canManageAnimals && (
              <Button className="w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Animal
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
                  placeholder="Buscar animais..."
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
                  <SelectItem value="available">Disponíveis</SelectItem>
                  <SelectItem value="auction">Leilão</SelectItem>
                  <SelectItem value="reserved">Reservados</SelectItem>
                  <SelectItem value="sold">Vendidos</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-[160px]">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="Gado de Corte">Gado de Corte</SelectItem>
                  <SelectItem value="Gado Leiteiro">Gado Leiteiro</SelectItem>
                  <SelectItem value="Cavalos">Cavalos</SelectItem>
                  <SelectItem value="Outros">Outros</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={breedFilter} onValueChange={setBreedFilter}>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="Raça" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="Nelore">Nelore</SelectItem>
                  <SelectItem value="Árabe">Árabe</SelectItem>
                  <SelectItem value="Holandesa">Holandesa</SelectItem>
                  <SelectItem value="Outras">Outras</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Animais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {filteredAnimals.map((animal) => (
          <Card key={animal.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-base sm:text-lg font-semibold text-[#101828] line-clamp-2">
                    {animal.name}
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {animal.description}
                  </p>
                </div>
                {animal.featured && (
                  <Star className="w-5 h-5 text-yellow-500 fill-current flex-shrink-0 ml-2" />
                )}
              </div>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {getStatusBadge(animal.status)}
                {getHealthBadge(animal.healthStatus)}
                {animal.pedigree && (
                  <Badge variant="outline" className="text-xs text-emerald-600">
                    Pedigree
                  </Badge>
                )}
                <Badge variant="outline" className="text-xs">
                  {animal.breed}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="space-y-3">
                {/* Informações Básicas */}
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <span>{animal.age} meses</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BarChart3 className="w-4 h-4 text-gray-600" />
                    <span>{animal.weight}kg</span>
                  </div>
                </div>
                
                {/* Localização */}
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-gray-600" />
                  <span className="text-[#101828]">{animal.location}</span>
                </div>
                
                {/* Vendedor */}
                <div className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-gray-600" />
                  <span className="text-[#101828] font-medium">{animal.seller}</span>
                </div>
                
                {/* Preço */}
                <div className="flex items-center gap-2 text-lg font-bold text-emerald-800">
                  <DollarSign className="w-4 h-4" />
                  R$ {animal.price.toLocaleString('pt-BR')}
                </div>
                
                {/* Estatísticas */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {animal.views} visualizações
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {animal.offers} ofertas
                  </div>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {animal.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {animal.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{animal.tags.length - 3}
                    </Badge>
                  )}
                </div>
                
                {/* Ações */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-1" />
                    Ver Detalhes
                  </Button>
                  
                  {canManageAnimals && (
                    <>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleAction('delete', animal)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                  
                  {canOfferAnimals && animal.status === 'available' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAction('offer', animal)}
                      className="text-emerald-600 hover:text-emerald-700"
                    >
                      <Heart className="w-4 h-4 mr-1" />
                      Ofertar
                    </Button>
                  )}
                  
                  {canPurchaseAnimals && animal.status === 'available' && (
                    <Button 
                      size="sm"
                      onClick={() => handleAction('purchase', animal)}
                      className="bg-[#1E4D2B] hover:bg-[#2B5A3A]"
                    >
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      Comprar
                    </Button>
                  )}
                  
                  {animal.status === 'auction' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAction('bid', animal)}
                      className="text-emerald-600 hover:text-emerald-700"
                    >
                      <Zap className="w-4 h-4 mr-1" />
                      Lances
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
              <div className="text-2xl font-bold text-emerald-800">
                {animals.filter(animal => animal.status === 'available').length}
              </div>
              <div className="text-sm text-gray-600">Disponíveis</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">
                {animals.filter(animal => animal.status === 'auction').length}
              </div>
              <div className="text-sm text-gray-600">Leilões</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">
                {animals.filter(animal => animal.featured).length}
              </div>
              <div className="text-sm text-gray-600">Destaque</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-800">
                {animals.reduce((sum, animal) => sum + animal.offers, 0)}
              </div>
              <div className="text-sm text-gray-600">Ofertas</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dialog de Confirmação */}
      <Dialog open={!!selectedAnimal && !!actionType} onOpenChange={() => {
        setSelectedAnimal(null)
        setActionType(null)
        setJustification('')
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === 'approve' && 'Aprovar Animal'}
              {actionType === 'reject' && 'Rejeitar Animal'}
              {actionType === 'feature' && 'Destacar Animal'}
              {actionType === 'delete' && 'Excluir Animal'}
              {actionType === 'offer' && 'Fazer Oferta'}
              {actionType === 'purchase' && 'Comprar Animal'}
              {actionType === 'bid' && 'Participar do Leilão'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-[#101828]">{selectedAnimal?.name}</h4>
              <p className="text-sm text-gray-600">{selectedAnimal?.breed} - {selectedAnimal?.category}</p>
              <p className="text-lg font-bold text-emerald-800">
                R$ {selectedAnimal?.price.toLocaleString('pt-BR')}
              </p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-[#101828]">
                Justificativa (opcional)
              </label>
              <Textarea
                placeholder="Descreva o motivo da ação..."
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSelectedAnimal(null)
                  setActionType(null)
                  setJustification('')
                }}
              >
                Cancelar
              </Button>
              <Button 
                onClick={confirmAction}
                className={actionType === 'delete' || actionType === 'reject' ? 
                  'bg-red-600 hover:bg-[#A03730]' : 
                  'bg-[#1E4D2B] hover:bg-[#2B5A3A]'
                }
              >
                {actionType === 'approve' && 'Aprovar'}
                {actionType === 'reject' && 'Rejeitar'}
                {actionType === 'feature' && 'Destacar'}
                {actionType === 'delete' && 'Excluir'}
                {actionType === 'offer' && 'Fazer Oferta'}
                {actionType === 'purchase' && 'Comprar'}
                {actionType === 'bid' && 'Participar'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}