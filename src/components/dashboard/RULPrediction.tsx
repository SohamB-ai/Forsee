"use client";

import { useState } from "react";
import { AlertTriangle, TrendingDown, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function RULPrediction({ rul }: { rul: number }) {
    const [scenario, setScenario] = useState<"current" | "reduce" | "inspect">("current");

    const scenarios = {
        current: { label: "Continue As-Is", rul: rul, color: "text-white" },
        reduce: { label: "Reduce Load (-20%)", rul: Math.round(rul * 1.3), color: "text-green-400" },
        inspect: { label: "Immediate Inspection", rul: Math.round(rul * 0.8), color: "text-amber-400" }, // RUL drops if we find defects, technically, or inspection downtime
    };

    const confidence = {
        p90: Math.round(rul * 0.7), // Worst case
        p50: rul, // Expected
        p10: Math.round(rul * 1.4), // Best case
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-purple-100">RUL Probabilistic Forecast</h3>
            </div>

            {/* Confidence Bands */}
            <div className="relative pt-6 pb-2">
                <div className="flex justify-between text-xs text-start mb-2 px-1">
                    <span className="text-red-400">P90 (Worst): {confidence.p90}d</span>
                    <span className="text-white font-bold">P50 (Expected): {confidence.p50}d</span>
                    <span className="text-green-400">P10 (Best): {confidence.p10}d</span>
                </div>

                <div className="h-3 bg-slate-800 rounded-full relative overflow-hidden">
                    {/* Gradient Band */}
                    <div className="absolute top-0 bottom-0 left-[20%] right-[20%] bg-gradient-to-r from-red-500/50 via-purple-500 to-green-500/50 blur-[2px]" />
                    {/* Center Marker */}
                    <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-white shadow-[0_0_10px_white]" />
                </div>
                <p className="text-center text-xs text-slate-400 mt-2">
                    Confidence Interval: <span className="text-purple-300">High</span> (Narrow variance)
                </p>
            </div>

            {/* Scenarios */}
            <div className="space-y-3">
                <h4 className="text-sm font-medium text-slate-300">Simulation Scenarios</h4>
                <div className="grid grid-cols-3 gap-2">
                    {(Object.keys(scenarios) as Array<keyof typeof scenarios>).map((key) => (
                        <button
                            key={key}
                            onClick={() => setScenario(key)}
                            className={cn(
                                "flex flex-col items-center justify-center p-3 rounded-lg border transition-all text-xs text-center gap-1",
                                scenario === key
                                    ? "bg-purple-500/20 border-purple-500 text-purple-200"
                                    : "bg-black/40 border-slate-800 text-slate-500 hover:bg-white/5"
                            )}
                        >
                            {key === "current" && <AlertTriangle className="w-4 h-4 mb-1" />}
                            {key === "reduce" && <ShieldCheck className="w-4 h-4 mb-1" />}
                            {key === "inspect" && <TrendingDown className="w-4 h-4 mb-1" />}
                            <span className="font-semibold">{scenarios[key].label}</span>
                            <span className={cn("text-lg font-mono", scenarios[key].color)}>
                                {scenarios[key].rul}d
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
