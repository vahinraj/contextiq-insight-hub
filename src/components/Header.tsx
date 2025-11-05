import { Plus } from "lucide-react";

interface Person {
  name: string;
  avatar: string;
}

interface HeaderProps {
  projectName: string;
  people: Person[];
  moreCount: number;
  onMemberClick: () => void;
}

export const Header = ({ projectName, people, moreCount, onMemberClick }: HeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 stagger-fade-in" style={{ animationDelay: '0.1s' }}>
      <h1 className="text-[32px] sm:text-[36px] font-bold text-[hsl(var(--text-primary))]">
        {projectName}
      </h1>

      <div className="flex items-center gap-3">
        {/* Stacked Avatars */}
        <div className="flex items-center -space-x-3">
          {people.map((person, idx) => (
            <div
              key={idx}
              className="w-8 h-8 rounded-full bg-[hsl(var(--accent-teal))] border-2 border-[hsl(var(--page-bg))] flex items-center justify-center text-[hsl(var(--accent-teal-fg))] text-xs font-semibold hover:z-10 hover:scale-110 transition-all cursor-pointer"
              title={person.name}
            >
              {person.name.charAt(0)}
            </div>
          ))}
          <div className="w-8 h-8 rounded-full bg-[hsl(var(--surface-elevated))] border-2 border-[hsl(var(--page-bg))] flex items-center justify-center text-[hsl(var(--text-muted))] text-xs font-semibold">
            +{moreCount}
          </div>
        </div>

        {/* Add Member Button */}
        <button
          onClick={onMemberClick}
          className="h-9 px-5 rounded-full bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--stroke))] text-[hsl(var(--text-body))] text-sm font-medium hover:bg-[hsl(var(--accent-teal))] hover:text-[hsl(var(--accent-teal-fg))] hover:border-[hsl(var(--accent-teal))] transition-all duration-200 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Member
        </button>
      </div>
    </div>
  );
};
