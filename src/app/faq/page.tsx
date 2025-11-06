'use client'

import { useState } from 'react'
import { HelpCircle, ChevronDown, ChevronUp, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [openQuestion, setOpenQuestion] = useState<number | null>(null)

  const faqs = [
    {
      category: 'Geral',
      questions: [
        {
          question: 'O que é o TudoAgro?',
          answer: 'O TudoAgro é a maior plataforma de negócios do agronegócio brasileiro, conectando produtores e compradores através de um marketplace completo que inclui venda de animais, produtos agropecuários, leilões online e muito mais.'
        },
        {
          question: 'Como posso me cadastrar?',
          answer: 'Clique no botão "Cadastrar" no canto superior direito da página, preencha seus dados pessoais e confirme seu e-mail. O cadastro é rápido, gratuito e seguro.'
        },
        {
          question: 'O uso da plataforma é gratuito?',
          answer: 'O cadastro e navegação na plataforma são gratuitos. Algumas funcionalidades avançadas e a publicação de anúncios podem estar sujeitas a taxas, que são claramente informadas antes da contratação.'
        }
      ]
    },
    {
      category: 'Compras',
      questions: [
        {
          question: 'Como encontro produtos ou animais?',
          answer: 'Use a barra de pesquisa no topo da página ou navegue pelas categorias disponíveis. Você também pode usar filtros avançados para refinar sua busca por localização, preço, categoria e outras características.'
        },
        {
          question: 'Como funciona a compra na plataforma?',
          answer: 'Após encontrar o produto ou animal desejado, você pode entrar em contato com o vendedor através do chat ou sistema de mensagens. As negociações podem ser feitas diretamente ou através de leilões online. O pagamento é processado de forma segura através da plataforma.'
        },
        {
          question: 'Quais formas de pagamento são aceitas?',
          answer: 'Aceitamos diversas formas de pagamento, incluindo transferência bancária, PIX, cartão de crédito e outros métodos conforme acordado entre comprador e vendedor.'
        },
        {
          question: 'Como funciona o sistema de segurança?',
          answer: 'Utilizamos verificação KYC (Know Your Customer) para confirmar a identidade dos usuários e sistema de escrow para garantir transações seguras. Todas as transações são monitoradas para prevenir fraudes.'
        }
      ]
    },
    {
      category: 'Vendas',
      questions: [
        {
          question: 'Como posso vender na plataforma?',
          answer: 'Acesse a seção "Vender" no menu principal, escolha se deseja anunciar um animal ou produto, preencha todas as informações solicitadas (fotos, descrição, preço, localização) e publique seu anúncio.'
        },
        {
          question: 'Quais são as taxas para vendedores?',
          answer: 'As taxas variam conforme o tipo de anúncio e plano escolhido. Consulte nossa página de preços ou entre em contato com nossa equipe para informações detalhadas sobre taxas e planos disponíveis.'
        },
        {
          question: 'Como recebo o pagamento?',
          answer: 'Os pagamentos são processados de forma segura através da plataforma. Você receberá o valor após a confirmação da entrega ou transferência pelo comprador. O dinheiro será creditado na sua conta conforme o método de pagamento escolhido.'
        },
        {
          question: 'Posso criar leilões online?',
          answer: 'Sim! Usuários verificados podem criar leilões online na plataforma. Acesse a seção de leilões e clique em "Criar Leilão" para iniciar o processo.'
        }
      ]
    },
    {
      category: 'Conta e Perfil',
      questions: [
        {
          question: 'Como edito minhas informações pessoais?',
          answer: 'Acesse "Meu Perfil" no menu e clique em "Editar Perfil". Lá você pode atualizar suas informações pessoais, endereço, telefone e outras configurações da conta.'
        },
        {
          question: 'Esqueci minha senha. Como recupero?',
          answer: 'Na página de login, clique em "Esqueci minha senha" e informe seu e-mail cadastrado. Você receberá um link por e-mail para redefinir sua senha.'
        },
        {
          question: 'Como verifico minha conta?',
          answer: 'A verificação de conta (KYC) pode ser feita através do painel do usuário. Você precisará enviar documentos de identificação que serão revisados por nossa equipe. Contas verificadas têm acesso a funcionalidades adicionais.'
        }
      ]
    },
    {
      category: 'Suporte',
      questions: [
        {
          question: 'Como entro em contato com o suporte?',
          answer: 'Você pode entrar em contato conosco através da página de contato, e-mail contato@tudoagro.com ou telefone (11) 99999-9999. Nossa equipe está disponível de segunda a sexta, das 8h às 18h.'
        },
        {
          question: 'O que fazer se tiver problema com uma compra?',
          answer: 'Entre em contato imediatamente com nossa equipe de suporte através da Central de Ajuda. Forneça detalhes da transação e nossa equipe ajudará a resolver a questão.'
        },
        {
          question: 'Como denuncio um usuário ou anúncio?',
          answer: 'Em cada anúncio e perfil de usuário há um botão de "Denunciar". Use esta funcionalidade para reportar conteúdo inadequado ou comportamento suspeito. Nossa equipe investigará todas as denúncias.'
        }
      ]
    }
  ]

  const filteredFAQs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(qa =>
      qa.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      qa.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0)

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 via-emerald-600 to-emerald-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Perguntas Frequentes (FAQ)</h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Encontre respostas para as dúvidas mais comuns sobre nossa plataforma
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
              placeholder="Buscar perguntas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-lg border-2 border-gray-300 focus:border-emerald-500"
            />
          </div>
        </section>

        {/* FAQ Sections */}
        <section className="space-y-8">
          {filteredFAQs.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h2 className="text-2xl font-bold text-[#101828] mb-4">{category.category}</h2>
              <div className="space-y-4">
                {category.questions.map((qa, qIndex) => {
                  const questionIndex = categoryIndex * 100 + qIndex
                  const isOpen = openQuestion === questionIndex
                  
                  return (
                    <Card key={qIndex} className="border-2 border-gray-200 hover:border-emerald-500 transition-colors">
                      <CardContent className="p-0">
                        <button
                          onClick={() => setOpenQuestion(isOpen ? null : questionIndex)}
                          className="w-full p-6 flex items-start justify-between hover:bg-gray-50 transition-colors text-left"
                        >
                          <div className="flex items-start gap-4 flex-1">
                            <div className="bg-emerald-100 p-2 rounded-lg mt-1">
                              <HelpCircle className="w-5 h-5 text-emerald-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-[#101828] flex-1">{qa.question}</h3>
                          </div>
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-gray-500 ml-4 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500 ml-4 flex-shrink-0" />
                          )}
                        </button>
                        
                        {isOpen && (
                          <div className="px-6 pb-6 border-t border-gray-200">
                            <p className="text-gray-700 pt-4 leading-relaxed">{qa.answer}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          ))}
        </section>

        {/* CTA Section */}
        <section className="mt-12 bg-gradient-to-r from-emerald-50 to-emerald-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-[#101828] mb-4">Ainda tem dúvidas?</h2>
          <p className="text-gray-600 mb-6">
            Nossa equipe está pronta para ajudar você. Entre em contato conosco!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contato" className="inline-block">
              <button className="bg-emerald-600 hover:bg-[#2E7A5A] text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Entrar em Contato
              </button>
            </a>
            <a href="/ajuda" className="inline-block">
              <button className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-6 py-3 rounded-lg font-medium transition-colors">
                Central de Ajuda
              </button>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
