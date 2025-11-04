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
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/use-toast'
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
  const router = useRouter()
  const { signIn } = useAuth()
  const { toast } = useToast()

  // Verificar se há mensagem de sucesso ou redirect na URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const message = urlParams.get('message')
    if (message) {
      setSuccessMessage(message)
      // Limpar a URL mas manter o redirect se existir
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
    
    if (isLoading) return // Prevenir múltiplos submits
    
    setIsLoading(true)

    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const { error } = await signIn(email, password)
      
      if (!error) {
        // Aguardar até que o estado de autenticação seja atualizado
        // Usar um timeout maior para garantir que tudo está pronto
        await new Promise(resolve => setTimeout(resolve, 300))
        
        // Verificar se há parâmetro redirect na URL
        const urlParams = new URLSearchParams(window.location.search)
        const redirectTo = urlParams.get('redirect')
        
        // Redirecionar para a página desejada ou dashboard padrão
        // Usar window.location para evitar loops de redirecionamento
        const destination = redirectTo || '/dashboard/visao-geral'
        
        // Usar replace para evitar que o usuário volte para a página de login
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex flex-col lg:flex-row">
      {/* Left Side - Login Form */}
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
              {/* Título e Subtítulo */}
              <div className="text-center mb-6 sm:mb-8">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Bem-vindo de volta
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">
                  Entre na sua conta para continuar
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

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs sm:text-sm font-medium text-gray-700">
                    E-mail ou WhatsApp
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="seu@email.com ou (11) 99999-9999"
                      className="pl-9 sm:pl-10 h-11 sm:h-12 text-base sm:text-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                      required
                    />
                  </div>
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
                      className="pl-9 sm:pl-10 pr-9 sm:pr-10 h-11 sm:h-12 text-base sm:text-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
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
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={setRememberMe}
                    />
                    <Label htmlFor="remember" className="text-xs sm:text-sm text-gray-600 cursor-pointer">
                      Lembrar de mim
                    </Label>
                  </div>
                  <Link 
                    href="/esqueci-senha" 
                    className="text-xs sm:text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    Esqueceu a senha?
                  </Link>
                </div>

                {successMessage && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                    {successMessage}
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-11 sm:h-12 text-base sm:text-lg font-semibold transition-all duration-300 transform hover:scale-[1.02]"
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
                    className="text-emerald-600 hover:text-emerald-700 font-semibold"
                  >
                    Cadastre-se gratuitamente
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Side - Features */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-emerald-600 to-green-700 p-8 xl:p-12 items-center">
        <div className="max-w-md">
          <h2 className="text-3xl xl:text-4xl font-bold text-white mb-4 xl:mb-6 leading-tight">
            TudoAgro: A plataforma Nº1 do agronegócio digital
          </h2>
          <p className="text-lg xl:text-xl text-emerald-100 mb-6 xl:mb-8 leading-relaxed">
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
                      <span className="block text-emerald-100 font-normal mt-1 text-sm xl:text-base">
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
