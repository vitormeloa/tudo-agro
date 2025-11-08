'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { 
  Search, Package, CheckCircle, XCircle, Clock, FileText,
  User, Mail, Phone, MapPin, Calendar, TrendingUp, AlertTriangle,
  Plus, Eye, Edit, Trash2, ShoppingCart, DollarSign, Star, 
  Tag, BarChart3, Zap, Shield, Award, Truck
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

interface Product {
  id: string
  name: string
  category: string
  subcategory: string
  brand: string
  price: number
  originalPrice?: number
  status: 'available' | 'out_of_stock' | 'discontinued' | 'promotion'
  seller: string
  sellerId: string
  location: string
  createdAt: string
  updatedAt: string
  views: number
  sales: number
  rating: number
  reviews: number
  featured: boolean
  stock: number
  minStock: number
  images: string[]
  tags: string[]
  description: string
  specifications: Record<string, string>
  warranty: string
  shipping: boolean
  freeShipping: boolean
}

export default function ProductsSection() {
  const { isAdmin, isSeller, isBuyer, canExecuteAction } = useAdminPermissions()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [brandFilter, setBrandFilter] = useState('all')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [actionType, setActionType] = useState<'approve' | 'reject' | 'feature' | null>(null)
  const [justification, setJustification] = useState('')

  // Dados mockados - em produção viria da API
  const products: Product[] = [
    {
      id: '1',
      name: 'Ração Premium para Gado Nelore 50kg',
      category: 'Rações',
      subcategory: 'Gado de Corte',
      brand: 'AgroMax',
      price: 89.90,
      originalPrice: 99.90,
      status: 'promotion',
      seller: 'AgroStore Premium',
      sellerId: 'seller-1',
      location: 'São Paulo, SP',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20',
      views: 1247,
      sales: 45,
      rating: 4.8,
      reviews: 23,
      featured: true,
      stock: 150,
      minStock: 20,
      images: ['/images/racao1.jpg', '/images/racao2.jpg'],
      tags: ['ração', 'gado', 'nelore', 'premium'],
      description: 'Ração premium especialmente formulada para gado nelore em engorda.',
      specifications: {
        'Proteína': '18%',
        'Energia': '3200 kcal/kg',
        'Peso': '50kg',
        'Validade': '12 meses'
      },
      warranty: '6 meses',
      shipping: true,
      freeShipping: true
    },
    {
      id: '2',
      name: 'Suplemento Mineral para Cavalos',
      category: 'Suplementos',
      subcategory: 'Cavalos',
      brand: 'EquiVet',
      price: 45.50,
      status: 'available',
      seller: 'VetStore',
      sellerId: 'seller-2',
      location: 'Minas Gerais, MG',
      createdAt: '2024-01-18',
      updatedAt: '2024-01-18',
      views: 89,
      sales: 12,
      rating: 4.5,
      reviews: 8,
      featured: false,
      stock: 75,
      minStock: 10,
      images: ['/images/suplemento1.jpg'],
      tags: ['suplemento', 'cavalos', 'mineral', 'saúde'],
      description: 'Suplemento mineral completo para cavalos de todas as idades.',
      specifications: {
        'Cálcio': '15%',
        'Fósforo': '8%',
        'Peso': '5kg',
        'Validade': '18 meses'
      },
      warranty: '3 meses',
      shipping: true,
      freeShipping: false
    },
    {
      id: '3',
      name: 'Fertilizante NPK 20-10-10 25kg',
      category: 'Fertilizantes',
      subcategory: 'Químicos',
      brand: 'AgroFert',
      price: 125.00,
      status: 'out_of_stock',
      seller: 'Fertilizantes Brasil',
      sellerId: 'seller-3',
      location: 'Rio Grande do Sul, RS',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-12',
      views: 234,
      sales: 8,
      rating: 4.2,
      reviews: 5,
      featured: false,
      stock: 0,
      minStock: 5,
      images: ['/images/fertilizante1.jpg'],
      tags: ['fertilizante', 'npk', 'químico', 'plantio'],
      description: 'Fertilizante NPK balanceado para diversas culturas.',
      specifications: {
        'Nitrogênio': '20%',
        'Fósforo': '10%',
        'Potássio': '10%',
        'Peso': '25kg'
      },
      warranty: '24 meses',
      shipping: true,
      freeShipping: false
    }
  ]

  const getStatusBadge = (status: Product['status']) => {
    const statusConfig = {
      available: { label: 'Disponível', variant: 'default' as const, icon: CheckCircle },
      out_of_stock: { label: 'Sem Estoque', variant: 'destructive' as const, icon: AlertTriangle },
      discontinued: { label: 'Descontinuado', variant: 'secondary' as const, icon: XCircle },
      promotion: { label: 'Promoção', variant: 'destructive' as const, icon: Zap }
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

  const getStockBadge = (stock: number, minStock: number) => {
    if (stock === 0) {
      return <Badge variant="destructive" className="text-xs">Sem Estoque</Badge>
    } else if (stock <= minStock) {
      return <Badge variant="outline" className="text-xs text-yellow-600">Estoque Baixo</Badge>
    } else {
      return <Badge variant="outline" className="text-xs text-primary">Em Estoque</Badge>
    }
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.seller.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter
    const matchesBrand = brandFilter === 'all' || product.brand === brandFilter
    
    return matchesSearch && matchesStatus && matchesCategory && matchesBrand
  })

  const handleAction = (action: string, product: Product) => {
    setSelectedProduct(product)
    setActionType(action as any)
    setJustification('')
  }

  const confirmAction = () => {
    if (!selectedProduct || !actionType) return
    
    console.log(`Ação: ${actionType} no produto: ${selectedProduct.id}`)
    console.log('Justificativa:', justification)
    
    // Implementar lógica de ação
    setSelectedProduct(null)
    setActionType(null)
    setJustification('')
  }

  const canManageProducts = isAdmin || (isSeller && canExecuteAction('product:write'))
  const canPurchaseProducts = isBuyer && canExecuteAction('product:read')

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header e Filtros */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                    <Package className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    <span className="text-base sm:text-lg font-semibold">Gerenciamento de Produtos</span>
                </CardTitle>
            </div>
            
            {canManageProducts && (
              <Button className="w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                Novo Produto
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
                  placeholder="Buscar produtos..."
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
                  <SelectItem value="promotion">Promoção</SelectItem>
                  <SelectItem value="out_of_stock">Sem Estoque</SelectItem>
                  <SelectItem value="discontinued">Descontinuados</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-[160px]">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="Rações">Rações</SelectItem>
                  <SelectItem value="Suplementos">Suplementos</SelectItem>
                  <SelectItem value="Fertilizantes">Fertilizantes</SelectItem>
                  <SelectItem value="Outros">Outros</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={brandFilter} onValueChange={setBrandFilter}>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="Marca" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="AgroMax">AgroMax</SelectItem>
                  <SelectItem value="EquiVet">EquiVet</SelectItem>
                  <SelectItem value="AgroFert">AgroFert</SelectItem>
                  <SelectItem value="Outras">Outras</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Produtos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-base sm:text-lg font-semibold text-[#101828] line-clamp-2">
                    {product.name}
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {product.description}
                  </p>
                </div>
                {product.featured && (
                  <Star className="w-5 h-5 text-yellow-500 fill-current flex-shrink-0 ml-2" />
                )}
              </div>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {getStatusBadge(product.status)}
                {getStockBadge(product.stock, product.minStock)}
                <Badge variant="outline" className="text-xs">
                  {product.brand}
                </Badge>
                {product.freeShipping && (
                  <Badge variant="outline" className="text-xs text-primary">
                    Frete Grátis
                  </Badge>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="space-y-3">
                {/* Preço */}
                <div className="flex items-center gap-2">
                  <div className="text-lg font-bold text-primary">
                    R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  {product.originalPrice && (
                    <div className="text-sm text-gray-600 line-through">
                      R$ {product.originalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                  )}
                  {product.originalPrice && (
                    <Badge variant="destructive" className="text-xs">
                      -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </Badge>
                  )}
                </div>
                
                {/* Avaliação */}
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{product.rating}</span>
                    <span className="text-gray-600">({product.reviews})</span>
                  </div>
                </div>
                
                {/* Vendedor e Localização */}
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-600" />
                    <span className="text-[#101828] font-medium">{product.seller}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-600" />
                    <span className="text-[#101828]">{product.location}</span>
                  </div>
                </div>
                
                {/* Estatísticas */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {product.views} visualizações
                  </div>
                  <div className="flex items-center gap-1">
                    <ShoppingCart className="w-4 h-4" />
                    {product.sales} vendas
                  </div>
                </div>
                
                {/* Especificações */}
                <div className="space-y-1">
                  <div className="text-xs font-medium text-[#101828]">Especificações:</div>
                  <div className="grid grid-cols-2 gap-1 text-xs text-gray-600">
                    {Object.entries(product.specifications).slice(0, 4).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span>{key}:</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {product.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {product.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{product.tags.length - 3}
                    </Badge>
                  )}
                </div>
                
                {/* Ações */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-1" />
                    Ver Detalhes
                  </Button>
                  
                  {canManageProducts && (
                    <>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleAction('delete', product)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                  
                  {canPurchaseProducts && product.status === 'available' && product.stock > 0 && (
                    <Button 
                      size="sm"
                      onClick={() => handleAction('purchase', product)}
                      className="bg-primary hover:bg-[#2B5A3A]"
                    >
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      Comprar
                    </Button>
                  )}
                  
                  {product.shipping && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAction('shipping', product)}
                      className="text-primary hover:text-primary"
                    >
                      <Truck className="w-4 h-4 mr-1" />
                      Frete
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
                {products.filter(product => product.status === 'available').length}
              </div>
              <div className="text-sm text-gray-600">Disponíveis</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {products.filter(product => product.status === 'promotion').length}
              </div>
              <div className="text-sm text-gray-600">Promoções</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {products.filter(product => product.featured).length}
              </div>
              <div className="text-sm text-gray-600">Destaque</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {products.reduce((sum, product) => sum + product.sales, 0)}
              </div>
              <div className="text-sm text-gray-600">Vendas</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dialog de Confirmação */}
      <Dialog open={!!selectedProduct && !!actionType} onOpenChange={() => {
        setSelectedProduct(null)
        setActionType(null)
        setJustification('')
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === 'approve' && 'Aprovar Produto'}
              {actionType === 'reject' && 'Rejeitar Produto'}
              {actionType === 'feature' && 'Destacar Produto'}
              {actionType === 'delete' && 'Excluir Produto'}
              {actionType === 'purchase' && 'Comprar Produto'}
              {actionType === 'shipping' && 'Calcular Frete'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-[#101828]">{selectedProduct?.name}</h4>
              <p className="text-sm text-gray-600">{selectedProduct?.brand} - {selectedProduct?.category}</p>
              <p className="text-lg font-bold text-primary">
                R$ {selectedProduct?.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
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
                  setSelectedProduct(null)
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
                  'bg-primary hover:bg-[#2B5A3A]'
                }
              >
                {actionType === 'approve' && 'Aprovar'}
                {actionType === 'reject' && 'Rejeitar'}
                {actionType === 'feature' && 'Destacar'}
                {actionType === 'delete' && 'Excluir'}
                {actionType === 'purchase' && 'Comprar'}
                {actionType === 'shipping' && 'Calcular'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}