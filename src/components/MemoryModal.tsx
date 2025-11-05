import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface MemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MemoryModal = ({ isOpen, onClose }: MemoryModalProps) => {
  const [memory, setMemory] = useState("");
  const [tags, setTags] = useState("");

  if (!isOpen) return null;

  const handleSave = () => {
    if (!memory.trim()) {
      toast.error("Please enter memory content before saving", {
        style: {
          background: "hsl(var(--surface-elevated))",
          color: "hsl(var(--text-primary))",
          border: "1px solid hsl(var(--stroke))",
        },
      });
      return;
    }
    toast.success("Memory added successfully!", {
      style: {
        background: "hsl(var(--surface-elevated))",
        color: "hsl(var(--text-primary))",
        border: "1px solid hsl(var(--stroke))",
      },
    });
    setMemory("");
    setTags("");
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-50 animate-scale-in">
        <div className="glass-card-elevated p-6 m-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[hsl(var(--text-primary))]">
              Add Memory
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[hsl(var(--surface))] rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-[hsl(var(--text-muted))]" />
            </button>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[hsl(var(--text-body))] mb-2">
                Memory Content
              </label>
              <textarea
                value={memory}
                onChange={(e) => setMemory(e.target.value)}
                rows={6}
                placeholder="Enter important project context, decisions, or notes..."
                className="w-full px-4 py-3 rounded-xl bg-[hsl(var(--surface))] border border-[hsl(var(--stroke))] text-[hsl(var(--text-body))] placeholder:text-[hsl(var(--text-muted))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent-teal))] transition-all resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[hsl(var(--text-body))] mb-2">
                Tags
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="e.g., design, backend, feature-request"
                className="w-full px-4 py-3 rounded-xl bg-[hsl(var(--surface))] border border-[hsl(var(--stroke))] text-[hsl(var(--text-body))] placeholder:text-[hsl(var(--text-muted))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent-teal))] transition-all"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 px-5 py-3 rounded-xl bg-[hsl(var(--surface))] border border-[hsl(var(--stroke))] text-[hsl(var(--text-body))] font-semibold hover:bg-[hsl(var(--surface-elevated))] transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-5 py-3 rounded-xl bg-[hsl(var(--accent-teal))] text-[hsl(var(--accent-teal-fg))] font-semibold hover:scale-[1.02] hover:shadow-[0_8px_24px_hsl(var(--accent-teal)/0.3)] transition-all duration-200"
            >
              Save Memory
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
