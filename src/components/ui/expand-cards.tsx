"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ExpandOnHoverProps {
    items: {
        title: string;
        description: string;
        image: string;
        icon?: React.ReactNode;
    }[];
}

const ExpandOnHover = ({ items }: ExpandOnHoverProps) => {
    const [expandedIndex, setExpandedIndex] = useState(0);

    return (
        <div className="w-full py-12 px-4 md:px-0">
            <div className="relative grid grid-cols-1 lg:flex w-full items-center justify-center gap-2 lg:h-[30rem] transition-all duration-500">
                {items.map((item, idx) => {
                    const isExpanded = idx === expandedIndex;
                    return (
                        <div
                            key={idx}
                            className={cn(
                                "relative cursor-pointer overflow-hidden rounded-3xl transition-all duration-700 ease-in-out border border-zinc-200/20 dark:border-white/10 group h-[20rem] lg:h-full",
                                isExpanded ? "w-full lg:w-[32rem]" : "hidden lg:block w-16 md:w-20"
                            )}
                            onMouseEnter={() => setExpandedIndex(idx)}
                        >
                            <img
                                className={cn(
                                    "w-full h-full object-cover transition-all duration-700",
                                    !isExpanded && "grayscale opacity-50 contrast-125"
                                )}
                                src={item.image}
                                alt={item.title}
                            />

                            <div className={cn(
                                "absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500",
                                isExpanded ? "opacity-100" : "opacity-0"
                            )} />

                            <div className={cn(
                                "absolute inset-0 flex flex-col justify-end p-6 transition-all duration-700",
                                isExpanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                            )}>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 rounded-xl bg-[#9d4edd] text-white">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-2xl font-black text-white tracking-tighter">
                                        {item.title}
                                    </h3>
                                </div>
                                <p className="text-zinc-200 text-lg font-bold leading-tight max-w-md">
                                    {item.description}
                                </p>
                            </div>

                            {!isExpanded && (
                                <div className="absolute inset-0 flex items-center justify-center rotate-90 whitespace-nowrap">
                                    <span className="text-black dark:text-white font-black tracking-widest uppercase text-xs">
                                        {item.title}
                                    </span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ExpandOnHover;
