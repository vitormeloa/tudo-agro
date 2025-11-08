export const PERMISSIONS = {
  dashboard: ["read"],
  
  user: ["read", "write", "delete", "approve", "suspend"],
  
  seller: ["read", "write", "delete", "approve", "reject"],
  
  ad: ["read", "write", "delete", "moderate", "feature", "approve", "reject", "pause", "request"],
  
  product: ["read", "write", "delete", "manage"],
  
  animal: ["read", "write", "delete", "manage", "offer", "purchase"],
  
  auction: ["read", "write", "delete", "moderate", "manage"],
  
  transaction: ["read", "write", "delete", "refund", "dispute"],
  
  document: ["read", "write", "delete", "verify", "reject"],
  
  cashback: ["read", "write", "delete", "approve", "reject"],
  
  vip: ["read", "write", "delete", "manage"],
  
  academy: ["read", "write", "delete", "moderate"],
  
  purchase: ["read", "view_details", "download_receipt", "download_invoice", "rate_seller", "chat_seller", "reorder"],
  
  financial: ["read", "view_details", "download_receipt", "download_invoice", "manage_payment_methods", "view_invoices"],
  
  training: ["read", "enroll", "complete", "view_certificate", "rate"],
  
  account: ["read", "edit_profile", "edit_address", "change_password", "manage_2fa", "manage_notifications", "upload_documents", "delete_account"],
  
  message: ["read", "write", "delete", "moderate"],
  support: ["read", "write", "delete", "assign", "resolve"],
  
  role: ["read", "write", "delete"],
  permission: ["read", "write", "delete"],
  
  config: ["read", "write"],
  setting: ["read", "write"],
  
  report: ["read", "export"],
  analytics: ["read", "export"],
  
  notification: ["read", "write", "delete", "send"],
  
  audit: ["read", "export"],
  log: ["read", "export"]
} as const

export type PermissionResource = keyof typeof PERMISSIONS
export type PermissionAction = typeof PERMISSIONS[PermissionResource][number]
export type Permission = `${PermissionResource}:${PermissionAction}`

export const generateAllPermissions = (): Permission[] => {
  const permissions: Permission[] = []
  
  Object.entries(PERMISSIONS).forEach(([resource, actions]) => {
    actions.forEach(action => {
      permissions.push(`${resource}:${action}` as Permission)
    })
  })
  
  return permissions
}

export const isValidPermission = (permission: string): permission is Permission => {
  const [resource, action] = permission.split(':')
  return resource in PERMISSIONS && PERMISSIONS[resource as PermissionResource].includes(action as PermissionAction)
}

export const getResourcePermissions = (resource: PermissionResource): Permission[] => {
  return PERMISSIONS[resource].map(action => `${resource}:${action}` as Permission)
}

export const groupPermissionsByModule = (permissions: Permission[]) => {
  const grouped: Record<string, Permission[]> = {}
  
  permissions.forEach(permission => {
    const [resource] = permission.split(':')
    if (!grouped[resource]) {
      grouped[resource] = []
    }
    grouped[resource].push(permission)
  })
  
  return grouped
}

export const RESOURCE_LABELS: Record<PermissionResource, string> = {
  dashboard: "Dashboard",
  user: "Usuários",
  seller: "Vendedores",
  ad: "Anúncios",
  product: "Produtos",
  animal: "Animais",
  favorite: "Favoritos",
  auction: "Leilões",
  transaction: "Transações",
  document: "Documentos KYC",
  cashback: "Cashback",
  vip: "Planos VIP",
  academy: "Academy/IA",
  purchase: "Minhas Compras",
  financial: "Financeiro",
  training: "Treinamentos",
  account: "Minha Conta",
  message: "Mensagens",
  support: "Suporte",
  role: "Funções",
  permission: "Permissões",
  config: "Configurações",
  setting: "Configurações",
  report: "Relatórios",
  analytics: "Analytics",
  notification: "Notificações",
  audit: "Auditoria",
  log: "Logs"
}

