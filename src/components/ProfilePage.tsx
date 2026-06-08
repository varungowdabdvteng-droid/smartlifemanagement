/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from "react";
import { User, ActivityLog } from "../types";

interface ProfilePageProps {
  currentUser: User | null;
  activities: ActivityLog[];
  onUpdateProfile: (name: string, phone: string) => void;
}

export default function ProfilePage({ currentUser, activities, onUpdateProfile }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(currentUser?.full_name || "Alex Rivers");
  const [phoneInput, setPhoneInput] = useState(currentUser?.phone || "+1 (555) 012-3456");

  const handleUpdate = (e: FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;
    onUpdateProfile(nameInput, phoneInput);
    setIsEditing(false);
  };

  return (
    <div className="p-6 md:p-10 space-y-8 font-sans animate-fade-in">
      
      {/* Header Banner Section */}
      <div className="bg-slate-900 border border-slate-850 text-white rounded-[32px] overflow-hidden relative shadow-md min-h-[220px] flex items-end">
        {/* Generous Ambient Design Ornaments */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-0 right-0 w-85 h-85 bg-emerald-500/20 rounded-full blur-[140px]"></div>
          <div className="absolute bottom-0 left-0 w-85 h-85 bg-cyan-500/20 rounded-full blur-[140px]"></div>
        </div>

        <div className="p-8 relative z-10 w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mt-12 bg-gradient-to-t from-slate-950/80 to-transparent">
          <div className="flex items-center gap-6">
            <div className="w-18 h-18 md:w-24 md:h-24 bg-slate-800 border-4 border-emerald-500/30 rounded-3xl flex items-center justify-center text-3xl font-black text-emerald-400 tracking-wider uppercase overflow-hidden shrink-0 shadow-lg">
              {currentUser?.full_name.substring(0, 2).toUpperCase() || "AR"}
            </div>
            <div className="space-y-1">
              <h2 className="text-3xl font-black tracking-tight text-white">{currentUser?.full_name || "Alex Rivers"}</h2>
              <div className="flex flex-wrap gap-2 text-xs font-bold font-mono">
                <span className="bg-emerald-500/20 border border-emerald-550/30 text-emerald-400 px-3 py-1 rounded-full">{currentUser?.role || "Premium Member"}</span>
                <span className="bg-white/10 border border-white/20 px-3 py-1 rounded-full text-slate-300">ID: #{currentUser?.user_id || 1}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="cursor-pointer bg-emerald-500 text-white font-extrabold text-sm px-6 py-2.5 rounded-xl transition duration-150 active:scale-95 hover:bg-emerald-600 flex items-center gap-2 shadow-sm shadow-emerald-500/10"
          >
            <span className="material-symbols-outlined text-sm font-bold">edit</span>
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Column A: Contact details or Editor form details */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs h-fit space-y-6">
          <h3 className="font-extrabold text-slate-900 text-md border-b border-slate-100 pb-3">User Details Catalog</h3>
          
          {isEditing ? (
            <form onSubmit={handleUpdate} className="space-y-4 text-xs font-semibold">
              <div className="space-y-1">
                <label className="text-slate-500">Full Handle Name</label>
                <input
                  className="w-full bg-slate-50 text-slate-800 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-semibold shadow-inner"
                  type="text"
                  required
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-500">Contact Mobile</label>
                <input
                  className="w-full bg-slate-50 text-slate-800 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-semibold shadow-inner"
                  type="tel"
                  required
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="cursor-pointer flex-1 py-2.5 rounded-xl bg-emerald-500 text-white font-extrabold text-xs hover:bg-emerald-600 duration-150 shadow-sm"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="cursor-pointer flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-500 font-bold text-xs hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4 text-xs font-semibold text-slate-600">
              <div>
                <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px] mb-1">Email Credentials login</p>
                <p className="text-sm font-medium text-slate-800 font-mono select-all leading-tight">{currentUser?.email || "alex.rivers@smartlife.io"}</p>
              </div>
              <div className="w-full border-t border-slate-100"></div>
              
              <div>
                <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px] mb-1">Mobile Alerts Destination</p>
                <p className="text-sm font-medium text-slate-800 leading-tight">{currentUser?.phone || "+1 (555) 012-3456"}</p>
              </div>
              <div className="w-full border-t border-slate-100"></div>

              <div>
                <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px] mb-1">Bodily Weight Metrics</p>
                <p className="text-sm font-semibold text-slate-800 font-mono leading-tight">{currentUser?.weight || 75} kg</p>
              </div>
              <div className="w-full border-t border-slate-100"></div>

              <div>
                <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px] mb-1">Fitness Target Condition</p>
                <p className="text-sm font-bold text-slate-850 leading-tight">{currentUser?.condition || "Active Health Maintenance"}</p>
              </div>
              <div className="w-full border-t border-slate-100"></div>

              <div>
                <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px] mb-1">Weekly Dietary Plan</p>
                <p className="text-sm text-slate-800 font-bold leading-tight">{currentUser?.weekly_diet || "High-Protein Balanced Plan"}</p>
              </div>
              <div className="w-full border-t border-slate-100"></div>

              <div>
                <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px] mb-1">RBAC Database Role Rank</p>
                <p className="text-sm font-black text-emerald-600 uppercase tracking-widest">{currentUser?.role || "Premium Member"}</p>
              </div>
              <div className="w-full border-t border-slate-100"></div>

              <div>
                <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px] mb-1">Session Creation Stamp</p>
                <p className="text-sm font-medium text-slate-600">June 8, 2026 - 15:45 UTC</p>
              </div>
            </div>
          )}
        </div>

        {/* Column B: Log entries timeline details */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-2">
            <h3 className="font-extrabold text-slate-900 text-md flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-600 font-bold">task_alt</span>
              <span>Account Security Transactions History</span>
            </h3>
            <span className="text-[10px] font-mono bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold px-3 py-1.5 rounded-full shadow-xs">Immutable Logs</span>
          </div>

          <div className="space-y-4 max-h-[350px] overflow-y-auto no-scrollbar">
            {activities.length > 0 ? (
              activities.map((act) => (
                <div key={act.activity_id} className="flex gap-4 p-4 border border-slate-150 rounded-2xl bg-slate-50/50 hover:bg-slate-50/80 transition shadow-inner">
                  <div className="w-8 h-8 rounded-full bg-white border border-slate-200 shrink-0 flex items-center justify-center font-bold text-slate-500 shadow-xs">
                    <span className="material-symbols-outlined text-[16px]">history</span>
                  </div>
                  <div className="flex-1 text-xs space-y-1">
                    <div className="flex justify-between font-bold text-slate-500">
                      <span className="text-slate-850 text-slate-800 font-extrabold">{act.activity_type}</span>
                      <span className="font-mono text-slate-400 font-bold">{act.timestamp}</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed font-sans">{act.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-slate-400">
                <p className="text-xs font-semibold mb-1">Activity logs are empty.</p>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
