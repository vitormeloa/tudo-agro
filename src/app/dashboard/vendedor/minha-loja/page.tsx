'use client';

import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import MinhaLojaAgro from "@/components/views/vendedor/MinhaLojaAgro";

export default function MinhaLojaPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <MinhaLojaAgro />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
