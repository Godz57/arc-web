import "./globals.css";

/**
 * Root layout (passthrough).
 * `<html>` / `<body>` live in `app/[locale]/layout.tsx` so `lang` is locale-aware.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
