# 🔐 Sistema de Permissões - TudoAgro

## 📋 Visão Geral

O sistema de permissões do TudoAgro foi completamente revisado e implementado para cobrir todas as funcionalidades do painel administrativo. O sistema utiliza um padrão `recurso:ação` para controle granular de acesso.

## 🎯 Estrutura de Permissões

### **Recursos Disponíveis**

| Recurso | Descrição | Ações Disponíveis |
|---------|-----------|-------------------|
| `dashboard` | Dashboard e visão geral | `read` |
| `user` | Gestão de usuários | `read`, `write`, `delete`, `approve`, `suspend` |
| `seller` | Gestão de vendedores | `read`, `write`, `delete`, `approve`, `reject` |
| `ad` | Gestão de anúncios | `read`, `write`, `delete`, `moderate`, `feature` |
| `product` | Gestão de produtos | `read`, `write`, `delete` |
| `auction` | Gestão de leilões | `read`, `write`, `delete`, `moderate`, `manage` |
| `transaction` | Gestão de transações | `read`, `write`, `delete`, `refund`, `dispute` |
| `document` | Documentos KYC | `read`, `write`, `delete`, `verify`, `reject` |
| `cashback` | Gestão de cashback | `read`, `write`, `delete`, `approve`, `reject` |
| `vip` | Planos VIP | `read`, `write`, `delete`, `manage` |
| `academy` | Academy/IA | `read`, `write`, `delete`, `moderate` |
| `message` | Mensagens | `read`, `write`, `delete`, `moderate` |
| `support` | Suporte | `read`, `write`, `delete`, `assign`, `resolve` |
| `role` | Funções | `read`, `write`, `delete` |
| `permission` | Permissões | `read`, `write`, `delete` |
| `config` | Configurações | `read`, `write` |
| `setting` | Configurações | `read`, `write` |
| `report` | Relatórios | `read`, `export` |
| `analytics` | Analytics | `read`, `export` |
| `notification` | Notificações | `read`, `write`, `delete`, `send` |
| `audit` | Auditoria | `read`, `export` |
| `log` | Logs | `read`, `export` |

## 👥 Funções e Permissões

### **1. Admin (78 permissões)**
- ✅ **Acesso total** a todas as funcionalidades
- ✅ **Todas as permissões** de todos os recursos
- ✅ **Gestão completa** de funções e permissões
- ✅ **Configurações** do sistema
- ✅ **Relatórios** e analytics
- ✅ **Auditoria** e logs

### **2. Vendedor (19 permissões)**
- ✅ **Dashboard**: Visualizar
- ✅ **Produtos/Anúncios**: Gerenciar próprios
- ✅ **Leilões**: Participar e gerenciar
- ✅ **Transações**: Relacionadas às vendas
- ✅ **Mensagens**: Comunicar com compradores
- ✅ **Suporte**: Acesso básico
- ✅ **Cashback**: Visualizar próprio
- ✅ **VIP**: Visualizar planos
- ✅ **Academy**: Acesso ao conteúdo

### **3. Comprador (13 permissões)**
- ✅ **Dashboard**: Visualizar
- ✅ **Produtos/Anúncios**: Apenas visualizar
- ✅ **Leilões**: Participar
- ✅ **Transações**: Próprias compras
- ✅ **Mensagens**: Comunicar com vendedores
- ✅ **Suporte**: Acesso básico
- ✅ **Cashback**: Visualizar próprio
- ✅ **VIP**: Visualizar planos
- ✅ **Academy**: Acesso ao conteúdo

## 🛠️ Implementação Técnica

### **1. Arquivos Principais**

#### `src/lib/permissions.ts`
- Define todas as permissões disponíveis
- Mapeia recursos para ações
- Fornece utilitários para validação

#### `src/hooks/useAdminPermissions.tsx`
- Hook para verificar permissões no frontend
- Funções para verificar acesso a seções
- Validação de ações específicas

#### `src/components/PermissionRoute.tsx`
- Componente de proteção de rotas
- Redirecionamento baseado em permissões
- Interface de erro personalizada

