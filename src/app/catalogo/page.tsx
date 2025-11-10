'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProductCard from '@/components/ui/cards/ProductCard'

import { mockAnimals } from '@/lib/mock-animals'
import {
  Search,
  Filter,
  SlidersHorizontal,
  ChevronDown,
  Star,
  MapPin,
  Package
} from 'lucide-react'

export default function CatalogoPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedBreed, setSelectedBreed] = useState<string>('')
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('')
  const [selectedLocation, setSelectedLocation] = useState<string>('')
  const [selectedAge, setSelectedAge] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('relevancia')
  const itemsPerPage = 9

  const allProducts = mockAnimals.map(a => ({
    id: a.id,
    title: a.title,
    category: a.category,
    price: a.price,
    location: a.location,
    rating: 4.8,
    reviews: 0,
    image: a.images[0],
    seller: a.seller.name,
    verified: a.seller.verified,
    featured: a.featured,
    age: a.age,
    weight: a.weight,
    breed: a.breed,
    father: a.father || 'N/A',
    mother: a.mother || 'N/A',
    type: 'animal' as const
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
        product.breed?.toLowerCase().includes(query) ||
        product.location.toLowerCase().includes(query) ||
        product.seller.toLowerCase().includes(query)
      )
      if (!matchesSearch) return false
    }

    if (selectedCategory && product.category !== selectedCategory) {
      return false
    }

    if (selectedBreed && product.breed !== selectedBreed) {
      return false
    }

    if (selectedPriceRange) {
      const price = product.price
      switch (selectedPriceRange) {
        case '0-5000':
          if (price > 5000) return false
          break
        case '5000-15000':
          if (price < 5000 || price > 15000) return false
          break
        case '15000-30000':
          if (price < 15000 || price > 30000) return false
          break
        case '30000+':
          if (price < 30000) return false
          break
      }
    }

    if (selectedLocation) {
      const locationState = product.location.split(',')[1]?.trim().toLowerCase()
      if (!locationState?.includes(selectedLocation.toLowerCase())) {
        return false
      }
    }

    if (selectedAge) {
        const age = parseInt(product.age || '0');
        switch (selectedAge) {
            case '0-2':
                if (age > 2) return false;
                break;
            case '2-4':
                if (age < 2 || age > 4) return false;
                break;
            case '4-6':
                if (age < 4 || age > 6) return false;
                break;
            case '6+':
                if (age < 6) return false;
                break;
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
  }

  const clearAllFilters = () => {
    setSearchQuery('')
    setSelectedCategory('')
    setSelectedBreed('')
    setSelectedPriceRange('')
    setSelectedLocation('')
    setSelectedAge('')
    setSortBy('relevancia')
    setCurrentPage(1)
  }

  const hasActiveFilters = !!(searchQuery || selectedCategory || selectedBreed || selectedPriceRange || selectedLocation || selectedAge)

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
    { name: 'Gado de Corte', color: 'bg-primary/10 text-primary' },
    { name: 'Gado de Leite', color: 'bg-primary/10 text-primary' },
    { name: 'Cavalos', color: 'bg-amber-100 text-amber-800' },
    { name: 'Sêmen', color: 'bg-primary/10 text-primary' }
  ].map(cat => ({
    ...cat,
    count: getCategoryCount(cat.name)
  })).filter(cat => cat.count > 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {}
        <section className="relative pt-16 pb-20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-lime-600 via-primary to-primary/90"></div>
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute inset-0 opacity-40">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">
              Catálogo de Animais
            </h1>
                <p className="text-base sm:text-lg md:text-xl mb-0 text-white/90 max-w-3xl mx-auto leading-relaxed">
              Encontre os melhores animais para sua fazenda
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
                    placeholder="Buscar por raça, tipo, localização..."
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

                  <Select value={selectedBreed} onValueChange={(value) => { setSelectedBreed(value === 'all' ? '' : value); setCurrentPage(1); }}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Raça" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      {Array.from(new Set(allProducts.map(p => p.breed))).sort().map(breed => (
                        <SelectItem key={breed} value={breed}>{breed}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedPriceRange} onValueChange={(value) => { setSelectedPriceRange(value === 'all' ? '' : value); setCurrentPage(1); }}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Preço" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="0-5000">Até R$ 5.000</SelectItem>
                      <SelectItem value="5000-15000">R$ 5.000 - R$ 15.000</SelectItem>
                      <SelectItem value="15000-30000">R$ 15.000 - R$ 30.000</SelectItem>
                      <SelectItem value="30000+">Acima de R$ 30.000</SelectItem>
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

                  <Select value={selectedAge} onValueChange={(value) => { setSelectedAge(value === 'all' ? '' : value); setCurrentPage(1); }}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Idade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="0-2">0-2 anos</SelectItem>
                      <SelectItem value="2-4">2-4 anos</SelectItem>
                      <SelectItem value="4-6">4-6 anos</SelectItem>
                      <SelectItem value="6+">6+ anos</SelectItem>
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <Card 
                key={category.name} 
                onClick={() => handleCategoryClick(category.name)}
                className={`hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer animate-fade-in-up ${
                  selectedCategory === category.name ? 'ring-2 ring-emerald-500 shadow-lg' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-4 text-center">
                  <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium mb-2 ${category.color}`}>
                    {category.name}
                  </div>
                  <div className="text-2xl font-bold text-[#101828]">{category.count}</div>
                  <div className="text-sm text-gray-500">animais</div>
                </CardContent>
              </Card>
            ))}
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
            {selectedBreed && (
              <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-emerald-200">
                Raça: {selectedBreed}
              </Badge>
            )}
            {selectedPriceRange && (
              <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-emerald-200">
                Preço: {selectedPriceRange === '0-5000' ? 'Até R$ 5.000' : selectedPriceRange === '5000-15000' ? 'R$ 5.000-15.000' : selectedPriceRange === '15000-30000' ? 'R$ 15.000-30.000' : 'Acima de R$ 30.000'}
              </Badge>
            )}
            {selectedLocation && (
              <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-emerald-200">
                Local: {selectedLocation.toUpperCase()}
              </Badge>
            )}
            {selectedAge && (
              <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-emerald-200">
                Idade: {selectedAge === '0-2' ? '0-2 anos' : selectedAge === '2-4' ? '2-4 anos' : selectedAge === '4-6' ? '4-6 anos' : '6+ anos'}
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
            <h3 className="text-xl font-semibold text-[#101828] mb-2">Nenhum animal encontrado</h3>
            <p className="text-gray-600 mb-6">
              Não encontramos animais que correspondam aos seus filtros.
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
        {totalPages > 0 && (
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

      <Footer />
    </div>
  )
}