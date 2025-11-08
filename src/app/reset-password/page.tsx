'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/useAuth'
import { 
  Lock, 
  Eye, 
  EyeOff,
  CheckCircle
} from 'lucide-react'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')
  
  const { updatePassword } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Verificar se há token de redefinição na URL
    const accessToken = searchParams.get('access_token')
    const refreshToken = searchParams.get('refresh_token')
    
    if (!accessToken || !refreshToken) {
      setError('Link de redefinição inválido ou expirado.')
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.')
      return
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const { error } = await updatePassword(password)
      
      if (!error) {
        setIsSuccess(true)
        setTimeout(() => {
          router.push('/login')
        }, 3000)
      }
    } catch (error) {
      setError('Erro ao redefinir senha. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-primary/5 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-2xl border-0">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              
              <h1 className="text-2xl font-bold text-[#101828] mb-4">
                Senha redefinida!
              </h1>
              
              <p className="text-gray-600 mb-6">
                Sua senha foi redefinida com sucesso. Você será redirecionado para o login em alguns segundos.
              </p>
              
              <Button 
                onClick={() => router.push('/login')}
                className="w-full bg-primary hover:bg-[#2E7A5A]"
              >
                Ir para o login
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (error && !password) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-primary/5 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-2xl border-0">
            <CardContent className="p-8 text-center">
              <h1 className="text-2xl font-bold text-red-600 mb-4">
                Link inválido
              </h1>
              
              <p className="text-gray-600 mb-6">
                {error}
              </p>
              
              <Button 
                onClick={() => router.push('/esqueci-senha')}
                className="w-full bg-primary hover:bg-[#2E7A5A]"
              >
                Solicitar novo link
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <img 
              src="/fotos/tudo-agro-logo.png" 
              className="h-16 w-auto"
              alt="TudoAgro Logo"
            />
          </div>
          <h1 className="text-3xl font-bold text-[#101828] mb-2">
            Redefinir senha
          </h1>
          <p className="text-gray-600">
            Digite sua nova senha
          </p>
        </div>

        <Card className="shadow-2xl border-0">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Nova senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Mínimo 6 caracteres"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 text-lg border-2 border-gray-200 focus:border-primary focus:ring-primary/20"
                    required
                    minLength={6}
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
                  Confirmar nova senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirme sua nova senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 text-lg border-2 border-gray-200 focus:border-primary focus:ring-primary/20"
                    required
                    minLength={6}
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

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-[#2E7A5A] text-white h-12 text-lg font-semibold"
                disabled={isLoading || !password || !confirmPassword}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Redefinindo...
                  </div>
                ) : (
                  'Redefinir senha'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}