import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { z } from 'zod'

const signupSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  phone: z.string().optional(),
  cpf: z.string().optional(),
  cnpj: z.string().optional(),
  roles: z.array(z.string()).default(['comprador'])
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = signupSchema.parse(body)

    // Criar usuário no Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: validatedData.email,
      password: validatedData.password,
      options: {
        data: {
          name: validatedData.name,
          phone: validatedData.phone,
          cpf: validatedData.cpf,
          cnpj: validatedData.cnpj
        }
      }
    })

    if (authError) {
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      )
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: 'Erro ao criar usuário' },
        { status: 400 }
      )
    }

    // Criar perfil do usuário na tabela users
    const { error: profileError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        email: validatedData.email,
        name: validatedData.name,
        phone: validatedData.phone,
        cpf: validatedData.cpf,
        cnpj: validatedData.cnpj
      })

    if (profileError) {
      return NextResponse.json(
        { error: 'Erro ao criar perfil do usuário' },
        { status: 400 }
      )
    }

    // Atribuir roles ao usuário
    if (validatedData.roles.length > 0) {
      const { data: roles } = await supabase
        .from('roles')
        .select('id')
        .in('name', validatedData.roles)

      if (roles && roles.length > 0) {
        const userRoles = roles.map(role => ({
          user_id: authData.user!.id,
          role_id: role.id
        }))

        await supabase
          .from('user_roles')
          .insert(userRoles)
      }
    }

    return NextResponse.json({
      message: 'Usuário criado com sucesso',
      user: {
        id: authData.user.id,
        email: authData.user.email,
        name: validatedData.name
      }
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}