# TudoAgro

Plataforma de leilões para produtos agropecuários desenvolvida com Next.js e Supabase.

## 🚀 Getting Started

### Pré-requisitos

- Node.js (versão 18 ou superior)
- Conta no Supabase
- npm, yarn, pnpm ou bun

### Instalação

1. **Clone o repositório:**
```bash
git clone <url-do-repositorio>
cd tudo-agro
```

2. **Instale as dependências:**
```bash
npm install
# ou
yarn install
# ou
pnpm install
# ou
bun install
```

3. **Configure as variáveis de ambiente:**
Crie um arquivo `.env.local` na raiz do projeto:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here
```

4. **Configure o banco de dados Supabase:**
   - Acesse [supabase.com](https://supabase.com) e crie uma nova conta
   - Crie um novo projeto
   - Anote as informações do projeto (URL, Anon Key, Service Role Key)
   - No painel do Supabase, vá para "SQL Editor"
   - Execute o conteúdo do arquivo `supabase-schema.sql` para criar todas as tabelas e políticas

5. **Execute o projeto:**
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Abra [http://localhost:3000](http://localhost:3000) com seu navegador para ver o resultado.

## 📊 Configuração do Banco de Dados

### ⚠️ Ação Necessária

Para que o sistema de autenticação funcione corretamente, você precisa executar o script SQL no Supabase.

### 📋 Instruções Passo a Passo

1. **Acesse o painel do Supabase:**
   - Vá para: https://supabase.com/dashboard
   - Faça login na sua conta

2. **Selecione seu projeto:**
   - Clique no projeto "tudo-agro" ou o nome do seu projeto

3. **Abra o SQL Editor:**
   - No menu lateral, clique em "SQL Editor"
   - Clique em "New query"

4. **Execute o script SQL:**
   - Copie todo o conteúdo do arquivo `supabase-schema.sql`
   - Cole no editor SQL
   - Clique em "Run" para executar

5. **Verifique se as tabelas foram criadas:**
   - Vá para "Table Editor" no menu lateral
   - Você deve ver as seguintes tabelas:
     - users
     - roles
     - user_roles
     - products
     - product_images
     - auctions
     - bids
     - transactions
     - messages
     - reviews
     - addresses
     - documents

### 🔧 O que o script faz

- Cria todas as tabelas necessárias para o sistema
- Configura Row Level Security (RLS) para segurança
- Insere roles padrão (admin, vendedor, comprador)
- Cria índices para melhor performance
- Configura triggers para atualização automática de timestamps

### ✅ Após executar o script

O sistema de login e cadastro deve funcionar normalmente. As tabelas estarão prontas para:
- Cadastro de usuários
- Autenticação
- Gerenciamento de produtos
- Sistema de leilões
- Transações
- Mensagens entre usuários

## 🏗️ Arquitetura do Sistema

### Tabelas Principais

- **users**: Dados dos usuários
- **roles**: Roles do sistema (admin, vendedor, comprador)
- **user_roles**: Relacionamento many-to-many entre usuários e roles
- **products**: Produtos/animais cadastrados
- **product_images**: Imagens dos produtos
- **auctions**: Leilões
- **bids**: Lances nos leilões
- **transactions**: Transações financeiras
- **messages**: Sistema de mensagens
- **reviews**: Avaliações
- **addresses**: Endereços
- **documents**: Documentos

### Sistema de Permissões

O sistema utiliza Row Level Security (RLS) do Supabase para controlar acesso aos dados:

- **admin**: Acesso total ao sistema
- **vendedor**: Pode criar e gerenciar produtos e leilões
- **comprador**: Pode visualizar produtos e participar de leilões

## 🔐 Autenticação

### Fluxo de Login
1. Usuário insere email/senha
2. Supabase Auth valida credenciais
3. Sistema busca dados do usuário e roles
4. Retorna usuário autenticado com permissões

### Fluxo de Cadastro
1. Usuário preenche formulário
2. Supabase Auth cria conta
3. Sistema cria perfil na tabela users
4. Atribui roles baseado no tipo de conta

## 🛡️ Middleware de Proteção

O middleware (`src/middleware.ts`) protege rotas baseado em:
- Autenticação (usuário logado)
- Roles (admin, vendedor, comprador)
- Permissões específicas

## 📡 API Routes

### Autenticação
- `POST /api/auth/signin` - Login
- `POST /api/auth/signup` - Cadastro
- `POST /api/auth/signout` - Logout

### Produtos
- `GET /api/products` - Listar produtos
- `POST /api/products` - Criar produto

### Leilões
- `GET /api/auctions` - Listar leilões
- `POST /api/auctions` - Criar leilão

### Lances
- `GET /api/bids` - Listar lances
- `POST /api/bids` - Fazer lance

## 🔧 Hooks Personalizados

### useAuth
Hook para gerenciar autenticação:
```typescript
const { user, signIn, signOut, hasPermission, hasRole } = useAuth()
```

## 🚨 Segurança

- Todas as rotas da API validam autenticação
- RLS protege dados no nível do banco
- Validação de entrada com Zod
- Sanitização de dados

## 🐛 Troubleshooting

### Erro de Conexão com Supabase
- Verifique se as variáveis de ambiente estão corretas
- Confirme se o projeto Supabase está ativo

### Erro de Permissão
- Verifique se o usuário tem as roles necessárias
- Confirme se as políticas RLS estão corretas

### Erro de Validação
- Verifique se os dados enviados estão no formato correto
- Confirme se os campos obrigatórios estão preenchidos

### Problemas comuns no banco de dados

- **Erro de permissão**: Certifique-se de estar logado como owner do projeto
- **Tabela já existe**: O script usa `IF NOT EXISTS`, então é seguro executar novamente
- **Timeout**: Se o script for muito longo, execute em partes menores

## 📝 Próximos Passos

1. Configurar storage para upload de imagens
2. Implementar sistema de notificações
3. Adicionar pagamentos (PIX, cartão)
4. Implementar sistema de chat em tempo real
5. Adicionar testes automatizados

## 🚀 Deploy

### Deploy no Vercel

A forma mais fácil de fazer deploy do seu app Next.js é usar a [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) dos criadores do Next.js.

Confira nossa [documentação de deploy do Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para mais detalhes.

## 📚 Learn More

Para aprender mais sobre Next.js, dê uma olhada nos seguintes recursos:

- [Next.js Documentation](https://nextjs.org/docs) - aprenda sobre recursos e API do Next.js
- [Learn Next.js](https://nextjs.org/learn) - um tutorial interativo do Next.js

Você pode conferir [o repositório GitHub do Next.js](https://github.com/vercel/next.js) - seu feedback e contribuições são bem-vindos!

## 🛠️ Tecnologias Utilizadas

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Autenticação**: Supabase Auth
- **Banco de Dados**: PostgreSQL (via Supabase)
- **Deploy**: Vercel
- **Validação**: Zod
- **UI Components**: shadcn/ui