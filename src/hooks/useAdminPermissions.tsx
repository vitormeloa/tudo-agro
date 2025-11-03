'use client'

import { useAuth } from './useAuth'
import { Permission } from '@/lib/permissions'

export function useAdminPermissions() {
  const { user, hasPermission } = useAuth()


  // Verificar se pode acessar uma seção específica do admin
  const canAccessSection = (section: string): boolean => {
    if (!user || !user.roles) return false
    
    // Admin sempre pode acessar tudo
    if (user.roles.includes('admin')) return true
    
    // Verificar permissões específicas para cada seção
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
  }

  // Verificar se pode executar uma ação específica
  const canExecuteAction = (action: string, resource?: string): boolean => {
    if (!user || !user.roles) return false
    
    // Admin sempre pode executar tudo
    if (user.roles.includes('admin')) return true
    
    // Mapear ações para permissões
    const actionPermissionMap: Record<string, Permission> = {
      // Ações de usuários
      'view-users': 'user:read',
      'create-user': 'user:write',
      'edit-user': 'user:write',
      'delete-user': 'user:delete',
      'approve-user': 'user:approve',
      'suspend-user': 'user:suspend',
      
      // Ações de vendedores
      'view-sellers': 'seller:read',
      'create-seller': 'seller:write',
      'edit-seller': 'seller:write',
      'delete-seller': 'seller:delete',
      'approve-seller': 'seller:approve',
      'reject-seller': 'seller:reject',
      
      // Ações de anúncios
      'view-ads': 'ad:read',
      'create-ad': 'ad:write',
      'edit-ad': 'ad:write',
      'delete-ad': 'ad:delete',
      'moderate-ad': 'ad:moderate',
      'feature-ad': 'ad:feature',
      
      // Ações de leilões
      'view-auctions': 'auction:read',
      'create-auction': 'auction:write',
      'edit-auction': 'auction:write',
      'delete-auction': 'auction:delete',
      'moderate-auction': 'auction:moderate',
      'manage-auction': 'auction:manage',
      
      // Ações de transações
      'view-transactions': 'transaction:read',
      'create-transaction': 'transaction:write',
      'edit-transaction': 'transaction:write',
      'delete-transaction': 'transaction:delete',
      'refund-transaction': 'transaction:refund',
      'dispute-transaction': 'transaction:dispute',
      
      // Ações de documentos
      'view-documents': 'document:read',
      'verify-document': 'document:verify',
      'reject-document': 'document:reject',
      
      // Ações de cashback
      'view-cashback': 'cashback:read',
      'approve-cashback': 'cashback:approve',
      'reject-cashback': 'cashback:reject',
      
      // Ações de VIP
      'view-vip': 'vip:read',
      'manage-vip': 'vip:manage',
      
      // Ações de academy
      'view-academy': 'academy:read',
      'create-academy': 'academy:write',
      'moderate-academy': 'academy:moderate',
      
      // Ações de mensagens
      'view-messages': 'message:read',
      'send-message': 'message:write',
      'moderate-message': 'message:moderate',
      
      // Ações de suporte
      'view-support': 'support:read',
      'assign-support': 'support:assign',
      'resolve-support': 'support:resolve',
      
      // Ações de funções
      'view-roles': 'role:read',
      'create-role': 'role:write',
      'edit-role': 'role:write',
      'delete-role': 'role:delete',
      
      // Ações de configurações
      'view-config': 'config:read',
      'edit-config': 'config:write',
      'view-settings': 'setting:read',
      'edit-settings': 'setting:write'
    }
    
    const permission = actionPermissionMap[action]
    if (!permission) return false
    
    return hasPermission(permission)
  }

  // Verificar se pode ver um botão/ação específica
  const canShowButton = (buttonType: string, context?: any): boolean => {
    if (!user || !user.roles) return false
    
    // Admin sempre pode ver todos os botões
    if (user.roles.includes('admin')) return true
    
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
  }

  // Verificar se pode acessar um campo específico
  const canAccessField = (field: string, resource?: string): boolean => {
    if (!user || !user.roles) return false
    
    // Admin sempre pode acessar todos os campos
    if (user.roles.includes('admin')) return true
    
    // Campos sensíveis que apenas admin pode ver
    const adminOnlyFields = [
      'roles', 'permissions', 'internal_notes', 'admin_notes',
      'system_settings', 'advanced_config', 'audit_logs'
    ]
    
    if (adminOnlyFields.includes(field)) {
      return user.roles?.includes('admin') || false
    }
    
    return true
  }

  return {
    canAccessSection,
    canExecuteAction,
    canShowButton,
    canAccessField,
    isAdmin: user?.roles?.includes('admin') || false,
    isSeller: user?.roles?.includes('vendedor') || false,
    isBuyer: user?.roles?.includes('comprador') || false
  }
}

export default useAdminPermissions