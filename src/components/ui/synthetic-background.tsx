"use client";

import { cn } from "@/lib/utils";

/**
 * SyntheticBackground - Animated purple gradient background
 * Pure CSS implementation for reliability
 */
export function SyntheticBackground({ className }: { className?: string }) {
    return (
        <div className={cn("absolute inset-0 z-0 pointer-events-none overflow-hidden bg-black", className)}>
            {/* Top Purple Glow */}
            <div
                className="absolute w-[200%] h-[200%] -top-[100%] -left-[50%] rounded-full"
                style={{
                    background: 'radial-gradient(ellipse at center, rgba(147, 51, 234, 0.5) 0%, rgba(88, 28, 135, 0.25) 30%, transparent 60%)',
                    animation: 'pulse-slow 8s ease-in-out infinite alternate',
                }}
            />

            {/* Bottom Purple Glow */}
            <div
                className="absolute w-[200%] h-[200%] -bottom-[100%] -left-[50%] rounded-full"
                style={{
                    background: 'radial-gradient(ellipse at center, rgba(126, 34, 206, 0.4) 0%, rgba(76, 29, 149, 0.2) 30%, transparent 60%)',
                    animation: 'pulse-slow 10s ease-in-out infinite alternate-reverse',
                }}
            />

            {/* Center Accent */}
            <div
                className="absolute w-full h-full top-0 left-0"
                style={{
                    background: 'radial-gradient(ellipse at 50% 50%, rgba(168, 85, 247, 0.3) 0%, transparent 40%)',
                    animation: 'pulse-slow 6s ease-in-out infinite',
                }}
            />
        </div>
    );
}

export default SyntheticBackground;
