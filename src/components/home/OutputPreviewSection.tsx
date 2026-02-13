import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { TypingText } from "@/components/ui/TypingText";

interface TimelineData {
  day: number;
  healthIndex: number;
  riskLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  rul: number;
  precursorProb: number;
  topSensors: { name: string; weight: number }[];
}

const simulatedTimeline: TimelineData[] = [
  { day: 0, healthIndex: 92, riskLevel: "LOW", rul: 120, precursorProb: 0.08, topSensors: [{ name: "Gearbox Vibration", weight: 15 }, { name: "Power Output", weight: 12 }, { name: "Rotor Speed", weight: 10 }] },
  { day: 15, healthIndex: 85, riskLevel: "LOW", rul: 95, precursorProb: 0.15, topSensors: [{ name: "Gearbox Vibration", weight: 22 }, { name: "Generator Temp", weight: 18 }, { name: "Power Output", weight: 14 }] },
  { day: 30, healthIndex: 72, riskLevel: "MEDIUM", rul: 65, precursorProb: 0.32, topSensors: [{ name: "Gearbox Vibration", weight: 35 }, { name: "Generator Temp", weight: 25 }, { name: "Rotor Speed", weight: 18 }] },
  { day: 45, healthIndex: 58, riskLevel: "MEDIUM", rul: 42, precursorProb: 0.48, topSensors: [{ name: "Gearbox Vibration", weight: 42 }, { name: "Generator Temp", weight: 28 }, { name: "Power Output", weight: 15 }] },
  { day: 60, healthIndex: 41, riskLevel: "HIGH", rul: 22, precursorProb: 0.65, topSensors: [{ name: "Gearbox Vibration", weight: 52 }, { name: "Generator Temp", weight: 30 }, { name: "Blade Pitch", weight: 10 }] },
  { day: 75, healthIndex: 28, riskLevel: "CRITICAL", rul: 8, precursorProb: 0.82, topSensors: [{ name: "Gearbox Vibration", weight: 65 }, { name: "Generator Temp", weight: 22 }, { name: "Rotor Speed", weight: 8 }] },
];

const riskColors = {
  LOW: "bg-success text-success-foreground",
  MEDIUM: "bg-warning text-warning-foreground",
  HIGH: "bg-orange-500 text-white",
  CRITICAL: "bg-critical text-critical-foreground",
};

const healthColors = (value: number) => {
  if (value >= 70) return "from-success to-success/70";
  if (value >= 40) return "from-warning to-warning/70";
  return "from-critical to-critical/70";
};

