import { Bell, CheckCircle, Clock } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockAlerts } from "./mockData";
import { format } from "date-fns";

export function AlertsPanel() {
    return (
        <div id="alerts-panel" className="h-full flex flex-col gap-4">
            <div className="flex justify-between items-center px-1">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Bell className="w-4 h-4 text-[var(--danger)]" /> Live Alerts
                </h3>
                <div className="flex gap-1">
                    <Badge variant="outline" className="text-[10px] cursor-pointer hover:bg-[var(--danger)]/10 text-[var(--danger)] border-[var(--danger)]/20">Critical</Badge>
                    <Badge variant="outline" className="text-[10px] cursor-pointer hover:bg-[var(--warning)]/10 text-[var(--muted)] border-[var(--border)]">Warning</Badge>
                </div>
            </div>

            <ScrollArea className="flex-1 -mx-2 px-2">
                <div className="space-y-3 pb-4" id="alerts-feed">
                    {mockAlerts.map(alert => (
                        <div
                            id={`alert-${alert.alertId}`}
                            key={alert.alertId}
                            className={`p-4 rounded-xl shadow-sm border border-transparent transition-all hover:translate-x-1 ${alert.risk_score > 75
                                ? 'bg-[var(--card-bg)] shadow-[0_4px_20px_rgba(239,68,68,0.15)] border-[var(--danger)]/20 pulse-glow'
                                : 'bg-[var(--card-bg)] shadow-[var(--shadow-1)] hover:shadow-[var(--shadow-2)]'
                                }`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-[10px] font-mono text-[var(--muted)] flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> {format(new Date(alert.t), "HH:mm")}
                                </span>
                                <Badge className={alert.risk_score > 75 ? "bg-[var(--danger)]" : "bg-[var(--warning)]"}>
                                    Risk {alert.risk_score}
                                </Badge>
                            </div>

                            <div className="mb-3">
                                <div className="font-bold text-sm">{alert.assetId}</div>
                                <div className="text-xs text-[var(--muted)]">Precursor Prob: {(alert.precursor_probability * 100).toFixed(0)}%</div>
                            </div>

                            <div className="flex justify-between items-center border-t border-[var(--border)]/50 pt-3 mt-3">
                                <span className="text-[10px] font-medium text-[var(--danger)]">
                                    Failure in ~3h
                                </span>
                                <Button size="sm" variant="ghost" className="h-7 text-xs hover:bg-[var(--success)]/10 hover:text-[var(--success)]">
                                    <CheckCircle className="w-3 h-3 mr-1" /> Ack
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>

            <div className="pt-2 border-t border-[var(--border)]">
                <Button id="export-alerts" variant="outline" className="w-full text-xs h-9 bg-[var(--card-bg)] border-dashed text-[var(--muted)]">
                    Export Incident Log (CSV)
                </Button>
            </div>
        </div>
    );
}
