import { NextRequest, NextResponse } from 'next/server'
import { getUserPermissions } from '@/lib/permission-guard'
import { hasRole } from '@/lib/permission-utils'

export async function POST(request: NextRequest) {
  try {
    const { role } = await request.json()
    
    if (!role) {
      return NextResponse.json(
        { error: 'Role não fornecida' },
        { status: 400 }
      )
    }

    const userPermissions = await getUserPermissions(request)
    
    if (!userPermissions) {
      return NextResponse.json(
        { hasRole: false },
        { status: 200 }
      )
    }

    const hasAccess = hasRole(userPermissions, role)
    
    return NextResponse.json({
      hasRole: hasAccess
    })

  } catch (error) {
    console.error('Error checking role:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}