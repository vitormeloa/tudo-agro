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
import { useAdminPermissions } from '@/hooks/useAdminPermissions'
import SalesChart from './charts/SalesChart'
import CategoryChart from './charts/CategoryChart'
import UserGrowthChart from './charts/UserGrowthChart'
import RevenueChart from './charts/RevenueChart'
import MetricsDashboard, { AlertCard } from './dashboard/MetricsDashboard'

export default function OverviewSection() {
  const { isAdmin, isSeller, isBuyer } = useAdminPermissions()
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

  // Filtrar KPIs baseado nas permissões do usuário
  const getFilteredKpisByRole = () => {
    let allowedKpis = []
    
    if (isAdmin) {
      // Admin vê todos os KPIs
      allowedKpis = [...strategicKpis, ...channelKpis, ...productKpis, ...supportKpis, ...premiumKpis]
    } else if (isSeller) {
      // Vendedor vê KPIs relacionados a vendas, leilões e produtos
      allowedKpis = [
        // KPIs estratégicos básicos
        strategicKpis[1], // Volume Total Transacionado
        strategicKpis[2], // Cashback Distribuído
        // KPIs de canais (leilões e vendas)
        ...channelKpis,
        // KPIs de produtos
        ...productKpis,
        // KPIs de suporte básicos
        supportKpis[0], // Tempo Médio de Resposta
        supportKpis[1], // Taxa de Satisfação
        // KPIs VIP básicos
        premiumKpis[0], // Assinantes VIP Ativos
        premiumKpis[2], // Conversão p/ VIP
      ]
    } else if (isBuyer) {
      // Comprador vê KPIs básicos e relacionados a compras
      allowedKpis = [
        // KPIs estratégicos básicos
        strategicKpis[1], // Volume Total Transacionado
        strategicKpis[2], // Cashback Distribuído
        // KPIs de canais (leilões)
        channelKpis[0], // Leilões Abertos
        channelKpis[1], // Vendas por Leilão
        // KPIs de produtos básicos
        productKpis[0], // Produtos Ativos
        productKpis[1], // Categorias Disponíveis
        // KPIs de suporte básicos
        supportKpis[0], // Tempo Médio de Resposta
        supportKpis[1], // Taxa de Satisfação
        // KPIs VIP básicos
        premiumKpis[0], // Assinantes VIP Ativos
        premiumKpis[2], // Conversão p/ VIP
      ]
    }
    
    return allowedKpis
  }

  const allKpis = getFilteredKpisByRole()

  const getFilteredKpis = () => {
    if (selectedSector === 'all') return allKpis
    return allKpis.filter(kpi => kpi.sector === selectedSector)
  }

  // Filtrar setores disponíveis baseado nas permissões
  const getAvailableSectors = () => {
    const allSectors = [
      { id: 'all', label: 'Todos os Indicadores' },
      { id: 'strategic', label: 'Setor 1: Indicadores Macro e Estratégicos' },
      { id: 'channels', label: 'Setor 2: Indicadores por Canal de Venda' },
      { id: 'product', label: 'Setor 3: Indicadores de Base, Produto e Engajamento' },
      { id: 'support', label: 'Setor 4: Indicadores de Fluxo e Suporte' },
      { id: 'premium', label: 'Setor 5: Indicadores Premium e Upgrades' }
    ]

    if (isAdmin) {
      return allSectors
    } else if (isSeller) {
      return allSectors.filter(sector => 
        ['all', 'channels', 'product', 'support', 'premium'].includes(sector.id)
      )
    } else if (isBuyer) {
      return allSectors.filter(sector => 
        ['all', 'channels', 'product', 'support', 'premium'].includes(sector.id)
      )
    }
    
    return [{ id: 'all', label: 'Todos os Indicadores' }]
  }

  const availableSectors = getAvailableSectors()

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

  // Filtrar alertas baseado nas permissões do usuário
  const getFilteredAlerts = () => {
    const allAlerts = [
      {
        type: 'urgent',
        title: 'Documentos KYC Pendentes',
        count: 12,
        description: 'Verificações de identidade aguardando aprovação',
        action: 'Revisar Agora',
        roles: ['admin'] // Apenas admin
      },
      {
        type: 'warning',
        title: 'Anúncios Aguardando Moderação',
        count: 7,
        description: 'Novos anúncios precisam ser aprovados',
        action: 'Moderar',
        roles: ['admin', 'vendedor'] // Admin e vendedor
      },
      {
        type: 'info',
        title: 'Denúncias Recebidas',
        count: 8,
        description: 'Relatórios de usuários sobre conteúdo inadequado',
        action: 'Investigar',
        roles: ['admin'] // Apenas admin
      },
      {
        type: 'success',
        title: 'Vendedores Aprovados Hoje',
        count: 5,
        description: 'Novos vendedores verificados e ativos',
        action: 'Ver Lista',
        roles: ['admin'] // Apenas admin
      },
      {
        type: 'info',
        title: 'Novos Leilões Disponíveis',
        count: 3,
        description: 'Novos leilões foram iniciados hoje',
        action: 'Ver Leilões',
        roles: ['admin', 'vendedor', 'comprador'] // Todos
      },
      {
        type: 'success',
        title: 'Suas Vendas do Dia',
        count: 2,
        description: 'Você realizou 2 vendas hoje',
        action: 'Ver Vendas',
        roles: ['vendedor'] // Apenas vendedor
      },
      {
        type: 'info',
        title: 'Suas Compras Pendentes',
        count: 1,
        description: 'Você tem 1 compra aguardando confirmação',
        action: 'Ver Compras',
        roles: ['comprador'] // Apenas comprador
      }
    ]

    if (isAdmin) {
      return allAlerts.filter(alert => alert.roles.includes('admin'))
    } else if (isSeller) {
      return allAlerts.filter(alert => alert.roles.includes('vendedor'))
    } else if (isBuyer) {
      return allAlerts.filter(alert => alert.roles.includes('comprador'))
    }
    
    return []
  }

  const alerts = getFilteredAlerts()

  // Filtrar gráficos baseado nas permissões
  const getFilteredCharts = () => {
    const allCharts = [
      {
        id: 'sales',
        component: <SalesChart />,
        title: 'Evolução de Vendas por Canal',
        icon: BarChart3,
        roles: ['admin', 'vendedor'] // Admin e vendedor
      },
      {
        id: 'categories',
        component: <CategoryChart />,
        title: 'Distribuição por Categorias',
        icon: PieChart,
        roles: ['admin', 'vendedor', 'comprador'] // Todos
      },
      {
        id: 'userGrowth',
        component: <UserGrowthChart />,
        title: 'Crescimento de Usuários',
        icon: Users,
        roles: ['admin'] // Apenas admin
      },
      {
        id: 'revenue',
        component: <RevenueChart />,
        title: 'Receita e Comissões',
        icon: DollarSign,
        roles: ['admin', 'vendedor'] // Admin e vendedor
      }
    ]

    if (isAdmin) {
      return allCharts
    } else if (isSeller) {
      return allCharts.filter(chart => chart.roles.includes('vendedor'))
    } else if (isBuyer) {
      return allCharts.filter(chart => chart.roles.includes('comprador'))
    }
    
    return []
  }

  const availableCharts = getFilteredCharts()

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
      green: 'bg-emerald-500 text-white',
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
      success: 'border-emerald-200 bg-emerald-50'
    }
    return colors[type as keyof typeof colors] || colors.info
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4 text-[#3D9970]" />
      case 'warning': return <AlertTriangle className="w-4 h-4 text-orange-500" />
      case 'info': return <Eye className="w-4 h-4 text-blue-500" />
      case 'pending': return <Clock className="w-4 h-4 text-gray-500" />
      default: return <CheckCircle className="w-4 h-4 text-[#3D9970]" />
    }
  }

  const handleActionClick = (action: string) => {
    // Implementar navegação ou modal conforme necessário
    console.log(`Ação clicada: ${action}`)
    // Aqui você pode adicionar navegação para páginas específicas ou abrir modals
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Filtros e Controles */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 sm:gap-4 bg-white p-3 sm:p-4 rounded-lg border">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full lg:w-auto">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-gray-600 flex-shrink-0" />
            <Select value={selectedSector} onValueChange={setSelectedSector}>
              <SelectTrigger className="w-full sm:w-[280px]">
                <SelectValue placeholder="Filtrar por setor" />
              </SelectTrigger>
              <SelectContent>
                {availableSectors.map(sector => (
                  <SelectItem key={sector.id} value={sector.id}>
                    {sector.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full lg:w-auto">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Calendar className="w-4 h-4 text-gray-600 flex-shrink-0" />
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-full sm:w-[180px]">
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
          
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Download className="w-4 h-4 mr-2" />
            Exportar Relatório
          </Button>
        </div>
      </div>

      {/* Título do Setor Selecionado */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-3 sm:p-4 rounded-lg">
        <h2 className="text-lg sm:text-xl font-bold">{getSectorTitle(selectedSector)}</h2>
        <p className="text-xs sm:text-sm opacity-90 mt-1">
          {selectedSector === 'all' 
            ? 'Visão completa de todos os indicadores do marketplace'
            : 'Indicadores específicos do setor selecionado'
          }
        </p>
      </div>

      {/* KPIs por Setor */}
      <MetricsDashboard 
        metrics={getFilteredKpis().map(kpi => ({
          title: kpi.title,
          value: kpi.value,
          change: kpi.change,
          trend: kpi.trend as 'up' | 'down' | 'neutral',
          icon: kpi.icon,
          color: kpi.color as 'blue' | 'green' | 'orange' | 'purple' | 'red'
        }))}
        title={getSectorTitle(selectedSector)}
      />

      {/* Gráficos - Layout adaptativo baseado na quantidade disponível */}
      {availableCharts.length > 0 && (
        <div className={`grid gap-4 lg:gap-6 ${
          availableCharts.length === 1 
            ? 'grid-cols-1' 
            : availableCharts.length === 2 
            ? 'grid-cols-1 lg:grid-cols-2' 
            : availableCharts.length === 3
            ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'
            : 'grid-cols-1 lg:grid-cols-2'
        }`}>
          {availableCharts.map((chart) => (
            <Card key={chart.id} className="h-full">
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                      <chart.icon className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                      <span className="text-base sm:text-lg font-semibold">{chart.title}</span>
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {chart.component}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Alertas e Atividade Recente - Layout adaptativo */}
      <div className={`grid gap-4 lg:gap-6 ${
        alerts.length === 0 
          ? 'grid-cols-1' 
          : 'grid-cols-1 lg:grid-cols-2'
      }`}>
        {/* Alertas */}
        {alerts.length > 0 && (
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-[#101828] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
              Alertas e Pendências
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              {alerts.map((alert, index) => (
                <AlertCard
                  key={index}
                  type={alert.type as 'success' | 'warning' | 'error' | 'info'}
                  title={alert.title}
                  message={alert.description}
                  count={alert.count}
                  action={alert.action}
                  onAction={() => handleActionClick(alert.action)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Atividade Recente - Ocupa espaço completo se não há alertas */}
        <Card className={alerts.length === 0 ? 'lg:col-span-1' : ''}>
                  <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                    <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                    <span className="text-base sm:text-lg font-semibold">Atividade Recente</span>
                </CardTitle>
            </div>
          </div>
        </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-100 transition-colors">
                  {getStatusIcon(activity.status)}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-[#101828] break-words">{activity.message}</p>
                    <p className="text-xs text-gray-600 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>


      {/* Top Categorias Mais Vendidas - Apenas para Admin e Vendedor */}
      {(isAdmin || isSeller) && (
        <Card>
                  <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                    <span className="text-base sm:text-lg font-semibold">Top Categorias</span>
                </CardTitle>
            </div>
          </div>
        </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-[#F7F6F2]">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#101828]">{category.name}</h4>
                      <p className="text-sm text-gray-600">{category.sales} vendas</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-emerald-600">{category.percentage}%</p>
                    <div className="w-20 h-2 bg-gray-200 rounded-full mt-1">
                      <div 
                        className="h-full bg-emerald-600 rounded-full"
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}