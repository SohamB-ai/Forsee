import { useState } from "react";
import { Search, Filter, Wind, Zap, Server as ServerIcon, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { mockAssets } from "./mockData";
import { TypingText } from "@/components/ui/TypingText";

const icons = {
    wind_turbine: Wind,
    generator: Zap,
    server: ServerIcon,
    motor: Settings
};

export function AssetSelector() {
    const [filter, setFilter] = useState("");

    const filteredAssets = mockAssets.filter(a =>
        a.name.toLowerCase().includes(filter.toLowerCase()) ||
        a.assetId.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div id="asset-selector" className="h-[250px] flex flex-col gap-4">
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                    <Input
                        placeholder="Search assets..."
                        className="pl-9 h-9 bg-[var(--card-bg)] shadow-sm border-none rounded-lg text-sm"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                </div>
                <Button size="icon" variant="outline" className="h-9 w-9 bg-[var(--card-bg)] border-none shadow-sm text-[var(--muted)]">
                    <Filter className="w-4 h-4" />
                </Button>
            </div>

            <ScrollArea className="flex-1 -mx-1 px-1">
                <div className="space-y-3 pb-2">
                    {filteredAssets.map(asset => {
                        const Icon = icons[asset.type] || Settings;
                        const riskColor = asset.riskScore > 75 ? "bg-[var(--danger)]" : asset.riskScore > 50 ? "bg-[var(--warning)]" : "bg-[var(--success)]";
                        return (
                            <Card
                                key={asset.assetId}
                                id={`asset-card-${asset.assetId}`}
                                className="p-3 border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer group bg-[var(--card-bg)] rounded-xl"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="p-1.5 rounded-lg bg-[var(--bg)] text-[var(--accent-color)]">
                                            <Icon className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-sm text-foreground group-hover:text-[var(--accent-color)] transition-colors">
                                                <TypingText text={asset.name} delay={0.1} />
                                            </div>
                                            <p className="text-[10px] text-[var(--muted)] uppercase tracking-wide">{asset.location}</p>
                                        </div>
                                    </div>
                                    <div className={`w-2 h-2 rounded-full ${riskColor}`} />
                                </div>

                                <div className="flex items-end justify-between">
                                    <div className="flex gap-1 items-end">
                                        <span className="text-xs text-[var(--muted)]">Risk</span>
                                        <span className="text-sm font-bold font-doto leading-none">{asset.riskScore}%</span>
                                    </div>
                                    <div className="flex gap-1">
                                        <Button size="sm" variant="ghost" className="h-6 text-[10px] px-2 text-[var(--muted)] hover:text-foreground">
                                            Silence
                                        </Button>
                                        <Button size="sm" className="h-6 text-[10px] px-2 bg-[var(--bg)] text-foreground hover:bg-[var(--accent-color)] hover:text-white shadow-none">
                                            View
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </ScrollArea>
        </div>
    );
}
