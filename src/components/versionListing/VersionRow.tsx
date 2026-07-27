import { useNavigate } from "react-router-dom";
import type { Version } from "@/types/version";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { StatusBadge, TypeBadge } from "./StatusBadge";
import { formatDate } from "@/lib/utils";
import { DeleteDialog } from "./DeleteDialog";
import { Eye, Pencil } from "lucide-react";

interface Props {
  version: Version;
  onDelete: (id: string) => void;
}

// Generates a deterministic gradient for a project label
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
  return name
    .split(/\s|-/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

export function VersionRow({ version, onDelete }: Props) {
  const navigate = useNavigate();

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <div
            className={`grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br text-xs font-bold text-white shadow-sm ${gradientFor(
              version.projectId
            )}`}
          >
            {initials(version.projectName)}
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">
              {version.projectName}
            </div>
            <div className="text-xs text-muted-foreground">
              #{version.id.slice(-4).toUpperCase()}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <TypeBadge type={version.type} />
      </TableCell>
      <TableCell>
        <span className="rounded-md bg-muted/70 px-2 py-1 font-mono text-sm font-semibold text-foreground">
          v{version.version}
        </span>
      </TableCell>
      <TableCell className="max-w-[260px] truncate">
        <div className="truncate text-sm text-foreground">{version.title}</div>
      </TableCell>
      <TableCell>
        <StatusBadge status={version.status} />
      </TableCell>
      <TableCell className="text-sm text-muted-foreground">
        {formatDate(version.createdAt)}
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-end gap-1">
          <Button
            variant="ghost"
            size="icon"
            aria-label="View"
            onClick={() => navigate(`/releases/${version.id}/edit?mode=view`)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Edit"
            onClick={() => navigate(`/releases/${version.id}/edit`)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <DeleteDialog
            versionLabel={`${version.projectName} · v${version.version}`}
            onConfirm={() => onDelete(version.id)}
          />
        </div>
      </TableCell>
    </TableRow>
  );
}
