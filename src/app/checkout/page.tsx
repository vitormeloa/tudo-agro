'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/use-toast'
import { 
  ArrowLeft,
  CreditCard,
  MapPin,
  Truck,
  Lock,
  Shield,
  CheckCircle,
  Plus,
  Minus,
  Trash2
} from 'lucide-react'
import { calculateFreight, formatCEP, type FreightResult } from '@/lib/freight-calculator'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, updateQuantity, removeItem, getSubtotal, getTotal, clearCart } = useCart()
  const { user } = useAuth()
  const { toast } = useToast()
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    cep: '',
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    paymentMethod: '',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: ''
  })
  
  const [isProcessing, setIsProcessing] = useState(false)
  const [freightResult, setFreightResult] = useState<FreightResult | null>(null)
  const [isCalculatingFreight, setIsCalculatingFreight] = useState(false)

  // Preencher dados do usuário se estiver logado
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        email: user.email || '',
        fullName: user.name || ''
      }))
    }
  }, [user])

  // Calcular frete quando CEP for preenchido
  useEffect(() => {
    if (formData.cep.length === 8 && items.length > 0) {
      setIsCalculatingFreight(true)
      
      // Usar a localização do primeiro item para calcular frete
      const firstItem = items[0]
      setTimeout(() => {
        const result = calculateFreight(formData.cep, firstItem.location)
        setFreightResult(result)
        setIsCalculatingFreight(false)
      }, 500)
    } else {
      setFreightResult(null)
    }
  }, [formData.cep, items])

  // Redirecionar se carrinho vazio
  useEffect(() => {
    if (items.length === 0) {
      toast({
        title: "Carrinho vazio",
        description: "Adicione itens ao carrinho antes de finalizar a compra.",
        variant: "destructive"
      })
      router.push('/produtos')
    }
  }, [items.length, router, toast])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      const item = items.find(i => i.id === id)
      if (item) {
        removeItem(id)
        toast({
          title: "Item removido",
          description: `${item.title} foi removido do carrinho.`
        })
      }
      return
    }
    updateQuantity(id, newQuantity)
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    setFormData(prev => ({ ...prev, cardNumber: formatted }))
  }

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value)
    setFormData(prev => ({ ...prev, cardExpiry: formatted }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para finalizar a compra.",
        variant: "destructive"
      })
      router.push('/login')
      return
    }

    // Validações básicas
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast({
        title: "Dados incompletos",
        description: "Preencha todos os dados pessoais.",
        variant: "destructive"
      })
      return
    }

    if (!formData.cep || !formData.address || !formData.number || !formData.city || !formData.state) {
      toast({
        title: "Endereço incompleto",
        description: "Preencha todos os dados de entrega.",
        variant: "destructive"
      })
      return
    }

    if (!formData.paymentMethod) {
      toast({
        title: "Forma de pagamento",
        description: "Selecione uma forma de pagamento.",
        variant: "destructive"
      })
      return
    }

    if (formData.paymentMethod === 'credit' || formData.paymentMethod === 'debit') {
      if (!formData.cardNumber || !formData.cardName || !formData.cardExpiry || !formData.cardCvv) {
        toast({
          title: "Dados do cartão",
          description: "Preencha todos os dados do cartão.",
          variant: "destructive"
        })
        return
      }
    }

    setIsProcessing(true)

    // Simular processamento
    setTimeout(() => {
      setIsProcessing(false)
      toast({
        title: "Pedido realizado!",
        description: "Seu pedido foi confirmado e você receberá um e-mail com os detalhes.",
      })
      clearCart()
      router.push('/produtos')
    }, 2000)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#101828] mb-4">Carrinho vazio</h1>
            <p className="text-gray-600 mb-8">Adicione itens ao carrinho antes de finalizar a compra.</p>
            <Link href="/produtos">
              <Button>Ver Produtos</Button>
            </Link>
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
        {/* Header */}
        <div className="mb-8">
          <Link href="/carrinho" className="inline-flex items-center text-gray-600 hover:text-primary mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao carrinho
          </Link>
          <h1 className="text-3xl font-bold text-[#101828]">Finalizar Compra</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Dados Pessoais */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-primary" />
                    Dados Pessoais
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Nome Completo *</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefone *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Endereço de Entrega */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Truck className="w-5 h-5 mr-2 text-primary" />
                    Endereço de Entrega
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="cep">CEP *</Label>
                      <Input
                        id="cep"
                        name="cep"
                        value={formatCEP(formData.cep)}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '')
                          if (value.length <= 8) {
                            setFormData(prev => ({ ...prev, cep: value }))
                          }
                        }}
                        required
                        placeholder="00000-000"
                        maxLength={9}
                      />
                      {freightResult && (
                        <p className="text-xs text-primary mt-1">{freightResult.formattedDelivery}</p>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Endereço *</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        placeholder="Rua, Avenida, etc."
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="number">Número *</Label>
                      <Input
                        id="number"
                        name="number"
                        value={formData.number}
                        onChange={handleInputChange}
                        required
                        placeholder="123"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="complement">Complemento</Label>
                      <Input
                        id="complement"
                        name="complement"
                        value={formData.complement}
                        onChange={handleInputChange}
                        placeholder="Apto, Bloco, etc."
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="neighborhood">Bairro *</Label>
                      <Input
                        id="neighborhood"
                        name="neighborhood"
                        value={formData.neighborhood}
                        onChange={handleInputChange}
                        required
                        placeholder="Bairro"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">Cidade *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        placeholder="Cidade"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">Estado *</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        placeholder="UF"
                        maxLength={2}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Forma de Pagamento */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-primary" />
                    Forma de Pagamento
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="paymentMethod">Selecione a forma de pagamento *</Label>
                    <Select
                      value={formData.paymentMethod}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, paymentMethod: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="credit">Cartão de Crédito</SelectItem>
                        <SelectItem value="debit">Cartão de Débito</SelectItem>
                        <SelectItem value="pix">PIX</SelectItem>
                        <SelectItem value="boleto">Boleto Bancário</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {(formData.paymentMethod === 'credit' || formData.paymentMethod === 'debit') && (
                    <div className="space-y-4 pt-4 border-t">
                      <div>
                        <Label htmlFor="cardNumber">Número do Cartão *</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleCardNumberChange}
                          required
                          placeholder="0000 0000 0000 0000"
                          maxLength={19}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardName">Nome no Cartão *</Label>
                        <Input
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          required
                          placeholder="NOME COMO ESTÁ NO CARTÃO"
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="cardExpiry">Validade *</Label>
                          <Input
                            id="cardExpiry"
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleExpiryChange}
                            required
                            placeholder="MM/AA"
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardCvv">CVV *</Label>
                          <Input
                            id="cardCvv"
                            name="cardCvv"
                            value={formData.cardCvv}
                            onChange={handleInputChange}
                            required
                            placeholder="123"
                            maxLength={4}
                            type="password"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod === 'pix' && (
                    <div className="pt-4 border-t">
                      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                        <p className="text-sm text-gray-700 mb-2">
                          <strong>QR Code PIX será gerado após confirmar o pedido.</strong>
                        </p>
                        <p className="text-xs text-gray-600">
                          Você receberá o código PIX por e-mail e terá 30 minutos para realizar o pagamento.
                        </p>
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod === 'boleto' && (
                    <div className="pt-4 border-t">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm text-gray-700 mb-2">
                          <strong>Boleto será gerado após confirmar o pedido.</strong>
                        </p>
                        <p className="text-xs text-gray-600">
                          Você receberá o boleto por e-mail e terá 3 dias úteis para realizar o pagamento.
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items List */}
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3 pb-3 border-b last:border-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-[#101828] truncate">
                            {item.title}
                          </h4>
                          <p className="text-xs text-gray-500">{item.seller}</p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="h-7 w-7 p-0"
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="text-sm font-medium w-8 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="h-7 w-7 p-0"
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                disabled={item.quantity >= item.availableStock}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                            <span className="text-sm font-bold text-primary">
                              R$ {(item.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="space-y-2 pt-4 border-t">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-[#101828]">R$ {getSubtotal().toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Frete</span>
                      {isCalculatingFreight ? (
                        <span className="text-gray-500">Calculando...</span>
                      ) : freightResult ? (
                        <div className="text-right">
                          <span className="text-[#101828]">R$ {freightResult.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                          <div className="text-xs text-gray-500 mt-1">{freightResult.formattedDelivery}</div>
                        </div>
                      ) : (
                        <span className="text-gray-500">Informe o CEP</span>
                      )}
                    </div>
                    <div className="flex justify-between text-lg font-bold pt-2 border-t">
                      <span>Total</span>
                      <span className="text-primary">R$ {getTotal().toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                  </div>

                  {/* Security Badges */}
                  <div className="pt-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Lock className="w-4 h-4 text-primary" />
                      <span>Compra 100% segura</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Shield className="w-4 h-4 text-primary" />
                      <span>Seus dados estão protegidos</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-[#2E7A5A] text-white py-6 text-lg mt-4"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Processando...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Finalizar Pedido
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  )
}
