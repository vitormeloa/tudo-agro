'use client'

import PermissionGuard from '@/components/PermissionGuard'
import PermissionRoute from '@/components/PermissionRoute'

export default function Example403Usage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-primary mb-2">
          Exemplos de Uso do Sistema 403
        </h3>
        <p className="text-blue-700 text-sm">
          Agora, sempre que um usuário tentar acessar uma área sem permissão, 
          ele será redirecionado automaticamente para a página 403 com uma mensagem personalizada.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Exemplo 1: PermissionGuard com permissão específica */}
        <div className="border rounded-lg p-4">
          <h4 className="font-semibold mb-2">1. PermissionGuard com Permissão</h4>
          <div className="bg-gray-100 p-3 rounded text-sm font-mono mb-3">
            {`<PermissionGuard permission="user:delete">
  <Button>Deletar Usuário</Button>
</PermissionGuard>`}
          </div>
          <p className="text-sm text-gray-600">
            Se o usuário não tiver a permissão necessária, será redirecionado para /403
          </p>
        </div>

        {/* Exemplo 2: PermissionGuard com múltiplas permissões */}
        <div className="border rounded-lg p-4">
          <h4 className="font-semibold mb-2">2. PermissionGuard com Múltiplas Permissões</h4>
          <div className="bg-gray-100 p-3 rounded text-sm font-mono mb-3">
            {`<PermissionGuard 
  permissions={["auction:write", "auction:moderate"]}
  requireAll={false}
>
  <AuctionForm />
</PermissionGuard>`}
          </div>
          <p className="text-sm text-gray-600">
            Se o usuário não tiver as permissões necessárias, será redirecionado para /403
          </p>
        </div>

        {/* Exemplo 3: PermissionRoute com seção */}
        <div className="border rounded-lg p-4">
          <h4 className="font-semibold mb-2">3. PermissionRoute com Seção</h4>
          <div className="bg-gray-100 p-3 rounded text-sm font-mono mb-3">
            {`<PermissionRoute requiredSection="admin">
  <AdminPanel />
</PermissionRoute>`}
          </div>
          <p className="text-sm text-gray-600">
            Se o usuário não tiver acesso à seção necessária, será redirecionado para /403
          </p>
        </div>

        {/* Exemplo 4: PermissionGuard com role */}
        <div className="border rounded-lg p-4">
          <h4 className="font-semibold mb-2">4. PermissionGuard com Role</h4>
          <div className="bg-gray-100 p-3 rounded text-sm font-mono mb-3">
            {`<PermissionGuard role="admin">
  <AdminOnlyContent />
</PermissionGuard>`}
          </div>
          <p className="text-sm text-gray-600">
            Se o usuário não tiver a role necessária, será redirecionado para /403
          </p>
        </div>
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <h4 className="font-semibold text-primary mb-2">✅ Benefícios do Sistema 403</h4>
        <ul className="text-primary text-sm space-y-1">
          <li>• <strong>Experiência consistente:</strong> Todos os erros de permissão levam à mesma página</li>
          <li>• <strong>Mensagem clara e simples:</strong> "Você não tem permissão para acessar esta área"</li>
          <li>• <strong>Navegação intuitiva:</strong> Botões para voltar ou fazer login</li>
          <li>• <strong>Fallback personalizado:</strong> Ainda é possível usar fallbacks customizados</li>
          <li>• <strong>Segurança:</strong> Não expõe informações específicas sobre permissões</li>
        </ul>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-semibold text-yellow-800 mb-2">🔧 Como Testar</h4>
        <p className="text-yellow-700 text-sm mb-2">
          Para testar o sistema, acesse: <code className="bg-yellow-100 px-2 py-1 rounded">/test-403</code>
        </p>
        <p className="text-yellow-700 text-sm">
          Ou use os componentes em qualquer página do dashboard com permissões que você não tem.
        </p>
      </div>
    </div>
  )
}