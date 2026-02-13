import { useState, useEffect } from "react";
import {
    BarChart3,
    Users,
    Settings,
    ShieldCheck,
    Activity,
    Database,
    AlertTriangle,
    CheckCircle2,
    TrendingUp,
    TrendingDown,
    Globe,
    Clock,
    Cpu,
    Lock,
    Search,
    Filter,
    ArrowUpRight,
    RefreshCw,
    Layout,
    Terminal,
    Play,
    Zap,
    MoreVertical,
    Monitor,
    Inbox,
    Check,
    XCircle,
    Wrench
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    LineChart,
    Line
} from "recharts";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { renderCanvas, cleanupCanvas } from "@/components/ui/hero-designali";
import { getRequests, updateRequestStatus, SystemRequest } from "@/lib/systemRequests";

// Mock Data
const kpiData = [
    { label: "Total Assets Connected", value: "2,842", trend: "+12%", trendUp: true, color: "text-blue-500", icon: Globe },
    { label: "Active Devices", value: "2,710/2,842", detail: "95.4% Online", trend: "+3%", trendUp: true, color: "text-emerald-500", icon: Monitor },
    { label: "Critical Risks", value: "14", trend: "+2", trendUp: false, color: "text-red-500", icon: AlertTriangle },
    { label: "Average Health Index", value: "88.2", trend: "-1.2%", trendUp: false, color: "text-amber-500", icon: Activity },
    { label: "Predictions Run Today", value: "84,291", trend: "+18%", trendUp: true, color: "text-purple-500", icon: Cpu },
    { label: "Active ML Models", value: "64", detail: "8 Deployments", trend: "Stable", trendUp: true, color: "text-blue-400", icon: Database },
];

const modelHealth = [
    { type: "RUL Prediction", accuracy: 94.2, status: "Healthy", drift: "None", trained: "2h ago", chart: [88, 89, 92, 91, 93, 94] },
    { type: "Fault Clustering", accuracy: 89.8, status: "Warning", drift: "Minor", trained: "1d ago", chart: [92, 91, 89, 90, 88, 89] },
    { type: "Anomaly Detection", accuracy: 98.1, status: "Healthy", drift: "None", trained: "4h ago", chart: [96, 97, 98, 97, 98, 98] },
];

const auditLogs = [
    { id: 1, user: "Soham Dev", action: "Triggered Retraining", resource: "CNN-V3-RUL", timestamp: "10 mins ago", severity: "low" },
    { id: 2, user: "System", action: "Auto-Scale Events", resource: "Inference Cluster", timestamp: "25 mins ago", severity: "low" },
    { id: 3, user: "Admin", action: "Policy Change", resource: "Asset Severity Matrix", timestamp: "1h ago", severity: "medium" },
    { id: 4, user: "Jane Doe", action: "User Role Update", resource: "John Smith (Engineer)", timestamp: "3h ago", severity: "medium" },
];

const assets = [
    { id: "TX-901", name: "Turbine Alpha", type: "Wind Turbine", location: "North Sea", health: 92, rul: "140D", risk: "Low", model: "WNT-Gen4" },
    { id: "TX-902", name: "Turbine Beta", type: "Wind Turbine", location: "North Sea", health: 14, rul: "12D", risk: "Critical", model: "WNT-Gen4" },
    { id: "PF-400", name: "Pump Unit 4", type: "Centrifugal Pump", location: "Houston, TX", health: 65, rul: "45D", risk: "Medium", model: "PMP-V2" },
    { id: "DR-112", name: "Drill Head 12", type: "Oil Rig", location: "Gulf of Mexico", health: 48, rul: "22D", risk: "High", model: "RIG-Deep" },
];

