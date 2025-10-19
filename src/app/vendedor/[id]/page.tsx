"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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

export default function VendedorPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState('lotes')

  // Dados mockados do vendedor
  const seller = {
    id: params.id,
    name: "Fazenda São Bento",
    description: "Fazenda familiar especializada em gado Nelore e Angus, com mais de 30 anos de tradição na pecuária de qualidade.",
    location: "Goiás",
    city: "Goiânia",
    rating: 4.9,
    totalSales: 156,
    memberSince: "2020",
    verified: true,
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=200&h=200&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&h=400&fit=crop",
    stats: {
      totalAnimals: 245,
      activeLots: 12,
      completedAuctions: 8,
      averagePrice: 15500
    },
    specialties: ["Gado Nelore", "Gado Angus", "Reprodutores", "Genética Premium"],
    certifications: [
      "Certificação ABCZ",
      "Registro Genealógico",
      "Programa de Melhoramento Genético",
      "Certificação Sanitária"
    ],
    contact: {
      phone: "(62) 99999-9999",
      email: "contato@fazendaSaobento.com.br",
      website: "www.fazendaSaobento.com.br"
    }
  }

  // Lotes ativos mockados
  const activeLots = [
    {
      id: 1,
      title: "Touro Nelore PO Reprodutor",
      category: "Gado de Corte",
      price: 45000,
      image: "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=400&h=300&fit=crop",
      type: "venda",
      featured: true
    },
    {
      id: 2,
      title: "Vaca Angus Prenha",
      category: "Gado de Corte", 
      price: 8500,
      image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=300&fit=crop",
      type: "leilao",
      featured: false
    },
    {
      id: 3,
      title: "Novilho Nelore 18 meses",
      category: "Gado de Corte",
      price: 3200,
      image: "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=400&h=300&fit=crop",
      type: "venda",
      featured: false
    }
  ]

  // Avaliações mockadas
  const reviews = [
    {
      id: 1,
      buyer: "João Silva",
      rating: 5,
      comment: "Excelente vendedor! Animal chegou exatamente como descrito. Recomendo!",
      date: "2024-01-10",
      purchase: "Touro Nelore PO"
    },
    {
      id: 2,
      buyer: "Maria Santos",
      rating: 5,
      comment: "Fazenda muito séria, documentação completa e animal de ótima qualidade.",
      date: "2024-01-05",
      purchase: "Vaca Angus"
    },
    {
      id: 3,
      buyer: "Carlos Oliveira",
      rating: 4,
      comment: "Boa experiência de compra. Entrega no prazo combinado.",
      date: "2023-12-28",
      purchase: "Novilho Nelore"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F5DC] to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/catalogo" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                <ArrowLeft className="w-5 h-5 text-[#8B4513]" />
                <span className="text-[#8B4513] font-medium">Voltar</span>
              </Link>
            </div>

            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-[#1C6B3E] to-[#228B22] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold text-[#8B4513]">TudoAgro</span>
            </Link>

            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost" className="text-[#8B4513] hover:text-[#1C6B3E] hover:bg-[#F5F5DC]">
                  Entrar
                </Button>
              </Link>
              <Link href="/cadastro">
                <Button className="bg-[#1C6B3E] hover:bg-[#228B22]">
                  Cadastrar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      <div className="relative h-64 md:h-80">
        <img 
          src={seller.coverImage} 
          alt={`Capa da ${seller.name}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="relative -mt-20 mb-8">
          <Card className="border-[#D4AF37]/20 shadow-xl">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                <div className="relative">
                  <img 
                    src={seller.image} 
                    alt={seller.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  {seller.verified && (
                    <div className="absolute -bottom-2 -right-2 bg-[#1C6B3E] text-white p-2 rounded-full">
                      <Shield className="w-6 h-6" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h1 className="text-3xl font-bold text-[#8B4513] mr-4">
                      {seller.name}
                    </h1>
                    {seller.verified && (
                      <Badge className="bg-[#1C6B3E]">
                        <Shield className="w-4 h-4 mr-1" />
                        VERIFICADO
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center text-[#8B4513]/70 mb-3">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{seller.city}, {seller.location}</span>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex items-center mr-6">
                      <Star className="w-5 h-5 text-[#D4AF37] fill-current mr-1" />
                      <span className="font-bold text-[#8B4513] mr-1">{seller.rating}</span>
                      <span className="text-[#8B4513]/70">({seller.totalSales} vendas)</span>
                    </div>
                    <div className="flex items-center text-[#8B4513]/70">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>Membro desde {seller.memberSince}</span>
                    </div>
                  </div>
                  
                  <p className="text-[#8B4513]/80 mb-4 max-w-2xl">
                    {seller.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-3">
                    <Button className="bg-[#25D366] hover:bg-[#20BA5A] text-white">
                      <Phone className="w-4 h-4 mr-2" />
                      WhatsApp
                    </Button>
                    <Button variant="outline" className="border-[#1C6B3E] text-[#1C6B3E] hover:bg-[#1C6B3E] hover:text-white">
                      <Mail className="w-4 h-4 mr-2" />
                      E-mail
                    </Button>
                    <Button variant="outline" className="border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-white">
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
          <Card className="text-center p-4 border-[#D4AF37]/20 hover:shadow-lg transition-all">
            <div className="text-2xl font-bold text-[#1C6B3E] mb-1">
              {seller.stats.totalAnimals}
            </div>
            <div className="text-sm text-[#8B4513]">Total de Animais</div>
          </Card>
          
          <Card className="text-center p-4 border-[#D4AF37]/20 hover:shadow-lg transition-all">
            <div className="text-2xl font-bold text-[#1C6B3E] mb-1">
              {seller.stats.activeLots}
            </div>
            <div className="text-sm text-[#8B4513]">Lotes Ativos</div>
          </Card>
          
          <Card className="text-center p-4 border-[#D4AF37]/20 hover:shadow-lg transition-all">
            <div className="text-2xl font-bold text-[#1C6B3E] mb-1">
              {seller.stats.completedAuctions}
            </div>
            <div className="text-sm text-[#8B4513]">Leilões Realizados</div>
          </Card>
          
          <Card className="text-center p-4 border-[#D4AF37]/20 hover:shadow-lg transition-all">
            <div className="text-2xl font-bold text-[#1C6B3E] mb-1">
              R$ {seller.stats.averagePrice.toLocaleString()}
            </div>
            <div className="text-sm text-[#8B4513]">Preço Médio</div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-[#D4AF37]/20">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('lotes')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'lotes'
                    ? 'border-[#1C6B3E] text-[#1C6B3E]'
                    : 'border-transparent text-[#8B4513]/70 hover:text-[#8B4513] hover:border-[#D4AF37]'
                }`}
              >
                Lotes Ativos ({seller.stats.activeLots})
              </button>
              <button
                onClick={() => setActiveTab('avaliacoes')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'avaliacoes'
                    ? 'border-[#1C6B3E] text-[#1C6B3E]'
                    : 'border-transparent text-[#8B4513]/70 hover:text-[#8B4513] hover:border-[#D4AF37]'
                }`}
              >
                Avaliações ({reviews.length})
              </button>
              <button
                onClick={() => setActiveTab('sobre')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'sobre'
                    ? 'border-[#1C6B3E] text-[#1C6B3E]'
                    : 'border-transparent text-[#8B4513]/70 hover:text-[#8B4513] hover:border-[#D4AF37]'
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
              {activeLots.map((lot) => (
                <Card key={lot.id} className="overflow-hidden hover:shadow-xl transition-all group hover:scale-105 border-[#D4AF37]/20">
                  <div className="relative">
                    <img 
                      src={lot.image} 
                      alt={lot.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      <Badge className="bg-[#1C6B3E]">
                        {lot.category}
                      </Badge>
                      {lot.type === 'leilao' && (
                        <Badge className="bg-[#D4AF37] text-black">
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
                    <h3 className="text-lg font-bold text-[#8B4513] mb-3">{lot.title}</h3>
                    
                    <div className="text-2xl font-bold text-[#1C6B3E] mb-4">
                      R$ {lot.price.toLocaleString()}
                    </div>

                    <Link href={`/produto/${lot.id}`}>
                      <Button className="w-full bg-[#1C6B3E] hover:bg-[#228B22] transition-all hover:scale-105">
                        Ver Detalhes
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Avaliações */}
          {activeTab === 'avaliacoes' && (
            <div className="space-y-6">
              {reviews.map((review) => (
                <Card key={review.id} className="border-[#D4AF37]/20">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="font-bold text-[#8B4513] mb-1">{review.buyer}</div>
                        <div className="text-sm text-[#8B4513]/70">
                          Comprou: {review.purchase}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center mb-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-[#D4AF37] fill-current" />
                          ))}
                        </div>
                        <div className="text-sm text-[#8B4513]/70">
                          {new Date(review.date).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    </div>
                    <p className="text-[#8B4513]/80">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Sobre */}
          {activeTab === 'sobre' && (
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <Card className="border-[#D4AF37]/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-[#8B4513] mb-4">
                      <Award className="w-6 h-6 inline mr-2" />
                      Especialidades
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {seller.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline" className="border-[#1C6B3E] text-[#1C6B3E]">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-[#D4AF37]/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-[#8B4513] mb-4">
                      <CheckCircle className="w-6 h-6 inline mr-2" />
                      Certificações
                    </h3>
                    <div className="space-y-2">
                      {seller.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center text-[#8B4513]">
                          <CheckCircle className="w-4 h-4 text-[#1C6B3E] mr-2" />
                          <span>{cert}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="border-[#D4AF37]/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-[#8B4513] mb-4">
                      Informações de Contato
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 text-[#1C6B3E] mr-3" />
                        <span className="text-[#8B4513]">{seller.contact.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 text-[#1C6B3E] mr-3" />
                        <span className="text-[#8B4513]">{seller.contact.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-[#1C6B3E] mr-3" />
                        <span className="text-[#8B4513]">{seller.contact.website}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}