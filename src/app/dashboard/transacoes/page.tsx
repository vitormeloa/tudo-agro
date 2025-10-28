'use client'

import AdminLayout from '@/components/admin/AdminLayout'
import TransactionsSection from '@/components/admin/TransactionsSection'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function TransacoesPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <TransactionsSection />
      </AdminLayout>
    </ProtectedRoute>
  )
}