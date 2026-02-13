import { Badge } from "@/components/ui/badge";

export type RiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

interface RiskBadgeProps {
  level: RiskLevel;
}

const riskStyles: Record<RiskLevel, string> = {
  LOW: "status-low",
  MEDIUM: "status-medium",
  HIGH: "status-high",
  CRITICAL: "status-critical pulse-glow",
};

const riskLabels: Record<RiskLevel, string> = {
  LOW: "Low Risk",
  MEDIUM: "Medium Risk",
  HIGH: "High Risk",
  CRITICAL: "Critical",
};

export function RiskBadge({ level }: RiskBadgeProps) {
  return (
    <Badge
      id="output-riskLevel"
      className={`${riskStyles[level]} px-3 py-1 text-xs font-semibold uppercase tracking-wider`}
    >
      {riskLabels[level]}
    </Badge>
  );
}
