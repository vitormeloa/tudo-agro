import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { z } from 'zod'

const bidSchema = z.object({
  auction_id: z.string().uuid('ID do leilão inválido'),
  amount: z.number().positive('Valor do lance deve ser positivo')
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const auctionId = searchParams.get('auction_id')

    if (!auctionId) {
      return NextResponse.json(
        { error: 'ID do leilão é obrigatório' },
        { status: 400 }
      )
    }

    const { data: bids, error } = await supabase
      .from('bids')
      .select(`
        *,
        users (
          id,
          name,
          avatar_url
        )
      `)
      .eq('auction_id', auctionId)
      .order('amount', { ascending: false })

    if (error) {
      return NextResponse.json(
        { error: 'Erro ao buscar lances' },
        { status: 400 }
      )
    }

    return NextResponse.json({ bids })

  } catch (error) {
    console.error('Get bids error:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = bidSchema.parse(body)

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Usuário não autenticado' },
        { status: 401 }
      )
    }

    const { data: auction, error: auctionError } = await supabase
      .from('auctions')
      .select(`
        *,
        products (
          user_id
        )
      `)
      .eq('id', validatedData.auction_id)
      .single()

    if (auctionError || !auction) {
      return NextResponse.json(
        { error: 'Leilão não encontrado' },
        { status: 404 }
      )
    }

    if (auction.status !== 'active') {
      return NextResponse.json(
        { error: 'Leilão não está ativo' },
        { status: 400 }
      )
    }

    if (auction.products.user_id === user.id) {
      return NextResponse.json(
        { error: 'Você não pode dar lance no seu próprio leilão' },
        { status: 400 }
      )
    }

    const minBid = auction.current_bid || auction.starting_bid
    if (validatedData.amount <= minBid) {
      return NextResponse.json(
        { error: `Lance deve ser maior que R$ ${minBid.toFixed(2)}` },
        { status: 400 }
      )
    }

    const { data: userBids } = await supabase
      .from('bids')
      .select('amount')
      .eq('auction_id', validatedData.auction_id)
      .eq('user_id', user.id)
      .order('amount', { ascending: false })
      .limit(1)

    if (userBids && userBids.length > 0 && validatedData.amount <= userBids[0].amount) {
      return NextResponse.json(
        { error: 'Você já deu um lance maior ou igual' },
        { status: 400 }
      )
    }

    const { data: bid, error: bidError } = await supabase
      .from('bids')
      .insert({
        ...validatedData,
        user_id: user.id
      })
      .select(`
        *,
        users (
          id,
          name,
          avatar_url
        )
      `)
      .single()

    if (bidError) {
      return NextResponse.json(
        { error: 'Erro ao criar lance' },
        { status: 400 }
      )
    }

    await supabase
      .from('auctions')
      .update({ current_bid: validatedData.amount })
      .eq('id', validatedData.auction_id)

    return NextResponse.json({
      message: 'Lance realizado com sucesso',
      bid
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Create bid error:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}