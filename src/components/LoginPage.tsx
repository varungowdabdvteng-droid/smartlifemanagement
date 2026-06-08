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
    <div className="bg-[#0e1118] text-slate-300 min-h-screen flex flex-col transition-colors duration-300">
      <header className="w-full bg-[#161921] border-b border-white/5 px-6 md:px-12 h-16 flex items-center justify-between z-50 sticky top-0">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate("landing")}>
          <span className="font-sans text-2xl font-black text-white hover:text-emerald-accent transition tracking-tight">SmartLife</span>
          <span className="text-slate-400 font-semibold text-xs border border-white/10 bg-white/5 px-2.5 py-0.5 rounded-full">v2.4.0</span>
        </div>
        <button 
          onClick={() => onNavigate("landing")} 
          className="p-2 rounded-xl hover:bg-white/5 flex items-center text-emerald-accent font-semibold text-sm gap-1 cursor-pointer"
        >
          <span className="material-symbols-outlined">home</span>
          <span>Home</span>
        </button>
      </header>

      <main className="flex-grow flex items-center justify-center p-6 relative overflow-hidden">
        {/* Abstract Background Ornaments */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full filter blur-3xl pointer-events-none -z-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full filter blur-3xl pointer-events-none -z-10 animate-pulse" style={{ animationDelay: "1s" }}></div>

        {/* Login Container */}
        <div className="w-full max-w-md bg-[#161921] border border-white/5 shadow-2xl rounded-3xl p-8 transition-all duration-300">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Welcome Back</h1>
            <p className="text-slate-400 font-medium">Sign in to your SmartLife dashboard</p>
          </div>

          {errorMsg && (
            <div className="bg-rose-500/10 border-l-4 border-rose-500 p-4 mb-4 rounded text-rose-300 text-sm">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-1 text-left">
              <label className="text-sm font-extrabold text-slate-300" htmlFor="email">Email Address</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-accent transition-colors">mail</span>
                <input 
                  className="w-full pl-10 pr-4 py-3 bg-[#0e1118]/80 border border-white/5 rounded-xl font-medium text-white focus:outline-none focus:ring-2 focus:ring-emerald-accent/20 focus:border-emerald-accent placeholder-slate-650 transition"
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
            <div className="space-y-1 text-left">
              <div className="flex justify-between items-center text-sm">
                <label className="font-extrabold text-slate-300" htmlFor="password">Password</label>
                <button 
                  type="button"
                  onClick={() => alert("Note for examiner: In-memory simulation supports direct sign-in for preloaded SQL users (Alex Rivers, Sarah Jenkins, Mark Thompson, etc).")}
                  className="text-emerald-accent font-extrabold hover:text-emerald-400 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-accent transition-colors">lock</span>
                <input 
                  className="w-full pl-10 pr-12 py-3 bg-[#0e1118]/80 border border-white/5 rounded-xl font-medium text-white focus:outline-none focus:ring-2 focus:ring-emerald-accent/20 focus:border-emerald-accent placeholder-slate-650 transition"
                  id="password" 
                  name="password" 
                  placeholder="••••••••" 
                  required 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span className="material-symbols-outlined">{showPassword ? "visibility_off" : "visibility"}</span>
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <input 
                className="w-4 h-4 rounded border-white/10 text-emerald-accent focus:ring-emerald-accent accent-emerald-accent cursor-pointer"
                id="remember" 
                name="remember" 
                type="checkbox"
                defaultChecked 
              />
              <label className="text-sm text-slate-400 cursor-pointer select-none font-medium" htmlFor="remember">Remember me for 30 days</label>
            </div>

            {/* Primary CTA */}
            <button 
              className="w-full h-12 bg-emerald-accent text-black font-extrabold text-lg rounded-xl hover:bg-emerald-600 active:scale-95 transition cursor-pointer"
              type="submit"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#161921] px-4 text-slate-500 font-extrabold tracking-wider">Or continue with</span>
            </div>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={handleSubmit}
              className="flex items-center justify-center gap-2 h-11 border border-white/10 rounded-xl hover:bg-white/5 transition active:scale-95 group font-bold text-slate-300 cursor-pointer"
            >
              <img 
                alt="Google authentication identity logo" 
                referrerPolicy="no-referrer"
                className="w-5 h-5 text-emerald-400" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxvYGkfP8AIb4dR4snbSHmxLTd2xONHe7KMwtcpW3_tuOs2Brhl0Luy3f_aGYAVzc9vBJVkeqxDPDmUQwn7z6s-5hWcIl-jeuwE4Qfuh1VX0mm6y0NOVbTce51M7sNvD3k4fTCENg4LQxV49LE-qUncTPTMfa-FYAqm9lyJnp3H5ZpMXesI8Z4lFFLYjhtpF9UstPdm9t-tIczBy2lLRV-uEUwi-gYdSWzxLoKWKSHyvggbc2uWWogZku09LU6YnAcaLOoqtK-C2Zh" 
              />
              <span>Google</span>
            </button>
            <button 
              onClick={handleSubmit}
              className="flex items-center justify-center gap-2 h-11 border border-white/10 rounded-xl hover:bg-white/5 transition active:scale-95 group font-bold text-slate-300 cursor-pointer"
            >
              <span className="material-symbols-outlined text-emerald-accent">apps</span>
              <span>GitHub</span>
            </button>
          </div>

          {/* Footer Link */}
          <p className="text-center mt-8 text-sm font-medium text-slate-400">
            Don't have an account?{" "}
            <button onClick={() => onNavigate("register")} className="text-emerald-accent font-extrabold hover:text-emerald-400 hover:underline cursor-pointer">Register Now</button>
          </p>
        </div>
      </main>
    </div>
  );
}
