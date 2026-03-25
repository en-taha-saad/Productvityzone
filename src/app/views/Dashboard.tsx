import { useState, useRef, useEffect, useMemo } from "react";
import { Search, Plus, ListTodo, FileText, Calendar as CalendarIcon, User, ChevronLeft, X, CheckCircle2, Circle, History } from "lucide-react";
import { cn } from "../../utils/cn";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

function Card({ title, items, icon: Icon, emptyText, actionLink, className }: any) {
  return (
    <div className={cn("bg-slate-900/60 border border-slate-800/80 rounded-[24px] overflow-hidden backdrop-blur-sm", className)}>
      <div className="p-5 flex justify-between items-center">
        <h3 className="font-semibold text-slate-100 flex items-center gap-2.5 text-base tracking-tight">
          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
            <Icon size={16} />
          </div>
          {title}
        </h3>
        {actionLink && (
          <Link to={actionLink} className="text-[13px] text-indigo-400 hover:text-indigo-300 transition-colors font-medium px-2 py-1">
            View all
          </Link>
        )}
      </div>
      <div className="px-5 pb-5">
        {items?.length > 0 ? (
          <div className="space-y-3">
            {items.map((item: any, i: number) => (
              <div key={i} className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/50 active:bg-slate-800 transition-colors">
                {item.icon && <div className="text-slate-500 shrink-0">{item.icon}</div>}
                <div className="flex-1 min-w-0">
                  <div className="text-slate-200 text-sm font-medium truncate">{item.title}</div>
                  {item.subtitle && <div className="text-slate-500 text-[11px] mt-0.5 truncate">{item.subtitle}</div>}
                </div>
                {item.badges && (
                  <div className="flex gap-1.5 shrink-0">
                    {item.badges.map((b: any, j: number) => (
                      <span key={j} className={cn("text-[9px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider", b.className)}>
                        {b.label}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-center bg-slate-800/20 rounded-2xl border border-slate-800/50 border-dashed">
            <div className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-500 mb-3">
              <Icon size={18} />
            </div>
            <p className="text-slate-400 font-medium text-[13px]">{emptyText}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Mock Search Data
const MOCK_SEARCH_TASKS = [
  { id: 't1', type: 'task', title: "Fix Windows sidebar accessibility error", status: "To Do", priority: "Urgent", tags: ["Engineering"] },
  { id: 't2', type: 'task', title: "Buy groceries for meal prep", status: "To Do", priority: "Low", tags: ["Personal", "Health"] },
  { id: 't3', type: 'task', title: "Draft dashboard search API contract", status: "In Progress", priority: "High", tags: ["Product", "Research"] },
  { id: 't4', type: 'task', title: "Implement dashboard search backend endpoint", status: "In Progress", priority: "Urgent", tags: ["Engineering"] },
];

const MOCK_SEARCH_NOTES = [
  { id: 'n1', type: 'note', title: "Postgres Search Notes", excerpt: "Notes on fuzzy match performance and indexing cost...\nCREATE EXTENSION pg_trgm;", folder: "Learning" },
  { id: 'n2', type: 'note', title: "April Budget Snapshot", excerpt: "Need to reconcile the emergency fund.", folder: "Finance" },
  { id: 'n3', type: 'note', title: "Weekly Focus Plan", excerpt: "Objectives for the week:\n- Ship the mobile app", folder: "Personal" },
  { id: 'n4', type: 'note', title: "Dashboard Search Scope", excerpt: "Empty note", folder: "Product" },
];

export function Dashboard() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTab, setSearchTab] = useState("All");
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input when search modal opens
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isSearchOpen]);

  const filteredTasks = useMemo(() => {
    if (!searchQuery) return [];
    return MOCK_SEARCH_TASKS.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  const filteredNotes = useMemo(() => {
    if (!searchQuery) return [];
    return MOCK_SEARCH_NOTES.filter(n => 
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      n.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const showTasks = searchTab === 'All' || searchTab === 'Tasks';
  const showNotes = searchTab === 'All' || searchTab === 'Notes';
  const hasResults = (showTasks && filteredTasks.length > 0) || (showNotes && filteredNotes.length > 0);

  return (
    <div className="h-full overflow-y-auto overflow-x-hidden pb-8 relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[300px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="px-6 pt-12 space-y-6 relative z-10">
        
        {/* Header */}
        <header className="flex justify-between items-start mb-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse" />
              <div className="text-slate-400 font-bold tracking-widest uppercase text-[10px]">Good Evening</div>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Ready to focus, Q?</h1>
          </div>
          
          <button className="w-10 h-10 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white active:scale-95 transition-all">
            <User size={18} />
          </button>
        </header>

        {/* Global Search Bar (Native App Trigger) */}
        <button 
          onClick={() => setIsSearchOpen(true)}
          className="w-full relative group text-left transition-transform active:scale-[0.98] block"
        >
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 transition-colors">
            <Search size={18} />
          </div>
          <div className="w-full bg-slate-900/80 border border-slate-700/80 rounded-2xl pl-11 pr-12 py-3.5 text-[15px] text-slate-500 transition-all shadow-sm">
            Search tasks, notes...
          </div>
          <div className="absolute inset-y-0 right-2 flex items-center">
            <div className="w-8 h-8 rounded-xl bg-slate-800 text-slate-400 flex items-center justify-center transition-colors">
              <kbd className="font-sans text-[10px] font-bold">⌘K</kbd>
            </div>
          </div>
        </button>

        {/* Quick Actions Horizontal Scroll */}
        <div className="flex gap-3 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-6 px-6">
          <button className="shrink-0 h-11 pl-3 pr-4 rounded-full bg-indigo-600 text-white font-semibold text-[13px] hover:bg-indigo-500 active:bg-indigo-700 transition-colors flex items-center gap-2 shadow-lg shadow-indigo-500/20">
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"><Plus size={14} /></div>
            New Task
          </button>
          <button className="shrink-0 h-11 pl-3 pr-4 rounded-full bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-[13px] hover:bg-slate-700 active:bg-slate-600 transition-colors flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-orange-400"><FileText size={12} /></div>
            Quick Note
          </button>
        </div>

        {/* Content Stack */}
        <div className="space-y-5">
          <Card 
            title="Today's Tasks" 
            icon={ListTodo}
            actionLink="/tasks"
            items={[
              {
                title: "Fix Windows sidebar accessibility error",
                subtitle: "Trace the AXTree failure during hover flows...",
                icon: <div className="w-5 h-5 rounded-full border-2 border-slate-600 flex items-center justify-center" />,
                badges: [
                  { label: "Urgent", className: "bg-red-500/10 text-red-400 border border-red-500/20" }
                ]
              },
              {
                title: "Draft dashboard search API contract",
                subtitle: "Define grouped task and note results...",
                icon: <div className="w-5 h-5 rounded-full border-2 border-slate-600 flex items-center justify-center" />,
                badges: [
                  { label: "High", className: "bg-orange-500/10 text-orange-400 border border-orange-500/20" }
                ]
              }
            ]}
          />

          <Card 
            title="Recent Notes" 
            icon={FileText}
            actionLink="/notes"
            items={[
              {
                title: "Postgres Search Notes",
                subtitle: "07:53 • Empty note",
                icon: <div className="w-5 h-5 rounded flex items-center justify-center text-orange-400"><FileText size={16} fill="currentColor" className="opacity-20" /></div>,
              },
              {
                title: "Weekly Focus Plan",
                subtitle: "07:53 • Empty note",
                icon: <div className="w-5 h-5 rounded flex items-center justify-center text-orange-400"><FileText size={16} fill="currentColor" className="opacity-20" /></div>,
              }
            ]}
          />

          <Card 
            title="Upcoming" 
            icon={CalendarIcon}
            emptyText="Nothing planned yet"
          />
        </div>
        
        {/* Bottom padding for scroll clearance */}
        <div className="h-6" />
      </div>

      {/* Full Screen Mobile Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ y: "10%", opacity: 0, filter: "blur(8px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: "10%", opacity: 0, filter: "blur(8px)" }}
            transition={{ type: "spring", damping: 26, stiffness: 260 }}
            className="fixed inset-0 z-50 bg-slate-950 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 pt-12 pb-3 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800/80 shrink-0">
              <button 
                onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }} 
                className="text-indigo-400 active:text-indigo-300 transition-colors p-1 -ml-1 flex items-center"
              >
                <ChevronLeft size={24} />
              </button>
              <div className="flex-1 relative flex items-center">
                <Search size={16} className="absolute left-3 text-slate-500" />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search tasks, notes..."
                  className="w-full bg-slate-800/60 border border-slate-700/80 rounded-xl pl-9 pr-9 py-2.5 text-[15px] text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all"
                />
                <AnimatePresence>
                  {searchQuery && (
                    <motion.button 
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      onClick={() => {
                        setSearchQuery("");
                        inputRef.current?.focus();
                      }} 
                      className="absolute right-2 p-1 text-slate-400 hover:text-slate-200 bg-slate-700 rounded-full h-[18px] w-[18px] flex items-center justify-center"
                    >
                      <X size={12} strokeWidth={3} />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 px-6 border-b border-slate-800/60 shrink-0 bg-slate-900/50">
              {['All', 'Tasks', 'Notes'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setSearchTab(tab)}
                  className={cn(
                    "pb-3 pt-4 text-[14px] font-medium transition-colors relative",
                    searchTab === tab ? "text-indigo-400" : "text-slate-400"
                  )}
                >
                  {tab}
                  {searchTab === tab && (
                    <motion.div layoutId="searchTab" className="absolute bottom-0 inset-x-0 h-0.5 bg-indigo-500 rounded-t-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Results Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {!searchQuery ? (
                // Recent Searches / Suggestions
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4 pt-2"
                >
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-2">Recent Searches</div>
                  <div className="space-y-1">
                    {['Q1 planning', 'budget notes', 'fix sidebar'].map(q => (
                      <button key={q} onClick={() => setSearchQuery(q)} className="w-full flex items-center gap-3 p-3 rounded-2xl bg-slate-900/30 border border-slate-800/30 hover:bg-slate-800/50 active:bg-slate-800 active:scale-[0.98] transition-all text-left text-slate-300 text-[15px] font-medium">
                        <History size={16} className="text-slate-500" />
                        {q}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : hasResults ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6 pb-safe"
                >
                  {showTasks && filteredTasks.length > 0 && (
                    <div className="space-y-3">
                      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-2 flex items-center justify-between">
                        Tasks <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 border border-slate-700">{filteredTasks.length}</span>
                      </div>
                      <div className="space-y-2">
                        {filteredTasks.map(task => (
                          <button key={task.id} className="w-full text-left p-3.5 rounded-[20px] bg-slate-900/60 border border-slate-800/80 active:bg-slate-800 active:scale-[0.98] transition-all flex flex-col gap-2">
                            <div className="flex items-start gap-3 w-full">
                              <div className={cn("mt-0.5 shrink-0", task.status === 'Done' ? "text-emerald-500" : "text-slate-500")}>
                                {task.status === 'Done' ? <CheckCircle2 size={18} /> : <Circle size={18} strokeWidth={2} />}
                              </div>
                              <div className="flex-1 min-w-0 pt-0.5">
                                <h4 className="font-medium text-[15px] text-slate-200 truncate leading-tight">{task.title}</h4>
                                <div className="flex items-center gap-2 mt-2">
                                  <span className={cn(
                                    "text-[9px] px-1.5 py-0.5 rounded border uppercase font-bold tracking-wider",
                                    task.priority === 'Urgent' ? "text-red-400 bg-red-500/10 border-red-500/20" : 
                                    task.priority === 'High' ? "text-orange-400 bg-orange-500/10 border-orange-500/20" : "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                                  )}>{task.priority}</span>
                                  <span className="w-1 h-1 rounded-full bg-slate-700" />
                                  <span className="text-[11px] text-slate-400 font-medium">{task.tags[0]}</span>
                                </div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {showNotes && filteredNotes.length > 0 && (
                    <div className="space-y-3">
                      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-2 flex items-center justify-between">
                        Notes <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 border border-slate-700">{filteredNotes.length}</span>
                      </div>
                      <div className="space-y-2">
                        {filteredNotes.map(note => (
                          <button key={note.id} className="w-full text-left p-3.5 rounded-[20px] bg-slate-900/60 border border-slate-800/80 active:bg-slate-800 active:scale-[0.98] transition-all flex flex-col gap-2">
                            <div className="flex items-start gap-3 w-full">
                              <div className="mt-0.5 shrink-0 text-orange-400 bg-orange-500/10 p-1.5 rounded-lg border border-orange-500/20">
                                <FileText size={16} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-[15px] text-slate-200 truncate leading-tight">{note.title}</h4>
                                <p className="text-[13px] text-slate-500 line-clamp-1 mt-1">{note.excerpt}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-medium">
                                    {note.folder}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-32 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-slate-900/80 border border-slate-800 flex items-center justify-center mb-4 text-slate-600">
                    <Search size={24} />
                  </div>
                  <p className="text-[15px] font-medium text-slate-300">No results found for "{searchQuery}"</p>
                  <p className="text-[13px] text-slate-500 mt-1">Check the spelling or try a broader term.</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}