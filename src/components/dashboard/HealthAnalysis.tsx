"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";

interface HealthFactor {
    label: string;
    impact: number; // positive or negative
    value: string;
}

const factors: HealthFactor[] = [
    { label: "RUL Contribution", impact: -22, value: "112 cycles" },
    { label: "Forsee Probability", impact: -15, value: "62%" },
    { label: "Trend Acceleration", impact: -8, value: "+12%" },
    { label: "Sensor Instability", impact: 4, value: "Low" },
];

export function HealthAnalysis({ healthIndex }: { healthIndex: number }) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-purple-100">Health Decomposition</h3>
                <div className="text-2xl font-bold text-white font-mono">{healthIndex}</div>
            </div>

            <div className="space-y-3 bg-black/20 p-4 rounded-lg border border-white/5">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-2 flex justify-between">
                    <span>Factor</span>
                    <span>Impact</span>
                </div>

                {factors.map((factor, i) => (
                    <div key={i} className="flex items-center justify-between group">
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{factor.label}</span>
                            <span className="text-xs text-gray-500">{factor.value}</span>
                        </div>

                        <div className={`flex items-center font-mono text-sm ${factor.impact < 0 ? "text-red-400" : factor.impact > 0 ? "text-green-400" : "text-gray-400"
                            }`}>
                            {factor.impact < 0 ? <ArrowDown className="w-3 h-3 mr-1" /> :
                                factor.impact > 0 ? <ArrowUp className="w-3 h-3 mr-1" /> :
                                    <Minus className="w-3 h-3 mr-1" />}
                            {factor.impact > 0 ? "+" : ""}{factor.impact}
                        </div>
                    </div>
                ))}
            </div>

            <p className="text-xs text-gray-500 italic">
                *Base health score driven primarily by RUL degradation.
            </p>
        </div>
    );
}
