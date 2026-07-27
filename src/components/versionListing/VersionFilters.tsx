import type { Project } from "@/types/project";
import type { ReleaseType } from "@/types/release";
import { Search, CalendarDays } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface FiltersState {
  projectId: string;
  type: "all" | ReleaseType;
  startDate: string;
  endDate: string;
  search: string;
  showDeleted: boolean;
}

export function defaultFilters(): FiltersState {
  return {
    projectId: "all",
    type: "all",
    startDate: "",
    endDate: "",
    search: "",
    showDeleted: false,
  };
}

interface Props {
  projects: Project[];
  value: FiltersState;
  onChange: (patch: Partial<FiltersState>) => void;
}

const TYPE_CHIPS: Array<{ id: FiltersState["type"]; label: string }> = [
  { id: "all", label: "All" },
  { id: "major", label: "Major" },
  { id: "functional", label: "Minor" },
  { id: "bugfix", label: "Patch" },
];

export function VersionFilters({ projects, value, onChange }: Props) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-3">
        {/* Search — hero */}
        <div className="relative min-w-[260px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={value.search}
            onChange={(e) => onChange({ search: e.target.value })}
            placeholder="Search version #, title, project…"
            className="h-10 rounded-full border-transparent bg-muted/70 pl-9 focus-visible:ring-2 focus-visible:ring-primary/40"
          />
        </div>

        {/* Project select */}
        <div className="min-w-[200px]">
          <Select value={value.projectId} onValueChange={(v) => onChange({ projectId: v })}>
            <SelectTrigger className="h-10 rounded-full border-transparent bg-muted/70">
              <SelectValue placeholder="All projects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All projects</SelectItem>
              {projects.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date range */}
        <div className="flex items-center gap-1 rounded-full bg-muted/70 px-3 py-1.5">
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
          <Input
            type="date"
            value={value.startDate}
            onChange={(e) => onChange({ startDate: e.target.value })}
            className="h-7 w-[130px] border-0 bg-transparent p-0 text-xs shadow-none focus-visible:ring-0"
          />
          <span className="text-muted-foreground">–</span>
          <Input
            type="date"
            value={value.endDate}
            onChange={(e) => onChange({ endDate: e.target.value })}
            className="h-7 w-[130px] border-0 bg-transparent p-0 text-xs shadow-none focus-visible:ring-0"
          />
        </div>

        {/* Show deleted */}
        <label className="flex cursor-pointer items-center gap-2 rounded-full bg-muted/70 px-3 py-2 text-xs font-medium text-foreground">
          <Checkbox
            checked={value.showDeleted}
            onCheckedChange={(c) => onChange({ showDeleted: Boolean(c) })}
          />
          Show deleted
        </label>
      </div>

      {/* Chip filter row */}
      <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-border pt-3">
        <span className="mr-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Type
        </span>
        {TYPE_CHIPS.map((chip) => (
          <button
            key={chip.id}
            onClick={() => onChange({ type: chip.id })}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition-colors",
              value.type === chip.id
                ? "bg-foreground text-background"
                : "bg-muted/60 text-muted-foreground hover:bg-muted"
            )}
          >
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  );
}
