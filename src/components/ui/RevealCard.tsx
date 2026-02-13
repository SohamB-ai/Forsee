"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealCardProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export function RevealCard({ children, className, delay = 0 }: RevealCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
            className={cn("h-full", className)}
        >
            {children}
        </motion.div>
    );
}
