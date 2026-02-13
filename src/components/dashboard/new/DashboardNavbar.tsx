import { ChevronDown, Monitor, Laptop, Smartphone, Cpu, LucideIcon } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export interface Device {
    id: string;
    name: string;
    icon: LucideIcon;
}

export const devices: Device[] = [
    { id: "dev-01", name: "Turbine A-11", icon: Monitor },
    { id: "dev-02", name: "Gen. Control", icon: Cpu },
    { id: "dev-03", name: "Field Tablet", icon: Smartphone },
    { id: "dev-04", name: "Engine Monitor", icon: Laptop },
];

interface DashboardNavbarProps {
    selectedDevice: Device;
    devices: Device[];
    onDeviceChange: (device: Device) => void;
}

export function DashboardNavbar({ selectedDevice, devices, onDeviceChange }: DashboardNavbarProps) {
    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-black dark:bg-zinc-800/90 backdrop-blur-md border-b border-white/10 dark:border-zinc-700 relative z-50">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#00E0C6]/20 flex items-center justify-center border border-[#00E0C6]/30">
                        <div className="w-4 h-4 rounded-full bg-[#00E0C6] animate-pulse shadow-[0_0_10px_#00E0C6]" />
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-white dark:text-zinc-100 font-tinos">
                        FORSEE <span className="text-slate-500 font-normal dark:text-zinc-400">| Intelligence </span>
                    </h1>
                </div>

                <div className="h-6 w-px bg-white/10 dark:bg-zinc-700 mx-2" />

                {/* Device Switcher */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-9 px-3 text-slate-300 dark:text-zinc-400 hover:text-white dark:hover:text-white hover:bg-white/5 dark:hover:bg-zinc-700 border border-transparent hover:border-white/10 dark:hover:border-zinc-600 rounded-lg gap-2 font-inter font-normal">
                            <selectedDevice.icon className="w-4 h-4 text-[#00E0C6]" />
                            {selectedDevice.name}
                            <ChevronDown className="w-3 h-3 opacity-50" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-[200px] bg-[#050b14] dark:bg-zinc-800 border-white/10 dark:border-zinc-700 text-slate-300 dark:text-zinc-100 backdrop-blur-xl shadow-xl">
                        {devices.map((device) => (
                            <DropdownMenuItem
                                key={device.id}
                                onClick={() => onDeviceChange(device)}
                                className="focus:bg-white/10 dark:focus:bg-zinc-700 focus:text-white dark:focus:text-white cursor-pointer gap-2"
                            >
                                <device.icon className="w-4 h-4 text-slate-500 dark:text-zinc-400" />
                                {device.name}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="flex items-center gap-4">
                <div className="text-xs text-slate-500 dark:text-zinc-400 font-mono">
                    v2.4.0-stable
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-800 dark:bg-zinc-700 border border-white/10 dark:border-zinc-600" />
            </div>
        </nav>
    );
}
