'use client'

import AdminLayout from '@/components/admin/AdminLayout'
import UsersSection from '@/components/admin/UsersSection'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function UsuariosPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <UsersSection />
      </AdminLayout>
    </ProtectedRoute>
  )
}