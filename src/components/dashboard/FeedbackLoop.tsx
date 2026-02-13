"use client";

import { ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function FeedbackLoop() {
    const [feedback, setFeedback] = useState<"positive" | "negative" | null>(null);

    if (feedback) {
        return (
            <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg flex items-center gap-3 animate-fade-in">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                    <ThumbsUp className="w-4 h-4" />
                </div>
                <div>
                    <p className="text-sm font-medium text-green-300">Feedback Captured</p>
                    <p className="text-xs text-green-400/60">Model weights updated for this asset class.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-black/40 border border-white/10 p-4 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Outcome Validation
                </h4>
                <span className="text-[10px] text-gray-600">Model v3.4</span>
            </div>

            <p className="text-sm text-gray-300">
                Was the "Insulation Degradation" diagnosis accurate?
            </p>

            <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFeedback("positive")}
                    className="flex-1 bg-white/5 border-white/10 hover:bg-green-500/20 hover:text-green-400"
                >
                    <ThumbsUp className="w-3 h-3 mr-2" /> Yes
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFeedback("negative")}
                    className="flex-1 bg-white/5 border-white/10 hover:bg-red-500/20 hover:text-red-400"
                >
                    <ThumbsDown className="w-3 h-3 mr-2" /> No
                </Button>
            </div>
        </div>
    );
}
