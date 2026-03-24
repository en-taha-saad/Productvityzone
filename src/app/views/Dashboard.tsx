import { Plus, ListTodo, FileText, Calendar as CalendarIcon, Activity } from "lucide-react";
import { cn } from "../../utils/cn";
import { Link } from "react-router";

function Card({ title, items, icon: Icon, emptyText, actionLink }: any) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-colors">
      <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
        <h3 className="font-semibold text-slate-100 flex items-center gap-2">
          <Icon size={18} className="text-slate-400" />
          {title}
        </h3>
        {actionLink && (
          <Link to={actionLink} className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
            View all
          </Link>
        )}
      </div>
      <div className="p-4 bg-slate-900/30 min-h-[140px] flex flex-col">
        {items?.length > 0 ? (
          <div className="space-y-3">
            {items.map((item: any, i: number) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-slate-800 bg-slate-900 hover:border-indigo-500/30 transition-colors">
                {item.icon && <div className="text-slate-500">{item.icon}</div>}
                <div className="flex-1 min-w-0">
                  <div className="text-slate-200 text-sm font-medium truncate">{item.title}</div>
                  {item.subtitle && <div className="text-slate-500 text-xs mt-0.5 truncate">{item.subtitle}</div>}
                </div>
                {item.badges && (
                  <div className="flex gap-1.5 shrink-0">
                    {item.badges.map((b: any, j: number) => (
                      <span key={j} className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium border", b.className)}>
                        {b.label}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-500 mb-3">
              <Icon size={24} />
            </div>
            <p className="text-slate-400 font-medium text-sm">{emptyText}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export function Dashboard() {
  return (
    <div className="h-full overflow-y-auto px-8 py-10 relative">
      <div className="max-w-4xl mx-auto space-y-10 pb-20">
        
        <header className="flex justify-between items-end">
          <div>
            <div className="text-slate-500 font-medium tracking-wide uppercase text-xs mb-1">Good Morning</div>
            <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Ready to focus, Q?</h1>
            <p className="text-slate-400 text-lg">You have 2 tasks scheduled for today.</p>
          </div>
          
          <div className="flex gap-3">
            <button className="h-10 px-4 rounded-full bg-slate-800 text-slate-300 font-medium hover:bg-slate-700 hover:text-white transition-colors flex items-center gap-2">
              <Plus size={18} />
              Quick Action
            </button>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card 
            title="Today's Tasks" 
            icon={ListTodo}
            actionLink="/tasks"
            items={[
              {
                title: "task 2",
                icon: <div className="w-4 h-4 rounded border-2 border-slate-600" />,
                badges: [
                  { label: "To Do", className: "bg-slate-800 text-slate-300 border-slate-700" },
                  { label: "Medium", className: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
                  { label: "tag 2", className: "bg-pink-500/10 text-pink-400 border-pink-500/20" }
                ]
              },
              {
                title: "task 1",
                icon: <div className="w-4 h-4 rounded border-2 border-slate-600" />,
                badges: [
                  { label: "To Do", className: "bg-slate-800 text-slate-300 border-slate-700" },
                  { label: "tag 1", className: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" }
                ]
              }
            ]}
          />

          <Card 
            title="Recent Notes" 
            icon={FileText}
            emptyText="No notes yet. Tap + to start writing."
            actionLink="/notes"
          />

          <Card 
            title="Upcoming" 
            icon={CalendarIcon}
            emptyText="Nothing planned yet"
          />

          <Card 
            title="Habit Streaks" 
            icon={Activity}
            emptyText="No habits tracked yet"
          />
        </section>
      </div>

      {/* Floating Action Button for desktop (optional but nice touch) */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/20 transition-transform hover:scale-105 active:scale-95 z-50">
        <Plus size={24} />
      </button>
    </div>
  );
}
