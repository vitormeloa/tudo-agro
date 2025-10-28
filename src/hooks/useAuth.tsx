'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { Permission, UserPermissions } from '@/lib/permission-utils'
import { hasPermission as checkPermission, hasRole as checkRole } from '@/lib/permission-utils'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

// Interface do usuário
interface AuthUser {
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

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  signUp: (email: string, password: string, userData: any) => Promise<{ error?: string }>
  signOut: () => Promise<void>
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ error?: string }>
  resetPassword: (email: string) => Promise<{ error?: string }>
  hasPermission: (permission: Permission) => boolean
  hasRole: (role: string) => boolean
  isAdmin: () => boolean
  isSeller: () => boolean
  isBuyer: () => boolean
  getUserPermissions: () => UserPermissions | null
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const router = useRouter()

  // Função para criar usuário básico
  const createBasicUser = useCallback((authUser: any): AuthUser => {
    return {
      id: authUser.id,
      email: authUser.email || '',
      name: authUser.user_metadata?.name || null,
      phone: authUser.user_metadata?.phone || null,
      cpf: authUser.user_metadata?.cpf || null,
      cnpj: authUser.user_metadata?.cnpj || null,
      avatar_url: authUser.user_metadata?.avatar_url || null,
      roles: ['comprador'],
      permissions: []
    }
  }, [])

  // Função para carregar dados do usuário
  const loadUser = useCallback(async (userId: string) => {
    try {
      console.log('Loading user data for:', userId)
      
      // Buscar dados do usuário na tabela users
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
        console.error('Database error:', error)
        // Se usuário não existe na tabela, usar dados básicos
        if (error.code === 'PGRST116') {
          const { data: { user: authUser } } = await supabase.auth.getUser()
          if (authUser) {
            const basicUser = createBasicUser(authUser)
            setUser(basicUser)
          }
          return
        }
        
        // Em caso de outros erros, usar dados básicos
        const { data: { user: authUser } } = await supabase.auth.getUser()
        if (authUser) {
          const basicUser = createBasicUser(authUser)
          setUser(basicUser)
        }
        return
      }

      if (!userData) {
        const { data: { user: authUser } } = await supabase.auth.getUser()
        if (authUser) {
          const basicUser = createBasicUser(authUser)
          setUser(basicUser)
        }
        return
      }

      // Extrair roles e permissões
      const roles = userData.user_roles?.map((ur: any) => ur.roles?.name).filter(Boolean) || []
      const permissions = userData.user_roles?.flatMap((ur: any) => ur.roles?.permissions || []) || []

      const userWithData: AuthUser = {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        phone: userData.phone,
        cpf: userData.cpf,
        cnpj: userData.cnpj,
        avatar_url: userData.avatar_url,
        roles: roles || [],
        permissions: permissions || []
      }

      setUser(userWithData)
      console.log('User loaded successfully:', { id: userWithData.id, email: userWithData.email, roles })
    } catch (error) {
      console.error('Error loading user:', error)
      // Em caso de erro, usar dados básicos
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser()
        if (authUser) {
          const basicUser = createBasicUser(authUser)
          setUser(basicUser)
        }
      } catch {
        setUser(null)
      }
    }
  }, [createBasicUser])

  // Verificar usuário inicial
  const checkUser = useCallback(async () => {
    try {
      setLoading(true)
      console.log('Checking user session...')
      
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        console.error('Session error:', error)
        setUser(null)
        return
      }
      
      if (session?.user) {
        console.log('User session found, loading user data...')
        await loadUser(session.user.id)
      } else {
        console.log('No user session found')
        setUser(null)
      }
    } catch (error) {
      console.error('Check user error:', error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [loadUser])

  // Inicialização
  useEffect(() => {
    checkUser()

    // Escutar mudanças na autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user?.id)
        
        if (event === 'SIGNED_IN' && session) {
          setLoading(true)
          await loadUser(session.user.id)
          setLoading(false)
        } else if (event === 'SIGNED_OUT') {
          setUser(null)
          setLoading(false)
        } else if (event === 'TOKEN_REFRESHED' && session) {
          setLoading(true)
          await loadUser(session.user.id)
          setLoading(false)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [checkUser, loadUser])

  // Função de login
  const signIn = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        const errorMessage = getAuthErrorMessage(error.message)
        toast({
          title: "Erro no login",
          description: errorMessage,
          variant: "destructive",
        })
        return { error: errorMessage }
      }

      if (data.user) {
        await loadUser(data.user.id)
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo de volta ao TudoAgro.",
        })
      }

      return {}
    } catch (error) {
      console.error('Sign in error:', error)
      const errorMessage = "Erro interno do servidor. Tente novamente."
      toast({
        title: "Erro interno",
        description: errorMessage,
        variant: "destructive",
      })
      return { error: errorMessage }
    } finally {
      setLoading(false)
    }
  }, [loadUser, toast])

  // Função de cadastro
  const signUp = useCallback(async (email: string, password: string, userData: any) => {
    try {
      setLoading(true)
      
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          name: userData.name,
          phone: userData.phone,
          cpf: userData.cpf,
          cnpj: userData.cnpj,
          roles: userData.roles || ['comprador']
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        const errorMessage = data.error || "Erro ao criar conta"
        toast({
          title: "Erro no cadastro",
          description: errorMessage,
          variant: "destructive",
        })
        return { error: errorMessage }
      }

      toast({
        title: "Conta criada com sucesso!",
        description: "Sua conta foi criada e você já pode fazer login.",
      })
      return {}
    } catch (error) {
      console.error('Sign up error:', error)
      const errorMessage = "Erro interno do servidor. Tente novamente."
      toast({
        title: "Erro interno",
        description: errorMessage,
        variant: "destructive",
      })
      return { error: errorMessage }
    } finally {
      setLoading(false)
    }
  }, [toast])

  // Função de logout - SIMPLIFICADA
  const signOut = useCallback(async () => {
    try {
      console.log('Starting logout process...')
      
      // Limpar estado local primeiro
      setUser(null)
      setLoading(false)
      
      // Fazer logout do Supabase
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('Logout error:', error)
        // Mesmo com erro, continuar com logout local
      }

      console.log('Logout successful')
      
      // Redirecionar para home
      router.push('/')
      
    } catch (error) {
      console.error('Logout error:', error)
      // Mesmo com erro, limpar estado local e redirecionar
      setUser(null)
      setLoading(false)
      router.push('/')
    }
  }, [router])

  // Função para trocar senha
  const changePassword = useCallback(async (currentPassword: string, newPassword: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (error) {
        const errorMessage = getAuthErrorMessage(error.message)
        toast({
          title: "Erro ao alterar senha",
          description: errorMessage,
          variant: "destructive",
        })
        return { error: errorMessage }
      }

      toast({
        title: "Senha alterada com sucesso!",
        description: "Sua senha foi atualizada.",
      })
      return {}
    } catch (error) {
      const errorMessage = "Erro interno do servidor. Tente novamente."
      toast({
        title: "Erro interno",
        description: errorMessage,
        variant: "destructive",
      })
      return { error: errorMessage }
    }
  }, [toast])

  // Função para resetar senha
  const resetPassword = useCallback(async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })

      if (error) {
        const errorMessage = getAuthErrorMessage(error.message)
        toast({
          title: "Erro ao enviar email",
          description: errorMessage,
          variant: "destructive",
        })
        return { error: errorMessage }
      }

      toast({
        title: "Email enviado!",
        description: "Verifique sua caixa de entrada para redefinir sua senha.",
      })
      return {}
    } catch (error) {
      const errorMessage = "Erro interno do servidor. Tente novamente."
      toast({
        title: "Erro interno",
        description: errorMessage,
        variant: "destructive",
      })
      return { error: errorMessage }
    }
  }, [toast])

  // Funções de permissão
  const hasPermission = useCallback((permission: Permission): boolean => {
    if (!user || !user.permissions || !user.roles) return false
    return checkPermission({ permissions: user.permissions, roles: user.roles }, permission)
  }, [user])

  const hasRole = useCallback((role: string): boolean => {
    if (!user || !user.roles) return false
    return checkRole({ roles: user.roles, permissions: user.permissions || [] }, role)
  }, [user])

  const isAdmin = useCallback((): boolean => {
    return hasRole('admin')
  }, [hasRole])

  const isSeller = useCallback((): boolean => {
    return hasRole('vendedor')
  }, [hasRole])

  const isBuyer = useCallback((): boolean => {
    return hasRole('comprador')
  }, [hasRole])

  const getUserPermissions = useCallback((): UserPermissions | null => {
    if (!user) return null
    return {
      permissions: user.permissions || [],
      roles: user.roles || []
    }
  }, [user])

  const refreshUser = useCallback(async () => {
    if (user?.id) {
      await loadUser(user.id)
    }
  }, [user?.id, loadUser])

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    changePassword,
    resetPassword,
    hasPermission,
    hasRole,
    isAdmin,
    isSeller,
    isBuyer,
    getUserPermissions,
    refreshUser
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

