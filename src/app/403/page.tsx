'use client'

import { useSearchParams } from 'next/navigation'
import Error403 from '@/components/Error403'

export default function Error403Page() {
  const searchParams = useSearchParams()
  
  const message = searchParams.get('message') || 
    "Você não tem permissão para acessar esta área."
  
  const fallbackUrl = searchParams.get('fallback') || '/dashboard'

  return (
    <Error403 
      title="Acesso Negado"
      message={message}
      showCountdown={false}
      showBackButton={true}
      redirectTo={fallbackUrl}
    />
  )
}