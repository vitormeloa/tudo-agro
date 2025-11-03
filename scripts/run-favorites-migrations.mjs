import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { config } from 'dotenv'

// Carregar variáveis de ambiente
config({ path: '.env.local' })

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = join(__dirname, '..')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Variáveis de ambiente do Supabase não encontradas!')
  console.error('   Certifique-se de ter NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

/**
 * Executa SQL usando a API REST do Supabase
 * Para executar SQL direto, precisamos usar o Management API ou uma função RPC
 * Como alternativa, vamos tentar usar o Supabase REST API com execução via RPC
 */
async function executeSQL(sql) {
  try {
    // Tentar executar via função RPC (se existir)
    const { data, error } = await supabase.rpc('exec_sql', { sql })
    
    if (error) {
      // Se a função RPC não existir, tentar método alternativo
      throw error
    }
    
    return { success: true, data }
  } catch (error) {
    // Retornar erro para tratamento
    return { success: false, error: error.message }
  }
}

/**
 * Executa SQL usando Management API via fetch
 */
async function executeSQLViaManagementAPI(sql) {
  try {
    // Extrair o project ref da URL do Supabase
    const urlMatch = supabaseUrl.match(/https?:\/\/([^.]+)\.supabase\.co/)
    if (!urlMatch) {
      throw new Error('Não foi possível extrair o project ref da URL do Supabase')
    }
    
    const projectRef = urlMatch[1]
    const managementUrl = `https://api.supabase.com/v1/projects/${projectRef}/database/query`
    
    const response = await fetch(managementUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: sql
      })
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`HTTP ${response.status}: ${errorText}`)
    }
    
    return { success: true, data: await response.json() }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

/**
 * Divide SQL em comandos individuais preservando blocos PL/pgSQL
 */
function parseSQL(sql) {
  const commands = []
  let currentCommand = ''
  let inFunction = false
  let dollarTag = null
  
  const lines = sql.split('\n')
  
  for (const line of lines) {
    // Detectar início de função PL/pgSQL
    if (line.match(/CREATE\s+(OR\s+REPLACE\s+)?FUNCTION/i)) {
      inFunction = true
      // Detectar dollar tag ($$ ou $tag$)
      const dollarMatch = line.match(/\$(\w*)\$/)
      if (dollarMatch) {
        dollarTag = dollarMatch[0]
      }
    }
    
    currentCommand += line + '\n'
    
    // Detectar fim de função PL/pgSQL
    if (inFunction && dollarTag && line.includes(dollarTag)) {
      const endMatch = line.match(new RegExp(`\\${dollarTag}\\s*;?`))
      if (endMatch) {
        inFunction = false
        dollarTag = null
        // Continuar até encontrar o ponto e vírgula
        if (line.trim().endsWith(';')) {
          commands.push(currentCommand.trim())
          currentCommand = ''
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
  console.log('🚀 Iniciando execução das migrações de favoritos...\n')
  
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
        const commandPreview = command.substring(0, 50).replace(/\n/g, ' ') + '...'
        
        console.log(`   [${i + 1}/${commands.length}] Executando: ${commandPreview}`)
        
        // Tentar executar via Management API primeiro
        let result = await executeSQLViaManagementAPI(command)
        
        // Se falhar, tentar via RPC
        if (!result.success) {
          result = await executeSQL(command)
        }
        
        if (result.success) {
          console.log(`   ✅ Comando ${i + 1} executado com sucesso\n`)
        } else {
          // Alguns erros são esperados (ex: IF NOT EXISTS, DROP IF EXISTS)
          const errorLower = result.error.toLowerCase()
          if (
            errorLower.includes('already exists') ||
            errorLower.includes('does not exist') ||
            errorLower.includes('duplicate') ||
            errorLower.includes('function rpc.exec_sql does not exist') ||
            errorLower.includes('function rpc.exec_sql(text) does not exist')
          ) {
            console.log(`   ⚠️  Comando ${i + 1} ignorado (erro esperado): ${result.error}\n`)
          } else {
            console.error(`   ❌ Erro ao executar comando ${i + 1}: ${result.error}\n`)
            console.error('   💡 Se a função exec_sql não existir, você precisará executar manualmente no SQL Editor do Supabase')
            console.error(`   📄 Arquivo: ${migration.path}\n`)
            return false
          }
        }
      }
      
      console.log(`✅ Migração ${migration.name} concluída!\n`)
    } catch (error) {
      console.error(`❌ Erro ao processar migração ${migration.name}:`, error.message)
      console.error(`   📄 Arquivo: ${migration.path}\n`)
      return false
    }
  }
  
  // Verificar se a tabela foi criada
  console.log('🔍 Verificando se a tabela favorites foi criada...')
  
  try {
    const { data, error } = await supabase
      .from('favorites')
      .select('id')
      .limit(1)
    
    if (error) {
      if (error.code === 'PGRST205' || error.message?.includes('does not exist')) {
        console.log('⚠️  A tabela favorites ainda não está disponível no schema cache')
        console.log('   Isso pode levar alguns minutos. Tente novamente em breve.')
        console.log('   Ou recarregue o schema cache no painel do Supabase.\n')
      } else {
        console.error('❌ Erro ao verificar tabela:', error.message)
        return false
      }
    } else {
      console.log('✅ Tabela favorites encontrada e acessível!\n')
    }
  } catch (error) {
    console.log('⚠️  Não foi possível verificar a tabela:', error.message)
  }
  
  console.log('🎉 Processo de migração concluído!')
  console.log('\n📋 Próximos passos:')
  console.log('   1. Se a tabela não aparecer imediatamente, aguarde alguns minutos')
  console.log('   2. Recarregue o schema cache no painel do Supabase (Settings > API > Reload)')
  console.log('   3. Teste o sistema de favoritos no aplicativo\n')
  
  return true
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
