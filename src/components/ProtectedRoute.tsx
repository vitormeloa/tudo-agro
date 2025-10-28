'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

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

  // Redirecionar para login se usuário não estiver autenticado
  useEffect(() => {
    if (!loading && !user) {
      // Redirecionar imediatamente para login quando não há usuário autenticado
      router.push('/login')
    }
  }, [loading, user, router])

  // Mostrar loading enquanto verifica autenticação
  if (loading) {
    return fallback || (
      <div className="min-h-screen bg-[#F7F6F2] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E4D2B] mx-auto mb-4"></div>
          <p className="text-[#6E7D5B]">Verificando acesso...</p>
        </div>
      </div>
    )
  }

  // Se não há usuário, mostrar loading enquanto redireciona
  if (!user) {
    return fallback || (
      <div className="min-h-screen bg-[#F7F6F2] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E4D2B] mx-auto mb-4"></div>
          <p className="text-[#6E7D5B]">Redirecionando para login...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}