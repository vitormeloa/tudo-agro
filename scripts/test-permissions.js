const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Variáveis de ambiente do Supabase não encontradas!')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function testPermissions() {
  console.log('🧪 Testando carregamento de permissões...\n')

  try {
    // Simular o carregamento de um usuário comprador
    const { data: userData, error } = await supabase
      .from('users')
      .select(`
        *,
        user_roles (
          role_id,
          roles (
            name,
            permissions
          )
        )
      `)
      .eq('email', 'comprador@tudoagro.com')
      .single()

    if (error) {
      console.error('❌ Erro ao buscar usuário:', error.message)
      return
    }

    if (!userData) {
      console.log('⚠️ Usuário não encontrado')
      return
    }

    console.log('✅ Usuário encontrado:', userData.email)
    console.log('📊 Dados brutos do usuário:')
    console.log(JSON.stringify(userData, null, 2))

    // Simular a extração de roles e permissões como no código
    const roles = userData.user_roles?.map((ur) => ur.roles?.name).filter(Boolean) || []
    const permissions = userData.user_roles?.flatMap((ur) => ur.roles?.permissions || []) || []

    console.log('\n🔍 Dados extraídos:')
    console.log('Roles:', roles)
    console.log('Permissions:', permissions)
    console.log('Roles length:', roles.length)
    console.log('Permissions length:', permissions.length)

    // Simular a criação do objeto UserPermissions
    const userPermissions = {
      permissions: permissions || [],
      roles: roles || []
    }

    console.log('\n📋 Objeto UserPermissions:')
    console.log(JSON.stringify(userPermissions, null, 2))

    // Testar as funções de permissão
    console.log('\n🧪 Testando funções de permissão:')
    
    // Simular hasPermission
    const hasPermission = (userPermissions, permission) => {
      if (!userPermissions || !userPermissions.roles || !userPermissions.permissions) {
        console.log(`❌ hasPermission(${permission}): userPermissions inválido`)
        return false
      }
      
      if (userPermissions.roles.includes('admin')) {
        console.log(`✅ hasPermission(${permission}): admin tem todas as permissões`)
        return true
      }
      
      const result = userPermissions.permissions.includes(permission)
      console.log(`${result ? '✅' : '❌'} hasPermission(${permission}): ${result}`)
      return result
    }

    // Testar algumas permissões
    hasPermission(userPermissions, 'dashboard:read')
    hasPermission(userPermissions, 'user:read')
    hasPermission(userPermissions, 'admin:read')

    console.log('\n🎉 Teste concluído!')

  } catch (error) {
    console.error('❌ Erro durante o teste:', error.message)
  }
}

testPermissions()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Erro no teste:', error)
    process.exit(1)
  })