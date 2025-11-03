'use client'

import { useEffect, useState } from 'react'
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

  // Redirecionar para login se usuário não estiver autenticado
  // Só redirecionar após inicialização completa
  useEffect(() => {
    if (initialized && !user && !isRedirecting) {
      console.log('No user found after initialization, redirecting to login')
      setIsRedirecting(true)
      router.push('/login')
    }
  }, [initialized, user, router, isRedirecting])

  // Mostrar loading enquanto verifica autenticação ou não inicializou
  if (!initialized || loading) {
    return fallback || <LoadingSpinner text="Verificando acesso..." fullScreen />
  }

  // Se não há usuário, mostrar loading (será redirecionado)
  if (!user) {
    return fallback || <LoadingSpinner text="Redirecionando..." fullScreen />
  }

  // Se tem usuário, mostrar conteúdo
  return <>{children}</>
}