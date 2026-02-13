import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function FooterCTA() {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-6 bg-transparent pointer-events-none">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          <span className="text-foreground">Ready to </span>
          <span className="text-primary">predict</span>
          <span className="text-foreground"> the future?</span>
        </h2>
        <p className="text-lg text-muted-foreground mb-10">
          Start monitoring your <span className="text-cyan">equipment health</span> and prevent failures before they happen.
        </p>
        <button
          id="cta-start"
          onClick={() => navigate("/systems")}
          className="cta-pill inline-flex items-center gap-2 pointer-events-auto"
        >
          Start Monitoring
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
