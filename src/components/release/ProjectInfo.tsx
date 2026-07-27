import type { Project } from "@/types/project";
import { cn } from "@/lib/utils";
import { Check, GitBranch } from "lucide-react";

interface Props {
  projects: Project[];
  projectId: string;
  onSelectProject: (project: Project) => void;
  currentProject?: Project;
}

function gradientFor(seed: string) {
  const palettes = [
    "from-violet-500 to-fuchsia-500",
    "from-sky-500 to-cyan-500",
    "from-amber-500 to-rose-500",
    "from-emerald-500 to-teal-500",
    "from-indigo-500 to-blue-500",
    "from-pink-500 to-rose-500",
  ];
  let sum = 0;
  for (let i = 0; i < seed.length; i++) sum += seed.charCodeAt(i);
  return palettes[sum % palettes.length];
}
function initials(name: string) {
  return name.split(/\s|-/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("");
}

export function ProjectInfo({
  projects,
  projectId,
  onSelectProject,
  currentProject,
}: Props) {
  return (
    <div className="space-y-8">
      <div>
        <div className="text-sm font-semibold">Which product ships next?</div>
        <div className="mt-0.5 text-xs text-muted-foreground">
          Pick a project to see its release history and start the flow.
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
          {projects.map((p) => {
            const selected = p.id === projectId;
            return (
              <button
                key={p.id}
                onClick={() => onSelectProject(p)}
                className={cn(
                  "group relative flex items-center gap-4 rounded-xl border p-4 text-left transition-all",
                  selected
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border bg-card hover:border-primary/40 hover:shadow-sm"
                )}
              >
                <div
                  className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-sm font-bold text-white shadow-sm ${gradientFor(
                    p.id
                  )}`}
                >
                  {initials(p.name)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-foreground">
                    {p.name}
                  </div>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                    <GitBranch className="h-3 w-3" />
                    <span className="font-mono">v{p.currentVersion}</span>
                    <span>·</span>
                    <span>
                      {p.counts.major + p.counts.functional + p.counts.bugfix} releases
                    </span>
                  </div>
                </div>
                {selected && (
                  <div className="grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {currentProject && (
        <div className="gradient-border">
          <div className="relative rounded-2xl bg-gradient-to-br from-white to-violet-50/30 p-6">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Current version
                </div>
                <div className="mt-1 font-mono font-display text-5xl font-bold tracking-tight text-transparent [background:linear-gradient(135deg,#7c3aed,#db2777)] bg-clip-text">
                  v{currentProject.currentVersion}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {currentProject.description}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <MiniStat n={currentProject.counts.major} label="Major" color="text-violet-600" />
                <MiniStat n={currentProject.counts.functional} label="Minor" color="text-sky-600" />
                <MiniStat n={currentProject.counts.bugfix} label="Patch" color="text-amber-600" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MiniStat({ n, label, color }: { n: number; label: string; color: string }) {
  return (
    <div className="min-w-[64px] rounded-xl border border-border bg-card px-3 py-2 text-center shadow-sm">
      <div className={`font-display text-2xl font-bold ${color}`}>{n}</div>
      <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
