import type { VersionStatus } from "@/types/version";
import type { ReleaseType } from "@/types/release";
import { cn } from "@/lib/utils";

export function StatusBadge({ status }: { status: VersionStatus }) {
  const map: Record<VersionStatus, { label: string; dot: string; text: string; bg: string }> = {
    active: { label: "Live", dot: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50" },
    draft: { label: "Draft", dot: "bg-amber-500", text: "text-amber-700", bg: "bg-amber-50" },
    archived: { label: "Archived", dot: "bg-slate-500", text: "text-slate-700", bg: "bg-slate-100" },
    deleted: { label: "Deleted", dot: "bg-red-500", text: "text-red-700", bg: "bg-red-50" },
  };
  const s = map[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium", s.bg, s.text)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", s.dot)} />
      {s.label}
    </span>
  );
}

export function TypeBadge({ type }: { type: ReleaseType }) {
  const map: Record<ReleaseType, { label: string; ring: string; bg: string; text: string }> = {
    major: { label: "Major", ring: "ring-violet-200", bg: "bg-violet-50", text: "text-violet-700" },
    functional: { label: "Minor", ring: "ring-sky-200", bg: "bg-sky-50", text: "text-sky-700" },
    bugfix: { label: "Patch", ring: "ring-amber-200", bg: "bg-amber-50", text: "text-amber-700" },
  };
  const s = map[type];
  return (
    <span className={cn("inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ring-1", s.bg, s.text, s.ring)}>
      {s.label}
    </span>
  );
}
