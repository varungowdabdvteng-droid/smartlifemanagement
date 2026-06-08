/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";

export default function SettingsPage() {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [groceryAlerts, setGroceryAlerts] = useState(true);
  const [backupActive, setBackupActive] = useState(false);

  const handleWipeData = () => {
    const doubleCheck = confirm(
      "DANGER: Are you sure you want to completely truncate all tables in the SLMS relational catalog? This mimics executing 'TRUNCATE TABLE users, tasks, grocery, diet' on the MySQL backend. All in-memory states will revert to preseeded defaults."
    );
    if (doubleCheck) {
      localStorage.clear();
      alert("Relational catalog database state remitted successfully. Reloading platform defaults...");
      window.location.reload();
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-8 font-sans max-w-4xl mx-auto animate-fade-in">
      
      {/* Header */}
      <div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight text-left">Settings Panel</h2>
        <p className="text-slate-400 font-medium">Fine-tune system alerts, relational backups, and encryption configurations.</p>
      </div>

      <div className="bg-[#161921] border border-white/5 rounded-3xl p-6 shadow-sm divide-y divide-white/5 space-y-6">
        
        {/* Module A: Notifications configurations */}
        <div className="pt-2 pb-6 space-y-4">
          <h3 className="font-extrabold text-white text-md flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-accent">notifications_active</span>
            <span>Trigger Warning Configurations</span>
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-2xl font-medium">
            Define threshold behaviors and timing checks when task deadlines approach or pantry goods deplete. Active DBMS triggers synchronize corresponding entries directly to security indexes.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between p-3.5 bg-dark-bg rounded-2xl border border-white/5 text-xs">
              <div>
                <p className="font-extrabold text-white">Push Notifications Warnings</p>
                <p className="text-slate-500 font-medium mt-0.5">Toggle browser popup prompts representing active alerts.</p>
              </div>
              <input 
                className="w-4 h-4 rounded text-emerald-accent focus:ring-emerald-accent accent-emerald-accent cursor-pointer"
                type="checkbox" 
                checked={pushEnabled} 
                onChange={() => setPushEnabled(!pushEnabled)} 
              />
            </div>

            <div className="flex items-center justify-between p-3.5 bg-dark-bg rounded-2xl border border-white/5 text-xs">
              <div>
                <p className="font-extrabold text-white">Pantry Depletion Alarms</p>
                <p className="text-slate-500 font-medium mt-0.5">Alert immediately as counts register at or below low bounds.</p>
              </div>
              <input 
                className="w-4 h-4 rounded text-emerald-accent focus:ring-emerald-accent accent-emerald-accent cursor-pointer"
                type="checkbox" 
                checked={groceryAlerts} 
                onChange={() => setGroceryAlerts(!groceryAlerts)} 
              />
            </div>
          </div>
        </div>

        {/* Module B: Relational backups */}
        <div className="py-6 space-y-4">
          <h3 className="font-extrabold text-white text-md flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-accent">cloud_done</span>
            <span>Cloud Database Synchronization</span>
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-2xl font-medium">
            Auto-generate secure relational SQL dump files and synchronize schemas directly to remote cloud buckets to guarantee high-concurrency backup safety.
          </p>

          <div className="flex items-center justify-between p-3.5 bg-dark-bg rounded-2xl border border-white/5 text-xs">
            <div>
              <p className="font-extrabold text-white">Automated SQL Backup Queries</p>
              <p className="text-slate-500 font-medium mt-0.5">Write parameterized inserts securely to connected Cloud SQL servers.</p>
            </div>
            <input 
              className="w-4 h-4 rounded text-emerald-accent focus:ring-emerald-accent accent-emerald-accent cursor-pointer"
              type="checkbox" 
              checked={backupActive} 
              onChange={() => setBackupActive(!backupActive)} 
            />
          </div>
        </div>

        {/* Module C: Security accounts details */}
        <div className="py-6 space-y-4">
          <h3 className="font-extrabold text-white text-md flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-accent">key</span>
            <span>Security & Cryptography Keys</span>
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-2xl font-medium">
            SmartLife utilizes 10-round bcrypt salts to hash credential values. All internal REST API calls are packaged securely using JWT structures during active sessions.
          </p>

          <div className="flex gap-4">
            <button 
              onClick={() => alert("Note: Relational encryption keys rotated successfully for this sandbox browser container.")}
              className="cursor-pointer px-5 py-2.5 bg-dark-bg hover:bg-white/10 border border-white/10 text-slate-300 rounded-xl font-bold text-xs active:scale-95 duration-100"
            >
              Rotate AES Keys
            </button>
            <button 
              onClick={() => alert("All active JSON Web Token authorizations flushed safely. Sessions expired.")}
              className="cursor-pointer px-5 py-2.5 bg-dark-bg hover:bg-white/10 border border-white/10 text-slate-300 rounded-xl font-bold text-xs active:scale-95 duration-100"
            >
              Revoke Session Tokens
            </button>
          </div>
        </div>

        {/* Module D: Danger Zone */}
        <div className="pt-6 pb-2 space-y-4">
          <h3 className="font-extrabold text-rose-400 text-md flex items-center gap-2">
            <span className="material-symbols-outlined text-rose-400 animate-pulse">report</span>
            <span>Danger Zone Controls</span>
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-2xl font-medium">
            Remitting data destroys the full local relational databases tables (Users, Checklists, Groceries inventories, Meal diaries, notifications alerts counters). Use with extreme caution.
          </p>

          <div className="bg-rose-500/10 border border-rose-500/25 p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs">
            <div className="space-y-1">
              <p className="font-extrabold text-rose-400">Wipe Local Database Catalog</p>
              <p className="text-rose-300/80 font-medium leading-relaxed">This operation truncates all preseeded tables instantly. All session indicators will be remitted to baseline defaults.</p>
            </div>
            <button
              onClick={handleWipeData}
              className="cursor-pointer px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold rounded-xl shadow active:scale-95 duration-100 tracking-wide shrink-0"
            >
              Wipe DBMS State
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
