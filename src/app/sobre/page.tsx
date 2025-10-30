'use client'

import Link from 'next/link'
import { Shield, Award, Users, TrendingUp, Heart, Target, Eye, CheckCircle, Star, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function SobrePage() {
  const stats = [
    { number: "50k+", label: "Animais Vendidos", icon: TrendingUp },
    { number: "+127k", label: "Produtos Vendidos", icon: Users },
    { number: "R$ 2.8B", label: "em Negócios Fechados", icon: Award },
    { number: "98%", label: "de Satisfação", icon: Heart }
  ]

  const values = [
    {
      icon: Shield,
      title: "Segurança",
      description: "Transações protegidas com verificação KYC rural completa e sistema de escrow para garantir a segurança de compradores e vendedores."
    },
    {
      icon: Heart,
      title: "Transparência",
      description: "Informações claras sobre todos os animais, documentação completa e histórico de saúde disponível para consulta."
    },
    {
      icon: Users,
      title: "Comunidade",
      description: "Conectamos produtores rurais de todo o Brasil, criando uma rede forte e colaborativa no agronegócio."
    },
    {
      icon: Award,
      title: "Excelência",
      description: "Padrões rigorosos de qualidade em todos os processos, desde o cadastro até a finalização das negociações."
    }
  ]

  const team = [
    {
      name: "Eduardo Costa",
      role: "Fundador & Embaixador",
      description: "Cantor e produtor rural apaixonado",
      image: "/fotos/sobre/edu.jpg"
    },
    {
      name: "Dr Bernardo Guimarães",
      role: "Fundador & Embaixador",
      description: "Referência em genética bovina",
      image: "/fotos/sobre/bernardo.jpeg"
    },
    {
      name: "ExpandTech",
      role: "Head de Tecnologia",
      description: "Inovação e tecnologia para o agro",
      image: "/fotos/sobre/expand.jpeg"
    }
  ]

  const testimonials = [
    {
      name: "Leonardo",
      role: "Fazenda Talismã – GO",
      content: "Com o TudoAgro, vendi meu lote de gado em tempo recorde. A estrutura é segura, rápida e me deu muito mais controle sobre as negociações.",
      rating: 5,
      image: "/fotos/depoimentos/leonardo.jpeg"
    },
    {
      name: "Gusttavo Lima",
      role: "Fazenda Balada – MG",
      content: "Uso o TudoAgro para tudo — de suplementos a leilões. É o marketplace mais completo que já vi para o agro brasileiro.",
      rating: 5,
      image: "/fotos/depoimentos/gustavo-lima.jpeg"
    },
    {
      name: "Amado Batista",
      role: "Fazenda AB – MT",
      content: "Sempre fui apaixonado pelo campo. No TudoAgro encontrei uma plataforma que respeita o produtor e facilita de verdade a vida de quem vive da terra.",
      rating: 5,
      image: "/fotos/depoimentos/amado-batista.jpeg"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-700"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
            Sobre o TudoAgro
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
            Conectando o agronegócio brasileiro através da tecnologia, segurança e transparência
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-emerald-600" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Nossa Missão
              </h2>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                  Conectar o agro brasileiro à nova era digital, reunindo em um só lugar quem compra e quem vende — de animais de alto valor genético a produtos essenciais para o campo.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Acreditamos que a tecnologia pode transformar o agronegócio, tornando negociações mais acessíveis, seguras e eficientes para produtores, criadores e marcas de todos os portes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center">
                  <Target className="w-6 h-6 text-emerald-600 mr-3" />
                  <span className="text-gray-900 font-semibold">Missão</span>
                </div>
                <div className="flex items-center">
                  <Eye className="w-6 h-6 text-emerald-600 mr-3" />
                  <span className="text-gray-900 font-semibold">Visão</span>
                </div>
                <div className="flex items-center">
                  <Heart className="w-6 h-6 text-emerald-600 mr-3" />
                  <span className="text-gray-900 font-semibold">Valores</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/fotos/sobre/edu-secao-nossa.jpeg"
                alt="Fazenda brasileira" 
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-emerald-600 text-white p-6 rounded-xl shadow-xl">
                <div className="text-2xl font-bold">2025</div>
                <div className="text-sm">Fundação</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nossos Valores
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Princípios que guiam todas as nossas decisões e ações
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Time TudoAgro
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                União de tradição rural com inovação digital
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 bg-white animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-8">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-6 object-cover"
                  />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <Badge className="bg-emerald-600 text-white mb-4">{member.role}</Badge>
                  <p className="text-gray-600">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              O que nossos clientes dizem
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Depoimentos reais de produtores que confiam no TudoAgro
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nossa História
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A jornada que nos trouxe até aqui
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-center animate-fade-in-up">
              <div className="w-4 h-4 bg-emerald-600 rounded-full mr-6"></div>
              <div className="flex-1 bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">2019 - Fundação</h3>
                  <Badge className="bg-emerald-600 text-white">Início</Badge>
                </div>
                <p className="text-gray-600">
                  Nascimento da ideia de conectar produtores rurais através da tecnologia. Primeiros estudos de mercado e desenvolvimento do conceito.
                </p>
              </div>
            </div>

            <div className="flex items-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-4 h-4 bg-emerald-600 rounded-full mr-6"></div>
              <div className="flex-1 bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">2020 - Lançamento</h3>
                  <Badge className="bg-amber-600 text-white">Marco</Badge>
                </div>
                <p className="text-gray-600">
                  Lançamento oficial da plataforma com as primeiras fazendas cadastradas. Início das operações em Goiás e Minas Gerais.
                </p>
              </div>
            </div>

            <div className="flex items-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-4 h-4 bg-emerald-600 rounded-full mr-6"></div>
              <div className="flex-1 bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">2021 - Expansão</h3>
                  <Badge className="bg-green-600 text-white">Crescimento</Badge>
                </div>
                <p className="text-gray-600">
                  Expansão para todo o território nacional. Implementação do sistema de leilões online e parcerias com grandes fazendas.
                </p>
              </div>
            </div>

            <div className="flex items-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="w-4 h-4 bg-emerald-600 rounded-full mr-6"></div>
              <div className="flex-1 bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">2024 - Liderança</h3>
                  <Badge className="bg-emerald-600 text-white">Presente</Badge>
                </div>
                <p className="text-gray-600">
                  Consolidação como a maior plataforma de negócios agropecuários do Brasil, com mais de 50 mil animais vendidos e R$ 2,8 bilhões em volume negociado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-green-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Faça parte da nossa história
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Conecte-se ao agro do futuro. Cadastre-se gratuitamente e comece a vender ou comprar com tecnologia, segurança e alcance nacional.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/cadastro">
              <Button className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                <Users className="w-5 h-5 mr-2" />
                Criar Conta Gratuita
              </Button>
            </Link>
            <Link href="/catalogo">
              <Button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-emerald-600 px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                <Eye className="w-5 h-5 mr-2" />
                Explorar Catálogo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}