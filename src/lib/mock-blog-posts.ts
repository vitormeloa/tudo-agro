// Posts simulados para desenvolvimento
export interface MockBlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featured_image: string | null
  theme_id: string
  theme_name: string
  theme_slug: string
  theme_color: string
  author_id: string
  author_name: string
  author_email: string
  views: number
  likes: number
  published: boolean
  published_at: string
  created_at: string
}

export const mockBlogPosts: MockBlogPost[] = [
  {
    id: '1',
    title: 'De Médico a Pecuarista: Para o Dr. Bernardo, a Receita é a Genética de Alta Performance',
    slug: 'de-medico-a-pecuarista-dr-bernardo-genetica-alta-performance',
    excerpt: 'Conheça a trajetória inspiradora do Dr. Bernardo, que trocou o consultório pela fazenda e encontrou sucesso na pecuária através do investimento em genética de ponta.',
    content: `
      <h2>Uma Mudança de Vida</h2>
      <p>O Dr. Bernardo sempre teve uma paixão pelo campo, mas foi apenas após anos de atuação na medicina que decidiu realizar seu sonho de infância: ter uma fazenda e trabalhar com pecuária de corte. Hoje, ele é referência em genética bovina de alta performance na região.</p>
      
      <h2>A Decisão de Mudar</h2>
      <p>A transição não foi fácil. Deixar uma carreira médica consolidada para investir em uma atividade completamente diferente exigiu coragem e muito planejamento. Mas o Dr. Bernardo tinha uma visão clara: queria criar gado de qualidade superior, com foco em genética de ponta.</p>
      
      <h2>Investimento em Genética</h2>
      <p>Desde o início, o médico-pecuarista entendeu que o segredo do sucesso na pecuária moderna está na genética. Ele investiu pesado em:</p>
      <ul>
        <li><strong>Reprodutores de Elite:</strong> Aquisição de touros com pedigree comprovado e índices zootécnicos superiores</li>
        <li><strong>Inseminação Artificial:</strong> Uso de sêmen de animais campeões em exposições e provas zootécnicas</li>
        <li><strong>Seleção Rigorosa:</strong> Controle genético rigoroso de toda a matriz, descartando animais que não atendem aos padrões</li>
        <li><strong>Tecnologia:</strong> Utilização de ferramentas genômicas para seleção precoce de animais superiores</li>
      </ul>
      
      <h2>Resultados Impressionantes</h2>
      <p>Com menos de 5 anos de atividade pecuária, o Dr. Bernardo já coleciona resultados expressivos:</p>
      <ul>
        <li>Taxa de desmame superior a 90%</li>
        <li>Ganho de peso diário médio acima de 1,2 kg</li>
        <li>Animais prontos para abate em tempo reduzido</li>
        <li>Melhoria contínua da qualidade da carcaça</li>
        <li>Reconhecimento em exposições agropecuárias</li>
      </ul>
      
      <h2>A Receita do Sucesso</h2>
      <p>Segundo o Dr. Bernardo, o sucesso na pecuária moderna depende de três pilares fundamentais:</p>
      <ol>
        <li><strong>Genética de Alta Performance:</strong> Não há como ter animais de qualidade sem investir em genética superior</li>
        <li><strong>Nutrição Adequada:</strong> Animais de alto potencial genético precisam de nutrição balanceada para expressar todo seu potencial</li>
        <li><strong>Manejo Técnico:</strong> Conhecimento técnico e gestão profissional são essenciais para maximizar os resultados</li>
      </ol>
      
      <h2>Inspiração para Novos Pecuaristas</h2>
      <p>A história do Dr. Bernardo mostra que é possível começar na pecuária mesmo vindo de outras áreas profissionais. O importante é ter paixão pelo negócio, buscar conhecimento técnico e estar disposto a investir em tecnologia e genética de qualidade.</p>
      
      <h2>Futuro da Propriedade</h2>
      <p>Com os resultados obtidos, o Dr. Bernardo planeja expandir o rebanho e continuar investindo em genética. Ele também pretende abrir as portas da fazenda para visitas técnicas, compartilhando conhecimento com outros pecuaristas interessados em seguir o mesmo caminho.</p>
    `,
    featured_image: '/fotos/blog/dr-bernardo.webp',
    theme_id: '2',
    theme_name: 'Pecuária',
    theme_slug: 'pecuaria',
    theme_color: '#059669',
    author_id: 'author-1',
    author_name: 'João Silva',
    author_email: 'joao@tudoagro.com',
    views: 3421,
    likes: 287,
    published: true,
    published_at: '2024-01-15T10:00:00Z',
    created_at: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'Fazenda de Eduardo Costa: Um Paraíso no Campo com Estrutura de Primeiro Mundo',
    slug: 'fazenda-eduardo-costa-paraiso-campo-estrutura',
    excerpt: 'Conheça os detalhes da impressionante fazenda do cantor Eduardo Costa, que combina produção agropecuária de alta qualidade com conforto e luxo.',
    content: `
      <h2>Um Empreendimento de Elite</h2>
      <p>A fazenda de Eduardo Costa é muito mais que uma propriedade rural comum. É um verdadeiro empreendimento de alto padrão que combina produção agropecuária de excelência com infraestrutura de primeiro mundo.</p>
      
      <h2>Estrutura Impecável</h2>
      <p>A propriedade impressiona pela infraestrutura completa e moderna:</p>
      <ul>
        <li><strong>Instalações Modernas:</strong> Currais e piquetes com tecnologia de ponta para manejo do gado</li>
        <li><strong>Áreas de Lazer:</strong> Espaços de convivência e entretenimento para família e visitas</li>
        <li><strong>Infraestrutura Residencial:</strong> Casas e chalés equipados com todo conforto</li>
        <li><strong>Áreas Verdes:</strong> Paisagismo cuidadoso que integra natureza e funcionalidade</li>
      </ul>
      
      <h2>Produção de Alta Qualidade</h2>
      <p>Além da estrutura física impressionante, a fazenda se destaca pela produção:</p>
      <ul>
        <li>Gado de corte de raças nobres com genética selecionada</li>
        <li>Cavalos de raça com linhagens reconhecidas</li>
        <li>Manejo técnico profissional com acompanhamento veterinário constante</li>
        <li>Pastagens de alta qualidade com rotação e manejo adequado</li>
      </ul>
      
      <h2>Investimento em Tecnologia</h2>
      <p>Eduardo Costa não mede esforços para manter a propriedade na vanguarda tecnológica:</p>
      <ul>
        <li>Sistemas de irrigação automatizados</li>
        <li>Monitoramento de rebanho por tecnologia digital</li>
        <li>Gestão informatizada de toda a propriedade</li>
        <li>Equipamentos modernos para manejo e produção</li>
      </ul>
      
      <h2>Preservação Ambiental</h2>
      <p>A fazenda também se destaca pelo compromisso ambiental, mantendo áreas de preservação, reflorestamento e práticas sustentáveis que garantem a harmonia entre produção e conservação.</p>
      
      <h2>Reconhecimento no Setor</h2>
      <p>A propriedade já recebeu diversos prêmios e reconhecimentos pela qualidade da produção e pelo manejo exemplar. Serve como referência para outros pecuaristas interessados em unir produção de qualidade com investimento em infraestrutura.</p>
      
      <h2>Visibilidade e Inspiração</h2>
      <p>Através das redes sociais e eventos na propriedade, Eduardo Costa tem ajudado a popularizar a pecuária de qualidade, mostrando que é possível ter uma fazenda moderna, produtiva e ao mesmo tempo um ambiente agradável para viver e receber.</p>
    `,
    featured_image: '/fotos/blog/educavalo.webp',
    theme_id: '2',
    theme_name: 'Pecuária',
    theme_slug: 'pecuaria',
    theme_color: '#059669',
    author_id: 'author-2',
    author_name: 'Maria Santos',
    author_email: 'maria@tudoagro.com',
    views: 5821,
    likes: 456,
    published: true,
    published_at: '2024-01-20T14:30:00Z',
    created_at: '2024-01-20T14:30:00Z',
  },
  {
    id: '3',
    title: 'Nelore DRBG Brilha em Leilão ao Lado de Grandes Criatórios com Faturamento de R$ 15 Milhões',
    slug: 'nelore-drbg-brilha-leilao-grandes-criatorios-r-15-milhoes',
    excerpt: 'O criatório DRBG se destacou em leilão de prestígio, competindo de igual para igual com grandes nomes da pecuária nacional e alcançando faturamento milionário.',
    content: `
      <h2>Um Marco na Pecuária Nacional</h2>
      <p>O criatório DRBG (Davi Roberto Bernardo Gomes) conquistou um feito histórico ao participar de um dos maiores leilões de gado Nelore do país, alcançando faturamento de R$ 15 milhões e competindo lado a lado com os maiores criatórios do Brasil.</p>
      
      <h2>O Evento</h2>
      <p>O leilão reuniu os melhores exemplares da raça Nelore do país, com animais de diversas procedências competindo pelo reconhecimento de criadores e investidores. Para o DRBG, participar ao lado de nomes consagrados da pecuária nacional já era uma vitória, mas os resultados superaram todas as expectativas.</p>
      
      <h2>Animais de Destaque</h2>
      <p>O criatório apresentou uma seleção impecável de animais:</p>
      <ul>
        <li><strong>Touros Reprodutores:</strong> Exemplares com índices zootécnicos excepcionais e pedigree comprovado</li>
        <li><strong>Matrizes Selecionadas:</strong> Fêmeas de alta performance reprodutiva e produtiva</li>
        <li><strong>Tourinhos:</strong> Jovens animais com grande potencial genético</li>
        <li><strong>Embriões:</strong> Produtos de genética superior para multiplicação</li>
      </ul>
      
      <h2>Faturamento Expressivo</h2>
      <p>O faturamento de R$ 15 milhões comprova a qualidade dos animais do DRBG e mostra que criatórios bem estruturados, mesmo não sendo tradicionalmente os mais conhecidos, podem competir no mais alto nível da pecuária nacional.</p>
      
      <h2>Fatores de Sucesso</h2>
      <p>O sucesso do DRBG neste leilão se deve a vários fatores:</p>
      <ul>
        <li><strong>Investimento em Genética:</strong> Seleção rigorosa e investimento contínuo em melhoramento genético</li>
        <li><strong>Manejo Técnico:</strong> Acompanhamento profissional de todo o rebanho com zootecnistas e veterinários</li>
        <li><strong>Nutrição Especializada:</strong> Alimentação balanceada que permite expressão máxima do potencial genético</li>
        <li><strong>Gestão Profissional:</strong> Administração da propriedade com visão empresarial</li>
        <li><strong>Marketing Estratégico:</strong> Apresentação adequada dos animais e construção de marca</li>
      </ul>
      
      <h2>Reconhecimento do Mercado</h2>
      <p>O resultado do leilão trouxe reconhecimento imediato ao criatório DRBG, consolidando sua posição entre os principais produtores de Nelore do país. Compradores de várias regiões do Brasil demonstraram interesse e confiança na genética oferecida.</p>
      
      <h2>Impacto no Setor</h2>
      <p>Este resultado inspira outros criadores médios e pequenos, mostrando que com dedicação, investimento em genética e gestão profissional, é possível competir com os grandes nomes da pecuária nacional.</p>
      
      <h2>Perspectivas Futuras</h2>
      <p>Com o sucesso alcançado, o DRBG planeja expandir suas operações e continuar investindo em melhoramento genético. O criatório já está se preparando para os próximos eventos e leilões, sempre com foco em qualidade e excelência.</p>
    `,
    featured_image: '/fotos/blog/nelore.webp',
    theme_id: '7',
    theme_name: 'Eventos',
    theme_slug: 'eventos',
    theme_color: '#8b5cf6',
    author_id: 'author-3',
    author_name: 'Carlos Oliveira',
    author_email: 'carlos@tudoagro.com',
    views: 4237,
    likes: 312,
    published: true,
    published_at: '2024-01-25T09:15:00Z',
    created_at: '2024-01-25T09:15:00Z',
  },
  {
    id: '4',
    title: 'Eduardo Costa Lança DVD com Produção Inédita e Celebra o Agro Brasileiro em Grande Estilo',
    slug: 'eduardo-costa-lanca-dvd-producao-inedita-agro-brasileiro',
    excerpt: 'O novo DVD de Eduardo Costa já está disponível no YouTube, unindo música sertaneja raiz, produção cinematográfica impecável e uma homenagem especial ao agronegócio brasileiro.',
    content: `
      <h2>Um Lançamento Marcante</h2>
      <p>Já está no ar o novo DVD de Eduardo Costa – e você pode assistir agora no YouTube! Com sua voz marcante e presença de palco inconfundível, o cantor emocionou o público com um espetáculo que une música, raiz sertaneja e uma produção cinematográfica impecável.</p>
      
      <h2>📺 Assistir ao DVD Completo</h2>
      <p>O novo projeto de Eduardo Costa está disponível gratuitamente no YouTube. Com toda dedicação para valorizar a cultura sertaneja e os apaixonados pelo campo, o DVD traz faixas inéditas, grandes sucessos e momentos de pura emoção.</p>
      <p><strong><a href="https://www.youtube.com/watch?v=epxqKtutFFY" target="_blank" rel="noopener noreferrer">👉 Clique aqui para assistir ao DVD completo no YouTube</a></strong></p>
      
      <h2>🌾 Uma Homenagem ao Brasil Rural</h2>
      <p>Com raízes firmes no interior de Minas Gerais, Eduardo sempre fez questão de manter sua ligação com o campo — e nesse novo DVD isso fica ainda mais evidente. O cenário remete às origens do cantor e à força do homem do campo, com elementos que celebram o agro em sua essência.</p>
      <p>A estética, os arranjos e até os figurinos reforçam esse elo com o agronegócio, mostrando que a música sertaneja continua sendo a trilha sonora da vida no interior brasileiro.</p>
      
      <h2>🎶 O Que Esperar do DVD?</h2>
      <p>O novo projeto de Eduardo Costa oferece uma experiência completa:</p>
      <ul>
        <li><strong>Clássicos Consagrados:</strong> Grandes sucessos que marcaram gerações e continuam emocionando</li>
        <li><strong>Músicas Inéditas:</strong> Novas composições cheias de sentimento e autenticidade</li>
        <li><strong>Participações Especiais:</strong> Momentos únicos com convidados especiais</li>
        <li><strong>Cenário Temático:</strong> Um ambiente que valoriza a cultura do campo e as raízes sertanejas</li>
        <li><strong>Produção Cinematográfica:</strong> Qualidade visual que eleva a experiência artística</li>
        <li><strong>O Talento Único:</strong> A voz e presença inconfundível de Eduardo Costa</li>
      </ul>
      
      <h2>🚀 Disponível Gratuitamente</h2>
      <p>Nada de esperar: o DVD já está disponível gratuitamente no canal oficial do artista no YouTube. Prepare seu som, reúna a família, e sinta a força da música sertaneja raiz com a nova produção de Eduardo Costa.</p>
      <p>Esta é uma oportunidade única de celebrar a música sertaneja de qualidade e reconhecer a importância do agronegócio brasileiro através da arte e da cultura.</p>
      
      <h2>Um Momento Especial para o Agro</h2>
      <p>Mais do que um simples lançamento musical, este DVD representa uma celebração do agronegócio brasileiro, mostrando a força, a tradição e a modernidade do campo através da música. Eduardo Costa une sua paixão pela música sertaneja com seu amor pelo campo, criando uma obra que emociona e inspira.</p>
    `,
    featured_image: '/fotos/blog/eduardo-costa-dvd.webp',
    theme_id: '7',
    theme_name: 'Eventos',
    theme_slug: 'eventos',
    theme_color: '#8b5cf6',
    author_id: 'author-1',
    author_name: 'João Silva',
    author_email: 'joao@tudoagro.com',
    views: 8924,
    likes: 687,
    published: true,
    published_at: '2024-02-01T11:00:00Z',
    created_at: '2024-02-01T11:00:00Z',
  },
  {
    id: '5',
    title: 'Eduardo Costa Apresenta sua Fazenda: Tour Exclusivo em Vídeo',
    slug: 'eduardo-costa-apresenta-fazenda-tour-video',
    excerpt: 'Assista ao tour exclusivo da fazenda de Eduardo Costa e conheça de perto toda a estrutura e produção desta propriedade de classe mundial.',
    content: `
      <h2>Um Tour em Vídeo</h2>
      <p>Eduardo Costa abriu as portas de sua fazenda para um tour exclusivo em vídeo, mostrando todos os detalhes desta impressionante propriedade. O vídeo permite uma experiência imersiva, levando os espectadores por todos os cantos da fazenda.</p>
      
      <h2>Primeiras Impressões</h2>
      <p>Logo na entrada, já é possível perceber a grandiosidade e o cuidado com que a propriedade foi planejada. A estrada de acesso, a porteira e a primeira visão da fazenda mostram que este é um empreendimento de alto padrão.</p>
      
      <h2>Recepção e Infraestrutura</h2>
      <p>O tour começa pela área de recepção e escritórios, mostrando que esta é uma propriedade profissionalmente administrada, com estrutura adequada para gestão moderna de uma fazenda de grande porte.</p>
      
      <h2>Instalações para Animais</h2>
      <p>O vídeo mostra em detalhes:</p>
      <ul>
        <li><strong>Currais e Manejo:</strong> Estruturas modernas para manejo seguro e eficiente do gado</li>
        <li><strong>Áreas de Pastagem:</strong> Pastos bem cuidados e divididos estrategicamente</li>
        <li><strong>Bebedouros e Cocheiras:</strong> Infraestrutura de alimentação e hidratação em pontos estratégicos</li>
        <li><strong>Haras:</strong> Instalações especiais para os cavalos, mostrando o cuidado com cada detalhe</li>
      </ul>
      
      <h2>O Rebanho</h2>
      <p>Durante o tour, é possível ver o rebanho de perto, observando a qualidade dos animais, a condição corporal e o bem-estar evidente. Os animais demonstram tranquilidade e boa condição física, indicadores de manejo adequado.</p>
      
      <h2>Áreas de Lazer</h2>
      <p>O vídeo também mostra as áreas de lazer e convivência, sempre integradas harmoniosamente com a produção. Espaços que permitem desfrutar da vida no campo sem interferir nas operações da fazenda.</p>
      
      <h2>Detalhes Técnicos</h2>
      <p>Eduardo Costa compartilha informações técnicas sobre:</p>
      <ul>
        <li>Raças criadas e critérios de seleção</li>
        <li>Sistemas de manejo utilizados</li>
        <li>Investimentos em genética</li>
        <li>Rotina de trabalho na propriedade</li>
        <li>Projetos futuros</li>
      </ul>
      
      <h2>O Dia a Dia</h2>
      <p>O vídeo captura momentos do dia a dia na fazenda, mostrando a rotina de trabalho, o cuidado com os animais e a dedicação da equipe. É possível perceber a paixão e o profissionalismo que envolvem toda a operação.</p>
      
      <h2>Compromisso com Qualidade</h2>
      <p>Cada detalhe mostrado no vídeo reflete o compromisso com qualidade e excelência. Desde a estrutura física até o cuidado com os animais, tudo demonstra investimento e dedicação.</p>
      
      <h2>Inspiração para o Setor</h2>
      <p>Este tour em vídeo serve como inspiração para outros pecuaristas, mostrando o que é possível alcançar com investimento adequado, gestão profissional e paixão pelo negócio rural.</p>
      
      <h2>Recepção do Público</h2>
      <p>O vídeo teve grande repercussão, recebendo elogios de criadores, técnicos e admiradores da pecuária. Muitos destacaram o nível de profissionalismo e a qualidade da propriedade mostrada.</p>
    `,
    featured_image: '/fotos/blog/edufazenda.webp',
    theme_id: '2',
    theme_name: 'Pecuária',
    theme_slug: 'pecuaria',
    theme_color: '#059669',
    author_id: 'author-2',
    author_name: 'Maria Santos',
    author_email: 'maria@tudoagro.com',
    views: 9234,
    likes: 678,
    published: true,
    published_at: '2024-02-05T16:45:00Z',
    created_at: '2024-02-05T16:45:00Z',
  },
  {
    id: '6',
    title: 'Fazenda de Eduardo Costa: Cavalos de Raça Milionária, Cachoeira Artificial e Mais Luxos',
    slug: 'fazenda-eduardo-costa-cavalos-milionarios-cachoeira-artificial',
    excerpt: 'Descubra os detalhes de luxo da fazenda de Eduardo Costa, incluindo cavalos de raça que valem milhões, cachoeira artificial e outras surpresas desta propriedade única.',
    content: `
      <h2>Um Mundo de Luxo no Campo</h2>
      <p>A fazenda de Eduardo Costa transcende o conceito tradicional de propriedade rural, incorporando elementos de luxo e sofisticação que impressionam até os mais experientes do setor agropecuário.</p>
      
      <h2>Cavalos de Raça Milionária</h2>
      <p>Um dos destaques da propriedade é o haras com cavalos de raça de valor excepcional:</p>
      <ul>
        <li><strong>Linhagens Exclusivas:</strong> Animais com pedigree internacionalmente reconhecido</li>
        <li><strong>Investimento em Genética:</strong> Cavalos resultado de cruzamentos estratégicos com os melhores exemplares</li>
        <li><strong>Valor de Mercado:</strong> Alguns animais chegam a valer milhões de reais</li>
        <li><strong>Reconhecimento:</strong> Prêmios e títulos em competições nacionais e internacionais</li>
        <li><strong>Cuidados Especiais:</strong> Manejo, nutrição e treinamento de primeira linha</li>
      </ul>
      
      <h2>Cachoeira Artificial</h2>
      <p>Uma das atrações mais impressionantes da fazenda é uma cachoeira artificial, que além de ser um elemento paisagístico único, também serve para:</p>
      <ul>
        <li>Criar um ambiente relaxante e agradável</li>
        <li>Integrar áreas de lazer com a natureza</li>
        <li>Servir como ponto focal do paisagismo</li>
        <li>Oferecer som ambiente natural</li>
      </ul>
      
      <h2>Infraestrutura de Primeiro Mundo</h2>
      <p>A propriedade conta com diversos elementos que elevam o padrão:</p>
      <ul>
        <li><strong>Arquitetura Diferenciada:</strong> Construções que harmonizam luxo e funcionalidade</li>
        <li><strong>Paisagismo Elaborado:</strong> Jardins e áreas verdes cuidadosamente planejados</li>
        <li><strong>Decoração Sofisticada:</strong> Interiores que combinam conforto e estilo</li>
        <li><strong>Equipamentos Premium:</strong> Máquinas e implementos de última geração</li>
        <li><strong>Tecnologia Avançada:</strong> Sistemas automatizados e monitoramento digital</li>
      </ul>
      
      <h2>Áreas de Entretenimento</h2>
      <p>A fazenda oferece diversos espaços para entretenimento e convivência:</p>
      <ul>
        <li>Áreas gourmet para recepções</li>
        <li>Espaços para eventos e festas</li>
        <li>Áreas de descanso e lazer</li>
        <li>Piscinas e áreas aquáticas</li>
        <li>Espaços esportivos</li>
      </ul>
      
      <h2>Produção de Alta Qualidade</h2>
      <p>Por trás de todo o luxo, há uma operação séria e profissional:</p>
      <ul>
        <li>Gado de corte de raças nobres</li>
        <li>Seleção genética rigorosa</li>
        <li>Manejo técnico profissional</li>
        <li>Gestão empresarial</li>
        <li>Investimento contínuo em tecnologia</li>
      </ul>
      
      <h2>Reconhecimento e Visibilidade</h2>
      <p>A fazenda ganhou notoriedade não apenas pela produção, mas também pela estrutura única que combina funcionalidade produtiva com elementos de luxo e sofisticação, servindo como referência e inspiração no setor.</p>
      
      <h2>Impacto no Setor</h2>
      <p>Esta propriedade mostra uma nova perspectiva da pecuária moderna, onde é possível unir produção de qualidade com investimento em infraestrutura e conforto, elevando o padrão do agronegócio brasileiro.</p>
      
      <h2>Futuro da Propriedade</h2>
      <p>Com toda essa estrutura e investimento, a fazenda continua evoluindo, sempre buscando excelência tanto na produção quanto na experiência de quem vive e visita o local.</p>
    `,
    featured_image: '/fotos/blog/eduardo-costa-1.webp',
    theme_id: '2',
    theme_name: 'Pecuária',
    theme_slug: 'pecuaria',
    theme_color: '#059669',
    author_id: 'author-3',
    author_name: 'Carlos Oliveira',
    author_email: 'carlos@tudoagro.com',
    views: 11234,
    likes: 891,
    published: true,
    published_at: '2024-02-10T08:00:00Z',
    created_at: '2024-02-10T08:00:00Z',
  },
]

export const mockThemes = [
  { id: '1', name: 'Agricultura', slug: 'agricultura', color: '#10b981' },
  { id: '2', name: 'Pecuária', slug: 'pecuaria', color: '#059669' },
  { id: '3', name: 'Tecnologia', slug: 'tecnologia', color: '#0d9488' },
  { id: '4', name: 'Mercado', slug: 'mercado', color: '#f59e0b' },
  { id: '5', name: 'Sustentabilidade', slug: 'sustentabilidade', color: '#22c55e' },
  { id: '6', name: 'Política Agrícola', slug: 'politica-agricola', color: '#3b82f6' },
  { id: '7', name: 'Eventos', slug: 'eventos', color: '#8b5cf6' },
  { id: '8', name: 'Dicas', slug: 'dicas', color: '#ec4899' },
]
