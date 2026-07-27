export type ReleaseType = "major" | "functional" | "bugfix";

export interface ReleaseDraft {
  projectId: string;
  releaseType: ReleaseType | null;
  currentVersion: string;
  newVersion: string;
  name: string;
  description: string;
  notes: string; // rich text HTML
  releaseDate: string; // yyyy-mm-dd
  featuresAdded: string;
  bugFixDetails: string;
  knownIssues: string;
  deploymentInstructions: string;
}

export function emptyDraft(): ReleaseDraft {
  return {
    projectId: "",
    releaseType: null,
    currentVersion: "0.0.0",
    newVersion: "0.0.0",
    name: "",
    description: "",
    notes: "",
    releaseDate: new Date().toISOString().slice(0, 10),
    featuresAdded: "",
    bugFixDetails: "",
    knownIssues: "",
    deploymentInstructions: "",
  };
}
