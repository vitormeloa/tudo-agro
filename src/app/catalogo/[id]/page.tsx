"use client"

import { use, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function AnimalPage({ params }: { params: Promise<{ id: string }> }) {
  const { user, initialized } = useAuth()
  const router = useRouter()
  
  const resolvedParams = use(params)
  const animalId = resolvedParams.id

  // Redirecionar para login se não estiver logado, ou para dashboard se estiver logado
  useEffect(() => {
    if (!initialized) return
    
    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent(`/dashboard/catalogo/${animalId}`)}`)
      return
    }
    
    // Se logado, redirecionar para versão do dashboard
    router.push(`/dashboard/catalogo/${animalId}`)
  }, [initialized, user, animalId, router])

  // Não renderizar nada - apenas redirecionar
  return null
}
