'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  BarChart3, Users, Store, FileText, Gavel, CreditCard, 
  FileCheck, Gift, Crown, GraduationCap, MessageSquare, 
  Settings, Menu, X, LogOut, Home, AlertTriangle,
  ChevronDown, UserCircle, Key, Shield, Heart, Package, Star,
  ShoppingBag, DollarSign, BookOpen, User, ShoppingCart, CircleDot
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/use-toast'
import { useIsMobile } from '@/hooks/use-mobile'
import { useAdminPermissions } from '@/hooks/useAdminPermissions'
import { useCart } from '@/contexts/CartContext'
import LoadingSpinner from '@/components/LoadingSpinner'

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const authContext = useAuth()
  const { user, signOut } = authContext || {}
  const { toast } = useToast()
  const isMobile = useIsMobile()
  const { canAccessSection, isAdmin, isSeller, isBuyer } = useAdminPermissions()
  const { getTotalItems } = useCart()
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  
  const cartItemsCount = getTotalItems()

  // Verificar se o contexto de autenticação está disponível
  if (!authContext) {
    return <LoadingSpinner text="Carregando..." fullScreen />
  }

  // Fechar menu do usuário quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isUserMenuOpen) {
        const target = event.target as Element
        if (!target.closest('[data-user-menu]')) {
          setIsUserMenuOpen(false)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isUserMenuOpen])

  // Ajustar sidebar baseado no tamanho da tela
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false)
    } else {
      setSidebarOpen(true)
    }
  }, [isMobile])

  // Fechar sidebar quando trocar de seção no mobile
  const handleSectionChange = () => {
    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  // Definir itens do menu baseado no role do usuário
  const getMenuItems = () => {
    const allMenuItems = [
      { id: 'visao-geral', label: 'Visão Geral', icon: BarChart3, alerts: 0, roles: ['admin', 'vendedor', 'comprador'], href: '/dashboard/visao-geral' },
      { id: 'favoritos', label: 'Favoritos', icon: Heart, alerts: 0, roles: ['admin', 'vendedor', 'comprador'], href: '/dashboard/favoritos' },
      { id: 'minhas-compras', label: 'Minhas Compras', icon: ShoppingBag, alerts: 0, roles: ['comprador'], href: '/dashboard/minhas-compras' },
      { id: 'financeiro', label: 'Financeiro', icon: DollarSign, alerts: 0, roles: ['comprador'], href: '/dashboard/financeiro' },
      { id: 'treinamentos', label: 'Treinamentos', icon: BookOpen, alerts: 0, roles: ['admin', 'vendedor', 'comprador'], href: '/dashboard/treinamentos' },
      { id: 'minha-conta', label: 'Minha Conta', icon: User, alerts: 0, roles: ['admin', 'vendedor', 'comprador'], href: '/dashboard/minha-conta' },
      { id: 'usuarios', label: 'Usuários', icon: Users, alerts: 0, roles: ['admin'], href: '/dashboard/usuarios' },
      { id: 'vendedores', label: 'Vendedores', icon: Store, alerts: 3, roles: ['admin'], href: '/dashboard/vendedores' },
      { id: 'anuncios', label: 'Anúncios', icon: FileText, alerts: 7, roles: ['admin', 'vendedor'], href: '/dashboard/anuncios' },
      { id: 'animais', label: 'Animais', icon: CircleDot, alerts: 0, roles: ['admin', 'vendedor', 'comprador'], href: '/dashboard/animais' },
      { id: 'produtos', label: 'Produtos', icon: Package, alerts: 0, roles: ['admin', 'vendedor', 'comprador'], href: '/dashboard/produtos' },
      { id: 'leiloes', label: 'Leilões', icon: Gavel, alerts: 0, roles: ['admin', 'vendedor', 'comprador'], href: '/dashboard/leiloes' },
      { id: 'transacoes', label: 'Transações', icon: CreditCard, alerts: 2, roles: ['admin', 'vendedor', 'comprador'], href: '/dashboard/transacoes' },
      { id: 'documentos', label: 'Documentos (KYC)', icon: FileCheck, alerts: 12, roles: ['admin'], href: '/dashboard/documentos' },
      { id: 'cashback', label: 'Cashback', icon: Gift, alerts: 5, roles: ['admin', 'vendedor', 'comprador'], href: '/dashboard/cashback' },
      { id: 'vip', label: 'Plano VIP e Clube', icon: Crown, alerts: 0, roles: ['admin', 'vendedor', 'comprador'], href: '/dashboard/vip' },
      { id: 'academy', label: 'Academy / IA Agro', icon: GraduationCap, alerts: 0, roles: ['admin', 'vendedor', 'comprador'], href: '/dashboard/academy' },
      { id: 'mensagens', label: 'Mensagens e Suporte', icon: MessageSquare, alerts: 8, roles: ['admin', 'vendedor', 'comprador'], href: '/dashboard/mensagens' },
      { id: 'funcoes', label: 'Funções', icon: Shield, alerts: 0, roles: ['admin'], href: '/dashboard/funcoes' },
      { id: 'configuracoes', label: 'Configurações', icon: Settings, alerts: 0, roles: ['admin'], href: '/dashboard/configuracoes' }
    ]

    if (!user) return []

    // Filtrar itens baseado nas permissões do usuário
    return allMenuItems.filter(item => {
      return canAccessSection(item.id)
    })
  }

  const menuItems = getMenuItems()
  const totalAlerts = menuItems.reduce((sum, item) => sum + item.alerts, 0)

  // Obter item ativo baseado na rota atual
  const activeItem = menuItems.find(item => pathname === item.href)

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <div className="h-screen bg-[#F7F6F2] flex overflow-hidden">
        {/* Sidebar */}
      <div className={`${
        sidebarOpen ? 'w-80' : 'w-20'
      } transition-all duration-300 bg-white shadow-xl border-r border-gray-200 flex flex-col fixed lg:relative z-50 h-screen min-h-screen ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } ${!sidebarOpen ? 'lg:shadow-2xl' : ''} overflow-hidden`}>
        {/* Header da Sidebar */}
        <div className="p-4 sm:p-6 border-b border-gray-200 flex-shrink-0 overflow-hidden">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-[#1E4D2B]">TudoAgro</h1>
                <p className="text-xs sm:text-sm text-[#6E7D5B]">
                  {isAdmin ? 'Painel Administrativo' : 
                   isSeller ? 'Painel do Vendedor' : 
                   'Painel do Usuário'}
                </p>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-[#6E7D5B] hover:text-[#1E4D2B] hover:bg-[#F7F6F2] group relative overflow-hidden"
              title={sidebarOpen ? "Fechar Menu" : "Abrir Menu"}
            >
              {sidebarOpen ? (
                <X className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
              ) : (
                <Menu className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
              )}
              
              {/* Tooltip para sidebar fechada */}
              {!sidebarOpen && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 max-w-32">
                  Abrir Menu
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                </div>
              )}
            </Button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto py-4 min-h-0 relative overflow-x-hidden">
          {/* Indicador de scroll superior */}
          <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"></div>
          
          {/* Indicador de scroll inferior */}
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none"></div>
          
          <nav className="space-y-1 px-3">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={handleSectionChange}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-all duration-200 group relative overflow-hidden ${
                    isActive 
                      ? 'bg-[#1E4D2B] text-white shadow-lg' 
                      : 'text-[#6E7D5B] hover:bg-[#F7F6F2] hover:text-[#1E4D2B]'
                  }`}
                  title={!sidebarOpen ? item.label : undefined}
                >
                  <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? 'text-white' : 'text-[#6E7D5B] group-hover:text-[#1E4D2B]'}`} />
                  {sidebarOpen && (
                    <>
                      <span className="font-medium flex-1 text-sm sm:text-base">{item.label}</span>
                      {item.alerts > 0 && (
                        <Badge className={`${
                          isActive ? 'bg-white text-[#1E4D2B]' : 'bg-[#B8413D] text-white'
                        } text-xs px-2 py-1`}>
                          {item.alerts}
                        </Badge>
                      )}
                    </>
                  )}
                  {!sidebarOpen && item.alerts > 0 && (
                    <div className="absolute right-2 w-2 h-2 bg-[#B8413D] rounded-full"></div>
                  )}
                  
                  {/* Tooltip para sidebar fechada */}
                  {!sidebarOpen && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 max-w-48">
                      {item.label}
                      {item.alerts > 0 && (
                        <span className="ml-1 text-red-300">({item.alerts})</span>
                      )}
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                    </div>
                  )}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Footer da Sidebar */}
        <div className="p-3 sm:p-4 border-t border-gray-200 flex-shrink-0 overflow-hidden">
          {sidebarOpen ? (
            <div className="mb-4 p-3 bg-[#F7F6F2] rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-[#B8413D]" />
                <span className="text-sm font-medium text-[#2B2E2B]">Alertas Pendentes</span>
              </div>
              <p className="text-2xl font-bold text-[#B8413D]">{totalAlerts}</p>
              <p className="text-xs text-[#6E7D5B]">Requerem atenção</p>
            </div>
          ) : (
            totalAlerts > 0 && (
              <div className="mb-4 p-2 bg-red-50 rounded-lg group relative">
                <div className="flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-[#B8413D]" />
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#B8413D] text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {totalAlerts}
                  </div>
                </div>
                
                {/* Tooltip para sidebar fechada */}
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 max-w-40">
                  {totalAlerts} alerta{totalAlerts > 1 ? 's' : ''} pendente{totalAlerts > 1 ? 's' : ''}
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                </div>
              </div>
            )
          )}
          
          <Button
            variant="ghost"
            className={`w-full justify-start text-[#6E7D5B] hover:text-[#B8413D] hover:bg-red-50 group relative overflow-hidden ${
              !sidebarOpen ? 'hover:bg-red-100' : ''
            }`}
            onClick={async () => {
              try {
                if (signOut) {
                  await signOut()
                  toast({
                    title: "Logout realizado",
                    description: "Você foi desconectado com sucesso.",
                  })
                  // O ProtectedRoute redirecionará automaticamente para login
                } else {
                  console.error('signOut function not available')
                  toast({
                    title: "Erro no logout",
                    description: "Função de logout não disponível. Recarregue a página.",
                    variant: "destructive",
                  })
                }
              } catch (error) {
                console.error('Logout error:', error)
                toast({
                  title: "Erro no logout",
                  description: "Ocorreu um erro ao fazer logout. Tente novamente.",
                  variant: "destructive",
                })
              }
            }}
            title={sidebarOpen ? "Sair do Sistema" : "Sair"}
          >
            <LogOut className={`w-4 h-4 sm:w-5 sm:h-5 ${sidebarOpen ? 'mr-3' : ''} group-hover:scale-110 transition-transform`} />
            {sidebarOpen && <span className="text-sm sm:text-base">Sair do Sistema</span>}
            
            {/* Indicador visual para sidebar fechada */}
            {!sidebarOpen && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            )}
            
            {/* Tooltip para sidebar fechada */}
            {!sidebarOpen && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 max-w-32">
                Sair do Sistema
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
              </div>
            )}
          </Button>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0 h-screen">
        {/* Header Principal */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-[#6E7D5B] hover:text-[#1E4D2B] hover:bg-[#F7F6F2] group"
                title="Abrir Menu"
              >
                <Menu className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
              </Button>
              
              <img 
                src="/fotos/tudo-agro-logo.png" 
                className="h-6 w-auto sm:h-8 md:h-10 lg:h-12" 
                alt="TudoAgro Logo"
              />
              <div className="hidden sm:block">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#2B2E2B]">
                  {activeItem?.label || 'Dashboard'}
                </h2>
                <p className="text-[#6E7D5B] text-xs sm:text-sm hidden md:block">
                  {isAdmin ? 'Gerencie e monitore as operações da plataforma' :
                   isSeller ? 'Gerencie seus produtos, leilões e vendas' :
                   'Acompanhe suas compras, leilões e atividades'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Carrinho */}
              {isBuyer && (
                <Link href="/dashboard/carrinho">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="relative text-[#6E7D5B] hover:text-emerald-600 transition-colors"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {cartItemsCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {cartItemsCount > 99 ? '99+' : cartItemsCount}
                      </span>
                    )}
                  </Button>
                </Link>
              )}
              
              {/* User Menu */}
              <div className="relative" data-user-menu>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-2 bg-[#F7F6F2] rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#1E4D2B] rounded-full flex items-center justify-center">
                    <span className="text-white text-xs sm:text-sm font-bold">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div className="text-sm text-left hidden sm:block">
                    <p className="font-medium text-[#2B2E2B] text-xs sm:text-sm">
                      {isAdmin ? 'Administrador' : 
                       isSeller ? 'Vendedor' : 
                       'Usuário'}
                    </p>
                    <p className="text-[#6E7D5B] text-xs truncate max-w-32">{user?.email}</p>
                  </div>
                  <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 text-[#6E7D5B] transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 max-h-96 overflow-y-auto">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user?.name || 'Usuário'}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    
                    {/* Opções do usuário */}
                    <div className="py-1">
                      <Link 
                        href="/dashboard/minha-conta"
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <UserCircle className="w-4 h-4 mr-3" />
                        Minha Conta
                      </Link>
                      
                      <Link 
                        href="/dashboard/trocar-senha"
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Key className="w-4 h-4 mr-3" />
                        Trocar Senha
                      </Link>
                      
                      <Link 
                        href="/dashboard/configuracoes"
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4 mr-3" />
                        Configurações
                      </Link>
                    </div>
                    
                    {/* Separador */}
                    <div className="border-t border-gray-100 my-1"></div>
                    
                    {/* Logout */}
                    <button
                      onClick={async () => {
                        try {
                          if (signOut) {
                            await signOut()
                            toast({
                              title: "Logout realizado",
                              description: "Você foi desconectado com sucesso.",
                            })
                            // O ProtectedRoute redirecionará automaticamente para login
                          } else {
                            console.error('signOut function not available')
                            toast({
                              title: "Erro no logout",
                              description: "Função de logout não disponível. Recarregue a página.",
                              variant: "destructive",
                            })
                          }
                        } catch (error) {
                          console.error('Logout error:', error)
                          toast({
                            title: "Erro no logout",
                            description: "Ocorreu um erro ao fazer logout. Tente novamente.",
                            variant: "destructive",
                          })
                        }
                        setIsUserMenuOpen(false)
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Sair
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Conteúdo da Seção */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 min-h-0">
          {children}
        </main>
      </div>
      </div>
    </>
  )
}