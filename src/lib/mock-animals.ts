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
    seller: {
      id: 1,
      name: "Fazenda Boa Vista",
      location: "Goiânia, GO",
      rating: 4.8,
      totalSales: 24,
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
    seller: {
      id: 2,
      name: "Haras São João",
      location: "Minas Gerais, MG",
      rating: 4.9,
      totalSales: 18,
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
    seller: {
      id: 3,
      name: "Fazenda Três Rios",
      location: "São Paulo, SP",
      rating: 4.7,
      totalSales: 31,
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
    seller: {
      id: 4,
      name: "Genética Elite",
      location: "Rio Grande do Sul, RS",
      rating: 5.0,
      totalSales: 12,
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
    seller: {
      id: 5,
      name: "Fazenda Santa Rita",
      location: "Mato Grosso, MT",
      rating: 4.8,
      totalSales: 42,
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
    seller: {
      id: 6,
      name: "Haras Elite",
      location: "Goiás, GO",
      rating: 4.9,
      totalSales: 15,
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
  },
  {
  id: "660e8400-e29b-41d4-a716-446655440007",
  title: "Touro Nelore PO",
  category: "Gado de Corte",
  breed: "Nelore PO",
  sex: "Macho",
  age: "2 anos e 10 meses",
  weight: "950kg",
  height: "1.55m",
  price: 9000,
  location: "Santa Catarina",
  city: "Apiúna",
  description: "Zebuíno Nelore PO, adaptado ao clima tropical, reconhecido pela rusticidade, tolerância ao calor e boa conformação. Animal com excelente musculatura e estrutura típica da raça, ideal para reprodução ou terminação.",
  images: [
      "/fotos/animais/nelorepo.png",
  ],
  seller: {
    id: 6,
    name: "Produtor Rural Apiúna",
    location: "Apiúna, SC",
    rating: 4.8,
    totalSales: 12,
    memberSince: "2020",
    verified: true,
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=100&h=100&fit=crop"
  },
  specifications: {
    production: "Reprodutor PO",
    breeding: "Monta natural",
    feed: "Pasto + suplemento mineral",
    health: "Vacinação em dia",
    genetics: "Registro Genealógico Definitivo (ABCZ)"
  },
  documents: [
    "Registro Genealógico Definitivo (RGD) da ABCZ",
    "Laudo andrológico",
    "Exames sanitários (brucelose/tuberculose)",
    "Comprovante de origem/pedigree"
  ],
  type: "venda",
  featured: true
},
{
  id: "660e8400-e29b-41d4-a716-446655440008",
  title: "Touro Angus",
  category: "Gado de Corte",
  breed: "Angus",
  sex: "Macho",
  age: "3 anos",
  weight: "700kg",
  height: "1.50m",
  price: 4500,
  location: "Paraná",
  city: "Tijucas do Sul",
  description: "Touro Angus, carne marmorizada, sabor superior, ótimo para cruzamentos industriais. Porte médio-grande, excelente capacidade de engorda e alto valor agregado na carne.",
  images: [
      "/fotos/animais/angus.png",
  ],
  seller: {
    id: 6,
    name: "Rodolfo Augusto Valaski Sato",
    location: "Tijucas do Sul, PR",
    rating: 4.5,
    totalSales: 10,
    memberSince: "2021",
    verified: true,
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=100&h=100&fit=crop"
  },
  specifications: {
    production: "Reprodutor registrado",
    breeding: "Monta natural",
    feed: "Pasto + suplementação mineral",
    health: "Vacinação em dia, exames sanitários realizados",
    genetics: "Registro genético Angus"
  },
  documents: [
    "Registro da Associação Brasileira de Angus",
    "Laudos de desempenho/genética",
    "Exames sanitários (brucelose/tuberculose)",
    "Histórico de peso/engorda"
  ],
  type: "venda",
  featured: false,
},
{
  id: "660e8400-e29b-41d4-a716-446655440009",
  title: "Tourinhos Brahman",
  category: "Gado de Corte",
  breed: "Brahman",
  sex: "Macho",
  age: "18 meses",
  weight: "900kg",
  height: "1.60m",
  price: 8000,
  location: "Minas Gerais",
  city: "Divinópolis",
  description: "Zebuíno Brahman globalizado, com excelente adaptação ao calor, parasitas e climas difíceis. Porte grande, machos podem ultrapassar 900 kg; ideal para cruzamentos industriais e engorda. Documentação em ordem para registro e desempenho genético.",
  images: [
      "/fotos/animais/brahman.png",
  ],
  seller: {
    id: 6,
    name: "edmundo",
    location: "Divinópolis, MG",
    rating: 4.6,
    totalSales: 9,
    memberSince: "2022",
    verified: true,
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=100&h=100&fit=crop"
  },
  specifications: {
    production: "Reprodutor jovem",
    breeding: "Monta natural / cruzamento industrial",
    feed: "Pasto + suplemento mineral",
    health: "Vacinação e exames sanitários completos",
    genetics: "Registro em entidade específica (ex: Associação Brahman Brasil)"
  },
  documents: [
    "Registro Associação Brahman Brasil",
    "Laudo andrológico (touros)",
    "Exames sanitários",
    "Pedigree"
  ],
  type: "venda",
  featured: false,
},
{
  id: "660e8400-e29b-41d4-a716-446655440010",
  title: "Brangus",
  category: "Gado de Corte",
  breed: "Brangus",
  sex: "Macho",
  age: "2 anos",
  weight: "800kg",
  height: "1.50m",
  price: 8000,
  location: "Paraná",
  city: "Ponta Grossa / Guarapuava região",
  description: "Raça híbrida (Angus × Zebu) visando aproveitar marmoreio e adaptabilidade tropical; excelente para regiões exigentes. Vantagem genética híbrida e bom desempenho em cruzamentos industriais.",
  images: [
      "/fotos/animais/brangus.png",
  ],
  seller: {
    id: 6,
    name: "Barbosa",
    location: "Ponta Grossa, PR",
    rating: 4.7,
    totalSales: 11,
    memberSince: "2021",
    verified: true,
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=100&h=100&fit=crop"
  },
  specifications: {
    production: "Reprodutor híbrido",
    breeding: "Cruzamento industrial / monta natural",
    feed: "Pasto tropical + suplemento mineral",
    health: "Vacinação e exames sanitários completos",
    genetics: "Registro genealógico na associação correspondente"
  },
  documents: [
    "Registro genealógico da associação correspondente",
    "Laudos genéticos/índices",
    "Exames sanitários",
    "Pedigree"
  ],
  type: "venda",
  featured: false,
},
{
  id: "660e8400-e29b-41d4-a716-446655440011",
  title: "Tourinho Senepol Puro",
  category: "Gado de Corte",
  breed: "Senepol",
  sex: "Macho",
  age: "2 anos",
  weight: "850kg",
  height: "1.50m",
  price: 7500,
  location: "São Paulo",
  city: "Presidente Prudente",
  description: "Raça Senepol de origem caribenha, conhecida por sua excelente adaptação ao calor e climas difíceis, ideal para terminação em sistemas extensivos. Documentação completa: registro genealógico, laudos de desempenho, exames sanitários e pedigree.",
  images: [
      "/fotos/animais/senepol.png",
  ],
  seller: {
    id: 6,
    name: "",
    location: "Presidente Prudente, SP",
    rating: 4.6,
    totalSales: 7,
    memberSince: "2022",
    verified: true,
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=100&h=100&fit=crop"
  },
  specifications: {
    production: "Reprodutor PO",
    breeding: "Monta natural",
    feed: "Pasto + suplemento mineral",
    health: "Vacinação e exames sanitários em dia",
    genetics: "Registro genealógico ABCB Senepol"
  },
  documents: [
    "Registro genealógico",
    "Laudos de desempenho",
    "Exames sanitários",
    "Pedigree"
  ],
  type: "venda",
  featured: false,
},
{
  id: "660e8400-e29b-41d4-a716-446655440012",
  title: "Touro Hereford",
  category: "Gado de Corte",
  breed: "Hereford",
  sex: "Macho",
  age: "3 anos",
  weight: "800kg",
  height: "1.50m",
  price: 6500,
  location: "Santa Catarina",
  city: "Florianópolis e Região",
  description: "Raça britânica tradicional para carne de qualidade; utilizada para cruzamentos que valorizam acabamento e carne diferenciada. Adaptada a sistemas de corte, porte médio e bom acabamento de carcaça.",
  images: [
      "/fotos/animais/hereford.png",
  ],
  seller: {
    id: 6,
    name: "Ronei S.",
    location: "Florianópolis, SC",
    rating: 4.7,
    totalSales: 10,
    memberSince: "2021",
    verified: true,
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=100&h=100&fit=crop"
  },
  specifications: {
    production: "Reprodutor PO",
    breeding: "Monta natural",
    feed: "Pasto + suplemento mineral",
    health: "Vacinação e exames sanitários completos",
    genetics: "Registro em associação (ex: Associação Brasileira de Hereford e Braford)"
  },
  documents: [
    "Registro em associação (ex: ABHB)",
    "Laudos zootécnicos",
    "Exames sanitários",
    "Pedigree"
  ],
  type: "venda",
  featured: false,
},
{
  id: "660e8400-e29b-41d4-a716-446655440013",
  title: "Vaca Holandesa de Primeira Cria",
  category: "Gado de Leite",
  breed: "Holandês",
  sex: "Fêmea",
  age: "4 anos",
  weight: "650kg",
  height: "1.45m",
  price: 5500,
  location: "Rio Grande do Sul",
  city: "Região de Porto Alegre/ Torres e Santa Cruz-do-Sul",
  description: "Raça Holandês de alta produção de leite em volume, lidera sistemas leiteiros no Brasil. Produção média alta (vacas bem manejadas podem ultrapassar 6-10 mil kg em 305 dias); exige manejo, conforto e sanidade. Vaca de primeira cria, pronta para entrada em lactação.",
  images: [
      "/fotos/animais/holandes.png",
  ],
  seller: {
    id: 6,
    name: "Bruna Dias",
    location: "Rio Grande do Sul, RS",
    rating: 4.5,
    totalSales: 8,
    memberSince: "2022",
    verified: true,
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=100&h=100&fit=crop"
  },
  specifications: {
    production: "Alta produção leiteira",
    breeding: "Montagem de rebanho leiteiro",
    feed: "Conforto de estábulo + pastagem",
    health: "Exige manejo rigoroso de sanidade",
    genetics: "Registro na associação correspondente"
  },
  documents: [
    "Registro na associação (ex: Associação Brasileira de Criadores de Holandês)",
    "Controle leiteiro oficial",
    "Exames sanitários (brucelose/tuberculose)",
    "Histórico de lactações"
  ],
  type: "venda",
  featured: false,
},
{
  id: "660e8400-e29b-41d4-a716-446655440014",
  title: "Vaca Jersey",
  category: "Gado de Leite",
  breed: "Jersey",
  sex: "Fêmea",
  age: "3 anos",
  weight: "500kg",
  height: "1.35m",
  price: 6000,
  location: "Santa Catarina",
  city: "Florianópolis e Região",
  description: "Raça Jersey de menor porte, excelente para teor de sólidos no leite (proteína/gordura), ideal para sistemas especializados de queijo e manteiga. Produção moderada, ótimo para leite de qualidade com menor ingestão de matéria seca.",
  images: [
      "/fotos/animais/jersey.png",
  ],
  seller: {
    id: 6,
    name: "sthefaniecalais",
    location: "Florianópolis, SC",
    rating: 4.6,
    totalSales: 9,
    memberSince: "2022",
    verified: true,
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=100&h=100&fit=crop"
  },
  specifications: {
    production: "Produção moderada de leite com alta % de sólidos",
    breeding: "Rebanho especializado para queijo/manteiga",
    feed: "Pasto + suplemento mineral leve",
    health: "Sanidade rigorosa, controle de mastite",
    genetics: "Registro genealógico, controle leiteiro"
  },
  documents: [
    "Registro genealógico",
    "Controle leiteiro oficial",
    "Exames sanitários (brucelose/tuberculose)",
    "Pedigree"
  ],
  type: "venda",
  featured: false,
},
{
  id: "660e8400-e29b-41d4-a716-446655440015",
  title: "Vaca Pardo Suiço",
  category: "Gado de Leite",
  breed: "Pardo Suiço",
  sex: "Fêmea",
  age: "4 anos",
  weight: "600kg",
  height: "1.50m",
  price: 7000,
  location: "Santa Catarina",
  city: "Florianópolis e Região",
  description: "Raça Pardo Suiço de origem europeia (Suíça), boa longevidade, adaptação e produção decente; ideal para sistemas menos intensivos. Produção média menor que Holandês, porém vantagem em rusticidade e adaptação ao clima. Documentos completos: registro genealógico, laudos de desempenho, exames sanitários, pedigree.",
  images: [
      "/fotos/animais/pardo.png",
  ],
  seller: {
    id: 6,
    name: "Lucas S.",
    location: "Florianópolis, SC",
    rating: 4.6,
    totalSales: 8,
    memberSince: "2022",
    verified: true,
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=100&h=100&fit=crop"
  },
  specifications: {
    production: "Produção média de leite para sistemas mais extensivos",
    breeding: "Rebanho especializado ou cruzamentos rústicos",
    feed: "Pasto + suplemento mineral leve",
    health: "Sanidade rigorosa; adaptada a climas difíceis",
    genetics: "Registro genealógico, histórico produtivo"
  },
  documents: [
    "Registro em associação",
    "Laudos de desempenho",
    "Exames sanitários",
    "Pedigree"
  ],
  type: "venda",
  featured: false,
},
{
  id: "660e8400-e29b-41d4-a716-446655440016",
  title: "Gir Leiteiro",
  category: "Gado de Leite",
  breed: "Gir Leiteiro",
  sex: "Fêmea",
  age: "3 anos",
  weight: "550kg",
  height: "1.45m",
  price: 5000,
  location: "Rio Grande do Norte",
  city: "Ponta Negra, Natal",
  description: "Zebuíno adaptado ao clima tropical, robusto e resistente — ideal para produção de leite a pasto. Especificações: adaptação ao calor, boa fertilidade e rusticidade; produção moderada. Documentação: registro na associação (ABCGIL), controle leiteiro, sanidade completa.",
  images: [
      "/fotos/animais/gir.png",
  ],
  seller: {
    id: 6,
    name: "Higor Moura",
    location: "Ponta Negra, Natal, RN",
    rating: 4.5,
    totalSales: 7,
    memberSince: "2022",
    verified: true,
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=100&h=100&fit=crop"
  },
  specifications: {
    production: "Produção moderada a pasto",
    breeding: "Rebanho leiteiro adaptado",
    feed: "Pasto tropical + suplementação leve",
    health: "Sanidade rigorosa, ideal para clima quente",
    genetics: "Registro na Associação Brasileira de Criadores de Gir Leiteiro (ABCGIL)"
  },
  documents: [
    "Registro na associação (ABCGIL)",
    "Controle leiteiro oficial",
    "Exames sanitários completos",
    "Pedigree"
  ],
  type: "venda",
  featured: false,
},
{
  id: "660e8400-e29b-41d4-a716-446655440017",
  title: "Novilha Girolando 17",
  category: "Gado de Leite",
  breed: "Girolando",
  sex: "Fêmea",
  age: "2 anos",
  weight: "550kg",
  height: "1.45m",
  price: 6500,
  location: "São Paulo",
  city: "São José do Rio Preto e Região",
  description: "Raça Girolando (híbrida Gir × Holandês) que busca combinar boa produção e adaptabilidade. Excelente equilíbrio entre volume de leite e rusticidade — ideal para sistemas brasileiros variados. Documentos: registro na associação, controle leiteiro, sanidade, pedigree.",
  images: [
      "/fotos/animais/girolando.png",
  ],
  seller: {
    id: 6,
    name: "Gustavo Nunes",
    location: "São José do Rio Preto, SP",
    rating: 4.7,
    totalSales: 10,
    memberSince: "2021",
    verified: true,
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=100&h=100&fit=crop"
  },
  specifications: {
    production: "Bom equilíbrio entre volume e adaptabilidade",
    breeding: "Rebanho leiteiro híbrido adaptado",
    feed: "Pasto + suplemento mineral leve",
    health: "Sanidade e conforto exigidos",
    genetics: "Registro genealógico na associação correspondente"
  },
  documents: [
    "Registro na Associação Brasileira dos Criadores de Girolando",
    "Controle leiteiro oficial",
    "Exames sanitários (brucelose/tuberculose)",
    "Pedigree"
  ],
  type: "venda",
  featured: false,
},
{
  id: "660e8400-e29b-41d4-a716-446655440018",
  title: "Guzerá Linha Leiteira",
  category: "Gado de Leite",
  breed: "Guzerá",
  sex: "Fêmea",
  age: "3 anos",
  weight: "650kg",
  height: "1.50m",
  price: 7000,
  location: "Minas Gerais",
  city: "Juiz de Fora e Região",
  description: "Zebuíno de dupla aptidão (carne + leite), com linhagens selecionadas para leite. Produção menos voluminosa que a Holandês, mas excelente para clima difícil e adaptabilidade. Documentação: registro em associação (ACGB), histórico produtivo, sanidade, pedigree.",
  images: [
      "/fotos/animais/guzera.png",
  ],
  seller: {
    id: 6,
    name: "Luiz Anastácio",
    location: "Juiz de Fora, MG",
    rating: 4.6,
    totalSales: 7,
    memberSince: "2022",
    verified: true,
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=100&h=100&fit=crop"
  },
  specifications: {
    production: "Produção moderada de leite com boa rusticidade",
    breeding: "Linha leiteira Guzerá ou cruzamentos adaptados",
    feed: "Pasto + suplementação mineral leve",
    health: "Sanidade e manejo adaptados ao clima tropical",
    genetics: "Registro na Associação Brasileira dos Criadores de Guzerá (ACGB)"
  },
  documents: [
    "Registro em associação (ACGB)",
    "Histórico produtivo",
    "Exames sanitários",
    "Pedigree"
  ],
  type: "venda",
  featured: false,
},
{
  id: "660e8400-e29b-41d4-a716-446655440019",
  title: "Quarto de Milha Registrado",
  category: "Cavalos",
  breed: "Quarto de Milha",
  sex: "Macho",
  age: "4 anos",
  weight: "530kg",
  height: "1.55m",
  price: 12000,
  location: "Rio de Janeiro",
  city: "Região do Rio de Janeiro",
  description: "Raça muito usada no Brasil para vaquejada e laço, musculatura desenvolvida, excelente arrancada. Altura aproximada 1,45-1,60 m, estrutura atlética, adaptada ao trabalho sob sela/trabalho. Documentos: registro na Associação Brasileira de Criadores de Quarto de Milha (ABQM), exames de AIE/mormo, teste de desempenho, pedigree.",
  images: [
      "/fotos/animais/quarto.png",
  ],
  seller: {
    id: 6,
    name: "Mauro Emilio",
    location: "Rio de Janeiro, RJ",
    rating: 4.7,
    totalSales: 14,
    memberSince: "2021",
    verified: true,
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=100&h=100&fit=crop"
  },
  specifications: {
    production: "Alta performance para vaquejada/laço",
    breeding: "Registro P.O. pela ABQM",
    feed: "Pasto + suplemento + treinamento atlético",
    health: "Exames de AIE/mormo, saneamento completo",
    genetics: "Pedigree e teste de desempenho"
  },
  documents: [
    "Registro ABQM",
    "Exames AIE/mormo",
    "Teste de desempenho/esportes de sela",
    "Pedigree"
  ],
  type: "venda",
  featured: false,
},
{
  id: "660e8400-e29b-41d4-a716-446655440020",
  title: "Mangalarga",
  category: "Cavalos",
  breed: "Mangalarga",
  sex: "Macho",
  age: "3 anos",
  weight: "450kg",
  height: "1.50m",
  price: 9500,
  location: "Minas Gerais",
  city: "Montes Claros e Região",
  description: "Raça tradicional de sela nacional, mais leve que outros de trabalho pesado, usada tanto para lazer como esporte.",
  images: [
      "/fotos/animais/manga.png",
  ],
  seller: {
    id: 6,
    name: "Rezende",
    location: "Montes Claros, MG",
    rating: 4.6,
    totalSales: 8,
    memberSince: "2022",
    verified: true,
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=100&h=100&fit=crop"
  },
  specifications: {
    production: "Andamento confortável para lazer/trabalho",
    breeding: "Registro na ABCCMM",
    feed: "Pasto + suplemento mineral leve",
    health: "Sanidade e manejo adaptados para equinos",
    genetics: "Laudos de avaliação de marcha, pedigree"
  },
  documents: [
    "Registro na Associação Brasileira dos Criadores do Mangalarga Marchador (ABCCMM)",
    "Laudos de avaliação de marcha",
    "Exames sanitários",
    "Pedigree"
  ],
  type: "venda",
  featured: false,
},
{
  id: "660e8400-e29b-41d4-a716-446655440021",
  title: "Mangalarga Marchador Registrado",
  category: "Cavalos",
  breed: "Mangalarga Marchador",
  sex: "Macho",
  age: "3 anos",
  weight: "480kg",
  height: "1.50m",
  price: 11000,
  location: "Paraná",
  city: "Região de Curitiba/Paranaguá",
  description: "Raça brasileira de marcha macia, excelente para sela, lazer ou trabalho em fazenda. Altura média 1,45-1,60 m, andamento “marcha batida” ou “picada”, temperamento dócil. Documentos: registro na Associação Brasileira dos Criadores do Mangalarga Marchador (ABCCMM), laudos de avaliação de marcha, sanidade, pedigree.",
  images: [
      "/fotos/animais/marchador.png",
  ],
  seller: {
    id: 6,
    name: "Toni Gubert",
    location: "Curitiba, PR",
    rating: 4.8,
    totalSales: 13,
    memberSince: "2021",
    verified: true,
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=100&h=100&fit=crop"
  },
  specifications: {
    production: "Andamento confortável para sela/lazer",
    breeding: "Registro ABCCMM",
    feed: "Pasto + suplemento mineral leve",
    health: "Sanidade rigorosa, exames em dia",
    genetics: "Laudos de avaliação de marcha, pedigree"
  },
  documents: [
    "Registro na ABCCMM",
    "Laudos de avaliação de marcha",
    "Exames sanitários",
    "Pedigree"
  ],
  type: "venda",
  featured: false,
},
{
  id: "660e8400-e29b-41d4-a716-446655440022",
  title: "Campolina Registrado",
  category: "Cavalos",
  breed: "Campolina",
  sex: "Macho",
  age: "4 anos",
  weight: "550kg",
  height: "1.58m",
  price: 11000,
  location: "São Paulo",
  city: "São Paulo e Região",
  description: "Raça brasileira de grande porte, criada em Minas Gerais, elegante, usada para sela e também exposição. Especificações: macho altura ~1,58 m, garupa ampla, cabeça seca, crina farta. Documentos: registro na Associação Brasileira dos Criadores da Raça Campolina (ABCC), exames de sanidade, pedigree, atestado de conformação racial.",
  images: [
      "/fotos/animais/campolina.png",
  ],
  seller: {
    id: 6,
    name: "Yumi",
    location: "São Paulo, SP",
    rating: 4.8,
    totalSales: 12,
    memberSince: "2020",
    verified: true,
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=100&h=100&fit=crop"
  },
  specifications: {
    production: "Uso para sela/exposição de grande porte",
    breeding: "Registro ABCC",
    feed: "Pasto + suplementação para estrutura muscular",
    health: "Exames de sanidade completos",
    genetics: "Pedigree e atestado de conformação racial"
  },
  documents: [
    "Registro na Associação Brasileira dos Criadores da Raça Campolina (ABCC)",
    "Exames de sanidade",
    "Pedigree",
    "Atestado de conformação racial"
  ],
  type: "venda",
  featured: false,
},
{
  id: "660e8400-e29b-41d4-a716-446655440023",
  title: "Cavalo Crioulo Registrado",
  category: "Cavalos",
  breed: "Crioulo",
  sex: "Macho",
  age: "3 anos",
  weight: "480kg",
  height: "1.48m",
  price: 7000,
  location: "Santa Catarina",
  city: "Florianópolis e Região",
  description: "Raça da América do Sul (Brasil/Argentina/Uruguai) conhecida por resistência, adaptabilidade ao pasto, bom para trabalho e lazer. Especificações: altura ~1,45-1,50 m, corpo forte, temperamento equilibrado, apto para longas cavalgadas. Documentos: registro na Associação Brasileira de Criadores de Cavalo Crioulo (ABCCC), sanidade, pedigree, histórico de provas ou exposições.",
  images: [
      "/fotos/animais/crioulo.png",
  ],
  seller: {
    id: 6,
    name: "Leo miranda",
    location: "Florianópolis, SC",
    rating: 4.5,
    totalSales: 9,
    memberSince: "2022",
    verified: true,
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=100&h=100&fit=crop"
  },
  specifications: {
    production: "Resistência e adaptabilidade ao pasto; apto para trabalho/lazer",
    breeding: "Registro ABCCC",
    feed: "Pasto + suplemento leve",
    health: "Sanidade e histórico de provas/exposições",
    genetics: "Pedigree e registros de desempenho"
  },
  documents: [
    "Registro na Associação Brasileira de Criadores de Cavalo Crioulo (ABCCC)",
    "Sanidade completa",
    "Pedigree",
    "Histórico de provas ou exposições"
  ],
  type: "venda",
  featured: false,
},
{
  id: "660e8400-e29b-41d4-a716-446655440024",
  title: "Dose de Sêmen de Touros Nelore PO de Elite",
  category: "Sêmen",
  breed: "Nelore PO",
  sex: "N/A",
  age: "N/A",
  weight: "N/A",
  height: "N/A",
  price: 150,
  location: "São Paulo",
  city: "Campo Grande",
  description: "Sêmen de touros selecionados da raça Nelore PO, com alta transmissão genética para ganho de peso, acabamento de carcaça e adaptação tropical. Especificações: embalagem padronizada (0,25 ml ou 0,5 ml), congelado em nitrogênio líquido, número de motilidade mínimo e identificação da dose. Documentos: certificado de registro genealógico (RGD/CGD/CEIP), relatório de avaliação genética (DEP), laudo de motilidade e vigor espermático, certificado sanitário e de procedência, nota fiscal e guia de trânsito animal, se aplicável.",
  images: [
      "/fotos/animais/snelore.png",
  ],
  seller: {
    id: 7,
    name: "J L Agropecuária Ltda.",
    location: "Campo Grande, MS",
    rating: 5.0,
    totalSales: 24,
    memberSince: "2023",
    verified: true,
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=100&h=100&fit=crop"
  },
  specifications: {
    production: "Alta transmissão genética, congelado em nitrogênio líquido",
    breeding: "Inseminação artificial, linhagem de elite",
    feed: "N/A",
    health: "Laudo de motilidade e vigor espermático",
    genetics: "Certificado RGD/CGD/CEIP e relatório DEP"
  },
  documents: [
    "Certificado de registro genealógico (RGD/CGD/CEIP)",
    "Relatório de avaliação genética (DEP)",
    "Laudo de motilidade e vigor espermático",
    "Certificado sanitário e de procedência",
    "Nota fiscal e guia de trânsito animal"
  ],
  type: "venda",
  featured: false,
},
{
  id: "660e8400-e29b-41d4-a716-446655440025",
  title: "Dose de Sêmen de Touros Angus para Cruzamento Industrial",
  category: "Sêmen",
  breed: "Angus",
  sex: "N/A",
  age: "N/A",
  weight: "N/A",
  height: "N/A",
  price: 150,
  location: "Rio Grande do Sul",
  city: "Bagé",
  description: "Sêmen de touros Angus selecionados para cruzamento industrial, com genética voltada à alta marmorização e desempenho em terminação de corte. Ideal para valorização de carne premium e ganho de rendimento. Embalagem padronizada (0,25 ml ou 0,5 ml), congelado em nitrogênio líquido, com motilidade mínima garantida. Documentos incluem registro Angus, relatório de progênie, laudos de motilidade e vigor espermático, além de certificado sanitário e de procedência genética.",
  images: [
      "/fotos/animais/sangus.png",
  ],
  seller: {
    id: 8,
    name: "Quaker Hill Farm",
    location: "Bagé, RS",
    rating: 5.0,
    totalSales: 18,
    memberSince: "2023",
    verified: true,
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=100&h=100&fit=crop"
  },
  specifications: {
    production: "Alta marmorização, genética para cruzamento industrial",
    breeding: "Inseminação artificial, linhagem europeia",
    feed: "N/A",
    health: "Laudo de motilidade e vigor espermático",
    genetics: "Registro Angus e relatório de progênie"
  },
  documents: [
    "Registro Angus",
    "Relatório de progênie",
    "Laudo de motilidade e vigor espermático",
    "Certificado sanitário e de procedência genética"
  ],
  type: "venda",
  featured: false,
},
{
  id: "660e8400-e29b-41d4-a716-446655440026",
  title: "Dose de Sêmen de Gir Leiteiro de Alta Produção",
  category: "Sêmen",
  breed: "Gir Leiteiro",
  sex: "N/A",
  age: "N/A",
  weight: "N/A",
  height: "N/A",
  price: 130,
  location: "Minas Gerais",
  city: "Uberaba",
  description: "Sêmen de touros Gir Leiteiro selecionados para alta produção de leite, excelente fertilidade e adaptabilidade ao clima tropical. Material genético ideal para rebanhos de produção e cruzamentos leiteiros, com boa herdabilidade de sólidos e persistência de lactação. Embalagem padronizada (0,25 ml ou 0,5 ml), congelado em nitrogênio líquido, com motilidade mínima garantida. Documentos incluem certificado genealógico, relatório leiteiro de filhas, laudo de vigor e motilidade espermática, além de certificado sanitário e de procedência.",
  images: [
      "/fotos/animais/sgir.png",
  ],
  seller: {
    id: 9,
    name: "José Mario Miranda Abdo.",
    location: "Uberaba, MG",
    rating: 5.0,
    totalSales: 22,
    memberSince: "2023",
    verified: true,
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=100&h=100&fit=crop"
  },
  specifications: {
    production: "Alta produção de leite, persistência de lactação",
    breeding: "Inseminação artificial com touros provados",
    feed: "N/A",
    health: "Laudo de motilidade e vigor espermático",
    genetics: "Certificado genealógico e relatório leiteiro"
  },
  documents: [
    "Certificado genealógico da raça",
    "Relatório leiteiro das filhas ou do touro",
    "Laudo de motilidade e vigor espermático",
    "Certificado sanitário e de procedência"
  ],
  type: "venda",
  featured: false,
},
{
  id: "660e8400-e29b-41d4-a716-446655440027",
  title: "Dose de Sêmen de Mangalarga Marchador para Andamento de Marcha",
  category: "Sêmen",
  breed: "Mangalarga Marchador",
  sex: "N/A",
  age: "N/A",
  weight: "N/A",
  height: "N/A",
  price: 850,
  location: "Minas Gerais",
  city: "Belo Horizonte",
  description: "Sêmen de cavalo reprodutor da raça Mangalarga Marchador, selecionado para andamento, conformação e desempenho em sela. Ideal para criadores que buscam aprimorar marcha batida ou picada, com linhagem comprovada em pistas e genética voltada à funcionalidade. Material genético certificado, com pedigree completo e laudos de avaliação de marcha. Inclui exames sanitários (AIE, mormo) e termo de cobertura ou contrato de inseminação, conforme normas da associação da raça.",
  images: [
      "/fotos/animais/smanga.png",
  ],
  seller: {
    id: 10,
    name: "Sanzio Reis Barbosa",
    location: "Belo Horizonte, MG",
    rating: 5.0,
    totalSales: 18,
    memberSince: "2023",
    verified: true,
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=100&h=100&fit=crop"
  },
  specifications: {
    production: "Sêmen equino certificado para reprodução",
    breeding: "Aptidão comprovada para marcha e sela",
    feed: "N/A",
    health: "Exames de AIE e mormo atualizados",
    genetics: "Pedigree e laudo de marcha reconhecidos"
  },
  documents: [
    "Registro do cavalo na associação da raça",
    "Exames de aptidão e andamento de marcha",
    "Exames sanitários (AIE e mormo)",
    "Termo de cobertura ou contrato de inseminação"
  ],
  type: "venda",
  featured: false,
},
{
  id: "660e8400-e29b-41d4-a716-446655440028",
  title: "Dose de Sêmen (ou Embriões) de Touros Guzerá Linha Leiteira",
  category: "Sêmen",
  breed: "Guzerá",
  sex: "N/A",
  age: "N/A",
  weight: "N/A",
  height: "N/A",
  price: 120,
  location: "Minas Gerais",
  city: "Uberaba",
  description: "Sêmen e embriões de touros Guzerá da linha leiteira, com genética selecionada para produção de leite em sistemas tropicais. Animais com alto valor genético para volume, teor de sólidos e adaptabilidade. Material coletado e processado em conformidade com padrões sanitários e de qualidade, ideal para melhoramento genético em rebanhos leiteiros. Inclui certificação de registro e laudos de motilidade e vigor espermático.",
  images: [
      "/fotos/animais/sguzera.png",
  ],
  seller: {
    id: 11,
    name: "Gilson Carlos Bargieri.",
    location: "Uberaba, MG",
    rating: 5.0,
    totalSales: 22,
    memberSince: "2023",
    verified: true,
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=100&h=100&fit=crop"
  },
  specifications: {
    production: "Certificado para linha leiteira",
    breeding: "Sêmen e embriões de touros Guzerá elite",
    feed: "N/A",
    health: "Laudos de motilidade e sanidade aprovados",
    genetics: "Valores genéticos elevados para leite e adaptabilidade"
  },
  documents: [
    "Registro genealógico Guzerá",
    "Relatório leiteiro das filhas",
    "Laudo de motilidade e vigor espermático",
    "Certificado de sanidade e procedência",
    "Nota fiscal"
  ],
  type: "venda",
  featured: false,
},
{
  id: "660e8400-e29b-41d4-a716-446655440029",
  title: "Dose de Sêmen de Touros Senepol para Corte em Clima Quente",
  category: "Sêmen",
  breed: "Senepol",
  sex: "N/A",
  age: "N/A",
  weight: "N/A",
  height: "N/A",
  price: 150,
  location: "Goiás",
  city: "Jataí",
  description: "Sêmen de touros Senepol de genética comprovada, ideais para corte em regiões tropicais e de clima quente. Raça reconhecida pela rusticidade, docilidade e eficiência na terminação a pasto. Produto armazenado em nitrogênio líquido, com laudos de motilidade e vigor espermático, além de certificação de procedência. Excelente opção para cruzamentos industriais e melhoramento genético de rebanhos de corte.",
  images: [
      "/fotos/animais/ssenepol.png",
  ],
  seller: {
    id: 11,
    name: "Marcelo de Almeida Felício",
    location: "Jataí, GO",
    rating: 5.0,
    totalSales: 20,
    memberSince: "2023",
    verified: true,
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=100&h=100&fit=crop"
  },
  specifications: {
    production: "Certificado e testado para corte",
    breeding: "Sêmen de touros Senepol de elite",
    feed: "N/A",
    health: "Laudos de motilidade e sanidade aprovados",
    genetics: "Alta adaptabilidade e eficiência em clima quente"
  },
  documents: [
    "Registro de raça Senepol",
    "Relatório genético",
    "Laudo de motilidade e vigor espermático",
    "Certificado sanitário e de procedência",
    "Nota fiscal"
  ],
  type: "venda",
  featured: false,
}
]
