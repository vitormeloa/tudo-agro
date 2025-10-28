'use client'

import AdminLayout from '@/components/admin/AdminLayout'
import SellersSection from '@/components/admin/SellersSection'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function VendedoresPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <SellersSection />
      </AdminLayout>
    </ProtectedRoute>
  )
}