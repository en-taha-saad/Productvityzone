import { Search, Plus, FileText } from "lucide-react";

export function DashboardHeader() {
  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full pt-8 pb-4">
      {/* Top Section */}
      <div className="flex items-center justify-between w-full px-1">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">
              Good Morning
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            Ready to focus, Guest?
          </h1>
        </div>
        <div className="w-12 h-12 rounded-full bg-slate-700/80 flex items-center justify-center text-lg font-bold text-white shadow-[0_0_20px_rgba(255,255,255,0.05)] border border-white/10 shrink-0">
          G
        </div>
      </div>

      {/* Search Input */}
      <div className="relative group w-full mt-2">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-400 transition-colors" />
        <input
          type="text"
          placeholder="Search tasks, notes..."
          className="w-full h-14 bg-[#121622]/80 hover:bg-[#151a28]/90 focus:bg-[#151a28] border border-white/10 focus:border-indigo-500/50 rounded-[14px] pl-12 pr-14 text-slate-200 placeholder:text-slate-500 outline-none transition-all duration-300 shadow-inner"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center h-6 px-2 rounded-md bg-white/5 border border-white/10 text-xs font-medium text-slate-400">
          ⌘K
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 mt-1">
        <button className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white px-5 py-2.5 rounded-[12px] font-semibold text-sm transition-all duration-300 shadow-[0_4px_14px_rgba(99,102,241,0.3)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.4)]">
          <Plus className="w-4 h-4" />
          New Task
        </button>
        <button className="flex items-center gap-2 bg-[#1A1F2D] hover:bg-[#232A3B] border border-white/5 text-slate-200 px-5 py-2.5 rounded-[12px] font-semibold text-sm transition-all duration-300 shadow-sm">
          <FileText className="w-4 h-4 text-orange-400" />
          Quick Note
        </button>
      </div>
    </div>
  );
}
