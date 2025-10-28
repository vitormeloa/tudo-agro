import { Permission, PermissionResource, PermissionAction } from './permissions'

export interface UserPermissions {
  roles: string[]
  permissions: Permission[]
}

// Função para verificar se o usuário tem uma permissão específica
export const hasPermission = (userPermissions: UserPermissions | null, permission: Permission): boolean => {
  if (!userPermissions || !userPermissions.roles || !userPermissions.permissions) return false
  
  // Se o usuário tem role admin, tem todas as permissões
  if (userPermissions.roles.includes('admin')) return true
  
  return userPermissions.permissions.includes(permission)
}

// Função para verificar se o usuário tem qualquer uma das permissões fornecidas
export const hasAnyPermission = (userPermissions: UserPermissions | null, permissions: Permission[]): boolean => {
  if (!userPermissions || !userPermissions.roles || !userPermissions.permissions) return false
  
  // Se o usuário tem role admin, tem todas as permissões
  if (userPermissions.roles.includes('admin')) return true
  
  return permissions.some(permission => userPermissions.permissions.includes(permission))
}

// Função para verificar se o usuário tem todas as permissões fornecidas
export const hasAllPermissions = (userPermissions: UserPermissions | null, permissions: Permission[]): boolean => {
  if (!userPermissions || !userPermissions.roles || !userPermissions.permissions) return false
  
  // Se o usuário tem role admin, tem todas as permissões
  if (userPermissions.roles.includes('admin')) return true
  
  return permissions.every(permission => userPermissions.permissions.includes(permission))
}

// Função para verificar se o usuário tem permissão para um recurso e ação específicos
export const canAccess = (userPermissions: UserPermissions | null, resource: PermissionResource, action: PermissionAction): boolean => {
  const permission = `${resource}:${action}` as Permission
  return hasPermission(userPermissions, permission)
}

// Função para verificar se o usuário tem role específica
export const hasRole = (userPermissions: UserPermissions | null, role: string): boolean => {
  if (!userPermissions || !userPermissions.roles) return false
  return userPermissions.roles.includes(role)
}

// Função para verificar se o usuário tem qualquer uma das roles fornecidas
export const hasAnyRole = (userPermissions: UserPermissions | null, roles: string[]): boolean => {
  if (!userPermissions || !userPermissions.roles) return false
  return roles.some(role => userPermissions.roles.includes(role))
}

// Função para obter permissões do usuário para um recurso específico
export const getResourcePermissions = (userPermissions: UserPermissions | null, resource: PermissionResource): Permission[] => {
  if (!userPermissions || !userPermissions.permissions) return []
  
  return userPermissions.permissions.filter(permission => 
    permission.startsWith(`${resource}:`)
  )
}

// Função para verificar se o usuário pode gerenciar outro usuário
export const canManageUser = (userPermissions: UserPermissions | null, targetUserId: string, currentUserId: string): boolean => {
  if (!userPermissions) return false
  
  // Admin pode gerenciar qualquer usuário
  if (hasRole(userPermissions, 'admin')) return true
  
  // Usuário pode gerenciar a si mesmo (para edição de perfil)
  if (targetUserId === currentUserId) return true
  
  return false
}

// Função para verificar se o usuário pode gerenciar um recurso específico
export const canManageResource = (userPermissions: UserPermissions | null, resource: PermissionResource): boolean => {
  if (!userPermissions) return false
  
  // Admin pode gerenciar qualquer recurso
  if (hasRole(userPermissions, 'admin')) return true
  
  // Verificar se tem permissão de write para o recurso
  return canAccess(userPermissions, resource, 'write')
}

// Função para obter permissões necessárias para uma ação específica
export const getRequiredPermissions = (action: string): Permission[] => {
  const permissionMap: Record<string, Permission[]> = {
    'view-dashboard': ['admin:read'],
    'manage-users': ['user:read', 'user:write'],
    'manage-roles': ['role:read', 'role:write'],
    'manage-products': ['product:read', 'product:write'],
    'manage-auctions': ['auction:read', 'auction:write'],
    'view-transactions': ['transaction:read'],
    'manage-messages': ['message:read', 'message:write'],
    'manage-reviews': ['review:read', 'review:write']
  }
  
  return permissionMap[action] || []
}

export default {
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  canAccess,
  hasRole,
  hasAnyRole,
  getResourcePermissions,
  canManageUser,
  canManageResource,
  getRequiredPermissions
}