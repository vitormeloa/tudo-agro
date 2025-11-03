'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import LoadingSpinner from '@/components/LoadingSpinner'

interface ProtectedRouteProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export default function ProtectedRoute({ 
  children, 
  fallback
}: ProtectedRouteProps) {
  const { user, loading, initialized } = useAuth()
  const router = useRouter()
  const [isRedirecting, setIsRedirecting] = useState(false)
  const redirectTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Redirecionar para login se usuário não estiver autenticado
  // Só redirecionar após inicialização completa
  useEffect(() => {
    // Limpar timeout anterior se existir
    if (redirectTimeoutRef.current) {
      clearTimeout(redirectTimeoutRef.current)
      redirectTimeoutRef.current = null
    }

    if (initialized && !user && !isRedirecting) {
      // Adicionar um pequeno delay para evitar loops
      redirectTimeoutRef.current = setTimeout(() => {
        if (!user && !isRedirecting) {
          setIsRedirecting(true)
          router.push('/login')
        }
      }, 100)
    }

    return () => {
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current)
        redirectTimeoutRef.current = null
      }
    }
  }, [initialized, user, router, isRedirecting])

  // Mostrar loading enquanto verifica autenticação ou não inicializou
  // Adicionar timeout de segurança para evitar loop infinito
  if (!initialized || loading) {
    return fallback || <LoadingSpinner text="Verificando acesso..." fullScreen />
  }

  // Se não há usuário e já inicializou, mostrar loading (será redirecionado)
  if (!user && initialized) {
    return fallback || <LoadingSpinner text="Redirecionando..." fullScreen />
  }

  // Se tem usuário, mostrar conteúdo
  if (user) {
    return <>{children}</>
  }

  // Fallback de segurança
  return fallback || <LoadingSpinner text="Carregando..." fullScreen />
}