'use client'

import { usePathname } from "next/navigation";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import FloatingAIChatButton from "@/components/FloatingAIChatButton";
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "@/hooks/useAuth";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { user, loading } = useAuth();

    const authPaths = ["/login", "/cadastro", "/esqueci-senha", "/reset-password"];
    const hideFloatingButton = authPaths.includes(pathname) || pathname.startsWith("/dashboard");

    const showAIButton = !hideFloatingButton && !loading && user;
    const showWhatsAppButton = !hideFloatingButton && !loading && !user;

    return (
        <>
            {children}
            <Toaster />
            {showAIButton && <FloatingAIChatButton />}
            {showWhatsAppButton && <FloatingWhatsAppButton />}
        </>
    );
}