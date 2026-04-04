import { CheckCircle2, FileText, Calendar, Flame, Folder, MapPin } from "lucide-react";
import { Card, CardHeader, CardContent } from "../fluent/Card";
import { cn } from "../../../lib/utils";

export function WidgetsGrid() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto w-full pb-10">
      {/* Left Column */}
      <div className="flex flex-col gap-6">
        {/* Today's Tasks */}
        <Card>
          <CardHeader title="Today's Tasks" icon={CheckCircle2} action="View all" />
          <CardContent className="flex flex-col items-center justify-center py-10 opacity-70">
            <div className="w-12 h-12 bg-[#1A1F2D] border border-white/5 rounded-2xl flex items-center justify-center mb-4 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
              <CheckCircle2 className="w-5 h-5 text-slate-400" />
            </div>
            <p className="text-sm text-slate-300 font-medium">No tasks for today</p>
            <p className="text-xs text-slate-500 mt-1">Tap + to add a task.</p>
          </CardContent>
        </Card>

        {/* Upcoming */}
        <Card>
          <CardHeader title="Upcoming" icon={Calendar} action="View all" />
          <CardContent className="flex flex-col gap-3">
            <TaskItem
              time="6:00 PM"
              date="Today"
              title="Trip Planning"
              desc="Book accommodation and map out day activities."
              checked={true}
            />
            <TaskItem
              time="8:00 PM"
              date="Tomorrow"
              title="Online Course Deep Dive"
              desc="Work through module 3 and apply one new concept at work."
            />
          </CardContent>
        </Card>
      </div>

      {/* Right Column */}
      <div className="flex flex-col gap-6">
        {/* Recent Notes */}
        <Card>
          <CardHeader title="Recent Notes" icon={FileText} action="View all" />
          <CardContent className="flex flex-col gap-3">
            <NoteItem
              title="Goals for This Quarter"
              subtitle="Yesterday • Empty note"
              tagColor="emerald"
              tagLabel="Goals"
            />
            <NoteItem
              title="Office Declutter Notes"
              subtitle="Yesterday • Empty note"
              tagColor="amber"
              tagLabel="Home"
            />
            <NoteItem
              title="Mountain Trip Packing List"
              subtitle="Yesterday • Empty note"
              tagColor="blue"
              tagLabel="Travel"
            />
          </CardContent>
        </Card>

        {/* Habit Streaks */}
        <Card>
          <CardHeader title="Habit Streaks" icon={Flame} />
          <CardContent className="flex flex-col items-center justify-center py-8">
            <div className="w-12 h-12 bg-[#1A1F2D] border border-white/5 rounded-2xl flex items-center justify-center shadow-[0_4px_20px_rgba(255,255,255,0.02)]">
              <Flame className="w-5 h-5 text-slate-400" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Subcomponents

function TaskItem({
  time,
  date,
  title,
  desc,
  checked = false,
}: {
  time: string;
  date: string;
  title: string;
  desc: string;
  checked?: boolean;
}) {
  return (
    <div className="group flex gap-4 p-4 rounded-[14px] bg-[#1A1F2D]/50 hover:bg-[#1A1F2D] border border-white/5 transition-all duration-300 cursor-pointer relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative z-10 flex flex-col items-end shrink-0 w-16 pt-1">
        <span className="text-xs font-bold text-slate-200">{time}</span>
        <span className="text-[10px] text-slate-500 uppercase tracking-wider">{date}</span>
      </div>
      <div className="relative z-10 flex-1 flex flex-col pr-6">
        <h4 className="text-[15px] font-semibold text-slate-100 mb-1">{title}</h4>
        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{desc}</p>
      </div>
      <div className="relative z-10 shrink-0 pt-1 flex justify-center items-start w-6">
        <div
          className={cn(
            "w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center transition-colors",
            checked
              ? "bg-indigo-500 border-indigo-500 text-white"
              : "border-slate-600 group-hover:border-indigo-400 text-transparent"
          )}
        >
          {checked && <CheckCircle2 className="w-3 h-3" strokeWidth={3} />}
        </div>
      </div>
    </div>
  );
}

function NoteItem({
  title,
  subtitle,
  tagColor,
  tagLabel,
}: {
  title: string;
  subtitle: string;
  tagColor: "emerald" | "amber" | "blue";
  tagLabel: string;
}) {
  const bgStyles = {
    emerald: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    amber: "bg-amber-500/10 border-amber-500/20 text-amber-400",
    blue: "bg-blue-500/10 border-blue-500/20 text-blue-400",
  };

  const iconColors = {
    emerald: "text-emerald-500",
    amber: "text-amber-500",
    blue: "text-blue-500",
  };

  return (
    <div className="group flex gap-4 p-4 rounded-[14px] bg-[#1A1F2D]/50 hover:bg-[#1A1F2D] border border-white/5 transition-all duration-300 cursor-pointer relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-10 w-10 h-10 rounded-[10px] bg-[#151924] border border-white/5 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
        <FileText className="w-4 h-4 text-orange-400" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col">
        <h4 className="text-[15px] font-semibold text-slate-100 mb-0.5">{title}</h4>
        <p className="text-xs text-slate-500 mb-2.5">{subtitle}</p>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "px-2.5 py-1 rounded-[6px] text-[11px] font-bold tracking-wide flex items-center gap-1.5 border shadow-[0_0_10px_rgba(0,0,0,0.2)]",
              bgStyles[tagColor]
            )}
          >
            {tagColor === "emerald" && <Folder className={cn("w-3 h-3", iconColors.emerald)} />}
            {tagColor === "amber" && <Folder className={cn("w-3 h-3", iconColors.amber)} />}
            {tagColor === "blue" && <Folder className={cn("w-3 h-3", iconColors.blue)} />}
            {tagLabel}
          </span>
          <span className="px-2 py-1 rounded-[6px] text-[10px] font-bold tracking-wider text-slate-400 bg-white/5 border border-white/5">
            +1
          </span>
        </div>
      </div>
    </div>
  );
}
