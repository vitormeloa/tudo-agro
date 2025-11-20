export interface QA {
  question: string;
  answer: string;
  keywords?: string[];
  category?: string;
}

export const agroiaKnowledge: QA[] = [
  {
    question: "O que significa um animal PO (Puro de Origem)?",
    answer: "Um animal PO é aquele com genealogia totalmente registrada, sem cruzamentos. É certificado por associações de raça e geralmente utilizado para reprodução e melhoramento genético.",
    keywords: ["po", "puro de origem", "genealogia", "certificado"],
    category: "Animais / Genética"
  },
  {
    question: "Qual a diferença entre Gado de Corte e Gado de Leite?",
    answer: "O Gado de Corte é criado para produção de carne, com raças como Nelore e Angus. Já o Gado de Leite é selecionado para alta produção de leite, como Holandês e Girolando.",
    keywords: ["gado de corte", "gado de leite", "nelore", "angus", "holandês", "girolando"],
    category: "Animais / Genética"
  },
  {
    question: "Por que a genealogia é importante na hora de comprar um animal?",
    answer: "A genealogia garante o histórico genético do animal, permitindo prever características como desempenho, produção, temperamento e resistência a doenças.",
    keywords: ["genealogia", "importante", "histórico genético"],
    category: "Animais / Genética"
  },
  {
    question: "O que é DEPs no melhoramento genético?",
    answer: "DEPs (Diferenças Esperadas na Progênie) são estimativas de desempenho dos filhos de um animal em relação à média da raça, sendo fundamentais na escolha de reprodutores.",
    keywords: ["deps", "diferenças esperadas", "melhoramento genético"],
    category: "Animais / Genética"
  },
  {
    question: "O que é um bezerro desmamado?",
    answer: "Um bezerro desmamado é aquele que já passou pela fase de amamentação e foi separado da mãe. Isso geralmente ocorre entre 6 e 8 meses de idade, quando o animal já pode se alimentar apenas com pasto e ração.",
    keywords: ["bezerro", "desmamado", "amamentação"],
    category: "Animais / Genética"
  },
  {
    question: "Qual a diferença entre bezerro e garrote?",
    answer: "Bezerro é o bovino até cerca de 12 meses de idade. Garrote é o macho jovem entre 12 e 24 meses, ainda em fase de crescimento, mas já desmamado e com maior desenvolvimento corporal.",
    keywords: ["bezerro", "garrote", "diferença", "idade"],
    category: "Animais / Genética"
  },
  {
    question: "O que é uma vaca parida?",
    answer: "É a vaca que já pariu recentemente e está em fase de lactação, ou seja, produzindo leite. Essa informação é importante principalmente na venda de gado leiteiro.",
    keywords: ["vaca parida", "lactação", "leite"],
    category: "Animais / Genética"
  },
  {
    question: "Como funciona o rastreamento de gado no Brasil?",
    answer: "O rastreamento é feito por meio de brincos com número de identificação, registrados em sistemas como o SISBOV. Isso garante a origem, histórico sanitário e movimentações do animal, sendo obrigatório para exportações e alguns leilões.",
    keywords: ["rastreamento", "gado", "sisbov", "brinco"],
    category: "Animais / Genética"
  },
  {
    question: "O que é um animal com RGD?",
    answer: "RGD significa Registro Genealógico Definitivo. É a certificação oficial que comprova a origem e a pureza da raça do animal, emitido por associações como a ABCZ ou ABCCMM.",
    keywords: ["rgd", "registro genealógico definitivo", "certificação"],
    category: "Animais / Genética"
  },
  {
    question: "Quantas palhetas de sêmen são usadas por cobertura?",
    answer: "Normalmente, é utilizada 1 palheta por cobertura. No entanto, em algumas técnicas ou raças, pode-se usar até 2 para aumentar a chance de fecundação.",
    keywords: ["palhetas", "sêmen", "cobertura"],
    category: "Sêmen e Reprodução"
  },
  {
    question: "Como saber se o sêmen é de qualidade?",
    answer: "Verifique se ele está registrado no MAPA, tem laudo de motilidade, vem de centrais reconhecidas (ABS, Alta, CRV, Genex) e se o reprodutor tem DEPs positivas.",
    keywords: ["sêmen", "qualidade", "mapa", "laudo"],
    category: "Sêmen e Reprodução"
  },
  {
    question: "Qual a diferença entre sêmen de 0,25ml e 0,5ml?",
    answer: "A diferença está no volume da palheta. A de 0,25ml é mais comum e usada com inseminadores automáticos, já a de 0,5ml pode ser usada em inseminação convencional.",
    keywords: ["sêmen", "0,25ml", "0,5ml", "palheta"],
    category: "Sêmen e Reprodução"
  },
  {
    question: "Posso usar sêmen de cavalos em diferentes éguas?",
    answer: "Sim. O sêmen coletado de um garanhão pode fecundar várias éguas, respeitando o número de doses por coleta e o protocolo de inseminação.",
    keywords: ["sêmen", "cavalos", "éguas", "garanhão"],
    category: "Sêmen e Reprodução"
  },
  {
    question: "O que significa sêmen com livre de IBR e BVD?",
    answer: "Significa que o touro doador testou negativo para IBR (rinotraqueíte infecciosa bovina) e BVD (diarreia viral bovina), doenças que podem ser transmitidas pelo sêmen e afetar a fertilidade ou sanidade do rebanho.",
    keywords: ["sêmen", "ibr", "bvd", "livre"],
    category: "Sêmen e Reprodução"
  },
  {
    question: "Posso comprar sêmen de um touro premiado mesmo que ele já tenha morrido?",
    answer: "Sim. Desde que o sêmen tenha sido coletado e armazenado em nitrogênio líquido com segurança, ele pode ser comercializado e utilizado mesmo após o falecimento do touro.",
    keywords: ["sêmen", "touro premiado", "morto", "armazenado"],
    category: "Sêmen e Reprodução"
  },
  {
    question: "Como funciona um leilão virtual de animais?",
    answer: "Os animais são exibidos online com fotos, vídeos, laudos e informações genéticas. Os lances são dados em tempo real, com regras claras e intermediação jurídica.",
    keywords: ["leilão virtual", "animais", "online"],
    category: "Leilões e Mercado"
  },
  {
    question: "Qual o risco de negociar fora da plataforma TudoAgro?",
    answer: "Ao negociar por fora, o usuário perde proteção contratual, rastreio de pagamento e segurança jurídica, ficando exposto a golpes ou fraudes.",
    keywords: ["risco", "negociar fora", "tudoagro", "plataforma"],
    category: "Leilões e Mercado"
  },
  {
    question: "Qual o ticket médio de um touro Nelore PO?",
    answer: "Pode variar de R$ 10 mil a mais de R$ 200 mil, dependendo da genética, premiações, provas zootécnicas e reputação do criador.",
    keywords: ["ticket médio", "touro nelore", "po", "preço"],
    category: "Leilões e Mercado"
  },
  {
    question: "Qual é o melhor criador de Mangalarga Marchador no Brasil?",
    answer: `O título de "melhor criador" pode variar conforme o critério: genética, premiações, vendas ou tradição. No entanto, alguns nomes se destacam:

🏇 **Haras Elfar (MG)**
✔️ Um dos mais premiados da história da raça
✔️ Campeões nacionais consecutivos
✔️ Referência em marcha batida

🏇 **Haras Cristal PVB (MG)**
✔️ Campeões recentes e genética moderna
✔️ Forte presença em leilões
✔️ Marcha batida valorizada

🏇 **Haras Yuri (MG)**
✔️ Um dos maiores vendedores de coberturas
✔️ Criador de Galante do Expoente, Vetor da Gabriela, entre outros

🏇 **Haras Morada Nova (SP/MG)**
✔️ Forte estrutura e tradição
✔️ Especializado em marcha picada

📊 **Dica Técnica:**
A ABCCMM publica rankings anuais dos criadores mais premiados — ótima fonte para acompanhar os destaques da raça.`,
    keywords: ["melhor criador", "mangalarga marchador", "haras"],
    category: "Leilões e Mercado"
  },
  {
    question: "Me fala tudo sobre o Haras Yuri",
    answer: `O Haras Yuri, de Minas Gerais, é um dos nomes mais relevantes no universo do Mangalarga Marchador, com foco em marcha batida de alto padrão, genética premiada e mercado nacional.

🏇 **HARAS YURI (MG)**
• Local: Minas Gerais
• Especialidade: Mangalarga Marchador – Marcha Batida
• Fundador: Yuri Fernandes

🧬 **GENÉTICA**
• Reprodutores campeões com alto valor de mercado
• Marcha com diagrama correto e andamento genuíno
• Uso intensivo de inseminação e TE

🐴 **GARANHÕES DE DESTAQUE**
• Galante do Expoente – Um dos mais vendidos do país
• Vetor da Gabriela – Reprodutor com filhos campeões
• Espartano do Yuri – Campeão nacional de genética valorizada

🏆 **PREMIAÇÕES**
• Destaque nas Exposições Nacionais da ABCCMM
• Campeões consagrados em MG, SP, RJ, BA
• Campeões dos campeões em marcha

📈 **MERCADO & LEILÕES**
• Coberturas entre R$3.000 e R$10.000
• Venda de sêmen, embriões e potros de elite
• Participação constante em leilões de destaque

🔎 **DIFERENCIAIS**
• Atendimento personalizado para criadores
• Equipe técnica qualificada
• Parcerias com centrais de coleta

🤝 **PÚBLICO-ALVO**
• Criadores iniciantes e profissionais
• Haras que buscam melhoramento genético
• Investidores em genética equina`,
    keywords: ["haras yuri", "mangalarga marchador"],
    category: "Leilões e Mercado"
  },
  {
    question: "Quem é Cláudia Junqueira?",
    answer: `Cláudia Irene Tosta Junqueira é uma das mulheres mais influentes do agro brasileiro. Referência em pecuária de elite, genética avançada e inovação no campo.

🌱 **Perfil Geral**
• Produtora rural em Ituverava (SP)
• Atuação em pecuária de corte e embriões de alto valor genético
• Primeira mulher a implementar rastreabilidade bovina no estado de SP

💬 **Destaque Feminino**
• Símbolo de representatividade no agro
• Liderança com ética, gestão e visão estratégica

👉 Sua trajetória inspira milhares de produtores que desejam profissionalizar sua operação.`,
    keywords: ["cláudia junqueira", "produtora rural"],
    category: "Leilões e Mercado"
  },
  {
    question: "Me fala tudo sobre a Cláudia Junqueira",
    answer: `Cláudia Junqueira é um exemplo nacional de liderança no agro — com forte atuação em pecuária de corte, genética e sustentabilidade.

🎯 **Perfil & Atuação**
• Local: Ituverava (SP)
• Foco: Genética de elite, precocidade, produtividade
• Pioneira na rastreabilidade bovina

👩‍🌾 **Gestão Moderna**
• Bem-estar animal e processos auditáveis
• Prenhezes e embriões de alto valor
• Gestão sustentável da propriedade

💬 **Representatividade**
• Enfrentou desafios históricos com inteligência
• Referência em protagonismo feminino no campo

🏆 **Reconhecimento**
• Participações em leilões e eventos de elite
• Destaque na imprensa e em projetos do setor`,
    keywords: ["cláudia junqueira", "agro", "liderança"],
    category: "Leilões e Mercado"
  },
  {
    question: "Quem é Eduardo Costa?",
    answer: `🎤 Eduardo Costa é cantor sertanejo, empresário e figura ativa no agronegócio:

• Proprietário da Fazenda Talismã e Fazenda Santa Helena
• Promove o tradicional Leilão Talismã com cavalos e gado de elite
• Atua com genética de ponta em parceria com haras e criadores renomados
• Lançou produtos como Cachaça Talismã Premium, entre outros voltados ao agro

👉 Forte presença nos bastidores e nos palcos do agronegócio brasileiro.`,
    keywords: ["eduardo costa", "cantor", "agronegócio", "fazenda talismã"],
    category: "Leilões e Mercado"
  },
  {
    question: "Quem é Dr. Bernardo Guimarães?",
    answer: `🧠 Dr. Bernardo Guimarães é médico e pecuarista, atuando de forma inovadora em dois universos: saúde e agronegócio.

🩺 **Na Medicina:**
• Especialista em nutrologia, endocrinologia e medicina integrativa
• Fundador do Instituto Dr. Bernardo Guimarães com unidades no Brasil, EUA, Paraguai e Oriente Médio
• Reconhecido como "médico dos artistas"

🐂 **No Agronegócio:**
• Fundador da DRBG Agropecuária
• Atua com genética Nelore de alto desempenho
• Destaque em eventos como ExpoZebu
• Traz conceitos de ciência e performance para a pecuária

👉 Dr. Bernardo é um dos nomes que unem medicina de ponta e pecuária de elite no Brasil.`,
    keywords: ["dr. bernardo guimarães", "médico", "pecuarista"],
    category: "Leilões e Mercado"
  },
  {
    question: "Que documentos preciso ao comprar um gado?",
    answer: "GTA (Guia de Trânsito Animal), nota fiscal, registro genealógico (se aplicável), exames sanitários atualizados e contrato de compra/venda.",
    keywords: ["documentos", "comprar gado", "gta"],
    category: "Logística e Documentação"
  },
  {
    question: "Como funciona o transporte de sêmen?",
    answer: "É feito em botijão de nitrogênio, garantindo temperatura adequada. O transporte deve ser feito por empresas especializadas e com registro sanitário.",
    keywords: ["transporte", "sêmen", "nitrogênio"],
    category: "Logística e Documentação"
  },
  {
    question: "Quais são os principais documentos exigidos para transporte de animais no Brasil?",
    answer: "Os principais documentos são a GTA (Guia de Trânsito Animal), nota fiscal, atestado de sanidade e, em alguns casos, exames específicos como brucelose e tuberculose.",
    keywords: ["documentos", "transporte", "animais", "brasil"],
    category: "Logística e Documentação"
  },
  {
    question: "Quais são os tipos de pelagem mais comuns em cavalos?",
    answer: "Castanho, baio, preto, alazão, tordilho e pangaré são as principais pelagens, com variações de acordo com a raça.",
    keywords: ["pelagem", "cavalos", "tipos"],
    category: "Cultura e Práticas"
  },
  {
    question: "Qual a diferença entre marcha batida e picada?",
    answer: "A marcha batida tem movimentos mais simétricos e contínuos, ideal para cavalgadas longas. A picada tem mais ação dos posteriores, com menor impacto.",
    keywords: ["marcha batida", "marcha picada", "diferença"],
    category: "Cultura e Práticas"
  },
  {
    question: "Por que a pelagem é importante na escolha de cavalos?",
    answer: "Além da estética, a pelagem pode indicar padrões genéticos e ser um critério de preferência em algumas raças. Em exposições e leilões, a pelagem também influencia no valor do animal.",
    keywords: ["pelagem", "importante", "cavalos"],
    category: "Cultura e Práticas"
  },
  {
    question: "Como calcular a idade de um cavalo?",
    answer: "A idade de um cavalo pode ser verificada pela data de nascimento no registro genealógico ou estimada pela análise dos dentes, especialmente incisivos, que mudam com o tempo.",
    keywords: ["idade", "cavalo", "calcular", "dentes"],
    category: "Cultura e Práticas"
  }
];

