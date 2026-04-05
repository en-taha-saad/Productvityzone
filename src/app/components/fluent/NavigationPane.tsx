import { useState } from "react";
import {
  Home,
  CheckCircle2,
  FileText,
  Calendar,
  Plus,
  Bell,
  Activity,
  Timer,
  ChevronDown
} from "lucide-react";
import { cn } from "../../../lib/utils";

export function NavigationPane({ isCollapsed = false }: { isCollapsed?: boolean }) {
  const [activeTab, setActiveTab] = useState("Home");
  const [isNewMenuOpen, setIsNewMenuOpen] = useState(false);

  return (
    <div 
      className={cn(
        "flex flex-col bg-[#0A0D14] h-full shrink-0 select-none border-r border-white/5 transition-all duration-300 ease-in-out relative z-40",
        isCollapsed ? "w-[72px]" : "w-[260px]"
      )}
    >
      {/* Backdrop for New Menu */}
      {isNewMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-transparent" 
          onClick={() => setIsNewMenuOpen(false)} 
        />
      )}

      {/* Top Action Area (Quick Create) */}
      <div className={cn(
        "pt-6 pb-4 transition-all duration-300 shrink-0 relative z-50",
        isCollapsed ? "px-4 mx-auto w-full flex justify-center" : "px-5 w-full"
      )}>
        <button
          onClick={() => setIsNewMenuOpen(!isNewMenuOpen)}
          className={cn(
            "h-[42px] bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-indigo-500/50",
            isCollapsed ? "w-10 rounded-[10px]" : "w-full px-4 justify-between"
          )}
        >
          <div className="flex items-center gap-2.5">
            <Plus className="w-[18px] h-[18px] group-hover:scale-110 transition-transform" strokeWidth={2.5} />
            {!isCollapsed && <span className="font-semibold text-[13px] tracking-wide">New Action</span>}
          </div>
          {!isCollapsed && <ChevronDown className={cn("w-4 h-4 text-indigo-200 transition-transform", isNewMenuOpen && "rotate-180")} />}
        </button>

        {/* New Menu Dropdown */}
        {isNewMenuOpen && (
          <div 
            className={cn(
              "absolute top-[calc(100%-8px)] bg-[#161B28] border border-white/10 rounded-xl shadow-2xl z-50 py-2 flex flex-col animate-in fade-in zoom-in-95 duration-200",
              isCollapsed ? "left-[calc(100%+8px)] w-[220px]" : "left-5 right-5 w-[calc(100%-40px)]"
            )}
          >
            <div className="px-3 pb-2 mb-1.5 border-b border-white/5">
              <span className="text-[10px] font-bold tracking-widest text-[#8F95A3] uppercase">Create New</span>
            </div>
            
            <div className="flex flex-col px-1.5 gap-0.5">
              <MenuOption icon={CheckCircle2} label="Task" color="text-[#6366F1]" shortcut="⌘T" />
              <MenuOption icon={FileText} label="Note" color="text-[#F59E0B]" shortcut="⌘N" />
              <MenuOption icon={Bell} label="Reminder" color="text-[#10B981]" shortcut="⌘R" />
              <MenuOption icon={Activity} label="Habit" color="text-[#EC4899]" shortcut="⌘H" />
              <MenuOption icon={Timer} label="Focus Session" color="text-[#8B5CF6]" shortcut="⌘F" />
            </div>
          </div>
        )}
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
function MenuOption({ icon: Icon, label, color, shortcut }: { icon: any, label: string, color: string, shortcut: string }) {
  return (
    <button className="flex items-center justify-between px-2.5 py-2.5 rounded-lg hover:bg-white/5 transition-colors text-left group w-full">
      <div className="flex items-center gap-3">
        <Icon className={cn("w-4 h-4", color)} strokeWidth={2.5} />
        <span className="text-[13px] text-slate-200 font-medium group-hover:text-white transition-colors">{label}</span>
      </div>
      <kbd className="text-[10px] text-[#64748B] font-sans tracking-widest group-hover:text-[#8F95A3] transition-colors">{shortcut}</kbd>
    </button>
  );
}

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