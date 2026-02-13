"use client"
import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion'
import { cn } from '@/lib/utils';

// Types
export interface PricingPlan {
    name: string;
    monthlyPrice: number;
    yearlyPrice: number;
    features: string[];
    isPopular?: boolean;
    accent: string;
    rotation?: number;
}

interface PricingProps {
    title?: string;
    plans: PricingPlan[];
    className?: string;
    darkMode?: boolean;
}

// Counter Component
const Counter = ({ from, to }: { from: number; to: number }) => {
    const nodeRef = useRef<HTMLSpanElement>(null);
    React.useEffect(() => {
        const node = nodeRef.current;
        if (!node) return;
        const controls = animate(from, to, {
            duration: 1,
            onUpdate(value) {
                node.textContent = value.toFixed(0);
            },
        });
        return () => controls.stop();
    }, [from, to]);
    return <span ref={nodeRef} />;
};

// Header Component
const PricingHeader = ({ title, darkMode = false }: { title: string; darkMode?: boolean }) => (
    <div className="text-center mb-8 sm:mb-12 relative z-10">
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block"
        >
            <h1 className={cn(
                "text-3xl sm:text-4xl lg:text-5xl font-black px-8 py-4 rounded-xl border-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.9),_15px_15px_15px_-3px_rgba(0,0,0,0.1)] transform transition-transform hover:translate-x-1 hover:translate-y-1 mb-3 relative before:absolute before:inset-0 before:rounded-xl before:blur-sm before:-z-10",
                darkMode
                    ? "text-white bg-gradient-to-r from-gray-900 to-black border-purple-500 before:bg-purple-500/20"
                    : "text-slate-800 bg-gradient-to-r from-white to-gray-100 border-black before:bg-white/50"
            )}>
                {title}
            </h1>
            <motion.div
                className={cn(
                    "h-2 rounded-full",
                    darkMode ? "bg-gradient-to-r from-purple-600 via-purple-400 to-purple-600" : "bg-gradient-to-r from-black via-gray-600 to-black"
                )}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5 }}
            />
        </motion.div>
    </div>
);

// Toggle Component
const PricingToggle = ({ isYearly, onToggle, darkMode = false }: { isYearly: boolean; onToggle: () => void; darkMode?: boolean }) => (
    <div className="flex justify-center items-center gap-4 mb-8 relative z-10">
        <span className={cn(
            "font-medium",
            darkMode ? (!isYearly ? 'text-white' : 'text-gray-400') : (!isYearly ? 'text-black' : 'text-gray-600')
        )}>Monthly</span>
        <motion.button
            className={cn(
                "w-16 h-8 flex items-center rounded-full p-1 border-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.9)]",
                darkMode ? "bg-gray-700 border-purple-500" : "bg-gray-200 border-black"
            )}
            onClick={onToggle}
        >
            <motion.div
                className={cn(
                    "w-6 h-6 rounded-full border-2",
                    darkMode ? "bg-purple-500 border-purple-300" : "bg-white border-black"
                )}
                animate={{ x: isYearly ? 32 : 0 }}
            />
        </motion.button>
        <span className={cn(
            "font-medium",
            darkMode ? (isYearly ? 'text-white' : 'text-gray-400') : (isYearly ? 'text-black' : 'text-gray-600')
        )}>Yearly</span>
        {isYearly && (
            <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-green-400 font-medium text-sm"
            >
                Save 20%
            </motion.span>
        )}
    </div>
);

