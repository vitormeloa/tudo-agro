"use client"

import { useState, use } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft,
  MapPin, 
  Star, 
  Heart, 
  Share2,
  MessageCircle,
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
  ShoppingCart
} from 'lucide-react'

export default function ProdutoPage({ params }: { params: Promise<{ id: string }> }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  
  const resolvedParams = use(params)

  // Dados mockados do produto
  const product = {
    id: resolvedParams.id,
    title: "Cachaça Haras Eduardo Costa 600ml",
    category: "Bebidas",
    brand: "Eduardo Costa",
    weight: "600ml",
    stock: "Em estoque",
    price: 45.90,
    location: "São Paulo",
    city: "São Paulo",
    description: "A Cachaça Haras Eduardo Costa 600ml é uma bebida sofisticada envelhecida em tonéis de Amburana, típica da região de Minas Gerais. Com graduação alcoólica de 42%, seu aroma é complexo e intenso, com notas adocicadas e amadeiradas, além de nuances de baunilha, canela e cravo. O sabor é suave e equilibrado, com um toque adocicado e amadeirado característico da amburana. A coloração dourada clara é adquirida durante o processo de envelhecimento e a finalização é suave e persistente, com um sabor levemente picante e amadeirado que permanece na boca. A Cachaça Haras Eduardo Costa é uma bebida que combina a tradição e o savoir-faire da produção de cachaças artesanais de qualidade com o sabor e o aroma únicos conferidos pela madeira de Amburana.\n" +
        "\n" +
        "Além disso, é importante destacar que a Cachaça Haras Eduardo Costa envelhecida em amburana é de uma qualidade excepcional, tendo sido adormecida por oito anos para alcançar um sabor e aroma únicos e complexos. O fundador da marca, Eduardo Costa, tinha como exigência fornecer ao seu público uma cachaça de excelente qualidade e preço acessível, e por isso investiu em técnicas de produção e escolha de ingredientes que garantissem a excelência da bebida. Com essa combinação de know-how, ingredientes selecionados e tempo de envelhecimento, a Cachaça Haras Eduardo Costa envelhecida em amburana é uma opção ideal para quem aprecia uma cachaça de alta qualidade e sabor incomparável.",
    images: [
      "/fotos/produtos/cachaca-edu.webp",
      "/fotos/produtos/cachaca-edu-sem-fundo.webp",
    ],
    seller: {
      id: 1,
      name: "Eduardo Costa",
      location: "São Paulo, SP",
      rating: 4.8,
      totalSales: 124,
      memberSince: "2025",
      verified: true,
      image: "/fotos/sobre/edu-secao-nossa.jpeg"
    },
    specifications: {
      protein: "18%",
      fiber: "12%",
      calcium: "0.8%",
      phosphorus: "0.6%",
      energy: "2.8 Mcal/kg"
    },
    documents: [
      "Certificado de qualidade",
      "Análise nutricional",
      "Registro no MAPA",
      "Garantia de origem",
      "Manual de uso"
    ],
    type: "venda", // ou "leilao"
    featured: true
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
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/produtos" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
                <span className="text-gray-600 font-medium">Voltar aos Produtos</span>
              </Link>
            </div>

            <Link href="/" className="flex items-center space-x-2">
              <img 
                src="/fotos/tudo-agro-logo.png"
                className="h-14 w-auto sm:h-18 md:h-22 lg:h-26"
                alt="TudoAgro Logo"
              />
            </Link>

            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost" className="text-gray-600 hover:text-green-600 hover:bg-gray-50">
                  Entrar
                </Button>
              </Link>
              <Link href="/cadastro">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  Cadastrar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

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
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`bg-white/90 hover:bg-white transition-colors ${
                    isFavorite ? 'text-red-500' : 'text-[#8B4513] hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
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

              <div className="text-4xl font-bold text-green-600 mb-6">
                R$ {product.price.toLocaleString()}
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

            {/* Nutritional Details */}
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Composição Nutricional</h3>
                <div className="space-y-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
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
              {product.type === 'venda' ? (
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg transition-all hover:scale-105">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Comprar Agora
                </Button>
              ) : (
                <Link href={`/leilao/${product.id}`}>
                  <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-4 text-lg transition-all hover:scale-105">
                    <Play className="w-5 h-5 mr-2" />
                    Participar do Leilão
                  </Button>
                </Link>
              )}
              
              <Button 
                variant="outline" 
                className="w-full border-green-600 text-green-600 hover:bg-green-600 hover:text-white py-4 text-lg transition-all hover:scale-105"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Tirar Dúvida com Fornecedor
              </Button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-12">
          <Card className="bg-white border-gray-200 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Descrição</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {product.description}
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
                {product.documents.map((doc, index) => (
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Fornecedor</h2>
              <div className="flex items-start space-x-6">
                <div className="relative">
                  <img 
                    src={product.seller.image} 
                    alt={product.seller.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  {product.seller.verified && (
                    <div className="absolute -top-2 -right-2 bg-green-600 text-white p-1 rounded-full">
                      <Shield className="w-4 h-4" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3 className="text-xl font-bold text-gray-900 mr-3">
                      {product.seller.name}
                    </h3>
                    {product.seller.verified && (
                      <Badge className="bg-green-600 text-white">VERIFICADO</Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{product.seller.location}</span>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                    <span className="font-medium text-gray-900 mr-2">{product.seller.rating}</span>
                    <span className="text-gray-500">
                      ({product.seller.totalSales} vendas • Membro desde {product.seller.memberSince})
                    </span>
                  </div>
                  
                  <div className="flex gap-3">
                    <Link href={`/vendedor/${product.seller.id}`}>
                      <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                        Ver Perfil Completo
                      </Button>
                    </Link>
                    <Button className="bg-green-500 hover:bg-green-600 text-white">
                      <Phone className="w-4 h-4 mr-2" />
                      WhatsApp
                    </Button>
                    <Button variant="outline" className="border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white">
                      <Mail className="w-4 h-4 mr-2" />
                      E-mail
                    </Button>
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
                Localização do Fornecedor
              </h2>
              <div className="bg-gray-50 rounded-lg h-64 flex items-center justify-center border border-gray-200">
                <div className="text-center text-gray-600">
                  <MapPin className="w-12 h-12 mx-auto mb-2" />
                  <p>Mapa da localização do fornecedor</p>
                  <p className="text-sm">{product.city}, {product.location}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}