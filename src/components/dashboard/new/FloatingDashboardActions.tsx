import { Play, FileText, Plus, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/context/AuthContext";

import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function FloatingDashboardActions() {
    const { userRole } = useAuth();
    const navigate = useNavigate();

    const handleExportReport = () => {
        // Simulate PDF generation and download
        const reportContent = `Forsee AI - Intelligence Report\nGenerated: ${new Date().toLocaleString()}\nRole: ${userRole}\n\nThis is a simulated automated intelligence report.`;
        const blob = new Blob([reportContent], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Forsee-Intelligence-Report-${Date.now()}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        toast.success("Intelligence Report Generated", {
            description: "Your PDF report has been downloaded successfully."
        });
    };

    const handleAddAssetFlow = () => {
        navigate("/output-preview");
        setTimeout(() => {
            toast.info("Add Asset Procedure", {
                description: "Click on 'Add to Dashboard' to finalize this asset integration.",
                duration: 6000
            });
        }, 500);
    };

    return (
        <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
            <TooltipProvider delayDuration={0}>


                {/* ENGINEER & ADMIN: ML Operations */}
                {(userRole === 'engineer' || userRole === 'admin') && (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button size="icon" className="h-14 w-14 rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-500/40 hover:bg-blue-500 transition-all shadow-xl text-blue-500 hover:text-white group">
                                <Play className="w-6 h-6 ml-1 group-hover:scale-110 transition-transform" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left" className="bg-black border-white/20 text-white font-bold tracking-tighter">TRIGGER ML TRAINING</TooltipContent>
                    </Tooltip>
                )}

                {/* ENGINEER & ADMIN: Asset Management */}
                {(userRole === 'engineer' || userRole === 'admin') && (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                onClick={handleAddAssetFlow}
                                size="icon"
                                className="h-14 w-14 rounded-full bg-[#9d4edd] shadow-[0_0_20px_rgba(157,78,221,0.4)] hover:bg-[#8b3dc7] transition-all text-white group"
                            >
                                <Plus className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left" className="bg-black border-white/20 text-white font-bold tracking-tighter">REGISTER NEW ASSET</TooltipContent>
                    </Tooltip>
                )}

                {/* ALL ROLES: Export Insights */}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            onClick={handleExportReport}
                            size="icon"
                            className="h-14 w-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-foreground hover:text-background transition-all shadow-lg text-foreground/80 group"
                        >
                            <FileText className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="bg-black border-white/20 text-white font-bold tracking-tighter">EXPORT INTELLIGENCE REPORT</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
}
