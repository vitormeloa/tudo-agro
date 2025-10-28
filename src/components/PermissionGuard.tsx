'use client'

import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { usePermissions } from '@/hooks/usePermissions'
import { useAdminPermissions } from '@/hooks/useAdminPermissions'
import { Permission } from '@/lib/permissions'
import { AlertTriangle, Shield } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface PermissionGuardProps {
  children: ReactNode
  permission?: Permission
  permissions?: Permission[]
  role?: string
  roles?: string[]
  requireAll?: boolean // Se true, requer todas as permissões/roles. Se false, requer qualquer uma
  fallback?: ReactNode
  redirectTo?: string
  showFallback?: boolean
}

export default function PermissionGuard({
  children,
  permission,
  permissions,
  role,
  roles,
  requireAll = false,
  fallback,
  redirectTo,
  showFallback = true
}: PermissionGuardProps) {
  const { 
    hasPermission, 
    hasAnyPermission, 
    hasAllPermissions, 
    hasRole, 
    hasAnyRole
  } = usePermissions()
  
  const { isAdmin } = useAdminPermissions()
  const router = useRouter()

  // Admin sempre tem acesso
  if (isAdmin) {
    return <>{children}</>
  }

  let hasAccess = false

  // Verificar permissões
  if (permission) {
    hasAccess = hasPermission(permission)
  } else if (permissions && permissions.length > 0) {
    hasAccess = requireAll 
      ? hasAllPermissions(permissions)
      : hasAnyPermission(permissions)
  }

  // Verificar roles
  if (role) {
    hasAccess = hasRole(role)
  } else if (roles && roles.length > 0) {
    hasAccess = hasAnyRole(roles)
  }

  // Se não tem acesso
  if (!hasAccess) {
    // Redirecionar se especificado
    if (redirectTo) {
      router.push(redirectTo)
      return null
    }

    // Mostrar fallback personalizado
    if (fallback) {
      return <>{fallback}</>
    }

    // Mostrar fallback padrão se habilitado
    if (showFallback) {
      return (
        <Card className="max-w-md mx-auto mt-8">
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
              Você não tem permissão para acessar esta área.
            </p>
            <div className="flex gap-2 justify-center">
              <Button
                variant="outline"
                onClick={() => router.back()}
              >
                Voltar
              </Button>
              <Button
                onClick={() => router.push('/')}
                className="bg-[#1E4D2B] hover:bg-[#2D5A3D]"
              >
                Ir para Início
              </Button>
            </div>
          </CardContent>
        </Card>
      )
    }

    // Não renderizar nada se não deve mostrar fallback
    return null
  }

  return <>{children}</>
}

// Componente para ocultar elementos baseado em permissões
interface PermissionHideProps {
  children: ReactNode
  permission?: Permission
  permissions?: Permission[]
  role?: string
  roles?: string[]
  requireAll?: boolean
}

export function PermissionHide({
  children,
  permission,
  permissions,
  role,
  roles,
  requireAll = false
}: PermissionHideProps) {
  const { 
    hasPermission, 
    hasAnyPermission, 
    hasAllPermissions, 
    hasRole, 
    hasAnyRole,
    isAdmin 
  } = usePermissions()

  // Admin sempre vê tudo
  if (isAdmin) {
    return <>{children}</>
  }

  let hasAccess = false

  // Verificar permissões
  if (permission) {
    hasAccess = hasPermission(permission)
  } else if (permissions && permissions.length > 0) {
    hasAccess = requireAll 
      ? hasAllPermissions(permissions)
      : hasAnyPermission(permissions)
  }

  // Verificar roles
  if (role) {
    hasAccess = hasRole(role)
  } else if (roles && roles.length > 0) {
    hasAccess = hasAnyRole(roles)
  }

  // Se tem acesso, não renderizar (ocultar)
  if (hasAccess) {
    return null
  }

  return <>{children}</>
}

// Componente para mostrar elementos apenas com permissões
interface PermissionShowProps {
  children: ReactNode
  permission?: Permission
  permissions?: Permission[]
  role?: string
  roles?: string[]
  requireAll?: boolean
}

export function PermissionShow({
  children,
  permission,
  permissions,
  role,
  roles,
  requireAll = false
}: PermissionShowProps) {
  const { 
    hasPermission, 
    hasAnyPermission, 
    hasAllPermissions, 
    hasRole, 
    hasAnyRole,
    isAdmin 
  } = usePermissions()

  // Admin sempre vê tudo
  if (isAdmin) {
    return <>{children}</>
  }

  let hasAccess = false

  // Verificar permissões
  if (permission) {
    hasAccess = hasPermission(permission)
  } else if (permissions && permissions.length > 0) {
    hasAccess = requireAll 
      ? hasAllPermissions(permissions)
      : hasAnyPermission(permissions)
  }

  // Verificar roles
  if (role) {
    hasAccess = hasRole(role)
  } else if (roles && roles.length > 0) {
    hasAccess = hasAnyRole(roles)
  }

  // Se tem acesso, renderizar
  if (hasAccess) {
    return <>{children}</>
  }

  return null
}