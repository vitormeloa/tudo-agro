'use client'

import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User, Mail, Phone, FileText, Building2, Edit, Lock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ProtectedRoute from '@/components/ProtectedRoute'

function PerfilContent() {
  const { user } = useAuth()
  const router = useRouter()

  if (!user) {
    return null
  }

  const formatCPF = (cpf: string | null) => {
    if (!cpf) return 'Não informado'
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }

  const formatCNPJ = (cnpj: string | null) => {
    if (!cnpj) return 'Não informado'
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
  }

  const formatPhone = (phone: string | null) => {
    if (!phone) return 'Não informado'
    return phone
  }

  const getUserInitials = () => {
    if (user.name) {
      const names = user.name.split(' ')
      if (names.length >= 2) {
        return `${names[0][0]}${names[1][0]}`.toUpperCase()
      }
      return names[0][0].toUpperCase()
    }
    return user.email[0].toUpperCase()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {}
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <h1 className="text-3xl font-bold">Meu Perfil</h1>
        <p className="text-muted-foreground">Visualize e gerencie suas informações pessoais</p>
      </div>

      <div className="grid gap-6">
        {}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.avatar_url || undefined} alt={user.name || 'Usuário'} />
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-primary to-primary/70 text-white">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">{user.name || 'Usuário'}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <Mail className="h-4 w-4" />
                    {user.email}
                  </CardDescription>
                  {user.roles && user.roles.length > 0 && (
                    <div className="flex gap-2 mt-2">
                      {user.roles.map((role) => (
                        <Badge key={role} variant="secondary">
                          {role === 'admin' ? 'Administrador' : role === 'vendedor' ? 'Vendedor' : 'Comprador'}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <Link href="/perfil/editar">
                <Button>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar Perfil
                </Button>
              </Link>
            </div>
          </CardHeader>
        </Card>

        {}
        <Card>
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
            <CardDescription>Seus dados cadastrados na plataforma</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <User className="h-4 w-4" />
                  Nome Completo
                </div>
                <p className="text-base font-medium">{user.name || 'Não informado'}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  E-mail
                </div>
                <p className="text-base font-medium">{user.email}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  Telefone
                </div>
                <p className="text-base font-medium">{formatPhone(user.phone)}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  CPF
                </div>
                <p className="text-base font-medium">{formatCPF(user.cpf)}</p>
              </div>

              {user.cnpj && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Building2 className="h-4 w-4" />
                    CNPJ
                  </div>
                  <p className="text-base font-medium">{formatCNPJ(user.cnpj)}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {}
        <Card>
          <CardHeader>
            <CardTitle>Segurança</CardTitle>
            <CardDescription>Gerencie a segurança da sua conta</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-medium">
                    <Lock className="h-4 w-4" />
                    Senha
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Altere sua senha para manter sua conta segura
                  </p>
                </div>
                <Link href="/perfil/senha">
                  <Button variant="outline">
                    Alterar Senha
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function PerfilPage() {
  return (
    <ProtectedRoute>
      <PerfilContent />
    </ProtectedRoute>
  )
}
