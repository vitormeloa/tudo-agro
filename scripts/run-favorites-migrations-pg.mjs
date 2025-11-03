import pg from 'pg'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { config } from 'dotenv'

// Carregar variáveis de ambiente
config({ path: '.env.local' })

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = join(__dirname, '..')

// Obter connection string do Supabase
// Formato esperado: postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const databaseUrl = process.env.DATABASE_URL || process.env.SUPABASE_DB_URL

if (!databaseUrl && (!supabaseUrl || !supabaseServiceKey)) {
  console.error('❌ Variáveis de ambiente não encontradas!')
  console.error('   Você precisa de uma das seguintes opções:')
  console.error('   1. DATABASE_URL ou SUPABASE_DB_URL (connection string PostgreSQL)')
  console.error('   2. NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY')
  console.error('\n   Para obter a connection string:')
  console.error('   Supabase Dashboard > Settings > Database > Connection string > URI')
  console.error('   (Use a connection string de "Session mode" ou "Transaction mode")')
  process.exit(1)
}

/**
 * Obtém a connection string do Supabase a partir da URL e service key
 */
function getConnectionString() {
  if (databaseUrl) {
    return databaseUrl
  }
  
  // Tentar construir a connection string a partir da URL do Supabase
  // Nota: Isso requer a connection string completa, não apenas a URL da API
  console.error('⚠️  DATABASE_URL não encontrada. Usando método alternativo...')
  console.error('   Por favor, defina DATABASE_URL no .env.local com a connection string PostgreSQL')
  return null
}

/**
 * Divide SQL em comandos individuais preservando blocos PL/pgSQL
 */
function parseSQL(sql) {
  const commands = []
  let currentCommand = ''
  let inFunction = false
  let dollarTag = null
  let dollarTagStack = []
  
  const lines = sql.split('\n')
  
  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const line = lines[lineIdx]
    
    // Detectar início de função PL/pgSQL
    if (line.match(/CREATE\s+(OR\s+REPLACE\s+)?FUNCTION/i)) {
      inFunction = true
      // Detectar dollar tag ($$ ou $tag$)
      const dollarMatch = line.match(/\$(\w*)\$/)
      if (dollarMatch) {
        dollarTag = dollarMatch[0]
        dollarTagStack.push(dollarTag)
      }
    }
    
    currentCommand += line + '\n'
    
    // Detectar fim de função PL/pgSQL
    if (inFunction && dollarTag && line.includes(dollarTag)) {
      // Contar ocorrências do dollar tag na linha
      const matches = line.match(new RegExp(dollarTag.replace('$', '\\$'), 'g'))
      if (matches) {
        for (const match of matches) {
          if (dollarTagStack.length > 0 && dollarTagStack[dollarTagStack.length - 1] === dollarTag) {
            dollarTagStack.pop()
          }
        }
        
        if (dollarTagStack.length === 0) {
          inFunction = false
          dollarTag = null
          // Continuar até encontrar o ponto e vírgula
          if (line.trim().endsWith(';')) {
            commands.push(currentCommand.trim())
            currentCommand = ''
          }
        }
      }
    } else if (!inFunction && line.trim().endsWith(';')) {
      // Comando normal terminado
      const cmd = currentCommand.trim()
      if (cmd && !cmd.startsWith('--')) {
        commands.push(cmd)
      }
      currentCommand = ''
    }
  }
  
  // Adicionar último comando se houver
  if (currentCommand.trim() && !currentCommand.trim().startsWith('--')) {
    commands.push(currentCommand.trim())
  }
  
  return commands.filter(cmd => cmd.length > 0)
}

