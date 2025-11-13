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

  useEffect(() => {
    if (!loading && user && !isRedirecting) {
      if (!isAdmin()) {
        setIsRedirecting(true)
        router.push('/403')
      }
    } else if (!loading && !user && !isRedirecting) {
      setIsRedirecting(true)
      router.push('/login')
    }
  }, [loading, user, isAdmin, router, isRedirecting])

  if (loading) {
    return fallback || <LoadingSpinner text="Verificando permissões..." fullScreen />
  }

  if (!user) {
    return fallback || <LoadingSpinner text="Redirecionando..." fullScreen />
  }

  if (!isAdmin()) {
    return <Error403 />
  }

  return <>{children}</>
}