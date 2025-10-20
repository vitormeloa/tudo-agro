import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { z } from 'zod'

const signinSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória')
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = signinSchema.parse(body)

    // Fazer login no Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: validatedData.email,
      password: validatedData.password
    })

    if (authError) {
      return NextResponse.json(
        { error: 'Email ou senha incorretos' },
        { status: 401 }
      )
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: 'Erro ao fazer login' },
        { status: 400 }
      )
    }

    // Buscar dados do usuário com roles
    const { data: userData, error: userError } = await supabase
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
      .eq('id', authData.user.id)
      .single()

    if (userError || !userData) {
      return NextResponse.json(
        { error: 'Erro ao buscar dados do usuário' },
        { status: 400 }
      )
    }

    // Extrair roles e permissões
    const roles = userData.user_roles?.map((ur: any) => ur.roles?.name).filter(Boolean) || []
    const permissions = userData.user_roles?.flatMap((ur: any) => ur.roles?.permissions || []) || []

    return NextResponse.json({
      message: 'Login realizado com sucesso',
      user: {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        phone: userData.phone,
        cpf: userData.cpf,
        cnpj: userData.cnpj,
        avatar_url: userData.avatar_url,
        roles,
        permissions
      },
      session: authData.session
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Signin error:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}