import { motion } from "framer-motion";
import { Server, ShieldCheck, Clock, Timer } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import { TypingText } from "@/components/ui/TypingText";

const kpis = [
    { id: "kpi-assets-online", label: "Assets Online", value: "24/28", icon: Server, color: "text-success" },
    { id: "kpi-at-risk", label: "Assets At Risk", value: "4", icon: ShieldCheck, color: "text-critical" },
    { id: "kpi-avg-rul", label: "Average RUL", value: "312d", icon: Clock, color: "text-info" },
    { id: "kpi-mtta", label: "Mean Time To Avert", value: "4.5h", icon: Timer, color: "text-warning" },
];

export function QuickKPIs() {
    return (
        <div id="quick-kpis" className="col-span-3 grid grid-cols-2 lg:grid-cols-4 gap-4 h-full">
            {kpis.map((kpi, i) => (
                <motion.div
                    key={kpi.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="h-full"
                >
                    <Card id={kpi.id} className="h-full border-none shadow-[var(--shadow-1)] bg-[var(--card-bg)] rounded-2xl flex items-center p-4 hover:shadow-[var(--shadow-2)] transition-shadow">
                        <div className={`p-3 rounded-xl bg-[var(--bg)] mr-4 ${kpi.color}`}>
                            <kpi.icon className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs text-[var(--muted)] font-medium">{kpi.label}</p>
                            <div className="text-lg font-bold font-doto text-foreground">
                                <TypingText text={kpi.value} delay={0.5 + i * 0.1} />
                            </div>
                        </div>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
}
