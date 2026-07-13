import { NextResponse } from "next/server";
import { auth } from "./auth";
import { authConfig } from "./carbonix-auth.config";

export default auth((req) => {
  const token = req.auth;
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
    !token.user?.isOnboarded && 
    pathname !== "/" &&
    !pathname.startsWith('/onboarding') && 
    !pathname.startsWith('/api/onboarding')
  ) {
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  // ── Redirect logged-in users away from auth pages ─────────────────────────
  const authRoutes = ["/login", "/signup", "/analyst/signup", "/content_editor/signup"];
  if (token && authRoutes.includes(pathname)) {
    // If they are on an auth page like /login but they are logged in, send them to dashboard
    const destination = authConfig.roleRedirects[token.user?.type as string] ?? authConfig.defaultRedirect;
    return NextResponse.redirect(new URL(destination, req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.apk$).*)"],
};
