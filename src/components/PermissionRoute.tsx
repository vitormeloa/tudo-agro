'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useAdminPermissions } from '@/hooks/useAdminPermissions'
import { use403Redirect } from '@/hooks/use403Redirect'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, Shield, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PermissionRouteProps {
  children: React.ReactNode
  requiredPermission?: string
  requiredSection?: string
  fallback?: React.ReactNode
}

export default function PermissionRoute({ 
  children, 
  requiredPermission, 
  requiredSection,
  fallback 
}: PermissionRouteProps) {
  const { user, loading } = useAuth()
  const { canAccessSection, canExecuteAction } = useAdminPermissions()
  const { redirectTo403 } = use403Redirect({ fallbackUrl: '/dashboard' })
  const [hasCheckedPermissions, setHasCheckedPermissions] = useState(false)

  const router = useRouter()
  
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
      return
    }
  }, [user, loading, router])

  // Verificar permissões após o carregamento
  useEffect(() => {
    if (!loading && user && !hasCheckedPermissions) {
      // Verificar permissão específica
      if (requiredPermission && !canExecuteAction(requiredPermission)) {
        if (fallback) {
          setHasCheckedPermissions(true)
          return
        }
        
        redirectTo403('Você não tem permissão para acessar esta área.')
        return
      }

      // Verificar seção específica
      if (requiredSection && !canAccessSection(requiredSection)) {
        if (fallback) {
          setHasCheckedPermissions(true)
          return
        }
        
        redirectTo403('Você não tem permissão para acessar esta área.')
        return
      }

      setHasCheckedPermissions(true)
    }
  }, [loading, user, requiredPermission, requiredSection, canExecuteAction, canAccessSection, redirectTo403, fallback, hasCheckedPermissions])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F6F2] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E4D2B] mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando permissões...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  // Se ainda não verificou as permissões, mostrar loading
  if (!hasCheckedPermissions) {
    return (
      <div className="min-h-screen bg-[#F7F6F2] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E4D2B] mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando permissões...</p>
        </div>
      </div>
    )
  }

  // Verificar permissão específica
  if (requiredPermission && !canExecuteAction(requiredPermission)) {
    if (fallback) {
      return <>{fallback}</>
    }
    
    return null
  }

  // Verificar seção específica
  if (requiredSection && !canAccessSection(requiredSection)) {
    if (fallback) {
      return <>{fallback}</>
    }
    
    return null
  }

  return <>{children}</>
}