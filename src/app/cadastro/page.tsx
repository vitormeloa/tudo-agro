'use client'

import { useState } from 'react'
import Link from 'next/link'
import { User, Mail, Phone, Lock, MapPin, Building, Eye, EyeOff, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function CadastroPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [accountType, setAccountType] = useState<'pf' | 'pj'>('pf')
  
  const [formData, setFormData] = useState({
    // Dados pessoais
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    
    // Dados da fazenda
    farmName: '',
    document: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    
    // Termos
    acceptTerms: false,
    acceptPrivacy: false,
    acceptMarketing: false
  })

  const steps = [
    { number: 1, title: 'Dados Pessoais', description: 'Informações básicas' },
    { number: 2, title: 'Dados da Fazenda', description: 'Localização e propriedade' },
    { number: 3, title: 'Finalização', description: 'Termos e confirmação' }
  ]

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Implementar lógica de cadastro
    console.log('Cadastro:', formData)
    // Redirecionar para login ou painel
    window.location.href = '/login'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7F6F2] to-[#FFFDF7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-[#1E4D2B] mb-2 block">
            AgroMarket
          </Link>
          <h1 className="text-2xl font-bold text-[#2B2E2B] mb-2">
            Criar Conta Gratuita
          </h1>
          <p className="text-[#6E7D5B]">
            Junte-se à maior plataforma do agronegócio brasileiro
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                  currentStep >= step.number 
                    ? 'bg-[#1E4D2B] border-[#1E4D2B] text-white' 
                    : 'border-[#6E7D5B] text-[#6E7D5B]'
                }`}>
                  {currentStep > step.number ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    step.number
                  )}
                </div>
                <div className="ml-3 hidden sm:block">
                  <div className={`text-sm font-medium ${
                    currentStep >= step.number ? 'text-[#1E4D2B]' : 'text-[#6E7D5B]'
                  }`}>
                    {step.title}
                  </div>
                  <div className="text-xs text-[#6E7D5B]">{step.description}</div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`hidden sm:block w-16 h-0.5 ml-4 ${
                    currentStep > step.number ? 'bg-[#1E4D2B]' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <Card className="shadow-2xl border-0 bg-white">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl text-center text-[#2B2E2B]">
              {steps[currentStep - 1].title}
            </CardTitle>
            <p className="text-center text-[#6E7D5B]">
              {steps[currentStep - 1].description}
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {/* Step 1: Dados Pessoais */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  {/* Account Type */}
                  <div>
                    <label className="block text-sm font-medium text-[#2B2E2B] mb-3">
                      Tipo de Conta
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setAccountType('pf')}
                        className={`p-4 border-2 rounded-lg transition-all duration-300 ${
                          accountType === 'pf' 
                            ? 'border-[#1E4D2B] bg-[#1E4D2B]/5' 
                            : 'border-gray-200 hover:border-[#C89F45]'
                        }`}
                      >
                        <User className="w-8 h-8 mx-auto mb-2 text-[#1E4D2B]" />
                        <div className="font-semibold text-[#2B2E2B]">Pessoa Física</div>
                        <div className="text-sm text-[#6E7D5B]">CPF</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setAccountType('pj')}
                        className={`p-4 border-2 rounded-lg transition-all duration-300 ${
                          accountType === 'pj' 
                            ? 'border-[#1E4D2B] bg-[#1E4D2B]/5' 
                            : 'border-gray-200 hover:border-[#C89F45]'
                        }`}
                      >
                        <Building className="w-8 h-8 mx-auto mb-2 text-[#1E4D2B]" />
                        <div className="font-semibold text-[#2B2E2B]">Pessoa Jurídica</div>
                        <div className="text-sm text-[#6E7D5B]">CNPJ</div>
                      </button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-[#2B2E2B] mb-2">
                        {accountType === 'pf' ? 'Nome Completo' : 'Razão Social'}
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6E7D5B] w-5 h-5" />
                        <Input
                          id="name"
                          type="text"
                          placeholder={accountType === 'pf' ? 'João Silva' : 'Fazenda Boa Vista Ltda'}
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="pl-10 h-12"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="document" className="block text-sm font-medium text-[#2B2E2B] mb-2">
                        {accountType === 'pf' ? 'CPF' : 'CNPJ'}
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6E7D5B] w-5 h-5" />
                        <Input
                          id="document"
                          type="text"
                          placeholder={accountType === 'pf' ? '000.000.000-00' : '00.000.000/0001-00'}
                          value={formData.document}
                          onChange={(e) => setFormData({...formData, document: e.target.value})}
                          className="pl-10 h-12"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-[#2B2E2B] mb-2">
                        E-mail
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6E7D5B] w-5 h-5" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="seu@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="pl-10 h-12"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-[#2B2E2B] mb-2">
                        WhatsApp
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6E7D5B] w-5 h-5" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="(11) 99999-9999"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="pl-10 h-12"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-[#2B2E2B] mb-2">
                        Senha
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6E7D5B] w-5 h-5" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Mínimo 8 caracteres"
                          value={formData.password}
                          onChange={(e) => setFormData({...formData, password: e.target.value})}
                          className="pl-10 pr-10 h-12"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#6E7D5B] hover:text-[#2B2E2B] transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#2B2E2B] mb-2">
                        Confirmar Senha
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6E7D5B] w-5 h-5" />
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Repita a senha"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                          className="pl-10 pr-10 h-12"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#6E7D5B] hover:text-[#2B2E2B] transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Dados da Fazenda */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="farmName" className="block text-sm font-medium text-[#2B2E2B] mb-2">
                      Nome da Fazenda/Propriedade
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6E7D5B] w-5 h-5" />
                      <Input
                        id="farmName"
                        type="text"
                        placeholder="Fazenda Boa Vista"
                        value={formData.farmName}
                        onChange={(e) => setFormData({...formData, farmName: e.target.value})}
                        className="pl-10 h-12"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-[#2B2E2B] mb-2">
                      Endereço Completo
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6E7D5B] w-5 h-5" />
                      <Input
                        id="address"
                        type="text"
                        placeholder="Rua, número, bairro"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        className="pl-10 h-12"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-[#2B2E2B] mb-2">
                        Cidade
                      </label>
                      <Input
                        id="city"
                        type="text"
                        placeholder="Goiânia"
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        className="h-12"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-[#2B2E2B] mb-2">
                        Estado
                      </label>
                      <Input
                        id="state"
                        type="text"
                        placeholder="GO"
                        value={formData.state}
                        onChange={(e) => setFormData({...formData, state: e.target.value})}
                        className="h-12"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium text-[#2B2E2B] mb-2">
                        CEP
                      </label>
                      <Input
                        id="zipCode"
                        type="text"
                        placeholder="00000-000"
                        value={formData.zipCode}
                        onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                        className="h-12"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Termos e Finalização */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-[#1E4D2B]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-[#1E4D2B]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#2B2E2B] mb-2">
                      Quase pronto!
                    </h3>
                    <p className="text-[#6E7D5B]">
                      Aceite os termos para finalizar seu cadastro
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <input
                        id="accept-terms"
                        type="checkbox"
                        checked={formData.acceptTerms}
                        onChange={(e) => setFormData({...formData, acceptTerms: e.target.checked})}
                        className="h-4 w-4 text-[#1E4D2B] focus:ring-[#1E4D2B] border-gray-300 rounded mt-1"
                        required
                      />
                      <label htmlFor="accept-terms" className="ml-3 text-sm text-[#2B2E2B]">
                        Eu aceito os{' '}
                        <Link href="/termos" className="text-[#C89F45] hover:text-[#B8913D] font-medium">
                          Termos de Uso
                        </Link>
                        {' '}e{' '}
                        <Link href="/privacidade" className="text-[#C89F45] hover:text-[#B8913D] font-medium">
                          Política de Privacidade
                        </Link>
                      </label>
                    </div>

                    <div className="flex items-start">
                      <input
                        id="accept-privacy"
                        type="checkbox"
                        checked={formData.acceptPrivacy}
                        onChange={(e) => setFormData({...formData, acceptPrivacy: e.target.checked})}
                        className="h-4 w-4 text-[#1E4D2B] focus:ring-[#1E4D2B] border-gray-300 rounded mt-1"
                        required
                      />
                      <label htmlFor="accept-privacy" className="ml-3 text-sm text-[#2B2E2B]">
                        Concordo com o processamento dos meus dados pessoais conforme a LGPD
                      </label>
                    </div>

                    <div className="flex items-start">
                      <input
                        id="accept-marketing"
                        type="checkbox"
                        checked={formData.acceptMarketing}
                        onChange={(e) => setFormData({...formData, acceptMarketing: e.target.checked})}
                        className="h-4 w-4 text-[#1E4D2B] focus:ring-[#1E4D2B] border-gray-300 rounded mt-1"
                      />
                      <label htmlFor="accept-marketing" className="ml-3 text-sm text-[#6E7D5B]">
                        Desejo receber ofertas e novidades por e-mail e WhatsApp (opcional)
                      </label>
                    </div>
                  </div>

                  <div className="bg-[#C89F45]/10 border border-[#C89F45]/20 rounded-lg p-4">
                    <h4 className="font-semibold text-[#8A5A32] mb-2">
                      ⚠️ Verificação de Conta Necessária
                    </h4>
                    <p className="text-sm text-[#6E7D5B] mb-3">
                      Após o cadastro, você precisará verificar sua conta no painel do usuário para acessar todas as funcionalidades da plataforma.
                    </p>
                    <ul className="text-sm text-[#6E7D5B] space-y-1">
                      <li>• Upload de documentos (RG/CNH, CPF/CNPJ, Comprovante de endereço)</li>
                      <li>• Verificação em até 24 horas</li>
                      <li>• Acesso completo após aprovação</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="border-[#6E7D5B] text-[#6E7D5B] hover:bg-[#6E7D5B] hover:text-white"
                >
                  Anterior
                </Button>

                {currentStep < 3 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="bg-[#1E4D2B] hover:bg-[#163B20] text-white transition-all duration-300 transform hover:scale-105"
                  >
                    Próximo
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="bg-[#C89F45] hover:bg-[#B8913D] text-white px-8 transition-all duration-300 transform hover:scale-105"
                  >
                    Finalizar Cadastro
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Login Link */}
        <div className="text-center mt-6">
          <p className="text-[#6E7D5B]">
            Já tem uma conta?{' '}
            <Link href="/login" className="font-medium text-[#C89F45] hover:text-[#B8913D] transition-colors duration-300">
              Faça login
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-4">
          <Link href="/" className="text-[#6E7D5B] hover:text-[#2B2E2B] transition-colors duration-300 flex items-center justify-center">
            ← Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  )
}