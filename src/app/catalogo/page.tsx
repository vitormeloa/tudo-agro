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
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton'
import { mockAnimals } from '@/lib/mock-animals'
import {
  Search,
  Filter,
  SlidersHorizontal,
  ChevronDown,
  Star,
  MapPin
} from 'lucide-react'

export default function CatalogoPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState<number[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  // Mapear animais do mock para o formato esperado pelo ProductCard
  const allProducts = mockAnimals.map(a => ({
    id: a.id,
    title: a.title,
    category: a.category,
    price: a.price,
    location: a.location,
    rating: 4.8, // Default rating
    reviews: 0, // Default reviews
    image: a.images[0],
    seller: a.seller.name,
    verified: a.seller.verified,
    featured: a.featured,
    age: a.age,
    weight: a.weight,
    breed: a.breed,
    type: 'animal' as const
  }))

  // Filtrar animais baseado na busca (se houver)
  const filteredProducts = allProducts.filter(product => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      product.title.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.breed?.toLowerCase().includes(query) ||
      product.location.toLowerCase().includes(query)
    )
  })

  // Calcular paginação
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const products = filteredProducts.slice(startIndex, endIndex)

  // Resetar para página 1 quando a busca mudar
  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    setCurrentPage(1)
  }

  // Garantir que currentPage não ultrapasse totalPages
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages)
    }
  }, [totalPages, currentPage])

  // Scroll to top ao mudar de página
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const categories = [
    { name: 'Gado de Corte', count: 156, color: 'bg-emerald-100 text-emerald-800' },
    { name: 'Gado de Leite', count: 89, color: 'bg-blue-100 text-blue-800' },
    { name: 'Cavalos', count: 67, color: 'bg-amber-100 text-amber-800' },
    { name: 'Sêmen', count: 234, color: 'bg-purple-100 text-purple-800' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
        <section className="relative pt-16 pb-20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-lime-600 via-green-600 to-emerald-700"></div>
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
        {/* Search and Filters */}
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
                    className="pl-10 h-12 text-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                  />
                </div>
              </div>
              <Button 
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 h-12"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="w-5 h-5 mr-2" />
                Filtros
              </Button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="border-t border-gray-200 pt-6 animate-fade-in-up">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  <Select>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gado-corte">Gado de Corte</SelectItem>
                      <SelectItem value="gado-leite">Gado de Leite</SelectItem>
                      <SelectItem value="cavalos">Cavalos</SelectItem>
                      <SelectItem value="semen">Sêmen</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Raça" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nelore">Nelore</SelectItem>
                      <SelectItem value="angus">Angus</SelectItem>
                      <SelectItem value="brahman">Brahman</SelectItem>
                      <SelectItem value="holandesa">Holandesa</SelectItem>
                      <SelectItem value="mangalarga">Mangalarga</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Preço" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-5000">Até R$ 5.000</SelectItem>
                      <SelectItem value="5000-15000">R$ 5.000 - R$ 15.000</SelectItem>
                      <SelectItem value="15000-30000">R$ 15.000 - R$ 30.000</SelectItem>
                      <SelectItem value="30000+">Acima de R$ 30.000</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Localização" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="go">Goiás</SelectItem>
                      <SelectItem value="mg">Minas Gerais</SelectItem>
                      <SelectItem value="sp">São Paulo</SelectItem>
                      <SelectItem value="mt">Mato Grosso</SelectItem>
                      <SelectItem value="rs">Rio Grande do Sul</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Idade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-2">0-2 anos</SelectItem>
                      <SelectItem value="2-4">2-4 anos</SelectItem>
                      <SelectItem value="4-6">4-6 anos</SelectItem>
                      <SelectItem value="6+">6+ anos</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline" className="h-10 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white">
                    <Filter className="w-4 h-4 mr-2" />
                    Aplicar
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Categories */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Categorias Populares</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <Card key={category.name} className="hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-4 text-center">
                  <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium mb-2 ${category.color}`}>
                    {category.name}
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{category.count}</div>
                  <div className="text-sm text-gray-500">animais</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="text-gray-600">
            Mostrando <span className="font-semibold text-gray-900">{startIndex + 1}</span> até <span className="font-semibold text-gray-900">{Math.min(endIndex, filteredProducts.length)}</span> de <span className="font-semibold text-gray-900">{filteredProducts.length}</span> resultados
          </div>
          <div className="flex items-center space-x-4">
            <Select defaultValue="relevancia">
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

        {/* Products Grid */}
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

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Button
              variant="outline"
              disabled={currentPage === 1 || totalPages <= 1}
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white disabled:border-gray-300 disabled:text-gray-400 disabled:hover:bg-transparent disabled:hover:text-gray-400"
            >
              Anterior
            </Button>

            {/* Mostrar números de página */}
            {totalPages > 0 && Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              // Mostrar sempre primeira e última página, página atual e páginas adjacentes
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
                        ? "bg-emerald-600 text-white hover:bg-emerald-700"
                        : "border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white"
                    }
                    variant={currentPage === page ? "default" : "outline"}
                  >
                    {page}
                  </Button>
                )
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                // Mostrar ellipsis
                return <span key={page} className="px-2 text-gray-500">...</span>
              }
              return null
            })}

            <Button
              variant="outline"
              disabled={currentPage === totalPages || totalPages <= 1}
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white disabled:border-gray-300 disabled:text-gray-400 disabled:hover:bg-transparent disabled:hover:text-gray-400"
            >
              Próximo
            </Button>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <FloatingWhatsAppButton />

      <Footer />
    </div>
  )
}
