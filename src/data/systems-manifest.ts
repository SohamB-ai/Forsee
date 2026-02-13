import { LucideIcon, Zap, Wind, Cog, Battery, Ruler, Activity, Server, Droplets, Workflow, Microscope, Laptop, Sun, Network, Bot, Car, Plane, Train, Stethoscope, Fan, Drill, Building2, Cpu, Gauge } from "lucide-react";

export type RiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface SensorConfig {
    id: string;
    label: string;
    unit: string;
    placeholder: string;
    defaultValue?: string;
}

export interface CognitiveEvent {
    time: string;
    description: string;
    type: "normal" | "warning" | "critical" | "inference";
    details?: string;
}

export interface DegradationDriver {
    factor: string;
    direction: "up" | "down" | "stable";
    impact: "strong" | "moderate" | "neutral";
}

export interface DecisionConfig {
    action: string;
    why: string[];
    consequences: {
        text: string;
        impact: string;
    }[];
}

export interface SystemProfile {
    id: string;
    title: string;
    icon: LucideIcon;
    description: string;
    location: string;
    digitalIdentity: {
        age: string;
        regime: string;
        model: string;
        lastMaintenance: string;
    };
    sensors: SensorConfig[];
    cognitiveTimeline: CognitiveEvent[];
    degradationDrivers: DegradationDriver[];
    precursor: {
        probability: number;
        status: "Detected" | "Not Detected";
        explanation: string;
    };
    dataDrift: {
        detected: boolean;
        severity: "Low" | "Medium" | "High";
        explanation: string;
    };
    failureCluster: {
        id: string;
        label: string;
        description: string;
    };
    economics: {
        potentialCost: string;
        downtimeCost: string;
    };
    defaultDecision: DecisionConfig;
}

