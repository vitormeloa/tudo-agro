'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export function useRequireAuth() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      console.log('No user session, redirecting to login')
      router.push('/login')
    }
  }, [user, loading, router])

  return {
    user,
    loading,
    isAuthenticated: !!user
  }
}