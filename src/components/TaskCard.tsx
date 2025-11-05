import { Eye } from "lucide-react";

interface TaskCardProps {
  title: string;
  subtitle: string;
  due: string;
}

export const TaskCard = ({ title, subtitle, due }: TaskCardProps) => {
  return (
    <div className="glass-card p-4 flex items-center justify-between hover:bg-[hsl(var(--surface-elevated))] transition-all duration-200 group">
      <div className="flex flex-col gap-1">
        <h3 className="text-[15px] font-semibold text-[hsl(var(--text-primary))]">
          {title}
        </h3>
        <p className="text-sm text-[hsl(var(--text-muted))]">
          {subtitle}
        </p>
        <p className="text-xs text-[hsl(var(--text-muted))] mt-1">
          • {due}
        </p>
      </div>

      <button 
        className="w-9 h-9 rounded-full bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--stroke))] flex items-center justify-center hover:bg-[hsl(var(--accent-teal))] hover:border-[hsl(var(--accent-teal))] transition-all duration-200 opacity-0 group-hover:opacity-100"
        title="Preview"
      >
        <Eye className="w-4 h-4 text-[hsl(var(--text-body))] group-hover:text-[hsl(var(--accent-teal-fg))]" />
      </button>
    </div>
  );
};
