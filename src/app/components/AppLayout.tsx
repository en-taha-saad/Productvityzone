import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";

export function AppLayout() {
  return (
    <div className="flex h-screen w-screen bg-slate-950 text-slate-200 overflow-hidden font-sans selection:bg-indigo-500/30">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}
