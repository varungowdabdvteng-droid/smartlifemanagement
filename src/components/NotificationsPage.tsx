/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Notification } from "../types";

interface NotificationsPageProps {
  notifications: Notification[];
  onMarkAsRead: (notificationId: number) => void;
  onClearAll: () => void;
}

export default function NotificationsPage({
  notifications,
  onMarkAsRead,
  onClearAll,
}: NotificationsPageProps) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Task Reminder", "Grocery Alert", "Fitness", "System"];

  // Filter alerts based on selection
  const filteredAlerts = notifications.filter(
    (n) => activeFilter === "All" || n.notification_type === activeFilter
  );

  const unreadCount = notifications.filter((n) => n.status === "Unread").length;

  return (
    <div className="p-6 md:p-10 space-y-8 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight animate-fade-in">Notification Center</h2>
          <p className="text-slate-400 font-medium">Review system alarms, kitchen logistics updates, and chore deadlines.</p>
        </div>

        {unreadCount > 0 && (
          <button 
            onClick={onClearAll}
            className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 rounded-xl text-sm font-bold active:scale-95 duration-100 cursor-pointer"
          >
            Clear All Alerts
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {filters.map((fil) => (
          <button
            key={fil}
            onClick={() => setActiveFilter(fil)}
            className={`cursor-pointer px-4.5 py-2 rounded-full text-xs font-bold border shrink-0 transition ${
              activeFilter === fil
                ? "bg-emerald-accent/10 border-emerald-accent/30 text-emerald-400 shadow-sm"
                : "border-white/5 text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            {fil}
          </button>
        ))}
      </div>

      {/* Main Alert List layout */}
      <div className="bg-[#161921] border border-white/5 rounded-3xl overflow-hidden shadow-sm">
        <div className="divide-y divide-white/5">
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((n) => (
              <div 
                key={n.notification_id} 
                className={`p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition duration-150 ${
                  n.status === "Unread" ? "bg-dark-sidebar/40" : ""
                }`}
              >
                <div className="flex gap-4 items-start">
                  {/* Decorative Icon */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    n.notification_type === "Task Reminder" ? "bg-rose-500/10 text-rose-400" :
                    n.notification_type === "Grocery Alert" ? "bg-amber-500/10 text-amber-400" :
                    n.notification_type === "Fitness" ? "bg-emerald-500/10 text-emerald-400" : "bg-[#1e2530] text-[#70a1ff]"
                  }`}>
                    <span className="material-symbols-outlined text-[20px] font-bold">
                      {n.notification_type === "Task Reminder" ? "alarm" :
                       n.notification_type === "Grocery Alert" ? "shopping_basket" :
                       n.notification_type === "Fitness" ? "fitness_center" : "settings"}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-xs uppercase tracking-wider text-slate-500 font-mono">{n.notification_type}</span>
                      {n.status === "Unread" && (
                        <span className="w-2 h-2 rounded-full bg-rose-550 bg-rose-500 animate-pulse"></span>
                      )}
                    </div>
                    <p className={`font-semibold text-sm leading-snug ${n.status === "Unread" ? "text-white font-extrabold" : "text-slate-400"}`}>
                      {n.message}
                    </p>
                    <p className="text-[10px] text-slate-550 text-slate-500 font-mono">{n.created_at || "Just now"}</p>
                  </div>
                </div>

                {n.status === "Unread" && (
                  <button
                    onClick={() => onMarkAsRead(n.notification_id)}
                    className="cursor-pointer bg-dark-bg hover:bg-white/10 text-slate-300 border border-white/10 font-bold text-xs px-4 py-2 rounded-lg transition active:scale-95 duration-100 shrink-0"
                  >
                    Mark as Read
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="p-16 text-center text-slate-500 flex flex-col items-center gap-2 justify-center">
              <span className="material-symbols-outlined text-4xl">notifications_off</span>
              <p className="font-extrabold text-sm">Review complete! No alarms found mapping active criteria.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
