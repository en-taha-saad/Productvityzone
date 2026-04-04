import { useState } from "react";
import { TitleBar } from "./components/fluent/TitleBar";
import { NavigationPane } from "./components/fluent/NavigationPane";
import { DashboardHeader } from "./components/dashboard/DashboardHeader";
import { WidgetsGrid } from "./components/dashboard/WidgetsGrid";

export default function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-full bg-[#0B0E14] text-slate-200 overflow-hidden font-sans antialiased">
      {/* Navigation Pane (Sidebar) */}
      <NavigationPane isCollapsed={isSidebarCollapsed} />

      {/* Main Window Content */}
      <div className="flex flex-col flex-1 overflow-hidden relative">
        {/* Fluent UI Title Bar & Search */}
        <TitleBar 
          isCollapsed={isSidebarCollapsed} 
          toggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
        />

        {/* Dashboard Scrollable Area */}
        <main className="flex-1 overflow-y-auto relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] bg-[#0B0E14]">
          {/* Content */}
          <div className="relative z-10 px-10">
            <DashboardHeader />
            <WidgetsGrid />
          </div>
        </main>
      </div>
    </div>
  );
}
