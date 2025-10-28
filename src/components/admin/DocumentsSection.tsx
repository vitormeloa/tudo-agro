'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FileCheck, CheckCircle, XCircle, Clock, Eye, User } from 'lucide-react'

export default function DocumentsSection() {
  const documents = [
    {
      id: 1,
      user: 'João Silva Santos',
      type: 'KYC Completo',
      documents: ['RG', 'CPF', 'Comprovante'],
      status: 'pendente',
      submittedDate: '2024-01-18',
      reviewDate: null
    },
    {
      id: 2,
      user: 'Maria Oliveira',
      type: 'Verificação Vendedor',
      documents: ['RG', 'CPF', 'Comprovante', 'Certificado'],
      status: 'aprovado',
      submittedDate: '2024-01-15',
      reviewDate: '2024-01-16'
    },
    {
      id: 3,
      user: 'Carlos Mendes',
      type: 'KYC Pessoa Jurídica',
      documents: ['CNPJ', 'Contrato Social'],
      status: 'recusado',
      submittedDate: '2024-01-17',
      reviewDate: '2024-01-18',
      rejectionReason: 'Documentos ilegíveis'
    }
  ]

  const getStatusBadge = (status: string) => {
    const config = {
      pendente: { color: 'bg-orange-100 text-orange-800', icon: Clock },
      aprovado: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      recusado: { color: 'bg-red-100 text-red-800', icon: XCircle }
    }
    const { color, icon: Icon } = config[status as keyof typeof config] || config.pendente
    return (
      <Badge className={color}>
        <Icon className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                    <FileCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#1E4D2B]" />
                    <span className="text-base sm:text-lg font-semibold">Gerenciamento de Documentos</span>
                </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          <div className="grid gap-3 sm:gap-4">
            {documents.map((doc) => (
              <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-3 sm:p-6">
                  <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
                    <div className="flex-1 w-full">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-[#6E7D5B] flex-shrink-0" />
                        <h3 className="font-semibold text-[#2B2E2B] text-sm sm:text-base break-words">{doc.user}</h3>
                        {getStatusBadge(doc.status)}
                      </div>
                      <p className="text-xs sm:text-sm text-[#6E7D5B] mb-3 break-words">{doc.type}</p>
                      
                      <div className="flex flex-wrap gap-1 sm:gap-2 mb-3">
                        {doc.documents.map((document, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {document}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="text-xs sm:text-sm text-[#6E7D5B] space-y-1">
                        <p className="break-words">Enviado em: {new Date(doc.submittedDate).toLocaleDateString('pt-BR')}</p>
                        {doc.reviewDate && (
                          <p className="break-words">Revisado em: {new Date(doc.reviewDate).toLocaleDateString('pt-BR')}</p>
                        )}
                        {doc.rejectionReason && (
                          <p className="text-red-600 mt-1 break-words">Motivo: {doc.rejectionReason}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row lg:flex-col gap-2 w-full lg:w-auto">
                      <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">Ver Documentos</span>
                        <span className="sm:hidden">Ver</span>
                      </Button>
                      {doc.status === 'pendente' && (
                        <>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-xs sm:text-sm">
                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            <span className="hidden sm:inline">Aprovar</span>
                            <span className="sm:hidden">Aprovar</span>
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 text-xs sm:text-sm">
                            <XCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            <span className="hidden sm:inline">Recusar</span>
                            <span className="sm:hidden">Recusar</span>
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}