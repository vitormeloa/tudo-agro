'use client'

import { ShoppingCart, Search, Filter, Heart, MessageSquare, CreditCard, Shield, CheckCircle, AlertCircle, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function GuiaCompradorPage() {
  const tips = [
    {
      icon: Search,
      title: 'Use Filtros Avançados',
      description: 'Aproveite os filtros de busca para encontrar exatamente o que procura. Filtre por localização, preço, categoria e outras características específicas.'
    },
    {
      icon: Shield,
      title: 'Verifique o Vendedor',
      description: 'Sempre verifique o perfil do vendedor, avaliações de outros compradores e histórico de vendas antes de fechar negócio.'
    },
    {
      icon: MessageSquare,
      title: 'Faça Perguntas',
      description: 'Não hesite em entrar em contato com o vendedor para esclarecer dúvidas sobre o produto, condições de entrega e forma de pagamento.'
    },
    {
      icon: CheckCircle,
      title: 'Revise os Detalhes',
      description: 'Leia atentamente todas as informações do anúncio, incluindo descrição, fotos, condições de venda e políticas de devolução.'
    },
    {
      icon: CreditCard,
      title: 'Use Pagamento Seguro',
      description: 'Prefira métodos de pagamento seguros oferecidos pela plataforma. Evite pagamentos antecipados sem garantias.'
    },
    {
      icon: Star,
      title: 'Avalie sua Experiência',
      description: 'Após receber o produto, avalie o vendedor e sua experiência. Isso ajuda outros compradores e melhora a comunidade.'
    }
  ]

  const warnings = [
    {
      icon: AlertCircle,
      title: 'Cuidado com Preços Muito Baixos',
      description: 'Se o preço parecer bom demais para ser verdade, investigue mais. Compare com preços de mercado antes de comprar.'
    },
    {
      icon: AlertCircle,
      title: 'Evite Pagamentos Fora da Plataforma',
      description: 'Pagamentos feitos fora da plataforma não têm proteção. Sempre use os métodos seguros oferecidos pelo TudoAgro.'
    },
    {
      icon: AlertCircle,
      title: 'Desconfie de Vendedores Sem Histórico',
      description: 'Vendedores novos sem avaliações podem ser legítimos, mas peça mais informações e documentos antes de negociar.'
    }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Guia do Comprador</h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Tudo que você precisa saber para comprar com segurança e confiança no TudoAgro
            </p>
          </div>
        </div>
      </section>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <section className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Bem-vindo ao TudoAgro!</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Este guia foi criado para ajudá-lo a navegar pela plataforma e fazer compras inteligentes 
            e seguras. Siga nossas dicas e aproveite ao máximo sua experiência de compra.
          </p>
        </section>

        {/* Process Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Processo de Compra</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2 border-gray-200">
              <CardContent className="p-6 text-center">
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-emerald-600">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Buscar</h3>
                <p className="text-gray-600">Use a busca ou navegue pelas categorias para encontrar o que precisa</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-gray-200">
              <CardContent className="p-6 text-center">
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-emerald-600">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Negociar</h3>
                <p className="text-gray-600">Entre em contato com o vendedor e negocie os detalhes da compra</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-gray-200">
              <CardContent className="p-6 text-center">
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-emerald-600">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Comprar</h3>
                <p className="text-gray-600">Finalize o pagamento e receba seu produto com segurança</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Tips Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Dicas para Compras Seguras</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tips.map((tip, index) => (
              <Card key={index} className="border-2 border-gray-200 hover:border-emerald-500 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-emerald-100 p-3 rounded-lg mr-4">
                      <tip.icon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{tip.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">{tip.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Warnings Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Atenção: Cuidados Importantes</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {warnings.map((warning, index) => (
              <Card key={index} className="border-2 border-amber-200 bg-amber-50">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-amber-100 p-3 rounded-lg mr-4">
                      <warning.icon className="w-6 h-6 text-amber-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{warning.title}</h3>
                  </div>
                  <p className="text-gray-700 text-sm">{warning.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Support Section */}
        <section className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Precisa de Ajuda?</h2>
          <p className="text-gray-600 mb-6">
            Nossa equipe está sempre pronta para ajudar você em suas compras
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <a href="/contato">Entrar em Contato</a>
            </Button>
            <Button asChild variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
              <a href="/ajuda">Central de Ajuda</a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
