'use client';

import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import Chat from "@/components/views/Chat";

export default function ChatPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <Chat />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
