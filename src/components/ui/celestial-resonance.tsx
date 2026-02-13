// src/components/ui/celestial-resonance.tsx
import React, { useRef, useEffect } from 'react'

export interface CelestialResonanceProps {
    /** Number of moving points */
    particleCount?: number
    /** How fast particles accelerate toward the magnet */
    particleSpeed?: number
    /** Maximum lifetime (frames) for each particle */
    particleLife?: number
    /** Trail overlay opacity (0–1) */
    trailOpacity?: number
    /** Rate at which the hue shifts each frame */
    hueSpeed?: number
    /** Canvas glow (shadow blur radius) */
    canvasGlow?: number
    /** X-coordinate of the magnetic attractor (px) */
    magnetX?: number
    /** Y-coordinate of the magnetic attractor (px) */
    magnetY?: number
    /** Fixed canvas width (px) or viewport */
    width?: number
    /** Fixed canvas height (px) or viewport */
    height?: number
    /** ARIA label for screen readers */
    ariaLabel?: string
    /** Extra wrapper classes */
    className?: string
    children?: React.ReactNode
}

const CelestialResonance: React.FC<CelestialResonanceProps> = ({
    particleCount = 1000,
    particleSpeed = 0.05,
    particleLife = 400,
    trailOpacity = 0.1,
    hueSpeed = 0.1,
    canvasGlow = 10,
    magnetX,
    magnetY,
    width,
    height,
    ariaLabel = 'Celestial resonance particle animation',
    className = '',
    children,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')!
        let w = (canvas.width = width ?? window.innerWidth)
        let h = (canvas.height = height ?? window.innerHeight)
        let hue = 210
        let animationId: number

        interface Particle {
            x: number
            y: number
            vx: number
            vy: number
            age: number
            life: number
            reset: () => void
            update: () => void
            draw: () => void
        }

        const particles: Particle[] = []
        const config = {
            magnetX: magnetX ?? w / 2,
            magnetY: magnetY ?? h + 400,
        }

        // create one particle
        function createParticle(): Particle {
            let x = Math.random() * w
            let y = Math.random() * h
            let vx = 0
            let vy = 0
            let age = 0
            let life = Math.random() * particleLife

            const reset = () => {
                x = Math.random() * w
                y = Math.random() * h
                vx = 0
                vy = 0
                age = 0
                life = Math.random() * particleLife
            }

            const update = () => {
                age++
                if (age > life) reset()

                // vector toward magnet + 90°
                const dx = config.magnetX - x
                const dy = config.magnetY - y
                const angle = Math.atan2(dy, dx) + Math.PI / 2

                vx += Math.cos(angle) * particleSpeed
                vy += Math.sin(angle) * particleSpeed

                vx *= 0.97
                vy *= 0.97

                x += vx
                y += vy

                // out-of-bounds: reset
                if (x < -10 || x > w + 10 || y < -10 || y > h + 10) {
                    reset()
                }
            }

            const draw = () => {
                const opacity = 1 - age / life
                const pHue = hue + (x / w) * 50
                ctx.beginPath()
                ctx.fillStyle = `hsla(${pHue},100%,75%,${opacity * 0.7})`
                ctx.arc(x, y, 1.2, 0, Math.PI * 2)
                ctx.fill()
            }

            return { get x() { return x }, get y() { return y }, vx, vy, age, life, reset, update, draw }
        }

        // initialize particles
        function init() {
            w = canvas.width = width ?? window.innerWidth
            h = canvas.height = height ?? window.innerHeight
            config.magnetX = magnetX ?? w / 2
            config.magnetY = magnetY ?? h + 400
            particles.length = 0
            for (let i = 0; i < particleCount; i++) {
                particles.push(createParticle())
            }
        }

        // animation loop
        function animate() {
            // trailing background
            ctx.fillStyle = `rgba(0,5,20,${trailOpacity})`
            ctx.fillRect(0, 0, w, h)

            // glow effect
            ctx.shadowBlur = canvasGlow
            ctx.shadowColor = `hsla(${hue},100%,50%,0.5)`

            particles.forEach((p) => {
                p.update()
                p.draw()
            })

            ctx.shadowBlur = 0
            hue += hueSpeed
            animationId = requestAnimationFrame(animate)
        }

        // handle resize
        function handleResize() {
            cancelAnimationFrame(animationId)
            init()
            animate()
        }

        window.addEventListener('resize', handleResize)
        init()
        animate()

        return () => {
            cancelAnimationFrame(animationId)
            window.removeEventListener('resize', handleResize)
        }
    }, [
        particleCount,
        particleSpeed,
        particleLife,
        trailOpacity,
        hueSpeed,
        canvasGlow,
        magnetX,
        magnetY,
        width,
        height,
    ])

    return (
        <div
            role="img"
            aria-label={ariaLabel}
            className={`relative overflow-hidden bg-[hsl(var(--background))] ${className}`}
            style={{ width: width ?? '100vw', height: height ?? '100vh' }}
        >
            <canvas
                ref={canvasRef}
                aria-hidden="true"
                style={{ display: 'block', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
            />
            <div className="relative z-10">
                {children}
            </div>
        </div>
    )
}

export default CelestialResonance
