'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { FileCheck, CheckCircle, XCircle, Clock, Eye, User, Download } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export default function DocumentsSection() {
  const [selectedDocument, setSelectedDocument] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<'view' | 'approve' | 'reject' | 'documents'>('view')
  const [rejectionReason, setRejectionReason] = useState('')

  const documents = [
    {
      id: 1,
      user: 'João Silva Santos',
      email: 'joao.silva@email.com',
      type: 'KYC Completo',
      documents: ['RG', 'CPF', 'Comprovante'],
      status: 'pendente',
      submittedDate: '2024-01-18',
      reviewDate: null,
      userType: 'PF',
      details: {
        cpf: '123.456.789-00',
        rg: '12.345.678-9',
        address: 'Rua das Flores, 123 - Centro, São Paulo - SP',
        phone: '(11) 99999-9999'
      }
    },
    {
      id: 2,
      user: 'Maria Oliveira',
      email: 'maria.oliveira@gmail.com',
      type: 'Verificação Vendedor',
      documents: ['RG', 'CPF', 'Comprovante', 'Certificado'],
      status: 'aprovado',
      submittedDate: '2024-01-15',
      reviewDate: '2024-01-16',
      userType: 'PF',
      details: {
        cpf: '987.654.321-00',
        rg: '98.765.432-1',
        address: 'Av. Copacabana, 456 - Copacabana, Rio de Janeiro - RJ',
        phone: '(21) 88888-7777',
        specialization: 'Sêmen Bovino'
      }
    },
    {
      id: 3,
      user: 'Carlos Mendes',
      email: 'carlos.mendes@hotmail.com',
      type: 'KYC Pessoa Jurídica',
      documents: ['CNPJ', 'Contrato Social'],
      status: 'recusado',
      submittedDate: '2024-01-17',
      reviewDate: '2024-01-18',
      rejectionReason: 'Documentos ilegíveis',
      userType: 'PJ',
      details: {
        cnpj: '12.345.678/0001-90',
        razaoSocial: 'Carlos Mendes Agropecuária LTDA',
        address: 'Rua Minas Gerais, 789 - Centro, Belo Horizonte - MG',
        phone: '(31) 77777-6666',
        responsible: 'Carlos Mendes'
      }
    },
    {
      id: 4,
      user: 'Fazenda Boa Vista Ltda',
      email: 'contato@fazendaboavista.com.br',
      type: 'Verificação Vendedor PJ',
      documents: ['CNPJ', 'Contrato Social', 'Comprovante', 'Licenças'],
      status: 'pendente',
      submittedDate: '2024-01-19',
      reviewDate: null,
      userType: 'PJ',
      details: {
        cnpj: '98.765.432/0001-10',
        razaoSocial: 'Fazenda Boa Vista Agropecuária LTDA',
        address: 'Fazenda Boa Vista, Km 15 - Zona Rural, Ribeirão Preto - SP',
        phone: '(16) 3333-4444',
        responsible: 'Carlos Silva',
        specialization: 'Gado Leiteiro'
      }
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

  const handleAction = (document: any, action: 'view' | 'approve' | 'reject' | 'documents') => {
    setSelectedDocument(document)
    setModalType(action)
    setShowModal(true)
    setRejectionReason('')
  }

  const handleConfirmAction = () => {
    if (!selectedDocument) return

    switch (modalType) {
      case 'approve':
        console.log(`Aprovando documento ${selectedDocument.id}`)
        break
      case 'reject':
        if (!rejectionReason.trim()) return
        console.log(`Recusando documento ${selectedDocument.id} com motivo: ${rejectionReason}`)
        break
    }
    
    setShowModal(false)
    setSelectedDocument(null)
  }

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "ID,Usuario,Email,Tipo,Status,Data Envio,Data Revisao\n" +
      documents.map(doc => 
        `${doc.id},${doc.user},${doc.email},${doc.type},${doc.status},${doc.submittedDate},${doc.reviewDate || 'N/A'}`
      ).join("\n")
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "documentos_kyc.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const renderModalContent = () => {
    if (!selectedDocument) return null

    switch (modalType) {
      case 'view':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-[#2B2E2B] mb-3">Informações do Usuário</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Nome:</strong> {selectedDocument.user}</p>
                  <p><strong>Email:</strong> {selectedDocument.email}</p>
                  <p><strong>Tipo:</strong> <Badge variant="outline">{selectedDocument.userType}</Badge></p>
                  {Object.entries(selectedDocument.details).map(([key, value]) => (
                    <p key={key}>
                      <strong>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:</strong> {value as string}
                    </p>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-[#2B2E2B] mb-3">Status da Verificação</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Tipo de Verificação:</strong> {selectedDocument.type}</p>
                  <p><strong>Status:</strong> {getStatusBadge(selectedDocument.status)}</p>
                  <p><strong>Data de Envio:</strong> {new Date(selectedDocument.submittedDate).toLocaleDateString('pt-BR')}</p>
                  {selectedDocument.reviewDate && (
                    <p><strong>Data de Revisão:</strong> {new Date(selectedDocument.reviewDate).toLocaleDateString('pt-BR')}</p>
                  )}
                  {selectedDocument.rejectionReason && (
                    <p className="text-red-600"><strong>Motivo da Recusa:</strong> {selectedDocument.rejectionReason}</p>
                  )}
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-[#2B2E2B] mb-3">Documentos Enviados</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {selectedDocument.documents.map((doc: string, index: number) => (
                  <div key={index} className="p-3 border rounded-lg bg-[#F7F6F2] text-center">
                    <FileCheck className="w-8 h-8 text-[#6E7D5B] mx-auto mb-2" />
                    <p className="text-sm font-medium">{doc}</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Eye className="w-3 h-3 mr-1" />
                      Ver
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'approve':
        return (
          <div className="space-y-4">
            <p className="text-[#6E7D5B]">Tem certeza que deseja aprovar esta verificação KYC?</p>
            <div className="p-4 bg-[#F7F6F2] rounded-lg">
              <h4 className="font-semibold text-[#2B2E2B]">{selectedDocument.user}</h4>
              <p className="text-sm text-[#6E7D5B]">Email: {selectedDocument.email}</p>
              <p className="text-sm text-[#6E7D5B]">Tipo: {selectedDocument.type}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedDocument.documents.map((doc: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">{doc}</Badge>
                ))}
              </div>
            </div>
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                <CheckCircle className="w-4 h-4 inline mr-1" />
                Ao aprovar, o usuário será verificado e poderá acessar todas as funcionalidades.
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowModal(false)}>Cancelar</Button>
              <Button onClick={handleConfirmAction} className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="w-4 h-4 mr-2" />
                Aprovar Verificação
              </Button>
            </div>
          </div>
        )

      case 'reject':
        return (
          <div className="space-y-4">
            <p className="text-[#6E7D5B]">Por que você está recusando esta verificação KYC?</p>
            <div className="p-4 bg-[#F7F6F2] rounded-lg">
              <h4 className="font-semibold text-[#2B2E2B]">{selectedDocument.user}</h4>
              <p className="text-sm text-[#6E7D5B]">Email: {selectedDocument.email}</p>
              <p className="text-sm text-[#6E7D5B]">Tipo: {selectedDocument.type}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedDocument.documents.map((doc: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">{doc}</Badge>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2B2E2B] mb-2">Motivo da recusa:</label>
              <Textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Explique o motivo da recusa (ex: documentos ilegíveis, informações inconsistentes, etc.)..."
                className="min-h-20"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowModal(false)}>Cancelar</Button>
              <Button 
                onClick={handleConfirmAction} 
                className="bg-red-600 hover:bg-red-700"
                disabled={!rejectionReason.trim()}
              >
                <XCircle className="w-4 h-4 mr-2" />
                Recusar Verificação
              </Button>
            </div>
          </div>
        )

      case 'documents':
        return (
          <div className="space-y-4">
            <p className="text-[#6E7D5B]">Documentos enviados para verificação:</p>
            <div className="p-4 bg-[#F7F6F2] rounded-lg">
              <h4 className="font-semibold text-[#2B2E2B]">{selectedDocument.user}</h4>
              <p className="text-sm text-[#6E7D5B]">Email: {selectedDocument.email}</p>
              <p className="text-sm text-[#6E7D5B]">Tipo: {selectedDocument.type}</p>
            </div>
            <div className="grid gap-3">
              {selectedDocument.documents.map((doc: string, index: number) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileCheck className="w-8 h-8 text-[#6E7D5B]" />
                    <div>
                      <p className="font-medium">{doc}</p>
                      <p className="text-sm text-[#6E7D5B]">Enviado em {new Date(selectedDocument.submittedDate).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Visualizar
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Baixar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setShowModal(false)}>Fechar</Button>
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
              <FileCheck className="w-5 h-5 text-[#1E4D2B]" />
              Verificação de Documentos (KYC)
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4 text-sm text-[#6E7D5B]">
                <span>Pendentes: {documents.filter(d => d.status === 'pendente').length}</span>
                <span>Aprovados: {documents.filter(d => d.status === 'aprovado').length}</span>
                <span>Recusados: {documents.filter(d => d.status === 'recusado').length}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleExportCSV}>
                <Download className="w-4 h-4 mr-2" />
                Exportar CSV
              </Button>
            </div>
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
                        <Badge variant="outline" className="text-xs">{doc.userType}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[#6E7D5B] mb-3">
                        <p><strong>Email:</strong> {doc.email}</p>
                        <p><strong>Tipo de Verificação:</strong> {doc.type}</p>
                        <p><strong>Data de Envio:</strong> {new Date(doc.submittedDate).toLocaleDateString('pt-BR')}</p>
                        {doc.reviewDate && (
                          <p><strong>Data de Revisão:</strong> {new Date(doc.reviewDate).toLocaleDateString('pt-BR')}</p>
                        )}
                      </div>
                      
                      <div className="mb-3">
                        <p className="text-sm font-medium text-[#2B2E2B] mb-2">Documentos Enviados:</p>
                        <div className="flex flex-wrap gap-2">
                          {doc.documents.map((document, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {document}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {doc.rejectionReason && (
                        <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                          <strong>Motivo da Recusa:</strong> {doc.rejectionReason}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col gap-2 ml-4">
                      <Button variant="outline" size="sm" onClick={() => handleAction(doc, 'view')}>
                        <Eye className="w-4 h-4 mr-2" />
                        Ver Detalhes
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleAction(doc, 'documents')}>
                        <FileCheck className="w-4 h-4 mr-2" />
                        Ver Documentos
                      </Button>
                      {doc.status === 'pendente' && (
                        <>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleAction(doc, 'approve')}>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Aprovar
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600" onClick={() => handleAction(doc, 'reject')}>
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

      {/* Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-[#1E4D2B]" />
              {modalType === 'view' && 'Detalhes da Verificação KYC'}
              {modalType === 'approve' && 'Aprovar Verificação'}
              {modalType === 'reject' && 'Recusar Verificação'}
              {modalType === 'documents' && 'Documentos Enviados'}
            </DialogTitle>
          </DialogHeader>
          {renderModalContent()}
        </DialogContent>
      </Dialog>
    </div>
  )
}