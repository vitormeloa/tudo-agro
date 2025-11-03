/**
 * Utilitários para formatação de datas
 * Centralizados para evitar duplicação e problemas de hidratação
 */

/**
 * Formata uma data para o formato brasileiro
 * @param date - Data a ser formatada
 * @param includeTime - Se deve incluir hora
 * @returns Data formatada no padrão pt-BR
 */
export function formatDateBR(date: Date | string, includeTime: boolean = false): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  if (includeTime) {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(dateObj)
  }
  
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(dateObj)
}

/**
 * Formata uma data para formato ISO simplificado (YYYY-MM-DD)
 * @param date - Data a ser formatada
 * @returns Data no formato YYYY-MM-DD
 */
export function formatDateISO(date: Date): string {
  return date.toISOString().split('T')[0]
}

/**
 * Calcula o tempo restante entre duas datas
 * @param endTime - Data final
 * @param now - Data atual (opcional, padrão: agora)
 * @returns String formatada com tempo restante ou "Encerrado"
 */
export function formatTimeLeft(endTime: Date, now?: Date): string {
  const nowDate = now || new Date()
  const diff = endTime.getTime() - nowDate.getTime()
  
  if (diff <= 0) return "Encerrado"
  
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  
  return `${hours}h ${minutes}m`
}

/**
 * Obtém o ano atual
 * @returns Ano atual
 */
export function getCurrentYear(): number {
  return new Date().getFullYear()
}

/**
 * Cria uma data relativa (X dias atrás)
 * @param days - Número de dias no passado
 * @returns Data criada
 */
export function daysAgo(days: number): Date {
  const date = new Date()
  date.setDate(date.getDate() - days)
  return date
}

/**
 * Cria uma data relativa (X horas atrás)
 * @param hours - Número de horas no passado
 * @returns Data criada
 */
export function hoursAgo(hours: number): Date {
  const date = new Date()
  date.setHours(date.getHours() - hours)
  return date
}
