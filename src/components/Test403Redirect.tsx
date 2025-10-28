'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import PermissionGuard from '@/components/PermissionGuard'
import PermissionRoute from '@/components/PermissionRoute'

export default function Test403Redirect() {
  const [testType, setTestType] = useState<'guard' | 'route' | null>(null)

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Teste de Redirecionamento 403</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            Teste os diferentes tipos de redirecionamento para a página 403:
          </p>
          
          <div className="flex gap-4">
            <Button 
              onClick={() => setTestType('guard')}
              variant="outline"
            >
              Testar PermissionGuard
            </Button>
            <Button 
              onClick={() => setTestType('route')}
              variant="outline"
            >
              Testar PermissionRoute
            </Button>
            <Button 
              onClick={() => setTestType(null)}
              variant="ghost"
            >
              Limpar
            </Button>
          </div>
        </CardContent>
      </Card>

      {testType === 'guard' && (
        <Card>
          <CardHeader>
            <CardTitle>PermissionGuard Test</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Este conteúdo só deve aparecer se você tiver a permissão 'admin:read' (que provavelmente não tem):
            </p>
            
            <PermissionGuard permission="admin:read">
              <div className="p-4 bg-green-100 border border-green-300 rounded-lg">
                <p className="text-green-800">
                  ✅ Você tem permissão para ver este conteúdo!
                </p>
              </div>
            </PermissionGuard>
            
            <div className="mt-4 p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
              <p className="text-yellow-800 text-sm">
                Se você não tem a permissão necessária, deve ter sido redirecionado para /403
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {testType === 'route' && (
        <Card>
          <CardHeader>
            <CardTitle>PermissionRoute Test</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Este conteúdo só deve aparecer se você tiver acesso à seção 'admin' (que provavelmente não tem):
            </p>
            
            <PermissionRoute requiredSection="admin">
              <div className="p-4 bg-green-100 border border-green-300 rounded-lg">
                <p className="text-green-800">
                  ✅ Você tem acesso à seção admin!
                </p>
              </div>
            </PermissionRoute>
            
            <div className="mt-4 p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
              <p className="text-yellow-800 text-sm">
                Se você não tem acesso à seção necessária, deve ter sido redirecionado para /403
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}