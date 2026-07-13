import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { authConfig } from "./carbonix-auth.config";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ── Always allow NextAuth internal routes and static assets ───────────────
  // This is a safety net in case the matcher misses something
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // ── Public routes — skip all auth checks ──────────────────────────────────
  // Also add /login/confirm so the post-login redirect doesn't get blocked
  const isPublic =
    authConfig.publicRoutes.includes(pathname) ||
    pathname.startsWith("/login/confirm") ||
    pathname.startsWith("/onboarding") ||
    pathname.startsWith("/api/onboarding") ||
    pathname.startsWith("/verify");

  if (isPublic) {
    return NextResponse.next();
  }

  // ── Read the session token ─────────────────────────────────────────────────
  // On Vercel (HTTPS) the cookie is prefixed with __Secure-
  const useSecureCookies = req.nextUrl.protocol === "https:";
  const cookieName = useSecureCookies
    ? "__Secure-authjs.session-token"
    : "authjs.session-token";

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
    salt: cookieName,
  });

  // ── Unauthenticated: redirect to sign-in ──────────────────────────────────
  if (!token) {
    return NextResponse.redirect(new URL(authConfig.routes.signIn, req.url));
  }

  // ── Onboarding guard ──────────────────────────────────────────────────────
  if (!token.isOnboarded && pathname !== "/") {
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  // ── Redirect logged-in users away from auth pages ─────────────────────────
  const authRoutes = ["/login", "/signup", "/analyst/signup", "/content_editor/signup"];
  if (authRoutes.includes(pathname)) {
    const destination =
      authConfig.roleRedirects[token.type as string] ??
      authConfig.defaultRedirect;
    return NextResponse.redirect(new URL(destination, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.apk$).*)"],
};
