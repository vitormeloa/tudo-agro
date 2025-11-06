'use client'

import { FileText, Mail, Phone, MapPin, Download, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function ImprensaPage() {
  const pressReleases = [
    {
      date: '15 de Janeiro, 2024',
      title: 'TudoAgro Lança Nova Plataforma de Leilões Online',
      description: 'Plataforma inovadora conecta produtores e compradores em leilões digitais seguros.'
    },
    {
      date: '10 de Dezembro, 2023',
      title: 'TudoAgro Atinge Marco de R$ 2 Bilhões em Negócios',
      description: 'Plataforma celebra crescimento exponencial no mercado agropecuário brasileiro.'
    },
    {
      date: '05 de Novembro, 2023',
      title: 'Eduardo Costa Assina Como Embaixador do TudoAgro',
      description: 'Cantor e produtor rural se une à plataforma para promover o agronegócio.'
    }
  ]

  const mediaKit = [
    {
      icon: FileText,
      title: 'Logo e Marca',
      description: 'Baixe os logos em diferentes formatos e tamanhos'
    },
    {
      icon: FileText,
      title: 'Fotos Institucionais',
      description: 'Biblioteca de imagens para uso em matérias'
    },
    {
      icon: FileText,
      title: 'Press Kit Completo',
      description: 'Informações sobre a empresa, estatísticas e histórico'
    }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 via-emerald-600 to-emerald-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Imprensa</h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Notícias, recursos e informações para jornalistas e veículos de comunicação
            </p>
          </div>
        </div>
      </section>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Contact Section */}
        <section className="mb-16">
          <Card className="border-2 border-emerald-200 bg-emerald-50">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-[#101828] mb-6">Contato para Imprensa</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="bg-emerald-600 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#101828] mb-1">E-mail</h3>
                    <a href="mailto:imprensa@tudoagro.com" className="text-emerald-600 hover:underline">
                      imprensa@tudoagro.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-emerald-600 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#101828] mb-1">Telefone</h3>
                    <a href="tel:+5511999999999" className="text-emerald-600 hover:underline">
                      (11) 99999-9999
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Press Releases Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#101828] mb-8">Últimas Notícias</h2>
          <div className="space-y-6">
            {pressReleases.map((release, index) => (
              <Card key={index} className="border-2 border-gray-200 hover:border-emerald-500 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-100 p-3 rounded-lg">
                      <Calendar className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm text-gray-500">{release.date}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-[#101828] mb-2">{release.title}</h3>
                      <p className="text-gray-600">{release.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Media Kit Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#101828] mb-8">Material para Download</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {mediaKit.map((item, index) => (
              <Card key={index} className="border-2 border-gray-200 hover:border-emerald-500 transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#101828] mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                  <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                    <Download className="w-4 h-4 mr-2" />
                    Baixar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section className="bg-gradient-to-r from-emerald-50 to-emerald-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-[#101828] mb-4">Sobre o TudoAgro</h2>
          <p className="text-gray-600 mb-4">
            O TudoAgro é a maior plataforma de negócios do agronegócio brasileiro, conectando produtores e compradores 
            através de um ecossistema completo que inclui marketplace de produtos e animais, leilões online, treinamentos 
            e inteligência artificial especializada no setor.
          </p>
          <p className="text-gray-600">
            Fundada em 2023, a plataforma já facilitou mais de R$ 2 bilhões em negócios e conecta milhares de usuários 
            em todo o território nacional.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  )
}
