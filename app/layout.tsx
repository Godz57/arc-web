import type { Metadata } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "ARC WEB | Sites que parecem tecnologia do futuro",
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
  authors: [{ name: "ARC WEB" }],
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
      <body className="min-h-full bg-carbon font-rajdhani text-arc-blue">
        {children}
      </body>
    </html>
  );
}