// Função para traduzir mensagens de erro do Supabase
function getAuthErrorMessage(errorMessage: string): string {
  const errorMap: Record<string, string> = {
    'Invalid login credentials': 'Email ou senha incorretos.',
    'Email not confirmed': 'Email não confirmado. Verifique sua caixa de entrada.',
    'User not found': 'Usuário não encontrado.',
    'Invalid email': 'Email inválido.',
    'Password should be at least 6 characters': 'A senha deve ter pelo menos 6 caracteres.',
    'User already registered': 'Este email já está cadastrado.',
    'Email rate limit exceeded': 'Muitas tentativas. Tente novamente em alguns minutos.',
    'Password rate limit exceeded': 'Muitas tentativas. Tente novamente em alguns minutos.',
    'Signup is disabled': 'Cadastro temporariamente desabilitado.',
    'Email address is invalid': 'Endereço de email inválido.',
    'Password is too weak': 'Senha muito fraca. Use uma senha mais forte.',
    'Unable to validate email address: invalid format': 'Formato de email inválido.',
    'Database error saving new user': 'Erro interno. Tente novamente.',
    'For security purposes, you can only request this once every 60 seconds': 'Aguarde 60 segundos antes de tentar novamente.',
  }

  return errorMap[errorMessage] || 'Erro inesperado. Tente novamente.'
}