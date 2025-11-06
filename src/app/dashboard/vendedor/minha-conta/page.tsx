'use client';

import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import MinhaContaVendedor from "@/components/views/vendedor/MinhaContaVendedor";

export default function MinhaContaVendedorPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <MinhaContaVendedor />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
