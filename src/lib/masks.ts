/**
 * Funções de máscara para formatação de inputs
 */

// Aplicar máscara de CPF
export function maskCPF(value: string): string {
  return value
    .replace(/\D/g, '') // Remove tudo que não é dígito
    .replace(/(\d{3})(\d)/, '$1.$2') // Coloca ponto após os primeiros 3 dígitos
    .replace(/(\d{3})(\d)/, '$1.$2') // Coloca ponto após os segundos 3 dígitos
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2') // Coloca hífen antes dos últimos 2 dígitos
}

// Aplicar máscara de CNPJ
export function maskCNPJ(value: string): string {
  return value
    .replace(/\D/g, '') // Remove tudo que não é dígito
    .replace(/(\d{2})(\d)/, '$1.$2') // Coloca ponto após os primeiros 2 dígitos
    .replace(/(\d{3})(\d)/, '$1.$2') // Coloca ponto após os próximos 3 dígitos
    .replace(/(\d{3})(\d)/, '$1/$2') // Coloca barra após os próximos 3 dígitos
    .replace(/(\d{4})(\d{1,2})$/, '$1-$2') // Coloca hífen antes dos últimos 2 dígitos
}

// Aplicar máscara de telefone
export function maskPhone(value: string): string {
  const numbers = value.replace(/\D/g, '')

  if (numbers.length <= 10) {
    // Telefone fixo: (11) 1234-5678
    return numbers
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d{1,4})$/, '$1-$2')
  } else {
    // Celular: (11) 91234-5678
    return numbers
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d{1,4})$/, '$1-$2')
  }
}

// Remover máscara (deixar apenas números)
export function removeMask(value: string): string {
  return value.replace(/\D/g, '')
}

// Limitar tamanho do input
export function limitLength(value: string, maxLength: number): string {
  return value.slice(0, maxLength)
}

// Aplicar máscara de CEP
export function maskCEP(value: string): string {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{5})(\d{1,3})$/, '$1-$2')
}

// Aplicar máscara de cartão de crédito
export function maskCreditCard(value: string): string {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{4})(\d)/, '$1 $2')
    .replace(/(\d{4})(\d)/, '$1 $2')
    .replace(/(\d{4})(\d)/, '$1 $2')
    .replace(/(\d{4})(\d{1,4})$/, '$1 $2')
}

// Aplicar máscara de moeda (R$)
export function maskCurrency(value: string): string {
  let numbers = value.replace(/\D/g, '')

  if (numbers.length === 0) return ''

  // Converte para centavos
  const cents = parseInt(numbers)
  const reais = cents / 100

  return reais.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

// Padrões de máscaras para o componente MaskedInput
export const maskPatterns = {
  cpf: '999.999.999-99',
  cnpj: '99.999.999/9999-99',
  phone: '(99) 99999-9999',
  cep: '99999-999',
  date: '99/99/9999',
}
