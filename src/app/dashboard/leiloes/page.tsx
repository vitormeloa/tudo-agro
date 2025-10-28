'use client'

import AdminLayout from '@/components/admin/AdminLayout'
import AuctionsSection from '@/components/admin/AuctionsSection'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function LeiloesPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <AuctionsSection />
      </AdminLayout>
    </ProtectedRoute>
  )
}