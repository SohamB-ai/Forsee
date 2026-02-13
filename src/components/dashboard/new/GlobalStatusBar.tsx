import { ArrowUp, ArrowDown, Activity, Server, AlertTriangle, ShieldAlert, Zap, Cpu, Bell, Layers, Database } from "lucide-react";
import { cn } from "@/lib/utils";

const kpiData = [
    { label: "Total Assets", value: "142", icon: Server, trend: "up", trendValue: "+2", status: "neutral" },
    { label: "Assets Healthy", value: "89%", icon: Activity, trend: "up", trendValue: "+1.5%", status: "success" },
    { label: "Assets Warning", value: "8%", icon: AlertTriangle, trend: "down", trendValue: "-0.5%", status: "warning" },
    { label: "Assets Critical", value: "3%", icon: ShieldAlert, trend: "down", trendValue: "-1%", status: "critical" },
    { label: "Preds/sec", value: "1.2k", icon: Zap, trend: "up", trendValue: "+5%", status: "info" },
    { label: "Active Alerts", value: "12", icon: Bell, trend: "down", trendValue: "-2", status: "warning" },
    { label: "Throughput", value: "450/s", icon: Database, trend: "up", trendValue: "+10%", status: "neutral" },
    { label: "Models Loaded", value: "24", icon: Layers, trend: "neutral", trendValue: "0", status: "info" },
    { label: "System Status", value: "99.9%", icon: Cpu, trend: "up", trendValue: "+0.1%", status: "success" },
];

export function GlobalStatusBar() {
    return (
        <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide">
            {kpiData.map((kpi, idx) => (
                <div
                    key={idx}
                    className="group relative flex-shrink-0 w-32 h-20 bg-foreground/5 backdrop-blur-md border border-foreground/10 rounded-xl overflow-hidden cursor-pointer hover:border-foreground/20 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,224,198,0.1)] hover:-translate-y-1"
                >
                    {/* Front Face */}
                    <div className="absolute inset-0 flex flex-col justify-center items-center p-2 group-hover:opacity-0 transition-opacity duration-300">
                        <kpi.icon className={cn("w-5 h-5 mb-1",
                            kpi.status === "success" && "text-[#00E0C6]",
                            kpi.status === "warning" && "text-[#FFB020]",
                            kpi.status === "critical" && "text-[#FF5C5C]",
                            kpi.status === "info" && "text-cyan-600 dark:text-cyan-400",
                            kpi.status === "neutral" && "text-muted-foreground"
                        )} />
                        <span className="text-xl font-bold text-foreground tracking-tight font-tinos font-inter">{kpi.value}</span>
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium truncate w-full text-center">{kpi.label}</span>
                    </div>

                    {/* Back Face (Hover) */}
                    <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className={cn("flex items-center gap-1 text-sm font-bold",
                            kpi.trend === "up" ? "text-emerald-400" : kpi.trend === "down" ? "text-rose-400" : "text-slate-300"
                        )}>
                            {kpi.trend === "up" && <ArrowUp className="w-3 h-3" />}
                            {kpi.trend === "down" && <ArrowDown className="w-3 h-3" />}
                            {kpi.trendValue}
                        </div>
                        <span className="text-[10px] text-slate-300 mt-1">Last 24h</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
