"use client";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Wind, Zap, Cog, Building2, Server, Activity, Cpu, Gauge,
  Sun, Network, Droplets, Bot, Car, Battery, Plane, Train,
  Stethoscope, Fan, Drill, Microscope, Radio, Binary, Timer, Laptop
} from "lucide-react";
import { CardStack, CardStackItem } from "@/components/ui/card-stack";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";

export const systemDomains = [
  {
    slug: "wind-turbines",
    title: "Wind Turbines",
    icon: Wind,
    failures: "Gearbox bearing wear, blade pitch faults",
    color: "text-cyan",
    bgColor: "bg-cyan/10",
  },
  {
    slug: "power-transformers",
    title: "Power Transformers",
    icon: Zap,
    failures: "Insulation breakdown, oil degradation",
    color: "text-amber",
    bgColor: "bg-amber/10",
  },
  {
    slug: "industrial-motors",
    title: "Industrial Motors",
    icon: Cog,
    failures: "Rotor imbalance, bearing damage",
    color: "text-purple",
    bgColor: "bg-purple/10",
  },
  {
    slug: "bridges",
    title: "Bridges",
    icon: Building2,
    failures: "Structural fatigue, cable tension",
    color: "text-emerald",
    bgColor: "bg-emerald/10",
  },
  {
    slug: "servers",
    title: "Servers",
    icon: Server,
    failures: "Thermal throttling, disk failures",
    color: "text-critical",
    bgColor: "bg-critical/10",
  },
  {
    slug: "laptops",
    title: "Laptops",
    icon: Laptop,
    failures: "Overheating, battery degradation",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    slug: "icu-monitoring",
    title: "ICU Monitoring",
    icon: Activity,
    failures: "Sensor drift, calibration errors",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    slug: "cnc-machines",
    title: "CNC Machines",
    icon: Cpu,
    failures: "Tool wear, spindle vibration",
    color: "text-cyan",
    bgColor: "bg-cyan/10",
  },
  {
    slug: "hvac-systems",
    title: "HVAC Systems",
    icon: Gauge,
    failures: "Compressor issues, refrigerant leaks",
    color: "text-amber",
    bgColor: "bg-amber/10",
  },
  {
    slug: "solar-inverters",
    title: "Solar Inverters",
    icon: Sun,
    failures: "Power electronics degradation",
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
  },
  {
    slug: "power-generators",
    title: "Power Generators",
    icon: Activity,
    failures: "Bearing wear, cooling failure",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
  },
  {
    slug: "smart-grid",
    title: "Smart Grid Equipment",
    icon: Network,
    failures: "Voltage regulators, circuit breakers",
    color: "text-indigo-400",
    bgColor: "bg-indigo-400/10",
  },
  {
    slug: "pumps",
    title: "Industrial Pumps",
    icon: Droplets,
    failures: "Cavitation, seal failure",
    color: "text-sky-400",
    bgColor: "bg-sky-400/10",
  },
  {
    slug: "industrial-robots",
    title: "Industrial Robots",
    icon: Bot,
    failures: "Joint motor failure",
    color: "text-rose-400",
    bgColor: "bg-rose-400/10",
  },
  {
    slug: "vehicle-engines",
    title: "Vehicle Engines",
    icon: Car,
    failures: "Fuel system faults",
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
  },
  {
    slug: "ev-batteries",
    title: "EV Batteries",
    icon: Battery,
    failures: "Capacity degradation",
    color: "text-lime-400",
    bgColor: "bg-lime-400/10",
  },
  {
    slug: "jet-engines",
    title: "Jet Engines",
    icon: Plane,
    failures: "Turbine blade fatigue",
    color: "text-zinc-300",
    bgColor: "bg-zinc-300/10",
  },
  {
    slug: "traction-motors",
    title: "Traction Motors",
    icon: Train,
    failures: "Electrical faults, bearings",
    color: "text-red-400",
    bgColor: "bg-red-400/10",
  },
  {
    slug: "ventilators",
    title: "Ventilators",
    icon: Stethoscope,
    failures: "Component failure",
    color: "text-teal-400",
    bgColor: "bg-teal-400/10",
  },
  {
    slug: "cooling-systems",
    title: "Cooling Systems",
    icon: Fan,
    failures: "Fan failure, thermal load",
    color: "text-blue-300",
    bgColor: "bg-blue-300/10",
  },
  {
    slug: "drilling-equipment",
    title: "Drilling Equipment",
    icon: Drill,
    failures: "Bit wear, hydraulic loss",
    color: "text-stone-400",
    bgColor: "bg-stone-400/10",
  },
  {
    slug: "lithography",
    title: "Lithography Machines",
    icon: Microscope,
    failures: "Optical drift",
    color: "text-violet-400",
    bgColor: "bg-violet-400/10",
  },
];

