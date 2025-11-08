import { useRouter } from 'next/navigation'
import { useCallback, useRef } from 'react'

export function useSafeRedirect() {
  const router = useRouter()
  const redirectTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const safeRedirect = useCallback((url: string, delay: number = 0) => {
    if (redirectTimeoutRef.current) {
      clearTimeout(redirectTimeoutRef.current)
    }

    redirectTimeoutRef.current = setTimeout(() => {
      router.push(url)
    }, delay)
  }, [router])

  const immediateRedirect = useCallback((url: string) => {
    if (redirectTimeoutRef.current) {
      clearTimeout(redirectTimeoutRef.current)
    }

    redirectTimeoutRef.current = setTimeout(() => {
      router.push(url)
    }, 0)
  }, [router])

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