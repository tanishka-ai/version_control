import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { PageTitle } from "@/components/common/PageTitle";
import { Loader } from "@/components/common/Loader";
import { Button } from "@/components/ui/button";
import { useVersions } from "@/hooks/useVersion";
import { useProjects } from "@/hooks/useProjects";
import { VersionTable } from "@/components/versionListing/VersionTable";
import { Pagination } from "@/components/versionListing/Pagination";
import { StatsHero } from "@/components/versionListing/StatsHero";
import {
  VersionFilters,
  defaultFilters,
  type FiltersState,
} from "@/components/versionListing/VersionFilters";

const PAGE_SIZE = 7;

export default function VersionListing() {
  const { versions, loading, remove } = useVersions();
  const { projects } = useProjects();
  const [filters, setFilters] = useState<FiltersState>(defaultFilters());
  const [page, setPage] = useState(1);

  const patch = (p: Partial<FiltersState>) => {
    setFilters((f) => ({ ...f, ...p }));
    setPage(1);
  };

  const filtered = useMemo(() => {
    return versions
      .filter((v) => (filters.showDeleted ? true : v.status !== "deleted"))
      .filter((v) =>
        filters.projectId === "all" ? true : v.projectId === filters.projectId
      )
      .filter((v) => (filters.type === "all" ? true : v.type === filters.type))
      .filter((v) => {
        if (!filters.startDate) return true;
        return new Date(v.createdAt) >= new Date(filters.startDate);
      })
      .filter((v) => {
        if (!filters.endDate) return true;
        return new Date(v.createdAt) <= new Date(filters.endDate + "T23:59:59");
      })
      .filter((v) => {
        if (!filters.search.trim()) return true;
        const q = filters.search.toLowerCase();
        return (
          v.title.toLowerCase().includes(q) ||
          v.version.toLowerCase().includes(q) ||
          v.projectName.toLowerCase().includes(q)
        );
      });
  }, [versions, filters]);

  const paged = useMemo(
    () => filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filtered, page]
  );

  return (
    <div className="space-y-6">
      <PageTitle
        eyebrow="Release control tower"
        title="Every version, everywhere"
        subtitle="Track, filter and orchestrate releases across all Optimo products."
        actions={
          <Button asChild size="lg">
            <Link to="/releases/new">
              <Plus className="h-4 w-4" />
              New release
            </Link>
          </Button>
        }
      />

      <StatsHero versions={versions} />

      <VersionFilters projects={projects} value={filters} onChange={patch} />

      {loading ? (
        <Loader />
      ) : (
        <>
          <VersionTable versions={paged} onDelete={remove} />
          <Pagination
            page={page}
            pageSize={PAGE_SIZE}
            total={filtered.length}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}
