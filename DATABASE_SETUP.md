# Configuração do Banco de Dados Supabase

## ⚠️ Ação Necessária

Para que o sistema de autenticação funcione corretamente, você precisa executar o script SQL no Supabase.

## 📋 Instruções Passo a Passo

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

## 🔧 O que o script faz

- Cria todas as tabelas necessárias para o sistema
- Configura Row Level Security (RLS) para segurança
- Insere roles padrão (admin, vendedor, comprador)
- Cria índices para melhor performance
- Configura triggers para atualização automática de timestamps

## ✅ Após executar o script

O sistema de login e cadastro deve funcionar normalmente. As tabelas estarão prontas para:
- Cadastro de usuários
- Autenticação
- Gerenciamento de produtos
- Sistema de leilões
- Transações
- Mensagens entre usuários

## 🚨 Problemas comuns

- **Erro de permissão**: Certifique-se de estar logado como owner do projeto
- **Tabela já existe**: O script usa `IF NOT EXISTS`, então é seguro executar novamente
- **Timeout**: Se o script for muito longo, execute em partes menores