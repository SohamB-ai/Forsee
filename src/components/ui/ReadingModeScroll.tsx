import { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";

interface ReadingModeScrollProps {
    text: string;
}

export function ReadingModeScroll({ text }: ReadingModeScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Animation duration parameters
    const SCROLL_DURATION = 6.5; // "One full visible page passes in 6.5s"
    const HIGHLIGHT_LOOP_DURATION = 8; // "Offset highlight movement to 8s"

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[600px] bg-[#0E0F12] overflow-hidden rounded-xl border border-white/5 font-inter select-none"
        >
            {/* Background Ambience */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
                {/* Grain (using SVG filter or noise image - simulating with simple repeating pattern for now) */}
                <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
            </div>

            <div className="relative w-full h-full flex flex-col items-center justify-center p-12">
                {/* Content Container */}
                <div className="relative w-full max-w-3xl h-full overflow-hidden">
                    <ScrollAnimation text={text} scrollDuration={SCROLL_DURATION} highlightDuration={HIGHLIGHT_LOOP_DURATION} />
                </div>
            </div>
        </div>
    );
}

function ScrollAnimation({ text, scrollDuration, highlightDuration }: { text: string, scrollDuration: number, highlightDuration: number }) {
    const highlightControls = useAnimation();

    // Text content split into paragraphs for rendering
    const paragraphs = text.split('\n\n').filter(Boolean);

    return (
        <div className="relative w-full h-full">
            {/* 1. Base Text Layer (Dim) */}
            <motion.div
                className="absolute top-0 left-0 w-full text-[#EDEDED] opacity-30 font-medium text-lg leading-[1.6] tracking-normal"
                animate={{ y: ["100%", "-100%"] }}
                transition={{
                    duration: highlightDuration * 2, // Slower base scroll to accommodate the loop
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "loop"
                }}
            >
                {paragraphs.map((para, i) => (
                    <p key={i} className="mb-6">{para}</p>
                ))}
                {/* Duplicate content for seamless loop illusion if needed, though pure scroll is simpler */}
                <div className="h-24" />
                {paragraphs.map((para, i) => (
                    <p key={`dup-${i}`} className="mb-6">{para}</p>
                ))}
            </motion.div>

            {/* 2. Highlight/Reading Bar Overlay */}
            <motion.div
                className="absolute left-0 w-[85%] h-[12%] z-20 pointer-events-none"
                style={{ left: "7.5%" }} // Center 85% width
                animate={{
                    top: ["-15%", "115%"],
                    opacity: [0, 1, 1, 0] // Fade in/out at ends
                }}
                transition={{
                    duration: highlightDuration,
                    ease: [0.2, 0.9, 0.25, 1], // Custom cubic-bezier
                    repeat: Infinity,
                    times: [0, 0.05, 0.95, 1] // Opacity keyframes timing
                }}
            >
                {/* The visual bar itself */}
                <div className="w-full h-full relative">
                    {/* Gradient Fill */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10 blur-[30px]" />

                    {/* Inner Shadow / 3D Edge */}
                    <div className="absolute inset-0 shadow-[inset_0_4px_12px_rgba(255,255,255,0.28)] rounded-lg opacity-30" />

                    {/* Outer Glow / Bloom */}
                    <div className="absolute inset-0 bg-[#FFDDAA] opacity-[0.14] blur-[22px] mix-blend-screen" />

                    {/* Micro-parallax/jitter (Simulated manually or via small additional motion) */}
                    <motion.div
                        className="absolute inset-0 bg-white/5 mix-blend-overlay"
                        animate={{ x: [-1, 1, -1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>
            </motion.div>

            {/* 3. Highlighted Text Layer (Bright) - Masked by the Bar */}
            {/* 
         To implement the "Text revealed more intensely" effect, we use a second text layer 
         that is fully opaque/bright, and mask it so it's only visible *inside* the highlight bar area.
         Standard CSS masking or clip-path is tricky to sync perfectly with a separate motion div.
         
         Alternative: Use `mix-blend-mode: overlay` or `soft-light` on the highlight bar to brighten the text below.
         The user specifically asked for "Screen or Add... highlight should brighten text".
         AND "animate a contrast/levels node applied only within highlight mask".
         
         Since we can't easily do per-pixel contrast nodes in DOM, strictly, blending modes are the closest approximation.
         Let's try a strong overlay blend first.
      */}

            {/* 
        Refined approach for "Text Brightening":
        Layer 1: Text (Opacity 30%)
        Layer 2: Text (Opacity 100%, Brightness boosted) -> Masked by a moving rectangle that matches the Highlight Bar.
      */}
            <motion.div
                className="absolute top-0 left-0 w-full text-[#EDEDED] font-medium text-lg leading-[1.6] tracking-normal z-10"
                style={{
                    textShadow: "0 6px 18px rgba(0,0,0,0.1)", // "Soft drop shadow to text"
                    filter: "brightness(1.2) contrast(1.1)", // Boosted brightness/contrast
                }}
                animate={{ y: ["100%", "-100%"] }}
                transition={{
                    duration: highlightDuration * 2,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "loop"
                }}
            // The Mask
            // We use a CSS mask-image that is transparent everywhere except a horizontal band that moves.
            // Animating the mask-position is possible but `framer-motion` working on `mask-image` directly is standard.
            // Actually, simpler: Put this text in a container, and animate the container's clip-path or use a motion value for mask.
            >
                {/* 
             We can't easily animate a `mask-image` gradient position perfectly in sync with another div without MotionValues.
             Let's use a simpler trick: The Highlight Bar layer ITSELF is set to `mix-blend-mode: color-dodge` or `overlay`
             which will naturally brighten the text underneath.
             
             User asked: "Screen or Add ... highlight should brighten text".
             
             If we strictly want the "Levels" effect (contrast boost), we can use `backdrop-filter` on the highlight bar?
             `backdrop-filter` affects what's *behind* it.
          */}
                {paragraphs.map((para, i) => (
                    <p key={i} className="mb-6 mix-blend-screen opacity-100">{para}</p> // Blend mode here?
                ))}
                <div className="h-24" />
                {paragraphs.map((para, i) => (
                    <p key={`dup-${i}`} className="mb-6 mix-blend-screen opacity-100">{para}</p>
                ))}
            </motion.div>

            {/* 
         Actually, the most robust way to get exactly the request (base dim, highlight bright) 
         is simply:
         1. Underlay: Dim text.
         2. Overlay: Bright text, inside a container `overflow: hidden` that moves? No, the text moves.
         
         Let's stick to the "Highlight Bar with Blend Mode" + Base Text.
         If Base Text is opacity 0.3, and Highlight Bar has `mix-blend-mode: color-dodge` or `plus-lighter`,
         it will brighten the grey text to white/glow. 
         
         Let's try `mix-blend-mode: plus-lighter` (Add) on the highlight bar itself, 
         interacting with the text layer.
      */}

            {/* Re-rendering structure for blending correctness */}
            <motion.div
                className="absolute top-0 left-0 w-full text-[#EDEDED] opacity-30 font-medium text-lg leading-[1.6] tracking-normal"
                animate={{ y: ["20%", "-120%"] }} // Adjusted visual range
                transition={{
                    duration: 20, // Slow read speed
                    ease: "linear",
                    repeat: Infinity,
                }}
            >
                {paragraphs.map((para, i) => (
                    <p key={i} className="mb-6">{para}</p>
                ))}
            </motion.div>

            {/* The "Magical" Highlight that brightens everything it touches */}
            <motion.div
                className="absolute left-0 w-[90%] h-[150px] z-20 pointer-events-none mix-blend-color-dodge" // Color Dodge creates vivid brightening
                style={{ left: "5%" }}
                animate={{
                    top: ["-20%", "120%"],
                }}
                transition={{
                    duration: highlightDuration, // 8s loop
                    ease: [0.2, 0.9, 0.25, 1],
                    repeat: Infinity,
                    repeatDelay: 0
                }}
            >
                <div className="w-full h-full bg-[#3d3d3d] blur-[40px] opacity-100 rounded-full" />
            </motion.div>

        </div>
    );
}

// Rewriting component to strictly follow the specific "Track Matte" instruction via CSS Mask
// This is cleaner than blend modes which depend on background brightness.

export function CinematicText({ content }: { content: string }) {
    // const scrollY = useScroll(...) -- We want auto scroll

    // Split content
    const paragraphs = content.split('\n').filter(line => line.trim().length > 0);

    return (
        <div className="relative w-full h-[600px] bg-[#0E0F12] overflow-hidden rounded-xl border border-white/5 font-inter select-none isolate">
            {/* Grain & Vignette */}
            <div className="absolute inset-0 pointer-events-none z-50 mix-blend-overlay opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat opacity-[0.05]" />
            <div className="absolute inset-0 pointer-events-none z-50 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />

            {/* Container */}
            <div className="relative w-full h-full flex justify-center p-12 ">
                <div className="relative w-full max-w-3xl h-full">

                    {/* Layer 1: Dim Text (Always visible) */}
                    <ScrollingTextLayer opacity={0.3} content={paragraphs} duration={20} />

                    {/* Layer 2: Highlighted Text (Bright) - Masked */}
                    {/* We animate a mask over this layer */}
                    <MaskedBrightLayer content={paragraphs} duration={20} />

                    {/* Layer 3: The UI Element (The glowing bar itself) */}
                    <HighlightBarOverlay />
                </div>
            </div>
        </div>
    );
}

const ScrollingTextLayer = ({ opacity, content, duration }: any) => (
    <motion.div
        className="absolute top-0 left-0 w-full text-[#EDEDED] font-medium text-xl leading-[1.6] tracking-wide"
        style={{ opacity }}
        animate={{ y: ["100%", "-200%"] }} // Move up
        transition={{ duration: duration, ease: "linear", repeat: Infinity }}
    >
        {content.map((p: string, i: number) => (
            <p key={i} className="mb-8">{p}</p>
        ))}
        {/* Duplicates for loop padding */}
        {content.map((p: string, i: number) => (
            <p key={`d-${i}`} className="mb-8">{p}</p>
        ))}
    </motion.div>
);

const MaskedBrightLayer = ({ content, duration }: any) => {
    // The mask needs to move down 
    // We simulate the mask by animating a container with `overflow: hidden` moving down? 
    // No, that clips content.
    // CSS `mask-image` with gradient can be animated? Yes, `mask-position`.

    return (
        <motion.div
            className="absolute top-0 left-0 w-full text-white font-medium text-xl leading-[1.6] tracking-wide z-10"
            style={{
                textShadow: "0 4px 12px rgba(0,0,0,0.5)",
                filter: "brightness(1.3) contrast(1.1)",
                // The Mask: A horizontal band gradient that moves down
                maskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
                maskSize: "100% 15%", // Height of the bar
                maskRepeat: "no-repeat",
            }}
            animate={{
                y: ["100%", "-200%"], // Text moves UP
                // We need to animate the mask position DOWN relative to value?
                // Actually, `maskPosition` handles the mask.
                maskPosition: ["0% -20%", "0% 120%"] // Move mask from top to bottom
            }}
            transition={{
                y: { duration: duration, ease: "linear", repeat: Infinity },
                maskPosition: {
                    duration: 8, // "Highlight full traverse: 8s"
                    ease: [0.2, 0.9, 0.25, 1],
                    repeat: Infinity,
                    repeatDelay: 0.5
                }
            }}
        >
            {content.map((p: string, i: number) => (
                <p key={i} className="mb-8">{p}</p>
            ))}
            {content.map((p: string, i: number) => (
                <p key={`d-${i}`} className="mb-8">{p}</p>
            ))}
        </motion.div>
    );
}

const HighlightBarOverlay = () => (
    <motion.div
        className="absolute w-[85%] h-[120px] left-[7.5%] z-20 pointer-events-none mix-blend-screen"
        animate={{ top: ["-15%", "115%"] }}
        transition={{
            duration: 8,
            ease: [0.2, 0.9, 0.25, 1],
            repeat: Infinity,
            repeatDelay: 0.5
        }}
    >
        {/* Fill */}
        <div className="w-full h-full bg-gradient-to-r from-white/10 via-white/5 to-white/10 blur-[30px]" />
        {/* Glow */}
        <div className="absolute inset-0 bg-[#FFDDAA] opacity-[0.08] blur-[22px]" />
        {/* Inner Shadow */}
        <div className="absolute inset-0 shadow-[inset_0_4px_12px_rgba(255,255,255,0.1)] rounded-lg" />
    </motion.div>
);
