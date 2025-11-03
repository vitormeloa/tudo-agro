'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function ProfilePage() {
  const router = useRouter()
  const { initialized } = useAuth()

  useEffect(() => {
    if (initialized) {
      router.replace('/dashboard/minha-conta')
    }
  }, [initialized, router])

  return null
}
