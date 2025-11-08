'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/hooks/useAuth'
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft,
  CreditCard,
  Lock,
  Truck,
  Shield,
  CheckCircle
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function CarrinhoPage() {
  const { items, removeItem, updateQuantity, clearCart, getSubtotal, getTotal, isLoading } = useCart()
  const { user } = useAuth()
  const { toast } = useToast()
  const [isRemoving, setIsRemoving] = useState<string | null>(null)

  const handleRemoveItem = async (id: string, title: string) => {
    setIsRemoving(id)
    setTimeout(() => {
      removeItem(id)
      setIsRemoving(null)
    }, 200)
  }

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      const item = items.find(i => i.id === id)
      if (item) {
        handleRemoveItem(id, item.title)
      }
      return
    }
    updateQuantity(id, newQuantity)
  }

  const handleClearCart = () => {
    if (confirm('Tem certeza que deseja limpar o carrinho?')) {
      clearCart()
    }
  }

  const handleCheckout = () => {
    if (!user) {
      toast({
        title: 'Login necessário',
        description: 'Você precisa estar logado para finalizar a compra.',
        variant: 'destructive',
      })
      return
    }
    window.location.href = '/checkout'
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando carrinho...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {}
        <div className="mb-6">
          <Link href="/produtos" className="inline-flex items-center text-gray-600 hover:text-primary mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continuar comprando
          </Link>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#101828]">
              Meu Carrinho
            </h1>
            {items.length > 0 && (
              <Button
                variant="ghost"
                onClick={handleClearCart}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Limpar carrinho
              </Button>
            )}
          </div>
        </div>

        {items.length === 0 ? (
          <Card className="bg-white">
            <CardContent className="flex flex-col items-center justify-center py-16 px-4">
              <ShoppingCart className="w-24 h-24 text-gray-300 mb-4" />
              <h2 className="text-xl font-semibold text-[#101828] mb-2">
                Seu carrinho está vazio
              </h2>
              <p className="text-gray-600 mb-6 text-center">
                Adicione produtos ao carrinho para continuar comprando
              </p>
              <Link href="/produtos">
                <Button className="bg-primary hover:bg-[#2E7A5A] text-white">
                  Ver Produtos
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card 
                  key={item.id} 
                  className={`bg-white transition-all ${isRemoving === item.id ? 'opacity-50 scale-95' : ''}`}
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {}
                      <Link href={item.type === 'product' ? `/produtos/${item.id}` : `/catalogo/${item.id}`}>
                        <div className="relative w-full sm:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </Link>

                      {}
                      <div className="flex-1 flex flex-col sm:flex-row sm:justify-between gap-4">
                        <div className="flex-1">
                          <Link 
                            href={item.type === 'product' ? `/produtos/${item.id}` : `/catalogo/${item.id}`}
                            className="hover:text-primary transition-colors"
                          >
                            <h3 className="text-base sm:text-lg font-semibold text-[#101828] mb-1">
                              {item.title}
                            </h3>
                          </Link>
                          <p className="text-sm text-gray-600 mb-2">
                            Vendido por: <span className="font-medium">{item.seller}</span>
                          </p>
                          {item.location && (
                            <p className="text-xs text-gray-500 flex items-center">
                              <Truck className="w-3 h-3 mr-1" />
                              {item.city || ''} {item.location}
                            </p>
                          )}
                          <div className="mt-2">
                            <span className="text-xl sm:text-2xl font-bold text-primary">
                              R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                            {item.quantity > 1 && (
                              <span className="text-sm text-gray-500 ml-2">
                                (R$ {(item.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} total)
                              </span>
                            )}
                          </div>
                        </div>

                        {}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                          {}
                          <div className="flex items-center gap-2">
                            <div className="flex items-center border border-gray-300 rounded-lg bg-white">
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="p-2 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                aria-label="Diminuir quantidade"
                              >
                                <Minus className="w-4 h-4 text-gray-600" />
                              </button>
                              <input
                                type="number"
                                min="1"
                                max={item.availableStock}
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                                className="w-14 text-center text-base font-semibold text-[#101828] border-0 focus:outline-none bg-transparent px-2"
                                aria-label="Quantidade"
                              />
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                disabled={item.quantity >= item.availableStock}
                                className="p-2 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                aria-label="Aumentar quantidade"
                              >
                                <Plus className="w-4 h-4 text-gray-600" />
                              </button>
                            </div>
                            <span className="text-xs text-gray-500 whitespace-nowrap">
                              {item.availableStock} disponível{item.availableStock !== 1 ? 'eis' : 'l'}
                            </span>
                          </div>

                          {}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveItem(item.id, item.title)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4 mr-1 sm:mr-2" />
                            <span className="hidden sm:inline">Remover</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {}
            <div className="lg:col-span-1">
              <Card className="bg-white sticky top-24">
                <CardContent className="p-6">
                  <h2 className="text-lg font-bold text-[#101828] mb-4">
                    Resumo do pedido
                  </h2>

                  {}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Produtos ({items.reduce((sum, item) => sum + item.quantity, 0)})</span>
                      <span>R$ {getSubtotal().toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-base font-semibold text-[#101828]">Total</span>
                      <span className="text-2xl font-bold text-primary">
                        R$ {getTotal().toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Em até 12x sem juros
                    </p>
                  </div>

                  {}
                  <Button
                    onClick={handleCheckout}
                    className="w-full bg-primary hover:bg-[#2E7A5A] text-white py-6 text-lg font-semibold mb-4"
                    disabled={items.length === 0}
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    Finalizar compra
                  </Button>

                  {}
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-600 mb-2">
                    <Lock className="w-4 h-4" />
                    <span>Compra 100% segura</span>
                  </div>

                  {}
                  <div className="space-y-2 pt-4 border-t border-gray-200">
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                      <Truck className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Frete grátis acima de R$ 500</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                      <Shield className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Produtos verificados e garantidos</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Entrega rápida e segura</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
