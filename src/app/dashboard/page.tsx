'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ProtectedRoute from '@/components/ProtectedRoute'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirecionar para visão geral do dashboard
    router.push('/dashboard/visao-geral')
  }, [router])

  return (
    <ProtectedRoute>
      <LoadingSpinner text="Redirecionando..." fullScreen />
    </ProtectedRoute>
  )
}