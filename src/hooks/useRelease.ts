import { useCallback, useMemo, useState } from "react";
import type { Project } from "@/types/project";
import type { ReleaseType, ReleaseDraft } from "@/types/release";
import { emptyDraft } from "@/types/release";

export function bumpVersion(current: string, type: ReleaseType): string {
  const [maj, min, patch] = current.split(".").map((x) => parseInt(x, 10) || 0);
  if (type === "major") return `${maj + 1}.0.0`;
  if (type === "functional") return `${maj}.${min + 1}.0`;
  return `${maj}.${min}.${patch + 1}`;
}

export interface UseReleaseResult {
  draft: ReleaseDraft;
  setField: <K extends keyof ReleaseDraft>(k: K, v: ReleaseDraft[K]) => void;
  selectProject: (project: Project) => void;
  chooseType: (type: ReleaseType) => void;
  reset: () => void;
  currentProject: Project | undefined;
}

export function useRelease(
  projects: Project[],
  initial?: Partial<ReleaseDraft>
): UseReleaseResult {
  const [draft, setDraft] = useState<ReleaseDraft>(() => ({
    ...emptyDraft(),
    ...initial,
  }));

  const currentProject = useMemo(
    () => projects.find((p) => p.id === draft.projectId),
    [projects, draft.projectId]
  );

  const setField = useCallback<UseReleaseResult["setField"]>((k, v) => {
    setDraft((d) => ({ ...d, [k]: v }));
  }, []);

  const selectProject = useCallback((project: Project) => {
    setDraft((d) => ({
      ...d,
      projectId: project.id,
      currentVersion: project.currentVersion,
      newVersion: d.releaseType
        ? bumpVersion(project.currentVersion, d.releaseType)
        : project.currentVersion,
    }));
  }, []);

  const chooseType = useCallback((type: ReleaseType) => {
    setDraft((d) => ({
      ...d,
      releaseType: type,
      newVersion: bumpVersion(d.currentVersion, type),
    }));
  }, []);

  const reset = useCallback(() => setDraft(emptyDraft()), []);

  return { draft, setField, selectProject, chooseType, reset, currentProject };
}
