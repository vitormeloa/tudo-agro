export interface Question {
  id: string
  productId: string
  userId: string
  userName: string
  userAvatar?: string
  question: string
  answer?: string
  answeredBy?: string
  answeredAt?: string
  createdAt: string
  likes: number
}

// Perguntas para produtos
export const mockProductQuestions: Record<string, Question[]> = {
  // Cachaça Haras Eduardo Costa
  "550e8400-e29b-41d4-a716-446655440001": [
    {
      id: "q1",
      productId: "550e8400-e29b-41d4-a716-446655440001",
      userId: "user1",
      userName: "Carlos Silva",
      userAvatar: "https://ui-avatars.com/api/?name=Carlos+Silva&background=10b981&color=fff",
      question: "Qual o teor alcoólico da cachaça?",
      answer: "A cachaça tem 42% de teor alcoólico, produzida de forma artesanal com cana de açúcar selecionada.",
      answeredBy: "Eduardo Costa",
      answeredAt: "2024-12-20",
      createdAt: "2024-12-19",
      likes: 8
    },
    {
      id: "q2",
      productId: "550e8400-e29b-41d4-a716-446655440001",
      userId: "user2",
      userName: "Marina Costa",
      userAvatar: "https://ui-avatars.com/api/?name=Marina+Costa&background=10b981&color=fff",
      question: "Vocês fazem envio para todo o Brasil?",
      answer: "Sim! Realizamos envios para todo o território nacional. O prazo varia de acordo com a região.",
      answeredBy: "Eduardo Costa",
      answeredAt: "2024-12-18",
      createdAt: "2024-12-17",
      likes: 5
    },
    {
      id: "q3",
      productId: "550e8400-e29b-41d4-a716-446655440001",
      userId: "user3",
      userName: "Roberto Mendes",
      userAvatar: "https://ui-avatars.com/api/?name=Roberto+Mendes&background=10b981&color=fff",
      question: "Quanto tempo leva para produzir essa cachaça?",
      answer: "O processo completo leva cerca de 6 meses, incluindo fermentação, destilação e envelhecimento parcial.",
      answeredBy: "Eduardo Costa",
      answeredAt: "2024-12-15",
      createdAt: "2024-12-14",
      likes: 12
    },
    {
      id: "q4",
      productId: "550e8400-e29b-41d4-a716-446655440001",
      userId: "user4",
      userName: "Juliana Oliveira",
      userAvatar: "https://ui-avatars.com/api/?name=Juliana+Oliveira&background=10b981&color=fff",
      question: "Tem desconto para compra em quantidade?",
      createdAt: "2024-12-22",
      likes: 3
    }
  ],

  // Semente Milho
  "550e8400-e29b-41d4-a716-446655440002": [
    {
      id: "q5",
      productId: "550e8400-e29b-41d4-a716-446655440002",
      userId: "user5",
      userName: "José Fazendeiro",
      userAvatar: "https://ui-avatars.com/api/?name=Jose+Fazendeiro&background=10b981&color=fff",
      question: "Qual a produtividade média dessa semente?",
      answer: "A produtividade média é de 180 a 220 sacas por hectare, dependendo das condições de solo e clima.",
      answeredBy: "Agro Sementes",
      answeredAt: "2024-12-21",
      createdAt: "2024-12-20",
      likes: 15
    },
    {
      id: "q6",
      productId: "550e8400-e29b-41d4-a716-446655440002",
      userId: "user6",
      userName: "Pedro Agricultor",
      userAvatar: "https://ui-avatars.com/api/?name=Pedro+Agricultor&background=10b981&color=fff",
      question: "Essa semente é resistente a pragas?",
      answer: "Sim, o BM 3066 possui resistência a lagarta-do-cartucho e tolerância a doenças foliares.",
      answeredBy: "Agro Sementes",
      answeredAt: "2024-12-19",
      createdAt: "2024-12-18",
      likes: 10
    },
    {
      id: "q7",
      productId: "550e8400-e29b-41d4-a716-446655440002",
      userId: "user7",
      userName: "Antonio Santos",
      userAvatar: "https://ui-avatars.com/api/?name=Antonio+Santos&background=10b981&color=fff",
      question: "Qual o melhor período para plantio?",
      createdAt: "2024-12-22",
      likes: 6
    }
  ],

  // Ração Premium
  "550e8400-e29b-41d4-a716-446655440003": [
    {
      id: "q8",
      productId: "550e8400-e29b-41d4-a716-446655440003",
      userId: "user8",
      userName: "Ricardo Pecuarista",
      userAvatar: "https://ui-avatars.com/api/?name=Ricardo+Pecuarista&background=10b981&color=fff",
      question: "Qual a composição nutricional dessa ração?",
      answer: "Proteína bruta: 18%, NDT: 75%, Fibra: 12%. Ideal para gado de corte em fase de engorda.",
      answeredBy: "NutriMax",
      answeredAt: "2024-12-20",
      createdAt: "2024-12-19",
      likes: 20
    },
    {
      id: "q9",
      productId: "550e8400-e29b-41d4-a716-446655440003",
      userId: "user9",
      userName: "Fernanda Lima",
      userAvatar: "https://ui-avatars.com/api/?name=Fernanda+Lima&background=10b981&color=fff",
      question: "Quanto tempo dura um saco de 50kg?",
      answer: "Para um bovino adulto, o consumo médio é de 5-8kg/dia, então dura aproximadamente 6-10 dias.",
      answeredBy: "NutriMax",
      answeredAt: "2024-12-18",
      createdAt: "2024-12-17",
      likes: 13
    }
  ]
}

