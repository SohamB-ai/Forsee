import { useEffect, useRef, useState } from "react";
import { AlertTriangle, Clock, Search } from "lucide-react";

const features = [
  {
    icon: AlertTriangle,
    title: "Predicts near-failures",
    description: "Detect anomalies before they become critical issues",
    color: "text-critical",
    bgColor: "bg-critical/10",
  },
  {
    icon: Clock,
    title: "Gives lead time",
    description: "Know exactly how much time you have to act",
    color: "text-amber",
    bgColor: "bg-amber/10",
  },
  {
    icon: Search,
    title: "Explains root cause",
    description: "Understand which sensors contribute most to risk",
    color: "text-emerald",
    bgColor: "bg-emerald/10",
  },
];

export function FeaturesSection() {
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
      id="section-features"
      ref={sectionRef}
      className={`py-24 px-6 bg-transparent transition-all duration-700 pointer-events-none ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-foreground">What it </span>
            <span className="text-primary">does</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Forsee AI analyzes <span className="text-cyan">real-time sensor data</span> to predict equipment failures
            and optimize maintenance schedules.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`text-center p-6 rounded-2xl bg-card border border-border transition-all duration-500 hover:border-primary/30 hover:shadow-lg pointer-events-auto`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${feature.bgColor} ${feature.color} mb-6`}>
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
