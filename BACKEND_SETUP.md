# Configuração do Backend - TudoAgro

Este documento contém as instruções para configurar o backend completo do TudoAgro usando Supabase.

## 🚀 Configuração Inicial

### 1. Configurar Supabase

1. Acesse [supabase.com](https://supabase.com) e crie uma nova conta
2. Crie um novo projeto
3. Anote as seguintes informações do seu projeto:
   - Project URL
   - Anon Key
   - Service Role Key

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here
```

### 3. Executar SQL no Supabase

1. Acesse o SQL Editor no painel do Supabase
2. Execute o conteúdo do arquivo `supabase-schema.sql` para criar todas as tabelas e políticas

### 4. Instalar Dependências

```bash
npm install
```

### 5. Executar o Projeto

```bash
npm run dev
```

## 📊 Estrutura do Banco de Dados

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

## 📝 Próximos Passos

1. Configurar storage para upload de imagens
2. Implementar sistema de notificações
3. Adicionar pagamentos (PIX, cartão)
4. Implementar sistema de chat em tempo real
5. Adicionar testes automatizados

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