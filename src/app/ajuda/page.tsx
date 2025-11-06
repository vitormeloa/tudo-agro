'use client'

import { useState } from 'react'
import { HelpCircle, Search, MessageSquare, Book, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function AjudaPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [openCategory, setOpenCategory] = useState<string | null>(null)

  const categories = [
    {
      id: 'compra',
      title: 'Como Comprar',
      icon: HelpCircle,
      articles: [
        { question: 'Como encontrar produtos ou animais?', answer: 'Use a barra de pesquisa no topo da página ou navegue pelas categorias. Você também pode usar os filtros para refinar sua busca.' },
        { question: 'Como participar de um leilão?', answer: 'Para participar de um leilão, você precisa estar cadastrado e logado. Acesse a página do leilão e clique em "Participar". Durante o leilão, você pode fazer lances.' },
        { question: 'Como entrar em contato com o vendedor?', answer: 'Na página do produto ou animal, você encontrará um botão "Entrar em Contato" que abrirá o chat ou sistema de mensagens.' }
      ]
    },
    {
      id: 'venda',
      title: 'Como Vender',
      icon: HelpCircle,
      articles: [
        { question: 'Como criar um anúncio?', answer: 'Acesse a seção "Vender" no menu principal, escolha se deseja anunciar um animal ou produto, preencha as informações solicitadas e publique seu anúncio.' },
        { question: 'Quais são as taxas?', answer: 'As taxas variam conforme o tipo de anúncio e plano escolhido. Consulte nossa página de preços ou entre em contato para mais informações.' },
        { question: 'Como receber o pagamento?', answer: 'Os pagamentos são processados de forma segura através de nossa plataforma. Você receberá o valor após a confirmação da entrega pelo comprador.' }
      ]
    },
    {
      id: 'conta',
      title: 'Minha Conta',
      icon: HelpCircle,
      articles: [
        { question: 'Como criar uma conta?', answer: 'Clique em "Cadastrar" no canto superior direito, preencha seus dados e confirme seu e-mail. É rápido e gratuito!' },
        { question: 'Esqueci minha senha', answer: 'Na página de login, clique em "Esqueci minha senha" e siga as instruções para redefinir sua senha por e-mail.' },
        { question: 'Como editar meu perfil?', answer: 'Acesse "Meu Perfil" no menu e clique em "Editar Perfil" para atualizar suas informações pessoais.' }
      ]
    },
    {
      id: 'seguranca',
      title: 'Segurança e Pagamento',
      icon: HelpCircle,
      articles: [
        { question: 'Como funciona o sistema de segurança?', answer: 'Utilizamos verificação KYC (Know Your Customer) e sistema de escrow para garantir transações seguras entre compradores e vendedores.' },
        { question: 'Quais formas de pagamento são aceitas?', answer: 'Aceitamos transferência bancária, PIX, cartão de crédito e outros métodos conforme combinado entre as partes.' },
        { question: 'E se houver problema com minha compra?', answer: 'Entre em contato conosco através da Central de Ajuda. Nossa equipe está pronta para resolver qualquer questão relacionada à sua compra.' }
      ]
    }
  ]

  const filteredCategories = categories.map(category => ({
    ...category,
    articles: category.articles.filter(article => 
      article.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.articles.length > 0)

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 via-emerald-600 to-emerald-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Central de Ajuda</h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Encontre respostas para suas dúvidas e aprenda a usar todas as funcionalidades da plataforma
            </p>
          </div>
        </div>
      </section>

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Section */}
        <section className="mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Buscar ajuda..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-lg border-2 border-gray-300 focus:border-emerald-500"
            />
          </div>
        </section>

        {/* Categories Section */}
        <section className="space-y-4">
          {filteredCategories.map((category) => (
            <Card key={category.id} className="border-2 border-gray-200">
              <CardContent className="p-0">
                <button
                  onClick={() => setOpenCategory(openCategory === category.id ? null : category.id)}
                  className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-emerald-100 p-3 rounded-lg">
                      <category.icon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-[#101828]">{category.title}</h2>
                  </div>
                  {openCategory === category.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                
                {openCategory === category.id && (
                  <div className="px-6 pb-6 space-y-4 border-t border-gray-200">
                    {category.articles.map((article, index) => (
                      <div key={index} className="pt-4">
                        <h3 className="font-semibold text-[#101828] mb-2">{article.question}</h3>
                        <p className="text-gray-600">{article.answer}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Contact Section */}
        <section className="mt-12 bg-gradient-to-r from-emerald-50 to-emerald-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-[#101828] mb-4">Não Encontrou o que Procurava?</h2>
          <p className="text-gray-600 mb-6">
            Nossa equipe está pronta para ajudar você. Entre em contato conosco!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-emerald-600 hover:bg-[#2E7A5A] text-white">
              <a href="/contato">Entrar em Contato</a>
            </Button>
            <Button asChild variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
              <a href="/faq">Ver FAQ Completo</a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
