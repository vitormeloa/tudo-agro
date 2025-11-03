'use client'

import AdminLayout from '@/components/admin/AdminLayout'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useFavorites } from '@/hooks/useFavorites'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Heart, 
  Eye, 
  MapPin, 
  Trash2,
  Loader2
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function FavoritosSection() {
  const { favorites, loading, removeFavorite, reload } = useFavorites()
  const router = useRouter()

  const handleRemoveFavorite = async (productId: string) => {
    await removeFavorite(productId)
    reload()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    )
  }

  if (favorites.length === 0) {
    return (
      <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Meus Favoritos</h1>
          <p className="text-gray-600 mt-2">Itens que você favoritou</p>
        </div>
      </div>

      <Card className="p-12 text-center">
        <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Nenhum favorito ainda
        </h3>
        <p className="text-gray-600 mb-6">
          Comece a favoritar animais e produtos para encontrá-los facilmente depois.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/catalogo">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              Explorar Catálogo
            </Button>
          </Link>
          <Link href="/produtos">
            <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white">
              Ver Produtos
            </Button>
          </Link>
        </div>
      </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Meus Favoritos</h1>
          <p className="text-gray-600 mt-2">
            {favorites.length} {favorites.length === 1 ? 'item favoritado' : 'itens favoritados'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((favorite) => {
          const item = favorite.product
          // Determinar tipo de item (animal, produto ou desconhecido)
          const itemType = (item as any).item_type || 'unknown'
          
          // Determinar rota baseada no tipo
          const detailRoute = itemType === 'animal' 
            ? `/catalogo/${item.id}`
            : itemType === 'product'
            ? `/produtos/${item.id}`
            : `#` // Fallback para itens desconhecidos
          
          // Buscar primeira imagem disponível
          const mainImage = item.product_images?.[0]?.url 
            || (itemType === 'animal' ? '/fotos/animais/placeholder.jpg' : '/fotos/produtos/placeholder.jpg')
            || '/placeholder-animal.jpg'
          
          // Se não tem imagem mas tem array de imagens vazio, usar placeholder
          const displayImage = mainImage === '/placeholder-animal.jpg' && item.product_images?.length === 0
            ? (itemType === 'animal' ? '/fotos/animais/placeholder.jpg' : '/fotos/produtos/placeholder.jpg')
            : mainImage
          
          return (
            <Card key={favorite.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={displayImage} 
                  alt={item.title || 'Item favoritado'}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    // Fallback para imagem quebrada
                    const target = e.target as HTMLImageElement
                    target.src = itemType === 'animal' 
                      ? '/fotos/animais/placeholder.jpg' 
                      : '/fotos/produtos/placeholder.jpg'
                  }}
                />
                
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className={`${itemType === 'animal' ? 'bg-emerald-600' : 'bg-blue-600'}`}>
                    {item.category || 'Sem categoria'}
                  </Badge>
                  {item.featured && (
                    <Badge className="bg-[#D4AF37] text-black">
                      DESTAQUE
                    </Badge>
                  )}
                  {itemType === 'animal' && (
                    <Badge variant="outline" className="border-white text-white bg-black/30">
                      Animal
                    </Badge>
                  )}
                  {itemType === 'product' && (
                    <Badge variant="outline" className="border-white text-white bg-black/30">
                      Produto
                    </Badge>
                  )}
                </div>

                <div className="absolute top-4 right-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveFavorite(item.id)}
                    className="bg-white/90 hover:bg-white text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                  {item.title || 'Item sem título'}
                </h3>

                {item.description && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {item.description}
                  </p>
                )}

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  {item.breed && (
                    <span className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      {item.breed}
                    </span>
                  )}
                  {item.age && (
                    <span>{item.age}</span>
                  )}
                  {item.weight && typeof item.weight === 'string' && (
                    <span>Peso: {item.weight}</span>
                  )}
                </div>

                {item.price && (
                  <div className="mb-3">
                    <span className="text-2xl font-bold text-emerald-600">
                      R$ {typeof item.price === 'number' 
                        ? item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                        : parseFloat(item.price.toString()).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                      }
                    </span>
                    {item.negotiable && (
                      <span className="text-sm text-gray-500 ml-2">(Negociável)</span>
                    )}
                  </div>
                )}

                {itemType !== 'unknown' ? (
                  <Link href={detailRoute} className="block">
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                      <Eye className="w-4 h-4 mr-2" />
                      Ver Detalhes
                    </Button>
                  </Link>
                ) : (
                  <Button 
                    className="w-full bg-gray-400 cursor-not-allowed" 
                    disabled
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Item Indisponível
                  </Button>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default function FavoritosPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <FavoritosSection />
      </AdminLayout>
    </ProtectedRoute>
  )
}
