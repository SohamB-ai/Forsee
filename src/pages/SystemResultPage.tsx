import { useLocation, useNavigate, useParams } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import {
    ArrowLeft, Download, FileText, RotateCcw,
    CheckCircle2, AlertTriangle, AlertOctagon,
    Activity, Zap, Clock, TrendingUp, Cpu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import NeuralBackground from "@/components/ui/flow-field-background";
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine
} from "recharts";
import { useEffect, useState } from "react";
import { systemsManifest } from "@/data/systems-manifest";
import { AssetIdentity } from "@/components/dashboard/AssetIdentity";
import UnifiedIntelligenceDashboard from "@/components/dashboard/UnifiedIntelligenceDashboard";

export default function SystemResultPage() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const result = location.state?.result;
    const inputValues = location.state?.inputs || {};
    const systemProfile = systemsManifest[slug || ""] || systemsManifest["wind-turbines"];

    if (!systemProfile) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-purple-100 to-white dark:from-background dark:via-background dark:to-background text-foreground overflow-hidden relative font-inter selection:bg-primary/30">
            {/* Background - Continuous Particle Flow */}
            <div className="fixed inset-0 z-0">
                <NeuralBackground color="#8B4BFF" speed={0.5} particleCount={400} />
            </div>

            {/* Top Navbar */}
            <header className="relative z-20 h-16 border-b border-border bg-background/80 backdrop-blur-md flex items-center justify-between px-6">
                <div className="flex items-center gap-6">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/system/${slug}`)} // Back to Input
                        className="text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </Button>
                    <div className="h-6 w-px bg-border" />
                    <AssetIdentity systemName={systemProfile.title} className="scale-90 origin-left" />

                    {/* Input Summary Row */}
                    <div className="hidden lg:flex items-center gap-4 ml-6">
                        {systemProfile.sensors.slice(0, 4).map((sensor) => (
                            <div key={sensor.id} className="flex items-center gap-2 text-xs bg-foreground/5 px-3 py-1.5 rounded-full border border-border">
                                <span className="text-muted-foreground uppercase tracking-wider text-[10px]">{sensor.label}</span>
                                <span className="font-mono text-primary font-medium">
                                    {inputValues[sensor.id] || sensor.defaultValue || "--"}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <span className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        Live Connection
                    </span>
                </div>
            </header>

            {/* Unified Intelligence Dashboard Container */}
            <div className="relative z-10 h-[calc(100vh-64px)] overflow-y-auto px-6 py-8 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <UnifiedIntelligenceDashboard
                        result={result}
                        inputValues={inputValues}
                        systemId={slug || ''}
                    />
                </div>
            </div>
        </div>
    );
}
