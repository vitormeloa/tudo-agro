'use client'

import { usePathname } from "next/navigation";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import { Toaster } from "@/components/ui/toaster";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const authPaths = ["/login", "/cadastro", "/esqueci-senha", "/reset-password"];
    const hideWhatsAppButton = authPaths.includes(pathname) || pathname.startsWith("/dashboard");

    return (
        <>
            {children}
            <Toaster />
            {!hideWhatsAppButton && <FloatingWhatsAppButton />}
        </>
    );
}