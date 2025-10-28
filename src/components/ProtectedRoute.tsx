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
  const { user, loading } = useAuth()
  const router = useRouter()
  const [isRedirecting, setIsRedirecting] = useState(false)

  // Redirecionar para login se usuário não estiver autenticado
  useEffect(() => {
    if (!loading && !user && !isRedirecting) {
      console.log('No user found after loading, redirecting to login')
      setIsRedirecting(true)
      router.push('/login')
    }
  }, [loading, user, router, isRedirecting])

  // Mostrar loading enquanto verifica autenticação
  if (loading) {
    return fallback || <LoadingSpinner text="Verificando acesso..." fullScreen />
  }

  // Se não há usuário, mostrar loading (será redirecionado)
  if (!user) {
    return fallback || <LoadingSpinner text="Redirecionando..." fullScreen />
  }

  // Se tem usuário, mostrar conteúdo
  return <>{children}</>
}