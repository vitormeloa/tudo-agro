'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Users, Store, FileText, Gavel, DollarSign, AlertTriangle,
  TrendingUp, Clock, CheckCircle, XCircle, Eye, Download
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function OverviewSection() {
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
      action: 'Revisar Agora'
    },
    {
      type: 'warning',
      title: 'Anúncios Aguardando Moderação',
      count: 7,
      description: 'Novos anúncios precisam ser aprovados',
      action: 'Moderar'
    },
    {
      type: 'info',
      title: 'Denúncias Recebidas',
      count: 8,
      description: 'Relatórios de usuários sobre conteúdo inadequado',
      action: 'Investigar'
    },
    {
      type: 'success',
      title: 'Vendedores Aprovados Hoje',
      count: 5,
      description: 'Novos vendedores verificados e ativos',
      action: 'Ver Lista'
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
                    <Button size="sm" variant="outline" className="text-xs">
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
            <Button variant="outline" size="sm">
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
    </div>
  )
}