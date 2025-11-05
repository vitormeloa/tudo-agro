"use client"

import { useState, use, useEffect } from 'react'
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
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
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

export default function ProdutoPage({ params }: { params: Promise<{ id: string }> }) {
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
  
  const resolvedParams = use(params)
  const productId = resolvedParams.id
  
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
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Produto não encontrado</h1>
            <Link href="/produtos">
              <Button>Voltar para Produtos</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
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
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative">
              <img 
                src={product.images[currentImageIndex]} 
                alt={product.title}
                className="w-full h-96 object-cover rounded-2xl"
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
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge className="bg-[#1C6B3E]">
                  {product.category}
                </Badge>
                {product.featured && (
                  <Badge className="bg-[#D4AF37] text-black">
                    DESTAQUE
                  </Badge>
                )}
              </div>

              {/* Actions */}
              <div className="absolute top-4 right-4 flex gap-2">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={handleToggleFavorite}
                  className={`bg-white/90 hover:bg-white transition-colors ${
                    isFavorite(product.id) ? 'text-red-500' : 'text-[#8B4513] hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="bg-white/90 hover:bg-white text-[#8B4513] hover:text-[#1C6B3E] transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>

              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
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
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>
              
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{product.city}, {product.location}</span>
              </div>

              <div className="flex items-center gap-4 sm:gap-6 mb-6 flex-wrap">
                <div className="text-3xl sm:text-4xl font-bold text-green-600 whitespace-nowrap">
                  R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                
                {/* Quantity Controls */}
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium text-gray-700 whitespace-nowrap hidden sm:block">
                    Quantidade:
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="inline-flex items-center border border-gray-300 rounded-lg bg-white shadow-sm hover:shadow transition-shadow focus-within:ring-2 focus-within:ring-green-500/20 focus-within:border-green-500">
                      <button
                        onClick={handleDecreaseQuantity}
                        disabled={quantity <= 1}
                        className="p-2.5 sm:p-3 hover:bg-green-50 active:bg-green-100 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-all duration-150 flex items-center justify-center rounded-l-lg"
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
                        className="w-14 sm:w-16 text-center text-base sm:text-lg font-semibold text-gray-900 border-0 focus:outline-none bg-transparent px-2 py-2.5 sm:py-3"
                        aria-label="Quantidade"
                      />
                      <button
                        onClick={handleIncreaseQuantity}
                        disabled={quantity >= availableStock}
                        className="p-2.5 sm:p-3 hover:bg-green-50 active:bg-green-100 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-all duration-150 flex items-center justify-center rounded-r-lg"
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
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Especificações</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Award className="w-5 h-5 text-green-600 mr-2" />
                    <div>
                      <div className="text-sm text-gray-500">Marca</div>
                      <div className="font-medium text-gray-900">{product.brand}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Weight className="w-5 h-5 text-green-600 mr-2" />
                    <div>
                      <div className="text-sm text-gray-500">Peso</div>
                      <div className="font-medium text-gray-900">{product.weight}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 text-green-600 mr-2" />
                    <div>
                      <div className="text-sm text-gray-500">Estoque</div>
                      <div className="font-medium text-gray-900">{product.stock}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-green-600 mr-2" />
                    <div>
                      <div className="text-sm text-gray-500">Categoria</div>
                      <div className="font-medium text-gray-900">{product.category}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Freight Calculator */}
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Truck className="w-5 h-5 mr-2 text-green-600" />
                  Calcular Frete
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="00000-000"
                      value={formatCEP(cep)}
                      onChange={handleCepChange}
                      maxLength={9}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleCalculateFreight}
                      disabled={cep.length !== 8 || isCalculatingFreight}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      {isCalculatingFreight ? 'Calculando...' : 'Calcular'}
                    </Button>
                  </div>
                  
                  {freightResult && (
                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 font-medium">Frete:</span>
                          <span className="text-lg font-bold text-green-600">
                            R$ {freightResult.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 pt-2 border-t border-green-200">
                          {freightResult.formattedDelivery}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg transition-all hover:scale-105"
                onClick={handlePurchase}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {quantity > 1 ? `Comprar Agora (${quantity}x) - R$ ${(product.price * quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : 'Comprar Agora'}
              </Button>

              
              <Button 
                variant="outline" 
                className="w-full border-green-600 text-green-600 hover:bg-green-600 hover:text-white py-4 text-lg transition-all hover:scale-105"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                {quantity > 1 ? `Adicionar ao carrinho (${quantity}x) - R$ ${(product.price * quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : 'Adicionar ao carrinho'}
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12">
          <Tabs defaultValue="descricao" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="descricao">Descrição</TabsTrigger>
              <TabsTrigger value="especificacoes">Especificações</TabsTrigger>
              <TabsTrigger value="avaliacoes">
                Avaliações ({reviews.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="descricao" className="mt-6">
              <Card className="bg-white border-gray-200 shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Descrição</h2>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {product.description}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="especificacoes" className="mt-6">
              <Card className="bg-white border-gray-200 shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Especificações</h2>
                  <div className="space-y-3">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500 capitalize font-medium">
                          {key.replace(/([A-Z])/g, ' $1').toLowerCase()}:
                        </span>
                        <span className="font-medium text-gray-900">{value}</span>
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
        <div className="mt-8">
          <SellerInfoCard seller={product.sellerInfo} />
        </div>

        {/* Questions Section */}
        <div className="mt-8">
          <Card className="bg-white border-gray-200 shadow-lg">
            <CardContent className="p-6 sm:p-8">
              <QuestionsSection
                questions={getProductQuestions(product.id)}
                sellerName={product.sellerInfo.name}
              />
            </CardContent>
          </Card>
        </div>

        {/* Location Map Placeholder */}
        <div className="mt-8">
          <Card className="bg-white border-gray-200 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                <MapPin className="w-6 h-6 inline mr-2" />
                Localização do Vendedor
              </h2>
              <div className="bg-gray-50 rounded-lg h-64 flex items-center justify-center border border-gray-200">
                <div className="text-center text-gray-600">
                  <MapPin className="w-12 h-12 mx-auto mb-2" />
                  <p>Mapa da localização do vendedor</p>
                  <p className="text-sm">{product.city}, {product.location}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}
