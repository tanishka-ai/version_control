import { useCallback, useEffect, useState } from "react";
import type { Version } from "@/types/version";
import {
  listVersions,
  softDeleteVersion,
  updateVersion,
} from "@/services/version.service";

export function useVersions() {
  const [versions, setVersions] = useState<Version[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(() => {
    setLoading(true);
    listVersions()
      .then(setVersions)
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const remove = useCallback(
    async (id: string) => {
      await softDeleteVersion(id);
      refresh();
    },
    [refresh]
  );

  const update = useCallback(
    async (id: string, patch: Partial<Version>) => {
      await updateVersion(id, patch);
      refresh();
    },
    [refresh]
  );

  return { versions, loading, error, refresh, remove, update };
}
