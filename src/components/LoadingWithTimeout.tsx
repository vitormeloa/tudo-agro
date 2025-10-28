'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSafeRedirect } from '@/hooks/useSafeRedirect'

interface LoadingWithTimeoutProps {
  message?: string
  timeoutMessage?: string
  timeoutSeconds?: number
  redirectTo?: string
  onTimeout?: () => void
  showManualRedirect?: boolean
}

export default function LoadingWithTimeout({
  message = "Verificando permissões...",
  timeoutMessage = "Redirecionando...",
  timeoutSeconds = 3,
  redirectTo = '/403',
  onTimeout,
  showManualRedirect = true
}: LoadingWithTimeoutProps) {
  const router = useRouter()
  const { safeRedirect, cleanup } = useSafeRedirect()
  const [showTimeout, setShowTimeout] = useState(false)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowTimeout(true)
    }, timeoutSeconds * 1000)

    setTimeoutId(timeout)

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [timeoutSeconds])

  // Executar callback quando timeout for atingido
  useEffect(() => {
    if (showTimeout && onTimeout) {
      onTimeout()
    }
  }, [showTimeout, onTimeout])

  // Limpar timeout ao desmontar
  useEffect(() => {
    return cleanup
  }, [cleanup])

  const handleManualRedirect = () => {
    safeRedirect(redirectTo)
  }

  return (
    <div className="min-h-screen bg-[#F7F6F2] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E4D2B] mx-auto mb-4"></div>
        
        {showTimeout ? (
          <>
            <p className="text-[#6E7D5B] mb-2">{timeoutMessage}</p>
            {showManualRedirect && (
              <p className="text-sm text-gray-500">
                Se não for redirecionado automaticamente,{' '}
                <button 
                  onClick={handleManualRedirect}
                  className="text-[#1E4D2B] hover:underline font-medium"
                >
                  clique aqui
                </button>
              </p>
            )}
          </>
        ) : (
          <p className="text-[#6E7D5B]">{message}</p>
        )}
      </div>
    </div>
  )
}