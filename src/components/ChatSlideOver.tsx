import { X, Send } from "lucide-react";
import { useState } from "react";

interface ChatSlideOverProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatSlideOver = ({ isOpen, onClose }: ChatSlideOverProps) => {
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 animate-fade-in"
        onClick={onClose}
      />

      {/* Slide Over */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-[480px] bg-[hsl(var(--surface))] border-l border-[hsl(var(--stroke))] z-50 animate-slide-in-right shadow-[0_0_80px_hsl(var(--page-bg)/0.8)]">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[hsl(var(--stroke))]">
            <h2 className="text-xl font-bold text-[hsl(var(--text-primary))]">
              Context Chat
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[hsl(var(--surface-elevated))] rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-[hsl(var(--text-muted))]" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            <div className="flex justify-start">
              <div className="glass-card p-4 max-w-[80%]">
                <p className="text-sm text-[hsl(var(--text-body))]">
                  Hi! I'm your Context AI assistant. I can help you understand recent decisions, task ownership, and project context.
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <div className="glass-card-elevated p-4 max-w-[80%] bg-[hsl(var(--accent-teal))]">
                <p className="text-sm text-[hsl(var(--accent-teal-fg))]">
                  What tasks are overdue?
                </p>
              </div>
            </div>

            <div className="flex justify-start">
              <div className="glass-card p-4 max-w-[80%]">
                <p className="text-sm text-[hsl(var(--text-body))]">
                  You currently have 3 overdue tasks. The "Web Mockup" task is the most urgent, due 20 hours ago.
                </p>
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="p-6 border-t border-[hsl(var(--stroke))]">
            <div className="flex gap-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about recent decisions, tasks, or owners…"
                className="flex-1 px-4 py-3 rounded-xl bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--stroke))] text-[hsl(var(--text-body))] placeholder:text-[hsl(var(--text-muted))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent-teal))] transition-all"
              />
              <button className="px-5 py-3 rounded-xl bg-[hsl(var(--accent-teal))] text-[hsl(var(--accent-teal-fg))] font-semibold hover:scale-[1.02] hover:shadow-[0_8px_24px_hsl(var(--accent-teal)/0.3)] transition-all duration-200">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
