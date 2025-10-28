# 🔐 Como Acessar a Gestão de Funções

## ✅ Rota Criada

Agora você pode acessar a gestão de funções através de uma única rota:

### **Funções**
- **URL**: `/dashboard/funcoes`
- **Menu**: "Funções" (ícone de escudo)
- **Acesso**: Apenas administradores

## 🚀 Como Acessar

### **Opção 1: Via Menu do Dashboard**
1. Faça login com uma conta **admin**
2. Acesse o dashboard (`/dashboard`)
3. No menu lateral, procure por **"Funções"**
4. Clique na opção

### **Opção 2: Via URL Direta**
- Acesse diretamente: `http://localhost:3000/dashboard/funcoes`

## 🛠️ Funcionalidades Disponíveis

### **Gestão de Funções**
- ✅ **Listar** todas as funções existentes (carregadas do banco de dados)
- ✅ **Criar** novas funções personalizadas
- ✅ **Editar** funções existentes (nome, descrição, permissões)
- ✅ **Excluir** funções (quando não há usuários associados)
- ✅ **Interface moderna** seguindo o padrão do dashboard

### **Gestão de Permissões**
- ✅ **Interface visual** com checkboxes organizadas por módulo:
  - 📦 **Produtos** (read, write, delete)
  - 🔨 **Leilões** (read, write, delete)
  - 💳 **Transações** (read, write, delete)
  - 💬 **Mensagens** (read, write, delete)
  - ⭐ **Avaliações** (read, write, delete)
  - 👥 **Usuários** (read, write, delete)
  - 🛡️ **Funções** (read, write, delete)
  - ⚙️ **Administração** (read, write, delete)
- ✅ **Marcar/desmarcar todas** as permissões de um módulo
- ✅ **Contadores** de permissões por função

### **Gestão de Usuários**
- ✅ **Atribuir funções** a usuários existentes
- ✅ **Remover funções** de usuários
- ✅ **Visualizar** funções de cada usuário

### **Interface Padronizada**
- ✅ **Design idêntico** às outras telas do dashboard
- ✅ **Header unificado** com estatísticas e filtros
- ✅ **Cards de funções** com layout responsivo
- ✅ **Informações organizadas** (avatar, dados, permissões, datas)
- ✅ **Estatísticas visuais** (contadores de permissões e usuários)
- ✅ **Ações contextuais** (editar, excluir)
- ✅ **Busca em tempo real** integrada

## 🔧 Configuração Inicial

### **1. Execute o Seeder de Funções**
```bash
# No terminal, na raiz do projeto
./scripts/run-seed-roles.sh
```

### **2. Verifique se sua conta tem função admin**
Se não conseguir acessar, execute no Supabase:

```sql
-- Verificar se a role admin existe
SELECT * FROM roles WHERE name = 'admin';

-- Encontrar seu user_id
SELECT id, email FROM users WHERE email = 'seu-email@exemplo.com';

-- Atribuir função admin (substitua pelos IDs corretos)
INSERT INTO user_roles (user_id, role_id) 
VALUES (
  'seu-user-id-aqui',
  (SELECT id FROM roles WHERE name = 'admin')
);
```

## 🎯 Próximos Passos

1. **Acesse** `/dashboard/funcoes`
2. **Execute o seeder** se ainda não executou
3. **Explore a interface** de gestão de funções
4. **Crie funções personalizadas** se necessário
5. **Atribua funções** aos usuários conforme necessário

## 🚨 Troubleshooting

### **"Acesso Negado"**
- Verifique se sua conta tem role **admin**
- Execute o seeder de roles
- Faça logout e login novamente

### **Menu não aparece**
- Verifique se está logado como admin
- Limpe o cache do navegador
- Verifique se as rotas foram criadas corretamente

### **Erro ao carregar permissões**
- Verifique se as APIs estão funcionando
- Verifique se o banco de dados tem as tabelas `roles` e `user_roles`
- Execute o seeder de roles

---

**🎉 Pronto! Agora você tem acesso completo à gestão de permissões e cargos do sistema!**