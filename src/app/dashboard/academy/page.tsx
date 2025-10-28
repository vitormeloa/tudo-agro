'use client'

import AdminLayout from '@/components/admin/AdminLayout'
import AcademySection from '@/components/admin/AcademySection'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function AcademyPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <AcademySection />
      </AdminLayout>
    </ProtectedRoute>
  )
}