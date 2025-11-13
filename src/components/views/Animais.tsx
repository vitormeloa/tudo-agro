'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import ProductCard from '@/components/ui/cards/ProductCard'
import { mockAnimals } from '@/lib/mock-animals'
import {
  Search,
  Filter,
  SlidersHorizontal,
  Package,
  HelpCircle
} from 'lucide-react'

export default function Animais() {
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

    if (selectedCategory && product.category !== selectedCategory) return false
    if (selectedBreed && product.breed !== selectedBreed) return false
    if (selectedLocation) {
      const locationState = product.location.split(',')[1]?.trim().toLowerCase()
      if (!locationState?.includes(selectedLocation.toLowerCase())) return false
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

    if (selectedAge) {
      const age = parseInt(product.age || '0')
      switch (selectedAge) {
        case '0-2':
          if (age > 2) return false
          break
        case '2-4':
          if (age < 2 || age > 4) return false
          break
        case '4-6':
          if (age < 4 || age > 6) return false
          break
        case '6+':
          if (age < 6) return false
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
    { name: 'Gado de Corte', color: 'bg-[#B8E8D1] text-[#1F2937]' },
    { name: 'Gado de Leite', color: 'bg-[#B8E8D1] text-[#1F2937]' },
    { name: 'Cavalos', color: 'bg-[#B8E8D1] text-[#1F2937]' },
    { name: 'Sêmen', color: 'bg-[#B8E8D1] text-[#1F2937]' }
  ].map(cat => ({
    ...cat,
    count: getCategoryCount(cat.name)
  })).filter(cat => cat.count > 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Catálogo de Animais</h1>
        <p className="text-muted-foreground mt-1">Encontre os melhores animais para sua fazenda</p>
      </div>

      <Card className="shadow-sm border">
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

        <h3 className="text-lg font-semibold text-[#101828]">Categorias Populares</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Card
            key={category.name}
            onClick={() => handleCategoryClick(category.name)}
            className={`shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer ${
              selectedCategory === category.name ? 'ring-2 ring-emerald-500 shadow-lg' : ''
            }`}
          >
              <CardContent className="p-3 text-center">
              <div className={`inline-flex px-3 py-1.5 rounded-full text-xs font-medium mb-2 max-w-full break-words leading-tight ${category.color}`}>
                {category.name}
              </div>
              <div className="text-xl font-bold text-[#101828]">{category.count}</div>
              <div className="text-xs text-gray-500">animais</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="text-gray-600">
          Mostrando <span className="font-semibold text-[#101828]">{startIndex + 1}</span> até <span className="font-semibold text-[#101828]">{Math.min(endIndex, sortedProducts.length)}</span> de <span className="font-semibold text-[#101828]">{sortedProducts.length}</span> resultados
        </div>
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
              Próximo
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
                  <p className="font-medium">Dúvidas sobre os animais?</p>
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
