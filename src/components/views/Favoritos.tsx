'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useFavorites } from '@/hooks/useFavorites'
import { mockProducts } from '@/lib/mock-products'
import { mockAnimals } from '@/lib/mock-animals'
import ProductCard from '@/components/ui/cards/ProductCard'
import {
  Heart,
  Package,
  PawPrint,
  Loader2,
  Search,
  SlidersHorizontal,
  Filter,
  HelpCircle,
  Grid3x3
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function Favoritos() {
  const { favorites, loading } = useFavorites()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'all' | 'produtos' | 'animais'>('all')
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>('recent')
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);

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

  const filteredFavorites = allFavorites.filter(item => {
    if (!item) return false

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesSearch =
        item.title?.toLowerCase().includes(query) ||
        item.category?.toLowerCase().includes(query) ||
        item.seller?.toLowerCase().includes(query)
      if (!matchesSearch) return false
    }

    if (activeTab !== 'all' && item.type !== activeTab) return false

    if (priceRange !== "all") {
      const price = item.price || 0;
      if (priceRange === "0-1000" && price > 1000) return false;
      if (priceRange === "1000-5000" && (price < 1000 || price > 5000)) return false;
      if (priceRange === "5000+" && price < 5000) return false;
    }

    return true
  })

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

  const categoriesConfig = [
    { name: 'produtos', label: 'Produtos', color: '#B8E8D1', icon: Package },
    { name: 'animais', label: 'Animais', color: '#B8E8D1', icon: PawPrint },
  ];

  const getCategoryStats = (category: string) => {
    if (category === "all") return allFavorites.length;
    if (category === "produtos") return favoriteProducts.length;
    if (category === "animais") return favoriteAnimals.length;
    return 0;
  };

  const categories = categoriesConfig.map(cat => ({
    ...cat,
    count: getCategoryStats(cat.name)
  }));

  const clearAllFilters = () => {
    setSearchQuery('');
    setPriceRange('all');
    setActiveTab('all');
    setSortBy('recent');
  };

  const hasActiveFilters = !!(searchQuery || priceRange !== 'all' || activeTab !== 'all');

  return (
    <>
      <div className="space-y-4 sm:space-y-6 w-full">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Meus Favoritos</h1>
          <p className="text-muted-foreground mt-1">Seus produtos e animais salvos em um só lugar</p>
        </div>

        <Card className="shadow-sm border">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Buscar por nome, categoria..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Faixa de Preço" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os preços</SelectItem>
                      <SelectItem value="0-1000">Até R$ 1.000</SelectItem>
                      <SelectItem value="1000-5000">R$ 1.000 - R$ 5.000</SelectItem>
                      <SelectItem value="5000+">Acima de R$ 5.000</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Mais Recentes</SelectItem>
                      <SelectItem value="price-low">Menor Preço</SelectItem>
                      <SelectItem value="price-high">Maior Preço</SelectItem>
                      <SelectItem value="name">Nome (A-Z)</SelectItem>
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Card
              key={category.name}
              onClick={() => setActiveTab(activeTab === category.name ? 'all' : category.name as any)}
              className={`shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer ${
                activeTab === category.name ? 'ring-2 ring-emerald-500 shadow-lg' : ''
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
                  <span className="text-center">{category.label}</span>
                </div>
                <div className="text-xl font-bold text-[#101828]">{category.count}</div>
                <div className="text-xs text-gray-500">favoritos</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="text-gray-600">
            Mostrando <span className="font-semibold text-[#101828]">{sortedFavorites.length}</span> de <span className="font-semibold text-[#101828]">{allFavorites.length}</span> resultados
          </div>
        </div>

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
                {allFavorites.length === 0 ? 'Nenhum favorito ainda' : 'Nenhum resultado encontrado'}
              </h3>
              <p className="text-muted-foreground text-center mb-6 max-w-md">
                {allFavorites.length === 0
                  ? 'Quando você favoritar produtos ou animais, eles aparecerão aqui.'
                  : 'Tente ajustar os filtros para ver mais resultados.'
                }
              </p>
              {allFavorites.length === 0 ? (
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
                <Button onClick={clearAllFilters}>
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
      </div>

      <Card className="bg-muted/50 mt-6">
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <HelpCircle className="h-10 w-10 text-primary" />
              <div>
                <p className="font-medium">Dúvidas sobre seus favoritos?</p>
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
    </>
  )
}
