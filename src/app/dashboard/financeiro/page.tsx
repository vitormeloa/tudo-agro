'use client';

import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import Financeiro from "@/components/views/Financeiro";

export default function FinanceiroPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <Financeiro />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
