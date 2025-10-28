import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  // DESABILITADO - Deixar apenas ProtectedRoute fazer a verificação
  // O middleware do Supabase tem problemas para acessar sessões no servidor
  console.log('🔍 Middleware - Path:', req.nextUrl.pathname)
  console.log('🔍 Middleware - Allowing access (ProtectedRoute will handle auth)')
  return NextResponse.next()
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
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}