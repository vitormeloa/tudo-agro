export interface Review {
  id: string
  userId: string
  userName: string
  userAvatar: string
  rating: number
  comment: string
  date: string
  verifiedPurchase?: boolean
  helpful?: number
}

export const mockProductReviews: Review[] = [
  {
    id: '1',
    userId: 'user1',
    userName: 'João Silva',
    userAvatar: '/placeholder-avatar.jpg',
    rating: 5,
    comment: 'Excelente produto! Chegou rapidamente e está funcionando perfeitamente na minha fazenda. Recomendo muito!',
    date: '2025-11-06',
    verifiedPurchase: true,
    helpful: 12
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'Maria Santos',
    userAvatar: '/placeholder-avatar.jpg',
    rating: 4,
    comment: 'Bom produto, mas a entrega demorou um pouco mais do que o esperado. Qualidade é ótima.',
    date: '2025-11-05',
    verifiedPurchase: true,
    helpful: 8
  },
  {
    id: '3',
    userId: 'user3',
    userName: 'Pedro Oliveira',
    userAvatar: '/placeholder-avatar.jpg',
    rating: 5,
    comment: 'Produto de alta qualidade! Vale muito a pena o investimento. Estou muito satisfeito.',
    date: '2025-11-04',
    verifiedPurchase: true,
    helpful: 15
  }
]

export const mockAnimalReviews: Review[] = [
  {
    id: '1',
    userId: 'user1',
    userName: 'Carlos Mendes',
    userAvatar: '/placeholder-avatar.jpg',
    rating: 5,
    comment: 'Animal excelente! Conforme descrito e muito bem cuidado. Recomendo o vendedor!',
    date: '2025-11-03',
    verifiedPurchase: true,
    helpful: 10
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'Ana Costa',
    userAvatar: '/placeholder-avatar.jpg',
    rating: 4,
    comment: 'Animal saudável e bem cuidado. Apenas achei o preço um pouco alto, mas valeu a pena.',
    date: '2025-11-02',
    verifiedPurchase: true,
    helpful: 6
  },
  {
    id: '3',
    userId: 'user3',
    userName: 'Roberto Alves',
    userAvatar: '/placeholder-avatar.jpg',
    rating: 5,
    comment: 'Melhor compra que fiz! Animal de excelente genética e o vendedor foi muito atencioso.',
    date: '2025-11-01',
    verifiedPurchase: true,
    helpful: 18
  }
]
