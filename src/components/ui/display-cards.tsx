"use client";

import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface DisplayCardProps {
    className?: string;
    icon?: React.ReactNode;
    title?: string;
    description?: string;
    date?: string;
    iconClassName?: string;
    titleClassName?: string;
}

function DisplayCard({
    className,
    icon = <Sparkles className="size-5 text-purple-300" />,
    title = "Featured",
    description = "Discover amazing content",
    date = "Just now",
    iconClassName = "text-purple-500",
    titleClassName = "text-purple-500",
}: DisplayCardProps) {
    return (
        <div
            className={cn(
                "relative flex h-72 w-[32rem] -skew-y-[6deg] select-none flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-950 text-white dark:bg-white dark:border-zinc-200 dark:text-zinc-950 px-8 py-6 transition-all duration-500 hover:skew-y-0 hover:scale-105 hover:z-50 hover:border-purple-500 hover:shadow-[0_0_30px_rgba(157,78,221,0.3)] shadow-2xl font-outfit cursor-pointer",
                className
            )}
        >
            <div className="flex items-center gap-4">
                <span className="relative inline-flex items-center justify-center rounded-xl bg-purple-900/50 p-2.5 dark:bg-purple-100">
                    {icon}
                </span>
                <p className={cn("text-2xl font-bold tracking-tight", titleClassName)}>{title}</p>
            </div>
            <p className="text-xl font-medium text-zinc-200 dark:text-zinc-800 leading-relaxed mb-4">{description}</p>
            <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 border-t border-zinc-800 dark:border-zinc-100 pt-4">
                <span>{date}</span>
                <div className="flex gap-1">
                    <div className="size-1.5 rounded-full bg-purple-500" />
                    <div className="size-1.5 rounded-full bg-purple-500/50" />
                    <div className="size-1.5 rounded-full bg-purple-500/20" />
                </div>
            </div>
        </div>
    );
}

interface DisplayCardsProps {
    cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
    const defaultCards = [
        {
            className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
        },
        {
            className: "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
        },
        {
            className: "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
        },
    ];

    const displayCards = cards || defaultCards;

    return (
        <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
            {displayCards.map((cardProps, index) => (
                <DisplayCard key={index} {...cardProps} />
            ))}
        </div>
    );
}
