'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
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
  permissions: string[]
}
import { useToast } from '@/hooks/use-toast'

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  signUp: (email: string, password: string, userData: any) => Promise<{ error?: string }>
  signOut: () => Promise<void>
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ error?: string }>
  resetPassword: (email: string) => Promise<{ error?: string }>
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
  const { toast } = useToast()

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
        } else if (event === 'TOKEN_REFRESHED' && session) {
          await loadUser(session.user.id)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const checkUser = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        setUser(null)
        return
      }
      
      if (session?.user) {
        await loadUser(session.user.id)
      } else {
        setUser(null)
      }
    } catch (error) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const loadUser = async (userId: string) => {
    try {
      // Obter dados do usuário autenticado
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser()
      if (authError || !authUser) {
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
        // Se usuário não existe na tabela, criar perfil básico
        if (error.code === 'PGRST116') {
          await createUserProfile(userId, authUser)
          return
        }
        
        // Em caso de outros erros, usar dados básicos do auth
        setUser(createBasicUser(authUser))
        return
      }

      if (!userData) {
        setUser(createBasicUser(authUser))
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
      // Em caso de erro, tentar usar dados básicos do auth
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser()
        if (authUser) {
          setUser(createBasicUser(authUser))
        }
      } catch {
        setUser(null)
      }
    }
  }

  const createBasicUser = (authUser: any): AuthUser => ({
    id: authUser.id,
    email: authUser.email || '',
    name: authUser.user_metadata?.name || null,
    phone: authUser.user_metadata?.phone || null,
    cpf: authUser.user_metadata?.cpf || null,
    cnpj: authUser.user_metadata?.cnpj || null,
    avatar_url: authUser.user_metadata?.avatar_url || null,
    roles: ['comprador'],
    permissions: []
  })

  const createUserProfile = async (userId: string, authUser: any) => {
    try {
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
        setUser(createBasicUser(authUser))
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
      
      setUser(createBasicUser(authUser))
    } catch {
      setUser(createBasicUser(authUser))
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
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
      const errorMessage = "Erro interno do servidor. Tente novamente."
      toast({
        title: "Erro interno",
        description: errorMessage,
        variant: "destructive",
      })
      return { error: errorMessage }
    }
  }

  const signUp = async (email: string, password: string, userData: any) => {
    try {
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
      const errorMessage = "Erro interno do servidor. Tente novamente."
      toast({
        title: "Erro interno",
        description: errorMessage,
        variant: "destructive",
      })
      return { error: errorMessage }
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso.",
      })
    } catch (error) {
      toast({
        title: "Erro no logout",
        description: "Ocorreu um erro ao fazer logout. Tente novamente.",
        variant: "destructive",
      })
    }
  }

  const changePassword = async (currentPassword: string, newPassword: string) => {
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
        description: "Sua senha foi atualizada com segurança.",
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
  }

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
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
  }

  const getAuthErrorMessage = (error: string): string => {
    const errorMessages: { [key: string]: string } = {
      'Invalid login credentials': 'Email ou senha incorretos. Verifique suas credenciais.',
      'Email not confirmed': 'Email não confirmado. Verifique sua caixa de entrada.',
      'User already registered': 'Este email já está cadastrado. Tente fazer login.',
      'Password should be at least 6 characters': 'A senha deve ter pelo menos 6 caracteres.',
      'Invalid email': 'Email inválido. Verifique o formato do email.',
      'Signup is disabled': 'Cadastro temporariamente desabilitado. Tente novamente mais tarde.',
      'Email rate limit exceeded': 'Muitas tentativas. Aguarde alguns minutos antes de tentar novamente.',
      'Invalid password': 'Senha inválida. Verifique sua senha atual.',
      'Unable to validate email address: invalid format': 'Formato de email inválido.',
      'User not found': 'Usuário não encontrado. Verifique o email informado.',
    }
    
    return errorMessages[error] || 'Ocorreu um erro inesperado. Tente novamente.'
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
    changePassword,
    resetPassword,
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