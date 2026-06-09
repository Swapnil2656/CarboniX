"use client";
import { verifyEmail } from "@/lib/carbonix-auth/auth-actions";
import { authConfig } from "@/carbonix-auth.config";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

function VerifyContent() {
  const params = useSearchParams();
  const token = params.get("token");
  const router = useRouter();
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setError("No verification token found in the URL.");
      return;
    }

    const verify = async () => {
      try {
        await verifyEmail(token);
        setStatus("success");
        setTimeout(() => router.push(authConfig.routes.signIn), 3000);
      } catch (err) {
        setStatus("error");
        setError(err instanceof Error ? err.message : "Verification failed. Please try again.");
      }
    };

    verify();
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-[var(--card)] p-6">
      <motion.div
        className="bg-white border border-[var(--border)] rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-10 max-w-sm w-full text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {status === "verifying" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="w-16 h-16 mx-auto mb-6 relative">
              <div className="absolute inset-0 bg-[var(--button)]/10 rounded-full animate-ping" />
              <div className="relative w-full h-full bg-[var(--button)]/20 rounded-full flex items-center justify-center">
                <span className="w-7 h-7 border-[3px] border-[var(--button)] border-t-transparent rounded-full animate-spin block" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">Verifying your email</h2>
            <p className="text-sm text-[var(--card-foreground)]">Just a moment…</p>
          </motion.div>
        )}

        {status === "success" && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-green-600 mb-2">Email Verified!</h2>
            <p className="text-sm text-[var(--card-foreground)]">
              Your account is active. Redirecting to login…
            </p>
          </motion.div>
        )}

        {status === "error" && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="w-16 h-16 bg-red-100 rounded-full mx-auto flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-red-600 mb-2">Verification Failed</h2>
            <p className="text-sm text-[var(--card-foreground)] mb-6">{error}</p>
            <Link
              href="/signup"
              className="inline-block bg-[var(--button)] text-white text-sm font-medium px-6 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
            >
              Back to Sign Up
            </Link>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <span className="w-8 h-8 border-4 border-[var(--button)] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <VerifyContent />
    </Suspense>
  );
}
