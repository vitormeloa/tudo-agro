'use client'

import { useAuth } from './useAuth'
import { Permission, UserPermissions } from '@/lib/permission-utils'
import { hasPermission, hasRole, hasAnyPermission, hasAllPermissions, canAccess } from '@/lib/permission-utils'

export function usePermissions() {
  const { user, getUserPermissions } = useAuth()

  const userPermissions = getUserPermissions()

  return {
    // Verificação de permissão única
    hasPermission: (permission: Permission) => {
      if (!userPermissions) return false
      return hasPermission(userPermissions, permission)
    },

    // Verificação de qualquer uma das permissões
    hasAnyPermission: (permissions: Permission[]) => {
      if (!userPermissions) return false
      return hasAnyPermission(userPermissions, permissions)
    },

    // Verificação de todas as permissões
    hasAllPermissions: (permissions: Permission[]) => {
      if (!userPermissions) return false
      return hasAllPermissions(userPermissions, permissions)
    },

    // Verificação de role
    hasRole: (role: string) => {
      if (!userPermissions) return false
      return hasRole(userPermissions, role)
    },

    // Verificação de qualquer uma das roles
    hasAnyRole: (roles: string[]) => {
      if (!userPermissions) return false
      return roles.some(role => hasRole(userPermissions, role))
    },

    // Verificação de acesso a recurso e ação
    canAccess: (resource: string, action: string) => {
      if (!userPermissions) return false
      return canAccess(userPermissions, resource as any, action as any)
    },

    // Verificação de admin
    isAdmin: () => {
      if (!userPermissions) return false
      return hasRole(userPermissions, 'admin')
    },

    // Verificação de vendedor
    isSeller: () => {
      if (!userPermissions) return false
      return hasRole(userPermissions, 'vendedor')
    },

    // Verificação de comprador
    isBuyer: () => {
      if (!userPermissions) return false
      return hasRole(userPermissions, 'comprador')
    },

    // Obter todas as permissões do usuário
    getUserPermissions: () => userPermissions,

    // Verificar se pode gerenciar usuários
    canManageUsers: () => {
      if (!userPermissions) return false
      return hasPermission(userPermissions, 'user:read') && hasPermission(userPermissions, 'user:write')
    },

    // Verificar se pode gerenciar roles
    canManageRoles: () => {
      if (!userPermissions) return false
      return hasPermission(userPermissions, 'role:read') && hasPermission(userPermissions, 'role:write')
    },

    // Verificar se pode gerenciar produtos
    canManageProducts: () => {
      if (!userPermissions) return false
      return hasPermission(userPermissions, 'product:read') && hasPermission(userPermissions, 'product:write')
    },

    // Verificar se pode gerenciar leilões
    canManageAuctions: () => {
      if (!userPermissions) return false
      return hasPermission(userPermissions, 'auction:read') && hasPermission(userPermissions, 'auction:write')
    },

    // Verificar se pode visualizar transações
    canViewTransactions: () => {
      if (!userPermissions) return false
      return hasPermission(userPermissions, 'transaction:read')
    },

    // Verificar se pode gerenciar mensagens
    canManageMessages: () => {
      if (!userPermissions) return false
      return hasPermission(userPermissions, 'message:read') && hasPermission(userPermissions, 'message:write')
    },

    // Verificar se pode gerenciar avaliações
    canManageReviews: () => {
      if (!userPermissions) return false
      return hasPermission(userPermissions, 'review:read') && hasPermission(userPermissions, 'review:write')
    },

    // Verificar se tem acesso ao painel admin
    canAccessAdmin: () => {
      if (!userPermissions) return false
      return hasRole(userPermissions, 'admin') || hasPermission(userPermissions, 'admin:read')
    }
  }
}

export default usePermissions