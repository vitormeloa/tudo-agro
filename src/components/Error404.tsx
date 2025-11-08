'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSafeRedirect } from '@/hooks/useSafeRedirect'

interface Error404Props {
  title?: string
  message?: string
  showCountdown?: boolean
  countdownSeconds?: number
  redirectTo?: string
  showBackButton?: boolean
}

export default function Error404({
  title = "Página não encontrada",
  message = "A página que você está procurando não existe ou foi movida. Verifique o endereço e tente novamente.",
  showCountdown = false,
  countdownSeconds = 5,
  redirectTo = '/',
  showBackButton = true
}: Error404Props) {
  const router = useRouter()
  const { safeRedirect, cleanup } = useSafeRedirect()
  const [countdown, setCountdown] = useState(countdownSeconds)

  useEffect(() => {
    if (!showCountdown) return

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [showCountdown])

  // Redirecionar quando countdown chegar a 0
  useEffect(() => {
    if (countdown === 0 && showCountdown) {
      safeRedirect(redirectTo)
    }
  }, [countdown, safeRedirect, redirectTo, showCountdown])

  // Limpar timeout ao desmontar
  useEffect(() => {
    return cleanup
  }, [cleanup])

  return (
    <div className="min-h-screen bg-[#F7F6F2] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Ícone de erro */}
        <div className="mb-8">
          <div className="mx-auto w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
            <svg 
              className="w-12 h-12 text-primary" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
        </div>

        {/* Título */}
        <h1 className="text-3xl font-bold text-primary mb-4">
          {title}
        </h1>

        {/* Descrição */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          {message}
        </p>

        {/* Informações adicionais */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-8">
          <p className="text-sm text-primary">
            <strong>Dica:</strong> Verifique se o endereço está correto ou navegue pelo menu principal.
          </p>
        </div>

        {/* Botões de ação */}
        <div className="space-y-4">
          <Link
            href="/"
            className="w-full bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-[#163B20] transition-colors duration-200 inline-block"
          >
            Voltar ao Início
          </Link>
          
          <Link
            href="/catalogo"
            className="w-full bg-transparent border-2 border-primary text-primary px-6 py-3 rounded-lg font-medium hover:bg-primary hover:text-white transition-colors duration-200 inline-block"
          >
            Explorar Catálogo
          </Link>

          {showBackButton && (
            <Link
              href="/"
              className="w-full text-gray-600 hover:text-primary transition-colors duration-200 inline-block"
            >
              ← Voltar para Homepage
            </Link>
          )}
        </div>

        {/* Countdown */}
        {showCountdown && (
          <div className="mt-8 text-sm text-gray-600">
            <p>
              Redirecionando automaticamente para a homepage em{' '}
              <span className="font-bold text-primary">{countdown}</span> segundos...
            </p>
          </div>
        )}
      </div>
    </div>
  )
}