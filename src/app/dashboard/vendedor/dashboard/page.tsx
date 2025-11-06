'use client';

import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import DashboardVendas from "@/components/views/vendedor/DashboardVendas";

export default function DashboardVendasPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <DashboardVendas />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
