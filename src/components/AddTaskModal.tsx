import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: { title: string; subtitle: string; due: string; deadline?: Date }) => void;
}

export const AddTaskModal = ({ isOpen, onClose, onAddTask }: AddTaskModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState<Date>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim() || !deadline) {
      toast.error("Please fill in all fields");
      return;
    }

    const now = new Date();
    const daysUntil = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    let dueText = "";
    
    if (daysUntil < 0) {
      dueText = "Overdue";
    } else if (daysUntil === 0) {
      dueText = "Due today";
    } else if (daysUntil === 1) {
      dueText = "Due tomorrow";
    } else if (daysUntil <= 7) {
      dueText = `Due in ${daysUntil} days`;
    } else if (daysUntil <= 30) {
      const weeks = Math.floor(daysUntil / 7);
      dueText = `Due in ${weeks} ${weeks === 1 ? "week" : "weeks"}`;
    } else {
      const months = Math.floor(daysUntil / 30);
      dueText = `Due in ${months} ${months === 1 ? "month" : "months"}`;
    }

    onAddTask({
      title: title.trim(),
      subtitle: description.trim(),
      due: dueText,
      deadline
    });

    // Reset form
    setTitle("");
    setDescription("");
    setDeadline(undefined);
    toast.success("Task added successfully");
    onClose();
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setDeadline(undefined);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-[hsl(var(--surface))] border-[hsl(var(--stroke))] max-w-md">
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
            <Label htmlFor="taskDeadline" className="text-[hsl(var(--text-body))]">
              Deadline Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  id="taskDeadline"
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-md border border-[hsl(var(--stroke))] bg-[hsl(var(--surface-elevated))] text-left text-sm transition-all duration-200 hover:bg-[hsl(var(--surface))]",
                    !deadline && "text-[hsl(var(--text-muted))]"
                  )}
                >
                  {deadline ? format(deadline, "PPP") : <span>Pick a date</span>}
                  <CalendarIcon className="w-4 h-4 text-[hsl(var(--text-muted))]" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={deadline}
                  onSelect={setDeadline}
                  initialFocus
                  className="p-3 pointer-events-auto"
                  disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                />
              </PopoverContent>
            </Popover>
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
