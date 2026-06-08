/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from "react";
import { DietLog } from "../types";

interface DietPageProps {
  diets: DietLog[];
  onAddMeal: (meal: { food_name: string; calories: number; protein: number; log_date: string }) => void;
}

export default function DietPage({ diets, onAddMeal }: DietPageProps) {
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState(350);
  const [protein, setProtein] = useState(25);
  const [logDate, setLogDate] = useState("2026-06-08");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!foodName.trim()) return;
    onAddMeal({
      food_name: foodName,
      calories,
      protein,
      log_date: logDate,
    });
    setFoodName("");
  };

  const todayDateStr = "2026-06-08"; // Standard anchor date in seed
  const todayMeals = diets.filter((d) => d.log_date === todayDateStr);
  
  const consumedKcal = todayMeals.reduce((sum, d) => sum + d.calories, 0);
  const targetKcal = 2400;
  const progressPct = Math.min(Math.round((consumedKcal / targetKcal) * 100), 100);

  const totalProtein = todayMeals.reduce((sum, d) => sum + d.protein, 0);
  const targetProtein = 140; // in grams
  const proteinPct = Math.min(Math.round((totalProtein / targetProtein) * 100), 100);

  return (
    <div className="p-6 md:p-10 space-y-8 font-sans">
      
      {/* Header */}
      <div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight animate-fade-in">Diet & Fitness Tracker</h2>
        <p className="text-slate-400 font-medium">Record daily macronutrient elements, meal plans, and wellness trends.</p>
      </div>

      {/* Top dashboard widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Progress gauge ring */}
        <div className="lg:col-span-8 bg-[#161921] border border-white/5 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row items-center gap-8 justify-around">
          <div className="relative w-40 h-40 flex items-center justify-center shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle className="text-white/5" strokeWidth="8" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" />
              <circle 
                className="text-emerald-accent transition-all duration-700" 
                strokeWidth="8" 
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (251.2 * progressPct) / 100}
                strokeLinecap="round" 
                stroke="currentColor" 
                fill="transparent" 
                r="40" 
                cx="50" 
                cy="50" 
              />
            </svg>
            <div className="absolute text-center animate-pulse-slow">
              <div className="text-2xl font-black text-white">{consumedKcal} / {targetKcal}</div>
              <div className="text-[10px] uppercase font-black tracking-wider text-slate-500">Total Kcal</div>
            </div>
          </div>

          {/* Calorie indicators */}
          <div className="flex-1 space-y-4 w-full">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-450 text-slate-400 mb-1">
                <span>Core Calories Balance Index</span>
                <span className="text-emerald-400">{progressPct}% Met</span>
              </div>
              <div className="w-full bg-dark-bg h-2 rounded-full overflow-hidden border border-white/5">
                <div className="bg-emerald-accent h-full rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-450 text-slate-400 mb-1">
                <span>Muscle Protein Target (Grams)</span>
                <span className="text-emerald-400">{totalProtein}g / {targetProtein}g ({proteinPct}%)</span>
              </div>
              <div className="w-full bg-dark-bg h-2 rounded-full overflow-hidden border border-white/5">
                <div className="bg-emerald-400 h-full rounded-full transition-all duration-500" style={{ width: `${proteinPct}%` }}></div>
              </div>
            </div>

            <div className="bg-dark-bg border border-white/5 rounded-xl p-3 text-[11px] font-semibold text-slate-400 leading-relaxed">
              🏋🏽 <strong className="text-white">Diet-Fitness Synergy Tag:</strong> Log high protein items to balance task cards stress scores.
            </div>
          </div>
        </div>

        {/* Form to log meals */}
        <div className="lg:col-span-4 bg-[#161921] border border-white/5 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-white text-md mb-4 flex items-center gap-1.5 leading-tight">
              <span className="material-symbols-outlined text-emerald-accent">restaurant</span>
              <span>Record Meal Log</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-bold">
              <div className="space-y-1">
                <label className="text-slate-400" htmlFor="food_name">Edible Recipe / Item</label>
                <input
                  className="w-full bg-dark-bg text-white border border-white/10 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-accent/20 text-sm font-semibold placeholder:text-slate-600"
                  id="food_name"
                  placeholder="Grilled Salmon Bowl..."
                  type="text"
                  required
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-400" htmlFor="calories">Kcal Calories</label>
                  <input
                    className="w-full bg-dark-bg text-white border border-white/10 p-3 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-accent/20"
                    id="calories"
                    type="number"
                    min="1"
                    required
                    value={calories}
                    onChange={(e) => setCalories(Number(e.target.value))}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400" htmlFor="protein">Protein (g)</label>
                  <input
                    className="w-full bg-dark-bg text-white border border-white/10 p-3 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-accent/20"
                    id="protein"
                    type="number"
                    min="0"
                    required
                    value={protein}
                    onChange={(e) => setProtein(Number(e.target.value))}
                  />
                </div>
              </div>

              <button
                className="w-full py-3 bg-emerald-accent hover:bg-emerald-600 text-black rounded-xl font-extrabold text-sm transition active:scale-95 duration-100 cursor-pointer flex items-center justify-center gap-2"
                type="submit"
              >
                <span className="material-symbols-outlined text-sm">restaurant_menu</span>
                <span>Log Formula</span>
              </button>
            </form>
          </div>
        </div>

      </div>

      {/* Meals Diary Table */}
      <div className="bg-[#161921] border border-white/5 rounded-3xl overflow-hidden shadow-sm">
        <div className="bg-[#161921] border-b border-white/5 p-6 flex justify-between items-center">
          <h3 className="font-extrabold text-white text-md">Daily Meal Diary Records</h3>
          <span className="text-[10px] font-mono font-bold bg-emerald-accent/10 border border-emerald-accent/20 text-emerald-440 text-emerald-400 px-3 py-1.5 rounded-full">Date Anchor: {logDate}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-xs border-collapse">
            <thead>
              <tr className="bg-dark-bg border-b border-white/10 text-slate-400 font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Food Item</th>
                <th className="px-6 py-4">Log Date</th>
                <th className="px-6 py-4 text-center">Calories Rating</th>
                <th className="px-6 py-4 text-center">Protein Count</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-medium text-slate-300">
              {diets.map((meal) => (
                <tr key={meal.diet_id} className="hover:bg-white/5">
                  <td className="px-6 py-4">
                    <span className="font-extrabold text-white text-sm block">{meal.food_name}</span>
                    <span className="text-[10px] text-slate-500 font-mono">Log ID: #{meal.diet_id}</span>
                  </td>
                  <td className="px-6 py-4 font-mono text-slate-400">{meal.log_date}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-accent/10 border border-emerald-accent/20 px-2.5 py-1 rounded-xl">
                      {meal.calories} kcal
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-accent/10 border border-emerald-accent/20 px-2.5 py-1 rounded-xl">
                      {meal.protein}g protein
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
