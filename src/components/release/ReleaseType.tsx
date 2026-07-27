import type { ReleaseType as RT } from "@/types/release";
import { bumpVersion } from "@/hooks/useRelease";
import { cn } from "@/lib/utils";
import { Rocket, Sparkles, Wrench, ArrowRight } from "lucide-react";

interface Props {
  currentVersion: string;
  value: RT | null;
  onChange: (t: RT) => void;
}

const TYPES: Array<{
  id: RT;
  title: string;
  desc: string;
  icon: any;
  gradient: string;
  bullets: string[];
}> = [
  {
    id: "major",
    title: "Major",
    desc: "Breaking changes, big features, or a milestone release.",
    icon: Rocket,
    gradient: "from-violet-500 to-fuchsia-500",
    bullets: ["Breaking changes", "New architecture", "Migration notes"],
  },
  {
    id: "functional",
    title: "Minor",
    desc: "New features that stay backwards-compatible.",
    icon: Sparkles,
    gradient: "from-sky-500 to-cyan-500",
    bullets: ["New features", "Enhancements", "Backwards compatible"],
  },
  {
    id: "bugfix",
    title: "Patch",
    desc: "Bug fixes and small polish. Ship it safely.",
    icon: Wrench,
    gradient: "from-amber-500 to-rose-500",
    bullets: ["Bug fixes", "Perf tweaks", "No new features"],
  },
];

export function ReleaseType({ currentVersion, value, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <div className="text-sm font-semibold">Choose the release type</div>
        <div className="mt-0.5 text-xs text-muted-foreground">
          We'll bump the version number using semantic versioning.
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {TYPES.map((t) => {
          const selected = value === t.id;
          const preview = bumpVersion(currentVersion, t.id);
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onChange(t.id)}
              className={cn(
                "group relative overflow-hidden rounded-2xl border p-5 text-left transition-all",
                selected
                  ? "border-primary bg-primary/5 shadow-lg ring-2 ring-primary/20"
                  : "border-border bg-card hover:-translate-y-0.5 hover:shadow-md"
              )}
            >
              <div
                className={cn(
                  "absolute -right-8 -top-8 h-24 w-24 rounded-full blur-2xl transition-opacity",
                  `bg-gradient-to-br ${t.gradient}`,
                  selected ? "opacity-30" : "opacity-10 group-hover:opacity-20"
                )}
              />

              <div className="relative flex items-center justify-between">
                <span
                  className={cn(
                    "grid h-11 w-11 place-items-center rounded-xl text-white shadow-md",
                    `bg-gradient-to-br ${t.gradient}`
                  )}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="rounded-full bg-muted/60 px-2 py-0.5 font-mono text-[11px] font-semibold text-muted-foreground">
                  {currentVersion} → {preview}
                </span>
              </div>

              <div className="relative mt-4">
                <div className="font-display text-xl font-bold text-foreground">
                  {t.title}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
              </div>

              <ul className="relative mt-4 space-y-1.5">
                {t.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-br ${t.gradient}`} />
                    {b}
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>

      {value && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-violet-900 to-fuchsia-900 p-6 text-white shadow-lg">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-fuchsia-500/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-violet-500/30 blur-3xl" />
          <div className="relative flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-widest opacity-70">
                Next version
              </div>
              <div className="mt-2 flex items-baseline gap-4 font-mono">
                <span className="text-xl opacity-50 line-through">v{currentVersion}</span>
                <ArrowRight className="h-5 w-5 opacity-70" />
                <span className="font-display text-4xl font-bold">
                  v{bumpVersion(currentVersion, value)}
                </span>
              </div>
            </div>
            <div className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs backdrop-blur">
              Semantic versioning
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
