'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import ProtectedRoute from '@/components/ProtectedRoute'
import AdminLayout from '@/components/admin/AdminLayout'
import ProductCard from '@/components/ui/cards/ProductCard'
import { mockAnimals } from '@/lib/mock-animals'
import { 
  Search, 
  Filter, 
  SlidersHorizontal
} from 'lucide-react'

export default function CatalogoPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  // Mapear animais do mock para o formato esperado pelo ProductCard
  const products = mockAnimals.map(a => ({
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

  const categories = [
    { name: 'Gado de Corte', count: 156, color: 'bg-emerald-100 text-emerald-800' },
    { name: 'Gado de Leite', count: 89, color: 'bg-blue-100 text-blue-800' },
    { name: 'Cavalos', count: 67, color: 'bg-amber-100 text-amber-800' },
    { name: 'Sêmen', count: 234, color: 'bg-purple-100 text-purple-800' }
  ]

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="min-h-screen bg-gray-50">
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
                        onChange={(e) => setSearchQuery(e.target.value)}
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
                Mostrando <span className="font-semibold text-gray-900">{products.length}</span> resultados
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
                    linkTo={`/dashboard/catalogo/${product.id}`}
                  />
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center space-x-2">
                <Button variant="outline" disabled className="border-gray-300 text-gray-400">
                  Anterior
                </Button>
                <Button className="bg-emerald-600 text-white">1</Button>
                <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white">2</Button>
                <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white">3</Button>
                <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white">
                  Próximo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  )
}
