"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface StarsBackgroundProps {
  color?: string;
  count?: number;
}

export function StarsBackground({
  color = "#FF5D00",
  count = 100
}: StarsBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Array<{ x: number; y: number; r: number; a: number; s: number }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.5 + 0.5,
          a: Math.random(),
          s: Math.random() * 0.02 + 0.005,
        });
      }
    };

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = star.a;
        ctx.fill();

        // Twinkle
        star.a += star.s;
        if (star.a > 1 || star.a < 0.2) {
          star.s = -star.s;
        }
      });

      animationFrameId = requestAnimationFrame(drawStars);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    drawStars();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 bg-black">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
