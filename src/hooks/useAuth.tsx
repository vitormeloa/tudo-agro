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
  initialized: boolean
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

// Chaves para localStorage
const AUTH_CACHE_KEY = 'tudoagro_auth_cache'
const AUTH_TIMESTAMP_KEY = 'tudoagro_auth_timestamp'
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutos

// Sistema de eventos para sincronização entre componentes
class AuthEventEmitter {
  private listeners: Map<string, Set<Function>> = new Map()

  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set())
    }
    this.listeners.get(event)!.add(callback)
    
    return () => {
      this.listeners.get(event)?.delete(callback)
    }
  }

  emit(event: string, data?: any) {
    this.listeners.get(event)?.forEach(callback => {
      try {
        callback(data)
      } catch (error) {
        console.error('Error in auth event listener:', error)
      }
    })
  }
}

const authEvents = new AuthEventEmitter()

// Funções de cache local
function saveAuthCache(user: AuthUser | null) {
  try {
    if (typeof window === 'undefined') return
    
    if (user) {
      localStorage.setItem(AUTH_CACHE_KEY, JSON.stringify(user))
      localStorage.setItem(AUTH_TIMESTAMP_KEY, Date.now().toString())
    } else {
      localStorage.removeItem(AUTH_CACHE_KEY)
      localStorage.removeItem(AUTH_TIMESTAMP_KEY)
    }
  } catch (error) {
    console.error('Error saving auth cache:', error)
  }
}

function loadAuthCache(): AuthUser | null {
  try {
    if (typeof window === 'undefined') return null
    
    const cached = localStorage.getItem(AUTH_CACHE_KEY)
    const timestamp = localStorage.getItem(AUTH_TIMESTAMP_KEY)
    
    if (!cached || !timestamp) return null
    
    const age = Date.now() - parseInt(timestamp, 10)
    if (age > CACHE_DURATION) {
      // Cache expirado
      localStorage.removeItem(AUTH_CACHE_KEY)
      localStorage.removeItem(AUTH_TIMESTAMP_KEY)
      return null
    }
    
    return JSON.parse(cached) as AuthUser
  } catch (error) {
    console.error('Error loading auth cache:', error)
    return null
  }
}

