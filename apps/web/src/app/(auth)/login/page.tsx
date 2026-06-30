"use client";

import { signInUser } from "@/lib/carbonix-auth/auth-actions";
import { signInSchema } from "@/lib/carbonix-auth/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

type FormData = z.infer<typeof signInSchema>;

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);
    const result = await signInUser(data);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/login/confirm");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-md md:p-margin bg-background font-body-md text-on-surface selection:bg-primary-container selection:text-on-primary">
      <main className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-2 min-h-[720px] rounded-xl overflow-hidden border border-outline-variant shadow-2xl">
        
        {/* Left Column: Branding Pane */}
        <section className="relative bg-surface p-xl md:p-3xl flex flex-col justify-between overflow-hidden hidden md:flex">
          {/* Background Decorative Element */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none" 
            style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #4e4633 1px, transparent 0)", backgroundSize: "24px 24px" }}
          ></div>
          
          <div className="relative z-10">
            <div className="mb-xl">
              <img 
                alt="CarboniX Logo" 
                className="w-16 h-16 object-contain" 
                src="/carbonix-logo.png" 
              />
            </div>
            <h1 className="font-headline text-headline text-on-surface mb-md">
              Welcome back to <span className="text-primary-container">CarboniX</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
              Your carbon-aware console for high-scale infrastructure management. Monitor, optimize, and neutralize your digital footprint.
            </p>
          </div>
          
          <div className="relative z-10">
            <div className="p-lg bg-surface-container-low rounded-lg border border-outline-variant">
              <div className="flex items-center gap-md mb-sm">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="font-label-caps text-label-caps text-on-surface-variant">REAL-TIME GRID STATUS</span>
              </div>
              <div className="font-code text-code text-primary-container">
                EMISSIONS: 240g CO2/kWh <br/>
                LOAD: 84% OPTIMIZED
              </div>
            </div>
            <div className="mt-xl flex items-center gap-md">
              <div className="flex -space-x-2">
                <img className="w-8 h-8 rounded-full border-2 border-surface object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtol0xgN956QuJNxYJ5w31FGLcgMWrpB9IrXQY6A3cvKGWks-QsQ4neu031szkwEiX9uVmhvKljyekyN29ZUWNy8W8qwjmfkXAw-FZQa67UnZhleiqK3BfPoSQcxVoBEv2Exsvp3Vq90tsXYjP8gCCOdV2Qw7Oo8TxAi5oBoXR94f_Zpo-jjdDqqYZzdxJRcWu9HMuYGcLxIU5ZKepKmJoSrMeGydVXbE-nvcXF30gzYQA_RpYuGHQ_5NE2VkdMxb0tfBDPneYB_8o" alt="User 1" />
                <img className="w-8 h-8 rounded-full border-2 border-surface object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuABqknmbEO84RuxSOuGQ47c9Hh-2WZPQYa_y-CvCiT2EPBdIdpHHlbjDuVu-lG0gDrftPFkVce5fRalbeuZ4ejwR6OWIP3JBGRWq_iSURSbQLtlCQ11pJLAFxQmZMW_8TsFcWRZxiocqu0gXxJQTsH9o72y0QWqKEmXK7NxuJ8U2DzerdBBK17HRh-CWn5CNfXWDPmX5ptCY41jiqqvG2uXmC1U1Pn2nHkF5r-zmoBek20IX6AclaWRbsLAFUK77ANWC8MdmBkk4kJc" alt="User 2" />
                <img className="w-8 h-8 rounded-full border-2 border-surface object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaoT-zEoIzA_Pf0we5nCvYBCwcI42JzfWkPVdG2lJmoA_9PUJsu_rv2-iyM-0K_b5_xaAcjZJ7KmBLym0CmNZYVUhJGoe-M0-4X-mt0m2gvPs2dHNlcAIqNIwb4hnrXB_tG2_8dTI86XUm9pzObmOjHTCIDtVkhwhEazNFxKqkr4dDwW9J3vohELbQQqoGEimqhdGke6Tga0gKuSjUCUolHRJ3V6yAnuBDD2zrVxFOHwHlpwGoRCa0C9E7jRjQEHiFJfVknBqtVFZj" alt="User 3" />
              </div>
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">Joined by 2k+ Engineers</span>
            </div>
          </div>
          {/* Abstract Visual */}
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary-container/10 rounded-full blur-3xl"></div>
        </section>

        {/* Right Column: Form Pane */}
        <section className="bg-surface-container p-xl md:p-3xl flex flex-col justify-center">
          <div className="w-full max-w-sm mx-auto">
            <header className="mb-xl">
              <h2 className="font-section-header text-section-header text-on-surface mb-xs">Log in</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Enter your credentials to access the console.</p>
            </header>

            <form className="space-y-lg" onSubmit={handleSubmit(onSubmit)}>
              {/* Email Field */}
              <div className="space-y-sm">
                <label className={`font-label-caps text-label-caps flex items-center gap-xs transition-colors ${errors.email ? 'text-error' : 'text-on-surface-variant'}`} htmlFor="email">
                  <FaEnvelope className="text-[14px]" /> EMAIL ADDRESS
                </label>
                <input 
                  id="email"
                  type="email" 
                  placeholder="engineer@carbonix.io" 
                  className={`w-full bg-surface-dim border rounded-lg p-md text-on-surface placeholder:text-on-surface-variant/40 focus:ring-1 focus:ring-primary-container focus:border-primary-container transition-all outline-none font-body-md ${errors.email ? 'border-error' : 'border-outline-variant'}`}
                  {...register("email")}
                />
                {errors.email && <p className="text-error text-xs">{errors.email.message}</p>}
              </div>

              {/* Password Field */}
              <div className="space-y-sm">
                <div className="flex justify-between items-end">
                  <label className={`font-label-caps text-label-caps flex items-center gap-xs transition-colors ${errors.password ? 'text-error' : 'text-on-surface-variant'}`} htmlFor="password">
                    <FaLock className="text-[14px]" /> PASSWORD
                  </label>
                  <a className="font-label-caps text-label-caps text-primary-container hover:underline underline-offset-4" href="#">Forgot Password?</a>
                </div>
                <div className="relative">
                  <input 
                    id="password"
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••••••" 
                    className={`w-full bg-surface-dim border rounded-lg p-md text-on-surface placeholder:text-on-surface-variant/40 focus:ring-1 focus:ring-primary-container focus:border-primary-container transition-all outline-none font-body-md ${errors.password ? 'border-error' : 'border-outline-variant'}`}
                    {...register("password")}
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-md top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors"
                  >
                    {showPassword ? <FaEyeSlash className="text-[18px] opacity-80" /> : <FaEye className="text-[18px] opacity-80" />}
                  </button>
                </div>
                {errors.password && <p className="text-error text-xs">{errors.password.message}</p>}
              </div>

              {error && (
                <div className="text-error text-sm bg-error-container/20 border border-error-container rounded-lg p-3">
                  {error}
                </div>
              )}

              {/* Actions */}
              <div className="pt-md space-y-md">
                <button 
                  type="submit" 
                  disabled={loading}
                  className={`w-full py-md bg-primary-container text-on-primary font-bold rounded-[10px] hover:bg-primary-fixed-dim transition-all active:scale-95 glow-hover flex items-center justify-center gap-2 ${loading ? 'opacity-70' : ''}`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-on-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg> 
                      Signing In...
                    </>
                  ) : "Sign In"}
                </button>


              </div>

              <footer className="mt-xl pt-lg border-t border-outline-variant text-center">
                <p className="font-body-md text-on-surface-variant">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="text-primary-container font-bold hover:underline underline-offset-4">
                    Sign up
                  </Link>
                </p>
              </footer>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
