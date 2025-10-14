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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-[#1E4D2B]" />
            Verificação de Documentos (KYC)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {documents.map((doc) => (
              <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <User className="w-5 h-5 text-[#6E7D5B]" />
                        <h3 className="font-semibold text-[#2B2E2B]">{doc.user}</h3>
                        {getStatusBadge(doc.status)}
                      </div>
                      <p className="text-sm text-[#6E7D5B] mb-3">{doc.type}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {doc.documents.map((document, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {document}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="text-sm text-[#6E7D5B]">
                        <p>Enviado em: {new Date(doc.submittedDate).toLocaleDateString('pt-BR')}</p>
                        {doc.reviewDate && (
                          <p>Revisado em: {new Date(doc.reviewDate).toLocaleDateString('pt-BR')}</p>
                        )}
                        {doc.rejectionReason && (
                          <p className="text-red-600 mt-1">Motivo: {doc.rejectionReason}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Ver Documentos
                      </Button>
                      {doc.status === 'pendente' && (
                        <>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Aprovar
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600">
                            <XCircle className="w-4 h-4 mr-2" />
                            Recusar
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