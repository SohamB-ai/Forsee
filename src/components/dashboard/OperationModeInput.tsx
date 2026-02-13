import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Settings2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface OperationModeInputProps {
    domain: string;
    operationMode: string;
    onModeChange: (mode: string) => void;
    shiftStart: string;
    onShiftStartChange: (time: string) => void;
    shiftEnd: string;
    onShiftEndChange: (time: string) => void;
    className?: string;
}

export const OperationModeInput: React.FC<OperationModeInputProps> = ({
    domain,
    operationMode,
    onModeChange,
    shiftStart,
    onShiftStartChange,
    shiftEnd,
    onShiftEndChange,
    className = "",
}) => {
    const [showGlow, setShowGlow] = useState(false);

    useEffect(() => {
        if (operationMode) {
            setShowGlow(true);
            const timer = setTimeout(() => setShowGlow(false), 400);
            return () => clearTimeout(timer);
        }
    }, [operationMode]);

    return (
        <motion.div
            id="operation-mode-card"
            className={`card-meta relative overflow-hidden rounded-2xl border border-border bg-card/40 backdrop-blur-xl p-4 shadow-xl ${className}`}
            initial={false}
            animate={{
                y: [0, -4, 0],
            }}
            transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            style={{
                boxShadow: showGlow
                    ? "0 0 20px 2px rgba(139, 75, 255, 0.4), var(--shadow-1)"
                    : "var(--shadow-1)"
            }}
        >
            {/* Mobile override: remove float animation on small screens is handled by CSS usually, 
          but we can also use a custom hook or media query if needed. 
          For now, we'll keep it simple or use a media query in index.css if necessary. */}

            <div className="space-y-3">
                <Label
                    htmlFor={`input-${domain}-operationMode`}
                    className="text-sm font-medium text-foreground/80 block"
                >
                    Operation Mode
                </Label>

                <Select
                    value={operationMode}
                    onValueChange={onModeChange}
                >
                    <motion.div whileTap={{ scale: 1.03 }}>
                        <SelectTrigger
                            id={`input-${domain}-operationMode`}
                            className="w-full bg-background/50 border-border/50 h-10 focus:ring-accent"
                            aria-label="Operation mode"
                            aria-describedby={`input-${domain}-operationMode-help`}
                        >
                            <SelectValue placeholder="Select mode" />
                        </SelectTrigger>
                    </motion.div>
                    <SelectContent className="bg-card/90 backdrop-blur-xl border-border">
                        <SelectItem value="continuous">Continuous</SelectItem>
                        <SelectItem value="shift">Shift-Based</SelectItem>
                        <SelectItem value="intermittent">Intermittent</SelectItem>
                    </SelectContent>
                </Select>

                <p id={`input-${domain}-operationMode-help`} className="text-[11px] text-muted-foreground italic">
                    Select the primary operational pattern for this system.
                </p>

                <AnimatePresence>
                    {operationMode === "shift" && (
                        <motion.div
                            initial={{ height: 0, opacity: 0, y: 10 }}
                            animate={{ height: "auto", opacity: 1, y: 0 }}
                            exit={{ height: 0, opacity: 0, y: 10 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="overflow-hidden space-y-3 pt-2"
                        >
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1.5">
                                    <Label htmlFor={`input-${domain}-shiftStart`} className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
                                        Shift Start
                                    </Label>
                                    <Input
                                        type="time"
                                        id={`input-${domain}-shiftStart`}
                                        value={shiftStart}
                                        onChange={(e) => onShiftStartChange(e.target.value)}
                                        className="h-9 bg-background/30 border-border/40 text-xs"
                                        aria-label="Shift start time"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor={`input-${domain}-shiftEnd`} className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
                                        Shift End
                                    </Label>
                                    <Input
                                        type="time"
                                        id={`input-${domain}-shiftEnd`}
                                        value={shiftEnd}
                                        onChange={(e) => onShiftEndChange(e.target.value)}
                                        className="h-9 bg-background/30 border-border/40 text-xs"
                                        aria-label="Shift end time"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Screen reader announcements */}
            <div id="live-region" aria-live="polite" className="sr-only">
                {operationMode === "shift"
                    ? `Operation mode set to Shift-Based. Shift start ${shiftStart}, end ${shiftEnd}.`
                    : `Operation mode set to ${operationMode}.`}
            </div>
        </motion.div>
    );
};
