import { useState, useEffect } from "react";
import { MessageSquare, Plus, Filter } from "lucide-react";
import { toast } from "sonner";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { KPICard } from "@/components/KPICard";
import { TaskCard } from "@/components/TaskCard";
import { ChatSlideOver } from "@/components/ChatSlideOver";
import { MemoryModal } from "@/components/MemoryModal";
import { ProjectNameModal } from "@/components/ProjectNameModal";
import { AddTaskModal } from "@/components/AddTaskModal";
import { InviteMemberModal } from "@/components/InviteMemberModal";
import { MeetingBotCard } from "@/components/MeetingBotCard";

interface Task {
  id: string;
  title: string;
  subtitle: string;
  due: string;
  deadline?: Date;
}

type TaskFilter = "all" | "high" | "medium" | "low" | "date";

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMemoryOpen, setIsMemoryOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProjectNameModalOpen, setIsProjectNameModalOpen] = useState(true);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isInviteMemberModalOpen, setIsInviteMemberModalOpen] = useState(false);
  
  const [projectName, setProjectName] = useState("");
  const [projects, setProjects] = useState<string[]>([]);
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Web Mockup", subtitle: "Yellow Branding", due: "Due in 20 hours" },
    { id: "2", title: "Cart Landing Page", subtitle: "Cart UI/UX", due: "Due in 3 days" },
    { id: "3", title: "POS UI/UX", subtitle: "Resto Dashboard", due: "Due in 1 week" },
  ]);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [taskFilter, setTaskFilter] = useState<TaskFilter>("all");
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const people = [
    { name: "Ava", avatar: "" },
    { name: "Jon", avatar: "" },
    { name: "Mia", avatar: "" },
    { name: "Kai", avatar: "" },
  ];

  useEffect(() => {
    const savedProjectName = localStorage.getItem("projectName");
    const savedProjects = localStorage.getItem("projects");
    const savedTasks = localStorage.getItem("tasks");
    const savedCompletedTasks = localStorage.getItem("completedTasks");

    if (savedProjectName) {
      setProjectName(savedProjectName);
      setIsProjectNameModalOpen(false);
    }
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    if (savedCompletedTasks) {
      setCompletedTasks(parseInt(savedCompletedTasks));
    }
  }, []);

  const handleProjectNameSubmit = (name: string) => {
    setProjectName(name);
    const newProjects = [...projects, name];
    setProjects(newProjects);
    localStorage.setItem("projectName", name);
    localStorage.setItem("projects", JSON.stringify(newProjects));
    setIsProjectNameModalOpen(false);
    toast.success(`Project "${name}" created!`);
  };

  const handleAddTask = (newTask: { title: string; subtitle: string; due: string; deadline?: Date }) => {
    const taskWithId = { ...newTask, id: Date.now().toString() };
    const updatedTasks = [...tasks, taskWithId];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleCompleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    const newCompletedCount = completedTasks + 1;
    setCompletedTasks(newCompletedCount);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    localStorage.setItem("completedTasks", newCompletedCount.toString());
    toast.success("Task completed!");
  };

  const handleShowAll = () => {
    toast.success("All tasks loaded");
  };

  const getTaskPriority = (task: Task): "high" | "medium" | "low" => {
    if (!task.deadline) return "low";
    const now = new Date();
    const deadline = new Date(task.deadline);
    const daysUntil = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntil <= 2) return "high";
    if (daysUntil <= 7) return "medium";
    return "low";
  };

  const getFilteredTasks = () => {
    let filtered = [...tasks];
    
    if (taskFilter === "high" || taskFilter === "medium" || taskFilter === "low") {
      filtered = filtered.filter(task => getTaskPriority(task) === taskFilter);
    } else if (taskFilter === "date") {
      filtered.sort((a, b) => {
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      });
    }
    
    return filtered;
  };

  const filteredTasks = getFilteredTasks();

  const totalTasks = tasks.length + completedTasks;
  const assignedTasks = tasks.length;

  const kpis = [
    { label: "Total Projects", value: projects.length, delta: "+1", state: "up" as const },
    { label: "Total Tasks", value: totalTasks, delta: `+${tasks.length}`, state: "up" as const },
    { label: "Assigned Tasks", value: assignedTasks, delta: tasks.length > 0 ? `+${tasks.length}` : "0", state: tasks.length > 0 ? "up" as const : "down-warn" as const },
    { label: "Completed Tasks", value: completedTasks, delta: completedTasks > 0 ? `+${completedTasks}` : "0", state: completedTasks > 0 ? "up" as const : "down-warn" as const },
    { label: "Overdue Tasks", value: 0, delta: "0", state: "up" as const },
  ];

  return (
    <div className="min-h-screen w-full">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <TopBar onMenuClick={() => setIsSidebarOpen(true)} />

      {/* Main Content */}
      <main className="pt-12">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <Header
            projectName={projectName || "Project Name"}
            people={people}
            moreCount={4}
            onAddMember={() => setIsInviteMemberModalOpen(true)}
          />

          {/* KPI Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {kpis.map((kpi, idx) => (
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
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[hsl(var(--stroke))]">
                <h2 className="text-lg font-bold text-[hsl(var(--text-primary))]">
                  Assigned Tasks
                </h2>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <button
                      onClick={() => setShowFilterMenu(!showFilterMenu)}
                      className={`w-10 h-10 rounded-full border border-[hsl(var(--stroke))] flex items-center justify-center hover:bg-[hsl(var(--surface-elevated))] transition-all duration-200 ${
                        taskFilter !== "all" ? "bg-[hsl(var(--accent-teal)/0.1)] border-[hsl(var(--accent-teal))]" : "bg-transparent"
                      }`}
                      title="Filter tasks"
                    >
                      <Filter className={`w-4 h-4 ${taskFilter !== "all" ? "text-[hsl(var(--accent-teal))]" : "text-[hsl(var(--text-body))]"}`} />
                    </button>
                    
                    {showFilterMenu && (
                      <div className="absolute right-0 top-12 w-48 glass-card p-2 z-10 space-y-1">
                        <button
                          onClick={() => { setTaskFilter("all"); setShowFilterMenu(false); }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                            taskFilter === "all" ? "bg-[hsl(var(--surface-elevated))] text-[hsl(var(--text-primary))]" : "text-[hsl(var(--text-body))] hover:bg-[hsl(var(--surface-elevated))]"
                          }`}
                        >
                          All Tasks
                        </button>
                        <button
                          onClick={() => { setTaskFilter("high"); setShowFilterMenu(false); }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                            taskFilter === "high" ? "bg-[hsl(var(--surface-elevated))] text-[hsl(var(--text-primary))]" : "text-[hsl(var(--text-body))] hover:bg-[hsl(var(--surface-elevated))]"
                          }`}
                        >
                          High Priority
                        </button>
                        <button
                          onClick={() => { setTaskFilter("medium"); setShowFilterMenu(false); }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                            taskFilter === "medium" ? "bg-[hsl(var(--surface-elevated))] text-[hsl(var(--text-primary))]" : "text-[hsl(var(--text-body))] hover:bg-[hsl(var(--surface-elevated))]"
                          }`}
                        >
                          Medium Priority
                        </button>
                        <button
                          onClick={() => { setTaskFilter("low"); setShowFilterMenu(false); }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                            taskFilter === "low" ? "bg-[hsl(var(--surface-elevated))] text-[hsl(var(--text-primary))]" : "text-[hsl(var(--text-body))] hover:bg-[hsl(var(--surface-elevated))]"
                          }`}
                        >
                          Low Priority
                        </button>
                        <button
                          onClick={() => { setTaskFilter("date"); setShowFilterMenu(false); }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                            taskFilter === "date" ? "bg-[hsl(var(--surface-elevated))] text-[hsl(var(--text-primary))]" : "text-[hsl(var(--text-body))] hover:bg-[hsl(var(--surface-elevated))]"
                          }`}
                        >
                          Sort by Date
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={() => setIsAddTaskModalOpen(true)}
                    className="px-4 py-2 rounded-full bg-[hsl(var(--accent-teal))] text-[hsl(var(--accent-teal-fg))] text-sm font-semibold hover:scale-[1.02] hover:shadow-[0_8px_24px_hsl(var(--accent-teal)/0.3)] transition-all duration-200 flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Task
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {filteredTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    title={task.title}
                    subtitle={task.subtitle}
                    due={task.due}
                    deadline={task.deadline}
                    onComplete={() => handleCompleteTask(task.id)}
                  />
                ))}
                {filteredTasks.length === 0 && (
                  <p className="text-center text-[hsl(var(--text-muted))] py-8">
                    {taskFilter === "all" ? "No tasks yet. Click 'Add Task' to get started!" : "No tasks found with this filter."}
                  </p>
                )}
              </div>

              {tasks.length > 0 && (
                <button
                  onClick={handleShowAll}
                  className="w-full mt-6 px-5 py-3 rounded-xl bg-transparent border border-[hsl(var(--stroke))] text-[hsl(var(--text-body))] font-semibold hover:bg-[hsl(var(--surface-elevated))] transition-all duration-200"
                >
                  Show All
                </button>
              )}
            </div>

            {/* Right: Chat, Memory & Meeting Bot */}
            <div className="space-y-6">
              {/* Chat with WisdomAI */}
              <div className="glass-card p-8 flex flex-col items-center justify-center min-h-[240px] stagger-fade-in" style={{ animationDelay: '0.7s' }}>
                <h2 className="text-lg font-bold text-[hsl(var(--text-primary))] mb-6 text-center">
                  Chat with WisdomAI
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

              {/* Meeting Bot */}
              <MeetingBotCard />
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-12 text-center text-xs text-[hsl(var(--text-muted))]">
            © 2025 WisdomAI – Demo
          </footer>
        </div>
      </main>

      {/* Modals */}
      <ProjectNameModal 
        isOpen={isProjectNameModalOpen} 
        onSubmit={handleProjectNameSubmit} 
      />
      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
        onAddTask={handleAddTask}
      />
      <InviteMemberModal
        isOpen={isInviteMemberModalOpen}
        onClose={() => setIsInviteMemberModalOpen(false)}
      />
      <ChatSlideOver isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <MemoryModal isOpen={isMemoryOpen} onClose={() => setIsMemoryOpen(false)} />
    </div>
  );
};

export default Index;
