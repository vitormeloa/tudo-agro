'use client'

import AdminLayout from '@/components/admin/AdminLayout'
import ConfigSection from '@/components/admin/ConfigSection'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function ConfiguracoesPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <ConfigSection />
      </AdminLayout>
    </ProtectedRoute>
  )
}