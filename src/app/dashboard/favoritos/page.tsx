'use client';

import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import Favoritos from "@/components/views/Favoritos";

export default function FavoritosPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <Favoritos />
      </DashboardLayout>
    </ProtectedRoute>
  );
}