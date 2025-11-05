"use client"

import { useState, use } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { 
  ArrowLeft,
  MapPin, 
  Star, 
  Shield,
  Award,
  Calendar,
  TrendingUp,
  MessageCircle,
  Phone,
  Mail,
  Users,
  Gavel,
  CheckCircle
} from 'lucide-react'
import { mockAnimals } from '@/lib/mock-animals'
import { mockProducts } from '@/lib/mock-products'

interface Seller {
  id: string | number
  name: string
  description: string
  location: string
  city: string
  rating: number
  totalSales: number
  memberSince: string
  verified: boolean
  image: string
  coverImage?: string
  stats: {
    totalAnimals: number
    activeLots: number
    completedAuctions: number
    averagePrice: number
  }
  specialties: string[]
  certifications: string[]
  contact: {
    phone: string
    email: string
    website: string
  }
}

// Função para buscar vendedor por ID
function getSellerById(sellerId: string | number): Seller | null {
  // Converter ID para número se possível
  const idNum = typeof sellerId === 'string' ? parseInt(sellerId, 10) : sellerId
  
  // Buscar em animais
  const animalWithSeller = mockAnimals.find(a => {
    const animalSellerId = typeof a.seller.id === 'string' ? parseInt(a.seller.id.toString(), 10) : a.seller.id
    return animalSellerId === idNum || a.seller.id.toString() === sellerId.toString()
  })
  
  if (animalWithSeller) {
    const sellerAnimals = mockAnimals.filter(a => {
      const animalSellerId = typeof a.seller.id === 'string' ? parseInt(a.seller.id.toString(), 10) : a.seller.id
      return animalSellerId === idNum || a.seller.id.toString() === sellerId.toString()
    })
    
    const sellerProducts = mockProducts.filter(p => {
      const productSellerId = typeof p.sellerInfo.id === 'string' ? parseInt(p.sellerInfo.id.toString(), 10) : p.sellerInfo.id
      return productSellerId === idNum || p.sellerInfo.id.toString() === sellerId.toString()
    })
    
    const totalAnimals = sellerAnimals.length
    const totalProducts = sellerProducts.length
    const activeLots = sellerAnimals.filter(a => a.type === 'venda').length
    const completedAuctions = sellerAnimals.filter(a => a.type === 'leilao').length
    const averagePrice = sellerAnimals.length > 0 
      ? Math.round(sellerAnimals.reduce((sum, a) => sum + a.price, 0) / sellerAnimals.length)
      : 0
    
    // Extrair cidade e estado da location
    const locationParts = animalWithSeller.seller.location.split(',')
    const city = locationParts[0]?.trim() || animalWithSeller.city
    const location = locationParts[1]?.trim() || animalWithSeller.location
    
    return {
      id: animalWithSeller.seller.id,
      name: animalWithSeller.seller.name,
      description: `Especialista em ${animalWithSeller.category.toLowerCase()} com mais de ${animalWithSeller.seller.totalSales} vendas realizadas. Comprometido com qualidade e satisfação dos clientes.`,
      location: location || animalWithSeller.location,
      city: city || animalWithSeller.city,
      rating: animalWithSeller.seller.rating,
      totalSales: animalWithSeller.seller.totalSales,
      memberSince: animalWithSeller.seller.memberSince,
      verified: animalWithSeller.seller.verified,
      image: animalWithSeller.seller.image,
      coverImage: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&h=400&fit=crop",
      stats: {
        totalAnimals,
        activeLots,
        completedAuctions,
        averagePrice
      },
      specialties: [...new Set(sellerAnimals.map(a => a.category))],
      certifications: [
        "Certificação ABCZ",
        "Registro Genealógico",
        "Programa de Melhoramento Genético",
        "Certificação Sanitária"
      ],
      contact: {
        phone: "(62) 99999-9999",
        email: `contato@${animalWithSeller.seller.name.toLowerCase().replace(/\s+/g, '')}.com.br`,
        website: `www.${animalWithSeller.seller.name.toLowerCase().replace(/\s+/g, '')}.com.br`
      }
    }
  }
  
  // Buscar em produtos
  const productWithSeller = mockProducts.find(p => {
    const productSellerId = typeof p.sellerInfo.id === 'string' ? parseInt(p.sellerInfo.id.toString(), 10) : p.sellerInfo.id
    return productSellerId === idNum || p.sellerInfo.id.toString() === sellerId.toString()
  })
  
  if (productWithSeller) {
    const sellerProducts = mockProducts.filter(p => {
      const productSellerId = typeof p.sellerInfo.id === 'string' ? parseInt(p.sellerInfo.id.toString(), 10) : p.sellerInfo.id
      return productSellerId === idNum || p.sellerInfo.id.toString() === sellerId.toString()
    })
    
    const locationParts = productWithSeller.sellerInfo.location.split(',')
    const city = locationParts[0]?.trim() || productWithSeller.city
    const location = locationParts[1]?.trim() || productWithSeller.location
    
    return {
      id: productWithSeller.sellerInfo.id,
      name: productWithSeller.sellerInfo.name,
      description: `Especialista em produtos agropecuários com mais de ${productWithSeller.sellerInfo.totalSales} vendas realizadas. Comprometido com qualidade e satisfação dos clientes.`,
      location: location || productWithSeller.location,
      city: city || productWithSeller.city,
      rating: productWithSeller.sellerInfo.rating,
      totalSales: productWithSeller.sellerInfo.totalSales,
      memberSince: productWithSeller.sellerInfo.memberSince,
      verified: productWithSeller.sellerInfo.verified,
      image: productWithSeller.sellerInfo.image,
      coverImage: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&h=400&fit=crop",
      stats: {
        totalAnimals: 0,
        activeLots: sellerProducts.length,
        completedAuctions: 0,
        averagePrice: Math.round(sellerProducts.reduce((sum, p) => sum + p.price, 0) / sellerProducts.length)
      },
      specialties: [...new Set(sellerProducts.map(p => p.category))],
      certifications: [
        "Certificação de Qualidade",
        "Registro no MAPA",
        "Garantia de Origem"
      ],
      contact: {
        phone: "(62) 99999-9999",
        email: `contato@${productWithSeller.sellerInfo.name.toLowerCase().replace(/\s+/g, '')}.com.br`,
        website: `www.${productWithSeller.sellerInfo.name.toLowerCase().replace(/\s+/g, '')}.com.br`
      }
    }
  }
  
  return null
}

