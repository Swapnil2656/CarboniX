"use client";
import { authConfig } from "@/carbonix-auth.config";
import { signUp } from "@/lib/carbonix-auth/auth-actions";
import { signUpSchema } from "@/lib/carbonix-auth/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";

type FormData = z.infer<typeof signUpSchema>;

export default function SignupPage() {
  const router = useRouter();
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
                alt="Carbonix Logo" 
                className="w-16 h-16 object-contain" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlHM2nsbfjGZR9awHPd3zarQz6zsfGRZRkikUV-QmGKtV0UqVHQ3xVru8iEPKNcRnc4xVdziwxPQHLThEtF3USHWZcc6GnRLBgBW46kzR5B_cctRibzkNipQR7yBbwPH0K9yvnhpWze4TjguCDx0E56izXfEgs1gZkIYxILcY7m90FuRaGxi-GIu-uF1GLeb2wj76FDtmvIjvUieCCNUWKnTcAb2wMiKtdT5MMfHUZN0qG_gys39fUAOvEU_nmikyDQoalAP5jGvjp" 
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
        <section className="bg-surface-container p-lg md:p-xl flex flex-col justify-center">
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
                  <p className="font-body-md text-body-md text-on-surface-variant">Start your 14-day free trial. No card required.</p>
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

                    <div className="flex items-center gap-md py-xs">
                      <div className="h-px flex-1 bg-outline-variant"></div>
                      <span className="font-label-caps text-[10px] text-outline uppercase tracking-widest">or</span>
                      <div className="h-px flex-1 bg-outline-variant"></div>
                    </div>

                    <button 
                      type="button" 
                      className="w-full border border-primary-container/30 text-primary-container font-bold py-sm rounded-[10px] hover:bg-primary-container/5 active:scale-95 transition-all flex items-center justify-center gap-sm"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>
                      Sign up with GitHub
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
