import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Camera, MessageSquare, AlertCircle, MapPin, Clock, ShieldCheck, ChevronDown } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

interface HumanObservationCardProps {
    domain: string;
    observation: {
        type: string;
        typeOther: string;
        severity: string;
        location: string;
        duration: string;
        confidence: string;
        context: string[];
        note: string;
        photo: File | null;
    };
    onChange: (field: string, value: any) => void;
    className?: string;
}

const locationsByDomain: Record<string, { value: string; label: string }[]> = {
    "power-transformers": [
        { value: "main-tank", label: "Main Tank" },
        { value: "bushing", label: "High-Voltage Bushing" },
        { value: "tap-changer", label: "Tap Changer" },
        { value: "cooling-radiator", label: "Cooling Radiator" },
        { value: "conservator", label: "Conservator Tank" },
    ],
    "wind-turbines": [
        { value: "bearing", label: "Main Bearing" },
        { value: "gearbox", label: "Gearbox Case" },
        { value: "generator", label: "Generator Housing" },
        { value: "blade-root", label: "Blade Root" },
        { value: "yaw-drive", label: "Yaw Drive" },
    ],
    "industrial-motors": [
        { value: "drive-end", label: "Drive-End Bearing" },
        { value: "non-drive-end", label: "Non-Drive-End Bearing" },
        { value: "stator", label: "Stator Frame" },
        { value: "terminal-box", label: "Terminal Box" },
        { value: "shaft", label: "Main Shaft" },
    ],
    "icu-monitoring": [
        { value: "chest", label: "Chest (ECG Placement)" },
        { value: "extremity", label: "Extremity (SpO2)" },
        { value: "airway", label: "Airway / Mask" },
        { value: "iv-line", label: "IV Access Site" },
    ],
    "servers": [
        { value: "cpu-socket", label: "CPU Socket Area" },
        { value: "psu", label: "Power Supply Unit" },
        { value: "chassis-fan", label: "Chassis Fan" },
        { value: "storage-bay", label: "Storage Bay" },
        { value: "motherboard", label: "Motherboard VRM" },
    ],
    "laptops": [
        { value: "keyboard-deck", label: "Keyboard Deck (Heat)" },
        { value: "bottom-cover", label: "Bottom Intake Vent" },
        { value: "screen-hinge", label: "Screen Hinge" },
        { value: "trackpad", label: "Trackpad Area" },
        { value: "battery-bay", label: "Battery Compartment" },
    ],
    "bridges": [
        { value: "expansion-joint", label: "Expansion Joint" },
        { value: "abutment", label: "Main Abutment" },
        { value: "suspension-cable", label: "Suspension Cable" },
        { value: "pylon-base", label: "Pylon Base" },
        { value: "deck-underside", label: "Deck Underside" },
    ],
    "cnc-machines": [
        { value: "spindle", label: "Main Spindle" },
        { value: "x-axis-lead", label: "X-Axis Lead Screw" },
        { value: "tool-magazine", label: "Tool Magazine" },
        { value: "coolant-pump", label: "Coolant Pump" },
        { value: "turret", label: "Tool Turret" },
    ],
    "hvac-systems": [
        { value: "compressor", label: "Compressor Unit" },
        { value: "evaporator-coil", label: "Evaporator Coil" },
        { value: "condenser-fan", label: "Condenser Fan" },
        { value: "blower-motor", label: "Blower Motor" },
        { value: "refrigerant-line", label: "Refrigerant Line" },
    ],
    "pipelines": [
        { value: "weld-joint", label: "Weld Joint" },
        { value: "valve-station", label: "Valve Station" },
        { value: "pumping-unit", label: "Pumping Unit" },
        { value: "bend-section", label: "Elbow / Bend Section" },
        { value: "metering", label: "Metering Skid" },
    ],
    "semiconductor-tools": [
        { value: "wafer-stage", label: "Wafer Stage" },
        { value: "optical-column", label: "Optical Column" },
        { value: "vacuum-pump", label: "Vacuum Pump" },
        { value: "load-lock", label: "Load Lock" },
        { value: "handler-arm", label: "Robot Handler Arm" },
    ],
    "solar-inverters": [
        { value: "igbt-bank", label: "IGBT Bank" },
        { value: "dc-bus", label: "DC Bus Bar" },
        { value: "capacitor-bank", label: "Filter Capacitors" },
        { value: "heat-sink", label: "Main Heat Sink" },
        { value: "control-board", label: "Control Board" },
    ],
    "power-generators": [
        { value: "cylinder-head", label: "Cylinder Head" },
        { value: "alternator", label: "Alternator Housing" },
        { value: "turbocharger", label: "Turbocharger Unit" },
        { value: "fuel-rail", label: "Fuel Injection Rail" },
        { value: "oil-sump", label: "Oil Sump Basin" },
    ],
    "smart-grid": [
        { value: "transformer-tap", label: "Transformer Tap" },
        { value: "breaker-contacts", label: "Breaker Contacts" },
        { value: "bus-connection", label: "Main Bus Connection" },
        { value: "inverter-interface", label: "Inverter Interface" },
    ],
    "pumps": [
        { value: "impeller-housing", label: "Impeller Housing" },
        { value: "mechanical-seal", label: "Mechanical Seal Area" },
        { value: "motor-coupling", label: "Motor-Pump Coupling" },
        { value: "suction-flange", label: "Suction Flange" },
        { value: "discharge-port", label: "Discharge Port" },
    ],
    "industrial-robots": [
        { value: "joint-3", label: "Joint 3 (Elbow)" },
        { value: "wrist-actuator", label: "Wrist Actuator" },
        { value: "base-gearbox", label: "Base Gearbox" },
        { value: "harness", label: "Internal Wire Harness" },
        { value: "gripper", label: "End Effector / Gripper" },
    ],
    "vehicle-engines": [
        { value: "valve-cover", label: "Valve Cover" },
        { value: "fuel-injector", label: "Fuel Injector No. 3" },
        { value: "timing-belt", label: "Timing Belt Cover" },
        { value: "exhaust-manifold", label: "Exhaust Manifold" },
        { value: "coolant-hose", label: "Main Radiator Hose" },
    ],
    "ev-batteries": [
        { value: "module-4", label: "Battery Module 4" },
        { value: "bms-unit", label: "BMS Control Unit" },
        { value: "cooling-plate", label: "Thermal Cooling Plate" },
        { value: "hv-connector", label: "HV Connector Port" },
    ],
    "jet-engines": [
        { value: "lpt-blades", label: "Low Pressure Turbine" },
        { value: "combustor-liner", label: "Combustor Liner" },
        { value: "fan-root", label: "Fan Blade Root" },
        { value: "oil-scavenge", label: "Oil Scavenge Pump" },
        { value: "accessory-gearbox", label: "Accessory Gearbox" },
    ],
    "traction-motors": [
        { value: "commutator", label: "Commutator / Brushes" },
        { value: "stator-winding", label: "Stator Winding Bank" },
        { value: "pinion-gear", label: "Drive Pinion Gear" },
        { value: "armature", label: "Armature Bearing" },
    ],
    "ventilators": [
        { value: "exhalation-valve", label: "Exhalation Valve" },
        { value: "oxygen-cell", label: "Oxygen Sensor Cell" },
        { value: "piston-drive", label: "Internal Piston Drive" },
        { value: "humidifier", label: "Humidifier Interface" },
    ],
    "cooling-systems": [
        { value: "heat-exchanger", label: "Heat Exchanger Bundle" },
        { value: "chiller-comp", label: "Chiller Compressor" },
        { value: "fan-bearing", label: "Primary Fan Bearing" },
        { value: "water-pump", label: "Circulation Pump" },
    ],
    "drilling-equipment": [
        { value: "drill-bit", label: "Drill Bit Teeth" },
        { value: "mud-motor", label: "Downhole Mud Motor" },
        { value: "top-drive", label: "Top Drive Assembly" },
        { value: "pipe-handler", label: "Pipe Handler Arm" },
    ],
    "lithography": [
        { value: "wafer-chuck", label: "Wafer Chuck" },
        { value: "projection-lens", label: "Projection Lens" },
        { value: "laser-source", label: "EUV / DUV Source" },
        { value: "reticle-stage", label: "Reticle Stage" },
        { value: "wafer-handler", label: "Wafer Robot Handler" },
    ],
    "general": [
        { value: "bearing", label: "Bearing" },
        { value: "motor", label: "Motor" },
        { value: "coupling", label: "Coupling" },
        { value: "valve", label: "Valve" },
        { value: "panel", label: "Control Panel" },
        { value: "other", label: "Other" },
    ],
};

