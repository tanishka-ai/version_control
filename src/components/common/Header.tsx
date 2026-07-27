import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/60 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-4 px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-amber-500 text-white shadow-sm">
            <span className="absolute inset-0 opacity-30 mix-blend-overlay [background-image:radial-gradient(circle_at_20%_20%,white,transparent_40%)]" />
            <span className="font-display text-sm font-bold">V</span>
          </div>
          <div className="leading-tight">
            <div className="font-display text-[15px] font-bold text-foreground">
              Version<span className="text-primary">Forge</span>
            </div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
              release orchestration
            </div>
          </div>
        </Link>

        <div className="relative ml-8 hidden max-w-lg flex-1 md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Jump to project, version, or note…"
            className="h-10 rounded-full border-transparent bg-muted/70 pl-10 pr-16 focus-visible:ring-2 focus-visible:ring-primary/40"
          />

        </div>

        <div className="ml-auto flex items-center gap-2">

          <Button asChild size="sm">
            <Link to="/releases/new">New release</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
