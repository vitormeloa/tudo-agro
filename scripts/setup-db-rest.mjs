import { readFileSync } from 'fs'
import { config } from 'dotenv'

// Carregar variáveis de ambiente
config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Variáveis de ambiente do Supabase não encontradas!')
  process.exit(1)
}

async function executeSQL(sql) {
  const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
    method: 'POST',
    headers: {
      'apikey': supabaseServiceKey,
      'Authorization': `Bearer ${supabaseServiceKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sql })
  })
  
  if (!response.ok) {
    const error = await response.text()
    throw new Error(`HTTP ${response.status}: ${error}`)
  }
  
  return await response.json()
}

async function setupDatabase() {
  console.log('🚀 Iniciando configuração do banco de dados...')
  console.log('⚠️  Como o Supabase não permite execução direta de SQL via API,')
  console.log('   você precisará executar o SQL manualmente no painel do Supabase.')
  console.log('')
  console.log('📋 Instruções:')
  console.log('1. Acesse: https://supabase.com/dashboard')
  console.log('2. Selecione seu projeto')
  console.log('3. Vá para SQL Editor')
  console.log('4. Cole o conteúdo do arquivo supabase-schema.sql')
  console.log('5. Execute o script')
  console.log('')
  console.log('📄 Conteúdo do SQL:')
  console.log('=' * 50)
  
  try {
    const sqlContent = readFileSync('supabase-schema.sql', 'utf8')
    console.log(sqlContent)
    console.log('=' * 50)
  } catch (error) {
    console.error('❌ Erro ao ler arquivo SQL:', error.message)
  }
}

setupDatabase()