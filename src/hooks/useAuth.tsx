'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { Permission, UserPermissions } from '@/lib/permission-utils'
import { hasPermission as checkPermission, hasRole as checkRole } from '@/lib/permission-utils'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

// Definir interface AuthUser localmente
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
  const [isInitialized, setIsInitialized] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  // Cache local para persistir estado de autenticação
  const CACHE_KEY = 'tudo-agro-auth-cache'
  const CACHE_EXPIRY = 5 * 60 * 1000 // 5 minutos

  // Função para salvar no cache
  const saveToCache = useCallback((userData: AuthUser | null) => {
    try {
      const cacheData = {
        user: userData,
        timestamp: Date.now()
      }
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))
    } catch (error) {
      console.warn('Failed to save auth cache:', error)
    }
  }, [])

  // Função para carregar do cache
  const loadFromCache = useCallback((): AuthUser | null => {
    try {
      const cached = localStorage.getItem(CACHE_KEY)
      if (!cached) return null

      const cacheData = JSON.parse(cached)
      const isExpired = Date.now() - cacheData.timestamp > CACHE_EXPIRY
      
      if (isExpired) {
        localStorage.removeItem(CACHE_KEY)
        return null
      }

      return cacheData.user
    } catch (error) {
      console.warn('Failed to load auth cache:', error)
      return null
    }
  }, [])

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
      roles: ['comprador'], // Default role
      permissions: []
    }
  }, [])

  // Função para carregar dados completos do usuário
  const loadUser = useCallback(async (userId: string) => {
    try {
      console.log('Loading user data for:', userId)
      
      // Obter dados do usuário autenticado
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser()
      if (authError || !authUser) {
        console.error('Auth error:', authError)
        setUser(null)
        return
      }

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
        // Se usuário não existe na tabela, criar perfil básico
        if (error.code === 'PGRST116') {
          await createUserProfile(userId, authUser)
          return
        }
        
        // Em caso de outros erros, usar dados básicos do auth
        const basicUser = createBasicUser(authUser)
        setUser(basicUser)
        saveToCache(basicUser)
        return
      }

      if (!userData) {
        const basicUser = createBasicUser(authUser)
        setUser(basicUser)
        saveToCache(basicUser)
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
      saveToCache(userWithData)
      console.log('User loaded successfully:', { id: userWithData.id, email: userWithData.email, roles })
    } catch (error) {
      console.error('Error loading user:', error)
      // Em caso de erro, tentar usar dados básicos do auth
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser()
        if (authUser) {
          const basicUser = createBasicUser(authUser)
          setUser(basicUser)
          saveToCache(basicUser)
        } else {
          setUser(null)
          saveToCache(null)
        }
      } catch {
        setUser(null)
        saveToCache(null)
      }
    }
  }, [createBasicUser, saveToCache])

  // Função para criar perfil de usuário
  const createUserProfile = useCallback(async (userId: string, authUser: any) => {
    try {
      // Buscar role de comprador
      const { data: roles } = await supabase
        .from('roles')
        .select('id')
        .eq('name', 'comprador')
        .single()

      if (roles) {
        // Criar perfil do usuário
        await supabase
          .from('users')
          .insert({
            id: userId,
            email: authUser.email,
            name: authUser.user_metadata?.name || null,
            phone: authUser.user_metadata?.phone || null,
            cpf: authUser.user_metadata?.cpf || null,
            cnpj: authUser.user_metadata?.cnpj || null,
            avatar_url: authUser.user_metadata?.avatar_url || null
          })

        // Associar role de comprador
        await supabase
          .from('user_roles')
          .insert({
            user_id: userId,
            role_id: roles.id
          })
      }
      
      const basicUser = createBasicUser(authUser)
      setUser(basicUser)
      saveToCache(basicUser)
    } catch (error) {
      console.error('Error creating user profile:', error)
      const basicUser = createBasicUser(authUser)
      setUser(basicUser)
      saveToCache(basicUser)
    }
  }, [createBasicUser, saveToCache])

  // Função para verificar usuário inicial
  const checkUser = useCallback(async () => {
    try {
      setLoading(true)
      console.log('Checking user session...')
      
      // Primeiro, tentar carregar do cache para uma resposta mais rápida
      const cachedUser = loadFromCache()
      if (cachedUser) {
        console.log('User found in cache, using cached data')
        setUser(cachedUser)
        setLoading(false)
        setIsInitialized(true)
        
        // Verificar se a sessão ainda é válida em background
        setTimeout(async () => {
          try {
            const { data: { session } } = await supabase.auth.getSession()
            if (!session?.user) {
              console.log('Session expired, clearing cache')
              setUser(null)
              saveToCache(null)
            }
          } catch (error) {
            console.warn('Background session check failed:', error)
          }
        }, 1000)
        
        return
      }
      
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        console.error('Session error:', error)
        setUser(null)
        saveToCache(null)
        return
      }
      
      if (session?.user) {
        console.log('User session found, loading user data...')
        await loadUser(session.user.id)
      } else {
        console.log('No user session found')
        setUser(null)
        saveToCache(null)
      }
    } catch (error) {
      console.error('Check user error:', error)
      setUser(null)
      saveToCache(null)
    } finally {
      console.log('Check user completed, setting loading to false')
      setLoading(false)
      setIsInitialized(true)
    }
  }, [loadUser, loadFromCache, saveToCache])

  // Função para refresh do usuário
  const refreshUser = useCallback(async () => {
    if (user?.id) {
      await loadUser(user.id)
    }
  }, [user?.id, loadUser])

  // Inicialização e listeners
  useEffect(() => {
    if (!isInitialized) {
      checkUser()
    }

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
          saveToCache(null)
          setLoading(false)
        } else if (event === 'TOKEN_REFRESHED' && session) {
          setLoading(true)
          await loadUser(session.user.id)
          setLoading(false)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [isInitialized, checkUser, loadUser, saveToCache])

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
      
      // Usar a API de signup que já gerencia roles corretamente
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

  // Função de logout
  const signOut = useCallback(async () => {
    try {
      setLoading(true)
      console.log('Starting logout process...')
      
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('Logout error:', error)
        throw error
      }

      setUser(null)
      saveToCache(null)
      console.log('Logout successful')
      
      // Redirecionar para home após logout
      router.push('/')
      
    } catch (error) {
      console.error('Logout error:', error)
      // Mesmo com erro, limpar estado local
      setUser(null)
      saveToCache(null)
      router.push('/')
      throw error
    } finally {
      setLoading(false)
    }
  }, [router, saveToCache])

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