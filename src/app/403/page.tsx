import Error403 from '@/components/Error403'

export default function Error403Page() {
  return (
    <Error403 
      title="Acesso Negado"
      message="Você não tem permissão para acessar esta página. Esta área é restrita e requer autenticação."
      showCountdown={false}
      showBackButton={true}
    />
  )
}