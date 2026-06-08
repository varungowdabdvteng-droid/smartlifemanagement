/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from "react";
import { Task, TaskPriority, TaskStatus } from "../types";

interface TasksPageProps {
  tasks: Task[];
  onAddTask: (task: { task_name: string; description: string; priority: TaskPriority; deadline: string }) => void;
  onUpdateStatus: (taskId: number, status: TaskStatus) => void;
  onDeleteTask: (taskId: number) => void;
  onRunAITaskEvaluator?: () => void;
}

export default function TasksPage({ tasks, onAddTask, onUpdateStatus, onDeleteTask, onRunAITaskEvaluator }: TasksPageProps) {
  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban");
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.MEDIUM);
  const [deadline, setDeadline] = useState("2026-06-12");
  const [searchQuery, setSearchQuery] = useState("");

  const handleCreate = (e: FormEvent) => {
    e.preventDefault();
    if (!taskName.trim()) return;
    onAddTask({
      task_name: taskName,
      description,
      priority,
      deadline,
    });
    setTaskName("");
    setDescription("");
  };

  // Filter tasks based on searching string Query
  const filteredTasks = tasks.filter(
    (t) =>
      t.task_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 md:p-10 space-y-8 font-sans">
      
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Tasks Board Checklist</h2>
          <p className="text-slate-500 font-medium font-sans">Map daily chore pipelines, deadlines, and active prioritization indexes.</p>
        </div>

        {/* View Mode Switches and Filters */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-100 p-1.5 rounded-xl border border-slate-200 flex gap-1 font-semibold text-xs text-slate-600 shadow-inner">
            <button
              onClick={() => setViewMode("kanban")}
              className={`px-4 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition ${
                viewMode === "kanban" ? "bg-white border border-slate-200/80 text-emerald-700 font-extrabold shadow-xs" : "hover:text-slate-900"
              }`}
            >
              <span className="material-symbols-outlined text-[16px] font-bold">view_kanban</span>
              <span>Kanban</span>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-4 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition ${
                viewMode === "list" ? "bg-white border border-slate-200/80 text-emerald-700 font-extrabold shadow-xs" : "hover:text-slate-900"
              }`}
            >
              <span className="material-symbols-outlined text-[16px] font-bold">view_list</span>
              <span>Grid List</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Column A: Add Task Panel */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm h-fit space-y-6">
          <h3 className="font-extrabold text-slate-900 text-md flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-600 text-lg font-bold">edit_note</span>
            <span>Append New Chore</span>
          </h3>

          <form onSubmit={handleCreate} className="space-y-4 text-xs font-semibold">
            {/* Task Name */}
            <div className="space-y-1">
              <label className="text-slate-500 font-bold" htmlFor="task_name">Task Label Title</label>
              <input
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 text-sm font-medium text-slate-800 placeholder-slate-400 shadow-inner"
                id="task_name"
                placeholder="Database audit report..."
                type="text"
                required
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="text-slate-500 font-bold" htmlFor="description">Sub-steps details</label>
              <textarea
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 text-sm font-medium text-slate-800 placeholder-slate-400 h-20 resize-none shadow-inner"
                id="description"
                placeholder="Map keys structures..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            {/* Priority & Deadline Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-slate-500 font-bold" htmlFor="priority">Importance Level</label>
                <select
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-emerald-500 text-sm font-medium text-slate-700"
                  id="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as TaskPriority)}
                >
                  <option className="bg-white text-slate-800" value={TaskPriority.LOW}>Low Intensity</option>
                  <option className="bg-white text-slate-800" value={TaskPriority.MEDIUM}>Medium Prior</option>
                  <option className="bg-white text-slate-800" value={TaskPriority.HIGH}>High Escalation</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-500 font-bold" htmlFor="deadline">Target Deadline</label>
                <input
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-emerald-500 text-sm font-medium text-slate-700"
                  id="deadline"
                  type="date"
                  required
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </div>
            </div>

            <button
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 font-extrabold text-white text-sm transition active:scale-95 duration-100 shadow-sm shadow-emerald-505 shadow-emerald-500/15 cursor-pointer flex items-center justify-center gap-2"
              type="submit"
            >
              <span className="material-symbols-outlined text-sm font-black">add</span>
              <span>Add Chore</span>
            </button>
          </form>
        </div>

        {/* Column B: Render Board View or Grid List */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* AI Autonomous Evaluator Banner */}
          <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border border-emerald-100/80 rounded-3xl p-6 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-6 animate-fade-in">
            <div className="space-y-1 md:max-w-md">
              <div className="flex items-center gap-1.5 text-emerald-800">
                <span className="material-symbols-outlined text-[18px] animate-pulse">sync_saved_locally</span>
                <span className="font-black text-xs uppercase tracking-widest font-mono">Continuous Metric Engine Active</span>
              </div>
              <h4 className="font-extrabold text-slate-900 text-lg">AI Autopilot Wellness Guard</h4>
              <p className="text-slate-600 font-medium text-xs leading-relaxed">
                Evaluates real-time daily body weight ratios, food macro deficiencies, and pantry scale measurements. Syncs all recommendations autonomously.
              </p>
            </div>
            {onRunAITaskEvaluator && (
              <button
                onClick={onRunAITaskEvaluator}
                className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-black px-5 py-3.5 rounded-xl transition shadow-sm cursor-pointer flex items-center gap-2 shrink-0"
              >
                <span className="material-symbols-outlined text-sm">precision_manufacturing</span>
                <span>Evaluate & Plan Tasks</span>
              </button>
            )}
          </div>

          {/* Quick Realtime filtering search Input */}
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition">search</span>
            <input
              className="w-full bg-white border border-slate-200 shadow-xs pl-11 pr-4 py-3 rounded-2xl focus:outline-none text-sm font-medium focus:ring-1 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800 placeholder-slate-400 transition"
              placeholder="Search chore headers..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* RENDER KANBAN LANES */}
          {viewMode === "kanban" ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Lane 1: To Do */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-4 px-2">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-800">To Do</span>
                  <span className="text-[10px] font-bold bg-slate-100 border border-slate-250 border-slate-100/90 text-slate-600 px-2.5 py-0.5 rounded-full shadow-xs">
                    {filteredTasks.filter((t) => t.status === TaskStatus.TO_DO).length}
                  </span>
                </div>
                <div className="space-y-4 min-h-[300px]">
                  {filteredTasks
                    .filter((t) => t.status === TaskStatus.TO_DO)
                    .map((item) => (
                      <TaskCard 
                        key={item.task_id} 
                        item={item} 
                        onUpdateStatus={onUpdateStatus} 
                        onDeleteTask={onDeleteTask} 
                      />
                    ))}
                </div>
              </div>

              {/* Lane 2: In Progress */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-4 px-2">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-800">In Progress</span>
                  <span className="text-[10px] font-bold bg-slate-100 border border-slate-250 border-slate-100/90 text-slate-600 px-2.5 py-0.5 rounded-full shadow-xs">
                    {filteredTasks.filter((t) => t.status === TaskStatus.IN_PROGRESS).length}
                  </span>
                </div>
                <div className="space-y-4 min-h-[300px]">
                  {filteredTasks
                    .filter((t) => t.status === TaskStatus.IN_PROGRESS)
                    .map((item) => (
                      <TaskCard 
                        key={item.task_id} 
                        item={item} 
                        onUpdateStatus={onUpdateStatus} 
                        onDeleteTask={onDeleteTask} 
                      />
                    ))}
                </div>
              </div>

              {/* Lane 3: Done */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-4 px-2">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-800">Done</span>
                  <span className="text-[10px] font-bold bg-slate-100 border border-slate-250 border-slate-100/90 text-slate-600 px-2.5 py-0.5 rounded-full shadow-xs">
                    {filteredTasks.filter((t) => t.status === TaskStatus.DONE).length}
                  </span>
                </div>
                <div className="space-y-4 min-h-[300px]">
                  {filteredTasks
                    .filter((t) => t.status === TaskStatus.DONE)
                    .map((item) => (
                      <TaskCard 
                        key={item.task_id} 
                        item={item} 
                        onUpdateStatus={onUpdateStatus} 
                        onDeleteTask={onDeleteTask} 
                      />
                    ))}
                </div>
              </div>

            </div>
          ) : (
            /* RENDER GRID LIST VIEW */
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left font-sans text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-250 border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                      <th className="px-6 py-4">Title</th>
                      <th className="px-6 py-4">Importance</th>
                      <th className="px-6 py-4">Deadline</th>
                      <th className="px-6 py-4">Status Class</th>
                      <th className="px-6 py-3 text-right">Delete Operations</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {filteredTasks.map((t) => (
                      <tr key={t.task_id} className="hover:bg-slate-50/50">
                        <td className="px-6 py-4">
                          <p className="font-extrabold text-slate-800 text-sm leading-snug">{t.task_name}</p>
                          <p className="text-[11px] text-slate-550 text-slate-500 mt-0.5 font-sans font-medium">{t.description}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 rounded font-bold text-[10px] uppercase border ${
                            t.priority === "High" ? "bg-rose-50 text-rose-700 border-rose-100" :
                            t.priority === "Medium" ? "bg-amber-50 text-amber-700 border-amber-250 border-amber-100" : "bg-emerald-50 text-emerald-700 border-emerald-100"
                          }`}>{t.priority}</span>
                        </td>
                        <td className="px-6 py-4 font-mono font-bold text-slate-500">{t.deadline}</td>
                        <td className="px-6 py-4">
                          <select
                            className="bg-white border border-slate-200 rounded-lg p-1.5 focus:outline-none text-xs font-semibold cursor-pointer text-slate-700 shadow-xs"
                            value={t.status}
                            onChange={(e) => onUpdateStatus(t.task_id, e.target.value as TaskStatus)}
                          >
                            <option className="bg-white text-slate-800" value={TaskStatus.TO_DO}>To Do</option>
                            <option className="bg-white text-slate-800" value={TaskStatus.IN_PROGRESS}>In Progress</option>
                            <option className="bg-white text-slate-800" value={TaskStatus.DONE}>Done</option>
                          </select>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => onDeleteTask(t.task_id)}
                            className="text-rose-500 hover:bg-rose-50 hover:text-rose-600 p-2 rounded-full duration-150 cursor-pointer active:scale-95 transition"
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

