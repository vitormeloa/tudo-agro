'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useFavorites } from '@/hooks/useFavorites'
import { mockProducts } from '@/lib/mock-products'
import { mockAnimals } from '@/lib/mock-animals'
import ProductCard from '@/components/ui/cards/ProductCard'
import {
  Heart,
  Package,
  PawPrint,
  Loader2,
  ShoppingBag,
  Filter,
  Search
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function FavoritosPage() {
  const { favorites, loading, reload } = useFavorites()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('recent')
  const [activeTab, setActiveTab] = useState<'all' | 'products' | 'animals'>('all')

  // Mapear favoritos para produtos e animais mockados
  const favoriteProducts = favorites
    .map(fav => {
      const product = mockProducts.find(p => p.id === fav.product?.id)
      if (product) {
        return {
          ...product,
          favorited_at: fav.created_at,
          type: 'product' as const
        }
      }
      return null
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)

  const favoriteAnimals = favorites
    .map(fav => {
      const animal = mockAnimals.find(a => a.id === fav.product?.id)
      if (animal) {
        return {
          ...animal,
          favorited_at: fav.created_at,
          seller: animal.seller.name,
          rating: animal.seller.rating,
          reviews: animal.seller.totalSales,
          image: animal.images[0],
          verified: animal.seller.verified,
          type: 'animal' as const
        }
      }
      return null
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)

  const allFavorites = [...favoriteProducts, ...favoriteAnimals]

  // Filtrar e ordenar
  const filteredFavorites = allFavorites.filter(item => {
    if (!item) return false

    // Filtro de busca
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesSearch =
        item.title?.toLowerCase().includes(query) ||
        item.category?.toLowerCase().includes(query) ||
        item.seller?.toLowerCase().includes(query)
      if (!matchesSearch) return false
    }

    // Filtro de categoria
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false
    }

    // Filtro de tab
    if (activeTab === 'products' && item.type !== 'product') return false
    if (activeTab === 'animals' && item.type !== 'animal') return false

    return true
  })

  // Ordenar
  const sortedFavorites = [...filteredFavorites].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.favorited_at || 0).getTime() - new Date(a.favorited_at || 0).getTime()
      case 'price-low':
        return (a.price || 0) - (b.price || 0)
      case 'price-high':
        return (b.price || 0) - (a.price || 0)
      case 'name':
        return (a.title || '').localeCompare(b.title || '')
      default:
        return 0
    }
  })

  const productsCount = favoriteProducts.length
  const animalsCount = favoriteAnimals.length
  const totalCount = allFavorites.length

  const categories = Array.from(new Set(allFavorites.map(item => item?.category).filter(Boolean)))

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Heart className="w-8 h-8 text-red-500 fill-red-500" />
              Meus Favoritos
            </h1>
            <p className="text-muted-foreground mt-1">
              Seus produtos e animais salvos ({totalCount} {totalCount === 1 ? 'item' : 'itens'})
            </p>
          </div>
          <Button
            onClick={() => reload()}
            variant="outline"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Atualizando...
              </>
            ) : (
              'Atualizar lista'
            )}
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className={`cursor-pointer transition-all ${activeTab === 'all' ? 'ring-2 ring-primary' : ''}`} onClick={() => setActiveTab('all')}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total de Favoritos</p>
                  <p className="text-3xl font-bold text-foreground">{totalCount}</p>
                </div>
                <Heart className="w-12 h-12 text-red-500 fill-red-500 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className={`cursor-pointer transition-all ${activeTab === 'products' ? 'ring-2 ring-primary' : ''}`} onClick={() => setActiveTab('products')}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Produtos</p>
                  <p className="text-3xl font-bold text-foreground">{productsCount}</p>
                </div>
                <Package className="w-12 h-12 text-primary opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className={`cursor-pointer transition-all ${activeTab === 'animals' ? 'ring-2 ring-primary' : ''}`} onClick={() => setActiveTab('animals')}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Animais</p>
                  <p className="text-3xl font-bold text-foreground">{animalsCount}</p>
                </div>
                <PawPrint className="w-12 h-12 text-primary opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Buscar nos favoritos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas Categorias</SelectItem>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Ordenar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Mais Recentes</SelectItem>
                  <SelectItem value="price-low">Menor Preço</SelectItem>
                  <SelectItem value="price-high">Maior Preço</SelectItem>
                  <SelectItem value="name">Nome (A-Z)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Active Filters */}
            {(searchQuery || selectedCategory !== 'all') && (
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
                <span className="text-sm text-muted-foreground">Filtros ativos:</span>
                {searchQuery && (
                  <Badge variant="secondary" className="gap-1">
                    Busca: "{searchQuery}"
                    <button onClick={() => setSearchQuery('')} className="ml-1 hover:text-destructive">×</button>
                  </Badge>
                )}
                {selectedCategory !== 'all' && (
                  <Badge variant="secondary" className="gap-1">
                    Categoria: {selectedCategory}
                    <button onClick={() => setSelectedCategory('all')} className="ml-1 hover:text-destructive">×</button>
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('all')
                  }}
                  className="h-6 text-xs"
                >
                  Limpar filtros
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">Carregando favoritos...</p>
            </div>
          </div>
        ) : sortedFavorites.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16 px-4">
              <Heart className="w-24 h-24 text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {totalCount === 0 ? 'Nenhum favorito ainda' : 'Nenhum resultado encontrado'}
              </h3>
              <p className="text-muted-foreground text-center mb-6 max-w-md">
                {totalCount === 0
                  ? 'Quando você favoritar produtos ou animais, eles aparecerão aqui.'
                  : 'Tente ajustar os filtros para ver mais resultados.'
                }
              </p>
              {totalCount === 0 ? (
                <div className="flex gap-3">
                  <Button asChild>
                    <a href="/dashboard/mercado-agro">
                      <Package className="w-4 h-4 mr-2" />
                      Ver Produtos
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="/dashboard/animais">
                      <PawPrint className="w-4 h-4 mr-2" />
                      Ver Animais
                    </a>
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('all')
                    setActiveTab('all')
                  }}
                >
                  Limpar todos os filtros
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sortedFavorites.map((item: any) => (
              <ProductCard
                key={item.id}
                product={item}
                variant="default"
              />
            ))}
          </div>
        )}

        {/* Results count */}
        {!loading && sortedFavorites.length > 0 && (
          <div className="text-center text-sm text-muted-foreground">
            Mostrando {sortedFavorites.length} de {totalCount} {totalCount === 1 ? 'favorito' : 'favoritos'}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
