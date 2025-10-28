'use client'

import AdminLayout from '@/components/admin/AdminLayout'
import CashbackSection from '@/components/admin/CashbackSection'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function CashbackPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <CashbackSection />
      </AdminLayout>
    </ProtectedRoute>
  )
}