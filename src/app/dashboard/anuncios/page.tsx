'use client'

import AdminLayout from '@/components/admin/AdminLayout'
import AdsSection from '@/components/admin/AdsSection'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function AnunciosPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <AdsSection />
      </AdminLayout>
    </ProtectedRoute>
  )
}