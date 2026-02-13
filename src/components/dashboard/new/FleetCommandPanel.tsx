import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { AlertCircle, ArrowRight, Activity, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

interface FleetCommandPanelProps {
    deviceId?: string;
}

const generateHealthData = (id: string) => {
    // Deterministic pseudo-random based on ID
    const seed = id.charCodeAt(id.length - 1);
    const healthy = 50 + (seed % 40);
    const warning = 100 - healthy - 10;

    return [
        { name: "Healthy", value: healthy, color: "#00E0C6" },
        { name: "Warning", value: warning, color: "#FFB020" },
        { name: "Critical", value: 10, color: "#FF5C5C" },
    ];
};

const riskList = [
    { id: "MX-204", status: "critical", score: 92 },
    { id: "TU-009", status: "critical", score: 88 },
    { id: "PM-112", status: "warning", score: 74 },
    { id: "GB-055", status: "warning", score: 68 },
    { id: "CN-881", status: "healthy", score: 24 },
];

const degradingAssets = [
    { id: "Turbine-7", hi: 42, trend: "-5%" },
    { id: "Pump-12", hi: 55, trend: "-3%" },
    { id: "Fan-03", hi: 61, trend: "-2%" },
];

const alerts = [
    { time: "10:42", msg: "Bearing Vib > 4g", type: "critical" },
    { time: "09:30", msg: "Oil Temp High", type: "warning" },
    { time: "08:15", msg: "Pressure Drop", type: "info" },
];

export function FleetCommandPanel({ deviceId = "dev-01" }: FleetCommandPanelProps) {

    // Memoize the data generation so it only changes when deviceId changes
    const healthData = useMemo(() => generateHealthData(deviceId), [deviceId]);

    // Simple rotation of risk list based on device
    const displayRiskList = useMemo(() => {
        const offset = deviceId.charCodeAt(deviceId.length - 1) % riskList.length;
        return [...riskList.slice(offset), ...riskList.slice(0, offset)];
    }, [deviceId]);

    return (
        <div className="h-full flex flex-col gap-6">
            {/* Fleet Distribution */}
            <div className="bg-foreground/5 backdrop-blur-md rounded-2xl border border-foreground/10 p-5 font-serif font-tinos">
                <h3 className="text-foreground/90 font-semibold mb-4 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#00E0C6]" /> Fleet Health ({deviceId})
                </h3>
                <div className="h-40 w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={healthData}
                                innerRadius={40}
                                outerRadius={60}
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                            >
                                {healthData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "8px" }}
                                itemStyle={{ color: "#f8fafc" }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    {/* Center Label */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="text-center">
                            <span className="block text-2xl font-bold text-foreground font-tinos">142</span>
                            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-tinos font-inter">Total</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Risk Heatmap List */}
            <div className="bg-foreground/5 backdrop-blur-md rounded-2xl border border-foreground/10 p-5 flex-1 flex flex-col min-h-0 font-tinos font-serif">
                <h3 className="text-foreground/90 font-semibold mb-3 flex items-center gap-2 font-tinos">
                    <AlertCircle className="w-4 h-4 text-[#FF5C5C]" /> High Risk Assets
                </h3>
                <div className="space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 pr-2">
                    {displayRiskList.map((asset) => (
                        <div
                            key={asset.id}
                            className={cn("group flex items-center justify-between p-3 rounded-lg border transition-all duration-200 cursor-pointer font-tinos",
                                asset.status === "critical" ? "bg-red-500/10 border-red-500/20 hover:bg-red-500/20" :
                                    asset.status === "warning" ? "bg-amber-500/10 border-amber-500/20 hover:bg-amber-500/20" :
                                        "bg-emerald-500/5 border-emerald-500/10"
                            )}
                        >
                            <div>
                                <div className="font-mono text-sm font-bold text-foreground">{asset.id}</div>
                                <div className={cn("text-xs",
                                    asset.status === "critical" ? "text-[#FF5C5C]" :
                                        asset.status === "warning" ? "text-[#FFB020]" : "text-[#00E0C6]"
                                )}>{asset.status.toUpperCase()}</div>
                            </div>
                            <div className="text-right">
                                <div className="text-foreground font-bold">{asset.score}%</div>
                                <div className="text-[10px] text-muted-foreground">Risk Score</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Top Degrading */}
            <div className="bg-foreground/5 backdrop-blur-md rounded-2xl border border-foreground/10 p-5 font-tinos font-serif">
                <h3 className="text-foreground/90 font-semibold mb-3 flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-[#FFB020]" /> Rapid Degradation
                </h3>
                <div className="space-y-3 font-tinos">
                    {degradingAssets.map((asset) => (
                        <div key={asset.id} className="flex items-center justify-between group cursor-pointer font-tinos">
                            <span className="text-foreground/80 font-medium text-sm group-hover:text-foreground transition-colors">{asset.id}</span>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-foreground font-mono">HI {asset.hi}</span>
                                <span className="text-xs text-rose-400 font-mono bg-rose-500/10 px-1 rounded">{asset.trend}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Alerts Timeline */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-5 font-tinos font-serif">
                <h3 className="text-white/90 font-semibold mb-3 flex items-center gap-2">
                    Timeline
                </h3>
                <div className="relative border-l border-foreground/10 ml-2 space-y-6 pl-4 py-1">
                    {alerts.map((alert, i) => (
                        <div key={i} className="relative">
                            <div className={cn("absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full ring-4 ring-background",
                                alert.type === "critical" ? "bg-[#FF5C5C]" :
                                    alert.type === "warning" ? "bg-[#FFB020]" : "bg-cyan-400"
                            )} />
                            <div className="text-xs text-muted-foreground font-mono mb-0.5">{alert.time}</div>
                            <div className="text-sm text-foreground font-medium">{alert.msg}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
