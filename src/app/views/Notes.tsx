import { useState } from "react";
import { Search, Plus, Filter, Pin, Folder, Tag, MoreVertical, LayoutGrid, CheckCircle2, X, FileText } from "lucide-react";
import { cn } from "../../utils/cn";

const MOCK_NOTES = [
  { id: 3, title: "note 3", content: "Start writing, Start writing, Start writing...\n\nStart writing Start writing Start writing\nStart writing Start writing\nStart writing", time: "03:49", folder: "folder 1", tags: ["tag 1"], isPinned: true },
  { id: 2, title: "note 2", content: "Start writing, Start writing...", time: "03:49", folder: "General", tags: [], isPinned: true },
  { id: 1, title: "note 1", content: "Start writing, Start writing...", time: "03:48", folder: "Ideas", tags: [], isPinned: false },
];

export function Notes() {
  const [selectedNote, setSelectedNote] = useState(MOCK_NOTES[0]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex h-full bg-slate-950 text-slate-200">
      {/* Master View */}
      <div className="w-[380px] shrink-0 border-r border-slate-800 bg-slate-900 flex flex-col h-full">
        <div className="p-4 border-b border-slate-800 flex flex-col gap-4 shrink-0">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold tracking-tight text-white flex items-center gap-2">
              Notes
              <span className="text-xs bg-slate-800 px-2 py-0.5 rounded-full text-slate-400 font-medium border border-slate-700">{MOCK_NOTES.length}</span>
            </h1>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                <Search size={18} />
              </button>
              <button className="w-8 h-8 rounded-full hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                <Filter size={18} />
              </button>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <span className="text-slate-500 w-12 font-medium">Folder</span>
              <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
                <button className="px-3 py-1 rounded-full border border-orange-500/50 bg-orange-500/10 text-orange-400 whitespace-nowrap text-xs font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange-500" /> All
                </button>
                <button className="px-3 py-1 rounded-full border border-slate-700 bg-slate-800 text-slate-300 whitespace-nowrap text-xs font-medium hover:border-slate-600 transition-colors">
                  folder 1
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-slate-500 w-12 font-medium">Tag</span>
              <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
                <button className="px-3 py-1 rounded-full border border-orange-500/50 bg-orange-500/10 text-orange-400 whitespace-nowrap text-xs font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange-500" /> All
                </button>
                <button className="px-3 py-1 rounded-full border border-slate-700 bg-slate-800 text-slate-300 whitespace-nowrap text-xs font-medium hover:border-slate-600 transition-colors">
                  #tag 1
                </button>
                <button className="px-3 py-1 rounded-full border border-slate-700 bg-slate-800 text-slate-300 whitespace-nowrap text-xs font-medium hover:border-slate-600 transition-colors">
                  #tag 2
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          
          <div className="mb-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-1">
              <Pin size={12} className="text-orange-400" /> Pinned
            </div>
            <div className="grid gap-3">
              {MOCK_NOTES.filter(n => n.isPinned).map(note => (
                <button
                  key={note.id}
                  onClick={() => setSelectedNote(note)}
                  className={cn(
                    "text-left p-4 rounded-xl border transition-all relative group flex flex-col min-h-[120px]",
                    selectedNote.id === note.id 
                      ? "bg-slate-800 border-indigo-500/50 shadow-sm" 
                      : "bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50"
                  )}
                >
                  {selectedNote.id === note.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 rounded-l-xl" />}
                  
                  <div className="flex justify-between items-start mb-2 w-full">
                    <h3 className={cn("font-medium truncate", selectedNote.id === note.id ? "text-white" : "text-slate-200")}>
                      {note.title}
                    </h3>
                    <Pin size={14} className="text-orange-400 shrink-0" fill="currentColor" />
                  </div>
                  <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed flex-1 whitespace-pre-line">
                    {note.content}
                  </p>
                  <div className="mt-3 text-[10px] text-slate-600 font-medium tracking-wider w-full text-left">
                    {note.time}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-1">
              <LayoutGrid size={12} /> Notes
            </div>
            <div className="grid grid-cols-1 gap-3">
              {MOCK_NOTES.filter(n => !n.isPinned).map(note => (
                <button
                  key={note.id}
                  onClick={() => setSelectedNote(note)}
                  className={cn(
                    "text-left p-4 rounded-xl border transition-all relative group flex flex-col min-h-[120px]",
                    selectedNote.id === note.id 
                      ? "bg-slate-800 border-indigo-500/50 shadow-sm" 
                      : "bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50"
                  )}
                >
                  {selectedNote.id === note.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 rounded-l-xl" />}
                  
                  <div className="flex justify-between items-start mb-2 w-full">
                    <h3 className={cn("font-medium truncate", selectedNote.id === note.id ? "text-white" : "text-slate-200")}>
                      {note.title}
                    </h3>
                    <Pin size={14} className="text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </div>
                  <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed flex-1 whitespace-pre-line">
                    {note.content}
                  </p>
                  <div className="mt-3 text-[10px] text-slate-600 font-medium tracking-wider w-full text-left">
                    {note.time}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Detail View / Editor */}
      <div className="flex-1 flex flex-col bg-slate-950 overflow-hidden relative">
        {selectedNote ? (
          <>
            <div className="h-16 border-b border-slate-800 flex items-center justify-end px-6 shrink-0 bg-slate-900/50 backdrop-blur sticky top-0 z-10">
              <div className="flex items-center gap-1">
                <button className={cn(
                  "w-9 h-9 rounded-lg flex items-center justify-center transition-colors",
                  selectedNote.isPinned ? "bg-orange-500/10 text-orange-400" : "text-slate-400 hover:bg-slate-800 hover:text-white"
                )}>
                  <Pin size={18} fill={selectedNote.isPinned ? "currentColor" : "none"} />
                </button>
                <div className="relative">
                  <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                  >
                    <MoreVertical size={18} />
                  </button>
                  {isMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-slate-800 border border-slate-700 rounded-xl shadow-xl py-1 z-50 overflow-hidden">
                      <button className="w-full text-left px-4 py-2 text-sm text-slate-200 hover:bg-slate-700 hover:text-white flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-indigo-400" /> Convert to task
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-slate-200 hover:bg-slate-700 hover:text-white flex items-center gap-2">
                        <Plus size={16} className="text-slate-400" /> Link to task
                      </button>
                      <div className="h-px bg-slate-700 my-1 mx-2" />
                      <button className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2">
                        <Tag size={16} /> Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="max-w-3xl mx-auto px-10 py-12 space-y-6">
                
                <input 
                  type="text" 
                  defaultValue={selectedNote.title} 
                  className="w-full bg-transparent border-b border-transparent hover:border-slate-800 focus:border-slate-700 pb-2 text-4xl font-bold text-white focus:outline-none transition-colors"
                  placeholder="Note Title"
                />

                <div className="flex gap-3 flex-wrap">
                  {selectedNote.folder && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-purple-500/20 bg-purple-500/10 text-purple-400 text-xs font-medium cursor-pointer hover:bg-purple-500/20 transition-colors">
                      <Folder size={14} /> {selectedNote.folder} <X size={12} className="ml-1 hover:text-purple-300" />
                    </span>
                  )}
                  {selectedNote.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-medium cursor-pointer hover:bg-emerald-500/20 transition-colors">
                      <Tag size={14} /> {tag} <X size={12} className="ml-1 hover:text-emerald-300" />
                    </span>
                  ))}
                  <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-dashed border-slate-700 text-slate-500 text-xs font-medium hover:border-slate-500 hover:text-slate-300 transition-colors">
                    <Plus size={14} /> Add label
                  </button>
                </div>

                <div className="pt-6 relative group">
                  <div className="absolute -left-4 top-6 bottom-0 w-1 bg-slate-800 rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity" />
                  <textarea 
                    defaultValue={selectedNote.content} 
                    className="w-full bg-transparent text-slate-300 text-base leading-loose resize-none focus:outline-none min-h-[500px]"
                    placeholder="Start writing..."
                  />
                </div>

              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-500">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center mb-4 border border-slate-800">
              <FileText size={32} className="text-slate-700" />
            </div>
            <p className="text-lg font-medium text-slate-400">Select a note to start writing</p>
          </div>
        )}

        <button className="absolute bottom-8 right-8 w-14 h-14 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/20 transition-transform hover:scale-105 active:scale-95 z-50">
          <Plus size={24} />
        </button>
      </div>
    </div>
  );
}
