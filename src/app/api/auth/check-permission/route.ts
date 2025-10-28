import { NextRequest, NextResponse } from 'next/server'
import { getUserPermissions } from '@/lib/permission-guard'
import { hasPermission } from '@/lib/permission-utils'
import { Permission } from '@/lib/permissions'

export async function POST(request: NextRequest) {
  try {
    const { permission } = await request.json()
    
    if (!permission) {
      return NextResponse.json(
        { error: 'Permissão não fornecida' },
        { status: 400 }
      )
    }

    const userPermissions = await getUserPermissions(request)
    
    if (!userPermissions) {
      return NextResponse.json(
        { hasPermission: false },
        { status: 200 }
      )
    }

    const hasAccess = hasPermission(userPermissions, permission as Permission)
    
    return NextResponse.json({
      hasPermission: hasAccess
    })

  } catch (error) {
    console.error('Error checking permission:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}