/* MINI TASK CARD HOOK */
function TaskCard({
  item,
  onUpdateStatus,
  onDeleteTask,
}: {
  item: Task;
  onUpdateStatus: (taskId: number, status: TaskStatus) => void;
  onDeleteTask: (taskId: number) => void;
  key?: any;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-[0_2px_8_rgba(15,23,42,0.02)] hover:translate-y-[-1px] hover:border-emerald-500/25 hover:shadow-[0_4px_16_rgba(15,23,42,0.04)] transition group space-y-3 relative overflow-hidden">
      
      {/* Visual Accent Indicator */}
      <div className={`absolute top-0 left-0 h-1 w-full ${
        item.priority === "High" ? "bg-rose-500" : item.priority === "Medium" ? "bg-amber-500" : "bg-emerald-500"
      }`}></div>

      <div className="flex justify-between items-start">
        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${
          item.priority === "High" ? "bg-rose-50 text-rose-700 border-rose-200/60" :
          item.priority === "Medium" ? "bg-amber-50 text-amber-700 border-amber-200/60" : "bg-emerald-50 text-emerald-700 border-emerald-250 border-emerald-200/60"
        }`}>{item.priority}</span>
        
        <div className="flex items-center gap-1">
          <button
            onClick={() => onDeleteTask(item.task_id)}
            className="text-slate-400 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition p-1.5 rounded-full hover:bg-slate-50 cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-sm">delete</span>
          </button>
        </div>
      </div>

      <div>
        <h4 className={`font-extrabold text-sm text-slate-800 leading-snug ${item.status === TaskStatus.DONE ? "line-through text-slate-400" : ""}`}>{item.task_name}</h4>
        <p className="text-xs text-slate-500 leading-relaxed font-sans mt-1">{item.description}</p>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-2 text-[10px] font-bold text-slate-500 font-mono">
        <div className="flex items-center gap-1 select-none">
          <span className="material-symbols-outlined text-sm text-slate-400">schedule</span>
          <span>{item.deadline}</span>
        </div>
        
        {/* Status quick select */}
        <select
          className="bg-transparent border-none text-[10px] font-black text-emerald-600 hover:text-emerald-700 hover:underline cursor-pointer focus:outline-none"
          value={item.status}
          onChange={(e) => onUpdateStatus(item.task_id, e.target.value as TaskStatus)}
        >
          <option className="bg-white text-slate-800" value={TaskStatus.TO_DO}>To Do</option>
          <option className="bg-white text-slate-800" value={TaskStatus.IN_PROGRESS}>In Progress</option>
          <option className="bg-white text-slate-800" value={TaskStatus.DONE}>Done</option>
        </select>
      </div>

    </div>
  );
}
