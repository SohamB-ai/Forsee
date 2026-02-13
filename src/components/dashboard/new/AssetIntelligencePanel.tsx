import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, CartesianGrid, ReferenceLine } from "recharts";
import { Activity, Clock, Zap, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface AssetIntelligencePanelProps {
    deviceId?: string;
}

export function AssetIntelligencePanel({ deviceId = "dev-01" }: AssetIntelligencePanelProps) {

    const { healthIndex, rul, trendData, load, assetName } = useMemo(() => {
        // Deterministic random generation based on deviceId
        const seed = deviceId.charCodeAt(deviceId.length - 1);
        const baseHealth = 30 + (seed % 60); // 30-90
        const load = 50 + (seed % 45);

        const trend = Array.from({ length: 30 }, (_, i) => ({
            day: i + 1,
            health: baseHealth - (i * 0.2) + (Math.sin(i + seed) * 5),
            rul: 180 - (i * 2)
        }));

        return {
            healthIndex: Math.round(baseHealth),
            rul: Math.round(baseHealth * 2.5),
            trendData: trend,
            load: Math.round(load),
            assetName: `Asset-${seed}${deviceId.split('-')[1]}`
        };
    }, [deviceId]);

    return (
        <div className="h-full flex flex-col gap-6 font-inter">
            {/* Asset Identity Header */}
            <div className="flex justify-between items-start bg-foreground/5 backdrop-blur-md rounded-2xl border border-foreground/10 p-6">
                <div>
                    <h2 className="text-4xl font-bold text-foreground mb-2 font-inter font-tinos">{assetName}</h2>
                    <div className="flex items-center gap-4 text-muted-foreground text-sm">
                        <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Sector 4-B</span>
                        <span className="w-1 h-1 rounded-full bg-border" />
                        <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" /> Running (Load {load}%)</span>
                        <span className="w-1 h-1 rounded-full bg-border" />
                        <span className="font-mono text-xs border border-foreground/10 px-1.5 py-0.5 rounded">ID: {deviceId.toUpperCase()}</span>
                    </div>
                </div>
                <div className="text-right">
                    <div className={cn(
                        "inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-black uppercase tracking-widest animate-pulse",
                        healthIndex < 50 ? "bg-red-500/10 border-red-500/30 text-red-500" :
                            healthIndex < 75 ? "bg-amber-500/10 border-amber-500/30 text-amber-500" :
                                "bg-emerald-500/10 border-emerald-500/30 text-emerald-500"
                    )}>
                        <span className={cn("w-2 h-2 rounded-full", healthIndex < 50 ? "bg-red-500" : healthIndex < 75 ? "bg-amber-500" : "bg-emerald-500")} />
                        {healthIndex < 50 ? "CRITICAL" : healthIndex < 75 ? "WARNING" : "NORMAL"}
                    </div>
                </div>
            </div>

            {/* Main Focus: Health Ring & RUL */}
            <div className="flex flex-col gap-6 flex-1 min-h-0">
                {/* Top Row: Health Ring & RUL */}
                <div className="grid grid-cols-2 gap-6 h-auto">
                    {/* Health Ring Container */}
                    <div className="bg-foreground/5 backdrop-blur-md rounded-2xl border border-foreground/10 p-6 flex flex-col items-center justify-center relative overflow-hidden group min-h-[250px]">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#00E0C6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Animated Ring (SVG) */}
                        <div className="relative w-48 h-48">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="96" cy="96" r="88" fill="none" stroke="currentColor" className="text-muted/10" strokeWidth="12" />
                                <motion.circle
                                    key={healthIndex}
                                    cx="96" cy="96" r="88" fill="none"
                                    stroke={healthIndex < 50 ? "#ef4444" : healthIndex < 75 ? "#f59e0b" : "#10b981"}
                                    strokeWidth="12" strokeLinecap="round" strokeDasharray="552"
                                    initial={{ strokeDashoffset: 552 }}
                                    animate={{ strokeDashoffset: 552 - (552 * (healthIndex / 100)) }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-5xl font-black text-foreground tracking-tighter">{healthIndex}</span>
                                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-2">Health Index</span>
                            </div>
                        </div>

                        <div className="mt-4 text-center max-w-xs">
                            <p className="text-foreground font-medium text-sm leading-snug">
                                {healthIndex < 50 ? "Rapid degradation detected." : "Asset operating normally."}
                            </p>
                        </div>
                    </div>

                    {/* RUL Card */}
                    <div className="bg-foreground/5 backdrop-blur-md rounded-2xl border border-foreground/10 p-6 flex flex-col justify-center relative overflow-hidden min-h-[250px]">
                        <div className="absolute top-0 right-0 p-32 bg-red-500/5 blur-3xl pointer-events-none rounded-full transform translate-x-12 -translate-y-12" />

                        <div className="flex items-center gap-3 text-muted-foreground mb-4">
                            <Clock className="w-5 h-5 text-red-500" />
                            <span className="font-black tracking-widest text-[10px] uppercase">RUL Projection</span>
                        </div>

                        <div>
                            <div className="text-6xl font-black text-foreground tracking-tighter mb-2">
                                {rul} <span className="text-2xl text-muted-foreground font-bold ml-1 uppercase tracking-widest">Cycles</span>
                            </div>
                            <div className="text-red-500 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                                <TrendingDownIcon className="w-4 h-4" />
                                -12 CYC DELTA (24H)
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Row: Combined Charts (Full Width) */}
                <div className="bg-foreground/5 backdrop-blur-md rounded-2xl border border-foreground/10 p-5 flex-1 min-h-[300px] flex flex-col">
                    <h3 className="text-sm font-medium text-muted-foreground mb-4 font-inter">30-Day Health Trend</h3>
                    <div className="flex-1 w-full min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trendData}>
                                <defs>
                                    <linearGradient id="colorHealth" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} vertical={false} />
                                <XAxis dataKey="day" hide />
                                <YAxis domain={[0, 100]} hide />
                                <RechartsTooltip
                                    contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155" }}
                                    itemStyle={{ color: "#f8fafc" }}
                                />
                                <Area type="monotone" dataKey="health" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorHealth)" />
                                <ReferenceLine y={50} stroke="#f59e0b" strokeDasharray="3 3" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

function TrendingDownIcon(props: any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6" /><polyline points="17 18 23 18 23 12" /></svg>
    )
}