// Perguntas para animais
export const mockAnimalQuestions: Record<string, Question[]> = {
  // Touro Nelore
  "1": [
    {
      id: "qa1",
      productId: "1",
      userId: "user10",
      userName: "João Criador",
      userAvatar: "https://ui-avatars.com/api/?name=Joao+Criador&background=10b981&color=fff",
      question: "O touro já foi usado em cobertura?",
      answer: "Sim, ele já fez 2 estações de monta com excelentes resultados. Taxa de prenhez acima de 90%.",
      answeredBy: "Fazenda Boa Vista",
      answeredAt: "2024-12-21",
      createdAt: "2024-12-20",
      likes: 18
    },
    {
      id: "qa2",
      productId: "1",
      userId: "user11",
      userName: "Marcos Fazendeiro",
      userAvatar: "https://ui-avatars.com/api/?name=Marcos+Fazendeiro&background=10b981&color=fff",
      question: "Qual a linhagem genética desse animal?",
      answer: "Ele é filho do reprodutor Karvadi FIV da Lemgruber, linhagem comprovada de qualidade.",
      answeredBy: "Fazenda Boa Vista",
      answeredAt: "2024-12-20",
      createdAt: "2024-12-19",
      likes: 25
    },
    {
      id: "qa3",
      productId: "1",
      userId: "user12",
      userName: "Sebastião Rural",
      userAvatar: "https://ui-avatars.com/api/?name=Sebastiao+Rural&background=10b981&color=fff",
      question: "O animal está com todas as vacinas em dia?",
      answer: "Sim, todas as vacinas estão em dia, incluindo febre aftosa, brucelose e raiva. Tenho toda a documentação.",
      answeredBy: "Fazenda Boa Vista",
      answeredAt: "2024-12-19",
      createdAt: "2024-12-18",
      likes: 15
    },
    {
      id: "qa4",
      productId: "1",
      userId: "user13",
      userName: "Lucas Agropecuária",
      userAvatar: "https://ui-avatars.com/api/?name=Lucas+Agropecuaria&background=10b981&color=fff",
      question: "Aceita permuta por novilhas?",
      createdAt: "2024-12-22",
      likes: 7
    }
  ],

  // Outros animais podem ter suas perguntas adicionadas aqui conforme necessário
}

// Função auxiliar para buscar perguntas de um produto
export function getProductQuestions(productId: string): Question[] {
  return mockProductQuestions[productId] || []
}

// Função auxiliar para buscar perguntas de um animal
export function getAnimalQuestions(animalId: string): Question[] {
  return mockAnimalQuestions[animalId] || []
}
