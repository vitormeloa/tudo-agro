'use client';

"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  MapPin,
  Star,
  Heart,
  Share2,
  FileText,
  Award,
  Shield,
  Weight,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  ShoppingBag,
  Plus,
  Minus,
  Truck
} from 'lucide-react'
import { mockProducts } from '@/lib/mock-products'
import { useCart } from '@/contexts/CartContext'
import RequireAuth from '@/components/RequireAuth'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/use-toast'
import { useFavorites } from '@/hooks/useFavorites'
import { calculateFreight, formatCEP, type FreightResult } from '@/lib/freight-calculator'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ReviewsSection from '@/components/reviews/ReviewsSection'
import SellerInfoCard from '@/components/ui/cards/SellerInfoCard'
import { mockProductReviews } from '@/lib/mock-reviews'
import type { Review } from '@/lib/mock-reviews'
import QuestionsSection from '@/components/questions/QuestionsSection'
import { getProductQuestions } from '@/lib/mock-questions'

interface ProductDetailViewProps {
  productId: string
  isDashboard?: boolean
}

function ProductDetailViewContent({ productId, isDashboard }: ProductDetailViewProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [cep, setCep] = useState('')
  const [freightResult, setFreightResult] = useState<FreightResult | null>(null)
  const [isCalculatingFreight, setIsCalculatingFreight] = useState(false)
  const { addItem } = useCart()
  const { user, initialized } = useAuth()
  const { isFavorite, toggleFavorite, checkIsFavorite } = useFavorites()
  const router = useRouter()
  const { toast } = useToast()
  const [favoriteChecked, setFavoriteChecked] = useState(false)
  const [reviews, setReviews] = useState<Review[]>(mockProductReviews)

  // Buscar produto pelo ID
  const product = mockProducts.find(p => p.id === productId)

  // Verificar se está favoritado quando componente montar
  useEffect(() => {
    if (product && user && !favoriteChecked) {
      checkIsFavorite(product.id).then(() => {
        setFavoriteChecked(true)
      })
    }
  }, [product, user, favoriteChecked, checkIsFavorite])

  // Extrair quantidade disponível do estoque
  const getAvailableStock = (stockString: string): number => {
    const match = stockString.match(/\d+/)
    if (match) {
      const number = parseInt(match[0], 10)
      if (number > 0) {
        return number
      }
    }
    if (stockString.toLowerCase().includes('estoque') || stockString.toLowerCase().includes('disponível')) {
      return 100
    }
    return 0
  }

  const availableStock = product ? getAvailableStock(product.stock) : 0

  useEffect(() => {
    setQuantity(1)
  }, [productId])

  const handleIncreaseQuantity = () => {
    if (quantity < availableStock) {
      setQuantity(prev => prev + 1)
    }
  }

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10)
    if (!isNaN(value) && value >= 1 && value <= availableStock) {
      setQuantity(value)
    } else if (e.target.value === '') {
      setQuantity(1)
    }
  }

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')
    if (value.length <= 8) {
      setCep(value)
    }
  }

  const handleCalculateFreight = () => {
    if (cep.length !== 8) {
      toast({
        title: 'CEP inválido',
        description: 'Por favor, digite um CEP válido com 8 dígitos.',
        variant: 'destructive',
      })
      return
    }

    setIsCalculatingFreight(true)

    setTimeout(() => {
      const result = calculateFreight(cep, product?.location)
      setFreightResult(result)
      setIsCalculatingFreight(false)

      if (!result) {
        toast({
          title: 'Erro ao calcular frete',
          description: 'Não foi possível calcular o frete para este CEP.',
          variant: 'destructive',
        })
      }
    }, 500)
  }

  const handleToggleFavorite = async () => {
    if (!user) {
      // Não redirecionar, apenas mostrar toast através do toggleFavorite
      if (product) {
        await toggleFavorite(product.id)
      }
      return
    }
    if (product) {
      await toggleFavorite(product.id)
    }
  }

  const handlePurchase = () => {
    if (!user) {
      // Redirecionar para login com redirect para a página de checkout (depois do login vai para checkout)
      router.push(`/login?redirect=${encodeURIComponent(`/produtos/${productId}`)}`)
      return
    }
    if (!product) return
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0] || product.image,
      seller: product.seller,
      stock: product.stock,
      availableStock: availableStock,
      type: 'product',
      location: product.location,
      city: product.city,
      quantity: quantity
    })
    router.push('/dashboard/checkout')
  }

  const handleAddToCart = () => {
    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent(`/produtos/${productId}`)}`)
      return
    }
    if (!product) return
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0] || product.image,
      seller: product.seller,
      stock: product.stock,
      availableStock: availableStock,
      type: 'product',
      location: product.location,
      city: product.city,
      quantity: quantity
    })
    toast({
      title: 'Produto adicionado!',
      description: `${product.title} foi adicionado ao carrinho.`,
    })
  }

  // Se não encontrar, mostrar erro
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#101828] mb-4">Produto não encontrado</h1>
          <Link href="/produtos">
            <Button>Voltar para Produtos</Button>
          </Link>
        </div>
      </div>
    )
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-3 sm:space-y-4">
            <div className="relative">
              <img
                src={product.images[currentImageIndex]}
                alt={product.title}
                className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg sm:rounded-xl lg:rounded-2xl"
              />

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Badges */}
              <div className="absolute top-2 sm:top-3 lg:top-4 left-2 sm:left-3 lg:left-4 flex gap-1.5 sm:gap-2">
                <Badge className="bg-[#1C6B3E] text-xs sm:text-sm px-2 sm:px-2.5 py-0.5 sm:py-1">
                  {product.category}
                </Badge>
                {product.featured && (
                  <Badge className="bg-[#D4AF37] text-black text-xs sm:text-sm px-2 sm:px-2.5 py-0.5 sm:py-1">
                    DESTAQUE
                  </Badge>
                )}
              </div>

              {/* Actions */}
              <div className="absolute top-2 sm:top-3 lg:top-4 right-2 sm:right-3 lg:right-4 flex gap-1.5 sm:gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleToggleFavorite}
                  className={`bg-white/90 hover:bg-white transition-colors p-1.5 sm:p-2 h-auto ${
                    isFavorite(product.id) ? 'text-red-500' : 'text-gray-700 hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="bg-white/90 hover:bg-white text-gray-700 hover:text-emerald-700 transition-colors p-1.5 sm:p-2 h-auto"
                >
                  <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>

              {/* Image Counter */}
              <div className="absolute bottom-2 sm:bottom-3 lg:bottom-4 right-2 sm:right-3 lg:right-4 bg-black/70 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm">
                {currentImageIndex + 1} / {product.images.length}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    index === currentImageIndex
                      ? 'border-[#1C6B3E]'
                      : 'border-transparent hover:border-[#D4AF37]'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#101828] mb-3 sm:mb-4 leading-tight">
                {product.title}
              </h1>

              <div className="flex items-center text-sm sm:text-base text-gray-600 mb-4">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                <span>{product.city}, {product.location}</span>
              </div>

              <div className="space-y-4 mb-6">
                {/* Price Display */}
                <div className="space-y-2">
                  <div className="text-3xl sm:text-4xl font-bold text-emerald-600">
                    R$ {(product.price * quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  {quantity > 1 && (
                    <div className="text-sm sm:text-base text-gray-600">
                      {quantity}x de R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  )}
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3">
                  <label className="text-sm sm:text-base font-medium text-gray-700 whitespace-nowrap">
                    Quantidade:
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="inline-flex items-center border border-gray-300 rounded-lg bg-white shadow-sm hover:shadow transition-shadow focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500">
                      <button
                        onClick={handleDecreaseQuantity}
                        disabled={quantity <= 1}
                        className="p-2.5 sm:p-3 hover:bg-emerald-50 active:bg-emerald-100 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-all duration-150 flex items-center justify-center rounded-l-lg"
                        aria-label="Diminuir quantidade"
                      >
                        <Minus className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                      </button>
                      <input
                        type="number"
                        min="1"
                        max={availableStock}
                        value={quantity}
                        onChange={handleQuantityChange}
                        className="w-14 sm:w-16 text-center text-base sm:text-lg font-semibold text-[#101828] border-0 focus:outline-none bg-transparent px-2 py-2.5 sm:py-3"
                        aria-label="Quantidade"
                      />
                      <button
                        onClick={handleIncreaseQuantity}
                        disabled={quantity >= availableStock}
                        className="p-2.5 sm:p-3 hover:bg-emerald-50 active:bg-emerald-100 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-all duration-150 flex items-center justify-center rounded-r-lg"
                        aria-label="Aumentar quantidade"
                      >
                        <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                      </button>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
                      ({availableStock} disponível{availableStock !== 1 ? 'eis' : 'l'})
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Specifications */}
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-[#101828] mb-4">Especificações</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 flex-shrink-0" />
                    <div>
                      <div className="text-xs sm:text-sm text-gray-500">Marca</div>
                      <div className="font-medium text-sm sm:text-base text-[#101828]">{product.brand}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Weight className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 flex-shrink-0" />
                    <div>
                      <div className="text-xs sm:text-sm text-gray-500">Peso</div>
                      <div className="font-medium text-sm sm:text-base text-[#101828]">{product.weight}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 flex-shrink-0" />
                    <div>
                      <div className="text-xs sm:text-sm text-gray-500">Estoque</div>
                      <div className="font-medium text-sm sm:text-base text-[#101828]">{product.stock}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 flex-shrink-0" />
                    <div>
                      <div className="text-xs sm:text-sm text-gray-500">Categoria</div>
                      <div className="font-medium text-sm sm:text-base text-[#101828]">{product.category}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Freight Calculator */}
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-[#101828] mb-4 flex items-center">
                  <Truck className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-emerald-600" />
                  Calcular Frete
                </h3>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      type="text"
                      placeholder="00000-000"
                      value={formatCEP(cep)}
                      onChange={handleCepChange}
                      maxLength={9}
                      className="flex-1 h-10 sm:h-11 text-base"
                    />
                    <Button
                      onClick={handleCalculateFreight}
                      disabled={cep.length !== 8 || isCalculatingFreight}
                      className="bg-emerald-600 hover:bg-[#2E7A5A] text-white h-10 sm:h-11 text-sm sm:text-base font-semibold whitespace-nowrap"
                    >
                      {isCalculatingFreight ? 'Calculando...' : 'Calcular'}
                    </Button>
                  </div>

                  {freightResult && (
                    <div className="mt-4 p-3 sm:p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm sm:text-base text-gray-700 font-medium">Frete:</span>
                          <span className="text-base sm:text-lg font-bold text-emerald-600">
                            R$ {freightResult.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600 pt-2 border-t border-emerald-200">
                          {freightResult.formattedDelivery}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3 sm:space-y-4">
              <Button
                className="w-full bg-emerald-600 hover:bg-[#2E7A5A] text-white py-3 sm:py-4 text-base sm:text-lg font-semibold transition-colors"
                onClick={handlePurchase}
              >
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Comprar Agora
              </Button>


              <Button
                variant="outline"
                className="w-full border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white py-3 sm:py-4 text-base sm:text-lg font-semibold transition-colors"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Adicionar ao Carrinho
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-8 sm:mt-12">
          <Tabs defaultValue="descricao" className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-auto gap-1 sm:gap-0 p-1">
              <TabsTrigger
                value="descricao"
                className="text-[10px] xs:text-xs sm:text-sm md:text-base py-2 sm:py-3 px-1 xs:px-2 sm:px-3 data-[state=active]:bg-white"
              >
                Descrição
              </TabsTrigger>
              <TabsTrigger
                value="especificacoes"
                className="text-[10px] xs:text-xs sm:text-sm md:text-base py-2 sm:py-3 px-1 xs:px-2 sm:px-3 data-[state=active]:bg-white"
              >
                Especificações
              </TabsTrigger>
              <TabsTrigger
                value="avaliacoes"
                className="text-[10px] xs:text-xs sm:text-sm md:text-base py-2 sm:py-3 px-1 xs:px-2 sm:px-3 data-[state=active]:bg-white"
              >
                Avaliações ({reviews.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="descricao" className="mt-4 sm:mt-6">
              <Card className="bg-white border-gray-200 shadow-lg">
                <CardContent className="p-4 sm:p-6 lg:p-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#101828] mb-3 sm:mb-4">Descrição</h2>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="especificacoes" className="mt-4 sm:mt-6">
              <Card className="bg-white border-gray-200 shadow-lg">
                <CardContent className="p-4 sm:p-6 lg:p-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#101828] mb-3 sm:mb-4">Especificações</h2>
                  <div className="space-y-2 sm:space-y-3">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex flex-col sm:flex-row sm:justify-between py-2 sm:py-3 border-b border-gray-100 gap-1 sm:gap-2">
                        <span className="text-xs sm:text-sm text-gray-500 capitalize font-medium">
                          {key.replace(/([A-Z])/g, ' $1').toLowerCase()}:
                        </span>
                        <span className="text-sm sm:text-base font-medium text-[#101828] break-words">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="avaliacoes" className="mt-6">
              <ReviewsSection
                reviews={reviews}
                itemId={productId}
                itemType="product"
                onAddReview={(newReview) => {
                  const review: Review = {
                    ...newReview,
                    id: Date.now().toString(),
                    date: new Date().toISOString().split('T')[0]
                  }
                  setReviews([review, ...reviews])
                }}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* Seller Info */}
        <div className="mt-6 sm:mt-8">
          <SellerInfoCard seller={product.sellerInfo} />
        </div>

        {/* Questions Section */}
        <div className="mt-6 sm:mt-8">
          <Card className="bg-white border-gray-200 shadow-lg">
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <QuestionsSection
                questions={getProductQuestions(product.id)}
                sellerName={product.sellerInfo.name}
              />
            </CardContent>
          </Card>
        </div>

        {/* Location Map Placeholder */}
        <div className="mt-6 sm:mt-8">
          <Card className="bg-white border-gray-200 shadow-lg">
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-[#101828] mb-3 sm:mb-4 flex items-center">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 inline mr-2" />
                Localização do Vendedor
              </h2>
              <div className="bg-gray-50 rounded-lg h-48 sm:h-56 lg:h-64 flex items-center justify-center border border-gray-200">
                <div className="text-center text-gray-600 px-4">
                  <MapPin className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2" />
                  <p className="text-sm sm:text-base">Mapa da localização do vendedor</p>
                  <p className="text-xs sm:text-sm mt-1">{product.city}, {product.location}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function ProductDetailView({ productId, isDashboard = false }: ProductDetailViewProps) {
  if (isDashboard) {
    return (
      <RequireAuth>
        <ProductDetailViewContent productId={productId} isDashboard={isDashboard} />
      </RequireAuth>
    )
  }

  return <ProductDetailViewContent productId={productId} isDashboard={isDashboard} />
}
