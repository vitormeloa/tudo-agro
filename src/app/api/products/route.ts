import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { z } from 'zod'

const productSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().optional(),
  category: z.string().min(1, 'Categoria é obrigatória'),
  breed: z.string().optional(),
  gender: z.string().optional(),
  age: z.string().optional(),
  weight: z.number().positive().optional(),
  price: z.number().positive().optional(),
  negotiable: z.boolean().default(false),
  featured: z.boolean().default(false),
  images: z.array(z.string().url()).optional(),
  addresses: z.array(z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zip_code: z.string(),
    country: z.string().default('Brasil'),
    is_default: z.boolean().default(false)
  })).optional()
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const featured = searchParams.get('featured')
    const minPrice = searchParams.get('min_price')
    const maxPrice = searchParams.get('max_price')

    let query = supabase
      .from('products')
      .select(`
        *,
        users (
          id,
          name,
          avatar_url
        ),
        product_images (
          id,
          url,
          alt,
          "order"
        ),
        addresses (
          id,
          city,
          state,
          is_default
        )
      `)
      .eq('status', 'active')

    if (category) {
      query = query.eq('category', category)
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`)
    }

    if (featured === 'true') {
      query = query.eq('featured', true)
    }

    if (minPrice) {
      query = query.gte('price', minPrice)
    }

    if (maxPrice) {
      query = query.lte('price', maxPrice)
    }

    const from = (page - 1) * limit
    const to = from + limit - 1

    const { data: products, error, count } = await query
      .order('created_at', { ascending: false })
      .range(from, to)

    if (error) {
      return NextResponse.json(
        { error: 'Erro ao buscar produtos' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total: count || 0,
        pages: Math.ceil((count || 0) / limit)
      }
    })

  } catch (error) {
    console.error('Get products error:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = productSchema.parse(body)

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
      ur.roles?.permissions?.includes('product:write')
    )

    if (!hasPermission) {
      return NextResponse.json(
        { error: 'Usuário não tem permissão para criar produtos' },
        { status: 403 }
      )
    }

    const { data: product, error: productError } = await supabase
      .from('products')
      .insert({
        ...validatedData,
        user_id: user.id
      })
      .select()
      .single()

    if (productError) {
      return NextResponse.json(
        { error: 'Erro ao criar produto' },
        { status: 400 }
      )
    }

    if (validatedData.images && validatedData.images.length > 0) {
      const imageInserts = validatedData.images.map((url, index) => ({
        url,
        product_id: product.id,
        order: index
      }))

      await supabase
        .from('product_images')
        .insert(imageInserts)
    }

    if (validatedData.addresses && validatedData.addresses.length > 0) {
      const addressInserts = validatedData.addresses.map(address => ({
        ...address,
        user_id: user.id,
        product_id: product.id
      }))

      await supabase
        .from('addresses')
        .insert(addressInserts)
    }

    return NextResponse.json({
      message: 'Produto criado com sucesso',
      product
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Create product error:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}