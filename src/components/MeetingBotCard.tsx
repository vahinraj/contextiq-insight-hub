import { useState } from "react";
import { Video, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const MeetingBotCard = () => {
  const [meetingLink, setMeetingLink] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProceed = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!meetingLink.trim()) {
      toast.error("Please enter a meeting link");
      return;
    }

    // Basic validation for meeting links
    const isMeetLink = meetingLink.includes("meet.google.com") || 
                       meetingLink.includes("zoom.us") || 
                       meetingLink.includes("teams.microsoft.com");
    
    if (!isMeetLink) {
      toast.error("Please enter a valid Google Meet, Zoom, or Microsoft Teams link");
      return;
    }

    setIsProcessing(true);
    
    // Simulate backend processing
    setTimeout(() => {
      toast.success("Bot will join the meeting soon and capture insights!", {
        description: "Meeting data will be added to your knowledge base automatically.",
        duration: 5000,
      });
      setMeetingLink("");
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="glass-card p-8 stagger-fade-in" style={{ animationDelay: '0.9s' }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-[hsl(var(--accent-teal)/0.1)] flex items-center justify-center">
          <Video className="w-5 h-5 text-[hsl(var(--accent-teal))]" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-[hsl(var(--text-primary))]">
            Meeting Bot
          </h2>
          <p className="text-sm text-[hsl(var(--text-muted))]">
            Auto-capture meeting insights
          </p>
        </div>
      </div>

      <form onSubmit={handleProceed} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="meetingLink" className="text-[hsl(var(--text-body))]">
            Meeting Link
          </Label>
          <Input
            id="meetingLink"
            type="url"
            value={meetingLink}
            onChange={(e) => setMeetingLink(e.target.value)}
            placeholder="https://meet.google.com/xxx-xxxx-xxx"
            disabled={isProcessing}
            className="bg-[hsl(var(--surface-elevated))] border-[hsl(var(--stroke))] text-[hsl(var(--text-primary))] placeholder:text-[hsl(var(--text-muted))]"
          />
        </div>

        <button
          type="submit"
          disabled={isProcessing || !meetingLink.trim()}
          className="w-full px-6 py-3 rounded-full bg-[hsl(var(--accent-teal))] text-[hsl(var(--accent-teal-fg))] font-semibold hover:scale-[1.02] hover:shadow-[0_12px_32px_hsl(var(--accent-teal)/0.3)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Proceed"
          )}
        </button>
      </form>

      <p className="text-xs text-[hsl(var(--text-muted))] mt-4 text-center">
        Supports Google Meet, Zoom, and Microsoft Teams
      </p>
    </div>
  );
};