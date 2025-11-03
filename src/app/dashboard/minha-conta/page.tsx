'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import ProtectedRoute from '@/components/ProtectedRoute'
import AdminLayout from '@/components/admin/AdminLayout'
import { useAuth } from '@/hooks/useAuth'
import { 
  User, 
  MapPin, 
  Shield, 
  FileText, 
  Bell, 
  Settings,
  Edit,
  Save,
  Camera,
  Key,
  Lock,
  Trash2,
  LogOut,
  CheckCircle,
  XCircle,
  Upload,
  Plus,
  Eye,
  EyeOff,
  Clock
} from 'lucide-react'

export default function MinhaContaPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isEditingAddress, setIsEditingAddress] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [show2FADialog, setShow2FADialog] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  
  // Estados do formulário
  const [profileData, setProfileData] = useState({
    name: user?.name || 'João Silva',
    email: user?.email || 'joao@example.com',
    phone: '(62) 99999-9999',
    birthDate: '1990-01-15',
    gender: 'masculino',
    cpf: '123.456.789-00'
  })

  const [addressData, setAddressData] = useState({
    street: 'Rua das Flores',
    number: '123',
    complement: 'Apto 101',
    cep: '74000-000',
    neighborhood: 'Centro',
    city: 'Goiânia',
    state: 'GO'
  })

  const [preferences, setPreferences] = useState({
    animalsCorte: true,
    animalsLeite: false,
    genetica: true,
    produtosFisicos: true,
    freteGratis: false
  })

  const [notifications, setNotifications] = useState({
    pedidos: true,
    mensagens: true,
    leiloes: true,
    produtos: false,
    treinamentos: true
  })

  const [twoFAEnabled, setTwoFAEnabled] = useState(false)

  const handleSaveProfile = () => {
    setIsEditingProfile(false)
    // Aqui você salvaria os dados no backend
  }

  const handleSaveAddress = () => {
    setIsEditingAddress(false)
    // Aqui você salvaria o endereço no backend
  }

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="min-h-screen bg-gray-50 p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Minha Conta</h1>
            <p className="text-gray-600">Gerencie suas informações pessoais e preferências</p>
          </div>

          <Tabs defaultValue="dados" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5">
              <TabsTrigger value="dados">Meus Dados</TabsTrigger>
              <TabsTrigger value="enderecos">Endereços</TabsTrigger>
              <TabsTrigger value="seguranca">Segurança</TabsTrigger>
              <TabsTrigger value="documentos">Documentos</TabsTrigger>
              <TabsTrigger value="preferencias">Preferências</TabsTrigger>
            </TabsList>

            {/* Aba: Meus Dados */}
            <TabsContent value="dados">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Meus Dados
                    </CardTitle>
                    {!isEditingProfile ? (
                      <Button variant="outline" onClick={() => setIsEditingProfile(true)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Editar Dados
                      </Button>
                    ) : (
                      <Button onClick={handleSaveProfile} className="bg-emerald-600 hover:bg-emerald-700">
                        <Save className="w-4 h-4 mr-2" />
                        Salvar Alterações
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Foto de Perfil */}
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 rounded-full bg-emerald-600 flex items-center justify-center text-white text-2xl font-bold">
                      {profileData.name.charAt(0).toUpperCase()}
                    </div>
                    {isEditingProfile && (
                      <Button variant="outline">
                        <Camera className="w-4 h-4 mr-2" />
                        Alterar Foto
                      </Button>
                    )}
                  </div>

                  {/* Campos do Formulário */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        disabled={!isEditingProfile}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cpf">CPF</Label>
                      <Input
                        id="cpf"
                        value={profileData.cpf}
                        disabled
                        className="bg-gray-100"
                      />
                      <p className="text-xs text-gray-500 mt-1">CPF não pode ser alterado após verificação</p>
                    </div>
                    <div>
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        disabled={!isEditingProfile}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Celular</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        disabled={!isEditingProfile}
                      />
                    </div>
                    <div>
                      <Label htmlFor="birthDate">Data de Nascimento</Label>
                      <Input
                        id="birthDate"
                        type="date"
                        value={profileData.birthDate}
                        onChange={(e) => setProfileData({ ...profileData, birthDate: e.target.value })}
                        disabled={!isEditingProfile}
                      />
                    </div>
                    <div>
                      <Label htmlFor="gender">Sexo</Label>
                      <select
                        id="gender"
                        value={profileData.gender}
                        onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })}
                        disabled={!isEditingProfile}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="masculino">Masculino</option>
                        <option value="feminino">Feminino</option>
                        <option value="outro">Outro</option>
                        <option value="prefiro-nao-informar">Prefiro não informar</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba: Endereços */}
            <TabsContent value="enderecos">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Endereços
                    </CardTitle>
                    {!isEditingAddress ? (
                      <Button variant="outline" onClick={() => setIsEditingAddress(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Adicionar Endereço
                      </Button>
                    ) : (
                      <Button onClick={handleSaveAddress} className="bg-emerald-600 hover:bg-emerald-700">
                        <Save className="w-4 h-4 mr-2" />
                        Salvar
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Badge className="bg-emerald-100 text-emerald-800 mb-4">Endereço Principal</Badge>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="street">Rua</Label>
                        <Input
                          id="street"
                          value={addressData.street}
                          onChange={(e) => setAddressData({ ...addressData, street: e.target.value })}
                          disabled={!isEditingAddress}
                        />
                      </div>
                      <div>
                        <Label htmlFor="number">Número</Label>
                        <Input
                          id="number"
                          value={addressData.number}
                          onChange={(e) => setAddressData({ ...addressData, number: e.target.value })}
                          disabled={!isEditingAddress}
                        />
                      </div>
                      <div>
                        <Label htmlFor="complement">Complemento</Label>
                        <Input
                          id="complement"
                          value={addressData.complement}
                          onChange={(e) => setAddressData({ ...addressData, complement: e.target.value })}
                          disabled={!isEditingAddress}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cep">CEP</Label>
                        <Input
                          id="cep"
                          value={addressData.cep}
                          onChange={(e) => setAddressData({ ...addressData, cep: e.target.value })}
                          disabled={!isEditingAddress}
                        />
                      </div>
                      <div>
                        <Label htmlFor="neighborhood">Bairro</Label>
                        <Input
                          id="neighborhood"
                          value={addressData.neighborhood}
                          onChange={(e) => setAddressData({ ...addressData, neighborhood: e.target.value })}
                          disabled={!isEditingAddress}
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">Cidade</Label>
                        <Input
                          id="city"
                          value={addressData.city}
                          onChange={(e) => setAddressData({ ...addressData, city: e.target.value })}
                          disabled={!isEditingAddress}
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">Estado</Label>
                        <Input
                          id="state"
                          value={addressData.state}
                          onChange={(e) => setAddressData({ ...addressData, state: e.target.value })}
                          disabled={!isEditingAddress}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba: Segurança */}
            <TabsContent value="seguranca">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Key className="w-5 h-5" />
                      Alterar Senha
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={() => router.push('/dashboard/trocar-senha')}>
                      Alterar Senha
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Verificação em Duas Etapas (2FA)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">Autenticação de Dois Fatores</p>
                        <p className="text-sm text-gray-600">Adicione uma camada extra de segurança à sua conta</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge className={twoFAEnabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {twoFAEnabled ? 'Ativado' : 'Desativado'}
                        </Badge>
                        <Button
                          variant="outline"
                          onClick={() => setShow2FADialog(true)}
                        >
                          {twoFAEnabled ? 'Desativar' : 'Ativar'} 2FA
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Histórico de Login
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-semibold text-gray-900">Dispositivo Desktop</p>
                          <p className="text-sm text-gray-600">IP: 192.168.1.1 • Último acesso: 15/01/2024 14:30</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Atual</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-semibold text-gray-900">Dispositivo Mobile</p>
                          <p className="text-sm text-gray-600">IP: 192.168.1.2 • Último acesso: 14/01/2024 18:45</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Aba: Documentos */}
            <TabsContent value="documentos">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Documentos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label>RG / CNH / CPF</Label>
                      <div className="mt-2 flex items-center gap-4">
                        <Input type="file" accept="image/*,.pdf" className="flex-1" />
                        <Button>
                          <Upload className="w-4 h-4 mr-2" />
                          Enviar
                        </Button>
                      </div>
                      <Badge className="mt-2 bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Aprovado
                      </Badge>
                    </div>
                    <div>
                      <Label>Comprovante de Residência</Label>
                      <div className="mt-2 flex items-center gap-4">
                        <Input type="file" accept="image/*,.pdf" className="flex-1" />
                        <Button>
                          <Upload className="w-4 h-4 mr-2" />
                          Enviar
                        </Button>
                      </div>
                      <Badge className="mt-2 bg-yellow-100 text-yellow-800">
                        <Clock className="w-3 h-3 mr-1" />
                        Pendente
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba: Preferências */}
            <TabsContent value="preferencias">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Preferências de Conteúdo
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">Animais de Corte</p>
                        <p className="text-sm text-gray-600">Receber conteúdo sobre gado de corte</p>
                      </div>
                      <Switch
                        checked={preferences.animalsCorte}
                        onCheckedChange={(checked) => setPreferences({ ...preferences, animalsCorte: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">Animais de Leite</p>
                        <p className="text-sm text-gray-600">Receber conteúdo sobre gado de leite</p>
                      </div>
                      <Switch
                        checked={preferences.animalsLeite}
                        onCheckedChange={(checked) => setPreferences({ ...preferences, animalsLeite: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">Genética</p>
                        <p className="text-sm text-gray-600">Receber conteúdo sobre genética animal</p>
                      </div>
                      <Switch
                        checked={preferences.genetica}
                        onCheckedChange={(checked) => setPreferences({ ...preferences, genetica: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">Produtos Físicos</p>
                        <p className="text-sm text-gray-600">Receber conteúdo sobre produtos agropecuários</p>
                      </div>
                      <Switch
                        checked={preferences.produtosFisicos}
                        onCheckedChange={(checked) => setPreferences({ ...preferences, produtosFisicos: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">Apenas Produtos com Frete Grátis</p>
                        <p className="text-sm text-gray-600">Filtrar produtos que oferecem frete grátis</p>
                      </div>
                      <Switch
                        checked={preferences.freteGratis}
                        onCheckedChange={(checked) => setPreferences({ ...preferences, freteGratis: checked })}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="w-5 h-5" />
                      Notificações
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">📦 Atualizações de Pedidos</p>
                        <p className="text-sm text-gray-600">Receber notificações sobre status dos seus pedidos</p>
                      </div>
                      <Switch
                        checked={notifications.pedidos}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, pedidos: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">💬 Novas Mensagens</p>
                        <p className="text-sm text-gray-600">Notificações quando receber mensagens de vendedores</p>
                      </div>
                      <Switch
                        checked={notifications.mensagens}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, mensagens: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">📢 Novos Leilões</p>
                        <p className="text-sm text-gray-600">Alertas sobre novos leilões disponíveis</p>
                      </div>
                      <Switch
                        checked={notifications.leiloes}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, leiloes: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">🛍️ Lançamento de Produtos</p>
                        <p className="text-sm text-gray-600">Notificações sobre novos produtos</p>
                      </div>
                      <Switch
                        checked={notifications.produtos}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, produtos: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">📚 Novos Treinamentos</p>
                        <p className="text-sm text-gray-600">Alertas sobre novos cursos disponíveis</p>
                      </div>
                      <Switch
                        checked={notifications.treinamentos}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, treinamentos: checked })}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Seção de Ações Perigosas */}
          <Card className="mt-6 border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600">Ações Destrutivas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">Encerrar Sessão</p>
                  <p className="text-sm text-gray-600">Sair da sua conta atual</p>
                </div>
                <Button variant="outline">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </Button>
              </div>
              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <p className="font-semibold text-red-600">Excluir Minha Conta</p>
                  <p className="text-sm text-gray-600">Esta ação não pode ser desfeita</p>
                </div>
                <Button variant="destructive" onClick={() => setShowDeleteDialog(true)}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Excluir Conta
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Dialogs */}
          <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Alterar Senha</DialogTitle>
                <DialogDescription>
                  Digite sua nova senha
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label>Senha Atual</Label>
                  <div className="relative">
                    <Input type={showPassword ? 'text' : 'password'} />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <div>
                  <Label>Nova Senha</Label>
                  <Input type="password" />
                </div>
                <div>
                  <Label>Confirmar Nova Senha</Label>
                  <Input type="password" />
                </div>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  Alterar Senha
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={show2FADialog} onOpenChange={setShow2FADialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Verificação em Duas Etapas</DialogTitle>
                <DialogDescription>
                  {twoFAEnabled 
                    ? 'Tem certeza que deseja desativar a autenticação de dois fatores?'
                    : 'Escaneie o QR code com seu aplicativo autenticador'}
                </DialogDescription>
              </DialogHeader>
              {!twoFAEnabled && (
                <div className="mt-4 text-center">
                  <div className="w-48 h-48 bg-gray-200 mx-auto mb-4 flex items-center justify-center">
                    <Shield className="w-24 h-24 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Use um aplicativo como Google Authenticator ou Authy
                  </p>
                  <Input placeholder="Código de verificação" className="mb-4" />
                  <Button 
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => {
                      setTwoFAEnabled(true)
                      setShow2FADialog(false)
                    }}
                  >
                    Ativar 2FA
                  </Button>
                </div>
              )}
              {twoFAEnabled && (
                <div className="mt-4">
                  <Button 
                    variant="destructive"
                    className="w-full"
                    onClick={() => {
                      setTwoFAEnabled(false)
                      setShow2FADialog(false)
                    }}
                  >
                    Desativar 2FA
                  </Button>
                </div>
              )}
            </DialogContent>
          </Dialog>

          <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-red-600">Excluir Conta</DialogTitle>
                <DialogDescription>
                  Esta ação é permanente e não pode ser desfeita. Todos os seus dados serão excluídos.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 space-y-4">
                <Input placeholder="Digite 'EXCLUIR' para confirmar" />
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={() => setShowDeleteDialog(false)}>
                    Cancelar
                  </Button>
                  <Button variant="destructive" className="flex-1">
                    Excluir Conta
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  )
}