// CardStack items with Unsplash images for each system
export const systemCards: CardStackItem[] = [
  {
    id: "wind-turbines",
    title: "Wind Turbines",
    description: "Predict gearbox bearing wear, blade pitch faults, and generator issues before they cause downtime.",
    imageSrc: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=800&auto=format&fit=crop",
    href: "/system/wind-turbines",
  },
  {
    id: "power-transformers",
    title: "Power Transformers",
    description: "Monitor insulation breakdown, oil degradation, and thermal anomalies in real-time.",
    imageSrc: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&auto=format&fit=crop",
    href: "/system/power-transformers",
  },
  {
    id: "industrial-motors",
    title: "Industrial Motors",
    description: "Detect rotor imbalance, bearing damage, and electrical faults with precision.",
    imageSrc: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&auto=format&fit=crop",
    href: "/system/industrial-motors",
  },
  {
    id: "bridges",
    title: "Bridges & Structures",
    description: "Track structural fatigue, cable tension, and displacement for infrastructure safety.",
    imageSrc: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&auto=format&fit=crop",
    href: "/system/bridges",
  },
  {
    id: "servers",
    title: "Server Infrastructure",
    description: "Prevent thermal throttling, disk failures, and performance degradation.",
    imageSrc: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop",
    href: "/system/servers",
  },
  {
    id: "laptops",
    title: "Laptop Fleet",
    description: "Monitor battery health, thermal risk, and performance degradation.",
    imageSrc: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop",
    href: "/system/laptops",
  },
  {
    id: "icu-monitoring",
    title: "ICU & Medical Equipment",
    description: "Monitor sensor drift and calibration errors in critical healthcare systems.",
    imageSrc: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop",
    href: "/system/icu-monitoring",
  },
  {
    id: "cnc-machines",
    title: "CNC Machines",
    description: "Predict tool wear, spindle vibration, and machining accuracy issues.",
    imageSrc: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&auto=format&fit=crop",
    href: "/system/cnc-machines",
  },
  {
    id: "hvac-systems",
    title: "HVAC Systems",
    description: "Detect compressor issues, refrigerant leaks, and efficiency degradation.",
    imageSrc: "https://i.postimg.cc/52mt1K7Y/photo-1665826254140-28fa3d8738a1.jpg",
    href: "/system/hvac-systems",
  },
  {
    id: "solar-inverters",
    title: "Solar Inverters",
    description: "Monitor power electronics degradation and thermal stress in renewable energy systems.",
    imageSrc: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&auto=format&fit=crop",
    href: "/system/solar-inverters",
  },
  {
    id: "power-generators",
    title: "Power Generators",
    description: "Predict bearing wear and cooling failures in industrial power generation units.",
    imageSrc: "https://i.postimg.cc/wMttj5yT/CM20230718-bac6c-51ce1.jpg",
    href: "/system/power-generators",
  },
  {
    id: "smart-grid",
    title: "Smart Grid Equipment",
    description: "Analyze voltage regulators and circuit breakers for grid stability and failure prevention.",
    imageSrc: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&auto=format&fit=crop",
    href: "/system/smart-grid",
  },
  {
    id: "pumps",
    title: "Industrial Pumps & Compressors",
    description: "Detect cavitation, seal failures, and pressure leakages in fluid transport systems.",
    imageSrc: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&auto=format&fit=crop",
    href: "/system/pumps",
  },
  {
    id: "industrial-robots",
    title: "Industrial Robots",
    description: "Monitor joint motor health and mechanical wear in precision automation.",
    imageSrc: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&auto=format&fit=crop",
    href: "/system/industrial-robots",
  },
  {
    id: "vehicle-engines",
    title: "Vehicle Engines & Braking",
    description: "Predict fuel system faults and hydraulic loss in automotive fleets.",
    imageSrc: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&auto=format&fit=crop",
    href: "/system/vehicle-engines",
  },
  {
    id: "ev-batteries",
    title: "Electric Vehicle Batteries",
    description: "Monitor capacity degradation and thermal runaway risks in EV storage systems.",
    imageSrc: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&auto=format&fit=crop",
    href: "/system/ev-batteries",
  },
  {
    id: "jet-engines",
    title: "Jet Engines & Avionics",
    description: "Predict turbine blade fatigue and electronics overheating in aerospace systems.",
    imageSrc: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&auto=format&fit=crop",
    href: "/system/jet-engines",
  },
  {
    id: "traction-motors",
    title: "Railway Traction & Bearings",
    description: "Detect electrical faults and overheating in high-speed rail motors and bearings.",
    imageSrc: "https://images.unsplash.com/photo-1532105956626-9569c03602f6?w=800&auto=format&fit=crop",
    href: "/system/traction-motors",
  },
  {
    id: "ventilators",
    title: "Life-Critical Medical Devices",
    description: "Monitor component failures in ventilators and dialysis machines for patient safety.",
    imageSrc: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop",
    href: "/system/ventilators",
  },
  {
    id: "cooling-systems",
    title: "Data Center Cooling & UPS",
    description: "Predict fan failures and battery capacity loss in mission-critical IT infrastructure.",
    imageSrc: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop",
    href: "/system/cooling-systems",
  },
  {
    id: "drilling-equipment",
    title: "Oil & Gas Drilling & Pipelines",
    description: "Monitor bit wear and pipeline leakage risk in harsh extraction environments.",
    imageSrc: "https://images.unsplash.com/photo-1516199423456-1f1e91b06f25?w=800&auto=format&fit=crop",
    href: "/system/drilling-equipment",
  },
  {
    id: "lithography",
    title: "Semiconductor Lithography",
    description: "Predict optical drift and gas flow instability in high-precision chip fabrication.",
    imageSrc: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop",
    href: "/system/lithography",
  },
];

export function SystemsSection() {
  const [activeCard, setActiveCard] = useState<CardStackItem>(systemCards[0]);
  const navigate = useNavigate();

  const handleCardChange = (_index: number, item: CardStackItem) => {
    setActiveCard(item);
  };

  return (
    <HeroGeometric
      title1="Precision Monitoring"
      title2="Predictive Systems"
    >

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* CardStack for systems */}
        <CardStack
          items={systemCards}
          initialIndex={0}
          autoAdvance
          intervalMs={2000}
          pauseOnHover
          showDots
          cardWidth={420}
          cardHeight={280}
          onChangeIndex={handleCardChange}
        />

        {/* Predict Button */}
        <div className="mt-24 mb-32 flex justify-center">
          <button
            onClick={() => activeCard.href && navigate(activeCard.href)}
            className="group relative px-10 py-4 rounded-full bg-primary text-white font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(157,78,221,0.6)] active:scale-95 overflow-hidden"
          >
            <span className="relative z-10">Predict in {activeCard.title}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>
        </div>
      </div>
    </HeroGeometric>
  );
}
