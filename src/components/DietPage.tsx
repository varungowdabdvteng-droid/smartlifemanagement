/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from "react";
import { DietLog, WorkoutLog, User } from "../types";

interface DietPageProps {
  diets: DietLog[];
  onAddMeal: (meal: { food_name: string; calories: number; protein: number; log_date: string }) => void;
  workouts: WorkoutLog[];
  onAddWorkout: (workout: { workout_type: string; duration_minutes: number; calories_burned: number; log_date: string }) => void;
  onDeleteWorkout: (workoutId: number) => void;
  currentUser: User | null;
}

export default function DietPage({ 
  diets, 
  onAddMeal, 
  workouts, 
  onAddWorkout, 
  onDeleteWorkout, 
  currentUser 
}: DietPageProps) {
  // Meal Form State
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState(350);
  const [protein, setProtein] = useState(25);

  // Workout Form State
  const [workoutType, setWorkoutType] = useState("Strength Weights Training");
  const [durationMinutes, setDurationMinutes] = useState(30);
  const [caloriesBurned, setCaloriesBurned] = useState(240);

  const [activeSegment, setActiveSegment] = useState<"meals" | "workouts">("meals");
  const todayDateStr = "2026-06-08"; // Consistent system date context

  // 1. DYNAMIC MACRONUTRIENTS FORMULAS BY WEIGHT & Fitness Goal
  const getDynamicMacros = () => {
    const W = currentUser?.weight || 75;
    const cond = currentUser?.condition || "Active Health Maintenance";
    
    let kcal = 2200;
    let proteinVal = 140;
    let fatVal = 60;
    let carbsVal = 275;

    if (cond.includes("Loss") || cond.includes("Toning")) {
      kcal = Math.round(24 * W);
      proteinVal = Math.round(2.2 * W);
      fatVal = Math.round(0.8 * W);
      carbsVal = Math.round((kcal - (proteinVal * 4 + fatVal * 9)) / 4);
    } else if (cond.includes("Muscle") || cond.includes("Power")) {
      kcal = Math.round(35 * W);
      proteinVal = Math.round(2.0 * W);
      fatVal = Math.round(1.0 * W);
      carbsVal = Math.round((kcal - (proteinVal * 4 + fatVal * 9)) / 4);
    } else if (cond.includes("Endurance")) {
      kcal = Math.round(30 * W);
      proteinVal = Math.round(1.6 * W);
      fatVal = Math.round(0.9 * W);
      carbsVal = Math.round((kcal - (proteinVal * 4 + fatVal * 9)) / 4);
    } else {
      // Maintenance
      kcal = Math.round(28 * W);
      proteinVal = Math.round(1.5 * W);
      fatVal = Math.round(0.8 * W);
      carbsVal = Math.round((kcal - (proteinVal * 4 + fatVal * 9)) / 4);
    }

    return { kcal, protein: proteinVal, fat: fatVal, carbs: carbsVal };
  };

  const macros = getDynamicMacros();
  const targetKcal = macros.kcal;
  const targetProtein = macros.protein;
  const targetFats = macros.fat;
  const targetCarbs = macros.carbs;

  // 2. GENERATIVE DIET PLAN based on achieving selected body composition
  const getAutonomousPlan = () => {
    const cond = currentUser?.condition || "Active Health Maintenance";
    
    if (cond.includes("Loss") || cond.includes("Toning")) {
      return {
        dietPlan: [
          { name: "Breakfast: Avocado Egg Scramble (No Bread)", kcal: 380, protein: 26, carbs: 4, fat: 28 },
          { name: "Lunch: Grilled Chicken Breast with Steamed Broccoli", kcal: 420, protein: 44, carbs: 8, fat: 12 },
          { name: "Snack: Pure Whey Protein Shake in Almond Milk", kcal: 180, protein: 30, carbs: 3, fat: 2 },
          { name: "Dinner: Baked Salmon Fillet with Leafy Salad", kcal: 520, protein: 40, carbs: 5, fat: 34 }
        ],
        workoutsPlan: [
          { name: "HIIT Cardiovascular Melt & Sprint Drills", duration: 30, burn: 380 },
          { name: "Kettlebell Conditioning Deficit Routine", duration: 25, burn: 240 }
        ]
      };
    } else if (cond.includes("Muscle") || cond.includes("Power")) {
      return {
        dietPlan: [
          { name: "Breakfast: Granola & Greek Yogurt Bowl with Honey & Bananas", kcal: 620, protein: 32, carbs: 85, fat: 14 },
          { name: "Lunch: Double Lean Ground Beef Medley Over Jasmine Rice", kcal: 850, protein: 55, carbs: 90, fat: 24 },
          { name: "Snack: Peanut Butter Toast & Casein Shake", kcal: 450, protein: 35, carbs: 35, fat: 16 },
          { name: "Dinner: Seared Ribeye Fillet & Baked Sweet Potato Yam", kcal: 880, protein: 58, carbs: 75, fat: 32 }
        ],
        workoutsPlan: [
          { name: "Hypertrophy Push-Pull Resistance Training", duration: 60, burn: 450 },
          { name: "Anabolic Deadlift / Compound Squats Lift", duration: 45, burn: 360 }
        ]
      };
    } else if (cond.includes("Endurance")) {
      return {
        dietPlan: [
          { name: "Breakfast: Blueberry Oatmeal Bowl & Apple Butter Toast", kcal: 490, protein: 12, carbs: 85, fat: 10 },
          { name: "Lunch: Gluten-Free Pasta Marinara with Turkey Cutlets", kcal: 710, protein: 42, carbs: 105, fat: 12 },
          { name: "Snack: Hydration Fuel Shake & Dried Apricots Mix", kcal: 320, protein: 12, carbs: 55, fat: 6 },
          { name: "Dinner: Oven-baked Cod Fillet Over Fluffy Rice & Asparagus", kcal: 680, protein: 44, carbs: 85, fat: 14 }
        ],
        workoutsPlan: [
          { name: "Outdoor Steady-State Tempo Road Cycling Run", duration: 80, burn: 680 },
          { name: "Stamina Building Zone-2 Cardio Run", duration: 45, burn: 410 }
        ]
      };
    } else {
      // Maintenance
      return {
        dietPlan: [
          { name: "Breakfast: Whole Grain Toast & Egg Sunny-side Sunny", kcal: 420, protein: 22, carbs: 36, fat: 16 },
          { name: "Lunch: Sliced Roast Turkey Breast Garden Salad", kcal: 540, protein: 38, carbs: 40, fat: 18 },
          { name: "Snack: Protein Bar with Cashews Mix", kcal: 310, protein: 24, carbs: 22, fat: 12 },
          { name: "Dinner: Baked Chicken Breast Over Quinoa Pot", kcal: 630, protein: 42, carbs: 50, fat: 16 }
        ],
        workoutsPlan: [
          { name: "Moderate Intensity Core Calisthenics drills", duration: 40, burn: 290 },
          { name: "Speed Cardio Walk / Functional Movement", duration: 30, burn: 210 }
        ]
      };
    }
  };

  const autoPlan = getAutonomousPlan();

  // Autopilot Plan Fillers (Logs automatically with zero user typing inputs!)
  const handleAutoLogMeals = () => {
    autoPlan.dietPlan.forEach((m) => {
      onAddMeal({
        food_name: m.name,
        calories: m.kcal,
        protein: m.protein,
        log_date: todayDateStr
      });
    });
  };

  const handleAutoLogWorkouts = () => {
    autoPlan.workoutsPlan.forEach((w) => {
      onAddWorkout({
        workout_type: w.name,
        duration_minutes: w.duration,
        calories_burned: w.burn,
        log_date: todayDateStr
      });
    });
  };

  // Submit Meal
  const handleMealSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!foodName.trim()) return;
    onAddMeal({
      food_name: foodName,
      calories,
      protein,
      log_date: todayDateStr,
    });
    setFoodName("");
  };

  // Submit Workout
  const handleWorkoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!workoutType.trim()) return;
    onAddWorkout({
      workout_type: workoutType,
      duration_minutes: durationMinutes,
      calories_burned: caloriesBurned,
      log_date: todayDateStr,
    });
    setWorkoutType("Strength Weights Training");
  };

  // Filter Today's Elements
  const todayMeals = diets.filter((d) => d.log_date === todayDateStr);
  const todayWorkouts = workouts.filter((w) => w.log_date === todayDateStr);

  const consumedKcal = todayMeals.reduce((sum, d) => sum + d.calories, 0);
  const burnedKcal = todayWorkouts.reduce((sum, w) => sum + w.calories_burned, 0);
  
  // Net Calorie Balance = Consumed Meals - Burned Workouts
  const netCalories = consumedKcal - burnedKcal;
  
  // Progress Percentages
  const progressPct = Math.min(Math.round((netCalories / targetKcal) * 100), 100);
  const totalProtein = todayMeals.reduce((sum, d) => sum + d.protein, 0);
  const proteinPct = Math.min(Math.round((totalProtein / targetProtein) * 100), 100);

  return (
    <div className="p-6 md:p-10 space-y-8 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Active Biometrics, Diet & Cardio Desk</h2>
          <p className="text-slate-500 font-medium text-sm">Calculates daily macros explicitly over your body weight ratios and outputs composition blueprints.</p>
        </div>
        <div className="flex items-center gap-2 bg-teal-50 border border-teal-100 text-teal-800 px-3 py-1.5 rounded-xl font-bold text-xs">
          <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
          <span>Caloric Calibration: Live Body Weighs Sync</span>
        </div>
      </div>

      {/* User Health Profile Display & Weight Based Macro breakdown */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-950 text-white rounded-3xl p-6 shadow-md flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8">
        <div className="flex items-center gap-4 mr-0 md:mr-10">
          <div className="w-12 h-12 bg-teal-500 rounded-2xl flex items-center justify-center text-slate-950 font-black shrink-0">
            <span className="material-symbols-outlined text-white">sports_gymnastics</span>
          </div>
          <div>
            <h3 className="font-extrabold text-lg flex items-center gap-2">
              <span>{currentUser?.full_name || "Guest Account"}</span>
              <span className="text-[10px] font-mono tracking-widest uppercase bg-teal-600 text-white px-2.5 py-0.5 rounded-full">Weight-Ratio Calibrated</span>
            </h3>
            <p className="text-slate-400 text-xs font-semibold leading-relaxed mt-0.5">
              Target requirements are calculated using biometric body ratios out of your registered weight ({currentUser?.weight || 75} kg).
            </p>
          </div>
        </div>

        {/* Dynamic Registered Specs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-left w-full xl:w-auto pt-6 xl:pt-0 border-t border-slate-800 xl:border-none">
          <div className="bg-slate-850/50 p-2 px-4 rounded-xl border border-slate-800/80">
            <span className="text-[10px] uppercase font-bold tracking-widest text-teal-400 block mb-0.5">Energy Target</span>
            <span className="font-mono text-sm font-black text-slate-100">{targetKcal} kcal</span>
          </div>
          <div className="bg-slate-850/50 p-2 px-4 rounded-xl border border-slate-800/80">
            <span className="text-[10px] uppercase font-bold tracking-widest text-pink-400 block mb-0.5">Protein (Weight Ratio)</span>
            <span className="font-mono text-sm font-black text-slate-100">{targetProtein}g</span>
          </div>
          <div className="bg-slate-850/50 p-2 px-4 rounded-xl border border-slate-800/80">
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 block mb-0.5">Carbohydrates</span>
            <span className="font-mono text-sm font-black text-slate-100">{targetCarbs}g</span>
          </div>
          <div className="bg-slate-850/50 p-2 px-4 rounded-xl border border-slate-800/80">
            <span className="text-[10px] uppercase font-bold tracking-widest text-sky-400 block mb-0.5">Essential Fats</span>
            <span className="font-mono text-sm font-black text-slate-100">{targetFats}g</span>
          </div>
        </div>
      </div>

      {/* Calories Balance Ring & Dynamic Metrics Bento Wrapper */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Dynamic Calculations Panel */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col lg:flex-row items-center gap-8 justify-around">
          
          {/* Calorie Ring Gauge */}
          <div className="relative w-44 h-44 flex items-center justify-center shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle className="text-slate-100" strokeWidth="8" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" />
              <circle 
                className="text-teal-500 transition-all duration-700" 
                strokeWidth="8" 
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (251.2 * Math.max(0, progressPct)) / 100}
                strokeLinecap="round" 
                stroke="currentColor" 
                fill="transparent" 
                r="40" 
                cx="50" 
                cy="50" 
              />
            </svg>
            <div className="absolute text-center">
              <div className="text-xl font-black text-slate-950 leading-none">
                {netCalories} <span className="text-xs text-slate-400 font-bold">/ {targetKcal}</span>
              </div>
              <div className="text-[10px] uppercase font-black tracking-widest text-slate-400 mt-1">Net Balance</div>
              <div className="text-[9px] font-mono text-teal-600 font-black mt-0.5">{progressPct}% Budget Spent</div>
            </div>
          </div>

          {/* Balanced Tracking Progress Bars */}
          <div className="flex-1 space-y-5 w-full">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-500 mb-1.5">
                <span>Total Energy Deficit Limit:</span>
                <span className="text-slate-800 font-black">Net {netCalories} / {targetKcal} kcal</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200/60">
                <div className="bg-teal-500 h-full rounded-full transition-all duration-500" style={{ width: `${Math.max(0, Math.min(progressPct, 100))}%` }}></div>
              </div>
            </div>

            {/* Protein Targets Bar */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-500 mb-1.5">
                <span>Anabolic Protein Quota ({currentUser?.weight ? Math.round((totalProtein / currentUser.weight)*10)/10 : 0}g/kg of Weight):</span>
                <span className="text-slate-800 font-black">{totalProtein}g / {targetProtein}g ({proteinPct}%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200/60">
                <div className="bg-teal-500 h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(proteinPct, 100)}%` }}></div>
              </div>
            </div>

            {/* Breakdown Formula Cards */}
            <div className="grid grid-cols-3 gap-4 pt-1">
              <div className="bg-slate-50 border border-slate-200/70 p-3 rounded-2xl text-center">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block">Consumed</span>
                <span className="font-mono text-sm font-black text-slate-800">+{consumedKcal} kcal</span>
              </div>
              <div className="bg-slate-50 border border-slate-200/70 p-3 rounded-2xl text-center">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block">Workout Burn</span>
                <span className="font-mono text-sm font-black text-teal-600">-{burnedKcal} kcal</span>
              </div>
              <div className="bg-teal-50 border border-teal-100 p-3 rounded-2xl text-center">
                <span className="text-[9px] text-teal-800 font-bold uppercase tracking-widest block">Target Limit</span>
                <span className="font-mono text-sm font-black text-teal-700">{targetKcal} kcal</span>
              </div>
            </div>
          </div>

        </div>

        {/* Joint Manual Logging Widget */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col">
          
          {/* Tabs header controller */}
          <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200 mb-4 font-bold text-xs">
            <button 
              onClick={() => setActiveSegment("meals")} 
              className={`flex-1 py-2 px-3 rounded-xl cursor-pointer transition flex items-center justify-center gap-1.5 ${
                activeSegment === "meals" ? "bg-white text-slate-900 shadow-xs font-extrabold" : "text-slate-550 hover:text-slate-800"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">restaurant</span>
              <span>Edibles</span>
            </button>
            <button 
              onClick={() => setActiveSegment("workouts")} 
              className={`flex-1 py-2 px-3 rounded-xl cursor-pointer transition flex items-center justify-center gap-1.5 ${
                activeSegment === "workouts" ? "bg-white text-teal-700 shadow-xs font-extrabold" : "text-slate-550 hover:text-slate-800"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">fitness_center</span>
              <span>Workouts</span>
            </button>
          </div>

          {/* Render Meals Form */}
          {activeSegment === "meals" && (
            <form onSubmit={handleMealSubmit} className="space-y-4 text-xs font-bold text-left">
              <div className="space-y-1">
                <label className="text-slate-500 font-bold" htmlFor="food_name">Edible Recipe / Item Label</label>
                <input
                  className="w-full bg-slate-50 text-slate-800 border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-500/10 focus:border-teal-500 text-sm font-semibold shadow-inner"
                  id="food_name"
                  placeholder="e.g. Avocado Toast"
                  type="text"
                  required
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-500 font-bold" htmlFor="calories">Calories (Kcal)</label>
                  <input
                    className="w-full bg-slate-50 text-slate-800 border border-slate-200 p-3 rounded-xl text-sm font-semibold focus:outline-none shadow-inner focus:border-teal-500"
                    id="calories"
                    type="number"
                    min="1"
                    required
                    value={calories}
                    onChange={(e) => setCalories(Number(e.target.value))}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-500 font-bold" htmlFor="protein">Protein (g)</label>
                  <input
                    className="w-full bg-slate-50 text-slate-800 border border-slate-200 p-3 rounded-xl text-sm font-semibold focus:outline-none shadow-inner focus:border-teal-500"
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
                className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-xl font-extrabold text-xs transition active:scale-95 duration-100 cursor-pointer flex items-center justify-center gap-1.5 shadow-sm shadow-teal-500/10 mt-1"
                type="submit"
              >
                <span className="material-symbols-outlined text-sm">restaurant_menu</span>
                <span>Log Meal Formula</span>
              </button>
            </form>
          )}

          {/* Render Workouts Form */}
          {activeSegment === "workouts" && (
            <form onSubmit={handleWorkoutSubmit} className="space-y-4 text-xs font-bold text-left">
              <div className="space-y-1">
                <label className="text-slate-500 font-bold" htmlFor="workout_type">Exercise Routine Type</label>
                <select
                  className="w-full bg-slate-50 text-slate-800 border border-slate-200 p-3 rounded-xl focus:outline-none text-xs font-semibold cursor-pointer shadow-inner"
                  id="workout_type"
                  value={workoutType}
                  onChange={(e) => {
                    const type = e.target.value;
                    setWorkoutType(type);
                    if (type.includes("Running")) { setDurationMinutes(30); setCaloriesBurned(390); }
                    else if (type.includes("Weights")) { setDurationMinutes(45); setCaloriesBurned(320); }
                    else if (type.includes("Cycling")) { setDurationMinutes(40); setCaloriesBurned(350); }
                    else if (type.includes("HIIT")) { setDurationMinutes(20); setCaloriesBurned(290); }
                    else if (type.includes("Swimming")) { setDurationMinutes(40); setCaloriesBurned(310); }
                    else { setDurationMinutes(30); setCaloriesBurned(180); }
                  }}
                >
                  <option value="Strength Weights Training">Strength Weights Training</option>
                  <option value="Cardio Running Speed">Cardio Running Speed</option>
                  <option value="Road Cycling Routine">Road Cycling Routine</option>
                  <option value="High Intensity HIIT Interval">High Intensity HIIT Interval</option>
                  <option value="Recovery Swimming Laps">Recovery Swimming Laps</option>
                  <option value="Flow Pilates & Yoga">Flow Pilates & Yoga</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-slate-500 font-bold lg:whitespace-nowrap" htmlFor="duration">Minutes</label>
                  <input
                    className="w-full bg-slate-50 text-slate-800 border border-slate-200 p-3 rounded-xl text-sm font-semibold focus:outline-none shadow-inner focus:border-teal-500"
                    id="duration"
                    type="number"
                    min="1"
                    required
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(Number(e.target.value))}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-500 font-bold lg:whitespace-nowrap" htmlFor="workout_burned">Burned (Kcal)</label>
                  <input
                    className="w-full bg-slate-50 text-slate-800 border border-slate-200 p-3 rounded-xl text-sm font-semibold focus:outline-none shadow-inner focus:border-teal-500"
                    id="workout_burned"
                    type="number"
                    min="1"
                    required
                    value={caloriesBurned}
                    onChange={(e) => setCaloriesBurned(Number(e.target.value))}
                  />
                </div>
              </div>

              <button
                className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-xl font-extrabold text-xs transition active:scale-95 duration-100 cursor-pointer flex items-center justify-center gap-1.5 shadow-sm shadow-teal-500/10 mt-1"
                type="submit"
              >
                <span className="material-symbols-outlined text-sm">fitness_center</span>
                <span>Log Active Deficit</span>
              </button>
            </form>
          )}

        </div>

      </div>

      {/* AI PLANNER BENTO GRID AND GENERATIVE AUTOPILOT MODULE */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
              <span className="material-symbols-outlined text-teal-600">psychology</span>
              <span>AI Target Composition Blueprint & Generative Autopilot</span>
            </h3>
            <p className="text-slate-500 text-xs font-bold leading-relaxed">
              Autonomously compiled daily meal ingredients, macronutrient values, and specific adapted workouts suited to reach status: <span className="text-teal-700 font-extrabold">{currentUser?.condition || "Active Health Maintenance"}</span>
            </p>
          </div>
          
          <div className="flex gap-2 w-full md:w-auto shrink-0 flex-wrap">
            <button
              onClick={handleAutoLogMeals}
              className="flex-1 md:flex-none cursor-pointer bg-slate-900 hover:bg-slate-950 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 shadow-md shadow-slate-950/10"
            >
              <span className="material-symbols-outlined text-sm">fastfood</span>
              <span>Autopilot Log Diet Plan</span>
            </button>
            <button
              onClick={handleAutoLogWorkouts}
              className="flex-1 md:flex-none cursor-pointer bg-teal-600 hover:bg-teal-750 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 shadow-md shadow-teal-600/10"
            >
              <span className="material-symbols-outlined text-sm">flight_takeoff</span>
              <span>Autopilot Log Exercises</span>
            </button>
          </div>
        </div>

        {/* Generative plan grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
          
          {/* Edible list schema card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">restaurant_menu</span>
              Daily Food Macro Recipe Blueprints
            </h4>
            <div className="space-y-3">
              {autoPlan.dietPlan.map((m, index) => (
                <div key={index} className="flex justify-between items-center bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <div className="space-y-0.5">
                    <span className="font-extrabold text-[13px] text-slate-800 leading-snug block">{m.name}</span>
                    <span className="text-[10px] text-slate-450 font-mono text-slate-500">
                      Macros: {m.protein}g Protein | {m.carbs}g Carbs | {m.fat}g Fats
                    </span>
                  </div>
                  <span className="font-mono text-xs font-black text-slate-700 bg-white border border-slate-200/80 p-1.5 rounded-lg shrink-0 whitespace-nowrap">
                    {m.kcal} kcal
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Drill Exercise requirements card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">exercise</span>
              Required Physical Resistance & Aerobic Drills
            </h4>
            <div className="space-y-3">
              {autoPlan.workoutsPlan.map((w, index) => (
                <div key={index} className="flex justify-between items-center bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <div className="space-y-0.5">
                    <span className="font-extrabold text-[13px] text-slate-800 leading-snug block">{w.name}</span>
                    <span className="text-[10px] text-slate-450 font-mono text-slate-500">
                      Duration requirement: {w.duration} active minutes
                    </span>
                  </div>
                  <span className="font-mono text-xs font-black text-rose-600 bg-white border border-slate-200/80 p-1.5 rounded-lg shrink-0 whitespace-nowrap">
                    -{w.burn} kcal
                  </span>
                </div>
              ))}
            </div>
            <div className="bg-amber-50 rounded-xl border border-amber-100/60 p-3.5 flex items-start gap-2.5 text-amber-800 text-[11px] leading-relaxed">
              <span className="material-symbols-outlined text-[15px] font-bold text-amber-500 mt-0.5 animate-pulse">info</span>
              <p className="font-medium">
                <strong>Autonomous Action</strong>: Tapping any of the Autopilot buttons above commits all macro details into today&apos;s ledger instantly. This eliminates typing meal records or selecting burn rates manually!
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Diary Records Toggle & Sections List */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* Meals Logs Registry */}
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
          <div className="bg-slate-50 border-b border-slate-200 p-5 flex justify-between items-center">
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-teal-600">restaurant</span>
              <span>Intake Meals Log Book Register</span>
            </h3>
            <span className="text-[9px] font-mono font-bold bg-slate-200 text-slate-600 px-2.5 py-1 rounded-full uppercase">Today</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100/50 border-b border-slate-200 text-slate-400 font-black uppercase tracking-widest text-[9px]">
                  <th className="px-5 py-3">Food Description / Autopilot Label</th>
                  <th className="px-5 py-3 text-center">Calories</th>
                  <th className="px-5 py-3 text-center">Protein Ratio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-150 font-semibold text-slate-600 text-xs">
                {todayMeals.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-5 py-8 text-center text-slate-400 font-semibold">No meals registered under this date. Use Autopilot above for near-instant populating!</td>
                  </tr>
                ) : (
                  todayMeals.map((meal) => (
                    <tr key={meal.diet_id} className="hover:bg-slate-50/40">
                      <td className="px-5 py-3.5">
                        <span className="font-extrabold text-slate-800 text-[13px] block">{meal.food_name}</span>
                        <span className="text-[9px] text-slate-450 text-slate-400 font-mono">ID: #{meal.diet_id}</span>
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <span className="font-mono text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-lg whitespace-nowrap">
                          +{meal.calories} kcal
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-center whitespace-nowrap animate-pulse-subtle">
                        <span className="font-mono text-xs font-semibold text-teal-700 bg-teal-50 border border-teal-100 px-2 py-0.5 rounded-lg whitespace-nowrap">
                          {meal.protein}g protein
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Workouts Deficit Logs Registry */}
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
          <div className="bg-slate-50 border-b border-slate-200 p-5 flex justify-between items-center">
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-teal-600">directions_run</span>
              <span>Logged Deficit Exercises Ledger</span>
            </h3>
            <span className="text-[9px] font-mono font-bold bg-teal-50 border border-teal-200 text-teal-700 px-2.5 py-1 rounded-full uppercase">Today</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100/50 border-b border-slate-200 text-slate-400 font-black uppercase tracking-widest text-[9px]">
                  <th className="px-5 py-3">Workout Strategy / Exercise Type</th>
                  <th className="px-5 py-3 text-center">Duration</th>
                  <th className="px-5 py-3 text-center">Calories Extinction</th>
                  <th className="px-5 py-3 text-center">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-150 font-semibold text-slate-600 text-xs">
                {todayWorkouts.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-5 py-8 text-center text-slate-400 font-semibold font-sans">No physical training logs active for today. Tap exercises Autopilot above to auto-log!</td>
                  </tr>
                ) : (
                  todayWorkouts.map((workout) => (
                    <tr key={workout.workout_id} className="hover:bg-slate-50/40">
                      <td className="px-5 py-3.5">
                        <span className="font-extrabold text-slate-800 text-[13px] block">{workout.workout_type}</span>
                        <span className="text-[9px] text-slate-400 font-mono">ID: #{workout.workout_id}</span>
                      </td>
                      <td className="px-5 py-3.5 text-center font-mono text-slate-500 whitespace-nowrap">{workout.duration_minutes} mins</td>
                      <td className="px-5 py-3.5 text-center">
                        <span className="font-mono text-xs font-semibold text-teal-750 bg-teal-50 border border-teal-100 px-2 py-0.5 rounded-lg whitespace-nowrap">
                          -{workout.calories_burned} kcal
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <button 
                          onClick={() => onDeleteWorkout(workout.workout_id)}
                          className="p-1 px-2 hover:bg-rose-50 text-slate-405 hover:text-rose-600 border border-slate-200 hover:border-rose-200 rounded-lg text-[10px] uppercase font-bold transition cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
