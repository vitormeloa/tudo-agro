import React from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface MaskedInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  mask: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}

// Função para aplicar máscara
const applyMask = (value: string, mask: string): string => {
  if (!value) return ''

  // Remove todos os caracteres não numéricos
  const numbers = value.replace(/\D/g, '')

  // Aplica a máscara baseada no padrão
  if (mask === '999.999.999-99') {
    // CPF: 999.999.999-99
    return numbers
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .slice(0, 14)
  } else if (mask === '99.999.999/9999-99') {
    // CNPJ: 99.999.999/9999-99
    return numbers
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d{1,2})/, '$1-$2')
      .slice(0, 18)
  } else if (mask === '(99) 99999-9999') {
    // Telefone: (99) 99999-9999
    if (numbers.length <= 10) {
      return numbers
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d{1,4})/, '$1-$2')
        .slice(0, 14)
    } else {
      return numbers
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d{1,4})/, '$1-$2')
        .slice(0, 15)
    }
  } else if (mask === '99999-999') {
    // CEP: 99999-999
    return numbers
      .replace(/(\d{5})(\d{1,3})/, '$1-$2')
      .slice(0, 9)
  } else if (mask === '99/99/9999') {
    // Data: 99/99/9999
    return numbers
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .slice(0, 10)
  }

  return numbers
}

export const MaskedInput = React.forwardRef<HTMLInputElement, MaskedInputProps>(
  ({ mask, value, onChange, className, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const maskedValue = applyMask(e.target.value, mask)

      // Criar novo evento com valor mascarado
      const newEvent = {
        ...e,
        target: {
          ...e.target,
          value: maskedValue
        }
      } as React.ChangeEvent<HTMLInputElement>

      onChange(newEvent)
    }

    return (
      <Input
        {...props}
        ref={ref}
        value={value}
        onChange={handleChange}
        className={cn(className)}
      />
    )
  }
)

MaskedInput.displayName = 'MaskedInput'
