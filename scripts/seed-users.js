const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const testUsers = [
  {
    email: 'admin@tudoagro.com',
    password: '123456',
    name: 'Administrador',
    phone: '(11) 99999-0001',
    cpf: '000.000.000-01',
    roles: ['admin']
  },
  {
    email: 'vendedor@tudoagro.com',
    password: '123456',
    name: 'João Vendedor',
    phone: '(11) 99999-0002',
    cpf: '000.000.000-02',
    roles: ['vendedor']
  },
  {
    email: 'comprador@tudoagro.com',
    password: '123456',
    name: 'Maria Compradora',
    phone: '(11) 99999-0003',
    cpf: '000.000.000-03',
    roles: ['comprador']
  },
  {
    email: 'teste@tudoagro.com',
    password: '123456',
    name: 'Usuário Teste',
    phone: '(11) 99999-0004',
    cpf: '000.000.000-04',
    roles: ['comprador']
  }
]

async function createTestUsers() {
  console.log('🌱 Iniciando criação de usuários de teste...')

  for (const userData of testUsers) {
    try {
      console.log(`\n📝 Criando usuário: ${userData.email}`)

      // Criar usuário no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: userData.email,
        password: userData.password,
        email_confirm: true, // Confirmar email automaticamente
        user_metadata: {
          name: userData.name,
          phone: userData.phone,
          cpf: userData.cpf
        }
      })

      if (authError) {
        console.error(`❌ Erro ao criar usuário ${userData.email}:`, authError.message)
        continue
      }

      console.log(`✅ Usuário ${userData.email} criado no Auth`)

      // Criar perfil na tabela users
      const { error: profileError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id,
          email: userData.email,
          name: userData.name,
          phone: userData.phone,
          cpf: userData.cpf
        })

      if (profileError) {
        console.error(`❌ Erro ao criar perfil para ${userData.email}:`, profileError.message)
        continue
      }

      console.log(`✅ Perfil criado para ${userData.email}`)

      // Atribuir roles
      for (const roleName of userData.roles) {
        const { data: role, error: roleError } = await supabase
          .from('roles')
          .select('id')
          .eq('name', roleName)
          .single()

        if (roleError) {
          console.error(`❌ Erro ao buscar role ${roleName}:`, roleError.message)
          continue
        }

        const { error: userRoleError } = await supabase
          .from('user_roles')
          .insert({
            user_id: authData.user.id,
            role_id: role.id
          })

        if (userRoleError) {
          console.error(`❌ Erro ao atribuir role ${roleName} para ${userData.email}:`, userRoleError.message)
        } else {
          console.log(`✅ Role ${roleName} atribuída para ${userData.email}`)
        }
      }

    } catch (error) {
      console.error(`❌ Erro geral para ${userData.email}:`, error.message)
    }
  }

  console.log('\n🎉 Processo de criação de usuários concluído!')
  console.log('\n📋 Usuários criados:')
  testUsers.forEach(user => {
    console.log(`   • ${user.email} (${user.roles.join(', ')}) - Senha: ${user.password}`)
  })
}

// Executar seeder
createTestUsers()
  .then(() => {
    console.log('\n✅ Seeder executado com sucesso!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Erro ao executar seeder:', error)
    process.exit(1)
  })