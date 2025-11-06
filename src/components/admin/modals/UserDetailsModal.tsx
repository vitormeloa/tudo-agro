'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  X, User, Mail, Phone, MapPin, Calendar, Activity, 
  CheckCircle, AlertTriangle, Edit, Save, Ban, Shield,
  FileText, Gavel, Heart, Crown, DollarSign
} from 'lucide-react'

interface UserDetailsModalProps {
  user: {
    id: number
    name: string
    email: string
    phone: string
    city: string
    state: string
    type: string
    status: string
    origin: string
    joinDate: string
    lastActivity: string
    adsCount: number
    auctionsCount: number
    favoritesCount: number
    purchasesCount: number
    isVerified: boolean
  }
  isOpen: boolean
  onClose: () => void
}

export default function UserDetailsModal({ user, isOpen, onClose }: UserDetailsModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState(user)

  if (!isOpen) return null

  const handleSave = () => {
    // Aqui você implementaria a lógica de salvamento
    console.log('Salvando usuário:', editedUser)
    setIsEditing(false)
  }

  const handleStatusChange = (newStatus: string) => {
    setEditedUser({ ...editedUser, status: newStatus })
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      ativo: { color: 'bg-emerald-100 text-emerald-800', label: 'Ativo' },
      inativo: { color: 'bg-gray-100 text-gray-800', label: 'Inativo' },
      pendente: { color: 'bg-orange-100 text-orange-800', label: 'Pendente' },
      bloqueado: { color: 'bg-red-100 text-red-800', label: 'Bloqueado' }
    }
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.ativo
    return <Badge className={config.color}>{config.label}</Badge>
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <User className="w-6 h-6 text-emerald-800" />
            <h2 className="text-xl font-bold text-[#101828]">Detalhes do Usuário</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Informações Básicas */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-emerald-800" />
                  Informações Básicas
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {isEditing ? 'Cancelar' : 'Editar'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    value={isEditing ? editedUser.name : user.name}
                    onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={isEditing ? editedUser.email : user.email}
                    onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={isEditing ? editedUser.phone : user.phone}
                    onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Localização</Label>
                  <Input
                    id="location"
                    value={isEditing ? `${editedUser.city}, ${editedUser.state}` : `${user.city}, ${user.state}`}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status e Verificação */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-800" />
                Status e Verificação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Status:</span>
                  {getStatusBadge(editedUser.status)}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Verificado:</span>
                  {editedUser.isVerified ? (
                    <CheckCircle className="w-5 h-5 text-[#3D9970]" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Tipo:</span>
                  <Badge variant="outline">{editedUser.type}</Badge>
                </div>
              </div>
              
              {isEditing && (
                <div className="mt-4 flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleStatusChange('ativo')}
                  >
                    Ativar
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleStatusChange('bloqueado')}
                    className="text-red-600"
                  >
                    <Ban className="w-4 h-4 mr-1" />
                    Bloquear
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Estatísticas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-800" />
                Estatísticas de Atividade
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-[#F7F6F2] rounded-lg">
                  <FileText className="w-8 h-8 text-emerald-800 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-emerald-800">{user.adsCount}</p>
                  <p className="text-sm text-gray-600">Anúncios</p>
                </div>
                <div className="text-center p-4 bg-[#F7F6F2] rounded-lg">
                  <Gavel className="w-8 h-8 text-emerald-800 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-emerald-800">{user.auctionsCount}</p>
                  <p className="text-sm text-gray-600">Leilões</p>
                </div>
                <div className="text-center p-4 bg-[#F7F6F2] rounded-lg">
                  <Heart className="w-8 h-8 text-emerald-800 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-emerald-800">{user.favoritesCount}</p>
                  <p className="text-sm text-gray-600">Favoritos</p>
                </div>
                <div className="text-center p-4 bg-[#F7F6F2] rounded-lg">
                  <DollarSign className="w-8 h-8 text-emerald-800 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-emerald-800">{user.purchasesCount}</p>
                  <p className="text-sm text-gray-600">Compras</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informações de Cadastro */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-800" />
                Informações de Cadastro
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-600">Cadastrado em:</span>
                  <span className="font-medium">{new Date(user.joinDate).toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-600">Última atividade:</span>
                  <span className="font-medium">{new Date(user.lastActivity).toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-600">Origem:</span>
                  <Badge variant="outline">{user.origin}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ações */}
          {isEditing && (
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Salvar Alterações
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}