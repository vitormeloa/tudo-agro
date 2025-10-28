'use client'

import AdminLayout from '@/components/admin/AdminLayout'
import VipSection from '@/components/admin/VipSection'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function VipPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <VipSection />
      </AdminLayout>
    </ProtectedRoute>
  )
}