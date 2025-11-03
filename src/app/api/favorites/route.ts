import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { mockAnimals } from '@/lib/mock-animals'
import { mockProducts } from '@/lib/mock-products'

// GET /api/favorites - Listar favoritos do usuário logado
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
      error: authError,
    } = await supabase.auth.getUser()

    if (authError) {
      console.error('Auth error:', authError)
      return NextResponse.json(
        { error: 'Erro de autenticação. Por favor, faça login novamente.' },
        { status: 401 }
      )
    }

    if (!user) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }
    

    // Buscar favoritos do usuário
    // Primeiro buscar apenas os favoritos sem JOIN para evitar erros com produtos mockados
    try {
      const { data: favoritesData, error: favoritesError } = await supabase
        .from('favorites')
        .select('id, created_at, product_id')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (favoritesError) {
        // Se for erro de tabela não encontrada (vários códigos possíveis)
        // PGRST205 = tabela não encontrada no schema cache
        // 42P01 = tabela não existe no PostgreSQL
        if (
          favoritesError.code === 'PGRST205' || 
          favoritesError.code === '42P01' || 
          favoritesError.message?.includes('does not exist') ||
          favoritesError.message?.includes('schema cache') ||
          favoritesError.message?.includes('Could not find the table')
        ) {
          // Tabela não existe ainda - retornar array vazio sem erro
          console.warn('Favorites table not found, returning empty array:', favoritesError.message)
          return NextResponse.json({ favorites: [] })
        }
        
        // Para outros erros, logar e retornar erro
        console.error('Error fetching favorites:', {
          code: favoritesError.code,
          message: favoritesError.message
        })
        
        return NextResponse.json(
          { 
            error: 'Não foi possível carregar seus favoritos. Tente novamente em alguns instantes.',
            details: favoritesError.message || 'Erro desconhecido'
          },
          { status: 500 }
        )
      }

      // Se não houver favoritos, retornar array vazio
      if (!favoritesData || favoritesData.length === 0) {
        return NextResponse.json({ favorites: [] })
      }

      // Função helper para buscar item (animal mockado, produto mockado ou produto do banco)
      const findItemById = (itemId: string) => {
        // 1. Tentar encontrar em animais mockados
        const animal = mockAnimals.find(a => a.id === itemId)
        if (animal) {
          return {
            type: 'animal' as const,
            data: {
              id: animal.id,
              title: animal.title,
              description: animal.description,
              category: animal.category,
              breed: animal.breed,
              gender: animal.sex,
              age: animal.age,
              weight: animal.weight, // String para animais (ex: "850kg")
              price: animal.price,
              negotiable: false,
              status: 'active',
              featured: animal.featured,
              user_id: null,
              created_at: null,
              updated_at: null,
              product_images: animal.images.map((url, index) => ({
                id: `img-${index}`,
                url: url,
                alt: animal.title,
                order: index
              })),
              item_type: 'animal' as const
            }
          }
        }

        // 2. Tentar encontrar em produtos mockados
        const mockProduct = mockProducts.find(p => p.id === itemId)
        if (mockProduct) {
          return {
            type: 'product' as const,
            data: {
              id: mockProduct.id,
              title: mockProduct.title,
              description: mockProduct.description,
              category: mockProduct.category,
              breed: null,
              gender: null,
              age: null,
              weight: null,
              price: mockProduct.price,
              negotiable: false,
              status: 'active',
              featured: mockProduct.featured,
              user_id: null,
              created_at: null,
              updated_at: null,
              product_images: mockProduct.images.map((url, index) => ({
                id: `img-${index}`,
                url: url,
                alt: mockProduct.title,
                order: index
              })),
              item_type: 'product' as const
            }
          }
        }

        return null
      }

      // Para cada favorito, buscar o item (animal ou produto)
      const favorites = await Promise.all(
        favoritesData.map(async (fav: any) => {
          try {
            // Primeiro tentar buscar no banco de dados (produtos reais)
            const { data: product, error: productError } = await supabase
              .from('products')
              .select('id, title, description, category, breed, gender, age, weight, price, negotiable, status, featured, user_id, created_at, updated_at')
              .eq('id', fav.product_id)
              .single()

            // Se encontrou no banco, usar produto do banco
            if (!productError && product) {
              // Buscar imagens do produto
              let productImages: any[] = []
              try {
                const { data: images } = await supabase
                  .from('product_images')
                  .select('id, url, alt, order')
                  .eq('product_id', fav.product_id)
                  .order('order', { ascending: true })
                
                if (images) {
                  productImages = images
                }
              } catch (imageError) {
                // Erro silencioso ao buscar imagens
              }

              return {
                id: fav.id,
                created_at: fav.created_at,
                product_id: fav.product_id,
                product: {
                  ...product,
                  product_images: productImages,
                  item_type: 'product' as const
                }
              }
            }

            // Se não encontrou no banco, buscar em mockados (animais ou produtos)
            const mockItem = findItemById(fav.product_id)
            
            if (mockItem) {
              return {
                id: fav.id,
                created_at: fav.created_at,
                product_id: fav.product_id,
                product: mockItem.data
              }
            }

            // Se não encontrou em lugar nenhum, retornar item não disponível
            return {
              id: fav.id,
              created_at: fav.created_at,
              product_id: fav.product_id,
              product: {
                id: fav.product_id,
                title: 'Item não disponível',
                description: null,
                category: 'Não especificado',
                breed: null,
                gender: null,
                age: null,
                weight: null,
                price: null,
                negotiable: false,
                status: 'inactive',
                featured: false,
                user_id: null,
                created_at: null,
                updated_at: null,
                product_images: [],
                item_type: 'unknown' as const
              }
            }
          } catch (error: any) {
            console.error(`Error fetching item ${fav.product_id}:`, error?.message || error)
            
            // Tentar buscar em mockados como fallback
            const mockItem = findItemById(fav.product_id)
            if (mockItem) {
              return {
                id: fav.id,
                created_at: fav.created_at,
                product_id: fav.product_id,
                product: mockItem.data
              }
            }

            // Retornar item não disponível
            return {
              id: fav.id,
              created_at: fav.created_at,
              product_id: fav.product_id,
              product: {
                id: fav.product_id,
                title: 'Item não disponível',
                description: null,
                category: 'Não especificado',
                breed: null,
                gender: null,
                age: null,
                weight: null,
                price: null,
                negotiable: false,
                status: 'inactive',
                featured: false,
                user_id: null,
                created_at: null,
                updated_at: null,
                product_images: [],
                item_type: 'unknown' as const
              }
            }
          }
        })
      )

      // Garantir que retornamos um objeto válido
      const responseData = { favorites: favorites || [] }
      return NextResponse.json(responseData, { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        }
      })
    } catch (error: any) {
      console.error('Unexpected error in GET favorites:', error?.message || error)
      
      return NextResponse.json(
        { 
          error: 'Ocorreu um erro inesperado ao carregar favoritos.',
          details: error?.message || 'Erro desconhecido'
        },
        { status: 500 }
      )
    }
  } catch (error: any) {
    console.error('Favorites GET error:', error?.message || error)
    return NextResponse.json(
      { error: 'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.' },
      { status: 500 }
    )
  }
}

