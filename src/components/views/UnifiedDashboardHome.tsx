'use client';

import { useAuth } from "@/hooks/useAuth";
import Dashboard from "@/components/views/Dashboard";
import InicioVendedor from "@/components/views/vendedor/InicioVendedor";
import VisaoGeral from "@/components/views/admin/VisaoGeral";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function UnifiedDashboardHome() {
  const { user, loading, isAdmin, isSeller, initialized } = useAuth();

  if (loading || !initialized) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <div>Acesso negado. Por favor, faça login.</div>;
  }

  if (isAdmin()) {
    return <VisaoGeral />;
  }

  if (isSeller()) {
    return <InicioVendedor />;
  }

  return <Dashboard />;
}
