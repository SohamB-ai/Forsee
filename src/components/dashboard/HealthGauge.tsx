interface HealthGaugeProps {
  value: number;
  label?: string;
}

export function HealthGauge({ value, label = "Health Index" }: HealthGaugeProps) {
  const clampedValue = Math.min(100, Math.max(0, value));
  
  // Color based on health percentage
  const getGaugeColor = (val: number) => {
    if (val >= 70) return "from-success to-success/70";
    if (val >= 40) return "from-warning to-warning/70";
    return "from-critical to-critical/70";
  };

  return (
    <div id="output-healthIndex" className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <span className="text-2xl font-bold text-foreground">{clampedValue}%</span>
      </div>
      <div className="gauge-track h-3 overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${getGaugeColor(clampedValue)} transition-all duration-700 ease-out`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Critical</span>
        <span>Warning</span>
        <span>Healthy</span>
      </div>
    </div>
  );
}
