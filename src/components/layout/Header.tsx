'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Menu, 
  X, 
  Search,
  ShoppingCart,
  Heart
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/useAuth'
import { useCart } from '@/contexts/CartContext'
import AuthButton from './AuthButton'
import MobileAuthButton from './MobileAuthButton'

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
  const [scrollY, setScrollY] = useState(0)
  const { user, loading, initialized } = useAuth()
  const { getTotalItems } = useCart()
  const cartItemsCount = getTotalItems()
  
  // Determinar se usuário está logado - ser mais permissivo para evitar desaparecimento de botões
  // Se tem user, está logado. Se não inicializou ainda, não mostrar botões (evita flickering)
  const isLoggedIn = initialized ? !!user : false

  // Efeito de scroll para opacidade
  useEffect(() => {
    if (!enableScrollOpacity) return;

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [enableScrollOpacity])

  // Prevenir scroll do body quando menu mobile está aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen]);

  const navigation = [
    { name: 'Início', href: '/', current: false },
    { name: 'Animais', href: '/catalogo', current: false },
    { name: 'Leilões', href: '/leiloes', current: false },
    { name: 'Produtos', href: '/produtos', current: false },
    { name: 'Blog', href: '/blog', current: false },
    // { name: 'Vender', href: '/vender', current: false }, // Temporariamente oculto
    { name: 'Sobre', href: '/sobre', current: false },
  ]

  const baseClasses = "sticky top-0 z-[60] transition-all duration-300"
  
  // Calcular opacidade e background baseado no scroll
  const getScrollStyles = () => {
    if (isMenuOpen) {
      return {
        backgroundColor: 'white',
        backdropFilter: 'none'
      }
    }
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
                    ? "text-primary"
                    : "text-gray-700 hover:text-primary"
                )}
              >
                {item.name}
                {item.current && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Carrinho - apenas quando logado */}
            {showCart && isLoggedIn && (
              <Link href="/dashboard/carrinho">
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative text-gray-600 hover:text-primary transition-colors"
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
            
            {/* Favoritos - apenas quando logado */}
            {isLoggedIn && (
              <Link href="/dashboard/favoritos">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-red-500 transition-colors"
                >
                  <Heart className="w-5 h-5" />
                </Button>
              </Link>
            )}
            
            {/* Desktop Auth Button Component - sempre mostrar após inicialização */}
            {initialized && <AuthButton />}

            {/* Mobile Auth Buttons - apenas quando não inicializado ou não logado */}
            {(!initialized || (!isLoggedIn && initialized)) && (
              <div className="lg:hidden flex items-center space-x-2">
                {!initialized ? (
                  <div className="w-20 h-8 bg-gray-200 animate-pulse rounded" />
                ) : (
                  <>
                    <Link href="/login">
                      <Button variant="ghost" size="sm" className="text-gray-700 hover:text-primary text-sm">
                        Entrar
                      </Button>
                    </Link>
                    <Link href="/cadastro">
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-primary to-primary hover:from-primary/90 hover:to-primary/90 text-white text-sm"
                      >
                        Cadastrar
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-gray-600 hover:text-primary"
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
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Mobile Navigation Overlay */}
        {isMenuOpen && (
          <div 
            className="fixed top-16 lg:top-20 left-0 right-0 bottom-0 bg-black/40 backdrop-blur-md z-[55] lg:hidden"
            style={{ animation: 'fadeIn 0.2s ease-in-out' }}
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {/* Mobile Navigation Menu - full width to avoid side blur */}
        <div 
          className={cn(
            "lg:hidden border-t border-gray-200 bg-white relative z-[70] shadow-xl overflow-hidden w-screen transition-all duration-300 ease-in-out",
            isMenuOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0",
          )}
          style={{
            marginLeft: 'calc(-50vw + 50%)',
            marginRight: 'calc(-50vw + 50%)'
          }}
        >
            <div className="w-full px-4 sm:px-6">
              <div className="py-3 space-y-0.5">
                {navigation.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 mx-1",
                      item.current
                        ? "bg-primary/5 text-primary font-semibold"
                        : "text-gray-700 hover:bg-primary/5/50 hover:text-primary active:bg-primary/10"
                    )}
                    style={{ 
                      animation: `fadeInUp 0.25s ease-out ${0.15 + index * 0.03}s both`
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {/* Mobile Auth - only show user menu when logged in e inicializado */}
                {initialized && isLoggedIn && (
                  <div 
                    className="pt-2 border-t border-gray-100 mt-2"
                    style={{ 
                      animation: `fadeInUp 0.25s ease-out ${0.15 + navigation.length * 0.03}s both`
                    }}
                  >
                    <MobileAuthButton onMenuClose={() => setIsMenuOpen(false)} />
                  </div>
                )}
              </div>
            </div>
          </div>
      </div>
    </header>
  )
}