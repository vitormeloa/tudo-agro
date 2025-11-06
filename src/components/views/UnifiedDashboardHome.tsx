'use client';

import { useAuth } from "@/hooks/useAuth";
import Dashboard from "@/components/views/Dashboard"; // Buyer Dashboard
import InicioVendedor from "@/components/views/vendedor/InicioVendedor"; // Seller Dashboard
import VisaoGeral from "@/components/views/admin/VisaoGeral"; // Admin Dashboard
import LoadingSpinner from "@/components/LoadingSpinner"; // Assuming a loading spinner component exists

export default function UnifiedDashboardHome() {
  const { user, loading, isAdmin, isSeller, initialized } = useAuth();

  if (loading || !initialized) {
    return <LoadingSpinner />;
  }

  if (!user) {
    // Should ideally be handled by ProtectedRoute, but good to have a fallback
    return <div>Acesso negado. Por favor, faça login.</div>;
  }

  if (isAdmin()) {
    return <VisaoGeral />;
  }

  if (isSeller()) {
    return <InicioVendedor />;
  }

  // Default to buyer dashboard if not admin or seller
  return <Dashboard />;
}
