'use client'

import { FileText, Calendar } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function TermosPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary via-primary to-primary/90 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Termos de Uso</h1>
            <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto">
              Leia atentamente nossos termos e condições de uso da plataforma
            </p>
          </div>
        </div>
      </section>

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
            <FileText className="w-6 h-6 text-primary" />
            <div>
              <h2 className="text-xl font-semibold text-[#101828]">Última Atualização</h2>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>15 de Janeiro, 2024</span>
              </div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#101828] mb-4">1. Aceitação dos Termos</h2>
              <p className="text-gray-700 mb-4">
                Ao acessar e usar a plataforma TudoAgro, você concorda em cumprir e estar vinculado aos seguintes 
                Termos de Uso. Se você não concorda com qualquer parte destes termos, não deve usar nossos serviços.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#101828] mb-4">2. Definições</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Plataforma:</strong> Refere-se ao site TudoAgro e todos os seus serviços relacionados.</li>
                <li><strong>Usuário:</strong> Qualquer pessoa que acessa ou utiliza a plataforma.</li>
                <li><strong>Vendedor:</strong> Usuário que oferece produtos, animais ou serviços para venda.</li>
                <li><strong>Comprador:</strong> Usuário que adquire produtos, animais ou serviços através da plataforma.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#101828] mb-4">3. Uso da Plataforma</h2>
              <p className="text-gray-700 mb-4">
                Você concorda em usar a plataforma apenas para fins legais e de acordo com estes Termos de Uso. 
                É proibido:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Usar a plataforma para qualquer atividade ilegal ou não autorizada</li>
                <li>Publicar informações falsas, enganosas ou fraudulentas</li>
                <li>Interferir ou interromper o funcionamento da plataforma</li>
                <li>Tentar acessar áreas restritas ou contas de outros usuários</li>
                <li>Usar a plataforma para transmitir vírus ou código malicioso</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#101828] mb-4">4. Cadastro e Conta</h2>
              <p className="text-gray-700 mb-4">
                Para usar certas funcionalidades da plataforma, você precisa criar uma conta. Você é responsável por:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Manter a confidencialidade de suas credenciais de acesso</li>
                <li>Fornecer informações precisas e atualizadas</li>
                <li>Notificar-nos imediatamente sobre qualquer uso não autorizado de sua conta</li>
                <li>Ser responsável por todas as atividades que ocorrem em sua conta</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#101828] mb-4">5. Transações</h2>
              <p className="text-gray-700 mb-4">
                A plataforma TudoAgro atua como intermediária entre compradores e vendedores. Nós:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Facilitamos a conexão entre compradores e vendedores</li>
                <li>Oferecemos ferramentas de comunicação e pagamento</li>
                <li>Não somos parte da transação comercial entre as partes</li>
                <li>Não garantimos a qualidade, segurança ou legalidade dos produtos ou serviços anunciados</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#101828] mb-4">6. Taxas e Pagamentos</h2>
              <p className="text-gray-700 mb-4">
                O uso de certas funcionalidades da plataforma pode estar sujeito a taxas. Todas as taxas serão 
                claramente comunicadas antes da realização da transação. Os vendedores são responsáveis por 
                todas as taxas relacionadas às suas vendas.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#101828] mb-4">7. Propriedade Intelectual</h2>
              <p className="text-gray-700 mb-4">
                Todo o conteúdo da plataforma, incluindo textos, gráficos, logos, ícones e software, é propriedade 
                do TudoAgro ou de seus licenciadores e está protegido por leis de direitos autorais e outras leis 
                de propriedade intelectual.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#101828] mb-4">8. Limitação de Responsabilidade</h2>
              <p className="text-gray-700 mb-4">
                O TudoAgro não será responsável por quaisquer danos diretos, indiretos, incidentais ou consequenciais 
                resultantes do uso ou impossibilidade de uso da plataforma. Nosso serviço é fornecido "como está" 
                sem garantias de qualquer tipo.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#101828] mb-4">9. Modificações dos Termos</h2>
              <p className="text-gray-700 mb-4">
                Reservamos o direito de modificar estes Termos de Uso a qualquer momento. As alterações entrarão 
                em vigor imediatamente após a publicação na plataforma. O uso continuado da plataforma após 
                tais modificações constitui sua aceitação dos novos termos.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#101828] mb-4">10. Lei Aplicável</h2>
              <p className="text-gray-700 mb-4">
                Estes Termos de Uso são regidos pelas leis brasileiras. Qualquer disputa relacionada a estes 
                termos será resolvida nos tribunais competentes do Brasil.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#101828] mb-4">11. Contato</h2>
              <p className="text-gray-700">
                Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco através do e-mail 
                <a href="mailto:contato@tudoagro.com" className="text-primary hover:underline ml-1">
                  contato@tudoagro.com
                </a> ou através de nossa página de contato.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
