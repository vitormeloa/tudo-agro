# Implementação do Blog TudoAgro

## Visão Geral

Sistema completo de blog para notícias do agronegócio, com funcionalidades de filtros por tema, salvamento de posts (estilo Instagram) e visualização completa de posts.

## Estrutura do Banco de Dados

### Tabelas Criadas

1. **blog_themes** - Temas/categorias dos posts
   - id (UUID)
   - name (VARCHAR) - Nome do tema
   - slug (VARCHAR) - Slug único
   - description (TEXT)
   - color (VARCHAR) - Cor do tema em hex

2. **blog_posts** - Posts do blog
   - id (UUID)
   - title (VARCHAR) - Título do post
   - slug (VARCHAR) - Slug único para URL
   - excerpt (TEXT) - Resumo do post
   - content (TEXT) - Conteúdo completo (HTML)
   - featured_image (TEXT) - URL da imagem destacada
   - theme_id (UUID) - Referência ao tema
   - author_id (UUID) - Referência ao autor (users)
   - views (INTEGER) - Contador de visualizações
   - likes (INTEGER) - Quantidade de curtidas
   - published (BOOLEAN) - Status de publicação
   - published_at (TIMESTAMP) - Data de publicação

3. **saved_posts** - Posts salvos pelos usuários
   - id (UUID)
   - user_id (UUID) - Usuário que salvou
   - post_id (UUID) - Post salvo
   - created_at (TIMESTAMP)

### Como Configurar o Banco de Dados

Execute o script SQL em seu Supabase:

```bash
# O arquivo está em: scripts/blog-schema.sql
```

Execute este script no SQL Editor do Supabase para criar todas as tabelas, índices, triggers e políticas RLS.

## Rotas da API

### Posts

- `GET /api/blog/posts` - Lista posts publicados
  - Query params: `theme`, `limit`, `offset`
  
- `GET /api/blog/posts/[id]` - Busca post por ID

- `GET /api/blog/posts/slug/[slug]` - Busca post por slug

- `POST /api/blog/posts` - Cria novo post (requer autenticação)

### Temas

- `GET /api/blog/themes` - Lista todos os temas

### Posts Salvos

- `GET /api/blog/saved` - Lista posts salvos do usuário autenticado

- `POST /api/blog/saved` - Salva um post
  - Body: `{ post_id: string }`

- `DELETE /api/blog/saved?post_id=xxx` - Remove post dos salvos

## Componentes

### PostCard (`src/components/blog/PostCard.tsx`)

Card de post que exibe:
- Imagem destacada (ou placeholder)
- Badge do tema
- Título
- Resumo (excerpt)
- Data de publicação
- Views (formatado: 1k, 1.5k, etc)
- Likes
- Botão de salvar (ícone de bookmark)

### ThemeFilter (`src/components/blog/ThemeFilter.tsx`)

Filtros de tema com:
- Botão "Todos"
- Botões para cada tema disponível
- Destaque visual do tema selecionado
- Responsivo para mobile

## Páginas

### `/blog` - Página Principal

- Lista todos os posts publicados
- Filtros por tema
- Grid responsivo (1 coluna mobile, 2 tablet, 3 desktop)
- Estado de loading
- Mensagem quando não há posts

### `/blog/[slug]` - Detalhes do Post

- Visualização completa do post
- Informações do autor
- Data, views e likes
- Botões de salvar e compartilhar
- Conteúdo HTML formatado
- Botão de voltar para o blog

## Funcionalidades

### 1. Filtros por Tema

Os usuários podem filtrar posts por tema clicando nos botões de filtro. O estado é mantido na URL para compartilhamento.

### 2. Salvar Posts

- Usuários autenticados podem salvar posts
- Ícone de bookmark muda de estado quando salvo
- Posts salvos ficam destacados visualmente
- Funciona tanto no card quanto na página de detalhes

### 3. Visualizações

- Contador de views incrementa automaticamente ao visualizar um post
- Formatação inteligente (1k, 1.5k, etc)

### 4. Responsividade

- Mobile-first design
- Grid adaptativo (1/2/3 colunas)
- Imagens responsivas
- Filtros com scroll horizontal em mobile
- Tipografia escalável

## Integração no Header

O link "Blog" foi adicionado no header entre "Produtos" e "Sobre" conforme solicitado.

## Temas Padrão

Os seguintes temas são criados automaticamente:

1. Agricultura (#10b981)
2. Pecuária (#059669)
3. Tecnologia (#0d9488)
4. Mercado (#f59e0b)
5. Sustentabilidade (#22c55e)
6. Política Agrícola (#3b82f6)
7. Eventos (#8b5cf6)
8. Dicas (#ec4899)

## Segurança (RLS)

- Qualquer um pode visualizar posts publicados
- Apenas autores podem criar/editar seus próprios posts
- Apenas admins podem gerenciar temas
- Usuários só podem salvar/remover seus próprios posts salvos

## Próximos Passos

1. **Criar posts de exemplo** - Use a API POST para criar posts de teste
2. **Painel admin** - Criar interface para administradores gerenciarem posts
3. **Sistema de likes** - Adicionar funcionalidade de curtir posts
4. **Comentários** - Sistema de comentários nos posts
5. **Busca** - Adicionar busca por texto nos posts
6. **Paginação** - Implementar paginação infinita ou numérica

## Exemplo de Criação de Post

```typescript
const response = await fetch('/api/blog/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'Título do Post',
    slug: 'titulo-do-post',
    excerpt: 'Resumo curto do post',
    content: '<p>Conteúdo HTML do post</p>',
    featured_image: 'https://exemplo.com/imagem.jpg',
    theme_id: 'uuid-do-tema',
    likes: 10, // Número inicial de likes
    published: true
  })
})
```

## Estilos CSS

Estilos customizados para o conteúdo do blog foram adicionados em `globals.css`:
- Tipografia responsiva
- Links estilizados
- Imagens com bordas arredondadas
- Blockquotes destacados
- Código com background

Todos os estilos seguem o design system do TudoAgro (cores emerald/green).
