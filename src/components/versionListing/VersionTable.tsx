import type { Version } from "@/types/version";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { VersionRow } from "./VersionRow";
import { PackageOpen } from "lucide-react";

interface Props {
  versions: Version[];
  onDelete: (id: string) => void;
}

export function VersionTable({ versions, onDelete }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Project</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Version</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Released</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {versions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="py-16">
                <div className="mx-auto flex max-w-sm flex-col items-center gap-2 text-center">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-muted text-muted-foreground">
                    <PackageOpen className="h-6 w-6" />
                  </div>
                  <div className="text-sm font-semibold text-foreground">Nothing to show</div>
                  <div className="text-xs text-muted-foreground">
                    Try clearing your filters or create your first release.
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            versions.map((v) => (
              <VersionRow key={v.id} version={v} onDelete={onDelete} />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
