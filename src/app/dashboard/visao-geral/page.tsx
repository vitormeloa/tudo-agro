'use client'

import AdminLayout from '@/components/admin/AdminLayout'
import OverviewSection from '@/components/admin/OverviewSection'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function VisaoGeralPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <OverviewSection />
      </AdminLayout>
    </ProtectedRoute>
  )
}