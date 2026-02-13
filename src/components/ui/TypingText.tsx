"use client";

import { motion } from "framer-motion";

interface TypingTextProps {
    text: string;
    className?: string;
    delay?: number;
    duration?: number;
}

export function TypingText({
    text,
    className = "",
    delay = 0,
    duration = 0.05,
}: TypingTextProps) {
    return (
        <h1 className={className} aria-label={text}>
            {text.split("").map((char, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ willChange: "opacity" }}
                    transition={{
                        duration: duration,
                        delay: delay + index * duration,
                    }}
                >
                    {char}
                </motion.span>
            ))}
        </h1>
    );
}
