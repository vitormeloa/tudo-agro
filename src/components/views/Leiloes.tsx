'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import {
    Clock,
    Users,
    Play,
    Calendar,
    MapPin,
    Trophy,
    Zap,
    Timer,
    TrendingUp,
    Gavel, HelpCircle,
    Search,
    SlidersHorizontal
} from 'lucide-react'
import { mockAuctions } from '@/lib/mock-auctions'

const brazilianStates = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
];

export default function Leiloes() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [showCategoriesModal, setShowCategoriesModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedLocation, setSelectedLocation] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('relevancia')
  const itemsPerPage = 9
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setMounted(true)
    setCurrentTime(new Date())

    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const allAuctions = mockAuctions.map(a => ({
    id: a.id,
    title: a.title,
    type: a.type,
    currentBid: a.currentBid || 0,
    startingBid: a.startingBid || 0,
    endTime: a.endTime || new Date(),
    startTime: a.startTime || new Date(),
    participants: a.participants,
    totalLots: a.totalLots,
    currentLot: a.currentLotNumber || 0,
    image: a.image,
    videoUrl: a.videoUrl,
    location: a.location,
    auctioneer: a.auctioneer,
    status: a.status,
    estimatedValue: a.estimatedValue || 0,
  }))

  const getCategoryCount = (categoryName: string) => {
    return allAuctions.filter(a => a.type === categoryName).length
  }

  const categoriesConfig = [
    { name: 'Gado de Corte', label: 'Gado de Corte', color: '#B8E8D1' },
    { name: 'Gado de Leite', label: 'Gado de Leite', color: '#B8E8D1' },
    { name: 'Cavalos', label: 'Cavalos', color: '#B8E8D1' },
    { name: 'Sêmen Bovino', label: 'Sêmen', color: '#B8E8D1' },
  ].map(cat => ({
    ...cat,
    count: getCategoryCount(cat.name)
  })).filter(cat => cat.count > 0)

  const filteredAuctions = allAuctions.filter(auction => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesSearch = (
        auction.title.toLowerCase().includes(query) ||
        auction.type.toLowerCase().includes(query) ||
        auction.location.toLowerCase().includes(query) ||
        auction.auctioneer.toLowerCase().includes(query)
      )
      if (!matchesSearch) return false
    }

    if (selectedCategory && auction.type !== selectedCategory) return false
    if (selectedStatus !== 'all' && auction.status !== selectedStatus) return false

    if (selectedLocation) {
      const auctionLocationState = auction.location.split(',')[1]?.trim().toLowerCase()
      if (!auctionLocationState?.includes(selectedLocation.toLowerCase())) return false
    }

    return true
  })

  const sortedAuctions = [...filteredAuctions].sort((a, b) => {
    switch (sortBy) {
      case 'tempo':
        if (a.status === 'live' && b.status !== 'live') return -1
        if (a.status !== 'live' && b.status === 'live') return 1
        if (a.status === 'live' && b.status === 'live') {
          return (a.endTime?.getTime() || 0) - (b.endTime?.getTime() || 0)
        }
        return (a.startTime?.getTime() || 0) - (b.startTime?.getTime() || 0)
      case 'participantes':
        return (b.participants || 0) - (a.participants || 0)
      case 'valor':
        return (b.currentBid || b.estimatedValue || 0) - (a.currentBid || a.estimatedValue || 0)
      case 'recente':
        return (b.startTime?.getTime() || 0) - (a.startTime?.getTime() || 0)
      default:
        return 0
    }
  })

  const totalPages = Math.ceil(sortedAuctions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const auctions = sortedAuctions.slice(startIndex, endIndex)

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    setCurrentPage(1)
  }

  const handleCategoryClick = (categoryName: string) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory('')
    } else {
      setSelectedCategory(categoryName)
    }
    setCurrentPage(1)
    setShowCategoriesModal(false)
  }

  const clearAllFilters = () => {
    setSearchQuery('')
    setSelectedCategory('')
    setSelectedStatus('all')
    setSelectedLocation('')
    setSortBy('relevancia')
    setCurrentPage(1)
  }

  const hasActiveFilters = !!(searchQuery || selectedCategory || selectedStatus !== 'all' || selectedLocation)

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages)
    }
  }, [totalPages, currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const visibleCategories = categoriesConfig.slice(0, 5)
  const hiddenCategories = categoriesConfig.slice(5)

  const formatTimeLeft = (endTime: Date) => {
    if (!currentTime || !mounted) return "--:--:--"

    const now = currentTime
    const diff = endTime.getTime() - now.getTime()

    if (diff <= 0) return "Encerrado"

    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const formatDateTime = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Leilões Online</h1>
        <p className="text-muted-foreground mt-1">Participe dos melhores leilões do agronegócio em tempo real</p>
      </div>

      <Card className="shadow-sm border">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Buscar por título, leiloeiro, localização..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>
            <Button
              className="bg-primary hover:bg-[#2E7A5A] text-white px-8 h-12"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              Filtros
            </Button>
          </div>

          {showFilters && (
            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <Select value={selectedCategory} onValueChange={(value) => { handleCategoryClick(value === 'all' ? '' : value); }}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    {categoriesConfig.map(cat => (
                      <SelectItem key={cat.name} value={cat.name}>{cat.label} ({cat.count})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedStatus} onValueChange={(value) => { setSelectedStatus(value); setCurrentPage(1); }}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Status</SelectItem>
                    <SelectItem value="live">Ao Vivo</SelectItem>
                    <SelectItem value="scheduled">Agendados</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedLocation} onValueChange={(value) => { setSelectedLocation(value === 'all' ? '' : value); setCurrentPage(1); }}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Localização" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    {brazilianStates.map(state => (
                      <SelectItem key={state.value} value={state.value.toLowerCase()}>{state.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={(value) => { setSortBy(value); setCurrentPage(1); }}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevancia">Mais Relevantes</SelectItem>
                    <SelectItem value="tempo">Tempo Restante</SelectItem>
                    <SelectItem value="participantes">Mais Participantes</SelectItem>
                    <SelectItem value="valor">Maior Valor</SelectItem>
                    <SelectItem value="recente">Mais Recentes</SelectItem>
                  </SelectContent>
                </Select>

                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    className="h-10 border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                    onClick={clearAllFilters}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Limpar Filtros
                  </Button>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-[#101828]">Categorias Populares</h3>
          {selectedCategory && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCategoryClick('')}
              className="text-primary hover:text-primary hover:bg-primary/5"
            >
              Ver todas
            </Button>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {visibleCategories.map((category) => (
            <Card
              key={category.name}
              onClick={() => handleCategoryClick(category.name)}
              className={`hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                selectedCategory === category.name ? 'ring-2 ring-emerald-500 shadow-lg' : ''
              }`}
            >
              <CardContent className="p-3 text-center">
                <div
                  className="inline-flex px-3 py-1.5 rounded-full text-xs font-medium mb-2 max-w-full break-words leading-tight"
                  style={{
                    backgroundColor: category.color,
                    color: '#1F2937',
                  }}
                >
                  <span className="text-center">{category.label}</span>
                </div>
                <div className="text-xl font-bold text-[#101828]">{category.count}</div>
                <div className="text-xs text-gray-500">leilões</div>
              </CardContent>
            </Card>
          ))}

          {hiddenCategories.length > 0 && (
            <Card
              className="hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer border-2 border-dashed border-gray-300 hover:border-primary"
              onClick={() => setShowCategoriesModal(true)}
            >
              <CardContent className="p-3 text-center flex flex-col items-center justify-center min-h-[100px]">
                <Grid3x3 className="w-6 h-6 text-gray-400 mb-2" />
                <div className="text-sm font-semibold text-gray-700 mb-1">Ver Mais</div>
                <div className="text-xs text-gray-500">{hiddenCategories.length} categorias</div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Dialog open={showCategoriesModal} onOpenChange={setShowCategoriesModal}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Todas as Categorias</DialogTitle>
            <DialogDescription>
              Explore todas as {categoriesConfig.length} categorias disponiveis
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {hiddenCategories.map((category) => (
                <Card
                  key={category.name}
                  onClick={() => handleCategoryClick(category.name)}
                  className={`hover:shadow-lg transition-all duration-200 cursor-pointer ${
                    selectedCategory === category.name ? 'border-primary ring-2 ring-primary/30' : ''
                  }`}
                >
                  <CardContent className="p-4 text-center">
                    <div
                      className="inline-flex px-4 py-2 rounded-full text-sm font-medium mb-3"
                      style={{
                        backgroundColor: category.color,
                        color: '#1F2937'
                      }}
                    >
                      {category.label}
                    </div>
                    <div className="text-2xl font-bold text-[#101828]">{category.count}</div>
                    <div className="text-sm text-gray-500">leilões</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="text-gray-600">
          Mostrando <span className="font-semibold text-[#101828]">{startIndex + 1}</span> até <span className="font-semibold text-[#101828]">{Math.min(endIndex, sortedAuctions.length)}</span> de <span className="font-semibold text-[#101828]">{sortedAuctions.length}</span> resultados
        </div>
        <Select value={sortBy} onValueChange={(value) => { setSortBy(value); setCurrentPage(1); }}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevancia">Mais Relevantes</SelectItem>
            <SelectItem value="tempo">Tempo Restante</SelectItem>
            <SelectItem value="participantes">Mais Participantes</SelectItem>
            <SelectItem value="valor">Maior Valor</SelectItem>
            <SelectItem value="recente">Mais Recentes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-600 font-medium">Filtros ativos:</span>
          {searchQuery && (
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Busca: "{searchQuery}"
            </Badge>
          )}
          {selectedCategory && (
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Categoria: {selectedCategory}
            </Badge>
          )}
          {selectedStatus !== 'all' && (
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Status: {selectedStatus === 'live' ? 'Ao Vivo' : 'Agendados'}
            </Badge>
          )}
          {selectedLocation && (
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Localização: {brazilianStates.find(s => s.value.toLowerCase() === selectedLocation)?.label || selectedLocation}
            </Badge>
          )}
        </div>
      )}

      {auctions.length > 0 ? (
        <>
          <section>
            <div className="flex items-center mb-6">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-3"></div>
                <h2 className="text-xl font-bold text-[#101828]">
                  Leilões ao Vivo
                </h2>
              </div>
              <Badge className="ml-4 bg-red-500 text-white font-semibold">
                {auctions.filter(a => a.status === 'live').length} ATIVOS
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {auctions.filter(a => a.status === 'live').map((auction, index) => (
                <Card key={auction.id} className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 bg-gradient-to-br from-white to-gray-50">
                  <div className="relative">
                    <img src={auction.image} alt={auction.title} className="w-full h-48 object-cover" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-red-500 text-white font-semibold animate-pulse">
                        <Play className="w-3 h-3 mr-1" />
                        AO VIVO
                      </Badge>
                      <Badge className="bg-primary text-white">{auction.type}</Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-black/70 text-white px-2 py-1 rounded text-sm font-bold">
                        Lote {auction.currentLot || 0}/{auction.totalLots}
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg text-[#101828] mb-3 line-clamp-2">{auction.title}</h3>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Lance atual:</span>
                        <div className="text-right">
                          <div className="font-bold text-primary text-xl">
                            R$ {auction.currentBid.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </div>
                          <div className="text-xs text-gray-500">
                            (inicial: R$ {auction.startingBid.toLocaleString('pt-BR', { minimumFractionDigits: 2 })})
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Tempo restante:</span>
                        <div className="font-bold text-red-500 flex items-center text-lg">
                          <Timer className="w-4 h-4 mr-1" />
                          {formatTimeLeft(auction.endTime)}
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Participantes:</span>
                        <span className="font-bold text-[#101828] flex items-center">
                          <Users className="w-4 h-4 mr-1 text-primary" />
                          {auction.participants} online
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Local:</span>
                        <span className="font-semibold text-[#101828] flex items-center">
                          <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                          {auction.location}
                        </span>
                      </div>
                    </div>

                    <div className="text-sm text-gray-600 mb-4">
                      Leiloeiro: <span className="font-semibold text-[#101828]">{auction.auctioneer}</span>
                    </div>

                    <Link href={`/leilao/${auction.id}`}>
                      <Button className="w-full bg-primary hover:bg-[#2E7A5A] text-white text-lg py-3 transition-all duration-300 transform hover:scale-105">
                        <Zap className="w-5 h-5 mr-2" />
                        Entrar no Leilão
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mt-8">
            <div className="flex items-center mb-6">
              <Calendar className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-xl font-bold text-[#101828]">
                Próximos Leilões
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {auctions.filter(a => a.status === 'scheduled').map((auction, index) => (
                <Card key={auction.id} className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0">
                  <div className="relative">
                    <img src={auction.image} alt={auction.title} className="w-full h-48 object-cover" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-amber-500 text-white font-semibold">
                        <Calendar className="w-3 h-3 mr-1" />
                        AGENDADO
                      </Badge>
                      <Badge className="bg-primary text-white">{auction.type}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg text-[#101828] mb-3 line-clamp-2">{auction.title}</h3>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Início:</span>
                        <span className="font-bold text-primary">
                          {auction.startTime ? formatDateTime(auction.startTime) : 'A definir'}
                        </span>
                      </div>

                      {auction.estimatedValue && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Valor estimado:</span>
                          <span className="font-bold text-primary text-lg">
                            R$ {auction.estimatedValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      )}

                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total de lotes:</span>
                        <span className="font-bold text-[#101828] flex items-center">
                          <Trophy className="w-4 h-4 mr-1 text-primary" />
                          {auction.totalLots} lotes
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Local:</span>
                        <span className="font-semibold text-[#101828] flex items-center">
                          <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                          {auction.location}
                        </span>
                      </div>
                    </div>

                    <div className="text-sm text-gray-600 mb-4">
                      Leiloeiro: <span className="font-semibold text-[#101828]">{auction.auctioneer}</span>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1 bg-amber-500 hover:bg-amber-600 text-white transition-all duration-300 transform hover:scale-105">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Agendar Lembrete
                      </Button>
                      <Link href={`/leilao/${auction.id}`} className="flex-1">
                        <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white">
                          Ver Detalhes
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </>
      ) : (
        <div className="text-center py-16">
          <Gavel className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[#101828] mb-2">Nenhum leilão encontrado</h3>
          <p className="text-gray-600 mb-6">
            Não encontramos leilões que correspondam aos seus filtros.
          </p>
          {hasActiveFilters && (
            <Button
              onClick={clearAllFilters}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              Limpar todos os filtros
            </Button>
          )}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              className="border-primary text-primary hover:bg-primary hover:text-white disabled:border-gray-300 disabled:text-gray-400"
            >
              Anterior
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <Button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={
                      currentPage === page
                        ? "bg-primary text-white hover:bg-[#2E7A5A]"
                        : "border-primary text-primary hover:bg-primary hover:text-white"
                    }
                    variant={currentPage === page ? "default" : "outline"}
                  >
                    {page}
                  </Button>
                )
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return <span key={page} className="px-2 text-gray-500">...</span>
              }
              return null
            })}

            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              className="border-primary text-primary hover:bg-primary hover:text-white disabled:border-gray-300 disabled:text-gray-400"
            >
              Próximo
            </Button>
          </div>
        </div>
      )}

        <div className="border-t pt-6 mt-8">
            <Card className="bg-muted/50">
                <div className="p-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <HelpCircle className="h-10 w-10 text-primary" />
                            <div>
                                <p className="font-medium">Dúvidas sobre os leilões?</p>
                                <p className="text-sm text-muted-foreground">Nossa equipe está pronta para ajudar</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline">
                                Fale com Suporte
                            </Button>
                            <Button variant="outline">
                                Consultar AgroIA
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    </div>
  )
}
