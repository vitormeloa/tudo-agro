'use client';

import AdminProtectedRoute from "@/components/AdminProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import Pedidos from "@/components/views/admin/Pedidos";

export default function PedidosPage() {
  return (
    <AdminProtectedRoute>
      <DashboardLayout>
        <Pedidos />
      </DashboardLayout>
    </AdminProtectedRoute>
  );
}
