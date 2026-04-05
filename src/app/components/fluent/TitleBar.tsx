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
    <div className="flex items-center justify-between h-[64px] bg-[#0A0D14] select-none w-full shrink-0 px-6 z-50 relative border-b border-white/5">
      {/* Backdrop for closing popups */}
      {(activePopup || showNotifications) && (
        <div 
          className="fixed inset-0 z-40 bg-black/10" 
          onClick={() => {
            setActivePopup(null);
            setShowNotifications(false);
          }} 
        />
      )}

      {/* Left side: Sidebar Handle & New Actions */}
      <div className="flex items-center gap-6 flex-1 relative z-50">
        <button
          onClick={toggleCollapse}
          className="text-[#8F95A3] hover:text-slate-200 p-2 rounded-lg hover:bg-white/5 transition-all flex items-center justify-center"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* "New" Command Bar */}
        <div className="relative">
          <div className="flex items-center bg-[#121622] rounded-full p-1 border border-white/5 shadow-sm">
            {/* Label (Not a button) */}
            <div className="flex items-center gap-1.5 pl-3 pr-2 text-[13px] font-medium text-[#8F95A3] select-none pointer-events-none">
              <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
              New
            </div>

            <div className="w-[1px] h-4 bg-white/10 mx-1" />

            {/* Direct Action Icons */}
            <div className="flex items-center gap-1 pr-1">
              <button 
                onClick={() => handlePopupToggle('task')}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105",
                  activePopup === 'task' ? "bg-[#6366F1]/10" : "hover:bg-white/5"
                )}
                title="New Task"
              >
                <CheckCircle2 className="w-[16px] h-[16px] text-[#6366F1]" strokeWidth={2.5} />
              </button>
              
              <button 
                onClick={() => handlePopupToggle('note')}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105",
                  activePopup === 'note' ? "bg-[#F59E0B]/10" : "hover:bg-white/5"
                )}
                title="New Note"
              >
                <FileText className="w-[16px] h-[16px] text-[#F59E0B]" strokeWidth={2.5} />
              </button>

              <button 
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white/5 hover:scale-105"
                title="New Reminder"
              >
                <Bell className="w-[16px] h-[16px] text-[#10B981]" strokeWidth={2.5} />
              </button>

              <button 
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white/5 hover:scale-105"
                title="New Habit"
              >
                <Activity className="w-[16px] h-[16px] text-[#EC4899]" strokeWidth={2.5} />
              </button>

              <button 
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white/5 hover:scale-105"
                title="New Focus"
              >
                <Timer className="w-[16px] h-[16px] text-[#8B5CF6]" strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Quick Task Popup */}
          {activePopup === 'task' && (
            <div className="absolute top-12 left-0 w-[320px] bg-[#161B28] border border-white/10 rounded-xl shadow-2xl z-50 p-4 animate-in fade-in zoom-in-95 duration-200">
              <h3 className="text-sm font-semibold text-slate-100 mb-3">Quick Task</h3>
              <input 
                type="text" 
                autoFocus
                placeholder="What needs to be done?" 
                className="w-full bg-[#0A0D14] border border-white/10 rounded-lg px-3 py-2 text-[13px] text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50 transition-colors mb-3"
              />
              <div className="flex justify-end gap-2">
                <button 
                  onClick={() => setActivePopup(null)}
                  className="px-3 py-1.5 rounded-lg text-[12px] font-medium text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setActivePopup(null)}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-[12px] font-medium text-white transition-colors"
                >
                  Save Task
                </button>
              </div>
            </div>
          )}

          {/* Quick Note Popup */}
          {activePopup === 'note' && (
            <div className="absolute top-12 left-0 w-[320px] bg-[#161B28] border border-white/10 rounded-xl shadow-2xl z-50 p-4 animate-in fade-in zoom-in-95 duration-200">
              <h3 className="text-sm font-semibold text-slate-100 mb-3">Quick Note</h3>
              <input 
                type="text" 
                autoFocus
                placeholder="Note title..." 
                className="w-full bg-[#0A0D14] border border-white/10 rounded-lg px-3 py-2 text-[13px] text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50 transition-colors mb-2"
              />
              <textarea 
                placeholder="Start typing..." 
                className="w-full h-[80px] bg-[#0A0D14] border border-white/10 rounded-lg px-3 py-2 text-[13px] text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50 transition-colors mb-3 resize-none custom-scrollbar"
              />
              <div className="flex justify-end gap-2">
                <button 
                  onClick={() => setActivePopup(null)}
                  className="px-3 py-1.5 rounded-lg text-[12px] font-medium text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setActivePopup(null)}
                  className="px-3 py-1.5 bg-[#F59E0B] hover:bg-[#D97706] rounded-lg text-[12px] font-medium text-white transition-colors"
                >
                  Save Note
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right side: App Actions & Window Controls */}
      <div className="flex items-center gap-5 h-full relative z-50">
        {/* App Actions */}
        <div className="flex items-center gap-3 pr-5 border-r border-white/10">
          
          {/* Support */}
          <button className="w-9 h-9 rounded-full text-[#8F95A3] hover:bg-white/5 hover:text-slate-200 flex items-center justify-center transition-colors">
            <HelpCircle className="w-[18px] h-[18px]" />
          </button>
          
          {/* Settings */}
          <button className="w-9 h-9 rounded-full text-[#8F95A3] hover:bg-white/5 hover:text-slate-200 flex items-center justify-center transition-colors">
            <Settings className="w-[18px] h-[18px]" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={handleNotifToggle}
              className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center transition-colors relative",
                showNotifications ? "bg-white/10 text-slate-200" : "text-[#8F95A3] hover:bg-white/5 hover:text-slate-200"
              )}
            >
              <Bell className="w-[18px] h-[18px]" />
              {/* Unread dot */}
              <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-indigo-500 rounded-full" />
            </button>

            {/* Notification Dropdown Placeholder */}
            {showNotifications && (
              <div className="absolute top-12 right-0 w-[320px] bg-[#161B28] border border-white/10 rounded-xl shadow-2xl z-50 p-4">
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
                  <div className="p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors border border-transparent">
                    <p className="text-[13px] text-slate-400 leading-relaxed">
                      Alex Sterling mentioned you in <span className="text-slate-300 font-medium">Q4 Roadmap</span>.
                    </p>
                    <span className="text-[11px] text-slate-500 mt-2 block">2 hours ago</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button 
            onClick={() => setIsDark(!isDark)}
            className="w-9 h-9 rounded-full text-[#8F95A3] hover:bg-white/5 hover:text-slate-200 flex items-center justify-center transition-colors"
          >
            {isDark ? <Moon className="w-[18px] h-[18px]" /> : <Sun className="w-[18px] h-[18px]" />}
          </button>

          {/* Profile Avatar */}
          <button className="w-8 h-8 rounded-full ml-1 overflow-hidden border border-white/10 hover:border-indigo-500/50 transition-colors shrink-0">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </button>
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
