import { Link, useLocation } from "react-router";
import { Zap, Home, CheckCircle2, FileText, Calendar, MoreHorizontal } from "lucide-react";
import { cn } from "../../utils/cn";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: CheckCircle2, label: "Tasks", path: "/tasks" },
  { icon: FileText, label: "Notes", path: "/notes" },
  { icon: Calendar, label: "Planner", path: "/planner" },
  { icon: MoreHorizontal, label: "More", path: "/more" },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-full overflow-hidden shrink-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold shrink-0">
          <Zap size={18} fill="currentColor" className="text-white" />
        </div>
        <span className="font-semibold text-slate-100 text-lg tracking-tight">Productivity Zone</span>
      </div>

      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-indigo-600/10 text-indigo-400" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              )}
            >
              <item.icon size={18} className={isActive ? "text-indigo-400" : "text-slate-400"} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-slate-800 mt-auto">
        <div className="flex items-center gap-3 px-2 py-2 text-sm text-slate-400">
          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-indigo-400 font-bold border border-slate-700">
            Q
          </div>
          <div>
            <div className="text-slate-200 font-medium">Q</div>
            <div className="text-xs">Free Plan</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
