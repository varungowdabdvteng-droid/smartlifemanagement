/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-emerald-150 selection:text-emerald-900">
      {/* Decorative Top Accent Grid Banner */}
      <div className="absolute top-0 inset-x-0 h-[480px] bg-gradient-to-b from-emerald-50/40 via-transparent to-transparent pointer-events-none -z-10" />

      {/* Navigation Header */}
      <header className="w-full top-0 sticky z-50 bg-white/70 backdrop-blur-md border-b border-slate-200/60 h-16 flex items-center justify-between px-6 md:px-12">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-sm shadow-emerald-500/10">
            <span className="material-symbols-outlined text-[20px] font-bold text-white">grain</span>
          </div>
          <span className="font-sans text-xl font-extrabold text-slate-900 tracking-tight">
            Zenith<span className="text-emerald-600 font-black">Life</span>
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8 font-bold text-sm">
          <a className="text-emerald-700 font-extrabold" href="#hero">Home</a>
          <a className="text-slate-650 hover:text-emerald-650 text-slate-500 hover:text-emerald-600 transition" href="#features">Features</a>
          <a className="text-slate-650 hover:text-emerald-650 text-slate-500 hover:text-emerald-600 transition" href="#benefits">Benefits</a>
        </nav>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate("login")} 
            className="hidden md:block px-5 py-2 rounded-xl font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition active:scale-95 cursor-pointer text-xs"
          >
            Log In
          </button>
          <button 
            onClick={() => onNavigate("register")} 
            className="px-5 py-2 rounded-xl font-extrabold bg-emerald-500 text-white shadow-sm shadow-emerald-500/10 hover:bg-emerald-600 transition active:scale-95 cursor-pointer text-xs"
          >
            Get Started
          </button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section id="hero" className="relative overflow-hidden pt-12 pb-16 md:pt-24 md:pb-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-[11px] uppercase tracking-wider">
              <span className="material-symbols-outlined text-sm font-black">verified</span>
              <span>Next-Gen Premium Habits Tracker</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight tracking-tight">
              Optimize Daily Habits & Fitness with <span className="text-emerald-600">ZenithLife</span>
            </h1>
            <p className="text-base md:text-lg text-slate-500 max-w-xl font-medium font-sans">
              Take complete control with streamlined tasks management, real-time warning indicators, custom weekly recipe planners, and smart fitness logging with calorie deficits adjusted based on active exercise routines.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-2">
              <button 
                onClick={() => onNavigate("register")} 
                className="h-12 px-7 rounded-xl bg-emerald-500 text-white font-extrabold shadow-sm shadow-emerald-500/10 hover:bg-emerald-600 flex items-center justify-center gap-2 hover:translate-y-[-1px] transition cursor-pointer text-sm"
              >
                <span>Activate Free Trial</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
              <a 
                href="#features" 
                className="h-12 px-7 rounded-xl bg-white text-slate-700 font-extrabold border border-slate-200 flex items-center justify-center gap-2 hover:bg-slate-50 hover:border-slate-300 transition cursor-pointer text-sm shadow-xs"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="flex-1 relative w-full">
            <div className="absolute -top-6 -right-6 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-6 -left-6 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
            <img 
              alt="Premium ZenithLife Wellness Dashboard" 
              referrerPolicy="no-referrer"
              className="relative z-10 rounded-3xl shadow-xl hover:shadow-2xl border border-slate-200/80 transition-all duration-500 w-full object-cover object-center max-h-[380px]" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOCgKQyZyiGZzYLtwuE0tjTprBuub4qNqJyBg12ErTj5meWMaRDQQ_j9fYDU-u3IZp4SczIwlZ3ry_pC__cWnLFSIEelDsYWTlZDL4QDGcZ-zop8n0fyDpbEGF3JEUHyFCLaYIqibCJMGEwV2ODGY3U1gwAJp3uB2qH6TFZgj521Kzs6dVB0NgbK1FcH8Y82bSDWTbapICEkrd7Zi30K8dqhSKkQmbInXl8rK83Ar37pN8WqIgXBTjEIvbTg2vgOmLCuF9rjDRllfI" 
            />
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white border-y border-slate-200/80 px-6 md:px-12">
          <div className="max-w-7xl mx-auto flex justify-center items-center">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-emerald-600 mb-1">Normalized</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">3NF Schema Security</div>
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section id="features" className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">The Ultimate Habits Management Architecture</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-lg font-medium">
              Achieve wellness goals with real-time feedback loop calculations, interactive lists triggers, and elegant report sheets.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1: Tasks */}
            <div className="md:col-span-2 bg-white p-8 rounded-3xl shadow-xs border border-slate-200/80 hover:shadow-lg transition duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-105 transition">
                <span className="material-symbols-outlined text-2xl font-bold">checklist</span>
              </div>
              <h3 className="text-2xl font-black text-slate-950 mb-3">Bulletproof Habit Task Logs</h3>
              <p className="text-slate-500 mb-6 font-medium text-sm leading-relaxed">
                Prioritize schedules via high-contrast list filters. Track Chore status and establish database warnings for due elements.
              </p>
              <img 
                alt="ZenithLife Kanban Scheduler" 
                referrerPolicy="no-referrer"
                className="w-full h-48 object-cover rounded-2xl border border-slate-150" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFDMsEJTMrqkOmtZn-PEQKwEin2JOzOwalCs3oGDC9qHoPVeSv2psNRhwU1_TsPQ3oTj5PnjbgyWgFeracQMhj6cTSYX3zlkM7bRLoIW5dAGfFEa7znvBAbd5N6ZxkXfO9rKAybQLZp5lgwvJzzsoW5i9LiemNp2RVszCjwO7KJ3--fHwB4uNdjkX1C7ZfOynG-Kyp6TzeL5-4DNmmVYeKcwI0_qjsW5TnpAknSj4OxXcQ7qhFjtFrXjQcvE3MsG0wfia2YFfx8eT" 
              />
            </div>

            {/* Feature 2: Grocery */}
            <div className="md:col-span-1 bg-white p-8 rounded-3xl shadow-xs border border-slate-200/80 hover:shadow-lg transition duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-105 transition">
                <span className="material-symbols-outlined text-2xl font-bold">shopping_cart</span>
              </div>
              <h3 className="text-2xl font-black text-slate-950 mb-3">Kitchen Inventories</h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">
                Keep track of fresh ingredients with custom depletion threshold rules. Get system alerts before products go fully empty.
              </p>
            </div>

            {/* Feature 3: Fitness */}
            <div className="md:col-span-1 bg-white p-8 rounded-3xl shadow-xs border border-slate-200/80 hover:shadow-lg transition duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-105 transition">
                <span className="material-symbols-outlined text-2xl font-bold">fitness_center</span>
              </div>
              <h3 className="text-2xl font-black text-slate-950 mb-3">Adaptive Fitness Metrics</h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">
                Log active training sessions (from heavy lifts to cardio runs) and automatically calculate daily calorie budgets and balances.
              </p>
            </div>

            {/* Feature 4: Alerts */}
            <div className="md:col-span-1 bg-white p-8 rounded-3xl shadow-xs border border-slate-200/80 hover:shadow-lg transition duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500 mb-6 group-hover:scale-105 transition">
                <span className="material-symbols-outlined text-2xl font-bold">notifications</span>
              </div>
              <h3 className="text-2xl font-black text-slate-950 mb-3">Active Warning Signals</h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">
                Automated notification triggers ensure you stay on schedule, alert you on low pantry stocks, and highlight physical goals.
              </p>
            </div>

            {/* Feature 5: Reports */}
            <div className="md:col-span-1 bg-gradient-to-br from-emerald-600 to-emerald-700 p-8 rounded-3xl shadow-md text-white flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6">
                  <span className="material-symbols-outlined text-2xl font-bold">analytics</span>
                </div>
                <h3 className="text-2xl font-black mb-3">Personal Weekly Stats</h3>
                <p className="text-emerald-100 font-semibold leading-relaxed text-sm">
                  Review customized summaries mapping weekly targets against active daily metrics, with detailed user profiles analysis.
                </p>
              </div>
              <div 
                onClick={() => onNavigate("register")}
                className="mt-6 flex items-center gap-2 font-bold hover:gap-4 transition text-white hover:text-emerald-100 cursor-pointer text-sm"
              >
                <span>Open App Dashboard</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-20 bg-slate-100/50 border-y border-slate-200/80 px-6 md:px-12">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 order-2 lg:order-1">
              <img 
                alt="ZenithLife Productivity Coordination" 
                referrerPolicy="no-referrer"
                className="rounded-3xl shadow-lg w-full border border-slate-200 object-cover max-h-[380px]" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDij5R8idKPtD_qfdCMiKiqwPSlYUXPZPAi2JAsXbGMdGWaBhpBqpKR-Z3sH3S48IHkR3wUv9s_eUJm3gwuLFg49GeVoDTFpIo5sqKqn1pLNhOKnojs9F04OFekJ6PB-_RHjRvxn1eNn-58QdTW5rfpPpndiVi0uFsFURXAj-7RbLppBt94cKgz1Xbd-sQBRfOgTzoZnXPED30ObEv4X1CazKQ_L0OMvV83wAJJka2NVwR2HWB4mMEBra8Uuy8AbsLMePeqX99lRZp" 
              />
            </div>
            <div className="flex-1 order-1 lg:order-2 text-left space-y-6">
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">Crafted for Clean, Uncluttered Habits Navigation</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex-shrink-0 flex items-center justify-center border border-emerald-100">
                    <span className="material-symbols-outlined font-bold text-sm">done</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-slate-900 mb-1">Unified Health Profile Catalog</h4>
                    <p className="text-slate-500 font-semibold text-sm leading-relaxed">Combine weight management, diet protocols, grocery lists, and chore boards inside a clean light-theme environment.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex-shrink-0 flex items-center justify-center border border-emerald-100">
                    <span className="material-symbols-outlined font-bold text-sm">done</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-slate-900 mb-1">Workout-Driven Deficits Tracking</h4>
                    <p className="text-slate-500 font-semibold text-sm leading-relaxed">Calculate genuine progress. Daily caloric budgets dynamically update according to your logged resistance and endurance training statistics.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex-shrink-0 flex items-center justify-center border border-emerald-100">
                    <span className="material-symbols-outlined font-bold text-sm">done</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-slate-900 mb-1">3NF Data System Integrity</h4>
                    <p className="text-slate-500 font-semibold text-sm leading-relaxed">Engineered with structured relational tables and clean data constraints. Ideal for academic portfolios and modern health metrics tracking.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* CTA Conversion Box */}
        <section className="py-20 px-6 md:px-12 max-w-5xl mx-auto">
          <div className="rounded-[32px] bg-white border border-slate-200 text-slate-800 p-12 text-center relative overflow-hidden shadow-sm">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute -top-1/2 -left-1/4 w-full h-full bg-emerald-400/20 rounded-full blur-[100px]"></div>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black mb-6 relative z-10 text-slate-950 tracking-tight">Elevate Your Daily Routine</h2>
            <p className="text-slate-500 mb-10 max-w-xl mx-auto relative z-10 text-base md:text-lg font-medium">
              Start logging your weight condition, personalized dietary regime, chores, and exercises inside clean, medical-grade charts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10 font-bold">
              <button 
                onClick={() => onNavigate("register")} 
                className="h-14 px-10 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold shadow-sm transition cursor-pointer text-sm"
              >
                Get Started for Free
              </button>
              <button 
                onClick={() => onNavigate("login")} 
                className="h-14 px-10 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 font-extrabold transition text-slate-700 cursor-pointer text-sm shadow-xs"
              >
                Access Account
              </button>
            </div>
            <p className="mt-8 text-slate-400 text-xs tracking-wider z-10 relative font-semibold">Easy Setup • Offline Storage Supported • VTU Compliant Schema</p>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-16 px-6 md:px-12 text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                <span className="material-symbols-outlined text-[16px] text-white">grain</span>
              </div>
              <span className="font-black text-xl tracking-tight text-slate-900">ZenithLife</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed font-sans font-semibold">
              Redefining personal habits coordination with beautifully crafted interfaces and advanced custom trackers.
            </p>
          </div>
          <div>
            <h5 className="font-extrabold text-xs uppercase tracking-widest text-slate-400 mb-6 font-sans">Premium Modules</h5>
            <ul className="space-y-4 text-sm text-slate-500 font-bold">
              <li>Checklist Chore Planner</li>
              <li>Pantry Inventory Management</li>
              <li>Workout deficit logs calculator</li>
              <li>Real-time automated alarms</li>
            </ul>
          </div>
          <div>
            <h5 className="font-extrabold text-xs uppercase tracking-widest text-slate-400 mb-6 font-sans">Engineering Specs</h5>
            <ul className="space-y-4 text-sm text-slate-500 font-bold">
              <li>Third Normal Form (3NF) relational constraints</li>
              <li>Data flow models & entity relationship layout</li>
              <li>Salted credential keys secure storage simulation</li>
              <li>ACID properties compliance rules</li>
            </ul>
          </div>
          <div>
            <h5 className="font-extrabold text-xs uppercase tracking-widest text-slate-400 mb-6 font-sans">Academic Context</h5>
            <p className="text-sm text-slate-500 mb-4 leading-relaxed font-semibold">
              <strong>ZenithLife Health & Habits Management Tracker</strong> - Engineered for modern client architectures and lab defensive frameworks.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-200/80 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-xs text-left w-full font-semibold">
          <div>© 2026 ZenithLife Habits Tracker. All rights reserved. VTU Submission Design.</div>
          <div className="flex gap-6 whitespace-nowrap">
            <span className="hover:text-emerald-600 transition cursor-pointer">ACID Compliance checked</span>
            <span className="hover:text-emerald-600 transition cursor-pointer font-serif italic">ZenithLife Premium</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
