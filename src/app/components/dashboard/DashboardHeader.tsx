export function DashboardHeader() {
  return (
    <div className="flex flex-col gap-2 max-w-5xl mx-auto w-full pt-10 pb-6">
      <h1 className="text-[32px] font-bold text-white tracking-tight">
        Welcome back, Alex.
      </h1>
      <p className="text-[15px] text-[#8F95A3]">
        Today is Tuesday, Oct 24th. You have <span className="text-indigo-400 font-medium">4 high-priority tasks</span> remaining.
      </p>
    </div>
  );
}
