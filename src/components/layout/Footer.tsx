'use client'

import Link from 'next/link'
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  ArrowRight,
  Shield,
  Award,
  Users,
  Heart
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FooterProps {
  variant?: 'default' | 'minimal' | 'dark'
  showNewsletter?: boolean
  showSocial?: boolean
  className?: string
}

export default function Footer({ 
  variant = 'default', 
  showNewsletter = true,
  showSocial = true,
  className = '' 
}: FooterProps) {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    marketplace: [
      { name: 'Catálogo de Animais', href: '/catalogo' },
      { name: 'Leilões Online', href: '/leiloes' },
      { name: 'Como Vender', href: '/vender' },
      { name: 'Como Comprar', href: '/como-comprar' },
      { name: 'Preços e Planos', href: '/precos' },
    ],
    company: [
      { name: 'Sobre Nós', href: '/sobre' },
      { name: 'Nossa História', href: '/sobre#historia' },
      { name: 'Equipe', href: '/sobre#equipe' },
      { name: 'Carreiras', href: '/carreiras' },
      { name: 'Imprensa', href: '/imprensa' },
    ],
    support: [
      { name: 'Central de Ajuda', href: '/ajuda' },
      { name: 'Contato', href: '/contato' },
      { name: 'Termos de Uso', href: '/termos' },
      { name: 'Política de Privacidade', href: '/privacidade' },
      { name: 'FAQ', href: '/faq' },
    ],
    resources: [
      { name: 'Blog', href: '/blog' },
      { name: 'Guia do Comprador', href: '/guia-comprador' },
      { name: 'Guia do Vendedor', href: '/guia-vendedor' },
      { name: 'Calculadora de Preços', href: '/calculadora' },
      { name: 'API', href: '/api' },
    ]
  }

  const stats = [
    { icon: Users, value: '50k+', label: 'Usuários Ativos' },
    { icon: Award, value: 'R$ 2.8B', label: 'Volume Negociado' },
    { icon: Heart, value: '98%', label: 'Satisfação' },
    { icon: Shield, value: '100%', label: 'Segurança' },
  ]

  const baseClasses = "w-full"
  
  const variantClasses = {
    default: "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white",
    minimal: "bg-white border-t border-gray-200 text-gray-900",
    dark: "bg-gray-900 text-white"
  }

  return (
    <footer className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {/* Newsletter Section */}
      {showNewsletter && variant === 'default' && (
        <div className="border-b border-gray-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Fique por dentro das novidades</h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Receba ofertas exclusivas, novos leilões e dicas do agronegócio diretamente no seu e-mail
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <Button className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-6 py-3">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Inscrever
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Section */}
      {variant === 'default' && (
        <div className="border-b border-gray-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-emerald-600/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-green-700 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">M</span>
                </div>
              </div>
              <div>
                <span className="text-xl font-bold">AgroMarket</span>
                <div className="text-xs text-gray-400 -mt-1">Marketplace Agro</div>
              </div>
            </div>
            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              A maior plataforma de negócios do agronegócio brasileiro. 
              Conectamos produtores e compradores com segurança e transparência.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>(11) 99999-9999</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span>contato@agromarket.com.br</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>São Paulo, SP - Brasil</span>
              </div>
            </div>
          </div>

          {/* Marketplace Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Marketplace</h4>
            <ul className="space-y-3">
              {footerLinks.marketplace.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Suporte</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Recursos</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media & Bottom */}
        <div className="border-t border-gray-700/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © {currentYear} AgroMarket. Todos os direitos reservados.
            </div>

            {/* Social Media */}
            {showSocial && (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-400 mr-2">Siga-nos:</span>
                <div className="flex space-x-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white hover:bg-gray-700"
                  >
                    <Facebook className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white hover:bg-gray-700"
                  >
                    <Instagram className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white hover:bg-gray-700"
                  >
                    <Twitter className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white hover:bg-gray-700"
                  >
                    <Youtube className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
