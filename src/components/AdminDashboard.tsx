'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  BarChart3, Users, Store, FileText, Gavel, CreditCard, 
  FileCheck, Gift, Crown, GraduationCap, MessageSquare, 
  Settings, Menu, X, LogOut, Home, AlertTriangle,
  TrendingUp, Clock, CheckCircle, XCircle, ChevronDown,
  UserCircle, Edit, Key, Shield
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/use-toast'

// Importar componentes das seções
import OverviewSection from './admin/OverviewSection'
import UsersSection from './admin/UsersSection'
import SellersSection from './admin/SellersSection'
import AdsSection from './admin/AdsSection'
import AuctionsSection from './admin/AuctionsSection'
import TransactionsSection from './admin/TransactionsSection'
import DocumentsSection from './admin/DocumentsSection'
import CashbackSection from './admin/CashbackSection'
import VipSection from './admin/VipSection'
import AcademySection from './admin/AcademySection'
import MessagesSection from './admin/MessagesSection'
import ConfigSection from './admin/ConfigSection'

interface AdminDashboardProps {}

export default function AdminDashboard({}: AdminDashboardProps) {
  const { user, isAdmin, isSeller, isBuyer, signOut } = useAuth()
  const { toast } = useToast()
  const [activeSection, setActiveSection] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  // Fechar menu do usuário quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isUserMenuOpen) {
        const target = event.target as Element
        if (!target.closest('[data-user-menu]')) {
          setIsUserMenuOpen(false)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isUserMenuOpen])

  // Definir itens do menu baseado no role do usuário
  const getMenuItems = () => {
    const allMenuItems = [
      { id: 'overview', label: 'Visão Geral', icon: BarChart3, alerts: 0, roles: ['admin', 'vendedor', 'comprador'] },
      { id: 'users', label: 'Usuários', icon: Users, alerts: 0, roles: ['admin'] },
      { id: 'sellers', label: 'Vendedores', icon: Store, alerts: 3, roles: ['admin'] },
      { id: 'ads', label: 'Anúncios', icon: FileText, alerts: 7, roles: ['admin', 'vendedor'] },
      { id: 'auctions', label: 'Leilões', icon: Gavel, alerts: 0, roles: ['admin', 'vendedor', 'comprador'] },
      { id: 'transactions', label: 'Transações', icon: CreditCard, alerts: 2, roles: ['admin', 'vendedor', 'comprador'] },
      { id: 'documents', label: 'Documentos (KYC)', icon: FileCheck, alerts: 12, roles: ['admin'] },
      { id: 'cashback', label: 'Cashback', icon: Gift, alerts: 5, roles: ['admin', 'vendedor', 'comprador'] },
      { id: 'vip', label: 'Plano VIP e Clube', icon: Crown, alerts: 0, roles: ['admin', 'vendedor', 'comprador'] },
      { id: 'academy', label: 'Academy / IA Agro', icon: GraduationCap, alerts: 0, roles: ['admin', 'vendedor', 'comprador'] },
      { id: 'messages', label: 'Mensagens e Suporte', icon: MessageSquare, alerts: 8, roles: ['admin', 'vendedor', 'comprador'] },
      { id: 'config', label: 'Configurações', icon: Settings, alerts: 0, roles: ['admin'] }
    ]

    if (!user) return []

    // Filtrar itens baseado no role do usuário
    return allMenuItems.filter(item => {
      if (isAdmin()) return true // Admin vê tudo
      if (isSeller() && item.roles.includes('vendedor')) return true
      if (isBuyer() && item.roles.includes('comprador')) return true
      return false
    })
  }

  const menuItems = getMenuItems()

  const renderSection = () => {
    switch (activeSection) {
      case 'overview': return <OverviewSection />
      case 'users': return <UsersSection />
      case 'sellers': return <SellersSection />
      case 'ads': return <AdsSection />
      case 'auctions': return <AuctionsSection />
      case 'transactions': return <TransactionsSection />
      case 'documents': return <DocumentsSection />
      case 'cashback': return <CashbackSection />
      case 'vip': return <VipSection />
      case 'academy': return <AcademySection />
      case 'messages': return <MessagesSection />
      case 'config': return <ConfigSection />
      default: return <OverviewSection />
    }
  }

  const totalAlerts = menuItems.reduce((sum, item) => sum + item.alerts, 0)

  return (
    <div className="min-h-screen bg-[#F7F6F2] flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-20'} transition-all duration-300 bg-white shadow-xl border-r border-gray-200 flex flex-col`}>
        {/* Header da Sidebar */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div>
                <h1 className="text-2xl font-bold text-[#1E4D2B]">TudoAgro</h1>
                <p className="text-sm text-[#6E7D5B]">
                  {isAdmin() ? 'Painel Administrativo' : 
                   isSeller() ? 'Painel do Vendedor' : 
                   'Painel do Usuário'}
                </p>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-[#6E7D5B] hover:text-[#1E4D2B] hover:bg-[#F7F6F2]"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-3">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-all duration-200 group ${
                    isActive 
                      ? 'bg-[#1E4D2B] text-white shadow-lg' 
                      : 'text-[#6E7D5B] hover:bg-[#F7F6F2] hover:text-[#1E4D2B]'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#6E7D5B] group-hover:text-[#1E4D2B]'}`} />
                  {sidebarOpen && (
                    <>
                      <span className="font-medium flex-1">{item.label}</span>
                      {item.alerts > 0 && (
                        <Badge className={`${
                          isActive ? 'bg-white text-[#1E4D2B]' : 'bg-[#B8413D] text-white'
                        } text-xs px-2 py-1`}>
                          {item.alerts}
                        </Badge>
                      )}
                    </>
                  )}
                  {!sidebarOpen && item.alerts > 0 && (
                    <div className="absolute right-2 w-2 h-2 bg-[#B8413D] rounded-full"></div>
                  )}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Footer da Sidebar */}
        <div className="p-4 border-t border-gray-200">
          {sidebarOpen && (
            <div className="mb-4 p-3 bg-[#F7F6F2] rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-[#B8413D]" />
                <span className="text-sm font-medium text-[#2B2E2B]">Alertas Pendentes</span>
              </div>
              <p className="text-2xl font-bold text-[#B8413D]">{totalAlerts}</p>
              <p className="text-xs text-[#6E7D5B]">Requerem atenção</p>
            </div>
          )}
          
          <Button
            variant="ghost"
            className="w-full justify-start text-[#6E7D5B] hover:text-[#B8413D] hover:bg-red-50"
            onClick={async () => {
              try {
                await signOut()
                toast({
                  title: "Logout realizado",
                  description: "Você foi desconectado com sucesso.",
                })
              } catch (error) {
                toast({
                  title: "Erro no logout",
                  description: "Ocorreu um erro ao fazer logout. Tente novamente.",
                  variant: "destructive",
                })
              }
            }}
          >
            <LogOut className="w-5 h-5 mr-3" />
            {sidebarOpen && 'Sair do Sistema'}
          </Button>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header Principal */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="/fotos/tudo-agro-logo.png" 
                className="h-6 w-auto sm:h-8 md:h-10 lg:h-12" 
                alt="TudoAgro Logo"
              />
              <div>
                <h2 className="text-2xl font-bold text-[#2B2E2B]">
                  {menuItems.find(item => item.id === activeSection)?.label}
                </h2>
                <p className="text-[#6E7D5B] text-sm">
                  {isAdmin() ? 'Gerencie e monitore as operações da plataforma' :
                   isSeller() ? 'Gerencie seus produtos, leilões e vendas' :
                   'Acompanhe suas compras, leilões e atividades'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Status do Sistema */}
              {/*<div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg">*/}
              {/*  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>*/}
              {/*  <span className="text-sm font-medium text-green-700">Sistema Online</span>*/}
              {/*</div>*/}
              
              {/* User Menu */}
              <div className="relative" data-user-menu>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-3 px-4 py-2 bg-[#F7F6F2] rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-[#1E4D2B] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div className="text-sm text-left">
                    <p className="font-medium text-[#2B2E2B]">
                      {isAdmin() ? 'Administrador' : 
                       isSeller() ? 'Vendedor' : 
                       'Usuário'}
                    </p>
                    <p className="text-[#6E7D5B]">{user?.email}</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-[#6E7D5B] transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user?.name || 'Usuário'}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    
                    {/* Opções do usuário */}
                    <div className="py-1">
                      <Link 
                        href="/perfil"
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <UserCircle className="w-4 h-4 mr-3" />
                        Meu Perfil
                      </Link>
                      
                      <Link 
                        href="/perfil/senha"
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Key className="w-4 h-4 mr-3" />
                        Trocar Senha
                      </Link>
                      
                      <Link 
                        href="/perfil/configuracoes"
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4 mr-3" />
                        Configurações
                      </Link>
                    </div>
                    
                    {/* Separador */}
                    <div className="border-t border-gray-100 my-1"></div>
                    
                    {/* Logout */}
                    <button
                      onClick={async () => {
                        try {
                          await signOut()
                          toast({
                            title: "Logout realizado",
                            description: "Você foi desconectado com sucesso.",
                          })
                        } catch (error) {
                          toast({
                            title: "Erro no logout",
                            description: "Ocorreu um erro ao fazer logout. Tente novamente.",
                            variant: "destructive",
                          })
                        }
                        setIsUserMenuOpen(false)
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Sair
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Conteúdo da Seção */}
        <main className="flex-1 overflow-y-auto p-6">
          {renderSection()}
        </main>
      </div>
    </div>
  )
}