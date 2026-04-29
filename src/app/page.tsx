"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ShieldAlert, Eye, EyeOff, Lock } from "lucide-react";

const WORDS = [
  "FOCUS.", "PATIENCE.", "CONSISTENCY.", "CONTROL.",
  "PRECISION.", "CONFIDENCE.", "RISK MANAGEMENT.", "DISCIPLINE.", "STRATEGY.",
];

function ScrollingWords() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const cycle = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % WORDS.length);
        setVisible(true);
      }, 500);
    }, 2200);
    return () => clearInterval(cycle);
  }, []);

  return (
    <p
      className="text-xs font-bold tracking-[0.35em] uppercase transition-all duration-500"
      style={{
        color: "#00a2cf",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-8px)",
      }}
    >
      YOUR SUCCESS DEMANDS&nbsp;&nbsp;{WORDS[index]}
    </p>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/institutional");
      const data = await res.json();

      // Check users registry for matching userId + password
      const allUsers = [
        ...(data.students || []),
        ...(data.teachers || []),
        ...(data.admins || []),
      ];

      const user = allUsers.find(
        (u: any) =>
          (u.userId === userId || u.id === userId) && u.password === password
      );

      // Check owner access
      const isOwner = userId === "OWNER" && password === "bluemantle@owner2026";

      setTimeout(() => {
        setLoading(false);

        if (isOwner) {
          router.push("/admin");
          return;
        }

        if (!user) {
          setError("Invalid User ID or password. Contact your administrator.");
          return;
        }

        if (user.status === "suspended") {
          setError("Your account has been suspended. Contact your administrator.");
          return;
        }

        // Route by role
        if (user.role === "admin") router.push("/admin");
        else if (user.role === "teacher") router.push("/teacher");
        else router.push("/student");
      }, 1200);
    } catch {
      setLoading(false);
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex bg-[#080c14] relative overflow-hidden">
      {/* Left: Motivational Panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-16 relative">
        {/* Top Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00a2cf] to-[#00658d] flex items-center justify-center text-white font-bold text-sm font-manrope shadow-[0_0_20px_rgba(0,162,207,0.4)]">
            BA
          </div>
          <span className="font-manrope font-bold text-white text-lg">Bluemantle</span>
        </div>

        {/* Center Text */}
        <div className="space-y-6">
          <div className="space-y-2">
            <ScrollingWords />
            <h2 className="text-5xl font-manrope font-black text-white leading-tight tracking-tight">
              Your Premium<br />Learning Portal
            </h2>
          </div>
          <p className="text-[#4a6580] text-sm leading-relaxed max-w-sm">
            Institutional-grade education designed for serious traders and investors. Access your personalized curriculum, track your progress, and grow.
          </p>
        </div>

        {/* Bottom */}
        <p className="text-[#2a3a4a] text-xs font-mono">
          © 2026 Bluemantle Academy · Protected Platform
        </p>

        {/* Decorative glow */}
        <div className="absolute top-1/3 left-0 w-72 h-72 rounded-full bg-[#00a2cf]/5 blur-[100px] pointer-events-none" />
      </div>

      {/* Right: Login Card */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-16">
        <div
          className="w-full max-w-md rounded-2xl p-10 relative"
          style={{
            background: "rgba(12, 18, 30, 0.85)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(0,162,207,0.25)",
            boxShadow: "0 0 40px rgba(0,162,207,0.12), 0 0 80px rgba(0,162,207,0.06), inset 0 0 0 1px rgba(0,162,207,0.08)",
          }}
        >
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00a2cf] to-[#00658d] flex items-center justify-center text-white font-bold text-sm shadow-[0_0_20px_rgba(0,162,207,0.4)]">
              BA
            </div>
            <span className="font-manrope font-bold text-white text-lg">Bluemantle</span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-manrope font-bold text-white mb-1">Sign In</h1>
            <p className="text-[#4a6580] text-sm">Use your academy credentials to continue.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-semibold flex items-center gap-3">
              <ShieldAlert className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* User ID */}
            <div>
              <label className="block text-xs font-bold text-[#4a6580] uppercase tracking-widest mb-2">
                User ID
              </label>
              <input
                type="text"
                required
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="e.g. STU-8821"
                className="w-full bg-[#0a1220] text-white rounded-xl px-4 py-3 text-sm outline-none transition-all border border-[#1a2a3a] focus:border-[#00a2cf]/50 focus:shadow-[0_0_0_3px_rgba(0,162,207,0.1)] placeholder:text-[#2a3a4a]"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-[#4a6580] uppercase tracking-widest mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-[#0a1220] text-white rounded-xl px-4 py-3 pr-12 text-sm outline-none transition-all border border-[#1a2a3a] focus:border-[#00a2cf]/50 focus:shadow-[0_0_0_3px_rgba(0,162,207,0.1)] placeholder:text-[#2a3a4a]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4a6580] hover:text-[#00a2cf] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={cn(
                "w-full rounded-xl py-3.5 font-bold text-sm text-white transition-all duration-300 mt-2",
                "bg-gradient-to-r from-[#00a2cf] to-[#00658d]",
                "shadow-[0_0_20px_rgba(0,162,207,0.3)]",
                "hover:shadow-[0_0_30px_rgba(0,162,207,0.5)] hover:scale-[1.02]",
                "active:scale-[0.98]",
                loading && "opacity-60 pointer-events-none"
              )}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Authenticating...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4" />
                  Sign In
                </span>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#1a2a3a]">
            <p className="text-[#2a3a4a] text-xs text-center">
              Don't have credentials?{" "}
              <span className="text-[#00a2cf] font-semibold">Contact your administrator</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
