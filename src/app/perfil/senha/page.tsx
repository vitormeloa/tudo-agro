'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Lock, Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import ProtectedRoute from '@/components/ProtectedRoute'
import { toast } from '@/hooks/use-toast'

function TrocarSenhaContent() {
  const { changePassword } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Limpar erro ao digitar
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }))
  }

  const validateForm = () => {
    const newErrors = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }

    let isValid = true

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'A senha atual é obrigatória'
      isValid = false
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'A nova senha é obrigatória'
      isValid = false
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'A senha deve ter pelo menos 6 caracteres'
      isValid = false
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirme a nova senha'
      isValid = false
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem'
      isValid = false
    }

    if (formData.currentPassword === formData.newPassword && formData.currentPassword) {
      newErrors.newPassword = 'A nova senha deve ser diferente da atual'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const result = await changePassword(formData.currentPassword, formData.newPassword)

      if (result.error) {
        toast({
          title: 'Erro ao alterar senha',
          description: result.error,
          variant: 'destructive',
        })
        return
      }

      toast({
        title: 'Senha alterada!',
        description: 'Sua senha foi atualizada com sucesso.',
      })

      // Limpar formulário
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })

      // Redirecionar de volta para a página de perfil após 1 segundo
      setTimeout(() => {
        router.push('/perfil')
      }, 1000)
    } catch (error: any) {
      console.error('Error changing password:', error)
      toast({
        title: 'Erro ao alterar senha',
        description: error.message || 'Ocorreu um erro ao alterar sua senha.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const PasswordStrengthIndicator = ({ password }: { password: string }) => {
    if (!password) return null

    const strength = {
      score: 0,
      label: '',
      color: '',
    }

    if (password.length >= 8) strength.score++
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength.score++
    if (/\d/.test(password)) strength.score++
    if (/[^a-zA-Z0-9]/.test(password)) strength.score++

    if (strength.score <= 1) {
      strength.label = 'Fraca'
      strength.color = 'bg-red-500'
    } else if (strength.score === 2) {
      strength.label = 'Média'
      strength.color = 'bg-yellow-500'
    } else if (strength.score === 3) {
      strength.label = 'Boa'
      strength.color = 'bg-blue-500'
    } else {
      strength.label = 'Forte'
      strength.color = 'bg-green-500'
    }

    return (
      <div className="mt-2">
        <div className="flex gap-1 mb-1">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded ${
                i < strength.score ? strength.color : 'bg-muted'
              }`}
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Força da senha: <span className="font-medium">{strength.label}</span>
        </p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Header with back button */}
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <h1 className="text-3xl font-bold">Alterar Senha</h1>
        <p className="text-muted-foreground">Atualize sua senha para manter sua conta segura</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Nova Senha
            </CardTitle>
            <CardDescription>
              Sua senha deve ter pelo menos 6 caracteres e incluir uma combinação de letras, números e símbolos.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Current Password */}
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Senha Atual *</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={formData.currentPassword}
                  onChange={handleChange}
                  placeholder="Digite sua senha atual"
                  className={errors.currentPassword ? 'border-red-500' : ''}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              {errors.currentPassword && (
                <p className="text-sm text-red-500">{errors.currentPassword}</p>
              )}
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="newPassword">Nova Senha *</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  name="newPassword"
                  type={showNewPassword ? 'text' : 'password'}
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Digite sua nova senha"
                  className={errors.newPassword ? 'border-red-500' : ''}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              {errors.newPassword && (
                <p className="text-sm text-red-500">{errors.newPassword}</p>
              )}
              <PasswordStrengthIndicator password={formData.newPassword} />
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Nova Senha *</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirme sua nova senha"
                  className={errors.confirmPassword ? 'border-red-500' : ''}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Alterando...' : 'Alterar Senha'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>

      {/* Security Tips */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Dicas de Segurança</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Use pelo menos 8 caracteres com uma combinação de letras maiúsculas e minúsculas</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Inclua números e símbolos especiais para maior segurança</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Evite usar informações pessoais óbvias como datas de nascimento</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Não reutilize senhas de outras contas</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

export default function TrocarSenhaPage() {
  return (
    <ProtectedRoute>
      <TrocarSenhaContent />
    </ProtectedRoute>
  )
}
