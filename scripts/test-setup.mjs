import { createClient } from '@supabase/supabase-js'
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

async function testSetup() {
  console.log('🧪 Testando setup automático...\n')
  
  try {
    // 1. Verificar roles
    console.log('1️⃣ Verificando roles...')
    const { data: roles, error: rolesError } = await supabase
      .from('roles')
      .select('name, description, permissions')
      .order('name')
    
    if (rolesError) {
      console.error('❌ Erro ao buscar roles:', rolesError.message)
      return
    }
    
    console.log(`✅ ${roles?.length || 0} roles encontradas:`)
    roles?.forEach(role => {
      console.log(`   • ${role.name}: ${role.description} (${role.permissions?.length || 0} permissões)`)
    })
    
    // 2. Verificar usuário admin
    console.log('\n2️⃣ Verificando usuário admin...')
    const { data: admin, error: adminError } = await supabase
      .from('users')
      .select(`
        id,
        email,
        name,
        user_roles (
          roles (
            name
          )
        )
      `)
      .eq('email', 'admin@tudoagro.com')
      .single()
    
    if (adminError) {
      console.log('⚠️ Usuário admin não encontrado')
    } else {
      console.log('✅ Usuário admin encontrado:')
      console.log(`   • Nome: ${admin.name}`)
      console.log(`   • Email: ${admin.email}`)
      console.log(`   • Roles: ${admin.user_roles?.map(ur => ur.roles?.name).filter(Boolean).join(', ') || 'Nenhuma'}`)
    }
    
    // 3. Verificar total de usuários
    console.log('\n3️⃣ Verificando total de usuários...')
    const { count: userCount, error: countError } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
    
    if (countError) {
      console.error('❌ Erro ao contar usuários:', countError.message)
    } else {
      console.log(`✅ Total de usuários: ${userCount || 0}`)
    }
    
    // 4. Verificar permissões por role
    console.log('\n4️⃣ Verificando permissões por role...')
    roles?.forEach(role => {
      const permissionCount = role.permissions?.length || 0
      console.log(`   • ${role.name}: ${permissionCount} permissões`)
    })
    
    console.log('\n🎉 Teste concluído!')
    
  } catch (error) {
    console.error('❌ Erro durante o teste:', error.message)
  }
}

// Executar teste
testSetup()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Erro no teste:', error)
    process.exit(1)
  })