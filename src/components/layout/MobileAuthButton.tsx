'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  User, 
  LogOut, 
  Settings, 
  Shield, 
  Key, 
  UserCircle,
  ShoppingCart
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/use-toast'
import { useCart } from '@/contexts/CartContext'

interface MobileAuthButtonProps {
  onMenuClose: () => void
  className?: string
}

export default function MobileAuthButton({ onMenuClose, className }: MobileAuthButtonProps) {
  const { user, signOut, isAdmin } = useAuth()
  const { toast } = useToast()
  const { getTotalItems } = useCart()
  const cartItemsCount = getTotalItems()

  // Se usuário está logado, mostrar opções do usuário
  if (user) {
    return (
      <div className={`pt-4 border-t border-gray-200 ${className}`}>
        <div className="space-y-2">
          <div className="px-3 py-2">
            <p className="text-sm font-medium text-[#101828]">{user.name || 'Usuário'}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
          
          {/* Opções do usuário mobile */}
          <div className="space-y-1">
            <Link href="/dashboard/carrinho" className="block" onClick={onMenuClose}>
              <Button variant="outline" className="w-full justify-start relative">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Carrinho
                {cartItemsCount > 0 && (
                  <span className="ml-auto bg-emerald-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemsCount > 99 ? '99+' : cartItemsCount}
                  </span>
                )}
              </Button>
            </Link>
            
            <Link href="/dashboard/minha-conta" className="block" onClick={onMenuClose}>
              <Button variant="outline" className="w-full justify-start">
                <UserCircle className="w-4 h-4 mr-2" />
                Minha Conta
              </Button>
            </Link>
            
            <Link href="/dashboard/trocar-senha" className="block" onClick={onMenuClose}>
              <Button variant="outline" className="w-full justify-start">
                <Key className="w-4 h-4 mr-2" />
                Trocar Senha
              </Button>
            </Link>
            
            <Link href="/dashboard/configuracoes" className="block" onClick={onMenuClose}>
              <Button variant="outline" className="w-full justify-start">
                <Settings className="w-4 h-4 mr-2" />
                Configurações
              </Button>
            </Link>
            
            {isAdmin() && (
              <Link href="/dashboard" className="block" onClick={onMenuClose}>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="w-4 h-4 mr-2" />
                  Painel
                </Button>
              </Link>
            )}
          </div>
          
          <Button 
            variant="outline" 
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={async () => {
              onMenuClose()
              try {
                // signOut já faz todo o processo de limpeza e redirecionamento
                await signOut()
              } catch (error) {
                console.error('Logout error:', error)
                // Mesmo com erro, tentar limpar e redirecionar
                try {
                  localStorage.clear()
                  sessionStorage.clear()
                } catch (e) {
                  // Ignorar erros de limpeza
                }
                window.location.href = '/login'
              }
            }}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>
    )
  }

  // Se usuário não está logado, mostrar botões de login/cadastro
  return (
    <div className={`pt-4 border-t border-gray-200 ${className}`}>
      <div className="space-y-2">
        <Link href="/login" className="block" onClick={onMenuClose}>
          <Button variant="outline" className="w-full justify-start">
            <User className="w-4 h-4 mr-2" />
            Entrar
          </Button>
        </Link>
        <Link href="/cadastro" className="block" onClick={onMenuClose}>
          <Button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-600 hover:from-emerald-700 hover:to-emerald-700">
            Cadastrar
          </Button>
        </Link>
      </div>
    </div>
  )
}