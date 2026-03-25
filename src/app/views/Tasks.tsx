import { useState, useMemo } from "react";
import { Search, Plus, ListFilter, Calendar, CheckCircle2, Circle, Clock, MoreVertical, X, Check, ChevronLeft, Tag } from "lucide-react";
import { cn } from "../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";

const MOCK_TASKS = [
  { id: 1, title: "Fix Windows sidebar accessibility error", description: "Trace the AXTree failure during sidebar hover and click flows on desktop.", priority: "Urgent", status: "To Do", date: "26/3/2026", tags: ["Engineering"] },
  { id: 2, title: "Buy groceries for meal prep", description: "Restock core food for four prep days and avoid eating out.", priority: "Low", status: "To Do", date: "Tomorrow", tags: ["Personal", "Health"] },
  { id: 3, title: "Draft dashboard search API contract", description: "Define grouped task and note results and keep response times under 200ms.", priority: "High", status: "To Do", date: "27/3/2026", tags: ["Product", "Research"] },
  { id: 4, title: "Implement dashboard search backend endpoint", description: "Aggregate task and note records behind one query.", priority: "Urgent", status: "In Progress", date: "27/3/2026", tags: ["Engineering", "Product"] },
];

const PRIORITIES = ["Low", "Medium", "High", "Urgent"];
const STATUSES = ["To Do", "In Progress", "Done", "Archived"];

