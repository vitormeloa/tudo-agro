import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

// Carregar variáveis de ambiente
config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Variáveis de ambiente do Supabase não encontradas!')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testConnection() {
  console.log('🔍 Testando conexão com o Supabase...')
  console.log(`URL: ${supabaseUrl}`)
  console.log(`Key: ${supabaseAnonKey.substring(0, 20)}...`)
  console.log('')
  
  try {
    // Testar conexão básica
    console.log('1. Testando conexão básica...')
    const { data, error } = await supabase.from('users').select('count').limit(1)
    
    if (error) {
      if (error.message.includes('relation "users" does not exist')) {
        console.log('❌ Tabela "users" não existe!')
        console.log('   Execute o script SQL no painel do Supabase primeiro.')
        console.log('   Veja o arquivo DATABASE_SETUP.md para instruções.')
        return
      } else {
        console.log('❌ Erro na conexão:', error.message)
        return
      }
    }
    
    console.log('✅ Conexão básica funcionando!')
    
    // Testar autenticação
    console.log('2. Testando autenticação...')
    const { data: authData, error: authError } = await supabase.auth.getSession()
    
    if (authError) {
      console.log('⚠️  Erro na autenticação:', authError.message)
    } else {
      console.log('✅ Autenticação funcionando!')
      if (authData.session) {
        console.log(`   Usuário logado: ${authData.session.user.email}`)
      } else {
        console.log('   Nenhum usuário logado')
      }
    }
    
    // Testar roles
    console.log('3. Testando tabela de roles...')
    const { data: roles, error: rolesError } = await supabase
      .from('roles')
      .select('name, description')
      .limit(5)
    
    if (rolesError) {
      console.log('❌ Erro ao acessar roles:', rolesError.message)
    } else {
      console.log('✅ Tabela de roles funcionando!')
      console.log('   Roles encontradas:', roles.map(r => r.name).join(', '))
    }
    
    console.log('')
    console.log('🎉 Teste de conexão concluído!')
    console.log('   O sistema está pronto para uso.')
    
  } catch (error) {
    console.error('❌ Erro durante o teste:', error.message)
  }
}

testConnection()