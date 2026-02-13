import { Download, Webhook, Sliders } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export function FloatingActions() {
    return (
        <div id="floating-actions" className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button id="btn-webhook" size="icon" className="h-12 w-12 rounded-full bg-[var(--card-bg)] text-[var(--muted)] shadow-md hover:text-[var(--primary)] hover:scale-105 transition-all border border-[var(--border)]">
                            <Webhook className="w-5 h-5" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left">Webhook Config</TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button id="btn-thresholds" size="icon" className="h-12 w-12 rounded-full bg-[var(--card-bg)] text-[var(--muted)] shadow-md hover:text-[var(--warning)] hover:scale-105 transition-all border border-[var(--border)]">
                            <Sliders className="w-5 h-5" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left">Threshold Tuner</TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button id="btn-export" size="icon" className="h-14 w-14 rounded-full bg-[var(--primary)] text-white shadow-xl hover:bg-[var(--primary)]/90 hover:scale-105 transition-all shadow-[var(--primary)]/30">
                            <Download className="w-6 h-6" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left">Quick Export</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
}