export const systemsManifest: Record<string, SystemProfile> = {
    "power-transformers": {
        id: "power-transformers",
        title: "Power Transformer",
        icon: Zap,
        description: "Critical Grid Infrastructure",
        location: "Substation Alpha-7, Detroit",
        digitalIdentity: {
            age: "14.2 Years",
            regime: "Base Load (Continuous)",
            model: "Tx-Net-v4.2 (DGA)",
            lastMaintenance: "3 Months Ago"
        },
        sensors: [
            { id: "oilTemp", label: "Oil Temperature", unit: "°C", placeholder: "20-100", defaultValue: "85" },
            { id: "windingTemp", label: "Winding Temperature", unit: "°C", placeholder: "40-130", defaultValue: "92" },
            { id: "loadCurrent", label: "Load Current", unit: "A", placeholder: "0-2000", defaultValue: "1450" },
            { id: "hydrogen", label: "Hydrogen Gas", unit: "ppm", placeholder: "0-1000", defaultValue: "120" },
            { id: "partialDischarge", label: "Partial Discharge", unit: "pC", placeholder: "0-500", defaultValue: "45" },
        ],
        cognitiveTimeline: [
            { time: "-2h 15m", description: "Gas generation slope increased", type: "warning", details: "Rate: +18%" },
            { time: "-45m", description: "Thermal margin reduced below safe envelope", type: "inference", details: "Margin: < 5°C" },
            { time: "-12m", description: "Failure cluster shift", type: "critical", details: "Normal → Insulation Degradation" },
            { time: "Now", description: "RUL revised due to accelerated gas evolution", type: "inference", details: "-420 Cycles" },
        ],
        degradationDrivers: [
            { factor: "Hydrogen Gas", direction: "up", impact: "strong" },
            { factor: "Winding Temp", direction: "up", impact: "moderate" },
            { factor: "Partial Discharge", direction: "up", impact: "strong" },
            { factor: "Load Current", direction: "stable", impact: "neutral" },
        ],
        precursor: {
            probability: 0.82,
            status: "Detected",
            explanation: "High-frequency gas evolution pattern matches early-stage insulation failure."
        },
        dataDrift: {
            detected: true,
            severity: "Medium",
            explanation: "Input load distributions have shifted 15% from training baseline."
        },
        failureCluster: {
            id: "CL-992",
            label: "Dielectric Breakdown",
            description: "Similar to 2022 failure in Ohio unit."
        },
        economics: {
            potentialCost: "$450,000",
            downtimeCost: "$42,000 / hr"
        },
        defaultDecision: {
            action: "Schedule Oil Analysis & Load Reduction",
            why: [
                "Hydrogen gas generation > 100ppm/day",
                "Insulation life impact: -14%",
                "Confirmed thermal stress pattern"
            ],
            consequences: [
                { text: "Catastrophic Dielectric Failure Probability", impact: "42%" },
                { text: "Est. Replacement Cost", impact: "$2.4M" }
            ]
        }
    },
    "wind-turbines": {
        id: "wind-turbines",
        title: "Wind Turbine",
        icon: Wind,
        description: "Renewable Energy Unit",
        location: "Offshore Block B, North Sea",
        digitalIdentity: {
            age: "6.5 Years",
            regime: "Variable (High Wind)",
            model: "Aero-Dyn-v9 (Vib)",
            lastMaintenance: "6 Months Ago"
        },
        sensors: [
            { id: "gearboxVib", label: "Gearbox Vibration", unit: "Hz", placeholder: "0-50", defaultValue: "28" },
            { id: "rotorSpeed", label: "Rotor Speed", unit: "RPM", placeholder: "0-20", defaultValue: "14" },
            { id: "genTemp", label: "Generator Temperature", unit: "°C", placeholder: "20-120", defaultValue: "98" },
            { id: "acoustic", label: "Acoustic Emission", unit: "dB", placeholder: "0-100", defaultValue: "72" }
        ],
        cognitiveTimeline: [
            { time: "-4h 30m", description: "Vibration spectral shift detected", type: "inference", details: "Harmonic: 3x" },
            { time: "-1h 20m", description: "Acoustic Forsee Probability crossed 0.7", type: "warning", details: "Threshold: 0.65" },
            { time: "-10m", description: "Failure cluster: Healthy → Gearbox Bearing Wear", type: "critical", details: "Confidence: 92%" }
        ],
        degradationDrivers: [
            { factor: "Gearbox Vibration", direction: "up", impact: "strong" },
            { factor: "Acoustic Emission", direction: "up", impact: "strong" },
            { factor: "Generator Temp", direction: "up", impact: "moderate" }
        ],
        precursor: {
            probability: 0.74,
            status: "Detected",
            explanation: "Harmonic vibration levels are tracking gearbox fatigue signatures."
        },
        dataDrift: {
            detected: false,
            severity: "Low",
            explanation: "Model inputs remain within training bounds."
        },
        failureCluster: {
            id: "CL-441",
            label: "Gearbox Bearing Wear",
            description: "Signature matches G-Series fatigue patterns."
        },
        economics: {
            potentialCost: "$120,000",
            downtimeCost: "$1,500 / hr"
        },
        defaultDecision: {
            action: "Schedule Bearing Replacement Window",
            why: [
                "Vibration RMS > ISO limit",
                "Acoustic signature matches 'Inner Race Defect'",
                "RUL < 30 days"
            ],
            consequences: [
                { text: "Gearbox Seizure Risk", impact: "High" },
                { text: "Crane Deployment Cost", impact: "+$45k" }
            ]
        }
    },
    "industrial-motors": {
        id: "industrial-motors",
        title: "Industrial Motor",
        icon: Cog,
        description: "HVAC & Manufacturing Driver",
        location: "Assembly Line 4, Factory 12",
        digitalIdentity: {
            age: "3.1 Years",
            regime: "Cyclic Start/Stop",
            model: "Induct-X-v2",
            lastMaintenance: "1 Month Ago"
        },
        sensors: [
            { id: "vibration", label: "Vibration", unit: "mm/s", placeholder: "0-25", defaultValue: "8" },
            { id: "statorCurrent", label: "Stator Current", unit: "A", placeholder: "0-500", defaultValue: "320" },
            { id: "temperature", label: "Motor Temperature", unit: "°C", placeholder: "20-100", defaultValue: "78" },
            { id: "rpm", label: "RPM", unit: "rpm", placeholder: "0-3600", defaultValue: "1750" }
        ],
        cognitiveTimeline: [
            { time: "-5h", description: "Power factor drift detected", type: "inference", details: "Delta: 0.05" },
            { time: "-2h", description: "Vibration RMS slope increased", type: "warning", details: "Slope: +5%/hr" },
            { time: "Now", description: "Failure cluster: Normal → Bearing Inner Race Wear", type: "critical", details: "Simulated" }
        ],
        degradationDrivers: [
            { factor: "Vibration", direction: "up", impact: "strong" },
            { factor: "Motor Temp", direction: "up", impact: "moderate" },
            { factor: "Stator Current", direction: "up", impact: "moderate" }
        ],
        precursor: {
            probability: 0.65,
            status: "Detected",
            explanation: "Vibration envelope acceleration suggests bearing inner race wear."
        },
        dataDrift: {
            detected: true,
            severity: "Low",
            explanation: "Slight drift in power factor correlations."
        },
        failureCluster: {
            id: "CL-102",
            label: "Inner Race Wear",
            description: "Consistent with high-duty cycle motors."
        },
        economics: {
            potentialCost: "$15,000",
            downtimeCost: "$5,000 / hr (Line Stop)"
        },
        defaultDecision: {
            action: "Inspect Bearings & Lubrication",
            why: [
                "Vibration envelope high in 2kHz band",
                " Motor temperature rise correlates with load",
                "Forsee Probability > 60%"
            ],
            consequences: [
                { text: "Catastrophic Seizure Probability", impact: "35%" },
                { text: "Production Halt Risk", impact: "Critical" }
            ]
        }
    },
    "icu-monitoring": {
        id: "icu-monitoring",
        title: "ICU Patient Monitor",
        icon: Activity,
        description: "Critical Care Telemetry",
        location: "Unit 4, Mercy Hospital",
        digitalIdentity: {
            age: "N/A",
            regime: "Triage: Critical",
            model: "Bio-Sense-AI-v1",
            lastMaintenance: "Daily Calib"
        },
        sensors: [
            { id: "ecg", label: "ECG Variability", unit: "ms", placeholder: "0-100", defaultValue: "45" },
            { id: "spo2", label: "SpO2", unit: "%", placeholder: "70-100", defaultValue: "94" },
            { id: "hr", label: "Heart Rate", unit: "bpm", placeholder: "40-200", defaultValue: "112" },
            { id: "resp", label: "Respiration Rate", unit: "bpm", placeholder: "10-40", defaultValue: "28" }
        ],
        cognitiveTimeline: [
            { time: "-15m", description: "Heart rate variability decreased", type: "warning", details: "Signs of stress" },
            { time: "-8m", description: "Oxygen saturation trend worsening", type: "critical", details: "Slope -2%" },
            { time: "-2m", description: "Failure cluster: Stable → Respiratory Risk", type: "critical", details: "Code Blue Risk" }
        ],
        degradationDrivers: [
            { factor: "SpO2", direction: "down", impact: "strong" },
            { factor: "Respiration Rate", direction: "up", impact: "moderate" },
            { factor: "ECG Variability", direction: "down", impact: "strong" }
        ],
        precursor: {
            probability: 0.88,
            status: "Detected",
            explanation: "Sepsis onset pattern identified via cardiac-respiratory decoupling."
        },
        dataDrift: {
            detected: false,
            severity: "Low",
            explanation: "Clinical baseline stable."
        },
        failureCluster: {
            id: "CL-BIO",
            label: "Respiratory Failure",
            description: "Matches acute decompensation cluster."
        },
        economics: {
            potentialCost: "Patient Safety Incident",
            downtimeCost: "Critical Life Risk"
        },
        defaultDecision: {
            action: "Escalate Monitoring / Clinical Intervention",
            why: [
                "Respiratory decompensation pattern detected",
                "SpO2/HR decoupling",
                "Sepsis Forsee Probability > 0.8"
            ],
            consequences: [
                { text: "Acute Event Probability", impact: "High" },
                { text: "Response Window", impact: "< 10 min" }
            ]
        }
    },
    "servers": {
        id: "servers",
        title: "Data Center Server",
        icon: Server,
        description: "High-Performance Compute Node",
        location: "Rack 42, Data Center East",
        digitalIdentity: {
            age: "1.5 Years",
            regime: "Peak Load",
            model: "Blade-X9",
            lastMaintenance: "2 Weeks Ago"
        },
        sensors: [
            { id: "cpuTemp", label: "CPU Temperature", unit: "°C", placeholder: "20-100", defaultValue: "88" },
            { id: "gpuTemp", label: "GPU Temperature", unit: "°C", placeholder: "20-100", defaultValue: "92" },
            { id: "fanSpeed", label: "Fan Speed", unit: "RPM", placeholder: "0-10000", defaultValue: "8500" },
            { id: "power", label: "Power Draw", unit: "W", placeholder: "0-2000", defaultValue: "1200" }
        ],
        cognitiveTimeline: [
            { time: "-1h", description: "Cooling efficiency dropped", type: "warning", details: "Delta T decreased" },
            { time: "-30m", description: "Thermal headroom reduced", type: "inference", details: "< 5% margin" },
            { time: "Now", description: "Failure probability increased under peak load", type: "critical", details: "Throttling imminent" }
        ],
        degradationDrivers: [
            { factor: "CPU Temp", direction: "up", impact: "strong" },
            { factor: "Fan Speed", direction: "up", impact: "moderate" },
            { factor: "Power Draw", direction: "up", impact: "moderate" }
        ],
        precursor: {
            probability: 0.68,
            status: "Detected",
            explanation: "Cooling saturation curve approaching critical thermal limit."
        },
        dataDrift: {
            detected: true,
            severity: "High",
            explanation: "Workload distribution has shifted significantly from model training."
        },
        failureCluster: {
            id: "CL-SRV",
            label: "Thermal Shutdown",
            description: "Matches peak-load overheating events."
        },
        economics: {
            potentialCost: "$12,000 (Hardware)",
            downtimeCost: "$80,000 / hr (SLA Breach)"
        },
        defaultDecision: {
            action: "Redistribute Load & Schedule Cooling Maintenance",
            why: [
                "Junction temp nearing T-max",
                "Fan duty cycle at 100%",
                "Efficiency curve degrading"
            ],
            consequences: [
                { text: "Thermal Shutdown Probability", impact: "65%" },
                { text: "Service Degradation", impact: "Likely" }
            ]
        }
    },
    "laptops": {
        id: "laptops",
        title: "Laptop Health & Intelligence",
        icon: Laptop,
        description: "Enterprise Computing Device",
        location: "Mobile / Remote Unit",
        digitalIdentity: {
            age: "1.2 Years",
            regime: "Developer Workload",
            model: "ThinkPad-X1-Carbon-G10",
            lastMaintenance: "3 Months Ago"
        },
        sensors: [
            { id: "cpu_temperature", label: "CPU Temperature", unit: "°C", placeholder: "30-100", defaultValue: "78" },
            { id: "battery_health", label: "Battery Health", unit: "%", placeholder: "0-100", defaultValue: "86" },
            { id: "fan_speed", label: "Fan Speed", unit: "RPM", placeholder: "0-6000", defaultValue: "5200" },
            { id: "cpu_usage", label: "CPU Usage", unit: "%", placeholder: "0-100", defaultValue: "82" },
            { id: "ram_usage", label: "RAM Usage", unit: "%", placeholder: "0-100", defaultValue: "68" }
        ],
        cognitiveTimeline: [
            { time: "-45m", description: "Thermal throttling detected", type: "warning", details: "CPU > 95°C" },
            { time: "-20m", description: "Battery discharge rate abnormal", type: "inference", details: "-15% in 15m" },
            { time: "Now", description: "Sustained high load risk", type: "critical", details: "Projected shutdown in 20m" }
        ],
        degradationDrivers: [
            { factor: "CPU Temperature", direction: "up", impact: "strong" },
            { factor: "Battery Cycles", direction: "up", impact: "moderate" },
            { factor: "Fan Efficiency", direction: "down", impact: "strong" }
        ],
        precursor: {
            probability: 0.72,
            status: "Detected",
            explanation: "Thermal throttling duration exceeding safety envelope."
        },
        dataDrift: {
            detected: false,
            severity: "Low",
            explanation: "Baseline usage within normal bounds."
        },
        failureCluster: {
            id: "CL-LT-1",
            label: "Thermal Throttling",
            description: "Matches dust-accumulation profiles."
        },
        economics: {
            potentialCost: "$2,500 (Replacement)",
            downtimeCost: "$150 / hr (Productivity)"
        },
        defaultDecision: {
            action: "Cooling System Maintenance",
            why: [
                "Dust accumulation likely",
                "Thermal paste degradation suspect",
                "Airflow obstruction detected"
            ],
            consequences: [
                { text: "Hardware Failure Risk", impact: "High" },
                { text: "Performance Throttling", impact: "Severe" }
            ]
        }
    },
    // Add placeholders for remaining systems to keep the file manageable but extensible
    "bridges": {
        id: "bridges",
        title: "Suspension Bridge",
        icon: Workflow,
        description: "Strategic Transport Link",
        location: "Golden Gate Bridge, SF",
        digitalIdentity: { age: "42 Years", regime: "Heavy Traffic", model: "Civil-Struct-v1", lastMaintenance: "1 Year Ago" },
        sensors: [{ id: "strain", label: "Strain", unit: "µE", placeholder: "0-1000", defaultValue: "450" }, { id: "crack", label: "Crack Width", unit: "mm", placeholder: "0-5", defaultValue: "1.2" }],
        cognitiveTimeline: [{ time: "Now", description: "Crack growth acceleration", type: "warning" }],
        degradationDrivers: [{ factor: "Strain", direction: "up", impact: "strong" }],
        precursor: { probability: 0.45, status: "Not Detected", explanation: "No immediate fatigue precursors detected." },
        dataDrift: { detected: false, severity: "Low", explanation: "Environmental baseline stable." },
        failureCluster: { id: "CL-CIV", label: "Fatigue Crack", description: "Matches 2018 structural drift." },
        economics: { potentialCost: "Structural Integrity", downtimeCost: "Strategic Blockage" },
        defaultDecision: { action: "Structural Inspection & Load Restriction", why: ["Fatigue capability check failed"], consequences: [{ text: "Safety Factor", impact: "Reduced" }] }
    },
    "cnc-machines": {
        id: "cnc-machines",
        title: "CNC Machining Center",
        icon: Cog,
        description: "Precision Manufacturing",
        location: "Factory Floor 2, Ohio",
        digitalIdentity: { age: "4 Years", regime: "24/7 Ops", model: "Precision-X", lastMaintenance: "2 Weeks Ago" },
        sensors: [{ id: "spindleVib", label: "Spindle Vib", unit: "mm/s", placeholder: "0-10", defaultValue: "4.5" }, { id: "toolWear", label: "Tool Wear", unit: "%", placeholder: "0-100", defaultValue: "85" }],
        cognitiveTimeline: [{ time: "Now", description: "Tool wear acceleration", type: "warning" }],
        degradationDrivers: [{ factor: "Tool Wear", direction: "up", impact: "strong" }],
        precursor: { probability: 0.89, status: "Detected", explanation: "Acoustic emission spikes match tool breakage precursors." },
        dataDrift: { detected: true, severity: "Medium", explanation: "Material hardness variance detected." },
        failureCluster: { id: "CL-CNC", label: "Tool Breakage", description: "Matches high-feed rate failures." },
        economics: { potentialCost: "$2,000 (Tool)", downtimeCost: "Scrap Batch Risk" },
        defaultDecision: { action: "Schedule Tool Change", why: ["Surface finish risk"], consequences: [{ text: "Quality Rejection", impact: "High" }] }
    },
    "hvac-systems": { // Mapped to Pipelines conceptually or kept separate
        id: "hvac-systems",
        title: "HVAC System",
        icon: Wind,
        description: "Building Climate Control",
        location: "Tower HQ, New York",
        digitalIdentity: { age: "8 Years", regime: "Cyclic", model: "Cool-Master", lastMaintenance: "4 Months Ago" },
        sensors: [{ id: "pressure", label: "Compressor Pressure", unit: "PSI", placeholder: "0-500", defaultValue: "420" }],
        cognitiveTimeline: [{ time: "Now", description: "Efficiency drop detected", type: "warning" }],
        degradationDrivers: [{ factor: "Pressure", direction: "up", impact: "moderate" }],
        precursor: { probability: 0.55, status: "Detected", explanation: "Pressure oscillations suggest refrigerant leak onset." },
        dataDrift: { detected: false, severity: "Low", explanation: "Weather patterns within expected regime." },
        failureCluster: { id: "CL-HVAC", label: "Compressor Stall", description: "Matches low-refrigerant profiles." },
        economics: { potentialCost: "$8,000", downtimeCost: "Comfort / Compliance" },
        defaultDecision: { action: "Filter & Coil Cleaning", why: ["Delta-T reduced"], consequences: [{ text: "Energy Cost", impact: "+15%" }] }
    },
    "pipelines": { // Explicitly adding pipelines even if route might not exist, for completeness
        id: "pipelines",
        title: "Oil & Gas Pipeline",
        icon: Droplets,
        description: "Critical Transport Infrastructure",
        location: "Kirkuk-Ceyhan Sector 4",
        digitalIdentity: { age: "22 Years", regime: "Continuous Flow", model: "Pipe-Net-v3", lastMaintenance: "6 Months Ago" },
        sensors: [{ id: "pressure", label: "Pressure", unit: "PSI", placeholder: "0-1000", defaultValue: "850" }, { id: "acoustic", label: "Acoustic Leak", unit: "dB", placeholder: "0-100", defaultValue: "20" }],
        cognitiveTimeline: [{ time: "Now", description: "Acoustic anomaly detected", type: "critical" }],
        degradationDrivers: [{ factor: "Pressure Drop", direction: "down", impact: "strong" }],
        precursor: { probability: 0.94, status: "Detected", explanation: "Transient pressure waves match pinhole leak acoustic profile." },
        dataDrift: { detected: false, severity: "Low", explanation: "Crude viscosity stable." },
        failureCluster: { id: "CL-PIPE", label: "Micro-Leak", description: "Matches corrosion-pitting patterns." },
        economics: { potentialCost: "Environmental Spill", downtimeCost: "$150,000 / hr" },
        defaultDecision: { action: "Emergency Valve Shutoff & Inspection", why: ["Leak probability > 99%"], consequences: [{ text: "Spill Volume", impact: "Escalating" }] }
    },
    "lithography": {
        id: "lithography",
        title: "Lithography Scanner",
        icon: Microscope,
        description: "Nanofabrication Tool",
        location: "Cleanroom 1, Hsinchu",
        digitalIdentity: { age: "2 Years", regime: "High Precision", model: "Nano-Lith-X", lastMaintenance: "1 Week Ago" },
        sensors: [{ id: "alignment", label: "Alignment Error", unit: "nm", placeholder: "0-20", defaultValue: "8" }, { id: "stageVib", label: "Stage Vib", unit: "nm", placeholder: "0-10", defaultValue: "3" }],
        cognitiveTimeline: [{ time: "Now", description: "Alignment drift detect", type: "warning" }],
        degradationDrivers: [{ factor: "Alignment Error", direction: "up", impact: "strong" }],
        precursor: { probability: 0.42, status: "Not Detected", explanation: "Optical alignment drift within control limits." },
        dataDrift: { detected: true, severity: "Low", explanation: "Slight photoresist chemical variance." },
        failureCluster: { id: "CL-SEMI", label: "Optics Drift", description: "Matches normal wear trajectory." },
        economics: { potentialCost: "$500,000 (Yield)", downtimeCost: "$20,000 / hr" },
        defaultDecision: { action: "Recalibration & Optics Cleaning", why: ["Yield impact risk"], consequences: [{ text: "Wafer Scrap", impact: "High" }] }
    },
    "solar-inverters": {
        id: "solar-inverters",
        title: "Solar Inverter",
        icon: Sun,
        description: "Renewable Convergence Unit",
        location: "Solar Farm West, Arizona",
        digitalIdentity: { age: "3 Years", regime: "Daylight Peak", model: "PV-Conv-v5", lastMaintenance: "6 Months Ago" },
        sensors: [
            { id: "dcVoltage", label: "DC Input Voltage", unit: "V", placeholder: "200-1000", defaultValue: "720" },
            { id: "acCurrent", label: "AC Output Current", unit: "A", placeholder: "0-500", defaultValue: "380" },
            { id: "temp", label: "IGBT Temperature", unit: "°C", placeholder: "30-100", defaultValue: "65" },
            { id: "efficiency", label: "Conversion Efficiency", unit: "%", placeholder: "90-99", defaultValue: "97.5" }
        ],
        cognitiveTimeline: [{ time: "Now", description: "Thermal ripple detected in IGBT bank", type: "warning" }],
        degradationDrivers: [{ factor: "IGBT Temp", direction: "up", impact: "strong" }],
        precursor: { probability: 0.58, status: "Detected", explanation: "High-frequency switching noise suggests imminent capacitor failure." },
        dataDrift: { detected: false, severity: "Low", explanation: "Irradiance matches historical profile." },
        failureCluster: { id: "CL-PV-1", label: "Capacitor Aging", description: "Filter capacitor end-of-life profile." },
        economics: { potentialCost: "$8,000", downtimeCost: "$400 / hr (Lost Gen)" },
        defaultDecision: { action: "Inspect Capacitor Bank & Heat Sink", why: ["Switching efficiency loss"], consequences: [{ text: "Total Inverter Failure", impact: "Moderate" }] }
    },
    "power-generators": {
        id: "power-generators",
        title: "Industrial Generator",
        icon: Activity,
        description: "Backup Power System",
        location: "Facility Site C, Texas",
        digitalIdentity: { age: "5 Years", regime: "Emergency Standby", model: "Gen-Shield-X1", lastMaintenance: "3 Months Ago" },
        sensors: [
            { id: "oilPress", label: "Oil Pressure", unit: "PSI", placeholder: "20-80", defaultValue: "55" },
            { id: "coolantTemp", label: "Coolant Temp", unit: "°C", placeholder: "40-100", defaultValue: "82" },
            { id: "outputPower", label: "Output Power", unit: "kW", placeholder: "0-1000", defaultValue: "850" },
            { id: "freq", label: "Frequency", unit: "Hz", placeholder: "59-61", defaultValue: "60.1" }
        ],
        cognitiveTimeline: [{ time: "Now", description: "Frequency oscillation detected", type: "warning" }],
        degradationDrivers: [{ factor: "Oil Pressure", direction: "down", impact: "moderate" }],
        precursor: { probability: 0.35, status: "Not Detected", explanation: "Engine health baseline stable." },
        dataDrift: { detected: false, severity: "Low", explanation: "Load profile matches history." },
        failureCluster: { id: "CL-GEN", label: "Governor Instability", description: "Occasions of speed hunting." },
        economics: { potentialCost: "$25,000", downtimeCost: "Operation at Risk" },
        defaultDecision: { action: "Governor Tuning & Oil Change", why: ["Speed control drift"], consequences: [{ text: "Power Quality Issue", impact: "High" }] }
    },
    "smart-grid": {
        id: "smart-grid",
        title: "Smart Grid Controller",
        icon: Network,
        description: "Network Stability Node",
        location: "Node 42, San Jose",
        digitalIdentity: { age: "2 Years", regime: "Continuous Balancing", model: "Grid-IQ-v2", lastMaintenance: "1 Month Ago" },
        sensors: [
            { id: "voltage", label: "Bus Voltage", unit: "kV", placeholder: "10-15", defaultValue: "12.4" },
            { id: "thd", label: "Total Harmonic Dist", unit: "%", placeholder: "0-5", defaultValue: "1.2" },
            { id: "temp", label: "Internal Node Temp", unit: "°C", placeholder: "20-80", defaultValue: "42" }
        ],
        cognitiveTimeline: [{ time: "Now", description: "Harmonic peak at 3rd order", type: "inference" }],
        degradationDrivers: [{ factor: "THD", direction: "up", impact: "moderate" }],
        precursor: { probability: 0.25, status: "Not Detected", explanation: "Grid parameters within safety envelope." },
        dataDrift: { detected: true, severity: "Low", explanation: "Inverter-heavy load signature shift." },
        failureCluster: { id: "CL-GRID", label: "Transient Peak", description: "Non-critical harmonic drift." },
        economics: { potentialCost: "Hardware Lifecycle Impact", downtimeCost: "Grid Stability Risk" },
        defaultDecision: { action: "Update Filtering Parameters", why: ["Inverter noise compensation"], consequences: [{ text: "Efficiency Gain", impact: "2%" }] }
    },
    "pumps": {
        id: "pumps",
        title: "Industrial Pump",
        icon: Droplets,
        description: "Fluid Transport System",
        location: "Water Plant, Seattle",
        digitalIdentity: { age: "7 Years", regime: "Constant Flow", model: "Pump-Pro-v3", lastMaintenance: "4 Months Ago" },
        sensors: [
            { id: "suction", label: "Suction Pressure", unit: "PSI", placeholder: "0-100", defaultValue: "15" },
            { id: "discharge", label: "Discharge Pressure", unit: "PSI", placeholder: "50-500", defaultValue: "120" },
            { id: "flow", label: "Flow Rate", unit: "GPM", placeholder: "0-2000", defaultValue: "1450" },
            { id: "vib", label: "Vibration", unit: "mm/s", placeholder: "0-20", defaultValue: "6.2" }
        ],
        cognitiveTimeline: [{ time: "Now", description: "Cavitation signature identified", type: "critical" }],
        degradationDrivers: [{ factor: "Vibration", direction: "up", impact: "strong" }],
        precursor: { probability: 0.92, status: "Detected", explanation: "Acoustic spikes match impeller cavitation pattern." },
        dataDrift: { detected: false, severity: "Low", explanation: "Fluid viscosity within range." },
        failureCluster: { id: "CL-PUMP", label: "Impeller Damage", description: "Consistent with low NPSH events." },
        economics: { potentialCost: "$12,000", downtimeCost: "$2,500 / hr" },
        defaultDecision: { action: "Check Suction Line & Inspect Impeller", why: ["Cavitation levels > threshold"], consequences: [{ text: "Total Pump Seizure", impact: "Critical" }] }
    },
    "industrial-robots": {
        id: "industrial-robots",
        title: "Industrial Robot",
        icon: Bot,
        description: "Automation Arm",
        location: "Line 2, Gigafactory",
        digitalIdentity: { age: "3 Years", regime: "High Precision Pathing", model: "Bot-Arm-XG", lastMaintenance: "2 Weeks Ago" },
        sensors: [
            { id: "joint1Temp", label: "Joint 1 Temp", unit: "°C", placeholder: "20-90", defaultValue: "55" },
            { id: "torque", label: "Motor Torque", unit: "Nm", placeholder: "0-100", defaultValue: "42" },
            { id: "error", label: "Positional Error", unit: "mm", placeholder: "0-2", defaultValue: "0.05" }
        ],
        cognitiveTimeline: [{ time: "Now", description: "Torque deviation on Joint 3", type: "warning" }],
        degradationDrivers: [{ factor: "Positional Error", direction: "up", impact: "moderate" }],
        precursor: { probability: 0.65, status: "Detected", explanation: "Joint friction tracking gearbox wear profile." },
        dataDrift: { detected: false, severity: "Low", explanation: "Payload weight stable." },
        failureCluster: { id: "CL-BOT", label: "Joint Friction", description: "Belt tension or lubrication issue." },
        economics: { potentialCost: "$18,000", downtimeCost: "$15,000 / hr (Line Stop)" },
        defaultDecision: { action: "Joint Lubrication & Re-calibration", why: ["Torque spike in Link 3"], consequences: [{ text: "Production Outage", impact: "High" }] }
    },
    "vehicle-engines": {
        id: "vehicle-engines",
        title: "Fleet Vehicle Engine",
        icon: Car,
        description: "Internal Combustion Unit",
        location: "Logistics Hub, Denver",
        digitalIdentity: { age: "4 Years", regime: "Stop-and-Go", model: "Engine-IC-v4", lastMaintenance: "5,000 Miles Ago" },
        sensors: [
            { id: "rpm", label: "RPM", unit: "rpm", placeholder: "600-6000", defaultValue: "2200" },
            { id: "oilTemp", label: "Oil Temperature", unit: "°C", placeholder: "60-120", defaultValue: "95" },
            { id: "fuelPress", label: "Fuel Pressure", unit: "PSI", placeholder: "30-80", defaultValue: "45" }
        ],
        cognitiveTimeline: [{ time: "Now", description: "Fuel trim deviation detected", type: "inference" }],
        degradationDrivers: [{ factor: "Oil Temp", direction: "up", impact: "moderate" }],
        precursor: { probability: 0.42, status: "Not Detected", explanation: "Spark-ignition cycle stable." },
        dataDrift: { detected: false, severity: "Low", explanation: "Idle duration consistent." },
        failureCluster: { id: "CL-ENG", label: "Injectors Aging", description: "Slight fuel-air ratio drift." },
        economics: { potentialCost: "$4,500", downtimeCost: "Fleet Availability Loss" },
        defaultDecision: { action: "Fuel Injector Cleaning & Oil Analysis", why: ["Long-term fuel trim > 10%"], consequences: [{ text: "Emissions Failure", impact: "Likely" }] }
    },
    "ev-batteries": {
        id: "ev-batteries",
        title: "EV Battery Pack",
        icon: Battery,
        description: "Energy Storage System",
        location: "Fleet Unit 808",
        digitalIdentity: { age: "2 Years", regime: "Rapid Charging", model: "Li-Cell-Gen3", lastMaintenance: "Daily Telemetry" },
        sensors: [
            { id: "soh", label: "State of Health", unit: "%", placeholder: "0-100", defaultValue: "94" },
            { id: "voltsMax", label: "Cell Voltage Max", unit: "V", placeholder: "3.2-4.2", defaultValue: "4.15" },
            { id: "packTemp", label: "Pack Temperature", unit: "°C", placeholder: "10-60", defaultValue: "35" }
        ],
        cognitiveTimeline: [{ time: "Now", description: "Charge cycle resistance increased", type: "warning" }],
        degradationDrivers: [{ factor: "Pack Temp", direction: "up", impact: "strong" }],
        precursor: { probability: 0.68, status: "Detected", explanation: "Dendrite growth signature detected via impedance spectroscopy." },
        dataDrift: { detected: false, severity: "Low", explanation: "Climate effects within bounds." },
        failureCluster: { id: "CL-BATT", label: "Capacity Fade", description: "Internal resistance rise profile." },
        economics: { potentialCost: "$12,000", downtimeCost: "Critical Failure Risk" },
        defaultDecision: { action: "Limit Fast Charge & Coolant Check", why: ["Resistance rise in Module 4"], consequences: [{ text: "Range Reduction", impact: "Significant" }] }
    },
    "jet-engines": {
        id: "jet-engines",
        title: "Jet Engine (Turbofan)",
        icon: Plane,
        description: "Main Propulsion Unit",
        location: "System ID: N142-FE",
        digitalIdentity: { age: "12 Years", regime: "Transcontinental", model: "GE-Next-X", lastMaintenance: "200 Flight Hours Ago" },
        sensors: [
            { id: "egt", label: "Exhaust Gas Temp", unit: "°C", placeholder: "400-950", defaultValue: "620" },
            { id: "n1", label: "Fan Speed (N1)", unit: "%", placeholder: "0-110", defaultValue: "88" },
            { id: "oilPress", label: "Oil Pressure", unit: "PSI", placeholder: "10-100", defaultValue: "45" },
            { id: "fuelFlow", label: "Fuel Flow", unit: "lb/hr", placeholder: "500-10000", defaultValue: "4200" }
        ],
        cognitiveTimeline: [{ time: "Now", description: "EGT Margin reduced", type: "warning" }],
        degradationDrivers: [{ factor: "EGT", direction: "up", impact: "strong" }],
        precursor: { probability: 0.72, status: "Detected", explanation: "Blade erosion spectral shift detected during takeoff power." },
        dataDrift: { detected: false, severity: "Low", explanation: "Ambient altitude data normalized." },
        failureCluster: { id: "CL-JET", label: "Turbine Blade Wear", description: "Consistent with thermal fatigue." },
        economics: { potentialCost: "$2.5M (Overhaul)", downtimeCost: "AOG (Aircraft on Ground)" },
        defaultDecision: { action: "Borescope Inspection & Blade Wash", why: ["EGT margin < threshold"], consequences: [{ text: "Engine Surge Risk", impact: "Moderate" }] }
    },
    "traction-motors": {
        id: "traction-motors",
        title: "Railway Traction Motor",
        icon: Train,
        description: "Locomotive Propulsion Driver",
        location: "Unit 342, EuroRail",
        digitalIdentity: { age: "8 Years", regime: "Mountainous Haul", model: "Rail-Drive-v4", lastMaintenance: "6 Months Ago" },
        sensors: [
            { id: "windingTemp", label: "Winding Temp", unit: "°C", placeholder: "20-180", defaultValue: "115" },
            { id: "current", label: "Phase Current", unit: "A", placeholder: "0-1200", defaultValue: "850" },
            { id: "bearingTemp", label: "Bearing Temp", unit: "°C", placeholder: "20-120", defaultValue: "72" }
        ],
        cognitiveTimeline: [{ time: "Now", description: "Flashover precursor detected", type: "warning" }],
        degradationDrivers: [{ factor: "Winding Temp", direction: "up", impact: "strong" }],
        precursor: { probability: 0.81, status: "Detected", explanation: "Current leakage spikes correlate with insulation moisture ingress." },
        dataDrift: { detected: false, severity: "Low", explanation: "Track profile stable." },
        failureCluster: { id: "CL-RAIL", label: "Insulation Leakage", description: "Matches high-humidity run failure." },
        economics: { potentialCost: "$45,000", downtimeCost: "Track Blocking Event" },
        defaultDecision: { action: "Clean Commutator & Blowout Dust", why: ["Leakage current > 5mA"], consequences: [{ text: "Motor Flashover", impact: "High" }] }
    },
    "ventilators": {
        id: "ventilators",
        title: "Medical Ventilator",
        icon: Stethoscope,
        description: "Life-Support System",
        location: "Bed 4, ICU West",
        digitalIdentity: { age: "3 Years", regime: "Continuous Care", model: "Life-Breathe-9", lastMaintenance: "1 Month Ago" },
        sensors: [
            { id: "tidalVol", label: "Tidal Volume", unit: "mL", placeholder: "200-800", defaultValue: "450" },
            { id: "peakPress", label: "Peak Airway Press", unit: "cmH2O", placeholder: "10-40", defaultValue: "28" },
            { id: "o2Conc", label: "O2 Concentration", unit: "%", placeholder: "21-100", defaultValue: "40" }
        ],
        cognitiveTimeline: [{ time: "Now", description: "Valve timing drift detected", type: "warning" }],
        degradationDrivers: [{ factor: "Peak Airway Press", direction: "up", impact: "moderate" }],
        precursor: { probability: 0.48, status: "Not Detected", explanation: "Patient compliance stable, monitoring mechanical drift." },
        dataDrift: { detected: false, severity: "Low", explanation: "Gas supply pressure stable." },
        failureCluster: { id: "CL-VENT", label: "Exhalation Valve Wear", description: "Mechanical timing offset profile." },
        economics: { potentialCost: "Hardware Lifecycle", downtimeCost: "Critical Care Availability" },
        defaultDecision: { action: "Calibrate Sensors & Inspect Valve", why: ["Flow sensor drift identified"], consequences: [{ text: "Asynchronous Ventilation", impact: "Moderate" }] }
    },
    "cooling-systems": {
        id: "cooling-systems",
        title: "Data Center Cooling Unit",
        icon: Fan,
        description: "Chilled Water Loop",
        location: "Floor 2, Rack 10-15",
        digitalIdentity: { age: "5 Years", regime: "Peak PUE Target", model: "Cool-Flow-v9", lastMaintenance: "2 Months Ago" },
        sensors: [
            { id: "fanVib", label: "Fan Vibration", unit: "Hz", placeholder: "0-60", defaultValue: "12" },
            { id: "inletTemp", label: "Inlet Chilled Water", unit: "°C", placeholder: "5-20", defaultValue: "7.2" },
            { id: "outletTemp", label: "Outlet Temp", unit: "°C", placeholder: "10-30", defaultValue: "14.5" }
        ],
        cognitiveTimeline: [{ time: "Now", description: "Delta-T efficiency drop", type: "warning" }],
        degradationDrivers: [{ factor: "Inlet Temp", direction: "up", impact: "moderate" }],
        precursor: { probability: 0.54, status: "Detected", explanation: "Thermal transfer curve suggests sediment build-up in heat exchanger." },
        dataDrift: { detected: false, severity: "Low", explanation: "Server heat load consistent." },
        failureCluster: { id: "CL-COOL", label: "Scale Accumulation", description: "Typical mineral deposit profile." },
        economics: { potentialCost: "$5,000", downtimeCost: "PUE Penalty / HW Risk" },
        defaultDecision: { action: "Chemical Flush & Fan Balancing", why: ["Coefficient of performance < 3.2"], consequences: [{ text: "Server Hotspot Risk", impact: "High" }] }
    },
    "drilling-equipment": {
        id: "drilling-equipment",
        title: "Offshore Drilling Rig",
        icon: Drill,
        description: "Heavy Extraction Unit",
        location: "Deepwater Horizon Site 2",
        digitalIdentity: { age: "14 Years", regime: "Deep-Sea Rock", model: "Drill-Max-Pro", lastMaintenance: "6 Months Ago" },
        sensors: [
            { id: "wob", label: "Weight on Bit", unit: "klb", placeholder: "0-100", defaultValue: "45" },
            { id: "torque", label: "Drill Torque", unit: "kNm", placeholder: "0-50", defaultValue: "28" },
            { id: "rop", label: "Rate of Penetration", unit: "ft/hr", placeholder: "0-200", defaultValue: "65" },
            { id: "pumpPress", label: "Mud Pump Pressure", unit: "PSI", placeholder: "0-5000", defaultValue: "3200" }
        ],
        cognitiveTimeline: [{ time: "Now", description: "Drill string vibration peak", type: "critical" }],
        degradationDrivers: [{ factor: "ROP", direction: "down", impact: "strong" }],
        precursor: { probability: 0.88, status: "Detected", explanation: "Torsional resonance pattern matches bit-balling or severe tooth wear." },
        dataDrift: { detected: false, severity: "Low", explanation: "Rock hardness data within history." },
        failureCluster: { id: "CL-DRILL", label: "Bit Failure", description: "Mechanical tooth breakage signature." },
        economics: { potentialCost: "$150,000 (Trip Time)", downtimeCost: "$12,000 / hr" },
        defaultDecision: { action: "Pull Out of Hole (POOH) & Replace Bit", why: ["Torque spikes > 2 std dev"], consequences: [{ text: "Twist-Off Risk", impact: "Critical" }] }
    }
};

// Start logic for systems not explicitly in nav but required by manifest
// Ensure navigation/routing handles these if they are selectable
