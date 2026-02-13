import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export function HeroSection() {
  const [showCta, setShowCta] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowCta(window.scrollY > 50);
    };

    const timer = setTimeout(() => setShowCta(true), 3000);
    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToExplore = () => {
    document.querySelector("#section-features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1
          id="hero-title"
          className="text-[40px] md:text-[68px] font-bold tracking-tight leading-tight"
        >
          <span className="text-foreground">Forsee</span>{" "}
          <span className="text-primary">AI</span>
        </h1>
        <h2
          id="hero-subtitle"
          className="text-xl md:text-3xl font-light mt-4"
        >
          <span className="text-muted-foreground">The </span>
          <span className="text-purple">Predictor</span>
        </h2>

        {/* Subtle microcopy */}
        <p className="text-sm text-muted-foreground/70 mt-6 max-w-md mx-auto font-mono">
          No labels, no training required — start with your <span className="text-primary">sensor values</span>.
        </p>

        {/* CTA - appears on scroll or after delay */}
        <div
          className={`mt-12 transition-all duration-500 ${showCta ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
        >
          <button
            id="cta-explore"
            onClick={scrollToExplore}
            className="cta-pill"
          >
            Explore Systems
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToExplore}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors animate-bounce-slow"
        aria-label="Scroll to learn more"
      >
        <ChevronDown className="h-8 w-8" />
      </button>
    </section>
  );
}
