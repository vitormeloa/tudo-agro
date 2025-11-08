import { NextRequest, NextResponse } from 'next/server'
import { supabase } from './supabase'
import { Permission, UserPermissions } from './permission-utils'
import { hasPermission, hasRole } from './permission-utils'

export interface PermissionGuardOptions {
  requiredPermissions?: Permission[]
  requiredRoles?: string[]
  allowSelf?: boolean
  resourceId?: string
}

export const getUserPermissions = async (request: NextRequest): Promise<UserPermissions | null> => {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return null
    }

    const token = authHeader.split(' ')[1]
    
    const { data: { user }, error } = await supabase.auth.getUser(token)
    
    if (error || !user) {
      return null
    }

    const { data: userRoles, error: rolesError } = await supabase
      .from('user_roles')
      .select(`
        roles (
          id,
          name,
          permissions
        )
      `)
      .eq('user_id', user.id)

    if (rolesError || !userRoles) {
      return null
    }

    const roles = userRoles.map(ur => ur.roles.name)
    const permissions = userRoles.flatMap(ur => ur.roles.permissions || [])

    return {
      roles,
      permissions: permissions as Permission[]
    }
  } catch (error) {
    console.error('Error getting user permissions:', error)
    return null
  }
}

export const withPermissionGuard = (
  handler: (request: NextRequest, context: any) => Promise<NextResponse>,
  options: PermissionGuardOptions = {}
) => {
  return async (request: NextRequest, context: any): Promise<NextResponse> => {
    try {
      const userPermissions = await getUserPermissions(request)
      
      if (!userPermissions) {
        return NextResponse.json(
          { error: 'Usuário não autenticado' },
          { status: 401 }
        )
      }

      if (options.requiredRoles && options.requiredRoles.length > 0) {
        const hasRequiredRole = options.requiredRoles.some(role => 
          hasRole(userPermissions, role)
        )
        
        if (!hasRequiredRole) {
          return NextResponse.json(
            { error: 'Acesso negado: role insuficiente' },
            { status: 403 }
          )
        }
      }

      if (options.requiredPermissions && options.requiredPermissions.length > 0) {
        const hasRequiredPermission = options.requiredPermissions.some(permission => 
          hasPermission(userPermissions, permission)
        )
        
        if (!hasRequiredPermission) {
          return NextResponse.json(
            { error: 'Acesso negado: permissão insuficiente' },
            { status: 403 }
          )
        }
      }

      if (options.allowSelf && options.resourceId) {
        const authHeader = request.headers.get('authorization')
        const token = authHeader?.split(' ')[1]
        
        if (token) {
          const { data: { user } } = await supabase.auth.getUser(token)
          
          if (user && user.id === options.resourceId) {
            return handler(request, context)
          }
        }
      }

      return handler(request, context)
    } catch (error) {
      console.error('Permission guard error:', error)
      return NextResponse.json(
        { error: 'Erro interno do servidor' },
        { status: 500 }
      )
    }
  }
}

export const usePermissionGuard = () => {
  const checkPermission = async (permission: Permission): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/check-permission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ permission })
      })
      
      const data = await response.json()
      return data.hasPermission || false
    } catch (error) {
      console.error('Error checking permission:', error)
      return false
    }
  }

  const checkRole = async (role: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/check-role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role })
      })
      
      const data = await response.json()
      return data.hasRole || false
    } catch (error) {
      console.error('Error checking role:', error)
      return false
    }
  }

  return {
    checkPermission,
    checkRole
  }
}

export default {
  getUserPermissions,
  withPermissionGuard,
  usePermissionGuard
}