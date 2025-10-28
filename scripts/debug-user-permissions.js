const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Variáveis de ambiente do Supabase não encontradas!')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function debugUserPermissions() {
  console.log('🔍 Debugando permissões de usuários...\n')

  try {
    // 1. Listar todos os usuários
    console.log('1️⃣ Listando usuários...')
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select(`
        id,
        email,
        name,
        user_roles (
          role_id,
          roles (
            name,
            permissions
          )
        )
      `)
      .order('email')

    if (usersError) {
      console.error('❌ Erro ao buscar usuários:', usersError.message)
      return
    }

    console.log(`✅ ${users?.length || 0} usuários encontrados:`)
    
    users?.forEach((user, index) => {
      console.log(`\n--- Usuário ${index + 1} ---`)
      console.log(`ID: ${user.id}`)
      console.log(`Email: ${user.email}`)
      console.log(`Nome: ${user.name || 'N/A'}`)
      
      if (user.user_roles && user.user_roles.length > 0) {
        console.log('Roles:')
        user.user_roles.forEach((ur, roleIndex) => {
          console.log(`  ${roleIndex + 1}. ${ur.roles?.name || 'N/A'} (ID: ${ur.role_id})`)
          if (ur.roles?.permissions) {
            console.log(`     Permissões: ${ur.roles.permissions.length} encontradas`)
            ur.roles.permissions.forEach((perm, permIndex) => {
              console.log(`       ${permIndex + 1}. ${perm}`)
            })
          } else {
            console.log('     Permissões: Nenhuma encontrada')
          }
        })
      } else {
        console.log('Roles: Nenhuma role encontrada')
      }
    })

    // 2. Verificar roles disponíveis
    console.log('\n2️⃣ Verificando roles disponíveis...')
    const { data: roles, error: rolesError } = await supabase
      .from('roles')
      .select('id, name, permissions')
      .order('name')

    if (rolesError) {
      console.error('❌ Erro ao buscar roles:', rolesError.message)
    } else {
      console.log(`✅ ${roles?.length || 0} roles encontradas:`)
      roles?.forEach(role => {
        console.log(`  • ${role.name} (ID: ${role.id}) - ${role.permissions?.length || 0} permissões`)
      })
    }

    // 3. Verificar usuários sem roles
    console.log('\n3️⃣ Verificando usuários sem roles...')
    const usersWithoutRoles = users?.filter(user => !user.user_roles || user.user_roles.length === 0)
    
    if (usersWithoutRoles && usersWithoutRoles.length > 0) {
      console.log(`⚠️ ${usersWithoutRoles.length} usuários sem roles:`)
      usersWithoutRoles.forEach(user => {
        console.log(`  • ${user.email} (ID: ${user.id})`)
      })
    } else {
      console.log('✅ Todos os usuários têm roles atribuídas')
    }

    // 4. Verificar roles com permissões vazias
    console.log('\n4️⃣ Verificando roles com permissões vazias...')
    const rolesWithoutPermissions = roles?.filter(role => !role.permissions || role.permissions.length === 0)
    
    if (rolesWithoutPermissions && rolesWithoutPermissions.length > 0) {
      console.log(`⚠️ ${rolesWithoutPermissions.length} roles sem permissões:`)
      rolesWithoutPermissions.forEach(role => {
        console.log(`  • ${role.name} (ID: ${role.id})`)
      })
    } else {
      console.log('✅ Todas as roles têm permissões')
    }

    console.log('\n🎉 Debug concluído!')

  } catch (error) {
    console.error('❌ Erro durante o debug:', error.message)
  }
}

debugUserPermissions()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Erro no debug:', error)
    process.exit(1)
  })