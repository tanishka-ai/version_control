import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Save, Rocket } from "lucide-react";
import { PageTitle } from "@/components/common/PageTitle";
import { Button } from "@/components/ui/button";
import { Stepper, type Step } from "@/components/release/Stepper";
import { ProjectInfo } from "@/components/release/ProjectInfo";
import { ReleaseType } from "@/components/release/ReleaseType";
import { ReleaseDetails } from "@/components/release/ReleaseDetails";
import { ApprovalPublish } from "@/components/release/ApprovalPublish";
import { useProjects } from "@/hooks/useProjects";
import { useRelease } from "@/hooks/useRelease";
import { createVersion } from "@/services/version.service";
import { Loader } from "@/components/common/Loader";

const STEPS: Step[] = [
  { id: 1, label: "Project", hint: "Pick a product" },
  { id: 2, label: "Release type", hint: "Major, minor or patch" },
  { id: 3, label: "Details", hint: "Name, notes, features" },
  { id: 4, label: "Publish", hint: "Review and ship" },
];

export default function CreateRelease() {
  const navigate = useNavigate();
  const { projects, loading } = useProjects();
  const { draft, setField, selectProject, chooseType, currentProject } =
    useRelease(projects);
  const [step, setStep] = useState(1);
  const [publishing, setPublishing] = useState(false);

  const canNext =
    (step === 1 && !!draft.projectId) ||
    (step === 2 && !!draft.releaseType) ||
    (step === 3 && !!draft.name.trim()) ||
    step === 4;

  const next = () => setStep((s) => Math.min(4, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const handlePublish = async () => {
    if (!currentProject) return;
    setPublishing(true);
    try {
      await createVersion(draft, currentProject.name);
      navigate("/");
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageTitle
        eyebrow="Ship it"
        title="Create a new release"
        subtitle={
          currentProject
            ? `Preparing release for ${currentProject.name}`
            : "Follow the four steps below to publish a new version."
        }
        actions={
          <Button variant="outline" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4" />
            Cancel
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
        {/* Vertical Stepper */}
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between px-2">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                Progress
              </div>
              <div className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                {step} / {STEPS.length}
              </div>
            </div>
            <Stepper steps={STEPS} current={step} onStepClick={setStep} />

            {currentProject && (
              <div className="mt-4 rounded-xl bg-muted/60 p-3 text-xs">
                <div className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Bumping
                </div>
                <div className="flex items-center justify-between font-mono">
                  <span className="text-muted-foreground line-through">
                    v{draft.currentVersion}
                  </span>
                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                  <span className="font-semibold text-primary">v{draft.newVersion}</span>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Content */}
        <div className="rounded-2xl border border-border bg-card shadow-sm">
          <div className="min-h-[420px] p-6 md:p-8">
            {loading ? (
              <Loader />
            ) : step === 1 ? (
              <ProjectInfo
                projects={projects}
                projectId={draft.projectId}
                onSelectProject={selectProject}
                currentProject={currentProject}
              />
            ) : step === 2 ? (
              <ReleaseType
                currentVersion={draft.currentVersion}
                value={draft.releaseType}
                onChange={chooseType}
              />
            ) : step === 3 ? (
              <ReleaseDetails draft={draft} setField={setField} />
            ) : (
              <ApprovalPublish draft={draft} project={currentProject} />
            )}
          </div>

          <div className="flex items-center justify-between gap-2 border-t border-border bg-muted/30 px-6 py-4">
            <Button variant="ghost" onClick={back} disabled={step === 1}>
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <Save className="h-4 w-4" />
                Save draft
              </Button>
              {step < 4 ? (
                <Button onClick={next} disabled={!canNext}>
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handlePublish} disabled={publishing}>
                  <Rocket className="h-4 w-4" />
                  {publishing ? "Publishing…" : "Publish release"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
