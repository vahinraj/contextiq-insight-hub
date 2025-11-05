import { Home, LayoutDashboard, X } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-[280px] bg-[hsl(var(--sidebar-bg))] border-r border-[hsl(var(--stroke))] p-0">
        <div className="flex flex-col h-full py-6">
          {/* Header with Close Button */}
          <div className="px-6 mb-8 flex items-center justify-between">
            <h2 className="text-[hsl(var(--text-primary))] font-semibold text-lg tracking-tight">
              ContextIQ
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[hsl(var(--surface-elevated))] rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-[hsl(var(--text-muted))]" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[hsl(var(--text-primary))] hover:bg-[hsl(var(--surface-elevated))] transition-all duration-200">
              <Home className="w-5 h-5" />
              <span className="font-medium">Home</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-[hsl(var(--sidebar-active))] text-[hsl(var(--text-primary))] shadow-[0_0_24px_hsl(var(--accent-teal)/0.1)] transition-all duration-200">
              <LayoutDashboard className="w-5 h-5" />
              <span className="font-medium">Dashboard</span>
            </button>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};
