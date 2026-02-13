import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import api from "@/lib/api";
import { Monitor, Cpu, Smartphone, Laptop, LucideIcon, Activity } from "lucide-react";

export interface Device {
    id: string;
    name: string;
    icon: LucideIcon;
}

// Initial default devices
const defaultDevices: Device[] = [
    { id: "dev-01", name: "Turbine A-11", icon: Monitor },
    { id: "dev-02", name: "Gen. Control", icon: Cpu },
    { id: "dev-03", name: "Field Tablet", icon: Smartphone },
    { id: "dev-04", name: "Engine Monitor", icon: Laptop },
];

interface DashboardContextType {
    devices: Device[];
    addDevice: (device: Omit<Device, "icon"> & { icon?: LucideIcon }) => void;
    removeDevice: (id: string) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
    const [devices, setDevices] = useState<Device[]>([]);

    useEffect(() => {
        const fetchAssets = async () => {
            try {
                // Only fetch if authenticated (token exists)
                const token = localStorage.getItem('forsee_access_token');
                if (!token) {
                    setDevices(defaultDevices); // Fallback for unauthenticated/demo
                    return;
                }

                const response = await api.get('/assets/');
                const assets = response.data;

                const mappedDevices: Device[] = assets.map((asset: any) => ({
                    id: asset.id,
                    name: asset.name,
                    icon: getIconForAssetType(asset.type),
                }));

                if (mappedDevices.length > 0) {
                    setDevices(mappedDevices);
                } else {
                    setDevices(defaultDevices); // Fallback if empty
                }
            } catch (error) {
                console.error("Failed to fetch assets:", error);
                setDevices(defaultDevices); // Fallback on error
            }
        };

        fetchAssets();
    }, []);

    const addDevice = async (newDevice: Omit<Device, "icon"> & { icon?: LucideIcon }) => {
        try {
            const response = await api.post('/assets/', {
                name: newDevice.name,
                type: 'custom', // Default type for now
                description: 'Added via Dashboard',
                status: 'active'
            });

            const asset = response.data;
            const deviceWithIcon: Device = {
                id: asset.id,
                name: asset.name,
                icon: newDevice.icon || Activity
            };

            setDevices(prev => [...prev, deviceWithIcon]);
        } catch (error) {
            console.error("Failed to add device:", error);
            // Optimistic update or error handling could go here
        }
    };

    const removeDevice = async (id: string) => {
        try {
            await api.delete(`/assets/${id}`);
            setDevices(prev => prev.filter(d => d.id !== id));
        } catch (error) {
            console.error("Failed to remove device:", error);
        }
    };

    return (
        <DashboardContext.Provider value={{ devices, addDevice, removeDevice }}>
            {children}
        </DashboardContext.Provider>
    );
}

// Helper to map asset type to icon
function getIconForAssetType(type: string): LucideIcon {
    const lowerType = type?.toLowerCase() || '';
    if (lowerType.includes('turbine')) return Monitor;
    if (lowerType.includes('control')) return Cpu;
    if (lowerType.includes('tablet') || lowerType.includes('mobile')) return Smartphone;
    if (lowerType.includes('monitor') || lowerType.includes('computer')) return Laptop;
    return Activity;
}

export function useDashboard() {
    const context = useContext(DashboardContext);
    if (context === undefined) {
        throw new Error("useDashboard must be used within a DashboardProvider");
    }
    return context;
}
