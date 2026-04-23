"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { KnowledgeCard, CardHeader, CardBody } from "@/components/KnowledgeCard";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [isOtpStep, setIsOtpStep] = useState(false);
  const [otp, setOtp] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsOtpStep(true); // Trigger OTP verification for "first login or new device"
    }, 1000);
  };

  const handleOtpVerify = (e: React.FormEvent) => {
     e.preventDefault();
     setLoading(true);
     setTimeout(() => {
       router.push("/student");
     }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-6 relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-primary_fixed_dim/30 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-secondary_fixed_dim/30 blur-[120px] pointer-events-none" />

      <KnowledgeCard className="w-full max-w-md relative z-10 p-10 bg-surface_container_lowest/80 backdrop-blur-3xl border border-outline_variant/40 shadow-ambient">
        <CardHeader className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-signature-gradient flex items-center justify-center text-on_primary font-bold font-manrope text-2xl mx-auto mb-6 shadow-ambient">
            BA
          </div>
          <h1 className="text-3xl font-manrope font-bold tracking-tight mb-2">Academic Atelier</h1>
          <p className="text-on_surface_variant">
            {isOtpStep ? "Device Verification required" : "Sign in to your learning portal"}
          </p>
        </CardHeader>
        
        <CardBody>
          {!isOtpStep ? (
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2 text-on_surface">Email Address / Username</label>
                <input
                  id="email"
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface_container_high text-on_surface rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary transition-all border border-transparent focus:border-primary/20"
                  placeholder="you@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-semibold mb-2 text-on_surface flex justify-between">
                  Password
                  <button type="button" className="text-primary hover:text-primary_container text-xs font-bold uppercase transition-colors">Show</button>
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  defaultValue="••••••••"
                  className="w-full bg-surface_container_high text-on_surface rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary transition-all border border-transparent focus:border-primary/20"
                />
              </div>

              <div className="pt-2 flex flex-col gap-4">
                <button 
                  type="submit" 
                  disabled={loading}
                  className={cn(
                    "w-full rounded-full py-3.5 px-4 font-bold text-sm bg-signature-gradient text-on_primary shadow-ambient transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
                    loading && "opacity-70 pointer-events-none"
                  )}
                >
                  {loading ? "Authenticating..." : "Sign In"}
                </button>
                
                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-outline_variant/30"></div>
                  <span className="flex-shrink-0 mx-4 text-xs font-semibold text-outline tracking-widest uppercase">Or</span>
                  <div className="flex-grow border-t border-outline_variant/30"></div>
                </div>

                <button 
                  type="button" 
                  className="w-full rounded-full py-3.5 px-4 font-bold text-sm bg-surface_container_highest border border-outline_variant/30 text-on_surface shadow-sm transition-all duration-300 hover:bg-surface_container_high flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5 mx-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Sign In with Google
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleOtpVerify} className="space-y-6">
              <p className="text-xs text-on_surface text-center mb-6 border border-primary/20 bg-primary/5 p-3 rounded-lg">
                We detected a login from a new device. Please enter the 6-digit code sent to your registered email.
              </p>
              
              <div className="flex justify-between gap-2">
                {[1, 2, 3, 4, 5, 6].map((digit) => (
                  <input
                     key={digit}
                     type="text"
                     maxLength={1}
                     className="w-12 h-14 text-center text-xl font-bold font-manrope bg-surface_container_high text-on_surface rounded-xl outline-none focus:ring-2 focus:ring-primary transition-all border border-transparent focus:border-primary/20"
                  />
                ))}
              </div>
              
              <div className="pt-6">
                 <button 
                  type="submit" 
                  disabled={loading}
                  className={cn(
                    "w-full rounded-full py-3.5 px-4 font-bold text-sm bg-signature-gradient text-on_primary shadow-ambient transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
                    loading && "opacity-70 pointer-events-none"
                  )}
                >
                  {loading ? "Verifying..." : "Verify Device"}
                </button>
              </div>
              
              <div className="text-center mt-4">
                 <button type="button" className="text-sm font-bold text-primary hover:underline">Resend OTP</button>
              </div>
            </form>
          )}
          
          <div className="mt-8 text-center">
            <p className="text-sm text-on_surface_variant">
              Don&apos;t have an account? <a href="#" className="font-semibold text-primary hover:text-primary_container ml-1">Request Access</a>
            </p>
          </div>
        </CardBody>
      </KnowledgeCard>

    </div>
  );
}