export default function VendedorPage({ params }: { params: Promise<{ id: string }> }) {
  const [activeTab, setActiveTab] = useState('lotes')
  
  const resolvedParams = use(params)
  const sellerId = resolvedParams.id
  
  // Buscar vendedor pelo ID
  const seller = getSellerById(sellerId)
  
  // Se não encontrar vendedor, mostrar erro
  if (!seller) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Vendedor não encontrado</h1>
            <Link href="/">
              <Button className="bg-green-600 hover:bg-green-700">
                Voltar para Home
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
  
  // Buscar produtos e animais do vendedor
  const sellerAnimals = mockAnimals.filter(a => {
    const animalSellerId = typeof a.seller.id === 'string' ? parseInt(a.seller.id.toString(), 10) : a.seller.id
    const idNum = typeof sellerId === 'string' ? parseInt(sellerId, 10) : sellerId
    return animalSellerId === idNum || a.seller.id.toString() === sellerId.toString()
  })
  
  const sellerProducts = mockProducts.filter(p => {
    const productSellerId = typeof p.sellerInfo.id === 'string' ? parseInt(p.sellerInfo.id.toString(), 10) : p.sellerInfo.id
    const idNum = typeof sellerId === 'string' ? parseInt(sellerId, 10) : sellerId
    return productSellerId === idNum || p.sellerInfo.id.toString() === sellerId.toString()
  })
  
  const activeLots = [...sellerAnimals, ...sellerProducts.map(p => ({
    id: p.id,
    title: p.title,
    category: p.category,
    price: p.price,
    image: p.image,
    type: 'venda' as const,
    featured: p.featured
  }))]
  
  // Avaliações mockadas
  const reviews = [
    {
      id: 1,
      buyer: "João Silva",
      rating: 5,
      comment: "Excelente vendedor! Produto chegou exatamente como descrito. Recomendo!",
      date: "2024-01-10",
      purchase: activeLots[0]?.title || "Produto"
    },
    {
      id: 2,
      buyer: "Maria Santos",
      rating: 5,
      comment: "Vendedor muito sério, documentação completa e produto de ótima qualidade.",
      date: "2024-01-05",
      purchase: activeLots[1]?.title || "Produto"
    },
    {
      id: 3,
      buyer: "Carlos Oliveira",
      rating: 4,
      comment: "Boa experiência de compra. Entrega no prazo combinado.",
      date: "2023-12-28",
      purchase: activeLots[2]?.title || "Produto"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Cover Image */}
      <div className="relative h-64 md:h-80">
        <img 
          src={seller.coverImage || "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&h=400&fit=crop"} 
          alt={`Capa da ${seller.name}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="relative -mt-20 mb-8">
          <Card className="border-gray-200 shadow-xl">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                <div className="relative">
                  <img 
                    src={seller.image} 
                    alt={seller.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  {seller.verified && (
                    <div className="absolute -bottom-2 -right-2 bg-green-600 text-white p-2 rounded-full">
                      <Shield className="w-6 h-6" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h1 className="text-3xl font-bold text-gray-900 mr-4">
                      {seller.name}
                    </h1>
                    {seller.verified && (
                      <Badge className="bg-green-600 text-white">
                        <Shield className="w-4 h-4 mr-1" />
                        VERIFICADO
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{seller.city}, {seller.location}</span>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex items-center mr-6">
                      <Star className="w-5 h-5 text-yellow-500 fill-current mr-1" />
                      <span className="font-bold text-gray-900 mr-1">{seller.rating}</span>
                      <span className="text-gray-600">({seller.totalSales} vendas)</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>Membro desde {seller.memberSince}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4 max-w-2xl">
                    {seller.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-3">
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                      <Phone className="w-4 h-4 mr-2" />
                      WhatsApp
                    </Button>
                    <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                      <Mail className="w-4 h-4 mr-2" />
                      E-mail
                    </Button>
                    <Button variant="outline" className="border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center p-4 border-gray-200 hover:shadow-lg transition-all">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {seller.stats.totalAnimals + sellerProducts.length}
            </div>
            <div className="text-sm text-gray-600">Total de Itens</div>
          </Card>
          
          <Card className="text-center p-4 border-gray-200 hover:shadow-lg transition-all">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {seller.stats.activeLots}
            </div>
            <div className="text-sm text-gray-600">Lotes Ativos</div>
          </Card>
          
          <Card className="text-center p-4 border-gray-200 hover:shadow-lg transition-all">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {seller.stats.completedAuctions}
            </div>
            <div className="text-sm text-gray-600">Leilões Realizados</div>
          </Card>
          
          <Card className="text-center p-4 border-gray-200 hover:shadow-lg transition-all">
            <div className="text-2xl font-bold text-green-600 mb-1">
              R$ {seller.stats.averagePrice.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Preço Médio</div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('lotes')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'lotes'
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                Lotes Ativos ({seller.stats.activeLots})
              </button>
              <button
                onClick={() => setActiveTab('avaliacoes')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'avaliacoes'
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                Avaliações ({reviews.length})
              </button>
              <button
                onClick={() => setActiveTab('sobre')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'sobre'
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                Sobre
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mb-12">
          {/* Lotes Ativos */}
          {activeTab === 'lotes' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeLots.map((lot) => {
                const isAnimal = sellerAnimals.some(a => a.id === lot.id)
                const detailUrl = isAnimal ? `/catalogo/${lot.id}` : `/produtos/${lot.id}`
                
                return (
                  <Card key={lot.id} className="overflow-hidden hover:shadow-xl transition-all group hover:scale-105 border-gray-200">
                    <div className="relative">
                      <img 
                        src={lot.image} 
                        alt={lot.title}
                        className="w-full h-48 object-cover group-hover:scale-100 transition-transform duration-300"
                      />
                      <div className="absolute bottom-4 left-4 flex gap-2">
                        <Badge className="bg-green-600">
                          {lot.category}
                        </Badge>
                        {lot.type === 'leilao' && (
                          <Badge className="bg-yellow-500 text-black">
                            LEILÃO
                          </Badge>
                        )}
                        {lot.featured && (
                          <Badge className="bg-red-500">
                            DESTAQUE
                          </Badge>
                        )}
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-3">{lot.title}</h3>
                      
                      <div className="text-2xl font-bold text-green-600 mb-4">
                        R$ {lot.price.toLocaleString()}
                      </div>

                      <Link href={detailUrl}>
                        <Button className="w-full bg-green-600 hover:bg-green-700 transition-all hover:scale-105">
                          Ver Detalhes
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}

          {/* Avaliações */}
          {activeTab === 'avaliacoes' && (
            <div className="space-y-6">
              {reviews.map((review) => (
                <Card key={review.id} className="border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="font-bold text-gray-900 mb-1">{review.buyer}</div>
                        <div className="text-sm text-gray-600">
                          Comprou: {review.purchase}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center mb-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                          ))}
                        </div>
                        <div className="text-sm text-gray-600">
                          {new Date(review.date).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Sobre */}
          {activeTab === 'sobre' && (
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <Card className="border-gray-200">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      <Award className="w-6 h-6 inline mr-2 text-green-600" />
                      Especialidades
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {seller.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline" className="border-green-600 text-green-600">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-gray-200">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      <CheckCircle className="w-6 h-6 inline mr-2 text-green-600" />
                      Certificações
                    </h3>
                    <div className="space-y-2">
                      {seller.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                          <span>{cert}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="border-gray-200">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Informações de Contato
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 text-green-600 mr-3" />
                        <span className="text-gray-700">{seller.contact.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 text-green-600 mr-3" />
                        <span className="text-gray-700">{seller.contact.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-green-600 mr-3" />
                        <span className="text-gray-700">{seller.contact.website}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
