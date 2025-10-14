'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Settings, Percent, DollarSign, FileText, Link, Save, Edit, CheckCircle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export default function ConfigSection() {
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<'edit-page' | 'edit-integration'>('edit-page')
  const [selectedItem, setSelectedItem] = useState<any>(null)

  const configSections = [
    {
      title: 'Comissões por Categoria',
      icon: Percent,
      items: [
        { label: 'Gado de Corte', value: '3.5%' },
        { label: 'Gado Leiteiro', value: '3.0%' },
        { label: 'Cavalos', value: '4.0%' },
        { label: 'Sêmen Bovino', value: '2.5%' }
      ]
    },
    {
      title: 'Regras de Cashback',
      icon: DollarSign,
      items: [
        { label: 'Compra Direta', value: '2.0%' },
        { label: 'Leilão', value: '1.5%' },
        { label: 'Indicação', value: 'R$ 50,00' },
        { label: 'VIP Bônus', value: '5.0%' }
      ]
    }
  ]

  const contentPages = [
    { name: 'Sobre Nós', status: 'Atualizado', lastEdit: '2024-01-15', content: 'Conteúdo da página Sobre Nós...' },
    { name: 'Termos de Uso', status: 'Pendente', lastEdit: '2024-01-10', content: 'Conteúdo dos Termos de Uso...' },
    { name: 'Política de Privacidade', status: 'Atualizado', lastEdit: '2024-01-12', content: 'Conteúdo da Política de Privacidade...' },
    { name: 'Central de Ajuda', status: 'Atualizado', lastEdit: '2024-01-18', content: 'Conteúdo da Central de Ajuda...' }
  ]

  const integrations = [
    { name: 'Gateway de Pagamento', status: 'Conectado', type: 'PIX/TED', config: 'API Key configurada' },
    { name: 'Email Marketing', status: 'Conectado', type: 'SMTP', config: 'SMTP configurado' },
    { name: 'Zapier', status: 'Desconectado', type: 'Automação', config: 'Não configurado' },
    { name: 'Analytics', status: 'Conectado', type: 'Google Analytics', config: 'Tracking ID configurado' }
  ]

  const handleSaveCommission = (index: number, sectionIndex: number, newValue: string) => {
    console.log(`Salvando comissão: Seção ${sectionIndex}, Item ${index}, Valor: ${newValue}`)
  }

  const handleEditPage = (page: any) => {
    setSelectedItem(page)
    setModalType('edit-page')
    setShowModal(true)
  }

  const handleEditIntegration = (integration: any) => {
    setSelectedItem(integration)
    setModalType('edit-integration')
    setShowModal(true)
  }

  const handleConfirmAction = () => {
    if (!selectedItem) return

    switch (modalType) {
      case 'edit-page':
        console.log(`Salvando página: ${selectedItem.name}`)
        break
      case 'edit-integration':
        console.log(`Configurando integração: ${selectedItem.name}`)
        break
    }
    
    setShowModal(false)
    setSelectedItem(null)
  }

  const renderModalContent = () => {
    if (!selectedItem) return null

    switch (modalType) {
      case 'edit-page':
        return (
          <div className="space-y-4">
            <div className="p-4 bg-[#F7F6F2] rounded-lg">
              <h4 className="font-semibold text-[#2B2E2B]">Editando: {selectedItem.name}</h4>
              <p className="text-sm text-[#6E7D5B]">Última edição: {new Date(selectedItem.lastEdit).toLocaleDateString('pt-BR')}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2B2E2B] mb-2">Conteúdo da Página:</label>
              <Textarea
                defaultValue={selectedItem.content}
                placeholder="Digite o conteúdo da página..."
                className="min-h-40"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowModal(false)}>Cancelar</Button>
              <Button onClick={handleConfirmAction} className="bg-blue-600 hover:bg-blue-700">
                <Save className="w-4 h-4 mr-2" />
                Salvar Página
              </Button>
            </div>
          </div>
        )

      case 'edit-integration':
        return (
          <div className="space-y-4">
            <div className="p-4 bg-[#F7F6F2] rounded-lg">
              <h4 className="font-semibold text-[#2B2E2B]">Configurando: {selectedItem.name}</h4>
              <p className="text-sm text-[#6E7D5B]">Tipo: {selectedItem.type}</p>
              <p className="text-sm text-[#6E7D5B]">Status: {selectedItem.status}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2B2E2B] mb-2">Configuração:</label>
              <Input
                defaultValue={selectedItem.config}
                placeholder="Digite a configuração..."
              />
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <CheckCircle className="w-4 h-4 inline mr-1" />
                As configurações serão aplicadas imediatamente após salvar.
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowModal(false)}>Cancelar</Button>
              <Button onClick={handleConfirmAction} className="bg-green-600 hover:bg-green-700">
                <Settings className="w-4 h-4 mr-2" />
                {selectedItem.status === 'Conectado' ? 'Atualizar' : 'Conectar'}
              </Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Comissões e Cashback */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {configSections.map((section, sectionIndex) => {
          const Icon = section.icon
          return (
            <Card key={sectionIndex}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon className="w-5 h-5 text-[#1E4D2B]" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center justify-between">
                      <Label className="text-sm font-medium text-[#2B2E2B]">{item.label}</Label>
                      <div className="flex items-center gap-2">
                        <Input 
                          defaultValue={item.value} 
                          className="w-20 h-8 text-center text-sm"
                        />
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleSaveCommission(itemIndex, sectionIndex, item.value)}
                        >
                          <Save className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Páginas de Conteúdo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#1E4D2B]" />
            Conteúdo das Páginas Institucionais
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {contentPages.map((page, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-[#F7F6F2] rounded-lg">
                <div>
                  <h4 className="font-medium text-[#2B2E2B]">{page.name}</h4>
                  <p className="text-sm text-[#6E7D5B]">
                    Última edição: {new Date(page.lastEdit).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    page.status === 'Atualizado' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {page.status}
                  </span>
                  <Button variant="outline" size="sm" onClick={() => handleEditPage(page)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Política de Publicação */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#1E4D2B]" />
            Política de Publicação de Anúncios
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-[#2B2E2B]">Regras de Moderação</Label>
              <Textarea 
                className="mt-2"
                defaultValue="1. Imagens devem ser nítidas e mostrar claramente o animal
2. Descrições devem ser completas e verdadeiras
3. Preços devem estar dentro da faixa de mercado
4. Documentação deve estar em dia"
                rows={6}
              />
            </div>
            <Button className="bg-[#1E4D2B] hover:bg-[#163B20]">
              <Save className="w-4 h-4 mr-2" />
              Salvar Alterações
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Integrações Externas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="w-5 h-5 text-[#1E4D2B]" />
            Integrações Externas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {integrations.map((integration, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-[#F7F6F2] rounded-lg">
                <div>
                  <h4 className="font-medium text-[#2B2E2B]">{integration.name}</h4>
                  <p className="text-sm text-[#6E7D5B]">{integration.type}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    integration.status === 'Conectado' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {integration.status}
                  </span>
                  <Button variant="outline" size="sm" onClick={() => handleEditIntegration(integration)}>
                    <Settings className="w-4 h-4 mr-2" />
                    {integration.status === 'Conectado' ? 'Configurar' : 'Conectar'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-[#1E4D2B]" />
              {modalType === 'edit-page' && 'Editar Página'}
              {modalType === 'edit-integration' && 'Configurar Integração'}
            </DialogTitle>
          </DialogHeader>
          {renderModalContent()}
        </DialogContent>
      </Dialog>
    </div>
  )
}