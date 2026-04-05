import { useState } from "react";
import { cn } from "../../../lib/utils";
import { Minus, Square, X, Search, Menu, Bell, Moon, Sun, Plus, CheckCircle2, FileText, Settings, HelpCircle, ChevronDown, Activity, Timer } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface TitleBarProps {
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

export function TitleBar({ isCollapsed, toggleCollapse }: TitleBarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [activePopup, setActivePopup] = useState<'new' | 'task' | 'note' | null>(null);

  const handlePopupToggle = (popup: 'new' | 'task' | 'note') => {
    setActivePopup(activePopup === popup ? null : popup);
    setShowNotifications(false);
  };

  const handleNotifToggle = () => {
    setShowNotifications(!showNotifications);
    setActivePopup(null);
  };

  return (
    <div className="flex items-center justify-between h-[64px] bg-[#0A0D14] select-none w-full shrink-0 px-8 z-50 relative">
      {/* Backdrop for closing popups */}
      {showNotifications && (
        <div 
          className="fixed inset-0 z-40 bg-black/10" 
          onClick={() => {
            setShowNotifications(false);
          }} 
        />
      )}

      {/* Left side: Branding */}
      <div className="flex items-center gap-4 flex-1">
        {/* Optional Toggle for mobile/tablet */}
        <button
          onClick={toggleCollapse}
          className="text-[#8F95A3] hover:text-slate-200 p-1.5 rounded-lg hover:bg-white/5 transition-all flex items-center justify-center lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        <span className="text-[13px] font-bold tracking-widest text-slate-100 uppercase">
          Midnight Velocity
        </span>
      </div>

      {/* Right side: Search & App Actions */}
      <div className="flex items-center gap-6 h-full relative z-50">
        
        {/* Search Box */}
        <div className="relative group hidden md:flex items-center w-[260px]">
          <Search className="absolute left-3 w-[14px] h-[14px] text-[#8F95A3] group-focus-within:text-indigo-400 transition-colors" strokeWidth={2.5} />
          <input
            type="text"
            placeholder="Search insights..."
            className="w-full h-8 bg-[#121622] rounded-full pl-9 pr-4 text-[13px] text-slate-200 placeholder:text-[#64748B] border border-white/5 focus:border-indigo-500/50 focus:bg-[#161B28] transition-all outline-none"
          />
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <div className="relative flex items-center justify-center">
            <button 
              onClick={handleNotifToggle}
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center transition-colors relative",
                showNotifications ? "bg-white/10 text-slate-200" : "text-[#8F95A3] hover:bg-white/5 hover:text-slate-200"
              )}
            >
              <Bell className="w-[16px] h-[16px]" strokeWidth={2.5} />
              {/* Unread dot */}
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-indigo-500 rounded-full" />
            </button>

            {/* Notification Dropdown Placeholder */}
            {showNotifications && (
              <div className="absolute top-10 right-0 w-[320px] bg-[#161B28] border border-white/10 rounded-xl shadow-2xl z-50 p-4 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-slate-100">Notifications</h3>
                  <button className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium">Mark all as read</button>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                    <p className="text-[13px] text-slate-300 leading-relaxed">
                      Your <span className="text-indigo-400 font-medium">Design Review</span> task is due in 30 minutes.
                    </p>
                    <span className="text-[11px] text-slate-500 mt-2 block">Just now</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile Avatar */}
          <button className="w-[28px] h-[28px] rounded-full overflow-hidden border border-white/10 hover:border-indigo-500/50 transition-colors shrink-0">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </button>
        </div>

        {/* Window Controls (Desktop App Feel) */}
        <div className="flex items-center gap-1 pl-2 border-l border-white/5">
          <button className="w-8 h-8 rounded-md text-[#8F95A3] hover:bg-white/10 hover:text-slate-200 flex items-center justify-center transition-colors">
            <Minus className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-md text-[#8F95A3] hover:bg-white/10 hover:text-slate-200 flex items-center justify-center transition-colors">
            <Square className="w-3.5 h-3.5" />
          </button>
          <button className="w-8 h-8 rounded-md text-[#8F95A3] hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors border-none outline-none focus:outline-none">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
