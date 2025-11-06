import { useState, useEffect } from "react";
import { ArrowLeft, Trash2, Calendar, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Memory {
  id: string;
  title: string;
  content: string;
  source: "meeting" | "chat";
  date: string;
  participants?: string[];
}

const ManageMemory = () => {
  const navigate = useNavigate();
  const [memories, setMemories] = useState<Memory[]>([]);

  useEffect(() => {
    const savedMemories = localStorage.getItem("memories");
    if (savedMemories) {
      setMemories(JSON.parse(savedMemories));
    }
  }, []);

  const handleDeleteMemory = (id: string) => {
    const updatedMemories = memories.filter(memory => memory.id !== id);
    setMemories(updatedMemories);
    localStorage.setItem("memories", JSON.stringify(updatedMemories));
    toast.success("Memory deleted!");
  };

  return (
    <div className="min-h-screen w-full bg-[hsl(var(--page-bg))]">
      {/* Header */}
      <header className="border-b border-[hsl(var(--stroke))] bg-[hsl(var(--surface))]">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="w-10 h-10 rounded-full bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--stroke))] flex items-center justify-center hover:bg-[hsl(var(--accent-teal))] hover:border-[hsl(var(--accent-teal))] transition-all duration-200 group"
              title="Back to Dashboard"
            >
              <ArrowLeft className="w-5 h-5 text-[hsl(var(--text-body))] group-hover:text-[hsl(var(--accent-teal-fg))]" />
            </button>
            <h1 className="text-2xl font-bold text-[hsl(var(--text-primary))]">
              Manage Memory
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <p className="text-[hsl(var(--text-body))] text-sm">
            View and manage all memories from meetings and chats. These structured memories help maintain context across conversations.
          </p>
        </div>

        {/* Memories List */}
        {memories.length === 0 ? (
          <div className="glass-card p-12 flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-16 h-16 rounded-full bg-[hsl(var(--surface-elevated))] flex items-center justify-center mb-4">
              <Calendar className="w-8 h-8 text-[hsl(var(--text-muted))]" />
            </div>
            <h2 className="text-lg font-semibold text-[hsl(var(--text-primary))] mb-2">
              No memories yet
            </h2>
            <p className="text-[hsl(var(--text-muted))] text-center max-w-md">
              Memories from meetings and chats will appear here. Add memories from the dashboard or let the meeting bot create them automatically.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {memories.map((memory) => (
              <div
                key={memory.id}
                className="glass-card p-6 hover:bg-[hsl(var(--surface-elevated))] transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-[hsl(var(--text-primary))]">
                        {memory.title}
                      </h3>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-[hsl(var(--accent-teal)/0.1)] text-[hsl(var(--accent-teal))] border border-[hsl(var(--accent-teal)/0.2)]">
                        {memory.source}
                      </span>
                    </div>
                    
                    <p className="text-[hsl(var(--text-body))] mb-4 leading-relaxed">
                      {memory.content}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-[hsl(var(--text-muted))]">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(memory.date).toLocaleDateString()}</span>
                      </div>
                      {memory.participants && memory.participants.length > 0 && (
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{memory.participants.join(", ")}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteMemory(memory.id)}
                    className="w-9 h-9 rounded-full bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--stroke))] flex items-center justify-center hover:bg-[hsl(var(--danger))] hover:border-[hsl(var(--danger))] transition-all duration-200 group shrink-0"
                    title="Delete memory"
                  >
                    <Trash2 className="w-4 h-4 text-[hsl(var(--text-body))] group-hover:text-[hsl(var(--text-primary))]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ManageMemory;
