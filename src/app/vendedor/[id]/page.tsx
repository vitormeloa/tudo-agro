"use client"

import { useState, use } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import {
  MapPin,
  Star,
  Shield,
  Award,
  Calendar,
  MessageCircle,
  Phone,
  Mail,
  Users,
  CheckCircle,
  ArrowLeft
} from 'lucide-react'
import { mockAnimals, MockAnimal } from '@/lib/mock-animals'
import { mockProducts, MockProduct } from '@/lib/mock-products'

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

function getSellerById(sellerId: string | number): Seller | null {
  const idNum = typeof sellerId === 'string' ? parseInt(sellerId, 10) : sellerId
  
  const animalWithSeller = mockAnimals.find(a => {
    const animalSellerId = typeof a.seller.id === 'string' ? parseInt(a.seller.id, 10) : a.seller.id
    return animalSellerId === idNum || a.seller.id.toString() === sellerId.toString()
  })
  
  if (animalWithSeller) {
    const sellerAnimals = mockAnimals.filter(a => {
      const animalSellerId = typeof a.seller.id === 'string' ? parseInt(a.seller.id, 10) : a.seller.id
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

  const getInitials = (name: string) => {
    const names = name.trim().split(' ')
    if (names.length === 1) {
      return names[0].substring(0, 2).toUpperCase()
    }
    return (names[0][0] + names[names.length - 1][0]).toUpperCase()
  }

  const getLastActivity = () => {
    const randomDays = Math.floor(Math.random() * 5)

    if (randomDays === 0) return 'Hoje'
    if (randomDays === 1) return 'Ontem'
    return `Há ${randomDays} dias`
  }

  const lastActivityDisplay = getLastActivity()
  const seller = getSellerById(sellerId)
  
  if (!seller) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#101828] mb-4">Vendedor não encontrado</h1>
            <Link href="/">
              <Button className="bg-primary hover:bg-[#2E7A5A]">
                Voltar para Home
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
  
  const sellerAnimals = mockAnimals.filter(a => {
    const animalSellerId = typeof a.seller.id === 'string' ? parseInt(a.seller.id, 10) : a.seller.id
    const idNum = typeof sellerId === 'string' ? parseInt(sellerId, 10) : sellerId
    return animalSellerId === idNum || a.seller.id.toString() === sellerId.toString()
  })
  
  const sellerProducts = mockProducts.filter(p => {
    const productSellerId = typeof p.sellerInfo.id === 'string' ? parseInt(p.sellerInfo.id.toString(), 10) : p.sellerInfo.id
    const idNum = typeof sellerId === 'string' ? parseInt(sellerId, 10) : sellerId
    return productSellerId === idNum || p.sellerInfo.id.toString() === sellerId.toString()
  })

  const mostSoldProduct = sellerProducts.length > 0
    ? sellerProducts[0].title
    : 'N/A'
  
  const activeLots = [...sellerAnimals, ...sellerProducts.map(p => ({
    id: p.id,
    title: p.title,
    category: p.category,
    price: p.price,
    image: p.image,
    type: 'venda' as const,
    featured: p.featured
  }))]
  
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
      
      {}
      <div className="relative h-48 sm:h-56 md:h-64 lg:h-80">
        <img
          src={"/fotos/backgrounds/fundo-perfil-do-vendedor.jpeg"}
          alt={`Capa da ${seller.name}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {}
        <div className="relative -mt-16 sm:-mt-20 mb-6 sm:mb-8">
          <Card className="border-gray-200 shadow-xl">
            <CardContent className="p-4 sm:p-6 lg:p-8">
              {}
              <div className="mb-4 sm:mb-6">
                <Link href="/produtos">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    className="text-gray-600 hover:text-primary hover:bg-primary/5 p-2 text-sm sm:text-base"
                  >
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    <span className="hidden sm:inline">Voltar aos Produtos</span>
                    <span className="sm:hidden">Voltar</span>
                  </Button>
                </Link>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                <div className="relative">
                  <img
                    src={seller.image}
                    alt={seller.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto md:mx-0 rounded-full object-cover border-4 border-white shadow-lg"
                  />

                </div>

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 mb-2">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#101828] sm:mr-4">
                      {seller.name}
                    </h1>

                  </div>

                  <div className="flex items-center text-gray-600 text-sm sm:text-base mb-3">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                    <span>{seller.city}, {seller.location}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 mb-4">
                    <div className="flex items-center sm:mr-6 mb-2 sm:mb-0">
                      <Star className="w-5 h-5 text-yellow-500 fill-current mr-1" />
                      <span className="font-bold text-[#101828] mr-1 text-sm sm:text-base">{seller.rating}</span>
                      <span className="text-gray-600 text-xs sm:text-sm">({seller.totalSales} vendas)</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm sm:text-base">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span className="text-xs sm:text-sm">Membro desde {seller.memberSince}</span>
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm sm:text-base mb-4 max-w-2xl">
                    {seller.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Card className="text-center p-3 sm:p-4 border-gray-200">
            <div className="text-xl sm:text-2xl font-bold text-primary mb-1">
              {sellerProducts.length}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Total de Produtos</div>
          </Card>

          <Card className="text-center p-3 sm:p-4 border-gray-200">
            <div className="text-xl sm:text-2xl font-bold text-primary mb-1">
              {seller.stats.activeLots + 15}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Pedidos Entregues</div>
          </Card>

          <Card className="text-center p-3 sm:p-4 border-gray-200">
            <div className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-primary mb-1 px-1 sm:px-2 line-clamp-2">
              {mostSoldProduct}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Produto mais vendido</div>
          </Card>

          <Card className="text-center p-3 sm:p-4 border-gray-200">
            <div className="text-xl sm:text-2xl font-bold text-primary mb-1">
              {lastActivityDisplay}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Última Atividade</div>
          </Card>
        </div>

        {}
        <div className="mb-6 sm:mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-4 sm:space-x-6 md:space-x-8 overflow-x-auto">
              <button
                onClick={() => setActiveTab('lotes')}
                className={`py-3 sm:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap transition-colors ${
                  activeTab === 'lotes'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-600 hover:text-[#101828] hover:border-gray-300'
                }`}
              >
                Produtos ({seller.stats.activeLots})
              </button>
              <button
                onClick={() => setActiveTab('avaliacoes')}
                className={`py-3 sm:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap transition-colors ${
                  activeTab === 'avaliacoes'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-600 hover:text-[#101828] hover:border-gray-300'
                }`}
              >
                Avaliações ({reviews.length})
              </button>
              <button
                onClick={() => setActiveTab('sobre')}
                className={`py-3 sm:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap transition-colors ${
                  activeTab === 'sobre'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-600 hover:text-[#101828] hover:border-gray-300'
                }`}
              >
                Sobre
              </button>
            </nav>
          </div>
        </div>

        {}
        <div className="mb-8 sm:mb-12">
          {}
          {activeTab === 'lotes' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {activeLots.map((lot) => {
                const isAnimal = sellerAnimals.some(a => a.id === lot.id)
                const detailUrl = isAnimal ? `/catalogo/${lot.id}` : `/produtos/${lot.id}`
                const lotImage = isAnimal
                  ? (lot as MockAnimal).images[0] || 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=500&h=400&fit=crop'
                  : (lot as unknown as MockProduct).image || 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500&h=400&fit=crop'

                return (
                  <Card key={lot.id} className="overflow-hidden hover:shadow-lg transition-shadow border-gray-200">
                    <div className="relative">
                      <img
                        src={lotImage}
                        alt={lot.title}
                        className="w-full h-40 sm:h-48 object-cover"
                      />
                      <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 flex gap-1.5 sm:gap-2">
                        <Badge className="bg-primary text-xs sm:text-sm">
                          {lot.category}
                        </Badge>
                        {lot.type === 'leilao' && (
                          <Badge className="bg-yellow-500 text-black text-xs sm:text-sm">
                            LEILÃO
                          </Badge>
                        )}
                        {lot.featured && (
                          <Badge className="bg-red-500 text-xs sm:text-sm">
                            DESTAQUE
                          </Badge>
                        )}
                      </div>
                    </div>
                    <CardContent className="p-4 sm:p-6">
                      <h3 className="text-base sm:text-lg font-bold text-[#101828] mb-3 line-clamp-2">{lot.title}</h3>

                      <div className="text-xl sm:text-2xl font-bold text-primary mb-4">
                        R$ {lot.price.toLocaleString()}
                      </div>

                      <Link href={detailUrl}>
                        <Button className="w-full bg-primary hover:bg-[#2E7A5A] transition-colors text-sm sm:text-base">
                          Ver Detalhes
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}

          {}
          {activeTab === 'avaliacoes' && (
            <div className="space-y-4 sm:space-y-6">
              {reviews.map((review) => (
                <Card key={review.id} className="border-gray-200">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex gap-3 sm:gap-4">
                      {}
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-primary font-semibold text-base sm:text-lg">
                            {getInitials(review.buyer)}
                          </span>
                        </div>
                      </div>

                      {}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 sm:mb-4 gap-2 sm:gap-4">
                          <div className="flex-1">
                            <div className="font-bold text-sm sm:text-base text-[#101828] mb-1">{review.buyer}</div>
                            <div className="text-xs sm:text-sm text-gray-600 break-words">
                              Comprou: {review.purchase}
                            </div>
                          </div>
                          <div className="flex flex-row sm:flex-col sm:text-right gap-2 sm:gap-0">
                            <div className="flex items-center mb-0 sm:mb-1">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-current" />
                              ))}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600">
                              {new Date(review.date).toLocaleDateString('pt-BR')}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm sm:text-base text-gray-700 break-words">{review.comment}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {}
          {activeTab === 'sobre' && (
            <div className="space-y-6 sm:space-y-8">
              <Card className="border-gray-200">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-[#101828] mb-4">
                    Resumo de Atuação do Vendedor
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm sm:text-base">
                    <li>Ativo na plataforma por +6 meses</li>
                    <li>Total de vendas ({seller.totalSales} vendas concluídas)</li>
                    <li>Categoria principal ({seller.specialties[0] || 'Não informada'})</li>
                    <li>Prazo médio de envio (1 a 3 dias úteis)</li>
                    <li>0 reclamações abertas nos últimos 60 dias</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-gray-200">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-[#101828] mb-4">
                    Categorias em que atua:
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm sm:text-base">
                    {seller.specialties.map((specialty, index) => (
                      <li key={index}>{specialty}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-gray-200">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-[#101828] mb-4">
                    Top 3 Produtos mais vendidos
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm sm:text-base">
                    <li>Ração Premium Leiteiro</li>
                    <li>Suplemento Mineral Nutri+</li>
                    <li>Balde com tampa reforçada</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
