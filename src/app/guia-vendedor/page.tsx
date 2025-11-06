'use client'

import { Store, Camera, FileText, DollarSign, CheckCircle, Users, TrendingUp, Shield, Star, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function GuiaVendedorPage() {
  const steps = [
    {
      icon: FileText,
      title: '1. Crie seu Anúncio',
      description: 'Preencha todas as informações do produto ou animal: título, descrição detalhada, preço e localização.'
    },
    {
      icon: Camera,
      title: '2. Adicione Fotos de Qualidade',
      description: 'Fotos claras e bem tiradas aumentam significativamente as chances de venda. Use diferentes ângulos.'
    },
    {
      icon: DollarSign,
      title: '3. Defina um Preço Justo',
      description: 'Pesquise preços de mercado e defina um valor competitivo. Considere oferecer opções de pagamento flexíveis.'
    },
    {
      icon: MessageSquare,
      title: '4. Responda Rapidamente',
      description: 'Responda mensagens e perguntas dos compradores rapidamente. Comunicação eficiente fecha negócios.'
    },
    {
      icon: CheckCircle,
      title: '5. Complete a Venda',
      description: 'Após o acordo, processe o pagamento de forma segura e organize a entrega ou retirada do produto.'
    },
    {
      icon: Star,
      title: '6. Receba Avaliações',
      description: 'Entregue o produto conforme combinado e peça ao comprador para avaliar sua experiência.'
    }
  ]

  const tips = [
    {
      icon: Camera,
      title: 'Fotos Profissionais',
      description: 'Invista em boas fotos. Produtos bem fotografados vendem mais e mais rápido.',
      badge: 'Essencial'
    },
    {
      icon: FileText,
      title: 'Descrições Detalhadas',
      description: 'Seja específico nas descrições. Inclua todas as características relevantes do produto.',
      badge: 'Importante'
    },
    {
      icon: TrendingUp,
      title: 'Preços Competitivos',
      description: 'Pesquise o mercado e ajuste seus preços regularmente para manter competitividade.',
      badge: 'Estratégico'
    },
    {
      icon: Users,
      title: 'Atendimento ao Cliente',
      description: 'Seja cordial e profissional. Um bom atendimento gera vendas e avaliações positivas.',
      badge: 'Fundamental'
    }
  ]

  const benefits = [
    {
      icon: Shield,
      title: 'Proteção de Dados',
      description: 'Seus dados estão protegidos e suas transações são seguras'
    },
    {
      icon: Users,
      title: 'Grande Base de Compradores',
      description: 'Acesse milhares de compradores interessados em produtos agropecuários'
    },
    {
      icon: TrendingUp,
      title: 'Ferramentas de Marketing',
      description: 'Use ferramentas para destacar seus anúncios e aumentar a visibilidade'
    }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 via-emerald-600 to-emerald-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Guia do Vendedor</h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Aprenda como vender com sucesso na maior plataforma de agronegócio do Brasil
            </p>
          </div>
        </div>
      </section>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <section className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-[#101828] mb-4">Venda Mais e Melhor no TudoAgro</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Este guia contém tudo que você precisa saber para criar anúncios eficazes, atrair compradores 
            e fechar mais vendas na nossa plataforma.
          </p>
        </section>

        {/* Steps Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#101828] mb-8 text-center">Passo a Passo para Vender</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <Card key={index} className="border-2 border-gray-200 hover:border-emerald-500 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-emerald-100 p-3 rounded-lg mr-4">
                      <step.icon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#101828]">{step.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Tips Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#101828] mb-8 text-center">Dicas para Vender Mais</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {tips.map((tip, index) => (
              <Card key={index} className="border-2 border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="bg-emerald-100 p-3 rounded-lg mr-4">
                        <tip.icon className="w-6 h-6 text-emerald-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-[#101828]">{tip.title}</h3>
                    </div>
                    <Badge className="bg-emerald-600 text-white">{tip.badge}</Badge>
                  </div>
                  <p className="text-gray-600">{tip.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#101828] mb-8 text-center">Por que Vender no TudoAgro?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center border-2 border-gray-200">
                <CardContent className="p-6">
                  <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#101828] mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-emerald-50 to-emerald-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-[#101828] mb-4">Pronto para Começar a Vender?</h2>
          <p className="text-gray-600 mb-6">
            Cadastre-se gratuitamente e comece a vender seus produtos e animais hoje mesmo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-emerald-600 hover:bg-[#2E7A5A] text-white">
              <a href="/vender">Criar Anúncio</a>
            </Button>
            <Button asChild variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
              <a href="/contato">Falar com Vendas</a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
