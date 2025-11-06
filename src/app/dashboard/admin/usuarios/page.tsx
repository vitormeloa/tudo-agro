'use client';

import AdminProtectedRoute from "@/components/AdminProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import Usuarios from "@/components/views/admin/Usuarios";

export default function UsuariosPage() {
  return (
    <AdminProtectedRoute>
      <DashboardLayout>
        <Usuarios />
      </DashboardLayout>
    </AdminProtectedRoute>
  );
}
