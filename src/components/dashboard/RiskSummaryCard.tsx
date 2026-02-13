"use client";

import { ShieldAlert, CheckCircle2 } from "lucide-react";

export function RiskSummaryCard() {
    return (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 relative overflow-hidden">
            {/* Background Pulse */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-red-500/20 rounded-full blur-[50px] animate-pulse" />

            <div className="relative z-10 flex flex-col md:flex-row gap-6 md:items-start justify-between">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-red-400 font-semibold uppercase tracking-wider text-sm">
                        <ShieldAlert className="w-5 h-5" />
                        Overall Risk Status
                    </div>
                    <h2 className="text-4xl font-bold text-white tracking-tight">HIGH</h2>
                    <p className="text-sm text-red-200/60 max-w-[200px]">
                        Immediate intervention recommended to prevent catastrophic failure.
                    </p>
                </div>

                <div className="flex-1 bg-black/40 rounded-lg p-4 border border-red-500/10">
                    <h4 className="text-sm font-medium text-gray-300 mb-3 border-b border-white/10 pb-2">Risk Drivers</h4>
                    <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-sm text-gray-300">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5" />
                            Degradation slope accelerating (+12%)
                        </li>
                        <li className="flex items-start gap-2 text-sm text-gray-300">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5" />
                            Confirmed precursor pattern match (Cluster #42)
                        </li>
                        <li className="flex items-start gap-2 text-sm text-gray-300">
                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5" />
                            Stable environment ensures high confidence
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
