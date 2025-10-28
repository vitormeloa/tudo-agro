import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { withPermissionGuard } from '@/lib/permission-guard'

// GET - Listar usuários
async function getUsers(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const search = searchParams.get('search') || ''

    let query = supabase
      .from('users')
      .select(`
        id,
        email,
        name,
        phone,
        cpf,
        cnpj,
        created_at,
        user_roles (
          roles (
            id,
            name
          )
        )
      `)
      .order('created_at', { ascending: false })

    // Aplicar filtro de busca
    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`)
    }

    // Aplicar paginação
    const from = (page - 1) * limit
    const to = from + limit - 1
    query = query.range(from, to)

    const { data: users, error } = await query

    if (error) {
      return NextResponse.json(
        { error: 'Erro ao buscar usuários' },
        { status: 500 }
      )
    }

    // Transformar dados para incluir roles como array simples
    const transformedUsers = users?.map(user => ({
      ...user,
      roles: user.user_roles?.map((ur: any) => ur.roles?.name).filter(Boolean) || []
    })) || []

    return NextResponse.json({ 
      users: transformedUsers,
      pagination: {
        page,
        limit,
        total: transformedUsers.length
      }
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// Handler principal - temporariamente sem guard para debug
export const GET = getUsers