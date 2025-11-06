import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Github } from "lucide-react";
import { toast } from "sonner";

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InviteMemberModal = ({ isOpen, onClose }: InviteMemberModalProps) => {
  const [email, setEmail] = useState("");
  const [githubUsername, setGithubUsername] = useState("");

  const handleEmailInvite = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error("Please enter an email address");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    toast.success(`Invitation sent to ${email}`);
    setEmail("");
    onClose();
  };

  const handleGithubInvite = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!githubUsername.trim()) {
      toast.error("Please enter a GitHub username");
      return;
    }

    toast.success(`Invitation sent to @${githubUsername}`);
    setGithubUsername("");
    onClose();
  };

  const handleClose = () => {
    setEmail("");
    setGithubUsername("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-[hsl(var(--surface))] border-[hsl(var(--stroke))] max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[hsl(var(--text-primary))]">
            Invite Team Member
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="email" className="mt-4">
          <TabsList className="grid w-full grid-cols-2 bg-[hsl(var(--surface-elevated))]">
            <TabsTrigger value="email" className="data-[state=active]:bg-[hsl(var(--accent-teal))] data-[state=active]:text-[hsl(var(--accent-teal-fg))]">
              <Mail className="w-4 h-4 mr-2" />
              Email
            </TabsTrigger>
            <TabsTrigger value="github" className="data-[state=active]:bg-[hsl(var(--accent-teal))] data-[state=active]:text-[hsl(var(--accent-teal-fg))]">
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </TabsTrigger>
          </TabsList>

          <TabsContent value="email">
            <form onSubmit={handleEmailInvite} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[hsl(var(--text-body))]">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="colleague@example.com"
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
                  Send Invite
                </button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="github">
            <form onSubmit={handleGithubInvite} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="github" className="text-[hsl(var(--text-body))]">
                  GitHub Username
                </Label>
                <Input
                  id="github"
                  value={githubUsername}
                  onChange={(e) => setGithubUsername(e.target.value)}
                  placeholder="octocat"
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
                  Send Invite
                </button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};