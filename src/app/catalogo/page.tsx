'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Filter, MapPin, Star, Eye, Heart, Grid, List } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function CatalogoPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [favorites, setFavorites] = useState<number[]>([])

  const products = [
    {
      id: 1,
      title: "Touro Nelore PO Certificado",
      category: "Gado de Corte",
      price: 45000,
      location: "Goiás, GO",
      rating: 4.8,
      reviews: 24,
      image: "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=400&h=300&fit=crop",
      seller: "Fazenda Boa Vista",
      verified: true,
      featured: true,
      age: "3 anos",
      weight: "850kg",
      breed: "Nelore"
    },
    {
      id: 2,
      title: "Égua Mangalarga Marchador",
      category: "Cavalos",
      price: 25000,
      location: "Minas Gerais, MG",
      rating: 4.9,
      reviews: 18,
      image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=400&h=300&fit=crop",
      seller: "Haras São João",
      verified: true,
      featured: false,
      age: "5 anos",
      weight: "450kg",
      breed: "Mangalarga"
    },
    {
      id: 3,
      title: "Vaca Holandesa Produtiva",
      category: "Gado de Leite",
      price: 8500,
      location: "São Paulo, SP",
      rating: 4.7,
      reviews: 31,
      image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&h=300&fit=crop",
      seller: "Fazenda Três Rios",
      verified: true,
      featured: true,
      age: "4 anos",
      weight: "650kg",
      breed: "Holandesa"
    },
    {
      id: 4,
      title: "Sêmen Angus Premium",
      category: "Sêmen",
      price: 150,
      location: "Rio Grande do Sul, RS",
      rating: 5.0,
      reviews: 12,
      image: "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=400&h=300&fit=crop",
      seller: "Genética Elite",
      verified: true,
      featured: false,
      age: "N/A",
      weight: "N/A",
      breed: "Angus"
    },
    {
      id: 5,
      title: "Novilha Brahman",
      category: "Gado de Corte",
      price: 12000,
      location: "Mato Grosso, MT",
      rating: 4.6,
      reviews: 15,
      image: "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=400&h=300&fit=crop",
      seller: "Fazenda Pantanal",
      verified: true,
      featured: false,
      age: "2 anos",
      weight: "420kg",
      breed: "Brahman"
    },
    {
      id: 6,
      title: "Garanhão Quarto de Milha",
      category: "Cavalos",
      price: 35000,
      location: "Bahia, BA",
      rating: 4.8,
      reviews: 9,
      image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=400&h=300&fit=crop",
      seller: "Haras Nordeste",
      verified: true,
      featured: true,
      age: "6 anos",
      weight: "520kg",
      breed: "Quarto de Milha"
    }
  ]

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  return (
    <div className="min-h-screen bg-[#F7F6F2]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-[#1E4D2B]">
                AgroMarket
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-[#2B2E2B] hover:text-[#C89F45] transition-colors duration-300">Início</Link>
              <Link href="/catalogo" className="text-[#C89F45] font-semibold">Catálogo</Link>
              <Link href="/leiloes" className="text-[#2B2E2B] hover:text-[#C89F45] transition-colors duration-300">Leilões</Link>
              <Link href="/vender" className="text-[#2B2E2B] hover:text-[#C89F45] transition-colors duration-300">Vender</Link>
              <Link href="/sobre" className="text-[#2B2E2B] hover:text-[#C89F45] transition-colors duration-300">Sobre</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="outline" className="border-[#1E4D2B] text-[#1E4D2B] hover:bg-[#1E4D2B] hover:text-white">
                  Entrar
                </Button>
              </Link>
              <Link href="/cadastro">
                <Button className="bg-[#1E4D2B] hover:bg-[#163B20] text-white">
                  Cadastrar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2B2E2B] mb-4">
            Catálogo de Animais
          </h1>
          <p className="text-xl text-[#6E7D5B]">
            Encontre os melhores animais para sua fazenda
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6E7D5B] w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Buscar por raça, tipo, localização..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-lg"
                />
              </div>
            </div>
            <Button className="bg-[#1E4D2B] hover:bg-[#163B20] text-white px-8 h-12">
              <Search className="w-5 h-5 mr-2" />
              Buscar
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <Select>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gado-corte">Gado de Corte</SelectItem>
                <SelectItem value="gado-leite">Gado de Leite</SelectItem>
                <SelectItem value="cavalos">Cavalos</SelectItem>
                <SelectItem value="semen">Sêmen</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Raça" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nelore">Nelore</SelectItem>
                <SelectItem value="angus">Angus</SelectItem>
                <SelectItem value="brahman">Brahman</SelectItem>
                <SelectItem value="holandesa">Holandesa</SelectItem>
                <SelectItem value="mangalarga">Mangalarga</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Preço" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-5000">Até R$ 5.000</SelectItem>
                <SelectItem value="5000-15000">R$ 5.000 - R$ 15.000</SelectItem>
                <SelectItem value="15000-30000">R$ 15.000 - R$ 30.000</SelectItem>
                <SelectItem value="30000+">Acima de R$ 30.000</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Localização" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="go">Goiás</SelectItem>
                <SelectItem value="mg">Minas Gerais</SelectItem>
                <SelectItem value="sp">São Paulo</SelectItem>
                <SelectItem value="mt">Mato Grosso</SelectItem>
                <SelectItem value="rs">Rio Grande do Sul</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Idade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-2">0-2 anos</SelectItem>
                <SelectItem value="2-4">2-4 anos</SelectItem>
                <SelectItem value="4-6">4-6 anos</SelectItem>
                <SelectItem value="6+">6+ anos</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="h-10">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-[#6E7D5B]">
            Mostrando <span className="font-semibold text-[#2B2E2B]">{products.length}</span> resultados
          </div>
          <div className="flex items-center space-x-4">
            <Select defaultValue="relevancia">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevancia">Mais Relevantes</SelectItem>
                <SelectItem value="preco-menor">Menor Preço</SelectItem>
                <SelectItem value="preco-maior">Maior Preço</SelectItem>
                <SelectItem value="avaliacao">Melhor Avaliação</SelectItem>
                <SelectItem value="recente">Mais Recentes</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-none"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-none"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] border-0">
              <div className="relative">
                <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
                {product.featured && (
                  <Badge className="absolute top-4 left-4 bg-[#C89F45] text-white font-semibold">
                    DESTAQUE
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className={`absolute top-4 right-4 bg-white/90 hover:bg-white ${
                    favorites.includes(product.id) ? 'text-red-500' : 'text-gray-400'
                  }`}
                  onClick={() => toggleFavorite(product.id)}
                >
                  <Heart className={`w-5 h-5 ${favorites.includes(product.id) ? 'fill-current' : ''}`} />
                </Button>
              </div>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <Badge className="bg-[#C89F45] text-white mb-2">{product.category}</Badge>
                  {product.verified && (
                    <Badge variant="success" className="text-xs">
                      VERIFICADO
                    </Badge>
                  )}
                </div>
                
                <h3 className="font-bold text-lg text-[#2B2E2B] mb-2 line-clamp-2">{product.title}</h3>
                
                <div className="flex items-center mb-2">
                  <MapPin className="w-4 h-4 text-[#6E7D5B] mr-1" />
                  <span className="text-[#6E7D5B] text-sm">{product.location}</span>
                </div>

                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-[#F1C40F] fill-current' : 'text-gray-300'}`} />
                    ))}
                    <span className="ml-2 text-sm text-[#6E7D5B]">({product.rating}) • {product.reviews} avaliações</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4 text-sm">
                  <div>
                    <span className="text-[#6E7D5B]">Idade:</span>
                    <div className="font-semibold text-[#2B2E2B]">{product.age}</div>
                  </div>
                  <div>
                    <span className="text-[#6E7D5B]">Peso:</span>
                    <div className="font-semibold text-[#2B2E2B]">{product.weight}</div>
                  </div>
                  <div>
                    <span className="text-[#6E7D5B]">Raça:</span>
                    <div className="font-semibold text-[#2B2E2B]">{product.breed}</div>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-[#1E4D2B]">
                    R$ {product.price.toLocaleString()}
                  </span>
                </div>

                <div className="text-sm text-[#6E7D5B] mb-4">
                  Vendido por: <span className="font-semibold text-[#2B2E2B]">{product.seller}</span>
                </div>

                <div className="flex gap-2">
                  <Link href={`/produto/${product.id}`} className="flex-1">
                    <Button className="w-full bg-[#1E4D2B] hover:bg-[#163B20] text-white">
                      <Eye className="w-4 h-4 mr-2" />
                      Ver Detalhes
                    </Button>
                  </Link>
                  <Button variant="outline" className="border-[#C89F45] text-[#C89F45] hover:bg-[#C89F45] hover:text-white">
                    Contatar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <div className="flex items-center space-x-2">
            <Button variant="outline" disabled className="border-[#1E4D2B] text-[#1E4D2B]">
              Anterior
            </Button>
            <Button className="bg-[#1E4D2B] text-white">1</Button>
            <Button variant="outline" className="border-[#1E4D2B] text-[#1E4D2B] hover:bg-[#1E4D2B] hover:text-white">2</Button>
            <Button variant="outline" className="border-[#1E4D2B] text-[#1E4D2B] hover:bg-[#1E4D2B] hover:text-white">3</Button>
            <Button variant="outline" className="border-[#1E4D2B] text-[#1E4D2B] hover:bg-[#1E4D2B] hover:text-white">
              Próximo
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#4A3218] text-[#F7F6F2] py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-[#C89F45] mb-4">AgroMarket</h3>
              <p className="text-[#F7F6F2]/80 mb-4">
                A maior plataforma de negócios do agronegócio brasileiro.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-[#C89F45]">Categorias</h4>
              <ul className="space-y-2">
                <li><Link href="/catalogo?categoria=gado-corte" className="hover:text-[#C89F45] transition-colors duration-300">Gado de Corte</Link></li>
                <li><Link href="/catalogo?categoria=gado-leite" className="hover:text-[#C89F45] transition-colors duration-300">Gado de Leite</Link></li>
                <li><Link href="/catalogo?categoria=cavalos" className="hover:text-[#C89F45] transition-colors duration-300">Cavalos</Link></li>
                <li><Link href="/catalogo?categoria=semen" className="hover:text-[#C89F45] transition-colors duration-300">Sêmen</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-[#C89F45]">Empresa</h4>
              <ul className="space-y-2">
                <li><Link href="/sobre" className="hover:text-[#C89F45] transition-colors duration-300">Sobre Nós</Link></li>
                <li><Link href="/contato" className="hover:text-[#C89F45] transition-colors duration-300">Contato</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-[#C89F45]">Suporte</h4>
              <ul className="space-y-2">
                <li><Link href="/ajuda" className="hover:text-[#C89F45] transition-colors duration-300">Central de Ajuda</Link></li>
                <li><Link href="/termos" className="hover:text-[#C89F45] transition-colors duration-300">Termos de Uso</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#C89F45]/20 mt-8 pt-8 text-center">
            <p className="text-[#F7F6F2]/60">
              © 2024 AgroMarket. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}