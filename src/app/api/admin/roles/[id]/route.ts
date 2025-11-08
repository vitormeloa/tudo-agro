import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { withPermissionGuard } from '@/lib/permission-guard'

async function getRole(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { data: role, error } = await supabase
      .from('roles')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Role não encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json({ role })
  } catch (error) {
    console.error('Error fetching role:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

async function updateRole(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { name, description, permissions } = await request.json()

    if (!name || !permissions || !Array.isArray(permissions)) {
      return NextResponse.json(
        { error: 'Dados inválidos' },
        { status: 400 }
      )
    }

    const { data: existingRole } = await supabase
      .from('roles')
      .select('id')
      .eq('id', params.id)
      .single()

    if (!existingRole) {
      return NextResponse.json(
        { error: 'Role não encontrada' },
        { status: 404 }
      )
    }

    const { data: conflictingRole } = await supabase
      .from('roles')
      .select('id')
      .eq('name', name)
      .neq('id', params.id)
      .single()

    if (conflictingRole) {
      return NextResponse.json(
        { error: 'Nome da role já existe' },
        { status: 400 }
      )
    }

    const { data: updatedRole, error } = await supabase
      .from('roles')
      .update({
        name,
        description,
        permissions
      })
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Erro ao atualizar role' },
        { status: 500 }
      )
    }

    return NextResponse.json({ role: updatedRole })
  } catch (error) {
    console.error('Error updating role:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

async function deleteRole(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { data: existingRole } = await supabase
      .from('roles')
      .select('id')
      .eq('id', params.id)
      .single()

    if (!existingRole) {
      return NextResponse.json(
        { error: 'Role não encontrada' },
        { status: 404 }
      )
    }

    const { data: userRoles } = await supabase
      .from('user_roles')
      .select('id')
      .eq('role_id', params.id)
      .limit(1)

    if (userRoles && userRoles.length > 0) {
      return NextResponse.json(
        { error: 'Não é possível excluir role que possui usuários associados' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('roles')
      .delete()
      .eq('id', params.id)

    if (error) {
      return NextResponse.json(
        { error: 'Erro ao excluir role' },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: 'Role excluída com sucesso' })
  } catch (error) {
    console.error('Error deleting role:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export const GET = withPermissionGuard(getRole, {
  requiredPermissions: ['role:read']
})

export const PUT = withPermissionGuard(updateRole, {
  requiredPermissions: ['role:write']
})

export const DELETE = withPermissionGuard(deleteRole, {
  requiredPermissions: ['role:delete']
})