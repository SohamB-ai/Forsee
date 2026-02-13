"use client";

import { Box, Calendar, Activity, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

interface AssetIdentityProps {
    systemName: string;
    className?: string;
}

export function AssetIdentity({ systemName, className }: AssetIdentityProps) {
    return (
        <div className={cn("flex flex-col gap-4", className)}>
            {/* Identity Header */}
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg border border-primary/20 flex items-center justify-center">
                    <Cpu className="w-6 h-6 text-primary" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-foreground">{systemName}</h1>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                        <span className="px-1.5 py-0.5 rounded bg-muted text-foreground">ID: #SYS-8842</span>
                        <span>•</span>
                        <span>Region: US-East-4</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
