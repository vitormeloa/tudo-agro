/**
 * Utilitários para formatação de valores
 * Centralizados para evitar duplicação
 */

/**
 * Formata um valor monetário para o padrão brasileiro
 * @param value - Valor numérico a ser formatado
 * @param options - Opções de formatação
 * @returns String formatada como moeda brasileira
 */
export function formatCurrency(
  value: number,
  options: {
    minimumFractionDigits?: number
    maximumFractionDigits?: number
  } = {}
): string {
  const {
    minimumFractionDigits = 2,
    maximumFractionDigits = 2
  } = options

  return value.toLocaleString('pt-BR', {
    minimumFractionDigits,
    maximumFractionDigits
  })
}

/**
 * Formata um valor monetário com símbolo R$
 * @param value - Valor numérico a ser formatado
 * @param options - Opções de formatação
 * @returns String formatada com R$ prefix
 */
export function formatCurrencyBR(
  value: number,
  options: {
    minimumFractionDigits?: number
    maximumFractionDigits?: number
  } = {}
): string {
  return `R$ ${formatCurrency(value, options)}`
}
