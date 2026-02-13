import { Play, Pause, FastForward, SkipBack } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { useState } from "react";

export function IncidentReplay() {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <Card id="incident-replay" className="bg-[var(--card-bg)] border-none shadow-[var(--shadow-1)] rounded-2xl p-4 flex items-center gap-4">
            <div className="flex items-center gap-2">
                <Button size="icon" variant="ghost" className="h-8 w-8 text-[var(--muted)] hover:text-[var(--accent-color)]">
                    <SkipBack className="w-4 h-4" />
                </Button>
                <Button
                    size="icon"
                    className={`h-10 w-10 rounded-full shadow-lg transition-transform active:scale-95 ${isPlaying ? 'bg-[var(--warning)]' : 'bg-[var(--accent-color)]'}`}
                    onClick={() => setIsPlaying(!isPlaying)}
                >
                    {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white ml-1" />}
                </Button>
                <Button size="icon" variant="ghost" className="h-8 w-8 text-[var(--muted)] hover:text-[var(--accent-color)]">
                    <FastForward className="w-4 h-4" />
                </Button>
            </div>

            <div className="flex-1 flex flex-col gap-2">
                <div className="flex justify-between text-[10px] font-mono font-medium text-[var(--muted)] uppercase tracking-wider">
                    <span>Incident Start</span>
                    <span>Simulation Replay</span>
                    <span>Now</span>
                </div>
                <Slider defaultValue={[33]} max={100} step={1} className="w-full" />
            </div>

            <div className="px-4 py-1.5 bg-[var(--bg)] rounded-lg border border-[var(--border)]">
                <span className="text-xs font-mono font-bold text-[var(--accent-color)]">1x Speed</span>
            </div>
        </Card>
    );
}
