import { Permission, PermissionResource, PermissionAction } from './permissions'

export interface UserPermissions {
  roles: string[]
  permissions: Permission[]
}

export const hasPermission = (userPermissions: UserPermissions | null, permission: Permission): boolean => {
  if (!userPermissions || !userPermissions.roles || !userPermissions.permissions) return false
  
  if (userPermissions.roles.includes('admin')) return true
  
  return userPermissions.permissions.includes(permission)
}

export const hasAnyPermission = (userPermissions: UserPermissions | null, permissions: Permission[]): boolean => {
  if (!userPermissions || !userPermissions.roles || !userPermissions.permissions) return false
  
  if (userPermissions.roles.includes('admin')) return true
  
  return permissions.some(permission => userPermissions.permissions.includes(permission))
}

export const hasAllPermissions = (userPermissions: UserPermissions | null, permissions: Permission[]): boolean => {
  if (!userPermissions || !userPermissions.roles || !userPermissions.permissions) return false
  
  if (userPermissions.roles.includes('admin')) return true
  
  return permissions.every(permission => userPermissions.permissions.includes(permission))
}

export const canAccess = (userPermissions: UserPermissions | null, resource: PermissionResource, action: PermissionAction): boolean => {
  const permission = `${resource}:${action}` as Permission
  return hasPermission(userPermissions, permission)
}

export const hasRole = (userPermissions: UserPermissions | null, role: string): boolean => {
  if (!userPermissions || !userPermissions.roles) return false
  return userPermissions.roles.includes(role)
}

export const hasAnyRole = (userPermissions: UserPermissions | null, roles: string[]): boolean => {
  if (!userPermissions || !userPermissions.roles) return false
  return roles.some(role => userPermissions.roles.includes(role))
}

export const getResourcePermissions = (userPermissions: UserPermissions | null, resource: PermissionResource): Permission[] => {
  if (!userPermissions || !userPermissions.permissions) return []
  
  return userPermissions.permissions.filter(permission => 
    permission.startsWith(`${resource}:`)
  )
}

export const canManageUser = (userPermissions: UserPermissions | null, targetUserId: string, currentUserId: string): boolean => {
  if (!userPermissions) return false
  
  if (hasRole(userPermissions, 'admin')) return true
  
  if (targetUserId === currentUserId) return true
  
  return false
}

export const canManageResource = (userPermissions: UserPermissions | null, resource: PermissionResource): boolean => {
  if (!userPermissions) return false
  
  if (hasRole(userPermissions, 'admin')) return true
  
  return canAccess(userPermissions, resource, 'write')
}

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