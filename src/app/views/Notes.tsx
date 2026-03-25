import { useState } from "react";
import { Search, Plus, Pin, Folder, Tag, Check, ChevronLeft, MoreVertical, LayoutGrid, LayoutList, X, FileText, Clock, CheckCircle2 } from "lucide-react";
import { cn } from "../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";

const MOCK_NOTES = [
  { id: 3, title: "Postgres Search Notes", content: "Notes on fuzzy match performance and indexing cost...\n\nCREATE EXTENSION pg_trgm;", time: "15:14", folder: "Learning", tags: ["Research", "Engineering"], isPinned: true },
  { id: 2, title: "April Budget Snapshot", content: "Need to reconcile the emergency fund.", time: "07:53", folder: "Finance", tags: [], isPinned: true },
  { id: 1, title: "Weekly Focus Plan", content: "Objectives for the week:\n- Ship the mobile app\n- Finalize API", time: "07:53", folder: "Personal", tags: [], isPinned: false },
  { id: 4, title: "Dashboard Search Scope", content: "Empty note", time: "07:53", folder: "Product", tags: [], isPinned: false },
];

export function Notes() {
  const [selectedNote, setSelectedNote] = useState<any>(null);
  const [activeFolder, setActiveFolder] = useState("All");
  const [isGridView, setIsGridView] = useState(false);

  return (
    <div className="flex-1 flex flex-col bg-slate-950 relative overflow-hidden">
      
      {/* Header */}
      <div className="pt-12 px-6 pb-2 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-20 shrink-0">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            Notes
            <span className="text-[11px] bg-slate-800 px-2 py-0.5 rounded-full text-slate-400 font-bold border border-slate-700">{MOCK_NOTES.length}</span>
          </h1>
          <button 
            onClick={() => setIsGridView(!isGridView)}
            className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 active:scale-95 transition-all hover:bg-slate-800"
            aria-label="Toggle layout"
          >
            {isGridView ? <LayoutList size={18} /> : <LayoutGrid size={18} />}
          </button>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <input 
            type="text" 
            placeholder="Search notes..." 
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-10 pr-4 py-3 text-[15px] placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all text-slate-200"
          />
        </div>

        {/* Horizontal Folders */}
        <div className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-6 px-6 pb-2">
          {["All", "Learning", "Finance", "Personal", "Product"].map(folder => (
            <button
              key={folder}
              onClick={() => setActiveFolder(folder)}
              className={cn(
                "px-4 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap transition-all border",
                activeFolder === folder 
                  ? "bg-slate-200 border-slate-200 text-slate-900" 
                  : "bg-slate-900/50 border-slate-800 text-slate-400 active:bg-slate-800"
              )}
            >
              {folder}
            </button>
          ))}
        </div>
      </div>

      {/* Note List */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* Pinned */}
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-2">
            <Pin size={12} className="text-orange-400" /> Pinned
          </div>
          <div className={cn(isGridView ? "grid grid-cols-2 gap-2.5" : "space-y-2.5")}>
            {MOCK_NOTES.filter(n => n.isPinned).map(note => (
              <button
                key={note.id}
                onClick={() => setSelectedNote(note)}
                className={cn(
                  "w-full text-left p-4 rounded-[20px] bg-slate-900/40 border border-slate-800/60 active:bg-slate-800/60 active:scale-[0.98] transition-all flex flex-col relative overflow-hidden group",
                  isGridView ? "h-[160px]" : ""
                )}
              >
                <div className="absolute top-4 right-4 text-orange-400 opacity-50">
                  <Pin size={14} fill="currentColor" />
                </div>
                <h3 className={cn("font-semibold text-slate-200 mb-1 pr-6", isGridView ? "text-[14px] line-clamp-2 leading-tight" : "text-[15px] truncate")}>{note.title}</h3>
                <p className={cn("text-[13px] text-slate-500 leading-relaxed", isGridView ? "line-clamp-3 mb-auto" : "line-clamp-2 mb-3")}>{note.content}</p>
                <div className={cn("flex items-center justify-between", isGridView ? "mt-3" : "mt-auto pt-1")}>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-medium text-slate-500 flex items-center gap-1">
                      <Clock size={10} /> {note.time}
                    </span>
                    {!isGridView && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-slate-700" />
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium">
                          {note.folder}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Regular Notes */}
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-2">
            <LayoutGrid size={12} /> Recent
          </div>
          <div className={cn(isGridView ? "grid grid-cols-2 gap-2.5" : "space-y-2.5")}>
            {MOCK_NOTES.filter(n => !n.isPinned).map(note => (
              <button
                key={note.id}
                onClick={() => setSelectedNote(note)}
                className={cn(
                  "w-full text-left p-4 rounded-[20px] bg-slate-900/40 border border-slate-800/60 active:bg-slate-800/60 active:scale-[0.98] transition-all flex flex-col relative overflow-hidden group",
                  isGridView ? "h-[160px]" : ""
                )}
              >
                <h3 className={cn("font-semibold text-slate-200 mb-1", isGridView ? "text-[14px] line-clamp-2 leading-tight pr-2" : "text-[15px] truncate pr-6")}>{note.title}</h3>
                <p className={cn("text-[13px] text-slate-500 leading-relaxed", isGridView ? "line-clamp-3 mb-auto" : "line-clamp-2 mb-3")}>{note.content}</p>
                <div className={cn("flex items-center justify-between", isGridView ? "mt-3" : "mt-auto pt-1")}>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-medium text-slate-500 flex items-center gap-1">
                      <Clock size={10} /> {note.time}
                    </span>
                    {!isGridView && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-slate-700" />
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium">
                          {note.folder}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="h-24" />
      </div>

      <AnimatePresence>
        {!selectedNote && (
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

      {/* Editor Full Screen Modal */}
      <AnimatePresence>
        {selectedNote && (
          <motion.div 
            initial={{ y: "100%", opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0.5 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-slate-950 z-50 flex flex-col"
          >
            {/* Nav Header */}
            <div className="h-14 px-4 flex items-center justify-between border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-md shrink-0">
              <button 
                onClick={() => setSelectedNote(null)}
                className="flex items-center gap-1 text-slate-400 font-medium active:text-white transition-colors p-2 -ml-2"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex items-center gap-2">
                <button className={cn("w-9 h-9 rounded-full flex items-center justify-center active:scale-90 transition-transform", selectedNote.isPinned ? "text-orange-400 bg-orange-500/10" : "text-slate-400 hover:bg-slate-800")}>
                  <Pin size={18} fill={selectedNote.isPinned ? "currentColor" : "none"} />
                </button>
                <button className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 active:bg-slate-800 transition-colors">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <input 
                type="text" 
                defaultValue={selectedNote.title} 
                className="w-full bg-transparent text-3xl font-bold text-white focus:outline-none mb-4 placeholder:text-slate-700"
                placeholder="Title"
              />

              <div className="flex gap-2 flex-wrap mb-8">
                {selectedNote.folder && (
                  <span className="pl-3 pr-2 py-1.5 rounded-full border border-slate-700 bg-slate-800/50 text-slate-300 text-[12px] font-medium flex items-center gap-1.5">
                    <Folder size={12} /> {selectedNote.folder} <X size={10} className="ml-1 opacity-50" />
                  </span>
                )}
                {selectedNote.tags.map((tag: string) => (
                  <span key={tag} className="pl-3 pr-2 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 text-[12px] font-medium flex items-center gap-1.5">
                    <Tag size={12} /> {tag} <X size={10} className="ml-1 opacity-50" />
                  </span>
                ))}
                <button className="w-8 h-8 rounded-full border border-dashed border-slate-700 text-slate-400 flex items-center justify-center active:bg-slate-800">
                  <Plus size={14} />
                </button>
              </div>

              <textarea 
                defaultValue={selectedNote.content} 
                className="w-full bg-transparent text-[16px] text-slate-300 leading-relaxed resize-none focus:outline-none min-h-[500px] placeholder:text-slate-600"
                placeholder="Start typing..."
              />
            </div>
            
            {/* Keyboard accessory bar simulation */}
            <div className="h-12 bg-slate-900 border-t border-slate-800 flex items-center px-4 gap-4 text-slate-400 shrink-0">
              <button className="active:text-white"><CheckCircle2 size={20} /></button>
              <button className="active:text-white"><FileText size={20} /></button>
              <div className="flex-1 text-center text-[10px] uppercase tracking-widest font-bold opacity-50">
                Editing
              </div>
              <button className="font-bold text-[14px] text-indigo-400 active:opacity-70">Done</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