### **2. Aplicação de Permissões**

#### **Menu do Dashboard**
```typescript
// Filtrar itens do menu baseado em permissões
return allMenuItems.filter(item => {
  return canAccessSection(item.id)
})
```

#### **Botões e Ações**
```typescript
// Mostrar botão apenas se tiver permissão
{canShowButton('create-role') && (
  <Button onClick={handleCreate}>Criar</Button>
)}
```

#### **Proteção de Rotas**
```typescript
<PermissionRoute requiredSection="funcoes">
  <PermissionsSection />
</PermissionRoute>
```

## 🔧 Configuração

### **1. Executar Seeder**
```bash
./scripts/run-seed-roles.sh
```

### **2. Verificar Permissões**
```sql
-- Verificar roles criadas
SELECT name, description, array_length(permissions, 1) as permission_count 
FROM roles 
ORDER BY name;

-- Verificar permissões de um usuário
SELECT u.email, r.name as role, r.permissions
FROM users u
JOIN user_roles ur ON u.id = ur.user_id
JOIN roles r ON ur.role_id = r.id
WHERE u.email = 'usuario@exemplo.com';
```

## 🎯 Funcionalidades Protegidas

### **Seções do Dashboard**
- ✅ **Visão Geral**: `dashboard:read`
- ✅ **Usuários**: `user:read`
- ✅ **Vendedores**: `seller:read`
- ✅ **Anúncios**: `ad:read`
- ✅ **Leilões**: `auction:read`
- ✅ **Transações**: `transaction:read`
- ✅ **Documentos KYC**: `document:read`
- ✅ **Cashback**: `cashback:read`
- ✅ **Planos VIP**: `vip:read`
- ✅ **Academy**: `academy:read`
- ✅ **Mensagens**: `message:read` ou `support:read`
- ✅ **Funções**: `role:read`
- ✅ **Configurações**: `config:read` ou `setting:read`

### **Ações Específicas**
- ✅ **Criar usuário**: `user:write`
- ✅ **Aprovar vendedor**: `seller:approve`
- ✅ **Moderar anúncio**: `ad:moderate`
- ✅ **Reembolsar transação**: `transaction:refund`
- ✅ **Verificar documento**: `document:verify`
- ✅ **Criar função**: `role:write`
- ✅ **Excluir função**: `role:delete`

## 🚨 Segurança

### **1. Validação Dupla**
- ✅ **Frontend**: Interface oculta para usuários sem permissão
- ✅ **Backend**: APIs protegidas com `withPermissionGuard`

### **2. Fallbacks Seguros**
- ✅ **Acesso negado**: Redirecionamento para dashboard
- ✅ **Interface limpa**: Elementos ocultos, não desabilitados
- ✅ **Mensagens claras**: Explicação do motivo da restrição

### **3. Auditoria**
- ✅ **Logs de acesso**: Registro de tentativas de acesso
- ✅ **Mudanças de permissão**: Histórico de alterações
- ✅ **Ações sensíveis**: Rastreamento de operações críticas

## 📊 Monitoramento

### **Métricas Disponíveis**
- ✅ **Usuários por função**: Distribuição de roles
- ✅ **Permissões utilizadas**: Frequência de uso
- ✅ **Tentativas negadas**: Tentativas de acesso sem permissão
- ✅ **Mudanças de permissão**: Histórico de alterações

## 🔄 Manutenção

### **Adicionar Nova Permissão**
1. Adicionar em `src/lib/permissions.ts`
2. Atualizar `ADMIN_FEATURES` se necessário
3. Atualizar seeder de roles
4. Implementar validação no frontend
5. Testar com diferentes funções

### **Modificar Permissões de Função**
1. Atualizar `scripts/seed-roles.js`
2. Executar seeder: `./scripts/run-seed-roles.sh`
3. Verificar impacto no frontend
4. Testar funcionalidades afetadas

---

**🎉 Sistema de permissões totalmente funcional e integrado ao painel administrativo!**