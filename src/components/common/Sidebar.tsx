import { NavLink } from "react-router-dom";
import {
  LayoutList,
  PlusCircle,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const PRIMARY = [
  { to: "/", icon: LayoutList, label: "Versions", end: true },
  { to: "/releases/new", icon: PlusCircle, label: "New Release" },
];



export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 md:block">
      <div className="sticky top-20 flex h-[calc(100vh-6rem)] flex-col overflow-hidden rounded-2xl bg-sidebar text-sidebar-foreground shadow-xl sidebar-grid">
        <div className="px-5 pb-4 pt-6">
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
            Workspace
          </div>
          <div className="mt-1 flex items-center gap-2 text-white">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="text-sm font-semibold">Optimo Suite</div>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-6 px-3 pb-4">
          <NavGroup label="Manage" items={PRIMARY} />
        </nav>


      </div>
    </aside>
  );
}

function NavGroup({
  label,
  items,
  disabled,
}: {
  label: string;
  items: Array<{ to: string; icon: any; label: string; end?: boolean }>;
  disabled?: boolean;
}) {
  return (
    <div>
      <div className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
        {label}
      </div>
      <div className="flex flex-col gap-1">
        {items.map(({ to, icon: Icon, label, end }) =>
          disabled ? (
            <div
              key={to}
              className="flex cursor-not-allowed items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/40"
            >
              <Icon className="h-4 w-4" />
              {label}
              <span className="ml-auto rounded-full bg-white/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase">
                Soon
              </span>
            </div>
          ) : (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                  isActive
                    ? "bg-white/10 text-white shadow-sm"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={cn(
                      "absolute left-0 h-5 w-0.5 rounded-r-full transition-all",
                      isActive ? "bg-fuchsia-400" : "bg-transparent"
                    )}
                  />
                  <Icon className="h-4 w-4" />
                  {label}
                </>
              )}
            </NavLink>
          )
        )}
      </div>
    </div>
  );
}
