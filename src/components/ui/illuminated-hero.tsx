import React from 'react';
import { cn } from '@/lib/utils';

export function IlluminatedHero() {
    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-black text-white pointer-events-none z-0">
            <div className="absolute inset-0 w-full h-full">
                {/* Top Blob */}
                <div className="shadow-bgt absolute w-full h-full translate-y-[-70%] scale-[1.2] animate-[onloadbgt_1s_ease-in-out_forwards] rounded-[100%] opacity-60 bg-purple-600 blur-[120px]" />
                {/* Bottom Blob */}
                <div className="shadow-bgb absolute w-full h-full translate-y-[70%] scale-[1.2] animate-[onloadbgb_1s_ease-in-out_forwards] rounded-[100%] opacity-60 bg-purple-800 blur-[120px]" />
            </div>

            {/* SVG Filter for potential future use (kept from original code to ensure compatibility if needed) */}
            <svg
                className="absolute -z-1 h-0 w-0"
                width="1440px"
                height="300px"
                viewBox="0 0 1440 300"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <filter
                        id="glow-4"
                        colorInterpolationFilters="sRGB"
                        x="-50%"
                        y="-200%"
                        width="200%"
                        height="500%"
                    >
                        {/* Filter definitions kept simple/empty here as we are relying on Tailwind blur for the background blobs to ensure they are visible */}
                        <feGaussianBlur
                            in="SourceGraphic"
                            data-target-blur="4"
                            stdDeviation="4"
                            result="blur4"
                        />
                    </filter>
                </defs>
            </svg>
        </div>
    );
}
