'use client'

import { ShoppingCart, Shield, CreditCard, Truck, CheckCircle, Search, Filter, Heart, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function ComoComprarPage() {
  const steps = [
    {
      icon: Search,
      title: '1. Navegue e Encontre',
      description: 'Explore nosso catálogo de animais, produtos ou leilões. Use os filtros para encontrar exatamente o que procura.'
    },
    {
      icon: Heart,
      title: '2. Favoritar Itens',
      description: 'Salve os itens que te interessam para acompanhar preços e disponibilidade.'
    },
    {
      icon: MessageSquare,
      title: '3. Entre em Contato',
      description: 'Entre em contato com o vendedor através do chat ou sistema de mensagens para tirar dúvidas.'
    },
    {
      icon: CreditCard,
      title: '4. Faça a Compra',
      description: 'Negocie diretamente com o vendedor ou participe de leilões. Utilize nosso sistema seguro de pagamento.'
    },
    {
      icon: Truck,
      title: '5. Receba seu Produto',
      description: 'Acompanhe o envio e receba seu produto com segurança em sua propriedade.'
    },
    {
      icon: CheckCircle,
      title: '6. Avalie e Confirme',
      description: 'Confirme o recebimento e avalie sua experiência de compra para ajudar outros compradores.'
    }
  ]

  const benefits = [
    {
      icon: Shield,
      title: 'Segurança Total',
      description: 'Transações protegidas com verificação KYC e sistema de escrow'
    },
    {
      icon: CheckCircle,
      title: 'Verificação de Qualidade',
      description: 'Todos os produtos e animais passam por verificação de qualidade'
    },
    {
      icon: CreditCard,
      title: 'Pagamento Seguro',
      description: 'Múltiplas formas de pagamento com segurança garantida'
    }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 via-emerald-600 to-emerald-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Como Comprar</h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Guia completo para realizar suas compras no TudoAgro com segurança e facilidade
            </p>
          </div>
        </div>
      </section>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Steps Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#101828] mb-8 text-center">Passo a Passo</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <Card key={index} className="border-2 border-gray-200 hover:border-emerald-500 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-emerald-100 p-3 rounded-lg mr-4">
                      <step.icon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#101828]">{step.title}</h3>
                  </div>
                  <p className="text-gray-600">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#101828] mb-8 text-center">Por que Comprar no TudoAgro?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center border-2 border-gray-200">
                <CardContent className="p-8">
                  <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#101828] mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-emerald-50 to-emerald-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-[#101828] mb-4">Pronto para Começar?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Explore nosso catálogo e encontre os melhores produtos e animais para seu negócio
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-emerald-600 hover:bg-[#2E7A5A] text-white">
              <a href="/catalogo">Ver Catálogo de Animais</a>
            </Button>
            <Button asChild variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
              <a href="/produtos">Ver Produtos</a>
            </Button>
            <Button asChild variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
              <a href="/leiloes">Ver Leilões</a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
