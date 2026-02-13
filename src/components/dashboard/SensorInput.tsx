import { LucideIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SensorInputProps {
  id: string;
  label: string;
  unit: string;
  value: string;
  onChange: (value: string) => void;
  icon?: LucideIcon;
  placeholder?: string;
}

export function SensorInput({
  id,
  label,
  unit,
  value,
  onChange,
  icon: Icon,
  placeholder = "0",
}: SensorInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-foreground">
        {label} <span className="text-muted-foreground">({unit})</span>
      </Label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Icon className="h-4 w-4" />
          </div>
        )}
        <Input
          id={id}
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`sensor-input bg-input border-border text-foreground ${Icon ? "pl-10" : ""}`}
        />
      </div>
    </div>
  );
}
