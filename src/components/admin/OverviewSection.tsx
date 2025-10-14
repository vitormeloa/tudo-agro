'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Users, Store, FileText, Gavel, DollarSign, AlertTriangle,
  TrendingUp, Clock, CheckCircle, XCircle, Eye, Download
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export default function OverviewSection() {
  const [selectedAlert, setSelectedAlert] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)

  const kpis = [
    {
      title: 'Usuários Cadastrados',
      value: '12,847',
      change: '+8.2%',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Anúncios Ativos',
      value: '3,421',
      change: '+12.5%',
      trend: 'up',
      icon: FileText,
      color: 'green'
    },
    {
      title: 'Leilões Abertos',
      value: '47',
      change: '-2.1%',
      trend: 'down',
      icon: Gavel,
      color: 'orange'
    },
    {
      title: 'Cashback Distribuído',
      value: 'R$ 89.432',
      change: '+15.7%',
      trend: 'up',
      icon: DollarSign,
      color: 'purple'
    }
  ]

  const alerts = [
    {
      type: 'urgent',
      title: 'Documentos KYC Pendentes',
      count: 12,
      description: 'Verificações de identidade aguardando aprovação',
      action: 'Revisar Agora',
      actionType: 'kyc_review',
      items: [
        { id: 1, name: 'João Silva Santos', date: '2024-01-18', docs: ['RG', 'CPF', 'Comprovante'] },
        { id: 2, name: 'Maria Oliveira', date: '2024-01-19', docs: ['RG', 'CPF', 'Comprovante', 'Certificado'] },
        { id: 3, name: 'Carlos Mendes', date: '2024-01-17', docs: ['CNPJ', 'Contrato Social'] }
      ]
    },
    {
      type: 'warning',
      title: 'Anúncios Aguardando Moderação',
      count: 7,
      description: 'Novos anúncios precisam ser aprovados',
      action: 'Moderar',
      actionType: 'ads_moderation',
      items: [
        { id: 1, title: 'Touro Nelore PO - Excelente Genética', seller: 'Fazenda Boa Vista', date: '2024-01-20' },
        { id: 2, title: 'Égua Mangalarga Marchador', seller: 'João Silva', date: '2024-01-19' },
        { id: 3, title: 'Vaca Holandesa - Alta Produção', seller: 'Maria Santos', date: '2024-01-18' }
      ]
    },
    {
      type: 'info',
      title: 'Denúncias Recebidas',
      count: 8,
      description: 'Relatórios de usuários sobre conteúdo inadequado',
      action: 'Investigar',
      actionType: 'reports_investigation',
      items: [
        { id: 1, type: 'Anúncio Suspeito', reporter: 'Usuário Anônimo', target: 'Sêmen Bovino - Preço Baixo', date: '2024-01-20' },
        { id: 2, type: 'Comportamento Inadequado', reporter: 'João Silva', target: 'Vendedor XYZ', date: '2024-01-19' },
        { id: 3, type: 'Produto Falso', reporter: 'Maria Santos', target: 'Cavalo Puro Sangue', date: '2024-01-18' }
      ]
    },
    {
      type: 'success',
      title: 'Vendedores Aprovados Hoje',
      count: 5,
      description: 'Novos vendedores verificados e ativos',
      action: 'Ver Lista',
      actionType: 'approved_sellers',
      items: [
        { id: 1, name: 'Fazenda Santa Clara', approved: '2024-01-20', specialization: 'Gado de Corte' },
        { id: 2, name: 'Haras Boa Esperança', approved: '2024-01-20', specialization: 'Cavalos' },
        { id: 3, name: 'Agropecuária Moderna', approved: '2024-01-20', specialization: 'Gado Leiteiro' }
      ]
    }
  ]

  const topCategories = [
    { name: 'Gado de Corte', sales: 1247, percentage: 35.2 },
    { name: 'Cavalos', sales: 892, percentage: 25.1 },
    { name: 'Gado Leiteiro', sales: 654, percentage: 18.4 },
    { name: 'Sêmen Bovino', sales: 432, percentage: 12.2 },
    { name: 'Outros', sales: 321, percentage: 9.1 }
  ]

  const recentActivity = [
    {
      type: 'user',
      message: 'Novo usuário cadastrado: João Silva',
      time: '2 min atrás',
      status: 'success'
    },
    {
      type: 'auction',
      message: 'Leilão #1247 encerrado com 23 lances',
      time: '5 min atrás',
      status: 'info'
    },
    {
      type: 'alert',
      message: 'Anúncio denunciado por conteúdo inadequado',
      time: '8 min atrás',
      status: 'warning'
    },
    {
      type: 'transaction',
      message: 'Pagamento de R$ 15.000 aprovado',
      time: '12 min atrás',
      status: 'success'
    },
    {
      type: 'seller',
      message: 'Vendedor Maria Santos aguarda aprovação',
      time: '15 min atrás',
      status: 'pending'
    }
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-500 text-white',
      green: 'bg-green-500 text-white',
      orange: 'bg-orange-500 text-white',
      purple: 'bg-purple-500 text-white'
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  const getAlertColor = (type: string) => {
    const colors = {
      urgent: 'border-red-200 bg-red-50',
      warning: 'border-orange-200 bg-orange-50',
      info: 'border-blue-200 bg-blue-50',
      success: 'border-green-200 bg-green-50'
    }
    return colors[type as keyof typeof colors] || colors.info
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'warning': return <AlertTriangle className="w-4 h-4 text-orange-500" />
      case 'info': return <Eye className="w-4 h-4 text-blue-500" />
      case 'pending': return <Clock className="w-4 h-4 text-gray-500" />
      default: return <CheckCircle className="w-4 h-4 text-green-500" />
    }
  }

  const handleAlertAction = (alert: any) => {
    setSelectedAlert(alert)
    setShowModal(true)
  }

  const handleExportCategories = () => {
    // Simular exportação
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Categoria,Vendas,Percentual\n" +
      topCategories.map(cat => `${cat.name},${cat.sales},${cat.percentage}%`).join("\n")
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "top_categorias.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const renderModalContent = () => {
    if (!selectedAlert) return null

    switch (selectedAlert.actionType) {
      case 'kyc_review':
        return (
          <div className="space-y-4">
            <p className="text-[#6E7D5B]">Documentos KYC pendentes de verificação:</p>
            <div className="space-y-3">
              {selectedAlert.items.map((item: any) => (
                <div key={item.id} className="p-4 border rounded-lg bg-[#F7F6F2]">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-[#2B2E2B]">{item.name}</h4>
                    <span className="text-sm text-[#6E7D5B]">{new Date(item.date).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {item.docs.map((doc: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">{doc}</Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Aprovar
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600">
                      <XCircle className="w-4 h-4 mr-2" />
                      Recusar
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Ver Documentos
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'ads_moderation':
        return (
          <div className="space-y-4">
            <p className="text-[#6E7D5B]">Anúncios aguardando moderação:</p>
            <div className="space-y-3">
              {selectedAlert.items.map((item: any) => (
                <div key={item.id} className="p-4 border rounded-lg bg-[#F7F6F2]">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-[#2B2E2B]">{item.title}</h4>
                      <p className="text-sm text-[#6E7D5B]">Por: {item.seller}</p>
                      <p className="text-xs text-[#6E7D5B]">{new Date(item.date).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Aprovar
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600">
                      <XCircle className="w-4 h-4 mr-2" />
                      Recusar
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Ver Anúncio
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'reports_investigation':
        return (
          <div className="space-y-4">
            <p className="text-[#6E7D5B]">Denúncias recebidas para investigação:</p>
            <div className="space-y-3">
              {selectedAlert.items.map((item: any) => (
                <div key={item.id} className="p-4 border rounded-lg bg-[#F7F6F2]">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-[#2B2E2B]">{item.type}</h4>
                      <p className="text-sm text-[#6E7D5B]">Alvo: {item.target}</p>
                      <p className="text-sm text-[#6E7D5B]">Denunciante: {item.reporter}</p>
                      <p className="text-xs text-[#6E7D5B]">{new Date(item.date).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Eye className="w-4 h-4 mr-2" />
                      Investigar
                    </Button>
                    <Button variant="outline" size="sm" className="text-green-600">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Arquivar
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Tomar Ação
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'approved_sellers':
        return (
          <div className="space-y-4">
            <p className="text-[#6E7D5B]">Vendedores aprovados hoje:</p>
            <div className="space-y-3">
              {selectedAlert.items.map((item: any) => (
                <div key={item.id} className="p-4 border rounded-lg bg-[#F7F6F2]">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-[#2B2E2B]">{item.name}</h4>
                      <p className="text-sm text-[#6E7D5B]">Especialização: {item.specialization}</p>
                      <p className="text-xs text-[#6E7D5B]">Aprovado em: {new Date(item.approved).toLocaleDateString('pt-BR')}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Aprovado
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Ver Perfil
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText className="w-4 h-4 mr-2" />
                      Ver Documentos
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      default:
        return <p>Conteúdo não disponível</p>
    }
  }

  return (
    <div className="space-y-6">
      {/* KPIs Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#6E7D5B]">{kpi.title}</p>
                    <p className="text-3xl font-bold text-[#2B2E2B] mt-2">{kpi.value}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className={`w-4 h-4 mr-1 ${
                        kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'
                      }`} />
                      <span className={`text-sm font-medium ${
                        kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {kpi.change}
                      </span>
                      <span className="text-sm text-[#6E7D5B] ml-1">vs mês anterior</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getColorClasses(kpi.color)}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Alertas e Atividade Recente */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alertas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#B8413D]" />
              Alertas e Pendências
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {alerts.map((alert, index) => (
              <div key={index} className={`p-4 rounded-lg border-2 ${getAlertColor(alert.type)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-[#2B2E2B]">{alert.title}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {alert.count}
                      </Badge>
                    </div>
                    <p className="text-sm text-[#6E7D5B] mb-3">{alert.description}</p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-xs"
                      onClick={() => handleAlertAction(alert)}
                    >
                      {alert.action}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Atividade Recente */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#1E4D2B]" />
              Atividade Recente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#F7F6F2] transition-colors">
                  {getStatusIcon(activity.status)}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#2B2E2B]">{activity.message}</p>
                    <p className="text-xs text-[#6E7D5B] mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Categorias */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#1E4D2B]" />
              Top Categorias Mais Vendidas
            </div>
            <Button variant="outline" size="sm" onClick={handleExportCategories}>
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-[#F7F6F2]">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-[#1E4D2B] text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2B2E2B]">{category.name}</h4>
                    <p className="text-sm text-[#6E7D5B]">{category.sales} vendas</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-[#1E4D2B]">{category.percentage}%</p>
                  <div className="w-20 h-2 bg-gray-200 rounded-full mt-1">
                    <div 
                      className="h-full bg-[#1E4D2B] rounded-full"
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modal para Alertas */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#B8413D]" />
              {selectedAlert?.title}
            </DialogTitle>
          </DialogHeader>
          {renderModalContent()}
        </DialogContent>
      </Dialog>
    </div>
  )
}