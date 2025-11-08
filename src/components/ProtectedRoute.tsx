'use client'

import { useEffect, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import LoadingSpinner from '@/components/LoadingSpinner'

interface ProtectedRouteProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export default function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { user, loading, initialized } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const hasRedirectedRef = useRef(false)
  const lastPathnameRef = useRef<string | null>(null)

  useEffect(() => {
    if (pathname !== lastPathnameRef.current) {
      hasRedirectedRef.current = false
      lastPathnameRef.current = pathname
    }
  }, [pathname])

  useEffect(() => {
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

  const isLoading = !initialized || (loading && !user)
  const shouldRedirect = initialized && !loading && !user

  if (isLoading) {
    return fallback || <LoadingSpinner text="Verificando acesso..." fullScreen />
  }

  if (shouldRedirect) {
    return fallback || <LoadingSpinner text="Redirecionando..." fullScreen />
  }

  if (user) {
    return <>{children}</>
  }

  return fallback || <LoadingSpinner text="Carregando..." fullScreen />
}
