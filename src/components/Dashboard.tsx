/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import { Task, GroceryItem, DietLog, WorkoutLog, ActivityLog } from "../types";

interface DashboardProps {
  tasks: Task[];
  groceryItems: GroceryItem[];
  diets: DietLog[];
  workouts?: WorkoutLog[];
  activities: ActivityLog[];
  onTabChange: (tab: string) => void;
  currentUser: { 
    full_name: string; 
    email: string; 
    role: string;
    weight?: number;
    condition?: string;
    weekly_diet?: string;
  } | null;
}

export default function Dashboard({
  tasks,
  groceryItems,
  diets,
  workouts = [],
  activities,
  onTabChange,
  currentUser,
}: DashboardProps) {
  // Aggregate Metrics Calculations safely
  const completedTasks = tasks.filter((t) => t.status === "Done").length;
  const pendingTasks = tasks.length - completedTasks;
  const lowStockCount = groceryItems.filter((g) => g.quantity <= g.threshold_level).length;
  
  const todayDateStr = "2026-06-08"; // Standard date anchor in mock

  // Calorie calculations with workouts active deficit
  const todayCalories = diets
    .filter((d) => d.log_date === todayDateStr)
    .reduce((sum, d) => sum + d.calories, 0);

  const todayWorkouts = workouts.filter((w) => w.log_date === todayDateStr);
  const todayBurned = todayWorkouts.reduce((sum, w) => sum + w.calories_burned, 0);

  // Net Calorie calculation
  const netCalories = todayCalories - todayBurned;

  // Calorie targets based on registered conditions
  const getTargetKcal = () => {
    const cond = currentUser?.condition || "Active Health Maintenance";
    if (cond.includes("Loss") || cond.includes("Toning")) return 1800;
    if (cond.includes("Muscle") || cond.includes("Power")) return 2800;
    if (cond.includes("Endurance")) return 2400;
    return 2200;
  };

  const targetKcal = getTargetKcal();
  const calPercent = Math.max(0, Math.min(Math.round((netCalories / targetKcal) * 100), 100));

  // Weekly Productivity numbers (Mon -> Sun completions)
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const productivityStats = [4, 6, 8, 5, 7, 3, 2]; // completed chores trends

  return (
    <div className="p-6 md:p-10 space-y-8 font-sans">
      
      {/* Greetings Header with Custom Registration Metrics */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Good evening, {currentUser?.full_name.split(" ")[0] || "Guest"}!</h2>
          <p className="text-slate-500 font-medium text-sm leading-relaxed max-w-2xl mt-0.5">
            Empowered by <strong className="text-emerald-700">ZenithLife Premium</strong>. Registered bodily condition: <strong className="text-slate-800">{currentUser?.condition || "Active Health Maintenance"} Mode</strong>.
          </p>
        </div>

        {/* User registered metrics overview */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-white border border-slate-200/80 px-4 py-2.5 rounded-2xl flex items-center gap-2 text-xs font-bold shadow-xs">
            <span className="material-symbols-outlined text-emerald-600 text-sm">scale</span>
            <span>Weight: <strong className="text-slate-900 font-extrabold">{currentUser?.weight || 75} kg</strong></span>
          </div>
          <div className="bg-white border border-slate-200/80 px-4 py-2.5 rounded-2xl flex items-center gap-2 text-xs font-bold shadow-xs">
            <span className="material-symbols-outlined text-emerald-600 text-sm">restaurant_menu</span>
            <span>Diet: <strong className="text-slate-950 font-extrabold max-w-[150px] truncate leading-none block align-middle">{currentUser?.weekly_diet || "High-Protein Balanced Plan"}</strong></span>
          </div>
          <div className="bg-slate-950 text-white px-4 py-2.5 rounded-2xl flex items-center gap-2 text-xs font-bold shadow-xs">
            <span className="material-symbols-outlined text-emerald-400 text-sm font-bold">calendar_today</span>
            <span>Monday, June 8, 2026</span>
          </div>
        </div>
      </div>

      {/* Primary Bento Cards Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Metric 1: Tasks */}
        <div 
          onClick={() => onTabChange("tasks")}
          className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs hover:shadow-md hover:border-emerald-500/20 transition duration-200 cursor-pointer flex items-center justify-between group"
        >
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Total Habit Tasks</span>
            <div className="text-3xl font-black text-slate-900 mt-2 mb-1">{tasks.length}</div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">{completedTasks} completed</span>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-2xl flex items-center justify-center group-hover:scale-105 transition shadow-xs">
            <span className="material-symbols-outlined text-2xl font-bold">assignment</span>
          </div>
        </div>

        {/* Metric 2: Groceries Alerts */}
        <div 
          onClick={() => onTabChange("grocery")}
          className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs hover:shadow-md hover:border-emerald-500/20 transition duration-200 cursor-pointer flex items-center justify-between group"
        >
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Pantry Refill Alerts</span>
            <div className="text-3xl font-black text-slate-900 mt-2 mb-1">{lowStockCount}</div>
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${lowStockCount > 0 ? "bg-rose-50 text-rose-700" : "bg-emerald-50 text-emerald-700"}`}>
              {lowStockCount > 0 ? "Re-supply recommended" : "Stock fully optimized"}
            </span>
          </div>
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-xs group-hover:scale-105 transition ${
            lowStockCount > 0 ? "bg-rose-50 text-rose-600 border-rose-100" : "bg-slate-50 text-slate-600 border-slate-200/80"
          }`}>
            <span className="material-symbols-outlined text-2xl font-bold">shopping_basket</span>
          </div>
        </div>

        {/* Metric 3: Calories Deficit Tracker (Net Tracker) */}
        <div 
          onClick={() => onTabChange("diet")}
          className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs hover:shadow-md hover:border-emerald-500/20 transition duration-200 cursor-pointer flex items-center justify-between group"
        >
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Net Calorie Deficit</span>
            <div className="text-3xl font-black text-slate-900 mt-2 mb-1">{netCalories} <span className="text-xs text-slate-400 font-normal">kcal</span></div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
              {todayBurned > 0 ? `Burned -{todayBurned} kcal today` : "No active workouts yet"}
            </span>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-2xl flex items-center justify-center group-hover:scale-105 transition shadow-xs">
            <span className="material-symbols-outlined text-2xl font-bold">local_fire_department</span>
          </div>
        </div>

        {/* Metric 4: Trigger Alerts Schema Verification */}
        <div 
          onClick={() => onTabChange("dbms_deck")}
          className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs hover:shadow-md hover:border-emerald-500/20 transition duration-200 cursor-pointer flex items-center justify-between group"
        >
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Relational DBMS System</span>
            <div className="text-md font-bold text-slate-800 mt-2.5 pb-1 select-none font-mono">100% Normalized</div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">SQL Interactive Deck</span>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-2xl flex items-center justify-center group-hover:scale-105 transition shadow-xs">
            <span className="material-symbols-outlined text-2xl font-bold">school</span>
          </div>
        </div>

      </div>

      {/* Secondary Dashboard Analytical Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Productivity SVG Chart Card */}
        <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-black text-slate-900 text-lg tracking-tight">Weekly Habit Completions</h3>
              <p className="text-slate-500 text-xs font-sans">Daily achievements registered in relational tuples</p>
            </div>
            <span className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold font-mono text-slate-500 shadow-xs">SVG Canvas Map</span>
          </div>

          {/* Clean Custom SVG Bar Chart */}
          <div className="h-64 flex items-end justify-between px-4 pt-4 relative">
            
            {/* Grid Lines */}
            <div className="absolute inset-y-0 left-0 w-full flex flex-col justify-between pointer-events-none">
              <div className="border-t border-slate-100 w-full"></div>
              <div className="border-t border-slate-100 w-full"></div>
              <div className="border-t border-slate-100 w-full"></div>
              <div className="border-t border-slate-100 w-full"></div>
            </div>

            {productivityStats.map((val, idx) => {
              // Map val to height proportion out of max scale 10
              const barHeightPct = `${(val / 10) * 100}%`;
              return (
                <div key={idx} className="flex flex-col items-center gap-3 w-full group relative z-10">
                  <div className="text-xs font-bold text-slate-500 group-hover:text-emerald-600 transition font-mono">{val}</div>
                  <div className="w-8 md:w-12 bg-slate-50 hover:bg-slate-100 rounded-t-xl transition duration-300 relative overflow-hidden" style={{ height: "180px" }}>
                    <div 
                      className="absolute bottom-0 left-0 w-full bg-emerald-500 rounded-t-xl hover:bg-emerald-600 transition-all duration-500"
                      style={{ height: barHeightPct }}
                    ></div>
                  </div>
                  <span className="text-xs font-bold text-slate-500 font-sans">{daysOfWeek[idx]}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Nutritional Circular Progress Ring */}
        <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs flex flex-col items-center text-center justify-between gap-4">
          <div className="w-full text-left">
            <h3 className="font-extrabold text-slate-900 text-lg tracking-tight">Active Deficit Ratio</h3>
            <p className="text-slate-500 text-xs font-sans">Calorie goal tailored for the {currentUser?.condition || "Active"} target</p>
          </div>

          <div className="relative w-44 h-44 my-2 flex items-center justify-center">
            {/* Round Progress Ring back and front */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle className="text-slate-100" strokeWidth="8" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" />
              <circle 
                className="text-emerald-500 transition-all duration-700" 
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
              <span className="text-2xl font-black text-slate-900 leading-none tracking-tight font-sans">{netCalories} <span className="text-[10px] text-slate-400 font-semibold">kcal Nav</span></span>
              <span className="text-[9px] uppercase font-extrabold text-slate-400 tracking-wider mt-1.5">{calPercent}% met</span>
            </div>
          </div>

          {/* Caloric stats ledger */}
          <div className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 flex justify-between text-xs text-slate-600 font-bold">
            <div>
              <p className="text-slate-400 font-bold text-[9px] uppercase tracking-wider">Consumed</p>
              <p className="text-slate-850 mt-1 font-mono font-black text-sm block">+{todayCalories} kcal</p>
            </div>
            <div className="w-px h-8 bg-slate-200"></div>
            <div>
              <p className="text-slate-400 font-bold text-[9px] uppercase tracking-wider">Workout Burn</p>
              <p className="text-emerald-600 mt-1 font-mono font-black text-sm block">-{todayBurned} kcal</p>
            </div>
            <div className="w-px h-8 bg-slate-200"></div>
            <div>
              <p className="text-slate-400 font-bold text-[9px] uppercase tracking-wider">Target Budget</p>
              <p className="text-slate-800 mt-1 font-mono font-black text-sm block">{targetKcal} kcal</p>
            </div>
          </div>

        </div>

      </div>

      {/* Third row: Tasks Checklist & Trigger Log Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Minified upcoming checklist */}
        <div className="lg:col-span-6 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs flex flex-col">
          <div className="flex justify-between items-center mb-6 pb-2 border-b border-slate-100">
            <h3 className="font-extrabold text-slate-900 text-lg tracking-tight">Active Crucial Deadlines</h3>
            <button onClick={() => onTabChange("tasks")} className="text-xs text-emerald-600 font-bold hover:text-emerald-750 hover:underline cursor-pointer">View Entire Checklist</button>
          </div>

          <div className="space-y-4 flex-1">
            {tasks.filter((t) => t.status !== "Done").slice(0, 3).map((item) => (
              <div key={item.task_id} className="flex gap-4 p-4 border border-slate-100 bg-slate-50/40 rounded-2xl items-start hover:border-emerald-500/20 hover:bg-slate-50/80 transition duration-150 shadow-xs">
                <span className={`w-3.5 h-3.5 rounded-full shrink-0 mt-1.5 ${
                  item.priority === "High" ? "bg-rose-500 shadow-sm shadow-rose-500/20" : item.priority === "Medium" ? "bg-amber-500 shadow-sm shadow-amber-500/10" : "bg-emerald-500 shadow-sm shadow-emerald-500/10"
                }`}></span>
                <div className="flex-1 text-left">
                  <h5 className="font-extrabold text-sm text-slate-800 leading-snug">{item.task_name}</h5>
                  <p className="text-xs text-slate-500 leading-tight mt-1 font-sans font-semibold">{item.description}</p>
                </div>
                <div className="text-right text-[10px] font-bold text-slate-500 font-mono shrink-0">
                  <div>Priority: <strong className={item.priority === "High" ? "text-rose-600 font-black" : "text-slate-600"}>{item.priority}</strong></div>
                  <div className="mt-1 font-semibold">Due: {item.deadline}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Database Trigger Activities Stamp Timeline */}
        <div className="lg:col-span-6 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs">
          <div className="flex justify-between items-center mb-6 pb-2 border-b border-slate-100">
            <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-1.5 font-sans tracking-tight">
              <span className="material-symbols-outlined text-emerald-600 text-sm font-bold animate-pulse">bolt</span>
              <span>SLMS Database Trigger Events Log</span>
            </h3>
            <button onClick={() => onTabChange("dbms_deck")} className="text-xs text-emerald-600 font-bold hover:text-emerald-700 hover:underline cursor-pointer">Explore Deck Sandbox</button>
          </div>

          <div className="space-y-4 max-h-[290px] overflow-y-auto no-scrollbar">
            {activities.length > 0 ? (
              activities.slice(0, 4).map((act) => (
                <div key={act.activity_id} className="flex gap-4 relative">
                  
                  {/* Timeline Node Connector Line */}
                  <div className="absolute left-4 top-8 bottom-0 w-[2px] bg-slate-100 pointer-events-none"></div>

                  <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 shrink-0 flex items-center justify-center text-slate-550 relative z-10 shadow-xs">
                    <span className="material-symbols-outlined text-xs">history</span>
                  </div>
                  <div className="flex-1 text-xs text-left">
                    <div className="flex justify-between text-slate-500 font-bold mb-1">
                      <span className="text-slate-800 font-bold">{act.activity_type}</span>
                      <span className="font-mono text-[10px] text-slate-400 font-medium">{act.timestamp}</span>
                    </div>
                    <p className="text-slate-500 font-semibold font-sans text-[11px] leading-relaxed">{act.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-slate-400 p-8 flex flex-col items-center gap-2">
                <span className="material-symbols-outlined text-2xl animate-spin text-slate-350">sync</span>
                <p className="font-bold text-xs">Waiting for database events logs...</p>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
