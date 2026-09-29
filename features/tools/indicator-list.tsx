import { AlertTriangle, Info, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DisplayIndicator {
  id: string;
  label: string;
  detail: string;
  severity: "info" | "caution" | "warning";
}

const SEVERITY_STYLES: Record<DisplayIndicator["severity"], string> = {
  info: "border-border bg-secondary/50",
  caution: "border-accent/40 bg-accent/10",
  warning: "border-destructive/40 bg-destructive/10",
};

const SEVERITY_ICONS: Record<DisplayIndicator["severity"], typeof Info> = {
  info: Info,
  caution: AlertTriangle,
  warning: ShieldAlert,
};

export function IndicatorList({ indicators }: { indicators: DisplayIndicator[] }) {
  return (
    <div className="flex flex-col gap-2">
      {indicators.map((indicator) => {
        const Icon = SEVERITY_ICONS[indicator.severity];
        return (
          <div
            key={indicator.id}
            className={cn("flex gap-3 rounded-md border p-3", SEVERITY_STYLES[indicator.severity])}
          >
            <Icon className="mt-0.5 size-4 shrink-0" />
            <div>
              <p className="text-sm font-medium">{indicator.label}</p>
              <p className="text-sm text-muted-foreground">{indicator.detail}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
