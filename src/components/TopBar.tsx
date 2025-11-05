import { MoreVertical, User } from "lucide-react";

export const TopBar = () => {
  return (
    <div className="fixed top-0 left-[72px] right-0 h-12 bg-[hsl(var(--surface))] border-b border-[hsl(var(--stroke))] flex items-center justify-between px-6 z-40">
      {/* macOS Dots */}
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-[#EF4444]"></div>
        <div className="w-3 h-3 rounded-full bg-[#F59E0B]"></div>
        <div className="w-3 h-3 rounded-full bg-[#22C55E]"></div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        <button className="p-2 hover:bg-[hsl(var(--surface-elevated))] rounded-lg transition-colors">
          <MoreVertical className="w-4 h-4 text-[hsl(var(--text-muted))]" />
        </button>
        <div className="w-8 h-8 rounded-full bg-[hsl(var(--accent-teal))] flex items-center justify-center">
          <User className="w-4 h-4 text-[hsl(var(--accent-teal-fg))]" />
        </div>
      </div>
    </div>
  );
};
