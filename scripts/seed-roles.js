const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Variáveis de ambiente não encontradas')
  console.error('Certifique-se de que NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY estão definidas no .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Definir as roles iniciais com permissões específicas
const initialRoles = [
  {
    name: 'admin',
    description: 'Administrador com acesso total ao sistema',
    permissions: [
      // Dashboard
      'dashboard:read',
      
      // Usuários - Acesso total
      'user:read', 'user:write', 'user:delete', 'user:approve', 'user:suspend',
      
      // Vendedores - Acesso total
      'seller:read', 'seller:write', 'seller:delete', 'seller:approve', 'seller:reject',
      
      // Anúncios - Acesso total
      'ad:read', 'ad:write', 'ad:delete', 'ad:moderate', 'ad:feature', 'ad:approve', 'ad:reject', 'ad:pause', 'ad:request',
      
      // Produtos - Acesso total
      'product:read', 'product:write', 'product:delete', 'product:manage',
      
      // Animais - Acesso total
      'animal:read', 'animal:write', 'animal:delete', 'animal:manage', 'animal:offer', 'animal:purchase',
      
      // Leilões - Acesso total
      'auction:read', 'auction:write', 'auction:delete', 'auction:moderate', 'auction:manage',
      
      // Transações - Acesso total
      'transaction:read', 'transaction:write', 'transaction:delete', 'transaction:refund', 'transaction:dispute',
      
      // Documentos KYC - Acesso total
      'document:read', 'document:write', 'document:delete', 'document:verify', 'document:reject',
      
      // Cashback - Acesso total
      'cashback:read', 'cashback:write', 'cashback:delete', 'cashback:approve', 'cashback:reject',
      
      // Planos VIP - Acesso total
      'vip:read', 'vip:write', 'vip:delete', 'vip:manage',
      
      // Academy/IA - Acesso total
      'academy:read', 'academy:write', 'academy:delete', 'academy:moderate',
      
      // Mensagens e Suporte - Acesso total
      'message:read', 'message:write', 'message:delete', 'message:moderate',
      'support:read', 'support:write', 'support:delete', 'support:assign', 'support:resolve',
      
      // Funções e Permissões - Acesso total
      'role:read', 'role:write', 'role:delete',
      'permission:read', 'permission:write', 'permission:delete',
      
      // Configurações - Acesso total
      'config:read', 'config:write',
      'setting:read', 'setting:write',
      
      // Relatórios e Analytics - Acesso total
      'report:read', 'report:export',
      'analytics:read', 'analytics:export',
      
      // Notificações - Acesso total
      'notification:read', 'notification:write', 'notification:delete', 'notification:send',
      
      // Auditoria e Logs - Acesso total
      'audit:read', 'audit:export',
      'log:read', 'log:export'
    ]
  },
  {
    name: 'vendedor',
    description: 'Vendedor com permissões para gerenciar produtos e leilões',
    permissions: [
      // Dashboard - Acesso básico
      'dashboard:read',
      
      // Anúncios - Gerenciar próprios e solicitar destaque
      'ad:read', 'ad:write', 'ad:delete', 'ad:request',
      
      // Produtos - Gerenciar próprios
      'product:read', 'product:write', 'product:delete', 'product:manage',
      
      // Animais - Gerenciar próprios e comprar
      'animal:read', 'animal:write', 'animal:delete', 'animal:manage', 'animal:offer', 'animal:purchase',
      
      // Leilões - Participar e gerenciar
      'auction:read', 'auction:write', 'auction:delete',
      
      // Transações - Relacionadas às vendas
      'transaction:read', 'transaction:write',
      
      // Mensagens - Comunicar com compradores
      'message:read', 'message:write',
      
      // Suporte - Acesso básico
      'support:read', 'support:write',
      
      // Cashback - Visualizar próprio
      'cashback:read',
      
      // VIP - Visualizar planos
      'vip:read',
      
      // Academy - Acesso ao conteúdo
      'academy:read'
    ]
  },
  {
    name: 'comprador',
    description: 'Comprador com permissões para visualizar e comprar',
    permissions: [
      // Dashboard - Acesso básico
      'dashboard:read',
      
      // Anúncios - Apenas visualizar
      'ad:read',
      
      // Produtos - Visualizar e comprar
      'product:read',
      
      // Animais - Visualizar, ofertar e comprar
      'animal:read', 'animal:offer', 'animal:purchase',
      
      // Leilões - Participar
      'auction:read',
      
      // Transações - Próprias compras
      'transaction:read', 'transaction:write',
      
      // Mensagens - Comunicar com vendedores
      'message:read', 'message:write',
      
      // Suporte - Acesso básico
      'support:read', 'support:write',
      
      // Cashback - Visualizar próprio
      'cashback:read',
      
      // VIP - Visualizar planos
      'vip:read',
      
      // Academy - Acesso ao conteúdo
      'academy:read'
    ]
  }
]

async function seedRoles() {
  try {
    console.log('🌱 Iniciando seed de roles...')
    
    for (const roleData of initialRoles) {
      console.log(`📝 Processando role: ${roleData.name}`)
      
      // Verificar se a role já existe
      const { data: existingRole, error: checkError } = await supabase
        .from('roles')
        .select('id')
        .eq('name', roleData.name)
        .single()
      
      if (checkError && checkError.code !== 'PGRST116') {
        console.error(`❌ Erro ao verificar role ${roleData.name}:`, checkError)
        continue
      }
      
      if (existingRole) {
        console.log(`⚠️  Role ${roleData.name} já existe, atualizando...`)
        
        // Atualizar role existente
        const { error: updateError } = await supabase
          .from('roles')
          .update({
            description: roleData.description,
            permissions: roleData.permissions,
            updated_at: new Date().toISOString()
          })
          .eq('name', roleData.name)
        
        if (updateError) {
          console.error(`❌ Erro ao atualizar role ${roleData.name}:`, updateError)
        } else {
          console.log(`✅ Role ${roleData.name} atualizada com sucesso`)
        }
      } else {
        // Criar nova role
        const { error: insertError } = await supabase
          .from('roles')
          .insert({
            name: roleData.name,
            description: roleData.description,
            permissions: roleData.permissions,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
        
        if (insertError) {
          console.error(`❌ Erro ao criar role ${roleData.name}:`, insertError)
        } else {
          console.log(`✅ Role ${roleData.name} criada com sucesso`)
        }
      }
    }
    
    console.log('🎉 Seed de roles concluído!')
    
    // Listar roles criadas
    const { data: roles, error: listError } = await supabase
      .from('roles')
      .select('name, description, permissions')
      .order('name')
    
    if (listError) {
      console.error('❌ Erro ao listar roles:', listError)
    } else {
      console.log('\n📋 Roles disponíveis:')
      roles.forEach(role => {
        console.log(`  • ${role.name}: ${role.description} (${role.permissions.length} permissões)`)
      })
    }
    
  } catch (error) {
    console.error('❌ Erro durante o seed:', error)
  }
}

// Executar o seed
seedRoles()