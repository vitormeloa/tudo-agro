import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  // Verificar se as variáveis de ambiente estão configuradas
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error('Middleware - Missing Supabase environment variables')
    return res
  }
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          res.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: any) {
          res.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  try {
    const {
      data: { session },
      error
    } = await supabase.auth.getSession()

    console.log('Middleware - Session check:', {
      path: req.nextUrl.pathname,
      hasSession: !!session,
      userId: session?.user?.id,
      error: error?.message
    })

    // Rotas que requerem autenticação
    const protectedRoutes = [
      '/painel',
      '/perfil',
      '/minhas-vendas',
      '/minhas-compras',
      '/favoritos',
      '/mensagens'
    ]

    // Verificar se a rota atual requer autenticação
    const isProtectedRoute = protectedRoutes.some(route => 
      req.nextUrl.pathname.startsWith(route)
    )

    // Se não há sessão e a rota é protegida, redirecionar para login
    if (!session && isProtectedRoute) {
      console.log('Middleware - Redirecting to login:', {
        path: req.nextUrl.pathname,
        isProtectedRoute,
        hasSession: !!session
      })
      const redirectUrl = new URL('/login', req.url)
      redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // Se há sessão e está tentando acessar login/cadastro, redirecionar para homepage
    if (session && (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/cadastro')) {
      return NextResponse.redirect(new URL('/', req.url))
    }

  } catch (error) {
    console.error('Middleware - Error checking session:', error)
  }

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    // Temporariamente desabilitado para corrigir redirecionamento
    // '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}