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

      if (error || !userData) {
        console.error('Error loading user:', error)
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
          data: userData
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