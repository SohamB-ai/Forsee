"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface TextSegment {
    text: string;
    className?: string; // Tailwind classes for color, weight, etc.
}

export interface TextBlock {
    type: 'p' | 'header'; // 'p' for paragraph (div/p), 'header' could be h1-h6 if needed
    content: (string | TextSegment)[];
    className?: string; // Wrapper classes (e.g. text-2xl)
}

interface RichTypewriterProps {
    blocks: TextBlock[];
    speed?: number; // ms per char
    className?: string;
    onComplete?: () => void;
}

export function RichTypewriter({
    blocks,
    speed = 20, // Fast speed default
    className,
    onComplete
}: RichTypewriterProps) {
    // Total length of all characters
    const [displayedCharCount, setDisplayedCharCount] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    // Calculate total length
    const totalLength = blocks.reduce((acc, block) => {
        return acc + block.content.reduce((bAcc, segment) => {
            return bAcc + (typeof segment === 'string' ? segment.length : segment.text.length);
        }, 0);
    }, 0);

    useEffect(() => {
        if (displayedCharCount >= totalLength) {
            setIsComplete(true);
            onComplete?.();
            return;
        }

        const timeout = setTimeout(() => {
            setDisplayedCharCount(prev => prev + 1);
        }, speed);

        return () => clearTimeout(timeout);
    }, [displayedCharCount, totalLength, speed, onComplete]);

    // Render Logic
    let runningCharCount = 0;

    // Helper to determine what part of a string to render
    const getRenderedString = (fullText: string) => {
        const start = runningCharCount;
        const end = start + fullText.length;

        // If the entire string has been typed
        if (displayedCharCount >= end) {
            runningCharCount += fullText.length;
            return fullText;
        }

        // If we are currently typing this string
        if (displayedCharCount > start) {
            const partial = fullText.slice(0, displayedCharCount - start);
            runningCharCount += fullText.length;
            return partial;
        }

        // Not reached yet
        runningCharCount += fullText.length;
        return null;
    };

    return (
        <div className={cn("space-y-6", className)}>
            {blocks.map((block, blockIdx) => {
                // If we haven't reached this block in typing logic (optimization), we can hide it?
                // But runningCharCount updates sequentially, so we just run the loop.

                // Render block content
                const renderedSegments = block.content.map((segment, segIdx) => {
                    const text = typeof segment === "string" ? segment : segment.text;
                    const style = typeof segment === "string" ? undefined : segment.className;

                    const renderedText = getRenderedString(text);

                    if (!renderedText) return null;

                    return (
                        <span key={segIdx} className={style}>
                            {renderedText}
                        </span>
                    );
                });

                // Check if we should render this block wrapper at all
                const hasContent = renderedSegments.some(s => s !== null);
                if (!hasContent && blockIdx > 0) return null; // Don't render empty future blocks, helps layout shift? Or just keep them empty.
                // Better to keep structure to avoid jumpiness? No, if empty it takes 0 height usually unless styled.
                // Let's render it but it will be empty.

                return (
                    <div key={blockIdx} className={cn("leading-relaxed", block.className)}>
                        {renderedSegments}
                        {/* Cursor Logic: cursor appears at the end of the active block or the last block when done */}
                        {(!isComplete &&
                            displayedCharCount >= (runningCharCount - block.content.reduce((a, c) => a + (typeof c === 'string' ? c.length : c.text.length), 0)) &&
                            displayedCharCount < runningCharCount) && (
                                <span className="inline-block w-[2px] h-[1em] bg-cyan-400 ml-1 align-middle animate-pulse" />
                            )}

                        {isComplete && blockIdx === blocks.length - 1 && (
                            <span className="inline-block w-[2px] h-[1em] bg-cyan-400 ml-1 align-middle animate-pulse" />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
