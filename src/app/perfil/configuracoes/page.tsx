'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function SettingsPage() {
  const router = useRouter()
  const { initialized } = useAuth()

  useEffect(() => {
    if (initialized) {
      router.replace('/dashboard/configuracoes')
    }
  }, [initialized, router])

  return null
}
