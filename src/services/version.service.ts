import type { Version } from "@/types/version";
import type { ReleaseDraft } from "@/types/release";
import { delay } from "./api";

const STORAGE_KEY = "vcm:versions";

const SEED: Version[] = [
  {
    id: "v-1",
    projectId: "scada",
    projectName: "Optimo Suite - SCADA",
    version: "1.1.1",
    title: "gfgtdsg",
    type: "bugfix",
    status: "active",
    createdAt: "2026-07-24T09:00:00Z",
  },
  {
    id: "v-2",
    projectId: "scada",
    projectName: "Optimo Suite - SCADA",
    version: "1.1.0",
    title: "lkmfkdsl",
    type: "functional",
    status: "active",
    createdAt: "2026-07-23T09:00:00Z",
  },
  {
    id: "v-3",
    projectId: "dms",
    projectName: "Optimo Suite - DMS",
    version: "2.0.1",
    title: "gvhvmgdsa",
    type: "bugfix",
    status: "active",
    createdAt: "2026-07-23T10:00:00Z",
  },
  {
    id: "v-4",
    projectId: "dms",
    projectName: "Optimo Suite - DMS",
    version: "2.0.0",
    title: "gwerg",
    type: "major",
    status: "active",
    createdAt: "2026-07-23T11:00:00Z",
  },
  {
    id: "v-5",
    projectId: "dms",
    projectName: "Optimo Suite - DMS",
    version: "1.0.1",
    title: "gdfg",
    type: "bugfix",
    status: "active",
    createdAt: "2026-07-23T12:00:00Z",
  },
  {
    id: "v-6",
    projectId: "scada",
    projectName: "Optimo Suite - SCADA",
    version: "1.0.0",
    title: "Test",
    type: "functional",
    status: "active",
    createdAt: "2026-07-23T13:00:00Z",
  },
  {
    id: "v-7",
    projectId: "dms",
    projectName: "Optimo Suite - DMS",
    version: "1.0.0",
    title: "Test",
    type: "major",
    status: "active",
    createdAt: "2026-07-23T14:00:00Z",
  },
];

function load(): Version[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED));
      return [...SEED];
    }
    return JSON.parse(raw) as Version[];
  } catch {
    return [...SEED];
  }
}

function save(list: Version[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export async function listVersions(): Promise<Version[]> {
  await delay();
  return load();
}

export async function getVersion(id: string): Promise<Version | undefined> {
  await delay();
  return load().find((v) => v.id === id);
}

export async function createVersion(
  draft: ReleaseDraft,
  projectName: string
): Promise<Version> {
  await delay();
  const list = load();
  const version: Version = {
    id: `v-${Date.now()}`,
    projectId: draft.projectId,
    projectName,
    version: draft.newVersion,
    title: draft.name || "Untitled release",
    type: draft.releaseType ?? "functional",
    status: "active",
    createdAt: new Date(draft.releaseDate).toISOString(),
    description: draft.description,
    notes: draft.notes,
  };
  const next = [version, ...list];
  save(next);
  return version;
}

export async function updateVersion(
  id: string,
  patch: Partial<Version>
): Promise<Version | undefined> {
  await delay();
  const list = load();
  const idx = list.findIndex((v) => v.id === id);
  if (idx < 0) return undefined;
  list[idx] = { ...list[idx], ...patch };
  save(list);
  return list[idx];
}

export async function softDeleteVersion(id: string): Promise<void> {
  await delay();
  const list = load();
  const idx = list.findIndex((v) => v.id === id);
  if (idx < 0) return;
  list[idx] = { ...list[idx], status: "deleted" };
  save(list);
}
