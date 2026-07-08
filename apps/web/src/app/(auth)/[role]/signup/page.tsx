"use client";
/**
 * Dynamic Role Signup — /[role]/signup
 *
 * One page handles ALL custom roles (e.g. /guide/signup, /seller/signup).
 *
 * To add a new role:
 *   1. Add the role to `userType` enum in prisma/schema.prisma
 *   2. Add `/your-role/signup` to `publicRoutes` in auth.config.ts
 *   3. Add a `roleRedirects` entry in auth.config.ts
 *   4. Optionally add a label to `roleLabels` below
 *   Done — no new page files needed.
 */
import { authConfig } from "@/carbonix-auth.config";
import { signUp } from "@/lib/carbonix-auth/auth-actions";
import { signUpSchema } from "@/lib/carbonix-auth/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock, FaUser, FaUserPlus } from "react-icons/fa";
import { z } from "zod";
import { userType } from "@/generated/prisma";

type FormData = z.infer<typeof signUpSchema>;

// Human-readable labels per role slug — add new roles here if needed
const roleLabels: Record<string, string> = {
  guide: "Guide",
  seller: "Seller",
  moderator: "Moderator",
  // add more as needed
};

export default function RoleSignupPage() {
  const params = useParams();
  const roleSlug = (params?.role as string)?.toLowerCase() ?? "";

  // Map slug → Prisma enum value (uppercase)
  const resolvedType = (roleSlug.toUpperCase() as keyof typeof userType) in userType
    ? userType[roleSlug.toUpperCase() as keyof typeof userType]
    : userType.USER;

  const roleLabel = roleLabels[roleSlug] ?? roleSlug.charAt(0).toUpperCase() + roleSlug.slice(1);

  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);
    try {
      await signUp({ ...data, type: resolvedType });
      setSuccess(true);
      setTimeout(() => router.push(authConfig.routes.afterSignUp), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-[var(--card)] p-6">
      <motion.div
        className="w-full max-w-md bg-white border border-[var(--border)] rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {success ? (
          <motion.div
            className="text-center py-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">Account Created!</h3>
            <p className="text-sm text-[var(--card-foreground)]">
              Check your email for a verification link. Redirecting to login…
            </p>
          </motion.div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center gap-3 mb-7">
              <div className="w-10 h-10 bg-[var(--button)]/10 rounded-full flex items-center justify-center">
                {/* @ts-ignore react-icons typescript definition mismatch */}
                <FaUserPlus className="text-[var(--button)]" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[var(--foreground)]">
                  {roleLabel} Sign Up
                </h1>
                <p className="text-xs text-[var(--card-foreground)]">{authConfig.app.name}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Username */}
              <div className="flex flex-col gap-1">
                <label className="text-sm text-[var(--foreground)] flex items-center gap-2">
                  {/* @ts-ignore react-icons typescript definition mismatch */}
                  <FaUser className="text-[var(--button)] text-xs" /> Username
                </label>
                <input
                  type="text"
                  placeholder="Choose a username"
                  className={`p-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--button)]/20 ${errors.userName ? "border-red-400" : "border-[var(--border)]"}`}
                  {...register("userName")}
                />
                {errors.userName && <p className="text-red-500 text-xs">{errors.userName.message}</p>}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <label className="text-sm text-[var(--foreground)] flex items-center gap-2">
                  {/* @ts-ignore react-icons typescript definition mismatch */}
                  <FaEnvelope className="text-[var(--button)] text-xs" /> Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className={`p-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--button)]/20 ${errors.email ? "border-red-400" : "border-[var(--border)]"}`}
                  {...register("email")}
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1">
                <label className="text-sm text-[var(--foreground)] flex items-center gap-2">
                  {/* @ts-ignore react-icons typescript definition mismatch */}
                  <FaLock className="text-[var(--button)] text-xs" /> Password
                </label>
                <input
                  type="password"
                  placeholder="Min. 6 characters"
                  className={`p-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--button)]/20 ${errors.password ? "border-red-400" : "border-[var(--border)]"}`}
                  {...register("password")}
                />
                {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-1">
                <label className="text-sm text-[var(--foreground)] flex items-center gap-2">
                  {/* @ts-ignore react-icons typescript definition mismatch */}
                  <FaLock className="text-[var(--button)] text-xs" /> Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Re-enter password"
                  className={`p-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--button)]/20 ${errors.confirmPassword ? "border-red-400" : "border-[var(--border)]"}`}
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
              </div>

              {error && (
                <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3">
                  {error}
                </div>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                className={`w-full bg-[var(--button)] text-white py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-opacity ${loading ? "opacity-60 cursor-not-allowed" : "hover:opacity-90"}`}
                whileHover={{ scale: loading ? 1 : 1.01 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating account…
                  </>
                ) : `Sign Up as ${roleLabel}`}
              </motion.button>
            </form>

            <div className="mt-5 text-center text-sm text-[var(--card-foreground)]">
              Already have an account?{" "}
              <Link href="/login" className="text-[var(--button)] hover:underline font-medium">
                Login
              </Link>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
