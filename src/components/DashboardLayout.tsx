/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import { ReactNode } from "react";
import { User, Notification } from "../types";

interface DashboardLayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  currentUser: User | null;
  notifications: Notification[];
  onLogout: () => void;
  onOpenFAB: () => void;
}

export default function DashboardLayout({
  children,
  activeTab,
  onTabChange,
  currentUser,
  notifications,
  onLogout,
  onOpenFAB,
}: DashboardLayoutProps) {
  const unreadCount = notifications.filter((n) => n.status === "Unread").length;

  return (
    <div className="bg-dark-bg text-[#E2E4E9] min-h-screen font-sans selection:bg-emerald-500/20 flex flex-col md:flex-row">
      
      {/* Desktop Sidebar Navigation */}
      <aside className="fixed left-0 top-0 h-screen z-40 border-r border-white/5 bg-dark-sidebar w-64 hidden md:flex flex-col">
        <div className="p-6 mb-4 flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-accent rounded-lg flex items-center justify-center text-black font-black text-sm font-mono shrink-0">S</div>
          <h1 className="text-xl font-bold tracking-tight text-white font-sans">SLMS <span className="text-emerald-accent">PRO</span></h1>
        </div>

        {/* User Card */}
        <div 
          onClick={() => onTabChange("profile")}
          className="mx-4 mb-6 p-4 bg-white/5 rounded-2xl border border-white/5 shadow-sm flex items-center gap-3 cursor-pointer hover:bg-white/10 transition"
        >
          <div className="w-10 h-10 rounded-full bg-slate-700/50 border border-white/10 flex items-center justify-center font-bold text-slate-200 text-sm overflow-hidden shrink-0">
            {currentUser?.full_name.substring(0, 2).toUpperCase() || "AR"}
          </div>
          <div className="overflow-hidden">
            <p className="font-bold text-sm text-white leading-tight truncate">{currentUser?.full_name || "Alex Rivers"}</p>
            <p className="text-[11px] text-slate-500 font-extrabold tracking-wider uppercase truncate">{currentUser?.role || "Premium Member"}</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1 px-2 overflow-y-auto no-scrollbar">
          <div className="text-[10px] uppercase tracking-widest text-slate-500 px-3 py-2 font-bold">Main Menu</div>
          {[
            { id: "dashboard", label: "Dashboard", icon: "dashboard" },
            { id: "tasks", label: "Tasks Management", icon: "assignment" },
            { id: "grocery", label: "Grocery Inventory", icon: "shopping_cart" },
            { id: "diet", label: "Diet & Fitness", icon: "fitness_center" },
            { id: "notifications", label: "Notifications & Alerts", icon: "notifications", badge: unreadCount },
            { id: "profile", label: "My Profile", icon: "person" },
            { id: "dbms_deck", label: "🎓 Academic DBMS Project Deck", icon: "school" },
            { id: "settings", label: "Settings", icon: "settings" },
          ].map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full duration-200 p-3 rounded-xl flex items-center gap-3 cursor-pointer text-left font-semibold text-sm ${
                  isActive
                    ? "bg-emerald-accent/10 border border-emerald-accent/20 text-emerald-400 font-bold"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="material-symbols-outlined text-[20px] shrink-0">{item.icon}</span>
                <span className="flex-1 truncate">{item.label}</span>
                {item.badge && item.badge > 0 ? (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${
                    isActive ? "bg-emerald-accent text-dark-bg font-black" : "bg-rose-500 text-white"
                  }`}>
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>

        {/* Footer Logout info */}
        <div className="p-4 border-t border-white/5 flex flex-col gap-2">
          <button 
            onClick={onLogout}
            className="w-full py-2.5 rounded-xl border border-white/5 hover:bg-white/5 transition text-slate-400 hover:text-rose-400 font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span>Logout</span>
          </button>
          <div className="text-[10px] text-slate-600 font-extrabold uppercase tracking-wide text-center">Version 2.4.0</div>
        </div>
      </aside>

      {/* Main Content Pane Wrapper */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        
        {/* Top App Bar Header */}
        <header className="w-full sticky top-0 bg-dark-bg/85 backdrop-blur-md shadow-sm h-20 flex items-center justify-between px-6 z-30 transition-all border-b border-white/5">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-emerald-accent text-3xl font-black md:hidden">hub</span>
            <span className="font-extrabold text-xl text-white tracking-tight md:hidden">SmartLife</span>
            <h1 className="hidden md:block font-bold text-slate-400 uppercase tracking-widest text-xs font-sans">
              SmartLife Management System (SLMS)
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Quick Stats Search/View Trigger */}
            <div className="hidden md:flex items-center gap-2 bg-[#161921] border border-white/5 px-3 py-1.5 rounded-xl text-xs text-slate-400">
              <span className="material-symbols-outlined text-sm text-emerald-accent">database</span>
              <span>Normalized relational status: <strong className="text-white">3NF</strong></span>
            </div>

            {/* Notification Badge Trigger */}
            <button 
              onClick={() => onTabChange("notifications")}
              className="relative p-2 rounded-full hover:bg-white/5 text-slate-405 cursor-pointer active:scale-95 transition"
            >
              <span className="material-symbols-outlined text-2xl text-slate-450 hover:text-white">notifications</span>
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
              )}
            </button>

            {/* Micro User photo avatar redirect */}
            <div 
              onClick={() => onTabChange("profile")}
              className="w-10 h-10 rounded-full bg-slate-800 text-white font-black text-xs flex items-center justify-center border border-white/10 cursor-pointer overflow-hidden active:scale-95 transition shrink-0"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
            </div>
          </div>
        </header>

        {/* Central Page content Canvas */}
        <div className="flex-1 pb-24 md:pb-8">
          {children}
        </div>

        {/* Mobile FAB Trigger */}
        <button 
          onClick={onOpenFAB}
          className="fixed bottom-24 right-6 md:bottom-8 md:right-8 w-14 h-14 bg-emerald-accent hover:bg-emerald-600 text-black font-extrabold rounded-2xl shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-40 cursor-pointer"
        >
          <span className="material-symbols-outlined text-2xl font-bold">add</span>
        </button>

        {/* Mobile Bottom Navigation Bar */}
        <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 pb-safe bg-[#111318] border-t border-white/5 md:hidden shadow-[0_-4px_10px_rgba(0,0,0,0.4)]">
          {[
            { id: "dashboard", label: "Home", icon: "home" },
            { id: "tasks", label: "Tasks", icon: "assignment" },
            { id: "grocery", label: "Grocery", icon: "shopping_cart" },
            { id: "diet", label: "Fitness", icon: "fitness_center" },
            { id: "dbms_deck", label: "DBMS Lab", icon: "school" },
          ].map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex flex-col items-center justify-center py-1 px-3.5 rounded-2xl transition active:scale-95 cursor-pointer ${
                  isActive ? "text-emerald-400 bg-emerald-accent/10 border border-emerald-accent/20 font-bold" : "text-slate-405"
                }`}
              >
                <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                <span className="text-[10px] tracking-tight">{item.label}</span>
              </button>
            );
          })}
        </nav>

      </div>
    </div>
  );
}
