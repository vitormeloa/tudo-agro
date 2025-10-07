'use client'

import Link from 'next/link'
import { Shield, Award, Users, TrendingUp, Heart, Target, Eye, CheckCircle, Star, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function SobrePage() {
  const stats = [
    { number: "50k+", label: "Animais Vendidos", icon: TrendingUp },
    { number: "2.5k+", label: "Fazendas Cadastradas", icon: Users },
    { number: "R$ 2.8B", label: "Volume Negociado", icon: Award },
    { number: "98%", label: "Satisfação", icon: Heart }
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
      name: "João Silva",
      role: "CEO & Fundador",
      description: "25 anos de experiência no agronegócio",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Maria Santos",
      role: "CTO",
      description: "Especialista em tecnologia para o campo",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Carlos Oliveira",
      role: "Diretor Comercial",
      description: "Expert em leilões e negociações rurais",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
    }
  ]

  const testimonials = [
    {
      name: "Roberto Fazenda",
      role: "Fazenda Boa Vista - GO",
      content: "O AgroMarket revolucionou a forma como vendemos nossos animais. Conseguimos alcançar compradores de todo o Brasil e aumentamos nossa receita em 40%.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Ana Costa",
      role: "Haras Três Corações - MG",
      content: "A plataforma é muito segura e fácil de usar. Já participei de vários leilões e sempre tive uma experiência excelente. Recomendo para todos.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Pedro Almeida",
      role: "Fazenda Pantanal - MT",
      content: "Encontrei os melhores reprodutores para meu rebanho através do AgroMarket. A qualidade dos animais e o suporte da equipe são excepcionais.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    }
  ]

  return (
    <div className="min-h-screen bg-[#F7F6F2]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-[#1E4D2B]">
                AgroMarket
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-[#2B2E2B] hover:text-[#C89F45] transition-colors duration-300">Início</Link>
              <Link href="/catalogo" className="text-[#2B2E2B] hover:text-[#C89F45] transition-colors duration-300">Catálogo</Link>
              <Link href="/leiloes" className="text-[#2B2E2B] hover:text-[#C89F45] transition-colors duration-300">Leilões</Link>
              <Link href="/vender" className="text-[#2B2E2B] hover:text-[#C89F45] transition-colors duration-300">Vender</Link>
              <Link href="/sobre" className="text-[#C89F45] font-semibold">Sobre</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="outline" className="border-[#1E4D2B] text-[#1E4D2B] hover:bg-[#1E4D2B] hover:text-white">
                  Entrar
                </Button>
              </Link>
              <Link href="/cadastro">
                <Button className="bg-[#1E4D2B] hover:bg-[#163B20] text-white">
                  Cadastrar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1E4D2B] to-[#2F6C3F] text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
            Sobre o AgroMarket
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-[#E0E0E0] max-w-3xl mx-auto">
            Conectando o agronegócio brasileiro através da tecnologia, segurança e transparência
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[#1E4D2B]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-[#1E4D2B]" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-[#1E4D2B] mb-2">{stat.number}</div>
                <div className="text-[#6E7D5B] font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-[#FFFDF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2B2E2B] mb-6">
                Nossa Missão
              </h2>
              <p className="text-xl text-[#6E7D5B] mb-6 leading-relaxed">
                Democratizar o acesso ao mercado agropecuário brasileiro, conectando produtores rurais de todo o país através de uma plataforma segura, transparente e tecnológica.
              </p>
              <p className="text-lg text-[#6E7D5B] mb-8 leading-relaxed">
                Acreditamos que a tecnologia pode transformar o agronegócio, tornando as negociações mais eficientes, seguras e acessíveis para produtores de todos os portes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center">
                  <Target className="w-6 h-6 text-[#C89F45] mr-3" />
                  <span className="text-[#2B2E2B] font-semibold">Missão</span>
                </div>
                <div className="flex items-center">
                  <Eye className="w-6 h-6 text-[#C89F45] mr-3" />
                  <span className="text-[#2B2E2B] font-semibold">Visão</span>
                </div>
                <div className="flex items-center">
                  <Heart className="w-6 h-6 text-[#C89F45] mr-3" />
                  <span className="text-[#2B2E2B] font-semibold">Valores</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&h=400&fit=crop" 
                alt="Fazenda brasileira" 
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#C89F45] text-white p-6 rounded-xl shadow-xl">
                <div className="text-2xl font-bold">2019</div>
                <div className="text-sm">Fundação</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2B2E2B] mb-4">
              Nossos Valores
            </h2>
            <p className="text-xl text-[#6E7D5B] max-w-2xl mx-auto">
              Princípios que guiam todas as nossas decisões e ações
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-[#1E4D2B]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-[#1E4D2B]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2B2E2B] mb-4">{value.title}</h3>
                  <p className="text-[#6E7D5B] leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-[#FFFDF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2B2E2B] mb-4">
              Nossa Equipe
            </h2>
            <p className="text-xl text-[#6E7D5B] max-w-2xl mx-auto">
              Profissionais experientes dedicados ao sucesso do agronegócio brasileiro
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0">
                <CardContent className="p-8">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-6 object-cover"
                  />
                  <h3 className="text-xl font-bold text-[#2B2E2B] mb-2">{member.name}</h3>
                  <Badge className="bg-[#C89F45] text-white mb-4">{member.role}</Badge>
                  <p className="text-[#6E7D5B]">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2B2E2B] mb-4">
              O que nossos clientes dizem
            </h2>
            <p className="text-xl text-[#6E7D5B] max-w-2xl mx-auto">
              Depoimentos reais de produtores que confiam no AgroMarket
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-[#F1C40F] fill-current" />
                    ))}
                  </div>
                  <p className="text-[#6E7D5B] mb-6 italic leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <div className="font-semibold text-[#2B2E2B]">{testimonial.name}</div>
                      <div className="text-sm text-[#6E7D5B] flex items-center">
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
      <section className="py-16 bg-[#FFFDF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2B2E2B] mb-4">
              Nossa História
            </h2>
            <p className="text-xl text-[#6E7D5B] max-w-2xl mx-auto">
              A jornada que nos trouxe até aqui
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-[#C89F45] rounded-full mr-6"></div>
              <div className="flex-1 bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-[#2B2E2B]">2019 - Fundação</h3>
                  <Badge className="bg-[#1E4D2B] text-white">Início</Badge>
                </div>
                <p className="text-[#6E7D5B]">
                  Nascimento da ideia de conectar produtores rurais através da tecnologia. Primeiros estudos de mercado e desenvolvimento do conceito.
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-4 h-4 bg-[#C89F45] rounded-full mr-6"></div>
              <div className="flex-1 bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-[#2B2E2B]">2020 - Lançamento</h3>
                  <Badge className="bg-[#C89F45] text-white">Marco</Badge>
                </div>
                <p className="text-[#6E7D5B]">
                  Lançamento oficial da plataforma com as primeiras fazendas cadastradas. Início das operações em Goiás e Minas Gerais.
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-4 h-4 bg-[#C89F45] rounded-full mr-6"></div>
              <div className="flex-1 bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-[#2B2E2B]">2021 - Expansão</h3>
                  <Badge className="bg-[#3D9970] text-white">Crescimento</Badge>
                </div>
                <p className="text-[#6E7D5B]">
                  Expansão para todo o território nacional. Implementação do sistema de leilões online e parcerias com grandes fazendas.
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-4 h-4 bg-[#C89F45] rounded-full mr-6"></div>
              <div className="flex-1 bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-[#2B2E2B]">2024 - Liderança</h3>
                  <Badge className="bg-[#C89F45] text-white">Presente</Badge>
                </div>
                <p className="text-[#6E7D5B]">
                  Consolidação como a maior plataforma de negócios agropecuários do Brasil, com mais de 50 mil animais vendidos e R$ 2,8 bilhões em volume negociado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-[#F6E3B4] to-[#8A5A32]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#5E3C1B] mb-6">
            Faça parte da nossa história
          </h2>
          <p className="text-xl text-[#5E3C1B]/80 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de produtores que já transformaram seus negócios com o AgroMarket
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/cadastro">
              <Button className="bg-[#1E4D2B] hover:bg-[#163B20] text-white px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                <Users className="w-5 h-5 mr-2" />
                Criar Conta Gratuita
              </Button>
            </Link>
            <Link href="/catalogo">
              <Button className="bg-transparent border-2 border-[#1E4D2B] text-[#5E3C1B] hover:bg-[#1E4D2B] hover:text-white px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                <Eye className="w-5 h-5 mr-2" />
                Explorar Catálogo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#4A3218] text-[#F7F6F2] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-[#C89F45] mb-4">AgroMarket</h3>
              <p className="text-[#F7F6F2]/80 mb-4">
                A maior plataforma de negócios do agronegócio brasileiro.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-[#C89F45] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">f</span>
                </div>
                <div className="w-8 h-8 bg-[#C89F45] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">i</span>
                </div>
                <div className="w-8 h-8 bg-[#C89F45] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">t</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-[#C89F45]">Categorias</h4>
              <ul className="space-y-2">
                <li><Link href="/catalogo?categoria=gado-corte" className="hover:text-[#C89F45] transition-colors duration-300">Gado de Corte</Link></li>
                <li><Link href="/catalogo?categoria=gado-leite" className="hover:text-[#C89F45] transition-colors duration-300">Gado de Leite</Link></li>
                <li><Link href="/catalogo?categoria=cavalos" className="hover:text-[#C89F45] transition-colors duration-300">Cavalos</Link></li>
                <li><Link href="/catalogo?categoria=semen" className="hover:text-[#C89F45] transition-colors duration-300">Sêmen</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-[#C89F45]">Empresa</h4>
              <ul className="space-y-2">
                <li><Link href="/sobre" className="hover:text-[#C89F45] transition-colors duration-300">Sobre Nós</Link></li>
                <li><Link href="/contato" className="hover:text-[#C89F45] transition-colors duration-300">Contato</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-[#C89F45]">Suporte</h4>
              <ul className="space-y-2">
                <li><Link href="/ajuda" className="hover:text-[#C89F45] transition-colors duration-300">Central de Ajuda</Link></li>
                <li><Link href="/termos" className="hover:text-[#C89F45] transition-colors duration-300">Termos de Uso</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#C89F45]/20 mt-8 pt-8 text-center">
            <p className="text-[#F7F6F2]/60">
              © 2024 AgroMarket. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}