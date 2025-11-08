import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { withPermissionGuard } from '@/lib/permission-guard'

async function getUserRoles(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'ID do usuário não fornecido' },
        { status: 400 }
      )
    }

    const { data: userRoles, error } = await supabase
      .from('user_roles')
      .select(`
        id,
        user_id,
        role_id,
        roles (
          id,
          name,
          description,
          permissions
        )
      `)
      .eq('user_id', userId)

    if (error) {
      return NextResponse.json(
        { error: 'Erro ao buscar roles do usuário' },
        { status: 500 }
      )
    }

    return NextResponse.json({ userRoles })
  } catch (error) {
    console.error('Error fetching user roles:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

async function assignRole(request: NextRequest) {
  try {
    const { userId, roleId } = await request.json()

    if (!userId || !roleId) {
      return NextResponse.json(
        { error: 'Dados inválidos' },
        { status: 400 }
      )
    }

    const { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('id', userId)
      .single()

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      )
    }

    const { data: role } = await supabase
      .from('roles')
      .select('id')
      .eq('id', roleId)
      .single()

    if (!role) {
      return NextResponse.json(
        { error: 'Role não encontrada' },
        { status: 404 }
      )
    }

    const { data: existingAssignment } = await supabase
      .from('user_roles')
      .select('id')
      .eq('user_id', userId)
      .eq('role_id', roleId)
      .single()

    if (existingAssignment) {
      return NextResponse.json(
        { error: 'Usuário já possui esta role' },
        { status: 400 }
      )
    }

    const { data: newAssignment, error } = await supabase
      .from('user_roles')
      .insert({
        user_id: userId,
        role_id: roleId
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Erro ao atribuir role' },
        { status: 500 }
      )
    }

    return NextResponse.json({ assignment: newAssignment }, { status: 201 })
  } catch (error) {
    console.error('Error assigning role:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

async function removeRole(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const roleId = searchParams.get('roleId')

    if (!userId || !roleId) {
      return NextResponse.json(
        { error: 'Dados inválidos' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('user_roles')
      .delete()
      .eq('user_id', userId)
      .eq('role_id', roleId)

    if (error) {
      return NextResponse.json(
        { error: 'Erro ao remover role' },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: 'Role removida com sucesso' })
  } catch (error) {
    console.error('Error removing role:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export const GET = withPermissionGuard(getUserRoles, {
  requiredPermissions: ['user:read']
})

export const POST = withPermissionGuard(assignRole, {
  requiredPermissions: ['user:write']
})

export const DELETE = withPermissionGuard(removeRole, {
  requiredPermissions: ['user:write']
})