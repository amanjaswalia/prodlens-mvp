"use client";

import Sidebar from "./Sidebar";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";

const authPages = ["/login", "/signup", "/forgot-password", "/reset-password"];

export default function LayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAuthPage = authPages.some((page) => pathname.startsWith(page));
  const hideSidebar = isAuthPage || pathname === "/all-dossiers";

  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="flex h-screen bg-background">
          {!hideSidebar && <Sidebar activeRoute={pathname} />}
          <div className="flex-1 overflow-auto">{children}</div>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}
