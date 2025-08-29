import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect admin routes
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const session = request.cookies.get("session")

    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }

    try {
      const sessionData = JSON.parse(session.value)
      const expires = new Date(sessionData.expires)

      if (expires < new Date()) {
        const response = NextResponse.redirect(new URL("/admin/login", request.url))
        response.cookies.delete("session")
        return response
      }
    } catch {
      const response = NextResponse.redirect(new URL("/admin/login", request.url))
      response.cookies.delete("session")
      return response
    }
  }

  // Redirect to admin dashboard if already logged in and trying to access login
  if (pathname === "/admin/login") {
    const session = request.cookies.get("session")
    if (session) {
      try {
        const sessionData = JSON.parse(session.value)
        const expires = new Date(sessionData.expires)

        if (expires > new Date()) {
          return NextResponse.redirect(new URL("/admin", request.url))
        }
      } catch {
        // Invalid session, continue to login
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
