'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface CursorGlowProps {
    color?: string;
    size?: number;
    blur?: number;
}

export function CursorGlow({
    color = '#9d4edd',
    size = 300,
    blur = 80
}: CursorGlowProps) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.body.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [isVisible]);

    return (
        <motion.div
            className="fixed pointer-events-none z-[9999]"
            animate={{
                x: mousePosition.x - size / 2,
                y: mousePosition.y - size / 2,
                opacity: isVisible ? 0.6 : 0,
            }}
            transition={{
                type: 'spring',
                damping: 30,
                stiffness: 200,
                mass: 0.5,
            }}
            style={{
                width: size,
                height: size,
                background: `radial-gradient(circle, ${color}40 0%, ${color}20 30%, transparent 70%)`,
                filter: `blur(${blur}px)`,
                borderRadius: '50%',
            }}
        />
    );
}
