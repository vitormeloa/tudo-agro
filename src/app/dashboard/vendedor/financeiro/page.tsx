'use client';

import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import FinanceiroVendedor from "@/components/views/vendedor/FinanceiroVendedor";

export default function FinanceiroVendedorPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <FinanceiroVendedor />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
