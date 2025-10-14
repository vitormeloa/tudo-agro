'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { MessageSquare, AlertTriangle, Clock, User, Send, Eye, Archive } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export default function MessagesSection() {
  const [selectedMessage, setSelectedMessage] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<'view' | 'reply' | 'template'>('view')
  const [replyText, setReplyText] = useState('')

  const messages = [
    {
      id: 1,
      user: 'João Silva',
      type: 'suporte',
      subject: 'Problema com pagamento',
      preview: 'Não consegui finalizar o pagamento do leilão...',
      fullMessage: 'Olá, estou tentando finalizar o pagamento do leilão #1247 mas o sistema não está aceitando meu PIX. Já tentei várias vezes. Podem me ajudar?',
      date: '2024-01-20 14:30',
      status: 'novo',
      priority: 'alta'
    },
    {
      id: 2,
      user: 'Maria Santos',
      type: 'denúncia',
      subject: 'Anúncio suspeito',
      preview: 'Gostaria de reportar um anúncio que parece ser falso...',
      fullMessage: 'Gostaria de reportar o anúncio #456 que está oferecendo um touro por um preço muito abaixo do mercado. Suspeito que seja golpe.',
      date: '2024-01-20 12:15',
      status: 'respondido',
      priority: 'média'
    },
    {
      id: 3,
      user: 'Carlos Mendes',
      type: 'elogio',
      subject: 'Excelente plataforma',
      preview: 'Parabéns pela qualidade do serviço...',
      fullMessage: 'Parabéns pela qualidade do serviço. Consegui vender meus animais rapidamente e com segurança. Recomendo para todos!',
      date: '2024-01-19 16:45',
      status: 'arquivado',
      priority: 'baixa'
    }
  ]

  const templates = [
    {
      id: 1,
      title: 'Agradecimento',
      content: 'Agradecemos seu contato. Nossa equipe analisará sua solicitação e retornará em breve.'
    },
    {
      id: 2,
      title: 'Recebimento',
      content: 'Sua solicitação foi recebida e está sendo processada. Aguarde nosso retorno.'
    },
    {
      id: 3,
      title: 'Resolução',
      content: 'Problema resolvido com sucesso. Caso tenha outras dúvidas, entre em contato conosco.'
    }
  ]

  const getStatusBadge = (status: string) => {
    const config = {
      novo: 'bg-red-100 text-red-800',
      respondido: 'bg-green-100 text-green-800',
      arquivado: 'bg-gray-100 text-gray-800'
    }
    return <Badge className={config[status as keyof typeof config]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
  }

  const getTypeBadge = (type: string) => {
    const config = {
      suporte: 'bg-blue-100 text-blue-800',
      denúncia: 'bg-red-100 text-red-800',
      elogio: 'bg-green-100 text-green-800',
      financeiro: 'bg-purple-100 text-purple-800'
    }
    return <Badge variant="outline" className={config[type as keyof typeof config]}>{type.charAt(0).toUpperCase() + type.slice(1)}</Badge>
  }

  const getPriorityIcon = (priority: string) => {
    if (priority === 'alta') return <AlertTriangle className="w-4 h-4 text-red-500" />
    if (priority === 'média') return <Clock className="w-4 h-4 text-orange-500" />
    return <Clock className="w-4 h-4 text-gray-500" />
  }

  const handleAction = (message: any, action: 'view' | 'reply' | 'archive') => {
    setSelectedMessage(message)
    if (action === 'archive') {
      console.log(`Arquivando mensagem ${message.id}`)
      return
    }
    setModalType(action)
    setShowModal(true)
    setReplyText('')
  }

  const handleTemplateSelect = (template: any) => {
    setReplyText(template.content)
  }

  const handleConfirmAction = () => {
    if (!selectedMessage) return

    switch (modalType) {
      case 'reply':
        if (!replyText.trim()) return
        console.log(`Respondendo mensagem ${selectedMessage.id}: ${replyText}`)
        break
    }
    
    setShowModal(false)
    setSelectedMessage(null)
  }

  const renderModalContent = () => {
    if (!selectedMessage) return null

    switch (modalType) {
      case 'view':
        return (
          <div className="space-y-4">
            <div className="p-4 bg-[#F7F6F2] rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <User className="w-5 h-5 text-[#6E7D5B]" />
                <h4 className="font-semibold text-[#2B2E2B]">{selectedMessage.user}</h4>
                {getStatusBadge(selectedMessage.status)}
                {getTypeBadge(selectedMessage.type)}
                {getPriorityIcon(selectedMessage.priority)}
              </div>
              <h3 className="font-medium text-[#2B2E2B] mb-2">{selectedMessage.subject}</h3>
              <p className="text-sm text-[#6E7D5B] mb-2">{selectedMessage.date}</p>
            </div>
            <div>
              <h4 className="font-semibold text-[#2B2E2B] mb-2">Mensagem Completa:</h4>
              <p className="text-sm text-[#6E7D5B] bg-white p-4 rounded-lg border">{selectedMessage.fullMessage}</p>
            </div>
          </div>
        )

      case 'reply':
        return (
          <div className="space-y-4">
            <div className="p-4 bg-[#F7F6F2] rounded-lg">
              <h4 className="font-semibold text-[#2B2E2B]">Respondendo para: {selectedMessage.user}</h4>
              <p className="text-sm text-[#6E7D5B]">Assunto: {selectedMessage.subject}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2B2E2B] mb-2">Sua resposta:</label>
              <Textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Digite sua resposta..."
                className="min-h-32"
              />
            </div>
            <div>
              <h5 className="font-medium text-[#2B2E2B] mb-2">Modelos de Resposta:</h5>
              <div className="grid gap-2">
                {templates.map((template) => (
                  <div 
                    key={template.id} 
                    className="p-3 bg-[#F7F6F2] rounded-lg text-sm cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <strong>{template.title}:</strong> {template.content}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowModal(false)}>Cancelar</Button>
              <Button 
                onClick={handleConfirmAction} 
                className="bg-blue-600 hover:bg-blue-700"
                disabled={!replyText.trim()}
              >
                <Send className="w-4 h-4 mr-2" />
                Enviar Resposta
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#1E4D2B]" />
              Mensagens e Suporte
            </div>
            <div className="flex items-center gap-4 text-sm text-[#6E7D5B]">
              <span>Novos: {messages.filter(m => m.status === 'novo').length}</span>
              <span>Pendentes: {messages.filter(m => m.status === 'respondido').length}</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {messages.map((message) => (
              <Card key={message.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <User className="w-5 h-5 text-[#6E7D5B]" />
                        <h3 className="font-semibold text-[#2B2E2B]">{message.user}</h3>
                        {getStatusBadge(message.status)}
                        {getTypeBadge(message.type)}
                        {getPriorityIcon(message.priority)}
                      </div>
                      
                      <h4 className="font-medium text-[#2B2E2B] mb-2">{message.subject}</h4>
                      <p className="text-sm text-[#6E7D5B] mb-3">{message.preview}</p>
                      
                      <div className="text-xs text-[#6E7D5B]">
                        {message.date}
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 ml-4">
                      <Button variant="outline" size="sm" onClick={() => handleAction(message, 'view')}>
                        <Eye className="w-4 h-4 mr-2" />
                        Ver Completa
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleAction(message, 'reply')}>
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Responder
                      </Button>
                      {message.status !== 'arquivado' && (
                        <Button variant="outline" size="sm" onClick={() => handleAction(message, 'archive')}>
                          <Archive className="w-4 h-4 mr-2" />
                          Arquivar
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#1E4D2B]" />
              {modalType === 'view' && 'Detalhes da Mensagem'}
              {modalType === 'reply' && 'Responder Mensagem'}
            </DialogTitle>
          </DialogHeader>
          {renderModalContent()}
        </DialogContent>
      </Dialog>
    </div>
  )
}