'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { usePermissions } from '@/hooks/usePermissions'
import { useAdminPermissions } from '@/hooks/useAdminPermissions'
import PermissionGuard, { PermissionShow, PermissionHide } from '@/components/PermissionGuard'
import { 
  Users, 
  Shield, 
  Package, 
  Gavel, 
  CreditCard, 
  MessageSquare, 
  Star,
  Settings
} from 'lucide-react'

export default function PermissionExample() {
  const {
    hasPermission,
    hasRole,
    canManageUsers,
    canManageProducts,
    canManageAuctions,
    canViewTransactions,
    canManageMessages,
    canManageReviews
  } = usePermissions()
  
  const { isAdmin, isSeller, isBuyer } = useAdminPermissions()

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold text-emerald-800">
        Exemplo de Sistema de Permissões
      </h1>

      {/* Informações do usuário atual */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Informações do Usuário
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className={`p-3 rounded-lg ${isAdmin() ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}>
                <Shield className="h-6 w-6 mx-auto mb-2" />
                <div className="font-medium">Admin</div>
                <div className="text-sm">{isAdmin() ? 'Sim' : 'Não'}</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className={`p-3 rounded-lg ${isSeller() ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-600'}`}>
                <Package className="h-6 w-6 mx-auto mb-2" />
                <div className="font-medium">Vendedor</div>
                <div className="text-sm">{isSeller() ? 'Sim' : 'Não'}</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className={`p-3 rounded-lg ${isBuyer() ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-600'}`}>
                <CreditCard className="h-6 w-6 mx-auto mb-2" />
                <div className="font-medium">Comprador</div>
                <div className="text-sm">{isBuyer() ? 'Sim' : 'Não'}</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="p-3 rounded-lg bg-gray-100 text-gray-600">
                <Users className="h-6 w-6 mx-auto mb-2" />
                <div className="font-medium">Permissões</div>
                <div className="text-sm">
                  {hasPermission('user:read') ? 'Múltiplas' : 'Básicas'}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exemplos de uso do PermissionGuard */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Card visível apenas para admins */}
        <PermissionGuard
          role="admin"
          fallback={
            <Card className="opacity-50">
              <CardHeader>
                <CardTitle className="text-gray-500">Gerenciar Usuários</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Acesso restrito a administradores</p>
              </CardContent>
            </Card>
          }
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-600">
                <Users className="h-5 w-5" />
                Gerenciar Usuários
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Você tem acesso completo à gestão de usuários.
              </p>
              <Button className="bg-[#1E4D2B] hover:bg-[#163B20]">
                Acessar Painel
              </Button>
            </CardContent>
          </Card>
        </PermissionGuard>

        {/* Card visível apenas para vendedores */}
        <PermissionGuard
          role="vendedor"
          fallback={
            <Card className="opacity-50">
              <CardHeader>
                <CardTitle className="text-gray-500">Gerenciar Produtos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Acesso restrito a vendedores</p>
              </CardContent>
            </Card>
          }
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-600">
                <Package className="h-5 w-5" />
                Gerenciar Produtos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Gerencie seus produtos e anúncios.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Meus Produtos
              </Button>
            </CardContent>
          </Card>
        </PermissionGuard>
      </div>

      {/* Exemplos de uso do PermissionShow */}
      <Card>
        <CardHeader>
          <CardTitle>Funcionalidades Disponíveis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <PermissionShow permission="user:read">
              <div className="p-4 border rounded-lg bg-emerald-50">
                <Users className="h-6 w-6 text-emerald-600 mb-2" />
                <div className="font-medium text-emerald-800">Ver Usuários</div>
                <div className="text-sm text-emerald-600">Você pode visualizar usuários</div>
              </div>
            </PermissionShow>

            <PermissionShow permission="product:write">
              <div className="p-4 border rounded-lg bg-blue-50">
                <Package className="h-6 w-6 text-emerald-600 mb-2" />
                <div className="font-medium text-emerald-800">Criar Produtos</div>
                <div className="text-sm text-emerald-600">Você pode criar produtos</div>
              </div>
            </PermissionShow>

            <PermissionShow permission="auction:read">
              <div className="p-4 border rounded-lg bg-purple-50">
                <Gavel className="h-6 w-6 text-emerald-600 mb-2" />
                <div className="font-medium text-emerald-800">Ver Leilões</div>
                <div className="text-sm text-emerald-600">Você pode visualizar leilões</div>
              </div>
            </PermissionShow>

            <PermissionShow permission="transaction:read">
              <div className="p-4 border rounded-lg bg-yellow-50">
                <CreditCard className="h-6 w-6 text-yellow-600 mb-2" />
                <div className="font-medium text-yellow-800">Ver Transações</div>
                <div className="text-sm text-yellow-600">Você pode visualizar transações</div>
              </div>
            </PermissionShow>

            <PermissionShow permission="message:write">
              <div className="p-4 border rounded-lg bg-indigo-50">
                <MessageSquare className="h-6 w-6 text-emerald-600 mb-2" />
                <div className="font-medium text-emerald-800">Enviar Mensagens</div>
                <div className="text-sm text-emerald-600">Você pode enviar mensagens</div>
              </div>
            </PermissionShow>

            <PermissionShow permission="review:write">
              <div className="p-4 border rounded-lg bg-pink-50">
                <Star className="h-6 w-6 text-emerald-600 mb-2" />
                <div className="font-medium text-emerald-800">Avaliar Produtos</div>
                <div className="text-sm text-emerald-600">Você pode avaliar produtos</div>
              </div>
            </PermissionShow>
          </div>
        </CardContent>
      </Card>

      {/* Exemplos de botões condicionais */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Disponíveis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <PermissionShow permission="user:write">
              <Button variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Gerenciar Usuários
              </Button>
            </PermissionShow>

            <PermissionShow permission="product:write">
              <Button variant="outline">
                <Package className="h-4 w-4 mr-2" />
                Criar Produto
              </Button>
            </PermissionShow>

            <PermissionShow permission="auction:write">
              <Button variant="outline">
                <Gavel className="h-4 w-4 mr-2" />
                Criar Leilão
              </Button>
            </PermissionShow>

            <PermissionShow permission="role:write">
              <Button variant="outline">
                <Shield className="h-4 w-4 mr-2" />
                Gerenciar Roles
              </Button>
            </PermissionShow>

            <PermissionShow role="admin">
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Configurações
              </Button>
            </PermissionShow>
          </div>
        </CardContent>
      </Card>

      {/* Exemplo de uso do PermissionHide */}
      <Card>
        <CardHeader>
          <CardTitle>Mensagens de Aviso</CardTitle>
        </CardHeader>
        <CardContent>
          <PermissionHide role="admin">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-2 text-yellow-800">
                <Shield className="h-5 w-5" />
                <div className="font-medium">Acesso Limitado</div>
              </div>
              <p className="text-sm text-yellow-700 mt-1">
                Algumas funcionalidades podem não estar disponíveis para seu tipo de conta.
              </p>
            </div>
          </PermissionHide>

          <PermissionShow role="admin">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
              <div className="flex items-center gap-2 text-emerald-800">
                <Shield className="h-5 w-5" />
                <div className="font-medium">Acesso Completo</div>
              </div>
              <p className="text-sm text-emerald-700 mt-1">
                Você tem acesso completo a todas as funcionalidades do sistema.
              </p>
            </div>
          </PermissionShow>
        </CardContent>
      </Card>
    </div>
  )
}