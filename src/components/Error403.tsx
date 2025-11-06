'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSafeRedirect } from '@/hooks/useSafeRedirect'

interface Error403Props {
  title?: string
  message?: string
  showCountdown?: boolean
  countdownSeconds?: number
  redirectTo?: string
  showBackButton?: boolean
}

export default function Error403({
  title = "Acesso Negado",
  message = "Você não tem permissão para acessar esta área.",
  showCountdown = false,
  countdownSeconds = 5,
  redirectTo = '/login',
  showBackButton = true
}: Error403Props) {
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
          <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
            <svg 
              className="w-12 h-12 text-red-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
              />
            </svg>
          </div>
        </div>

        {/* Título */}
        <h1 className="text-3xl font-bold text-emerald-800 mb-4">
          {title}
        </h1>

        {/* Descrição */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          {message}
        </p>

        {/* Informações adicionais */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-yellow-800">
            <strong>Dica:</strong> Faça login com sua conta para acessar todas as funcionalidades da plataforma.
          </p>
        </div>

        {/* Botões de ação */}
        <div className="space-y-4">
          <Link
            href="/login"
            className="w-full bg-[#1E4D2B] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#163B20] transition-colors duration-200 inline-block"
          >
            Fazer Login
          </Link>
          
          <Link
            href="/cadastro"
            className="w-full bg-transparent border-2 border-[#1E4D2B] text-emerald-800 px-6 py-3 rounded-lg font-medium hover:bg-[#1E4D2B] hover:text-white transition-colors duration-200 inline-block"
          >
            Criar Conta
          </Link>

          {showBackButton && (
            <Link
              href={redirectTo || "/"}
              className="w-full text-gray-600 hover:text-emerald-800 transition-colors duration-200 inline-block"
            >
              ← Voltar
            </Link>
          )}
        </div>

        {/* Countdown */}
        {showCountdown && (
          <div className="mt-8 text-sm text-gray-600">
            <p>
              Redirecionando automaticamente para o login em{' '}
              <span className="font-bold text-emerald-800">{countdown}</span> segundos...
            </p>
          </div>
        )}
      </div>
    </div>
  )
}