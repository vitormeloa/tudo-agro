"use client"

import { use, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function ProdutoPage({ params }: { params: Promise<{ id: string }> }) {
  const { user, initialized } = useAuth()
  const router = useRouter()
  
  const resolvedParams = use(params)
  const productId = resolvedParams.id

  // Redirecionar para login se não estiver logado, ou para dashboard se estiver logado
  useEffect(() => {
    if (!initialized) return
    
    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent(`/dashboard/produtos/${productId}`)}`)
      return
    }
    
    // Se logado, redirecionar para versão do dashboard
    router.push(`/dashboard/produtos/${productId}`)
  }, [initialized, user, productId, router])

  // Não renderizar nada - apenas redirecionar
  return null
}
