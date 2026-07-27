import type { Project } from "@/types/project";
import type { ReleaseDraft } from "@/types/release";
import { formatDate } from "@/lib/utils";
import { TypeBadge } from "@/components/versionListing/StatusBadge";
import { CalendarDays, GitBranch, Package, Tag, ArrowRight, CheckCircle2 } from "lucide-react";

interface Props {
  draft: ReleaseDraft;
  project?: Project;
}

export function ApprovalPublish({ draft, project }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <div className="text-sm font-semibold">Review & publish</div>
        <div className="mt-0.5 text-xs text-muted-foreground">
          Double-check the details below. You can go back to edit anything.
        </div>
      </div>

      {/* Big version card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-violet-900 to-fuchsia-900 p-8 text-white shadow-lg">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-fuchsia-500/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-violet-500/30 blur-3xl" />
        <div className="relative flex flex-wrap items-center justify-between gap-8">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-widest opacity-70">
              Publishing
            </div>
            <div className="mt-2 font-display text-2xl font-semibold">
              {draft.name || "Untitled release"}
            </div>
            <div className="mt-1 text-sm opacity-80">{project?.name ?? "—"}</div>
          </div>
          <div className="flex items-baseline gap-3 font-mono">
            <span className="text-xl opacity-60 line-through">v{draft.currentVersion}</span>
            <ArrowRight className="h-4 w-4 opacity-70" />
            <span className="font-display text-4xl font-bold">v{draft.newVersion}</span>
          </div>
        </div>
      </div>

      {/* Meta grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <MetaCard icon={<Package className="h-4 w-4" />} label="Project" value={project?.name ?? "—"} />
        <MetaCard
          icon={<Tag className="h-4 w-4" />}
          label="Type"
          valueNode={draft.releaseType ? <TypeBadge type={draft.releaseType} /> : <>—</>}
        />
        <MetaCard icon={<GitBranch className="h-4 w-4" />} label="Version" value={`v${draft.newVersion}`} mono />
        <MetaCard
          icon={<CalendarDays className="h-4 w-4" />}
          label="Release date"
          value={formatDate(draft.releaseDate)}
        />
      </div>

      {/* Description + notes */}
      {(draft.description || draft.notes) && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {draft.description && (
            <Panel title="Description">
              <p className="text-sm text-foreground">{draft.description}</p>
            </Panel>
          )}
          {draft.notes && (
            <Panel title="Release notes">
              <div
                className="prose prose-sm max-w-none text-sm text-foreground"
                dangerouslySetInnerHTML={{ __html: draft.notes }}
              />
            </Panel>
          )}
        </div>
      )}

      {/* Checklist */}
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-emerald-800">
          <CheckCircle2 className="h-4 w-4" />
          Ready to publish
        </div>
        <div className="mt-1 text-xs text-emerald-700">
          Once published, this release will be visible on the version listing and
          notifications will fire to subscribed teams.
        </div>
      </div>
    </div>
  );
}

function MetaCard({
  icon,
  label,
  value,
  valueNode,
  mono,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
  valueNode?: React.ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        <span className="text-primary">{icon}</span>
        {label}
      </div>
      <div className={`mt-2 text-sm font-semibold text-foreground ${mono ? "font-mono" : ""}`}>
        {valueNode ?? value}
      </div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        {title}
      </div>
      {children}
    </div>
  );
}
