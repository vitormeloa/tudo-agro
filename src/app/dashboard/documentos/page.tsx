'use client'

import AdminLayout from '@/components/admin/AdminLayout'
import DocumentsSection from '@/components/admin/DocumentsSection'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function DocumentosPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <DocumentsSection />
      </AdminLayout>
    </ProtectedRoute>
  )
}