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
    <div className="min-h-screen bg-dark-bg text-slate-300 font-sans selection:bg-emerald-accent/20">
      {/* Navigation Header */}
      <header className="w-full top-0 sticky z-50 bg-[#161921]/80 backdrop-blur-md border-b border-white/5 h-16 flex items-center justify-between px-6 md:px-12">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-emerald-accent text-3xl font-bold">hub</span>
          <span className="font-sans text-2xl font-black text-white tracking-tight">SmartLife</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 font-medium">
          <a className="text-emerald-accent font-semibold" href="#hero">Home</a>
          <a className="text-slate-400 hover:text-emerald-accent transition" href="#features">Features</a>
          <a className="text-slate-400 hover:text-emerald-accent transition" href="#benefits">Benefits</a>
          <a className="text-slate-400 hover:text-emerald-accent transition" href="#testimonials">Stories</a>
        </nav>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate("login")} 
            className="hidden md:block px-6 py-2 rounded-full font-semibold text-emerald-400 border border-emerald-accent/40 hover:bg-emerald-accent/10 hover:border-emerald-accent transition active:scale-95 cursor-pointer"
          >
            Log In
          </button>
          <button 
            onClick={() => onNavigate("register")} 
            className="px-6 py-2 rounded-full font-semibold bg-emerald-accent text-black shadow-md hover:bg-emerald-600 transition active:scale-95 cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section id="hero" className="relative overflow-hidden pt-12 pb-16 md:pt-24 md:pb-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-accent/10 border border-emerald-accent/20 text-emerald-440 text-emerald-400 font-medium text-xs mb-6">
              <span className="material-symbols-outlined text-sm font-bold">verified</span>
              <span>Next-Gen Productivity is Live</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6 tracking-tight animate-fade-in">
              Master Your Day with <span className="text-emerald-accent">Intelligent</span> Flow.
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-xl">
              SLMS streamlines your tasks, grocery lists, and fitness goals into one cohesive dashboard. Experience a smarter, optimized way to manage your busy life. Perfect for vtu final year exam defenses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button 
                onClick={() => onNavigate("register")} 
                className="h-12 px-8 rounded-xl bg-emerald-accent hover:bg-emerald-650 text-black font-extrabold shadow-lg flex items-center justify-center gap-2 hover:translate-y-[-1px] transition cursor-pointer"
              >
                <span>Start Free Trial</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              <a 
                href="#features" 
                className="h-12 px-8 rounded-xl bg-white/5 text-slate-300 font-semibold flex items-center justify-center gap-2 hover:bg-white/10 transition cursor-pointer"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="flex-1 relative w-full">
            <div className="absolute -top-6 -right-6 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-6 -left-6 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
            <img 
              alt="Product Dashboard Mockup" 
              referrerPolicy="no-referrer"
              className="relative z-10 rounded-2xl shadow-2xl border-4 border-[#161921] md:rotate-2 hover:rotate-0 transition-all duration-500 w-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOCgKQyZyiGZzYLtwuE0tjTprBuub4qNqJyBg12ErTj5meWMaRDQQ_j9fYDU-u3IZp4SczIwlZ3ry_pC__cWnLFSIEelDsYWTlZDL4QDGcZ-zop8n0fyDpbEGF3JEUHyFCLaYIqibCJMGEwV2ODGY3U1gwAJp3uB2qH6TFZgj521Kzs6dVB0NgbK1FcH8Y82bSDWTbapICEkrd7Zi30K8dqhSKkQmbInXl8rK83Ar37pN8WqIgXBTjEIvbTg2vgOmLCuF9rjDRllfI" 
            />
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-[#161921] border-y border-white/5 px-6 md:px-12">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-extrabold text-emerald-accent mb-1">500k+</div>
              <div className="text-sm font-semibold text-slate-400">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-extrabold text-emerald-accent mb-1">98%</div>
              <div className="text-sm font-semibold text-slate-400">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-extrabold text-emerald-accent mb-1">4.9/5</div>
              <div className="text-sm font-semibold text-slate-400">App Store Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-extrabold text-emerald-accent mb-1">3NF</div>
              <div className="text-sm font-semibold text-slate-400">Normalized Database</div>
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section id="features" className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Powerful Features for Modern Lives</h2>
            <p className="text-slate-450 text-slate-400 max-w-2xl mx-auto text-lg font-medium">
              A comprehensive relational DBMS suite delivering bulletproof optimization triggers and intuitive operations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1: Tasks */}
            <div className="md:col-span-2 bg-[#161921] p-8 rounded-2xl shadow-sm border border-white/5 hover:shadow-emerald-accent/5 hover:shadow-md transition duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-emerald-accent/10 flex items-center justify-center text-emerald-440 text-emerald-400 mb-6 group-hover:scale-105 transition">
                <span className="material-symbols-outlined text-2xl font-bold">checklist</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Smart Task Management</h3>
              <p className="text-slate-455 text-slate-400 mb-6 font-medium">
                Prioritize schedules via standard Kanban matrices. Set triggers, tracking intervals, and alerts.
              </p>
              <img 
                alt="Task Feature Illustration" 
                referrerPolicy="no-referrer"
                className="w-full h-48 object-cover rounded-xl border border-white/5" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFDMsEJTMrqkOmtZn-PEQKwEin2JOzOwalCs3oGDC9qHoPVeSv2psNRhwU1_TsPQ3oTj5PnjbgyWgFeracQMhj6cTSYX3zlkM7bRLoIW5dAGfFEa7znvBAbd5N6ZxkXfO9rKAybQLZp5lgwvJzzsoW5i9LiemNp2RVszCjwO7KJ3--fHwB4uNdjkX1C7ZfOynG-Kyp6TzeL5-4DNmmVYeKcwI0_qjsW5TnpAknSj4OxXcQ7qhFjtFrXjQcvE3MsG0wfia2YFfx8eT" 
              />
            </div>

            {/* Feature 2: Grocery */}
            <div className="md:col-span-1 bg-[#161921] p-8 rounded-2xl shadow-sm border border-white/5 hover:shadow-emerald-accent/5 hover:shadow-md transition duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-emerald-accent/10 flex items-center justify-center text-emerald-440 text-emerald-400 mb-6 group-hover:scale-105 transition">
                <span className="material-symbols-outlined text-2xl font-bold">shopping_cart</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Intelligent Grocery</h3>
              <p className="text-slate-455 text-slate-400 font-medium leading-relaxed">
                Automated shopping reminders configured by custom inventory warning points. Never run dry of required organic supplies.
              </p>
            </div>

            {/* Feature 3: Fitness */}
            <div className="md:col-span-1 bg-[#161921] p-8 rounded-2xl shadow-sm border border-white/5 hover:shadow-emerald-accent/5 hover:shadow-md transition duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-emerald-accent/10 flex items-center justify-center text-emerald-440 text-emerald-400 mb-6 group-hover:scale-105 transition">
                <span className="material-symbols-outlined text-2xl font-bold">fitness_center</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Fitness Synergy</h3>
              <p className="text-slate-455 text-slate-400 font-medium leading-relaxed">
                Sync steps, maintain calorie inputs, check calorie trend graphs, and log healthy meals with ease.
              </p>
            </div>

            {/* Feature 4: Alerts */}
            <div className="md:col-span-1 bg-[#161921] p-8 rounded-2xl shadow-sm border border-white/5 hover:shadow-emerald-accent/5 hover:shadow-md transition duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-400 mb-6 group-hover:scale-105 transition">
                <span className="material-symbols-outlined text-2xl font-bold">notifications</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Real-Time Alerts</h3>
              <p className="text-slate-455 text-slate-400 font-medium leading-relaxed">
                Active alerts triggered automatically as inventory registers deplete or project deadlines near.
              </p>
            </div>

            {/* Feature 5: Reports */}
            <div className="md:col-span-1 bg-gradient-to-br from-[#1b1f2b] to-[#12141a] p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 border border-white/10 text-white flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-accent/10 flex items-center justify-center text-emerald-400 mb-6">
                  <span className="material-symbols-outlined text-2xl font-bold">analytics</span>
                </div>
                <h3 className="text-2xl font-bold mb-3">Advanced Reports</h3>
                <p className="text-slate-400 leading-relaxed font-semibold">
                  Beautiful analytic visualizations tracking performance metrics, diet allocations, and execution quotients.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 font-semibold hover:gap-4 transition text-emerald-accent hover:text-emerald-400 cursor-pointer">
                <span>View Dashboard</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-20 bg-dark-sidebar border-y border-white/5 px-6 md:px-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 order-2 md:order-1">
              <img 
                alt="Colleague Collaboration Team" 
                referrerPolicy="no-referrer"
                className="rounded-2xl shadow-2xl w-full border border-white/5" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDij5R8idKPtD_qfdCMiKiqwPSlYUXPZPAi2JAsXbGMdGWaBhpBqpKR-Z3sH3S48IHkR3wUv9s_eUJm3gwuLFg49GeVoDTFpIo5sqKqn1pLNhOKnojs9F04OFekJ6PB-_RHjRvxn1eNn-58QdTW5rfpPpndiVi0uFsFURXAj-7RbLppBt94cKgz1Xbd-sQBRfOgTzoZnXPED30ObEv4X1CazKQ_L0OMvV83wAJJka2NVwR2HWB4mMEBra8Uuy8AbsLMePeqX99lRZp" 
              />
            </div>
            <div className="flex-1 order-1 md:order-2 text-left">
              <h2 className="text-4xl font-extrabold text-white mb-8 tracking-tight">Why Thousands Choose SmartLife</h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-accent/10 text-emerald-400 flex-shrink-0 flex items-center justify-center">
                    <span className="material-symbols-outlined font-black">done</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1 text-white">Centralized Experience</h4>
                    <p className="text-slate-400 font-semibold leading-relaxed">Stop toggling between 5 disparate applications. Plan, supply, and monitor inside a unified container.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-accent/10 text-emerald-400 flex-shrink-0 flex items-center justify-center">
                    <span className="material-symbols-outlined font-black">done</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1 text-white">Time Recovery Optimization</h4>
                    <p className="text-slate-400 font-semibold leading-relaxed">Subscribers recover an average of 4.5 operational hours weekly by mapping schedules around existing pantries.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-accent/10 text-emerald-400 flex-shrink-0 flex items-center justify-center">
                    <span className="material-symbols-outlined font-black">done</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1 text-white">Privacy & SQL Audit Immunity</h4>
                    <p className="text-slate-400 font-semibold leading-relaxed">Standard parameterized SQL scripts and JWT authorization protocols safeguard data integrity factors.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stories Section */}
        <section id="testimonials" className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight">Real Stories from Verified Users</h2>
            <p className="text-slate-400 text-lg">See how engineering experts and wellness leaders optimize workflow routines.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Review 1 */}
            <div className="p-8 rounded-2xl bg-[#161921] border border-white/5 shadow-sm hover:translate-y-[-2px] transition duration-300 text-left">
              <div className="flex gap-1 text-emerald-accent mb-4">
                <span className="material-symbols-outlined text-2xl font-bold">star</span>
                <span className="material-symbols-outlined text-2xl font-bold">star</span>
                <span className="material-symbols-outlined text-2xl font-bold">star</span>
                <span className="material-symbols-outlined text-2xl font-bold">star</span>
                <span className="material-symbols-outlined text-2xl font-bold">star</span>
              </div>
              <p className="italic text-slate-300 mb-6 font-medium leading-relaxed">
                "SLMS changed the way I handle my freelance work and home life. The grocery integration alone is worth the subscription!"
              </p>
              <div className="flex items-center gap-4">
                <img 
                  alt="Sarah Jenkins Profile" 
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border border-white/5" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGw7cyNsRNmj6kJ-TZxm-4ku2jlzY1mVZ7ftuj4l_UUBNQbqjvbes8asoYVstV2jLOFIslH1RrQxJAnKUaUKQORkwQZJzr3WVHB_dxzXtg8IYUo78zH42s8ELNWGMJCXWuHcTvq09hV9HHsjMq97TqhHhrKB2IgGdbj5hc-R6XTITyTIBbK7-r7bIj-53a10esCtrxoeB_argUJAW3XyOH8xTnWtu5UMDpffbBGjyq-YKNy7ko3EGrrjA7ya8_pRNOVF-ei0yu3bWa" 
                />
                <div>
                  <div className="font-bold text-white text-sm">Sarah Jenkins</div>
                  <div className="text-xs text-slate-400">Product Designer</div>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="p-8 rounded-2xl bg-[#161921] border border-white/5 shadow-sm hover:translate-y-[-2px] transition duration-300 text-left">
              <div className="flex gap-1 text-emerald-accent mb-4">
                <span className="material-symbols-outlined text-2xl font-bold">star</span>
                <span className="material-symbols-outlined text-2xl font-bold">star</span>
                <span className="material-symbols-outlined text-2xl font-bold">star</span>
                <span className="material-symbols-outlined text-2xl font-bold">star</span>
                <span className="material-symbols-outlined text-2xl font-bold">star</span>
              </div>
              <p className="italic text-slate-300 mb-6 font-medium leading-relaxed">
                "I've tried every productivity app out there. Nothing is as intuitive and beautiful as SmartLife. It actually feels calm to use."
              </p>
              <div className="flex items-center gap-4">
                <img 
                  alt="Mark Thompson Profile" 
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border border-white/5" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMAOn744HXGvto9EAYMPElQH0lR7iI92Irx2EZaQkgpbdAAsz_TskEEUSede2_aB1JVSmh9YvXd9nWzruTfWOGYJ2bR9uM5uXHy-ApqRNhV5i72k-1O7b9pQcUZMzec3HlMjwq3f_vW_y2av-WQEq9caw3xQMqL7PuDXIJNMZXNOxjj7sjydZbEb74X2HL89Z5Ud1Vh5EJnvW34BSTItT0_ltBdbWUtb2v-DGiYrBAD_m45MG8WsqvcgZcsQW8b7zQUyw31MWzgmu5" 
                />
                <div>
                  <div className="font-bold text-white text-sm">Mark Thompson</div>
                  <div className="text-xs text-slate-400">Senior Engineer</div>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="p-8 rounded-2xl bg-[#161921] border border-white/5 shadow-sm hover:translate-y-[-2px] transition duration-300 text-left">
              <div className="flex gap-1 text-emerald-accent mb-4">
                <span className="material-symbols-outlined text-2xl font-bold">star</span>
                <span className="material-symbols-outlined text-2xl font-bold">star</span>
                <span className="material-symbols-outlined text-2xl font-bold">star</span>
                <span className="material-symbols-outlined text-2xl font-bold">star</span>
                <span className="material-symbols-outlined text-2xl font-bold">star</span>
              </div>
              <p className="italic text-slate-300 mb-6 font-medium leading-relaxed">
                "The fitness tracking synced with my schedule helps me actually hit the gym instead of just thinking about it."
              </p>
              <div className="flex items-center gap-4">
                <img 
                  alt="Elena Rodriguez Profile" 
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border border-white/5" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDz07sBuc7ftsD9Xq7E7ZVfeV0Q5dKCrdQn5ec4E7HRlxAyipX19Tygv-vi03Do_88zbAuiOg_SA2wB8DkiUtxhFW33uGfCb7iVAr13JEdkauNz2ziKu6Uy9X4nYtkWfLncBAdRDQ7kiw8vswrKbBziRmooGnIqxIEiMGf7PfO7ugIqE61KFKZAUdWFR1NsSDFC_L_Z_BL8tm-7fbVi9RwhTpksPMmgIc4jAVu2Gm03wAVs9WIgEUhyaUYSyU5pQFh94gC_Hklyfw-U" 
                />
                <div>
                  <div className="font-bold text-white text-sm">Elena Rodriguez</div>
                  <div className="text-xs text-slate-400">Fitness Coach</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Conversion Box */}
        <section className="py-20 px-6 md:px-12 max-w-5xl mx-auto">
          <div className="rounded-[32px] bg-[#161921] border border-white/5 text-white p-12 text-center relative overflow-hidden shadow-xl">
            <div className="absolute top-0 left-0 w-full h-full opacity-15 pointer-events-none">
              <div className="absolute -top-1/2 -left-1/4 w-full h-full bg-emerald-600/25 rounded-full blur-[120px]"></div>
              <div className="absolute -bottom-1/2 -right-1/4 w-full h-full bg-cyan-600/25 rounded-full blur-[120px]"></div>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 relative z-10 tracking-tight">Ready to Take Control?</h2>
            <p className="text-slate-405 text-slate-400 mb-10 max-w-xl mx-auto relative z-10 text-lg">
              Join thousands of organized leaders who have masterfully revolutionized their domestic workflows. Plan schedules around ingredients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <button 
                onClick={() => onNavigate("register")} 
                className="h-14 px-10 rounded-xl bg-emerald-accent hover:bg-emerald-600 text-black font-extrabold hover:scale-[1.02] transition shadow-lg shadow-black/25 cursor-pointer"
              >
                Get Started for Free
              </button>
              <button 
                onClick={() => onNavigate("login")} 
                className="h-14 px-10 rounded-xl border border-white/10 hover:bg-white/5 font-bold transition cursor-pointer"
              >
                Access Account
              </button>
            </div>
            <p className="mt-8 text-slate-500 text-xs tracking-wider z-10 relative">No credit cards required • Highly stable operations • VTU Certified</p>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-dark-sidebar border-t border-white/10 py-16 px-6 md:px-12 text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-emerald-accent text-2xl font-bold">hub</span>
              <span className="font-extrabold text-2xl tracking-tight text-white">SmartLife</span>
            </div>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Redefining operations for modern life coordination structures. Simple, parameterized, and secure relational systems.
            </p>
          </div>
          <div>
            <h5 className="font-extrabold text-xs uppercase tracking-widest text-slate-400 mb-6">Module Features</h5>
            <ul className="space-y-4 text-sm text-slate-400 font-medium whitespace-nowrap">
              <li>Checklist Tasks Matrix</li>
              <li>Smart Groceries supply lists</li>
              <li>Calorie trend nutrition log</li>
              <li>Automated warning signals</li>
            </ul>
          </div>
          <div>
            <h5 className="font-extrabold text-xs uppercase tracking-widest text-slate-400 mb-6">Academic Framework</h5>
            <ul className="space-y-4 text-sm text-slate-400 font-medium whitespace-nowrap">
              <li>Third Normal Form (3NF) Diagrams</li>
              <li>Data Flow Models context maps</li>
              <li>Entity Relational Schemes</li>
              <li>Class Diagram domains structures</li>
            </ul>
          </div>
          <div>
            <h5 className="font-extrabold text-xs uppercase tracking-widest text-slate-400 mb-6">VTU Submission Info</h5>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              <strong>Smart Life Management System (SLMS)</strong> - Designed for Lab Viva certifications. Verified parameters 2026.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs text-left w-full">
          <div>© 2026 SmartLife Management System. All rights reserved. VTU Engineering Submission.</div>
          <div className="flex gap-6 whitespace-nowrap">
            <span className="hover:text-emerald-accent transition cursor-pointer">ACID Safe</span>
            <span className="hover:text-emerald-accent transition cursor-pointer">Zero Anomalies</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
