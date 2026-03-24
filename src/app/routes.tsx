import { createBrowserRouter, Navigate } from "react-router";
import { AppLayout } from "./components/AppLayout";
import { Dashboard } from "./views/Dashboard";
import { Tasks } from "./views/Tasks";
import { Notes } from "./views/Notes";

function PlaceholderView({ title }: { title: string }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-slate-500 h-full">
      <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center mb-4 border border-slate-800">
        <span className="text-2xl">🚧</span>
      </div>
      <p className="text-lg font-medium text-slate-400">{title} - Coming Soon</p>
      <p className="text-sm text-slate-600 mt-2">This module is planned for a future milestone.</p>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "tasks", Component: Tasks },
      { path: "notes", Component: Notes },
      { path: "planner", Component: () => <PlaceholderView title="Planner" /> },
      { path: "more", Component: () => <PlaceholderView title="More" /> },
      { path: "*", Component: () => <Navigate to="/" replace /> },
    ],
  },
]);
