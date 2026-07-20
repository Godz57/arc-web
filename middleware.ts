import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const APEX_HOST = "arcweb.com.br";
const WWW_HOST = "www.arcweb.com.br";

const intlMiddleware = createMiddleware(routing);

/**
 * 1) Canonical host: www → apex permanent redirect
 * 2) Locale routing via next-intl (pt default, en prefix as-needed)
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

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
