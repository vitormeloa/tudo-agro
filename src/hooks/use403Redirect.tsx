'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

interface Use403RedirectOptions {
  fallbackUrl?: string
  showMessage?: boolean
  message?: string
}

export function use403Redirect(options: Use403RedirectOptions = {}) {
  const router = useRouter()
  const { 
    fallbackUrl = '/dashboard', 
    showMessage = true,
    message = 'Você não tem permissão para acessar esta área.'
  } = options

  const redirectTo403 = useCallback((customMessage?: string) => {
    const params = new URLSearchParams()
    
    if (customMessage || message) {
      params.set('message', customMessage || message)
    }
    
    if (fallbackUrl) {
      params.set('fallback', fallbackUrl)
    }

    const queryString = params.toString()
    const redirectUrl = queryString ? `/403?${queryString}` : '/403'
    
    setTimeout(() => {
      router.push(redirectUrl)
    }, 0)
  }, [router, message, fallbackUrl])

  return {
    redirectTo403
  }
}