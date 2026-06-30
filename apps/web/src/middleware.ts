import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { authConfig } from "./carbonix-auth.config";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // ── Unauthenticated access to protected route ──────────────────────────────
  if (!token && !authConfig.publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL(authConfig.routes.signIn, req.url));
  }

  // ── Admin-only prefix guard ────────────────────────────────────────────────
  if (
    pathname.startsWith(authConfig.adminPrefix) &&
    !token
  ) {
    const fallback = authConfig.routes.signIn;
    return NextResponse.redirect(new URL(fallback, req.url));
  }

  // ── Onboarding Guard ───────────────────────────────────────────────────────
  if (
    token && 
    !token.isOnboarded && 
    pathname !== "/" &&
    !pathname.startsWith('/onboarding') && 
    !pathname.startsWith('/api/onboarding')
  ) {
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  // ── Redirect logged-in users away from auth pages ─────────────────────────
  if (token && authConfig.publicRoutes.includes(pathname) && pathname !== "/" && pathname !== authConfig.routes.verify && pathname !== "/onboarding") {
    // If they are on an auth page like /login but they are logged in, send them to dashboard
    const destination = authConfig.roleRedirects[token.type as string] ?? authConfig.defaultRedirect;
    return NextResponse.redirect(new URL(destination, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