function clearAuthCache() {
  try {
    if (typeof window === 'undefined') return
    localStorage.removeItem(AUTH_CACHE_KEY)
    localStorage.removeItem(AUTH_TIMESTAMP_KEY)
  } catch (error) {
    console.error('Error clearing auth cache:', error)
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [initialized, setInitialized] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  
  // Refs para prevenir loops e múltiplas chamadas
  const loadingRef = useRef(false)
  const mountedRef = useRef(true)
  const checkInProgressRef = useRef(false)
  const sessionCheckIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
      if (sessionCheckIntervalRef.current) {
        clearInterval(sessionCheckIntervalRef.current)
      }
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

  // Função para carregar dados do usuário
  const loadUser = useCallback(async (userId: string, force = false): Promise<AuthUser | null> => {
    if (!mountedRef.current) return null

    // Se não for forçado, tentar cache primeiro
    if (!force) {
      const cached = loadAuthCache()
      if (cached && cached.id === userId) {
        return cached
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
            saveAuthCache(basicUser)
            return basicUser
          }
          return null
        }
        
        // Em caso de outros erros, usar dados básicos
        const { data: { user: authUser } } = await supabase.auth.getUser()
        if (authUser && mountedRef.current) {
          const basicUser = createBasicUser(authUser)
          saveAuthCache(basicUser)
          return basicUser
        }
        return null
      }

      if (!userData) {
        const { data: { user: authUser } } = await supabase.auth.getUser()
        if (authUser && mountedRef.current) {
          const basicUser = createBasicUser(authUser)
          saveAuthCache(basicUser)
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

      // Salvar no cache
      saveAuthCache(userWithData)
      
      return userWithData
    } catch (error) {
      console.error('Error loading user:', error)
      // Em caso de erro, tentar cache ou dados básicos
      try {
        const cached = loadAuthCache()
        if (cached && cached.id === userId) {
          return cached
        }
        
        const { data: { user: authUser } } = await supabase.auth.getUser()
        if (authUser && mountedRef.current) {
          const basicUser = createBasicUser(authUser)
          saveAuthCache(basicUser)
          return basicUser
        }
      } catch {
        // Ignorar erros
      }
      return null
    }
  }, [createBasicUser])

  // Verificar usuário com sincronização
  const checkUser = useCallback(async (force = false) => {
    // Prevenir múltiplas chamadas simultâneas
    if (checkInProgressRef.current && !force) {
      return
    }

    try {
      checkInProgressRef.current = true
      
      if (!mountedRef.current) return

      // Tentar cache primeiro se não for forçado
      if (!force) {
        const cached = loadAuthCache()
        if (cached) {
          // Verificar se sessão ainda é válida
          const { data: { session } } = await supabase.auth.getSession()
          if (session?.user?.id === cached.id) {
            if (mountedRef.current) {
              setUser(cached)
              setLoading(false)
              if (!initialized) setInitialized(true)
              authEvents.emit('user:loaded', cached)
            }
            return
          }
        }
      }
      
      if (mountedRef.current) {
        setLoading(true)
      }
      
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        if (mountedRef.current) {
          setUser(null)
          setLoading(false)
          setInitialized(true)
          clearAuthCache()
          authEvents.emit('user:cleared')
        }
        return
      }
      
      if (session?.user) {
        const loadedUser = await loadUser(session.user.id, force)
        if (mountedRef.current) {
          setUser(loadedUser)
          setLoading(false)
          setInitialized(true)
          authEvents.emit('user:loaded', loadedUser)
        }
      } else {
        if (mountedRef.current) {
          setUser(null)
          setLoading(false)
          setInitialized(true)
          clearAuthCache()
          authEvents.emit('user:cleared')
        }
      }
    } catch (error) {
      console.error('Check user error:', error)
      if (mountedRef.current) {
        setUser(null)
        setLoading(false)
        setInitialized(true)
        clearAuthCache()
        authEvents.emit('user:cleared')
      }
    } finally {
      checkInProgressRef.current = false
    }
  }, [loadUser, initialized])

  // Inicialização única com cache
  useEffect(() => {
    // Tentar carregar do cache imediatamente para melhor UX
    const cached = loadAuthCache()
    if (cached) {
      setUser(cached)
      setLoading(false)
      setInitialized(true)
    }

    // Verificar sessão real
    checkUser(true)

    // Escutar mudanças na autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        clearAuthCache()
        
        if (event === 'SIGNED_IN' && session) {
          if (mountedRef.current) {
            setLoading(true)
            const loadedUser = await loadUser(session.user.id, true)
            if (mountedRef.current) {
              setUser(loadedUser)
              setLoading(false)
              setInitialized(true)
              authEvents.emit('user:signed_in', loadedUser)
            }
          }
        } else if (event === 'SIGNED_OUT') {
          if (mountedRef.current) {
            setUser(null)
            setLoading(false)
            setInitialized(true)
            clearAuthCache()
            authEvents.emit('user:signed_out')
          }
        } else if (event === 'TOKEN_REFRESHED' && session) {
          // Atualizar usuário se necessário
          if (mountedRef.current && user?.id === session.user.id) {
            const loadedUser = await loadUser(session.user.id, true)
            if (mountedRef.current) {
              setUser(loadedUser)
              authEvents.emit('user:refreshed', loadedUser)
            }
          }
        }
      }
    )

    // Verificação periódica de sessão (a cada 5 minutos)
    sessionCheckIntervalRef.current = setInterval(() => {
      if (mountedRef.current && user) {
        checkUser(false)
      }
    }, 5 * 60 * 1000)

    return () => {
      subscription.unsubscribe()
      if (sessionCheckIntervalRef.current) {
        clearInterval(sessionCheckIntervalRef.current)
      }
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
        clearAuthCache()
        const loadedUser = await loadUser(data.user.id, true)
        if (mountedRef.current) {
          setUser(loadedUser)
          setLoading(false)
          setInitialized(true)
          toast({
            title: "Login realizado com sucesso!",
            description: "Bem-vindo de volta ao TudoAgro.",
          })
          authEvents.emit('user:signed_in', loadedUser)
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
        setInitialized(true)
      }
      clearAuthCache()
      authEvents.emit('user:signed_out')
      
      // Fazer logout do Supabase
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('Logout error:', error)
      }

      // Limpar todos os cookies relacionados
      if (typeof document !== 'undefined') {
        document.cookie.split(";").forEach((c) => {
          const eqPos = c.indexOf("=")
          const name = eqPos > -1 ? c.substr(0, eqPos).trim() : c.trim()
          if (name.startsWith('sb-') || name.includes('supabase')) {
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`
          }
        })
      }
      
      // Redirecionar para home
      router.push('/')
      router.refresh()
      
    } catch (error) {
      console.error('Logout error:', error)
      // Mesmo com erro, limpar estado local e redirecionar
      if (mountedRef.current) {
        setUser(null)
        setLoading(false)
        setInitialized(true)
      }
      clearAuthCache()
      authEvents.emit('user:signed_out')
      router.push('/')
      router.refresh()
    }
  }, [router])

  // Função para trocar senha (requer senha atual)
  const changePassword = useCallback(async (currentPassword: string, newPassword: string) => {
    try {
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
      clearAuthCache()
      const loadedUser = await loadUser(user.id, true)
      if (mountedRef.current) {
        setUser(loadedUser)
        authEvents.emit('user:refreshed', loadedUser)
      }
    }
  }, [user?.id, loadUser])

  const value: AuthContextType = {
    user,
    loading,
    initialized,
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

// Exportar supabase e eventos para uso em outros lugares se necessário
export { supabase, authEvents }