export function Tasks() {
  const [selectedTask, setSelectedTask] = useState<any>(null);
  
  // Filter state
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<{ status: string[], priority: string[] }>({
    status: [],
    priority: [],
  });

  const toggleFilter = (type: 'status' | 'priority', value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value) 
        ? prev[type].filter(v => v !== value)
        : [...prev[type], value]
    }));
  };

  const filteredTasks = useMemo(() => {
    return MOCK_TASKS.filter(task => {
      const matchStatus = activeFilters.status.length === 0 || activeFilters.status.includes(task.status);
      const matchPriority = activeFilters.priority.length === 0 || activeFilters.priority.includes(task.priority);
      return matchStatus && matchPriority;
    });
  }, [activeFilters]);

  const activeFilterCount = activeFilters.status.length + activeFilters.priority.length;

  const PriorityBadge = ({ p }: { p: string }) => {
    const colors: Record<string, string> = {
      Low: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
      Medium: "text-blue-400 border-blue-500/30 bg-blue-500/10",
      High: "text-orange-400 border-orange-500/30 bg-orange-500/10",
      Urgent: "text-red-400 border-red-500/30 bg-red-500/10",
    };
    return <span className={cn("text-[9px] px-2 py-0.5 rounded-full border font-semibold uppercase tracking-wider", colors[p] || "text-slate-400 border-slate-500/20 bg-slate-500/10")}>{p}</span>;
  };

  const StatusBadge = ({ s }: { s: string }) => {
    return <span className="text-[10px] px-2.5 py-1 rounded-full border border-slate-700 bg-slate-800 text-slate-300 font-medium flex items-center gap-1.5 shrink-0">
      {s === 'Done' ? <CheckCircle2 size={12} className="text-emerald-400" /> : <Circle size={12} className="text-slate-500" />}
      {s}
    </span>;
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-950 relative overflow-hidden">
      
      {/* Header (Sticky) */}
      <div className="pt-12 px-6 pb-4 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 sticky top-0 z-20 shrink-0">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            Tasks
            <span className="text-[11px] bg-slate-800 px-2 py-0.5 rounded-full text-slate-400 font-bold border border-slate-700">{filteredTasks.length}</span>
          </h1>
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:bg-slate-800 active:scale-95 transition-all relative"
          >
            <ListFilter size={18} />
            {activeFilterCount > 0 && (
              <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-indigo-500 rounded-full border-2 border-slate-900 flex items-center justify-center text-[8px] font-bold text-white">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <input 
            type="text" 
            placeholder="Search tasks..." 
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-10 pr-4 py-3 text-[15px] placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all text-slate-200"
          />
        </div>
      </div>

      {/* Task List */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2.5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <button
              key={task.id}
              onClick={() => setSelectedTask(task)}
              className="w-full text-left p-4 rounded-[20px] bg-slate-900/40 border border-slate-800/60 active:bg-slate-800/60 active:scale-[0.98] transition-all flex flex-col gap-2.5"
            >
              <div className="flex items-start gap-3 w-full">
                <div className={cn("mt-0.5 shrink-0 transition-colors", task.status === 'Done' ? "text-emerald-500" : "text-slate-500")}>
                  {task.status === 'Done' ? <CheckCircle2 size={20} /> : <Circle size={20} strokeWidth={2} />}
                </div>
                <div className="flex-1 min-w-0 pr-2">
                  <h3 className={cn("font-medium text-[15px] leading-snug mb-1 truncate", task.status === 'Done' ? "text-slate-500 line-through" : "text-slate-200")}>
                    {task.title}
                  </h3>
                  <p className="text-[13px] text-slate-500 line-clamp-2 leading-relaxed">{task.description}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 pl-8 flex-wrap mt-1">
                <PriorityBadge p={task.priority} />
                <StatusBadge s={task.status} />
                <div className="flex items-center text-[10px] text-slate-400 gap-1 font-medium bg-slate-800/50 px-2 py-0.5 rounded-full border border-slate-700/50">
                  <Calendar size={10} /> {task.date}
                </div>
                {task.tags.map(tag => (
                  <span key={tag} className="text-[9px] px-2 py-0.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 font-semibold uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    {tag}
                  </span>
                ))}
              </div>
            </button>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center mb-4 text-slate-600">
              <Check size={32} />
            </div>
            <p className="text-[15px] font-medium text-slate-300">No tasks found</p>
            <p className="text-[13px] text-slate-500 mt-1">Try adjusting your filters.</p>
          </div>
        )}
        <div className="h-24" /> {/* FAB padding */}
      </div>

      {/* Floating Action Button */}
      <AnimatePresence>
        {!selectedTask && (
          <motion.button 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileTap={{ scale: 0.9 }}
            className="absolute bottom-6 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(79,70,229,0.4)] z-30"
          >
            <Plus size={24} strokeWidth={2.5} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Detail View (Full Screen Modal) */}
      <AnimatePresence>
        {selectedTask && (
          <motion.div 
            initial={{ y: "100%", opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0.5 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-slate-950 z-50 flex flex-col"
          >
            {/* Nav Header */}
            <div className="h-14 px-4 flex items-center justify-between border-b border-slate-800 bg-slate-950/80 backdrop-blur-md shrink-0">
              <button 
                onClick={() => setSelectedTask(null)}
                className="flex items-center gap-1 text-indigo-400 font-medium active:opacity-70 transition-opacity p-2 -ml-2"
              >
                <ChevronLeft size={20} /> Back
              </button>
              <div className="flex items-center gap-1">
                <button className="px-3 py-1.5 rounded-full bg-indigo-600 text-white text-[13px] font-medium active:scale-95 transition-all">
                  Save
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="flex items-start gap-4 mb-8">
                <button className="mt-1 w-6 h-6 rounded-full border-2 border-slate-600 flex items-center justify-center text-transparent active:bg-slate-800 transition-colors shrink-0">
                  <Check size={14} strokeWidth={3} />
                </button>
                <textarea 
                  defaultValue={selectedTask.title}
                  className="w-full bg-transparent text-2xl font-bold text-white focus:outline-none resize-none overflow-hidden placeholder:text-slate-600"
                  rows={2}
                  placeholder="Task title"
                />
              </div>

              <div className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block">Description</label>
                  <textarea 
                    defaultValue={selectedTask.description} 
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-4 py-3 text-[15px] text-slate-300 min-h-[100px] resize-y focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-slate-600"
                    placeholder="Add details..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block">Priority</label>
                    <button className="w-full flex items-center justify-between bg-slate-900/50 border border-slate-800 px-4 py-3 rounded-2xl text-[14px] text-slate-300">
                      <PriorityBadge p={selectedTask.priority} />
                      <ChevronLeft size={16} className="text-slate-600 rotate-180" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block">Status</label>
                    <button className="w-full flex items-center justify-between bg-slate-900/50 border border-slate-800 px-4 py-3 rounded-2xl text-[14px] text-slate-300">
                      <StatusBadge s={selectedTask.status} />
                      <ChevronLeft size={16} className="text-slate-600 rotate-180" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block">Due Date</label>
                  <button className="w-full flex items-center justify-between bg-slate-900/50 border border-slate-800 px-4 py-3 rounded-2xl text-[14px] text-slate-300">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-indigo-400" />
                      {selectedTask.date}
                    </div>
                    <ChevronLeft size={16} className="text-slate-600 rotate-180" />
                  </button>
                </div>

                <div className="space-y-3">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block">Labels</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedTask.tags.map((tag: string) => (
                      <span key={tag} className="pl-3 pr-2 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 text-[13px] font-medium flex items-center gap-2">
                        {tag}
                        <button className="w-4 h-4 rounded-full hover:bg-indigo-500/20 flex items-center justify-center text-indigo-400"><X size={10} /></button>
                      </span>
                    ))}
                    <button className="px-3 py-1.5 rounded-full border border-dashed border-slate-700 bg-slate-900/50 text-slate-400 text-[13px] font-medium flex items-center gap-1 active:bg-slate-800">
                      <Plus size={14} /> Add label
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block mb-3">Linked Notes</label>
                  <button className="w-full py-4 rounded-2xl border border-slate-800 border-dashed bg-slate-900/20 text-orange-400 text-[14px] font-medium flex items-center justify-center gap-2 active:bg-slate-900/50 transition-colors">
                    <Plus size={16} /> Link a note
                  </button>
                </div>
                
                <div className="pb-8 flex justify-center">
                   <button className="text-red-400 font-medium text-[14px] px-4 py-2 rounded-xl active:bg-red-500/10 transition-colors">
                     Delete Task
                   </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter Bottom Sheet */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 inset-x-0 bg-slate-900 rounded-t-[32px] border-t border-slate-800 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-50 p-6 flex flex-col pb-safe"
            >
              <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto mb-6" />
              
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Filter Tasks</h3>
                <button onClick={() => setActiveFilters({ status: [], priority: [] })} className="text-[13px] text-slate-400 font-medium active:text-white">Clear all</button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block mb-3">Status</label>
                  <div className="flex flex-wrap gap-2">
                    {STATUSES.map(s => {
                      const active = activeFilters.status.includes(s);
                      return (
                        <button 
                          key={s} 
                          onClick={() => toggleFilter('status', s)}
                          className={cn(
                            "px-4 py-2 rounded-full text-[13px] font-medium transition-all flex items-center gap-1.5 border",
                            active ? "bg-indigo-600 border-indigo-500 text-white" : "bg-slate-800 border-slate-700 text-slate-300 active:bg-slate-700"
                          )}
                        >
                          {active && <Check size={14} />} {s}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block mb-3">Priority</label>
                  <div className="flex flex-wrap gap-2">
                    {PRIORITIES.map(p => {
                      const active = activeFilters.priority.includes(p);
                      return (
                        <button 
                          key={p} 
                          onClick={() => toggleFilter('priority', p)}
                          className={cn(
                            "px-4 py-2 rounded-full text-[13px] font-medium transition-all flex items-center gap-1.5 border",
                            active ? "bg-indigo-600 border-indigo-500 text-white" : "bg-slate-800 border-slate-700 text-slate-300 active:bg-slate-700"
                          )}
                        >
                          {active && <Check size={14} />} {p}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setIsFilterOpen(false)}
                className="w-full h-12 mt-8 bg-slate-100 text-slate-900 rounded-2xl font-bold text-[15px] active:scale-95 transition-transform"
              >
                Show {filteredTasks.length} Tasks
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