export const ACTION_LABELS: Record<PermissionAction, string> = {
  read: "Visualizar",
  write: "Criar/Editar",
  delete: "Excluir",
  approve: "Aprovar",
  reject: "Rejeitar",
  suspend: "Suspender",
  moderate: "Moderar",
  feature: "Destacar",
  manage: "Gerenciar",
  refund: "Reembolsar",
  dispute: "Disputar",
  verify: "Verificar",
  assign: "Atribuir",
  resolve: "Resolver",
  export: "Exportar",
  send: "Enviar",
  pause: "Pausar",
  request: "Solicitar",
  offer: "Fazer Oferta",
  purchase: "Comprar",
  view_details: "Ver Detalhes",
  download_receipt: "Baixar Comprovante",
  download_invoice: "Baixar Nota Fiscal",
  rate_seller: "Avaliar Vendedor",
  chat_seller: "Chat com Vendedor",
  reorder: "Recomprar",
  manage_payment_methods: "Gerenciar Métodos de Pagamento",
  view_invoices: "Ver Notas Fiscais",
  enroll: "Inscrever-se",
  complete: "Completar",
  view_certificate: "Ver Certificado",
  rate: "Avaliar",
  edit_profile: "Editar Perfil",
  edit_address: "Editar Endereço",
  change_password: "Alterar Senha",
  manage_2fa: "Gerenciar 2FA",
  manage_notifications: "Gerenciar Notificações",
  upload_documents: "Enviar Documentos",
  delete_account: "Excluir Conta"
}

export const ADMIN_FEATURES = {
  'dashboard:read': ['visao-geral'],
  'user:read': ['usuarios'],
  'user:write': ['usuarios'],
  'user:delete': ['usuarios'],
  'user:approve': ['usuarios'],
  'user:suspend': ['usuarios'],
  'seller:read': ['vendedores'],
  'seller:write': ['vendedores'],
  'seller:delete': ['vendedores'],
  'seller:approve': ['vendedores'],
  'seller:reject': ['vendedores'],
  'ad:read': ['anuncios'],
  'ad:write': ['anuncios'],
  'ad:delete': ['anuncios'],
  'ad:moderate': ['anuncios'],
  'ad:feature': ['anuncios'],
  'ad:approve': ['anuncios'],
  'ad:reject': ['anuncios'],
  'ad:pause': ['anuncios'],
  'ad:request': ['anuncios'],
  'product:read': ['produtos'],
  'product:write': ['produtos'],
  'product:delete': ['produtos'],
  'product:manage': ['produtos'],
  'animal:read': ['animais'],
  'animal:write': ['animais'],
  'animal:delete': ['animais'],
  'animal:manage': ['animais'],
  'animal:offer': ['animais'],
  'animal:purchase': ['animais'],
  'favorite:read': ['favoritos'],
  'favorite:write': ['favoritos'],
  'favorite:delete': ['favoritos'],
  'auction:read': ['leiloes'],
  'auction:write': ['leiloes'],
  'auction:delete': ['leiloes'],
  'auction:moderate': ['leiloes'],
  'auction:manage': ['leiloes'],
  'transaction:read': ['transacoes'],
  'transaction:write': ['transacoes'],
  'transaction:delete': ['transacoes'],
  'transaction:refund': ['transacoes'],
  'transaction:dispute': ['transacoes'],
  'document:read': ['documentos'],
  'document:write': ['documentos'],
  'document:delete': ['documentos'],
  'document:verify': ['documentos'],
  'document:reject': ['documentos'],
  'cashback:read': ['cashback'],
  'cashback:write': ['cashback'],
  'cashback:delete': ['cashback'],
  'cashback:approve': ['cashback'],
  'cashback:reject': ['cashback'],
  'vip:read': ['vip'],
  'vip:write': ['vip'],
  'vip:delete': ['vip'],
  'vip:manage': ['vip'],
  'academy:read': ['academy'],
  'academy:write': ['academy'],
  'academy:delete': ['academy'],
  'academy:moderate': ['academy'],
  'message:read': ['mensagens'],
  'message:write': ['mensagens'],
  'message:delete': ['mensagens'],
  'message:moderate': ['mensagens'],
  'support:read': ['mensagens'],
  'support:write': ['mensagens'],
  'support:delete': ['mensagens'],
  'support:assign': ['mensagens'],
  'support:resolve': ['mensagens'],
  'role:read': ['funcoes'],
  'role:write': ['funcoes'],
  'role:delete': ['funcoes'],
  'permission:read': ['funcoes'],
  'permission:write': ['funcoes'],
  'permission:delete': ['funcoes'],
  'config:read': ['configuracoes'],
  'config:write': ['configuracoes'],
  'setting:read': ['configuracoes'],
  'setting:write': ['configuracoes']
} as const

export default PERMISSIONS