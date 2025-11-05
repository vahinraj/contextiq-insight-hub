import { X, Send } from "lucide-react";
import { useState } from "react";

interface ChatSlideOverProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  text: string;
  isUser: boolean;
}

export const ChatSlideOver = ({ isOpen, onClose }: ChatSlideOverProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi! I'm your Context AI assistant. I can help you understand recent decisions, task ownership, and project context.",
      isUser: false,
    },
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    
    setMessages([...messages, { text: message, isUser: true }]);
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

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
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
                <div className={`p-4 max-w-[80%] rounded-xl ${
                  msg.isUser 
                    ? "bg-[hsl(var(--accent-teal))] text-[hsl(var(--accent-teal-fg))]" 
                    : "glass-card text-[hsl(var(--text-body))]"
                }`}>
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-6 border-t border-[hsl(var(--stroke))]">
            <div className="flex gap-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about recent decisions, tasks, or owners…"
                className="flex-1 px-4 py-3 rounded-xl bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--stroke))] text-[hsl(var(--text-body))] placeholder:text-[hsl(var(--text-muted))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent-teal))] transition-all"
              />
              <button 
                onClick={handleSend}
                className="px-5 py-3 rounded-xl bg-[hsl(var(--accent-teal))] text-[hsl(var(--accent-teal-fg))] font-semibold hover:scale-[1.02] hover:shadow-[0_8px_24px_hsl(var(--accent-teal)/0.3)] transition-all duration-200"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
