const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Variáveis de ambiente não encontradas')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function debugUsersRoles() {
  console.log('🔍 Verificando usuários e roles...\n')

  try {
    // Buscar usuários com suas roles
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select(`
        id,
        email,
        name,
        user_roles (
          roles (
            id,
            name
          )
        )
      `)

    if (usersError) {
      console.error('❌ Erro ao buscar usuários:', usersError)
      return
    }

    console.log(`📊 Total de usuários encontrados: ${users?.length || 0}\n`)

    if (users && users.length > 0) {
      users.forEach((user, index) => {
        console.log(`👤 Usuário ${index + 1}:`)
        console.log(`   ID: ${user.id}`)
        console.log(`   Nome: ${user.name}`)
        console.log(`   Email: ${user.email}`)
        console.log(`   Roles: ${user.user_roles?.map(ur => ur.roles?.name).filter(Boolean).join(', ') || 'Nenhuma'}`)
        console.log('')
      })
    }

    // Buscar todas as roles
    const { data: roles, error: rolesError } = await supabase
      .from('roles')
      .select('id, name')

    if (rolesError) {
      console.error('❌ Erro ao buscar roles:', rolesError)
      return
    }

    console.log(`📋 Total de roles encontradas: ${roles?.length || 0}\n`)

    if (roles && roles.length > 0) {
      roles.forEach((role, index) => {
        console.log(`🔑 Role ${index + 1}:`)
        console.log(`   ID: ${role.id}`)
        console.log(`   Nome: ${role.name}`)
        console.log('')
      })
    }

    // Contar usuários por role
    console.log('📈 Contagem de usuários por role:')
    if (roles && users) {
      roles.forEach(role => {
        const count = users.filter(user => 
          user.user_roles?.some(ur => ur.roles?.name === role.name)
        ).length
        console.log(`   ${role.name}: ${count} usuários`)
      })
    }

  } catch (error) {
    console.error('❌ Erro geral:', error)
  }
}

debugUsersRoles()