/**
 * Função para encontrar a melhor resposta para uma pergunta
 */
export function findBestAnswer(userQuestion: string): { answer: string; confidence: number } | null {
  const normalizedQuestion = userQuestion.toLowerCase().trim();

  // Busca exata
  for (const qa of agroiaKnowledge) {
    const normalizedQA = qa.question.toLowerCase();
    if (normalizedQA === normalizedQuestion) {
      return { answer: qa.answer, confidence: 1.0 };
    }
  }

  // Busca por similaridade e palavras-chave
  let bestMatch: { qa: QA; score: number } | null = null;

  for (const qa of agroiaKnowledge) {
    let score = 0;

    // Verifica se a pergunta contém palavras da pergunta original
    const qaWords = qa.question.toLowerCase().split(/\s+/);
    const userWords = normalizedQuestion.split(/\s+/);

    for (const word of userWords) {
      if (word.length > 3) { // Ignora palavras muito curtas
        for (const qaWord of qaWords) {
          if (qaWord.includes(word) || word.includes(qaWord)) {
            score += 0.3;
          }
        }
      }
    }

    // Verifica keywords
    if (qa.keywords) {
      for (const keyword of qa.keywords) {
        if (normalizedQuestion.includes(keyword.toLowerCase())) {
          score += 0.5;
        }
      }
    }

    if (score > 0 && (!bestMatch || score > bestMatch.score)) {
      bestMatch = { qa, score };
    }
  }

  // Retorna se a confiança for razoável (>= 0.5)
  if (bestMatch && bestMatch.score >= 0.5) {
    return {
      answer: bestMatch.qa.answer,
      confidence: Math.min(bestMatch.score / 2, 0.95) // Normaliza a confiança
    };
  }

  return null;
}

/**
 * Gera uma resposta padrão quando não há match
 */
export function getDefaultResponse(): string {
  return "Desculpe, não tenho essa informação específica no momento. Posso te ajudar com dúvidas sobre:\n\n" +
    "• Animais e Genética (PO, raças, genealogia, DEPs)\n" +
    "• Sêmen e Reprodução (qualidade, armazenamento)\n" +
    "• Leilões e Mercado (como funciona, criadores)\n" +
    "• Logística e Documentação (GTA, transporte)\n" +
    "• Cultura e Práticas (pelagens, marchas)\n\n" +
    "Por favor, reformule sua pergunta ou escolha uma das perguntas rápidas disponíveis!";
}
