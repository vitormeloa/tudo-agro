'use client'

import AdminLayout from '@/components/admin/AdminLayout'
import PermissionsSection from '@/components/admin/PermissionsSection'
import ProtectedRoute from '@/components/ProtectedRoute'
import PermissionRoute from '@/components/PermissionRoute'

export default function FuncoesPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <PermissionRoute requiredSection="funcoes">
          <PermissionsSection />
        </PermissionRoute>
      </AdminLayout>
    </ProtectedRoute>
  )
}