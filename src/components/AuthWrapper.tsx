'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Loader2 } from 'lucide-react'

interface AuthWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export default function AuthWrapper({ children, fallback }: AuthWrapperProps) {
  const { loading, user } = useAuth()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (!loading) {
      // Pequeno delay para garantir estabilidade
      const timer = setTimeout(() => {
        setIsInitialized(true)
      }, 150)
      return () => clearTimeout(timer)
    }
  }, [loading])

  // Mostrar fallback enquanto carrega ou não foi inicializado
  if (loading || !isInitialized) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
            <p className="text-gray-600">Carregando...</p>
          </div>
        </div>
      )
    )
  }

  return <>{children}</>
}