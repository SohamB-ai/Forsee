import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Rocket, Layers, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import NeuralBackground from "@/components/ui/flow-field-background";

export default function FutureScalability() {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-background flex flex-col items-center justify-start pt-32 pb-20 p-6 text-center">
            {/* Background - Consistent with other pages */}
            <div className="fixed inset-0 z-0 dark:opacity-100 opacity-40 transition-opacity duration-500">
                <NeuralBackground
                    color="#9d4edd"
                    speed={0.4}
                    trailOpacity={0.15}
                    particleCount={400}
                />
            </div>

            <div className="relative z-10 max-w-2xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-8"
                >
                    <div className="inline-flex items-center justify-center p-4 rounded-3xl bg-primary/10 border border-primary/20 mb-4">
                        <Rocket className="w-12 h-12 text-primary" />
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground uppercase">
                            Kept for <span className="text-primary">Future Scalability</span>
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed max-w-lg mx-auto">
                            This module is currently being optimized for global-scale deployment.
                            Stay tuned for advanced enterprise features and seamless integration capabilities.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12">
                        {[
                            { icon: Layers, label: "Advanced API", desc: "Enterprise endpoints" },
                            { icon: Sparkles, label: "AI Optimization", desc: "Automated scaling" },
                            { icon: Rocket, label: "Fast Lane", desc: "Priority processing" }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 + 0.5 }}
                                className="p-6 rounded-2xl bg-card/40 backdrop-blur-xl border border-border/50 flex flex-col items-center gap-3"
                            >
                                <item.icon className="w-6 h-6 text-primary" />
                                <div className="font-bold text-sm text-foreground">{item.label}</div>
                                <div className="text-[10px] text-muted-foreground uppercase tracking-widest">{item.desc}</div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        <Button
                            onClick={() => navigate("/pricing")}
                            variant="outline"
                            className="group px-8 py-6 rounded-2xl border-primary/20 hover:bg-primary/10 transition-all gap-2 font-bold uppercase tracking-widest text-xs"
                        >
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                            Back to Pricing
                        </Button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Subtle Gradient Overlay */}
            <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-transparent via-background/20 to-background/50 z-5" />
        </div>
    );
}
