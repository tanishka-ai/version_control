import { FileQuestion } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function NotFound({
  title = "Nothing here",
  message = "The resource you're looking for doesn't exist or has moved.",
  ctaLabel = "Go back home",
  ctaTo = "/",
}: {
  title?: string;
  message?: string;
  ctaLabel?: string;
  ctaTo?: string;
}) {
  return (
    <div className="grid place-items-center py-24">
      <div className="flex max-w-md flex-col items-center gap-4 text-center">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-muted text-muted-foreground">
          <FileQuestion className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-sm text-muted-foreground">{message}</p>
        <Button asChild>
          <Link to={ctaTo}>{ctaLabel}</Link>
        </Button>
      </div>
    </div>
  );
}
