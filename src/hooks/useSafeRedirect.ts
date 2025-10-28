import { useRouter } from 'next/navigation'
import { useCallback, useRef } from 'react'

export function useSafeRedirect() {
  const router = useRouter()
  const redirectTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const safeRedirect = useCallback((url: string, delay: number = 0) => {
    // Limpar timeout anterior se existir
    if (redirectTimeoutRef.current) {
      clearTimeout(redirectTimeoutRef.current)
    }

    // Usar setTimeout para evitar problemas de render
    redirectTimeoutRef.current = setTimeout(() => {
      router.push(url)
    }, delay)
  }, [router])

  const immediateRedirect = useCallback((url: string) => {
    // Limpar timeout anterior se existir
    if (redirectTimeoutRef.current) {
      clearTimeout(redirectTimeoutRef.current)
    }

    // Usar setTimeout com delay mínimo para evitar problemas de render
    redirectTimeoutRef.current = setTimeout(() => {
      router.push(url)
    }, 0)
  }, [router])

  // Limpar timeout ao desmontar
  const cleanup = useCallback(() => {
    if (redirectTimeoutRef.current) {
      clearTimeout(redirectTimeoutRef.current)
    }
  }, [])

  return {
    safeRedirect,
    immediateRedirect,
    cleanup
  }
}