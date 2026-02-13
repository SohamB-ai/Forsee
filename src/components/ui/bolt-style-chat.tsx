'use client'

import React, { useState, useRef, useEffect } from 'react'
import { SendHorizontal } from 'lucide-react'

// CHAT INPUT - Simplified version without model selector and attachments
function ChatInput({ onSend, placeholder = "Ask anything about Forsee AI..." }: {
    onSend?: (message: string) => void
    placeholder?: string
}) {
    const [message, setMessage] = useState('')
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        const textarea = textareaRef.current
        if (textarea) {
            textarea.style.height = 'auto'
            textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`
        }
    }, [message])

    const handleSubmit = () => {
        if (message.trim()) {
            onSend?.(message)
            setMessage('')
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit()
        }
    }

    return (
        <div className="relative w-full max-w-[680px] mx-auto">
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-foreground/[0.08] to-transparent pointer-events-none" />
            <div className="relative rounded-2xl bg-background ring-1 ring-foreground/[0.1] shadow-[0_2px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_20px_rgba(0,0,0,0.4)]">
                <div className="relative">
                    <textarea
                        ref={textareaRef}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        className="w-full resize-none bg-transparent text-[15px] text-foreground placeholder-muted-foreground px-5 pt-5 pb-3 focus:outline-none min-h-[80px] max-h-[200px]"
                        style={{ height: '80px' }}
                    />
                </div>

                <div className="flex items-center justify-end px-3 pb-3 pt-1">
                    <button
                        onClick={handleSubmit}
                        disabled={!message.trim()}
                        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-[#9d4edd] hover:bg-[#7b2cbf] text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 shadow-[0_0_20px_rgba(157,78,221,0.3)]"
                    >
                        <span className="hidden sm:inline">Ask now</span>
                        <SendHorizontal className="size-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}

// Ray Background
function RayBackground() {
    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none">
            <div className="absolute inset-0 bg-background" />
            <div
                className="absolute left-1/2 -translate-x-1/2 w-[4000px] h-[1800px] sm:w-[6000px] z-10"
                style={{
                    background: `radial-gradient(circle at center 800px, rgba(157, 78, 221, 0.8) 0%, rgba(157, 78, 221, 0.35) 14%, rgba(157, 78, 221, 0.18) 18%, rgba(157, 78, 221, 0.08) 22%, transparent 25%)`
                }}
            />
            <div
                className="absolute top-[175px] left-1/2 w-[1600px] h-[1600px] sm:top-1/2 sm:w-[3043px] sm:h-[2865px]"
                style={{ transform: 'translate(-50%) rotate(180deg)' }}
            >
                <div className="absolute w-full h-full rounded-full -mt-[13px] border-[16px] border-foreground/10" style={{ background: 'radial-gradient(43.89% 25.74% at 50.02% 97.24%, hsl(var(--muted)/0.1) 0%, #000000 100%)', transform: 'rotate(180deg)', zIndex: 5 }} />
                <div className="absolute w-full h-full rounded-full bg-[#000000] -mt-[11px]" style={{ border: '23px solid #E9D5FF', transform: 'rotate(180deg)', zIndex: 4 }} />
                <div className="absolute w-full h-full rounded-full bg-[#000000] -mt-[8px]" style={{ border: '23px solid #D8B4FE', transform: 'rotate(180deg)', zIndex: 3 }} />
                <div className="absolute w-full h-full rounded-full bg-[#000000] -mt-[4px]" style={{ border: '23px solid #C084FC', transform: 'rotate(180deg)', zIndex: 2 }} />
                <div className="absolute w-full h-full rounded-full bg-white -mt-[0px]" style={{ border: '20px solid #9d4edd', boxShadow: '0 -15px 24.8px rgba(157, 78, 221, 0.6)', transform: 'rotate(180deg)', zIndex: 1 }} />
            </div>
        </div>
    )
}

// MAIN BOLT CHAT COMPONENT - Stateful
interface Message {
    role: 'user' | 'model';
    text: string;
}

interface BoltChatProps {
    title?: string
    subtitle?: string
    placeholder?: string
    messages: Message[]
    onSend: (message: string) => void
    isLoading?: boolean
}

export function BoltStyleChat({
    title = "Ask anything about",
    subtitle = "Your intelligent assistant for predictive maintenance insights and equipment health analysis.",
    placeholder = "Ask about equipment health, predictions, maintenance...",
    messages,
    onSend,
    isLoading
}: BoltChatProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    return (
        <div className="relative flex flex-col items-center min-h-screen w-full overflow-hidden bg-background transition-colors duration-500">
            <RayBackground />

            {/* Header - Only show if no messages yet */}
            {messages.length === 0 && (
                <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full px-4 z-20">
                    <h1 className="text-4xl sm:text-5xl font-bold text-foreground dark:text-white tracking-tight mb-1">
                        {title}{' '}
                        <span className="bg-gradient-to-b from-[#9d4edd] via-[#9d4edd] to-foreground dark:to-white bg-clip-text text-transparent italic inline-block py-1 pr-1">
                            Forsee AI
                        </span>
                    </h1>
                    <p className="text-base font-semibold sm:text-lg text-muted-foreground dark:text-white">{subtitle}</p>
                </div>
            )}

            {/* Messages Area */}
            <div className={`flex-1 w-full max-w-[800px] z-10 overflow-y-auto p-4 ${messages.length === 0 ? 'hidden' : 'block'}`} ref={scrollRef} style={{ marginTop: '80px', marginBottom: '100px' }}>
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex mb-6 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-2xl px-5 py-3 ${msg.role === 'user'
                                ? 'bg-[#9d4edd] text-white rounded-br-none'
                                : 'bg-card border border-border text-foreground rounded-bl-none shadow-sm'
                            }`}>
                            <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start mb-6">
                        <div className="bg-card border border-border px-5 py-4 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2">
                            <div className="w-2 h-2 bg-[#9d4edd] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-2 h-2 bg-[#9d4edd] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-2 h-2 bg-[#9d4edd] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className={`w-full max-w-[700px] px-4 fixed bottom-8 z-30 transition-all duration-500 ${messages.length === 0 ? 'top-[55%] left-1/2 -translate-x-1/2 bottom-auto' : 'left-1/2 -translate-x-1/2'}`}>
                <ChatInput placeholder={placeholder} onSend={onSend} />
            </div>
        </div>
    )
}
