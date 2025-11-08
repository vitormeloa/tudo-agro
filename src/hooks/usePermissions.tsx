'use client'

import { useAuth } from './useAuth'
import { Permission, UserPermissions } from '@/lib/permission-utils'
import { hasPermission, hasRole, hasAnyPermission, hasAllPermissions, canAccess } from '@/lib/permission-utils'

export function usePermissions() {
  const { user, getUserPermissions } = useAuth()

  const userPermissions = getUserPermissions()

  return {
    hasPermission: (permission: Permission) => {
      if (!userPermissions) return false
      return hasPermission(userPermissions, permission)
    },

    hasAnyPermission: (permissions: Permission[]) => {
      if (!userPermissions) return false
      return hasAnyPermission(userPermissions, permissions)
    },

    hasAllPermissions: (permissions: Permission[]) => {
      if (!userPermissions) return false
      return hasAllPermissions(userPermissions, permissions)
    },

    hasRole: (role: string) => {
      if (!userPermissions) return false
      return hasRole(userPermissions, role)
    },

    hasAnyRole: (roles: string[]) => {
      if (!userPermissions) return false
      return roles.some(role => hasRole(userPermissions, role))
    },

    canAccess: (resource: string, action: string) => {
      if (!userPermissions) return false
      return canAccess(userPermissions, resource as any, action as any)
    },

    isAdmin: () => {
      if (!userPermissions) return false
      return hasRole(userPermissions, 'admin')
    },

    isSeller: () => {
      if (!userPermissions) return false
      return hasRole(userPermissions, 'vendedor')
    },

    isBuyer: () => {
      if (!userPermissions) return false
      return hasRole(userPermissions, 'comprador')
    },

    getUserPermissions: () => userPermissions,

    canManageUsers: () => {
      if (!userPermissions) return false
      return hasPermission(userPermissions, 'user:read') && hasPermission(userPermissions, 'user:write')
    },

    canManageRoles: () => {
      if (!userPermissions) return false
      return hasPermission(userPermissions, 'role:read') && hasPermission(userPermissions, 'role:write')
    },

    canManageProducts: () => {
      if (!userPermissions) return false
      return hasPermission(userPermissions, 'product:read') && hasPermission(userPermissions, 'product:write')
    },

    canManageAuctions: () => {
      if (!userPermissions) return false
      return hasPermission(userPermissions, 'auction:read') && hasPermission(userPermissions, 'auction:write')
    },

    canViewTransactions: () => {
      if (!userPermissions) return false
      return hasPermission(userPermissions, 'transaction:read')
    },

    canManageMessages: () => {
      if (!userPermissions) return false
      return hasPermission(userPermissions, 'message:read') && hasPermission(userPermissions, 'message:write')
    },

    canManageReviews: () => {
      if (!userPermissions) return false
      return hasPermission(userPermissions, 'review:read') && hasPermission(userPermissions, 'review:write')
    },

    canAccessAdmin: () => {
      if (!userPermissions) return false
      return hasRole(userPermissions, 'admin') || hasPermission(userPermissions, 'admin:read')
    }
  }
}

export default usePermissions