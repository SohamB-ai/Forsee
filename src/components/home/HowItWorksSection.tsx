import { useEffect, useRef, useState } from "react";
import { Database, Cpu, TrendingUp, Wrench, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Database,
    title: "Data",
    description: "Sensor readings from your equipment",
    color: "text-cyan",
    bgColor: "bg-cyan/10",
  },
  {
    icon: Cpu,
    title: "Detection Ensemble",
    description: "Multi-model analysis for robust predictions",
    color: "text-purple",
    bgColor: "bg-purple/10",
  },
  {
    icon: TrendingUp,
    title: "Risk Trajectory",
    description: "Track health degradation over time",
    color: "text-amber",
    bgColor: "bg-amber/10",
  },
  {
    icon: Wrench,
    title: "Action",
    description: "Clear maintenance recommendations",
    color: "text-emerald",
    bgColor: "bg-emerald/10",
  },
];

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="section-how"
      ref={sectionRef}
      className={`py-24 px-6 bg-transparent transition-all duration-700 pointer-events-none ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
    >
      <div className="max-w-6xl mx-auto pointer-events-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-foreground">How it </span>
            <span className="text-purple">works</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From <span className="text-cyan">raw sensor data</span> to <span className="text-emerald">actionable insights</span> in seconds
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="flex items-center">
                <div
                  className={`flex flex-col items-center p-6 transition-all duration-500`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className={`w-16 h-16 rounded-2xl ${step.bgColor} border border-border flex items-center justify-center mb-4 shadow-sm`}>
                    <Icon className={`h-8 w-8 ${step.color}`} />
                  </div>
                  <h3 className={`text-lg font-semibold mb-1 ${step.color}`}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground text-center max-w-[150px]">
                    {step.description}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <ArrowRight className="hidden md:block h-6 w-6 text-muted-foreground/50 mx-2 flex-shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