// Background Effects Component
const BackgroundEffects = ({ darkMode = false }: { darkMode?: boolean }) => (
    <>
        <div className="absolute inset-0 pointer-events-none">
            {[...Array(30)].map((_, i) => (
                <motion.div
                    key={i}
                    className={cn(
                        "absolute w-2 h-2 rounded-full",
                        darkMode ? "bg-purple-500/20" : "bg-black/5"
                    )}
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        x: [0, Math.random() * 20 - 10, 0],
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
        <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: darkMode
                ? "linear-gradient(rgba(157,78,221,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(157,78,221,0.05) 1px, transparent 1px)"
                : "linear-gradient(#00000008 1px, transparent 1px), linear-gradient(90deg, #00000008 1px, transparent 1px)",
            backgroundSize: "16px 16px"
        }} />
    </>
);

// Pricing Card Component
const PricingCard = ({
    plan,
    isYearly,
    index
}: {
    plan: PricingPlan;
    isYearly: boolean;
    index: number
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { damping: 15, stiffness: 150 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), springConfig);

    const currentPrice = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
    const previousPrice = !isYearly ? plan.yearlyPrice : plan.monthlyPrice;

    // Card JSX remains the same as original, just destructured from props
    return (
        <motion.div
            ref={cardRef}
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            style={{
                rotateX,
                rotateY,
                perspective: 1000,
            }}
            onMouseMove={(e) => {
                if (!cardRef.current) return;
                const rect = cardRef.current.getBoundingClientRect();
                const centerX = rect.x + rect.width / 2;
                const centerY = rect.y + rect.height / 2;
                mouseX.set((e.clientX - centerX) / rect.width);
                mouseY.set((e.clientY - centerY) / rect.height);
            }}
            onMouseLeave={() => {
                mouseX.set(0);
                mouseY.set(0);
            }}
            className={`relative w-full rounded-xl p-6 border-3
                shadow-[6px_6px_0px_0px_rgba(0,0,0,0.9)]
                hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.9)]
                transition-all duration-200 bg-white border-black`}
        >
            {/* Price Badge */}
            <motion.div
                className={cn(
                    `absolute -top-4 -right-4 w-16 h-16 
                    rounded-full flex items-center justify-center border-2 border-black
                    shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)]`
                    , plan.accent)}
                animate={{
                    rotate: [0, 10, 0, -10, 0],
                    scale: [1, 1.1, 0.9, 1.1, 1],
                    y: [0, -5, 5, -3, 0]
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: [0.76, 0, 0.24, 1]
                }}
            >
                <div className="text-center text-white">
                    <div className="text-lg font-black">₹
                        <Counter from={previousPrice} to={currentPrice} />
                    </div>
                    <div className="text-[10px] font-bold">/{isYearly ? 'yr' : 'mo'}</div>
                </div>
            </motion.div>

            {/* Plan Name and Popular Badge */}
            <div className="mb-4">
                <h3 className="text-xl font-black text-black mb-2">{plan.name}</h3>
                {plan.isPopular && (
                    <motion.span
                        className={cn(
                            `inline-block px-3 py-1 text-white
                            font-bold rounded-md text-xs border-2 border-black
                            shadow-[2px_2px_0px_0px_rgba(0,0,0,0.9)]`
                            , plan.accent)}
                        animate={{
                            y: [0, -3, 0],
                            scale: [1, 1.05, 1]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity
                        }}
                    >
                        POPULAR
                    </motion.span>
                )}
            </div>

            {/* Features List */}
            <div className="space-y-2 mb-4">
                {plan.features.map((feature, i) => (
                    <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{
                            x: 5,
                            scale: 1.02,
                            transition: { type: "spring", stiffness: 400 }
                        }}
                        className={`flex items-center gap-2 p-2 bg-gray-50 rounded-md border-2 border-black
                            shadow-[2px_2px_0px_0px_rgba(0,0,0,0.9)]`}
                    >
                        <motion.span
                            whileHover={{ scale: 1.2, rotate: 360 }}
                            className={cn(
                                `w-5 h-5 rounded-md  flex items-center justify-center
                                text-white font-bold text-xs border border-black
                                shadow-[1px_1px_0px_0px_rgba(0,0,0,0.9)]`
                                , plan.accent)}
                        >
                            ✓
                        </motion.span>
                        <span className="text-black font-bold text-sm">{feature}</span>
                    </motion.div>
                ))}
            </div>

            {/* CTA Button */}
            <motion.button
                className={cn(
                    `w-full py-2 rounded-lg  text-white font-black text-sm
                    border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)]
                    hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.9)]
                    active:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.9)]
                    transition-all duration-200`
                    , plan.accent)}
                whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 }
                }}
                whileTap={{
                    scale: 0.95,
                    rotate: [-1, 1, 0],
                }}
            >
                GET STARTED →
            </motion.button>
        </motion.div>
    );
};

// Main Container Component
export const PricingContainer = ({ title = "Pricing Plans", plans, className = "", darkMode = false }: PricingProps) => {
    const [isYearly, setIsYearly] = useState(false);

    return (
        <div className={cn(
            "min-h-screen p-4 sm:p-6 lg:p-8 relative overflow-hidden rounded-[12px]",
            darkMode ? "bg-black" : "bg-[#f0f0f0]",
            className
        )}>
            <PricingHeader title={title} darkMode={darkMode} />
            <PricingToggle isYearly={isYearly} onToggle={() => setIsYearly(!isYearly)} darkMode={darkMode} />
            <BackgroundEffects darkMode={darkMode} />

            <div className="w-[100%] max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                {plans.map((plan, index) => (
                    <PricingCard
                        key={plan.name}
                        plan={plan}
                        isYearly={isYearly}
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
};
