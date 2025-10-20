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
  Settings
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/useAuth'

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
  const { user, loading, signOut } = useAuth()

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
    { name: 'Catálogo', href: '/catalogo', current: false },
    { name: 'Leilões', href: '/leiloes', current: false },
    { name: 'Vender', href: '/vender', current: false },
    { name: 'Sobre', href: '/sobre', current: false },
  ]

  const baseClasses = "sticky top-0 z-50 transition-all duration-300"
  
  // Calcular opacidade baseada no scroll
  const getOpacity = () => {
    if (!enableScrollOpacity || variant === 'transparent') return 1
    const maxScroll = 100
    const opacity = Math.min(scrollY / maxScroll, 1)
    return Math.max(0.85, 0.95 - (opacity * 0.1)) // Mínimo de 85% de opacidade
  }

  const variantClasses = {
    default: `backdrop-blur-md border-b border-gray-200/50 shadow-sm`,
    transparent: "bg-transparent",
    minimal: "bg-white border-b border-gray-100"
  }

  const getBackgroundStyle = () => {
    if (variant === 'transparent') return 'transparent'
    if (variant === 'minimal') return 'white'
    
    const opacity = getOpacity()
    return `rgba(255, 255, 255, ${opacity})`
  }

  return (
    <header 
      className={cn(baseClasses, variantClasses[variant], className)}
      style={{ 
        backgroundColor: getBackgroundStyle(),
        backdropFilter: variant === 'transparent' ? 'none' : 'blur(12px)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-green-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">M</span>
                </div>
              </div>
              <div className="hidden sm:block">
                <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  TudoAgro
                </span>
                <div className="text-xs text-gray-500 -mt-1">Marketplace Agro</div>
              </div>
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
                {/* Search */}
                {showSearch && (
                  <div className="hidden md:block">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsSearchOpen(!isSearchOpen)}
                      className="text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"
                    >
                      <Search className="w-5 h-5" />
                    </Button>
                  </div>
                )}

                {/* Notifications */}
                {showNotifications && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="relative text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"
                  >
                    <Bell className="w-5 h-5" />
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                      3
                    </Badge>
                  </Button>
                )}

                {/* Favorites */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-red-500 hover:bg-red-50"
                >
                  <Heart className="w-5 h-5" />
                </Button>

                {/* Cart */}
                {showCart && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="relative text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center">
                      2
                    </Badge>
                  </Button>
                )}

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
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user.name || 'Usuário'}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <Link href="/painel" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <Settings className="w-4 h-4 inline mr-2" />
                        Painel
                      </Link>
                      <button
                        onClick={() => {
                          signOut()
                          setIsUserMenuOpen(false)
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <LogOut className="w-4 h-4 inline mr-2" />
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
                    <Link href="/painel" className="block">
                      <Button variant="outline" className="w-full justify-start">
                        <Settings className="w-4 h-4 mr-2" />
                        Painel
                      </Button>
                    </Link>
                    <button
                      onClick={() => {
                        signOut()
                        setIsMenuOpen(false)
                      }}
                      className="w-full"
                    >
                      <Button variant="outline" className="w-full justify-start">
                        <LogOut className="w-4 h-4 mr-2" />
                        Sair
                      </Button>
                    </button>
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
