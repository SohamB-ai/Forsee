import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from "recharts";
import { History, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useMemo } from "react";

interface MachineHistoryCardProps {
    deviceId?: string;
}

export function MachineHistoryCard({ deviceId = "dev-01" }: MachineHistoryCardProps) {
    const historyData = useMemo(() => {
        const seed = deviceId.charCodeAt(deviceId.length - 1);
        return Array.from({ length: 7 }, (_, i) => ({
            day: ["M", "T", "W", "T", "F", "S", "S"][i],
            uptime: 90 + ((seed + i) % 10),
            faults: (seed + i) % 4
        }));
    }, [deviceId]);

    return (
        <div className="bg-foreground/5 backdrop-blur-md rounded-2xl border border-foreground/10 p-6 flex flex-col h-full min-h-[200px] font-tinos font-serif">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-foreground/90 font-semibold flex items-center gap-2 font-inter">
                    <History className="w-4 h-4 text-muted-foreground" /> Machine History (7 Days)
                </h3>
                <div className="flex gap-2">
                    <span className="text-xs px-2 py-1 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-inter">96.5% Uptime</span>
                </div>
            </div>

            <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={historyData}>
                        <Tooltip
                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155" }}
                            itemStyle={{ color: "#f8fafc" }}
                        />
                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                        <Bar dataKey="uptime" fill="#334155" radius={[4, 4, 0, 0]} barSize={30} />
                        <Bar dataKey="faults" fill="#FF5C5C" radius={[4, 4, 0, 0]} barSize={30} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-4 flex gap-4 text-xs text-muted-foreground font-inter">
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded bg-foreground/20" /> Normal Operation</div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded bg-[#FF5C5C]" /> Critical Faults</div>
            </div>
        </div>
    );
}
