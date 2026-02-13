"use client";

import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import confetti from "canvas-confetti";
import NumberFlow from "@number-flow/react";

export interface PricingPlan {
    name: string;
    price: string;
    yearlyPrice: string;
    period: string;
    features: string[];
    description: string;
    buttonText: string;
    href: string;
    isPopular: boolean;
}

interface PricingProps {
    plans: PricingPlan[];
    title?: string;
    description?: string;
}

export function Pricing({
    plans,
    title = "Simple, Transparent Pricing",
    description = "Choose the plan that works for you\nAll plans include access to our platform, lead generation tools, and dedicated support.",
}: PricingProps) {
    const [isMonthly, setIsMonthly] = useState(true);
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const switchRef = useRef<HTMLButtonElement>(null);

    const handleToggle = (checked: boolean) => {
        setIsMonthly(!checked);
        if (checked && switchRef.current) {
            const rect = switchRef.current.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;

            confetti({
                particleCount: 50,
                spread: 60,
                origin: {
                    x: x / window.innerWidth,
                    y: y / window.innerHeight,
                },
                colors: [
                    "hsl(var(--primary))",
                    "hsl(var(--accent))",
                    "hsl(var(--secondary))",
                    "hsl(var(--muted))",
                ],
                ticks: 200,
                gravity: 1.2,
                decay: 0.94,
                startVelocity: 30,
                shapes: ["circle"],
            });
        }
    };

    return (
        <div className="container py-20">
            <div className="text-center space-y-4 mb-12">
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                    {title}
                </h2>
                <p className="text-muted-foreground text-lg whitespace-pre-line">
                    {description}
                </p>
            </div>

            <div className="flex justify-center mb-10">
                <label className="relative inline-flex items-center cursor-pointer">
                    <Label>
                        <Switch
                            ref={switchRef as any}
                            checked={!isMonthly}
                            onCheckedChange={handleToggle}
                            className="relative"
                        />
                    </Label>
                </label>
                <span className="ml-2 font-semibold text-foreground">
                    Annual billing <span className="text-primary">(Save 20%)</span>
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 sm:2 gap-4">
                {plans.map((plan, index) => (
                    <motion.div
                        key={index}
                        initial={{ y: 50, opacity: 1 }}
                        whileInView={
                            isDesktop
                                ? {
                                    y: plan.isPopular ? -20 : 0,
                                    opacity: 1,
                                    x: index === 2 ? -30 : index === 0 ? 30 : 0,
                                    scale: index === 0 || index === 2 ? 0.94 : 1.0,
                                }
                                : {}
                        }
                        viewport={{ once: true }}
                        transition={{
                            duration: 1.6,
                            type: "spring",
                            stiffness: 100,
                            damping: 30,
                            delay: 0.4,
                            opacity: { duration: 0.5 },
                        }}
                        className={cn(
                            `rounded-2xl border-[1px] p-6 text-center lg:flex lg:flex-col lg:justify-center relative transition-all duration-300`,
                            plan.isPopular
                                ? "bg-zinc-950 dark:bg-white text-white dark:text-black border-primary border-2 shadow-[0_0_20px_rgba(157,78,221,0.2)]"
                                : "bg-white dark:bg-zinc-950 text-black dark:text-white border-black/10 dark:border-white/10",
                            "flex flex-col",
                            !plan.isPopular && "mt-5",
                            index === 0 || index === 2
                                ? "z-0 transform translate-x-0 translate-y-0 -translate-z-[50px] rotate-y-[10deg]"
                                : "z-10",
                            index === 0 && "origin-right",
                            index === 2 && "origin-left"
                        )}
                    >

                        <div className="flex-1 flex flex-col">
                            <p className={cn(
                                "text-base font-semibold",
                                plan.isPopular ? "text-zinc-400 dark:text-zinc-500" : "text-muted-foreground"
                            )}>
                                {plan.name}
                            </p>
                            <div className="mt-6 flex items-center justify-center gap-x-2">
                                <span className={cn(
                                    "text-5xl font-bold tracking-tight",
                                    plan.isPopular ? "text-white dark:text-black" : "text-foreground"
                                )}>
                                    <NumberFlow
                                        value={
                                            isMonthly ? Number(plan.price) : Number(plan.yearlyPrice)
                                        }
                                        format={{
                                            style: "currency",
                                            currency: "INR",
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0,
                                        }}
                                        transformTiming={{
                                            duration: 500,
                                            easing: "ease-out",
                                        }}
                                        willChange
                                        className="font-variant-numeric: tabular-nums"
                                    />
                                </span>
                                {plan.period !== "Next 3 months" && (
                                    <span className={cn(
                                        "text-sm font-semibold leading-6 tracking-wide",
                                        plan.isPopular ? "text-zinc-400 dark:text-zinc-500" : "text-muted-foreground"
                                    )}>
                                        / {plan.period}
                                    </span>
                                )}
                            </div>

                            <p className={cn(
                                "text-xs leading-5",
                                plan.isPopular ? "text-zinc-500 dark:text-zinc-400" : "text-muted-foreground"
                            )}>
                                {isMonthly ? "billed monthly" : "billed annually"}
                            </p>

                            <ul className="mt-5 gap-2 flex flex-col">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                        <Check className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                                        <span className={cn(
                                            "text-left",
                                            plan.isPopular ? "text-white dark:text-black" : "text-foreground"
                                        )}>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <hr className={cn(
                                "w-full my-4",
                                plan.isPopular ? "border-white/10 dark:border-black/10" : "border-border"
                            )} />

                            <Link
                                to={plan.href}
                                className={cn(
                                    buttonVariants({
                                        variant: "outline",
                                    }),
                                    "group relative w-full gap-2 overflow-hidden text-lg font-semibold tracking-tighter",
                                    "transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-1 hover:bg-primary hover:text-primary-foreground",
                                    plan.isPopular
                                        ? "bg-primary text-primary-foreground border-transparent"
                                        : "bg-background text-foreground border-border"
                                )}
                            >
                                {plan.buttonText}
                            </Link>
                            <p className={cn(
                                "mt-6 text-xs leading-5",
                                plan.isPopular ? "text-zinc-400 dark:text-zinc-500" : "text-muted-foreground"
                            )}>
                                {plan.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
