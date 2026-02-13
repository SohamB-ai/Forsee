import { motion } from "framer-motion";
import { AlertCircle, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function GlobalRiskCard() {
    return (
        <motion.div
            id="global-risk"
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="col-span-1"
        >
            <Card className="h-full border-none shadow-[var(--shadow-2)] bg-[var(--card-bg)] rounded-3xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent-color)] opacity-5 rounded-bl-full pointer-events-none" />
                <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-[var(--muted)] font-medium text-sm uppercase tracking-wider mb-1">Global Health Index</h3>
                            <div className="flex items-baseline gap-2">
                                <span id="output-healthIndex" className="text-5xl font-bold font-doto text-foreground">87</span>
                                <span className="text-sm text-[var(--success)] font-medium flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3" /> +2.4%
                                </span>
                            </div>
                        </div>
                        {/* Progress Ring Placeholder - in a real app use SVG circle */}
                        <div className="relative w-16 h-16 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-[var(--muted)]/20" />
                                <circle cx="32" cy="32" r="28" stroke="var(--success)" strokeWidth="6" fill="transparent" strokeDasharray="175.9" strokeDashoffset="22.8" strokeLinecap="round" />
                            </svg>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1 bg-[var(--bg)] rounded-xl p-3 flex flex-col justify-between">
                            <span className="text-xs text-[var(--muted)]">Fleet Risk</span>
                            <span className="text-sm font-bold text-[var(--warning)] flex items-center gap-1 risk-medium">
                                MEDIUM
                            </span>
                        </div>
                        <div
                            id="global-active-alerts"
                            className="flex-1 bg-[var(--danger)]/5 rounded-xl p-3 flex flex-col justify-between cursor-pointer hover:bg-[var(--danger)]/10 transition-colors"
                        >
                            <span className="text-xs text-[var(--muted)]">Active Alerts</span>
                            <span className="text-sm font-bold text-[var(--danger)] flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" /> 3 Critical
                            </span>
                        </div>
                        <div className="flex-1 bg-[var(--bg)] rounded-xl p-3 flex flex-col justify-between">
                            <span className="text-xs text-[var(--muted)]">Avg Lead Time</span>
                            <span className="text-sm font-bold text-foreground">
                                4.2 Days
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
