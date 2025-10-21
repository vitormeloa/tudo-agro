import { createClient } from '@supabase/supabase-js'
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

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupDatabase() {
  console.log('🚀 Iniciando configuração do banco de dados...')
  
  try {
    // Ler o arquivo SQL
    const sqlContent = readFileSync('supabase-schema.sql', 'utf8')
    
    // Dividir o SQL em comandos individuais
    const commands = sqlContent
      .split(';')
      .map(cmd => cmd.trim())
      .filter(cmd => cmd.length > 0 && !cmd.startsWith('--'))
    
    console.log(`📝 Executando ${commands.length} comandos SQL...`)
    
    let successCount = 0
    for (let i = 0; i < commands.length; i++) {
      const command = commands[i]
      if (command.trim()) {
        try {
          // Usar a função SQL direta
          const { data, error } = await supabase.rpc('exec_sql', { 
            sql: command 
          })
          
          if (error) {
            console.log(`⚠️  Comando ${i + 1} executado com aviso:`, error.message)
          } else {
            console.log(`✅ Comando ${i + 1} executado com sucesso`)
            successCount++
          }
        } catch (err) {
          console.log(`⚠️  Comando ${i + 1} falhou:`, err.message)
        }
      }
    }
    
    console.log(`🎉 Configuração concluída! ${successCount}/${commands.length} comandos executados com sucesso.`)
    
    // Verificar se as tabelas foram criadas
    console.log('\n📊 Verificando tabelas criadas...')
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
    
    if (tablesError) {
      console.log('❌ Erro ao verificar tabelas:', tablesError.message)
    } else {
      console.log('✅ Tabelas encontradas:', tables.map(t => t.table_name).join(', '))
    }
    
  } catch (error) {
    console.error('❌ Erro durante a configuração:', error.message)
    process.exit(1)
  }
}

setupDatabase()