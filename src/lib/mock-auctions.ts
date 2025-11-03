export interface MockAuction {
  id: string
  title: string
  type: string
  status: 'live' | 'scheduled'
  currentLot?: {
    number: number
    title: string
    description: string
    age?: string
    weight?: string
    images: string[]
  }
  participants: number
  totalLots: number
  currentLotNumber?: number
  organizer: string
  auctioneer: string
  location: string
  image: string
  videoUrl?: string // URL do vídeo ao vivo (YouTube, Twitch, etc.)
  currentBid?: number
  startingBid?: number
  estimatedValue?: number
  endTime?: Date
  startTime?: Date
  rules: string[]
  bidHistory?: {
    bidder: string
    amount: number
    time: string
  }[]
  chatMessages?: {
    user: string
    message: string
    time: string
    isSystem: boolean
  }[]
}

// Função helper para converter URLs do YouTube para formato embed
// Aceita tanto URLs de watch quanto URLs de embed
// Garante autoplay automático quando entrar na página
export function convertToEmbedUrl(url: string): string {
  if (!url) return url
  
  // Se já está no formato embed
  if (url.includes('/embed/')) {
    // Se já tem parâmetros, adiciona ou atualiza autoplay e mute
    if (url.includes('?')) {
      // Remove parâmetros existentes que vamos sobrescrever
      let cleanUrl = url
        .replace(/[?&]autoplay=\d+/g, '')
        .replace(/[?&]mute=\d+/g, '')
        .replace(/[?&]playsinline=\d+/g, '')
        .replace(/[?&]rel=\d+/g, '')
        .replace(/[?&]enablejsapi=\d+/g, '')
        .replace(/[?&]origin=[^&]*/g, '')
      
      // Adiciona os parâmetros necessários (sem controles do YouTube)
      const separator = cleanUrl.includes('?') ? '&' : '?'
      const origin = typeof window !== 'undefined' ? window.location.origin : ''
      return `${cleanUrl}${separator}autoplay=1&mute=0&playsinline=1&rel=0&enablejsapi=1&controls=0&modestbranding=1&showinfo=0&origin=${encodeURIComponent(origin)}`
    } else {
      const origin = typeof window !== 'undefined' ? window.location.origin : ''
      return `${url}?autoplay=1&mute=0&playsinline=1&rel=0&enablejsapi=1&controls=0&modestbranding=1&showinfo=0&origin=${encodeURIComponent(origin)}`
    }
  }
  
  // Converte de watch?v= para embed
  if (url.includes('youtube.com/watch?v=')) {
    const videoId = url.match(/[?&]v=([^&]+)/)?.[1]
    if (videoId) {
      const origin = typeof window !== 'undefined' ? window.location.origin : ''
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&playsinline=1&rel=0&enablejsapi=1&controls=0&modestbranding=1&showinfo=0&origin=${encodeURIComponent(origin)}`
    }
  }
  
  // Converte de youtu.be/ para embed
  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1]?.split('?')[0]?.split('&')[0]
    if (videoId) {
      const origin = typeof window !== 'undefined' ? window.location.origin : ''
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&playsinline=1&rel=0&enablejsapi=1&origin=${encodeURIComponent(origin)}`
    }
  }
  
  // Para streams ao vivo do YouTube (live streams)
  if (url.includes('youtube.com/live/')) {
    const streamId = url.split('youtube.com/live/')[1]?.split('?')[0]?.split('&')[0]
    if (streamId) {
      const origin = typeof window !== 'undefined' ? window.location.origin : ''
      return `https://www.youtube.com/embed/${streamId}?autoplay=1&mute=0&playsinline=1&rel=0&enablejsapi=1&controls=0&modestbranding=1&showinfo=0&origin=${encodeURIComponent(origin)}`
    }
  }
  
  return url
}

