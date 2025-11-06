import { MoreVertical, User, Menu } from "lucide-react";

interface TopBarProps {
  onMenuClick: () => void;
}

export const TopBar = ({ onMenuClick }: TopBarProps) => {
  return (
    <div className="fixed top-0 left-0 right-0 h-12 bg-[hsl(var(--surface))] border-b border-[hsl(var(--stroke))] flex items-center justify-between px-6 z-40">
      {/* Hamburger Menu */}
      <button 
        onClick={onMenuClick}
        className="p-2 hover:bg-[hsl(var(--surface-elevated))] rounded-lg transition-colors"
      >
        <Menu className="w-5 h-5 text-[hsl(var(--text-primary))]" />
      </button>

      {/* Centered Logo */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <h1 className="text-[hsl(var(--text-primary))] font-semibold text-sm tracking-tight">
          WisdomAI
        </h1>
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
