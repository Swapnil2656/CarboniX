"use client";

import { signUp } from "@/lib/carbonix-auth/auth-actions";
import { signUpSchema } from "@/lib/carbonix-auth/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { MagicDust } from "@/components/ui/magic-dust-shader";

type FormData = z.infer<typeof signUpSchema>;

export default function SignupPage() {

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);
    try {
      await signUp(data);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-md md:p-margin bg-black font-body-md text-on-surface selection:bg-primary-container selection:text-on-primary relative overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none flex justify-center items-center opacity-80 overflow-hidden">
        <MagicDust />
      </div>
      <main className="relative z-10 w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-2 min-h-[720px] rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-transparent">
        
        {/* Left Column: Branding Pane */}
        <section className="relative bg-white/[0.03] backdrop-blur-md border-r border-outline-variant/30 p-xl md:p-3xl flex flex-col justify-center items-center text-center overflow-hidden hidden md:flex">
          {/* Background Decorative Element */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none" 
            style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #4e4633 1px, transparent 0)", backgroundSize: "24px 24px" }}
          ></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="mb-xl">
              <Image 
                alt="CarboniX Logo" 
                className="w-20 h-20 object-contain drop-shadow-xl" 
                src="/carbonix-logo.png"
                width={80}
                height={80}
              />
            </div>
            <h1 className="font-headline text-headline text-on-surface mb-md">
              Welcome to <span className="text-primary-container">CarboniX</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
              Your carbon-aware console for high-scale infrastructure management. Monitor, optimize, and neutralize your digital footprint.
            </p>
          </div>

        </section>

        {/* Right Column: Form Pane */}
        <section className="bg-black/40 backdrop-blur-xl p-lg md:p-xl flex flex-col justify-center">
          <div className="w-full max-w-sm mx-auto">
            {success ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-500/10 rounded-full mx-auto flex items-center justify-center mb-4 border border-green-500/20">
                  <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-headline text-on-surface mb-2">Account Created!</h3>
                <p className="text-sm text-on-surface-variant mb-6">
                  Check your email for a verification link. You must verify your email before logging in.
                </p>
                <Link
                  href="/login"
                  className="inline-block bg-primary text-on-primary font-bold py-2 px-6 rounded-[10px] hover:opacity-90 transition-opacity"
                >
                  Go to Login
                </Link>
              </div>
            ) : (
              <>
                <header className="mb-lg">
                  <h2 className="font-section-header text-section-header text-on-surface mb-xs">Create account</h2>
                </header>

                <form className="space-y-sm" onSubmit={handleSubmit(onSubmit)}>
                  
                  {/* Username Field */}
                  <div className="space-y-[2px]">
                    <label className={`font-label-caps text-label-caps ml-1 transition-colors ${errors.userName ? 'text-error' : 'text-on-surface-variant'}`} htmlFor="userName">
                      USERNAME
                    </label>
                    <div className="relative group">
                      <FaUser className={`absolute left-md top-1/2 -translate-y-1/2 transition-colors ${errors.userName ? 'text-error' : 'text-outline group-focus-within:text-primary-container'}`} />
                      <input 
                        id="userName"
                        type="text" 
                        placeholder="Choose a username" 
                        className={`w-full bg-surface-dim border rounded-lg py-sm pl-[48px] pr-md text-on-surface font-body-md outline-none focus:ring-1 focus:ring-primary-container focus:border-primary-container transition-all ${errors.userName ? 'border-error' : 'border-outline-variant'}`}
                        {...register("userName")}
                      />
                    </div>
                    {errors.userName && <p className="text-error text-xs ml-1">{errors.userName.message}</p>}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-[2px]">
                    <label className={`font-label-caps text-label-caps ml-1 transition-colors ${errors.email ? 'text-error' : 'text-on-surface-variant'}`} htmlFor="email">
                      WORK EMAIL
                    </label>
                    <div className="relative group">
                      <FaEnvelope className={`absolute left-md top-1/2 -translate-y-1/2 transition-colors ${errors.email ? 'text-error' : 'text-outline group-focus-within:text-primary-container'}`} />
                      <input 
                        id="email"
                        type="email" 
                        placeholder="name@company.com" 
                        className={`w-full bg-surface-dim border rounded-lg py-sm pl-[48px] pr-md text-on-surface font-body-md outline-none focus:ring-1 focus:ring-primary-container focus:border-primary-container transition-all ${errors.email ? 'border-error' : 'border-outline-variant'}`}
                        {...register("email")}
                      />
                    </div>
                    {errors.email && <p className="text-error text-xs ml-1">{errors.email.message}</p>}
                  </div>

                  {/* Password Field */}
                  <div className="space-y-[2px]">
                    <label className={`font-label-caps text-label-caps ml-1 transition-colors ${errors.password ? 'text-error' : 'text-on-surface-variant'}`} htmlFor="password">
                      PASSWORD
                    </label>
                    <div className="relative group">
                      <FaLock className={`absolute left-md top-1/2 -translate-y-1/2 transition-colors ${errors.password ? 'text-error' : 'text-outline group-focus-within:text-primary-container'}`} />
                      <input 
                        id="password"
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••" 
                        className={`w-full bg-surface-dim border rounded-lg py-sm pl-[48px] pr-[48px] text-on-surface font-body-md outline-none focus:ring-1 focus:ring-primary-container focus:border-primary-container transition-all ${errors.password ? 'border-error' : 'border-outline-variant'}`}
                        {...register("password")}
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-md top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
                      >
                        {showPassword ? <FaEyeSlash className="text-[18px]" /> : <FaEye className="text-[18px]" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-error text-xs ml-1">{errors.password.message}</p>}
                  </div>

                  {/* Confirm Password Field */}
                  <div className="space-y-[2px]">
                    <label className={`font-label-caps text-label-caps ml-1 transition-colors ${errors.confirmPassword ? 'text-error' : 'text-on-surface-variant'}`} htmlFor="confirmPassword">
                      CONFIRM PASSWORD
                    </label>
                    <div className="relative group">
                      <FaLock className={`absolute left-md top-1/2 -translate-y-1/2 transition-colors ${errors.confirmPassword ? 'text-error' : 'text-outline group-focus-within:text-primary-container'}`} />
                      <input 
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"} 
                        placeholder="Confirm your password" 
                        className={`w-full bg-surface-dim border rounded-lg py-sm pl-[48px] pr-[48px] text-on-surface font-body-md outline-none focus:ring-1 focus:ring-primary-container focus:border-primary-container transition-all ${errors.confirmPassword ? 'border-error' : 'border-outline-variant'}`}
                        {...register("confirmPassword")}
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-md top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
                      >
                        {showConfirmPassword ? <FaEyeSlash className="text-[18px]" /> : <FaEye className="text-[18px]" />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-error text-xs ml-1">{errors.confirmPassword.message}</p>}
                  </div>

                  {error && (
                    <div className="text-error text-sm bg-error-container/20 border border-error-container rounded-lg p-2 mt-sm">
                      {error}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="space-y-sm pt-sm">
                    <button 
                      type="submit" 
                      disabled={loading}
                      className={`w-full bg-primary-container text-on-primary font-bold py-sm rounded-[10px] hover:bg-primary-fixed-dim active:scale-95 transition-all shadow-lg shadow-primary-container/10 flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-on-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg> 
                          Creating...
                        </>
                      ) : "Create Account"}
                    </button>


                  </div>
                </form>

                <footer className="mt-md text-center">
                  <p className="text-sm text-on-surface-variant">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary-fixed-dim font-bold hover:underline underline-offset-4 ml-1 transition-all">
                      Log in
                    </Link>
                  </p>
                </footer>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
