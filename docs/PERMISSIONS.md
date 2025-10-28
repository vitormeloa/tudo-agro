# Sistema de Permissões e Roles

Este documento descreve o sistema de permissões implementado no TudoAgro.

## Visão Geral

O sistema de permissões é baseado em roles e permissões granulares, seguindo o padrão "resource:action" (ex: "product:read", "auction:write").

## Estrutura

### Roles Padrão

1. **Admin** - Acesso total ao sistema
2. **Vendedor** - Pode gerenciar produtos e leilões
3. **Comprador** - Pode visualizar produtos e realizar compras

### Permissões Disponíveis

```typescript
const PERMISSIONS = {
  product: ["read", "write", "delete"],
  auction: ["read", "write", "delete"],
  transaction: ["read", "write", "delete"],
  message: ["read", "write", "delete"],
  review: ["read", "write", "delete"],
  user: ["read", "write", "delete"],
  role: ["read", "write", "delete"],
  admin: ["read", "write", "delete"]
}
```

## Como Usar

### 1. Verificação de Permissões no Frontend

```tsx
import { usePermissions } from '@/hooks/usePermissions'

function MyComponent() {
  const { hasPermission, hasRole, isAdmin } = usePermissions()

  if (hasPermission('product:write')) {
    // Usuário pode criar/editar produtos
  }

  if (hasRole('admin')) {
    // Usuário é admin
  }

  if (isAdmin()) {
    // Usuário é admin (método de conveniência)
  }
}
```

### 2. Proteção de Rotas

```tsx
import PermissionGuard from '@/components/PermissionGuard'

function ProtectedPage() {
  return (
    <PermissionGuard permission="user:read">
      <div>Conteúdo protegido</div>
    </PermissionGuard>
  )
}
```

### 3. Mostrar/Ocultar Elementos

```tsx
import { PermissionShow, PermissionHide } from '@/components/PermissionGuard'

function MyComponent() {
  return (
    <div>
      <PermissionShow permission="product:write">
        <Button>Criar Produto</Button>
      </PermissionShow>

      <PermissionHide role="admin">
        <div>Aviso para não-admins</div>
      </PermissionHide>
    </div>
  )
}
```

### 4. Proteção de APIs

```typescript
import { withPermissionGuard } from '@/lib/permission-guard'

export const GET = withPermissionGuard(handler, {
  requiredPermissions: ['user:read']
})

export const POST = withPermissionGuard(handler, {
  requiredRoles: ['admin']
})
```

## Configuração Inicial

### 1. Executar Seeder de Roles

```bash
# Executar o script de seed
./scripts/run-seed-roles.sh

# Ou manualmente
node scripts/seed-roles.js
```

### 2. Configurar Variáveis de Ambiente

Certifique-se de que o arquivo `.env.local` contém:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key
```

## APIs Disponíveis

### Roles

- `GET /api/admin/roles` - Listar roles
- `POST /api/admin/roles` - Criar role
- `PUT /api/admin/roles/[id]` - Atualizar role
- `DELETE /api/admin/roles/[id]` - Excluir role

### User Roles

- `GET /api/admin/user-roles?userId=xxx` - Listar roles do usuário
- `POST /api/admin/user-roles` - Atribuir role ao usuário
- `DELETE /api/admin/user-roles?userId=xxx&roleId=yyy` - Remover role do usuário

### Verificação de Permissões

- `POST /api/auth/check-permission` - Verificar permissão específica
- `POST /api/auth/check-role` - Verificar role específica

## Painel Administrativo

Acesse a seção "Permissões e Roles" no painel administrativo para:

- Visualizar todas as roles
- Criar e editar roles
- Gerenciar permissões de cada role
- Atribuir roles a usuários
- Excluir roles (quando não há usuários associados)

## Estrutura do Banco de Dados

### Tabela `roles`

```sql
CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR UNIQUE NOT NULL,
  description TEXT,
  permissions JSON NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Tabela `user_roles`

```sql
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, role_id)
);
```

## Exemplos de Uso Avançado

### Verificação Múltipla

```tsx
const { hasAnyPermission, hasAllPermissions } = usePermissions()

// Qualquer uma das permissões
if (hasAnyPermission(['product:read', 'product:write'])) {
  // Usuário pode ler OU escrever produtos
}

// Todas as permissões
if (hasAllPermissions(['user:read', 'user:write'])) {
  // Usuário pode ler E escrever usuários
}
```

### Verificação de Acesso a Recurso

```tsx
const { canAccess } = usePermissions()

if (canAccess('product', 'write')) {
  // Usuário pode escrever produtos
}
```

### Verificação de Capacidades Específicas

```tsx
const { 
  canManageUsers, 
  canManageProducts, 
  canViewTransactions 
} = usePermissions()

if (canManageUsers()) {
  // Usuário pode gerenciar usuários
}
```

## Boas Práticas

1. **Sempre verificar permissões no backend** - O frontend é apenas para UX
2. **Usar roles para grupos de permissões** - Mais fácil de gerenciar
3. **Permissões granulares para funcionalidades específicas** - Maior controle
4. **Admin sempre tem acesso total** - Implementado automaticamente
5. **Documentar permissões necessárias** - Para cada funcionalidade

## Troubleshooting

### Usuário não tem permissões após login

1. Verificar se o usuário tem roles atribuídas na tabela `user_roles`
2. Verificar se as roles têm as permissões corretas
3. Verificar se o contexto de usuário está carregando as permissões

### Permissões não funcionam no frontend

1. Verificar se o hook `usePermissions` está sendo usado corretamente
2. Verificar se o usuário está logado
3. Verificar se as permissões estão sendo carregadas do backend

### Erro ao criar/editar roles

1. Verificar se o usuário tem permissão `role:write`
2. Verificar se o nome da role não conflita com existentes
3. Verificar se as permissões são válidas