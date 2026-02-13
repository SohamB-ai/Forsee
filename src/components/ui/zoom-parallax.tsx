"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";

interface Image {
    src: string;
    alt?: string;
}

interface ZoomParallaxProps {
    /** Array of images to be displayed in the parallax effect max 7 images */
    images: Image[];
}

export function ZoomParallax({ images }: ZoomParallaxProps) {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end'],
    });

    const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
    const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
    const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
    const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
    const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

    const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

    return (
        <div ref={container} className="relative h-[300vh] bg-transparent">
            <div className="sticky top-20 h-[calc(100vh-5rem)] overflow-hidden">
                <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                    <h1 className="text-4xl md:text-8xl font-bold text-[#9d4edd] dark:text-white tracking-tighter opacity-100 transition-colors duration-500">
                        System Integrity
                    </h1>
                </div>

                {/* Animated Scroll Indicator */}
                <motion.div
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 text-white pointer-events-none"
                >
                    <span className="text-xs uppercase tracking-[0.3em] font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">Scroll to explore</span>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ChevronDown className="w-8 h-8 text-[#9d4edd] filter drop-shadow-[0_0_8px_rgba(157,78,221,0.5)] animate-pulse" />
                    </motion.div>
                </motion.div>
                {images.map(({ src, alt }, index) => {
                    const scale = scales[index % scales.length];

                    return (
                        <motion.div
                            key={index}
                            style={{ scale }}
                            className={`absolute top-0 flex h-full w-full items-center justify-center ${index === 1 ? '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]' : ''
                                } ${index === 2 ? '[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]' : ''
                                } ${index === 3 ? '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]' : ''
                                } ${index === 4 ? '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]' : ''
                                } ${index === 5 ? '[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]' : ''
                                } ${index === 6 ? '[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]' : ''
                                } `}
                        >
                            <div className="relative h-[25vh] w-[25vw]">
                                <img
                                    src={src || '/placeholder.svg'}
                                    alt={alt || `Parallax image ${index + 1}`}
                                    className="h-full w-full object-cover rounded-md shadow-2xl brightness-75 hover:brightness-100 transition-all duration-500"
                                />
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
