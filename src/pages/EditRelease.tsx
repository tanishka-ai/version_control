import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { PageTitle } from "@/components/common/PageTitle";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader } from "@/components/common/Loader";
import { NotFound } from "@/components/common/NotFound";
import { TypeBadge, StatusBadge } from "@/components/versionListing/StatusBadge";
import { getVersion, updateVersion } from "@/services/version.service";
import type { Version } from "@/types/version";

export default function EditRelease() {
  const { id = "" } = useParams();
  const [params] = useSearchParams();
  const readOnly = params.get("mode") === "view";
  const navigate = useNavigate();

  const [version, setVersion] = useState<Version | null | undefined>(undefined);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getVersion(id).then((v) => {
      setVersion(v ?? null);
      if (v) {
        setTitle(v.title);
        setNotes(v.notes ?? "");
      }
    });
  }, [id]);

  if (version === undefined) return <Loader />;
  if (version === null) return <NotFound title="Version not found" />;

  const save = async () => {
    setSaving(true);
    try {
      await updateVersion(id, { title, notes });
      navigate("/");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <PageTitle
        title={readOnly ? "View Release" : "Edit Release"}
        subtitle={`${version.projectName} · v${version.version}`}
        actions={
          <Button variant="outline" onClick={() => navigate("/")}>
            Back to list
          </Button>
        }
      />

      <Card className="p-6">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <TypeBadge type={version.type} />
          <StatusBadge status={version.status} />
          <span className="font-mono text-sm text-muted-foreground">
            Version {version.version}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label className="normal-case tracking-normal text-sm">Title</Label>
            <Input
              value={title}
              disabled={readOnly}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="normal-case tracking-normal text-sm">Created</Label>
            <Input value={new Date(version.createdAt).toLocaleString()} disabled />
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-1.5">
          <Label className="normal-case tracking-normal text-sm">Release Notes</Label>
          <Textarea
            rows={8}
            value={notes}
            disabled={readOnly}
            onChange={(e) => setNotes(e.target.value)}
            className="bg-muted/40 font-mono text-xs"
          />
        </div>

        {!readOnly && (
          <div className="mt-6 flex justify-end gap-2">
            <Button variant="outline" onClick={() => navigate("/")}>
              Cancel
            </Button>
            <Button onClick={save} disabled={saving}>
              {saving ? "Saving…" : "Save changes"}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
