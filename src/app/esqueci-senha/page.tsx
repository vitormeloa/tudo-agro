'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/useAuth'
import { 
  Mail, 
  ArrowLeft,
  CheckCircle
} from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const { resetPassword } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      return
    }

    setIsLoading(true)

    try {
      const { error } = await resetPassword(email)
      
      if (!error) {
        setEmailSent(true)
      }
    } catch (error) {
      // Erro já tratado no hook
    } finally {
      setIsLoading(false)
    }
  }

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-2xl border-0">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Email enviado!
              </h1>
              
              <p className="text-gray-600 mb-6">
                Enviamos um link para redefinir sua senha para <strong>{email}</strong>. 
                Verifique sua caixa de entrada e siga as instruções.
              </p>
              
              <div className="space-y-4">
                <Button 
                  onClick={() => setEmailSent(false)}
                  variant="outline" 
                  className="w-full"
                >
                  Enviar para outro email
                </Button>
                
                <Link href="/login">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                    Voltar ao login
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <img 
              src="/fotos/tudo-agro-logo.png" 
              className="h-16 w-auto"
              alt="TudoAgro Logo"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Esqueceu sua senha?
          </h1>
          <p className="text-gray-600">
            Digite seu email e enviaremos um link para redefinir sua senha
          </p>
        </div>

        <Card className="shadow-2xl border-0">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 text-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-12 text-lg font-semibold"
                disabled={isLoading || !email}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Enviando...
                  </div>
                ) : (
                  'Enviar link de redefinição'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link 
                href="/login" 
                className="text-emerald-600 hover:text-emerald-700 font-medium inline-flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}