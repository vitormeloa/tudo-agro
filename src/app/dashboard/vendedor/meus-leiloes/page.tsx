'use client';

import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import MeusLeiloes from "@/components/views/vendedor/MeusLeiloes";

export default function MeusLeiloesPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <MeusLeiloes />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
