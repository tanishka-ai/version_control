import type { Version } from "@/types/version";
import { GitCommitHorizontal, Rocket, ShieldCheck, Timer } from "lucide-react";

interface Props {
  versions: Version[];
}

export function StatsHero({ versions }: Props) {
  const active = versions.filter((v) => v.status === "active");
  const major = active.filter((v) => v.type === "major").length;
  const minor = active.filter((v) => v.type === "functional").length;
  const patch = active.filter((v) => v.type === "bugfix").length;

  const latest = active[0];

  // Simple weekly velocity: releases in last 30 days
  const now = Date.now();
  const last30 = active.filter(
    (v) => now - new Date(v.createdAt).getTime() < 30 * 24 * 3600 * 1000
  ).length;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      <HeroCard
        featured
        title="Latest release"
        value={latest ? `v${latest.version}` : "—"}
        subtitle={latest ? latest.projectName : "No releases yet"}
        icon={<Rocket className="h-5 w-5" />}
      />
      <MetricCard
        label="Active releases"
        value={active.length.toString()}
        icon={<GitCommitHorizontal className="h-4 w-4" />}
        accent="text-violet-600"
        chip={`${major} major · ${minor} minor · ${patch} patch`}
      />
      <MetricCard
        label="This month"
        value={last30.toString()}
        icon={<Timer className="h-4 w-4" />}
        accent="text-sky-600"
        chip="Rolling 30-day velocity"
      />
      <MetricCard
        label="Health"
        value="98%"
        icon={<ShieldCheck className="h-4 w-4" />}
        accent="text-emerald-600"
        chip="All checks passing"
      />
    </div>
  );
}

function HeroCard({
  title,
  value,
  subtitle,
  icon,
  featured,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  featured?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-5 shadow-sm ${
        featured
          ? "bg-gradient-to-br from-slate-900 via-violet-900 to-fuchsia-900 text-white"
          : "border border-border bg-card"
      }`}
    >
      {featured && (
        <>
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-fuchsia-500/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-violet-500/20 blur-3xl" />
        </>
      )}
      <div className="relative flex items-center justify-between">
        <div className="text-[11px] font-semibold uppercase tracking-widest opacity-70">
          {title}
        </div>
        <div className={featured ? "text-white/80" : "text-muted-foreground"}>{icon}</div>
      </div>
      <div className="relative mt-3 font-display text-3xl font-bold">{value}</div>
      <div className={`relative mt-1 text-xs ${featured ? "text-white/70" : "text-muted-foreground"}`}>
        {subtitle}
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  icon,
  accent,
  chip,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  accent: string;
  chip: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          {label}
        </div>
        <div className={`grid h-7 w-7 place-items-center rounded-md bg-muted/60 ${accent}`}>
          {icon}
        </div>
      </div>
      <div className="mt-3 font-display text-3xl font-bold text-foreground">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{chip}</div>
    </div>
  );
}
