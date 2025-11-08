'use client'

import { Briefcase, MapPin, Clock, Users, Target, Zap, Heart, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function CarreirasPage() {
  const openPositions = [
  ]

  const benefits = [
    {
      icon: Zap,
      title: 'Ambiente Dinâmico',
      description: 'Trabalhe em um ambiente inovador com as melhores tecnologias'
    },
    {
      icon: Heart,
      title: 'Plano de Saúde',
      description: 'Plano de saúde completo para você e sua família'
    },
    {
      icon: Award,
      title: 'Desenvolvimento Profissional',
      description: 'Oportunidades de crescimento e capacitação contínua'
    },
    {
      icon: Users,
      title: 'Cultura Colaborativa',
      description: 'Faça parte de uma equipe unida e apaixonada pelo agro'
    }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      {}
      <section className="bg-gradient-to-r from-primary via-primary to-primary/90 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Carreiras</h1>
            <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto">
              Faça parte da equipe que está transformando o agronegócio brasileiro
            </p>
          </div>
        </div>
      </section>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {}
        <section className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-[#101828] mb-4">Por que Trabalhar no TudoAgro?</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Somos uma plataforma em crescimento que conecta tecnologia e agronegócio. 
            Procuramos pessoas apaixonadas por inovação e dispostas a fazer a diferença no campo brasileiro.
          </p>
        </section>

        {}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#101828] mb-8 text-center">Benefícios</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center border-2 border-gray-200">
                <CardContent className="p-6">
                  <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#101828] mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#101828] mb-8 text-center">Vagas Abertas</h2>
          <div className="space-y-4">
            {openPositions.map((position, index) => (
              <Card key={index} className="border-2 border-gray-200 hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-[#101828]">{position.title}</h3>
                        <Badge variant="outline" className="border-primary text-primary">
                          {position.department}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-3">{position.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {position.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {position.type}
                        </div>
                      </div>
                    </div>
                    <Button className="bg-primary hover:bg-[#2E7A5A] text-white whitespace-nowrap">
                      Candidatar-se
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {}
        <section className="bg-gradient-to-r from-primary/5 to-primary/5 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-[#101828] mb-4">Não Encontrou uma Vaga Adequada?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Envie seu currículo para nosso banco de talentos. Quando surgir uma oportunidade compatível, entraremos em contato.
          </p>
          <Button className="bg-primary hover:bg-[#2E7A5A] text-white">
            Enviar Currículo
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  )
}
