import { NextRequest, NextResponse } from "next/server";

const ALLOWED_PATHS = ["/suspended"];

const ALLOWED_PREFIXES = ["/api", "/_next"];

const ALLOWED_STATIC = [
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
  "/logo.svg",
  "/images/",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only check if site is suspended
  if (process.env.SITE_STATUS !== "suspended") {
    return NextResponse.next();
  }

  // Allow suspended page
  if (ALLOWED_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  // Allow API routes
  if (ALLOWED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  // Allow specific static files
  if (ALLOWED_STATIC.some((path) => pathname === path || pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Redirect everything else to /suspended
  const suspendedUrl = request.nextUrl.clone();
  suspendedUrl.pathname = "/suspended";
  return NextResponse.redirect(suspendedUrl);
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     */
    "/((?!_next/static|_next/image|favicon\\.ico).*)",
  ],
};