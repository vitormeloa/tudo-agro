'use client';

import AdminProtectedRoute from "@/components/AdminProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import Vendedores from "@/components/views/admin/Vendedores";

export default function VendedoresPage() {
  return (
    <AdminProtectedRoute>
      <DashboardLayout>
        <Vendedores />
      </DashboardLayout>
    </AdminProtectedRoute>
  );
}
