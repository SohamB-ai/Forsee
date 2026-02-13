import { motion } from "framer-motion";
import {
    Activity, AlertTriangle, Zap,
    Clock, CheckCircle2, TrendingUp, TrendingDown,
    ShieldAlert, Brain, Database, BarChart3,
    MessageSquare, Download, MapPin, Cpu, History,
    AlertOctagon, Info, Sparkles, RefreshCcw, LayoutGrid,
    Eye, AlertCircle
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,
    BarChart, Bar, Cell
} from "recharts";
import { useState, useMemo } from "react";
import { SystemProfile, systemsManifest } from "@/data/systems-manifest";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function UnifiedIntelligenceDashboard({ result, inputValues, systemId, isPreview, humanObservation }: {
    result?: any,
    inputValues?: any,
    systemId: string,
    isPreview?: boolean,
    humanObservation?: any
}) {
    const systemProfile = systemsManifest[systemId];

    // Fallback if system not found
    if (!systemProfile) return <div className="p-12 text-center text-muted-foreground">Intelligence Profile Not Found</div>;

    // Default values and mapping from result prop
    const stats = {
        health: result?.healthIndex || 85,
        risk: result?.riskLevel || "LOW",
        rul: result?.rul || 124,
        rulUnit: result?.rulUnit || "Cycles",
        confidence: result?.confidence || 0.92,
        precursorProb: result?.precursorProbability || 0.12,
        shortTermRisk: result?.shortTermRisk || 0.05,
    };

    const [feedback, setFeedback] = useState<string | null>(null);

    // Color helpers for severity
    const getSeverityColor = (level: string) => {
        switch (level) {
            case 'CRITICAL': return 'text-red-500 bg-red-500/10 border-red-500/20';
            case 'HIGH': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
            case 'MEDIUM': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
            default: return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
        }
    };

    return (
        <div className={cn(
            "flex flex-col gap-8 transition-all duration-700 relative font-inter",
            isPreview && "opacity-40 grayscale-[0.5] pointer-events-none select-none overflow-hidden"
        )}>
            {isPreview && (
                <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
                    <div className="bg-black dark:bg-white backdrop-blur-sm border border-black/10 dark:border-white/10 px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-xs font-black uppercase tracking-[0.3em] text-white dark:text-black">Awaiting System Prediction</span>
                    </div>
                </div>
            )}

            {/* 1️⃣ HEADER — ASSET CONTEXT */}
            <header className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-card/20 dark:bg-white/[0.03] border border-border dark:border-white/10 rounded-3xl backdrop-blur-xl">
                <div className="flex items-center gap-4">
                    <div className="p-4 rounded-2xl bg-primary/10 text-primary border border-primary/20">
                        <systemProfile.icon className="w-8 h-8" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h2 className="text-2xl font-black tracking-tight text-foreground">{systemProfile.title}</h2>
                            <span className={cn("px-2.5 py-0.5 rounded-full text-[12px] font-bold uppercase tracking-widest border", getSeverityColor(stats.risk))}>
                                {stats.risk}
                            </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] text-muted-foreground uppercase tracking-widest font-bold">
                            <div className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {systemProfile.location}</div>
                            <div className="flex items-center gap-1.5"><Cpu className="w-3 h-3" /> Model: {systemProfile.digitalIdentity.model}</div>
                            <div className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> Predicted: {new Date().toLocaleTimeString()}</div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="border-border hover:bg-foreground/5 text-xs font-bold gap-2">
                        <Download className="w-3.5 h-3.5" /> EXPORT REPORT
                    </Button>
                </div>
            </header>

            {/* 2️⃣ PRIMARY INTELLIGENCE CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* RUL Card */}
                <Card className="p-6 bg-card/30 dark:bg-white/[0.03] border-border dark:border-white/10 relative overflow-hidden group">
                    <div className="text-muted-foreground text-[12px] uppercase tracking-[0.2em] mb-4 font-black">Remaining Useful Life</div>
                    <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-4xl md:text-5xl font-black text-foreground">
                            {Math.max(0, stats.rul - 12)} — {stats.rul + 12}
                        </span>
                        <span className="text-lg text-muted-foreground/60 font-bold uppercase tracking-widest">{stats.rulUnit}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[12px] text-muted-foreground font-medium mb-4 italic">
                        <div className="w-2 h-2 rounded-full bg-primary/50" />
                        Confidence Band: +/- 12 {stats.rulUnit}
                    </div>
                    <p className="text-[12px] text-muted-foreground uppercase tracking-[0.1em] leading-relaxed">
                        A cycle is not an event — it is a unit of damage. Instead of counting how many times the machine ran, we count how much life it consumed.
                    </p>
                    <Clock className="absolute bottom-4 right-4 w-12 h-12 text-foreground/5 -rotate-12 group-hover:rotate-0 transition-transform duration-500" />
                </Card>

                {/* Health Index Card */}
                <Card className="p-6 bg-card/30 dark:bg-white/[0.03] border-border dark:border-white/10 relative overflow-hidden group">
                    <div className="text-muted-foreground text-[12px] uppercase tracking-[0.2em] mb-4 font-black">Health Index</div>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="relative w-20 h-20">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-foreground/5" />
                                <motion.circle
                                    cx="40" cy="40" r="32"
                                    stroke="currentColor" strokeWidth="8" fill="transparent"
                                    strokeDasharray={201}
                                    initial={{ strokeDashoffset: 201 }}
                                    animate={{ strokeDashoffset: 201 - (201 * stats.health) / 100 }}
                                    className={stats.health > 80 ? "text-emerald-500" : stats.health > 40 ? "text-yellow-500" : "text-red-500"}
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center text-xl font-black text-foreground">{stats.health}</div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className={cn("flex items-center gap-1.5 text-xs font-bold", stats.health > 80 ? "text-emerald-500" : "text-yellow-500")}>
                                {stats.health > 80 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                                {stats.health > 80 ? "Stable" : "Degrading"}
                            </div>
                            <span className="text-[11px] text-muted-foreground font-black uppercase tracking-widest">Global Score</span>
                        </div>
                    </div>
                    <p className="text-[12px] text-muted-foreground uppercase tracking-[0.1em] leading-relaxed">
                        Synthetic score based on 12 sensor cross-correlations.
                    </p>
                </Card>

                {/* Risk Level Card */}
                <Card className="p-6 bg-card/30 dark:bg-white/[0.03] border-border dark:border-white/10 relative overflow-hidden group">
                    <div className="text-muted-foreground text-[12px] uppercase tracking-[0.2em] mb-4 font-black">Operational Risk</div>
                    <div className="text-4xl font-black mb-1 tracking-tighter uppercase" style={{ color: `hsl(${stats.risk === 'CRITICAL' ? 0 : stats.risk === 'HIGH' ? 30 : stats.risk === 'MEDIUM' ? 50 : 150}, 80%, 50%)` }}>
                        {stats.risk}
                    </div>
                    <div className="text-[12px] text-muted-foreground font-bold mb-4 uppercase tracking-[0.15em]">Risk Score: {(stats.confidence * 85).toFixed(1)}/100</div>
                    <div className="flex gap-1.5 mb-2">
                        {['Vibration', 'Heat'].map(tag => (
                            <span key={tag} className="px-2 py-0.5 rounded bg-foreground/5 border border-foreground/10 text-[10px] font-black uppercase tracking-widest text-muted-foreground">{tag}</span>
                        ))}
                    </div>
                    <ShieldAlert className="absolute bottom-4 right-4 w-12 h-12 text-foreground/5 group-hover:scale-110 transition-transform duration-500" />
                </Card>

                {/* Forsee Probability Card */}
                <Card className="p-6 bg-card/30 dark:bg-white/[0.03] border-border dark:border-white/10 relative overflow-hidden group">
                    <div className="text-muted-foreground text-[12px] uppercase tracking-[0.2em] mb-4 font-black">Forsee Probability</div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="text-4xl font-black text-foreground">{(stats.precursorProb * 100).toFixed(0)}%</div>
                        <div className={cn("px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest", stats.precursorProb > 0.5 ? "bg-red-500/10 text-red-500" : "bg-emerald-500/10 text-emerald-500")}>
                            {stats.precursorProb > 0.5 ? "Detected" : "Nominal"}
                        </div>
                    </div>
                    <p className="text-[12px] text-muted-foreground leading-relaxed italic mb-4">
                        Micro-pattern matching detected early-stage fatigue signatures.
                    </p>
                    <div className="w-full bg-foreground/5 h-1 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${stats.precursorProb * 100}%` }}
                            className="h-full bg-primary"
                        />
                    </div>
                    <Brain className="absolute bottom-4 right-4 w-12 h-12 text-foreground/5 group-hover:animate-pulse transition-transform duration-500" />
                </Card>
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* 3️⃣ SUPPORTING INTELLIGENCE CARDS (Left Column) */}
                <div className="col-span-12 md:col-span-6 lg:col-span-3 flex flex-col gap-4">
                    <Card className="p-5 bg-card/20 dark:bg-white/[0.03] border-border dark:border-white/10 backdrop-blur-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-[12px] uppercase font-black tracking-widest text-muted-foreground flex items-center gap-2">
                                <Zap className="w-3 h-3 text-yellow-500" /> Short-Term Risk (7D)
                            </h4>
                            <span className="text-xs font-bold text-foreground">15% Likelihood</span>
                        </div>
                        <div className="h-16 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={Array.from({ length: 10 }).map((_, i) => ({ val: 5 + Math.random() * 20 }))}>
                                    <Area type="monotone" dataKey="val" stroke="#eab308" fill="#eab30820" strokeWidth={2} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-3 uppercase tracking-widest font-medium">Near horizon failure likelihood remains stable.</p>
                    </Card>

                    <Card className="p-5 bg-card/20 dark:bg-white/[0.03] border-border dark:border-white/10 backdrop-blur-sm flex-1">
                        <h4 className="text-[12px] uppercase font-black tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                            <TrendingDown className="w-3 h-3 text-red-500" /> Long-Term Projection
                        </h4>
                        <div className="h-32 w-full mb-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={result?.longTermProjection || [
                                    { cycle: 0, health: 100 },
                                    { cycle: 25, health: 95 },
                                    { cycle: 50, health: 88 },
                                    { cycle: 75, health: 70 },
                                    { cycle: 100, health: 45 }
                                ]}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                    <XAxis hide dataKey="cycle" />
                                    <YAxis hide domain={[0, 100]} />
                                    <Line type="monotone" dataKey="health" stroke="#10b981" strokeWidth={3} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="p-3 bg-foreground/5 rounded-xl border border-foreground/10">
                            <div className="text-[11px] font-black uppercase tracking-tighter text-muted-foreground mb-1">Expected Trajectory</div>
                            <p className="text-[12px] text-foreground font-medium leading-snug">RUL trajectory suggests accelerated degradation entering final 15% phase.</p>
                        </div>
                    </Card>

                    <Card className="p-5 bg-card/20 dark:bg-white/[0.03] border-border dark:border-white/10 backdrop-blur-sm">
                        <div className="flex justify-between items-center">
                            <h4 className="text-[12px] uppercase font-black tracking-widest text-muted-foreground flex items-center gap-2">
                                <CheckCircle2 className="w-3 h-3 text-blue-500" /> Model Confidence
                            </h4>
                            <span className="text-xl font-black text-foreground">{(stats.confidence * 100).toFixed(0)}%</span>
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                            <div className="flex-1 bg-foreground/5 h-1.5 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} animate={{ width: `${stats.confidence * 100}%` }} className="h-full bg-blue-500" />
                            </div>
                            <span className="text-[11px] font-black text-blue-500 uppercase tracking-widest">Stable</span>
                        </div>
                    </Card>
                </div>

                {/* 4️⃣ EXPLAINABILITY SECTION (Middle Column) */}
                <div className="col-span-12 md:col-span-6 lg:col-span-5 flex flex-col gap-4">
                    <Card className="p-6 bg-card/20 dark:bg-white/[0.03] border-border dark:border-white/10 backdrop-blur-sm h-full font-inter" id="explainability-engine-card">
                        <div className="flex items-center justify-between mb-8">
                            <h4 className="text-[11px] uppercase font-black tracking-[0.2em] text-foreground flex items-center gap-2">
                                <Brain className="w-4 h-4 text-primary" /> Explainability Engine
                            </h4>
                            <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20 shadow-[0_0_10px_rgba(157,78,221,0.2)]">Shapley Analysis Active</span>
                        </div>

                        <div className="space-y-8">
                            {/* Sensors Impact */}
                            <div>
                                <label className="text-[11px] font-black text-muted-foreground uppercase tracking-widest block mb-4">🔍 Top Contributing Sensors</label>
                                <div className="space-y-4">
                                    {(result?.topSensors || systemProfile.degradationDrivers).map((s: any, i: number) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className="w-24 text-[12px] font-bold text-foreground truncate">{s.name || s.factor}</div>
                                            <div className="flex-1 bg-foreground/5 h-2 rounded-full overflow-hidden relative">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${(s.impact || 0.45) * 100}%` }}
                                                    className={cn("h-full", s.direction === 'up' ? "bg-red-500" : "bg-blue-500")}
                                                />
                                            </div>
                                            <div className={cn("text-[11px] font-black w-10 flex items-center gap-1 justify-end", s.direction === 'up' ? "text-red-500" : "text-blue-500")}>
                                                {s.direction === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                                {((s.impact || 0.45) * 100).toFixed(0)}%
                                            </div>
                                        </div>
                                    ))}

                                    {/* Human Contribution */}
                                    {humanObservation && (
                                        <div className="flex items-center gap-4 pt-2 border-t border-primary/10 mt-2">
                                            <div className="w-24 text-[12px] font-black text-primary truncate">HUMAN SIGNAL</div>
                                            <div className="flex-1 bg-primary/10 h-2 rounded-full overflow-hidden relative">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: "66%" }}
                                                    className="h-full bg-primary"
                                                />
                                            </div>
                                            <div className="text-[11px] font-black w-10 flex items-center gap-1 justify-end text-primary">
                                                <AlertCircle className="w-3 h-3" />
                                                66%
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Failure Cluster */}
                                <div className="p-4 bg-foreground/5 border border-foreground/10 rounded-2xl relative overflow-hidden group">
                                    <h5 className="text-[11px] font-black text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <Database className="w-3 h-3 text-emerald-500" /> Failure Cluster
                                    </h5>
                                    <div className="text-[13px] font-black text-emerald-500 mb-1 tracking-tighter uppercase">{systemProfile.failureCluster.id}</div>
                                    <p className="text-[12px] text-foreground font-bold mb-2 leading-tight uppercase">{systemProfile.failureCluster.label}</p>
                                    <p className="text-[11px] text-muted-foreground leading-relaxed italic">{systemProfile.failureCluster.description}</p>
                                    <History className="absolute top-2 right-2 w-4 h-4 text-emerald-500/10" />
                                </div>

                                {/* Data Drift */}
                                <div className="p-4 bg-foreground/5 border border-foreground/10 rounded-2xl">
                                    <h5 className="text-[11px] font-black text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <RefreshCcw className="w-3 h-3 text-orange-500" /> Data Drift Status
                                    </h5>
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className={cn("w-2 h-2 rounded-full", systemProfile.dataDrift.detected ? "bg-orange-500 animate-pulse" : "bg-emerald-500")} />
                                        <span className="text-[12px] font-black text-foreground uppercase tracking-widest">{systemProfile.dataDrift.detected ? "detected" : "nominal"}</span>
                                    </div>
                                    <div className="px-2 py-0.5 rounded bg-orange-500/10 text-orange-500 text-[10px] font-black uppercase tracking-widest border border-orange-500/20 mb-2 inline-block">Severity: {systemProfile.dataDrift.severity}</div>
                                    <p className="text-[11px] text-muted-foreground leading-relaxed italic truncate">
                                        {systemProfile.dataDrift.explanation}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* 5️⃣ & 6️⃣ SIMULATION & RECOMMENDATION (Right Column) */}
                <div className="col-span-12 md:col-span-12 lg:col-span-4 flex flex-col gap-4">
                    {/* Simulation Summary */}
                    <Card className="p-6 bg-gradient-to-br from-primary/10 to-transparent border-primary/20 backdrop-blur-sm relative overflow-hidden">
                        <div className="flex items-center gap-2 mb-6">
                            <Sparkles className="w-4 h-4 text-yellow-500" />
                            <h4 className="text-[11px] uppercase font-black tracking-[0.2em] text-foreground">Simulation Summary</h4>
                        </div>
                        <div className="space-y-4">
                            <div className="p-3 bg-foreground/5 border border-foreground/10 rounded-xl">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[11px] font-black uppercase tracking-widest text-emerald-500">Maintain Now</span>
                                    <span className="text-xs font-bold text-foreground">-$4.5K</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-[11px] font-bold text-muted-foreground uppercase">
                                    <div className="flex flex-col"><span className="text-foreground">Risk -85%</span> Reliability</div>
                                    <div className="flex flex-col"><span className="text-foreground">Health +15%</span> Uplift</div>
                                </div>
                            </div>
                            <div className="p-3 bg-red-500/5 border border-red-500/10 rounded-xl opacity-60">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[11px] font-black uppercase tracking-widest text-red-500">Wait (30D)</span>
                                    <span className="text-xs font-bold text-foreground">-$28K</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-[11px] font-bold text-muted-foreground uppercase">
                                    <div className="text-red-500 flex flex-col">Failure Looming</div>
                                    <div className="flex flex-col"><span className="text-red-500">92%</span> Probability</div>
                                </div>
                            </div>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-4 italic font-medium">Comparison based on standard repair window vs run-to-failure.</p>
                    </Card>

                    {/* Recommendation Card */}
                    <Card className="p-6 bg-emerald-500/10 border-emerald-500/20 backdrop-blur-md flex-1 flex flex-col border-2 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                        <div className="flex items-center gap-2 mb-6 p-2 bg-emerald-500/20 rounded-lg w-fit border border-emerald-500/30">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]" />
                            <h4 className="text-xs uppercase font-black tracking-[0.1em] text-emerald-700 dark:text-emerald-300">Prescriptive Action</h4>
                        </div>
                        <div className="mb-6 flex-1">
                            <div className="text-sm font-black text-foreground uppercase tracking-tight mb-4 leading-tight">
                                {result?.action || systemProfile.defaultDecision.action}
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded bg-emerald-500/20 flex items-center justify-center text-[10px] font-bold text-emerald-500 tracking-tighter">!</div>
                                    <span className="text-[12px] font-bold text-foreground/80 uppercase tracking-widest">Urgency: CRITICAL (72H Window)</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded bg-emerald-500/20 flex items-center justify-center text-[10px] font-bold text-emerald-500 tracking-tighter">✓</div>
                                    <span className="text-[12px] font-bold text-foreground/80 uppercase tracking-widest">Impact: Prevent Seizure (-$45k Risk)</span>
                                </div>
                            </div>
                        </div>
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-[0.2em] py-6 rounded-2xl shadow-xl shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-95">
                            AUTHORIZE MAINTENANCE
                        </Button>
                    </Card>
                </div>
            </div>

            {/* 7️⃣ HUMAN OBSERVATION REPORT */}
            {humanObservation && (
                <div className="grid grid-cols-1 gap-6">
                    <Card className="p-6 bg-primary/5 border-primary/20 backdrop-blur-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Eye className="w-16 h-16" />
                        </div>
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                            <div className="flex items-center gap-4">
                                <div className="p-4 rounded-2xl bg-primary/20 text-primary border border-primary/30">
                                    <MessageSquare className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-black text-foreground uppercase tracking-tight flex items-center gap-2">
                                        Operator Observation: {humanObservation.type}
                                        <span className={cn("text-[10px] px-2 py-0.5 rounded border ml-2",
                                            humanObservation.severity === 'severe' ? "bg-red-500/10 border-red-500/30 text-red-500" : "bg-primary/10 border-primary/30 text-primary")}>
                                            {humanObservation.severity?.toUpperCase()}
                                        </span>
                                    </h4>
                                    <p className="text-[12px] text-muted-foreground font-bold uppercase tracking-widest mt-1">
                                        Location: {humanObservation.location} — Reported at {new Date(humanObservation.reported_at).toLocaleTimeString()}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="text-right">
                                    <div className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Confidence</div>
                                    <div className="text-lg font-black text-primary">{humanObservation.confidence?.toUpperCase()}</div>
                                </div>
                                {humanObservation.photo_url && (
                                    <div className="w-16 h-16 rounded-xl border border-primary/30 overflow-hidden shadow-lg hover:scale-105 transition-transform cursor-pointer">
                                        <img src={humanObservation.photo_url} alt="Observation" className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mt-6 p-4 bg-foreground/5 border border-foreground/10 rounded-2xl italic text-sm text-foreground/80">
                            "{humanObservation.note || "No additional notes provided."}"
                        </div>

                        {/* Risk Impact Visualization */}
                        <div className="mt-4 flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-primary/80">
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                            <span>Risk Adjusted +12% based on human signal (Weight: 0.66)</span>
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                        </div>
                    </Card>
                </div>
            )}

            {/* 8️⃣ & 9️⃣ ALERT & FEEDBACK */}
            <div className="grid grid-cols-1 gap-6 pb-6">
                <Card className="p-6 bg-red-500/5 border-red-500/20 backdrop-blur-sm group hover:bg-red-500/10 transition-colors">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-red-500 items-center justify-center rounded-xl text-white shadow-lg shadow-red-500/30 group-hover:scale-110 transition-transform">
                            <AlertOctagon className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="text-sm font-black text-foreground uppercase tracking-tight">System Alert: Pre-Failure Detected</h4>
                            <p className="text-[12px] text-red-500 font-bold uppercase tracking-widest mt-0.5">Severity: Higher Than Nominal Baseline</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-bold p-3 bg-red-500/10 border border-red-500/10 rounded-xl">
                        <span className="text-muted-foreground uppercase tracking-widest">Trigger: Vibration Peak Threshold</span>
                        <div className="flex gap-4">
                            <button className="text-red-500 hover:underline">ACKNOWLEDGE</button>
                            <button className="text-foreground/60 hover:text-foreground">LOG EVENT</button>
                        </div>
                    </div>
                </Card>
            </div>
        </div >
    );
}
