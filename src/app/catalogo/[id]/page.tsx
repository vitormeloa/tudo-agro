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

export default function AnimalPage({ params }: { params: Promise<{ id: string }> }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { user, initialized } = useAuth()
  const { isFavorite, toggleFavorite, checkIsFavorite } = useFavorites()
  const router = useRouter()
  
  const [favoriteChecked, setFavoriteChecked] = useState(false)
  
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
      router.push(`/login?redirect=${encodeURIComponent(`/catalogo/${animalId}`)}`)
      return
    }
    if (animal) {
      await toggleFavorite(animal.id)
    }
  }

  const handlePurchase = () => {
    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent(`/dashboard/catalogo/${animalId}`)}`)
      return
    }
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={animal.images[currentImageIndex]} 
                alt={animal.title}
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
                  {animal.category}
                </Badge>
                {animal.featured && (
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
                    isFavorite(animal.id) ? 'text-red-500' : 'text-[#8B4513] hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorite(animal.id) ? 'fill-current' : ''}`} />
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
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {animal.title}
              </h1>
              
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{animal.city}, {animal.location}</span>
              </div>

              <div className="text-4xl font-bold text-green-600 mb-6">
                R$ {animal.price.toLocaleString()}
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
                      <div className="text-sm text-gray-500">Raça</div>
                      <div className="font-medium text-gray-900">{animal.breed}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-green-600 mr-2" />
                    <div>
                      <div className="text-sm text-gray-500">Idade</div>
                      <div className="font-medium text-gray-900">{animal.age}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Weight className="w-5 h-5 text-green-600 mr-2" />
                    <div>
                      <div className="text-sm text-gray-500">Peso</div>
                      <div className="font-medium text-gray-900">{animal.weight}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Ruler className="w-5 h-5 text-green-600 mr-2" />
                    <div>
                      <div className="text-sm text-gray-500">Altura</div>
                      <div className="font-medium text-gray-900">{animal.height}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Production Details */}
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Detalhes de Produção</h3>
                <div className="space-y-3">
                  {Object.entries(animal.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-500 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').toLowerCase()}:
                      </span>
                      <span className="font-medium text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-4">
              {animal.type === 'venda' ? (
                <RequireAuth 
                  action="comprar este animal"
                  redirectTo={`/dashboard/catalogo/${animalId}`}
                  showDialog={false}
                >
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg transition-all hover:scale-105"
                    onClick={handlePurchase}
                  >
                    Comprar Agora
                  </Button>
                </RequireAuth>
              ) : (
                <RequireAuth 
                  action="participar do leilão"
                  redirectTo={`/dashboard/leilao/${animal.id}`}
                  showDialog={false}
                >
                  <Link href={`/dashboard/leilao/${animal.id}`}>
                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-4 text-lg transition-all hover:scale-105">
                      <Play className="w-5 h-5 mr-2" />
                      Participar do Leilão
                    </Button>
                  </Link>
                </RequireAuth>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-12">
          <Card className="bg-white border-gray-200 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Descrição</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {animal.description}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Documents */}
        <div className="mt-8">
          <Card className="bg-white border-gray-200 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                <FileText className="w-6 h-6 inline mr-2" />
                Documentos Disponíveis
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {animal.documents.map((doc, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <Shield className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-gray-900">{doc}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Seller Info */}
        <div className="mt-8">
          <Card className="bg-white border-gray-200 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Vendedor</h2>
              <div className="flex items-start space-x-6">
                <div className="relative">
                  <img 
                    src={animal.seller.image} 
                    alt={animal.seller.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  {animal.seller.verified && (
                    <div className="absolute -top-2 -right-2 bg-green-600 text-white p-1 rounded-full">
                      <Shield className="w-4 h-4" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3 className="text-xl font-bold text-gray-900 mr-3">
                      {animal.seller.name}
                    </h3>
                    {animal.seller.verified && (
                      <Badge className="bg-green-600 text-white">VERIFICADO</Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{animal.seller.location}</span>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                    <span className="font-medium text-gray-900 mr-2">{animal.seller.rating}</span>
                    <span className="text-gray-500">
                      ({animal.seller.totalSales} vendas • Membro desde {animal.seller.memberSince})
                    </span>
                  </div>
                  
                  <div className="flex gap-3">
                    <Link href={`/vendedor/${animal.seller.id}`}>
                      <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                        Ver Perfil Completo
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Location Map Placeholder */}
        <div className="mt-8">
          <Card className="bg-white border-gray-200 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                <MapPin className="w-6 h-6 inline mr-2" />
                Localização
              </h2>
              <div className="bg-gray-50 rounded-lg h-64 flex items-center justify-center border border-gray-200">
                <div className="text-center text-gray-600">
                  <MapPin className="w-12 h-12 mx-auto mb-2" />
                  <p>Mapa da localização da fazenda</p>
                  <p className="text-sm">{animal.city}, {animal.location}</p>
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
