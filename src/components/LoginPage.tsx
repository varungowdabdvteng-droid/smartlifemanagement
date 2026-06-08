/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from "react";

interface LoginPageProps {
  onNavigate: (page: string) => void;
  onLoginSuccess: (user: { user_id: number; full_name: string; email: string; role: string }) => void;
}

export default function LoginPage({ onNavigate, onLoginSuccess }: LoginPageProps) {
  const [email, setEmail] = useState("alex.rivers@smartlife.io");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setErrorError("Fields cannot be left blank.");
      return;
    }

    // Match sample users preseeded in our DBMS project
    let matchedUser = {
      user_id: 1,
      full_name: "Alex Rivers",
      email: "alex.rivers@smartlife.io",
      role: "Premium Member",
    };

    if (email.toLowerCase().includes("sarah")) {
      matchedUser = {
        user_id: 2,
        full_name: "Sarah Jenkins",
        email: "sarah.j@design.co",
        role: "Admin",
      };
    } else if (email.toLowerCase().includes("mark")) {
      matchedUser = {
        user_id: 3,
        full_name: "Mark Thompson",
        email: "mark.t@eng.net",
        role: "User",
      };
    } else if (email.toLowerCase().includes("elena")) {
      matchedUser = {
        user_id: 4,
        full_name: "Elena Rodriguez",
        email: "elena.fit@coach.com",
        role: "User",
      };
    }

    onLoginSuccess(matchedUser);
    onNavigate("dashboard");
  };

  return (
    <div className="bg-[#F8FAFC] text-slate-800 min-h-screen flex flex-col transition-colors duration-300">
      {/* Top sticky logo bar */}
      <header className="w-full bg-white border-b border-slate-200 px-6 md:px-12 h-16 flex items-center justify-between z-50 sticky top-0">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onNavigate("landing")}>
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-[16px] shadow-sm">
            <span className="material-symbols-outlined text-[16px] text-white font-bold">grain</span>
          </div>
          <span className="font-sans text-lg font-black text-slate-950 tracking-tight">
            Zenith<span className="text-emerald-650 text-emerald-650 text-emerald-600">Life</span>
          </span>
          <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider ml-1 border border-slate-200 bg-slate-50 px-2 py-0.5 rounded-full">v2.5.0</span>
        </div>
        <button 
          onClick={() => onNavigate("landing")} 
          className="p-2 rounded-xl hover:bg-slate-50 flex items-center text-emerald-700 hover:text-emerald-800 font-bold text-xs gap-1.5 cursor-pointer transition border border-transparent hover:border-slate-200"
        >
          <span className="material-symbols-outlined text-sm font-bold">home</span>
          <span>Home</span>
        </button>
      </header>

      <main className="flex-grow flex items-center justify-center p-6 relative overflow-hidden">
        {/* Abstract Background Ornaments */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-550/10 rounded-full filter blur-3xl pointer-events-none -z-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full filter blur-3xl pointer-events-none -z-10 animate-pulse" style={{ animationDelay: "1s" }}></div>

        {/* Login Container */}
        <div className="w-full max-w-md bg-white border border-slate-200 shadow-xl rounded-[32px] p-8 transition-all duration-300">
          <div className="text-center mb-8">
            <div className="inline-flex w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl items-center justify-center mb-4 border border-emerald-100">
              <span className="material-symbols-outlined text-2xl font-bold">lock_open</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Welcome Back</h1>
            <p className="text-slate-500 text-sm font-medium">Access your customized ZenithLife health dashboard</p>
          </div>

          {errorMsg && (
            <div className="bg-rose-50 border-l-4 border-rose-500 p-4 mb-4 rounded-xl text-rose-850 text-sm font-semibold">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block" htmlFor="email">Email Address</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors">mail</span>
                <input 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 focus:border-emerald-500 placeholder-slate-400 transition text-sm shadow-inner"
                  id="email" 
                  name="email" 
                  placeholder="alex.rivers@smartlife.io" 
                  required 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5 text-left">
              <div className="flex justify-between items-center text-xs">
                <label className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block" htmlFor="password">Password</label>
                <button 
                  type="button"
                  onClick={() => alert("Simulated database login supports standard preloaded demo accounts (e.g. alex.rivers@smartlife.io with password123).")}
                  className="text-emerald-700 hover:text-emerald-800 font-extrabold"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors">lock</span>
                <input 
                  className="w-full pl-10 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 focus:border-emerald-500 placeholder-slate-400 transition text-sm shadow-inner"
                  id="password" 
                  name="password" 
                  placeholder="••••••••" 
                  required 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span className="material-symbols-outlined text-[18px]">{showPassword ? "visibility_off" : "visibility"}</span>
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2 pt-1">
              <input 
                className="w-4 h-4 rounded border-slate-200 text-emerald-600 focus:ring-emerald-500 accent-emerald-600 cursor-pointer"
                id="remember" 
                name="remember" 
                type="checkbox"
                defaultChecked 
              />
              <label className="text-xs text-slate-500 cursor-pointer select-none font-bold" htmlFor="remember">Keep me signed in for 30 days</label>
            </div>

            {/* Primary CTA */}
            <button 
              className="w-full h-12 bg-emerald-500 text-white font-extrabold text-sm rounded-xl hover:bg-emerald-600 active:scale-95 transition cursor-pointer shadow-sm shadow-emerald-500/10 mt-2"
              type="submit"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-slate-400 font-extrabold tracking-widest text-[10px]">Or login with</span>
            </div>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={handleSubmit}
              className="flex items-center justify-center gap-2 h-11 border border-slate-200 rounded-xl bg-slate-50 hover:bg-slate-100 transition active:scale-95 group font-bold text-xs text-slate-700 cursor-pointer"
            >
              <img 
                alt="Google auth" 
                referrerPolicy="no-referrer"
                className="w-4 h-4" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxvYGkfP8AIb4dR4snbSHmxLTd2xONHe7KMwtcpW3_tuOs2Brhl0Luy3f_aGYAVzc9vBJVkeqxDPDmUQwn7z6s-5hWcIl-jeuwE4Qfuh1VX0mm6y0NOVbTce51M7sNvD3k4fTCENg4LQxV49LE-qUncTPTMfa-FYAqm9lyJnp3H5ZpMXesI8Z4lFFLYjhtpF9UstPdm9t-tIczBy2lLRV-uEUwi-gYdSWzxLoKWKSHyvggbc2uWWogZku09LU6YnAcaLOoqtK-C2Zh" 
              />
              <span>Google</span>
            </button>
            <button 
              onClick={handleSubmit}
              className="flex items-center justify-center gap-2 h-11 border border-slate-200 rounded-xl bg-slate-50 hover:bg-slate-100 transition active:scale-95 group font-bold text-xs text-slate-700 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-emerald-600 font-bold">apps</span>
              <span>GitHub</span>
            </button>
          </div>

          {/* Footer Link */}
          <p className="text-center mt-6 text-xs font-bold text-slate-500">
            Don't have an account?{" "}
            <button onClick={() => onNavigate("register")} className="text-emerald-700 font-extrabold hover:text-emerald-800 hover:underline cursor-pointer">Register Now</button>
          </p>
        </div>
      </main>
    </div>
  );
}
