import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Criar resposta inicial
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Garantir que o charset UTF-8 está configurado nos headers para todas as respostas HTML
  // Aplicar apenas para rotas de página, não para APIs ou arquivos estáticos
  if (!pathname.startsWith('/api') &&
      !pathname.startsWith('/_next') &&
      !pathname.match(/\.(ico|png|jpg|jpeg|svg|css|js|json|woff|woff2|ttf|eot|map)$/)) {
    // Forçar charset UTF-8 para todas as respostas HTML
    const existingContentType = response.headers.get('Content-Type') || ''
    if (existingContentType.includes('text/html') || !existingContentType) {
      response.headers.set('Content-Type', 'text/html; charset=utf-8')
    } else if (existingContentType.includes('text/') && !existingContentType.includes('charset')) {
      response.headers.set('Content-Type', `${existingContentType}; charset=utf-8`)
    }
  }

  // Rotas protegidas que requerem autenticação
  const protectedRoutes = ['/dashboard', '/perfil']
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  // Se não é rota protegida, continuar normalmente
  if (!isProtectedRoute) {
    return response
  }

  // Criar cliente Supabase para validação de sessão
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  // Verificar se usuário está autenticado
  const { data: { session }, error } = await supabase.auth.getSession()

  // Se não há sessão válida, redirecionar para login
  if (error || !session) {
    const redirectUrl = new URL('/login', request.url)
    redirectUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Se há sessão válida, continuar normalmente
  return response
}

export const config = {
  matcher: [
    // Match all routes except APIs and Next.js internals
    '/((?!api|_next|favicon).*)',
  ],
}
