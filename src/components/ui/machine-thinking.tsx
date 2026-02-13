"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Cpu, Database, Network, Search, Zap } from "lucide-react";

const thinkingSteps = [
    { text: "Ingesting sensor telemetry vectors...", icon: Database },
    { text: "Normalizing data stream (0.4ms latency)...", icon: Network },
    { text: "Analyzing vibration spectral density...", icon: Activity },
    { text: "Comparing against 4,200 failure clusters...", icon: Search },
    { text: "Detecting multicomponent degradation patterns...", icon: TrendingUp },
    { text: "Simulating 1,000 future operating scenarios...", icon: Cpu },
    { text: "Calculating probability of RUL drift...", icon: Brain },
    { text: "Synthesizing optimal intervention strategy...", icon: Zap },
];

import { Activity, TrendingUp } from "lucide-react";

export const MachineThinking = ({ isThinking }: { isThinking: boolean }) => {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        if (isThinking) {
            setCurrentStep(0);
            const interval = setInterval(() => {
                setCurrentStep((prev) => (prev + 1) % thinkingSteps.length);
            }, 600); // Speed of thought
            return () => clearInterval(interval);
        }
    }, [isThinking]);

    return (
        <AnimatePresence>
            {isThinking && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-md"
                >
                    {/* Neural Network Ambience */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse" />
                    </div>

                    <div className="relative z-10 flex flex-col items-center max-w-md w-full p-8">
                        {/* Central Intelligence Core */}
                        <div className="relative mb-12">
                            <div className="w-24 h-24 rounded-full border border-purple-500/30 flex items-center justify-center relative">
                                <div className="absolute inset-0 rounded-full border-t-2 border-purple-500 animate-spin" />
                                <div className="absolute inset-2 rounded-full border-r-2 border-cyan-500 animate-spin-slow" />
                                <Brain className="w-10 h-10 text-white/80 animate-pulse" />
                            </div>

                            {/* Scanning Lines */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent animate-scan-vertical" />
                        </div>

                        {/* Cognitive Log */}
                        <div className="w-full space-y-4">
                            <div className="h-8 flex items-center justify-center overflow-hidden relative">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentStep}
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -20, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex items-center gap-3 text-purple-200 font-mono text-sm"
                                    >
                                        {(() => {
                                            const StepIcon = thinkingSteps[currentStep].icon;
                                            return <StepIcon className="w-4 h-4 text-cyan-400" />;
                                        })()}
                                        <span>{thinkingSteps[currentStep].text}</span>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-purple-500 to-cyan-400"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 4.5, ease: "linear" }}
                                />
                            </div>

                            <p className="text-center text-xs text-white/40 uppercase tracking-widest">
                                System Reasoning Active
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
