import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Wind, AlertCircle, FileText } from "lucide-react";

export function AssetPanel() {
    return (
        <Card id="asset-panel" className="h-full border-none shadow-[var(--shadow-1)] bg-[var(--card-bg)] rounded-3xl overflow-hidden flex flex-col">
            <div className="p-6 pb-0">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="bg-[var(--warning)]/10 text-[var(--warning)] border-none">WARNING</Badge>
                            <span className="text-xs text-[var(--muted)]">WT-01</span>
                        </div>
                        <h2 id="asset-title" className="text-xl font-bold font-doto">WindTurbine #01</h2>
                        <p className="text-sm text-[var(--muted)]">Vestas V164 - Farm A</p>
                    </div>
                    <div className="p-2 bg-[var(--bg)] rounded-xl text-[var(--accent-color)]">
                        <Wind className="w-6 h-6" />
                    </div>
                </div>

                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="w-full bg-[var(--bg)] p-1 rounded-xl">
                        <TabsTrigger id="tab-overview" value="overview" className="flex-1 rounded-lg data-[state=active]:bg-[var(--card-bg)] data-[state=active]:shadow-sm">Overview</TabsTrigger>
                        <TabsTrigger id="tab-sensors" value="sensors" className="flex-1 rounded-lg data-[state=active]:bg-[var(--card-bg)] data-[state=active]:shadow-sm">Sensors</TabsTrigger>
                        <TabsTrigger id="tab-history" value="history" className="flex-1 rounded-lg data-[state=active]:bg-[var(--card-bg)] data-[state=active]:shadow-sm">History</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="mt-4 space-y-4">
                        <div className="space-y-2">
                            <div className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider">Asset Details</div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <span className="text-[var(--muted)]">Model</span> <span className="text-right">V164-9.5MW</span>
                                <span className="text-[var(--muted)]">Install Date</span> <span className="text-right">2019-04-12</span>
                                <span className="text-[var(--muted)]">Last Maint.</span> <span className="text-right">2024-01-15</span>
                            </div>
                        </div>

                        <div className="pt-4 space-y-2">
                            <Button id="btn-ack" className="w-full bg-[var(--accent-color)] hover:bg-[var(--accent-color)]/90 text-white shadow-lg shadow-[var(--accent-color)]/20 rounded-xl h-10">
                                Acknowledge Alert
                            </Button>
                            <Button id="btn-create-incident" variant="outline" className="w-full border-[var(--danger)] text-[var(--danger)] hover:bg-[var(--danger)]/5 rounded-xl h-10">
                                <AlertCircle className="w-4 h-4 mr-2" /> Create Incident
                            </Button>
                        </div>

                    </TabsContent>
                </Tabs>
            </div>
        </Card>
    );
}
