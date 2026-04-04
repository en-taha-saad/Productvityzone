import { cn } from "../../lib/utils";
import { Minus, Square, X, Search, Menu } from "lucide-react";

interface TitleBarProps {
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

export function TitleBar({ isCollapsed, toggleCollapse }: TitleBarProps) {
  return (
    <div className="flex items-center justify-between h-[64px] bg-[#0B0E14] select-none w-full shrink-0 px-6 z-20">
      {/* Left side: Sidebar Handle (Hamburger) */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleCollapse}
          className="text-[#8F95A3] hover:text-slate-200 p-2 rounded-lg hover:bg-white/5 transition-all flex items-center justify-center"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Right side: Search Box & Window Controls */}
      <div className="flex items-center gap-6 h-full">
        {/* Search Box */}
        <div className="relative group flex items-center">
          <div className="absolute left-3 text-[#8F95A3] group-focus-within:text-indigo-400 transition-colors">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search tasks..."
            className="w-[240px] h-9 bg-[#121622] text-[13px] text-slate-200 placeholder:text-[#8F95A3] rounded-full pl-9 pr-4 outline-none border border-white/5 focus:border-indigo-500/50 focus:bg-[#161B28] transition-all"
          />
        </div>

        {/* Window Controls */}
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 rounded-md text-[#8F95A3] hover:bg-white/10 hover:text-slate-200 flex items-center justify-center transition-colors">
            <Minus className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-md text-[#8F95A3] hover:bg-white/10 hover:text-slate-200 flex items-center justify-center transition-colors">
            <Square className="w-3.5 h-3.5" />
          </button>
          <button className="w-8 h-8 rounded-md text-[#8F95A3] hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
