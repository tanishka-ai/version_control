import { ArrowRight } from "lucide-react";

interface Props {
  current: string;
  next: string;
}

export function VersionPreview({ current, next }: Props) {
  return (
    <div className="flex items-center justify-center gap-6 rounded-lg bg-muted/50 px-6 py-8">
      <div className="text-center">
        <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Current
        </div>
        <div className="mt-1 rounded-md bg-card px-3 py-1.5 font-mono text-lg font-semibold text-foreground shadow-sm">
          {current}
        </div>
      </div>
      <ArrowRight className="h-5 w-5 text-muted-foreground" />
      <div className="text-center">
        <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          New Version
        </div>
        <div className="mt-1 rounded-md bg-blue-50 px-3 py-1.5 font-mono text-lg font-bold text-primary shadow-sm">
          {next}
        </div>
      </div>
    </div>
  );
}
