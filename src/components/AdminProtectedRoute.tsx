'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import LoadingSpinner from '@/components/LoadingSpinner'
import Error403 from './Error403'

interface AdminProtectedRouteProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export default function AdminProtectedRoute({ 
  children, 
  fallback 
}: AdminProtectedRouteProps) {
  const { user, loading, isAdmin } = useAuth()
  const router = useRouter()
  const [isRedirecting, setIsRedirecting] = useState(false)

  // Verificar se usuário é admin
  useEffect(() => {
    if (!loading && user && !isRedirecting) {
      if (!isAdmin()) {
        console.log('User is not admin, redirecting to 403')
        setIsRedirecting(true)
        router.push('/403')
      }
    } else if (!loading && !user && !isRedirecting) {
      console.log('No user found, redirecting to login')
      setIsRedirecting(true)
      router.push('/login')
    }
  }, [loading, user, isAdmin, router, isRedirecting])

  // Mostrar loading enquanto verifica autenticação
  if (loading) {
    return fallback || <LoadingSpinner text="Verificando permissões..." fullScreen />
  }

  // Se não há usuário, mostrar loading (será redirecionado)
  if (!user) {
    return fallback || <LoadingSpinner text="Redirecionando..." fullScreen />
  }

  // Se usuário não é admin, mostrar erro 403
  if (!isAdmin()) {
    return <Error403 />
  }

  // Se tem usuário admin, mostrar conteúdo
  return <>{children}</>
}