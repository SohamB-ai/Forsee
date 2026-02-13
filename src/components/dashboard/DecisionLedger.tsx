"use client";

import { History, ShieldCheck, UserCheck, AlertTriangle } from "lucide-react";

export function DecisionLedger() {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-purple-100 flex items-center gap-2">
                    <History className="w-5 h-5 text-purple-400" />
                    Decision Ledger
                </h3>
                <span className="text-xs text-gray-500 uppercase tracking-wider border border-white/10 px-2 py-1 rounded">
                    Immutable Record
                </span>
            </div>

            <div className="border border-white/10 rounded-lg overflow-hidden bg-black/20">
                <div className="grid grid-cols-12 text-xs text-gray-400 bg-white/5 p-3 font-medium">
                    <div className="col-span-3">Timestamp</div>
                    <div className="col-span-4">Recommended Action</div>
                    <div className="col-span-2">Model v.</div>
                    <div className="col-span-3 text-right">Outcome</div>
                </div>
                <div className="divide-y divide-white/5">
                    <div className="grid grid-cols-12 text-sm p-3 hover:bg-white/5 transition-colors group">
                        <div className="col-span-3 text-gray-300 font-mono text-xs">Today, 09:42 AM</div>
                        <div className="col-span-4 text-cyan-300 font-medium group-hover:text-cyan-200">
                            Load Reduction (-15%)
                        </div>
                        <div className="col-span-2 text-gray-500 text-xs">v3.4.2</div>
                        <div className="col-span-3 flex items-center justify-end gap-2 text-xs">
                            <span className="text-amber-400 flex items-center gap-1">
                                <UserCheck className="w-3 h-3" /> Pending
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 text-sm p-3 hover:bg-white/5 transition-colors opacity-70 hover:opacity-100">
                        <div className="col-span-3 text-gray-500 font-mono text-xs">Yesterday, 02:15 PM</div>
                        <div className="col-span-4 text-gray-300">
                            Vibration Analysis Request
                        </div>
                        <div className="col-span-2 text-gray-500 text-xs">v3.4.1</div>
                        <div className="col-span-3 flex items-center justify-end gap-2 text-xs">
                            <span className="text-green-400 flex items-center gap-1">
                                <ShieldCheck className="w-3 h-3" /> Verified
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 text-sm p-3 hover:bg-white/5 transition-colors opacity-50 hover:opacity-100">
                        <div className="col-span-3 text-gray-500 font-mono text-xs">Feb 02, 11:30 AM</div>
                        <div className="col-span-4 text-gray-300">
                            Cooling System Override
                        </div>
                        <div className="col-span-2 text-gray-500 text-xs">v3.3.9</div>
                        <div className="col-span-3 flex items-center justify-end gap-2 text-xs">
                            <span className="text-gray-400 flex items-center gap-1">
                                <History className="w-3 h-3" /> Archived
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
