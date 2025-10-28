'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProductCard from '@/components/ui/cards/ProductCard'
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  SlidersHorizontal,
  ChevronDown,
  Star,
  MapPin,
  Package,
  Truck,
  Shield,
  Award
} from 'lucide-react'

export default function ProdutosPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [favorites, setFavorites] = useState<number[]>([])
  const [showFilters, setShowFilters] = useState(false)

  const products = [
    {
      id: 1,
      title: "Ração para Gado de Corte Premium",
      category: "Rações",
      price: 45.90,
      location: "São Paulo, SP",
      rating: 4.8,
      reviews: 124,
      image: "/fotos/produtos/racao-1.jpg",
      seller: "AgroNutri",
      verified: true,
      featured: true,
      weight: "50kg",
      brand: "NutriMax",
      stock: "Em estoque"
    },
    {
      id: 2,
      title: "Sementes de Milho Híbrido",
      category: "Sementes",
      price: 89.50,
      location: "Minas Gerais, MG",
      rating: 4.9,
      reviews: 89,
      image: "/fotos/produtos/milho.webp",
      seller: "Sementes Elite",
      verified: true,
      featured: false,
      weight: "60.000 sementes",
      brand: "Pioneer",
      stock: "Em estoque"
    },
    {
      id: 3,
      title: "Fertilizante NPK 20-10-10",
      category: "Fertilizantes",
      price: 125.00,
      location: "Goiás, GO",
      rating: 4.7,
      reviews: 156,
      image: "/fotos/produtos/fertilizante.webp",
      seller: "FertilAgro",
      verified: true,
      featured: true,
      weight: "50kg",
      brand: "Yara",
      stock: "Em estoque"
    },
    {
      id: 4,
      title: "Defensivo Agrícola - Herbicida",
      category: "Defensivos",
      price: 78.90,
      location: "Mato Grosso, MT",
      rating: 4.6,
      reviews: 67,
      image: "/fotos/produtos/defensivo.jpg",
      seller: "AgroDefense",
      verified: true,
      featured: false,
      weight: "1L",
      brand: "Syngenta",
      stock: "Em estoque"
    },
    {
      id: 5,
      title: "Ração para Cavalos Esportivos",
      category: "Rações",
      price: 67.50,
      location: "Rio Grande do Sul, RS",
      rating: 4.8,
      reviews: 43,
      image: "/fotos/produtos/racao-cavalo.jpg",
      seller: "EquiNutri",
      verified: true,
      featured: true,
      weight: "25kg",
      brand: "Purina",
      stock: "Em estoque"
    },
    {
      id: 6,
      title: "Sementes de Soja Transgênica",
      category: "Sementes",
      price: 145.00,
      location: "Paraná, PR",
      rating: 4.9,
      reviews: 98,
      image: "/fotos/produtos/soja.jpg",
      seller: "Sementes Premium",
      verified: true,
      featured: false,
      weight: "140.000 sementes",
      brand: "Monsanto",
      stock: "Em estoque"
    }
  ]

  const categories = [
    { name: 'Rações', count: 234, color: 'bg-emerald-100 text-emerald-800' },
    { name: 'Sementes', count: 189, color: 'bg-blue-100 text-blue-800' },
    { name: 'Fertilizantes', count: 156, color: 'bg-amber-100 text-amber-800' },
    { name: 'Defensivos', count: 98, color: 'bg-red-100 text-red-800' },
    { name: 'Equipamentos', count: 67, color: 'bg-purple-100 text-purple-800' },
    { name: 'Outros', count: 45, color: 'bg-gray-100 text-gray-800' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700"></div>
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute inset-0 opacity-40">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
                  Produtos Agropecuários
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
                  Encontre rações, sementes, fertilizantes e tudo que sua fazenda precisa
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
                    placeholder="Buscar por produto, marca, categoria..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 text-lg border-2 border-gray-200 focus:border-green-500 focus:ring-green-500/20"
                  />
                </div>
              </div>
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white px-8 h-12"
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
                      <SelectItem value="racoes">Rações</SelectItem>
                      <SelectItem value="sementes">Sementes</SelectItem>
                      <SelectItem value="fertilizantes">Fertilizantes</SelectItem>
                      <SelectItem value="defensivos">Defensivos</SelectItem>
                      <SelectItem value="equipamentos">Equipamentos</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Marca" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nutrimax">NutriMax</SelectItem>
                      <SelectItem value="pioneer">Pioneer</SelectItem>
                      <SelectItem value="yara">Yara</SelectItem>
                      <SelectItem value="syngenta">Syngenta</SelectItem>
                      <SelectItem value="purina">Purina</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Preço" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-50">Até R$ 50</SelectItem>
                      <SelectItem value="50-100">R$ 50 - R$ 100</SelectItem>
                      <SelectItem value="100-200">R$ 100 - R$ 200</SelectItem>
                      <SelectItem value="200+">Acima de R$ 200</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Localização" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sp">São Paulo</SelectItem>
                      <SelectItem value="mg">Minas Gerais</SelectItem>
                      <SelectItem value="go">Goiás</SelectItem>
                      <SelectItem value="mt">Mato Grosso</SelectItem>
                      <SelectItem value="rs">Rio Grande do Sul</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Disponibilidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="estoque">Em Estoque</SelectItem>
                      <SelectItem value="encomenda">Sob Encomenda</SelectItem>
                      <SelectItem value="esgotado">Esgotado</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline" className="h-10 border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Card key={category.name} className="hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-4 text-center">
                  <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium mb-2 ${category.color}`}>
                    {category.name}
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{category.count}</div>
                  <div className="text-sm text-gray-500">produtos</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center p-4 bg-white rounded-lg shadow-sm border">
              <Truck className="w-8 h-8 text-blue-600 mr-4" />
              <div>
                <h4 className="font-semibold text-gray-900">Frete Grátis</h4>
                <p className="text-sm text-gray-600">Acima de R$ 200</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-white rounded-lg shadow-sm border">
              <Shield className="w-8 h-8 text-green-600 mr-4" />
              <div>
                <h4 className="font-semibold text-gray-900">Garantia</h4>
                <p className="text-sm text-gray-600">Produtos originais</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-white rounded-lg shadow-sm border">
              <Award className="w-8 h-8 text-amber-600 mr-4" />
              <div>
                <h4 className="font-semibold text-gray-900">Qualidade</h4>
                <p className="text-sm text-gray-600">Marcas reconhecidas</p>
              </div>
            </div>
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
            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-none"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-none"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {products.map((product, index) => (
            <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <ProductCard 
                product={product} 
                variant={viewMode === 'list' ? 'compact' : 'default'}
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
            <Button className="bg-green-600 text-white">1</Button>
            <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">2</Button>
            <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">3</Button>
            <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
              Próximo
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}