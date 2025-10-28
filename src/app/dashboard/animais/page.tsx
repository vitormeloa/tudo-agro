'use client'

import AdminLayout from '@/components/admin/AdminLayout'
import AnimalsSection from '@/components/admin/AnimalsSection'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function AnimaisPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <AnimalsSection />
      </AdminLayout>
    </ProtectedRoute>
  )
}