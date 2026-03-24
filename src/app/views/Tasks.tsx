import { useState } from "react";
import { Search, Plus, ListFilter, Tag, Calendar, CheckCircle2, Circle, Clock, MoreVertical, X, Check } from "lucide-react";
import { cn } from "../../utils/cn";

const MOCK_TASKS = [
  { id: 1, title: "task 2", description: "description 2", priority: "Medium", status: "To Do", date: "3/24/2026", tags: ["tag 2"] },
  { id: 2, title: "task 1", description: "description 1", priority: "Low", status: "To Do", date: "3/24/2026", tags: ["tag 1"] },
  { id: 3, title: "Complete project PRD", description: "Finalize the documentation for version 1.0", priority: "High", status: "In Progress", date: "3/25/2026", tags: ["work", "planning"] },
];

const PRIORITIES = ["Low", "Medium", "High", "Urgent"];
const STATUSES = ["To Do", "In Progress", "Done", "Archived"];

export function Tasks() {
  const [selectedTask, setSelectedTask] = useState(MOCK_TASKS[0]);
  const [isEditing, setIsEditing] = useState(false);

  const PriorityBadge = ({ p }: { p: string }) => {
    const colors = {
      Low: "text-emerald-400 border-emerald-500/20 bg-emerald-500/10",
      Medium: "text-blue-400 border-blue-500/20 bg-blue-500/10",
      High: "text-orange-400 border-orange-500/20 bg-orange-500/10",
      Urgent: "text-red-400 border-red-500/20 bg-red-500/10",
    }[p] || "text-slate-400 border-slate-500/20 bg-slate-500/10";
    return <span className={cn("text-[10px] px-2 py-0.5 rounded-full border font-medium", colors)}>{p}</span>;
  };

  const StatusBadge = ({ s }: { s: string }) => {
    return <span className="text-[10px] px-2 py-0.5 rounded-full border border-slate-700 bg-slate-800 text-slate-300 font-medium flex items-center gap-1">
      {s === 'Done' ? <CheckCircle2 size={10} className="text-emerald-400" /> : <Circle size={10} />}
      {s}
    </span>;
  };

  return (
    <div className="flex h-full bg-slate-950 text-slate-200">
      {/* List / Master View */}
      <div className="w-1/3 min-w-[320px] max-w-[400px] border-r border-slate-800 bg-slate-900 flex flex-col h-full">
        <div className="p-4 border-b border-slate-800 flex flex-col gap-4 sticky top-0 bg-slate-900/95 backdrop-blur z-10">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold tracking-tight text-white flex items-center gap-2">
              Tasks
              <span className="text-xs bg-slate-800 px-2 py-0.5 rounded-full text-slate-400 font-medium border border-slate-700">{MOCK_TASKS.length}</span>
            </h1>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                <Search size={18} />
              </button>
              <button className="w-8 h-8 rounded-full hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                <ListFilter size={18} />
              </button>
            </div>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text" 
              placeholder="Filter tasks..." 
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-1">Today</div>
          {MOCK_TASKS.map(task => (
            <button
              key={task.id}
              onClick={() => setSelectedTask(task)}
              className={cn(
                "w-full text-left p-4 rounded-xl border transition-all relative overflow-hidden group",
                selectedTask.id === task.id 
                  ? "bg-slate-800 border-indigo-500/50 shadow-sm" 
                  : "bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50"
              )}
            >
              {selectedTask.id === task.id && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500" />
              )}
              
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-slate-500 group-hover:text-indigo-400 transition-colors shrink-0">
                  <Circle size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={cn("font-medium truncate mb-1", selectedTask.id === task.id ? "text-white" : "text-slate-200")}>
                    {task.title}
                  </h3>
                  <p className="text-sm text-slate-500 truncate mb-3">{task.description}</p>
                  
                  <div className="flex items-center gap-2 flex-wrap">
                    <PriorityBadge p={task.priority} />
                    <div className="flex items-center text-[10px] text-slate-500 gap-1">
                      <Clock size={10} /> {task.date}
                    </div>
                    {task.tags.map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full border border-pink-500/20 bg-pink-500/10 text-pink-400 font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Detail View */}
      <div className="flex-1 flex flex-col bg-slate-950 overflow-hidden relative">
        {selectedTask ? (
          <>
            <div className="h-16 border-b border-slate-800 flex items-center justify-between px-6 shrink-0 bg-slate-900/50 backdrop-blur sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <button 
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors",
                    isEditing ? "bg-indigo-600 border-indigo-500 text-white" : "bg-slate-800 border-slate-700 text-slate-300 hover:text-white"
                  )}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? "Save Changes" : "Edit Task"}
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 rounded-full hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
              <div className="max-w-2xl mx-auto space-y-8 pb-20">
                
                {/* Title & Desc */}
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <button className="mt-1 w-6 h-6 rounded border-2 border-slate-600 hover:border-indigo-400 hover:bg-indigo-500/10 flex items-center justify-center transition-colors text-transparent hover:text-indigo-400 shrink-0">
                      <Check size={14} className="stroke-[3]" />
                    </button>
                    <div className="flex-1">
                      {isEditing ? (
                        <input 
                          type="text" 
                          defaultValue={selectedTask.title} 
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-xl font-semibold text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                        />
                      ) : (
                        <h2 className="text-3xl font-bold tracking-tight text-white">{selectedTask.title}</h2>
                      )}
                    </div>
                  </div>

                  <div className="ml-10">
                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2 block">Description</label>
                    {isEditing ? (
                      <textarea 
                        defaultValue={selectedTask.description} 
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-sm text-slate-300 min-h-[100px] resize-y focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                      />
                    ) : (
                      <div className="text-slate-300 bg-slate-900/50 p-4 rounded-xl border border-slate-800/50 text-sm leading-relaxed whitespace-pre-wrap">
                        {selectedTask.description || "No description provided."}
                      </div>
                    )}
                  </div>
                </div>

                {/* Meta grid */}
                <div className="ml-10 grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wider block">Priority</label>
                    <div className="flex gap-2">
                      {isEditing ? (
                        PRIORITIES.map(p => (
                          <button 
                            key={p} 
                            className={cn(
                              "px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors",
                              selectedTask.priority === p 
                                ? "bg-indigo-600/20 border-indigo-500 text-indigo-300" 
                                : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800"
                            )}
                          >
                            {p}
                          </button>
                        ))
                      ) : (
                        <PriorityBadge p={selectedTask.priority} />
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wider block">Status</label>
                    <div className="flex flex-wrap gap-2">
                      {isEditing ? (
                        STATUSES.map(s => (
                          <button 
                            key={s} 
                            className={cn(
                              "px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors flex items-center gap-1.5",
                              selectedTask.status === s 
                                ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400" 
                                : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800"
                            )}
                          >
                            <Circle size={14} className={selectedTask.status === s ? "text-emerald-400" : "text-slate-500"} />
                            {s}
                          </button>
                        ))
                      ) : (
                        <StatusBadge s={selectedTask.status} />
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wider block">Due Date</label>
                    {isEditing ? (
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400" size={16} />
                        <input 
                          type="text" 
                          defaultValue={selectedTask.date} 
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-indigo-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-sm text-indigo-300 bg-indigo-500/5 border border-indigo-500/10 px-3 py-2 rounded-lg w-max">
                        <Calendar size={16} className="text-indigo-400" />
                        <span className="font-medium">{selectedTask.date}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wider block">Labels</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedTask.tags.map(tag => (
                        <span key={tag} className="text-xs px-2.5 py-1 rounded-md border border-pink-500/20 bg-pink-500/10 text-pink-400 font-medium flex items-center gap-1.5">
                          <Tag size={12} />
                          {tag}
                          {isEditing && <button className="ml-1 text-pink-500 hover:text-pink-300"><X size={12} /></button>}
                        </span>
                      ))}
                      {isEditing && (
                        <button className="text-xs px-2.5 py-1 rounded-md border border-dashed border-slate-600 bg-slate-900 text-slate-400 hover:text-white hover:border-slate-500 font-medium flex items-center gap-1.5 transition-colors">
                          <Plus size={12} /> New label
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="ml-10 pt-4 border-t border-slate-800">
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wider block">Linked Notes</label>
                    <button className="text-xs font-medium text-orange-400 hover:text-orange-300 flex items-center gap-1 transition-colors">
                      <Plus size={12} /> Link note
                    </button>
                  </div>
                  <div className="text-sm text-slate-500 italic bg-slate-900/30 p-4 rounded-xl border border-slate-800 border-dashed text-center">
                    No notes linked yet.
                  </div>
                  <div className="mt-8 text-xs text-slate-600 flex items-center gap-2">
                    <Clock size={12} /> Created 3/23/2026
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-500">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center mb-4 border border-slate-800">
              <CheckCircle2 size={32} className="text-slate-700" />
            </div>
            <p className="text-lg font-medium text-slate-400">Select a task to view details</p>
          </div>
        )}

        {/* FAB for new task */}
        <button className="absolute bottom-8 right-8 w-14 h-14 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/20 transition-transform hover:scale-105 active:scale-95 z-50">
          <Plus size={24} />
        </button>
      </div>
    </div>
  );
}