const users = [
    { name: "Soham Dev", email: "soham@forsee.ai", role: "Admin", status: "Active", lastLogin: "Just now" },
    { name: "Sarah Lee", email: "sarah@forsee.ai", role: "Engineer", status: "Active", lastLogin: "2h ago" },
    { name: "Mike Ross", email: "mike@forsee.ai", role: "Viewer", status: "Active", lastLogin: "1d ago" },
    { name: "Alex Chen", email: "alex@forsee.ai", role: "Engineer", status: "Suspended", lastLogin: "1w ago" },
];

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("overview");
    const [systemRequests, setSystemRequests] = useState<SystemRequest[]>([]);
    const [roleRequests, setRoleRequests] = useState<any[]>([]);

    const fetchRoleRequests = () => {
        const reqs = JSON.parse(localStorage.getItem('forsee_role_requests') || '[]');
        setRoleRequests(reqs.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
    };

    useEffect(() => {
        renderCanvas();
        setSystemRequests(getRequests());
        fetchRoleRequests();
        return () => {
            cleanupCanvas();
        };
    }, []);

    const handleApproveRole = (requestId: string) => {
        const reqs = JSON.parse(localStorage.getItem('forsee_role_requests') || '[]');
        const updatedReqs = reqs.map((r: any) => {
            if (r.id === requestId) {
                // Mark request as approved
                const updated = { ...r, status: 'approved' };

                // Also update the global approved roles map
                const approvedRoles = JSON.parse(localStorage.getItem('forsee_approved_roles') || '{}');
                approvedRoles[r.userId] = r.requestedRole;
                localStorage.setItem('forsee_approved_roles', JSON.stringify(approvedRoles));

                return updated;
            }
            return r;
        });
        localStorage.setItem('forsee_role_requests', JSON.stringify(updatedReqs));
        setRoleRequests(updatedReqs);
        toast.success("Role request approved successfully");
    };

    const handleRejectRole = (requestId: string) => {
        const reqs = JSON.parse(localStorage.getItem('forsee_role_requests') || '[]');
        const updatedReqs = reqs.map((r: any) => {
            if (r.id === requestId) {
                return { ...r, status: 'rejected' };
            }
            return r;
        });
        localStorage.setItem('forsee_role_requests', JSON.stringify(updatedReqs));
        setRoleRequests(updatedReqs);
        toast.error("Role request rejected");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-200 dark:from-black dark:via-black dark:to-[#2e1065] text-slate-900 dark:text-white pt-24 pb-12 px-6 font-tinos overflow-x-hidden transition-colors duration-300 selection:bg-purple-500/30 selection:text-purple-200 relative">
            {/* Background Ambience - Canvas */}
            <canvas
                className="fixed inset-0 z-0 pointer-events-none w-full h-full opacity-80 dark:mix-blend-screen transition-opacity duration-500"
                id="canvas"
            ></canvas>

            <div className="max-w-[1600px] mx-auto relative z-10 space-y-8">

                {/* TOP HEADER — GLOBAL CONTROL BAR */}
                <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-6 rounded-3xl bg-[#0a0a0a] border border-white/10 backdrop-blur-xl shadow-2xl transition-all">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="w-6 h-6 text-emerald-500" />
                            <h1 className="text-3xl font-black uppercase tracking-tighter italic text-white">Admin Control</h1>
                        </div>
                        <p className="text-zinc-500 text-sm font-medium tracking-widest uppercase">Global Administration & Oversight Node</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-4 px-6 py-2.5 rounded-2xl bg-white/5 border border-white/5 shadow-inner">
                            <div className="flex flex-col items-center">
                                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1">Environment</span>
                                <span className="text-xs font-black text-emerald-500 uppercase flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Production
                                </span>
                            </div>
                            <div className="w-px h-8 bg-white/10" />
                            <div className="flex flex-col items-center px-2">
                                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1">Active Users</span>
                                <span className="text-sm font-black text-white px-2 py-0.5 rounded bg-white/5">128</span>
                            </div>
                            <div className="w-px h-8 bg-white/10" />
                            <div className="flex flex-col items-center">
                                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1">Alerts</span>
                                <div className="flex gap-2">
                                    <span className="text-xs font-black text-red-500">14C</span>
                                    <span className="text-xs font-black text-amber-500">32W</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* SECTION 1 — SYSTEM OVERVIEW (KPI CARDS) */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                    {kpiData.map((kpi, i) => (
                        <Card key={i} className="p-5 bg-white/70 dark:bg-white/[0.03] border-slate-200 dark:border-white/10 group hover:border-purple-300 dark:hover:border-white/20 transition-all duration-500 relative overflow-hidden shadow-md dark:shadow-none">
                            <div className="flex justify-between items-start mb-4">
                                <div className={cn("p-2 rounded-lg bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/5", kpi.color)}>
                                    <kpi.icon className="w-5 h-5" />
                                </div>
                                <div className={cn("flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-widest", kpi.trendUp ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-500" : "bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-500")}>
                                    {kpi.trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                    {kpi.trend}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-2xl font-black text-slate-900 dark:text-white">{kpi.value}</div>
                                <div className="text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest group-hover:text-slate-700 dark:group-hover:text-zinc-400 transition-colors">{kpi.label}</div>
                                {kpi.detail && <div className="text-[10px] font-medium text-emerald-600 dark:text-emerald-500/70 italic uppercase">{kpi.detail}</div>}
                            </div>
                            <div className="absolute -bottom-2 -right-2 opacity-[0.05] dark:opacity-[0.02] transform rotate-12 group-hover:scale-110 transition-transform duration-700">
                                <kpi.icon className="w-24 h-24 text-purple-600 dark:text-white" />
                            </div>
                        </Card>
                    ))}
                </section>

                {/* MAIN DASHBOARD GRID */}
                <div className="grid grid-cols-12 gap-8">

                    {/* LEFT COLUMN (8/12) */}
                    <div className="col-span-12 xl:col-span-8 space-y-8">

                        {/* SECTION 2 — ASSET & DEVICE HEALTH PANEL */}
                        <Card className="bg-[#0a0a0a] border-white/10 overflow-hidden rounded-3xl backdrop-blur-md shadow-2xl transition-all">
                            <div className="p-6 border-b border-white/10 flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-black uppercase tracking-widest flex items-center gap-2 text-white">
                                        <Database className="w-4 h-4 text-emerald-500" /> Fleet Asset Inventory
                                    </h3>
                                    <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">Enterprise-wide device status and risk concentration</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                                        <Input className="w-64 h-9 pl-9 bg-black/40 border-white/5 text-xs rounded-xl focus:border-white/20 text-white" placeholder="Filter assets by ID or location..." />
                                    </div>
                                    <Button size="icon" variant="outline" className="h-9 w-9 border-white/10 bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
                                        <Filter className="w-4 h-4 text-white" />
                                    </Button>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-white/[0.02] text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">
                                            <th className="px-6 py-4">Asset Identification</th>
                                            <th className="px-6 py-4">Type / Location</th>
                                            <th className="px-6 py-4 text-center">Health Index</th>
                                            <th className="px-6 py-4">RUL Estimate</th>
                                            <th className="px-6 py-4">Risk Priority</th>
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {assets.map((asset) => (
                                            <tr key={asset.id} className="group hover:bg-white/[0.02] transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs border border-white/10",
                                                            asset.health < 30 ? "bg-red-500/10 text-red-500" : "bg-black/40 text-blue-400")}>
                                                            {asset.id.split('-')[0]}
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-black text-white">{asset.name}</div>
                                                            <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">ID: {asset.id}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-xs font-bold text-white uppercase">{asset.type}</div>
                                                    <div className="text-[10px] text-zinc-500 flex items-center gap-1">
                                                        <Globe className="w-3 h-3" /> {asset.location}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col items-center gap-1.5">
                                                        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden max-w-[80px]">
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${asset.health}%` }}
                                                                className={cn("h-full", asset.health < 30 ? "bg-red-500" : asset.health < 70 ? "bg-amber-500" : "bg-emerald-500")}
                                                            />
                                                        </div>
                                                        <span className={cn("text-[10px] font-black uppercase tracking-widest", asset.health < 30 ? "text-red-500" : asset.health < 70 ? "text-amber-500" : "text-emerald-500")}>
                                                            {asset.health}% Nominal
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-xs font-black text-white">{asset.rul}</div>
                                                    <div className="text-[10px] text-zinc-500 italic uppercase">Optimized Prediction</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={cn("px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                                                        asset.risk === 'Critical' ? "bg-red-500/10 text-red-500 border-red-500/20" :
                                                            asset.risk === 'High' ? "bg-orange-500/10 text-orange-500 border-orange-500/20" :
                                                                asset.risk === 'Medium' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                                                                    "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                                    )}>
                                                        {asset.risk}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-white transition-colors">
                                                        <MoreVertical className="w-4 h-4" />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>

                        {/* SECTION 3 — MODEL & INTELLIGENCE STATUS */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {modelHealth.map((model, i) => (
                                <Card key={i} className="p-6 bg-white/70 dark:bg-white/[0.03] border-slate-200 dark:border-white/10 rounded-3xl relative overflow-hidden group shadow-lg dark:shadow-none transition-all hover:shadow-xl dark:hover:shadow-none">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h4 className="text-sm font-black uppercase tracking-widest text-slate-500 dark:text-zinc-400">{model.type}</h4>
                                            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">{model.accuracy}% <span className="text-[10px] text-slate-500 dark:text-zinc-500">ACC</span></div>
                                        </div>
                                        <div className={cn("px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border",
                                            model.status === 'Healthy'
                                                ? "bg-emerald-100 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-500 dark:border-emerald-500/20"
                                                : "bg-red-100 text-red-600 border-red-200 dark:bg-red-500/10 dark:text-red-500 dark:border-red-500/20")}>
                                            {model.status}
                                        </div>
                                    </div>

                                    <div className="h-20 w-full mb-6">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={model.chart.map((v, i) => ({ x: i, v }))}>
                                                <defs>
                                                    <linearGradient id={`grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor={model.status === 'Healthy' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? "#10b981" : "#7c3aed") : "#ef4444"} stopOpacity={0.3} />
                                                        <stop offset="95%" stopColor={model.status === 'Healthy' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? "#10b981" : "#7c3aed") : "#ef4444"} stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <Area type="monotone" dataKey="v" stroke={model.status === 'Healthy' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? "#10b981" : "#7c3aed") : "#ef4444"} fillOpacity={1} fill={`url(#grad-${i})`} strokeWidth={2} />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>

                                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                                        <div className="text-slate-500 dark:text-zinc-500">Drift: <span className={model.drift !== 'None' ? 'text-red-600 dark:text-red-500' : 'text-emerald-600 dark:text-emerald-500'}>{model.drift}</span></div>
                                        <div className="text-slate-500 dark:text-zinc-500">Last Trained: <span className="text-slate-900 dark:text-white">{model.trained}</span></div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/5 flex gap-2">
                                        <Button variant="outline" className="flex-1 h-8 text-[9px] font-black uppercase tracking-widest bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl transition-all">
                                            Re-Train
                                        </Button>
                                        <Button variant="outline" size="icon" className="h-8 w-8 border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl transition-all">
                                            <Settings className="w-3.5 h-3.5 text-slate-600 dark:text-white" />
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        {/* SECTION 5 — USER & ACCESS CONTROL */}
                        <Card className="bg-white/70 dark:bg-white/[0.03] border-slate-200 dark:border-white/10 overflow-hidden rounded-3xl shadow-lg dark:shadow-none transition-all">
                            <div className="p-6 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-black uppercase tracking-widest flex items-center gap-2 text-slate-900 dark:text-white">
                                        <Users className="w-4 h-4 text-purple-600 dark:text-blue-500" /> Identity Management
                                    </h3>
                                    <p className="text-xs text-slate-500 dark:text-zinc-500 mt-1 uppercase tracking-wider">Configure organization roles and workspace access</p>
                                </div>
                                <Button className="bg-purple-600 hover:bg-purple-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-xl gap-2 font-black uppercase text-[10px] tracking-widest shadow-lg shadow-purple-500/20 dark:shadow-blue-500/20 transition-all">
                                    <Lock className="w-3.5 h-3.5" /> Provision New Identity
                                </Button>
                            </div>
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-white/[0.02] text-[10px] font-black text-slate-500 dark:text-zinc-400 uppercase tracking-[0.2em]">
                                        <th className="px-6 py-4">Full Identity</th>
                                        <th className="px-6 py-4">Assigned Role</th>
                                        <th className="px-6 py-4">Auth Status</th>
                                        <th className="px-6 py-4">Last Activity</th>
                                        <th className="px-6 py-4 text-right">Access Control</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-white/5">
                                    {users.map((user, i) => (
                                        <tr key={i} className="hover:bg-slate-100/30 dark:hover:bg-white/[0.01] transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-black text-sm text-slate-900 dark:text-white">{user.name}</div>
                                                <div className="text-[10px] text-slate-500 dark:text-zinc-500 font-bold tracking-widest">{user.email}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={cn("text-[10px] font-black uppercase tracking-widest",
                                                    user.role === 'Admin' ? "text-purple-600 dark:text-purple-400" : user.role === 'Engineer' ? "text-blue-600 dark:text-blue-400" : "text-slate-500 dark:text-zinc-400")}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className={cn("w-1.5 h-1.5 rounded-full shadow-[0_0_8px]", user.status === 'Active' ? "bg-emerald-500 shadow-emerald-500/50" : "bg-red-500 shadow-red-500/50")} />
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">{user.status}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-zinc-400">
                                                {user.lastLogin}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Button variant="outline" className="h-8 text-[9px] font-black uppercase tracking-widest border-slate-200 dark:border-white/10 hover:text-red-600 hover:border-red-400 transition-all rounded-xl dark:hover:text-red-500 dark:hover:border-red-500/50">
                                                    Revoke
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Card>

                        {/* SYSTEM INTEGRATION REQUESTS */}
                        <Card className="bg-[#0a0a0a] border-white/10 rounded-3xl shadow-2xl transition-all">
                            <div className="p-6 border-b border-white/10 flex items-center justify-between">
                                <h3 className="text-md font-black uppercase tracking-widest flex items-center gap-2 text-white">
                                    <Inbox className="w-4 h-4 text-purple-400" /> System Requests
                                </h3>
                                {systemRequests.filter(r => r.status === 'pending').length > 0 && (
                                    <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 text-[10px] font-black tracking-[0.2em]">
                                        {systemRequests.filter(r => r.status === 'pending').length} PENDING
                                    </span>
                                )}
                            </div>
                            <div className="p-4 space-y-3 max-h-[420px] overflow-y-auto custom-scrollbar">
                                {systemRequests.length === 0 ? (
                                    <div className="py-8 text-center">
                                        <Inbox className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
                                        <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">No requests yet</p>
                                    </div>
                                ) : (
                                    systemRequests.map((req) => (
                                        <div key={req.id} className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl transition-all duration-300 hover:border-white/10">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-black text-sm text-white uppercase tracking-tight truncate">{req.systemName}</div>
                                                    <div className="text-[10px] text-zinc-500 font-bold tracking-widest mt-0.5">
                                                        By <span className="text-purple-400">{req.submittedBy}</span>
                                                    </div>
                                                </div>
                                                <span className={cn("px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border flex-shrink-0",
                                                    req.status === 'pending' ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                                                        req.status === 'approved' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                                                            "bg-red-500/10 text-red-400 border-red-500/20"
                                                )}>
                                                    {req.status}
                                                </span>
                                            </div>
                                            {req.details && (
                                                <p className="text-xs text-zinc-400 leading-relaxed mb-3 line-clamp-2 italic">{req.details}</p>
                                            )}
                                            <div className="flex items-center justify-between">
                                                <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">
                                                    {new Date(req.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                                {req.status === 'pending' && (
                                                    <div className="flex gap-2">
                                                        <Button
                                                            size="icon"
                                                            className="h-7 w-7 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-sm transition-all"
                                                            onClick={() => {
                                                                updateRequestStatus(req.id, 'approved');
                                                                setSystemRequests(getRequests());
                                                                toast.success(`Approved: ${req.systemName}`);
                                                            }}
                                                        >
                                                            <Check className="w-3.5 h-3.5" />
                                                        </Button>
                                                        <Button
                                                            size="icon"
                                                            variant="outline"
                                                            className="h-7 w-7 border-white/10 hover:text-red-500 hover:border-red-500/50 text-zinc-400 rounded-lg transition-all"
                                                            onClick={() => {
                                                                updateRequestStatus(req.id, 'rejected');
                                                                setSystemRequests(getRequests());
                                                                toast.error(`Rejected: ${req.systemName}`);
                                                            }}
                                                        >
                                                            <XCircle className="w-3.5 h-3.5" />
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </Card>

                        {/* ROLE ACCESS REQUESTS */}
                        <Card className="bg-[#0a0a0a] border-white/10 rounded-3xl shadow-2xl transition-all">
                            <div className="p-6 border-b border-white/10 flex items-center justify-between">
                                <h3 className="text-md font-black uppercase tracking-widest flex items-center gap-2 text-white">
                                    <ShieldCheck className="w-4 h-4 text-blue-400" /> Role Access Requests
                                </h3>
                                {roleRequests.filter(r => r.status === 'pending').length > 0 && (
                                    <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[10px] font-black tracking-[0.2em]">
                                        {roleRequests.filter(r => r.status === 'pending').length} PENDING
                                    </span>
                                )}
                            </div>
                            <div className="p-4 space-y-3 max-h-[420px] overflow-y-auto custom-scrollbar">
                                {roleRequests.length === 0 ? (
                                    <div className="py-8 text-center">
                                        <Users className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
                                        <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">No role requests</p>
                                    </div>
                                ) : (
                                    roleRequests.map((req) => (
                                        <div key={req.id} className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl transition-all hover:bg-white/[0.04]">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex-1 overflow-hidden">
                                                    <div className="font-black text-sm text-white truncate">{req.userName}</div>
                                                    <div className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase truncate">{req.userEmail}</div>
                                                </div>
                                                <span className={cn("px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border ml-2",
                                                    req.status === 'pending' ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                                                        req.status === 'approved' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                                                            "bg-red-500/10 text-red-400 border-red-500/20"
                                                )}>
                                                    {req.status}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between mt-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="p-1.5 rounded bg-primary/10 border border-primary/20">
                                                        <Wrench className="w-3 h-3 text-primary" />
                                                    </div>
                                                    <span className="text-[10px] font-black uppercase tracking-[0.1em] text-zinc-300">Requested: {req.requestedRole}</span>
                                                </div>

                                                {req.status === 'pending' && (
                                                    <div className="flex gap-2">
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="h-7 px-3 text-[9px] font-black uppercase border-white/10 hover:bg-emerald-500/10 hover:text-emerald-500"
                                                            onClick={() => handleApproveRole(req.id)}
                                                        >
                                                            Approve
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="h-7 px-3 text-[9px] font-black uppercase border-white/10 hover:bg-red-500/10 hover:text-red-500"
                                                            onClick={() => handleRejectRole(req.id)}
                                                        >
                                                            Reject
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </Card>

                    </div>

                    {/* RIGHT COLUMN (4/12) */}
                    <div className="col-span-12 xl:col-span-4 space-y-8">

                        {/* SECTION 4 — ALERT & RISK GOVERNANCE */}
                        <Card className="bg-white/70 dark:bg-white/[0.03] border-slate-200 dark:border-white/10 rounded-3xl backdrop-blur-md shadow-lg dark:shadow-none transition-all">
                            <div className="p-6 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
                                <h3 className="text-lg font-black uppercase tracking-widest flex items-center gap-2 text-slate-900 dark:text-white">
                                    <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-500" /> Active Alert Queue
                                </h3>
                                <span className="px-2 py-0.5 rounded bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-500 text-[10px] font-black tracking-[0.2em]">14 UNRESOLVED</span>
                            </div>
                            <div className="p-4 space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar">
                                {[1, 2, 3].map((_, i) => (
                                    <div key={i} className="p-4 bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 rounded-2xl group hover:border-red-400/50 dark:hover:border-red-500/30 transition-all duration-300">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-red-600 dark:bg-red-500 animate-pulse" />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-red-600 dark:text-red-400">CRITICAL PRIORITY</span>
                                            </div>
                                            <span className="text-[9px] text-slate-500 dark:text-zinc-500 font-bold uppercase tracking-widest">Acknowledge in 2h</span>
                                        </div>
                                        <div className="font-black text-sm mb-1 uppercase italic tracking-tight text-slate-900 dark:text-white">Vibration Overload: Turbine B</div>
                                        <p className="text-xs text-slate-600 dark:text-zinc-500 leading-relaxed italic mb-4">Detected micro-seizures in bearing assembly #4. Degradation rate exceeding threshold by 45%.</p>
                                        <div className="flex items-center gap-2">
                                            <Button className="flex-1 h-8 text-[9px] font-black uppercase tracking-widest bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all">Assign Team</Button>
                                            <Button variant="outline" className="flex-1 h-8 text-[9px] font-black uppercase tracking-widest border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl transition-all">Escalate</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* SECTION 7 — CONFIGURATION & THRESHOLDS */}
                        <Card className="p-6 bg-[#0a0a0a] border-white/10 rounded-3xl shadow-2xl transition-all">
                            <h3 className="text-md font-black uppercase tracking-widest flex items-center gap-2 mb-6 text-white">
                                <Settings className="w-4 h-4 text-amber-500" /> Organization Thresholds
                            </h3>
                            <div className="space-y-6">
                                {[
                                    { label: "Health Warning Threshold", value: 65, unit: "%", d: "Alerts trigger below this index" },
                                    { label: "Critical Risk Threshold", value: 30, unit: "%", d: "Automatic maintenance authorization level" },
                                    { label: "Drift Sensitivity", value: 2.5, unit: "σ", d: "Standard deviations to flag drift" },
                                ].map((s, i) => (
                                    <div key={i} className="space-y-3">
                                        <div className="flex justify-between items-baseline">
                                            <div className="text-[11px] font-black uppercase tracking-widest text-zinc-400">{s.label}</div>
                                            <div className="text-lg font-black text-white">{s.value}{s.unit}</div>
                                        </div>
                                        <div className="w-full bg-white/5 h-1.5 rounded-full">
                                            <div className="h-full bg-amber-500/50" style={{ width: `${(s.value / 100) * 100}%` }} />
                                        </div>
                                        <div className="text-[9px] text-zinc-500 font-medium uppercase tracking-widest italic">{s.d}</div>
                                    </div>
                                ))}
                            </div>
                            <Button variant="outline" className="w-full mt-8 h-10 text-[10px] font-black uppercase tracking-widest border-white/10 bg-white/5 hover:bg-white/10 rounded-xl gap-2 transition-all text-white">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Persist Changes to Core
                            </Button>
                        </Card>

                        {/* SECTION 8 — AUDIT & COMPLIANCE LOGS */}
                        <Card className="bg-white/70 dark:bg-white/[0.03] border-slate-200 dark:border-white/10 rounded-3xl shadow-lg dark:shadow-none transition-all">
                            <div className="p-6 border-b border-slate-200 dark:border-white/10">
                                <h3 className="text-md font-black uppercase tracking-widest flex items-center gap-2 text-slate-900 dark:text-white">
                                    <Terminal className="w-4 h-4 text-purple-600 dark:text-blue-400" /> Audit Logs
                                </h3>
                            </div>
                            <div className="p-6 space-y-6">
                                {auditLogs.map((log) => (
                                    <div key={log.id} className="relative pl-6 border-l-2 border-slate-200 dark:border-white/5 pb-2">
                                        <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-purple-600/30 dark:bg-white/20" />
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">{log.action}</span>
                                            <span className="text-[9px] text-slate-400 dark:text-zinc-600 font-bold uppercase">{log.timestamp}</span>
                                        </div>
                                        <div className="text-[10px] text-slate-500 dark:text-zinc-400 font-medium uppercase tracking-wide">
                                            <span className="text-purple-600 dark:text-blue-400">{log.user}</span> • {log.resource}
                                        </div>
                                    </div>
                                ))}
                                <Button variant="link" className="w-full text-xs text-slate-500 dark:text-zinc-500 font-bold uppercase tracking-widest hover:text-purple-600 dark:hover:text-white transition-colors">
                                    View Full Compliance Ledger
                                </Button>
                            </div>
                        </Card>

                    </div>
                </div>
            </div>
        </div>
    );
}
