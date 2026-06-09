/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║     CARBONIX AUTH CONFIG — edit this file only           ║
 * ║  All pages, middleware, and redirects read from here     ║
 * ╚══════════════════════════════════════════════════════════╝
 */

export const authConfig = {
  // ─── App Identity ──────────────────────────────────────────
  app: {
    name: "Carbonix",
    tagline: "The carbon cost of your cloud infrastructure",
    description: "Admin panel for the Carbonix developer platform.",
  },

  // ─── Hero Image ────────────────────────────────────────────
  heroImage: "/images/carbonix-og.png",
  heroImageAlt: "Carbonix — Carbon footprint calculation platform",

  // ─── Role → Dashboard Redirect Map ─────────────────────────
  // Matches Prisma userType enum. Each role lands on its own route.
  roleRedirects: {
    SUPER_ADMIN: "/admin/dashboard",
    ADMIN: "/admin/dashboard",
    ANALYST: "/admin/analytics",
    CONTENT_EDITOR: "/admin/content",
    USER: "/",  // regular users redirect to landing page
  } as Record<string, string>,

  defaultRedirect: "/",

  // ─── Routes ────────────────────────────────────────────────
  routes: {
    signIn: "/login",
    afterSignOut: "/login",
    afterSignUp: "/login",
    verify: "/verify",
  },

  // ─── Public Routes ─────────────────────────────────────────
  publicRoutes: [
    "/",
    "/login",
    "/signup",
    "/verify",
    "/docs",
    "/docs/api-reference",
    "/docs/sdk-reference",
    "/docs/regions",
    "/docs/methodology",
    "/docs/ci-cd",
    "/playground",
    "/analyst/signup",
    "/content_editor/signup",
  ],

  // ─── Admin Route Prefix ────────────────────────────────────
  adminPrefix: "/admin",
};
