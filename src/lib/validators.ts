/**
 * Funções de validação para formulários
 */

// Validar e-mail
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validar CPF
export function validateCPF(cpf: string): boolean {
  // Remove caracteres não numéricos
  const cleanCPF = cpf.replace(/\D/g, '')

  // Verifica se tem 11 dígitos
  if (cleanCPF.length !== 11) return false

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1+$/.test(cleanCPF)) return false

  // Validação do primeiro dígito verificador
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i)
  }
  let digit = 11 - (sum % 11)
  if (digit >= 10) digit = 0
  if (digit !== parseInt(cleanCPF.charAt(9))) return false

  // Validação do segundo dígito verificador
  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i)
  }
  digit = 11 - (sum % 11)
  if (digit >= 10) digit = 0
  if (digit !== parseInt(cleanCPF.charAt(10))) return false

  return true
}

// Validar CNPJ
export function validateCNPJ(cnpj: string): boolean {
  // Remove caracteres não numéricos
  const cleanCNPJ = cnpj.replace(/\D/g, '')

  // Verifica se tem 14 dígitos
  if (cleanCNPJ.length !== 14) return false

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1+$/.test(cleanCNPJ)) return false

  // Validação do primeiro dígito verificador
  let length = cleanCNPJ.length - 2
  let numbers = cleanCNPJ.substring(0, length)
  const digits = cleanCNPJ.substring(length)
  let sum = 0
  let pos = length - 7

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--
    if (pos < 2) pos = 9
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
  if (result !== parseInt(digits.charAt(0))) return false

  // Validação do segundo dígito verificador
  length = length + 1
  numbers = cleanCNPJ.substring(0, length)
  sum = 0
  pos = length - 7

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--
    if (pos < 2) pos = 9
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
  if (result !== parseInt(digits.charAt(1))) return false

  return true
}

// Validar telefone (aceita celular com 9 dígitos)
export function validatePhone(phone: string): boolean {
  const cleanPhone = phone.replace(/\D/g, '')
  // Aceita telefones com 10 (fixo) ou 11 dígitos (celular)
  return cleanPhone.length === 10 || cleanPhone.length === 11
}

// Validar senha (mínimo 8 caracteres, com pelo menos uma letra e um número)
export function validatePassword(password: string): boolean {
  if (password.length < 8) return false
  const hasLetter = /[a-zA-Z]/.test(password)
  const hasNumber = /\d/.test(password)
  return hasLetter && hasNumber
}

// Validar confirmação de senha
export function validatePasswordMatch(password: string, confirmPassword: string): boolean {
  return password === confirmPassword && password.length > 0
}

// Validar nome completo (pelo menos 2 palavras)
export function validateFullName(name: string): boolean {
  const trimmedName = name.trim()
  const words = trimmedName.split(/\s+/)
  return words.length >= 2 && words.every(word => word.length > 0)
}

// Mensagens de erro padronizadas
export const validationMessages = {
  email: {
    required: 'E-mail é obrigatório',
    invalid: 'E-mail inválido',
  },
  cpf: {
    required: 'CPF é obrigatório',
    invalid: 'CPF inválido',
  },
  cnpj: {
    required: 'CNPJ é obrigatório',
    invalid: 'CNPJ inválido',
  },
  phone: {
    required: 'Telefone é obrigatório',
    invalid: 'Telefone inválido. Use formato: (11) 99999-9999',
  },
  password: {
    required: 'Senha é obrigatória',
    invalid: 'A senha deve ter no mínimo 8 caracteres, incluindo letras e números',
    mismatch: 'As senhas não coincidem',
  },
  name: {
    required: 'Nome é obrigatório',
    invalid: 'Digite o nome completo (nome e sobrenome)',
  },
  generic: {
    required: 'Este campo é obrigatório',
  },
}
