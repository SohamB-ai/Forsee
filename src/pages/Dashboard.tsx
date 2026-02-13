import { GlobalStatusBar } from "@/components/dashboard/new/GlobalStatusBar";
import { FleetCommandPanel } from "@/components/dashboard/new/FleetCommandPanel";
import { AssetIntelligencePanel } from "@/components/dashboard/new/AssetIntelligencePanel";
import { InsightsPanel } from "@/components/dashboard/new/InsightsPanel";
import { MachineHistoryCard } from "@/components/dashboard/new/MachineHistoryCard";
import { FloatingDashboardActions } from "@/components/dashboard/new/FloatingDashboardActions";
// import { SpiralAnimation } from "@/components/ui/spiral-animation";
import { DashboardNavbar, Device } from "@/components/dashboard/new/DashboardNavbar";
import { BubbleNav } from "@/components/navigation/BubbleNav";
import { MachineThinking } from "@/components/ui/machine-thinking";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { renderCanvas, cleanupCanvas } from "@/components/ui/hero-designali";
import { useDashboard } from "@/context/DashboardContext";

export default function Dashboard() {
  const { devices } = useDashboard();
  const { userRole } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDevice, setSelectedDevice] = useState<Device>(devices[0]);

  useEffect(() => {
    // Sync selected device if devices list changes (e.g. initial load)
    if (!selectedDevice && devices.length > 0) {
      setSelectedDevice(devices[0]);
    }
  }, [devices]);

  useEffect(() => {
    // Simulate AI System Initialization
    const timer = setTimeout(() => setIsLoading(false), 3500);
    renderCanvas();
    return () => {
      cleanupCanvas();
      clearTimeout(timer);
    };
  }, []);

  const handleDeviceChange = (device: Device) => {
    setIsLoading(true);
    // Simulate AI thinking and context switching
    setTimeout(() => {
      setSelectedDevice(device);
      setIsLoading(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-200 dark:from-black dark:via-black dark:to-[#2e1065] text-foreground selection:bg-purple-500/30 selection:text-purple-200 overflow-x-hidden relative font-tinos">
      <MachineThinking isThinking={isLoading} />
      {/* Background Ambience - Canvas */}
      {/* Background Ambience - Canvas */}
      <canvas
        className="fixed inset-0 z-0 pointer-events-none w-full h-full opacity-80 dark:mix-blend-screen transition-opacity duration-500"
        id="canvas"
      ></canvas>

      {/* Main Website Navigation */}
      <BubbleNav />

      <div className="relative z-10 flex flex-col min-h-screen pt-20">
        {/* Dashboard Sub-Navbar */}
        <DashboardNavbar selectedDevice={selectedDevice} devices={devices} onDeviceChange={handleDeviceChange} />

        {/* Enterprise RBAC Identity Strip */}
        <div className="px-6 py-2.5 bg-black/5 dark:bg-white/5 border-y border-foreground/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              "flex items-center gap-1.5 px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-[0.2em] border",
              userRole === 'engineer' && "bg-blue-500/10 text-blue-500 border-blue-500/20",
              userRole === 'viewer' && "bg-amber-500/10 text-amber-500 border-amber-500/20",
              userRole === 'admin' && "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
            )}>
              {userRole === 'admin' ? '👑 Enterprise Governance' :
                userRole === 'engineer' ? '🛠 Intelligence Operations' :
                  '👁 Insight Observation'}
            </div>
            <div className="h-4 w-px bg-foreground/10 hidden md:block" />
            <span className="hidden md:block text-[10px] text-muted-foreground/60 uppercase tracking-widest font-black">
              Authenticated Control Mode
            </span>
          </div>
          <div className="hidden lg:block text-[10px] text-muted-foreground/40 italic font-medium px-4 border-l border-foreground/10">
            🧠 Forsee Intelligence separates insight consumption from system control.
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-6 py-6 space-y-6">
          {/* Top KPI Bar */}
          <div className="w-full">
            <GlobalStatusBar />
          </div>

          {/* Main Workspace (3-Column Grid) */}
          <div className="grid grid-cols-12 gap-6">
            {/* LEFT: Fleet Command */}
            <div className="col-span-12 lg:col-span-3 xl:col-span-2 min-h-[500px] flex flex-col">
              <FleetCommandPanel deviceId={selectedDevice.id} />
            </div>

            {/* CENTER: Asset Intelligence */}
            <div className="col-span-12 lg:col-span-6 xl:col-span-7 min-h-[500px] flex flex-col">
              <AssetIntelligencePanel deviceId={selectedDevice.id} />
            </div>

            {/* RIGHT: Insights */}
            <div className="col-span-12 lg:col-span-3 xl:col-span-3 min-h-[500px] flex flex-col">
              <InsightsPanel deviceId={selectedDevice.id} />
            </div>

            {/* BOTTOM: Machine History (Full Width) */}
            <div className="col-span-12 h-[300px]">
              <MachineHistoryCard deviceId={selectedDevice.id} />
            </div>
          </div>
        </div>
      </div>

      <FloatingDashboardActions />
    </div>
  );
}

