import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7F6F2] to-[#FFFDF7] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Logo */}
        <div className="mb-8">
          <Link href="/" className="flex items-center justify-center space-x-3 group">
            <img 
              src="/fotos/tudo-agro-logo.png" 
              className="h-12 w-auto sm:h-16 md:h-20 lg:h-24" 
              alt="TudoAgro Logo"
            />
          </Link>
        </div>

        {/* 404 Content */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-[#6E7D5B] mb-4">404</h1>
          <h2 className="text-2xl font-bold text-[#2B2E2B] mb-4">
            Página não encontrada
          </h2>
          <p className="text-[#6E7D5B] mb-8">
            A página que você está procurando não existe ou foi movida.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <Button asChild className="w-full bg-[#6E7D5B] hover:bg-[#5A6B4A] text-white">
            <Link href="/" className="flex items-center justify-center space-x-2">
              <Home className="w-4 h-4" />
              <span>Voltar ao Início</span>
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="w-full border-[#6E7D5B] text-[#6E7D5B] hover:bg-[#6E7D5B] hover:text-white">
            <Link href="/catalogo" className="flex items-center justify-center space-x-2">
              <Search className="w-4 h-4" />
              <span>Explorar Catálogo</span>
            </Link>
          </Button>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-sm text-[#6E7D5B]">
          <p>Se você acredita que isso é um erro, entre em contato conosco.</p>
        </div>
      </div>
    </div>
  )
}