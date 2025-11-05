import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { toast } from "sonner";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: { title: string; subtitle: string; due: string }) => void;
}

export const AddTaskModal = ({ isOpen, onClose, onAddTask }: AddTaskModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueTime, setDueTime] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim() || !dueTime.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    onAddTask({
      title: title.trim(),
      subtitle: description.trim(),
      due: `Due in ${dueTime.trim()}`
    });

    // Reset form
    setTitle("");
    setDescription("");
    setDueTime("");
    toast.success("Task added successfully");
    onClose();
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setDueTime("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-[hsl(var(--surface))] border-[hsl(var(--stroke))] max-w-md">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-full p-2 hover:bg-[hsl(var(--surface-elevated))] transition-colors"
        >
          <X className="h-4 w-4 text-[hsl(var(--text-muted))]" />
        </button>
        
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[hsl(var(--text-primary))]">
            Add New Task
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="space-y-2">
            <Label htmlFor="taskTitle" className="text-[hsl(var(--text-body))]">
              Task Title
            </Label>
            <Input
              id="taskTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Web Mockup"
              className="bg-[hsl(var(--surface-elevated))] border-[hsl(var(--stroke))] text-[hsl(var(--text-primary))] placeholder:text-[hsl(var(--text-muted))]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="taskDescription" className="text-[hsl(var(--text-body))]">
              Description
            </Label>
            <Textarea
              id="taskDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Yellow Branding"
              rows={3}
              className="bg-[hsl(var(--surface-elevated))] border-[hsl(var(--stroke))] text-[hsl(var(--text-primary))] placeholder:text-[hsl(var(--text-muted))] resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="taskDue" className="text-[hsl(var(--text-body))]">
              Time to Complete
            </Label>
            <Input
              id="taskDue"
              value={dueTime}
              onChange={(e) => setDueTime(e.target.value)}
              placeholder="e.g., 3 days, 1 week, 20 hours"
              className="bg-[hsl(var(--surface-elevated))] border-[hsl(var(--stroke))] text-[hsl(var(--text-primary))] placeholder:text-[hsl(var(--text-muted))]"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-6 py-3 rounded-full bg-transparent border border-[hsl(var(--stroke))] text-[hsl(var(--text-body))] font-semibold hover:bg-[hsl(var(--surface-elevated))] transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 rounded-full bg-[hsl(var(--accent-teal))] text-[hsl(var(--accent-teal-fg))] font-semibold hover:scale-[1.02] hover:shadow-[0_12px_32px_hsl(var(--accent-teal)/0.3)] transition-all duration-200"
            >
              Add Task
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
