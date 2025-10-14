'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MessageSquare, AlertTriangle, Clock, User, Send } from 'lucide-react'

export default function MessagesSection() {
  const messages = [
    {
      id: 1,
      user: 'João Silva',
      type: 'suporte',
      subject: 'Problema com pagamento',
      preview: 'Não consegui finalizar o pagamento do leilão...',
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
      date: '2024-01-19 16:45',
      status: 'arquivado',
      priority: 'baixa'
    }
  ]

  const templates = [
    'Agradecemos seu contato...',
    'Sua solicitação foi recebida...',
    'Problema resolvido com sucesso...'
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
                      <Button variant="outline" size="sm">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Responder
                      </Button>
                      {message.status === 'novo' && (
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <Send className="w-4 h-4 mr-2" />
                          Resposta Rápida
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Templates de Resposta */}
          <div className="mt-6">
            <h3 className="font-semibold text-[#2B2E2B] mb-4">Modelos de Resposta Rápida</h3>
            <div className="grid gap-2">
              {templates.map((template, index) => (
                <div key={index} className="p-3 bg-[#F7F6F2] rounded-lg text-sm text-[#6E7D5B] cursor-pointer hover:bg-gray-100">
                  {template}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}