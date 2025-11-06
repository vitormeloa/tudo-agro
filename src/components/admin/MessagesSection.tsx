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
      respondido: 'bg-emerald-100 text-emerald-800',
      arquivado: 'bg-gray-100 text-gray-800'
    }
    return <Badge className={config[status as keyof typeof config]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
  }

  const getTypeBadge = (type: string) => {
    const config = {
      suporte: 'bg-emerald-100 text-emerald-800',
      denúncia: 'bg-red-100 text-red-800',
      elogio: 'bg-emerald-100 text-emerald-800',
      financeiro: 'bg-emerald-100 text-emerald-800'
    }
    return <Badge variant="outline" className={config[type as keyof typeof config]}>{type.charAt(0).toUpperCase() + type.slice(1)}</Badge>
  }

  const getPriorityIcon = (priority: string) => {
    if (priority === 'alta') return <AlertTriangle className="w-4 h-4 text-red-500" />
    if (priority === 'média') return <Clock className="w-4 h-4 text-orange-500" />
    return <Clock className="w-4 h-4 text-gray-500" />
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card>
        <CardHeader className="p-3 sm:p-6">
          <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-800" />
              <span className="text-base sm:text-lg font-semibold">Mensagens e Suporte</span>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
              <span>Novos: {messages.filter(m => m.status === 'novo').length}</span>
              <span>Pendentes: {messages.filter(m => m.status === 'respondido').length}</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          <div className="grid gap-3 sm:gap-4">
            {messages.map((message) => (
              <Card key={message.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-3 sm:p-6">
                  <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
                    <div className="flex-1 w-full">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 flex-shrink-0" />
                        <h3 className="font-semibold text-[#101828] text-sm sm:text-base break-words">{message.user}</h3>
                        <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                          {getStatusBadge(message.status)}
                          {getTypeBadge(message.type)}
                          {getPriorityIcon(message.priority)}
                        </div>
                      </div>
                      
                      <h4 className="font-medium text-[#101828] mb-2 text-sm sm:text-base break-words">{message.subject}</h4>
                      <p className="text-xs sm:text-sm text-gray-600 mb-3 break-words">{message.preview}</p>
                      
                      <div className="text-xs text-gray-600 break-words">
                        {message.date}
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row lg:flex-col gap-2 w-full lg:w-auto">
                      <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                        <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">Responder</span>
                        <span className="sm:hidden">Responder</span>
                      </Button>
                      {message.status === 'novo' && (
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm">
                          <Send className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                          <span className="hidden sm:inline">Resposta Rápida</span>
                          <span className="sm:hidden">Rápida</span>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Templates de Resposta */}
          <div className="mt-4 sm:mt-6">
            <h3 className="font-semibold text-[#101828] mb-3 sm:mb-4 text-sm sm:text-base">Modelos de Resposta Rápida</h3>
            <div className="grid gap-2">
              {templates.map((template, index) => (
                <div key={index} className="p-2 sm:p-3 bg-[#F7F6F2] rounded-lg text-xs sm:text-sm text-gray-600 cursor-pointer hover:bg-gray-100 break-words">
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