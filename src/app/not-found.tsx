import Error404 from '@/components/Error404'

export default function NotFound() {
  return (
    <Error404 
      title="Página não encontrada"
      message="A página que você está procurando não existe ou foi movida. Verifique o endereço e tente novamente."
      showCountdown={false}
      showBackButton={true}
    />
  )
}