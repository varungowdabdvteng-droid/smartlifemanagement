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
    <div className="bg-[#F8FAFC] text-slate-800 min-h-screen font-sans selection:bg-emerald-100 flex flex-col md:flex-row">
      
      {/* Desktop Sidebar Navigation */}
      <aside className="fixed left-0 top-0 h-screen z-40 border-r border-slate-200/80 bg-white w-64 hidden md:flex flex-col">
        <div className="p-6 mb-4 flex items-center gap-2.5">
          <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-sm shadow-emerald-600/10 shrink-0">
            <span className="material-symbols-outlined text-[20px] font-bold text-white">grain</span>
          </div>
          <span className="font-sans text-xl font-black text-slate-900 tracking-tight">
            Zenith<span className="text-emerald-605 text-emerald-600 font-black tracking-tighter">Life</span>
          </span>
        </div>

        {/* User Card */}
        <div 
          onClick={() => onTabChange("profile")}
          className="mx-4 mb-6 p-4 bg-slate-50 hover:bg-slate-100/70 border border-slate-200/60 rounded-2xl shadow-xs flex items-center gap-3 cursor-pointer transition"
        >
          <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-700 text-sm overflow-hidden shrink-0 shadow-xs">
            {currentUser?.full_name.substring(0, 2).toUpperCase() || "AR"}
          </div>
          <div className="overflow-hidden">
            <p className="font-extrabold text-sm text-slate-800 leading-tight truncate">{currentUser?.full_name || "Alex Rivers"}</p>
            <p className="text-[10px] text-slate-400 font-bold tracking-wider uppercase mt-0.5 truncate">{currentUser?.role || "Premium Member"}</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1 px-2 overflow-y-auto no-scrollbar">
          <div className="text-[10px] uppercase tracking-widest text-slate-400 px-3 py-2 font-extrabold">Main Menu</div>
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
                className={`w-full duration-150 p-3 rounded-xl flex items-center gap-3 cursor-pointer text-left font-bold text-sm ${
                  isActive
                    ? "bg-emerald-50 border border-emerald-100 text-emerald-700 font-black shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <span className={`material-symbols-outlined text-[20px] shrink-0 ${isActive ? "text-emerald-600 font-black" : "text-slate-405"}`}>{item.icon}</span>
                <span className="flex-1 truncate">{item.label}</span>
                {item.badge && item.badge > 0 ? (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${
                    isActive ? "bg-emerald-600 text-white font-extrabold" : "bg-rose-500 text-white"
                  }`}>
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>

        {/* Footer Logout info */}
        <div className="p-4 border-t border-slate-100 flex flex-col gap-2">
          <button 
            onClick={onLogout}
            className="w-full py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition text-slate-500 hover:text-rose-600 font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span>Logout</span>
          </button>
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wide text-center">Version 2.4.0</div>
        </div>
      </aside>

      {/* Main Content Pane Wrapper */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        
        {/* Top App Bar Header */}
        <header className="w-full sticky top-0 bg-white/80 backdrop-blur-md shadow-xs h-20 flex items-center justify-between px-6 z-30 transition-all border-b border-slate-200/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-emerald-650 bg-emerald-600 rounded-lg flex items-center justify-center text-white shadow-xs md:hidden">
              <span className="material-symbols-outlined text-[18px] font-bold text-white">grain</span>
            </div>
            <span className="font-black text-lg text-slate-900 tracking-tight md:hidden">
              Zenith<span className="text-emerald-600">Life</span>
            </span>
            <h1 className="hidden md:block font-extrabold text-slate-400 uppercase tracking-widest text-[10px] font-sans">
              ZenithLife Premium Wellness & Habits Tracker
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Quick Stats Search/View Trigger */}
            <div className="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-200/80 px-3.5 py-1.5 rounded-xl text-xs text-slate-550 text-slate-500 font-semibold shadow-xs">
              <span className="material-symbols-outlined text-sm text-emerald-600">database</span>
              <span>Normalized relational status: <strong className="text-slate-900 font-extrabold">3NF</strong></span>
            </div>

            {/* Notification Badge Trigger */}
            <button 
              onClick={() => onTabChange("notifications")}
              className="relative p-2 rounded-full hover:bg-slate-100 text-slate-600 cursor-pointer active:scale-95 transition"
            >
              <span className="material-symbols-outlined text-2xl text-slate-500 hover:text-slate-800">notifications</span>
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>
              )}
            </button>

            {/* Micro User photo avatar redirect */}
            <div 
              onClick={() => onTabChange("profile")}
              className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-700 font-black text-xs flex items-center justify-center border border-slate-200 cursor-pointer overflow-hidden active:scale-95 transition shadow-xs shrink-0"
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
          className="fixed bottom-24 right-6 md:bottom-8 md:right-8 w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold rounded-2xl shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-40 cursor-pointer"
        >
          <span className="material-symbols-outlined text-2xl font-bold">add</span>
        </button>

        {/* Mobile Bottom Navigation Bar */}
        <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 pb-safe bg-white border-t border-slate-250 border-slate-200/85 md:hidden shadow-[0_-4px_16px_rgba(15,23,42,0.06)]">
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
                className={`flex flex-col items-center justify-center py-1.5 px-3.5 rounded-xl transition active:scale-95 cursor-pointer ${
                  isActive ? "text-emerald-700 bg-emerald-50 border border-emerald-100 font-extrabold" : "text-slate-500 hover:text-slate-900"
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
