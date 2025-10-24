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
    CheckCircle,
    Shield,
    Users,
    Award
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

    const handleNext = () => {
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
            // Determinar roles baseado no tipo de conta
            const roles = []
            if (formData.accountType === 'pf') {
                roles.push('comprador')
            } else if (formData.accountType === 'pj') {
                roles.push('vendedor')
            }

            const { error } = await signUp(formData.email, formData.password, {
                name: formData.fullName,
                phone: formData.phone,
                cpf: formData.cpf,
                cnpj: formData.cnpj,
                roles
            })

            if (error) {
                toast({
                    title: "Erro no cadastro",
                    description: error,
                    variant: "destructive",
                })
            } else {
                toast({
                    title: "Conta criada com sucesso!",
                    description: "Sua conta foi criada e você já pode fazer login.",
                })
                // Redirecionar para login
                router.push('/login?message=Conta criada com sucesso! Faça login para continuar.')
            }
        } catch (err) {
            toast({
                title: "Erro interno",
                description: "Ocorreu um erro inesperado. Tente novamente.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    const features = [
        {
            icon: Shield,
            title: "Segurança Total",
            description: "Dados protegidos com criptografia de ponta"
        },
        {
            icon: Users,
            title: "Comunidade Ativa",
            description: "50k+ produtores conectados"
        },
        {
            icon: Award,
            title: "Melhores Negócios",
            description: "Acesse ofertas exclusivas"
        }
    ]

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
                                            <p className="text-sm sm:text-base text-gray-600">Para produtores individuais e pequenos criadores</p>
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
                                            <p className="text-sm sm:text-base text-gray-600">Para empresas, cooperativas e grandes produtores</p>
                                        </div>
                                    </div>
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>
                )

            case 2:
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

                            {formData.accountType === 'pf' ? (
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
                            ) : (
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
                            )}
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
                                            <SelectItem value="sp">São Paulo</SelectItem>
                                            <SelectItem value="mg">Minas Gerais</SelectItem>
                                            <SelectItem value="go">Goiás</SelectItem>
                                            <SelectItem value="mt">Mato Grosso</SelectItem>
                                            <SelectItem value="rs">Rio Grande do Sul</SelectItem>
                                            <SelectItem value="pr">Paraná</SelectItem>
                                            <SelectItem value="sc">Santa Catarina</SelectItem>
                                            <SelectItem value="ba">Bahia</SelectItem>
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
                                <Label htmlFor="farmSize" className="text-sm font-medium text-gray-700">
                                    Tamanho da propriedade (hectares)
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
                                <div>
                                    <span className="text-gray-600">Nome:</span>
                                    <span className="ml-2 font-medium text-gray-900">{formData.fullName}</span>
                                </div>
                                <div>
                                    <span className="text-gray-600">E-mail:</span>
                                    <span className="ml-2 font-medium text-gray-900">{formData.email}</span>
                                </div>
                                <div>
                                    <span className="text-gray-600">Telefone:</span>
                                    <span className="ml-2 font-medium text-gray-900">{formData.phone}</span>
                                </div>
                                <div>
                                    <span className="text-gray-600">Fazenda:</span>
                                    <span className="ml-2 font-medium text-gray-900">{formData.farmName}</span>
                                </div>
                                <div>
                                    <span className="text-gray-600">Localização:</span>
                                    <span className="ml-2 font-medium text-gray-900">{formData.city}, {formData.state}</span>
                                </div>
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
            <div className="flex items-center justify-center min-h-screen p-2 sm:p-4">
                <div className="w-full max-w-4xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center mb-6">
                            <img 
                                src="/fotos/tudo-agro-logo.png" 
                                className="h-16 w-auto sm:h-20 md:h-24 lg:h-28 xl:h-32"
                                alt="TudoAgro Logo"
                            />
                        </div>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                            Criar conta
                        </h1>
                        <p className="text-base sm:text-lg text-gray-600">
                            Junte-se à maior plataforma do agronegócio
                        </p>
                    </div>

                    {/* Features Section - Above the form */}
                    <div className="mb-6 sm:mb-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                            {features.map((feature, index) => (
                                <div key={index} className="text-center p-4 sm:p-6 bg-white/50 rounded-xl border border-emerald-100">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                        <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                                    </div>
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 text-xs sm:text-sm">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Main Registration Card */}
                    <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
                        <CardContent className="p-4 sm:p-6 lg:p-8">
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
                                <div className="mt-4 sm:mt-6 text-center">
                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                                        {steps[currentStep - 1].title}
                                    </h3>
                                    <p className="text-sm sm:text-base text-gray-600">
                                        {steps[currentStep - 1].description}
                                    </p>
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