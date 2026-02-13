"use client";

import { DollarSign, TrendingDown, AlertOctagon } from "lucide-react";

export interface EconomicsProps {
    potentialCost: string;
    downtimeCost: string;
}

export function FailureEconomics({ potentialCost, downtimeCost }: EconomicsProps) {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-100 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-400" />
                Failure Economics Model
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-red-300 text-xs uppercase tracking-wider mb-1">
                        <AlertOctagon className="w-3 h-3" /> Potential Fail Cost
                    </div>
                    <div className="text-2xl font-bold text-white font-mono">
                        {potentialCost}
                    </div>
                    <p className="text-xs text-red-200/50 mt-2">
                        Includes hardware replacement, labor, and logistics.
                    </p>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-amber-300 text-xs uppercase tracking-wider mb-1">
                        <TrendingDown className="w-3 h-3" /> Downtime Impact
                    </div>
                    <div className="text-2xl font-bold text-white font-mono">
                        {downtimeCost}
                    </div>
                    <p className="text-xs text-amber-200/50 mt-2">
                        Production loss per hour of inactivity.
                    </p>
                </div>
            </div>

            <div className="bg-black/20 p-3 rounded text-xs text-gray-500 flex justify-between items-center">
                <span>Simulation Basis: Historical fleet data (n=4,200)</span>
                <span className="text-green-400 font-medium">ROI of Action: 14x</span>
            </div>
        </div>
    );
}
