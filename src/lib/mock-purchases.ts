export type PurchaseStatus = 'aguardando_envio' | 'em_transporte' | 'entregue' | 'cancelado'
export type PurchaseType = 'animal' | 'genetica' | 'produto'
export type PaymentMethod = 'pix' | 'cartao' | 'boleto'

export interface MockPurchase {
  id: string
  type: PurchaseType
  itemId: string
  itemName: string
  itemImage: string
  purchaseDate: Date
  value: number
  status: PurchaseStatus
  paymentMethod: PaymentMethod
  sellerId: string
  sellerName: string
  sellerImage?: string
  trackingNumber?: string
  estimatedDelivery?: Date
  actualDelivery?: Date
  deliveryAddress?: string
  receiptUrl?: string
  invoiceUrl?: string
  hasRating: boolean
  rating?: number
  breederInfo?: {
    name: string
    profileUrl: string
    location: string
  }
  location?: string
}

export const mockPurchases: MockPurchase[] = [
  {
    id: 'purchase-1',
    type: 'animal',
    itemId: 'animal-1',
    itemName: 'Touro Nelore PO - 3 anos',
    itemImage: '/fotos/animais/touro-nelore.jpeg',
    purchaseDate: new Date('2024-01-15'),
    value: 8500,
    status: 'entregue',
    paymentMethod: 'pix',
    sellerId: 'seller-1',
    sellerName: 'Fazenda São José',
    sellerImage: '/fotos/tudo-agro-logo.png',
    actualDelivery: new Date('2024-01-20'),
    deliveryAddress: 'Fazenda do Comprador, Rodovia BR-050, KM 120',
    receiptUrl: '/receipts/purchase-1.pdf',
    invoiceUrl: '/invoices/purchase-1.pdf',
    hasRating: true,
    rating: 5,
    breederInfo: {
      name: 'Criador João Silva',
      profileUrl: '/dashboard/vendedores/criador-joao',
      location: 'Goiânia, GO'
    },
    location: 'Goiânia, GO'
  },
  {
    id: 'purchase-2',
    type: 'produto',
    itemId: 'product-1',
    itemName: 'Ração Premium para Gado de Corte - 25kg',
    itemImage: '/fotos/produtos/racao-1.jpg',
    purchaseDate: new Date('2024-01-20'),
    value: 320,
    status: 'em_transporte',
    paymentMethod: 'cartao',
    sellerId: 'seller-2',
    sellerName: 'AgroSupply Brasil',
    trackingNumber: 'BR123456789BR',
    estimatedDelivery: new Date('2024-01-28'),
    deliveryAddress: 'Rua das Flores, 123, Centro, Uberlândia - MG',
    receiptUrl: '/receipts/purchase-2.pdf',
    hasRating: false
  },
  {
    id: 'purchase-3',
    type: 'genetica',
    itemId: 'genetica-1',
    itemName: 'Sêmen Nelore PO - 10 doses',
    itemImage: '/fotos/animais/touro-nelore.jpeg',
    purchaseDate: new Date('2024-01-18'),
    value: 1200,
    status: 'aguardando_envio',
    paymentMethod: 'boleto',
    sellerId: 'seller-3',
    sellerName: 'Genética Premium',
    estimatedDelivery: new Date('2024-01-25'),
    deliveryAddress: 'Fazenda do Comprador, Rodovia BR-050, KM 120',
    receiptUrl: '/receipts/purchase-3.pdf',
    hasRating: false
  },
  {
    id: 'purchase-4',
    type: 'produto',
    itemId: 'product-2',
    itemName: 'Fertilizante NPK 20-05-20 - 50kg',
    itemImage: '/fotos/produtos/fertilizante.webp',
    purchaseDate: new Date('2024-01-10'),
    value: 450,
    status: 'entregue',
    paymentMethod: 'pix',
    sellerId: 'seller-2',
    sellerName: 'AgroSupply Brasil',
    actualDelivery: new Date('2024-01-15'),
    deliveryAddress: 'Rua das Flores, 123, Centro, Uberlândia - MG',
    receiptUrl: '/receipts/purchase-4.pdf',
    invoiceUrl: '/invoices/purchase-4.pdf',
    hasRating: true,
    rating: 4
  },
  {
    id: 'purchase-5',
    type: 'animal',
    itemId: 'animal-2',
    itemName: 'Vaca Holandesa - 4 anos',
    itemImage: '/fotos/animais/vaca-holandesa.jpeg',
    purchaseDate: new Date('2024-01-05'),
    value: 12000,
    status: 'cancelado',
    paymentMethod: 'pix',
    sellerId: 'seller-4',
    sellerName: 'Fazenda Leiteira Premium',
    receiptUrl: '/receipts/purchase-5.pdf',
    hasRating: false
  },
  {
    id: 'purchase-6',
    type: 'produto',
    itemId: 'product-3',
    itemName: 'Suplemento Mineral para Bovinos - 30kg',
    itemImage: '/fotos/produtos/proteinado.jpg',
    purchaseDate: new Date('2024-01-22'),
    value: 280,
    status: 'aguardando_envio',
    paymentMethod: 'cartao',
    sellerId: 'seller-2',
    sellerName: 'AgroSupply Brasil',
    estimatedDelivery: new Date('2024-01-30'),
    deliveryAddress: 'Rua das Flores, 123, Centro, Uberlândia - MG',
    receiptUrl: '/receipts/purchase-6.pdf',
    hasRating: false
  }
]

export const getStatusColor = (status: PurchaseStatus): string => {
  switch (status) {
    case 'aguardando_envio':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'em_transporte':
      return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'entregue':
      return 'bg-primary/10 text-primary border-primary/20'
    case 'cancelado':
      return 'bg-red-100 text-red-800 border-red-200'
  }
}

export const getStatusLabel = (status: PurchaseStatus): string => {
  switch (status) {
    case 'aguardando_envio':
      return 'Aguardando Envio'
    case 'em_transporte':
      return 'Em Transporte'
    case 'entregue':
      return 'Entregue'
    case 'cancelado':
      return 'Cancelado'
  }
}

export const getStatusIcon = (status: PurchaseStatus) => {
  switch (status) {
    case 'aguardando_envio':
      return '⏳'
    case 'em_transporte':
      return '🚚'
    case 'entregue':
      return '✅'
    case 'cancelado':
      return '❌'
  }
}

export const getTypeIcon = (type: PurchaseType): string => {
  switch (type) {
    case 'animal':
      return '🐄'
    case 'genetica':
      return '🧬'
    case 'produto':
      return '📦'
  }
}

export const getPaymentMethodLabel = (method: PaymentMethod): string => {
  switch (method) {
    case 'pix':
      return 'PIX'
    case 'cartao':
      return 'Cartão de Crédito'
    case 'boleto':
      return 'Boleto Bancário'
  }
}
