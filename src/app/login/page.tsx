'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { InputError } from '@/components/ui/input-error'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/use-toast'
import { validateEmail, validationMessages } from '@/lib/validators'
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Shield,
  Users,
  Award
} from 'lucide-react'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({ email: '', password: '' })
  const router = useRouter()
  const { signIn } = useAuth()
  const { toast } = useToast()

  const handleBlur = (field: string) => {
    let error = ''
    if (field === 'email') {
      if (!formData.email) {
        error = validationMessages.email.required
      } else if (!validateEmail(formData.email)) {
        error = validationMessages.email.invalid
      }
    } else if (field === 'password') {
      if (!formData.password) {
        error = validationMessages.password.required
      }
    }
    setErrors(prev => ({ ...prev, [field]: error }))
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const message = urlParams.get('message')
    if (message) {
      setSuccessMessage(message)
      const redirect = urlParams.get('redirect')
      if (redirect) {
        window.history.replaceState({}, document.title, `${window.location.pathname}?redirect=${encodeURIComponent(redirect)}`)
      } else {
        window.history.replaceState({}, document.title, window.location.pathname)
      }
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isLoading) return

    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = validationMessages.email.required
    } else if (!validateEmail(formData.email)) {
      newErrors.email = validationMessages.email.invalid
    }

    if (!formData.password) {
      newErrors.password = validationMessages.password.required
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      toast({
        title: "Campos inválidos",
        description: "Por favor, corrija os campos destacados em vermelho.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const { error } = await signIn(formData.email, formData.password)
      
      if (!error) {
        await new Promise(resolve => setTimeout(resolve, 300))
        
        const urlParams = new URLSearchParams(window.location.search)
        const redirectTo = urlParams.get('redirect')
        
        const destination = redirectTo || '/dashboard'
        
        window.location.replace(destination)
      }
    } catch (err) {
      console.error('Login error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const features = [
    {
      icon: Shield,
      title: "Segurança nas transações – criptografia de ponta",
      description: ""
    },
    {
      icon: Users,
      title: "Mais de 50 mil produtores ativos",
      description: ""
    },
    {
      icon: Award,
      title: "Preços direto da origem, sem intermediários",
      description: ""
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-primary/5 flex flex-col lg:flex-row">
      {}
      <div className="flex-1 flex items-center justify-center pt-2 sm:pt-3 lg:pt-4 pb-4 sm:pb-6 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-[480px]">
          <div className="flex items-center justify-center mb-3 sm:mb-4">
            <img 
              src="/fotos/tudo-agro-logo.png" 
              className="h-36 w-auto sm:h-40 md:h-44 lg:h-48 xl:h-52"
              alt="TudoAgro Logo"
            />
          </div>

          <Card className="shadow-2xl border-0">
            <CardContent className="p-6 sm:p-8">
              {}
              <div className="text-center mb-6 sm:mb-8">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#101828] mb-2">
                  Bem-vindo de volta
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">
                  Entre na sua conta para continuar
                </p>
              </div>

              {}
              <div className="mb-4 sm:mb-6">
                <Link href="/">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    className="text-gray-600 hover:text-primary hover:bg-primary/5 p-2 text-sm sm:text-base"
                  >
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    <span className="hidden sm:inline">Voltar ao início</span>
                    <span className="sm:hidden">Voltar</span>
                  </Button>
                </Link>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs sm:text-sm font-medium text-gray-700">
                    E-mail
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      onBlur={() => handleBlur('email')}
                      className={`pl-9 sm:pl-10 h-11 sm:h-12 text-base sm:text-lg border-2 ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:border-primary focus:ring-primary/20`}
                      required
                    />
                  </div>
                  <InputError error={errors.email} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-xs sm:text-sm font-medium text-gray-700">
                    Senha
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Sua senha"
                      value={formData.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      onBlur={() => handleBlur('password')}
                      className={`pl-9 sm:pl-10 pr-9 sm:pr-10 h-11 sm:h-12 text-base sm:text-lg border-2 ${errors.password ? 'border-red-500' : 'border-gray-200'} focus:border-primary focus:ring-primary/20`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                    </button>
                  </div>
                  <InputError error={errors.password} />
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked === true)}
                    />
                    <Label htmlFor="remember" className="text-xs sm:text-sm text-gray-600 cursor-pointer">
                      Lembrar de mim
                    </Label>
                  </div>
                  <Link
                    href="/esqueci-senha"
                    className="text-xs sm:text-sm text-primary hover:text-primary font-medium"
                  >
                    Esqueceu a senha?
                  </Link>
                </div>

                {successMessage && (
                  <div className="bg-primary/5 border border-primary/20 text-primary px-4 py-3 rounded-lg text-sm">
                    {successMessage}
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-[#2E7A5A] text-white h-11 sm:h-12 text-base sm:text-lg font-semibold transition-all duration-300 transform hover:scale-[1.02]"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      <span className="text-sm sm:text-base">Entrando...</span>
                    </div>
                  ) : (
                    <>
                      Entrar
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-4 sm:mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-2 bg-white text-xs sm:text-sm text-gray-500">ou continue com</span>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-2 sm:gap-3">
                  <Button variant="outline" className="h-11 sm:h-12 border-2 border-gray-200 hover:bg-gray-50 text-[#101828] hover:text-[#101828] text-sm sm:text-base">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 flex-shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="truncate">Google</span>
                  </Button>
                  <Button variant="outline" className="h-11 sm:h-12 border-2 border-gray-200 hover:bg-gray-50 text-[#101828] hover:text-[#101828] text-sm sm:text-base">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 flex-shrink-0" viewBox="0 0 24 24">
                      <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span className="truncate">Facebook</span>
                  </Button>
                </div>
              </div>

              <div className="mt-4 sm:mt-6 text-center">
                <p className="text-xs sm:text-sm text-gray-600">
                  Não tem uma conta?{' '}
                  <Link 
                    href="/cadastro" 
                    className="text-primary hover:text-primary font-semibold"
                  >
                    Cadastre-se gratuitamente
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-primary to-primary/90 p-8 xl:p-12 items-center">
        <div className="max-w-md">
          <h2 className="text-3xl xl:text-4xl font-bold text-white mb-4 xl:mb-6 leading-tight">
            TudoAgro: A plataforma Nº1 do agronegócio digital
          </h2>
          <p className="text-lg xl:text-xl text-primary-foreground/80 mb-6 xl:mb-8 leading-relaxed">
            Encontre os melhores preços, negocie direto com produtores e faça parte da revolução agro online.
          </p>
          
          <div className="space-y-4 xl:space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3 xl:space-x-4 animate-fade-in-left" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-10 h-10 xl:w-12 xl:h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 xl:w-6 xl:h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base xl:text-lg font-semibold text-white leading-snug">
                    {feature.title}
                    {feature.description && (
                      <span className="block text-primary-foreground/80 font-normal mt-1 text-sm xl:text-base">
                        {feature.description}
                      </span>
                    )}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
