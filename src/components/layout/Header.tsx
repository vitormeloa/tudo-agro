'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Menu, 
  X, 
  Search, 
  Heart, 
  User, 
  ShoppingCart,
  Bell,
  ChevronDown,
  LogOut,
  Settings,
  Shield,
  Key,
  Edit,
  UserCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/use-toast'

interface HeaderProps {
  variant?: 'default' | 'transparent' | 'minimal'
  showSearch?: boolean
  showNotifications?: boolean
  showCart?: boolean
  className?: string
  enableScrollOpacity?: boolean
}

export default function Header({ 
  variant = 'default', 
  showSearch = true,
  showNotifications = true,
  showCart = true,
  className,
  enableScrollOpacity = true
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const { user, loading, signOut, isAdmin } = useAuth()
  const { toast } = useToast()

  // Efeito de scroll para opacidade
  useEffect(() => {
    if (!enableScrollOpacity) return

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [enableScrollOpacity])

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

  const navigation = [
    { name: 'Início', href: '/', current: false },
    { name: 'Animais', href: '/catalogo', current: false },
    { name: 'Leilões', href: '/leiloes', current: false },
    { name: 'Produtos', href: '/produtos', current: false },
    // { name: 'Vender', href: '/vender', current: false }, // Temporariamente oculto
    { name: 'Sobre', href: '/sobre', current: false },
  ]

  const baseClasses = "sticky top-0 z-50 transition-all duration-300"
  
  // Calcular opacidade e background baseado no scroll
  const getScrollStyles = () => {
    if (!enableScrollOpacity) {
      return {
        backgroundColor: variant === 'transparent' ? 'transparent' : 'white',
        backdropFilter: variant === 'transparent' ? 'none' : 'blur(12px)'
      }
    }

    const maxScroll = 100
    const scrollProgress = Math.min(scrollY / maxScroll, 1)
    
    if (variant === 'transparent') {
      // Para variant transparent, mudar de transparente para opaco com fundo branco
      const opacity = scrollProgress
      return {
        backgroundColor: `rgba(255, 255, 255, ${opacity})`,
        backdropFilter: scrollProgress > 0.1 ? 'blur(12px)' : 'none'
      }
    }
    
    // Para outros variants, manter comportamento original
    const opacity = Math.max(0.85, 0.95 - (scrollProgress * 0.1))
    return {
      backgroundColor: `rgba(255, 255, 255, ${opacity})`,
      backdropFilter: 'blur(12px)'
    }
  }

  const variantClasses = {
    default: `backdrop-blur-md border-b border-gray-200/50 shadow-sm`,
    transparent: scrollY > 10 ? "backdrop-blur-md border-b border-gray-200/50 shadow-sm" : "bg-transparent",
    minimal: "bg-white border-b border-gray-100"
  }

  const scrollStyles = getScrollStyles()

  return (
    <header 
      className={cn(baseClasses, variantClasses[variant], className)}
      style={scrollStyles}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <img 
                src="/fotos/tudo-agro-logo.png" 
                className="h-22 w-auto sm:h-18 md:h-22 lg:h-24 xl:h-26 2xl:h-30"
                alt="TudoAgro Logo"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium transition-all duration-200 group",
                  item.current
                    ? "text-emerald-600"
                    : "text-gray-700 hover:text-emerald-600"
                )}
              >
                {item.name}
                {item.current && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
                )}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Mostrar ícones apenas quando logado */}
            {user && !loading && (
              <>
                {/*/!* Search *!/*/}
                {/*{showSearch && (*/}
                {/*  <div className="hidden md:block">*/}
                {/*    <Button*/}
                {/*      variant="ghost"*/}
                {/*      size="sm"*/}
                {/*      onClick={() => setIsSearchOpen(!isSearchOpen)}*/}
                {/*      className="text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"*/}
                {/*    >*/}
                {/*      <Search className="w-5 h-5" />*/}
                {/*    </Button>*/}
                {/*  </div>*/}
                {/*)}*/}

                {/*/!* Notifications *!/*/}
                {/*{showNotifications && (*/}
                {/*  <Button*/}
                {/*    variant="ghost"*/}
                {/*    size="sm"*/}
                {/*    className="relative text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"*/}
                {/*  >*/}
                {/*    <Bell className="w-5 h-5" />*/}
                {/*    <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">*/}
                {/*      3*/}
                {/*    </Badge>*/}
                {/*  </Button>*/}
                {/*)}*/}

                {/*/!* Favorites *!/*/}
                {/*<Button*/}
                {/*  variant="ghost"*/}
                {/*  size="sm"*/}
                {/*  className="text-gray-600 hover:text-red-500 hover:bg-red-50"*/}
                {/*>*/}
                {/*  <Heart className="w-5 h-5" />*/}
                {/*</Button>*/}

                {/*/!* Cart *!/*/}
                {/*{showCart && (*/}
                {/*  <Button*/}
                {/*    variant="ghost"*/}
                {/*    size="sm"*/}
                {/*    className="relative text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"*/}
                {/*  >*/}
                {/*    <ShoppingCart className="w-5 h-5" />*/}
                {/*    <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center">*/}
                {/*      2*/}
                {/*    </Badge>*/}
                {/*  </Button>*/}
                {/*)}*/}

                {/* User Menu */}
                <div className="hidden md:flex items-center space-x-2 relative" data-user-menu>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"
                  >
                    <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </Button>

                  {/* User Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user.name || 'Usuário'}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      
                      {/* Opções do usuário */}
                      <div className="py-1">
                        <Link 
                          href="/perfil" 
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <UserCircle className="w-4 h-4 mr-3" />
                          Meu Perfil
                        </Link>
                        
                        <Link 
                          href="/perfil/senha" 
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Key className="w-4 h-4 mr-3" />
                          Trocar Senha
                        </Link>
                        
                        <Link 
                          href="/perfil/configuracoes" 
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Settings className="w-4 h-4 mr-3" />
                          Configurações
                        </Link>
                      </div>
                      
                      {/* Separador */}
                      <div className="border-t border-gray-100 my-1"></div>
                      
                      {/* Painel administrativo */}
                      {isAdmin && (
                        <Link 
                          href="/dashboard/visao-geral" 
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Shield className="w-4 h-4 mr-3" />
                          Painel
                        </Link>
                      )}
                      
                      {/* Logout */}
                      <button
                        onClick={async () => {
                          try {
                            await signOut()
                            toast({
                              title: "Logout realizado",
                              description: "Você foi desconectado com sucesso.",
                            })
                          } catch (error) {
                            toast({
                              title: "Erro no logout",
                              description: "Ocorreu um erro ao fazer logout. Tente novamente.",
                              variant: "destructive",
                            })
                          }
                          setIsUserMenuOpen(false)
                        }}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Sair
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Auth Buttons - mostrar apenas quando não logado */}
            {!user && !loading && (
              <div className="hidden md:flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="text-gray-700 hover:text-emerald-600">
                    Entrar
                  </Button>
                </Link>
                <Link href="/cadastro">
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Cadastrar
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-gray-600 hover:text-emerald-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar animais, raças, localização..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200",
                    item.current
                      ? "bg-emerald-50 text-emerald-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-emerald-600"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Auth */}
              <div className="pt-4 border-t border-gray-200">
                {user ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2">
                      <p className="text-sm font-medium text-gray-900">{user.name || 'Usuário'}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    
                    {/* Opções do usuário mobile */}
                    <div className="space-y-1">
                      <Link href="/perfil" className="block" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="outline" className="w-full justify-start">
                          <UserCircle className="w-4 h-4 mr-2" />
                          Meu Perfil
                        </Button>
                      </Link>
                      
                      <Link href="/perfil/senha" className="block" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="outline" className="w-full justify-start">
                          <Key className="w-4 h-4 mr-2" />
                          Trocar Senha
                        </Button>
                      </Link>
                      
                      <Link href="/perfil/configuracoes" className="block" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="outline" className="w-full justify-start">
                          <Settings className="w-4 h-4 mr-2" />
                          Configurações
                        </Button>
                      </Link>
                      
                      {isAdmin && (
                        <Link href="/dashboard/visao-geral" className="block" onClick={() => setIsMenuOpen(false)}>
                          <Button variant="outline" className="w-full justify-start">
                            <Shield className="w-4 h-4 mr-2" />
                            Painel
                          </Button>
                        </Link>
                      )}
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={async () => {
                        try {
                          await signOut()
                          toast({
                            title: "Logout realizado",
                            description: "Você foi desconectado com sucesso.",
                          })
                        } catch (error) {
                          toast({
                            title: "Erro no logout",
                            description: "Ocorreu um erro ao fazer logout. Tente novamente.",
                            variant: "destructive",
                          })
                        }
                        setIsMenuOpen(false)
                      }}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sair
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link href="/login" className="block">
                      <Button variant="outline" className="w-full justify-start">
                        <User className="w-4 h-4 mr-2" />
                        Entrar
                      </Button>
                    </Link>
                    <Link href="/cadastro" className="block">
                      <Button className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700">
                        Cadastrar
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
