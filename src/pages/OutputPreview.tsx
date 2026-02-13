import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LampContainer } from "@/components/ui/lamp";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Button } from "@/components/ui/button";
import { useDashboard } from "@/context/DashboardContext";
import { Plus, Activity, AlertTriangle, AlertOctagon, CheckCircle, ChevronLeft, LayoutGrid } from "lucide-react";
import { toast } from "sonner";
import { TypingText } from "@/components/ui/TypingText";
import { motion, AnimatePresence } from "framer-motion";
import { renderCanvas, cleanupCanvas } from "@/components/ui/hero-designali";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import UnifiedIntelligenceDashboard from "@/components/dashboard/UnifiedIntelligenceDashboard";
import {
    ThumbsUp,
    ThumbsDown,
    History,
    Send,
    Loader2
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function OutputPreview() {
    const location = useLocation();
    const navigate = useNavigate();
    const { addDevice } = useDashboard();
    const { userRole } = useAuth();
    const state = location.state as { result: any; inputs: any; systemInfo: any } | undefined;

    useEffect(() => {
        renderCanvas();
        return () => cleanupCanvas();
    }, []);

    const [feedbackStatus, setFeedbackStatus] = useState<'RIGHT' | 'WRONG' | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleFeedbackSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        formData.append('predictionStatus', feedbackStatus || 'UNKNOWN');
        formData.append('systemId', systemInfo.id);
        formData.append('systemName', systemInfo.name);

        try {
            const response = await fetch("https://formspree.io/f/xnjbnogr", {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setIsSuccess(true);
                toast.success("Feedback Received", {
                    description: "Your insights have been captured for the next retraining cycle."
                });
                setTimeout(() => {
                    setIsSuccess(false);
                    setFeedbackStatus(null);
                }, 3000);
            }
        } catch (error) {
            console.error("Feedback submission failed", error);
            toast.error("Submission Failed", {
                description: "Unable to reach the feedback node. Please try again later."
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const riskColors = {
        LOW: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
        MEDIUM: "text-yellow-600 dark:text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
        HIGH: "text-orange-600 dark:text-orange-500 bg-orange-500/10 border-orange-500/20",
        CRITICAL: "text-red-600 dark:text-red-500 bg-red-500/10 border-red-500/20",
    };

    const dummyState = {
        result: {
            healthIndex: 82,
            riskLevel: "HIGH",
            failureMode: "Gearbox Bearing Wear",
            rul: 24,
            rulUnit: "Days",
            confidence: 0.94,
            precursorProbability: 0.78,
            shortTermRisk: 0.15,
            longTermProjection: [
                { cycle: 0, health: 100 },
                { cycle: 25, health: 95 },
                { cycle: 50, health: 88 },
                { cycle: 75, health: 70 },
                { cycle: 100, health: 45 }
            ],
            topSensors: [
                { name: "Vib-X Axis", impact: 0.45, direction: "up" },
                { name: "Motor Temp", impact: 0.32, direction: "up" },
                { name: "Oil Press", impact: 0.15, direction: "down" }
            ],
            dataDrift: { detected: true, severity: "Medium", explanation: "Input distributions deviate 12% from baseline." },
            failureCluster: { id: "CL-441", label: "G-Series Fatigue", description: "Matches 92% of known gearbox wear profiles." },
            simulation: {
                maintenanceNow: { riskReduction: 85, healthImprovement: 15, cost: 4500 },
                maintenanceLater: { riskReduction: 10, healthImprovement: 2, cost: 28000 }
            },
            action: "Schedule bearing inspection within 7 days to prevent critical failure."
        },
        systemInfo: {
            id: "wind-turbines",
            name: "Enterprise Wind Turbine (Demo)"
        }
    };

    const isDemo = !state;
    const { result, systemInfo } = state || dummyState;

    const handleAddToDashboard = () => {
        if (isDemo) {
            toast.info("Demo System", {
                description: "This is a preview. To add real systems, run a prediction first."
            });
            return;
        }
        addDevice({
            id: `${systemInfo.id}-${Date.now()}`,
            name: systemInfo.name,
            icon: Activity
        });
        toast.success(`${systemInfo.name} added to Dashboard`, {
            description: "You can now monitor this system in real-time."
        });
        navigate("/dashboard");
    };

    const RiskIcon = {
        LOW: CheckCircle,
        MEDIUM: AlertTriangle,
        HIGH: AlertTriangle,
        CRITICAL: AlertOctagon,
    }[result.riskLevel as keyof typeof riskColors] || Activity;

    return (
        <div className="relative min-h-screen">
            <canvas
                className="fixed inset-0 z-0 pointer-events-none w-full h-full opacity-80 dark:mix-blend-screen transition-opacity duration-500"
                id="canvas"
            />
            <LampContainer className="bg-gradient-to-br from-white via-purple-100 to-white dark:from-black dark:via-black dark:to-purple-900 min-h-screen pt-32 md:pt-48 pb-12">
                <SpotlightCard size={400} color="#9d4edd" className="opacity-30 dark:opacity-100" />
                <div className="container mx-auto px-4 relative z-10 max-w-5xl -mt-20">
                    {/* Top Level Navigation */}
                    <div className="mb-8 flex items-center justify-between">
                        <Button
                            onClick={() => navigate("/systems")}
                            variant="ghost"
                            className="text-muted-foreground hover:text-foreground hover:bg-foreground/5 -ml-4"
                        >
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Go to Systems
                        </Button>
                    </div>

                    {/* Demo Note */}
                    {isDemo && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mb-8 p-6 rounded-2xl bg-zinc-900 dark:bg-zinc-900 border border-[#9d4edd]/30 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left shadow-[0_0_30px_rgba(157,78,221,0.1)]"
                        >
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2 text-[#9d4edd] justify-center md:justify-start">
                                    <AlertTriangle className="w-5 h-5" />
                                    <span className="font-bold uppercase tracking-widest text-xs">Preview Mode</span>
                                </div>
                                <p className="text-zinc-100 text-lg font-medium">
                                    This is based on <strong>mock data</strong> for demonstration purposes.
                                </p>
                            </div>
                            <Button
                                onClick={() => navigate("/systems")}
                                className="bg-[#9d4edd] hover:bg-[#8b3dc7] text-white font-bold px-10 py-6 rounded-xl shadow-[0_0_20px_rgba(157,78,221,0.4)] transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
                            >
                                Go to Systems
                            </Button>
                        </motion.div>
                    )}

                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/5 border border-foreground/10 text-sm text-muted-foreground mb-4">
                            <Activity className="w-4 h-4 text-primary" />
                            <span>{isDemo ? "Demo Preview Result" : "Live Prediction Result"}</span>
                        </div>
                        <div className="text-4xl md:text-5xl font-bold text-foreground mb-4 flex justify-center gap-3">
                            <span className="text-muted-foreground font-normal">System:</span>
                            <TypingText text={systemInfo.name} className="text-foreground" />
                        </div>
                    </div>

                    {/* Main Results Grid - Unified for all systems */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-8 bg-card/10 dark:bg-transparent rounded-[2rem] border border-border/50 dark:border-transparent p-1 md:p-4 backdrop-blur-sm"
                    >
                        <UnifiedIntelligenceDashboard
                            result={result}
                            inputValues={location.state?.inputs}
                            systemId={systemInfo.id}
                            humanObservation={systemInfo?.human_observation}
                        />
                    </motion.div>

                    {/* Bottom Action Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col md:flex-row items-center justify-between bg-foreground/5 dark:bg-white/[0.03] backdrop-blur-md border border-foreground/10 dark:border-white/10 rounded-2xl p-6 gap-6"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/20 rounded-full text-primary">
                                <Activity className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-foreground font-bold">Monitor this System</h4>
                                <p className="text-sm text-muted-foreground">Add to your live dashboard for continuous real-time tracking.</p>
                            </div>
                        </div>

                        <div className="flex gap-4 w-full md:w-auto">
                            <Button
                                onClick={() => navigate("/systems")}
                                variant="outline"
                                className="flex-1 md:flex-none border-foreground/10 hover:bg-foreground/5 text-muted-foreground"
                            >
                                <LayoutGrid className="w-4 h-4 mr-2" />
                                Go to Systems
                            </Button>
                            {(userRole === 'engineer' || userRole === 'admin') ? (
                                <Button
                                    onClick={handleAddToDashboard}
                                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-[0_0_20px_rgba(139,75,255,0.2)] flex-1 md:flex-none"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add to Dashboard
                                </Button>
                            ) : (
                                <div className="hidden md:flex items-center px-4 text-[10px] text-muted-foreground uppercase tracking-widest font-bold border-l border-white/10 italic">
                                    Registration Restricted to Engineers & Admins
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* SECTION: HUMAN-IN-THE-LOOP FEEDBACK */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="mt-12"
                    >
                        <Card className="bg-white/50 dark:bg-white/[0.02] border-slate-200 dark:border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl shadow-2xl">
                            <div className="p-8 border-b border-slate-200 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="space-y-1 text-center md:text-left">
                                    <h3 className="text-xl font-black uppercase tracking-widest flex items-center justify-center md:justify-start gap-3 text-slate-900 dark:text-white">
                                        <History className="w-5 h-5 text-purple-600 dark:text-emerald-500" /> Human-in-the-Loop Feedback
                                    </h3>
                                    <p className="text-xs text-slate-500 dark:text-zinc-500 uppercase tracking-widest font-bold">Model Retraining & Validation Protocol</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Button
                                        onClick={() => setFeedbackStatus('RIGHT')}
                                        variant={feedbackStatus === 'RIGHT' ? 'default' : 'outline'}
                                        className={cn("px-6 py-5 rounded-xl border-slate-200 dark:border-white/10 gap-2 transition-all font-bold uppercase text-[10px] tracking-widest",
                                            feedbackStatus === 'RIGHT' ? "bg-emerald-600 hover:bg-emerald-700 text-white border-transparent" : "text-emerald-600 dark:text-emerald-500 hover:bg-emerald-500/10")}
                                    >
                                        <ThumbsUp className="w-4 h-4" /> Prediction Accurate
                                    </Button>
                                    <Button
                                        onClick={() => setFeedbackStatus('WRONG')}
                                        variant={feedbackStatus === 'WRONG' ? 'default' : 'outline'}
                                        className={cn("px-6 py-5 rounded-xl border-slate-200 dark:border-white/10 gap-2 transition-all font-bold uppercase text-[10px] tracking-widest",
                                            feedbackStatus === 'WRONG' ? "bg-red-600 hover:bg-red-700 text-white border-transparent" : "text-red-600 dark:text-red-500 hover:bg-red-500/10")}
                                    >
                                        <ThumbsDown className="w-4 h-4" /> Flag as Deviation
                                    </Button>
                                </div>
                            </div>

                            <AnimatePresence mode="wait">
                                {feedbackStatus && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="p-8"
                                    >
                                        <form onSubmit={handleFeedbackSubmit} className="space-y-6">
                                            {feedbackStatus === 'WRONG' && (
                                                <div className="space-y-3">
                                                    <Label className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">What went wrong?</Label>
                                                    <Textarea
                                                        name="errorDetails"
                                                        placeholder="Describe the discrepancy between prediction and reality... (e.g. False positive on vibration sensor #4)"
                                                        className="bg-slate-50 dark:bg-black/40 border-slate-200 dark:border-white/10 min-h-[100px] text-slate-700 dark:text-zinc-300 italic"
                                                        required
                                                    />
                                                </div>
                                            )}

                                            <div className="space-y-3">
                                                <Label className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">Expert Retraining Notes</Label>
                                                <Textarea
                                                    name="retrainingNotes"
                                                    placeholder="Provide system-specific context to help optimize the next learning cycle..."
                                                    className="bg-slate-50 dark:bg-black/40 border-slate-200 dark:border-white/10 min-h-[100px] text-slate-700 dark:text-zinc-300 italic"
                                                />
                                            </div>

                                            <div className="flex justify-end">
                                                <Button
                                                    disabled={isSubmitting}
                                                    type="submit"
                                                    className="px-10 py-6 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black italic uppercase tracking-tighter shadow-2xl gap-2 h-auto"
                                                >
                                                    {isSubmitting ? (
                                                        <Loader2 className="w-5 h-5 animate-spin" />
                                                    ) : (
                                                        <Send className="w-5 h-5" />
                                                    )}
                                                    {isSubmitting ? "Processing Signal..." : "Commit Signal to Dev Cycle"}
                                                </Button>
                                            </div>
                                        </form>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Card>
                    </motion.div>

                </div>
            </LampContainer>
        </div>
    );
}
