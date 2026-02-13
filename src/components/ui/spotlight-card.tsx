'use client';
import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useSpring, useTransform, SpringOptions } from 'framer-motion';
import { cn } from '@/lib/utils';

type SpotlightCardProps = {
    className?: string;
    size?: number;
    springOptions?: SpringOptions;
    color?: string;
};

export function SpotlightCard({
    className,
    size = 300,
    springOptions = { bounce: 0 },
    color = '#9d4edd',
}: SpotlightCardProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [parentElement, setParentElement] = useState<HTMLElement | null>(null);

    const mouseX = useSpring(0, springOptions);
    const mouseY = useSpring(0, springOptions);

    const spotlightLeft = useTransform(mouseX, (x) => `${x - size / 2}px`);
    const spotlightTop = useTransform(mouseY, (y) => `${y - size / 2}px`);

    useEffect(() => {
        if (containerRef.current) {
            const parent = containerRef.current.parentElement;
            if (parent) {
                parent.style.position = 'relative';
                parent.style.overflow = 'hidden';
                setParentElement(parent);
            }
        }
    }, []);

    const handleMouseMove = useCallback(
        (event: MouseEvent) => {
            if (!parentElement) return;
            const { left, top } = parentElement.getBoundingClientRect();
            mouseX.set(event.clientX - left);
            mouseY.set(event.clientY - top);
        },
        [mouseX, mouseY, parentElement]
    );

    useEffect(() => {
        if (!parentElement) return;

        parentElement.addEventListener('mousemove', handleMouseMove);
        parentElement.addEventListener('mouseenter', () => setIsHovered(true));
        parentElement.addEventListener('mouseleave', () => setIsHovered(false));

        return () => {
            parentElement.removeEventListener('mousemove', handleMouseMove);
            parentElement.removeEventListener('mouseenter', () => setIsHovered(true));
            parentElement.removeEventListener('mouseleave', () =>
                setIsHovered(false)
            );
        };
    }, [parentElement, handleMouseMove]);

    return (
        <motion.div
            ref={containerRef}
            className={cn(
                'pointer-events-none absolute rounded-full blur-[80px] transition-opacity duration-200',
                isHovered ? 'opacity-100' : 'opacity-0',
                className
            )}
            style={{
                width: size,
                height: size,
                left: spotlightLeft,
                top: spotlightTop,
                background: `radial-gradient(circle at center, ${color}60 0%, ${color}30 40%, transparent 70%)`,
            }}
        />
    );
}
