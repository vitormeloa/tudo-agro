import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // Garantir que o charset UTF-8 está configurado nos headers para todas as respostas HTML
  const pathname = request.nextUrl.pathname
  
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
  
  return response
}

export const config = {
  matcher: [
    // Match all routes except APIs and Next.js internals
    '/((?!api|_next|favicon).*)',
  ],
}
