'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useAdminPermissions } from '@/hooks/useAdminPermissions'
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
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
      return
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F6F2] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E4D2B] mx-auto mb-4"></div>
          <p className="text-[#6E7D5B]">Verificando permissões...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  // Verificar permissão específica
  if (requiredPermission && !canExecuteAction(requiredPermission)) {
    return fallback || (
      <div className="min-h-screen bg-[#F7F6F2] flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-red-100 rounded-full w-fit">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-xl text-red-600">
              Acesso Negado
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              Você não tem permissão para acessar esta funcionalidade.
            </p>
            <p className="text-sm text-gray-500">
              Permissão necessária: {requiredPermission}
            </p>
            <Button 
              onClick={() => router.push('/dashboard')}
              className="bg-[#1E4D2B] hover:bg-[#2D5A3D]"
            >
              <Home className="h-4 w-4 mr-2" />
              Voltar ao Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Verificar seção específica
  if (requiredSection && !canAccessSection(requiredSection)) {
    return fallback || (
      <div className="min-h-screen bg-[#F7F6F2] flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-red-100 rounded-full w-fit">
              <Shield className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-xl text-red-600">
              Acesso Negado
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              Você não tem permissão para acessar esta seção.
            </p>
            <p className="text-sm text-gray-500">
              Seção: {requiredSection}
            </p>
            <Button 
              onClick={() => router.push('/dashboard')}
              className="bg-[#1E4D2B] hover:bg-[#2D5A3D]"
            >
              <Home className="h-4 w-4 mr-2" />
              Voltar ao Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}