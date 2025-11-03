# Migrações de Favoritos

Este diretório contém scripts para executar as migrações do sistema de favoritos.

## 📋 Migrações Disponíveis

1. **001_create_favorites.sql** - Cria a tabela `favorites` com políticas RLS
2. **002_modify_favorites_for_mock_products.sql** - Modifica a tabela para permitir produtos mockados

## 🚀 Como Executar

### Opção 1: Script NPM (Recomendado)

```bash
npm run migrate:favorites
```

Este script verifica se a tabela já existe e mostra instruções para execução manual.

### Opção 2: Script Shell

```bash
./scripts/run-favorites-migrations-simple.sh
```

Este script mostra o conteúdo completo das migrações para você copiar e colar.

### Opção 3: Execução Manual (Mais Confiável)

1. Acesse o painel do Supabase:
   - https://supabase.com/dashboard
   - Selecione seu projeto

2. Vá para **SQL Editor** (no menu lateral)

3. Execute cada migração **na ordem**:

   **Migração 1:**
   - Abra o arquivo: `supabase/migrations/001_create_favorites.sql`
   - Copie todo o conteúdo
   - Cole no SQL Editor
   - Clique em "Run" ou pressione `Ctrl+Enter`

   **Migração 2:**
   - Abra o arquivo: `supabase/migrations/002_modify_favorites_for_mock_products.sql`
   - Copie todo o conteúdo
   - Cole no SQL Editor
   - Clique em "Run" ou pressione `Ctrl+Enter`

4. **Recarregue o schema cache:**
   - Vá para **Settings** > **API**
   - Clique em **"Reload schema cache"**
   - Aguarde alguns minutos

5. Teste o sistema de favoritos no aplicativo

## ⚠️ Problemas Comuns

### Erro PGRST205: "Could not find the table in schema cache"

Isso significa que a tabela foi criada, mas o cache do Supabase ainda não foi atualizado. Soluções:

1. Recarregue o schema cache manualmente (Settings > API > Reload)
2. Aguarde 2-5 minutos para o cache atualizar automaticamente
3. Reinicie o servidor de desenvolvimento

### Tabela já existe

Se você ver erros sobre "relation already exists", isso é normal - significa que a migração já foi executada parcialmente. Você pode:

1. Continuar com a próxima migração
2. Ou executar apenas a migração que falta

## ✅ Verificação

Após executar as migrações, você pode verificar se tudo está funcionando:

1. No SQL Editor do Supabase, execute:
   ```sql
   SELECT * FROM favorites LIMIT 1;
   ```

2. Se não houver erro, a tabela foi criada com sucesso!

3. Verifique as políticas RLS:
   ```sql
   SELECT * FROM pg_policies WHERE tablename = 'favorites';
   ```

## 📝 Notas

- As migrações são **idempotentes** - você pode executá-las múltiplas vezes sem problemas
- A segunda migração remove a foreign key constraint para permitir produtos mockados
- A função `insert_favorite` é criada para facilitar a inserção de favoritos
