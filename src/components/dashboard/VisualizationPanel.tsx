import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, ReferenceArea } from "recharts";
import { Maximize2, Gauge } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { generateRiskTrajectory } from "./mockData";

const data = generateRiskTrajectory(60);

export function VisualizationPanel() {
    return (
        <Card id="viz-panel" className="h-full border-none shadow-[var(--shadow-2)] bg-[var(--card-bg)] rounded-3xl overflow-hidden flex flex-col relative z-0">
            <div className="absolute top-4 right-4 z-10 flex gap-2">
                <Button size="icon" variant="secondary" className="rounded-full bg-[var(--card-bg)]/80 backdrop-blur-sm shadow-sm">
                    <Maximize2 className="w-4 h-4 text-[var(--muted)]" />
                </Button>
            </div>

            <div className="flex-1 p-6 flex flex-col relative">
                <h3 className="text-lg font-bold font-doto text-foreground mb-4 flex items-center gap-2">
                    <Gauge className="w-5 h-5 text-[var(--accent-color)]" />
                    Realtime Risk Trajectory
                </h3>

                <div id="chart-risk-trajectory" className="flex-1 w-full min-h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <defs>
                                <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--accent-color)" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="var(--accent-color)" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="t" hide />
                            <YAxis domain={[0, 100]} hide />
                            <Tooltip
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-1)' }}
                                itemStyle={{ color: 'var(--accent-color)', fontWeight: 'bold' }}
                            />
                            <ReferenceArea y1={75} y2={100} fill="var(--danger)" fillOpacity={0.05} />
                            <ReferenceArea y1={50} y2={75} fill="var(--warning)" fillOpacity={0.05} />
                            <Line
                                type="monotone"
                                dataKey="risk"
                                stroke="var(--accent-color)"
                                strokeWidth={3}
                                dot={{ r: 0 }}
                                activeDot={{ r: 6, strokeWidth: 0 }}
                                animationDuration={1000}
                            />
                            <Line
                                type="monotone"
                                dataKey="predicted"
                                stroke="var(--accent-color)"
                                strokeDasharray="5 5"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Risk Gauge Overlay */}
                <div id="risk-gauge" className="absolute top-6 right-20 bg-[var(--card-bg)]/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-[var(--border)]">
                    <div className="flex flex-col items-center">
                        <div className="text-4xl font-bold font-doto text-[var(--warning)]">56</div>
                        <div className="text-xs font-bold text-[var(--muted)] uppercase tracking-wide">Risk Score</div>
                    </div>
                </div>
            </div>

            {/* Sensor Strip */}
            <div id="sensors-strip" className="h-24 bg-[var(--bg)] border-t border-[var(--border)] grid grid-cols-6 divide-x divide-[var(--border)]">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="p-2 flex flex-col justify-center items-center hover:bg-[var(--card-bg)] transition-colors cursor-pointer group">
                        <span className="text-[10px] text-[var(--muted)] font-mono mb-1 group-hover:text-[var(--accent-color)]">SENS-0{i}</span>
                        <div className="w-full h-8 bg-[var(--muted)]/10 rounded-sm overflow-hidden relative">
                            <svg className="w-full h-full" preserveAspectRatio="none">
                                <polyline
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    className="text-[var(--muted)] group-hover:text-[var(--accent-color)]"
                                    points={`0,${Math.random() * 30} 10,${Math.random() * 30} 20,${Math.random() * 30} 30,${Math.random() * 30} 40,${Math.random() * 30}`}
                                />
                            </svg>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}
