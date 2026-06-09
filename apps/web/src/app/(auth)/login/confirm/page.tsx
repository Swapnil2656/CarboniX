"use client";
import { authConfig } from "@/carbonix-auth.config";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Post-login redirect hub.
 * Reads roleRedirects from auth.config.ts — no hardcoded routes here.
 *
 * Flow: /login → signIn() → /login/confirm → role-specific dashboard
 */
export default function ConfirmPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.replace(authConfig.routes.signIn);
      return;
    }

    const userType = session.user?.type as string | undefined;
    const destination =
      (userType && authConfig.roleRedirects[userType]) ??
      authConfig.defaultRedirect;

    router.replace(destination);
  }, [session, status, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-white to-[var(--card)]">
      <span className="w-10 h-10 border-4 border-[var(--button)] border-t-transparent rounded-full animate-spin" />
      <p className="text-sm text-[var(--card-foreground)] font-medium">
        Signing you in to {authConfig.app.name}…
      </p>
    </div>
  );
}
