/**
 * Calcula o frete baseado no CEP e distância estimada
 */

export interface FreightResult {
  price: number
  deliveryDays: {
    min: number
    max: number
  }
  estimatedDelivery: {
    min: Date
    max: Date
  }
  formattedDelivery: string
}

/**
 * Calcula dias úteis adicionando dias úteis a partir de hoje
 */
function addBusinessDays(startDate: Date, days: number): Date {
  const result = new Date(startDate)
  let addedDays = 0
  
  while (addedDays < days) {
    result.setDate(result.getDate() + 1)
    // Pular finais de semana (sábado = 6, domingo = 0)
    if (result.getDay() !== 0 && result.getDay() !== 6) {
      addedDays++
    }
  }
  
  return result
}

/**
 * Formata a data para exibição (ex: "quarta-feira 10/nov")
 */
function formatDeliveryDate(date: Date): string {
  const daysOfWeek = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado']
  const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']
  
  const dayOfWeek = daysOfWeek[date.getDay()]
  const day = date.getDate()
  const month = months[date.getMonth()]
  
  return `${dayOfWeek} ${day}/${month}`
}

/**
 * Calcula o frete baseado no CEP
 * Regras:
 * - CEPs da mesma região: 1-2 dias úteis, frete R$ 15-25
 * - CEPs de região diferente: 3-5 dias úteis, frete R$ 30-50
 * - CEPs muito distantes: 5-7 dias úteis, frete R$ 50-80
 */
export function calculateFreight(cep: string, productLocation?: string): FreightResult | null {
  // Remover caracteres não numéricos
  const cleanCep = cep.replace(/\D/g, '')
  
  // Validar CEP (deve ter 8 dígitos)
  if (cleanCep.length !== 8) {
    return null
  }
  
  // Extrair região do CEP (primeiros 3 dígitos)
  const cepRegion = parseInt(cleanCep.substring(0, 3))
  
  // Determinar distância baseada na região do CEP
  // Regiões: 010-199 (SP), 200-289 (RJ), 290-299 (ES), 300-399 (MG), etc.
  let deliveryDays: { min: number; max: number }
  let freightPrice: number
  
  // Região Sudeste (010-399)
  if (cepRegion >= 10 && cepRegion < 400) {
    // Se o produto também está no Sudeste, frete mais rápido
    if (productLocation?.toLowerCase().includes('sp') || 
        productLocation?.toLowerCase().includes('rj') ||
        productLocation?.toLowerCase().includes('mg') ||
        productLocation?.toLowerCase().includes('es')) {
      deliveryDays = { min: 1, max: 2 }
      freightPrice = 15 + Math.floor(Math.random() * 10) // R$ 15-25
    } else {
      deliveryDays = { min: 3, max: 5 }
      freightPrice = 30 + Math.floor(Math.random() * 20) // R$ 30-50
    }
  }
  // Região Sul (800-899)
  else if (cepRegion >= 800 && cepRegion < 900) {
    if (productLocation?.toLowerCase().includes('pr') || 
        productLocation?.toLowerCase().includes('sc') ||
        productLocation?.toLowerCase().includes('rs')) {
      deliveryDays = { min: 1, max: 2 }
      freightPrice = 15 + Math.floor(Math.random() * 10) // R$ 15-25
    } else {
      deliveryDays = { min: 3, max: 5 }
      freightPrice = 30 + Math.floor(Math.random() * 20) // R$ 30-50
    }
  }
  // Região Centro-Oeste (700-799)
  else if (cepRegion >= 700 && cepRegion < 800) {
    if (productLocation?.toLowerCase().includes('go') || 
        productLocation?.toLowerCase().includes('mt') ||
        productLocation?.toLowerCase().includes('ms') ||
        productLocation?.toLowerCase().includes('df')) {
      deliveryDays = { min: 1, max: 2 }
      freightPrice = 15 + Math.floor(Math.random() * 10) // R$ 15-25
    } else {
      deliveryDays = { min: 4, max: 6 }
      freightPrice = 40 + Math.floor(Math.random() * 20) // R$ 40-60
    }
  }
  // Região Nordeste (400-699)
  else if (cepRegion >= 400 && cepRegion < 700) {
    if (productLocation?.toLowerCase().includes('ba') || 
        productLocation?.toLowerCase().includes('pe') ||
        productLocation?.toLowerCase().includes('ce') ||
        productLocation?.toLowerCase().includes('ne')) {
      deliveryDays = { min: 2, max: 3 }
      freightPrice = 20 + Math.floor(Math.random() * 15) // R$ 20-35
    } else {
      deliveryDays = { min: 5, max: 7 }
      freightPrice = 50 + Math.floor(Math.random() * 30) // R$ 50-80
    }
  }
  // Região Norte (660-699 e outras)
  else {
    deliveryDays = { min: 5, max: 7 }
    freightPrice = 50 + Math.floor(Math.random() * 30) // R$ 50-80
  }
  
  // Calcular datas de entrega
  const today = new Date()
  const minDelivery = addBusinessDays(today, deliveryDays.min)
  const maxDelivery = addBusinessDays(today, deliveryDays.max)
  
  // Formatar entrega
  const formattedMin = formatDeliveryDate(minDelivery)
  const formattedMax = formatDeliveryDate(maxDelivery)
  
  const formattedDelivery = `Chegará entre ${formattedMin} e ${formattedMax}`
  
  return {
    price: freightPrice,
    deliveryDays,
    estimatedDelivery: {
      min: minDelivery,
      max: maxDelivery
    },
    formattedDelivery
  }
}

/**
 * Formata CEP para exibição (00000-000)
 */
export function formatCEP(cep: string): string {
  const cleanCep = cep.replace(/\D/g, '')
  if (cleanCep.length === 8) {
    return `${cleanCep.substring(0, 5)}-${cleanCep.substring(5)}`
  }
  return cleanCep
}
