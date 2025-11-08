import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase credentials')
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const basicRoles = [
  {
    name: 'admin',
    description: 'Administrador com acesso total ao sistema',
    permissions: [
      'dashboard:read',
      'user:read', 'user:write', 'user:delete', 'user:approve', 'user:suspend',
      'seller:read', 'seller:write', 'seller:delete', 'seller:approve', 'seller:reject',
      'ad:read', 'ad:write', 'ad:delete', 'ad:moderate', 'ad:feature', 'ad:approve', 'ad:reject', 'ad:pause', 'ad:request',
      'product:read', 'product:write', 'product:delete', 'product:manage',
      'animal:read', 'animal:write', 'animal:delete', 'animal:manage', 'animal:offer', 'animal:purchase',
      'auction:read', 'auction:write', 'auction:delete', 'auction:moderate', 'auction:manage',
      'transaction:read', 'transaction:write', 'transaction:delete', 'transaction:refund', 'transaction:dispute',
      'document:read', 'document:write', 'document:delete', 'document:verify', 'document:reject',
      'cashback:read', 'cashback:write', 'cashback:delete', 'cashback:approve', 'cashback:reject',
      'vip:read', 'vip:write', 'vip:delete', 'vip:manage',
      'academy:read', 'academy:write', 'academy:delete', 'academy:moderate',
      'message:read', 'message:write', 'message:delete', 'message:moderate',
      'support:read', 'support:write', 'support:delete', 'support:assign', 'support:resolve',
      'role:read', 'role:write', 'role:delete',
      'permission:read', 'permission:write', 'permission:delete',
      'config:read', 'config:write',
      'setting:read', 'setting:write',
      'report:read', 'report:export',
      'analytics:read', 'analytics:export',
      'notification:read', 'notification:write', 'notification:delete', 'notification:send',
      'audit:read', 'audit:export',
      'log:read', 'log:export'
    ]
  },
  {
    name: 'vendedor',
    description: 'Vendedor com permissões para gerenciar produtos e leilões',
    permissions: [
      'dashboard:read',
      'ad:read', 'ad:write', 'ad:delete', 'ad:request',
      'product:read', 'product:write', 'product:delete', 'product:manage',
      'animal:read', 'animal:write', 'animal:delete', 'animal:manage', 'animal:offer', 'animal:purchase',
      'auction:read', 'auction:write', 'auction:delete',
      'transaction:read', 'transaction:write',
      'message:read', 'message:write',
      'support:read', 'support:write',
      'cashback:read',
      'vip:read',
      'academy:read'
    ]
  },
  {
    name: 'comprador',
    description: 'Comprador com permissões para visualizar e comprar',
    permissions: [
      'dashboard:read',
      'ad:read',
      'product:read',
      'animal:read', 'animal:offer', 'animal:purchase',
      'auction:read',
      'transaction:read', 'transaction:write',
      'message:read', 'message:write',
      'support:read', 'support:write',
      'cashback:read',
      'vip:read',
      'academy:read'
    ]
  }
]

export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json()
    
    if (action === 'setup-roles') {
      console.log('🌱 Configurando roles...')
      
      const results = []
      
      for (const roleData of basicRoles) {
        try {
          const { data: existingRole } = await supabase
            .from('roles')
            .select('id')
            .eq('name', roleData.name)
            .single()
          
          if (existingRole) {
            results.push({ role: roleData.name, status: 'exists', message: 'Role já existe' })
            continue
          }
          
          const { error } = await supabase
            .from('roles')
            .insert({
              name: roleData.name,
              description: roleData.description,
              permissions: roleData.permissions,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            })
          
          if (error) {
            results.push({ role: roleData.name, status: 'error', message: error.message })
          } else {
            results.push({ role: roleData.name, status: 'created', message: 'Role criada com sucesso' })
          }
        } catch (error) {
          results.push({ role: roleData.name, status: 'error', message: error.message })
        }
      }
      
      return NextResponse.json({
        success: true,
        message: 'Setup de roles concluído',
        results
      })
    }
    
    if (action === 'check-roles') {
      const { data: roles, error } = await supabase
        .from('roles')
        .select('name, description, permissions')
        .order('name')
      
      if (error) {
        return NextResponse.json({
          success: false,
          message: 'Erro ao verificar roles',
          error: error.message
        })
      }
      
      return NextResponse.json({
        success: true,
        message: 'Roles encontradas',
        roles: roles || []
      })
    }
    
    return NextResponse.json({
      success: false,
      message: 'Ação não reconhecida'
    })
    
  } catch (error) {
    console.error('Erro no setup:', error)
    return NextResponse.json({
      success: false,
      message: 'Erro interno do servidor',
      error: error.message
    })
  }
}

export async function GET() {
  try {
    const { data: roles, error } = await supabase
      .from('roles')
      .select('name, description, permissions')
      .order('name')
    
    if (error) {
      return NextResponse.json({
        success: false,
        message: 'Erro ao verificar roles',
        error: error.message
      })
    }
    
    return NextResponse.json({
      success: true,
      message: 'Roles encontradas',
      roles: roles || []
    })
  } catch (error) {
    console.error('Erro ao verificar roles:', error)
    return NextResponse.json({
      success: false,
      message: 'Erro interno do servidor',
      error: error.message
    })
  }
}