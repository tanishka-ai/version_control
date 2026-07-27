import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface Step {
  id: number;
  label: string;
  hint?: string;
}

interface Props {
  steps: Step[];
  current: number;
  onStepClick?: (id: number) => void;
}

/**
 * Vertical stepper — a much bolder, sidebar-style progress rail.
 */
export function Stepper({ steps, current, onStepClick }: Props) {
  return (
    <ol className="flex flex-col gap-1">
      {steps.map((step, i) => {
        const isDone = step.id < current;
        const isActive = step.id === current;
        const clickable = onStepClick && step.id <= current;
        return (
          <li key={step.id} className="relative">
            {i < steps.length - 1 && (
              <div
                className={cn(
                  "absolute left-[19px] top-10 h-full w-0.5",
                  isDone ? "bg-primary" : "bg-border"
                )}
              />
            )}
            <button
              type="button"
              onClick={() => clickable && onStepClick?.(step.id)}
              className={cn(
                "relative flex w-full items-start gap-4 rounded-xl p-2.5 text-left transition-colors",
                clickable ? "cursor-pointer" : "cursor-default",
                isActive && "bg-primary/5"
              )}
            >
              <span
                className={cn(
                  "relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-semibold shadow-sm transition-all",
                  isActive
                    ? "scale-110 bg-primary text-primary-foreground ring-4 ring-primary/20"
                    : isDone
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-card text-muted-foreground"
                )}
              >
                {isDone ? <Check className="h-4 w-4" /> : step.id}
              </span>
              <div className="pt-1.5">
                <div
                  className={cn(
                    "text-sm font-semibold",
                    isActive || isDone ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {step.label}
                </div>
                {step.hint && (
                  <div className="mt-0.5 text-xs text-muted-foreground">{step.hint}</div>
                )}
              </div>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
