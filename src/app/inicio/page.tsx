import type { Metadata } from 'next'

import InicioDashboard from './inicio-dashboard'

export const metadata: Metadata = {
  title: 'Início do Comprador | Tudo Agro',
  description:
    'Acompanhe destaques, leilões, pedidos, treinamentos e conteúdos relevantes da Tudo Agro em um dashboard pensado para compradores.',
}

export default function InicioPage() {
  return <InicioDashboard />
}
