'use client'

import ProtectedRoute from '@/components/ProtectedRoute'
import DashboardLayout from '@/components/DashboardLayout'
import Animais from '@/components/views/Animais'

export default function AnimaisPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <Animais />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
