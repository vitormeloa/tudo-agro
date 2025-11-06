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
  Phone,
  Mail,
  FileText,
  Award,
  Shield,
  Calendar,
  Weight,
  Ruler,
  ChevronLeft,
  ChevronRight,
  Play,
  Plus
} from 'lucide-react'
import { mockAnimals } from '@/lib/mock-animals'
import { useAuth } from '@/hooks/useAuth'
import { useFavorites } from '@/hooks/useFavorites'
import RequireAuth from '@/components/RequireAuth'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ReviewsSection from '@/components/reviews/ReviewsSection'
import SellerInfoCard from '@/components/ui/cards/SellerInfoCard'
import { mockAnimalReviews } from '@/lib/mock-reviews'
import type { Review } from '@/lib/mock-reviews'
import QuestionsSection from '@/components/questions/QuestionsSection'
import { getAnimalQuestions } from '@/lib/mock-questions'
import { calculateSellerLevel, getSellerBadges } from '@/lib/seller-levels'
import { ShoppingBag } from 'lucide-react'

export default function AnimalPage({ params }: { params: Promise<{ id: string }> }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { user, initialized } = useAuth()
  const { isFavorite, toggleFavorite, checkIsFavorite } = useFavorites()
  const router = useRouter()
  
  const [favoriteChecked, setFavoriteChecked] = useState(false)
  const [reviews, setReviews] = useState<Review[]>(mockAnimalReviews)
  
  const resolvedParams = use(params)
  const animalId = resolvedParams.id
  
  // Buscar animal pelo ID (UUID)
  const animal = mockAnimals.find(a => a.id === animalId)
  
  // Verificar se está favoritado quando componente montar
  useEffect(() => {
    if (animal && user && !favoriteChecked) {
      checkIsFavorite(animal.id).then(() => {
        setFavoriteChecked(true)
      })
    }
  }, [animal, user, favoriteChecked, checkIsFavorite])
  
  const handleToggleFavorite = async () => {
    if (!user) {
      // Não redirecionar, apenas mostrar toast através do toggleFavorite
      if (animal) {
        await toggleFavorite(animal.id)
      }
      return
    }
    if (animal) {
      await toggleFavorite(animal.id)
    }
  }

  const handlePurchase = () => {
    if (!user) {
      // Redirecionar para login com redirect para a página interna do dashboard
      router.push(`/login?redirect=${encodeURIComponent(`/dashboard/catalogo/${animalId}`)}`)
      return
    }
    // Se já está logado, ir direto para a página interna do dashboard
    router.push(`/dashboard/catalogo/${animalId}`)
  }
  
  // Se não encontrar, mostrar erro
  if (!animal) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Animal não encontrado</h1>
            <Link href="/catalogo">
              <Button>Voltar para Catálogo</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === animal.images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? animal.images.length - 1 : prev - 1
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-3 sm:space-y-4">
            <div className="relative">
              <img
                src={animal.images[currentImageIndex]}
                alt={animal.title}
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
                  {animal.category}
                </Badge>
                {animal.featured && (
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
                    isFavorite(animal.id) ? 'text-red-500' : 'text-[#8B4513] hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isFavorite(animal.id) ? 'fill-current' : ''}`} />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="bg-white/90 hover:bg-white text-[#8B4513] hover:text-[#1C6B3E] transition-colors p-1.5 sm:p-2 h-auto"
                >
                  <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>

              {/* Image Counter */}
              <div className="absolute bottom-2 sm:bottom-3 lg:bottom-4 right-2 sm:right-3 lg:right-4 bg-black/70 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm">
                {currentImageIndex + 1} / {animal.images.length}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-2 overflow-x-auto">
              {animal.images.map((image, index) => (
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
                    alt={`${animal.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Animal Info */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                {animal.title}
              </h1>

              <div className="flex items-center text-sm sm:text-base text-gray-600 mb-4">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                <span>{animal.city}, {animal.location}</span>
              </div>

              <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-4 sm:mb-6">
                R$ {animal.price.toLocaleString()}
              </div>
            </div>

            {/* Specifications */}
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Especificações</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0" />
                    <div>
                      <div className="text-xs sm:text-sm text-gray-500">Raça</div>
                      <div className="font-medium text-sm sm:text-base text-gray-900">{animal.breed}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0" />
                    <div>
                      <div className="text-xs sm:text-sm text-gray-500">Idade</div>
                      <div className="font-medium text-sm sm:text-base text-gray-900">{animal.age}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Weight className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0" />
                    <div>
                      <div className="text-xs sm:text-sm text-gray-500">Peso</div>
                      <div className="font-medium text-sm sm:text-base text-gray-900">{animal.weight}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Ruler className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0" />
                    <div>
                      <div className="text-xs sm:text-sm text-gray-500">Altura</div>
                      <div className="font-medium text-sm sm:text-base text-gray-900">{animal.height}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Production Details */}
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Detalhes de Produção</h3>
                <div className="space-y-2 sm:space-y-3">
                  {Object.entries(animal.specifications).map(([key, value]) => (
                    <div key={key} className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                      <span className="text-xs sm:text-sm text-gray-500 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').toLowerCase()}:
                      </span>
                      <span className="font-medium text-sm sm:text-base text-gray-900 break-words">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3 sm:space-y-4">
              {animal.type === 'venda' ? (
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 sm:py-4 text-base sm:text-lg font-semibold transition-all hover:scale-105"
                  onClick={handlePurchase}
                >
                  Comprar Agora
                </Button>
              ) : (
                <Link href={`/leilao/${animal.id}`}>
                  <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-3 sm:py-4 text-base sm:text-lg font-semibold transition-all hover:scale-105">
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Participar do Leilão
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-8 sm:mt-12">
          <Tabs defaultValue="descricao" className="w-full">
            <TabsList className="grid w-full grid-cols-4 h-auto gap-1 sm:gap-0 p-1">
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
                value="documentos"
                className="text-[10px] xs:text-xs sm:text-sm md:text-base py-2 sm:py-3 px-1 xs:px-2 sm:px-3 data-[state=active]:bg-white"
              >
                Documentos
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
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Descrição</h2>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                    {animal.description}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="especificacoes" className="mt-4 sm:mt-6">
              <Card className="bg-white border-gray-200 shadow-lg">
                <CardContent className="p-4 sm:p-6 lg:p-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Especificações de Produção</h2>
                  <div className="space-y-2 sm:space-y-3">
                    {Object.entries(animal.specifications).map(([key, value]) => (
                      <div key={key} className="flex flex-col sm:flex-row sm:justify-between py-2 sm:py-3 border-b border-gray-100 gap-1 sm:gap-2">
                        <span className="text-xs sm:text-sm text-gray-500 capitalize font-medium">
                          {key.replace(/([A-Z])/g, ' $1').toLowerCase()}:
                        </span>
                        <span className="text-sm sm:text-base font-medium text-gray-900 break-words">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documentos" className="mt-4 sm:mt-6">
              <Card className="bg-white border-gray-200 shadow-lg">
                <CardContent className="p-4 sm:p-6 lg:p-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center">
                    <FileText className="w-5 h-5 sm:w-6 sm:h-6 inline mr-2 flex-shrink-0" />
                    Documentos Disponíveis
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    {animal.documents.map((doc, index) => (
                      <div key={index} className="flex items-center p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mr-2 sm:mr-3 flex-shrink-0" />
                        <span className="text-sm sm:text-base text-gray-900 break-words">{doc}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="avaliacoes" className="mt-4 sm:mt-6">
              <ReviewsSection
                reviews={reviews}
                itemId={animalId}
                itemType="animal"
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
          <SellerInfoCard seller={animal.seller} />
        </div>

        {/* Questions Section */}
        <div className="mt-6 sm:mt-8">
          <Card className="bg-white border-gray-200 shadow-lg">
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <QuestionsSection
                questions={getAnimalQuestions(animal.id.toString())}
                sellerName={animal.seller.name}
              />
            </CardContent>
          </Card>
        </div>

        {/* Location Map Placeholder */}
        <div className="mt-6 sm:mt-8">
          <Card className="bg-white border-gray-200 shadow-lg">
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 inline mr-2" />
                Localização
              </h2>
              <div className="bg-gray-50 rounded-lg h-48 sm:h-56 lg:h-64 flex items-center justify-center border border-gray-200">
                <div className="text-center text-gray-600 px-4">
                  <MapPin className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2" />
                  <p className="text-sm sm:text-base">Mapa da localização da fazenda</p>
                  <p className="text-xs sm:text-sm mt-1">{animal.city}, {animal.location}</p>
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
