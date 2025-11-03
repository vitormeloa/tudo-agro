'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import ProtectedRoute from '@/components/ProtectedRoute'
import AdminLayout from '@/components/admin/AdminLayout'
import { mockPurchases, getStatusColor, getStatusLabel, getStatusIcon, getTypeIcon, getPaymentMethodLabel, type PurchaseType, type PurchaseStatus } from '@/lib/mock-purchases'
import { 
  ShoppingBag, 
  Calendar, 
  DollarSign, 
  Truck, 
  CheckCircle, 
  XCircle, 
  Clock,
  Eye,
  Download,
  MessageCircle,
  Star,
  MapPin,
  FileText,
  RotateCcw,
  User,
  ExternalLink,
  Heart
} from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function MinhasComprasPage() {
  const [filterType, setFilterType] = useState<PurchaseType | 'todos'>('todos')
  const [selectedPurchase, setSelectedPurchase] = useState<string | null>(null)
  const [showFavorites, setShowFavorites] = useState(false)

  const filteredPurchases = filterType === 'todos' 
    ? mockPurchases 
    : mockPurchases.filter(p => p.type === filterType)

  const selectedPurchaseData = selectedPurchase 
    ? mockPurchases.find(p => p.id === selectedPurchase)
    : null

  // Estatísticas do topo
  const lastPurchase = mockPurchases[0]
  const totalThisMonth = mockPurchases
    .filter(p => {
      const purchaseDate = new Date(p.purchaseDate)
      const now = new Date()
      return purchaseDate.getMonth() === now.getMonth() && 
             purchaseDate.getFullYear() === now.getFullYear()
    })
    .reduce((sum, p) => sum + p.value, 0)
  const activeOrders = mockPurchases.filter(p => 
    p.status === 'aguardando_envio' || p.status === 'em_transporte'
  ).length

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(date)
  }

  const getTimelineSteps = (status: PurchaseStatus) => {
    const steps = [
      { label: 'Pedido realizado', completed: true, date: selectedPurchaseData?.purchaseDate },
      { label: 'Aguardando envio', completed: status !== 'aguardando_envio' && status !== 'cancelado', date: null },
      { label: 'Em transporte', completed: status === 'em_transporte' || status === 'entregue', date: selectedPurchaseData?.estimatedDelivery },
      { label: 'Entregue', completed: status === 'entregue', date: selectedPurchaseData?.actualDelivery }
    ]
    return steps
  }

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="min-h-screen bg-gray-50 p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Minhas Compras</h1>
            <p className="text-gray-600">Acompanhe todas as suas compras em um só lugar</p>
          </div>

          {/* Resumo do Topo */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Última Compra</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {lastPurchase ? formatDate(lastPurchase.purchaseDate) : 'N/A'}
                    </p>
                  </div>
                  <Calendar className="w-8 h-8 text-emerald-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total no Mês</p>
                    <p className="text-lg font-semibold text-emerald-600">
                      R$ {totalThisMonth.toLocaleString('pt-BR')}
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-emerald-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Pedidos Ativos</p>
                    <p className="text-lg font-semibold text-gray-900">{activeOrders}</p>
                  </div>
                  <Truck className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Último Vendedor</p>
                    <p className="text-sm font-semibold text-gray-900 truncate max-w-[120px]">
                      {lastPurchase?.sellerName || 'N/A'}
                    </p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-emerald-600 hover:text-emerald-700"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filtros */}
          <div className="mb-6 flex flex-wrap gap-2">
            <Button
              variant={filterType === 'todos' ? 'default' : 'outline'}
              onClick={() => setFilterType('todos')}
              className={filterType === 'todos' ? 'bg-emerald-600 text-white' : ''}
            >
              Todos
            </Button>
            <Button
              variant={filterType === 'animal' ? 'default' : 'outline'}
              onClick={() => setFilterType('animal')}
              className={filterType === 'animal' ? 'bg-emerald-600 text-white' : ''}
            >
              🐄 Animais
            </Button>
            <Button
              variant={filterType === 'genetica' ? 'default' : 'outline'}
              onClick={() => setFilterType('genetica')}
              className={filterType === 'genetica' ? 'bg-emerald-600 text-white' : ''}
            >
              🧬 Genética
            </Button>
            <Button
              variant={filterType === 'produto' ? 'default' : 'outline'}
              onClick={() => setFilterType('produto')}
              className={filterType === 'produto' ? 'bg-emerald-600 text-white' : ''}
            >
              📦 Produtos
            </Button>
          </div>

          {/*/!* Botão Favoritados *!/*/}
          {/*<div className="fixed top-20 right-6 z-10">*/}
          {/*  <Button*/}
          {/*    variant="outline"*/}
          {/*    size="icon"*/}
          {/*    className="rounded-full shadow-lg bg-white hover:bg-emerald-50"*/}
          {/*    onClick={() => setShowFavorites(true)}*/}
          {/*  >*/}
          {/*    <Heart className="w-5 h-5 text-red-500 fill-current" />*/}
          {/*  </Button>*/}
          {/*</div>*/}

          {/* Lista de Compras */}
          <div className="space-y-4">
            {filteredPurchases.map((purchase) => (
              <Card key={purchase.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Imagem */}
                    <div className="w-full md:w-32 h-32 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                      <img 
                        src={purchase.itemImage} 
                        alt={purchase.itemName}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback para logo caso a imagem não carregue
                          (e.target as HTMLImageElement).src = '/fotos/tudo-agro-logo.png'
                          ;(e.target as HTMLImageElement).className = 'w-full h-full object-contain p-2'
                        }}
                      />
                    </div>

                    {/* Informações */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {purchase.itemName}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span>{getTypeIcon(purchase.type)}</span>
                            <span>{formatDate(purchase.purchaseDate)}</span>
                          </div>
                        </div>
                        <Badge className={getStatusColor(purchase.status)}>
                          {getStatusIcon(purchase.status)} {getStatusLabel(purchase.status)}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div>
                          <p className="text-sm text-gray-600">Valor Pago</p>
                          <p className="text-lg font-bold text-emerald-600">
                            R$ {purchase.value.toLocaleString('pt-BR')}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Forma de Pagamento</p>
                          <p className="text-sm font-semibold text-gray-900">
                            {getPaymentMethodLabel(purchase.paymentMethod)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Vendedor</p>
                          <p className="text-sm font-semibold text-gray-900">
                            {purchase.sellerName}
                          </p>
                        </div>
                        <div className="flex items-end">
                          <Button
                            onClick={() => setSelectedPurchase(purchase.id)}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Ver Detalhes
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Modal de Detalhes */}
          {selectedPurchaseData && (
            <Dialog open={!!selectedPurchase} onOpenChange={() => setSelectedPurchase(null)}>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl">Detalhes da Compra</DialogTitle>
                  <DialogDescription>
                    Informações completas sobre sua compra
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                  {/* Item e Imagem */}
                  <div className="flex gap-6">
                    <div className="w-32 h-32 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                      <img 
                        src={selectedPurchaseData.itemImage} 
                        alt={selectedPurchaseData.itemName}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback para logo caso a imagem não carregue
                          (e.target as HTMLImageElement).src = '/fotos/tudo-agro-logo.png'
                          ;(e.target as HTMLImageElement).className = 'w-full h-full object-contain p-2'
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {selectedPurchaseData.itemName}
                      </h3>
                      <Badge className={getStatusColor(selectedPurchaseData.status)}>
                        {getStatusIcon(selectedPurchaseData.status)} {getStatusLabel(selectedPurchaseData.status)}
                      </Badge>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Status do Pedido</h4>
                    <div className="space-y-4">
                      {getTimelineSteps(selectedPurchaseData.status).map((step, index) => (
                        <div key={index} className="flex gap-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            step.completed ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-400'
                          }`}>
                            {step.completed ? <CheckCircle className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                          </div>
                          <div className="flex-1">
                            <p className={`font-semibold ${step.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                              {step.label}
                            </p>
                            {step.date && (
                              <p className="text-sm text-gray-600">{formatDate(step.date)}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Informações do Vendedor */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Vendedor</h4>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <User className="w-10 h-10 text-gray-400" />
                            <div>
                              <p className="font-semibold text-gray-900">{selectedPurchaseData.sellerName}</p>
                              {selectedPurchaseData.location && (
                                <p className="text-sm text-gray-600 flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {selectedPurchaseData.location}
                                </p>
                              )}
                            </div>
                          </div>
                          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Falar com Vendedor
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Informações de Pagamento */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Data e Forma de Pagamento</h4>
                      <p className="text-sm text-gray-600">Data: {formatDate(selectedPurchaseData.purchaseDate)}</p>
                      <p className="text-sm text-gray-600">Forma: {getPaymentMethodLabel(selectedPurchaseData.paymentMethod)}</p>
                      <p className="text-lg font-bold text-emerald-600 mt-2">
                        R$ {selectedPurchaseData.value.toLocaleString('pt-BR')}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Detalhes do Frete</h4>
                      {selectedPurchaseData.deliveryAddress ? (
                        <>
                          <p className="text-sm text-gray-600 mb-1">
                            {selectedPurchaseData.deliveryAddress}
                          </p>
                          {selectedPurchaseData.trackingNumber && (
                            <p className="text-sm text-gray-600">
                              Rastreamento: {selectedPurchaseData.trackingNumber}
                            </p>
                          )}
                          {selectedPurchaseData.estimatedDelivery && (
                            <p className="text-sm text-emerald-600 font-semibold">
                              Previsão: {formatDate(selectedPurchaseData.estimatedDelivery)}
                            </p>
                          )}
                        </>
                      ) : (
                        <p className="text-sm text-gray-600">Retirada no local</p>
                      )}
                    </div>
                  </div>

                  {/* Criador (para animais/genética) */}
                  {selectedPurchaseData.breederInfo && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Dados do Criador</h4>
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-gray-900">{selectedPurchaseData.breederInfo.name}</p>
                              <p className="text-sm text-gray-600">{selectedPurchaseData.breederInfo.location}</p>
                            </div>
                            <Button variant="outline" size="sm">
                              Ver Perfil <ExternalLink className="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* Ações */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t">
                    {selectedPurchaseData.receiptUrl && (
                      <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Comprovante de Pagamento
                      </Button>
                    )}
                    {selectedPurchaseData.invoiceUrl && (
                      <Button variant="outline">
                        <FileText className="w-4 h-4 mr-2" />
                        Nota Fiscal
                      </Button>
                    )}
                    {selectedPurchaseData.type === 'produto' && (
                      <Button variant="outline">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Recomprar
                      </Button>
                    )}
                    {!selectedPurchaseData.hasRating && selectedPurchaseData.status === 'entregue' && (
                      <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                        <Star className="w-4 h-4 mr-2" />
                        Avaliar Vendedor
                      </Button>
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}

          {/* Modal Favoritados */}
          {/*<Dialog open={showFavorites} onOpenChange={setShowFavorites}>*/}
          {/*  <DialogContent>*/}
          {/*    <DialogHeader>*/}
          {/*      <DialogTitle>Produtos Favoritados</DialogTitle>*/}
          {/*      <DialogDescription>*/}
          {/*        Seus produtos e animais favoritados*/}
          {/*      </DialogDescription>*/}
          {/*    </DialogHeader>*/}
          {/*    <div className="text-center py-8 text-gray-600">*/}
          {/*      <Heart className="w-12 h-12 mx-auto mb-4 text-red-500" />*/}
          {/*      <p>Você ainda não favoritou nenhum item</p>*/}
          {/*    </div>*/}
          {/*  </DialogContent>*/}
          {/*</Dialog>*/}
        </div>
      </AdminLayout>
    </ProtectedRoute>
  )
}
