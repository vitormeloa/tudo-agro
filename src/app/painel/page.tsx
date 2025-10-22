'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  User, 
  Settings, 
  Upload, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  X,
  Eye,
  Edit,
  Trash2,
  MessageSquare,
  Heart,
  DollarSign,
  Package,
  Gavel,
  ShoppingCart,
  Bell,
  Star,
  Clock,
  TrendingUp,
  BookOpen,
  Bot,
  Crown,
  Plus,
  Filter,
  Search,
  Calendar,
  MapPin,
  Award,
  CreditCard,
  BarChart3,
  Zap,
  Target,
  Users,
  PlayCircle,
  Download,
  ExternalLink,
  Phone,
  Mail,
  Globe,
  Briefcase,
  PiggyBank,
  Receipt,
  Megaphone
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function PainelPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [showVerificationAlert, setShowVerificationAlert] = useState(true)
  const [isVerified, setIsVerified] = useState(false)
  const [showVerificationModal, setShowVerificationModal] = useState(false)
  const [userProfile, setUserProfile] = useState('buyer') // 'buyer' or 'seller'
  const [userEmail, setUserEmail] = useState('')
  
  const [documents, setDocuments] = useState({
    rg: null as File | null,
    cpfCnpj: null as File | null,
    addressProof: null as File | null,
    car: null as File | null
  })

  // Simular verificação de perfil baseado no email
  useEffect(() => {
    // Simular obtenção do email do usuário logado
    const email = localStorage.getItem('userEmail') || 'usuario@gmail.com'
    setUserEmail(email)
    
    // Verificar se é o usuário especial com acesso de vendedor
    if (email === 'vendedor@gmail.com') {
      setUserProfile('seller')
    } else {
      setUserProfile('buyer')
    }
  }, [])

  const handleFileUpload = (field: keyof typeof documents, file: File | null) => {
    setDocuments({
      ...documents,
      [field]: file
    })
  }

  const handleVerificationSubmit = () => {
    console.log('Documentos enviados:', documents)
    setShowVerificationModal(false)
    setShowVerificationAlert(false)
    setIsVerified(true)
  }

  const handleBecomeSeller = () => {
    // Simular solicitação para se tornar vendedor
    alert('Solicitação enviada! Entraremos em contato via WhatsApp em breve.')
  }

  // Abas do perfil comprador (básico)
  const buyerTabs = [
    { id: 'overview', label: 'Visão Geral', icon: User },
    { id: 'auctions', label: 'Leilões', icon: Gavel },
    { id: 'marketplace', label: 'Mercado Agro', icon: ShoppingCart },
    { id: 'purchases', label: 'Minhas Compras', icon: Package },
    { id: 'favorites', label: 'Favoritos', icon: Heart },
    { id: 'academy', label: 'Academy', icon: BookOpen },
    { id: 'ai-assistant', label: 'IA Agro', icon: Bot },
    { id: 'vip-club', label: 'Clube VIP', icon: Crown },
    { id: 'messages', label: 'Mensagens', icon: MessageSquare },
    { id: 'profile', label: 'Meu Perfil', icon: Settings }
  ]

  // Abas adicionais para vendedores
  const sellerTabs = [
    { id: 'my-animals', label: 'Meus Animais', icon: Target },
    { id: 'my-auctions', label: 'Meus Leilões', icon: Gavel },
    { id: 'direct-catalog', label: 'Catálogo Direto', icon: Globe },
    { id: 'promotions', label: 'Impulsionamentos', icon: Megaphone },
    { id: 'seller-subscription', label: 'Assinatura Vendedor', icon: Crown },
    { id: 'financial', label: 'Financeiro', icon: DollarSign }
  ]

  const tabs = userProfile === 'seller' ? [...buyerTabs, ...sellerTabs] : buyerTabs

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7F6F2] to-[#FFFDF7]">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2">
              <img 
                src="/fotos/tudo-agro-logo.png" 
                className="h-8 w-auto" 
                alt="TudoAgro Logo"
              />
            </Link>
            <div className="flex items-center space-x-4">
              <Bell className="w-6 h-6 text-[#6E7D5B] hover:text-[#1E4D2B] cursor-pointer" />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#1E4D2B] rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[#2B2E2B] font-medium">João Silva</span>
                  {userProfile === 'seller' && (
                    <Badge className="bg-[#C89F45] text-white text-xs">
                      Vendedor
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Verification Alert */}
        {showVerificationAlert && !isVerified && (
          <div className="mb-6 bg-gradient-to-r from-[#C89F45]/10 to-[#B8913D]/10 border border-[#C89F45]/30 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-[#C89F45] mt-0.5" />
                <div>
                  <h3 className="font-semibold text-[#8A5A32] mb-1">
                    Verificação de Conta Necessária
                  </h3>
                  <p className="text-[#6E7D5B] text-sm mb-3">
                    Para acessar todas as funcionalidades da plataforma (comprar, vender, participar de leilões), 
                    você precisa verificar sua conta enviando os documentos necessários.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={() => setShowVerificationModal(true)}
                      className="bg-[#C89F45] hover:bg-[#B8913D] text-white text-sm px-4 py-2"
                    >
                      Verificar Agora
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowVerificationAlert(false)}
                      className="border-[#C89F45] text-[#C89F45] hover:bg-[#C89F45] hover:text-white text-sm px-4 py-2"
                    >
                      Lembrar Depois
                    </Button>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowVerificationAlert(false)}
                className="text-[#6E7D5B] hover:text-[#2B2E2B] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0 bg-white">
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center px-4 py-3 text-left transition-all duration-200 ${
                          activeTab === tab.id
                            ? 'bg-[#1E4D2B] text-white'
                            : 'text-[#6E7D5B] hover:bg-[#F7F6F2] hover:text-[#1E4D2B]'
                        }`}
                      >
                        <Icon className="w-5 h-5 mr-3" />
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    )
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* 1. Visão Geral */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-[#2B2E2B] mb-2">
                    Bem-vindo ao seu Painel
                  </h1>
                  <p className="text-[#6E7D5B]">
                    {userProfile === 'seller' 
                      ? 'Gerencie seus animais, leilões e vendas em um só lugar'
                      : 'Explore leilões, faça compras e gerencie suas atividades'
                    }
                  </p>
                </div>

                {/* Cashback Card */}
                <Card className="shadow-lg border-0 bg-gradient-to-r from-[#C89F45] to-[#B8913D] text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/80 text-sm font-medium">Saldo de Cashback</p>
                        <p className="text-3xl font-bold">R$ 247,50</p>
                        <p className="text-white/80 text-sm">Disponível para resgate</p>
                      </div>
                      <PiggyBank className="w-12 h-12 text-white/80" />
                    </div>
                    <Button className="mt-4 bg-white text-[#C89F45] hover:bg-gray-100">
                      Resgatar Cashback
                    </Button>
                  </CardContent>
                </Card>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="shadow-lg border-0 bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[#6E7D5B] text-sm font-medium">Leilões Participados</p>
                          <p className="text-2xl font-bold text-[#1E4D2B]">12</p>
                        </div>
                        <Gavel className="w-8 h-8 text-[#C89F45]" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-0 bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[#6E7D5B] text-sm font-medium">Compras Realizadas</p>
                          <p className="text-2xl font-bold text-[#1E4D2B]">8</p>
                        </div>
                        <ShoppingCart className="w-8 h-8 text-[#C89F45]" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-0 bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[#6E7D5B] text-sm font-medium">Favoritos</p>
                          <p className="text-2xl font-bold text-[#1E4D2B]">15</p>
                        </div>
                        <Heart className="w-8 h-8 text-[#C89F45]" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-0 bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[#6E7D5B] text-sm font-medium">Mensagens</p>
                          <p className="text-2xl font-bold text-[#1E4D2B]">3</p>
                        </div>
                        <MessageSquare className="w-8 h-8 text-[#C89F45]" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions */}
                <Card className="shadow-lg border-0 bg-white">
                  <CardHeader>
                    <CardTitle className="text-[#2B2E2B]">Ações Rápidas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {userProfile === 'buyer' && (
                        <Button
                          onClick={handleBecomeSeller}
                          className="bg-[#C89F45] hover:bg-[#B8913D] text-white p-6 h-auto flex flex-col items-center space-y-2"
                        >
                          <TrendingUp className="w-8 h-8" />
                          <span>Quero me tornar Vendedor</span>
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        className="border-[#1E4D2B] text-[#1E4D2B] hover:bg-[#1E4D2B] hover:text-white p-6 h-auto flex flex-col items-center space-y-2"
                      >
                        <Crown className="w-8 h-8" />
                        <span>Assinar Plano VIP</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="border-[#6E7D5B] text-[#6E7D5B] hover:bg-[#6E7D5B] hover:text-white p-6 h-auto flex flex-col items-center space-y-2"
                      >
                        <CheckCircle className="w-8 h-8" />
                        <span>Verificar Conta</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="shadow-lg border-0 bg-white">
                  <CardHeader>
                    <CardTitle className="text-[#2B2E2B]">Atividade Recente</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-3 bg-[#F7F6F2] rounded-lg">
                        <Gavel className="w-5 h-5 text-[#C89F45]" />
                        <div>
                          <p className="text-[#2B2E2B] font-medium">Novo lance no Leilão #123</p>
                          <p className="text-[#6E7D5B] text-sm">Há 2 horas</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-[#F7F6F2] rounded-lg">
                        <Heart className="w-5 h-5 text-[#B8413D]" />
                        <div>
                          <p className="text-[#2B2E2B] font-medium">Animal adicionado aos favoritos</p>
                          <p className="text-[#6E7D5B] text-sm">Ontem</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-[#F7F6F2] rounded-lg">
                        <MessageSquare className="w-5 h-5 text-[#C89F45]" />
                        <div>
                          <p className="text-[#2B2E2B] font-medium">Nova mensagem recebida</p>
                          <p className="text-[#6E7D5B] text-sm">2 dias atrás</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* 2. Leilões */}
            {activeTab === 'auctions' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-2xl font-bold text-[#2B2E2B] mb-2">Leilões</h1>
                    <p className="text-[#6E7D5B]">Explore e participe dos leilões disponíveis</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" className="border-[#6E7D5B] text-[#6E7D5B]">
                      <Filter className="w-4 h-4 mr-2" />
                      Filtros
                    </Button>
                  </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                  <Button className="bg-[#1E4D2B] text-white">Em Andamento</Button>
                  <Button variant="ghost" className="text-[#6E7D5B]">Futuros</Button>
                  <Button variant="ghost" className="text-[#6E7D5B]">Finalizados</Button>
                </div>

                {/* Auction Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((auction) => (
                    <Card key={auction} className="shadow-lg border-0 bg-white">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-bold text-[#2B2E2B] mb-1">Leilão Fazenda Boa Vista</h3>
                            <p className="text-[#6E7D5B] text-sm">Gado de Corte • Nelore</p>
                          </div>
                          <Badge className="bg-[#3D9970] text-white">
                            <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
                            Ao Vivo
                          </Badge>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-[#6E7D5B]">Lance Atual:</span>
                            <span className="font-bold text-[#1E4D2B]">R$ 15.500</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#6E7D5B]">Participantes:</span>
                            <span className="font-medium text-[#2B2E2B]">12 online</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#6E7D5B]">Tempo Restante:</span>
                            <span className="font-bold text-[#B8413D]">02:45:30</span>
                          </div>
                        </div>

                        <div className="flex space-x-2 mt-4">
                          <Button className="flex-1 bg-[#1E4D2B] hover:bg-[#163B20] text-white">
                            Entrar no Leilão
                          </Button>
                          <Button variant="outline" className="border-[#C89F45] text-[#C89F45]">
                            <Heart className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Mercado Agro */}
            {activeTab === 'marketplace' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-2xl font-bold text-[#2B2E2B] mb-2">Mercado Agro</h1>
                    <p className="text-[#6E7D5B]">Produtos agropecuários físicos e digitais</p>
                  </div>
                  <Button className="bg-[#C89F45] hover:bg-[#B8913D] text-white">
                    <Crown className="w-4 h-4 mr-2" />
                    Assinar Clube
                  </Button>
                </div>

                {/* Categories */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {[
                    { name: 'Nutrição Animal', icon: Package },
                    { name: 'Saúde Animal', icon: Heart },
                    { name: 'Equipamentos', icon: Settings },
                    { name: 'Vestuário Agro', icon: User },
                    { name: 'Reprodutivos', icon: Target }
                  ].map((category) => {
                    const Icon = category.icon
                    return (
                      <Card key={category.name} className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow cursor-pointer">
                        <CardContent className="p-4 text-center">
                          <Icon className="w-8 h-8 text-[#C89F45] mx-auto mb-2" />
                          <p className="text-[#2B2E2B] font-medium text-sm">{category.name}</p>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>

                {/* Featured Products */}
                <Card className="shadow-lg border-0 bg-white">
                  <CardHeader>
                    <CardTitle className="text-[#2B2E2B] flex items-center">
                      <Star className="w-5 h-5 text-[#C89F45] mr-2" />
                      Produtos em Destaque
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[1, 2, 3].map((product) => (
                        <div key={product} className="border border-gray-200 rounded-lg p-4">
                          <div className="aspect-square bg-gray-100 rounded-lg mb-3"></div>
                          <h4 className="font-semibold text-[#2B2E2B] mb-1">Ração Premium Bovinos</h4>
                          <p className="text-[#6E7D5B] text-sm mb-2">Saco 25kg</p>
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-[#1E4D2B]">R$ 89,90</span>
                            <Badge className="bg-[#3D9970] text-white text-xs">5% Cashback</Badge>
                          </div>
                          <Button className="w-full mt-3 bg-[#1E4D2B] hover:bg-[#163B20] text-white">
                            Comprar
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* 4. Minhas Compras */}
            {activeTab === 'purchases' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-[#2B2E2B] mb-2">Minhas Compras</h1>
                  <p className="text-[#6E7D5B]">Acompanhe todas as suas compras e pedidos</p>
                </div>

                {/* Filter Tabs */}
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                  <Button className="bg-[#1E4D2B] text-white">Todas</Button>
                  <Button variant="ghost" className="text-[#6E7D5B]">Leilões</Button>
                  <Button variant="ghost" className="text-[#6E7D5B]">Mercado Agro</Button>
                </div>

                {/* Purchase History */}
                <div className="space-y-4">
                  {[1, 2, 3].map((purchase) => (
                    <Card key={purchase} className="shadow-lg border-0 bg-white">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex space-x-4">
                            <div className="w-16 h-16 bg-gray-100 rounded-lg"></div>
                            <div>
                              <h3 className="font-bold text-[#2B2E2B] mb-1">Novilha Nelore PO</h3>
                              <p className="text-[#6E7D5B] text-sm mb-2">Leilão #123 • 15/03/2024</p>
                              <div className="flex items-center space-x-4">
                                <span className="text-[#1E4D2B] font-bold">R$ 8.500</span>
                                <Badge className="bg-[#3D9970] text-white">Pago</Badge>
                                <span className="text-[#C89F45] text-sm">+R$ 42,50 cashback</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" className="border-[#6E7D5B] text-[#6E7D5B]">
                              Ver Detalhes
                            </Button>
                            <Button size="sm" className="bg-[#1E4D2B] hover:bg-[#163B20] text-white">
                              Comprar Novamente
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Favoritos */}
            {activeTab === 'favorites' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-[#2B2E2B] mb-2">Favoritos</h1>
                  <p className="text-[#6E7D5B]">Seus animais e produtos salvos</p>
                </div>

                {/* Favorites Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <Card key={item} className="shadow-lg border-0 bg-white">
                      <CardContent className="p-4">
                        <div className="aspect-square bg-gray-100 rounded-lg mb-3 relative">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2 text-[#B8413D] hover:bg-white/80"
                          >
                            <Heart className="w-4 h-4 fill-current" />
                          </Button>
                        </div>
                        <h3 className="font-semibold text-[#2B2E2B] mb-1">Touro Angus PO</h3>
                        <p className="text-[#6E7D5B] text-sm mb-2">2 anos • 650kg</p>
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-bold text-[#1E4D2B]">R$ 12.500</span>
                          <Badge className="bg-[#C89F45] text-white">Leilão</Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Button className="flex-1 bg-[#1E4D2B] hover:bg-[#163B20] text-white">
                            Ver Detalhes
                          </Button>
                          <Button variant="outline" size="sm" className="border-[#B8413D] text-[#B8413D]">
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* 6. Academy */}
            {activeTab === 'academy' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-[#2B2E2B] mb-2">Academy</h1>
                  <p className="text-[#6E7D5B]">Aprenda a comprar e vender melhor</p>
                </div>

                {/* Course Categories */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { level: 'Iniciante', color: 'bg-[#3D9970]', courses: 12 },
                    { level: 'Intermediário', color: 'bg-[#C89F45]', courses: 8 },
                    { level: 'Avançado', color: 'bg-[#B8413D]', courses: 5 }
                  ].map((category) => (
                    <Card key={category.level} className="shadow-lg border-0 bg-white">
                      <CardContent className="p-6 text-center">
                        <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                          <BookOpen className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="font-bold text-[#2B2E2B] mb-2">{category.level}</h3>
                        <p className="text-[#6E7D5B] text-sm mb-4">{category.courses} cursos disponíveis</p>
                        <Button className="bg-[#1E4D2B] hover:bg-[#163B20] text-white">
                          Explorar
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Featured Courses */}
                <Card className="shadow-lg border-0 bg-white">
                  <CardHeader>
                    <CardTitle className="text-[#2B2E2B]">Cursos em Destaque</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((course) => (
                        <div key={course} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                            <PlayCircle className="w-8 h-8 text-[#C89F45]" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-[#2B2E2B] mb-1">Como Avaliar Gado de Corte</h4>
                            <p className="text-[#6E7D5B] text-sm mb-2">12 aulas • 3h 45min</p>
                            <div className="flex items-center space-x-2">
                              <Badge className="bg-[#3D9970] text-white">Gratuito</Badge>
                              <div className="flex items-center">
                                <Star className="w-4 h-4 text-[#C89F45] fill-current" />
                                <span className="text-sm text-[#6E7D5B] ml-1">4.8 (124)</span>
                              </div>
                            </div>
                          </div>
                          <Button className="bg-[#1E4D2B] hover:bg-[#163B20] text-white">
                            Assistir
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Certificate Section */}
                <Card className="shadow-lg border-0 bg-gradient-to-r from-[#C89F45] to-[#B8913D] text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-xl mb-2">Certificado Digital</h3>
                        <p className="text-white/80 mb-4">Comprove seu conhecimento com certificados reconhecidos</p>
                        <div className="flex space-x-4">
                          <Button className="bg-white text-[#C89F45] hover:bg-gray-100">
                            Digital - R$ 29,90
                          </Button>
                          <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#C89F45]">
                            Físico + Frete
                          </Button>
                        </div>
                      </div>
                      <Award className="w-16 h-16 text-white/80" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* 7. IA Agro */}
            {activeTab === 'ai-assistant' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-[#2B2E2B] mb-2">IA Agro</h1>
                  <p className="text-[#6E7D5B]">Seu assistente digital especializado em agronegócio</p>
                </div>

                {/* Usage Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="shadow-lg border-0 bg-white">
                    <CardContent className="p-6 text-center">
                      <Bot className="w-12 h-12 text-[#C89F45] mx-auto mb-4" />
                      <p className="text-[#6E7D5B] text-sm">Consultas Restantes</p>
                      <p className="text-2xl font-bold text-[#1E4D2B]">7/10</p>
                    </CardContent>
                  </Card>
                  <Card className="shadow-lg border-0 bg-white">
                    <CardContent className="p-6 text-center">
                      <Clock className="w-12 h-12 text-[#3D9970] mx-auto mb-4" />
                      <p className="text-[#6E7D5B] text-sm">Tempo Médio</p>
                      <p className="text-2xl font-bold text-[#1E4D2B]">2.3s</p>
                    </CardContent>
                  </Card>
                  <Card className="shadow-lg border-0 bg-white">
                    <CardContent className="p-6 text-center">
                      <Star className="w-12 h-12 text-[#C89F45] mx-auto mb-4" />
                      <p className="text-[#6E7D5B] text-sm">Precisão</p>
                      <p className="text-2xl font-bold text-[#1E4D2B]">98%</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Chat Interface */}
                <Card className="shadow-lg border-0 bg-white">
                  <CardHeader>
                    <CardTitle className="text-[#2B2E2B] flex items-center">
                      <Bot className="w-5 h-5 text-[#C89F45] mr-2" />
                      Chat com IA Especializada
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-96 border border-gray-200 rounded-lg p-4 mb-4 overflow-y-auto">
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-[#C89F45] rounded-full flex items-center justify-center">
                            <Bot className="w-5 h-5 text-white" />
                          </div>
                          <div className="bg-[#F7F6F2] p-3 rounded-lg max-w-xs">
                            <p className="text-[#2B2E2B]">Olá! Sou sua assistente IA especializada em agronegócio. Como posso ajudar você hoje?</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Digite sua pergunta sobre preços, nutrição, genética..."
                        className="flex-1"
                      />
                      <Button className="bg-[#C89F45] hover:bg-[#B8913D] text-white">
                        Enviar
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Upgrade Plan */}
                <Card className="shadow-lg border-0 bg-gradient-to-r from-[#1E4D2B] to-[#2F6C3F] text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-xl mb-2">Plano Ilimitado</h3>
                        <p className="text-white/80 mb-4">Consultas ilimitadas + análises avançadas</p>
                        <Button className="bg-[#C89F45] hover:bg-[#B8913D] text-white">
                          Assinar por R$ 39,90/mês
                        </Button>
                      </div>
                      <Zap className="w-16 h-16 text-white/80" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* 8. Clube VIP */}
            {activeTab === 'vip-club' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-[#2B2E2B] mb-2">Clube VIP</h1>
                  <p className="text-[#6E7D5B]">Benefícios exclusivos para membros VIP</p>
                </div>

                {/* Current Plan */}
                <Card className="shadow-lg border-0 bg-gradient-to-r from-[#C89F45] to-[#B8913D] text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-xl mb-2">Plano Atual: Gratuito</h3>
                        <p className="text-white/80">Faça upgrade para acessar benefícios exclusivos</p>
                      </div>
                      <Crown className="w-16 h-16 text-white/80" />
                    </div>
                  </CardContent>
                </Card>

                {/* Benefits Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Free Plan */}
                  <Card className="shadow-lg border-0 bg-white">
                    <CardHeader>
                      <CardTitle className="text-[#2B2E2B] text-center">Plano Gratuito</CardTitle>
                      <p className="text-center text-[#6E7D5B]">Atual</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-[#3D9970]" />
                          <span className="text-[#2B2E2B]">Acesso básico aos leilões</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-[#3D9970]" />
                          <span className="text-[#2B2E2B]">Compras no mercado agro</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <X className="w-5 h-5 text-[#B8413D]" />
                          <span className="text-[#6E7D5B]">Acesso antecipado</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <X className="w-5 h-5 text-[#B8413D]" />
                          <span className="text-[#6E7D5B]">Consultor pessoal</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* VIP Plan */}
                  <Card className="shadow-lg border-2 border-[#C89F45] bg-white">
                    <CardHeader>
                      <CardTitle className="text-[#2B2E2B] text-center flex items-center justify-center">
                        <Crown className="w-5 h-5 text-[#C89F45] mr-2" />
                        Plano VIP
                      </CardTitle>
                      <p className="text-center text-[#C89F45] font-bold">R$ 19,90/mês</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-[#3D9970]" />
                          <span className="text-[#2B2E2B]">Acesso antecipado a leilões</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-[#3D9970]" />
                          <span className="text-[#2B2E2B]">Salas exclusivas</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-[#3D9970]" />
                          <span className="text-[#2B2E2B]">Atendimento prioritário</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-[#3D9970]" />
                          <span className="text-[#2B2E2B]">Consultor pessoal via WhatsApp</span>
                        </div>
                      </div>
                      <Button className="w-full bg-[#C89F45] hover:bg-[#B8913D] text-white">
                        Assinar Agora
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* 9. Mensagens */}
            {activeTab === 'messages' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-[#2B2E2B] mb-2">Mensagens</h1>
                  <p className="text-[#6E7D5B]">Comunicação com vendedores e suporte</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Conversations List */}
                  <Card className="shadow-lg border-0 bg-white lg:col-span-1">
                    <CardHeader>
                      <CardTitle className="text-[#2B2E2B] text-lg">Conversas</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="space-y-1">
                        {[1, 2, 3].map((conversation) => (
                          <div key={conversation} className="p-4 hover:bg-[#F7F6F2] cursor-pointer border-b border-gray-100">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-[#1E4D2B] rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-[#2B2E2B]">Fazenda Boa Vista</h4>
                                <p className="text-[#6E7D5B] text-sm">Sobre o leilão de gado...</p>
                              </div>
                              <div className="text-right">
                                <p className="text-[#6E7D5B] text-xs">14:30</p>
                                <div className="w-2 h-2 bg-[#C89F45] rounded-full mt-1"></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Chat Area */}
                  <Card className="shadow-lg border-0 bg-white lg:col-span-2">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-[#1E4D2B] rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium text-[#2B2E2B]">Fazenda Boa Vista</h3>
                          <p className="text-[#6E7D5B] text-sm">Online agora</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-96 border border-gray-200 rounded-lg p-4 mb-4 overflow-y-auto">
                        <div className="space-y-4">
                          <div className="flex justify-start">
                            <div className="bg-[#F7F6F2] p-3 rounded-lg max-w-xs">
                              <p className="text-[#2B2E2B]">Olá! Tenho interesse no lote 123. Poderia me dar mais informações?</p>
                              <p className="text-[#6E7D5B] text-xs mt-1">14:25</p>
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <div className="bg-[#1E4D2B] p-3 rounded-lg max-w-xs">
                              <p className="text-white">Claro! É uma novilha Nelore de 18 meses, pesando 320kg. Tem todos os documentos em dia.</p>
                              <p className="text-white/70 text-xs mt-1">14:30</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Digite sua mensagem..."
                          className="flex-1"
                        />
                        <Button className="bg-[#1E4D2B] hover:bg-[#163B20] text-white">
                          Enviar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* 10. Meu Perfil */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-[#2B2E2B] mb-2">Meu Perfil</h1>
                  <p className="text-[#6E7D5B]">Gerencie suas informações pessoais e configurações</p>
                </div>

                {/* Profile Info */}
                <Card className="shadow-lg border-0 bg-white">
                  <CardHeader>
                    <CardTitle className="text-[#2B2E2B] flex items-center justify-between">
                      Informações Pessoais
                      {isVerified ? (
                        <Badge className="bg-[#3D9970] text-white">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Verificado
                        </Badge>
                      ) : (
                        <Badge className="bg-[#C89F45] text-white">
                          <AlertTriangle className="w-4 h-4 mr-1" />
                          Pendente Verificação
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#2B2E2B] mb-2">
                          Nome Completo
                        </label>
                        <Input defaultValue="João Silva" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#2B2E2B] mb-2">
                          E-mail
                        </label>
                        <Input defaultValue={userEmail} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#2B2E2B] mb-2">
                          Telefone/WhatsApp
                        </label>
                        <Input defaultValue="(11) 99999-9999" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#2B2E2B] mb-2">
                          CPF
                        </label>
                        <Input defaultValue="123.456.789-00" />
                      </div>
                    </div>
                    <Button className="bg-[#1E4D2B] hover:bg-[#163B20] text-white">
                      Salvar Alterações
                    </Button>
                  </CardContent>
                </Card>

                {/* Verification Section */}
                {!isVerified && (
                  <Card className="shadow-lg border-0 bg-white">
                    <CardHeader>
                      <CardTitle className="text-[#2B2E2B] flex items-center">
                        <AlertTriangle className="w-5 h-5 mr-2 text-[#C89F45]" />
                        Verificação de Conta
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-[#6E7D5B] mb-4">
                        Complete a verificação da sua conta para acessar todas as funcionalidades da plataforma.
                      </p>
                      <Button
                        onClick={() => setShowVerificationModal(true)}
                        className="bg-[#C89F45] hover:bg-[#B8913D] text-white"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Enviar Documentos
                      </Button>
                    </CardContent>
                  </Card>
                )}

                {/* Become Seller */}
                {userProfile === 'buyer' && (
                  <Card className="shadow-lg border-0 bg-gradient-to-r from-[#C89F45] to-[#B8913D] text-white">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-xl mb-2">Quero ser Vendedor</h3>
                          <p className="text-white/80 mb-4">Venda seus animais e produtos na nossa plataforma</p>
                          <Button
                            onClick={handleBecomeSeller}
                            className="bg-white text-[#C89F45] hover:bg-gray-100"
                          >
                            Solicitar Acesso
                          </Button>
                        </div>
                        <TrendingUp className="w-16 h-16 text-white/80" />
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Cashback History */}
                <Card className="shadow-lg border-0 bg-white">
                  <CardHeader>
                    <CardTitle className="text-[#2B2E2B]">Histórico de Cashback</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[1, 2, 3].map((cashback) => (
                        <div key={cashback} className="flex justify-between items-center p-3 bg-[#F7F6F2] rounded-lg">
                          <div>
                            <p className="font-medium text-[#2B2E2B]">Compra Ração Premium</p>
                            <p className="text-[#6E7D5B] text-sm">15/03/2024</p>
                          </div>
                          <span className="font-bold text-[#3D9970]">+R$ 4,50</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* SELLER TABS - Only visible for seller profile */}
            {userProfile === 'seller' && (
              <>
                {/* 11. Meus Animais */}
                {activeTab === 'my-animals' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h1 className="text-2xl font-bold text-[#2B2E2B] mb-2">Meus Animais</h1>
                        <p className="text-[#6E7D5B]">Gerencie seus animais cadastrados</p>
                      </div>
                      <Button className="bg-[#1E4D2B] hover:bg-[#163B20] text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Cadastrar Animal
                      </Button>
                    </div>

                    {/* Animals Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[1, 2, 3, 4].map((animal) => (
                        <Card key={animal} className="shadow-lg border-0 bg-white">
                          <CardContent className="p-4">
                            <div className="aspect-square bg-gray-100 rounded-lg mb-3"></div>
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-semibold text-[#2B2E2B]">Touro Nelore #001</h3>
                                <p className="text-[#6E7D5B] text-sm">3 anos • 750kg</p>
                              </div>
                              <Badge className="bg-[#3D9970] text-white">Ativo</Badge>
                            </div>
                            <p className="font-bold text-[#1E4D2B] mb-3">R$ 18.500</p>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" className="flex-1 border-[#6E7D5B] text-[#6E7D5B]">
                                <Edit className="w-4 h-4 mr-1" />
                                Editar
                              </Button>
                              <Button size="sm" variant="outline" className="border-[#B8413D] text-[#B8413D]">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* 12. Meus Leilões (Vendedor) */}
                {activeTab === 'my-auctions' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h1 className="text-2xl font-bold text-[#2B2E2B] mb-2">Meus Leilões</h1>
                        <p className="text-[#6E7D5B]">Crie e gerencie seus leilões</p>
                      </div>
                      <Button className="bg-[#1E4D2B] hover:bg-[#163B20] text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Criar Leilão
                      </Button>
                    </div>

                    {/* Auction Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <Card className="shadow-lg border-0 bg-white">
                        <CardContent className="p-6 text-center">
                          <Gavel className="w-8 h-8 text-[#C89F45] mx-auto mb-2" />
                          <p className="text-2xl font-bold text-[#1E4D2B]">5</p>
                          <p className="text-[#6E7D5B] text-sm">Leilões Ativos</p>
                        </CardContent>
                      </Card>
                      <Card className="shadow-lg border-0 bg-white">
                        <CardContent className="p-6 text-center">
                          <Users className="w-8 h-8 text-[#3D9970] mx-auto mb-2" />
                          <p className="text-2xl font-bold text-[#1E4D2B]">127</p>
                          <p className="text-[#6E7D5B] text-sm">Participantes</p>
                        </CardContent>
                      </Card>
                      <Card className="shadow-lg border-0 bg-white">
                        <CardContent className="p-6 text-center">
                          <DollarSign className="w-8 h-8 text-[#C89F45] mx-auto mb-2" />
                          <p className="text-2xl font-bold text-[#1E4D2B]">R$ 85k</p>
                          <p className="text-[#6E7D5B] text-sm">Volume Total</p>
                        </CardContent>
                      </Card>
                      <Card className="shadow-lg border-0 bg-white">
                        <CardContent className="p-6 text-center">
                          <TrendingUp className="w-8 h-8 text-[#3D9970] mx-auto mb-2" />
                          <p className="text-2xl font-bold text-[#1E4D2B]">92%</p>
                          <p className="text-[#6E7D5B] text-sm">Taxa Sucesso</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Active Auctions */}
                    <Card className="shadow-lg border-0 bg-white">
                      <CardHeader>
                        <CardTitle className="text-[#2B2E2B]">Leilões em Andamento</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[1, 2].map((auction) => (
                            <div key={auction} className="border border-gray-200 rounded-lg p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-semibold text-[#2B2E2B] mb-1">Leilão Fazenda Silva</h4>
                                  <p className="text-[#6E7D5B] text-sm mb-2">15 lotes • Iniciado há 2 horas</p>
                                  <div className="flex items-center space-x-4">
                                    <span className="text-[#1E4D2B] font-bold">Lance: R$ 45.200</span>
                                    <span className="text-[#6E7D5B]">23 participantes</span>
                                    <span className="text-[#B8413D]">Termina em 1h 30min</span>
                                  </div>
                                </div>
                                <div className="flex space-x-2">
                                  <Button size="sm" variant="outline" className="border-[#6E7D5B] text-[#6E7D5B]">
                                    <BarChart3 className="w-4 h-4 mr-1" />
                                    Stats
                                  </Button>
                                  <Button size="sm" className="bg-[#1E4D2B] hover:bg-[#163B20] text-white">
                                    Gerenciar
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* 13. Catálogo Direto */}
                {activeTab === 'direct-catalog' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h1 className="text-2xl font-bold text-[#2B2E2B] mb-2">Catálogo Direto</h1>
                        <p className="text-[#6E7D5B]">Venda sem leilão com anúncios fixos</p>
                      </div>
                      <Button className="bg-[#1E4D2B] hover:bg-[#163B20] text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Novo Anúncio
                      </Button>
                    </div>

                    {/* Direct Sales Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="shadow-lg border-0 bg-white">
                        <CardContent className="p-6 text-center">
                          <Globe className="w-8 h-8 text-[#C89F45] mx-auto mb-2" />
                          <p className="text-2xl font-bold text-[#1E4D2B]">12</p>
                          <p className="text-[#6E7D5B] text-sm">Anúncios Ativos</p>
                        </CardContent>
                      </Card>
                      <Card className="shadow-lg border-0 bg-white">
                        <CardContent className="p-6 text-center">
                          <Eye className="w-8 h-8 text-[#3D9970] mx-auto mb-2" />
                          <p className="text-2xl font-bold text-[#1E4D2B]">1.2k</p>
                          <p className="text-[#6E7D5B] text-sm">Visualizações</p>
                        </CardContent>
                      </Card>
                      <Card className="shadow-lg border-0 bg-white">
                        <CardContent className="p-6 text-center">
                          <MessageSquare className="w-8 h-8 text-[#C89F45] mx-auto mb-2" />
                          <p className="text-2xl font-bold text-[#1E4D2B]">8</p>
                          <p className="text-[#6E7D5B] text-sm">Propostas</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Active Listings */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[1, 2, 3, 4].map((listing) => (
                        <Card key={listing} className="shadow-lg border-0 bg-white">
                          <CardContent className="p-4">
                            <div className="aspect-video bg-gray-100 rounded-lg mb-3"></div>
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-semibold text-[#2B2E2B]">Vaca Holandesa PO</h3>
                                <p className="text-[#6E7D5B] text-sm">4 anos • Prenha</p>
                              </div>
                              <Badge className="bg-[#3D9970] text-white">Ativo</Badge>
                            </div>
                            <p className="font-bold text-[#1E4D2B] mb-2">R$ 12.800</p>
                            <div className="flex justify-between text-sm text-[#6E7D5B] mb-3">
                              <span>156 visualizações</span>
                              <span>3 propostas</span>
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" className="flex-1 border-[#C89F45] text-[#C89F45]">
                                <Megaphone className="w-4 h-4 mr-1" />
                                Impulsionar
                              </Button>
                              <Button size="sm" variant="outline" className="border-[#6E7D5B] text-[#6E7D5B]">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* 14. Impulsionamentos */}
                {activeTab === 'promotions' && (
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-2xl font-bold text-[#2B2E2B] mb-2">Impulsionamentos</h1>
                      <p className="text-[#6E7D5B]">Promova seus anúncios e leilões</p>
                    </div>

                    {/* Promotion Options */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="shadow-lg border-0 bg-white">
                        <CardHeader>
                          <CardTitle className="text-[#2B2E2B] flex items-center">
                            <Gavel className="w-5 h-5 text-[#C89F45] mr-2" />
                            Leilão em Destaque
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-[#6E7D5B] mb-4">Destaque seu leilão na página principal</p>
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-2xl font-bold text-[#1E4D2B]">R$ 29</span>
                            <span className="text-[#6E7D5B]">por dia</span>
                          </div>
                          <Button className="w-full bg-[#C89F45] hover:bg-[#B8913D] text-white">
                            Impulsionar Leilão
                          </Button>
                        </CardContent>
                      </Card>

                      <Card className="shadow-lg border-0 bg-white">
                        <CardHeader>
                          <CardTitle className="text-[#2B2E2B] flex items-center">
                            <Globe className="w-5 h-5 text-[#1E4D2B] mr-2" />
                            Anúncio Direto
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-[#6E7D5B] mb-4">Destaque seu anúncio no catálogo</p>
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-2xl font-bold text-[#1E4D2B]">R$ 19</span>
                            <span className="text-[#6E7D5B]">por dia</span>
                          </div>
                          <Button className="w-full bg-[#1E4D2B] hover:bg-[#163B20] text-white">
                            Impulsionar Anúncio
                          </Button>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Active Promotions */}
                    <Card className="shadow-lg border-0 bg-white">
                      <CardHeader>
                        <CardTitle className="text-[#2B2E2B]">Impulsionamentos Ativos</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[1, 2].map((promotion) => (
                            <div key={promotion} className="border border-gray-200 rounded-lg p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-semibold text-[#2B2E2B] mb-1">Leilão Fazenda Silva</h4>
                                  <p className="text-[#6E7D5B] text-sm mb-2">Destaque na home • Iniciado ontem</p>
                                  <div className="flex items-center space-x-4">
                                    <span className="text-[#1E4D2B] font-bold">R$ 29/dia</span>
                                    <span className="text-[#6E7D5B]">+340 visualizações</span>
                                    <span className="text-[#3D9970]">Expira em 2 dias</span>
                                  </div>
                                </div>
                                <div className="flex space-x-2">
                                  <Button size="sm" variant="outline" className="border-[#6E7D5B] text-[#6E7D5B]">
                                    Pausar
                                  </Button>
                                  <Button size="sm" className="bg-[#C89F45] hover:bg-[#B8913D] text-white">
                                    Estender
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* 15. Assinatura de Vendedor */}
                {activeTab === 'seller-subscription' && (
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-2xl font-bold text-[#2B2E2B] mb-2">Assinatura de Vendedor</h1>
                      <p className="text-[#6E7D5B]">Gerencie seu plano e benefícios</p>
                    </div>

                    {/* Current Plan */}
                    <Card className="shadow-lg border-0 bg-gradient-to-r from-[#1E4D2B] to-[#2F6C3F] text-white">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-bold text-xl mb-2">Plano Atual: Starter</h3>
                            <p className="text-white/80">R$ 49/mês • 10 anúncios restantes</p>
                          </div>
                          <Crown className="w-16 h-16 text-white/80" />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Plans Comparison */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card className="shadow-lg border-0 bg-white">
                        <CardHeader>
                          <CardTitle className="text-[#2B2E2B] text-center">Starter</CardTitle>
                          <p className="text-center text-[#C89F45] font-bold text-2xl">R$ 49</p>
                          <p className="text-center text-[#6E7D5B] text-sm">por mês</p>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3 mb-6">
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="w-5 h-5 text-[#3D9970]" />
                              <span className="text-[#2B2E2B]">10 anúncios/mês</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="w-5 h-5 text-[#3D9970]" />
                              <span className="text-[#2B2E2B]">Suporte básico</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <X className="w-5 h-5 text-[#B8413D]" />
                              <span className="text-[#6E7D5B]">IA para anúncios</span>
                            </div>
                          </div>
                          <Badge className="w-full bg-[#3D9970] text-white justify-center">
                            Plano Atual
                          </Badge>
                        </CardContent>
                      </Card>

                      <Card className="shadow-lg border-2 border-[#C89F45] bg-white">
                        <CardHeader>
                          <CardTitle className="text-[#2B2E2B] text-center">Pro</CardTitle>
                          <p className="text-center text-[#C89F45] font-bold text-2xl">R$ 97</p>
                          <p className="text-center text-[#6E7D5B] text-sm">por mês</p>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3 mb-6">
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="w-5 h-5 text-[#3D9970]" />
                              <span className="text-[#2B2E2B]">25 anúncios/mês</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="w-5 h-5 text-[#3D9970]" />
                              <span className="text-[#2B2E2B]">IA para anúncios</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="w-5 h-5 text-[#3D9970]" />
                              <span className="text-[#2B2E2B]">Suporte prioritário</span>
                            </div>
                          </div>
                          <Button className="w-full bg-[#C89F45] hover:bg-[#B8913D] text-white">
                            Fazer Upgrade
                          </Button>
                        </CardContent>
                      </Card>

                      <Card className="shadow-lg border-0 bg-white">
                        <CardHeader>
                          <CardTitle className="text-[#2B2E2B] text-center">Premium</CardTitle>
                          <p className="text-center text-[#1E4D2B] font-bold text-2xl">R$ 197</p>
                          <p className="text-center text-[#6E7D5B] text-sm">por mês</p>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3 mb-6">
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="w-5 h-5 text-[#3D9970]" />
                              <span className="text-[#2B2E2B]">Anúncios ilimitados</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="w-5 h-5 text-[#3D9970]" />
                              <span className="text-[#2B2E2B]">Push notifications</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="w-5 h-5 text-[#3D9970]" />
                              <span className="text-[#2B2E2B]">Gerente dedicado</span>
                            </div>
                          </div>
                          <Button className="w-full bg-[#1E4D2B] hover:bg-[#163B20] text-white">
                            Fazer Upgrade
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}

                {/* 16. Financeiro */}
                {activeTab === 'financial' && (
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-2xl font-bold text-[#2B2E2B] mb-2">Financeiro</h1>
                      <p className="text-[#6E7D5B]">Acompanhe comissões e transações</p>
                    </div>

                    {/* Financial Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <Card className="shadow-lg border-0 bg-white">
                        <CardContent className="p-6 text-center">
                          <DollarSign className="w-8 h-8 text-[#3D9970] mx-auto mb-2" />
                          <p className="text-2xl font-bold text-[#1E4D2B]">R$ 12.450</p>
                          <p className="text-[#6E7D5B] text-sm">Comissão Recebida</p>
                        </CardContent>
                      </Card>
                      <Card className="shadow-lg border-0 bg-white">
                        <CardContent className="p-6 text-center">
                          <CreditCard className="w-8 h-8 text-[#C89F45] mx-auto mb-2" />
                          <p className="text-2xl font-bold text-[#1E4D2B]">R$ 890</p>
                          <p className="text-[#6E7D5B] text-sm">Comissão Paga</p>
                        </CardContent>
                      </Card>
                      <Card className="shadow-lg border-0 bg-white">
                        <CardContent className="p-6 text-center">
                          <Zap className="w-8 h-8 text-[#1E4D2B] mx-auto mb-2" />
                          <p className="text-2xl font-bold text-[#1E4D2B]">R$ 150</p>
                          <p className="text-[#6E7D5B] text-sm">Créditos</p>
                        </CardContent>
                      </Card>
                      <Card className="shadow-lg border-0 bg-white">
                        <CardContent className="p-6 text-center">
                          <PiggyBank className="w-8 h-8 text-[#C89F45] mx-auto mb-2" />
                          <p className="text-2xl font-bold text-[#1E4D2B]">R$ 247</p>
                          <p className="text-[#6E7D5B] text-sm">Cashback</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Transaction History */}
                    <Card className="shadow-lg border-0 bg-white">
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-[#2B2E2B]">Extrato de Transações</CardTitle>
                          <Button variant="outline" className="border-[#6E7D5B] text-[#6E7D5B]">
                            <Download className="w-4 h-4 mr-2" />
                            Exportar PDF
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[1, 2, 3, 4, 5].map((transaction) => (
                            <div key={transaction} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-[#3D9970]/10 rounded-full flex items-center justify-center">
                                  <DollarSign className="w-5 h-5 text-[#3D9970]" />
                                </div>
                                <div>
                                  <p className="font-medium text-[#2B2E2B]">Venda Leilão #123</p>
                                  <p className="text-[#6E7D5B] text-sm">15/03/2024 • Comissão recebida</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-[#3D9970]">+R$ 1.250,00</p>
                                <Badge className="bg-[#3D9970] text-white text-xs">Concluído</Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </>
            )}

            {/* Default content for unimplemented tabs */}
            {!['overview', 'auctions', 'marketplace', 'purchases', 'favorites', 'academy', 'ai-assistant', 'vip-club', 'messages', 'profile', 'my-animals', 'my-auctions', 'direct-catalog', 'promotions', 'seller-subscription', 'financial'].includes(activeTab) && (
              <Card className="shadow-lg border-0 bg-white">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-[#1E4D2B]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-8 h-8 text-[#1E4D2B]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#2B2E2B] mb-2">
                    Seção em Desenvolvimento
                  </h3>
                  <p className="text-[#6E7D5B]">
                    Esta funcionalidade estará disponível em breve.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Verification Modal */}
      {showVerificationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#2B2E2B]">
                  Verificação KYC Rural
                </h2>
                <button
                  onClick={() => setShowVerificationModal(false)}
                  className="text-[#6E7D5B] hover:text-[#2B2E2B] transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <p className="text-[#6E7D5B] mt-2">
                Faça upload dos documentos necessários para verificar sua conta
              </p>
            </div>

            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-2 border-dashed border-[#C89F45] rounded-lg p-6 text-center hover:border-[#1E4D2B] transition-colors duration-300">
                  <FileText className="w-12 h-12 text-[#C89F45] mx-auto mb-4" />
                  <h4 className="font-semibold text-[#2B2E2B] mb-2">
                    RG ou CNH
                  </h4>
                  <p className="text-sm text-[#6E7D5B] mb-4">
                    Documento de identificação
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload('rg', e.target.files?.[0] || null)}
                    className="hidden"
                    id="rg-upload-modal"
                  />
                  <label htmlFor="rg-upload-modal">
                    <Button type="button" variant="outline" className="border-[#C89F45] text-[#C89F45] hover:bg-[#C89F45] hover:text-white">
                      Escolher Arquivo
                    </Button>
                  </label>
                  {documents.rg && (
                    <Badge className="mt-2 bg-[#3D9970] text-white block">
                      ✓ Arquivo enviado
                    </Badge>
                  )}
                </div>

                <div className="border-2 border-dashed border-[#C89F45] rounded-lg p-6 text-center hover:border-[#1E4D2B] transition-colors duration-300">
                  <FileText className="w-12 h-12 text-[#C89F45] mx-auto mb-4" />
                  <h4 className="font-semibold text-[#2B2E2B] mb-2">
                    CPF
                  </h4>
                  <p className="text-sm text-[#6E7D5B] mb-4">
                    Comprovante de inscrição
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload('cpfCnpj', e.target.files?.[0] || null)}
                    className="hidden"
                    id="cpf-upload-modal"
                  />
                  <label htmlFor="cpf-upload-modal">
                    <Button type="button" variant="outline" className="border-[#C89F45] text-[#C89F45] hover:bg-[#C89F45] hover:text-white">
                      Escolher Arquivo
                    </Button>
                  </label>
                  {documents.cpfCnpj && (
                    <Badge className="mt-2 bg-[#3D9970] text-white block">
                      ✓ Arquivo enviado
                    </Badge>
                  )}
                </div>

                <div className="border-2 border-dashed border-[#C89F45] rounded-lg p-6 text-center hover:border-[#1E4D2B] transition-colors duration-300">
                  <FileText className="w-12 h-12 text-[#C89F45] mx-auto mb-4" />
                  <h4 className="font-semibold text-[#2B2E2B] mb-2">
                    Comprovante de Endereço
                  </h4>
                  <p className="text-sm text-[#6E7D5B] mb-4">
                    Conta de luz, água ou telefone
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload('addressProof', e.target.files?.[0] || null)}
                    className="hidden"
                    id="address-upload-modal"
                  />
                  <label htmlFor="address-upload-modal">
                    <Button type="button" variant="outline" className="border-[#C89F45] text-[#C89F45] hover:bg-[#C89F45] hover:text-white">
                      Escolher Arquivo
                    </Button>
                  </label>
                  {documents.addressProof && (
                    <Badge className="mt-2 bg-[#3D9970] text-white block">
                      ✓ Arquivo enviado
                    </Badge>
                  )}
                </div>

                <div className="border-2 border-dashed border-[#C89F45] rounded-lg p-6 text-center hover:border-[#1E4D2B] transition-colors duration-300">
                  <FileText className="w-12 h-12 text-[#C89F45] mx-auto mb-4" />
                  <h4 className="font-semibold text-[#2B2E2B] mb-2">
                    CAR (Opcional)
                  </h4>
                  <p className="text-sm text-[#6E7D5B] mb-4">
                    Cadastro Ambiental Rural
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload('car', e.target.files?.[0] || null)}
                    className="hidden"
                    id="car-upload-modal"
                  />
                  <label htmlFor="car-upload-modal">
                    <Button type="button" variant="outline" className="border-[#C89F45] text-[#C89F45] hover:bg-[#C89F45] hover:text-white">
                      Escolher Arquivo
                    </Button>
                  </label>
                  {documents.car && (
                    <Badge className="mt-2 bg-[#3D9970] text-white block">
                      ✓ Arquivo enviado
                    </Badge>
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setShowVerificationModal(false)}
                  className="border-[#6E7D5B] text-[#6E7D5B] hover:bg-[#6E7D5B] hover:text-white"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleVerificationSubmit}
                  className="bg-[#C89F45] hover:bg-[#B8913D] text-white"
                  disabled={!documents.rg || !documents.cpfCnpj || !documents.addressProof}
                >
                  Enviar Documentos
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}