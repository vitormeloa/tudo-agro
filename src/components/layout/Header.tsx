'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Menu, 
  X, 
  Search
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/useAuth'
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
  const { user, loading } = useAuth()

  // Efeito de scroll para opacidade
  useEffect(() => {
    if (!enableScrollOpacity) return

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [enableScrollOpacity])

  const navigation = [
    { name: 'Início', href: '/', current: false },
    { name: 'Animais', href: '/catalogo', current: false },
    { name: 'Leilões', href: '/leiloes', current: false },
    { name: 'Produtos', href: '/produtos', current: false },
    { name: 'Blog', href: '/blog', current: false },
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
            {/* Auth Button Component */}
            <AuthButton />

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
              <MobileAuthButton onMenuClose={() => setIsMenuOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}