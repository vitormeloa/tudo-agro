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

  if (!authContext) {
    return <LoadingSpinner text="Carregando..." fullScreen />
  }

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

  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false)
    } else {
      setSidebarOpen(true)
    }
  }, [isMobile])

  const handleSectionChange = () => {
    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  const getMenuItems = () => {
    const allMenuItems = [
      { id: 'visao-geral', label: 'Visão Geral', icon: BarChart3, alerts: 0, roles: ['admin', 'vendedor', 'comprador'], href: '/dashboard' },
      { id: 'favoritos', label: 'Favoritos', icon: Heart, alerts: 0, roles: ['admin', 'vendedor', 'comprador'], href: '/dashboard/favoritos' },
      { id: 'minhas-compras', label: 'Minhas Compras', icon: ShoppingBag, alerts: 0, roles: ['comprador', 'vendedor', 'admin'], href: '/dashboard/minhas-compras' },
      { id: 'financeiro', label: 'Financeiro', icon: DollarSign, alerts: 0, roles: ['comprador', 'vendedor', 'admin'], href: '/dashboard/financeiro' },
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

    return allMenuItems.filter(item => {
      return canAccessSection(item.id)
    })
  }

  const menuItems = getMenuItems()
  const totalAlerts = menuItems.reduce((sum, item) => sum + item.alerts, 0)

  const activeItem = menuItems.find(item => pathname === item.href)

  return (
    <>
      {}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <div className="h-screen bg-[#F7F6F2] flex overflow-hidden">
        {}
      <div className={`${
        sidebarOpen ? 'w-80' : 'w-20'
      } transition-all duration-300 bg-white shadow-xl border-r border-gray-200 flex flex-col fixed lg:relative z-50 h-screen min-h-screen ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } ${!sidebarOpen ? 'lg:shadow-2xl' : ''} overflow-hidden`}>
        {}
        <div className="p-4 sm:p-6 border-b border-gray-200 flex-shrink-0 overflow-hidden">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-primary">TudoAgro</h1>
                <p className="text-xs sm:text-sm text-gray-600">
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
              className="text-gray-600 hover:text-primary hover:bg-gray-100 group relative overflow-hidden"
              title={sidebarOpen ? "Fechar Menu" : "Abrir Menu"}
            >
              {sidebarOpen ? (
                <X className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
              ) : (
                <Menu className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
              )}
              
              {}
              {!sidebarOpen && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 max-w-32">
                  Abrir Menu
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                </div>
              )}
            </Button>
          </div>
        </div>

        {}
        <div className="flex-1 overflow-y-auto py-4 min-h-0 relative overflow-x-hidden">
          {}
          <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"></div>
          
          {}
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
                      ? 'bg-primary text-white shadow-lg' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-primary'
                  }`}
                  title={!sidebarOpen ? item.label : undefined}
                >
                  <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? 'text-white' : 'text-gray-600 group-hover:text-primary'}`} />
                  {sidebarOpen && (
                    <>
                      <span className="font-medium flex-1 text-sm sm:text-base">{item.label}</span>
                      {item.alerts > 0 && (
                        <Badge className={`${
                          isActive ? 'bg-white text-primary' : 'bg-[#B8413D] text-white'
                        } text-xs px-2 py-1`}>
                          {item.alerts}
                        </Badge>
                      )}
                    </>
                  )}
                  {!sidebarOpen && item.alerts > 0 && (
                    <div className="absolute right-2 w-2 h-2 bg-[#B8413D] rounded-full"></div>
                  )}
                  
                  {}
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

        {}
        <div className="p-3 sm:p-4 border-t border-gray-200 flex-shrink-0 overflow-hidden">
          {sidebarOpen ? (
            <div className="mb-4 p-3 bg-[#F7F6F2] rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-[#101828]">Alertas Pendentes</span>
              </div>
              <p className="text-2xl font-bold text-red-600">{totalAlerts}</p>
              <p className="text-xs text-gray-600">Requerem atenção</p>
            </div>
          ) : (
            totalAlerts > 0 && (
              <div className="mb-4 p-2 bg-red-50 rounded-lg group relative">
                <div className="flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#B8413D] text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {totalAlerts}
                  </div>
                </div>
                
                {}
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 max-w-40">
                  {totalAlerts} alerta{totalAlerts > 1 ? 's' : ''} pendente{totalAlerts > 1 ? 's' : ''}
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                </div>
              </div>
            )
          )}
          
          <Button
            variant="ghost"
            className={`w-full justify-start text-gray-600 hover:text-red-600 hover:bg-red-50 group relative overflow-hidden ${
              !sidebarOpen ? 'hover:bg-red-100' : ''
            }`}
            onClick={async () => {
              try {
                if (signOut) {
                  await signOut()
                } else {
                  console.error('signOut function not available')
                  localStorage.clear()
                  sessionStorage.clear()
                  window.location.href = '/login'
                }
              } catch (error) {
                console.error('Logout error:', error)
                try {
                  localStorage.clear()
                  sessionStorage.clear()
                } catch (e) {
                }
                window.location.href = '/login'
              }
            }}
            title={sidebarOpen ? "Sair do Sistema" : "Sair"}
          >
            <LogOut className={`w-4 h-4 sm:w-5 sm:h-5 ${sidebarOpen ? 'mr-3' : ''} group-hover:scale-110 transition-transform`} />
            {sidebarOpen && <span className="text-sm sm:text-base">Sair do Sistema</span>}
            
            {}
            {!sidebarOpen && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            )}
            
            {}
            {!sidebarOpen && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 max-w-32">
                Sair do Sistema
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
              </div>
            )}
          </Button>
        </div>
      </div>

      {}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0 h-screen">
        {}
        <header className="bg-white shadow-sm border-b border-gray-200 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              {}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-gray-600 hover:text-primary hover:bg-gray-100 group"
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
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#101828]">
                  {activeItem?.label || 'Dashboard'}
                </h2>
                <p className="text-gray-600 text-xs sm:text-sm hidden md:block">
                  {isAdmin ? 'Gerencie e monitore as operações da plataforma' :
                   isSeller ? 'Gerencie seus produtos, leilões e vendas' :
                   'Acompanhe suas compras, leilões e atividades'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4">
              {}
              {isBuyer && (
              <Link href="/dashboard/favoritos">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-red-500 transition-colors"
                  title="Meus Favoritos"
                >
                  <Heart className="w-5 h-5" />
                </Button>
              </Link>
              )}
              
              {}
              {isBuyer && (
                <Link href="/dashboard/carrinho">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="relative text-gray-600 hover:text-primary transition-colors"
                    title="Carrinho"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {cartItemsCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {cartItemsCount > 99 ? '99+' : cartItemsCount}
                      </span>
                    )}
                  </Button>
                </Link>
              )}
              
              {}
              <div className="relative" data-user-menu>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-2 bg-[#F7F6F2] rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-xs sm:text-sm font-bold">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div className="text-sm text-left hidden sm:block">
                    <p className="font-medium text-[#101828] text-xs sm:text-sm">
                      {isAdmin ? 'Administrador' : 
                       isSeller ? 'Vendedor' : 
                       'Usuário'}
                    </p>
                    <p className="text-gray-600 text-xs truncate max-w-32">{user?.email}</p>
                  </div>
                  <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-600 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {}
                {isUserMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 max-h-96 overflow-y-auto">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-[#101828]">{user?.name || 'Usuário'}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    
                    {}
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
                    
                    {}
                    <div className="border-t border-gray-100 my-1"></div>
                    
                    {}
                    <button
                      onClick={async () => {
                        setIsUserMenuOpen(false)
                        try {
                          if (signOut) {
                            await signOut()
                          } else {
                            console.error('signOut function not available')
                            localStorage.clear()
                            sessionStorage.clear()
                            window.location.href = '/'
                          }
                        } catch (error) {
                          console.error('Logout error:', error)
                          try {
                            localStorage.clear()
                            sessionStorage.clear()
                          } catch (e) {
                          }
                          window.location.href = '/'
                        }
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

        {}
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 min-h-0">
          {children}
        </main>
      </div>

      {}
      
      </div>
    </>
  )
}