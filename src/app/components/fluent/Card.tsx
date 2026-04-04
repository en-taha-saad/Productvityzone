import { ReactNode } from "react";
import { cn } from "../../../lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[18px] bg-[#121622] border border-white/5 shadow-sm overflow-hidden",
        "backdrop-blur-xl transition-all duration-300",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none rounded-[18px]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function CardHeader({
  className,
  title,
  icon: Icon,
  action,
}: {
  className?: string;
  title: string;
  icon?: any;
  action?: ReactNode;
}) {
  return (
    <div className={cn("flex items-center justify-between px-5 pt-5 pb-3", className)}>
      <div className="flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-slate-400" />}
        <h3 className="font-semibold text-slate-100 text-[15px] tracking-wide">{title}</h3>
      </div>
      {action && <div className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer">{action}</div>}
    </div>
  );
}

export function CardContent({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("px-5 pb-5", className)}>{children}</div>;
}
