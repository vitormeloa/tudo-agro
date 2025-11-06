'use client'

import { Shield, Calendar, Lock, Eye, FileText } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 via-emerald-600 to-emerald-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Política de Privacidade</h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Entenda como coletamos, usamos e protegemos suas informações pessoais
            </p>
          </div>
        </div>
      </section>

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
            <Shield className="w-6 h-6 text-emerald-600" />
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
              <h2 className="text-2xl font-bold text-[#101828] mb-4">1. Introdução</h2>
              <p className="text-gray-700 mb-4">
                O TudoAgro respeita sua privacidade e está comprometido em proteger suas informações pessoais. 
                Esta Política de Privacidade explica como coletamos, usamos, compartilhamos e protegemos suas 
                informações quando você usa nossa plataforma.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#101828] mb-4">2. Informações que Coletamos</h2>
              <h3 className="text-xl font-semibold text-[#101828] mb-3 mt-4">2.1. Informações Fornecidas por Você</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Nome completo e informações de contato</li>
                <li>Endereço de e-mail e número de telefone</li>
                <li>Informações de pagamento</li>
                <li>Documentos de identificação (para verificação KYC)</li>
                <li>Informações sobre propriedades rurais</li>
              </ul>

              <h3 className="text-xl font-semibold text-[#101828] mb-3 mt-6">2.2. Informações Coletadas Automaticamente</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Endereço IP e informações do dispositivo</li>
                <li>Dados de navegação e uso da plataforma</li>
                <li>Cookies e tecnologias similares</li>
                <li>Localização geográfica (quando permitido)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#101828] mb-4">3. Como Usamos suas Informações</h2>
              <p className="text-gray-700 mb-4">Utilizamos suas informações para:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Fornecer e melhorar nossos serviços</li>
                <li>Processar transações e pagamentos</li>
                <li>Verificar sua identidade e prevenir fraudes</li>
                <li>Comunicar-nos com você sobre produtos e serviços</li>
                <li>Enviar notificações importantes sobre sua conta</li>
                <li>Personalizar sua experiência na plataforma</li>
                <li>Cumprir obrigações legais e regulatórias</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#101828] mb-4">4. Compartilhamento de Informações</h2>
              <p className="text-gray-700 mb-4">
                Não vendemos suas informações pessoais. Podemos compartilhar suas informações apenas nas seguintes situações:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Com outros usuários:</strong> Informações básicas do perfil quando você realiza transações</li>
                <li><strong>Prestadores de serviços:</strong> Empresas que nos ajudam a operar a plataforma (processamento de pagamento, hospedagem, etc.)</li>
                <li><strong>Obrigações legais:</strong> Quando exigido por lei ou para proteger nossos direitos</li>
                <li><strong>Com seu consentimento:</strong> Em outras situações com sua autorização explícita</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#101828] mb-4">5. Segurança das Informações</h2>
              <p className="text-gray-700 mb-4">
                Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações pessoais, incluindo:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Criptografia de dados em trânsito e em repouso</li>
                <li>Controles de acesso rigorosos</li>
                <li>Monitoramento regular de segurança</li>
                <li>Treinamento de funcionários sobre privacidade</li>
                <li>Verificação KYC para prevenir fraudes</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#101828] mb-4">6. Cookies e Tecnologias Similares</h2>
              <p className="text-gray-700 mb-4">
                Utilizamos cookies e tecnologias similares para melhorar sua experiência, analisar o uso da plataforma 
                e personalizar conteúdo. Você pode gerenciar suas preferências de cookies através das configurações 
                do seu navegador.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#101828] mb-4">7. Seus Direitos</h2>
              <p className="text-gray-700 mb-4">De acordo com a LGPD, você tem direito a:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Acessar suas informações pessoais</li>
                <li>Corrigir dados incompletos ou desatualizados</li>
                <li>Solicitar a exclusão de suas informações</li>
                <li>Solicitar a portabilidade dos dados</li>
                <li>Revogar seu consentimento</li>
                <li>Ser informado sobre o uso de suas informações</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#101828] mb-4">8. Retenção de Dados</h2>
              <p className="text-gray-700 mb-4">
                Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir os propósitos descritos 
                nesta política, a menos que um período de retenção mais longo seja exigido ou permitido por lei.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#101828] mb-4">9. Privacidade de Menores</h2>
              <p className="text-gray-700 mb-4">
                Nossa plataforma não é destinada a menores de 18 anos. Não coletamos intencionalmente informações 
                pessoais de menores. Se descobrirmos que coletamos informações de um menor, tomaremos medidas para 
                excluir essas informações.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#101828] mb-4">10. Alterações nesta Política</h2>
              <p className="text-gray-700 mb-4">
                Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre mudanças 
                significativas publicando a nova política na plataforma e atualizando a data de "Última Atualização".
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#101828] mb-4">11. Contato</h2>
              <p className="text-gray-700">
                Se você tiver dúvidas sobre esta Política de Privacidade ou sobre como tratamos suas informações, 
                entre em contato conosco através do e-mail 
                <a href="mailto:privacidade@tudoagro.com" className="text-emerald-600 hover:underline ml-1">
                  privacidade@tudoagro.com
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
