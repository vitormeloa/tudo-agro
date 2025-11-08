import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  if (!pathname.startsWith('/api') &&
      !pathname.startsWith('/_next') &&
      !pathname.match(/\.(ico|png|jpg|jpeg|svg|css|js|json|woff|woff2|ttf|eot|map)$/)) {
    const existingContentType = response.headers.get('Content-Type') || ''
    if (existingContentType.includes('text/html') || !existingContentType) {
      response.headers.set('Content-Type', 'text/html; charset=utf-8')
    } else if (existingContentType.includes('text/') && !existingContentType.includes('charset')) {
      response.headers.set('Content-Type', `${existingContentType}; charset=utf-8`)
    }
  }

  const protectedRoutes = ['/dashboard', '/perfil']
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  if (!isProtectedRoute) {
    return response
  }

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

  const { data: { session }, error } = await supabase.auth.getSession()

  if (error || !session) {
    const redirectUrl = new URL('/login', request.url)
    redirectUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  return response
}

export const config = {
  matcher: [
    '/((?!api|_next|favicon).*)',
  ],
}