// POST /api/favorites - Adicionar favorito
export async function POST(request: NextRequest) {
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
          set(name: string, value: string, options: any) {
            // Não fazer nada no servidor
          },
          remove(name: string, options: any) {
            // Não fazer nada no servidor
          },
        },
      }
    )

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError) {
      console.error('Erro ao obter usuário:', authError)
    }

    if (!user) {
      return NextResponse.json(
        { error: 'Autenticação necessária. Por favor, faça login para continuar.' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { product_id } = body

    if (!product_id) {
      return NextResponse.json(
        { error: 'ID do produto é obrigatório para adicionar aos favoritos.' },
        { status: 400 }
      )
    }

    // Verificar se o produto existe no banco de dados
    // Se não existir, pode ser um produto mockado - permitir favoritar mesmo assim
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('id')
      .eq('id', product_id)
      .single()

    // Se o produto não existir no banco, não é um erro fatal
    // Pode ser um produto mockado que ainda não foi cadastrado no banco
    // Apenas logar para debug, mas continuar com o processo
    if (productError && productError.code !== 'PGRST116') {
      // PGRST116 = nenhuma linha encontrada (produto não existe)
      // Outros erros devem ser tratados
      console.warn('Erro ao verificar produto:', productError)
    }
    
    // Se o produto não existir (código PGRST116), ainda permitir favoritar
    // Isso permite favoritar produtos mockados que ainda não estão no banco
    if (productError && productError.code === 'PGRST116') {
      console.log(`Produto mockado ${product_id} sendo favoritado - não existe no banco ainda`)
    }

    // Verificar se já está favoritado
    const { data: existingFavorite, error: checkError } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', user.id)
      .eq('product_id', product_id)
      .maybeSingle()

    // Se a tabela não existir, permitir continuar (a inserção pode criar a tabela ou falhar de forma controlada)
    if (checkError && (
      checkError.code === 'PGRST205' ||
      checkError.code === '42P01' || 
      checkError.message?.includes('does not exist') ||
      checkError.message?.includes('schema cache') ||
      checkError.message?.includes('Could not find the table')
    )) {
      // Tabela não existe - continuar tentando inserir
      console.warn('Favorites table not found during check, proceeding with insert:', checkError.message)
    } else if (existingFavorite) {
      return NextResponse.json(
        { error: 'Este produto já está na sua lista de favoritos.' },
        { status: 400 }
      )
    }

    // Adicionar favorito
    // Tentar usar a função RPC primeiro (se disponível), senão inserção direta
    let favorite
    let insertError
    
    try {
      // Tentar usar função RPC que lida com produtos mockados
      const { data: rpcData, error: rpcError } = await supabase.rpc('insert_favorite', {
        p_user_id: user.id,
        p_product_id: product_id
      })
      
      if (!rpcError && rpcData) {
        favorite = rpcData
      } else {
        // Se RPC falhar, tentar inserção direta
        console.log('RPC não disponível ou falhou, tentando inserção direta...', rpcError)
        
        const result = await supabase
          .from('favorites')
          .insert({
            user_id: user.id,
            product_id: product_id
          })
          .select()
          .single()
        
        favorite = result.data
        insertError = result.error
      }
    } catch (error) {
      console.error('Error in favorite insertion:', error)
      insertError = error as any
    }

    if (insertError) {
      console.error('Error adding favorite:', insertError)
      console.error('Error details:', JSON.stringify(insertError, null, 2))
      
      // Se a tabela não existir, informar que é necessário executar a migração
      if (
        insertError.code === 'PGRST205' ||
        insertError.code === '42P01' || 
        insertError.message?.includes('does not exist') ||
        insertError.message?.includes('schema cache') ||
        insertError.message?.includes('Could not find the table')
      ) {
        return NextResponse.json(
          { 
            error: 'A tabela de favoritos ainda não foi criada. É necessário executar a migração do banco de dados.',
            details: insertError.message 
          },
          { status: 503 }
        )
      }
      
      // Se o erro for de foreign key constraint, informar sobre a migration necessária
      if (insertError.code === '23503' || insertError.message?.includes('foreign key')) {
        return NextResponse.json(
          { 
            error: 'Este produto não pode ser favoritado porque não existe no sistema. É necessário executar a migration 002_modify_favorites_for_mock_products.sql para permitir produtos mockados.',
            details: insertError.message 
          },
          { status: 400 }
        )
      }
      
      return NextResponse.json(
        { 
          error: 'Não foi possível adicionar o produto aos favoritos. Tente novamente em alguns instantes.',
          details: insertError.message 
        },
        { status: 500 }
      )
    }

    return NextResponse.json({ favorite, message: 'Favorito adicionado com sucesso' })
  } catch (error) {
    console.error('Favorites POST error:', error)
    return NextResponse.json(
      { error: 'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.' },
      { status: 500 }
    )
  }
}

// DELETE /api/favorites - Remover favorito
export async function DELETE(request: NextRequest) {
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
      return NextResponse.json(
        { error: 'Autenticação necessária. Por favor, faça login para continuar.' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const product_id = searchParams.get('product_id')

    if (!product_id) {
      return NextResponse.json(
        { error: 'ID do produto é obrigatório para remover dos favoritos.' },
        { status: 400 }
      )
    }

    // Remover favorito
    const { error: deleteError } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', user.id)
      .eq('product_id', product_id)

    if (deleteError) {
      // Se a tabela não existir, considerar sucesso (não há nada para remover)
      if (
        deleteError.code === 'PGRST205' ||
        deleteError.code === '42P01' || 
        deleteError.message?.includes('does not exist') ||
        deleteError.message?.includes('schema cache') ||
        deleteError.message?.includes('Could not find the table')
      ) {
        // Tabela não existe - considerar que já foi removido
        return NextResponse.json({ message: 'Favorito removido com sucesso' })
      }
      
      console.error('Error removing favorite:', deleteError)
      return NextResponse.json(
        { error: 'Não foi possível remover o produto dos favoritos. Tente novamente em alguns instantes.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: 'Favorito removido com sucesso' })
  } catch (error) {
    console.error('Favorites DELETE error:', error)
    return NextResponse.json(
      { error: 'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.' },
      { status: 500 }
    )
  }
}
