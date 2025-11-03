'use client'

import { useEffect, useState, useRef } from 'react'
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
  const [isRedirecting, setIsRedirecting] = useState(false)
  const redirectTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const hasRedirectedRef = useRef(false)

  // Redirecionar para login se usuário não estiver autenticado
  // Otimizado para evitar loops
  useEffect(() => {
    // Limpar timeout anterior se existir
    if (redirectTimeoutRef.current) {
      clearTimeout(redirectTimeoutRef.current)
      redirectTimeoutRef.current = null
    }

    // Resetar flag de redirecionamento quando pathname muda
    if (pathname) {
      hasRedirectedRef.current = false
    }

    // Só redirecionar se:
    // 1. Já inicializou
    // 2. Não tem usuário
    // 3. Não está em processo de redirecionamento
    // 4. Não redirecionou ainda para esta rota
    // 5. Não está na página de login
    if (
      initialized && 
      !loading && 
      !user && 
      !isRedirecting && 
      !hasRedirectedRef.current &&
      pathname !== '/login' &&
      !pathname?.startsWith('/login')
    ) {
      hasRedirectedRef.current = true
      setIsRedirecting(true)
      
      // Redirecionar imediatamente sem delay para ser mais rápido
      const loginUrl = `/login?redirect=${encodeURIComponent(pathname || '/dashboard/visao-geral')}`
      router.push(loginUrl)
    }

    return () => {
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current)
        redirectTimeoutRef.current = null
      }
    }
  }, [initialized, loading, user, router, pathname, isRedirecting])

  // Mostrar loading enquanto verifica autenticação (com timeout de segurança)
  if (!initialized || (loading && !user)) {
    return fallback || <LoadingSpinner text="Verificando acesso..." fullScreen />
  }

  // Se não há usuário e já inicializou, mostrar loading (será redirecionado)
  if (!user && initialized && !loading) {
    return fallback || <LoadingSpinner text="Redirecionando..." fullScreen />
  }

  // Se tem usuário, mostrar conteúdo (mesmo que ainda esteja loading em background)
  if (user) {
    return <>{children}</>
  }

  // Fallback de segurança - se chegou aqui e está inicializado sem usuário, redirecionar
  if (initialized && !user && !isRedirecting) {
    return fallback || <LoadingSpinner text="Redirecionando..." fullScreen />
  }

  // Último fallback
  return fallback || <LoadingSpinner text="Carregando..." fullScreen />
}