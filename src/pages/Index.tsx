import { useState } from "react";
import { MessageSquare, Plus } from "lucide-react";
import { toast } from "sonner";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { KPICard } from "@/components/KPICard";
import { TaskCard } from "@/components/TaskCard";
import { ChatSlideOver } from "@/components/ChatSlideOver";
import { MemoryModal } from "@/components/MemoryModal";

const demoData = {
  projectName: "Project Name",
  kpis: [
    { label: "Total Project", value: 7, delta: "+2", state: "up" as const },
    { label: "Total Tasks", value: 49, delta: "+4", state: "up" as const },
    { label: "Assigned Tasks", value: 12, delta: "-3", state: "down-warn" as const },
    { label: "Completed Tasks", value: 6, delta: "+1", state: "up" as const },
    { label: "Overdue Tasks", value: 3, delta: "-2", state: "down-danger" as const },
  ],
  tasks: [
    { title: "Web Mockup", subtitle: "Yellow Branding", due: "Due in 20 hours" },
    { title: "Cart Landing Page", subtitle: "Cart UI/UX", due: "Due in 3 days" },
    { title: "POS UI/UX", subtitle: "Resto Dashboard", due: "Due in 1 week" },
  ],
  people: [
    { name: "Ava", avatar: "" },
    { name: "Jon", avatar: "" },
    { name: "Mia", avatar: "" },
    { name: "Kai", avatar: "" },
  ],
  moreCount: 4,
};

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMemoryOpen, setIsMemoryOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleShowAll = () => {
    toast.success("All tasks loaded");
  };

  return (
    <div className="min-h-screen w-full">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <TopBar onMenuClick={() => setIsSidebarOpen(true)} />

      {/* Main Content */}
      <main className="pt-12">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <Header
            projectName={demoData.projectName}
            people={demoData.people}
            moreCount={demoData.moreCount}
          />

          {/* KPI Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {demoData.kpis.map((kpi, idx) => (
              <KPICard
                key={idx}
                label={kpi.label}
                value={kpi.value}
                delta={kpi.delta}
                state={kpi.state}
                delay={0.2 + idx * 0.08}
              />
            ))}
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[62%_38%] gap-6">
            {/* Left: Assigned Tasks */}
            <div className="glass-card p-6 stagger-fade-in" style={{ animationDelay: '0.6s' }}>
              <h2 className="text-lg font-bold text-[hsl(var(--text-primary))] mb-4 pb-3 border-b border-[hsl(var(--stroke))]">
                Assigned Tasks
              </h2>

              <div className="space-y-4">
                {demoData.tasks.map((task, idx) => (
                  <TaskCard
                    key={idx}
                    title={task.title}
                    subtitle={task.subtitle}
                    due={task.due}
                  />
                ))}
              </div>

              <button
                onClick={handleShowAll}
                className="w-full mt-6 px-5 py-3 rounded-xl bg-transparent border border-[hsl(var(--stroke))] text-[hsl(var(--text-body))] font-semibold hover:bg-[hsl(var(--surface-elevated))] transition-all duration-200"
              >
                Show All
              </button>
            </div>

            {/* Right: Chat & Memory */}
            <div className="space-y-6">
              {/* Chat with Context IQ */}
              <div className="glass-card p-8 flex flex-col items-center justify-center min-h-[240px] stagger-fade-in" style={{ animationDelay: '0.7s' }}>
                <h2 className="text-lg font-bold text-[hsl(var(--text-primary))] mb-6 text-center">
                  Chat with Context IQ
                </h2>
                <button
                  onClick={() => setIsChatOpen(true)}
                  className="px-8 py-4 rounded-full bg-[hsl(var(--accent-teal))] text-[hsl(var(--accent-teal-fg))] font-bold text-base hover:scale-[1.02] hover:shadow-[0_12px_32px_hsl(var(--accent-teal)/0.3)] transition-all duration-200 flex items-center gap-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  Message
                </button>
              </div>

              {/* Memory Management */}
              <div className="glass-card p-8 flex flex-col items-center justify-center min-h-[240px] stagger-fade-in" style={{ animationDelay: '0.8s' }}>
                <h2 className="text-lg font-bold text-[hsl(var(--text-primary))] mb-6 text-center">
                  Memory Management
                </h2>
                <button
                  onClick={() => setIsMemoryOpen(true)}
                  className="px-8 py-4 rounded-full bg-[hsl(var(--accent-teal))] text-[hsl(var(--accent-teal-fg))] font-bold text-base hover:scale-[1.02] hover:shadow-[0_12px_32px_hsl(var(--accent-teal)/0.3)] transition-all duration-200 flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add memory
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-12 text-center text-xs text-[hsl(var(--text-muted))]">
            © 2025 ContextIQ – Demo
          </footer>
        </div>
      </main>

      {/* Modals */}
      <ChatSlideOver isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <MemoryModal isOpen={isMemoryOpen} onClose={() => setIsMemoryOpen(false)} />
    </div>
  );
};

export default Index;
