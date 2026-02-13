import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export function ComparisonPanel() {
    return (
        <Card id="comparison-panel" className="bg-[var(--card-bg)] border-none shadow-[var(--shadow-1)] rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--bg)] flex items-center justify-center border border-[var(--border)]">
                    <span className="font-bold text-xs text-[var(--muted)]">VS</span>
                </div>
                <div className="text-sm font-medium text-[var(--muted)]">Compare Assets</div>
            </div>

            <div className="flex gap-2">
                <div className="px-3 py-1.5 rounded-lg bg-[var(--bg)] border border-[var(--border)] flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[var(--warning)]" />
                    <span className="text-xs font-semibold">WT-01</span>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-[var(--bg)] border border-[var(--border)] flex items-center gap-2 opacity-50 border-dashed">
                    <div className="w-2 h-2 rounded-full bg-gray-300" />
                    <span className="text-xs font-semibold text-[var(--muted)]">Select Asset</span>
                </div>
            </div>

            <ArrowRight className="w-4 h-4 text-[var(--muted)]" />
        </Card>
    );
}
