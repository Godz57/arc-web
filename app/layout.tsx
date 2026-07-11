import type { Metadata } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";

import HUDOverlay from "@/components/layout/HUDOverlay";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CinematicAtmosphere from "@/components/layout/CinematicAtmosphere";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://arcweb.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ARC WEB | Sites que parecem tecnologia do futuro",
    template: "%s | ARC WEB",
  },
  description:
    "ARC WEB é o portfólio vivo de uma agência/dev freelance especializada em criar sites premium, interativos e imersivos com design de nível Awwwards.",
  keywords: [
    "desenvolvimento web",
    "sites premium",
    "Next.js",
    "React Three Fiber",
    "portfólio",
    "freelance",
  ],
  authors: [{ name: "Gabriel Almeida" }, { name: "ARC WEB" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "ARC WEB",
    title: "ARC WEB | Sites que parecem tecnologia do futuro",
    description:
      "Design imersivo, interações vivas e tecnologia de ponta para quem quer um site que parece tecnologia do futuro.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ARC WEB | Sites que parecem tecnologia do futuro",
    description:
      "Design imersivo, interações vivas e tecnologia de ponta para quem quer um site que parece tecnologia do futuro.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${orbitron.variable} ${rajdhani.variable} h-full antialiased`}
    >
      <body className="relative min-h-full bg-carbon font-rajdhani text-arc-blue">
        {/* background grid */}
        <div
          className="fixed inset-0 -z-10 bg-hud-grid"
          aria-hidden="true"
        />

        {/* scanlines overlay */}
        <div
          className="fixed inset-0 -z-10 scanlines pointer-events-none"
          aria-hidden="true"
        />

        {/* vignette */}
        <div
          className="fixed inset-0 -z-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, transparent 0%, rgba(10,14,20,0.4) 60%, rgba(10,14,20,0.95) 100%)",
          }}
          aria-hidden="true"
        />

        {/* top header readability fade */}
        <div
          className="fixed inset-x-0 top-0 z-30 h-32 pointer-events-none header-fade"
          aria-hidden="true"
        />

        {/* circuits + code streams on edges (non-interactive) */}
        <CinematicAtmosphere />

        <HUDOverlay />
        <Navbar />

        <main className="relative z-10 pt-20">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
