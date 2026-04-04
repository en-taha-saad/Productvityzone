import { useState } from "react";
import {
  Home,
  CheckCircle2,
  FileText,
  Calendar,
  Settings
} from "lucide-react";
import { cn } from "../../../lib/utils";
import { ImageWithFallback } from "../figma/ImageWithFallback";

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
        "pt-6 pb-2 transition-all duration-300 overflow-hidden whitespace-nowrap",
        isCollapsed ? "px-0 h-0 opacity-0" : "px-6 h-[52px] opacity-100"
      )}>
        <span className="text-indigo-400 font-semibold tracking-wide text-[15px]">Deep Nocturne</span>
      </div>

      {/* User Profile */}
      <div className={cn("mb-6 transition-all duration-300", isCollapsed ? "px-0 mt-4" : "px-4 mt-0")}>
        <div className={cn(
          "flex items-center rounded-xl hover:bg-white/5 cursor-pointer transition-colors relative mx-auto",
          isCollapsed ? "justify-center w-12 h-12" : "gap-3 p-2 w-full"
        )}>
          <div className="relative flex items-center justify-center">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop"
              alt="Alex Rivers"
              className={cn(
                "rounded-lg object-cover bg-slate-800 shrink-0 transition-all duration-300",
                isCollapsed ? "w-9 h-9" : "w-10 h-10"
              )}
            />
            {isCollapsed && (
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#10B981] border-2 border-[#0A0D14] rounded-full" />
            )}
          </div>
          
          {!isCollapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="text-slate-100 font-semibold text-[14px] leading-tight truncate">Alex Rivers</span>
              <span className="text-indigo-400 font-bold text-[10px] tracking-[0.05em] uppercase mt-0.5 truncate">PRO PLAN</span>
            </div>
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

      <div className={cn("mt-auto pb-6 transition-all duration-300", isCollapsed ? "px-0" : "px-3")}>
        <NavItem icon={Settings} label="Settings" isCollapsed={isCollapsed} active={activeTab === "Settings"} onClick={() => setActiveTab("Settings")} />
      </div>
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