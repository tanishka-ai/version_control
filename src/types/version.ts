import type { ReleaseType } from "./release";

export type VersionStatus = "active" | "draft" | "archived" | "deleted";

export interface Version {
  id: string;
  projectId: string;
  projectName: string;
  version: string; // "1.2.3"
  title: string;
  type: ReleaseType;
  status: VersionStatus;
  createdAt: string; // ISO
  description?: string;
  notes?: string;
}
