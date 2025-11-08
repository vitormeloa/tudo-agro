'use client'

import { useMemo, useCallback } from 'react'
import { useAuth } from './useAuth'
import { Permission } from '@/lib/permissions'

export function useAdminPermissions() {
  const { user, hasPermission } = useAuth()
  
  const roles = useMemo(() => user?.roles || [], [user?.roles])
  const isAdminMemo = useMemo(() => roles.includes('admin'), [roles])
  const isSellerMemo = useMemo(() => roles.includes('vendedor'), [roles])
  const isBuyerMemo = useMemo(() => roles.includes('comprador'), [roles])

  const canAccessSection = useCallback((section: string): boolean => {
    if (!user || !roles.length) return false
    
    if (isAdminMemo) return true
    
    const sectionRoles: Record<string, string[]> = {
      'visao-geral': ['admin', 'vendedor', 'comprador'],
      'favoritos': ['admin', 'vendedor', 'comprador'],
      'minhas-compras': ['comprador', 'vendedor', 'admin'],
      'financeiro': ['comprador', 'vendedor', 'admin'],
      'treinamentos': ['admin', 'vendedor', 'comprador'],
      'minha-conta': ['admin', 'vendedor', 'comprador'],
      'animais': ['admin', 'vendedor', 'comprador'],
      'produtos': ['admin', 'vendedor', 'comprador'],
      'leiloes': ['admin', 'vendedor', 'comprador'],
      'transacoes': ['admin', 'vendedor', 'comprador'],
      'cashback': ['admin', 'vendedor', 'comprador'],
      'vip': ['admin', 'vendedor', 'comprador'],
      'academy': ['admin', 'vendedor', 'comprador'],
      'mensagens': ['admin', 'vendedor', 'comprador'],
      'anuncios': ['admin', 'vendedor'],
      'usuarios': ['admin'],
      'vendedores': ['admin'],
      'documentos': ['admin'],
      'funcoes': ['admin'],
      'configuracoes': ['admin']
    }
    
    const allowedRoles = sectionRoles[section]
    if (allowedRoles) {
      const hasAllowedRole = allowedRoles.some(role => roles.includes(role))
      if (hasAllowedRole) {
        return true
      }
    }
    
    switch (section) {
      case 'visao-geral':
        return hasPermission('dashboard:read')
      
      case 'usuarios':
        return hasPermission('user:read')
      
      case 'vendedores':
        return hasPermission('seller:read')
      
      case 'anuncios':
        return hasPermission('ad:read')
      
      case 'animais':
        return hasPermission('animal:read')
      
      case 'favoritos':
        return hasPermission('favorite:read')
      
      case 'produtos':
        return hasPermission('product:read')
      
      case 'leiloes':
        return hasPermission('auction:read')
      
      case 'transacoes':
        return hasPermission('transaction:read')
      
      case 'documentos':
        return hasPermission('document:read')
      
      case 'cashback':
        return hasPermission('cashback:read')
      
      case 'vip':
        return hasPermission('vip:read')
      
      case 'academy':
        return hasPermission('academy:read')
      
      case 'minhas-compras':
        return hasPermission('purchase:read')
      
      case 'financeiro':
        return hasPermission('financial:read')
      
      case 'treinamentos':
        return hasPermission('training:read')
      
      case 'minha-conta':
        return hasPermission('account:read')
      
      case 'mensagens':
        return hasPermission('message:read') || hasPermission('support:read')
      
      case 'funcoes':
        return hasPermission('role:read')
      
      case 'configuracoes':
        return hasPermission('config:read') || hasPermission('setting:read')
      
      default:
        return false
    }
  }, [user, roles, isAdminMemo, hasPermission])

  const canExecuteAction = useCallback((action: string, resource?: string): boolean => {
    if (!user || !roles.length) return false
    
    if (isAdminMemo) return true
    
    const actionPermissionMap: Record<string, Permission> = {
      'view-users': 'user:read',
      'create-user': 'user:write',
      'edit-user': 'user:write',
      'delete-user': 'user:delete',
      'approve-user': 'user:approve',
      'suspend-user': 'user:suspend',
      
      'view-sellers': 'seller:read',
      'create-seller': 'seller:write',
      'edit-seller': 'seller:write',
      'delete-seller': 'seller:delete',
      'approve-seller': 'seller:approve',
      'reject-seller': 'seller:reject',
      
      'view-ads': 'ad:read',
      'create-ad': 'ad:write',
      'edit-ad': 'ad:write',
      'delete-ad': 'ad:delete',
      'moderate-ad': 'ad:moderate',
      'feature-ad': 'ad:feature',
      
      'view-auctions': 'auction:read',
      'create-auction': 'auction:write',
      'edit-auction': 'auction:write',
      'delete-auction': 'auction:delete',
      'moderate-auction': 'auction:moderate',
      'manage-auction': 'auction:manage',
      
      'view-transactions': 'transaction:read',
      'create-transaction': 'transaction:write',
      'edit-transaction': 'transaction:write',
      'delete-transaction': 'transaction:delete',
      'refund-transaction': 'transaction:refund',
      'dispute-transaction': 'transaction:dispute',
      
      'view-documents': 'document:read',
      'verify-document': 'document:verify',
      'reject-document': 'document:reject',
      
      'view-cashback': 'cashback:read',
      'approve-cashback': 'cashback:approve',
      'reject-cashback': 'cashback:reject',
      
      'view-vip': 'vip:read',
      'manage-vip': 'vip:manage',
      
      'view-academy': 'academy:read',
      'create-academy': 'academy:write',
      'moderate-academy': 'academy:moderate',
      
      'view-messages': 'message:read',
      'send-message': 'message:write',
      'moderate-message': 'message:moderate',
      
      'view-support': 'support:read',
      'assign-support': 'support:assign',
      'resolve-support': 'support:resolve',
      
      'view-roles': 'role:read',
      'create-role': 'role:write',
      'edit-role': 'role:write',
      'delete-role': 'role:delete',
      
      'view-config': 'config:read',
      'edit-config': 'config:write',
      'view-settings': 'setting:read',
      'edit-settings': 'setting:write'
    }
    
    const permission = actionPermissionMap[action]
    if (!permission) return false
    
    return hasPermission(permission)
  }, [user, roles, isAdminMemo, hasPermission])

  const canShowButton = useCallback((buttonType: string, context?: any): boolean => {
    if (!user || !roles.length) return false
    
    if (isAdminMemo) return true
    
    switch (buttonType) {
      case 'create-user':
        return hasPermission('user:write')
      
      case 'edit-user':
        return hasPermission('user:write')
      
      case 'delete-user':
        return hasPermission('user:delete')
      
      case 'approve-seller':
        return hasPermission('seller:approve')
      
      case 'reject-seller':
        return hasPermission('seller:reject')
      
      case 'moderate-ad':
        return hasPermission('ad:moderate')
      
      case 'feature-ad':
        return hasPermission('ad:feature')
      
      case 'refund-transaction':
        return hasPermission('transaction:refund')
      
      case 'verify-document':
        return hasPermission('document:verify')
      
      case 'reject-document':
        return hasPermission('document:reject')
      
      case 'create-role':
        return hasPermission('role:write')
      
      case 'edit-role':
        return hasPermission('role:write')
      
      case 'delete-role':
        return hasPermission('role:delete')
      
      default:
        return false
    }
  }, [user, roles, isAdminMemo, hasPermission])

  const canAccessField = useCallback((field: string, resource?: string): boolean => {
    if (!user || !roles.length) return false
    
    if (isAdminMemo) return true
    
    const adminOnlyFields = [
      'roles', 'permissions', 'internal_notes', 'admin_notes',
      'system_settings', 'advanced_config', 'audit_logs'
    ]
    
    if (adminOnlyFields.includes(field)) {
      return isAdminMemo
    }
    
    return true
  }, [user, roles, isAdminMemo])

  return {
    canAccessSection,
    canExecuteAction,
    canShowButton,
    canAccessField,
    isAdmin: isAdminMemo,
    isSeller: isSellerMemo,
    isBuyer: isBuyerMemo
  }
}

export default useAdminPermissions