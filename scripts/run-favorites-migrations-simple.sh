#!/bin/bash

# Script simples para executar migrações de favoritos
# Este script mostra o conteúdo das migrações para execução manual

echo "🚀 Script de Migração de Favoritos"
echo ""
echo "📋 Migrações encontradas:"
echo ""

MIGRATIONS_DIR="./supabase/migrations"

if [ ! -d "$MIGRATIONS_DIR" ]; then
  echo "❌ Diretório de migrações não encontrado: $MIGRATIONS_DIR"
  exit 1
fi

echo "1. 001_create_favorites.sql"
echo "2. 002_modify_favorites_for_mock_products.sql"
echo ""
echo "📝 Para executar as migrações:"
echo ""
echo "   1. Acesse: https://supabase.com/dashboard"
echo "   2. Selecione seu projeto"
echo "   3. Vá para SQL Editor"
echo "   4. Execute cada arquivo SQL na ordem"
echo ""
echo "📄 Conteúdo das migrações:"
echo ""

# Mostrar primeira migração
if [ -f "$MIGRATIONS_DIR/001_create_favorites.sql" ]; then
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "Migração 1: 001_create_favorites.sql"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  cat "$MIGRATIONS_DIR/001_create_favorites.sql"
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
fi

# Mostrar segunda migração
if [ -f "$MIGRATIONS_DIR/002_modify_favorites_for_mock_products.sql" ]; then
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "Migração 2: 002_modify_favorites_for_mock_products.sql"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  cat "$MIGRATIONS_DIR/002_modify_favorites_for_mock_products.sql"
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
fi

echo "✅ Após executar as migrações:"
echo "   1. Recarregue o schema cache: Settings > API > Reload schema cache"
echo "   2. Aguarde alguns minutos para o cache atualizar"
echo "   3. Teste o sistema de favoritos no aplicativo"
echo ""
