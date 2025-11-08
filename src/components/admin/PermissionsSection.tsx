'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { 
  Shield, Plus, Edit, Trash2, Users, Key, 
  Save, X, Check, AlertTriangle, Search,
  UserPlus, UserMinus, Settings, Eye, EyeOff,
  Calendar, FileText, User, Mail, Phone
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useAdminPermissions } from '@/hooks/useAdminPermissions'
import { PERMISSIONS, RESOURCE_LABELS, ACTION_LABELS, Permission } from '@/lib/permissions'

interface Role {
  id: string
  name: string
  description: string
  permissions: Permission[]
  created_at: string
  updated_at: string
}

interface User {
  id: string
  name: string
  email: string
  roles: string[]
}

export default function PermissionsSection() {
  const { toast } = useToast()
  const { canExecuteAction, canShowButton } = useAdminPermissions()
  const [roles, setRoles] = useState<Role[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false)
  const [isUserRoleDialogOpen, setIsUserRoleDialogOpen] = useState(false)
  const [editingRole, setEditingRole] = useState<Role | null>(null)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [selectedUserRoles, setSelectedUserRoles] = useState<string[]>([])

  // Estados do formulário de role
  const [roleForm, setRoleForm] = useState({
    name: '',
    description: '',
    permissions: [] as Permission[]
  })

  useEffect(() => {
    loadRoles()
    loadUsers()
  }, [])

  const loadRoles = async () => {
    try {
      const response = await fetch('/api/admin/roles')
      const data = await response.json()
      
      if (response.ok) {
        setRoles(data.roles || [])
      } else {
        toast({
          title: "Erro",
          description: data.error || "Erro ao carregar funções",
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao carregar funções",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const loadUsers = async () => {
    try {
      const response = await fetch('/api/admin/users')
      const data = await response.json()
      
      if (response.ok) {
        console.log('Users loaded:', data.users)
        setUsers(data.users || [])
      } else {
        console.error('Error loading users:', data.error)
      }
    } catch (error) {
      console.error('Error loading users:', error)
    }
  }

  const handleCreateRole = async () => {
    if (!roleForm.name.trim()) {
      toast({
        title: "Erro",
        description: "Nome da função é obrigatório",
        variant: "destructive"
      })
      return
    }

    try {
      const response = await fetch('/api/admin/roles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(roleForm)
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Sucesso",
          description: "Função criada com sucesso"
        })
        setRoleForm({ name: '', description: '', permissions: [] })
        setIsRoleDialogOpen(false)
        loadRoles()
      } else {
        toast({
          title: "Erro",
          description: data.error || "Erro ao criar função",
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao criar função",
        variant: "destructive"
      })
    }
  }

  const handleUpdateRole = async () => {
    if (!editingRole || !roleForm.name.trim()) {
      toast({
        title: "Erro",
        description: "Nome da função é obrigatório",
        variant: "destructive"
      })
      return
    }

    try {
      const response = await fetch(`/api/admin/roles/${editingRole.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(roleForm)
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Sucesso",
          description: "Função atualizada com sucesso"
        })
        setEditingRole(null)
        setRoleForm({ name: '', description: '', permissions: [] })
        setIsRoleDialogOpen(false)
        loadRoles()
      } else {
        toast({
          title: "Erro",
          description: data.error || "Erro ao atualizar função",
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao atualizar função",
        variant: "destructive"
      })
    }
  }

  const handleDeleteRole = async (roleId: string) => {
    try {
      const response = await fetch(`/api/admin/roles/${roleId}`, {
        method: 'DELETE'
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Sucesso",
          description: "Função excluída com sucesso"
        })
        loadRoles()
      } else {
        toast({
          title: "Erro",
          description: data.error || "Erro ao excluir função",
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao excluir função",
        variant: "destructive"
      })
    }
  }

  const handleAssignUserRoles = async () => {
    if (!selectedUser) return

    try {
      // Remover todas as roles atuais do usuário
      for (const roleId of selectedUserRoles) {
        await fetch('/api/admin/user-roles', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: selectedUser.id,
            role_id: roleId
          })
        })
      }

      // Adicionar as novas roles
      for (const roleId of selectedUserRoles) {
        await fetch('/api/admin/user-roles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: selectedUser.id,
            role_id: roleId
          })
        })
      }

      toast({
        title: "Sucesso",
        description: "Funções do usuário atualizadas com sucesso"
      })
      setIsUserRoleDialogOpen(false)
      loadUsers()
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao atualizar funções do usuário",
        variant: "destructive"
      })
    }
  }

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const openRoleDialog = (role?: Role) => {
    if (role) {
      setEditingRole(role)
      setRoleForm({
        name: role.name,
        description: role.description,
        permissions: role.permissions
      })
    } else {
      setEditingRole(null)
      setRoleForm({ name: '', description: '', permissions: [] })
    }
    setIsRoleDialogOpen(true)
  }

  const openUserRoleDialog = (user: User) => {
    setSelectedUser(user)
    setSelectedUserRoles(user.roles)
    setIsUserRoleDialogOpen(true)
  }

  const togglePermission = (permission: Permission) => {
    setRoleForm(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }))
  }

  const toggleAllPermissions = (resource: keyof typeof PERMISSIONS) => {
    const resourcePermissions = PERMISSIONS[resource].map(action => `${resource}:${action}` as Permission)
    const hasAllPermissions = resourcePermissions.every(p => roleForm.permissions.includes(p))
    
    if (hasAllPermissions) {
      // Remover todas as permissões do recurso
      setRoleForm(prev => ({
        ...prev,
        permissions: prev.permissions.filter(p => !resourcePermissions.includes(p))
      }))
    } else {
      // Adicionar todas as permissões do recurso
      setRoleForm(prev => ({
        ...prev,
        permissions: [...new Set([...prev.permissions, ...resourcePermissions])]
      }))
    }
  }

  if (loading) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando funções...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header com Filtros */}
      <Card>
        <CardHeader className="p-3 sm:p-6">
          <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <span className="text-base sm:text-lg font-semibold">Gerenciamento de Funções</span>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
              <span>Total: {roles.length}</span>
              <span>Usuários: {users.length}</span>
              <span>Permissões: {Object.values(PERMISSIONS).flat().length}</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {/* Busca */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-4 h-4" />
                <Input
                  placeholder="Buscar por nome ou descrição..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-sm"
                />
              </div>
            </div>
            
            {/* Botão Nova Função */}
            {canShowButton('create-role') && (
              <Button
                onClick={() => openRoleDialog()}
                className="bg-primary hover:bg-[#163B20] text-sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nova Função
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Lista de Funções */}
      <div className="grid gap-3 sm:gap-4">
        {filteredRoles.map((role) => (
          <Card key={role.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-3 sm:p-6">
              <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
                <div className="flex-1 w-full">
                  <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                    {/* Avatar */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base flex-shrink-0">
                      <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    
                    {/* Informações Principais */}
                    <div className="flex-1 w-full min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                        <h3 className="text-base sm:text-lg font-semibold text-[#101828] break-words">{role.name}</h3>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="secondary" className="bg-[#F0F9FF] text-primary">
                            {role.permissions.length} permissões
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                        <p className="break-words">{role.description}</p>
                      </div>

                      {/* Permissões */}
                      <div className="mb-3 sm:mb-4">
                        <p className="text-xs sm:text-sm font-medium text-[#101828] mb-2">Permissões:</p>
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          {role.permissions.slice(0, 8).map((permission) => (
                            <Badge key={permission} variant="outline" className="text-xs">
                              {permission}
                            </Badge>
                          ))}
                          {role.permissions.length > 8 && (
                            <Badge variant="outline" className="text-xs">
                              +{role.permissions.length - 8} mais
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Datas */}
                      <div className="text-xs sm:text-sm text-gray-600 space-y-1">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span className="truncate">Criado: {new Date(role.created_at).toLocaleDateString('pt-BR')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span className="truncate">Atualizado: {new Date(role.updated_at).toLocaleDateString('pt-BR')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Estatísticas */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-4 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                    <div className="text-center">
                      <p className="text-lg sm:text-2xl font-bold text-primary">{role.permissions.length}</p>
                      <p className="text-xs text-gray-600">Permissões</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg sm:text-2xl font-bold text-primary">
                        {(() => {
                          const userCount = users.filter(user => {
                            const hasRole = user.roles.includes(role.name)
                            console.log(`User ${user.name} (${user.email}) has roles:`, user.roles, 'Looking for:', role.name, 'Has role:', hasRole)
                            return hasRole
                          }).length
                          console.log(`Role ${role.name} has ${userCount} users`)
                          return userCount
                        })()}
                      </p>
                      <p className="text-xs text-gray-600">Usuários</p>
                    </div>
                  </div>
                </div>
                
                {/* Ações */}
                <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
                  {canShowButton('edit-role') && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openRoleDialog(role)}
                      className="text-sm"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Editar
                    </Button>
                  )}
                  {canShowButton('delete-role') && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 text-sm">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Excluir
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Excluir Função</AlertDialogTitle>
                          <AlertDialogDescription>
                            Tem certeza que deseja excluir a função "{role.name}"? Esta ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteRole(role.id)}
                            className="bg-red-600 hover:bg-[#A03730]"
                          >
                            Excluir
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Role Dialog */}
      <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingRole ? 'Editar Função' : 'Nova Função'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nome da Função</Label>
                <Input
                  id="name"
                  value={roleForm.name}
                  onChange={(e) => setRoleForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ex: vendedor_premium"
                />
              </div>
              <div>
                <Label htmlFor="description">Descrição</Label>
                <Input
                  id="description"
                  value={roleForm.description}
                  onChange={(e) => setRoleForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Ex: Vendedor com permissões premium"
                />
              </div>
            </div>

            <div>
              <Label>Permissões</Label>
              <div className="mt-4 space-y-4">
                {Object.entries(PERMISSIONS).map(([resource, actions]) => (
                  <Card key={resource} className="border border-[#E5E7EB]">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-primary">
                          {RESOURCE_LABELS[resource as keyof typeof RESOURCE_LABELS]}
                        </h4>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleAllPermissions(resource as keyof typeof PERMISSIONS)}
                        >
                          {PERMISSIONS[resource as keyof typeof PERMISSIONS].every(action => 
                            roleForm.permissions.includes(`${resource}:${action}` as Permission)
                          ) ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          {PERMISSIONS[resource as keyof typeof PERMISSIONS].every(action => 
                            roleForm.permissions.includes(`${resource}:${action}` as Permission)
                          ) ? 'Desmarcar Todas' : 'Marcar Todas'}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {actions.map((action) => {
                          const permission = `${resource}:${action}` as Permission
                          return (
                            <div key={permission} className="flex items-center space-x-2">
                              <Checkbox
                                id={permission}
                                checked={roleForm.permissions.includes(permission)}
                                onCheckedChange={() => togglePermission(permission)}
                              />
                              <Label htmlFor={permission} className="text-sm">
                                {ACTION_LABELS[action as keyof typeof ACTION_LABELS]}
                              </Label>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsRoleDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                onClick={editingRole ? handleUpdateRole : handleCreateRole}
                className="bg-primary hover:bg-[#163B20]"
              >
                <Save className="h-4 w-4 mr-2" />
                {editingRole ? 'Atualizar' : 'Criar'} Função
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* User Roles Dialog */}
      <Dialog open={isUserRoleDialogOpen} onOpenChange={setIsUserRoleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gerenciar Funções do Usuário</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label>Usuário</Label>
              <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                <p className="font-medium">{selectedUser?.name}</p>
                <p className="text-sm text-gray-600">{selectedUser?.email}</p>
              </div>
            </div>

            <div>
              <Label>Funções</Label>
              <div className="mt-2 space-y-2">
                {roles.map((role) => (
                  <div key={role.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={role.id}
                      checked={selectedUserRoles.includes(role.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedUserRoles(prev => [...prev, role.id])
                        } else {
                          setSelectedUserRoles(prev => prev.filter(id => id !== role.id))
                        }
                      }}
                    />
                    <Label htmlFor={role.id} className="text-sm">
                      {role.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsUserRoleDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleAssignUserRoles}
                className="bg-primary hover:bg-[#163B20]"
              >
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}