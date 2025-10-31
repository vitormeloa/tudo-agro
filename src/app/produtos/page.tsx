'use client'

import { useState } from 'react'
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

  const products = [
    {
      id: 1,
      title: "Cachaça Haras Eduardo Costa 600ml",
      category: "Bebidas Artesanais e Produtos da Fazenda",
      price: 45.90,
      location: "São Paulo, SP",
      rating: 4.8,
      reviews: 124,
      image: "/fotos/produtos/cachaca-edu.webp",
      seller: "Eduardo Costa",
      verified: true,
      featured: true,
      weight: "600ml",
      brand: "Eduardo Costa",
      stock: "Em estoque"
    },
    {
      id: 2,
      title: "Semente Milho Bm 3066",
      category: "Sementes e Mudas",
      price: 89.50,
      location: "Minas Gerais, MG",
      rating: 4.9,
      reviews: 89,
      image: "/fotos/produtos/semente-milho.jpeg",
      seller: "Sementes Elite",
      verified: true,
      featured: false,
      weight: "2.000",
      brand: "Sementes Elite",
      stock: "Em estoque"
    },
    {
      id: 3,
      title: "Proteinados para Pasto",
      category: "Nutrição Animal",
      price: 125.00,
      location: "Goiás, GO",
      rating: 4.7,
      reviews: 156,
      image: "/fotos/produtos/proteinados-para-pasto.jpeg",
      seller: "FertilAgro",
      verified: true,
      featured: true,
      weight: "50kg",
      brand: "Yara",
      stock: "Em estoque"
    },
    {
      id: 4,
      title: "Herbicida Glifosato Premium (1L ou 5L)",
      category: "Insumos Agrícolas e Fertilizantes",
      price: 78.90,
      location: "Mato Grosso, MT",
      rating: 4.6,
      reviews: 67,
      image: "/fotos/produtos/glifosato-2021.jpg",
      seller: "AgroDefense",
      verified: true,
      featured: false,
      weight: "1L",
      brand: "Syngenta",
      stock: "Em estoque"
    },
    {
      id: 5,
      title: "Probióticos para Ruminantes",
      category: "Suplementos e Aditivos",
      price: 67.50,
      location: "Rio Grande do Sul, RS",
      rating: 4.8,
      reviews: 43,
      image: "/fotos/produtos/dbr-probiotico-pasta.jpg",
      seller: "EquiNutri",
      verified: true,
      featured: true,
      weight: "25kg",
      brand: "Purina",
      stock: "Em estoque"
    },
    {
      id: 6,
      title: "Promotor De Engorda + Vermifugo 3.6%",
      category: "Saúde e Bem-Estar Animal",
      price: 145.00,
      location: "Paraná, PR",
      rating: 4.9,
      reviews: 98,
      image: "/fotos/produtos/promotor.webp",
      seller: "Vermífugos Agro",
      verified: true,
      featured: false,
      weight: "500ml",
      brand: "Monsanto",
      stock: "Em estoque"
    }
  ]

  const categories = [
    { name: 'Nutrição Animal', count: 234, color: '#B8E8D1' },
    { name: 'Saúde e Bem-Estar Animal', count: 189, color: '#E2D4F9' },
    { name: 'Reprodução e Genética', count: 156, color: '#E6E6FA' },
    { name: 'Selaria e Utilidades', count: 98, color: '#FFE0B2' },
    { name: 'Equipamentos e Infraestrutura Rural', count: 145, color: '#E1D5FF' },
    { name: 'Vestuário e Lifestyle Agro', count: 87, color: '#FCE4EC' },
    { name: 'Sementes e Mudas', count: 312, color: '#DDEBFF' },
    { name: 'Insumos Agrícolas e Fertilizantes', count: 267, color: '#FFF8DC' },
    { name: 'Higiene, Limpeza e Desinfecção', count: 76, color: '#E0F7FA' },
    { name: 'Suplementos e Aditivos', count: 198, color: '#F6F0C4' },
    { name: 'Bebidas Artesanais e Produtos da Fazenda', count: 45, color: '#FEE6E3' },
    { name: 'Outros', count: 134, color: '#F5F5F5' }
  ]

  // Mostrar apenas as primeiras 5 categorias, resto vai no modal
  const visibleCategories = categories.slice(0, 5)
  const hiddenCategories = categories.slice(5)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
        <section className="relative pt-16 pb-20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700"></div>
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
                      <SelectItem value="nutricao-animal">Nutrição Animal</SelectItem>
                      <SelectItem value="saude-bem-estar">Saúde e Bem-Estar Animal</SelectItem>
                      <SelectItem value="reproducao-genetica">Reprodução e Genética</SelectItem>
                      <SelectItem value="selaria-utilidades">Selaria e Utilidades</SelectItem>
                      <SelectItem value="equipamentos-infraestrutura">Equipamentos e Infraestrutura Rural</SelectItem>
                      <SelectItem value="vestuario-lifestyle">Vestuário e Lifestyle Agro</SelectItem>
                      <SelectItem value="sementes-mudas">Sementes e Mudas</SelectItem>
                      <SelectItem value="insumos-fertilizantes">Insumos Agrícolas e Fertilizantes</SelectItem>
                      <SelectItem value="higiene-limpeza">Higiene, Limpeza e Desinfecção</SelectItem>
                      <SelectItem value="suplementos-aditivos">Suplementos e Aditivos</SelectItem>
                      <SelectItem value="bebidas-artesanais">Bebidas Artesanais e Produtos da Fazenda</SelectItem>
                      <SelectItem value="acessorios-cuidados">Acessórios e Cuidados Gerais</SelectItem>
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {visibleCategories.map((category, index) => (
              <Card 
                key={category.name} 
                className="hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-3 text-center">
                  <div 
                    className="inline-flex px-3 py-1.5 rounded-full text-xs font-medium mb-2 max-w-full break-words leading-tight"
                    style={{ 
                      backgroundColor: category.color,
                      color: '#1F2937' // text-gray-800 equivalente
                    }}
                  >
                    <span className="text-center">{category.name}</span>
                  </div>
                  <div className="text-xl font-bold text-gray-900">{category.count}</div>
                  <div className="text-xs text-gray-500">produtos</div>
                </CardContent>
              </Card>
            ))}
            
            {/* Botão Ver Mais */}
            {hiddenCategories.length > 0 && (
              <Card 
                className="hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer animate-fade-in-up border-2 border-dashed border-gray-300 hover:border-emerald-500"
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

        {/* Modal de Categorias */}
        <Dialog open={showCategoriesModal} onOpenChange={setShowCategoriesModal}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-900">Todas as Categorias</DialogTitle>
              <DialogDescription className="text-gray-600">
                Explore todas as categorias disponíveis em nosso marketplace
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {hiddenCategories.map((category, index) => (
                <Card 
                  key={category.name} 
                  className="hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer"
                  onClick={() => setShowCategoriesModal(false)}
                >
                  <CardContent className="p-4 text-center">
                    <div 
                      className="inline-flex px-4 py-2 rounded-full text-xs font-medium mb-3 max-w-full break-words leading-tight"
                      style={{ 
                        backgroundColor: category.color,
                        color: '#1F2937' // text-gray-800 equivalente
                      }}
                    >
                      <span className="text-center">{category.name}</span>
                    </div>
                    <div className="text-xl font-bold text-gray-900">{category.count}</div>
                    <div className="text-xs text-gray-500">produtos</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {/* Features */}
        <div className="mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center p-4 bg-white rounded-lg shadow-sm border">
              <Truck className="w-8 h-8 text-blue-600 mr-4" />
              <div>
                <h4 className="font-semibold text-gray-900">Frete Grátis</h4>
                <p className="text-sm text-gray-600">Acima de R$ 500</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-white rounded-lg shadow-sm border">
              <Shield className="w-8 h-8 text-green-600 mr-4" />
              <div>
                <h4 className="font-semibold text-gray-900">Garantia e Segurança</h4>
                <p className="text-sm text-gray-600">Produtos originais com segurança garantida</p>
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