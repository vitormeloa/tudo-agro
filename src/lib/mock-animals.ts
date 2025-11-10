export interface MockAnimal {
  id: string
  title: string
  category: string
  breed: string
  sex: string
  age: string
  weight: string
  height: string
  price: number
  location: string
  city: string
  description: string
  images: string[]
  registrationNumber?: string
  father?: string
  mother?: string
  // Campos específicos para cavalos
  marcha?: string
  // Campos específicos para gado
  classificacao?: string
  // Campos específicos para sêmen
  central?: string
  embalagem?: string
  seller: {
    id: number
    name: string
    location: string
    rating: number
    totalSales: number
    memberSince: string
    verified: boolean
    image: string
  }
  specifications: {
    production?: string
    breeding?: string
    feed?: string
    health?: string
    genetics?: string
    [key: string]: string | undefined
  }
  documents: string[]
  type: "venda" | "leilao"
  featured: boolean
}

export const mockAnimals: MockAnimal[] = [
  {
    id: "660e8400-e29b-41d4-a716-446655440001",
    title: "Touro Nelore PO Certificado",
    category: "Gado de Corte",
    breed: "Nelore",
    sex: "Macho",
    age: "3 anos",
    weight: "850kg",
    height: "1.50m",
    price: 45000,
    location: "Goiás",
    city: "Goiânia",
    description: "Touro Nelore PO (Puro de Origem) certificado, com excelente genética e conformação. Animal jovem, saudável, com histórico sanitário completo e vacinação em dia. Ideal para reprodução e melhoramento genético do rebanho.",
    images: [
      "/fotos/animais/touro-nelore.jpeg",
    ],
    registrationNumber: "ABC12345",
    father: "Imperador",
    mother: "Jóia Rara",
    classificacao: "PO",
    seller: {
      id: 1,
      name: "Fazenda Boa Vista",
      location: "Goiânia, GO",
      rating: 4.8,
      totalSales: 1024,
      memberSince: "2020",
      verified: true,
      image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=100&h=100&fit=crop"
    },
    specifications: {
      production: "PO Certificado",
      breeding: "Inseminação artificial",
      feed: "Pasto + suplementação",
      health: "Vacinação completa",
      genetics: "Linha materna elite"
    },
    documents: [
      "Registro genealógico",
      "Exames sanitários",
      "Certificado de vacinação",
      "Teste de brucelose e tuberculose",
      "Certificado de origem"
    ],
    type: "venda",
    featured: true
  },
  {
    id: "660e8400-e29b-41d4-a716-446655440002",
    title: "Égua Mangalarga Marchador",
    category: "Cavalos",
    breed: "Mangalarga",
    sex: "Fêmea",
    age: "5 anos",
    weight: "450kg",
    height: "1.55m",
    price: 25000,
    location: "Minas Gerais",
    city: "Belo Horizonte",
    description: "Égua Mangalarga Marchador de excelente linhagem, com andamento marchado característico da raça. Animal dócil, bem adestrado e com histórico de competições. Ideal para passeios e trabalho de campo.",
    images: [
      "/fotos/animais/egua-mangalarga.jpeg",
    ],
    registrationNumber: "DEF67890",
    father: "Rei do Pampa",
    mother: "Princesa da Marcha",
    marcha: "Batida",
    seller: {
      id: 2,
      name: "Haras São João",
      location: "Minas Gerais, MG",
      rating: 4.9,
      totalSales: 1018,
      memberSince: "2019",
      verified: true,
      image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=100&h=100&fit=crop"
    },
    specifications: {
      production: "Registro ABCCMM",
      breeding: "Reprodução natural",
      feed: "Ração + pasto",
      health: "Vacinação em dia",
      genetics: "Linha campeã"
    },
    documents: [
      "Registro ABCCMM",
      "Certificado de vacinação",
      "Exames sanitários",
      "Histórico de competições"
    ],
    type: "venda",
    featured: false
  },
  {
    id: "660e8400-e29b-41d4-a716-446655440003",
    title: "Vaca Holandesa Produtiva",
    category: "Gado de Leite",
    breed: "Holandesa",
    sex: "Fêmea",
    age: "4 anos",
    weight: "650kg",
    height: "1.45m",
    price: 8500,
    location: "São Paulo",
    city: "Campinas",
    description: "Vaca Holandesa em plena produção leiteira, com média de 35 litros por dia. Animal saudável, com excelente conformação e histórico produtivo comprovado. Ideal para propriedades focadas em produção de leite.",
    images: [
      "/fotos/animais/vaca-holandesa.jpeg",
    ],
    registrationNumber: "GHI11223",
    father: "Touro Leiteiro",
    mother: "Vaca Premiada",
    classificacao: "PC",
    seller: {
      id: 3,
      name: "Fazenda Três Rios",
      location: "São Paulo, SP",
      rating: 4.7,
      totalSales: 1031,
      memberSince: "2021",
      verified: true,
      image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=100&h=100&fit=crop"
    },
    specifications: {
      production: "35L/dia",
      breeding: "Inseminação artificial",
      feed: "Ração + pasto",
      health: "Vacinação completa",
      genetics: "Alta produção"
    },
    documents: [
      "Registro genealógico",
      "Controle leiteiro",
      "Certificado de vacinação",
      "Exames sanitários"
    ],
    type: "venda",
    featured: true
  },
  {
    id: "660e8400-e29b-41d4-a716-446655440004",
    title: "Sêmen Angus Premium",
    category: "Sêmen",
    breed: "Angus",
    sex: "N/A",
    age: "N/A",
    weight: "N/A",
    height: "N/A",
    price: 150,
    location: "Rio Grande do Sul",
    city: "Porto Alegre",
    description: "Sêmen bovino da raça Angus de reprodutor certificado. Material genético de alta qualidade, conservado em nitrogênio líquido. Ideal para inseminação artificial e melhoramento genético do rebanho.",
    images: [
      "/fotos/animais/angus-premium.jpg",
    ],
    registrationNumber: "JKL33445",
    father: "Angus King",
    mother: "Angus Queen",
    central: "ABS",
    embalagem: "0,5ml",
    seller: {
      id: 4,
      name: "Genética Elite",
      location: "Rio Grande do Sul, RS",
      rating: 5.0,
      totalSales: 1012,
      memberSince: "2023",
      verified: true,
      image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=100&h=100&fit=crop"
    },
    specifications: {
      production: "Certificado",
      breeding: "Inseminação artificial",
      feed: "N/A",
      health: "Testado e aprovado",
      genetics: "Linha premium"
    },
    documents: [
      "Certificado genético",
      "Laudo de qualidade",
      "Registro do reprodutor",
      "Garantia de conservação"
    ],
    type: "venda",
    featured: false
  },
  {
    id: "660e8400-e29b-41d4-a716-446655440005",
    title: "Novilha Brahman",
    category: "Gado de Corte",
    breed: "Brahman",
    sex: "Fêmea",
    age: "2 anos",
    weight: "380kg",
    height: "1.30m",
    price: 12000,
    location: "Mato Grosso",
    city: "Cuiabá",
    description: "Novilha Brahman jovem, com excelente conformação e genética superior. Animal adaptado ao clima tropical, resistente a parasitas e com potencial para reprodução. Ideal para formação de rebanho.",
    images: [
      "/fotos/animais/novilha-brahman.jpg",
    ],
    registrationNumber: "MNO55667",
    father: "Brahman Lord",
    mother: "Brahman Lady",
    classificacao: "Cruzado",
    seller: {
      id: 5,
      name: "Fazenda Santa Rita",
      location: "Mato Grosso, MT",
      rating: 4.8,
      totalSales: 1042,
      memberSince: "2018",
      verified: true,
      image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=100&h=100&fit=crop"
    },
    specifications: {
      production: "Certificada",
      breeding: "Reprodução natural",
      feed: "Pasto + suplementação",
      health: "Vacinação completa",
      genetics: "Linha selecionada"
    },
    documents: [
      "Registro genealógico",
      "Certificado de vacinação",
      "Exames sanitários",
      "Certificado de origem"
    ],
    type: "venda",
    featured: false
  },
  {
    id: "660e8400-e29b-41d4-a716-446655440006",
    title: "Garanhão Quarto de Milha",
    category: "Cavalos",
    breed: "Quarto de Milha",
    sex: "Macho",
    age: "7 anos",
    weight: "520kg",
    height: "1.58m",
    price: 35000,
    location: "Goiás",
    city: "Rio Verde",
    description: "Garanhão Quarto de Milha de linhagem campeã, com excelente conformação e desempenho em provas de velocidade. Animal bem adestrado, com histórico de competições e produção de potros de qualidade.",
    images: [
      "/fotos/animais/garanhao-quarto-de-milha.jpg",
    ],
    registrationNumber: "PQR77889",
    father: "Campeão de Vaquejada",
    mother: "Estrela das Pistas",
    marcha: "Trote",
    seller: {
      id: 6,
      name: "Haras Elite",
      location: "Goiás, GO",
      rating: 4.9,
      totalSales: 1015,
      memberSince: "2020",
      verified: true,
      image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=100&h=100&fit=crop"
    },
    specifications: {
      production: "Reprodutor certificado",
      breeding: "Reprodução natural",
      feed: "Ração premium + pasto",
      health: "Vacinação em dia",
      genetics: "Linha campeã"
    },
    documents: [
      "Registro ABQM",
      "Certificado de vacinação",
      "Histórico de competições",
      "Certificado de reprodução"
    ],
    type: "venda",
    featured: true
  }
]
