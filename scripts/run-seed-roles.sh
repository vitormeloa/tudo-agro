#!/bin/bash

# Script para executar o seeder de roles
echo "🌱 Executando seeder de roles..."

# Verificar se o Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Instale o Node.js primeiro."
    exit 1
fi

# Verificar se o arquivo .env existe
if [ ! -f .env.local ]; then
    echo "❌ Arquivo .env.local não encontrado. Crie o arquivo com as variáveis do Supabase."
    exit 1
fi

# Executar o seeder
node scripts/seed-roles.js

echo "✅ Seeder de roles concluído!"