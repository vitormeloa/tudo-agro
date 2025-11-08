'use client'

import { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePermissions } from '@/hooks/usePermissions'
import { useAdminPermissions } from '@/hooks/useAdminPermissions'
import { use403Redirect } from '@/hooks/use403Redirect'
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
  requireAll?: boolean
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
  const { redirectTo403 } = use403Redirect({ fallbackUrl: redirectTo || '/dashboard' })
  const [hasCheckedPermissions, setHasCheckedPermissions] = useState(false)

  if (isAdmin) {
    return <>{children}</>
  }

  let hasAccess = false

  if (permission) {
    hasAccess = hasPermission(permission)
  } else if (permissions && permissions.length > 0) {
    hasAccess = requireAll 
      ? hasAllPermissions(permissions)
      : hasAnyPermission(permissions)
  }

  if (role) {
    hasAccess = hasRole(role)
  } else if (roles && roles.length > 0) {
    hasAccess = hasAnyRole(roles)
  }

  useEffect(() => {
    if (!hasCheckedPermissions) {
      if (!hasAccess) {
        if (fallback) {
          setHasCheckedPermissions(true)
          return
        }

        redirectTo403('Você não tem permissão para acessar esta área.')
        return
      }

      setHasCheckedPermissions(true)
    }
  }, [hasAccess, fallback, redirectTo403, hasCheckedPermissions])

  if (!hasAccess) {
    if (fallback) {
      return <>{fallback}</>
    }

    return null
  }

  return <>{children}</>
}

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

  if (isAdmin) {
    return <>{children}</>
  }

  let hasAccess = false

  if (permission) {
    hasAccess = hasPermission(permission)
  } else if (permissions && permissions.length > 0) {
    hasAccess = requireAll 
      ? hasAllPermissions(permissions)
      : hasAnyPermission(permissions)
  }

  if (role) {
    hasAccess = hasRole(role)
  } else if (roles && roles.length > 0) {
    hasAccess = hasAnyRole(roles)
  }

  if (hasAccess) {
    return null
  }

  return <>{children}</>
}

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

  if (isAdmin) {
    return <>{children}</>
  }

  let hasAccess = false

  if (permission) {
    hasAccess = hasPermission(permission)
  } else if (permissions && permissions.length > 0) {
    hasAccess = requireAll 
      ? hasAllPermissions(permissions)
      : hasAnyPermission(permissions)
  }

  if (role) {
    hasAccess = hasRole(role)
  } else if (roles && roles.length > 0) {
    hasAccess = hasAnyRole(roles)
  }

  if (hasAccess) {
    return <>{children}</>
  }

  return null
}