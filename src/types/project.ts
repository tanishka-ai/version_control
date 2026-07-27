export interface Project {
  id: string;
  name: string;
  description?: string;
  currentVersion: string; // e.g. "1.3.6"
  counts: {
    major: number;
    functional: number;
    bugfix: number;
  };
}
