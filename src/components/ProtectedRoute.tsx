'use client'

import { useEffect, useRef, useMemo } from 'react'
import { useRouter, usePathname } from 'next/navigation'
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
  const pathname = usePathname()
  const hasRedirectedRef = useRef(false)
  const lastPathnameRef = useRef<string | null>(null)

  // Resetar flag quando pathname muda
  useEffect(() => {
    if (pathname !== lastPathnameRef.current) {
      hasRedirectedRef.current = false
      lastPathnameRef.current = pathname
    }
  }, [pathname])

  // Redirecionar para login se usuário não estiver autenticado - OTIMIZADO
  useEffect(() => {
    // Só redirecionar se todas condições forem verdadeiras de uma vez
    if (
      initialized && 
      !loading && 
      !user && 
      !hasRedirectedRef.current &&
      pathname &&
      pathname !== '/login' &&
      !pathname.startsWith('/login')
    ) {
      hasRedirectedRef.current = true
      const loginUrl = `/login?redirect=${encodeURIComponent(pathname)}`
      router.push(loginUrl)
    }
  }, [initialized, loading, user, router, pathname])

  // Memoizar loading state para evitar re-renders desnecessários
  const isLoading = useMemo(() => {
    return !initialized || (loading && !user)
  }, [initialized, loading, user])

  const shouldRedirect = useMemo(() => {
    return initialized && !loading && !user
  }, [initialized, loading, user])

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return fallback || <LoadingSpinner text="Verificando acesso..." fullScreen />
  }

  // Se não há usuário e já inicializou, mostrar loading (será redirecionado)
  if (shouldRedirect) {
    return fallback || <LoadingSpinner text="Redirecionando..." fullScreen />
  }

  // Se tem usuário, mostrar conteúdo
  if (user) {
    return <>{children}</>
  }

  // Fallback de segurança
  return fallback || <LoadingSpinner text="Carregando..." fullScreen />
}