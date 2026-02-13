"use client";

import { Lock, Unlock, UserCog, Bot } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type AutonomyLevel = "advisory" | "approval" | "autonomous";

export function HumanAutonomy() {
    const [level, setLevel] = useState<AutonomyLevel>("approval");

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-purple-100 flex items-center gap-2">
                    <UserCog className="w-5 h-5 text-cyan-400" />
                    Autonomy Control
                </h3>
                <span className="text-xs text-cyan-500 font-medium">
                    {level === "advisory" ? "Human-Led" : level === "approval" ? "Human-in-the-Loop" : "AI-Led"}
                </span>
            </div>

            <div className="bg-black/40 border border-white/10 rounded-full p-1 flex relative">
                {/* Slider Background */}
                <button
                    onClick={() => setLevel("advisory")}
                    className={cn(
                        "flex-1 py-1.5 px-3 rounded-full text-xs font-medium transition-all z-10 flex items-center justify-center gap-2",
                        level === "advisory" ? "text-black" : "text-gray-500 hover:text-gray-300"
                    )}>
                    <UserCog className="w-3 h-3" /> Advisory
                </button>
                <button
                    onClick={() => setLevel("approval")}
                    className={cn(
                        "flex-1 py-1.5 px-3 rounded-full text-xs font-medium transition-all z-10 flex items-center justify-center gap-2",
                        level === "approval" ? "text-black" : "text-gray-500 hover:text-gray-300"
                    )}>
                    <Lock className="w-3 h-3" /> Approval
                </button>
                <button
                    onClick={() => setLevel("autonomous")}
                    className={cn(
                        "flex-1 py-1.5 px-3 rounded-full text-xs font-medium transition-all z-10 flex items-center justify-center gap-2",
                        level === "autonomous" ? "text-white" : "text-gray-500 hover:text-gray-300"
                    )}>
                    <Bot className="w-3 h-3" /> Autonomous
                </button>

                {/* Sliding Pill */}
                <div className={cn(
                    "absolute top-1 bottom-1 w-[32%] rounded-full transition-all duration-300",
                    level === "advisory" ? "left-1 bg-white" :
                        level === "approval" ? "left-[34%] bg-cyan-400" :
                            "left-[67%] bg-purple-600"
                )} />
            </div>

            <p className="text-xs text-gray-500">
                {level === "advisory" && "AI suggests actions. Execution requires manual trigger."}
                {level === "approval" && "AI queues actions. Execution requires 1-click approval."}
                {level === "autonomous" && "AI executes actions within safety bounds (< $500 cost)."}
            </p>
        </div>
    );
}
