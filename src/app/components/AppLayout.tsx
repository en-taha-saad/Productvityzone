import { Outlet, useLocation, Link } from "react-router";
import { Home, CheckCircle2, FileText, Grid } from "lucide-react";
import { cn } from "../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: CheckCircle2, label: "Tasks", path: "/tasks" },
  { icon: FileText, label: "Notes", path: "/notes" },
  { icon: Grid, label: "More", path: "/more" },
];

export function AppLayout() {
  const location = useLocation();

  return (
    <div className="flex h-screen w-screen bg-black items-center justify-center font-sans selection:bg-indigo-500/30 overflow-hidden text-slate-200">
      {/* Mobile Device Simulator Wrapper */}
      <div className="w-full h-full sm:max-w-[430px] sm:h-[850px] sm:max-h-[90vh] sm:rounded-[48px] sm:border-[12px] sm:border-slate-900 bg-slate-950 overflow-hidden relative shadow-2xl flex flex-col sm:ring-1 sm:ring-white/10 transform translate-x-0">
        
        {/* Dynamic Island / Notch Area simulation for desktop view */}
        <div className="hidden sm:flex absolute top-0 inset-x-0 h-7 justify-center z-50 pointer-events-none">
          <div className="w-32 h-6 bg-slate-900 rounded-b-3xl"></div>
        </div>

        {/* Main Content Area with Page Transitions */}
        <div className="flex-1 relative overflow-hidden bg-slate-950">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.main
              key={location.pathname}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.02, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute inset-0 flex flex-col overflow-hidden"
            >
              <Outlet />
            </motion.main>
          </AnimatePresence>
        </div>

        {/* Bottom Navigation */}
        <nav className="h-[84px] bg-slate-900/90 backdrop-blur-xl border-t border-slate-800/80 px-6 pb-safe shrink-0 z-40">
          <div className="h-full flex items-center justify-between max-w-sm mx-auto pt-2 pb-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex flex-col items-center justify-center w-16 gap-1 relative group"
                >
                  <div className={cn(
                    "w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300",
                    isActive 
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 scale-110" 
                      : "text-slate-400 hover:text-slate-200 group-hover:bg-slate-800"
                  )}>
                    <item.icon size={isActive ? 22 : 24} strokeWidth={isActive ? 2.5 : 2} />
                  </div>
                  <span className={cn(
                    "text-[10px] font-medium transition-colors duration-300",
                    isActive ? "text-indigo-400" : "text-slate-500"
                  )}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
