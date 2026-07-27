import * as React from "react";
import { Bold, Italic, Underline as UnderlineIcon, Heading1, Heading2, List, Link as LinkIcon } from "lucide-react";
import type { ReleaseDraft } from "@/types/release";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  draft: ReleaseDraft;
  setField: <K extends keyof ReleaseDraft>(k: K, v: ReleaseDraft[K]) => void;
}

export function ReleaseDetails({ draft, setField }: Props) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Field label="Release Name">
          <Input
            value={draft.name}
            onChange={(e) => setField("name", e.target.value)}
            placeholder="e.g. Multi-line Scheduling Update"
          />
        </Field>
        <Field label="Release Date">
          <Input
            type="date"
            value={draft.releaseDate}
            onChange={(e) => setField("releaseDate", e.target.value)}
          />
        </Field>
      </div>

      <Field label="Release Description">
        <Textarea
          rows={3}
          value={draft.description}
          onChange={(e) => setField("description", e.target.value)}
          placeholder="Short summary shown on the version listing…"
          className="bg-muted/40"
        />
      </Field>

      <div>
        <Label className="mb-1.5 block">
          Release Notes <span className="ml-1 lowercase text-muted-foreground">(rich text)</span>
        </Label>
        <RichTextEditor
          html={draft.notes}
          onChange={(html) => setField("notes", html)}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Field label="Features Added">
          <Textarea
            rows={4}
            value={draft.featuresAdded}
            onChange={(e) => setField("featuresAdded", e.target.value)}
            placeholder="• Feature one&#10;• Feature two"
            className="bg-muted/40"
          />
        </Field>
        <Field label="Bug Fix Details">
          <Textarea
            rows={4}
            value={draft.bugFixDetails}
            onChange={(e) => setField("bugFixDetails", e.target.value)}
            placeholder="• Fixed …"
            className="bg-muted/40"
          />
        </Field>
        <Field label="Known Issues">
          <Textarea
            rows={4}
            value={draft.knownIssues}
            onChange={(e) => setField("knownIssues", e.target.value)}
            placeholder="Any temporary limitations…"
            className="bg-muted/40"
          />
        </Field>
        <Field label="Deployment Instructions">
          <Textarea
            rows={4}
            value={draft.deploymentInstructions}
            onChange={(e) => setField("deploymentInstructions", e.target.value)}
            placeholder="1. Run migration&#10;2. Restart service"
            className="bg-muted/40"
          />
        </Field>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="normal-case tracking-normal text-sm">{label}</Label>
      {children}
    </div>
  );
}

/* -------------- toy rich text editor using contenteditable -------------- */

function RichTextEditor({
  html,
  onChange,
}: {
  html: string;
  onChange: (v: string) => void;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  // Only set innerHTML on mount / when external value differs significantly
  React.useEffect(() => {
    if (ref.current && ref.current.innerHTML !== html) {
      ref.current.innerHTML = html;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const exec = (cmd: string, arg?: string) => {
    document.execCommand(cmd, false, arg);
    if (ref.current) onChange(ref.current.innerHTML);
    ref.current?.focus();
  };

  const tools = [
    { icon: Bold, label: "B", cmd: () => exec("bold") },
    { icon: Italic, label: "I", cmd: () => exec("italic") },
    { icon: UnderlineIcon, label: "U", cmd: () => exec("underline") },
    { icon: Heading1, label: "H1", cmd: () => exec("formatBlock", "H1") },
    { icon: Heading2, label: "H2", cmd: () => exec("formatBlock", "H2") },
    { icon: List, label: "List", cmd: () => exec("insertUnorderedList") },
    {
      icon: LinkIcon,
      label: "Link",
      cmd: () => {
        const url = prompt("Enter URL");
        if (url) exec("createLink", url);
      },
    },
  ];

  return (
    <div className="rounded-md border border-input bg-card shadow-sm">
      <div className="flex flex-wrap items-center gap-1 border-b border-border px-2 py-1.5">
        {tools.map((t) => (
          <button
            key={t.label}
            type="button"
            onClick={t.cmd}
            className="rounded-sm px-2 py-1 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label={t.label}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div
        ref={ref}
        contentEditable
        onInput={(e) => onChange((e.target as HTMLDivElement).innerHTML)}
        data-placeholder="Highlights, screenshots, breaking changes…"
        className="prose prose-sm max-w-none min-h-[120px] p-3 text-sm focus:outline-none"
        suppressContentEditableWarning
      />
    </div>
  );
}
