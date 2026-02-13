"use client";

import { CheckCircle2, Circle, AlertCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineEvent {
    time: string;
    description: string;
    type: "normal" | "warning" | "critical" | "inference";
    details?: string;
}

const mockTimelineNodes: TimelineEvent[] = [
    { time: "-2h 15m", description: "Pressure drop detected", type: "warning", details: "Delta: -12%" },
    { time: "-1h 50m", description: "Degradation slope increased", type: "inference", details: "Slope: +12% / hr" },
    { time: "-45m", description: "Forsee Probability crossed 0.62", type: "critical", details: "Threshold: 0.60" },
    { time: "-12m", description: "Failure cluster shifted", type: "inference", details: "Normal -> Bearing Wear" },
    { time: "Now", description: "Action threshold crossed", type: "critical", details: "Maintenance Recommended" },
];

export function CognitiveTimeline() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-purple-100 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    Cognitive Timeline
                </h3>
                <span className="text-xs text-purple-300/60 font-mono">LIVE INFERENCE</span>
            </div>

            <div className="relative border-l border-purple-500/20 ml-3 space-y-8 py-2">
                {mockTimelineNodes.map((event, i) => (
                    <div key={i} className="relative pl-8 group">
                        {/* Timeline Dot */}
                        <div className={cn(
                            "absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full border-2 transition-all duration-300",
                            event.type === "critical" ? "bg-red-500 border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" :
                                event.type === "warning" ? "bg-amber-500 border-amber-500" :
                                    event.type === "inference" ? "bg-cyan-500 border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" :
                                        "bg-slate-500 border-slate-500"
                        )} />

                        <div className="flex flex-col gap-1">
                            <div className="flex items-baseline justify-between">
                                <span className="text-sm text-purple-100 font-medium group-hover:text-cyan-300 transition-colors">
                                    {event.description}
                                </span>
                                <span className="text-xs text-purple-400 font-mono">{event.time}</span>
                            </div>

                            {event.details && (
                                <div className="text-xs text-slate-400 flex items-center gap-2">
                                    <ArrowRight className="w-3 h-3 text-purple-500/50" />
                                    {event.details}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
