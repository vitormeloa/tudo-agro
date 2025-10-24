'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, RefreshCw, AlertTriangle } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7F6F2] to-[#FFFDF7] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Logo */}
        <div className="mb-8">
          <Link href="/" className="flex items-center justify-center space-x-3 group">
            <img 
              src="/fotos/tudo-agro-logo.png" 
              className="h-12 w-auto sm:h-16 md:h-20 lg:h-24" 
              alt="TudoAgro Logo"
            />
          </Link>
        </div>

        {/* Error Content */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle className="w-16 h-16 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-[#2B2E2B] mb-4">
            Ops! Algo deu errado
          </h1>
          <p className="text-[#6E7D5B] mb-4">
            Ocorreu um erro inesperado. Nossa equipe foi notificada e está trabalhando para resolver o problema.
          </p>
          {process.env.NODE_ENV === 'development' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-red-800 font-mono">
                {error.message}
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <Button 
            onClick={reset}
            className="w-full bg-[#6E7D5B] hover:bg-[#5A6B4A] text-white"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Tentar Novamente
          </Button>
          
          <Button asChild variant="outline" className="w-full border-[#6E7D5B] text-[#6E7D5B] hover:bg-[#6E7D5B] hover:text-white">
            <Link href="/" className="flex items-center justify-center space-x-2">
              <Home className="w-4 h-4" />
              <span>Voltar ao Início</span>
            </Link>
          </Button>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-sm text-[#6E7D5B]">
          <p>Se o problema persistir, entre em contato conosco.</p>
        </div>
      </div>
    </div>
  )
}