async function runMigrations() {
  const connectionString = getConnectionString()
  
  if (!connectionString) {
    console.error('\n❌ Não foi possível obter a connection string do banco de dados.')
    console.error('   Por favor, defina DATABASE_URL no .env.local')
    console.error('   Exemplo: DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres')
    return false
  }
  
  console.log('🚀 Iniciando execução das migrações de favoritos...\n')
  
  const client = new pg.Client({
    connectionString: connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  })
  
  try {
    await client.connect()
    console.log('✅ Conectado ao banco de dados\n')
    
    const migrations = [
      {
        name: '001_create_favorites.sql',
        path: join(projectRoot, 'supabase', 'migrations', '001_create_favorites.sql')
      },
      {
        name: '002_modify_favorites_for_mock_products.sql',
        path: join(projectRoot, 'supabase', 'migrations', '002_modify_favorites_for_mock_products.sql')
      }
    ]
    
    for (const migration of migrations) {
      console.log(`📄 Processando migração: ${migration.name}`)
      
      try {
        // Ler arquivo SQL
        const sqlContent = readFileSync(migration.path, 'utf8')
        
        // Parse do SQL em comandos
        const commands = parseSQL(sqlContent)
        
        console.log(`   Encontrados ${commands.length} comando(s) SQL\n`)
        
        // Executar cada comando
        for (let i = 0; i < commands.length; i++) {
          const command = commands[i]
          const commandPreview = command.substring(0, 60).replace(/\n/g, ' ') + '...'
          
          console.log(`   [${i + 1}/${commands.length}] Executando: ${commandPreview}`)
          
          try {
            await client.query(command)
            console.log(`   ✅ Comando ${i + 1} executado com sucesso\n`)
          } catch (error) {
            // Alguns erros são esperados (ex: IF NOT EXISTS, DROP IF EXISTS)
            const errorCode = error.code
            const errorMessage = error.message.toLowerCase()
            
            if (
              errorCode === '42P07' || // relation already exists
              errorCode === '42710' || // duplicate object
              errorCode === '42704' || // object does not exist (DROP IF EXISTS)
              errorMessage.includes('already exists') ||
              errorMessage.includes('does not exist') ||
              (errorMessage.includes('duplicate') && errorCode === '42710')
            ) {
              console.log(`   ⚠️  Comando ${i + 1} ignorado (erro esperado): ${error.message}\n`)
            } else {
              console.error(`   ❌ Erro ao executar comando ${i + 1}:`)
              console.error(`      Código: ${errorCode}`)
              console.error(`      Mensagem: ${error.message}\n`)
              throw error
            }
          }
        }
        
        console.log(`✅ Migração ${migration.name} concluída!\n`)
      } catch (error) {
        console.error(`❌ Erro ao processar migração ${migration.name}:`, error.message)
        console.error(`   📄 Arquivo: ${migration.path}\n`)
        throw error
      }
    }
    
    // Verificar se a tabela foi criada
    console.log('🔍 Verificando se a tabela favorites foi criada...')
    
    try {
      const result = await client.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = 'favorites'
        );
      `)
      
      if (result.rows[0]?.exists) {
        console.log('✅ Tabela favorites encontrada!')
        
        // Verificar estrutura
        const columnsResult = await client.query(`
          SELECT column_name, data_type 
          FROM information_schema.columns 
          WHERE table_schema = 'public' 
          AND table_name = 'favorites'
          ORDER BY ordinal_position;
        `)
        
        console.log('   Colunas:')
        columnsResult.rows.forEach(col => {
          console.log(`     - ${col.column_name} (${col.data_type})`)
        })
      } else {
        console.log('⚠️  Tabela favorites não encontrada')
      }
      
      console.log()
    } catch (error) {
      console.log('⚠️  Não foi possível verificar a tabela:', error.message)
    }
    
    console.log('🎉 Processo de migração concluído!')
    console.log('\n📋 Próximos passos:')
    console.log('   1. Aguarde alguns minutos para o schema cache do Supabase atualizar')
    console.log('   2. Ou recarregue o schema cache no painel do Supabase (Settings > API > Reload)')
    console.log('   3. Teste o sistema de favoritos no aplicativo\n')
    
    return true
  } catch (error) {
    console.error('\n❌ Erro durante a execução das migrações:', error.message)
    return false
  } finally {
    await client.end()
    console.log('🔌 Conexão com o banco de dados encerrada')
  }
}

// Executar migrações
runMigrations()
  .then(success => {
    if (!success) {
      console.error('\n❌ Algumas migrações falharam.')
      console.error('💡 Alternativa: Execute os arquivos SQL manualmente no SQL Editor do Supabase:')
      console.error('   https://supabase.com/dashboard > Seu Projeto > SQL Editor\n')
      process.exit(1)
    }
  })
  .catch(error => {
    console.error('\n❌ Erro fatal:', error.message)
    process.exit(1)
  })
