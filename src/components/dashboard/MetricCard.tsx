import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  id: string;
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  variant?: "default" | "success" | "warning" | "critical";
}

const variantStyles = {
  default: "border-border",
  success: "border-success/30 bg-success/5",
  warning: "border-warning/30 bg-warning/5",
  critical: "border-critical/30 bg-critical/5",
};

const iconVariantStyles = {
  default: "text-primary bg-primary/10",
  success: "text-success bg-success/10",
  warning: "text-warning bg-warning/10",
  critical: "text-critical bg-critical/10",
};

export function MetricCard({
  id,
  title,
  value,
  subtitle,
  icon: Icon,
  variant = "default",
}: MetricCardProps) {
  return (
    <Card
      id={id}
      className={`metric-card border ${variantStyles[variant]} transition-all duration-300`}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {Icon && (
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-lg ${iconVariantStyles[variant]}`}
          >
            <Icon className="h-4 w-4" />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="animate-number text-2xl font-bold tracking-tight text-foreground">
          {value}
        </div>
        {subtitle && (
          <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );
}
