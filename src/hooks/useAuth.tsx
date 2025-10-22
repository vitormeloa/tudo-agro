'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { AuthUser } from '@/lib/auth'
import { User } from '@supabase/supabase-js'

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  signUp: (email: string, password: string, userData: any) => Promise<{ error?: string }>
  signOut: () => Promise<void>
  hasPermission: (permission: string) => boolean
  hasRole: (role: string) => boolean
  isAdmin: () => boolean
  isSeller: () => boolean
  isBuyer: () => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar sessão inicial
    checkUser()

    // Escutar mudanças na autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          await loadUser(session.user.id)
        } else if (event === 'SIGNED_OUT') {
          setUser(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        await loadUser(session.user.id)
      }
    } catch (error) {
      console.error('Error checking user:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadUser = async (userId: string) => {
    try {
      // Primeiro, verificar se o usuário existe na tabela users
      const { data: userData, error } = await supabase
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
        .eq('id', userId)
        .single()

      if (error) {
        // Se a tabela não existe ou usuário não encontrado, criar perfil básico
        if (error.code === 'PGRST116' || error.message.includes('relation "users" does not exist')) {
          console.warn('Tabela users não encontrada. Execute o script SQL no Supabase primeiro.')
          return
        }
        
        // Se usuário não existe, criar perfil básico
        if (error.code === 'PGRST116') {
          console.log('Usuário não encontrado na tabela users. Criando perfil básico...')
          
          // Obter dados do usuário autenticado
          const { data: { user: authUser } } = await supabase.auth.getUser()
          if (!authUser) return
          
          // Criar perfil básico
          const { error: insertError } = await supabase
            .from('users')
            .insert({
              id: userId,
              email: authUser.email || '',
              name: authUser.user_metadata?.name || null,
              phone: authUser.user_metadata?.phone || null,
              cpf: authUser.user_metadata?.cpf || null,
              cnpj: authUser.user_metadata?.cnpj || null,
              avatar_url: authUser.user_metadata?.avatar_url || null
            })
          
          if (insertError) {
            console.error('Erro ao criar perfil do usuário:', insertError)
            return
          }
          
          // Atribuir role padrão de comprador
          const { data: roles } = await supabase
            .from('roles')
            .select('id')
            .eq('name', 'comprador')
            .single()
          
          if (roles) {
            await supabase
              .from('user_roles')
              .insert({
                user_id: userId,
                role_id: roles.id
              })
          }
          
          // Definir usuário com dados básicos
          setUser({
            id: userId,
            email: authUser.email || '',
            name: authUser.user_metadata?.name || null,
            phone: authUser.user_metadata?.phone || null,
            cpf: authUser.user_metadata?.cpf || null,
            cnpj: authUser.user_metadata?.cnpj || null,
            avatar_url: authUser.user_metadata?.avatar_url || null,
            roles: ['comprador'],
            permissions: []
          })
          return
        }
        
        console.error('Error loading user:', error)
        return
      }

      if (!userData) {
        console.warn('Dados do usuário não encontrados')
        return
      }

      // Extrair roles e permissões
      const roles = userData.user_roles?.map((ur: any) => ur.roles?.name).filter(Boolean) || []
      const permissions = userData.user_roles?.flatMap((ur: any) => ur.roles?.permissions || []) || []

      setUser({
        id: userData.id,
        email: userData.email,
        name: userData.name,
        phone: userData.phone,
        cpf: userData.cpf,
        cnpj: userData.cnpj,
        avatar_url: userData.avatar_url,
        roles,
        permissions
      })
    } catch (error) {
      console.error('Error loading user data:', error)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        return { error: error.message }
      }

      return {}
    } catch (error) {
      return { error: 'Erro interno do servidor' }
    }
  }

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
          emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://tudo-agro.vercel.app'}/login?message=Email confirmado com sucesso!`
        }
      })

      if (error) {
        return { error: error.message }
      }

      return {}
    } catch (error) {
      return { error: 'Erro interno do servidor' }
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const hasPermission = (permission: string) => {
    if (!user) return false
    return user.permissions.includes(permission)
  }

  const hasRole = (role: string) => {
    if (!user) return false
    return user.roles.includes(role)
  }

  const isAdmin = () => hasRole('admin')
  const isSeller = () => hasRole('vendedor')
  const isBuyer = () => hasRole('comprador')

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    hasPermission,
    hasRole,
    isAdmin,
    isSeller,
    isBuyer
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}