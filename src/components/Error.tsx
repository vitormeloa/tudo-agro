'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, RefreshCw, AlertTriangle } from 'lucide-react'

interface ErrorProps {
  title?: string
  message?: string
  reset?: () => void
  error?: Error & { digest?: string }
}

export default function Error({
  title = "Ops! Algo deu errado",
  message = "Ocorreu um erro inesperado. Nossa equipe foi notificada e está trabalhando para resolver o problema.",
  reset,
  error,
}: ErrorProps) {
  return (
    <div className="min-h-screen bg-[#F7F6F2] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Ícone de erro */}
        <div className="mb-8">
          <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-12 h-12 text-red-600" />
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

        {/* Error message for development */}
        {process.env.NODE_ENV === 'development' && error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-red-800 font-mono">
              {error.message}
            </p>
          </div>
        )}

        {/* Botões de ação */}
        <div className="space-y-4">
          {reset && (
            <Button
              onClick={reset}
              className="w-full bg-[#1E4D2B] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#163B20] transition-colors duration-200 inline-block"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Tentar Novamente
            </Button>
          )}
          
          <Link
            href="/"
            className="w-full bg-transparent border-2 border-[#1E4D2B] text-emerald-800 px-6 py-3 rounded-lg font-medium hover:bg-[#1E4D2B] hover:text-white transition-colors duration-200 inline-block"
          >
            <Home className="w-4 h-4 mr-2 inline-block" />
            Voltar ao Início
          </Link>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-sm text-gray-600">
          <p>Se o problema persistir, entre em contato conosco.</p>
        </div>
      </div>
    </div>
  )
}
