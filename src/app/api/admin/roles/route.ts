import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { withPermissionGuard } from '@/lib/permission-guard'
import { Permission } from '@/lib/permissions'

async function getRoles(request: NextRequest) {
  try {
    const { data: roles, error } = await supabase
      .from('roles')
      .select('*')
      .order('name')

    if (error) {
      return NextResponse.json(
        { error: 'Erro ao buscar roles' },
        { status: 500 }
      )
    }

    return NextResponse.json({ roles })
  } catch (error) {
    console.error('Error fetching roles:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

async function createRole(request: NextRequest) {
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
      .eq('name', name)
      .single()

    if (existingRole) {
      return NextResponse.json(
        { error: 'Role já existe' },
        { status: 400 }
      )
    }

    const { data: newRole, error } = await supabase
      .from('roles')
      .insert({
        name,
        description,
        permissions
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Erro ao criar role' },
        { status: 500 }
      )
    }

    return NextResponse.json({ role: newRole }, { status: 201 })
  } catch (error) {
    console.error('Error creating role:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export const GET = getRoles
export const POST = createRole