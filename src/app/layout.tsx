import type { Metadata, Viewport } from "next";
import "./globals.css";
import LayoutWrapper from "./LayoutWrapper";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://prodlens.com"
  ),
  title: {
    default: "ProdLens - Product Management Dashboard",
    template: "%s | ProdLens",
  },
  description:
    "ProdLens is a modern product management dashboard for teams to collaborate on projects, track dossiers, and streamline workflows.",
  keywords: [
    "product management",
    "project management",
    "dashboard",
    "team collaboration",
    "dossier tracking",
    "workflow management",
  ],
  authors: [{ name: "ProdLens Team" }],
  creator: "ProdLens",
  publisher: "ProdLens",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://prodlens.com",
    siteName: "ProdLens",
    title: "ProdLens - Product Management Dashboard",
    description:
      "Modern product management dashboard for teams to collaborate on projects, track dossiers, and streamline workflows.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ProdLens Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ProdLens - Product Management Dashboard",
    description:
      "Modern product management dashboard for teams to collaborate on projects, track dossiers, and streamline workflows.",
    images: ["/og-image.png"],
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#F0F4F7",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
