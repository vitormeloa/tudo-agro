'use client'

import AdminLayout from '@/components/admin/AdminLayout'
import MessagesSection from '@/components/admin/MessagesSection'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function MensagensPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <MessagesSection />
      </AdminLayout>
    </ProtectedRoute>
  )
}