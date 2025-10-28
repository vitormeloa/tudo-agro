'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useSafeRedirect } from '@/hooks/useSafeRedirect'
import LoadingWithTimeout from './LoadingWithTimeout'
import Error403 from './Error403'

interface ProtectedRouteProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  redirectTo?: string
  showErrorPage?: boolean
  loadingTimeout?: number
}

export default function ProtectedRoute({ 
  children, 
  fallback,
  redirectTo = '/403',
  showErrorPage = true,
  loadingTimeout = 3
}: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const { safeRedirect, cleanup } = useSafeRedirect()

  // Limpar timeout ao desmontar
  useEffect(() => {
    return cleanup
  }, [cleanup])

  // Redirecionar para login se não deve mostrar página de erro
  useEffect(() => {
    if (!loading && !user && !showErrorPage) {
      safeRedirect('/login')
    }
  }, [loading, user, showErrorPage, safeRedirect])

  // Mostrar loading enquanto verifica autenticação
  if (loading) {
    return fallback || (
      <LoadingWithTimeout
        message="Verificando acesso..."
        timeoutMessage="Aguarde, verificando permissões..."
        timeoutSeconds={loadingTimeout}
        redirectTo={redirectTo}
        onTimeout={() => {
          if (showErrorPage) {
            safeRedirect(redirectTo)
          } else {
            safeRedirect('/login')
          }
        }}
      />
    )
  }

  // Se não há usuário, exibir Error403 diretamente (sem redirecionamento)
  if (!user) {
    if (showErrorPage) {
      return (
        <Error403 
          title="Acesso Negado"
          message="Você não tem permissão para acessar esta página. Esta área é restrita e requer autenticação."
          showCountdown={false}
          showBackButton={true}
        />
      )
    } else {
      // Se não deve mostrar página de erro, mostrar loading de redirecionamento
      return fallback || (
        <div className="min-h-screen bg-[#F7F6F2] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E4D2B] mx-auto mb-4"></div>
            <p className="text-[#6E7D5B]">Redirecionando para login...</p>
          </div>
        </div>
      )
    }
  }

  return <>{children}</>
}