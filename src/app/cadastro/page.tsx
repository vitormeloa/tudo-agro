'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/use-toast'
import {
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    ArrowLeft,
    Building,
    MapPin,
    Phone,
    CheckCircle
} from 'lucide-react'

export default function CadastroPage() {
    const [currentStep, setCurrentStep] = useState(1)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const { signUp } = useAuth()
    const { toast } = useToast()
    const [formData, setFormData] = useState({
        accountType: '',
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        phone: '',
        cpf: '',
        cnpj: '',
        farmName: '',
        farmSize: '',
        state: '',
        city: '',
        activityType: '',
        // Campos específicos para Pessoa Jurídica
        companyName: '',
        legalRepresentativeName: '',
        legalRepresentativeCpf: '',
        corporateEmail: '',
        operationTypes: [] as string[], // Tipo de atuação (múltipla escolha)
        acceptTerms: false
    })

    const steps = [
        { number: 1, title: 'Tipo de Conta', description: 'Escolha o tipo de conta' },
        { number: 2, title: 'Dados Pessoais', description: 'Informações básicas' },
        { number: 3, title: 'Propriedade', description: 'Dados da fazenda' },
        { number: 4, title: 'Confirmação', description: 'Revise e confirme' }
    ]

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleOperationTypeChange = (operationType: string, checked: boolean) => {
        setFormData(prev => {
            const currentTypes = prev.operationTypes || []
            if (checked) {
                return { ...prev, operationTypes: [...currentTypes, operationType] }
            } else {
                return { ...prev, operationTypes: currentTypes.filter(type => type !== operationType) }
            }
        })
    }

    const handleNext = () => {
        // Validação para step 3 quando for Pessoa Jurídica
        if (currentStep === 3 && formData.accountType === 'pj') {
            if (!formData.operationTypes || formData.operationTypes.length === 0) {
                toast({
                    title: "Selecione um tipo de atuação",
                    description: "Por favor, selecione pelo menos uma forma de atuação para continuar.",
                    variant: "destructive",
                })
                return
            }
            if (!formData.state || !formData.city) {
                toast({
                    title: "Informe a localização",
                    description: "Por favor, informe o estado e a cidade para continuar.",
                    variant: "destructive",
                })
                return
            }
        }

        if (currentStep < 4) {
            setCurrentStep(currentStep + 1)
        }
    }

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Validar senhas
        if (formData.password !== formData.confirmPassword) {
            toast({
                title: "Erro na validação",
                description: "As senhas não coincidem. Verifique e tente novamente.",
                variant: "destructive",
            })
            setIsLoading(false)
            return
        }

        // Validar termos
        if (!formData.acceptTerms) {
            toast({
                title: "Termos não aceitos",
                description: "Você deve aceitar os termos de uso para continuar.",
                variant: "destructive",
            })
            setIsLoading(false)
            return
        }

        try {
            // Todos os usuários cadastrados via /cadastro recebem role comprador por padrão
            const roles = ['comprador']

            // Usar email correto baseado no tipo de conta
            const email = formData.accountType === 'pj' ? formData.corporateEmail : formData.email
            const name = formData.accountType === 'pj' ? formData.companyName : formData.fullName
            const cpf = formData.accountType === 'pj' ? formData.legalRepresentativeCpf : formData.cpf

            const signUpData: any = {
                name: name,
                phone: formData.phone,
                cpf: cpf,
                cnpj: formData.cnpj,
                roles
            }

            // Adicionar campos específicos de PJ
            if (formData.accountType === 'pj') {
                signUpData.operationTypes = formData.operationTypes
                signUpData.companyName = formData.companyName
                signUpData.legalRepresentativeName = formData.legalRepresentativeName
                signUpData.legalRepresentativeCpf = formData.legalRepresentativeCpf
            }

            // Adicionar campos de localização se existirem
            if (formData.state) signUpData.state = formData.state
            if (formData.city) signUpData.city = formData.city
            if (formData.farmName) signUpData.farmName = formData.farmName
            if (formData.activityType) signUpData.activityType = formData.activityType
            if (formData.farmSize) signUpData.farmSize = formData.farmSize

            const { error } = await signUp(email, formData.password, signUpData)

            if (!error) {
                // Redirecionar para login
                router.push('/login?message=Conta criada com sucesso! Faça login para continuar.')
            }
        } catch (err) {
            // Erro já tratado no hook
        } finally {
            setIsLoading(false)
        }
    }

    const getActivityTypeLabel = (value: string) => {
        const labels: { [key: string]: string } = {
            'pecuarista': 'Pecuarista (gado de corte ou leite)',
            'criador-cavalos': 'Criador de cavalos',
            'produtor-rural': 'Produtor rural / Agricultor',
            'hobby': 'Hobby / Criador eventual',
            'outros': 'Outros'
        }
        return labels[value] || value
    }

    const getStateLabel = (value: string) => {
        const labels: { [key: string]: string } = {
            'ac': 'Acre',
            'al': 'Alagoas',
            'ap': 'Amapá',
            'am': 'Amazonas',
            'ba': 'Bahia',
            'ce': 'Ceará',
            'df': 'Distrito Federal',
            'es': 'Espírito Santo',
            'go': 'Goiás',
            'ma': 'Maranhão',
            'mt': 'Mato Grosso',
            'ms': 'Mato Grosso do Sul',
            'mg': 'Minas Gerais',
            'pa': 'Pará',
            'pb': 'Paraíba',
            'pr': 'Paraná',
            'pe': 'Pernambuco',
            'pi': 'Piauí',
            'rj': 'Rio de Janeiro',
            'rn': 'Rio Grande do Norte',
            'rs': 'Rio Grande do Sul',
            'ro': 'Rondônia',
            'rr': 'Roraima',
            'sc': 'Santa Catarina',
            'sp': 'São Paulo',
            'se': 'Sergipe',
            'to': 'Tocantins'
        }
        return labels[value] || value
    }

    const getOperationTypeLabel = (value: string) => {
        const labels: { [key: string]: string } = {
            'vendedor-gado': 'Vendedor de gado (corte, leite ou genética)',
            'vendedor-cavalos': 'Vendedor de cavalos (esporte, genética ou vaquejada)',
            'fornecedor-genetica': 'Fornecedor de genética animal',
            'fornecedor-produtos': 'Fornecedor de produtos agropecuários',
            'empresa-agricola': 'Empresa agrícola / Agroindústria',
            'cooperativa': 'Cooperativa / Fazenda estruturada',
            'outros-pj': 'Outros'
        }
        return labels[value] || value
    }

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-6 sm:mb-8">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                                Escolha o tipo de conta
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600">
                                Selecione o perfil que melhor se adequa ao seu negócio
                            </p>
                        </div>

                        <RadioGroup
                            value={formData.accountType}
                            onValueChange={(value) => handleInputChange('accountType', value)}
                            className="space-y-4"
                        >
                            <div className="relative">
                                <RadioGroupItem value="pf" id="pf" className="sr-only" />
                                <Label
                                    htmlFor="pf"
                                    className={`flex items-center p-4 sm:p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                                        formData.accountType === 'pf'
                                            ? 'border-emerald-500 bg-emerald-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                >
                                    <div className="flex items-center space-x-3 sm:space-x-4">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <User className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Pessoa Física</h3>
                                            <p className="text-sm sm:text-base text-gray-600">Ideal para quem deseja comprar animais, genética e produtos agropecuários para uso próprio.
                                            </p>
                                        </div>
                                    </div>
                                </Label>
                            </div>

                            <div className="relative">
                                <RadioGroupItem value="pj" id="pj" className="sr-only" />
                                <Label
                                    htmlFor="pj"
                                    className={`flex items-center p-4 sm:p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                                        formData.accountType === 'pj'
                                            ? 'border-emerald-500 bg-emerald-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                >
                                    <div className="flex items-center space-x-3 sm:space-x-4">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Building className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Pessoa Jurídica</h3>
                                            <p className="text-sm sm:text-base text-gray-600">Perfil destinado a empresas, cooperativas e produtores que desejam vender animais, genética e/ou produtos no marketplace.</p>
                                        </div>
                                    </div>
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>
                )

            case 2:
                // Renderizar formulário diferente baseado no tipo de conta
                if (formData.accountType === 'pj') {
                    return (
                        <div className="space-y-6">
                            <div className="text-center mb-6 sm:mb-8">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                                    Dados da Empresa
                                </h2>
                                <p className="text-sm sm:text-base text-gray-600">
                                    Informe os dados da sua empresa para criar sua conta
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">
                                        Nome da empresa / propriedade
                                    </Label>
                                    <div className="relative">
                                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <Input
                                            id="companyName"
                                            type="text"
                                            placeholder="Nome da empresa ou propriedade"
                                            value={formData.companyName}
                                            onChange={(e) => handleInputChange('companyName', e.target.value)}
                                            className="pl-10 h-12 text-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="cnpj" className="text-sm font-medium text-gray-700">
                                        CNPJ
                                    </Label>
                                    <Input
                                        id="cnpj"
                                        type="text"
                                        placeholder="00.000.000/0000-00"
                                        value={formData.cnpj}
                                        onChange={(e) => handleInputChange('cnpj', e.target.value)}
                                        className="h-12 text-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="legalRepresentativeName" className="text-sm font-medium text-gray-700">
                                            Responsável legal (Nome)
                                        </Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <Input
                                                id="legalRepresentativeName"
                                                type="text"
                                                placeholder="Nome completo do responsável"
                                                value={formData.legalRepresentativeName}
                                                onChange={(e) => handleInputChange('legalRepresentativeName', e.target.value)}
                                                className="pl-10 h-12 text-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="legalRepresentativeCpf" className="text-sm font-medium text-gray-700">
                                            Responsável legal (CPF)
                                        </Label>
                                        <Input
                                            id="legalRepresentativeCpf"
                                            type="text"
                                            placeholder="000.000.000-00"
                                            value={formData.legalRepresentativeCpf}
                                            onChange={(e) => handleInputChange('legalRepresentativeCpf', e.target.value)}
                                            className="h-12 text-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="corporateEmail" className="text-sm font-medium text-gray-700">
                                        E-mail corporativo
                                    </Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <Input
                                            id="corporateEmail"
                                            type="email"
                                            placeholder="contato@empresa.com"
                                            value={formData.corporateEmail}
                                            onChange={(e) => handleInputChange('corporateEmail', e.target.value)}
                                            className="pl-10 h-12 text-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                                        Telefone com WhatsApp
                                    </Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <Input
                                            id="phone"
                                            type="tel"
                                            placeholder="(11) 99999-9999"
                                            value={formData.phone}
                                            onChange={(e) => handleInputChange('phone', e.target.value)}
                                            className="pl-10 h-12 text-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                                            Criar senha
                                        </Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <Input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Mínimo 8 caracteres"
                                                value={formData.password}
                                                onChange={(e) => handleInputChange('password', e.target.value)}
                                                className="pl-10 pr-10 h-12 text-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                                            Confirmar senha
                                        </Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <Input
                                                id="confirmPassword"
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="Confirme sua senha"
                                                value={formData.confirmPassword}
                                                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                                className="pl-10 pr-10 h-12 text-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }

                // Formulário para Pessoa Física
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-6 sm:mb-8">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                                Dados pessoais
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600">
                                Informe seus dados para criar sua conta
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                                    Nome completo
                                </Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <Input
                                        id="fullName"
                                        type="text"
                                        placeholder="Seu nome completo"
                                        value={formData.fullName}
                                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                                        className="pl-10 h-12 text-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                                    Telefone/WhatsApp
                                </Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="(11) 99999-9999"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                        className="pl-10 h-12 text-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                    E-mail
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="seu@email.com"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        className="pl-10 h-12 text-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="cpf" className="text-sm font-medium text-gray-700">
                                    CPF
                                </Label>
                                <Input
                                    id="cpf"
                                    type="text"
                                    placeholder="000.000.000-00"
                                    value={formData.cpf}
                                    onChange={(e) => handleInputChange('cpf', e.target.value)}
                                    className="h-12 text-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                                    Senha
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Mínimo 8 caracteres"
                                        value={formData.password}
                                        onChange={(e) => handleInputChange('password', e.target.value)}
                                        className="pl-10 pr-10 h-12 text-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                                    Confirmar senha
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <Input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirme sua senha"
                                        value={formData.confirmPassword}
                                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                        className="pl-10 pr-10 h-12 text-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            case 3:
                // Renderizar formulário diferente baseado no tipo de conta
                if (formData.accountType === 'pj') {
                    return (
                        <div className="space-y-6">
                            <div className="text-center mb-6 sm:mb-8">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                                    Dados da propriedade
                                </h2>
                                <p className="text-sm sm:text-base text-gray-600">
                                    Informe os dados da sua fazenda ou propriedade
                                </p>
                            </div>

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                                <p className="text-sm text-blue-800 text-center">
                                    <strong>Não se preocupe se ainda não tiver todas as informações!</strong> Você poderá preencher os dados faltantes mais tarde, direto no seu painel.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="farmName" className="text-sm font-medium text-gray-700">
                                        Nome da fazenda/propriedade
                                    </Label>
                                    <div className="relative">
                                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <Input
                                            id="farmName"
                                            type="text"
                                            placeholder="Fazenda Boa Vista"
                                            value={formData.farmName}
                                            onChange={(e) => handleInputChange('farmName', e.target.value)}
                                            className="pl-10 h-12 text-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="state" className="text-sm font-medium text-gray-700">
                                            Estado
                                        </Label>
                                        <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                                            <SelectTrigger className="h-12 text-lg border-2 border-gray-200 focus:border-emerald-500">
                                                <SelectValue placeholder="Selecione o estado" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="ac">Acre</SelectItem>
                                                <SelectItem value="al">Alagoas</SelectItem>
                                                <SelectItem value="ap">Amapá</SelectItem>
                                                <SelectItem value="am">Amazonas</SelectItem>
                                                <SelectItem value="ba">Bahia</SelectItem>
                                                <SelectItem value="ce">Ceará</SelectItem>
                                                <SelectItem value="df">Distrito Federal</SelectItem>
                                                <SelectItem value="es">Espírito Santo</SelectItem>
                                                <SelectItem value="go">Goiás</SelectItem>
                                                <SelectItem value="ma">Maranhão</SelectItem>
                                                <SelectItem value="mt">Mato Grosso</SelectItem>
                                                <SelectItem value="ms">Mato Grosso do Sul</SelectItem>
                                                <SelectItem value="mg">Minas Gerais</SelectItem>
                                                <SelectItem value="pa">Pará</SelectItem>
                                                <SelectItem value="pb">Paraíba</SelectItem>
                                                <SelectItem value="pr">Paraná</SelectItem>
                                                <SelectItem value="pe">Pernambuco</SelectItem>
                                                <SelectItem value="pi">Piauí</SelectItem>
                                                <SelectItem value="rj">Rio de Janeiro</SelectItem>
                                                <SelectItem value="rn">Rio Grande do Norte</SelectItem>
                                                <SelectItem value="rs">Rio Grande do Sul</SelectItem>
                                                <SelectItem value="ro">Rondônia</SelectItem>
                                                <SelectItem value="rr">Roraima</SelectItem>
                                                <SelectItem value="sc">Santa Catarina</SelectItem>
                                                <SelectItem value="sp">São Paulo</SelectItem>
                                                <SelectItem value="se">Sergipe</SelectItem>
                                                <SelectItem value="to">Tocantins</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                                            Cidade
                                        </Label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <Input
                                                id="city"
                                                type="text"
                                                placeholder="Sua cidade"
                                                value={formData.city}
                                                onChange={(e) => handleInputChange('city', e.target.value)}
                                                className="pl-10 h-12 text-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="mb-4">
                                        <Label className="text-sm font-medium text-gray-700 block mb-2">
                                            Tipo de atuação
                                        </Label>
                                        <p className="text-sm text-gray-600">
                                            Selecione uma ou mais opções, de acordo com sua atuação.
                                        </p>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <div className="relative">
                                            <Checkbox
                                                id="vendedor-gado"
                                                checked={formData.operationTypes?.includes('vendedor-gado') || false}
                                                onCheckedChange={(checked) => handleOperationTypeChange('vendedor-gado', checked as boolean)}
                                                className="sr-only"
                                            />
                                            <Label
                                                htmlFor="vendedor-gado"
                                                className={`flex items-center p-4 sm:p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                                                    formData.operationTypes?.includes('vendedor-gado')
                                                        ? 'border-emerald-500 bg-emerald-50'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            >
                                                <div className="flex items-center space-x-3 sm:space-x-4">
                                                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                                        formData.operationTypes?.includes('vendedor-gado')
                                                            ? 'bg-emerald-100'
                                                            : 'bg-gray-100'
                                                    }`}>
                                                        <User className={`w-5 h-5 sm:w-6 sm:h-6 ${
                                                            formData.operationTypes?.includes('vendedor-gado')
                                                                ? 'text-emerald-600'
                                                                : 'text-gray-600'
                                                        }`} />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                                                            Vendedor de gado (corte, leite ou genética)
                                                        </h3>
                                                    </div>
                                                </div>
                                            </Label>
                                        </div>

                                        <div className="relative">
                                            <Checkbox
                                                id="vendedor-cavalos"
                                                checked={formData.operationTypes?.includes('vendedor-cavalos') || false}
                                                onCheckedChange={(checked) => handleOperationTypeChange('vendedor-cavalos', checked as boolean)}
                                                className="sr-only"
                                            />
                                            <Label
                                                htmlFor="vendedor-cavalos"
                                                className={`flex items-center p-4 sm:p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                                                    formData.operationTypes?.includes('vendedor-cavalos')
                                                        ? 'border-emerald-500 bg-emerald-50'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            >
                                                <div className="flex items-center space-x-3 sm:space-x-4">
                                                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                                        formData.operationTypes?.includes('vendedor-cavalos')
                                                            ? 'bg-emerald-100'
                                                            : 'bg-gray-100'
                                                    }`}>
                                                        <User className={`w-5 h-5 sm:w-6 sm:h-6 ${
                                                            formData.operationTypes?.includes('vendedor-cavalos')
                                                                ? 'text-emerald-600'
                                                                : 'text-gray-600'
                                                        }`} />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                                                            Vendedor de cavalos (esporte, genética ou vaquejada)
                                                        </h3>
                                                    </div>
                                                </div>
                                            </Label>
                                        </div>

                                        <div className="relative">
                                            <Checkbox
                                                id="fornecedor-genetica"
                                                checked={formData.operationTypes?.includes('fornecedor-genetica') || false}
                                                onCheckedChange={(checked) => handleOperationTypeChange('fornecedor-genetica', checked as boolean)}
                                                className="sr-only"
                                            />
                                            <Label
                                                htmlFor="fornecedor-genetica"
                                                className={`flex items-center p-4 sm:p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                                                    formData.operationTypes?.includes('fornecedor-genetica')
                                                        ? 'border-emerald-500 bg-emerald-50'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            >
                                                <div className="flex items-center space-x-3 sm:space-x-4">
                                                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                                        formData.operationTypes?.includes('fornecedor-genetica')
                                                            ? 'bg-emerald-100'
                                                            : 'bg-gray-100'
                                                    }`}>
                                                        <Building className={`w-5 h-5 sm:w-6 sm:h-6 ${
                                                            formData.operationTypes?.includes('fornecedor-genetica')
                                                                ? 'text-emerald-600'
                                                                : 'text-gray-600'
                                                        }`} />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                                                            Fornecedor de genética animal
                                                        </h3>
                                                    </div>
                                                </div>
                                            </Label>
                                        </div>

                                        <div className="relative">
                                            <Checkbox
                                                id="fornecedor-produtos"
                                                checked={formData.operationTypes?.includes('fornecedor-produtos') || false}
                                                onCheckedChange={(checked) => handleOperationTypeChange('fornecedor-produtos', checked as boolean)}
                                                className="sr-only"
                                            />
                                            <Label
                                                htmlFor="fornecedor-produtos"
                                                className={`flex items-center p-4 sm:p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                                                    formData.operationTypes?.includes('fornecedor-produtos')
                                                        ? 'border-emerald-500 bg-emerald-50'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            >
                                                <div className="flex items-center space-x-3 sm:space-x-4">
                                                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                                        formData.operationTypes?.includes('fornecedor-produtos')
                                                            ? 'bg-emerald-100'
                                                            : 'bg-gray-100'
                                                    }`}>
                                                        <Building className={`w-5 h-5 sm:w-6 sm:h-6 ${
                                                            formData.operationTypes?.includes('fornecedor-produtos')
                                                                ? 'text-emerald-600'
                                                                : 'text-gray-600'
                                                        }`} />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                                                            Fornecedor de produtos agropecuários
                                                        </h3>
                                                    </div>
                                                </div>
                                            </Label>
                                        </div>

                                        <div className="relative">
                                            <Checkbox
                                                id="empresa-agricola"
                                                checked={formData.operationTypes?.includes('empresa-agricola') || false}
                                                onCheckedChange={(checked) => handleOperationTypeChange('empresa-agricola', checked as boolean)}
                                                className="sr-only"
                                            />
                                            <Label
                                                htmlFor="empresa-agricola"
                                                className={`flex items-center p-4 sm:p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                                                    formData.operationTypes?.includes('empresa-agricola')
                                                        ? 'border-emerald-500 bg-emerald-50'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            >
                                                <div className="flex items-center space-x-3 sm:space-x-4">
                                                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                                        formData.operationTypes?.includes('empresa-agricola')
                                                            ? 'bg-emerald-100'
                                                            : 'bg-gray-100'
                                                    }`}>
                                                        <Building className={`w-5 h-5 sm:w-6 sm:h-6 ${
                                                            formData.operationTypes?.includes('empresa-agricola')
                                                                ? 'text-emerald-600'
                                                                : 'text-gray-600'
                                                        }`} />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                                                            Empresa agrícola / Agroindústria
                                                        </h3>
                                                    </div>
                                                </div>
                                            </Label>
                                        </div>

                                        <div className="relative">
                                            <Checkbox
                                                id="cooperativa"
                                                checked={formData.operationTypes?.includes('cooperativa') || false}
                                                onCheckedChange={(checked) => handleOperationTypeChange('cooperativa', checked as boolean)}
                                                className="sr-only"
                                            />
                                            <Label
                                                htmlFor="cooperativa"
                                                className={`flex items-center p-4 sm:p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                                                    formData.operationTypes?.includes('cooperativa')
                                                        ? 'border-emerald-500 bg-emerald-50'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            >
                                                <div className="flex items-center space-x-3 sm:space-x-4">
                                                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                                        formData.operationTypes?.includes('cooperativa')
                                                            ? 'bg-emerald-100'
                                                            : 'bg-gray-100'
                                                    }`}>
                                                        <Building className={`w-5 h-5 sm:w-6 sm:h-6 ${
                                                            formData.operationTypes?.includes('cooperativa')
                                                                ? 'text-emerald-600'
                                                                : 'text-gray-600'
                                                        }`} />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                                                            Cooperativa / Fazenda estruturada
                                                        </h3>
                                                    </div>
                                                </div>
                                            </Label>
                                        </div>

                                        <div className="relative">
                                            <Checkbox
                                                id="outros-pj"
                                                checked={formData.operationTypes?.includes('outros-pj') || false}
                                                onCheckedChange={(checked) => handleOperationTypeChange('outros-pj', checked as boolean)}
                                                className="sr-only"
                                            />
                                            <Label
                                                htmlFor="outros-pj"
                                                className={`flex items-center p-4 sm:p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                                                    formData.operationTypes?.includes('outros-pj')
                                                        ? 'border-emerald-500 bg-emerald-50'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            >
                                                <div className="flex items-center space-x-3 sm:space-x-4">
                                                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                                        formData.operationTypes?.includes('outros-pj')
                                                            ? 'bg-emerald-100'
                                                            : 'bg-gray-100'
                                                    }`}>
                                                        <Building className={`w-5 h-5 sm:w-6 sm:h-6 ${
                                                            formData.operationTypes?.includes('outros-pj')
                                                                ? 'text-emerald-600'
                                                                : 'text-gray-600'
                                                        }`} />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                                                            Outros
                                                        </h3>
                                                    </div>
                                                </div>
                                            </Label>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="activityType" className="text-sm font-medium text-gray-700">
                                        Tipo de atividade
                                    </Label>
                                    <Select value={formData.activityType} onValueChange={(value) => handleInputChange('activityType', value)}>
                                        <SelectTrigger className="h-12 text-lg border-2 border-gray-200 focus:border-emerald-500">
                                            <SelectValue placeholder="Selecione o tipo de atividade" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pecuarista">Pecuarista (gado de corte ou leite)</SelectItem>
                                            <SelectItem value="criador-cavalos">Criador de cavalos</SelectItem>
                                            <SelectItem value="produtor-rural">Produtor rural / Agricultor</SelectItem>
                                            <SelectItem value="hobby">Hobby / Criador eventual</SelectItem>
                                            <SelectItem value="outros">Outros</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="farmSize" className="text-sm font-medium text-gray-700">
                                        Tamanho aproximado da propriedade (hectares)
                                    </Label>
                                    <Input
                                        id="farmSize"
                                        type="number"
                                        placeholder="Ex: 100"
                                        value={formData.farmSize}
                                        onChange={(e) => handleInputChange('farmSize', e.target.value)}
                                        className="h-12 text-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                                    />
                                </div>
                            </div>
                        </div>
                    )
                }

                // Formulário para Pessoa Física - Dados da propriedade
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-6 sm:mb-8">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                                Dados da propriedade
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600">
                                Informe os dados da sua fazenda ou propriedade
                            </p>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                            <p className="text-sm text-blue-800 text-center">
                                <strong>Não se preocupe se ainda não tiver todas as informações!</strong> Você poderá preencher os dados faltantes mais tarde, direto no seu painel.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="farmName" className="text-sm font-medium text-gray-700">
                                    Nome da fazenda/propriedade
                                </Label>
                                <div className="relative">
                                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <Input
                                        id="farmName"
                                        type="text"
                                        placeholder="Fazenda Boa Vista"
                                        value={formData.farmName}
                                        onChange={(e) => handleInputChange('farmName', e.target.value)}
                                        className="pl-10 h-12 text-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="state" className="text-sm font-medium text-gray-700">
                                        Estado
                                    </Label>
                                    <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                                        <SelectTrigger className="h-12 text-lg border-2 border-gray-200 focus:border-emerald-500">
                                            <SelectValue placeholder="Selecione o estado" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="ac">Acre</SelectItem>
                                            <SelectItem value="al">Alagoas</SelectItem>
                                            <SelectItem value="ap">Amapá</SelectItem>
                                            <SelectItem value="am">Amazonas</SelectItem>
                                            <SelectItem value="ba">Bahia</SelectItem>
                                            <SelectItem value="ce">Ceará</SelectItem>
                                            <SelectItem value="df">Distrito Federal</SelectItem>
                                            <SelectItem value="es">Espírito Santo</SelectItem>
                                            <SelectItem value="go">Goiás</SelectItem>
                                            <SelectItem value="ma">Maranhão</SelectItem>
                                            <SelectItem value="mt">Mato Grosso</SelectItem>
                                            <SelectItem value="ms">Mato Grosso do Sul</SelectItem>
                                            <SelectItem value="mg">Minas Gerais</SelectItem>
                                            <SelectItem value="pa">Pará</SelectItem>
                                            <SelectItem value="pb">Paraíba</SelectItem>
                                            <SelectItem value="pr">Paraná</SelectItem>
                                            <SelectItem value="pe">Pernambuco</SelectItem>
                                            <SelectItem value="pi">Piauí</SelectItem>
                                            <SelectItem value="rj">Rio de Janeiro</SelectItem>
                                            <SelectItem value="rn">Rio Grande do Norte</SelectItem>
                                            <SelectItem value="rs">Rio Grande do Sul</SelectItem>
                                            <SelectItem value="ro">Rondônia</SelectItem>
                                            <SelectItem value="rr">Roraima</SelectItem>
                                            <SelectItem value="sc">Santa Catarina</SelectItem>
                                            <SelectItem value="sp">São Paulo</SelectItem>
                                            <SelectItem value="se">Sergipe</SelectItem>
                                            <SelectItem value="to">Tocantins</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                                        Cidade
                                    </Label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <Input
                                            id="city"
                                            type="text"
                                            placeholder="Sua cidade"
                                            value={formData.city}
                                            onChange={(e) => handleInputChange('city', e.target.value)}
                                            className="pl-10 h-12 text-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="activityType" className="text-sm font-medium text-gray-700">
                                    Tipo de atividade
                                </Label>
                                <Select value={formData.activityType} onValueChange={(value) => handleInputChange('activityType', value)}>
                                    <SelectTrigger className="h-12 text-lg border-2 border-gray-200 focus:border-emerald-500">
                                        <SelectValue placeholder="Selecione o tipo de atividade" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="pecuarista">Pecuarista (gado de corte ou leite)</SelectItem>
                                        <SelectItem value="criador-cavalos">Criador de cavalos</SelectItem>
                                        <SelectItem value="produtor-rural">Produtor rural / Agricultor</SelectItem>
                                        <SelectItem value="hobby">Hobby / Criador eventual</SelectItem>
                                        <SelectItem value="outros">Outros</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="farmSize" className="text-sm font-medium text-gray-700">
                                    Tamanho aproximado da propriedade (hectares)
                                </Label>
                                <Input
                                    id="farmSize"
                                    type="number"
                                    placeholder="Ex: 100"
                                    value={formData.farmSize}
                                    onChange={(e) => handleInputChange('farmSize', e.target.value)}
                                    className="h-12 text-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                                />
                            </div>
                        </div>
                    </div>
                )

            case 4:
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-6 sm:mb-8">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                                Confirmação
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600">
                                Revise seus dados antes de finalizar o cadastro
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-4 sm:p-6 space-y-4">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Resumo do cadastro</h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                                <div>
                                    <span className="text-gray-600">Tipo de conta:</span>
                                    <span className="ml-2 font-medium text-gray-900">
                                        {formData.accountType === 'pf' ? 'Pessoa Física' : 'Pessoa Jurídica'}
                                    </span>
                                </div>
                                
                                {formData.accountType === 'pj' ? (
                                    <>
                                        <div>
                                            <span className="text-gray-600">Empresa:</span>
                                            <span className="ml-2 font-medium text-gray-900">{formData.companyName}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">CNPJ:</span>
                                            <span className="ml-2 font-medium text-gray-900">{formData.cnpj}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">Responsável legal:</span>
                                            <span className="ml-2 font-medium text-gray-900">{formData.legalRepresentativeName}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">CPF do responsável:</span>
                                            <span className="ml-2 font-medium text-gray-900">{formData.legalRepresentativeCpf}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">E-mail corporativo:</span>
                                            <span className="ml-2 font-medium text-gray-900">{formData.corporateEmail}</span>
                                        </div>
                                        {formData.operationTypes && formData.operationTypes.length > 0 && (
                                            <div className="col-span-1 sm:col-span-2">
                                                <span className="text-gray-600">Tipo de atuação:</span>
                                                <div className="mt-1 space-y-1">
                                                    {formData.operationTypes.map((type, index) => (
                                                        <div key={index} className="ml-2 font-medium text-gray-900">
                                                            • {getOperationTypeLabel(type)}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <div>
                                            <span className="text-gray-600">Nome:</span>
                                            <span className="ml-2 font-medium text-gray-900">{formData.fullName}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">CPF:</span>
                                            <span className="ml-2 font-medium text-gray-900">{formData.cpf}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">E-mail:</span>
                                            <span className="ml-2 font-medium text-gray-900">{formData.email}</span>
                                        </div>
                                    </>
                                )}
                                
                                <div>
                                    <span className="text-gray-600">Telefone:</span>
                                    <span className="ml-2 font-medium text-gray-900">{formData.phone}</span>
                                </div>
                                
                                {formData.farmName && (
                                    <div>
                                        <span className="text-gray-600">Fazenda:</span>
                                        <span className="ml-2 font-medium text-gray-900">{formData.farmName}</span>
                                    </div>
                                )}
                                
                                {(formData.city || formData.state) && (
                                    <div>
                                        <span className="text-gray-600">Localização:</span>
                                        <span className="ml-2 font-medium text-gray-900">
                                            {formData.city && formData.state 
                                                ? `${formData.city}, ${getStateLabel(formData.state)}`
                                                : formData.city || getStateLabel(formData.state)}
                                        </span>
                                    </div>
                                )}
                                
                                {formData.activityType && (
                                    <div>
                                        <span className="text-gray-600">Tipo de atividade:</span>
                                        <span className="ml-2 font-medium text-gray-900">{getActivityTypeLabel(formData.activityType)}</span>
                                    </div>
                                )}
                                
                                {formData.farmSize && (
                                    <div>
                                        <span className="text-gray-600">Tamanho aproximado:</span>
                                        <span className="ml-2 font-medium text-gray-900">{formData.farmSize} hectares</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <Checkbox
                                    id="terms"
                                    checked={formData.acceptTerms}
                                    onCheckedChange={(checked) => handleInputChange('acceptTerms', checked as boolean)}
                                />
                                <Label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                                    Li e aceito os{' '}
                                    <Link href="/termos" className="text-emerald-600 hover:text-emerald-700 font-medium">
                                        Termos de Uso
                                    </Link>
                                    {' '}e a{' '}
                                    <Link href="/privacidade" className="text-emerald-600 hover:text-emerald-700 font-medium">
                                        Política de Privacidade
                                    </Link>
                                </Label>
                            </div>

                            <div className="flex items-start space-x-3">
                                <Checkbox id="newsletter" />
                                <Label htmlFor="newsletter" className="text-sm text-gray-600 leading-relaxed">
                                    Quero receber ofertas e novidades por e-mail
                                </Label>
                            </div>
                        </div>
                    </div>
                )

            default:
                return null
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
            {/* Centralized Registration Form */}
            <div className="flex items-center justify-center min-h-screen pt-2 sm:pt-3 lg:pt-4 pb-4 sm:pb-6 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-4xl">
                    {/* Logo */}
                    <div className="flex items-center justify-center mb-3 sm:mb-4">
                        <img
                            src="/fotos/tudo-agro-logo.png"
                            className="h-36 w-auto sm:h-40 md:h-44 lg:h-48 xl:h-52"
                            alt="TudoAgro Logo"
                        />
                    </div>

                    {/* Main Registration Card */}
                    <Card className="shadow-2xl border-0">
                        <CardContent className="p-6 sm:p-8">
                            {/* Título e Subtítulo */}
                            <div className="text-center mb-6 sm:mb-8">
                                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                                    Criar Conta
                                </h1>
                                <p className="text-xs sm:text-sm md:text-base text-gray-600">
                                    Cadastre-se e tenha acesso ao melhor do agronegócio
                                </p>
                            </div>

                            {/* Botão de Voltar */}
                            <div className="mb-4 sm:mb-6">
                                <Link href="/">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        className="text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 p-2 text-sm sm:text-base"
                                    >
                                        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                        <span className="hidden sm:inline">Voltar ao início</span>
                                        <span className="sm:hidden">Voltar</span>
                                    </Button>
                                </Link>
                            </div>

                            {/* Progress Steps */}
                            <div className="mb-6 sm:mb-8">
                                <div className="flex items-center justify-center overflow-x-auto pb-2">
                                    {steps.map((step, index) => (
                                        <div key={step.number} className="flex items-center flex-shrink-0">
                                            <div className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold ${
                                                currentStep >= step.number
                                                    ? 'bg-emerald-600 text-white'
                                                    : 'bg-gray-200 text-gray-600'
                                            }`}>
                                                {step.number}
                                            </div>
                                            {index < steps.length - 1 && (
                                                <div className={`w-8 sm:w-12 lg:w-20 h-1 mx-2 sm:mx-3 ${
                                                    currentStep > step.number ? 'bg-emerald-600' : 'bg-gray-200'
                                                }`} />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <form onSubmit={handleSubmit}>
                                {renderStepContent()}

                                <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 mt-6 sm:mt-8">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handlePrevious}
                                        disabled={currentStep === 1}
                                        className="w-full sm:w-auto px-6 sm:px-8 py-3 text-sm sm:text-base"
                                    >
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Anterior
                                    </Button>

                                    {currentStep < 4 ? (
                                        <Button
                                            type="button"
                                            onClick={handleNext}
                                            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-6 sm:px-8 py-3 text-sm sm:text-base"
                                        >
                                            Próximo
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    ) : (
                                        <Button
                                            type="submit"
                                            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-6 sm:px-8 py-3 text-sm sm:text-base"
                                            disabled={isLoading || !formData.acceptTerms}
                                        >
                                            {isLoading ? (
                                                <div className="flex items-center">
                                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                                    Criando conta...
                                                </div>
                                            ) : (
                                                <>
                                                    <CheckCircle className="w-4 h-4 mr-2" />
                                                    Criar conta
                                                </>
                                            )}
                                        </Button>
                                    )}
                                </div>
                            </form>

                            <div className="mt-4 sm:mt-6 text-center">
                                <p className="text-sm sm:text-base text-gray-600">
                                    Já tem uma conta?{' '}
                                    <Link
                                        href="/login"
                                        className="text-emerald-600 hover:text-emerald-700 font-semibold"
                                    >
                                        Faça login
                                    </Link>
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}