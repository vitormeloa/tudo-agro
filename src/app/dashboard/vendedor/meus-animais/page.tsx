'use client';

import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import MeusAnimais from "@/components/views/vendedor/MeusAnimais";

export default function MeusAnimaisPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <MeusAnimais />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
