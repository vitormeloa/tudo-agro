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
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProductCard from '@/components/ui/cards/ProductCard'

import { mockProducts } from '@/lib/mock-products'
import {
  Search,
  Filter,
  SlidersHorizontal,
  ChevronDown,
  Star,
  MapPin,
  Package,
  Truck,
  Shield,
  Award,
  Grid3x3
} from 'lucide-react'

export default function ProdutosPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState<number[]>([])
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

    if (selectedCategory && product.category !== selectedCategory) {
      return false
    }

    if (selectedBrand && product.brand !== selectedBrand) {
      return false
    }

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
      if (!locationState?.includes(selectedLocation.toLowerCase())) {
        return false
      }
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
    { name: 'Nutrição Animal', color: '#B8E8D1' },
    { name: 'Saúde e Bem-Estar Animal', color: '#E2D4F9' },
    { name: 'Reprodução e Genética', color: '#E6E6FA' },
    { name: 'Selaria e Utilidades', color: '#FFE0B2' },
    { name: 'Equipamentos e Infraestrutura Rural', color: '#E1D5FF' },
    { name: 'Vestuário e Lifestyle Agro', color: '#FCE4EC' },
    { name: 'Sementes e Mudas', color: '#DDEBFF' },
    { name: 'Insumos Agrícolas e Fertilizantes', color: '#FFF8DC' },
    { name: 'Higiene, Limpeza e Desinfecção', color: '#E0F7FA' },
    { name: 'Suplementos e Aditivos', color: '#F6F0C4' },
    { name: 'Bebidas Artesanais e Produtos da Fazenda', color: '#FEE6E3' },
    { name: 'Outros', color: '#F5F5F5' }
  ].map(cat => ({
    ...cat,
    count: getCategoryCount(cat.name)
  })).filter(cat => cat.count > 0)

  const visibleCategories = categories.slice(0, 5)
  const hiddenCategories = categories.slice(5)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {}
        <section className="relative pt-16 pb-20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-teal-700"></div>
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute inset-0 opacity-40">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">
                  Produtos Agropecuários
                </h1>
                <p className="text-base sm:text-lg md:text-xl mb-0 text-white/90 max-w-3xl mx-auto leading-relaxed">
                  Encontre rações, sementes, fertilizantes e tudo que sua fazenda precisa
                </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {}
        <Card className="shadow-lg border-0 mb-8">
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
                    className="pl-10 h-12 text-lg border-2 border-gray-200 focus:border-primary focus:ring-primary/20"
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

            {}
            {showFilters && (
              <div className="border-t border-gray-200 pt-6 animate-fade-in-up">
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
                      <SelectValue placeholder="Preço" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="0-50">Até R$ 50</SelectItem>
                      <SelectItem value="50-100">R$ 50 - R$ 100</SelectItem>
                      <SelectItem value="100-200">R$ 100 - R$ 200</SelectItem>
                      <SelectItem value="200+">Acima de R$ 200</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={selectedLocation} onValueChange={(value) => { setSelectedLocation(value === 'all' ? '' : value); setCurrentPage(1); }}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Localização" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="sp">São Paulo</SelectItem>
                      <SelectItem value="mg">Minas Gerais</SelectItem>
                      <SelectItem value="go">Goiás</SelectItem>
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

        {}
        <div className="mb-8">
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
            {visibleCategories.map((category, index) => (
              <Card
                key={category.name}
                onClick={() => handleCategoryClick(category.name)}
                className={`hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer animate-fade-in-up ${
                  selectedCategory === category.name ? 'ring-2 ring-emerald-500 shadow-lg' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-3 text-center">
                  <div
                    className="inline-flex px-3 py-1.5 rounded-full text-xs font-medium mb-2 max-w-full break-words leading-tight"
                    style={{
                      backgroundColor: category.color,
                      color: '#1F2937',
                    }}
                  >
                    <span className="text-center">{category.name}</span>
                  </div>
                  <div className="text-xl font-bold text-[#101828]">{category.count}</div>
                  <div className="text-xs text-gray-500">produtos</div>
                </CardContent>
              </Card>
            ))}
            
            {}
            {hiddenCategories.length > 0 && (
              <Card 
                className="hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer animate-fade-in-up border-2 border-dashed border-gray-300 hover:border-primary"
                style={{ animationDelay: `${visibleCategories.length * 0.1}s` }}
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

        {}
        <Dialog open={showCategoriesModal} onOpenChange={setShowCategoriesModal}>
          <DialogContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] sm:w-[calc(100%-4rem)] max-w-[90vw] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl h-[calc(100vh-4rem)] sm:h-auto max-h-[85vh] overflow-hidden flex flex-col p-0 gap-0 rounded-xl sm:rounded-2xl shadow-2xl border-0 bg-white">
            {}
            <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 border-b border-gray-200 flex-shrink-0 bg-gradient-to-r from-primary/5 to-primary/5 relative rounded-t-xl sm:rounded-t-2xl">
              <div className="pr-8 sm:pr-10">
                <DialogTitle className="text-lg sm:text-xl md:text-2xl font-bold text-[#101828]">
                  Todas as Categorias
                </DialogTitle>
                <DialogDescription className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">
                  Explore todas as {hiddenCategories.length} categorias disponíveis
                </DialogDescription>
              </div>
            </DialogHeader>

            {}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6 bg-gray-50 overscroll-contain" style={{ WebkitOverflowScrolling: 'touch' }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {hiddenCategories.map((category, index) => (
                  <Card
                    key={category.name}
                    onClick={() => handleCategoryClick(category.name)}
                    className={`hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer border bg-white touch-manipulation ${
                      selectedCategory === category.name ? 'border-primary ring-2 ring-primary/30' : 'border-gray-200 hover:border-primary/30'
                    }`}
                    style={{
                      animation: 'fadeInUp 0.3s ease-out',
                      animationDelay: `${index * 0.05}s`,
                      animationFillMode: 'both'
                    }}
                  >
                    <CardContent className="p-3 sm:p-4 text-center flex flex-col items-center justify-center min-h-[100px] sm:min-h-[110px]">
                      <div
                        className="inline-flex px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-2 sm:mb-3 max-w-full break-words leading-tight shadow-sm"
                        style={{
                          backgroundColor: category.color,
                          color: '#1F2937'
                        }}
                      >
                        <span className="text-center">{category.name}</span>
                      </div>
                      <div className="text-xl sm:text-2xl font-bold text-[#101828]">{category.count}</div>
                      <div className="text-xs sm:text-sm text-gray-500 mt-0.5">produtos</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {}
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 bg-white flex-shrink-0 rounded-b-xl sm:rounded-b-2xl">
              <Button
                onClick={() => setShowCategoriesModal(false)}
                className="w-full bg-primary hover:bg-[#2E7A5A] text-white h-11 sm:h-12 text-base sm:text-lg font-semibold transition-all duration-200 touch-manipulation active:scale-[0.98]"
              >
                Fechar
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {}
        <div className="mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center p-4 bg-white rounded-lg shadow-sm border">
              <Truck className="w-8 h-8 text-primary mr-4" />
              <div>
                <h4 className="font-semibold text-[#101828]">Frete Grátis</h4>
                <p className="text-sm text-gray-600">Acima de R$ 500</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-white rounded-lg shadow-sm border">
              <Shield className="w-8 h-8 text-primary mr-4" />
              <div>
                <h4 className="font-semibold text-[#101828]">Garantia e Segurança</h4>
                <p className="text-sm text-gray-600">Produtos originais com segurança garantida</p>
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
        </div>

        {}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="text-gray-600">
            Mostrando <span className="font-semibold text-[#101828]">{startIndex + 1}</span> até <span className="font-semibold text-[#101828]">{Math.min(endIndex, sortedProducts.length)}</span> de <span className="font-semibold text-[#101828]">{sortedProducts.length}</span> resultados
            {selectedCategory && (
              <span className="ml-2 text-primary font-semibold">
                em {selectedCategory}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <Select value={sortBy} onValueChange={(value) => { setSortBy(value); setCurrentPage(1); }}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevancia">Mais Relevantes</SelectItem>
                <SelectItem value="preco-menor">Menor Preço</SelectItem>
                <SelectItem value="preco-maior">Maior Preço</SelectItem>
                <SelectItem value="avaliacao">Melhor Avaliação</SelectItem>
                <SelectItem value="recente">Mais Recentes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {}
        {hasActiveFilters && (
          <div className="mb-6 flex flex-wrap gap-2">
            <span className="text-sm text-gray-600 font-medium">Filtros ativos:</span>
            {searchQuery && (
              <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-emerald-200">
                Busca: "{searchQuery}"
              </Badge>
            )}
            {selectedCategory && (
              <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-emerald-200">
                Categoria: {selectedCategory}
              </Badge>
            )}
            {selectedBrand && (
              <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-emerald-200">
                Marca: {selectedBrand}
              </Badge>
            )}
            {selectedPriceRange && (
              <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-emerald-200">
                Preço: {selectedPriceRange === '0-50' ? 'Até R$ 50' : selectedPriceRange === '50-100' ? 'R$ 50-100' : selectedPriceRange === '100-200' ? 'R$ 100-200' : 'Acima de R$ 200'}
              </Badge>
            )}
            {selectedLocation && (
              <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-emerald-200">
                Local: {selectedLocation.toUpperCase()}
              </Badge>
            )}
            {selectedStock && (
              <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-emerald-200">
                {selectedStock === 'estoque' ? 'Em Estoque' : selectedStock === 'encomenda' ? 'Sob Encomenda' : 'Esgotado'}
              </Badge>
            )}
          </div>
        )}

        {}
        {products.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <ProductCard
                  product={product}
                  variant="default"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#101828] mb-2">Nenhum produto encontrado</h3>
            <p className="text-gray-600 mb-6">
              Não encontramos produtos que correspondam aos seus filtros.
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

        {}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                className="border-primary text-primary hover:bg-primary hover:text-white disabled:border-gray-300 disabled:text-gray-400 disabled:hover:bg-transparent disabled:hover:text-gray-400"
              >
                Anterior
              </Button>

              {}
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
                className="border-primary text-primary hover:bg-primary hover:text-white disabled:border-gray-300 disabled:text-gray-400 disabled:hover:bg-transparent disabled:hover:text-gray-400"
              >
                Próximo
              </Button>
            </div>
          </div>
        )}
      </div>

      {}
      
      <Footer />
    </div>
  )
}