// Importar utilitários de data centralizados
import { daysAgo, hoursAgo } from './date-utils'

export type TransactionType = 'compra' | 'venda' | 'reembolso' | 'cashback' | 'taxa' | 'deposito' | 'saque' | 'estorno'
export type PaymentStatus = 'pago' | 'aguardando_pagamento' | 'cancelado' | 'processando'
export type PaymentMethod = 'cartao_credito' | 'cartao_debito' | 'pix' | 'boleto' | 'transferencia' | 'dinheiro'

export interface FinancialTransaction {
  id: string
  type: TransactionType
  description: string
  value: number
  paymentMethod: PaymentMethod
  status: PaymentStatus
  date: Date
  category?: string
  relatedTransactionId?: string
  sellerName?: string
  buyerName?: string
  receiptUrl?: string
  invoiceUrl?: string
  notes?: string
}

export const mockFinancialTransactions: FinancialTransaction[] = [
  // Compras recentes
  {
    id: 'fin-001',
    type: 'compra',
    description: 'Compra de Touro Nelore Premium - Lote #245',
    value: 125000.00,
    paymentMethod: 'pix',
    status: 'pago',
    date: daysAgo(2),
    category: 'Animais',
    sellerName: 'Fazenda Santa Maria',
    receiptUrl: '/receipts/fin-001.pdf',
    invoiceUrl: '/invoices/fin-001.pdf'
  },
  {
    id: 'fin-002',
    type: 'compra',
    description: 'Ração Premium para Gado de Corte - 1000kg',
    value: 4500.00,
    paymentMethod: 'cartao_credito',
    status: 'pago',
    date: daysAgo(5),
    category: 'Produtos',
    sellerName: 'AgroFeed Brasil',
    receiptUrl: '/receipts/fin-002.pdf'
  },
  {
    id: 'fin-003',
    type: 'compra',
    description: 'Sêmen de Touro Nelore Elite - 10 doses',
    value: 3500.00,
    paymentMethod: 'boleto',
    status: 'aguardando_pagamento',
    date: daysAgo(1),
    category: 'Genética',
    sellerName: 'Genética Premium',
    notes: 'Boleto vence em 3 dias'
  },
  {
    id: 'fin-004',
    type: 'compra',
    description: 'Vacinas e Medicamentos Veterinários',
    value: 2800.00,
    paymentMethod: 'cartao_debito',
    status: 'pago',
    date: daysAgo(7),
    category: 'Produtos',
    sellerName: 'VetShop Agro',
    receiptUrl: '/receipts/fin-004.pdf'
  },
  {
    id: 'fin-005',
    type: 'compra',
    description: 'Participação Leilão - Vaca Nelore Preguiça',
    value: 18500.00,
    paymentMethod: 'pix',
    status: 'pago',
    date: daysAgo(3),
    category: 'Animais',
    sellerName: 'Leilão TudoAgro',
    receiptUrl: '/receipts/fin-005.pdf',
    invoiceUrl: '/invoices/fin-005.pdf'
  },
  
  // Vendas (para vendedores)
  {
    id: 'fin-006',
    type: 'venda',
    description: 'Venda de Touro Nelore - Lote #245',
    value: 125000.00,
    paymentMethod: 'pix',
    status: 'pago',
    date: daysAgo(2),
    category: 'Animais',
    buyerName: 'João Silva',
    receiptUrl: '/receipts/fin-006.pdf',
    invoiceUrl: '/invoices/fin-006.pdf',
    notes: 'Recebido via PIX - Taxa de 2% aplicada'
  },
  {
    id: 'fin-007',
    type: 'venda',
    description: 'Venda de Sêmen Nelore Elite - 10 doses',
    value: 3500.00,
    paymentMethod: 'boleto',
    status: 'processando',
    date: daysAgo(1),
    category: 'Genética',
    buyerName: 'Maria Santos',
    notes: 'Aguardando confirmação do pagamento'
  },
  
  // Cashback e Recompensas
  {
    id: 'fin-008',
    type: 'cashback',
    description: 'Cashback - Compra de Ração Premium',
    value: 225.00,
    paymentMethod: 'transferencia',
    status: 'pago',
    date: daysAgo(4),
    category: 'Recompensas',
    relatedTransactionId: 'fin-002',
    notes: '5% de cashback aplicado'
  },
  {
    id: 'fin-009',
    type: 'cashback',
    description: 'Cashback - Compra de Touro Nelore',
    value: 2500.00,
    paymentMethod: 'transferencia',
    status: 'pago',
    date: daysAgo(1),
    category: 'Recompensas',
    relatedTransactionId: 'fin-001',
    notes: '2% de cashback aplicado'
  },
  {
    id: 'fin-010',
    type: 'cashback',
    description: 'Bônus VIP - Pontos Convertidos',
    value: 500.00,
    paymentMethod: 'transferencia',
    status: 'pago',
    date: daysAgo(10),
    category: 'Recompensas',
    notes: 'Conversão de 5000 pontos VIP'
  },
  
  // Taxas e Comissões
  {
    id: 'fin-011',
    type: 'taxa',
    description: 'Taxa de Plataforma - Venda Touro Nelore',
    value: 2500.00,
    paymentMethod: 'cartao_credito',
    status: 'pago',
    date: daysAgo(2),
    category: 'Taxas',
    relatedTransactionId: 'fin-006',
    notes: 'Taxa de 2% sobre venda'
  },
  {
    id: 'fin-012',
    type: 'taxa',
    description: 'Taxa de Anúncio Premium - 30 dias',
    value: 299.00,
    paymentMethod: 'cartao_credito',
    status: 'pago',
    date: daysAgo(15),
    category: 'Taxas',
    receiptUrl: '/receipts/fin-012.pdf'
  },
  {
    id: 'fin-013',
    type: 'taxa',
    description: 'Taxa de Leilão - Participação',
    value: 370.00,
    paymentMethod: 'pix',
    status: 'pago',
    date: daysAgo(3),
    category: 'Taxas',
    relatedTransactionId: 'fin-005',
    receiptUrl: '/receipts/fin-013.pdf'
  },
  
  // Reembolsos
  {
    id: 'fin-014',
    type: 'reembolso',
    description: 'Reembolso - Medicamentos Veterinários Cancelados',
    value: 2800.00,
    paymentMethod: 'transferencia',
    status: 'pago',
    date: daysAgo(6),
    category: 'Reembolsos',
    relatedTransactionId: 'fin-004',
    notes: 'Reembolso completo - Produto não entregue',
    receiptUrl: '/receipts/fin-014.pdf'
  },
  {
    id: 'fin-015',
    type: 'reembolso',
    description: 'Reembolso Parcial - Vacinas com Desconto',
    value: 350.00,
    paymentMethod: 'cartao_credito',
    status: 'processando',
    date: hoursAgo(12),
    category: 'Reembolsos',
    relatedTransactionId: 'fin-004',
    notes: 'Reembolso parcial - Desconto aplicado a posteriori'
  },
  
  // Depósitos
  {
    id: 'fin-016',
    type: 'deposito',
    description: 'Depósito Inicial - Conta TudoAgro',
    value: 50000.00,
    paymentMethod: 'transferencia',
    status: 'pago',
    date: daysAgo(30),
    category: 'Depósitos',
    notes: 'Depósito inicial para início das operações'
  },
  {
    id: 'fin-017',
    type: 'deposito',
    description: 'Depósito - Saldo da Venda',
    value: 122500.00,
    paymentMethod: 'transferencia',
    status: 'pago',
    date: daysAgo(2),
    category: 'Depósitos',
    relatedTransactionId: 'fin-006',
    notes: 'Valor líquido após taxa de plataforma'
  },
  
  // Saques
  {
    id: 'fin-018',
    type: 'saque',
    description: 'Saque para Conta Corrente',
    value: 30000.00,
    paymentMethod: 'transferencia',
    status: 'pago',
    date: daysAgo(8),
    category: 'Saques',
    notes: 'Transferência para conta bancária principal'
  },
  {
    id: 'fin-019',
    type: 'saque',
    description: 'Saque - Pagamento Fornecedor',
    value: 15000.00,
    paymentMethod: 'transferencia',
    status: 'processando',
    date: hoursAgo(6),
    category: 'Saques',
    notes: 'Aguardando processamento bancário'
  },
  
  // Estornos
  {
    id: 'fin-020',
    type: 'estorno',
    description: 'Estorno - Compra Cancelada (Touro Nelore)',
    value: 125000.00,
    paymentMethod: 'pix',
    status: 'pago',
    date: daysAgo(1),
    category: 'Estornos',
    relatedTransactionId: 'fin-001',
    notes: 'Estorno completo - Vendedor cancelou venda',
    receiptUrl: '/receipts/fin-020.pdf'
  },
  
  // Mais compras
  {
    id: 'fin-021',
    type: 'compra',
    description: 'Equipamentos de Monitoramento - GPS para Gado',
    value: 8500.00,
    paymentMethod: 'cartao_credito',
    status: 'pago',
    date: daysAgo(12),
    category: 'Produtos',
    sellerName: 'TechAgro Solutions',
    receiptUrl: '/receipts/fin-021.pdf',
    invoiceUrl: '/invoices/fin-021.pdf'
  },
  {
    id: 'fin-022',
    type: 'compra',
    description: 'Consultoria Veterinária - Plano Anual',
    value: 12000.00,
    paymentMethod: 'boleto',
    status: 'pago',
    date: daysAgo(20),
    category: 'Serviços',
    sellerName: 'VetConsult Premium',
    receiptUrl: '/receipts/fin-022.pdf'
  },
  {
    id: 'fin-023',
    type: 'compra',
    description: 'Vaca Nelore Preguiça - Lote Especial',
    value: 22000.00,
    paymentMethod: 'pix',
    status: 'aguardando_pagamento',
    date: hoursAgo(3),
    category: 'Animais',
    sellerName: 'Fazenda São José',
    notes: 'Pagamento pendente - Aguardando confirmação'
  },
  {
    id: 'fin-024',
    type: 'compra',
    description: 'Fertilizantes Orgânicos - 5000kg',
    value: 6800.00,
    paymentMethod: 'cartao_debito',
    status: 'pago',
    date: daysAgo(9),
    category: 'Produtos',
    sellerName: 'BioFertil Agro',
    receiptUrl: '/receipts/fin-024.pdf'
  },
  
  // Mais vendas
  {
    id: 'fin-025',
    type: 'venda',
    description: 'Venda de Novilhas Nelore - Lote de 5',
    value: 45000.00,
    paymentMethod: 'transferencia',
    status: 'pago',
    date: daysAgo(11),
    category: 'Animais',
    buyerName: 'Pedro Oliveira',
    receiptUrl: '/receipts/fin-025.pdf',
    invoiceUrl: '/invoices/fin-025.pdf',
    notes: 'Venda realizada com sucesso'
  },
  {
    id: 'fin-026',
    type: 'venda',
    description: 'Venda de Ração Premium - 2000kg',
    value: 9000.00,
    paymentMethod: 'pix',
    status: 'pago',
    date: daysAgo(14),
    category: 'Produtos',
    buyerName: 'Carlos Mendes',
    receiptUrl: '/receipts/fin-026.pdf'
  },
  
  // Mais cashback
  {
    id: 'fin-027',
    type: 'cashback',
    description: 'Cashback - Compra de Equipamentos',
    value: 425.00,
    paymentMethod: 'transferencia',
    status: 'pago',
    date: daysAgo(11),
    category: 'Recompensas',
    relatedTransactionId: 'fin-021',
    notes: '5% de cashback aplicado'
  },
  
  // Transações recentes
  {
    id: 'fin-028',
    type: 'compra',
    description: 'Máquina de Ordenha Automática',
    value: 45000.00,
    paymentMethod: 'cartao_credito',
    status: 'pago',
    date: daysAgo(16),
    category: 'Equipamentos',
    sellerName: 'AgroMáquinas Brasil',
    receiptUrl: '/receipts/fin-028.pdf',
    invoiceUrl: '/invoices/fin-028.pdf'
  },
  {
    id: 'fin-029',
    type: 'taxa',
    description: 'Assinatura Premium - Plano Anual',
    value: 1199.00,
    paymentMethod: 'cartao_credito',
    status: 'pago',
    date: daysAgo(25),
    category: 'Assinaturas',
    receiptUrl: '/receipts/fin-029.pdf',
    notes: 'Renovação automática em 11 meses'
  },
  {
    id: 'fin-030',
    type: 'deposito',
    description: 'Depósito - Comissão de Vendas',
    value: 12000.00,
    paymentMethod: 'transferencia',
    status: 'pago',
    date: daysAgo(13),
    category: 'Comissões',
    notes: 'Comissão do mês anterior'
  }
]

