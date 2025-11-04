export interface MockProduct {
  id: string
  title: string
  category: string
  price: number
  location: string
  city: string
  rating: number
  reviews: number
  image: string
  seller: string
  verified: boolean
  featured: boolean
  weight: string
  brand: string
  stock: string
  description: string
  images: string[]
  specifications: {
    protein?: string
    fiber?: string
    calcium?: string
    phosphorus?: string
    energy?: string
    [key: string]: string | undefined
  }
  documents: string[]
  sellerInfo: {
    id: string | number
    name: string
    location: string
    rating: number
    totalSales: number
    memberSince: string
    verified: boolean
    image: string
  }
}

export const mockProducts: MockProduct[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    title: "Cachaça Haras Eduardo Costa 600ml",
    category: "Bebidas Artesanais e Produtos da Fazenda",
    price: 45.90,
    location: "São Paulo",
    city: "São Paulo",
    rating: 4.8,
    reviews: 124,
    image: "/fotos/produtos/cachaca-edu.webp",
    seller: "Eduardo Costa",
    verified: true,
    featured: true,
    weight: "600ml",
    brand: "Eduardo Costa",
    stock: "Em estoque",
    description: "A Cachaça Haras Eduardo Costa 600ml é uma bebida sofisticada envelhecida em tonéis de Amburana, típica da região de Minas Gerais. Com graduação alcoólica de 42%, seu aroma é complexo e intenso, com notas adocicadas e amadeiradas, além de nuances de baunilha, canela e cravo. O sabor é suave e equilibrado, com um toque adocicado e amadeirado característico da amburana. A coloração dourada clara é adquirida durante o processo de envelhecimento e a finalização é suave e persistente, com um sabor levemente picante e amadeirado que permanece na boca. A Cachaça Haras Eduardo Costa é uma bebida que combina a tradição e o savoir-faire da produção de cachaças artesanais de qualidade com o sabor e o aroma únicos conferidos pela madeira de Amburana.\n\nAlém disso, é importante destacar que a Cachaça Haras Eduardo Costa envelhecida em amburana é de uma qualidade excepcional, tendo sido adormecida por oito anos para alcançar um sabor e aroma únicos e complexos. O fundador da marca, Eduardo Costa, tinha como exigência fornecer ao seu público uma cachaça de excelente qualidade e preço acessível, e por isso investiu em técnicas de produção e escolha de ingredientes que garantissem a excelência da bebida. Com essa combinação de know-how, ingredientes selecionados e tempo de envelhecimento, a Cachaça Haras Eduardo Costa envelhecida em amburana é uma opção ideal para quem aprecia uma cachaça de alta qualidade e sabor incomparável.",
    images: [
      "/fotos/produtos/cachaca-edu.webp",
      "/fotos/produtos/cachaca-edu-sem-fundo.webp",
    ],
    specifications: {
      protein: "18%",
      fiber: "12%",
      calcium: "0.8%",
      phosphorus: "0.6%",
      energy: "2.8 Mcal/kg"
    },
    documents: [
      "Certificado de qualidade",
      "Análise nutricional",
      "Registro no MAPA",
      "Garantia de origem",
      "Manual de uso"
    ],
    sellerInfo: {
      id: 1,
      name: "Eduardo Costa",
      location: "São Paulo, SP",
      rating: 4.8,
      totalSales: 124,
      memberSince: "2025",
      verified: true,
      image: "/fotos/sobre/edu-secao-nossa.jpeg"
    }
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    title: "Semente Milho Bm 3066",
    category: "Sementes e Mudas",
    price: 89.50,
    location: "Minas Gerais",
    city: "Uberlândia",
    rating: 4.9,
    reviews: 89,
    image: "/fotos/produtos/semente-milho.jpeg",
    seller: "Sementes Elite",
    verified: true,
    featured: false,
    weight: "2.000",
    brand: "Pioneer",
    stock: "Em estoque",
    description: "Semente de milho híbrido de alta produtividade, ideal para plantio em diferentes condições climáticas. Variedade resistente a pragas e doenças, com excelente desenvolvimento radicular e alta capacidade de produção de grãos.",
    images: [
      "/fotos/produtos/semente-milho.jpeg",
    ],
    specifications: {
      germinacao: "95%",
      pureza: "99%",
      umidade: "12%",
      peso: "2000g"
    },
    documents: [
      "Certificado de qualidade",
      "Análise de germinação",
      "Registro no MAPA",
      "Laudo técnico"
    ],
    sellerInfo: {
      id: 2,
      name: "Sementes Elite",
      location: "Minas Gerais, MG",
      rating: 4.9,
      totalSales: 89,
      memberSince: "2023",
      verified: true,
      image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=100&h=100&fit=crop"
    }
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    title: "Proteinados para Pasto",
    category: "Nutrição Animal",
    price: 125.00,
    location: "Goiás",
    city: "Goiânia",
    rating: 4.7,
    reviews: 156,
    image: "/fotos/produtos/proteinados-para-pasto.jpeg",
    seller: "FertilAgro",
    verified: true,
    featured: true,
    weight: "50kg",
    brand: "Yara",
    stock: "Em estoque",
    description: "Suplemento proteico de alta qualidade para pastagem, enriquecido com minerais essenciais para o desenvolvimento saudável do gado. Fórmula balanceada que promove ganho de peso e melhora a qualidade do rebanho.",
    images: [
      "/fotos/produtos/proteinados-para-pasto.jpeg",
      "/fotos/produtos/proteinados.jpg",
    ],
    specifications: {
      protein: "24%",
      calcio: "2.5%",
      fosforo: "1.8%",
      energia: "3.2 Mcal/kg"
    },
    documents: [
      "Certificado de qualidade",
      "Análise nutricional",
      "Registro no MAPA",
      "Manual de uso"
    ],
    sellerInfo: {
      id: 3,
      name: "FertilAgro",
      location: "Goiás, GO",
      rating: 4.7,
      totalSales: 156,
      memberSince: "2022",
      verified: true,
      image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=100&h=100&fit=crop"
    }
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    title: "Herbicida Glifosato Premium (1L ou 5L)",
    category: "Insumos Agrícolas e Fertilizantes",
    price: 78.90,
    location: "Mato Grosso",
    city: "Cuiabá",
    rating: 4.6,
    reviews: 67,
    image: "/fotos/produtos/glifosato-2021.jpg",
    seller: "AgroDefense",
    verified: true,
    featured: false,
    weight: "1L",
    brand: "Syngenta",
    stock: "Em estoque",
    description: "Herbicida sistêmico de amplo espectro para controle de plantas daninhas em diversas culturas. Fórmula concentrada que oferece eficácia comprovada no controle de ervas daninhas.",
    images: [
      "/fotos/produtos/glifosato-2021.jpg",
    ],
    specifications: {
      concentracao: "480g/L",
      aplicacao: "Pós-emergência",
      prazo: "30 dias"
    },
    documents: [
      "Certificado de registro",
      "Bula técnica",
      "Ficha de segurança",
      "Laudo técnico"
    ],
    sellerInfo: {
      id: 4,
      name: "AgroDefense",
      location: "Mato Grosso, MT",
      rating: 4.6,
      totalSales: 67,
      memberSince: "2021",
      verified: true,
      image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=100&h=100&fit=crop"
    }
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440005",
    title: "Probióticos para Ruminantes",
    category: "Suplementos e Aditivos",
    price: 67.50,
    location: "Rio Grande do Sul",
    city: "Porto Alegre",
    rating: 4.8,
    reviews: 43,
    image: "/fotos/produtos/dbr-probiotico-pasta.jpg",
    seller: "EquiNutri",
    verified: true,
    featured: true,
    weight: "25kg",
    brand: "Purina",
    stock: "Em estoque",
    description: "Suplemento probiótico especialmente formulado para ruminantes, promovendo melhor digestão e absorção de nutrientes. Ajuda a manter o equilíbrio da flora intestinal e melhora a saúde geral do animal.",
    images: [
      "/fotos/produtos/dbr-probiotico-pasta.jpg",
    ],
    specifications: {
      cepas: "6 bilhões UFC",
      aplicacao: "Mistura com ração",
      prazo: "60 dias"
    },
    documents: [
      "Certificado de qualidade",
      "Análise microbiológica",
      "Registro no MAPA",
      "Manual de uso"
    ],
    sellerInfo: {
      id: 1,
      name: "EquiNutri",
      location: "Rio Grande do Sul, RS",
      rating: 4.8,
      totalSales: 43,
      memberSince: "2024",
      verified: true,
      image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=100&h=100&fit=crop"
    }
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440006",
    title: "Promotor De Engorda + Vermifugo 3.6%",
    category: "Saúde e Bem-Estar Animal",
    price: 145.00,
    location: "Paraná",
    city: "Curitiba",
    rating: 4.9,
    reviews: 98,
    image: "/fotos/produtos/promotor.webp",
    seller: "Vermífugos Agro",
    verified: true,
    featured: false,
    weight: "500ml",
    brand: "Monsanto",
    stock: "Em estoque",
    description: "Produto combinado que promove ganho de peso e controle de verminoses em bovinos. Fórmula completa que atua tanto na promoção do crescimento quanto no combate a parasitas internos.",
    images: [
      "/fotos/produtos/promotor.webp",
    ],
    specifications: {
      principio: "3.6%",
      aplicacao: "Oral",
      prazo: "90 dias"
    },
    documents: [
      "Certificado de registro",
      "Bula técnica",
      "Ficha de segurança",
      "Laudo técnico"
    ],
    sellerInfo: {
      id: 6,
      name: "Vermífugos Agro",
      location: "Paraná, PR",
      rating: 4.9,
      totalSales: 98,
      memberSince: "2020",
      verified: true,
      image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=100&h=100&fit=crop"
    }
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440006",
    title: "Promotor De Engorda + Vermifugo 3.6%",
    category: "Suplementos e Aditivos",
    price: 145.00,
    location: "Paraná",
    city: "Curitiba",
    rating: 4.9,
    reviews: 98,
    image: "/fotos/produtos/promotor.webp",
    seller: "Vermífugos Agro",
    verified: true,
    featured: false,
    weight: "500ml",
    brand: "Monsanto",
    stock: "Em estoque",
    description: "Produto combinado que promove ganho de peso e controle de verminoses em bovinos. Fórmula completa que atua tanto na promoção do crescimento quanto no combate a parasitas internos.",
    images: [
      "/fotos/produtos/promotor.webp",
    ],
    specifications: {
      principio: "3.6%",
      aplicacao: "Oral",
      prazo: "90 dias"
    },
    documents: [
      "Certificado de registro",
      "Bula técnica",
      "Ficha de segurança",
      "Laudo técnico"
    ],
    sellerInfo: {
      id: 6,
      name: "Vermífugos Agro",
      location: "Paraná, PR",
      rating: 4.9,
      totalSales: 98,
      memberSince: "2020",
      verified: true,
      image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=100&h=100&fit=crop"
    }
  }
]
