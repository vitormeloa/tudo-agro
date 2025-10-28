'use client'

import AdminLayout from '@/components/admin/AdminLayout'
import ProductsSection from '@/components/admin/ProductsSection'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function ProdutosPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <ProductsSection />
      </AdminLayout>
    </ProtectedRoute>
  )
}