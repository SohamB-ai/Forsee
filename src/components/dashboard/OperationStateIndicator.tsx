import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Play, Pause, Wrench, Clock, Activity, Info } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export type OpState = "RUNNING" | "IDLE" | "MAINTENANCE";

interface StateChange {
    state: OpState;
    timestamp: string;
    reason: string;
}

interface OperationStateIndicatorProps {
    assetId: string;
    state: OpState;
    reason?: string;
    lastChange?: string;
    history?: StateChange[];
    riskLevel?: number; // 0-100
    className?: string;
}

const stateConfig = {
    RUNNING: {
        icon: Play,
        bg: "linear-gradient(45deg, #06b6d4, #8B4BFF)",
        textColor: "text-white",
        label: "RUNNING",
        ariaLive: "polite" as const,
    },
    IDLE: {
        icon: Pause,
        bg: "#F3F4F6",
        textColor: "text-muted-foreground",
        label: "IDLE",
        ariaLive: "polite" as const,
    },
    MAINTENANCE: {
        icon: Wrench,
        bg: "#F59E0B",
        textColor: "text-white",
        label: "MAINTENANCE",
        ariaLive: "assertive" as const,
    },
};

export const OperationStateIndicator: React.FC<OperationStateIndicatorProps> = ({
    assetId,
    state,
    reason = "System initialized",
    lastChange = new Date().toISOString(),
    history = [],
    riskLevel = 0,
    className = "",
}) => {
    const config = stateConfig[state];
    const Icon = config.icon;

    // 3D Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <TooltipProvider>
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                    <motion.div
                        id={`status-${assetId}-opState`}
                        role="status"
                        aria-live={config.ariaLive}
                        className={`relative group cursor-pointer ${className}`}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        style={{ perspective: 1000 }}
                    >
                        {/* Bobbing animation container */}
                        <motion.div
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            style={{ rotateX, rotateY }}
                            className="relative"
                        >
                            {/* Pulse Ring */}
                            <AnimatePresence mode="popLayout">
                                <motion.div
                                    key={`${state}-pulse`}
                                    initial={{ scale: 0.8, opacity: 0.5 }}
                                    animate={{ scale: 1.5, opacity: 0 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className="absolute inset-0 rounded-full border-2 border-primary/30 pointer-events-none"
                                />
                            </AnimatePresence>

                            {/* Risk Halo */}
                            {state === "RUNNING" && riskLevel > 60 && (
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute -inset-2 rounded-full bg-red-500/20 blur-md pointer-events-none"
                                />
                            )}

                            {/* Main Badge */}
                            <motion.div
                                layout
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                whileHover={{ scale: 1.06, y: -2 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className={`opstate-badge flex items-center justify-center gap-2 px-4 h-11 rounded-full shadow-[var(--shadow-1)] border border-white/10 overflow-hidden transition-colors duration-200`}
                                style={{ background: config.bg }}
                            >
                                <motion.div
                                    key={`${state}-icon`}
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    className={config.textColor}
                                >
                                    <Icon className="w-4 h-4" />
                                </motion.div>
                                <span className={`text-[11px] font-black tracking-widest ${config.textColor}`}>
                                    {config.label}
                                </span>

                                {/* Shimmer effect for running */}
                                {state === "RUNNING" && (
                                    <motion.div
                                        animate={{ x: ["-100%", "200%"] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                                    />
                                )}
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </TooltipTrigger>
                <TooltipContent
                    id={`opstate-tooltip-${assetId}`}
                    side="bottom"
                    className="p-0 border-none bg-transparent shadow-none"
                    sideOffset={10}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="w-64 bg-card/90 backdrop-blur-xl border border-border p-4 rounded-xl shadow-2xl"
                    >
                        <div className="space-y-4">
                            <div className="flex items-center justify-between pb-2 border-b border-border/50">
                                <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Status Report</span>
                                <Info className="w-3 h-3 text-muted-foreground" />
                            </div>

                            <div className="space-y-1.5">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-muted-foreground">Current State:</span>
                                    <span className={`font-bold ${config.textColor === 'text-white' ? 'text-primary' : config.textColor}`}>
                                        {state}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-muted-foreground">Since:</span>
                                    <span id={`opstate-lastchange-${assetId}`} className="font-mono text-[10px]">
                                        {new Date(lastChange).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                    </span>
                                </div>
                            </div>

                            <div className="p-2 rounded-lg bg-background/50 border border-border/30">
                                <div className="flex items-center gap-2 mb-1">
                                    <Activity className="w-3 h-3 text-primary" />
                                    <span className="text-[10px] font-bold text-foreground">Trigger Logic</span>
                                </div>
                                <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                                    "{reason}"
                                </p>
                            </div>

                            {history.length > 0 && (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-3 h-3 text-muted-foreground" />
                                        <span className="text-[10px] font-bold text-muted-foreground">Recent History</span>
                                    </div>
                                    <div className="space-y-2">
                                        {history.slice(0, 3).map((h, i) => (
                                            <div key={i} className="flex items-center justify-between text-[9px] border-l-2 border-border/30 pl-2">
                                                <span className="text-foreground/80">{h.state}</span>
                                                <span className="text-muted-foreground">{new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
