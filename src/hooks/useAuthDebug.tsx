'use client'

import { useEffect } from 'react'
import { useAuth } from './useAuth'

export function useAuthDebug() {
  const auth = useAuth()

  useEffect(() => {
    console.log('🔍 Auth Debug:', {
      user: auth.user ? { id: auth.user.id, email: auth.user.email, name: auth.user.name } : null,
      loading: auth.loading,
      isAdmin: auth.isAdmin(),
      isSeller: auth.isSeller(),
      isBuyer: auth.isBuyer(),
      timestamp: new Date().toISOString()
    })
  }, [auth.user, auth.loading, auth.isAdmin, auth.isSeller, auth.isBuyer])

  return auth
}