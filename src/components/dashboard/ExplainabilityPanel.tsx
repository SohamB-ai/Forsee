"use client";

import { ArrowUp, ArrowDown, ArrowRight, Minus } from "lucide-react";

interface DiagnosticFactor {
    sensor: string;
    direction: "up" | "down" | "stable";
    impact: "strong" | "moderate" | "neutral";
    window: string;
}

const diagnostics: DiagnosticFactor[] = [
    { sensor: "X-axis Vibration", direction: "up", impact: "strong", window: "last 36h" },
    { sensor: "Motor Temp", direction: "stable", impact: "neutral", window: "last 12h" },
    { sensor: "Oil Pressure", direction: "down", impact: "moderate", window: "last 4h" },
    { sensor: "Acoustic Emission", direction: "up", impact: "strong", window: "last 20m" },
];

export function ExplainabilityPanel() {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between pointer-events-none">
                <h3 className="text-lg font-semibold text-purple-100 flex items-center gap-2">
                    Machine Reasoning
                </h3>
            </div>

            <div className="rounded-lg border border-purple-500/10 overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-white/5 text-gray-400">
                        <tr>
                            <th className="p-3 font-medium">Signal</th>
                            <th className="p-3 font-medium">Trend</th>
                            <th className="p-3 font-medium">Impact</th>
                            <th className="p-3 font-medium text-right">Window</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {diagnostics.map((item, i) => (
                            <tr key={i} className="group hover:bg-white/5 transition-colors cursor-default">
                                <td className="p-3 font-medium text-purple-200 group-hover:text-cyan-300">
                                    {item.sensor}
                                </td>
                                <td className="p-3">
                                    <div className={`flex items-center gap-1 ${item.direction === "up" ? "text-red-400" :
                                            item.direction === "down" ? "text-amber-400" : "text-gray-400"
                                        }`}>
                                        {item.direction === "up" ? <ArrowUp className="w-4 h-4" /> :
                                            item.direction === "down" ? <ArrowDown className="w-4 h-4" /> :
                                                <ArrowRight className="w-4 h-4" />}
                                        <span className="opacity-0 group-hover:opacity-100 transition-opacity uppercase text-[10px] font-bold">
                                            {item.direction}
                                        </span>
                                    </div>
                                </td>
                                <td className="p-3">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${item.impact === "strong" ? "bg-red-500/20 text-red-400 border border-red-500/30" :
                                            item.impact === "moderate" ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" :
                                                "bg-slate-500/20 text-slate-400 border border-slate-500/30"
                                        }`}>
                                        {item.impact}
                                    </span>
                                </td>
                                <td className="p-3 text-right text-gray-500 font-mono text-xs">
                                    {item.window}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
