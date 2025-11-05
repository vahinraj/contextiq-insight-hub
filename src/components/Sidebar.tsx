import { LayoutDashboard, LogOut } from "lucide-react";
import { useState } from "react";

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-[hsl(var(--sidebar-bg))] border-r border-[hsl(var(--stroke))] transition-all duration-300 z-50 ${
        isCollapsed ? "w-14" : "w-[72px]"
      }`}
    >
      <div className="flex flex-col h-full py-6">
        {/* Logo */}
        <div className="px-4 mb-8">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-[hsl(var(--text-primary))] font-semibold text-sm tracking-tight hover:opacity-80 transition-opacity"
          >
            {isCollapsed ? "C" : "ContextIQ"}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3">
          <div className="relative">
            <button className="w-full flex items-center justify-center gap-3 px-3 py-3 rounded-full bg-[hsl(var(--sidebar-active))] text-[hsl(var(--text-primary))] shadow-[0_0_24px_hsl(var(--accent-teal)/0.1)] transition-all duration-200 hover:scale-[1.02]">
              <LayoutDashboard className="w-5 h-5" />
            </button>
          </div>
        </nav>

        {/* Logout */}
        <div className="px-3">
          <button className="w-full flex items-center justify-center gap-3 px-3 py-3 rounded-full text-[hsl(var(--text-muted))] hover:text-[hsl(var(--text-primary))] hover:bg-[hsl(var(--surface))] transition-all duration-200 group">
            <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </aside>
  );
};
