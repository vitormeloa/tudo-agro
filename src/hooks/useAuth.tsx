'use client'

import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react'
import { createBrowserClient } from '@supabase/ssr'
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
  updatePassword: (newPassword: string) => Promise<{ error?: string }>
  hasPermission: (permission: Permission) => boolean
  hasRole: (role: string) => boolean
  isAdmin: () => boolean
  isSeller: () => boolean
  isBuyer: () => boolean
  getUserPermissions: () => UserPermissions | null
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Criar cliente Supabase único
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)

// Cache de sessão para evitar múltiplas verificações
let sessionCache: { user: AuthUser | null; timestamp: number } | null = null
const CACHE_DURATION = 30000 // 30 segundos

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const router = useRouter()
  
  // Refs para prevenir loops e múltiplas chamadas
  const loadingRef = useRef(false)
  const mountedRef = useRef(true)
  const checkInProgressRef = useRef(false)
  const lastCheckRef = useRef(0)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
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
      roles: ['comprador'],
      permissions: []
    }
  }, [])

  // Função para carregar dados do usuário com cache
  const loadUser = useCallback(async (userId: string, force = false): Promise<AuthUser | null> => {
    if (!mountedRef.current) return null

    // Verificar cache primeiro
    if (!force && sessionCache && sessionCache.user?.id === userId) {
      const cacheAge = Date.now() - sessionCache.timestamp
      if (cacheAge < CACHE_DURATION) {
        return sessionCache.user
      }
    }

    try {
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
        // Se usuário não existe na tabela, usar dados básicos
        if (error.code === 'PGRST116') {
          const { data: { user: authUser } } = await supabase.auth.getUser()
          if (authUser && mountedRef.current) {
            const basicUser = createBasicUser(authUser)
            sessionCache = { user: basicUser, timestamp: Date.now() }
            return basicUser
          }
          return null
        }
        
        // Em caso de outros erros, usar dados básicos
        const { data: { user: authUser } } = await supabase.auth.getUser()
        if (authUser && mountedRef.current) {
          const basicUser = createBasicUser(authUser)
          sessionCache = { user: basicUser, timestamp: Date.now() }
          return basicUser
        }
        return null
      }

      if (!userData) {
        const { data: { user: authUser } } = await supabase.auth.getUser()
        if (authUser && mountedRef.current) {
          const basicUser = createBasicUser(authUser)
          sessionCache = { user: basicUser, timestamp: Date.now() }
          return basicUser
        }
        return null
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

      // Atualizar cache
      sessionCache = { user: userWithData, timestamp: Date.now() }
      
      return userWithData
    } catch (error) {
      console.error('Error loading user:', error)
      // Em caso de erro, usar dados básicos
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser()
        if (authUser && mountedRef.current) {
          const basicUser = createBasicUser(authUser)
          sessionCache = { user: basicUser, timestamp: Date.now() }
          return basicUser
        }
      } catch {
        // Ignorar erros
      }
      return null
    }
  }, [createBasicUser])

  // Verificar usuário inicial com throttling
  const checkUser = useCallback(async (force = false) => {
    // Prevenir múltiplas chamadas simultâneas
    if (checkInProgressRef.current && !force) {
      return
    }

    // Throttle: máximo uma verificação a cada 2 segundos
    const now = Date.now()
    if (!force && now - lastCheckRef.current < 2000) {
      return
    }

    try {
      checkInProgressRef.current = true
      lastCheckRef.current = now
      
      if (!mountedRef.current) return

      setLoading(true)
      
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        if (mountedRef.current) {
          setUser(null)
          sessionCache = null
        }
        return
      }
      
      if (session?.user) {
        const loadedUser = await loadUser(session.user.id, force)
        if (mountedRef.current) {
          setUser(loadedUser)
        }
      } else {
        if (mountedRef.current) {
          setUser(null)
          sessionCache = null
        }
      }
    } catch (error) {
      console.error('Check user error:', error)
      if (mountedRef.current) {
        setUser(null)
        sessionCache = null
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false)
        checkInProgressRef.current = false
      }
    }
  }, [loadUser])

  // Inicialização única
  useEffect(() => {
    checkUser(true)

    // Escutar mudanças na autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // Limpar cache em mudanças de auth
        sessionCache = null
        
        if (event === 'SIGNED_IN' && session) {
          if (mountedRef.current) {
            setLoading(true)
            const loadedUser = await loadUser(session.user.id, true)
            if (mountedRef.current) {
              setUser(loadedUser)
              setLoading(false)
            }
          }
        } else if (event === 'SIGNED_OUT') {
          if (mountedRef.current) {
            setUser(null)
            setLoading(false)
            sessionCache = null
          }
        } else if (event === 'TOKEN_REFRESHED' && session) {
          // Não recarregar tudo, apenas atualizar cache se necessário
          if (mountedRef.current && user?.id === session.user.id) {
            // Apenas invalidar cache, não recarregar imediatamente
            sessionCache = null
          }
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, []) // Apenas uma vez na montagem

  // Função de login otimizada
  const signIn = useCallback(async (email: string, password: string) => {
    if (loadingRef.current) {
      return { error: 'Login já em andamento' }
    }

    try {
      loadingRef.current = true
      if (mountedRef.current) {
        setLoading(true)
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        const errorMessage = getAuthErrorMessage(error.message)
        if (mountedRef.current) {
          toast({
            title: "Erro no login",
            description: errorMessage,
            variant: "destructive",
          })
        }
        return { error: errorMessage }
      }

      if (data.user && mountedRef.current) {
        // Limpar cache e recarregar
        sessionCache = null
        const loadedUser = await loadUser(data.user.id, true)
        if (mountedRef.current) {
          setUser(loadedUser)
          toast({
            title: "Login realizado com sucesso!",
            description: "Bem-vindo de volta ao TudoAgro.",
          })
        }
      }

      return {}
    } catch (error) {
      console.error('Sign in error:', error)
      const errorMessage = "Erro interno do servidor. Tente novamente."
      if (mountedRef.current) {
        toast({
          title: "Erro interno",
          description: errorMessage,
          variant: "destructive",
        })
      }
      return { error: errorMessage }
    } finally {
      loadingRef.current = false
      if (mountedRef.current) {
        setLoading(false)
      }
    }
  }, [loadUser, toast])

  // Função de cadastro
  const signUp = useCallback(async (email: string, password: string, userData: any) => {
    try {
      if (mountedRef.current) {
        setLoading(true)
      }
      
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
        if (mountedRef.current) {
          toast({
            title: "Erro no cadastro",
            description: errorMessage,
            variant: "destructive",
          })
        }
        return { error: errorMessage }
      }

      if (mountedRef.current) {
        toast({
          title: "Conta criada com sucesso!",
          description: "Sua conta foi criada e você já pode fazer login.",
        })
      }
      return {}
    } catch (error) {
      console.error('Sign up error:', error)
      const errorMessage = "Erro interno do servidor. Tente novamente."
      if (mountedRef.current) {
        toast({
          title: "Erro interno",
          description: errorMessage,
          variant: "destructive",
        })
      }
      return { error: errorMessage }
    } finally {
      if (mountedRef.current) {
        setLoading(false)
      }
    }
  }, [toast])

  // Função de logout otimizada
  const signOut = useCallback(async () => {
    try {
      // Limpar estado local primeiro
      if (mountedRef.current) {
        setUser(null)
        setLoading(false)
      }
      sessionCache = null
      
      // Fazer logout do Supabase
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('Logout error:', error)
        // Mesmo com erro, continuar com logout local
      }

      // Limpar todos os cookies relacionados
      if (typeof document !== 'undefined') {
        document.cookie.split(";").forEach((c) => {
          const eqPos = c.indexOf("=")
          const name = eqPos > -1 ? c.substr(0, eqPos).trim() : c.trim()
          // Limpar cookies do Supabase
          if (name.startsWith('sb-') || name.includes('supabase')) {
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`
          }
        })
      }
      
      // Redirecionar para home
      router.push('/')
      router.refresh() // Forçar refresh da página
      
    } catch (error) {
      console.error('Logout error:', error)
      // Mesmo com erro, limpar estado local e redirecionar
      if (mountedRef.current) {
        setUser(null)
        setLoading(false)
      }
      sessionCache = null
      router.push('/')
      router.refresh()
    }
  }, [router])

  // Função para trocar senha (requer senha atual)
  const changePassword = useCallback(async (currentPassword: string, newPassword: string) => {
    try {
      // Primeiro verificar senha atual fazendo login
      const { data: { user: currentUser } } = await supabase.auth.getUser()
      if (!currentUser?.email) {
        return { error: 'Usuário não encontrado' }
      }

      const { error: verifyError } = await supabase.auth.signInWithPassword({
        email: currentUser.email,
        password: currentPassword
      })

      if (verifyError) {
        return { error: 'Senha atual incorreta' }
      }

      // Se senha atual está correta, atualizar
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (error) {
        const errorMessage = getAuthErrorMessage(error.message)
        if (mountedRef.current) {
          toast({
            title: "Erro ao alterar senha",
            description: errorMessage,
            variant: "destructive",
          })
        }
        return { error: errorMessage }
      }

      if (mountedRef.current) {
        toast({
          title: "Senha alterada com sucesso!",
          description: "Sua senha foi atualizada.",
        })
      }
      return {}
    } catch (error) {
      const errorMessage = "Erro interno do servidor. Tente novamente."
      if (mountedRef.current) {
        toast({
          title: "Erro interno",
          description: errorMessage,
          variant: "destructive",
        })
      }
      return { error: errorMessage }
    }
  }, [toast])

  // Função para resetar senha (envio de email)
  const resetPassword = useCallback(async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })

      if (error) {
        const errorMessage = getAuthErrorMessage(error.message)
        if (mountedRef.current) {
          toast({
            title: "Erro ao enviar email",
            description: errorMessage,
            variant: "destructive",
          })
        }
        return { error: errorMessage }
      }

      if (mountedRef.current) {
        toast({
          title: "Email enviado!",
          description: "Verifique sua caixa de entrada para redefinir sua senha.",
        })
      }
      return {}
    } catch (error) {
      const errorMessage = "Erro interno do servidor. Tente novamente."
      if (mountedRef.current) {
        toast({
          title: "Erro interno",
          description: errorMessage,
          variant: "destructive",
        })
      }
      return { error: errorMessage }
    }
  }, [toast])

  // Função para atualizar senha após reset (quando vem do email)
  const updatePassword = useCallback(async (newPassword: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (error) {
        const errorMessage = getAuthErrorMessage(error.message)
        if (mountedRef.current) {
          toast({
            title: "Erro ao atualizar senha",
            description: errorMessage,
            variant: "destructive",
          })
        }
        return { error: errorMessage }
      }

      if (mountedRef.current) {
        toast({
          title: "Senha atualizada com sucesso!",
          description: "Sua senha foi redefinida.",
        })
      }
      return {}
    } catch (error) {
      const errorMessage = "Erro interno do servidor. Tente novamente."
      if (mountedRef.current) {
        toast({
          title: "Erro interno",
          description: errorMessage,
          variant: "destructive",
        })
      }
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
      sessionCache = null
      const loadedUser = await loadUser(user.id, true)
      if (mountedRef.current) {
        setUser(loadedUser)
      }
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
    updatePassword,
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

// Exportar supabase para uso em outros lugares se necessário
export { supabase }
