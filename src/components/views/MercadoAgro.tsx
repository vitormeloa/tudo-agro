'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import ProductCard from '@/components/ui/cards/ProductCard'
import { mockProducts } from '@/lib/mock-products'
import {
    Search,
    Filter,
    SlidersHorizontal,
    Package,
    Truck,
    Shield,
    Award,
    Grid3x3, HelpCircle
} from 'lucide-react'

export default function MercadoAgro() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [showCategoriesModal, setShowCategoriesModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedBrand, setSelectedBrand] = useState<string>('')
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('')
  const [selectedLocation, setSelectedLocation] = useState<string>('')
  const [selectedStock, setSelectedStock] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('relevancia')
  const itemsPerPage = 9

  const allProducts = mockProducts.map(p => ({
    id: p.id,
    title: p.title,
    category: p.category,
    price: p.price,
    location: p.location,
    rating: p.rating,
    reviews: p.reviews,
    image: p.image,
    seller: p.seller,
    verified: p.verified,
    featured: p.featured,
    weight: p.weight,
    brand: p.brand,
    stock: p.stock,
    type: 'product' as const
  }))

  const getCategoryCount = (categoryName: string) => {
    return allProducts.filter(p => p.category === categoryName).length
  }

  const filteredProducts = allProducts.filter(product => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesSearch = (
        product.title.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.seller.toLowerCase().includes(query)
      )
      if (!matchesSearch) return false
    }

    if (selectedCategory && product.category !== selectedCategory) return false
    if (selectedBrand && product.brand !== selectedBrand) return false

    if (selectedPriceRange) {
      const price = product.price
      switch (selectedPriceRange) {
        case '0-50':
          if (price > 50) return false
          break
        case '50-100':
          if (price < 50 || price > 100) return false
          break
        case '100-200':
          if (price < 100 || price > 200) return false
          break
        case '200+':
          if (price < 200) return false
          break
      }
    }

    if (selectedLocation) {
      const locationState = product.location.split(',')[1]?.trim().toLowerCase()
      if (!locationState?.includes(selectedLocation.toLowerCase())) return false
    }

    if (selectedStock) {
      switch (selectedStock) {
        case 'estoque':
          if (product.stock <= 0) return false
          break
        case 'encomenda':
          if (product.stock > 5) return false
          break
        case 'esgotado':
          if (product.stock > 0) return false
          break
      }
    }

    return true
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'preco-menor':
        return Number(a.price) - Number(b.price)
      case 'preco-maior':
        return Number(b.price) - Number(a.price)
      case 'avaliacao':
        return Number(b.rating) - Number(a.rating)
      case 'recente':
        return Number(b.id) - Number(a.id)
      default:
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || Number(b.rating) - Number(a.rating)
    }
  })

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const products = sortedProducts.slice(startIndex, endIndex)

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    setCurrentPage(1)
  }

  const handleCategoryClick = (categoryName: string) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory('')
    } else {
      setSelectedCategory(categoryName)
    }
    setCurrentPage(1)
    setShowCategoriesModal(false)
  }

  const clearAllFilters = () => {
    setSearchQuery('')
    setSelectedCategory('')
    setSelectedBrand('')
    setSelectedPriceRange('')
    setSelectedLocation('')
    setSelectedStock('')
    setSortBy('relevancia')
    setCurrentPage(1)
  }

  const hasActiveFilters = !!(searchQuery || selectedCategory || selectedBrand || selectedPriceRange || selectedLocation || selectedStock)

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages)
    }
  }, [totalPages, currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const categories = [
    { name: 'Nutrição Animal', icon: '🍎', color: '#B8E8D1' },
    { name: 'Saúde e Bem-Estar Animal', icon: '💊', color: '#E2D4F9' },
    { name: 'Reprodução e Genética', icon: '🧬', color: '#E6E6FA' },
    { name: 'Selaria e Utilidades', icon: '🐎', color: '#FFE0B2' },
    { name: 'Equipamentos e Infraestrutura Rural', icon: '🚜', color: '#E1D5FF' },
    { name: 'Vestuário e Lifestyle Agro', icon: '👕', color: '#FCE4EC' },
    { name: 'Sementes e Mudas', icon: '🌱', color: '#DDEBFF' },
    { name: 'Insumos Agrícolas e Fertilizantes', icon: '🌾', color: '#FFF8DC' },
    { name: 'Higiene, Limpeza e Desinfecção', icon: '🧼', color: '#E0F7FA' },
    { name: 'Suplementos e Aditivos', icon: '🧪', color: '#F6F0C4' },
    { name: 'Bebidas Artesanais e Produtos da Fazenda', icon: '🍷', color: '#FEE6E3' },
    { name: 'Outros', icon: '❓', color: '#F5F5F5' }
  ].map(cat => ({
    ...cat,
    count: getCategoryCount(cat.name)
  })).filter(cat => cat.count > 0)

  const visibleCategories = categories.slice(0, 5)
  const hiddenCategories = categories.slice(5)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Mercado Agro</h1>
        <p className="text-muted-foreground mt-1">Encontre rações, sementes, fertilizantes e tudo que sua fazenda precisa</p>
      </div>

      <Card className="shadow-sm border">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Buscar por produto, marca, categoria..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>
            <Button
              className="bg-primary hover:bg-[#2E7A5A] text-white px-8 h-12"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              Filtros
            </Button>
          </div>

          {showFilters && (
            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <Select value={selectedCategory} onValueChange={(value) => { setSelectedCategory(value === 'all' ? '' : value); setCurrentPage(1); }}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    {categories.map(cat => (
                      <SelectItem key={cat.name} value={cat.name}>{cat.name} ({cat.count})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedBrand} onValueChange={(value) => { setSelectedBrand(value === 'all' ? '' : value); setCurrentPage(1); }}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Marca" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    {Array.from(new Set(allProducts.map(p => p.brand))).sort().map(brand => (
                      <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedPriceRange} onValueChange={(value) => { setSelectedPriceRange(value === 'all' ? '' : value); setCurrentPage(1); }}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Preco" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="0-50">Ate R$ 50</SelectItem>
                    <SelectItem value="50-100">R$ 50 - R$ 100</SelectItem>
                    <SelectItem value="100-200">R$ 100 - R$ 200</SelectItem>
                    <SelectItem value="200+">Acima de R$ 200</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedLocation} onValueChange={(value) => { setSelectedLocation(value === 'all' ? '' : value); setCurrentPage(1); }}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Localizacao" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="sp">Sao Paulo</SelectItem>
                    <SelectItem value="mg">Minas Gerais</SelectItem>
                    <SelectItem value="go">Goias</SelectItem>
                    <SelectItem value="mt">Mato Grosso</SelectItem>
                    <SelectItem value="rs">Rio Grande do Sul</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedStock} onValueChange={(value) => { setSelectedStock(value === 'all' ? '' : value); setCurrentPage(1); }}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Disponibilidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="estoque">Em Estoque</SelectItem>
                    <SelectItem value="encomenda">Sob Encomenda</SelectItem>
                    <SelectItem value="esgotado">Esgotado</SelectItem>
                  </SelectContent>
                </Select>

                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    className="h-10 border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                    onClick={clearAllFilters}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Limpar Filtros
                  </Button>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-[#101828]">Categorias Populares</h3>
          {selectedCategory && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedCategory('')}
              className="text-primary hover:text-primary hover:bg-primary/5"
            >
              Ver todas
            </Button>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {visibleCategories.map((category) => (
            <Card
              key={category.name}
              onClick={() => handleCategoryClick(category.name)}
              className={`hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                selectedCategory === category.name ? 'ring-2 ring-emerald-500 shadow-lg' : ''
              }`}
            >
              <CardContent className="p-3 text-center">
                <div
                  className="inline-flex px-3 py-1.5 rounded-full text-xs font-medium mb-2 max-w-full break-words leading-tight"
                  style={{
                    backgroundColor: category.color,
                    color: '#1F2937',
                  }}
                >
                  <span className="text-center">{category.icon} {category.name}</span>
                </div>
                <div className="text-xl font-bold text-[#101828]">{category.count}</div>
                <div className="text-xs text-gray-500">produtos</div>
              </CardContent>
            </Card>
          ))}

          {hiddenCategories.length > 0 && (
            <Card
              className="hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer border-2 border-dashed border-gray-300 hover:border-primary"
              onClick={() => setShowCategoriesModal(true)}
            >
              <CardContent className="p-3 text-center flex flex-col items-center justify-center min-h-[100px]">
                <Grid3x3 className="w-6 h-6 text-gray-400 mb-2" />
                <div className="text-sm font-semibold text-gray-700 mb-1">Ver Mais</div>
                <div className="text-xs text-gray-500">{hiddenCategories.length} categorias</div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Dialog open={showCategoriesModal} onOpenChange={setShowCategoriesModal}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Todas as Categorias</DialogTitle>
            <DialogDescription>
              Explore todas as {categories.length} categorias disponiveis
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {hiddenCategories.map((category) => (
                <Card
                  key={category.name}
                  onClick={() => {
                    setSelectedCategory(category.name);
                    setShowCategoriesModal(false);
                  }}
                  className={`hover:shadow-lg transition-all duration-200 cursor-pointer ${
                    selectedCategory === category.name ? 'border-primary ring-2 ring-primary/30' : ''
                  }`}
                >
                  <CardContent className="p-4 text-center">
                    <div
                      className="inline-flex px-4 py-2 rounded-full text-sm font-medium mb-3"
                      style={{
                        backgroundColor: category.color,
                        color: '#1F2937'
                      }}
                    >
                      {category.icon} {category.name}
                    </div>
                    <div className="text-2xl font-bold text-[#101828]">{category.count}</div>
                    <div className="text-sm text-gray-500">produtos</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="flex items-center p-4 bg-white rounded-lg shadow-sm border">
          <Truck className="w-8 h-8 text-primary mr-4" />
          <div>
            <h4 className="font-semibold text-[#101828]">Frete Gratis</h4>
            <p className="text-sm text-gray-600">Acima de R$ 500</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-white rounded-lg shadow-sm border">
          <Shield className="w-8 h-8 text-primary mr-4" />
          <div>
            <h4 className="font-semibold text-[#101828]">Garantia e Seguranca</h4>
            <p className="text-sm text-gray-600">Produtos originais</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-white rounded-lg shadow-sm border">
          <Award className="w-8 h-8 text-primary mr-4" />
          <div>
            <h4 className="font-semibold text-[#101828]">Qualidade</h4>
            <p className="text-sm text-gray-600">Marcas reconhecidas</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="text-gray-600">
          Mostrando <span className="font-semibold text-[#101828]">{startIndex + 1}</span> ate <span className="font-semibold text-[#101828]">{Math.min(endIndex, sortedProducts.length)}</span> de <span className="font-semibold text-[#101828]">{sortedProducts.length}</span> resultados
        </div>
        <Select value={sortBy} onValueChange={(value) => { setSortBy(value); setCurrentPage(1); }}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevancia">Mais Relevantes</SelectItem>
            <SelectItem value="preco-menor">Menor Preco</SelectItem>
            <SelectItem value="preco-maior">Maior Preco</SelectItem>
            <SelectItem value="avaliacao">Melhor Avaliacao</SelectItem>
            <SelectItem value="recente">Mais Recentes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-600 font-medium">Filtros ativos:</span>
          {searchQuery && (
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Busca: "{searchQuery}"
            </Badge>
          )}
          {selectedCategory && (
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Categoria: {selectedCategory}
            </Badge>
          )}
        </div>
      )}

      {products.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              variant="default"
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[#101828] mb-2">Nenhum produto encontrado</h3>
          <p className="text-gray-600 mb-6">
            Nao encontramos produtos que correspondam aos seus filtros.
          </p>
          {hasActiveFilters && (
            <Button
              onClick={clearAllFilters}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              Limpar todos os filtros
            </Button>
          )}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              className="border-primary text-primary hover:bg-primary hover:text-white disabled:border-gray-300 disabled:text-gray-400"
            >
              Anterior
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <Button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={
                      currentPage === page
                        ? "bg-primary text-white hover:bg-[#2E7A5A]"
                        : "border-primary text-primary hover:bg-primary hover:text-white"
                    }
                    variant={currentPage === page ? "default" : "outline"}
                  >
                    {page}
                  </Button>
                )
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return <span key={page} className="px-2 text-gray-500">...</span>
              }
              return null
            })}

            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              className="border-primary text-primary hover:bg-primary hover:text-white disabled:border-gray-300 disabled:text-gray-400"
            >
              Proximo
            </Button>
          </div>
        </div>
      )}

        <div className="border-t pt-6 mt-8">
            <Card className="bg-muted/50">
                <div className="p-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <HelpCircle className="h-10 w-10 text-primary" />
                            <div>
                                <p className="font-medium">Dúvidas sobre os produtos?</p>
                                <p className="text-sm text-muted-foreground">Nossa equipe está pronta para ajudar</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline">
                                Fale com Suporte
                            </Button>
                            <Button variant="outline">
                                Consultar AgroIA
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    </div>
  )
}
