import { useEffect, useState } from "react";
import type { Project } from "@/types/project";
import { listProjects } from "@/services/project.service";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listProjects()
      .then((data) => {
        if (!cancelled) setProjects(data);
      })
      .catch((e) => !cancelled && setError(String(e)))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  return { projects, loading, error };
}
