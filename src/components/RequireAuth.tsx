'use client'

import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { LogIn, UserPlus } from 'lucide-react'
import Link from 'next/link'

interface RequireAuthProps {
  children: ReactNode
  action?: string
  redirectTo?: string
  showDialog?: boolean
}

export default function RequireAuth({ 
  children, 
  action = 'realizar esta ação',
  redirectTo,
  showDialog = true 
}: RequireAuthProps) {
  const { user, initialized } = useAuth()
  const router = useRouter()

  if (!initialized) {
    return null
  }

  if (user) {
    return <>{children}</>
  }

  useEffect(() => {
    if (!showDialog && initialized && !user) {
      const loginUrl = redirectTo ? `/login?redirect=${encodeURIComponent(redirectTo)}` : '/login'
      router.push(loginUrl)
    }
  }, [showDialog, initialized, user, redirectTo, router])

  if (!showDialog) {
    return null
  }

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full">
            <LogIn className="w-6 h-6 text-primary" />
          </div>
          <DialogTitle className="text-center">Login Necessário</DialogTitle>
          <DialogDescription className="text-center">
            Você precisa estar logado para {action}.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
          <Link href={redirectTo ? `/login?redirect=${encodeURIComponent(redirectTo)}` : '/login'} className="w-full sm:w-auto">
            <Button className="w-full bg-primary hover:bg-[#2E7A5A]">
              <LogIn className="w-4 h-4 mr-2" />
              Fazer Login
            </Button>
          </Link>
          <Link href="/cadastro" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full">
              <UserPlus className="w-4 h-4 mr-2" />
              Criar Conta
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function useRequireAuth() {
  const { user, initialized } = useAuth()
  const router = useRouter()

  const requireAuth = (action: string, redirectTo?: string) => {
    if (!initialized) return false
    if (!user) {
      const loginUrl = redirectTo ? `/login?redirect=${encodeURIComponent(redirectTo)}` : '/login'
      router.push(loginUrl)
      return false
    }
    return true
  }

  return { requireAuth, isAuthenticated: !!user && initialized }
}
