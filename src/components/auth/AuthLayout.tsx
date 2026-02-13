import React from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    description: string;
}

export function AuthLayout({ children, title, description }: AuthLayoutProps) {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full bg-background flex flex-col relative overflow-hidden">
            {/* Background elements */}
            <div className="fixed inset-0 bg-gradient-to-br from-white via-purple-50 to-purple-100/30 dark:from-black dark:via-zinc-950 dark:to-black pointer-events-none" />

            {/* Header */}
            <header className="relative z-50 flex items-center justify-between px-8 py-8 w-full max-w-7xl mx-auto">
                <div
                    className="flex items-center gap-2 cursor-pointer group"
                    onClick={() => navigate("/")}
                >
                    <span className="text-2xl font-bold tracking-tight text-[#9d4edd] group-hover:text-[#b388ff] transition-colors">
                        Forsee <span className="text-foreground">AI</span>
                    </span>
                </div>
                <ThemeToggle />
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-[400px] text-center"
                >
                    <div className="mb-8 space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
                        <p className="text-muted-foreground">{description}</p>
                    </div>

                    <div className="bg-card/50 backdrop-blur-xl border border-border rounded-3xl p-8 shadow-2xl">
                        {children}
                    </div>
                </motion.div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 py-8 text-center">
                <p className="text-xs text-muted-foreground/60 uppercase tracking-widest">
                    &copy; {new Date().getFullYear()} Forsee AI. Secure Intel systems.
                </p>
            </footer>
        </div>
    );
}
