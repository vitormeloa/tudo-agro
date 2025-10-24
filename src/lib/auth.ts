import { supabase } from './supabase'
import { User, UserWithRoles, Role, Permission } from '@/types/database'

export interface AuthUser {
  id: string
  email: string
  name: string | null
  phone: string | null
  cpf: string | null
  cnpj: string | null
  avatar_url: string | null
  roles: string[]
  permissions: Permission[]
}

// Função para obter usuário atual com roles
export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return null
    }

    // Buscar dados do usuário na tabela users
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select(`
        *,
        user_roles (
          role_id,
          roles (
            name,
            permissions
          )
        )
      `)
      .eq('id', user.id)
      .single()

    if (userError || !userData) {
      return null
    }

    // Extrair roles e permissões
    const roles = userData.user_roles?.map((ur: any) => ur.roles?.name).filter(Boolean) || []
    const permissions = userData.user_roles?.flatMap((ur: any) => ur.roles?.permissions || []) || []

    return {
      id: userData.id,
      email: userData.email,
      name: userData.name,
      phone: userData.phone,
      cpf: userData.cpf,
      cnpj: userData.cnpj,
      avatar_url: userData.avatar_url,
      roles,
      permissions
    }
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

// Função para verificar se usuário tem permissão
export function hasPermission(user: AuthUser | null, permission: Permission): boolean {
  if (!user) return false
  return user.permissions.includes(permission)
}

// Função para verificar se usuário tem role
export function hasRole(user: AuthUser | null, role: string): boolean {
  if (!user) return false
  return user.roles.includes(role)
}

// Função para verificar se usuário é admin
export function isAdmin(user: AuthUser | null): boolean {
  return hasRole(user, 'admin')
}

// Função para verificar se usuário é vendedor
export function isSeller(user: AuthUser | null): boolean {
  return hasRole(user, 'vendedor')
}

// Função para verificar se usuário é comprador
export function isBuyer(user: AuthUser | null): boolean {
  return hasRole(user, 'comprador')
}

// Função para fazer login
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  return { data, error }
}

// Função para fazer logout
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

// Função para criar conta
export async function signUp(email: string, password: string, userData: {
  name?: string
  phone?: string
  cpf?: string
  cnpj?: string
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData,
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://tudoagro.com'}/auth/callback`
    }
  })
  return { data, error }
}

// Função para criar usuário na tabela users após confirmação de email
export async function createUserProfile(userId: string, userData: {
  email: string
  name?: string
  phone?: string
  cpf?: string
  cnpj?: string
  avatar_url?: string
}) {
  const { data, error } = await supabase
    .from('users')
    .insert({
      id: userId,
      ...userData
    })
    .select()
    .single()

  return { data, error }
}

// Função para atribuir role a usuário
export async function assignRoleToUser(userId: string, roleId: string) {
  const { data, error } = await supabase
    .from('user_roles')
    .insert({
      user_id: userId,
      role_id: roleId
    })

  return { data, error }
}

// Função para remover role de usuário
export async function removeRoleFromUser(userId: string, roleId: string) {
  const { error } = await supabase
    .from('user_roles')
    .delete()
    .eq('user_id', userId)
    .eq('role_id', roleId)

  return { error }
}

// Função para obter todas as roles
export async function getRoles() {
  const { data, error } = await supabase
    .from('roles')
    .select('*')
    .order('name')

  return { data, error }
}

// Função para criar role
export async function createRole(roleData: {
  name: string
  description?: string
  permissions: Permission[]
}) {
  const { data, error } = await supabase
    .from('roles')
    .insert(roleData)
    .select()
    .single()

  return { data, error }
}

// Função para atualizar perfil do usuário
export async function updateUserProfile(userId: string, updates: {
  name?: string
  phone?: string
  cpf?: string
  cnpj?: string
  avatar_url?: string
}) {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()

  return { data, error }
}