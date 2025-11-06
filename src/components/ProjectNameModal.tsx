import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProjectNameModalProps {
  isOpen: boolean;
  onSubmit: (name: string) => void;
}

export const ProjectNameModal = ({ isOpen, onSubmit }: ProjectNameModalProps) => {
  const [projectName, setProjectName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (projectName.trim()) {
      onSubmit(projectName.trim());
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent 
        className="bg-[hsl(var(--surface))] border-[hsl(var(--stroke))] max-w-md"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[hsl(var(--text-primary))]">
            Welcome to WisdomAI
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="projectName" className="text-[hsl(var(--text-body))]">
              Enter your project name
            </Label>
            <Input
              id="projectName"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="My Awesome Project"
              className="bg-[hsl(var(--surface-elevated))] border-[hsl(var(--stroke))] text-[hsl(var(--text-primary))] placeholder:text-[hsl(var(--text-muted))]"
              autoFocus
            />
          </div>
          <button
            type="submit"
            disabled={!projectName.trim()}
            className="w-full px-6 py-3 rounded-full bg-[hsl(var(--accent-teal))] text-[hsl(var(--accent-teal-fg))] font-semibold hover:scale-[1.02] hover:shadow-[0_12px_32px_hsl(var(--accent-teal)/0.3)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Get Started
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
