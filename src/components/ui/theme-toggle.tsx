import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
    className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
    const { isDark, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={cn(
                "group relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300",
                "bg-zinc-100/80 hover:bg-zinc-200 dark:bg-zinc-900/80 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800",
                className
            )}
            aria-label="Toggle theme"
        >
            <AnimatePresence mode="wait">
                {isDark ? (
                    <motion.div
                        key="moon"
                        initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Moon className="w-5 h-5 text-purple-400" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="sun"
                        initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Sun className="w-5 h-5 text-amber-500" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Subtle glow effect on hover */}
            <div className="absolute inset-0 rounded-full bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
        </button>
    );
}