// Funções auxiliares
export const getTransactionTypeLabel = (type: TransactionType): string => {
  const labels: Record<TransactionType, string> = {
    compra: 'Compra',
    venda: 'Venda',
    reembolso: 'Reembolso',
    cashback: 'Cashback',
    taxa: 'Taxa',
    deposito: 'Depósito',
    saque: 'Saque',
    estorno: 'Estorno'
  }
  return labels[type] || type
}

export const getTransactionTypeIcon = (type: TransactionType): string => {
  const icons: Record<TransactionType, string> = {
    compra: '🛒',
    venda: '💰',
    reembolso: '↩️',
    cashback: '🎁',
    taxa: '💳',
    deposito: '⬇️',
    saque: '⬆️',
    estorno: '🔄'
  }
  return icons[type] || '💵'
}

export const getTransactionTypeColor = (type: TransactionType): string => {
  const colors: Record<TransactionType, string> = {
    compra: 'text-red-600',
    venda: 'text-green-600',
    reembolso: 'text-blue-600',
    cashback: 'text-purple-600',
    taxa: 'text-orange-600',
    deposito: 'text-emerald-600',
    saque: 'text-gray-600',
    estorno: 'text-yellow-600'
  }
  return colors[type] || 'text-gray-600'
}

export const getPaymentMethodLabel = (method: PaymentMethod): string => {
  const labels: Record<PaymentMethod, string> = {
    cartao_credito: 'Cartão de Crédito',
    cartao_debito: 'Cartão de Débito',
    pix: 'PIX',
    boleto: 'Boleto',
    transferencia: 'Transferência Bancária',
    dinheiro: 'Dinheiro'
  }
  return labels[method] || method
}
