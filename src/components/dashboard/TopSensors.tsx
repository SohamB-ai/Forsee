interface SensorContribution {
  name: string;
  weight: number;
}

interface TopSensorsProps {
  sensors: SensorContribution[];
}

export function TopSensors({ sensors }: TopSensorsProps) {
  const sortedSensors = [...sensors].sort((a, b) => b.weight - a.weight);

  return (
    <div id="output-topSensors" className="space-y-3">
      <h4 className="text-sm font-medium text-muted-foreground">
        Top Contributing Sensors
      </h4>
      <div className="space-y-2">
        {sortedSensors.map((sensor, index) => (
          <div key={sensor.name} className="flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-xs font-medium text-primary">
              {index + 1}
            </span>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">{sensor.name}</span>
                <span className="text-sm font-medium text-primary">
                  {sensor.weight}%
                </span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${sensor.weight}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