export function OutputPreviewSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const data = simulatedTimeline[currentIndex];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev >= simulatedTimeline.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1500);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentIndex(parseInt(e.target.value));
    setIsPlaying(false);
  };

  const handleReplay = () => {
    setCurrentIndex(0);
    setIsPlaying(true);
  };

  return (
    <section
      id="section-output-preview"
      ref={sectionRef}
      className={`pt-0 pb-24 px-6 bg-transparent transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <div className="text-3xl md:text-4xl font-bold text-white mb-4 flex justify-center">
            <TypingText text="Output Panel Preview" />
          </div>
          <p className="text-lg text-muted-foreground">
            See how Forsee AI tracks equipment health over time
          </p>
        </div>

        {/* Output Panel Mock */}
        <div id="outputPanel" className="bg-black/40 backdrop-blur-sm border border-border rounded-2xl p-8 shadow-lg">
          {/* Timeline Controls */}
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
            </button>
            <button
              onClick={handleReplay}
              className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center hover:bg-muted/80 transition-colors"
              aria-label="Replay"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <div className="flex-1">
              <input
                type="range"
                min="0"
                max={simulatedTimeline.length - 1}
                value={currentIndex}
                onChange={handleSliderChange}
                className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Day 0</span>
                <span>Day {data.day}</span>
                <span>Day 75</span>
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Health Index */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">Health Index</span>
                <span id="output-healthIndex" className="text-2xl font-bold text-foreground">
                  {data.healthIndex}%
                </span>
              </div>
              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${healthColors(data.healthIndex)} transition-all duration-500`}
                  style={{ width: `${data.healthIndex}%` }}
                />
              </div>
            </div>

            {/* RUL */}
            <div className="bg-muted/50 rounded-xl p-4">
              <span className="text-sm text-muted-foreground">Remaining Useful Life</span>
              <p id="output-RUL" className="text-3xl font-bold text-foreground mt-1">
                {data.rul} <span className="text-lg font-normal text-muted-foreground">days</span>
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Risk Level */}
            <div className="space-y-2">
              <span className="text-sm text-muted-foreground">Risk Level</span>
              <div
                id="output-riskLevel"
                className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold ${riskColors[data.riskLevel]}`}
              >
                {data.riskLevel}
              </div>
            </div>

            {/* Forsee Probability */}
            <div className="space-y-2">
              <span className="text-sm text-muted-foreground">Forsee Probability</span>
              <p id="output-precursorProb" className="text-xl font-bold text-foreground">
                {(data.precursorProb * 100).toFixed(0)}%
              </p>
            </div>

            {/* Confidence */}
            <div className="space-y-2">
              <span className="text-sm text-muted-foreground">Confidence</span>
              <p id="output-confidence" className="text-xl font-bold text-foreground">
                87%
              </p>
            </div>
          </div>

          {/* Failure Mode */}
          <div className="mb-6 p-4 bg-muted/50 rounded-xl">
            <span className="text-sm text-muted-foreground">Predicted Failure Mode</span>
            <p id="output-failureMode" className="text-lg font-semibold text-foreground mt-1">
              {data.healthIndex < 50 ? "Gearbox Bearing Wear" : "Normal Operation"}
            </p>
          </div>

          {/* Top Sensors */}
          <div id="output-topSensors" className="mb-6">
            <h4 className="text-sm font-medium text-muted-foreground mb-4">Top Contributing Sensors</h4>
            <div className="space-y-3">
              {data.topSensors.map((sensor, index) => (
                <div key={sensor.name} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-xs font-medium text-primary">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground">{sensor.name}</span>
                      <span className="text-primary font-medium">{sensor.weight}%</span>
                    </div>
                    <div className="mt-1 h-1.5 rounded-full bg-muted overflow-hidden">
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

          {/* Recommended Action */}
          <div id="output-action" className="p-4 rounded-xl bg-primary/10 border border-primary/20">
            <span className="text-sm font-medium text-primary">Recommended Action</span>
            <p className="text-foreground mt-2">
              {data.healthIndex < 40
                ? "Schedule immediate gearbox inspection. Consider reducing operational load until maintenance is completed."
                : data.healthIndex < 70
                  ? "Plan preventive maintenance within the next 30 days. Monitor vibration levels closely."
                  : "Continue normal operation. Next scheduled maintenance in 45 days."}
            </p>
          </div>

          {/* Drift indicator */}
          <div id="output-drift" className="mt-4 text-sm text-muted-foreground">
            Data Drift Detected: <span className={data.healthIndex < 50 ? "text-warning font-medium" : "text-success font-medium"}>
              {data.healthIndex < 50 ? "Yes" : "No"}
            </span>
          </div>

          {/* Health Trend Graph */}
          <div className="mt-8 pt-6 border-t border-border">
            <h4 className="text-sm font-medium text-muted-foreground mb-4">Health Trend Simulation</h4>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={simulatedTimeline.slice(0, currentIndex + 1)}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="day"
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    tickFormatter={(value) => `Day ${value}`}
                  />
                  <YAxis
                    domain={[0, 100]}
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--foreground))'
                    }}
                    labelFormatter={(value) => `Day ${value}`}
                  />
                  <ReferenceLine y={70} stroke="hsl(var(--success))" strokeDasharray="5 5" label={{ value: 'Healthy', fill: 'hsl(var(--success))', fontSize: 12 }} />
                  <ReferenceLine y={40} stroke="hsl(var(--warning))" strokeDasharray="5 5" label={{ value: 'Warning', fill: 'hsl(var(--warning))', fontSize: 12 }} />
                  <Line
                    type="monotone"
                    dataKey="healthIndex"
                    name="Health Index"
                    stroke="hsl(var(--foreground))"
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--foreground))', strokeWidth: 2 }}
                    activeDot={{ r: 6, fill: 'hsl(var(--foreground))' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="rul"
                    name="RUL (days)"
                    stroke="hsl(var(--muted-foreground))"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-foreground" />
                <span className="text-muted-foreground">Health Index</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-muted-foreground" style={{ borderTop: '2px dashed' }} />
                <span className="text-muted-foreground">RUL (days)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
