import type { Project } from "@/types/project";
import { delay } from "./api";

const PROJECTS: Project[] = [
  {
    id: "pps",
    name: "Production Planning System",
    description: "Multi-plant production planning and scheduling suite.",
    currentVersion: "1.3.6",
    counts: { major: 1, functional: 3, bugfix: 6 },
  },
  {
    id: "scada",
    name: "Optimo Suite - SCADA",
    description: "Real-time supervisory control and data acquisition.",
    currentVersion: "1.1.1",
    counts: { major: 1, functional: 2, bugfix: 4 },
  },
  {
    id: "dms",
    name: "Optimo Suite - DMS",
    description: "Distribution management system for utilities.",
    currentVersion: "2.0.1",
    counts: { major: 2, functional: 1, bugfix: 5 },
  },
  {
    id: "mes",
    name: "Manufacturing Execution",
    description: "Shop-floor execution and quality tracking.",
    currentVersion: "0.9.4",
    counts: { major: 0, functional: 2, bugfix: 8 },
  },
];

export async function listProjects(): Promise<Project[]> {
  await delay();
  return PROJECTS;
}

export async function getProject(id: string): Promise<Project | undefined> {
  await delay();
  return PROJECTS.find((p) => p.id === id);
}
