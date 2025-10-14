'use client'

import { useState } from 'react'
import { Eye, EyeOff, Shield, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import AdminDashboard from '@/components/AdminDashboard'

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simular delay de autenticação
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (email === 'admin@gmail.com' && password === '123456') {
      setIsAuthenticated(true)
    } else {
      setError('Email ou senha incorretos. Use admin@gmail.com / 123456')
    }
    
    setIsLoading(false)
  }

  if (isAuthenticated) {
    return <AdminDashboard />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E4D2B] to-[#2F6C3F] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo e Título */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">AgroMarket Admin</h1>
          <p className="text-white/80">Painel Administrativo</p>
        </div>

        {/* Card de Login */}
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl text-[#1E4D2B] flex items-center justify-center gap-2">
              <Lock className="w-6 h-6" />
              Acesso Restrito
            </CardTitle>
            <p className="text-[#6E7D5B] text-sm">
              Apenas administradores autorizados
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#2B2E2B] font-medium">
                  Email do Administrador
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 border-2 border-gray-200 focus:border-[#1E4D2B] transition-colors"
                  required
                />
              </div>

              {/* Senha */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#2B2E2B] font-medium">
                  Senha
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 border-2 border-gray-200 focus:border-[#1E4D2B] transition-colors pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#6E7D5B] hover:text-[#1E4D2B] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Erro */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-600 text-sm text-center">{error}</p>
                </div>
              )}

              {/* Botão de Login */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-[#1E4D2B] hover:bg-[#163B20] text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Verificando...
                  </div>
                ) : (
                  'Acessar Painel'
                )}
              </Button>
            </form>

            {/* Credenciais de Teste */}
            <div className="mt-6 p-4 bg-[#F7F6F2] rounded-lg border border-[#C89F45]/20">
              <p className="text-xs text-[#6E7D5B] text-center mb-2 font-medium">
                Credenciais de Teste:
              </p>
              <div className="text-xs text-[#2B2E2B] space-y-1">
                <div className="flex justify-between">
                  <span className="font-medium">Email:</span>
                  <span className="font-mono bg-white px-2 py-1 rounded">admin@gmail.com</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Senha:</span>
                  <span className="font-mono bg-white px-2 py-1 rounded">123456</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-white/60 text-sm">
            © 2024 AgroMarket - Sistema Administrativo
          </p>
        </div>
      </div>
    </div>
  )
}