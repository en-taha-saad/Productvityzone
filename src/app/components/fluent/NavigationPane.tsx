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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("Velocity");

  return (
    <div 
      className={cn(
        "flex flex-col bg-[#0A0D14] h-full shrink-0 select-none border-r border-white/5 transition-all duration-300 ease-in-out relative z-40",
        isCollapsed ? "w-[72px]" : "w-[260px]"
      )}
    >
      {/* Backdrop for closing popups */}
      {isSearchOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/5" 
          onClick={() => setIsSearchOpen(false)} 
        />
      )}

      {/* Top Branding */}
      <div className={cn(
        "pt-6 transition-all duration-300 overflow-hidden whitespace-nowrap flex flex-col gap-0.5",
        isCollapsed ? "px-0 h-0 opacity-0 mb-4" : "px-6 h-[72px] opacity-100 mb-2"
      )}>
        <span className="text-slate-100 font-bold tracking-wide text-[15px]">Midnight Velocity</span>
        <span className="text-[#8F95A3] font-medium text-[11px]">Digital Sanctuary</span>
      </div>

      {/* Search Box in Sidebar */}
      <div className={cn(
        "mb-4 transition-all duration-300 shrink-0 relative z-50",
        isCollapsed ? "px-4 mx-auto w-10" : "px-4 w-full"
      )}>
        <div className="relative group flex items-center w-full">
          <div className={cn(
            "absolute text-[#8F95A3] group-focus-within:text-indigo-400 transition-colors z-10 pointer-events-none",
            isCollapsed ? "left-1/2 -translate-x-1/2" : "left-3"
          )}>
            <Search className="w-[15px] h-[15px]" strokeWidth={2.5} />
          </div>
          {isCollapsed ? (
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="w-10 h-10 bg-[#121622] rounded-[10px] border border-white/5 hover:bg-[#161B28] transition-all shadow-inner flex items-center justify-center focus:outline-none focus:border-indigo-500/50" 
            />
          ) : (
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchOpen(true)}
              placeholder="Search..."
              className="w-full h-[42px] bg-[#121622] text-[13px] text-slate-200 placeholder:text-[#6B7280] rounded-xl pl-9 pr-3 outline-none border border-white/5 focus:border-indigo-500/50 focus:bg-[#161B28] transition-all shadow-inner"
            />
          )}
        </div>

        {/* Search Results Dialog (Attached to Search Input) */}
        {isSearchOpen && (
          <div 
            className="absolute top-0 left-[calc(100%+16px)] w-[480px] bg-[#121622] rounded-xl border border-white/5 shadow-2xl z-50 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-left-2 duration-200"
            style={{
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255,255,255,0.05)"
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-4 pb-3">
              <span className="text-[11px] font-bold tracking-widest text-[#8F95A3] uppercase">Search Results</span>
              <div className="bg-white/5 border border-white/10 rounded px-2.5 py-0.5 text-[11px] text-slate-300 font-medium">
                "{searchQuery || "Velocity"}"
              </div>
            </div>

            {/* Scrollable Results Area */}
            <div className="flex flex-col overflow-y-auto max-h-[500px] custom-scrollbar">
              
              {/* Tasks Section */}
              <div className="flex flex-col px-3 pb-2">
                <div className="px-2 py-3 flex items-center gap-2">
                  <CheckCircle2 className="w-[15px] h-[15px] text-[#F59E0B]" strokeWidth={2.5} />
                  <span className="text-[12px] font-bold text-slate-200">Tasks</span>
                </div>
                
                <div className="flex flex-col gap-0.5">
                  <button className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors text-left group">
                    <div className="w-4 h-4 rounded-[4px] border border-white/20 mt-0.5 group-hover:border-white/40 transition-colors shrink-0" />
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[13px] text-slate-200 font-medium">Complete Velocity audit for Q4</span>
                      <span className="text-[11.5px] text-[#64748B]">Project Aether • Due Tomorrow</span>
                    </div>
                  </button>
                  
                  <button className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors text-left group">
                    <div className="w-4 h-4 rounded-[4px] border border-white/20 mt-0.5 group-hover:border-white/40 transition-colors shrink-0" />
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[13px] text-slate-200 font-medium">Sync velocity metrics with Engineering</span>
                      <span className="text-[11.5px] text-[#64748B]">Performance Review • Next Week</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Notes Section */}
              <div className="flex flex-col px-3 pb-4">
                <div className="px-2 py-3 flex items-center gap-2 mt-1">
                  <FileText className="w-[15px] h-[15px] text-[#FDE047]" strokeWidth={2.5} />
                  <span className="text-[12px] font-bold text-slate-200">Notes</span>
                </div>

                <div className="flex flex-col gap-0.5">
                  <button className="flex flex-col gap-1 p-2.5 rounded-lg hover:bg-white/5 transition-colors text-left group">
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[13px] text-slate-200 font-medium">Velocity System Architecture</span>
                      <span className="text-[11px] text-[#64748B]">2h ago</span>
                    </div>
                    <span className="text-[12px] text-[#8F95A3] truncate w-full leading-relaxed">
                      Revised the core engine parameters to allow for higher...
                    </span>
                  </button>

                  <button className="flex flex-col gap-1 p-2.5 rounded-lg hover:bg-white/5 transition-colors text-left group">
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[13px] text-slate-200 font-medium">Meeting Notes: Speed vs Velocity</span>
                      <span className="text-[11px] text-[#64748B]">Yesterday</span>
                    </div>
                    <span className="text-[12px] text-[#8F95A3] truncate w-full leading-relaxed">
                      Discussion on the directional component of our growth metrics...
                    </span>
                  </button>
                  
                  <button className="flex flex-col gap-1 p-2.5 rounded-lg hover:bg-white/5 transition-colors text-left group">
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[13px] text-slate-200 font-medium">Weekly Velocity Report Template</span>
                      <span className="text-[11px] text-[#64748B]">Oct 12</span>
                    </div>
                    <span className="text-[12px] text-[#8F95A3] truncate w-full leading-relaxed">
                      Standardized reporting format for all cross-functional squads...
                    </span>
                  </button>
                </div>
              </div>

            </div>

            {/* Footer / Shortcuts */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-white/5 bg-[#0F1423]/60 shrink-0">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    <kbd className="flex items-center justify-center h-5 px-1 min-w-[20px] bg-white/5 border border-white/10 rounded-[4px] text-[10px] text-slate-400 font-sans shadow-sm">↑</kbd>
                    <kbd className="flex items-center justify-center h-5 px-1 min-w-[20px] bg-white/5 border border-white/10 rounded-[4px] text-[10px] text-slate-400 font-sans shadow-sm">↓</kbd>
                  </div>
                  <span className="text-[11px] text-[#64748B] font-medium tracking-wide">Navigate</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="flex items-center justify-center h-5 px-1 min-w-[20px] bg-white/5 border border-white/10 rounded-[4px] text-[10px] text-slate-400 font-sans shadow-sm">↵</kbd>
                  <span className="text-[11px] text-[#64748B] font-medium tracking-wide">Open</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[#64748B] font-medium tracking-wide">Press</span>
                <kbd className="flex items-center justify-center h-5 px-1.5 min-w-[24px] bg-white/5 border border-white/10 rounded-[4px] text-[10px] text-slate-400 font-sans shadow-sm tracking-widest">ESC</kbd>
                <span className="text-[11px] text-[#64748B] font-medium tracking-wide">to close</span>
              </div>
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