export const mockAuctions: MockAuction[] = [
  // Leilões ao vivo
  {
    id: "770e8400-e29b-41d4-a716-446655440001",
    title: "Leilão Fazenda Santa Rita - Elite Nelore",
    type: "Gado de Corte",
    status: "live",
    image: "/fotos/leiloes/leilao-faz-sta-rita.jpeg",
    videoUrl: "https://www.youtube.com/watch?v=Ujcs-MyKc0w?autoplay=1&mute=1",
    location: "Goiás, GO",
    auctioneer: "Leiloeiro João Silva",
    organizer: "Fazenda Santa Rita",
    currentBid: 15000,
    startingBid: 8000,
    participants: 47,
    totalLots: 25,
    currentLotNumber: 8,
    currentLot: {
      number: 8,
      title: "Touro Nelore PO Reprodutor",
      description: "Touro nelore de excelente genética, com registro genealógico completo. Animal de linhagem elite, ideal para reprodução.",
      age: "5 anos",
      weight: "850kg",
      images: [
        "/fotos/leiloes/leilao-faz-sta-rita.jpeg"
      ]
    },
    rules: [
      "Lance mínimo: R$ 1.000",
      "Incremento mínimo: R$ 500",
      "Tempo de arrematação: 30 segundos",
      "Pagamento: 30% entrada, saldo em 30 dias"
    ],
    bidHistory: [
      { bidder: "João S.", amount: 15000, time: "14:35:20" },
      { bidder: "Maria L.", amount: 14500, time: "14:35:15" },
      { bidder: "Carlos M.", amount: 14000, time: "14:35:10" },
      { bidder: "Ana P.", amount: 13500, time: "14:35:05" },
      { bidder: "Pedro R.", amount: 13000, time: "14:35:00" }
    ],
    chatMessages: [
      { user: "Moderador", message: "Lote 8 em leilão! Touro Nelore PO", time: "14:35:25", isSystem: true },
      { user: "João S.", message: "Excelente animal!", time: "14:35:22", isSystem: false },
      { user: "Maria L.", message: "Boa genética", time: "14:35:18", isSystem: false },
      { user: "Moderador", message: "Lance atual: R$ 15.000", time: "14:35:20", isSystem: true }
    ],
    endTime: new Date(Date.now() + 2 * 60 * 60 * 1000 + 45 * 60 * 1000 + 30 * 1000)
  },
  {
    id: "770e8400-e29b-41d4-a716-446655440002",
    title: "Leilão Elite Genética - Cavalos Premium",
    type: "Cavalos",
    status: "live",
    image: "/fotos/leiloes/leilao-cavalo.webp",
    videoUrl: "https://www.youtube.com/watch?v=mwOaq-Ns0N0?autoplay=1&mute=1",
    location: "Minas Gerais, MG",
    auctioneer: "Leiloeiro Maria Santos",
    organizer: "Haras Elite",
    currentBid: 85000,
    startingBid: 45000,
    participants: 23,
    totalLots: 12,
    currentLotNumber: 4,
    currentLot: {
      number: 4,
      title: "Garanhão Quarto de Milha",
      description: "Garanhão de linhagem campeã, com excelente conformação. Animal premiado em competições de velocidade.",
      age: "7 anos",
      weight: "520kg",
      images: [
        "/fotos/leiloes/leilao-cavalo.webp"
      ]
    },
    rules: [
      "Lance mínimo: R$ 2.000",
      "Incremento mínimo: R$ 1.000",
      "Tempo de arrematação: 45 segundos",
      "Pagamento: 50% entrada, saldo em 15 dias"
    ],
    bidHistory: [
      { bidder: "Carlos A.", amount: 85000, time: "15:20:10" },
      { bidder: "Ana B.", amount: 84000, time: "15:20:05" },
      { bidder: "Roberto C.", amount: 83000, time: "15:20:00" }
    ],
    chatMessages: [
      { user: "Moderador", message: "Lote 4 em leilão! Garanhão Quarto de Milha", time: "15:20:15", isSystem: true },
      { user: "Carlos A.", message: "Animal impressionante!", time: "15:20:12", isSystem: false },
      { user: "Moderador", message: "Lance atual: R$ 85.000", time: "15:20:10", isSystem: true }
    ],
    endTime: new Date(Date.now() + 1 * 60 * 60 * 1000 + 12 * 60 * 1000 + 15 * 1000)
  },
  {
    id: "770e8400-e29b-41d4-a716-446655440003",
    title: "Leilão Sêmen Premium - Genética Certificada",
    type: "Sêmen Bovino",
    status: "live",
    image: "/fotos/leiloes/leilao-faz-sta-rita.jpg",
    videoUrl: "https://www.youtube.com/watch?v=7LZpMfiyFcQ?autoplay=1&mute=1", // Vídeo ao vivo de exemplo
    location: "São Paulo, SP",
    auctioneer: "Leiloeiro Carlos Oliveira",
    organizer: "Genética Elite",
    currentBid: 2500,
    startingBid: 800,
    participants: 31,
    totalLots: 50,
    currentLotNumber: 15,
    currentLot: {
      number: 15,
      title: "Sêmen Angus Premium",
      description: "Sêmen bovino da raça Angus de reprodutor certificado. Material genético de alta qualidade.",
      images: [
        "/fotos/leiloes/leilao-faz-sta-rita.jpg"
      ]
    },
    rules: [
      "Lance mínimo: R$ 100",
      "Incremento mínimo: R$ 50",
      "Tempo de arrematação: 20 segundos",
      "Pagamento: À vista ou parcelado"
    ],
    bidHistory: [
      { bidder: "Fernando D.", amount: 2500, time: "16:10:30" },
      { bidder: "Lucia E.", amount: 2480, time: "16:10:25" },
      { bidder: "Paulo F.", amount: 2460, time: "16:10:20" }
    ],
    chatMessages: [
      { user: "Moderador", message: "Lote 15 em leilão! Sêmen Angus Premium", time: "16:10:35", isSystem: true },
      { user: "Fernando D.", message: "Excelente material genético!", time: "16:10:32", isSystem: false },
      { user: "Moderador", message: "Lance atual: R$ 2.500", time: "16:10:30", isSystem: true }
    ],
    endTime: new Date(Date.now() + 5 * 60 * 60 * 1000 + 30 * 60 * 1000 + 45 * 1000)
  },
  // Próximos leilões
  {
    id: "770e8400-e29b-41d4-a716-446655440004",
    title: "Leilão Fazenda Boa Esperança",
    type: "Gado de Leite",
    status: "scheduled",
    image: "/fotos/leiloes/leilao-fazenda.jpg",
    location: "Rio Grande do Sul, RS",
    auctioneer: "Leiloeiro Ana Costa",
    organizer: "Fazenda Boa Esperança",
    estimatedValue: 500000,
    participants: 0,
    totalLots: 35,
    rules: [
      "Lance mínimo: R$ 500",
      "Incremento mínimo: R$ 200",
      "Tempo de arrematação: 30 segundos",
      "Pagamento: 30% entrada, saldo em 30 dias"
    ],
    startTime: new Date(Date.now() + 24 * 60 * 60 * 1000)
  },
  {
    id: "770e8400-e29b-41d4-a716-446655440005",
    title: "Leilão Haras Três Corações",
    type: "Cavalos",
    status: "scheduled",
    image: "/fotos/leiloes/apogeu.jpg",
    location: "Minas Gerais, MG",
    auctioneer: "Leiloeiro Roberto Lima",
    organizer: "Haras Três Corações",
    estimatedValue: 1200000,
    participants: 0,
    totalLots: 18,
    rules: [
      "Lance mínimo: R$ 2.000",
      "Incremento mínimo: R$ 1.000",
      "Tempo de arrematação: 45 segundos",
      "Pagamento: 50% entrada, saldo em 15 dias"
    ],
    startTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
  },
  {
    id: "770e8400-e29b-41d4-a716-446655440006",
    title: "Leilão Genética Premium",
    type: "Sêmen",
    status: "scheduled",
    image: "/fotos/leiloes/leilao-faz.jpg",
    location: "Goiás, GO",
    auctioneer: "Leiloeiro Pedro Alves",
    organizer: "Genética Premium",
    estimatedValue: 150000,
    participants: 0,
    totalLots: 80,
    rules: [
      "Lance mínimo: R$ 100",
      "Incremento mínimo: R$ 50",
      "Tempo de arrematação: 20 segundos",
      "Pagamento: À vista ou parcelado"
    ],
    startTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  }
]
