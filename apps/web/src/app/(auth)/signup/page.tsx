"use client";
import { authConfig } from "@/carbonix-auth.config";
import { signUp } from "@/lib/carbonix-auth/auth-actions";
import { signUpSchema } from "@/lib/carbonix-auth/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock, FaUser, FaUserPlus } from "react-icons/fa";
import { z } from "zod";

type FormData = z.infer<typeof signUpSchema>;

export default function SignupPage() {
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
      await signUp(data);
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
        className="w-full max-w-4xl flex flex-col md:flex-row border border-[var(--border)] rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.12)] overflow-hidden"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* ── Left Panel ─────────────────────────────────────────────────────── */}
        <motion.div
          className="md:w-1/2 bg-gradient-to-br from-[var(--accent)]/20 to-[var(--button)]/10 p-8 flex flex-col justify-center items-center text-center"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <motion.div
            className="relative flex items-center justify-center w-16 h-16 mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            <div className="absolute w-full h-full bg-[var(--button)]/20 rounded-full animate-pulse" />
            <div className="absolute w-3/4 h-3/4 bg-[var(--accent)]/30 rounded-full" />
            <FaUserPlus className="text-[var(--button)] text-3xl z-10" />
          </motion.div>

          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-1">Create Account</h1>
          <h2 className="text-lg text-[var(--foreground)] mb-3 font-medium">{authConfig.app.name}</h2>
          <p className="text-sm text-[var(--card-foreground)] max-w-xs mb-6">
            Join {authConfig.app.name} today. {authConfig.app.description}
          </p>

          {authConfig.heroImage ? (
            <div className="hidden md:block relative h-56 w-full rounded-2xl overflow-hidden">
              <Image
                src={authConfig.heroImage}
                alt={authConfig.heroImageAlt}
                fill
                style={{ objectFit: "cover" }}
                className="rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <p className="absolute bottom-4 left-4 text-white font-medium">{authConfig.app.tagline}</p>
            </div>
          ) : (
            <p className="text-sm text-[var(--card-foreground)] italic">{authConfig.app.tagline}</p>
          )}
        </motion.div>

        {/* ── Right Panel — Form ──────────────────────────────────────────────── */}
        <motion.div
          className="md:w-1/2 bg-white p-8 flex flex-col justify-center"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
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
                Check your email for a verification link. Redirecting to login...
              </p>
            </motion.div>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-6 text-[var(--foreground)]">Create Your Account</h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Username */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[var(--foreground)] flex items-center gap-2">
                    <span className="w-6 h-6 bg-[var(--button)]/10 rounded-full flex items-center justify-center">
                      <FaUser className="text-[var(--button)] text-xs" />
                    </span>
                    Username
                  </label>
                  <input
                    type="text"
                    placeholder="Choose a username"
                    className={`p-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--button)]/20 transition-all ${errors.userName ? "border-red-400" : "border-[var(--border)]"}`}
                    {...register("userName")}
                  />
                  {errors.userName && <p className="text-red-500 text-xs">{errors.userName.message}</p>}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[var(--foreground)] flex items-center gap-2">
                    <span className="w-6 h-6 bg-[var(--button)]/10 rounded-full flex items-center justify-center">
                      <FaEnvelope className="text-[var(--button)] text-xs" />
                    </span>
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className={`p-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--button)]/20 transition-all ${errors.email ? "border-red-400" : "border-[var(--border)]"}`}
                    {...register("email")}
                  />
                  {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[var(--foreground)] flex items-center gap-2">
                    <span className="w-6 h-6 bg-[var(--button)]/10 rounded-full flex items-center justify-center">
                      <FaLock className="text-[var(--button)] text-xs" />
                    </span>
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Min. 6 characters"
                    className={`p-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--button)]/20 transition-all ${errors.password ? "border-red-400" : "border-[var(--border)]"}`}
                    {...register("password")}
                  />
                  {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[var(--foreground)] flex items-center gap-2">
                    <span className="w-6 h-6 bg-[var(--button)]/10 rounded-full flex items-center justify-center">
                      <FaLock className="text-[var(--button)] text-xs" />
                    </span>
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="Re-enter password"
                    className={`p-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--button)]/20 transition-all ${errors.confirmPassword ? "border-red-400" : "border-[var(--border)]"}`}
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
                  className={`w-full bg-[var(--button)] text-white py-3 rounded-xl text-sm font-medium mt-1 flex items-center justify-center gap-2 transition-opacity ${loading ? "opacity-60 cursor-not-allowed" : "hover:opacity-90"}`}
                  whileHover={{ scale: loading ? 1 : 1.01 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Creating account...
                    </>
                  ) : "Sign Up"}
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
      </motion.div>
    </div>
  );
}
