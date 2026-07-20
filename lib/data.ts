/**
 * Public site contact / social — override via NEXT_PUBLIC_* env vars.
 * Keys must be static (Next.js inlines process.env.NEXT_PUBLIC_* at build).
 *
 * Marketing copy lives in `@/lib/content` (locale-aware). UI chrome in `messages/`.
 */

export const whatsappNumber = (
  process.env.NEXT_PUBLIC_WHATSAPP ?? ""
).trim();

export const siteContact = {
  email: (
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contato@arcweb.com.br"
  ).trim(),
  whatsapp: whatsappNumber,
  github: (
    process.env.NEXT_PUBLIC_GITHUB ?? "https://github.com/Godz57"
  ).trim(),
  linkedin: (
    process.env.NEXT_PUBLIC_LINKEDIN ??
    "https://www.linkedin.com/in/gabriel-lucas-a2662b421"
  ).trim(),
};

export function whatsappUrl(message?: string): string | null {
  if (!whatsappNumber) return null;
  const base = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
