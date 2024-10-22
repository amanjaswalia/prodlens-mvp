import "./globals.css";
import Sidebar from './Sidebar'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex h-screen">
      <Sidebar />
      <div className="flex-1 bg-background p-8">{children}</div>
      </body>
    </html>
  );
}
