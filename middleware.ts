import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const APEX_HOST = "arcweb.com.br";
const WWW_HOST = "www.arcweb.com.br";

/**
 * Canonical host: apex only.
 * www → apex permanent redirect (avoids duplicate indexing).
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase();

  if (host === WWW_HOST) {
    const url = request.nextUrl.clone();
    url.hostname = APEX_HOST;
    url.protocol = "https:";
    url.port = "";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  // Skip static assets / Next internals for speed
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.svg|.*\\.(?:svg|png|jpg|jpeg|gif|webp|glb|txt)$).*)",
  ],
};
