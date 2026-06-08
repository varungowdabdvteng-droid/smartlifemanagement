/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from "react";

interface RegisterPageProps {
  onNavigate: (page: string) => void;
  onLoginSuccess: (user: { user_id: number; full_name: string; email: string; role: string }) => void;
}

export default function RegisterPage({ onNavigate, onLoginSuccess }: RegisterPageProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMsg, setErrorError] = useState("");

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !password || !phone.trim()) {
      setErrorError("All fields are strictly required.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorError("Passwords do not match.");
      return;
    }

    const newUser = {
      user_id: 11, // Standard next number for our DBMS logs
      full_name: fullName.trim(),
      email: email.trim(),
      role: "Premium Member",
    };

    onLoginSuccess(newUser);
    onNavigate("dashboard");
  };

  return (
    <div className="bg-[#0e1118] text-slate-300 min-h-screen flex flex-col items-center justify-center p-4">
      {/* Hero Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-emerald-500/5 blur-3xl"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-cyan-500/5 blur-3xl"></div>
      </div>

      {/* Main Registration Card */}
      <main className="w-full max-w-[480px] bg-[#161921] rounded-3xl shadow-2xl border border-white/5 overflow-hidden my-8 animate-fade-in">
        <div className="px-8 pt-8 pb-4 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-accent/10 rounded-xl mb-4">
            <span className="material-symbols-outlined text-emerald-accent text-3xl">hub</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white mb-1 tracking-tight">Join SmartLife</h1>
          <p className="text-sm font-medium text-slate-405 text-slate-400">Create your SLMS account to start optimizing your life today.</p>
        </div>

        {errorMsg && (
          <div className="mx-8 bg-rose-500/10 border-l-4 border-rose-500 p-4 rounded text-rose-300 text-xs">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleRegister} className="px-8 pb-8 space-y-4">
          {/* Full Name */}
          <div className="space-y-1 text-left">
            <label className="text-xs font-extrabold text-slate-300 block font-sans" htmlFor="full_name">Full Name</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">person</span>
              <input 
                className="w-full h-11 pl-11 pr-4 bg-[#0e1118]/80 rounded-xl border border-white/5 focus:border-emerald-accent focus:ring-2 focus:ring-emerald-accent/10 focus:outline-none transition-all font-medium text-sm text-white placeholder-slate-650" 
                id="full_name" 
                placeholder="Alex Rivers" 
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          </div>

          {/* Email & Phone Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="space-y-1">
              <label className="text-xs font-extrabold text-slate-300 block font-sans" htmlFor="email">Email address</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">mail</span>
                <input 
                  className="w-full h-11 pl-11 pr-4 bg-[#0e1118]/80 rounded-xl border border-white/5 focus:border-emerald-accent focus:ring-2 focus:ring-emerald-accent/10 focus:outline-none transition-all font-medium text-sm text-white placeholder-slate-650" 
                  id="email" 
                  placeholder="alex@example.com" 
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-extrabold text-slate-300 block font-sans" htmlFor="phone">Phone Number</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">call</span>
                <input 
                  className="w-full h-11 pl-11 pr-4 bg-[#0e1118]/80 rounded-xl border border-white/5 focus:border-emerald-accent focus:ring-2 focus:ring-emerald-accent/10 focus:outline-none transition-all font-medium text-sm text-white placeholder-slate-650" 
                  id="phone" 
                  placeholder="+1 (555) 000-0000" 
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1 text-left">
            <label className="text-xs font-extrabold text-slate-30 block font-sans" htmlFor="password">Password</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">lock</span>
              <input 
                className="w-full h-11 pl-11 pr-4 bg-[#0e1118]/80 rounded-xl border border-white/5 focus:border-emerald-accent focus:ring-2 focus:ring-emerald-accent/10 focus:outline-none transition-all font-medium text-sm text-white placeholder-slate-650" 
                id="password" 
                placeholder="••••••••" 
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-1 text-left">
            <label className="text-xs font-extrabold text-slate-30 block font-sans" htmlFor="confirm_password">Confirm Password</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">lock_reset</span>
              <input 
                className="w-full h-11 pl-11 pr-4 bg-[#0e1118]/80 rounded-xl border border-white/5 focus:border-emerald-accent focus:ring-2 focus:ring-emerald-accent/10 focus:outline-none transition-all font-medium text-sm text-white placeholder-slate-650" 
                id="confirm_password" 
                placeholder="••••••••" 
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Terms Checklist */}
          <div className="flex items-center gap-2 pt-2 text-left">
            <input className="w-4 h-4 rounded border-white/10 text-emerald-accent focus:ring-emerald-accent accent-emerald-accent cursor-pointer" id="terms" type="checkbox" defaultChecked />
            <label className="text-xs font-semibold text-slate-400 cursor-pointer select-none" htmlFor="terms">
              I agree to the{" "}
              <span className="text-emerald-accent font-extrabold hover:text-emerald-400 hover:underline cursor-pointer">Terms of Service</span> and{" "}
              <span className="text-emerald-accent font-extrabold hover:text-emerald-400 hover:underline cursor-pointer">Privacy Policy</span>
            </label>
          </div>

          {/* Register Button */}
          <button 
            className="w-full h-12 bg-emerald-accent text-black font-extrabold text-lg rounded-xl hover:bg-emerald-600 active:scale-95 transition flex items-center justify-center gap-2 cursor-pointer mt-4" 
            type="submit"
          >
            <span>Register</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>

          {/* Social Divider */}
          <div className="relative flex items-center py-4">
            <div className="flex-grow border-t border-white/5"></div>
            <span className="flex-shrink mx-4 text-xs font-extrabold text-slate-500 uppercase tracking-widest">or register with</span>
            <div className="flex-grow border-t border-white/5"></div>
          </div>

          {/* Social login integration placeholders */}
          <div className="flex gap-4">
            <button 
              type="button" 
              onClick={handleRegister}
              className="flex-1 h-11 border border-white/10 rounded-xl flex items-center justify-center hover:bg-white/5 transition active:scale-95 cursor-pointer"
            >
              <img 
                alt="Google social redirect sign up key" 
                referrerPolicy="no-referrer"
                className="w-5 h-5 text-emerald-400" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxvYGkfP8AIb4dR4snbSHmxLTd2xONHe7KMwtcpW3_tuOs2Brhl0Luy3f_aGYAVzc9vBJVkeqxDPDmUQwn7z6s-5hWcIl-jeuwE4Qfuh1VX0mm6y0NOVbTce51M7sNvD3k4fTCENg4LQxV49LE-qUncTPTMfa-FYAqm9lyJnp3H5ZpMXesI8Z4lFFLYjhtpF9UstPdm9t-tIczBy2lLRV-uEUwi-gYdSWzxLoKWKSHyvggbc2uWWogZku09LU6YnAcaLOoqtK-C2Zh" 
              />
            </button>
            <button 
              type="button" 
              onClick={handleRegister}
              className="flex-1 h-11 border border-white/10 rounded-xl flex items-center justify-center hover:bg-white/5 transition active:scale-95 cursor-pointer text-emerald-accent"
            >
              <span className="material-symbols-outlined">apps</span>
            </button>
          </div>

          {/* Footer Navigation link */}
          <p className="text-center pt-4 text-sm font-medium text-slate-400">
            Already have an account?{" "}
            <button type="button" onClick={() => onNavigate("login")} className="text-emerald-accent font-extrabold hover:text-emerald-400 hover:underline ml-1 cursor-pointer">Login here</button>
          </p>
        </form>
      </main>

      {/* Visual Accent Elements */}
      <div className="flex items-center gap-6 opacity-80 select-none pointer-events-none mt-2 mb-8 text-xs font-semibold text-slate-500">
        <div className="flex flex-col items-center">
          <span className="material-symbols-outlined text-emerald-accent mb-1">security</span>
          <span>AES-256 System</span>
        </div>
        <div className="w-px h-8 bg-white/10"></div>
        <div className="flex flex-col items-center">
          <span className="material-symbols-outlined text-emerald-accent mb-1">cloud_done</span>
          <span>Cloud Persisted</span>
        </div>
        <div className="w-px h-8 bg-white/10"></div>
        <div className="flex flex-col items-center">
          <span className="material-symbols-outlined text-emerald-accent mb-1">verified_user</span>
          <span>DBMS Verified</span>
        </div>
      </div>
    </div>
  );
}
