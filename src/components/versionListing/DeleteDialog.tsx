import * as React from "react";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  versionLabel: string;
  onConfirm: () => void;
  trigger?: React.ReactNode;
}

export function DeleteDialog({ versionLabel, onConfirm, trigger }: Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant="ghost" size="icon" aria-label="Delete" className="text-destructive hover:bg-red-50 hover:text-destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="mb-1 grid h-10 w-10 place-items-center rounded-full bg-red-50 text-destructive">
            <Trash2 className="h-5 w-5" />
          </div>
          <DialogTitle>Delete this version?</DialogTitle>
          <DialogDescription>
            You're about to delete <span className="font-medium text-foreground">{versionLabel}</span>.
            This will hide it from the active list. You can restore it later using the
            "Show deleted" filter.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
          >
            Yes, delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
