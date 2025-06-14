import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow access to auth pages and public assets
  if (
    pathname.startsWith("/auth") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname.startsWith("/public") ||
    pathname === "/"
  ) {
    return NextResponse.next()
  }

  // In development, be more lenient with auth checks
  if (process.env.NODE_ENV === "development") {
    // Check for any directus-related cookies
    const hasDirectusToken =
      request.cookies.get("directus_session_token") ||
      request.cookies.get("directus_refresh_token") ||
      request.cookies.get("directus_access_token")

    // If no tokens found, redirect to sign-in
    if (!hasDirectusToken) {
      return NextResponse.redirect(new URL("/auth/signin", request.url))
    }
  } else {
    // Production: stricter token checking
    const authToken = request.cookies.get("directus_session_token")
    if (!authToken) {
      return NextResponse.redirect(new URL("/auth/signin", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth (auth pages)
     * - api (API routes)
     */
    "/((?!_next/static|_next/image|favicon.ico|auth|api).*)",
  ],
}