export const HumanObservationCard: React.FC<HumanObservationCardProps> = ({
    domain,
    observation,
    onChange,
    className = "",
}) => {
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);

    useEffect(() => {
        if (observation.photo) {
            const reader = new FileReader();
            reader.onloadend = () => setPhotoPreview(reader.result as string);
            reader.readAsDataURL(observation.photo);
        } else {
            setPhotoPreview(null);
        }
    }, [observation.photo]);

    const handleTypeChange = (value: string) => {
        onChange("type", value);
        if (value && !observation.severity) onChange("severity", "moderate");
        if (value && !observation.confidence) onChange("confidence", "medium");
    };

    const handleContextChange = (ctxValue: string, checked: boolean) => {
        const newContext = checked
            ? [...observation.context, ctxValue]
            : observation.context.filter((c) => c !== ctxValue);
        onChange("context", newContext);
    };

    const locations = locationsByDomain[domain] || locationsByDomain["general"];

    return (
        <div
            id="human-observation-card"
            className={`card-meta relative overflow-hidden rounded-2xl border border-border bg-card/40 backdrop-blur-xl p-5 shadow-xl ${className}`}
        >
            <div className="flex items-center gap-2 mb-6 border-b border-border/40 pb-3">
                <Eye className="w-5 h-5 text-primary" />
                <h3 id="human-observation-heading" className="text-sm font-black uppercase tracking-widest text-foreground">
                    Human Observation
                </h3>
            </div>

            <div className="space-y-6">
                {/* Row 1: Observation Type */}
                <div className="space-y-2">
                    <Label htmlFor={`input-${domain}-obs-type`} className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                        <AlertCircle className="w-3 h-3" /> Observation Type
                    </Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Select value={observation.type} onValueChange={handleTypeChange}>
                            <SelectTrigger id={`input-${domain}-obs-type`} className="bg-background/40 border-border/50 h-10">
                                <SelectValue placeholder="— Select —" />
                            </SelectTrigger>
                            <SelectContent className="bg-card/90 backdrop-blur-xl border-border">
                                <SelectItem value="noise">Noise</SelectItem>
                                <SelectItem value="heat">Heat</SelectItem>
                                <SelectItem value="vibration">Vibration</SelectItem>
                                <SelectItem value="leak">Leak</SelectItem>
                                <SelectItem value="smell">Smell</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>

                        <AnimatePresence>
                            {observation.type === "other" && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                >
                                    <Input
                                        id={`input-${domain}-obs-type-other`}
                                        placeholder="Specify type..."
                                        value={observation.typeOther}
                                        onChange={(e) => onChange("typeOther", e.target.value)}
                                        className="bg-background/40 border-border/50 h-10"
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Row 2: Severity & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <Label htmlFor={`input-${domain}-obs-severity`} className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                            <ShieldCheck className="w-3 h-3" /> Severity
                        </Label>
                        <Select value={observation.severity} onValueChange={(v) => onChange("severity", v)}>
                            <SelectTrigger id={`input-${domain}-obs-severity`} className="bg-background/40 border-border/50 h-10">
                                <SelectValue placeholder="— Select —" />
                            </SelectTrigger>
                            <SelectContent className="bg-card/90 backdrop-blur-xl border-border">
                                <SelectItem value="none">None</SelectItem>
                                <SelectItem value="mild">Mild</SelectItem>
                                <SelectItem value="moderate">Moderate</SelectItem>
                                <SelectItem value="severe">Severe</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor={`input-${domain}-obs-location`} className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                            <MapPin className="w-3 h-3" /> Location
                        </Label>
                        <Select value={observation.location} onValueChange={(v) => onChange("location", v)}>
                            <SelectTrigger id={`input-${domain}-obs-location`} className="bg-background/40 border-border/50 h-10">
                                <SelectValue placeholder="— Select —" />
                            </SelectTrigger>
                            <SelectContent className="bg-card/90 backdrop-blur-xl border-border">
                                {locations.map((loc) => (
                                    <SelectItem key={loc.value} value={loc.value}>{loc.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Row 3: Duration & Confidence */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <Label htmlFor={`input-${domain}-obs-duration`} className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                            <Clock className="w-3 h-3" /> Duration
                        </Label>
                        <Select value={observation.duration} onValueChange={(v) => onChange("duration", v)}>
                            <SelectTrigger id={`input-${domain}-obs-duration`} className="bg-background/40 border-border/50 h-10">
                                <SelectValue placeholder="— Select —" />
                            </SelectTrigger>
                            <SelectContent className="bg-card/90 backdrop-blur-xl border-border">
                                <SelectItem value="momentary">Momentary</SelectItem>
                                <SelectItem value="continuous">Continuous</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor={`input-${domain}-obs-confidence`} className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                            <ShieldCheck className="w-3 h-3" /> Confidence
                        </Label>
                        <Select value={observation.confidence} onValueChange={(v) => onChange("confidence", v)}>
                            <SelectTrigger id={`input-${domain}-obs-confidence`} className="bg-background/40 border-border/50 h-10">
                                <SelectValue placeholder="— Select —" />
                            </SelectTrigger>
                            <SelectContent className="bg-card/90 backdrop-blur-xl border-border">
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Row 4: Context checkboxes */}
                <div className="space-y-3 p-4 bg-background/20 rounded-xl border border-border/30">
                    <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground block mb-2">Observation Context</Label>
                    <div id={`input-${domain}-obs-context`} className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                        {[
                            { id: "ctx-routine", value: "routine", label: "Routine inspection" },
                            { id: "ctx-after-trip", value: "after_trip", label: "After trip" },
                            { id: "ctx-after-overload", value: "after_overload", label: "After overload" },
                            { id: "ctx-abnormal", value: "abnormal", label: "During abnormal operation" },
                            { id: "ctx-post-maint", value: "post_maintenance", label: "Post-maintenance" },
                        ].map((ctx) => (
                            <div key={ctx.id} className="flex items-center space-x-2">
                                <Checkbox
                                    id={ctx.id}
                                    checked={observation.context.includes(ctx.value)}
                                    onCheckedChange={(checked) => handleContextChange(ctx.value, !!checked)}
                                    className="border-primary/50 data-[state=checked]:bg-primary"
                                />
                                <Label htmlFor={ctx.id} className="text-xs text-foreground/80 cursor-pointer">{ctx.label}</Label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Row 5: Photo and Note */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <Label htmlFor={`input-${domain}-obs-photo`} className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                            <Camera className="w-3 h-3" /> Photo (Optional)
                        </Label>
                        <div className="flex flex-col gap-3">
                            <Input
                                id={`input-${domain}-obs-photo`}
                                type="file"
                                accept="image/*"
                                onChange={(e) => onChange("photo", e.target.files?.[0] || null)}
                                className="bg-background/40 border-border/50 text-xs h-10 pt-2"
                            />
                            {photoPreview && (
                                <motion.div
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="relative w-20 h-20 rounded-lg overflow-hidden border border-primary/30"
                                >
                                    <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                                </motion.div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor={`input-${domain}-obs-note`} className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                            <MessageSquare className="w-3 h-3" /> Notes
                        </Label>
                        <Textarea
                            id={`input-${domain}-obs-note`}
                            rows={3}
                            placeholder="Short note (what you observed)"
                            value={observation.note}
                            onChange={(e) => onChange("note", e.target.value)}
                            className="bg-background/40 border-border/50 italic text-[13px] resize-none"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
