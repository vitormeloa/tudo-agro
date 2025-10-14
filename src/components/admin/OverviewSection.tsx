'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Users, Store, FileText, Gavel, DollarSign, AlertTriangle,
  TrendingUp, Clock, CheckCircle, XCircle, Eye, Download,
  Filter, Calendar, MapPin, BarChart3, PieChart, Settings,
  ShoppingCart, Package, MessageCircle, UserCheck, Crown,
  Target, Activity, Zap, Shield, HeartHandshake
} from 'lucide-react'
import { useState } from 'react'

export default function OverviewSection() {
  const [selectedSector, setSelectedSector] = useState('all')
  const [selectedPeriod, setSelectedPeriod] = useState('current-month')

  // SETOR 1: Indicadores macro e estratégicos
  const strategicKpis = [
    {
      title: 'Usuários Cadastrados',
      value: '12,847',
      change: '+8.2%',
      trend: 'up',
      icon: Users,
      color: 'blue',
      sector: 'strategic'
    },
    {
      title: 'Volume Total Transacionado',
      value: 'R$ 2.847.320',
      change: '+15.7%',
      trend: 'up',
      icon: DollarSign,
      color: 'green',
      sector: 'strategic'
    },
    {
      title: 'Cashback Distribuído',
      value: 'R$ 89.432',
      change: '+12.3%',
      trend: 'up',
      icon: HeartHandshake,
      color: 'purple',
      sector: 'strategic'
    },
    {
      title: 'Conversão p/ Vendedor',
      value: '23.4%',
      change: '+2.1%',
      trend: 'up',
      icon: Target,
      color: 'orange',
      sector: 'strategic'
    },
    {
      title: 'Usuários Ativos no Mês',
      value: '68.2%',
      change: '+5.8%',
      trend: 'up',
      icon: Activity,
      color: 'blue',
      sector: 'strategic'
    }
  ]

  // SETOR 2: Indicadores por canal de venda
  const channelKpis = [
    {
      title: 'Leilões Abertos',
      value: '47',
      change: '-2.1%',
      trend: 'down',
      icon: Gavel,
      color: 'orange',
      sector: 'channels'
    },
    {
      title: 'Vendas por Leilão',
      value: 'R$ 1.247.890',
      change: '+18.5%',
      trend: 'up',
      icon: Gavel,
      color: 'green',
      sector: 'channels'
    },
    {
      title: 'Vendas Diretas',
      value: 'R$ 892.430',
      change: '+12.7%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'blue',
      sector: 'channels'
    },
    {
      title: 'Mercado Agro - Valor',
      value: 'R$ 707.000',
      change: '+22.1%',
      trend: 'up',
      icon: Store,
      color: 'purple',
      sector: 'channels'
    },
    {
      title: 'Mercado Agro - Unidades',
      value: '1.234',
      change: '+15.3%',
      trend: 'up',
      icon: Package,
      color: 'orange',
      sector: 'channels'
    }
  ]

  // SETOR 3: Indicadores de base, produto e engajamento
  const productKpis = [
    {
      title: 'Animais Vendidos',
      value: '3.847',
      change: '+14.2%',
      trend: 'up',
      icon: Users,
      color: 'green',
      sector: 'product'
    },
    {
      title: 'Anúncios Ativos',
      value: '3.421',
      change: '+12.5%',
      trend: 'up',
      icon: FileText,
      color: 'blue',
      sector: 'product'
    },
    {
      title: 'Novos Anúncios (7 dias)',
      value: '247',
      change: '+8.9%',
      trend: 'up',
      icon: Zap,
      color: 'orange',
      sector: 'product'
    },
    {
      title: 'Vendedores Ativos',
      value: '892',
      change: '+6.7%',
      trend: 'up',
      icon: UserCheck,
      color: 'purple',
      sector: 'product'
    },
    {
      title: 'Ticket Médio por Venda',
      value: 'R$ 7.432',
      change: '+3.2%',
      trend: 'up',
      icon: TrendingUp,
      color: 'green',
      sector: 'product'
    }
  ]

  // SETOR 4: Indicadores de fluxo e suporte
  const supportKpis = [
    {
      title: 'Documentos KYC Pendentes',
      value: '12',
      change: '-15.2%',
      trend: 'down',
      icon: Shield,
      color: 'orange',
      sector: 'support'
    },
    {
      title: 'Anúncios Aguardando Moderação',
      value: '7',
      change: '-8.3%',
      trend: 'down',
      icon: Eye,
      color: 'blue',
      sector: 'support'
    },
    {
      title: 'Denúncias Recebidas',
      value: '8',
      change: '+12.5%',
      trend: 'up',
      icon: AlertTriangle,
      color: 'red',
      sector: 'support'
    },
    {
      title: 'Solicitações de Suporte (7 dias)',
      value: '23',
      change: '+5.4%',
      trend: 'up',
      icon: MessageCircle,
      color: 'purple',
      sector: 'support'
    },
    {
      title: 'Conversas em Andamento',
      value: '156',
      change: '+18.7%',
      trend: 'up',
      icon: MessageCircle,
      color: 'green',
      sector: 'support'
    }
  ]

  // SETOR 5: Indicadores premium e upgrades
  const premiumKpis = [
    {
      title: 'Assinantes VIP Ativos',
      value: '234',
      change: '+28.4%',
      trend: 'up',
      icon: Crown,
      color: 'purple',
      sector: 'premium'
    },
    {
      title: 'Receita com Planos VIP',
      value: 'R$ 23.400',
      change: '+32.1%',
      trend: 'up',
      icon: DollarSign,
      color: 'green',
      sector: 'premium'
    },
    {
      title: 'Conversão p/ VIP',
      value: '1.8%',
      change: '+0.3%',
      trend: 'up',
      icon: Target,
      color: 'orange',
      sector: 'premium'
    },
    {
      title: 'Clube VIP - Novos Membros (mês)',
      value: '47',
      change: '+41.2%',
      trend: 'up',
      icon: Crown,
      color: 'blue',
      sector: 'premium'
    }
  ]

  const allKpis = [...strategicKpis, ...channelKpis, ...productKpis, ...supportKpis, ...premiumKpis]

  const getFilteredKpis = () => {
    if (selectedSector === 'all') return allKpis
    return allKpis.filter(kpi => kpi.sector === selectedSector)
  }

  const getSectorTitle = (sector: string) => {
    const titles = {
      'all': 'Todos os Indicadores',
      'strategic': 'Setor 1: Indicadores Macro e Estratégicos',
      'channels': 'Setor 2: Indicadores por Canal de Venda',
      'product': 'Setor 3: Indicadores de Base, Produto e Engajamento',
      'support': 'Setor 4: Indicadores de Fluxo e Suporte',
      'premium': 'Setor 5: Indicadores Premium e Upgrades'
    }
    return titles[sector as keyof typeof titles] || titles.all
  }

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
      purple: 'bg-purple-500 text-white',
      red: 'bg-red-500 text-white'
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

  const handleActionClick = (action: string) => {
    // Implementar navegação ou modal conforme necessário
    console.log(`Ação clicada: ${action}`)
    // Aqui você pode adicionar navegação para páginas específicas ou abrir modals
  }

  return (
    <div className="space-y-6">
      {/* Filtros e Controles */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg border">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#6E7D5B]" />
            <Select value={selectedSector} onValueChange={setSelectedSector}>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Filtrar por setor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Setores</SelectItem>
                <SelectItem value="strategic">Setor 1: Macro e Estratégicos</SelectItem>
                <SelectItem value="channels">Setor 2: Canal de Venda</SelectItem>
                <SelectItem value="product">Setor 3: Produto e Engajamento</SelectItem>
                <SelectItem value="support">Setor 4: Fluxo e Suporte</SelectItem>
                <SelectItem value="premium">Setor 5: Premium e Upgrades</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#6E7D5B]" />
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-7-days">Últimos 7 dias</SelectItem>
                <SelectItem value="current-month">Mês atual</SelectItem>
                <SelectItem value="last-month">Mês anterior</SelectItem>
                <SelectItem value="custom">Personalizado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar Relatório
          </Button>
        </div>
      </div>

      {/* Título do Setor Selecionado */}
      <div className="bg-gradient-to-r from-[#1E4D2B] to-[#2B5A31] text-white p-4 rounded-lg">
        <h2 className="text-xl font-bold">{getSectorTitle(selectedSector)}</h2>
        <p className="text-sm opacity-90 mt-1">
          {selectedSector === 'all' 
            ? 'Visão completa de todos os indicadores do marketplace'
            : 'Indicadores específicos do setor selecionado'
          }
        </p>
      </div>

      {/* KPIs por Setor */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {getFilteredKpis().map((kpi, index) => {
          const Icon = kpi.icon
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getColorClasses(kpi.color)}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className={`w-4 h-4 mr-1 ${
                      kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'
                    }`} />
                    <span className={`text-sm font-medium ${
                      kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {kpi.change}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#6E7D5B] mb-1">{kpi.title}</p>
                  <p className="text-2xl font-bold text-[#2B2E2B]">{kpi.value}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recursos Complementares */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mapa de Calor por Estado */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#1E4D2B]" />
              Mapa de Calor - Volume por Estado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-[#F7F6F2] p-6 rounded-lg text-center">
              <MapPin className="w-16 h-16 text-[#6E7D5B] mx-auto mb-4" />
              <p className="text-[#6E7D5B]">Mapa interativo em desenvolvimento</p>
              <p className="text-sm text-[#6E7D5B] mt-2">
                Visualização do volume de vendas por região
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Gráfico Top 5 Categorias */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-[#1E4D2B]" />
              Top 5 Categorias - Gráfico
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-[#F7F6F2] p-6 rounded-lg text-center">
              <BarChart3 className="w-16 h-16 text-[#6E7D5B] mx-auto mb-4" />
              <p className="text-[#6E7D5B]">Gráfico interativo em desenvolvimento</p>
              <p className="text-sm text-[#6E7D5B] mt-2">
                Visualização das categorias mais vendidas
              </p>
            </div>
          </CardContent>
        </Card>
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
                      onClick={() => handleActionClick(alert.action)}
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

      {/* Top Categorias Mais Vendidas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#1E4D2B]" />
              Top Categorias Mais Vendidas
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleActionClick('Exportar')}
            >
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