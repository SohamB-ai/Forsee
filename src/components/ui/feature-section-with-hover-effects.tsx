import { cn } from "@/lib/utils";
import {
    IconHourglassHigh,
    IconSearch,
    IconActivity,
    IconShieldCheck,
    IconLayersIntersect,
    IconTrendingUp,
    IconFlask,
    IconTools,
} from "@tabler/icons-react";

export function FeaturesSectionWithHoverEffects() {
    const features = [
        {
            title: "Remaining Useful Life (RUL)",
            description: "A cycle is not an event — it is a unit of damage. Instead of counting how many times the machine ran, we count how much life it consumed.",
            icon: <IconHourglassHigh className="text-blue-600 dark:text-blue-400" />,
        },
        {
            title: "Precursor Probability",
            description: "Calculates the statistical likelihood of failure precursors manifesting within the next operational cycle.",
            icon: <IconSearch className="text-purple-700 dark:text-purple-400" />,
        },
        {
            title: "Health Index (0–100)",
            description: "Single interpretable score for asset health.",
            icon: <IconActivity className="text-emerald-700 dark:text-emerald-400" />,
        },
        {
            title: "Risk Scoring",
            description: "Quantified risk combining degradation, trends, and time-to-failure.",
            icon: <IconShieldCheck className="text-orange-700 dark:text-orange-400" />,
        },
        {
            title: "Failure Mode Clustering",
            description: "Group similar failure behaviors to identify root causes.",
            icon: <IconLayersIntersect className="text-cyan-700 dark:text-cyan-400" />,
        },
        {
            title: "Drift Detection",
            description: "Detect when live data deviates from trained behavior.",
            icon: <IconTrendingUp className="text-pink-700 dark:text-pink-400" />,
        },
        {
            title: "What-If Simulation",
            description: "Simulate maintenance timing, load stress, and environment changes.",
            icon: <IconFlask className="text-indigo-700 dark:text-indigo-400" />,
        },
        {
            title: "Actionable Recommendations",
            description: "Human-readable, prioritized maintenance actions.",
            icon: <IconTools className="text-amber-700 dark:text-amber-400" />,
        },
    ];
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
            {features.map((feature, index) => (
                <Feature key={feature.title} {...feature} index={index} />
            ))}
        </div>
    );
}

const Feature = ({
    title,
    description,
    icon,
    index,
}: {
    title: string;
    description: string;
    icon: React.ReactNode;
    index: number;
}) => {
    return (
        <div
            className={cn(
                "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
                (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
                index < 4 && "lg:border-b dark:border-neutral-800"
            )}
        >
            {index < 4 && (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-zinc-100 dark:from-neutral-800 to-transparent pointer-events-none" />
            )}
            {index >= 4 && (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-zinc-100 dark:from-neutral-800 to-transparent pointer-events-none" />
            )}
            <div className="mb-4 relative z-10 px-10 text-zinc-950 dark:text-neutral-400 transition-transform group-hover/feature:scale-110">
                {icon}
            </div>
            <div className="text-lg font-bold mb-2 relative z-10 px-10">
                <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-zinc-300 dark:bg-neutral-700 group-hover/feature:bg-[#9d4edd] transition-all duration-200 origin-center" />
                <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-zinc-900 dark:text-neutral-100">
                    {title}
                </span>
            </div>
            <p className="text-sm text-black dark:text-neutral-300 max-w-xs relative z-10 px-10 font-bold dark:font-normal">
                {description}
            </p>
        </div>
    );
};
