import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
        },
      }
    )

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ isFavorite: false })
    }

    const { searchParams } = new URL(request.url)
    const product_id = searchParams.get('product_id')

    if (!product_id) {
      return NextResponse.json(
        { error: 'product_id é obrigatório' },
        { status: 400 }
      )
    }

    const { data: favorite, error: favoriteError } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', user.id)
      .eq('product_id', product_id)
      .maybeSingle()

    if (favoriteError && (
      favoriteError.code === 'PGRST205' ||
      favoriteError.code === '42P01' || 
      favoriteError.message?.includes('does not exist') ||
      favoriteError.message?.includes('schema cache') ||
      favoriteError.message?.includes('Could not find the table')
    )) {
      return NextResponse.json({ isFavorite: false })
    }

    if (favoriteError) {
      console.warn('Error checking favorite (non-fatal):', favoriteError.message)
      return NextResponse.json({ isFavorite: false })
    }

    return NextResponse.json({ isFavorite: !!favorite })
  } catch (error) {
    return NextResponse.json({ isFavorite: false })
  }
}
