'use client'

import { useState } from 'react'
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
import { InputError } from '@/components/ui/input-error'
import { getCurrentYear } from '@/lib/date-utils'
import { validateEmail, validationMessages } from '@/lib/validators'
import { useToast } from '@/hooks/use-toast'

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
  const currentYear = getCurrentYear()
  const { toast } = useToast()
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterError, setNewsletterError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newsletterEmail) {
      setNewsletterError(validationMessages.email.required)
      return
    }

    if (!validateEmail(newsletterEmail)) {
      setNewsletterError(validationMessages.email.invalid)
      return
    }

    setIsSubmitting(true)
    setNewsletterError('')

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))

      toast({
        title: "Inscrição realizada!",
        description: "Você receberá nossas novidades em breve.",
      })

      setNewsletterEmail('')
    } catch (error) {
      toast({
        title: "Erro ao inscrever",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const footerLinks = {
    marketplace: [
      { name: 'Catálogo', href: '/catalogo' },
      { name: 'Leilões', href: '/leiloes' },
      { name: 'Mercado Agro', href: '/produtos' },
      { name: 'Como Vender', href: '/vender' },
      { name: 'Como Comprar', href: '/como-comprar' },
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
    ]
  }

  const baseClasses = "w-full"
  
  const variantClasses = {
    default: "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white",
    minimal: "bg-white border-t border-gray-200 text-[#101828]",
    dark: "bg-gray-900 text-white"
  }

  return (
    <footer className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {}
      {showNewsletter && variant === 'default' && (
        <div className="border-b border-gray-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Fique por dentro das novidades</h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Receba ofertas exclusivas, novos leilões e dicas do agronegócio diretamente no seu e-mail
              </p>
              <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="email"
                      placeholder="Seu melhor e-mail"
                      value={newsletterEmail}
                      onChange={(e) => {
                        setNewsletterEmail(e.target.value)
                        setNewsletterError('')
                      }}
                      onBlur={() => {
                        if (newsletterEmail && !validateEmail(newsletterEmail)) {
                          setNewsletterError(validationMessages.email.invalid)
                        }
                      }}
                      className={`w-full px-4 py-3 rounded-lg border ${newsletterError ? 'border-red-500' : 'border-gray-600'} bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent`}
                    />
                    {newsletterError && (
                      <div className="mt-2">
                        <InputError error={newsletterError} />
                      </div>
                    )}
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-primary to-primary hover:from-primary/90 hover:to-primary/90 text-white px-6 py-3 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Inscrevendo...
                      </>
                    ) : (
                      <>
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Inscrever
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/fotos/tudo-agro-logo.png" 
                className="h-20 w-auto sm:h-20 md:h-22 lg:h-26"
                alt="TudoAgro Logo"
              />
            </div>
            <p className="text-gray-300 mb-6 text-sm leading-relaxed max-w-md">
              A maior plataforma de negócios do agronegócio brasileiro. 
              Conectamos produtores e compradores com segurança e transparência.
            </p>
            
            {}
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="break-words">(11) 99999-9999</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="break-words">contato@tudoagro.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="break-words">São Paulo, SP - Brasil</span>
              </div>
            </div>
          </div>

          {}
          <div className="sm:col-span-1">
            <h4 className="font-semibold text-white mb-4 text-base">Marketplace</h4>
            <ul className="space-y-2.5">
              {footerLinks.marketplace.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-primary/70 transition-colors duration-200 text-sm block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {}
          <div className="sm:col-span-1">
            <h4 className="font-semibold text-white mb-4 text-base">Empresa</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-primary/70 transition-colors duration-200 text-sm block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {}
          <div className="sm:col-span-1">
            <h4 className="font-semibold text-white mb-4 text-base">Suporte</h4>
            <ul className="space-y-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-primary/70 transition-colors duration-200 text-sm block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {}
          <div className="sm:col-span-1 lg:col-span-1">
            <h4 className="font-semibold text-white mb-4 text-base">Recursos</h4>
            <ul className="space-y-2.5">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-primary/70 transition-colors duration-200 text-sm block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {}
        <div className="border-t border-gray-700/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © {currentYear} TudoAgro. Todos os direitos reservados.
            </div>

            {}
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
