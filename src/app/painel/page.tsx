'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  User, 
  Settings, 
  Upload, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  X,
  Eye,
  Edit,
  Trash2,
  MessageSquare,
  Heart,
  DollarSign,
  Package,
  Gavel,
  ShoppingCart,
  Bell
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function PainelPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [showVerificationAlert, setShowVerificationAlert] = useState(true)
  const [isVerified, setIsVerified] = useState(false)
  const [showVerificationModal, setShowVerificationModal] = useState(false)
  
  const [documents, setDocuments] = useState({
    rg: null as File | null,
    cpfCnpj: null as File | null,
    addressProof: null as File | null,
    car: null as File | null
  })

  const handleFileUpload = (field: keyof typeof documents, file: File | null) => {
    setDocuments({
      ...documents,
      [field]: file
    })
  }

  const handleVerificationSubmit = () => {
    // Simular envio de documentos
    console.log('Documentos enviados:', documents)
    setShowVerificationModal(false)
    setShowVerificationAlert(false)
    // Aqui você implementaria a lógica real de envio
  }

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: User },
    { id: 'animals', label: 'Meus Animais', icon: Package },
    { id: 'auctions', label: 'Meus Leilões', icon: Gavel },
    { id: 'purchases', label: 'Minhas Compras', icon: ShoppingCart },
    { id: 'favorites', label: 'Favoritos', icon: Heart },
    { id: 'messages', label: 'Mensagens', icon: MessageSquare },
    { id: 'profile', label: 'Perfil da Fazenda', icon: Settings },
    { id: 'financial', label: 'Financeiro', icon: DollarSign }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7F6F2] to-[#FFFDF7]">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-2xl font-bold text-[#1E4D2B]">
              AgroMarket
            </Link>
            <div className="flex items-center space-x-4">
              <Bell className="w-6 h-6 text-[#6E7D5B] hover:text-[#1E4D2B] cursor-pointer" />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#1E4D2B] rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <span className="text-[#2B2E2B] font-medium">João Silva</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Verification Alert */}
        {showVerificationAlert && !isVerified && (
          <div className="mb-6 bg-gradient-to-r from-[#C89F45]/10 to-[#B8913D]/10 border border-[#C89F45]/30 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-[#C89F45] mt-0.5" />
                <div>
                  <h3 className="font-semibold text-[#8A5A32] mb-1">
                    Verificação de Conta Necessária
                  </h3>
                  <p className="text-[#6E7D5B] text-sm mb-3">
                    Para acessar todas as funcionalidades da plataforma (comprar, vender, participar de leilões), 
                    você precisa verificar sua conta enviando os documentos necessários.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={() => setShowVerificationModal(true)}
                      className="bg-[#C89F45] hover:bg-[#B8913D] text-white text-sm px-4 py-2"
                    >
                      Verificar Agora
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowVerificationAlert(false)}
                      className="border-[#C89F45] text-[#C89F45] hover:bg-[#C89F45] hover:text-white text-sm px-4 py-2"
                    >
                      Lembrar Depois
                    </Button>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowVerificationAlert(false)}
                className="text-[#6E7D5B] hover:text-[#2B2E2B] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0 bg-white">
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center px-4 py-3 text-left transition-all duration-200 ${
                          activeTab === tab.id
                            ? 'bg-[#1E4D2B] text-white'
                            : 'text-[#6E7D5B] hover:bg-[#F7F6F2] hover:text-[#1E4D2B]'
                        }`}
                      >
                        <Icon className="w-5 h-5 mr-3" />
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    )
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-[#2B2E2B] mb-2">
                    Bem-vindo ao seu Painel
                  </h1>
                  <p className="text-[#6E7D5B]">
                    Gerencie seus animais, leilões e transações em um só lugar
                  </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="shadow-lg border-0 bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[#6E7D5B] text-sm font-medium">Animais Ativos</p>
                          <p className="text-2xl font-bold text-[#1E4D2B]">12</p>
                        </div>
                        <Package className="w-8 h-8 text-[#C89F45]" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-0 bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[#6E7D5B] text-sm font-medium">Leilões Participando</p>
                          <p className="text-2xl font-bold text-[#1E4D2B]">3</p>
                        </div>
                        <Gavel className="w-8 h-8 text-[#C89F45]" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-0 bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[#6E7D5B] text-sm font-medium">Compras Realizadas</p>
                          <p className="text-2xl font-bold text-[#1E4D2B]">8</p>
                        </div>
                        <ShoppingCart className="w-8 h-8 text-[#C89F45]" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-0 bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[#6E7D5B] text-sm font-medium">Favoritos</p>
                          <p className="text-2xl font-bold text-[#1E4D2B]">15</p>
                        </div>
                        <Heart className="w-8 h-8 text-[#C89F45]" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card className="shadow-lg border-0 bg-white">
                  <CardHeader>
                    <CardTitle className="text-[#2B2E2B]">Atividade Recente</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-3 bg-[#F7F6F2] rounded-lg">
                        <Gavel className="w-5 h-5 text-[#C89F45]" />
                        <div>
                          <p className="text-[#2B2E2B] font-medium">Novo lance no Leilão #123</p>
                          <p className="text-[#6E7D5B] text-sm">Há 2 horas</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-[#F7F6F2] rounded-lg">
                        <Package className="w-5 h-5 text-[#1E4D2B]" />
                        <div>
                          <p className="text-[#2B2E2B] font-medium">Animal cadastrado com sucesso</p>
                          <p className="text-[#6E7D5B] text-sm">Ontem</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-[#F7F6F2] rounded-lg">
                        <MessageSquare className="w-5 h-5 text-[#C89F45]" />
                        <div>
                          <p className="text-[#2B2E2B] font-medium">Nova mensagem recebida</p>
                          <p className="text-[#6E7D5B] text-sm">2 dias atrás</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-[#2B2E2B] mb-2">
                    Perfil da Fazenda
                  </h1>
                  <p className="text-[#6E7D5B]">
                    Gerencie as informações da sua propriedade
                  </p>
                </div>

                <Card className="shadow-lg border-0 bg-white">
                  <CardHeader>
                    <CardTitle className="text-[#2B2E2B] flex items-center justify-between">
                      Informações Básicas
                      {isVerified ? (
                        <Badge className="bg-[#3D9970] text-white">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Verificado
                        </Badge>
                      ) : (
                        <Badge className="bg-[#C89F45] text-white">
                          <AlertTriangle className="w-4 h-4 mr-1" />
                          Pendente Verificação
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#2B2E2B] mb-2">
                          Nome da Fazenda
                        </label>
                        <Input
                          defaultValue="Fazenda Boa Vista"
                          className="h-12"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#2B2E2B] mb-2">
                          Proprietário
                        </label>
                        <Input
                          defaultValue="João Silva"
                          className="h-12"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#2B2E2B] mb-2">
                        Descrição da Propriedade
                      </label>
                      <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E4D2B] focus:border-transparent"
                        rows={4}
                        placeholder="Descreva sua fazenda, especialidades, histórico..."
                        defaultValue="Fazenda especializada em gado de corte com mais de 30 anos de tradição. Localizada em região privilegiada com pastagens de qualidade."
                      />
                    </div>

                    <Button className="bg-[#1E4D2B] hover:bg-[#163B20] text-white">
                      Salvar Alterações
                    </Button>
                  </CardContent>
                </Card>

                {/* Verification Section */}
                {!isVerified && (
                  <Card className="shadow-lg border-0 bg-white">
                    <CardHeader>
                      <CardTitle className="text-[#2B2E2B] flex items-center">
                        <AlertTriangle className="w-5 h-5 mr-2 text-[#C89F45]" />
                        Verificação de Conta
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-[#6E7D5B] mb-4">
                        Complete a verificação da sua conta para acessar todas as funcionalidades da plataforma.
                      </p>
                      <Button
                        onClick={() => setShowVerificationModal(true)}
                        className="bg-[#C89F45] hover:bg-[#B8913D] text-white"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Enviar Documentos
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Other tabs content would go here */}
            {activeTab !== 'overview' && activeTab !== 'profile' && (
              <Card className="shadow-lg border-0 bg-white">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-[#1E4D2B]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-8 h-8 text-[#1E4D2B]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#2B2E2B] mb-2">
                    Seção em Desenvolvimento
                  </h3>
                  <p className="text-[#6E7D5B]">
                    Esta funcionalidade estará disponível em breve.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Verification Modal */}
      {showVerificationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#2B2E2B]">
                  Verificação KYC Rural
                </h2>
                <button
                  onClick={() => setShowVerificationModal(false)}
                  className="text-[#6E7D5B] hover:text-[#2B2E2B] transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <p className="text-[#6E7D5B] mt-2">
                Faça upload dos documentos necessários para verificar sua conta
              </p>
            </div>

            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-2 border-dashed border-[#C89F45] rounded-lg p-6 text-center hover:border-[#1E4D2B] transition-colors duration-300">
                  <FileText className="w-12 h-12 text-[#C89F45] mx-auto mb-4" />
                  <h4 className="font-semibold text-[#2B2E2B] mb-2">
                    RG ou CNH
                  </h4>
                  <p className="text-sm text-[#6E7D5B] mb-4">
                    Documento de identificação
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload('rg', e.target.files?.[0] || null)}
                    className="hidden"
                    id="rg-upload-modal"
                  />
                  <label htmlFor="rg-upload-modal">
                    <Button type="button" variant="outline" className="border-[#C89F45] text-[#C89F45] hover:bg-[#C89F45] hover:text-white">
                      Escolher Arquivo
                    </Button>
                  </label>
                  {documents.rg && (
                    <Badge className="mt-2 bg-[#3D9970] text-white block">
                      ✓ Arquivo enviado
                    </Badge>
                  )}
                </div>

                <div className="border-2 border-dashed border-[#C89F45] rounded-lg p-6 text-center hover:border-[#1E4D2B] transition-colors duration-300">
                  <FileText className="w-12 h-12 text-[#C89F45] mx-auto mb-4" />
                  <h4 className="font-semibold text-[#2B2E2B] mb-2">
                    CPF
                  </h4>
                  <p className="text-sm text-[#6E7D5B] mb-4">
                    Comprovante de inscrição
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload('cpfCnpj', e.target.files?.[0] || null)}
                    className="hidden"
                    id="cpf-upload-modal"
                  />
                  <label htmlFor="cpf-upload-modal">
                    <Button type="button" variant="outline" className="border-[#C89F45] text-[#C89F45] hover:bg-[#C89F45] hover:text-white">
                      Escolher Arquivo
                    </Button>
                  </label>
                  {documents.cpfCnpj && (
                    <Badge className="mt-2 bg-[#3D9970] text-white block">
                      ✓ Arquivo enviado
                    </Badge>
                  )}
                </div>

                <div className="border-2 border-dashed border-[#C89F45] rounded-lg p-6 text-center hover:border-[#1E4D2B] transition-colors duration-300">
                  <FileText className="w-12 h-12 text-[#C89F45] mx-auto mb-4" />
                  <h4 className="font-semibold text-[#2B2E2B] mb-2">
                    Comprovante de Endereço
                  </h4>
                  <p className="text-sm text-[#6E7D5B] mb-4">
                    Conta de luz, água ou telefone
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload('addressProof', e.target.files?.[0] || null)}
                    className="hidden"
                    id="address-upload-modal"
                  />
                  <label htmlFor="address-upload-modal">
                    <Button type="button" variant="outline" className="border-[#C89F45] text-[#C89F45] hover:bg-[#C89F45] hover:text-white">
                      Escolher Arquivo
                    </Button>
                  </label>
                  {documents.addressProof && (
                    <Badge className="mt-2 bg-[#3D9970] text-white block">
                      ✓ Arquivo enviado
                    </Badge>
                  )}
                </div>

                <div className="border-2 border-dashed border-[#C89F45] rounded-lg p-6 text-center hover:border-[#1E4D2B] transition-colors duration-300">
                  <FileText className="w-12 h-12 text-[#C89F45] mx-auto mb-4" />
                  <h4 className="font-semibold text-[#2B2E2B] mb-2">
                    CAR (Opcional)
                  </h4>
                  <p className="text-sm text-[#6E7D5B] mb-4">
                    Cadastro Ambiental Rural
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload('car', e.target.files?.[0] || null)}
                    className="hidden"
                    id="car-upload-modal"
                  />
                  <label htmlFor="car-upload-modal">
                    <Button type="button" variant="outline" className="border-[#C89F45] text-[#C89F45] hover:bg-[#C89F45] hover:text-white">
                      Escolher Arquivo
                    </Button>
                  </label>
                  {documents.car && (
                    <Badge className="mt-2 bg-[#3D9970] text-white block">
                      ✓ Arquivo enviado
                    </Badge>
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setShowVerificationModal(false)}
                  className="border-[#6E7D5B] text-[#6E7D5B] hover:bg-[#6E7D5B] hover:text-white"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleVerificationSubmit}
                  className="bg-[#C89F45] hover:bg-[#B8913D] text-white"
                  disabled={!documents.rg || !documents.cpfCnpj || !documents.addressProof}
                >
                  Enviar Documentos
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}