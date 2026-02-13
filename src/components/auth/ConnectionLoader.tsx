"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Cpu, Network } from "lucide-react";

interface ConnectionLoaderProps {
    isVisible: boolean;
    onComplete?: () => void;
}

export function ConnectionLoader({ isVisible, onComplete }: ConnectionLoaderProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!isVisible) {
            setProgress(0);
            return;
        }

        const duration = 2500; // 2.5 seconds
        const interval = 20; // 20ms steps
        const step = 100 / (duration / interval);

        const timer = setInterval(() => {
            setProgress((prev) => {
                const next = prev + step;
                if (next >= 100) {
                    clearInterval(timer);
                    // Small delay before completion to let user see 100%
                    setTimeout(() => onComplete?.(), 500);
                    return 100;
                }
                return next;
            });
        }, interval);

        return () => clearInterval(timer);
    }, [isVisible, onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center overflow-hidden"
                >
                    {/* Cyber Background Patterns */}
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-scan" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
                    </div>

                    <div className="relative z-10 flex flex-col items-center gap-8">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="relative"
                        >
                            <div className="w-24 h-24 rounded-full border-2 border-primary/20 flex items-center justify-center relative">
                                <motion.div
                                    className="absolute inset-0 rounded-full border-t-2 border-primary"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                />
                                <Cpu className="w-10 h-10 text-primary animate-pulse" />
                            </div>
                        </motion.div>

                        <div className="flex flex-col items-center gap-2">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-2xl font-bold tracking-tighter uppercase flex items-center gap-3 text-foreground"
                            >
                                <Network className="w-5 h-5 text-primary" />
                                <span>Connecting to Forsee <span className="text-primary">AI</span></span>
                            </motion.div>

                            <div className="w-64 h-1 bg-muted rounded-full mt-4 relative overflow-hidden">
                                <motion.div
                                    className="absolute inset-y-0 left-0 bg-primary shadow-[0_0_10px_#9d4edd]"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>

                            <motion.div
                                className="text-4xl font-black tabular-nums mt-4 text-primary"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                {Math.round(progress)}%
                            </motion.div>
                        </div>
                    </div>

                    <style>{`
            @keyframes scan {
              0% { transform: translateY(-100vh); }
              100% { transform: translateY(100vh); }
            }
            .animate-scan {
              animation: scan 4s linear infinite;
            }
          `}</style>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
