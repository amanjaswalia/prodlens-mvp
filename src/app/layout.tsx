"use client";

import "./globals.css";
import Sidebar from './Sidebar';
import { usePathname } from 'next/navigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 
{
  const pathname = usePathname();
  return (
    <html lang="en">
      <body className="flex h-screen">
      {pathname !== '/all-dossiers' && <Sidebar activeRoute={""} onLogout={function (): void {
          throw new Error("Function not implemented.");
        } } />}
      <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
