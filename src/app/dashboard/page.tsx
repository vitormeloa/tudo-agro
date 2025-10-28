'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirecionar para visão geral do dashboard
    router.push('/dashboard/visao-geral')
  }, [router])

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#F7F6F2] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E4D2B] mx-auto mb-4"></div>
          <p className="text-[#6E7D5B]">Redirecionando...</p>
        </div>
      </div>
    </ProtectedRoute>
  )
}