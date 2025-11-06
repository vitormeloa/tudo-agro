'use client';

import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import AjudaIA from "@/components/views/AjudaIA";

export default function AjudaIAPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <AjudaIA />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
