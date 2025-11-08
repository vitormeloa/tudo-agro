import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { z } from 'zod'

const auctionSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().optional(),
  start_date: z.string().datetime('Data de início inválida'),
  end_date: z.string().datetime('Data de fim inválida'),
  starting_bid: z.number().positive('Lance inicial deve ser positivo'),
  product_id: z.string().uuid('ID do produto inválido')
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    let query = supabase
      .from('auctions')
      .select(`
        *,
        products (
          id,
          title,
          category,
          breed,
          gender,
          age,
          weight,
          product_images (
            id,
            url,
            alt,
            "order"
          )
        ),
        users (
          id,
          name,
          avatar_url
        ),
        bids (
          id,
          amount,
          user_id,
          created_at,
          users (
            id,
            name
          )
        )
      `)

    if (status) {
      query = query.eq('status', status)
    } else {
      query = query.in('status', ['active', 'scheduled'])
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`)
    }

    const from = (page - 1) * limit
    const to = from + limit - 1

    const { data: auctions, error, count } = await query
      .order('start_date', { ascending: true })
      .range(from, to)

    if (error) {
      return NextResponse.json(
        { error: 'Erro ao buscar leilões' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      auctions,
      pagination: {
        page,
        limit,
        total: count || 0,
        pages: Math.ceil((count || 0) / limit)
      }
    })

  } catch (error) {
    console.error('Get auctions error:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = auctionSchema.parse(body)

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Usuário não autenticado' },
        { status: 401 }
      )
    }

    const { data: userRoles } = await supabase
      .from('user_roles')
      .select(`
        roles (
          permissions
        )
      `)
      .eq('user_id', user.id)

    const hasPermission = userRoles?.some((ur: any) => 
      ur.roles?.permissions?.includes('auction:write')
    )

    if (!hasPermission) {
      return NextResponse.json(
        { error: 'Usuário não tem permissão para criar leilões' },
        { status: 403 }
      )
    }

    const { data: product, error: productError } = await supabase
      .from('products')
      .select('id, user_id')
      .eq('id', validatedData.product_id)
      .single()

    if (productError || !product) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      )
    }

    if (product.user_id !== user.id) {
      return NextResponse.json(
        { error: 'Produto não pertence ao usuário' },
        { status: 403 }
      )
    }

    const { data: existingAuction } = await supabase
      .from('auctions')
      .select('id')
      .eq('product_id', validatedData.product_id)
      .in('status', ['scheduled', 'active'])
      .single()

    if (existingAuction) {
      return NextResponse.json(
        { error: 'Já existe um leilão ativo para este produto' },
        { status: 400 }
      )
    }

    const { data: auction, error: auctionError } = await supabase
      .from('auctions')
      .insert({
        ...validatedData,
        user_id: user.id
      })
      .select(`
        *,
        products (
          id,
          title,
          category,
          breed,
          gender,
          age,
          weight,
          product_images (
            id,
            url,
            alt,
            "order"
          )
        ),
        users (
          id,
          name,
          avatar_url
        )
      `)
      .single()

    if (auctionError) {
      return NextResponse.json(
        { error: 'Erro ao criar leilão' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      message: 'Leilão criado com sucesso',
      auction
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Create auction error:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}