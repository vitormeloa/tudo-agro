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
      totalSales: 1124,
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
      totalSales: 1089,
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
      totalSales: 1156,
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
      totalSales: 1067,
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
    weight: "40kg",
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
      totalSales: 1043,
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
      totalSales: 1098,
      memberSince: "2020",
      verified: true,
      image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=100&h=100&fit=crop"
    }
  },
    {
    id: "550e8400-e29b-41d4-a716-446655440007",
    title: "Ração Corte Confinamento Peletizada Engorda Boi Novilha Gado",
    category: "Nutrição Animal",
    price: 369.90,
    location: "São Paulo",
    city: "Ibitinga",
    rating: 5.0,
    reviews: 1,
    image: "/fotos/produtos/Ração Corte Confinamento Peletizada.png",
    seller: "Agrofértil Ibitinga",
    verified: true,
    featured: false,
    weight: "40kg",
    brand: "Pecuária de Corte Terminação Proteína Energia",
    stock: "Em estoque",
    description: "Peletizada Ração Balanceada Engorda Confinamento Boi Garrote Novilha Vaca produção de carne.",
    images: [
      "/fotos/produtos/Ração Corte Confinamento Peletizada.png",
    ],
    specifications: {
      proteinabruta: "18%",
      fibrabruta: "12%",
      calcium: "0.8%",
      phosphorus: "0.8%",
    },
    documents: [
      "Registro de Produto no MAPA (SIF/SEAPI/SIE)",
      "Fórmula Garantida (Tabela nutricional)",
      "Rótulo com Responsável Técnico (CRMV)",
      "Ficha Técnica (FT)",
      "Informações de Lote + Validade",
      "Nota Fiscal",
      "FISPQ",
      "Laudos de Qualidade",
    ],
    sellerInfo: {
      id: 6,
      name: "Agrofértil Ibitinga",
      location: "Ibitinga, SP",
      rating: 5.0,
      totalSales: 1098,
      memberSince: "2020",
      verified: true,
      image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAFwAXAMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAwUGBAIBB//EADUQAAEEAQMBBgQCCwEAAAAAAAEAAgMEEQUSITETMkFRYXEigZGhBhRSU2NydbGytMHR4TX/xAAZAQEAAwEBAAAAAAAAAAAAAAAAAQIDBAX/xAAhEQACAgICAQUAAAAAAAAAAAAAAQIRA0EhMQQTgZGhsf/aAAwDAQACEQMRAD8A/akREAREQBERAEREAREQBERAEXxxIaSBkgcDzUcE7JgduWub3mO4LT6qrkk62CQEEZByPRMgkgEZHUeS5IbFetH2UliLc1x6O6DJx9lJV2bZJGyNk3vLi5p6DwH0WUM6lSVXvnos40dCKGvK6ZpeW7WE/BnqR5lTLWMlJWiGqCIisQEREAREQEEk0jJNv5eR7P02EH7ZyqvV7Us1sUKveOA8g9fHHsrtUOnjH4jtiTvAOLc+4/wV5/mqbUcafEnXsb4a5lXSO2vpNSCPMzRI4DJc44A+S+1q9WaGK5pkjWtlYHxyRnLJGkZHHiCF416RxqsqRQvmfaeGOjjLdxjHMnUgd0EZz1cFnNMv29G0DW9Phg2W9LLn04Z8E9jIS6IfCcHB3NAB52gdSto+JgglGMUv35KOcny2bRji5gJGD4jyK9LH6le1qtp2uajFcmbUo0jLVdYqNY6V4aXO3NLQcDAHQZ3emT1fntWbqNOlZtwtFwyS9pXhy6JrGNzGM5BduceSD8LTxnkdF0Uovb16rQiEtydkTCSAXeOAScD2BPoASvQuVnWY6zZ4zPJEZmMDslzAQNw9MkcrIwWp9Z1LR325WhrZL1eVvZtMcojdsLsHwcByPDlS6DqV+8aV2Oq6GPUHPZMSyJogY0P7Pbzuc4FoBaQRy44GMKbFGvJx1UM1ytBYirzTxsnma90UZd8Tw3G4geOMjPusTqFzWrv4Hv37N6GOJ9SVnZsiAeS15bnPTDgDnyyMdMnRS2rMOt6ZWFwTxzOnZNmNoO5rdw5HTqB8ksUWlK5WvwCenMyaLc5u9hyMtOCPcEEKdUH4K/8AKufxW/8A3Uiv1JAVVqdGb8zHfogGePhzCcdoP9q0JABJ6BcM9m9ISynTIH62Z4YPk3k/ULHOoyjUvrstGTi7RzOl0exPHeuQxR3IBhpnZiSP0H/FVazFpl4WTDUijksx7JLTogHvbnO07tuWnoefE4weVYnRrlhxdcuNJPXAc/7E4+y6IdDgj6zTH9zaz+kBc9+TLiqIbWjO1NLpMZYZFSrCGwxrJIIIcROAzyWjeCeevlwu8xQ9nHHJFEWRHLA9oGw88ju4PJ+pV0NKpdXQ9of2j3O/mVOypWj7leJvswK3o5m7ciDPNhpGSu4Q1A+sMQFrGZiHk3BdgegU0VSs2V8sddu+TduLYzzu7x4j6nxPj4rQjgYHA9EWiwy3IFFDp1aOo+pHQaKsgIfCK/wOB6gjgHKkGl1t0LhpsW6DPZHsWgx5OTj4uMknPmrlFdY2tg4dOpQ0I3MqU467HuL3NjDWguPJPB6rtHrwvqLRKgERFICIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiID/2Q=="
    }
  },
  {
  id: "550e8400-e29b-41d4-a716-446655440008",
  title: "Ração Leite 22 Para Vacas Em Lactação De Alta Produção",
  category: "Nutrição Animal",
  price: 229.45,
  location: "São Paulo",
  city: "São Paulo",
  rating: 5.0,
  reviews: 1,
  image: "/fotos/produtos/racaoleite.png",
  seller: "RAMOSIMPORTSSSHOP",
  verified: true,
  featured: false,
  weight: "40kg",
  brand: "Agromix",
  stock: "Em estoque",
  description: "Ração peletizada com 22% de proteína indicada para vacas em lactação de alta produção, garantindo bom desempenho e suporte nutricional completo.",
  images: [
    "/fotos/produtos/racaoleite.png",
    "/fotos/produtos/racaoleite2.png"
  ],
  specifications: {
    proteina: "22%",
    fibra: "10%",
    calcium: "1.2%",
    phosphorus: "0.7%",
    energia: "2.9 Mcal/kg"
  },
  documents: [
    "Registro no MAPA",
    "Fórmula garantida",
    "Rótulo com responsável técnico",
    "Lote e validade na embalagem"
  ],
  sellerInfo: {
    id: 6,
    name: "RAMOSIMPORTSSSHOP",
    location: "São Paulo, SP",
    rating: 5.0,
    totalSales: 10000,
    memberSince: "2020",
    verified: true,
    image: "https://mla-s2-p.mlstatic.com/939078-MLA54382402941_032023-O.jpg"
  }
},
  {
  id: "550e8400-e29b-41d4-a716-446655440009",
  title: "Terneron Plus 10kg Leite Em Pó Bezerros Faz 90 LitrosTerneron Plus 10kg Leite Em Pó Bezerros Faz 90 Litros",
  category: "Nutrição Animal",
  price: 139.00,
  location: "Paraná",
  city: "Jardim Alegre",
  rating: 4.9,
  reviews: 35,
  image: "/fotos/produtos/racaobezerro.png",
  seller: "Fornecamp Multissetorial",
  verified: true,
  featured: false,
  weight: "10kg",
  brand: "Nuctramix",
  stock: "Em estoque",
  description: "O Leite em Pó Terneron é um excelente concentrado para bezerros, fornecendo todos os nutrientes necessários para seu crescimento e desenvolvimento! Pode ser utilizado a partir do quinto dia de vida até o desmame, de forma diluída em água morna ou misturado em ração.",
  images: [
    "/fotos/produtos/racaobezerro.png"
  ],
  specifications: {
    proteina: "24%",
    fibra: "0.2%",
    calcium: "0.9%",
    phosphorus: "0.7%",
  },
  documents: [
    "Ficha Técnica",
    "Rótulo",
    "Registro no MAPA",
    "Laudo de Qualidade"
  ],
  sellerInfo: {
    id: 6,
    name: "Fornecamp Multissetorial",
    location: "Paraná, PR",
    rating: 4.8,
    totalSales: 1098,
    memberSince: "2020",
    verified: true,
    image: "https://http2.mlstatic.com/D_NQ_NP_970901-MLA82198647934_022025-F.jpg"
  }
},
  {
  id: "550e8400-e29b-41d4-a716-446655440010",
  title: "Ração Postura Poedeiras Galinha",
  category: "Nutrição Animal",
  price: 78.90,
  location: "São Paulo",
  city: "São Paulo",
  rating: 4.1,
  reviews: 37,
  image: "/fotos/produtos/racaogalinha.png",
  seller: "RAMOSIMPORTSSSHOP",
  verified: true,
  featured: false,
  weight: "20kg",
  brand: "Agromix",
  stock: "Em estoque",
  description: "Ração para aves de postura em produção.",
  images: [
    "/fotos/produtos/racaogalinha.png",
    "/fotos/produtos/racaogalinha2.png"
  ],
  specifications: {
    proteina: "16%",
    fibra: "4%",
    calcium: "3.5%",
    phosphorus: "0.5%",
  },
  documents: [
    "Ficha Técnica",
    "Rótulo Oficial",
    "Registro no MAPA",
    "Laudo de Qualidade"
  ],
  sellerInfo: {
    id: 6,
    name: "RAMOSIMPORTSSSHOP",
    location: "São Paulo, SP",
    rating: 4.8,
    totalSales: 1042,
    memberSince: "2020",
    verified: true,
    image: "https://mla-s2-p.mlstatic.com/939078-MLA54382402941_032023-O.jpg"
  }
},
{
  id: "550e8400-e29b-41d4-a716-446655440011",
  title: "Ração De Engorda E Crescimento Suíno",
  category: "Nutrição Animal",
  price: 78.00,
  location: "Minas Gerais",
  city: "Belo Horizonte",
  rating: 4.8,
  reviews: 28,
  image: "/fotos/produtos/racaoporco.png",
  seller: "RAMOSIMPORTSSSHOP",
  verified: true,
  featured: false,
  weight: "20kg",
  brand: "Agromix",
  stock: "Em estoque",
  description: "Ração para aves de postura em produção.",
  images: [
    "/fotos/produtos/racaoporco.png",
    "/fotos/produtos/racaoporco2.png"
  ],
  specifications: {
    proteina: "18%",
    fibra: "3.5%",
    calcium: "0.8%",
    phosphorus: "0.6%",
  },
  documents: [
    "Ficha Técnica",
    "Rótulo Oficial",
    "Registro no MAPA",
    "Laudo de Qualidade"
  ],
  sellerInfo: {
    id: 6,
    name: "AgroFer",
    location: "Minas Gerais, MG",
    rating: 4.8,
    totalSales: 1420,
    memberSince: "2020",
    verified: true,
    image: "https://http2.mlstatic.com/D_NQ_NP_675934-MLA84710133319_052025-F.jpg"
  }
},
{
  id: "550e8400-e29b-41d4-a716-446655440012",
  title: "Ração Cachorro Adulto Premium Especial",
  category: "Nutrição Animal",
  price: 143.90,
  location: "Minas Gerais",
  city: "Belo Horizonte",
  rating: 4.8,
  reviews: 28,
  image: "/fotos/produtos/racaocachorro.png",
  seller: "SÃO PEDRORAÇÕES",
  verified: true,
  featured: false,
  weight: "15kg",
  brand: "Multistar",
  stock: "Em estoque",
  description: "A Ração Cachorro Adulto Premium Especial da marca Multistar é a escolha ideal para cães de médio a grande porte que buscam uma alimentação nutritiva e saborosa. Com ingredientes nobres e selecionados, esta ração à base de frango e arroz proporciona uma dieta equilibrada, com 23% de proteína bruta, essencial para manter a saúde e a energia de seu pet.",
  images: [
    "/fotos/produtos/racaocachorro.png",
    "/fotos/produtos/racaocachorro2.png"
  ],
  specifications: {
    proteina: "23%",
    fibra: "3%",
    calcium: "1.2%",
    phosphorus: "0.9%",
  },
  documents: [
    "Ficha Técnica",
    "Rótulo Oficial",
    "Registro no MAPA",
    "Laudo de Qualidade"
  ],
  sellerInfo: {
    id: 6,
    name: "SÃO PEDRORAÇÕES",
    location: "Minas Gerais, MG",
    rating: 4.8,
    totalSales: 1070,
    memberSince: "2020",
    verified: true,
    image: "https://http2.mlstatic.com/D_NQ_NP_675934-MLA84710133319_052025-F.jpg"
  }
},
{
  id: "550e8400-e29b-41d4-a716-446655440013",
  title: "Minerais Ração Engorda Corte Núcleo Matsuda Boi Gado Novilha",
  category: "Nutrição Animal",
  price: 299.90,
  location: "São Paulo",
  city: "Ibitinga",
  rating: 4.8,
  reviews: 28,
  image: "/fotos/produtos/salcorte.png",
  seller: "Agrofértil Ibitinga",
  verified: true,
  featured: false,
  weight: "25kg",
  brand: "Matsuda",
  stock: "Em estoque",
  description: "raçao balanceada proteina energia garrote desmama pecuária de corte.",
  images: [
    "/fotos/produtos/salcorte.png"
  ],
  specifications: {
    enxofre: "0.4%",
    sódio: "12%",
    calcium: "12%",
    phosphorus: "5%",
  },
  documents: [
    "Ficha Técnica",
    "Rótulo Oficial",
    "Registro no MAPA",
    "Laudo de Qualidade"
  ],
  sellerInfo: {
      id: 6,
      name: "Agrofértil Ibitinga",
      location: "Ibitinga, SP",
      rating: 5.0,
      totalSales: 1098,
      memberSince: "2020",
      verified: true,
      image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAFwAXAMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAwUGBAIBB//EADUQAAEEAQMBBgQCCwEAAAAAAAEAAgMEEQUSITETMkFRYXEigZGhBhRSU2NydbGytMHR4TX/xAAZAQEAAwEBAAAAAAAAAAAAAAAAAQIDBAX/xAAhEQACAgICAQUAAAAAAAAAAAAAAQIRA0EhMQQTgZGhsf/aAAwDAQACEQMRAD8A/akREAREQBERAEREAREQBERAEXxxIaSBkgcDzUcE7JgduWub3mO4LT6qrkk62CQEEZByPRMgkgEZHUeS5IbFetH2UliLc1x6O6DJx9lJV2bZJGyNk3vLi5p6DwH0WUM6lSVXvnos40dCKGvK6ZpeW7WE/BnqR5lTLWMlJWiGqCIisQEREAREQEEk0jJNv5eR7P02EH7ZyqvV7Us1sUKveOA8g9fHHsrtUOnjH4jtiTvAOLc+4/wV5/mqbUcafEnXsb4a5lXSO2vpNSCPMzRI4DJc44A+S+1q9WaGK5pkjWtlYHxyRnLJGkZHHiCF416RxqsqRQvmfaeGOjjLdxjHMnUgd0EZz1cFnNMv29G0DW9Phg2W9LLn04Z8E9jIS6IfCcHB3NAB52gdSto+JgglGMUv35KOcny2bRji5gJGD4jyK9LH6le1qtp2uajFcmbUo0jLVdYqNY6V4aXO3NLQcDAHQZ3emT1fntWbqNOlZtwtFwyS9pXhy6JrGNzGM5BduceSD8LTxnkdF0Uovb16rQiEtydkTCSAXeOAScD2BPoASvQuVnWY6zZ4zPJEZmMDslzAQNw9MkcrIwWp9Z1LR325WhrZL1eVvZtMcojdsLsHwcByPDlS6DqV+8aV2Oq6GPUHPZMSyJogY0P7Pbzuc4FoBaQRy44GMKbFGvJx1UM1ytBYirzTxsnma90UZd8Tw3G4geOMjPusTqFzWrv4Hv37N6GOJ9SVnZsiAeS15bnPTDgDnyyMdMnRS2rMOt6ZWFwTxzOnZNmNoO5rdw5HTqB8ksUWlK5WvwCenMyaLc5u9hyMtOCPcEEKdUH4K/8AKufxW/8A3Uiv1JAVVqdGb8zHfogGePhzCcdoP9q0JABJ6BcM9m9ISynTIH62Z4YPk3k/ULHOoyjUvrstGTi7RzOl0exPHeuQxR3IBhpnZiSP0H/FVazFpl4WTDUijksx7JLTogHvbnO07tuWnoefE4weVYnRrlhxdcuNJPXAc/7E4+y6IdDgj6zTH9zaz+kBc9+TLiqIbWjO1NLpMZYZFSrCGwxrJIIIcROAzyWjeCeevlwu8xQ9nHHJFEWRHLA9oGw88ju4PJ+pV0NKpdXQ9of2j3O/mVOypWj7leJvswK3o5m7ciDPNhpGSu4Q1A+sMQFrGZiHk3BdgegU0VSs2V8sddu+TduLYzzu7x4j6nxPj4rQjgYHA9EWiwy3IFFDp1aOo+pHQaKsgIfCK/wOB6gjgHKkGl1t0LhpsW6DPZHsWgx5OTj4uMknPmrlFdY2tg4dOpQ0I3MqU467HuL3NjDWguPJPB6rtHrwvqLRKgERFICIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiID/2Q=="
    }
},
{
  id: "550e8400-e29b-41d4-a716-446655440014",
  title: "Fós Leite Sal Mineral Suplemento Pecuária Vaca Leiteira",
  category: "Nutrição Animal",
  price: 319.90,
  location: "São Paulo",
  city: "Ibitinga",
  rating: 5.0,
  reviews: 8,
  image: "/fotos/produtos/salleite.png",
  seller: "Agrofértil Ibitinga",
  verified: true,
  featured: false,
  weight: "3kg",
  brand: "Matsuda",
  stock: "Em estoque",
  description: "vaca de leite pecuária leiteira gado de leite suplementação balanceada.",
  images: [
    "/fotos/produtos/salleite.png"
  ],
  specifications: {
    enxofre: "0.4%",
    sódio: "14%",
    calcium: "14%",
    phosphorus: "6%",
  },
  documents: [
    "Ficha Técnica",
    "Rótulo Oficial",
    "Registro no MAPA",
    "Laudo de Qualidade"
  ],
  sellerInfo: {
      id: 6,
      name: "Agrofértil Ibitinga",
      location: "Ibitinga, SP",
      rating: 5.0,
      totalSales: 1098,
      memberSince: "2020",
      verified: true,
      image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAFwAXAMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAwUGBAIBB//EADUQAAEEAQMBBgQCCwEAAAAAAAEAAgMEEQUSITETMkFRYXEigZGhBhRSU2NydbGytMHR4TX/xAAZAQEAAwEBAAAAAAAAAAAAAAAAAQIDBAX/xAAhEQACAgICAQUAAAAAAAAAAAAAAQIRA0EhMQQTgZGhsf/aAAwDAQACEQMRAD8A/akREAREQBERAEREAREQBERAEXxxIaSBkgcDzUcE7JgduWub3mO4LT6qrkk62CQEEZByPRMgkgEZHUeS5IbFetH2UliLc1x6O6DJx9lJV2bZJGyNk3vLi5p6DwH0WUM6lSVXvnos40dCKGvK6ZpeW7WE/BnqR5lTLWMlJWiGqCIisQEREAREQEEk0jJNv5eR7P02EH7ZyqvV7Us1sUKveOA8g9fHHsrtUOnjH4jtiTvAOLc+4/wV5/mqbUcafEnXsb4a5lXSO2vpNSCPMzRI4DJc44A+S+1q9WaGK5pkjWtlYHxyRnLJGkZHHiCF416RxqsqRQvmfaeGOjjLdxjHMnUgd0EZz1cFnNMv29G0DW9Phg2W9LLn04Z8E9jIS6IfCcHB3NAB52gdSto+JgglGMUv35KOcny2bRji5gJGD4jyK9LH6le1qtp2uajFcmbUo0jLVdYqNY6V4aXO3NLQcDAHQZ3emT1fntWbqNOlZtwtFwyS9pXhy6JrGNzGM5BduceSD8LTxnkdF0Uovb16rQiEtydkTCSAXeOAScD2BPoASvQuVnWY6zZ4zPJEZmMDslzAQNw9MkcrIwWp9Z1LR325WhrZL1eVvZtMcojdsLsHwcByPDlS6DqV+8aV2Oq6GPUHPZMSyJogY0P7Pbzuc4FoBaQRy44GMKbFGvJx1UM1ytBYirzTxsnma90UZd8Tw3G4geOMjPusTqFzWrv4Hv37N6GOJ9SVnZsiAeS15bnPTDgDnyyMdMnRS2rMOt6ZWFwTxzOnZNmNoO5rdw5HTqB8ksUWlK5WvwCenMyaLc5u9hyMtOCPcEEKdUH4K/8AKufxW/8A3Uiv1JAVVqdGb8zHfogGePhzCcdoP9q0JABJ6BcM9m9ISynTIH62Z4YPk3k/ULHOoyjUvrstGTi7RzOl0exPHeuQxR3IBhpnZiSP0H/FVazFpl4WTDUijksx7JLTogHvbnO07tuWnoefE4weVYnRrlhxdcuNJPXAc/7E4+y6IdDgj6zTH9zaz+kBc9+TLiqIbWjO1NLpMZYZFSrCGwxrJIIIcROAzyWjeCeevlwu8xQ9nHHJFEWRHLA9oGw88ju4PJ+pV0NKpdXQ9of2j3O/mVOypWj7leJvswK3o5m7ciDPNhpGSu4Q1A+sMQFrGZiHk3BdgegU0VSs2V8sddu+TduLYzzu7x4j6nxPj4rQjgYHA9EWiwy3IFFDp1aOo+pHQaKsgIfCK/wOB6gjgHKkGl1t0LhpsW6DPZHsWgx5OTj4uMknPmrlFdY2tg4dOpQ0I3MqU467HuL3NjDWguPJPB6rtHrwvqLRKgERFICIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiID/2Q=="
    }
},
{
  id: "550e8400-e29b-41d4-a716-446655440015",
  title: "Indupharma Triplo Atack longa ação moscas carrapatos vermes bovinos",
  category: "Saúde e Bem-Estar Animal",
  price: 178.44,
  location: "São Paulo",
  city: "Osasco",
  rating: 4.6,
  reviews: 43,
  image: "/fotos/produtos/verme.png",
  seller: "COLOMBO PRODUTOS AGROPECUÁRIOS",
  verified: true,
  featured: false,
  weight: "500ml",
  brand: "Indupharma",
  stock: "Em estoque",
  description: "Triplo Atack Longa Ação - Moscas Carrapatos Vermes Bovinos' atua pela interferência da formação da quitina do carrapato, interrompendo o ciclo de vida e impedindo o desenvolvimento do carrapato. É indicado para tratamento e controle eficaz das infecções causadas por vermes redondos (gastrintestinais e pulmonares), infestações por berne e carrapato dos bovinos.",
  images: [
    "/fotos/produtos/verme.png",
    "/fotos/produtos/verme2.png"
  ],
  specifications: {
    Ivermectina: "1%",
    Fluazuron: "1%",
    Abamectina: "1%",
  },
  documents: [
    "Ficha Técnica",
    "Rótulo Oficial",
    "Registro no MAPA",
    "Laudo de Qualidade",
    "Bula do Produto",
    "FISPQ"
  ],
  sellerInfo: {
      id: 6,
      name: "COLOMBO PRODUTOS AGROPECUÁRIOS",
      location: "Osasco, SP",
      rating: 5.0,
      totalSales: 1098,
      memberSince: "2020",
      verified: true,
      image: "https://http2.mlstatic.com/D_NQ_NP_635565-MLA75222019116_032024-F.jpg"
    }
},
{
  id: "550e8400-e29b-41d4-a716-446655440016",
  title: "Hipofen Vermífugo Fembendazol Égua Cavalo Potro Mula 6 Unidades",
  category: "Saúde e Bem-Estar Animal",
  price: 78.99,
  location: "São Paulo",
  city: "Monte Mor",
  rating: 5,
  reviews: 14,
  image: "/fotos/produtos/vermecavalo.png",
  seller: "AGROPECUARIA AGROFAL",
  verified: true,
  featured: false,
  weight: "120g",
  brand: "Calbos",
  stock: "Em estoque",
  description: "Antiparasitário para equinos e asininos que contém em sua fórmulação o Febendazol, que caracteriza-se por um amplo espectro de atividade e ampla margem de segurança. Não possui contra indicação para éguas prenhes. Indicado para o controle e tratamento de verminoses gastrointestinais, causadas por nematódeos.",
  images: [
    "/fotos/produtos/vermecavalo.png",
    "/fotos/produtos/vermecavalo2.png"
  ],
  specifications: {
    Fembendazol: "15%",
  },
  documents: [
    "Ficha Técnica",
    "Rótulo Oficial",
    "Registro no MAPA",
    "Laudo de Qualidade",
    "Bula do Produto",
    "FISPQ"
  ],
  sellerInfo: {
      id: 6,
      name: "AGROPECUARIA AGROFAL",
      location: "Monte Mor, SP",
      rating: 4.8,
      totalSales: 1134,
      memberSince: "2020",
      verified: true,
      image: "https://http2.mlstatic.com/D_NQ_NP_966847-MLA83358275120_042025-F.jpg"
    }
},
{
  id: "550e8400-e29b-41d4-a716-446655440017",
  title: "V Pentabiotico 6000000Ui Reforcado 15ml Antibiotico - Fort Dodge",
  category: "Saúde e Bem-Estar Animal",
  price: 36.99,
  location: "Rio Grande do Sul",
  city: "Três Cachoeiras",
  rating: 4.9,
  reviews: 17,
  image: "/fotos/produtos/antibiotico.png",
  seller: "Cat&Dog atacado",
  verified: true,
  featured: false,
  weight: "15ml",
  brand: "Zoetis",
  stock: "Em estoque",
  description: "Não administrar em animais com alergia a penicilina e nefrite com perda funcional superior a 75%.",
  images: [
    "/fotos/produtos/antibiotico.png"
  ],
  specifications: {
    Estreptomicina: "1,0g",
  },
  documents: [
    "Ficha Técnica",
    "Rótulo Oficial",
    "Registro no MAPA",
    "Laudo de Qualidade",
    "Bula do Produto",
    "FISPQ"
  ],
  sellerInfo: {
      id: 6,
      name: "Cat&Dog atacado",
      location: "Três Cachoeiras, RS",
      rating: 4.9,
      totalSales: 1017,
      memberSince: "2020",
      verified: true,
      image: "https://http2.mlstatic.com/D_NQ_NP_744234-MLA79517356833_092024-G.jpg"
    }
},
{
  id: "550e8400-e29b-41d4-a716-446655440018",
  title: "Vetaglos Pomada Cicatrizante Vetnil 20g",
  category: "Saúde e Bem-Estar Animal",
  price: 39.90,
  location: "Rio Grande do Sul",
  city: "Três Cachoeiras",
  rating: 4.8,
  reviews: 775,
  image: "/fotos/produtos/pomadacasco.png",
  seller: "fernandokleinerak",
  verified: true,
  featured: false,
  weight: "20g",
  brand: "Vetaglos",
  stock: "Em estoque",
  description: "Cicatrização rápida e eficaz para feridas e lesões",
  images: [
    "/fotos/produtos/pomadacasco.png"
  ],
  specifications: {
    Retinol: "2.000.000 UI",
    Colecalciferol: "200.000 UI",
  },
  documents: [
    "Ficha Técnica",
    "Rótulo Oficial",
    "Registro no MAPA",
    "Laudo de Qualidade",
    "Bula do Produto",
    "FISPQ"
  ],
  sellerInfo: {
      id: 6,
      name: "fernandokleinerak",
      location: "Três Cachoeiras, RS",
      rating: 4.9,
      totalSales: 1017,
      memberSince: "2020",
      verified: true,
      image: "https://mla-s1-p.mlstatic.com/697837-MLA83884988297_042025-O.jpg"
    }
},
{
  id: "550e8400-e29b-41d4-a716-446655440019",
  title: "Petiolate Antisséptico E Cicatrizante Spray 50ml",
  category: "Saúde e Bem-Estar Animal",
  price: 27.55,
  location: "Minas Gerais",
  city: "Belo Horizonte",
  rating: 4.7,
  reviews: 178,
  image: "/fotos/produtos/spray.png",
  seller: "DUPET STORE",
  verified: true,
  featured: false,
  weight: "50ml",
  brand: "Petiolate",
  stock: "Em estoque",
  description: "Cicatrização rápida e eficaz para feridas e lesões",
  images: [
    "/fotos/produtos/spray.png"
  ],
  specifications: {
    Clorexidina: "0.5g",
    Dexpantenol: "5g",
  },
  documents: [
    "Ficha Técnica",
    "Rótulo Oficial",
    "Registro no MAPA",
    "Laudo de Qualidade",
    "Bula do Produto",
    "FISPQ"
  ],
  sellerInfo: {
      id: 6,
      name: "DUPET STORE",
      location: "Belo Horizonte, MG",
      rating: 4.7,
      totalSales: 1178,
      memberSince: "2020",
      verified: true,
      image: "https://mla-s1-p.mlstatic.com/806856-MLA40643195210_022020-O.jpg"
    }
},
{
  id: "550e8400-e29b-41d4-a716-446655440020",
  title: "Terramicina La - 50ml/ Zoetis/ Kit Com 3 Unidades",
  category: "Saúde e Bem-Estar Animal",
  price: 104.90,
  location: "Minas Gerais",
  city: "Belo Horizonte",
  rating: 5,
  reviews: 3,
  image: "/fotos/produtos/vacina.png",
  seller: "Santa Laura Vet",
  verified: true,
  featured: false,
  weight: "50ml",
  brand: "Zoetis",
  stock: "Em estoque",
  description: "Altamente ativo contra um grande número de microrganismos Gram-positivos e Gram-negativos.",
  images: [
    "/fotos/produtos/vacina.png"
  ],
  specifications: {
    Oxitetraciclina: "200g",
  },
  documents: [
    "Ficha Técnica",
    "Rótulo Oficial",
    "Registro no MAPA",
    "Laudo de Qualidade",
    "Bula do Produto",
    "FISPQ"
  ],
  sellerInfo: {
      id: 6,
      name: "Santa Laura Vet",
      location: "Belo Horizonte, MG",
      rating: 5,
      totalSales: 1003,
      memberSince: "2020",
      verified: true,
      image: "https://http2.mlstatic.com/D_NQ_NP_803589-MLA95246466847_102025-F.jpg"
    }
},
{
  id: "550e8400-e29b-41d4-a716-446655440021",
  title: "Vacina Millenium - 250mL - Dechra",
  category: "Saúde e Bem-Estar Animal",
  price: 58.00,
  location: "São Paulo",
  city: "Osasco",
  rating: 4.9,
  reviews: 1111,
  image: "/fotos/produtos/aftosa.png",
  seller: "COLOMBO PRODUTOS AGROPECUÁRIOS",
  verified: true,
  featured: false,
  weight: "250ml",
  brand: "Dechra",
  stock: "Em estoque",
  description: "O produto deve ser aplicado via subcutânea, observando-se os cuidados usuais de assepsia.",
  images: [
    "/fotos/produtos/aftosa.png"
  ],
  specifications: {
    Dosagem: "2ml",
  },
  documents: [
    "Ficha Técnica",
    "Rótulo Oficial",
    "Registro no MAPA",
    "Laudo de Qualidade",
    "Bula do Produto",
    "FISPQ"
  ],
  sellerInfo: {
      id: 6,
      name: "COLOMBO PRODUTOS AGROPECUÁRIOS",
      location: "Osasco, SP",
      rating: 5,
      totalSales: 1003,
      memberSince: "2020",
      verified: true,
      image: "https://http2.mlstatic.com/D_NQ_NP_635565-MLA75222019116_032024-F.jpg"
    }
},
{
  id: "550e8400-e29b-41d4-a716-446655440022",
  title: "Dexaflan 50ml Dexametazona",
  category: "Saúde e Bem-Estar Animal",
  price: 29.59,
  location: "Rio Grande do Sul",
  city: "Três Cachoeiras",
  rating: 4.9,
  reviews: 15,
  image: "/fotos/produtos/antiinflamatorio.png",
  seller: "fernandokleinerak",
  verified: true,
  featured: false,
  weight: "50ml",
  brand: "Dexaflan",
  stock: "Em estoque",
  description: "DEXAFLAN é indicado como tratamento básico nos processos inflamatórios ou como coadjuvantes",
  images: [
    "/fotos/produtos/antiinflamatorio.png"
  ],
  specifications: {
    Dexametasona: "1ml",
    Dosagem: "20ml",
  },
  documents: [
    "Ficha Técnica",
    "Rótulo Oficial",
    "Registro no MAPA",
    "Laudo de Qualidade",
    "Bula do Produto",
    "FISPQ"
  ],
  sellerInfo: {
      id: 6,
      name: "fernandokleinerak",
      location: "Três Cachoeiras, RS",
      rating: 4.9,
      totalSales: 1015,
      memberSince: "2020",
      verified: true,
      image: "https://mla-s1-p.mlstatic.com/697837-MLA83884988297_042025-O.jpg"
    }
},
{
  id: "550e8400-e29b-41d4-a716-446655440023",
  title: "Premix Probiótico Para Aumentar Leite Vaca - Max Leite 5 Kg",
  category: "Saúde e Bem-Estar Animal",
  price: 230.66,
  location: "São José do Rio Preto",
  city: "São Paulo",
  rating: 5,
  reviews: 1,
  image: "/fotos/produtos/probiotico.png",
  seller: "Imperial Nutri",
  verified: true,
  featured: false,
  weight: "5kg",
  brand: "Imperial Nutri",
  stock: "Em estoque",
  description: "Núcleo mineral, vitamínico, aminoácido, para mistura, destinado aos Bovinos de Leite, de todas as idades, e em todas as suas fases de criação, contendo Sais Cálcicos de Ácidos Graxos.",
  images: [
    "/fotos/produtos/probiotico.png"
  ],
  specifications: {
    calcium: "8%",
    sodio: "5%",
    phosphorus: "3%",
  },
  documents: [
    "Ficha Técnica",
    "Rótulo Oficial",
    "Registro no MAPA",
    "Laudo de Qualidade",
    "Bula do Produto",
    "FISPQ"
  ],
  sellerInfo: {
      id: 6,
      name: "Imperial Nutri",
      location: "São José do Rio Preto , SP",
      rating: 4.9,
      totalSales: 1015,
      memberSince: "2020",
      verified: true,
      image: "https://http2.mlstatic.com/D_NQ_NP_703782-MLA84648900565_052025-G.jpg"
    }
},
]
