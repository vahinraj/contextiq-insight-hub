import { TrendingUp, TrendingDown } from "lucide-react";

interface KPICardProps {
  label: string;
  value: number;
  delta: string;
  state: "up" | "down-warn" | "down-danger";
  delay?: number;
}

export const KPICard = ({ label, value, delta, state, delay = 0 }: KPICardProps) => {
  const getDeltaColor = () => {
    if (state === "up") return "text-[hsl(var(--success))]";
    if (state === "down-warn") return "text-[hsl(var(--warning))]";
    return "text-[hsl(var(--danger))]";
  };

  const isPositive = state === "up";

  return (
    <div 
      className="glass-card p-5 flex flex-col h-[92px] hover:scale-[1.01] transition-all duration-200 stagger-fade-in"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-start justify-between mb-2">
        <span className="text-xs text-[hsl(var(--text-muted))] font-medium uppercase tracking-wide">
          {label}
        </span>
        <div className={`flex items-center gap-1 text-xs font-semibold ${getDeltaColor()}`}>
          {isPositive ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          {delta}
        </div>
      </div>

      <div className="text-[32px] font-bold text-[hsl(var(--text-primary))] leading-none">
        {value}
      </div>
    </div>
  );
};
