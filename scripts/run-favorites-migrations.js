const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Variáveis de ambiente do Supabase não encontradas!')
  console.error('   Certifique-se de ter NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

/**
 * Lê e combina os arquivos de migração
 */
function readMigrations() {
  const migrationsDir = path.join(__dirname, '..', 'supabase', 'migrations')
  const migrations = [
    {
      name: '001_create_favorites.sql',
      path: path.join(migrationsDir, '001_create_favorites.sql')
    },
    {
      name: '002_modify_favorites_for_mock_products.sql',
      path: path.join(migrationsDir, '002_modify_favorites_for_mock_products.sql')
    }
  ]
  
  return migrations.map(migration => {
    try {
      const content = fs.readFileSync(migration.path, 'utf8')
      return { ...migration, content }
    } catch (error) {
      console.error(`❌ Erro ao ler migração ${migration.name}:`, error.message)
      return null
    }
  }).filter(Boolean)
}

/**
 * Exibe instruções para execução manual
 */
function showManualInstructions(migrations) {
  console.log('\n📋 Como executar as migrações manualmente:\n')
  console.log('1. Acesse o painel do Supabase:')
  console.log('   https://supabase.com/dashboard\n')
  console.log('2. Selecione seu projeto\n')
  console.log('3. Vá para SQL Editor (no menu lateral)\n')
  console.log('4. Execute cada migração na ordem:\n')
  
  migrations.forEach((migration, index) => {
    console.log(`   Migração ${index + 1}: ${migration.name}`)
    console.log('   ' + '='.repeat(60))
    console.log(migration.content)
    console.log('   ' + '='.repeat(60))
    console.log()
  })
  
  console.log('5. Após executar, recarregue o schema cache:')
  console.log('   Settings > API > Reload schema cache\n')
}

/**
 * Tenta verificar se a tabela já existe
 */
async function checkTableExists() {
  try {
    const { data, error } = await supabase
      .from('favorites')
      .select('id')
      .limit(1)
    
    if (error) {
      if (error.code === 'PGRST205' || error.message?.includes('does not exist')) {
        return false
      }
      throw error
    }
    
    return true
  } catch (error) {
    return false
  }
}

async function main() {
  console.log('🚀 Script de Migração de Favoritos\n')
  console.log('⚠️  O Supabase não permite execução direta de SQL via API REST')
  console.log('   sem uma função RPC personalizada.\n')
  
  const migrations = readMigrations()
  
  if (migrations.length === 0) {
    console.error('❌ Nenhuma migração encontrada!')
    process.exit(1)
  }
  
  console.log(`✅ Encontradas ${migrations.length} migração(ões)\n`)
  
  // Verificar se a tabela já existe
  console.log('🔍 Verificando se a tabela favorites já existe...')
  const tableExists = await checkTableExists()
  
  if (tableExists) {
    console.log('✅ A tabela favorites já existe!')
    console.log('   Se você ainda está vendo erros, pode ser necessário:')
    console.log('   1. Recarregar o schema cache no Supabase (Settings > API > Reload)')
    console.log('   2. Aguardar alguns minutos para o cache atualizar\n')
    
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    })
    
    return new Promise((resolve) => {
      readline.question('Deseja ver as instruções para executar as migrações mesmo assim? (s/N): ', (answer) => {
        readline.close()
        if (answer.toLowerCase() === 's' || answer.toLowerCase() === 'sim') {
          showManualInstructions(migrations)
        }
        resolve()
      })
    })
  } else {
    console.log('❌ A tabela favorites não existe ainda.\n')
    showManualInstructions(migrations)
  }
}

main()
  .then(() => {
    console.log('✅ Processo concluído!')
  })
  .catch(error => {
    console.error('\n❌ Erro fatal:', error.message)
    process.exit(1)
  })
