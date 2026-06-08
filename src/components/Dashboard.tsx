/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Task, GroceryItem, DietLog, ActivityLog } from "../types";

interface DashboardProps {
  tasks: Task[];
  groceryItems: GroceryItem[];
  diets: DietLog[];
  activities: ActivityLog[];
  onTabChange: (tab: string) => void;
  currentUser: { full_name: string; email: string; role: string } | null;
}

export default function Dashboard({
  tasks,
  groceryItems,
  diets,
  activities,
  onTabChange,
  currentUser,
}: DashboardProps) {
  // Aggregate Metrics Calculations safely
  const completedTasks = tasks.filter((t) => t.status === "Done").length;
  const pendingTasks = tasks.length - completedTasks;
  const lowStockCount = groceryItems.filter((g) => g.quantity <= g.threshold_level).length;
  
  // Calorie calculations safely
  const todayDateStr = "2026-06-08"; // Standard date anchor in mock
  const todayCalories = diets
    .filter((d) => d.log_date === todayDateStr)
    .reduce((sum, d) => sum + d.calories, 0);
  const targetCalories = 2400;
  const calPercent = Math.min(Math.round((todayCalories / targetCalories) * 100), 100);

  // Weekly Productivity numbers (Mon -> Sun completions)
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const productivityStats = [4, 6, 8, 5, 7, 3, 2]; // completed chores trends

  return (
    <div className="p-6 md:p-10 space-y-8 font-sans">
      
      {/* Greetings Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Good evening, {currentUser?.full_name.split(" ")[0] || "Alex"}!</h2>
          <p className="text-slate-400 font-medium font-sans">Here's your productivity index and kitchen sync logs for today.</p>
        </div>
        <div className="flex items-center gap-2.5 bg-[#161921] border border-white/5 shadow-sm px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 font-mono">
          <span className="material-symbols-outlined text-[16px] text-emerald-accent">calendar_today</span>
          <span>Monday, June 8, 2026</span>
        </div>
      </div>

      {/* Primary Bento Cards Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Metric 1: Tasks */}
        <div 
          onClick={() => onTabChange("tasks")}
          className="bg-[#161921] border border-white/5 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-emerald-accent/25 transition duration-200 cursor-pointer flex items-center justify-between group"
        >
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-500">Total Tasks</span>
            <div className="text-3xl font-black text-white mt-2 mb-1">{tasks.length}</div>
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2.5 py-0.5 rounded-full">{completedTasks} completed</span>
          </div>
          <div className="w-12 h-12 bg-white/5 text-emerald-400 border border-white/5 rounded-2xl flex items-center justify-center group-hover:scale-105 transition">
            <span className="material-symbols-outlined text-2xl font-bold">assignment</span>
          </div>
        </div>

        {/* Metric 2: Groceries Alerts */}
        <div 
          onClick={() => onTabChange("grocery")}
          className="bg-[#161921] border border-white/5 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-emerald-accent/25 transition duration-200 cursor-pointer flex items-center justify-between group"
        >
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-500">Storage Alerts</span>
            <div className="text-3xl font-black text-white mt-2 mb-1">{lowStockCount}</div>
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${lowStockCount > 0 ? "bg-rose-500/10 text-rose-450 text-rose-405 text-rose-400" : "bg-emerald-500/10 text-emerald-400"}`}>
              {lowStockCount > 0 ? "Critical deficit" : "Stock fully optimized"}
            </span>
          </div>
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border border-white/5 group-hover:scale-105 transition ${
            lowStockCount > 0 ? "bg-rose-500/10 text-rose-400" : "bg-white/5 text-slate-300"
          }`}>
            <span className="material-symbols-outlined text-2xl font-bold">shopping_basket</span>
          </div>
        </div>

        {/* Metric 3: Calories Tracker */}
        <div 
          onClick={() => onTabChange("diet")}
          className="bg-[#161921] border border-white/5 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-emerald-accent/25 transition duration-200 cursor-pointer flex items-center justify-between group"
        >
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-500">Calorie Target</span>
            <div className="text-3xl font-black text-white mt-2 mb-1">{todayCalories} <span className="text-xs text-slate-500 font-normal">kcal</span></div>
            <span className="text-xs font-semibold text-emerald-450 text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">{calPercent}% of quota log</span>
          </div>
          <div className="w-12 h-12 bg-white/5 text-emerald-400 border border-white/5 rounded-2xl flex items-center justify-center group-hover:scale-105 transition">
            <span className="material-symbols-outlined text-2xl font-bold">local_fire_department</span>
          </div>
        </div>

        {/* Metric 4: Trigger Alerts Activity Count */}
        <div 
          onClick={() => onTabChange("dbms_deck")}
          className="bg-[#161921] border border-white/5 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-emerald-accent/25 transition duration-200 cursor-pointer flex items-center justify-between group"
        >
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-500">3NF Schema Status</span>
            <div className="text-md font-bold text-slate-205 text-slate-200 mt-2.5 pb-1 select-none font-mono">100% Normalized</div>
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">Interactive SQL Sandbox</span>
          </div>
          <div className="w-12 h-12 bg-white/5 text-emerald-400 border border-white/5 rounded-2xl flex items-center justify-center group-hover:scale-105 transition">
            <span className="material-symbols-outlined text-2xl font-bold">school</span>
          </div>
        </div>

      </div>

      {/* Secondary Dashboard Analytical Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Productivity SVG Chart Card */}
        <div className="lg:col-span-8 bg-[#161921] border border-white/5 rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-extrabold text-white text-lg">Weekly Task Productivity Progression</h3>
              <p className="text-slate-400 text-xs font-sans">Total successful daily completions</p>
            </div>
            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-xl text-xs font-bold font-mono text-slate-400">SVG Canvas</span>
          </div>

          {/* Clean Custom SVG Bar Chart */}
          <div className="h-64 flex items-end justify-between px-4 pt-4 relative">
            
            {/* Grid Lines */}
            <div className="absolute inset-y-0 left-0 w-full flex flex-col justify-between pointer-events-none opacity-20">
              <div className="border-t border-white/10 w-full"></div>
              <div className="border-t border-white/10 w-full"></div>
              <div className="border-t border-white/10 w-full"></div>
              <div className="border-t border-white/10 w-full"></div>
            </div>

            {productivityStats.map((val, idx) => {
              // Map val to height proportion out of max scale 10
              const barHeightPct = `${(val / 10) * 100}%`;
              return (
                <div key={idx} className="flex flex-col items-center gap-3 w-full group relative z-10">
                  <div className="text-xs font-bold text-slate-400 group-hover:text-emerald-400 transition font-mono">{val}</div>
                  <div className="w-8 md:w-12 bg-white/5 hover:bg-emerald-500/10 rounded-t-xl transition duration-300 relative overflow-hidden" style={{ height: "180px" }}>
                    <div 
                      className="absolute bottom-0 left-0 w-full bg-emerald-accent rounded-t-xl hover:bg-emerald-400 transition-all duration-500"
                      style={{ height: barHeightPct }}
                    ></div>
                  </div>
                  <span className="text-xs font-bold text-slate-400">{daysOfWeek[idx]}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Nutritional Circular Progress Ring */}
        <div className="lg:col-span-4 bg-[#161921] border border-white/5 rounded-3xl p-6 shadow-sm flex flex-col items-center text-center justify-between">
          <div className="w-full text-left">
            <h3 className="font-extrabold text-white text-md">Daily Calorie Balance</h3>
            <p className="text-slate-400 text-xs font-sans">Based on standard nutrition targets</p>
          </div>

          <div className="relative w-44 h-44 my-4 flex items-center justify-center">
            {/* Round Progress Ring back and front */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle className="text-white/5" strokeWidth="8" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" />
              <circle 
                className="text-emerald-accent transition-all duration-700" 
                strokeWidth="8" 
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (251.2 * calPercent) / 100}
                strokeLinecap="round" 
                stroke="currentColor" 
                fill="transparent" 
                r="40" 
                cx="50" 
                cy="50" 
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-black text-white tracking-tight font-sans">{calPercent}%</span>
              <span className="text-[10px] uppercase font-bold text-slate-405 text-slate-400 tracking-wider">Completed</span>
            </div>
          </div>

          <div className="w-full bg-white/5 rounded-2xl p-3.5 border border-white/5 flex justify-between text-xs text-slate-300 font-bold">
            <div>
              <p className="text-slate-400 font-medium">Consumed</p>
              <p className="text-white mt-1 font-mono font-bold text-sm">{todayCalories} kcal</p>
            </div>
            <div className="w-px h-8 bg-white/10"></div>
            <div>
              <p className="text-slate-400 font-medium">Target Goal</p>
              <p className="text-white mt-1 font-mono font-bold text-sm">2,400 kcal</p>
            </div>
          </div>

        </div>

      </div>

      {/* Third row: Tasks Checklist & Trigger Log Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Minified upcoming checklist */}
        <div className="lg:col-span-6 bg-[#161921] border border-white/5 rounded-3xl p-6 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6 pb-2 border-b border-white/5">
            <h3 className="font-extrabold text-white text-md">Crucial Up-coming Deadlines</h3>
            <button onClick={() => onTabChange("tasks")} className="text-xs text-emerald-400 font-bold hover:underline cursor-pointer">View Checklist</button>
          </div>

          <div className="space-y-4 flex-1">
            {tasks.filter((t) => t.status !== "Done").slice(0, 3).map((item) => (
              <div key={item.task_id} className="flex gap-4 p-4 border border-white/5 bg-white/5 rounded-2xl items-start hover:border-emerald-accent/20 transition">
                <span className={`w-3.5 h-3.5 rounded-full shrink-0 mt-1.5 ${
                  item.priority === "High" ? "bg-rose-500" : item.priority === "Medium" ? "bg-amber-500" : "bg-emerald-500"
                }`}></span>
                <div className="flex-1">
                  <h5 className="font-extrabold text-sm text-slate-200">{item.task_name}</h5>
                  <p className="text-xs text-slate-400 leading-tight mt-1 font-sans font-medium">{item.description}</p>
                </div>
                <div className="text-right text-[10px] font-bold text-slate-400 font-mono">
                  <div>Priority: <strong className={item.priority === "High" ? "text-rose-400 font-black" : ""}>{item.priority}</strong></div>
                  <div className="mt-1">Due: {item.deadline}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Database Trigger Activities Stamp Timeline */}
        <div className="lg:col-span-6 bg-[#161921] border border-white/5 rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6 pb-2 border-b border-white/5">
            <h3 className="font-extrabold text-white text-md flex items-center gap-1.5 font-sans">
              <span className="material-symbols-outlined text-emerald-accent text-sm font-bold animate-pulse">bolt</span>
              <span>SLMS Database Trigger Events Log</span>
            </h3>
            <button onClick={() => onTabChange("dbms_deck")} className="text-xs text-emerald-400 font-bold hover:underline cursor-pointer">Check Schema Triggers</button>
          </div>

          <div className="space-y-4 max-h-[290px] overflow-y-auto no-scrollbar">
            {activities.length > 0 ? (
              activities.slice(0, 4).map((act) => (
                <div key={act.activity_id} className="flex gap-4 relative">
                  
                  {/* Timeline Node Connector Line */}
                  <div className="absolute left-4 top-8 bottom-0 w-[2px] bg-white/5 pointer-events-none"></div>

                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 shrink-0 flex items-center justify-center text-slate-400 relative z-10">
                    <span className="material-symbols-outlined text-xs">history</span>
                  </div>
                  <div className="flex-1 text-xs">
                    <div className="flex justify-between text-slate-400 font-bold mb-1">
                      <span className="text-slate-200">{act.activity_type}</span>
                      <span className="font-mono text-[10px] text-slate-500">{act.timestamp}</span>
                    </div>
                    <p className="text-slate-400 font-medium font-sans text-[11px] leading-relaxed">{act.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-slate-500 p-8 flex flex-col items-center gap-2">
                <span className="material-symbols-outlined text-2xl">info</span>
                <p className="font-medium text-xs">No active transactions logged currently.</p>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
