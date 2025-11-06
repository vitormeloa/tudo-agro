'use client';

import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import MinhasCompras from "@/components/views/MinhasCompras";

export default function MinhasComprasPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <MinhasCompras />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
