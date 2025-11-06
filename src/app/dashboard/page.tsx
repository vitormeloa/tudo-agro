'use client';

import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import UnifiedDashboardHome from "@/components/views/UnifiedDashboardHome";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <UnifiedDashboardHome />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
