/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from "react";

interface RegisterPageProps {
  onNavigate: (page: string) => void;
  onLoginSuccess: (user: { 
    user_id: number; 
    full_name: string; 
    email: string; 
    role: string;
    phone?: string;
    weight?: number;
    condition?: string;
    weekly_diet?: string;
  }) => void;
}

export default function RegisterPage({ onNavigate, onLoginSuccess }: RegisterPageProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  
  // Custom Fitness Specs
  const [weight, setWeight] = useState<number>(70);
  const [condition, setCondition] = useState("Muscle Build & Power");
  const [weeklyDiet, setWeeklyDiet] = useState("High-Protein Balanced");
  
  const [errorMsg, setErrorError] = useState("");

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !password || !phone.trim()) {
      setErrorError("All standard fields are strictly required.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorError("Passwords do not match.");
      return;
    }
    if (!weight || weight <= 0) {
      setErrorError("Please input a valid weight.");
      return;
    }

    const newUser = {
      user_id: 12, // Standard incremental key for simulation
      full_name: fullName.trim(),
      email: email.trim(),
      role: "Premium Member",
      phone: phone.trim(),
      weight: parseFloat(weight.toString()),
      condition,
      weekly_diet: weeklyDiet,
    };

    onLoginSuccess(newUser);
    onNavigate("dashboard");
  };

  return (
    <div className="bg-[#F8FAFC] text-slate-800 min-h-screen flex flex-col items-center justify-center p-4">
      {/* Hero Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] rounded-full bg-emerald-500/5 blur-3xl"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[55%] h-[55%] rounded-full bg-emerald-500/5 blur-3xl"></div>
      </div>

      {/* Main Registration Card */}
      <main className="w-full max-w-[520px] bg-white rounded-[32px] shadow-xl border border-slate-200 overflow-hidden my-8 animate-fade-in p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-50 border border-emerald-100 rounded-2xl mb-3">
            <span className="material-symbols-outlined text-emerald-600 text-2xl font-bold">grain</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-1">Create Your ZenithLife Profile</h1>
          <p className="text-xs font-semibold text-slate-500">Empower habits tracking calibrated to your exact bodily condition.</p>
        </div>

        {errorMsg && (
          <div className="bg-rose-50 border-l-4 border-rose-500 p-4 mb-5 rounded-xl text-rose-850 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-100 pb-1">1. Contact Identity</div>

          {/* Full Name */}
          <div className="space-y-1 text-left">
            <label className="text-xs font-extrabold text-slate-500" htmlFor="full_name">Full Name</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">person</span>
              <input 
                className="w-full h-11 pl-11 pr-4 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500/25 focus:border-emerald-500 transition font-semibold text-sm text-slate-800 placeholder-slate-400 shadow-inner" 
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <div className="space-y-1">
              <label className="text-xs font-extrabold text-slate-500" htmlFor="email">Email Address</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">mail</span>
                <input 
                  className="w-full h-11 pl-11 pr-4 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500/25 focus:border-emerald-500 transition font-semibold text-sm text-slate-800 placeholder-slate-400 shadow-inner" 
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
              <label className="text-xs font-extrabold text-slate-500" htmlFor="phone">Phone Mobile</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">call</span>
                <input 
                  className="w-full h-11 pl-11 pr-4 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500/25 focus:border-emerald-500 transition font-semibold text-sm text-slate-800 placeholder-slate-400 shadow-inner" 
                  id="phone" 
                  placeholder="+1 (555) 012-3456" 
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-100 pb-1 pt-1">2. Bodily Condition & Weekly Diet</div>

          {/* Weight & Fitness Condition Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <div className="space-y-1">
              <label className="text-xs font-extrabold text-slate-500" htmlFor="weight_kg">Weight Plan (kg)</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">scale</span>
                <input 
                  className="w-full h-11 pl-11 pr-4 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500/25 focus:border-emerald-500 transition font-semibold text-sm text-slate-800 placeholder-slate-400 shadow-inner" 
                  id="weight_kg" 
                  type="number"
                  min="30"
                  max="250"
                  required
                  value={weight}
                  onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-extrabold text-slate-500" htmlFor="condition">My Condition Target</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">track_changes</span>
                <select 
                  className="w-full h-11 pl-11 pr-4 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500/25 focus:border-emerald-500 transition font-semibold text-xs text-slate-800 cursor-pointer shadow-inner" 
                  id="condition"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                >
                  <option value="Weight Loss & Toning">Weight Loss & Toning</option>
                  <option value="Muscle Build & Power">Muscle Build & Power</option>
                  <option value="Lean Athletic Endurance">Lean Athletic Endurance</option>
                  <option value="Active Health Maintenance">Active Health Maintenance</option>
                </select>
              </div>
            </div>
          </div>

          {/* Diet regime selection */}
          <div className="space-y-1 text-left">
            <label className="text-xs font-extrabold text-slate-500" htmlFor="weekly_diet">Diet Plan to be Maintained All Week</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">restaurant</span>
              <select 
                className="w-full h-11 pl-11 pr-4 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500/25 focus:border-emerald-500 transition font-semibold text-xs text-slate-800 cursor-pointer shadow-inner" 
                id="weekly_diet"
                value={weeklyDiet}
                onChange={(e) => setWeeklyDiet(e.target.value)}
              >
                <option value="High-Protein Balanced Plan">High-Protein Balanced Plan (Macro-Targeted)</option>
                <option value="Ketogenic Low-Carb Regime">Ketogenic Low-Carb Regime (Fats Dominant)</option>
                <option value="Mediterranean Heart-Healthy Diet">Mediterranean Heart-Healthy Diet (Clean Oils)</option>
                <option value="Plant-Based Vegan Energy">Plant-Based Vegan Energy (Nutrient Dense)</option>
                <option value="Intermittent Fasting Schedule">Intermittent Fasting Schedule (Time Restricted)</option>
              </select>
            </div>
          </div>

          <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-100 pb-1 pt-1">3. Password Security</div>

          {/* Password & Confirm Passwords */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <div className="space-y-1">
              <label className="text-xs font-extrabold text-slate-500" htmlFor="password">Password</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">lock</span>
                <input 
                  className="w-full h-11 pl-11 pr-4 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500/25 focus:border-emerald-500 transition font-semibold text-sm text-slate-800 placeholder-slate-400 shadow-inner" 
                  id="password" 
                  placeholder="••••••••" 
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-extrabold text-slate-500" htmlFor="confirm_password">Confirm Password</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">lock_reset</span>
                <input 
                  className="w-full h-11 pl-11 pr-4 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500/25 focus:border-emerald-500 transition font-semibold text-sm text-slate-800 placeholder-slate-400 shadow-inner" 
                  id="confirm_password" 
                  placeholder="••••••••" 
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Terms Checklist */}
          <div className="flex items-center gap-2 pt-2 text-left">
            <input className="w-4 h-4 rounded border-slate-200 text-emerald-600 focus:ring-emerald-500 accent-emerald-600 cursor-pointer" id="terms" type="checkbox" defaultChecked />
            <label className="text-[11px] font-bold text-slate-500 cursor-pointer select-none" htmlFor="terms">
              I agree to the <span className="text-emerald-700 font-extrabold hover:underline">Terms of Service</span> and <span className="text-emerald-700 font-extrabold hover:underline">Privacy Charter</span>
            </label>
          </div>

          {/* Register Button */}
          <button 
            className="w-full h-12 bg-emerald-500 text-white font-extrabold text-sm rounded-xl hover:bg-emerald-600 active:scale-95 transition flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-emerald-500/10 mt-3" 
            type="submit"
          >
            <span>Complete Registration</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>

          {/* Footer Navigation link */}
          <p className="text-center pt-2 text-xs font-bold text-slate-500">
            Already have an account?{" "}
            <button type="button" onClick={() => onNavigate("login")} className="text-emerald-700 font-extrabold hover:underline ml-1 cursor-pointer">Login here</button>
          </p>
        </form>
      </main>

      {/* Visual Accent Elements */}
      <div className="flex items-center gap-6 opacity-60 select-none pointer-events-none mt-2 mb-8 text-[11px] font-bold text-slate-450 text-slate-500">
        <div className="flex flex-col items-center">
          <span className="material-symbols-outlined text-emerald-600 mb-0.5">security</span>
          <span>AES-256 System</span>
        </div>
        <div className="w-px h-6 bg-slate-200"></div>
        <div className="flex flex-col items-center">
          <span className="material-symbols-outlined text-emerald-600 mb-0.5">cloud_done</span>
          <span>Cloud Sync Active</span>
        </div>
        <div className="w-px h-6 bg-slate-200"></div>
        <div className="flex flex-col items-center">
          <span className="material-symbols-outlined text-emerald-600 mb-0.5">verified_user</span>
          <span>VTU Normalized Schema</span>
        </div>
      </div>
    </div>
  );
}
