'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  User, 
  ChevronDown, 
  LogOut, 
  Settings, 
  Shield, 
  Key, 
  UserCircle
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/use-toast'

interface AuthButtonProps {
  className?: string
}

export default function AuthButton({ className }: AuthButtonProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { user, signOut, isAdmin, loading, initialized } = useAuth()
  const { toast } = useToast()
  
  // Não renderizar nada enquanto não inicializou - evita flickering
  // Mas após inicializar, sempre mostrar algo (mesmo que seja botões de login)
  if (!initialized) {
    return (
      <div className={`hidden md:flex items-center space-x-2 ${className}`}>
        <div className="w-20 h-8 bg-gray-200 animate-pulse rounded" />
      </div>
    )
  }

  // Fechar menu do usuário quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isUserMenuOpen) {
        const target = event.target as Element
        if (!target.closest('[data-user-menu]')) {
          setIsUserMenuOpen(false)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isUserMenuOpen])

  // Se usuário está logado, mostrar menu do usuário
  if (user) {
    return (
      <div className={`hidden md:flex items-center space-x-2 relative ${className}`} data-user-menu>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          className="text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"
        >
          <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <ChevronDown className="w-4 h-4 ml-1" />
        </Button>

        {/* User Dropdown Menu */}
        {isUserMenuOpen && (
          <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">{user.name || 'Usuário'}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            
            {/* Opções do usuário */}
            <div className="py-1">
              <Link 
                href="/perfil" 
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => setIsUserMenuOpen(false)}
              >
                <UserCircle className="w-4 h-4 mr-3" />
                Meu Perfil
              </Link>
              
              <Link 
                href="/perfil/senha" 
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => setIsUserMenuOpen(false)}
              >
                <Key className="w-4 h-4 mr-3" />
                Trocar Senha
              </Link>
              
              <Link 
                href="/perfil/configuracoes" 
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => setIsUserMenuOpen(false)}
              >
                <Settings className="w-4 h-4 mr-3" />
                Configurações
              </Link>
            </div>
            
            {/* Separador */}
            <div className="border-t border-gray-100 my-1"></div>
            
            {/* Painel administrativo */}
            {isAdmin() && (
              <Link 
                href="/dashboard/visao-geral" 
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => setIsUserMenuOpen(false)}
              >
                <Shield className="w-4 h-4 mr-3" />
                Painel
              </Link>
            )}
            
            {/* Logout */}
            <button
              onClick={async () => {
                try {
                  await signOut()
                  toast({
                    title: "Logout realizado",
                    description: "Você foi desconectado com sucesso.",
                  })
                } catch (error) {
                  console.error('Logout error:', error)
                  toast({
                    title: "Erro no logout",
                    description: "Ocorreu um erro ao fazer logout. Tente novamente.",
                    variant: "destructive",
                  })
                }
                setIsUserMenuOpen(false)
              }}
              className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Sair
            </button>
          </div>
        )}
      </div>
    )
  }

  // Se usuário não está logado, mostrar botões de login/cadastro
  return (
    <div className={`hidden md:flex items-center space-x-2 ${className}`}>
      <Link href="/login">
        <Button variant="ghost" size="sm" className="text-gray-700 hover:text-emerald-600">
          Entrar
        </Button>
      </Link>
      <Link href="/cadastro">
        <Button 
          size="sm" 
          className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Cadastrar
        </Button>
      </Link>
    </div>
  )
}