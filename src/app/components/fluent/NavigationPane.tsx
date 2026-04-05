import { useState } from "react";
import {
  Home,
  CheckCircle2,
  FileText,
  Calendar,
  Search
} from "lucide-react";
import { cn } from "../../../lib/utils";

export function NavigationPane({ isCollapsed = false }: { isCollapsed?: boolean }) {
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <div 
      className={cn(
        "flex flex-col bg-[#0A0D14] h-full shrink-0 select-none border-r border-white/5 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[72px]" : "w-[260px]"
      )}
    >
      {/* Top Branding */}
      <div className={cn(
        "pt-6 transition-all duration-300 overflow-hidden whitespace-nowrap",
        isCollapsed ? "px-0 h-0 opacity-0 mb-4" : "px-6 h-[64px] opacity-100 mb-2"
      )}>
        <span className="text-indigo-400 font-semibold tracking-wide text-[15px]">Deep Nocturne</span>
      </div>

      {/* Search Box in Sidebar */}
      <div className={cn(
        "mb-4 transition-all duration-300 shrink-0",
        isCollapsed ? "px-4 mx-auto w-10" : "px-4 w-full"
      )}>
        <div className="relative group flex items-center w-full">
          <div className={cn(
            "absolute text-[#8F95A3] group-focus-within:text-indigo-400 transition-colors z-10",
            isCollapsed ? "left-1/2 -translate-x-1/2" : "left-3"
          )}>
            <Search className="w-[16px] h-[16px]" />
          </div>
          {isCollapsed ? (
            <button className="w-10 h-10 bg-[#121622] rounded-[10px] border border-white/5 hover:bg-[#161B28] transition-all shadow-inner" />
          ) : (
            <input
              type="text"
              placeholder="Search..."
              className="w-full h-9 bg-[#121622] text-[13px] text-slate-200 placeholder:text-[#6B7280] rounded-[10px] pl-9 pr-3 outline-none border border-transparent focus:border-indigo-500/30 focus:bg-[#161B28] transition-all shadow-inner"
            />
          )}
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
        {/* Navigation List */}
        <nav className={cn("flex flex-col transition-all duration-300", isCollapsed ? "px-0 space-y-3" : "px-3 space-y-1")}>
          <NavItem icon={Home} label="Home" isCollapsed={isCollapsed} active={activeTab === "Home"} onClick={() => setActiveTab("Home")} />
          <NavItem icon={CheckCircle2} label="Tasks" isCollapsed={isCollapsed} active={activeTab === "Tasks"} onClick={() => setActiveTab("Tasks")} />
          <NavItem icon={FileText} label="Notes" isCollapsed={isCollapsed} active={activeTab === "Notes"} onClick={() => setActiveTab("Notes")} />
          <NavItem icon={Calendar} label="Planner" isCollapsed={isCollapsed} active={activeTab === "Planner"} onClick={() => setActiveTab("Planner")} />
        </nav>
      </div>
    </div>
  );
}

// Subcomponents
function NavItem({
  icon: Icon,
  label,
  active = false,
  isCollapsed = false,
  onClick,
}: {
  icon: any;
  label: string;
  active?: boolean;
  isCollapsed?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group flex items-center py-2.5 rounded-[8px] font-medium transition-all duration-200 relative overflow-hidden",
        isCollapsed ? "justify-center mx-auto w-10 h-10 px-0" : "gap-3 px-3 w-full",
        active
          ? "bg-[#1E2336] text-indigo-200"
          : "text-[#8F95A3] hover:bg-white/5 hover:text-slate-200"
      )}
    >
      {/* Fluent UI Active Indicator */}
      <div
        className={cn(
          "absolute left-0 w-[3px] bg-indigo-500 rounded-r-full transition-all duration-300 ease-out",
          active
            ? "top-[20%] bottom-[20%] opacity-100"
            : "top-[35%] bottom-[35%] opacity-0 group-hover:opacity-50 group-active:top-[30%] group-active:bottom-[30%]"
        )}
      />

      <Icon
        className={cn(
          "h-[18px] transition-all duration-200 z-10 shrink-0",
          isCollapsed ? "w-5 h-5" : "w-[18px]",
          active ? "text-indigo-400" : "text-[#8F95A3] group-hover:text-slate-300 group-active:scale-95"
        )}
        strokeWidth={active ? 2.5 : 2}
      />
      
      {!isCollapsed && (
        <span className={cn("truncate tracking-wide transition-all duration-200 z-10", active ? "font-semibold text-indigo-200" : "font-medium")}>
          {label}
        </span>
      )}
    </button>
  );
}