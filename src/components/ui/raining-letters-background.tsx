"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"

interface Character {
    char: string
    x: number
    y: number
    speed: number
}

const RainingLettersBackground: React.FC = () => {
    const [characters, setCharacters] = useState<Character[]>([])
    const [activeIndices, setActiveIndices] = useState<Set<number>>(new Set())

    const createCharacters = useCallback(() => {
        const allChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"
        const charCount = 250 // Increased density
        const newCharacters: Character[] = []

        for (let i = 0; i < charCount; i++) {
            newCharacters.push({
                char: allChars[Math.floor(Math.random() * allChars.length)],
                x: Math.random() * 100,
                y: Math.random() * 100,
                speed: 0.04 + Math.random() * 0.1, // Slower for a calmer background feel
            })
        }

        return newCharacters
    }, [])

    useEffect(() => {
        setCharacters(createCharacters())
    }, [createCharacters])

    useEffect(() => {
        const updateActiveIndices = () => {
            const newActiveIndices = new Set<number>()
            const numActive = Math.floor(Math.random() * 3) + 2
            for (let i = 0; i < numActive; i++) {
                newActiveIndices.add(Math.floor(Math.random() * characters.length))
            }
            setActiveIndices(newActiveIndices)
        }

        const flickerInterval = setInterval(updateActiveIndices, 300)
        return () => clearInterval(flickerInterval)
    }, [characters.length])

    useEffect(() => {
        let animationFrameId: number

        const updatePositions = () => {
            setCharacters(prevChars =>
                prevChars.map(char => ({
                    ...char,
                    y: char.y + char.speed,
                    ...(char.y >= 100 && {
                        y: -5,
                        x: Math.random() * 100,
                        char: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"[
                            Math.floor(Math.random() * "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?".length)
                        ],
                    }),
                }))
            )
            animationFrameId = requestAnimationFrame(updatePositions)
        }

        animationFrameId = requestAnimationFrame(updatePositions)
        return () => cancelAnimationFrame(animationFrameId)
    }, [])

    return (
        <div className="absolute inset-0 bg-transparent overflow-hidden pointer-events-none select-none">
            {/* Raining Characters */}
            {characters.map((char, index) => {
                const isActive = activeIndices.has(index);
                return (
                    <span
                        key={index}
                        className={`absolute transition-colors duration-500 ${isActive
                            ? "text-[#c084fc] z-10 font-bold"
                            : "text-purple-600/40 font-light"
                            }`}
                        style={{
                            left: `${char.x}%`,
                            top: `${char.y}%`,
                            transform: `translate(-50%, -50%) ${isActive ? 'scale(1.2)' : 'scale(1)'}`,
                            textShadow: isActive
                                ? '0 0 15px rgba(157, 78, 221, 0.8), 0 0 5px rgba(255, 255, 255, 0.5)'
                                : 'none',
                            opacity: isActive ? 1.0 : 0.5,
                            willChange: 'transform, top',
                            fontSize: isActive ? '1.5rem' : '1.2rem',
                            fontFamily: 'monospace'
                        }}
                    >
                        {char.char}
                    </span>
                )
            })}
        </div>
    )
}

export default RainingLettersBackground
