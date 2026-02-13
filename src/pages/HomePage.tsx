import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { FooterCTA } from "@/components/home/FooterCTA";
import { TypingText } from "@/components/ui/TypingText";
import { TextGradientScroll } from "@/components/ui/text-gradient-scroll";
import React, { useRef, useEffect } from "react";
import { useInView, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Timeline } from "@/components/ui/timeline";
import { FeaturesSectionWithHoverEffects } from "@/components/ui/feature-section-with-hover-effects";
import ExpandOnHover from "@/components/ui/expand-cards";
import { renderCanvas, cleanupCanvas, ShineBorder } from "@/components/ui/hero-designali";
import { useLenis } from 'lenis/react'
import { TextScramble } from "@/components/ui/text-scramble";
import DisplayCards from "@/components/ui/display-cards";
import {
  AlertTriangle,
  Clock,
  Search,
  Zap,
  ShieldCheck,
  BarChart3,
  Layers,
  Settings,
  Database,
  Cpu,
  TrendingUp,
  Wrench,
  ArrowRight,
  History,
  Eye,
  Activity,
  FileText,
  FlaskConical,
  Globe,
  Lock,
  Shield,
  Terminal,
  Server,
  Database as DatabaseIcon,
  Monitor,
  Layout
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";




export default function HomePage() {
  const timelineData = [
    {
      title: "Problem",
      content: (
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight text-foreground">
              Industrial Failures Don’t Happen Suddenly.<br />
              <span className="text-[#9d4edd]">Traditional Systems React Too Late.</span>
            </h2>
            <p className="text-xl text-black dark:text-muted-foreground max-w-2xl font-medium">
              Every year, critical industries lose billions due to unexpected equipment failures.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Power plants trip", icon: Zap },
              { label: "Factories halt", icon: Settings },
              { label: "Rail systems fail", icon: Layers },
              { label: "Medical equipment offline", icon: Activity },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center p-4 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-center space-y-3">
                <item.icon className="size-8 text-[#9d4edd]" />
                <span className="text-sm font-bold text-zinc-900 dark:text-white">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <p className="text-lg font-bold text-zinc-900 dark:text-foreground/80">Most maintenance systems still rely on:</p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: "Reactive breakdown response", desc: "Fixing only after failure" },
                { title: "Fixed maintenance schedules", desc: "Inflexible time-based checks" },
                { title: "Static threshold alerts", desc: "Simple upper/lower limits" },
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20 space-y-2">
                  <h4 className="font-bold text-red-600 dark:text-red-400">{item.title}</h4>
                  <p className="text-sm text-black dark:text-muted-foreground font-semibold">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-2xl italic font-playfair border-l-4 border-[#9d4edd] pl-6 py-2 text-zinc-900 dark:text-foreground/90 font-bold">
            These systems do not understand degradation, <br />
            they only react after damage has already started.
          </p>
        </div>
      )
    },
    {
      title: "Solution",
      content: (
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight text-foreground">
              Predict Failures Before They Happen.<br />
              <span className="text-[#9d4edd]">Not After They Cost You.</span>
            </h2>
            <div className="space-y-4 text-xl text-black dark:text-muted-foreground leading-relaxed font-semibold">
              <p>
                <span className="text-zinc-950 dark:text-white font-black">Forsee Intelligence Software</span> is an AI-powered Predictive Intelligence System for industrial assets.
              </p>
              <p>
                It continuously ingests machine data, detects early degradation signals, predicts remaining useful life, simulates future scenarios, and recommends optimal maintenance actions — <span className="text-zinc-950 dark:text-white font-black">before failure occurs.</span>
              </p>
            </div>
            <div className="flex flex-col gap-2 pt-4">
              <span className="text-2xl font-black text-black dark:text-white uppercase tracking-tighter">This is machine intelligence for machines.</span>
            </div>
          </div>

          <div className="space-y-10">
            <h3 className="text-2xl font-black uppercase tracking-widest text-[#9d4edd]">What Makes Forsee Different</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "🧠 Intelligence, Not Thresholds",
                  desc: "We detect precursors — subtle degradation patterns invisible to rule-based systems."
                },
                {
                  title: "⏳ Time-Aware Predictions",
                  desc: "Our models understand how machines degrade over time, not just at a moment."
                },
                {
                  title: "🔍 Explainable & Trustworthy",
                  desc: "Every prediction is backed by contributing sensors, confidence, and reasoning."
                },
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 shadow-sm dark:shadow-none space-y-4 transition-all hover:border-[#9d4edd]/30">
                  <h4 className="text-xl font-bold text-zinc-900 dark:text-white">{item.title}</h4>
                  <p className="text-black dark:text-muted-foreground font-bold">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Capabilities",
      content: (
        <div className="max-w-7xl mx-auto">
          <FeaturesSectionWithHoverEffects />
        </div>
      )
    },
    {
      title: "How it works",
      content: (
        <div className="max-w-5xl mx-auto space-y-20">
          {/* Flowchart Section */}
          <div className="space-y-12">
            <h2 className="text-4xl font-bold text-center text-foreground">How Forsee Intelligence Works</h2>

            <div className="relative">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">
                {[
                  "Sensor Data",
                  "Input Validation & Normalization",
                  "Sliding Window Feature Engineering",
                  "AI Model Inference",
                  "Risk & Health Computation",
                  "Simulation Engine",
                  "Maintenance Recommendations"
                ].map((step, i, arr) => (
                  <React.Fragment key={i}>
                    <div className="flex-1 w-full md:w-auto p-4 rounded-xl bg-[#9d4edd]/10 dark:bg-[#9d4edd]/10 border border-[#9d4edd]/30 flex items-center justify-center text-center text-sm font-bold text-zinc-950 dark:text-white/90 shadow-sm">
                      {step}
                    </div>
                    {i < arr.length - 1 && (
                      <ArrowRight className="size-5 text-[#9d4edd]/50 md:rotate-0 rotate-90" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="text-center space-y-4">
              <p className="text-lg font-mono text-[#9d4edd] font-black">INPUT → PROCESSING → OUTPUT → SIMULATION → RECOMMENDATION</p>
              <div className="flex justify-center gap-8 text-sm text-black dark:text-muted-foreground">
                <span className="flex items-center gap-2 font-black uppercase tracking-tight"><ShieldCheck className="size-4" /> Consistent</span>
                <span className="flex items-center gap-2 font-black uppercase tracking-tight"><Eye className="size-4" /> Auditable</span>
                <span className="flex items-center gap-2 font-black uppercase tracking-tight"><FileText className="size-4" /> Explainable</span>
              </div>
            </div>
          </div>

          {/* AI Models Table */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-foreground">Models Built for Industrial Reality</h3>
            <div className="rounded-xl border border-zinc-200 dark:border-white/10 overflow-hidden bg-zinc-50 dark:bg-white/5 shadow-inner">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-zinc-300 dark:border-white/10">
                    <TableHead className="text-black dark:text-white font-black uppercase tracking-tighter">Task</TableHead>
                    <TableHead className="text-black dark:text-white font-black uppercase tracking-tighter">Problem Type</TableHead>
                    <TableHead className="text-black dark:text-white font-black uppercase tracking-tighter">Model Used</TableHead>
                    <TableHead className="text-black dark:text-white font-black uppercase tracking-tighter">Why</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { task: "Predict RUL", type: "Regression", model: "LSTM", why: "Learns temporal degradation patterns" },
                    { task: "Detect Precursors", type: "Classification", model: "Random Forest", why: "Robust, explainable, handles imbalance" },
                    { task: "Group Failures", type: "Clustering", model: "K-Means", why: "Discovers similar degradation behavior" },
                    { task: "Track Drift", type: "Monitoring", model: "KS-Test", why: "Detects data distribution shift" },
                  ].map((row, i) => (
                    <TableRow key={i} className="hover:bg-zinc-100 dark:hover:bg-white/5 border-zinc-200 dark:border-white/10">
                      <TableCell className="font-bold text-zinc-950 dark:text-white">{row.task}</TableCell>
                      <TableCell className="text-black dark:text-muted-foreground font-bold">{row.type}</TableCell>
                      <TableCell className="text-[#9d4edd] font-mono font-black">{row.model}</TableCell>
                      <TableCell className="text-sm text-black dark:text-muted-foreground font-bold">{row.why}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Feature Engineering & Datasets */}
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">Physics-Inspired Features</h3>
              <p className="text-black dark:text-muted-foreground font-black uppercase tracking-tighter">Our models don’t rely on raw sensor values alone. We extract:</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Rolling Mean", "Standard Deviation", "Slope", "Rate of Change", "Degradation Index"
                ].map((f, i) => (
                  <div key={i} className="px-3 py-2 rounded-lg bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-sm font-mono text-cyan-700 dark:text-cyan-400 font-bold">
                    {f}
                  </div>
                ))}
              </div>
              <p className="text-sm italic text-black dark:text-muted-foreground font-bold">This allows AI to reason like an engineer — not just a statistician.</p>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-zinc-950 dark:text-white">Trained on Real-World Data</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "NASA CMAPSS", "AI4I 2020", "SCANIA Comp X", "MetroPT", "MIMII Acoustic", "PHM Repository"
                ].map((d, i) => (
                  <div key={i} className="p-3 rounded-lg border border-zinc-200 dark:border-white/10 flex items-center gap-3 bg-zinc-50 dark:bg-white/5 shadow-sm">
                    <DatabaseIcon className="size-4 text-[#9d4edd]" />
                    <span className="text-sm font-black text-zinc-950 dark:text-zinc-200">{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Accuracy & Reliability */}
          <div className="p-8 rounded-3xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 space-y-6 text-center shadow-lg dark:shadow-none relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#9d4edd]/10 via-transparent to-transparent opacity-50 dark:opacity-100" />
            <div className="relative z-10 space-y-6">
              <h3 className="text-2xl font-bold text-foreground">Proven Performance</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <div className="text-4xl font-black text-zinc-950 dark:text-white">85–95%</div>
                  <p className="text-sm text-black dark:text-muted-foreground font-black uppercase tracking-tight">RUL prediction accuracy</p>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-black text-zinc-950 dark:text-white">High Precision</div>
                  <p className="text-sm text-black dark:text-muted-foreground font-black uppercase tracking-tight">Precursor detection recall</p>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-black text-zinc-950 dark:text-white">Drift Safety</div>
                  <p className="text-sm text-black dark:text-muted-foreground font-black uppercase tracking-tight">Never blindly trust models</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Tech Stack",
      content: (
        <div className="max-w-4xl mx-auto space-y-16 pb-20">
          <div className="space-y-12">
            <h2 className="text-3xl md:text-5xl font-bold text-center text-foreground">Built for Scale & Reliability</h2>
            <div className="max-w-6xl mx-auto">
              <ExpandOnHover
                items={[
                  {
                    title: "Frontend",
                    description: "React, Tailwind CSS, Framer Motion, TypeScript",
                    icon: <Layout className="size-6" />,
                    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800"
                  },
                  {
                    title: "Backend",
                    description: "High-performance Python with FastAPI and AsyncIO",
                    icon: <Server className="size-6" />,
                    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800"
                  },
                  {
                    title: "ML Intelligence",
                    description: "Enterprise AI via PyTorch, Scikit-Learn, and custom LSTM core.",
                    icon: <Cpu className="size-6" />,
                    image: "https://i.postimg.cc/k48W6g8R/mahdis-mousavi-h-J5u-MIRNg5k-unsplash.jpg"
                  },
                  {
                    title: "Data Layer",
                    description: "Time-series optimized Postgres with TimescaleDB extensions.",
                    icon: <DatabaseIcon className="size-6" />,
                    image: "https://i.postimg.cc/D0rQDwwd/Screenshot-2026-02-08-105807.png"
                  },
                  {
                    title: "Infrastructure",
                    description: "Containerized orchestration with Docker and managed cloud nodes.",
                    icon: <Layers className="size-6" />,
                    image: "https://i.postimg.cc/Dw8J4z3L/Communications-Network-2024.webp"
                  },
                  {
                    title: "Security",
                    description: "JWT session handling, RBAC permissions, and encrypted traffic.",
                    icon: <Lock className="size-6" />,
                    image: "https://i.postimg.cc/FRjJFn5n/online-security.jpg"
                  },
                  {
                    title: "Observability",
                    description: "Real-time metrics, audit logging, and predictive drift monitoring.",
                    icon: <Monitor className="size-6" />,
                    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800"
                  },
                ]}
              />
            </div>
          </div>

          <div className="pt-12 text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground">
                Stop Reacting. <span className="text-[#9d4edd]">Start Foreseeing.</span>
              </h2>
              <p className="text-xl text-black dark:text-muted-foreground max-w-2xl mx-auto leading-relaxed font-bold">
                Forsee Intelligence transforms maintenance from reactive cost to predictive advantage.
              </p>
            </div>

            <div className="flex justify-center pt-8">
              <a href="/systems" className="group relative">
                <ShineBorder borderRadius={12} borderWidth={2} duration={10} color="#9d4edd" className="bg-transparent p-0">
                  <div className="px-14 py-6 rounded-xl bg-[#9d4edd] text-white text-2xl font-black hover:bg-[#8b3dc7] transition-all shadow-[0_0_40px_rgba(157,78,221,0.3)] group-hover:scale-[1.02] active:scale-95 flex items-center gap-4 tracking-tighter">
                    Join the Future
                    <ArrowRight className="size-7 transition-transform group-hover:translate-x-2" />
                  </div>
                </ShineBorder>
                {/* Subtle glow for better contrast in dark mode */}
                <div className="absolute inset-0 bg-[#9d4edd]/20 blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
              </a>
            </div>
          </div>
        </div>
      )
    }
  ];

  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { margin: "0px 0px -200px 0px" });
  const [hasSnapped, setHasSnapped] = React.useState(false);

  useLenis((lenis) => {
    const scroll = lenis.scroll;
    // If user scrolls even a bit from the very top, snap to the solutions
    if (scroll > 10 && scroll < 200 && !hasSnapped) {
      const timeline = document.getElementById('timeline-section');
      if (timeline) {
        setHasSnapped(true);
        lenis.scrollTo('#timeline-section', {
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 * t * t * t) // custom fast easing
        });
      }
    }
    // Reset snap if back at top
    if (scroll < 5) {
      setHasSnapped(false);
    }
  }, [hasSnapped]);

  useEffect(() => {
    renderCanvas();
    return () => cleanupCanvas();
  }, []);

  return (
    <main className="relative w-full bg-background overflow-x-hidden">
      {/* Light mode gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-white via-purple-50 to-purple-100/50 dark:from-black dark:via-black dark:to-black pointer-events-none transition-all duration-500" />

      {/* Sticky Slide 1: Hero */}
      <section className="sticky top-0 h-screen w-full overflow-hidden border-0 rounded-none z-0">
        {/* Canvas Background and Decorations moved inside sticky section */}
        <canvas
          id="canvas"
          className="pointer-events-none absolute inset-0 mx-auto z-0 opacity-50"
        />
        <div className="absolute inset-0 pointer-events-none overflow-hidden dark:opacity-0 opacity-100 transition-opacity duration-500">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#9d4edd]/20 rounded-full blur-3xl" />
          <div className="absolute top-1/3 -left-48 w-80 h-80 bg-[#9d4edd]/15 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#9d4edd]/10 rounded-full blur-3xl" />
        </div>

        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="#9d4edd"
        />
        <SpotlightCard size={400} color="#9d4edd" />

        {/* Hero Content */}
        <div ref={heroRef} className="flex flex-col md:flex-row h-full pt-20">
          {/* Left content */}
          <div className="flex-[0.9] p-8 md:pl-32 md:pr-16 relative z-10 flex flex-col justify-center h-full items-start">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-wide mb-6 flex flex-col items-start gap-2">
              <span className="text-foreground">
                Predict.
              </span>
              <span className="text-foreground">
                Prevent.
              </span>
              <span className="text-[#9d4edd] drop-shadow-[0_0_15px_rgba(157,78,221,0.5)]">
                Protect.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/70 max-w-lg leading-relaxed">
              The enterprise predictive intelligence operating system for critical systems.
            </p>
            <p className="mt-4 text-[#9d4edd] font-medium text-lg">
              See failures before they exist.
            </p>

            <div className="mt-12 flex items-center gap-6">
              <a
                href="/systems"
                className="group relative"
              >
                <ShineBorder
                  borderRadius={999}
                  borderWidth={2}
                  duration={10}
                  color="#9d4edd"
                  className="bg-transparent p-0"
                >
                  <div className="px-10 py-4 rounded-full bg-[#9d4edd] text-white text-lg font-bold hover:bg-[#8b3dc7] transition-all shadow-[0_0_20px_rgba(157,78,221,0.4)] group-hover:scale-[1.02] active:scale-95">
                    Get Started
                  </div>
                </ShineBorder>
              </a>
              <button
                onClick={() => {
                  const timeline = document.getElementById('timeline-section');
                  timeline?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-10 py-4 rounded-full border border-foreground/30 text-foreground text-lg font-semibold hover:bg-foreground/10 transition-all hover:scale-105 active:scale-95"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Right content - Spline 3D */}
          <div className="flex-[1.1] relative min-h-[300px] md:min-h-0 flex items-center justify-center">
            <div className="w-full h-full scale-100 sm:scale-110 md:scale-125 origin-center transition-opacity duration-1000">
              {isHeroInView ? (
                <SplineScene
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-full"
                />
              ) : (
                <div className="w-full h-full bg-black/10" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Slide 2: Info/Solutions Section */}
      {/* We use z-10 and bg-background to ensure it covers the Hero */}
      <section id="timeline-section" className="relative z-10 w-full min-h-screen bg-background border-t border-white/5 shadow-[0_-50px_100px_rgba(0,0,0,0.5)]">
        <Timeline data={timelineData} />

        {/* Footer moved inside the second section or as a third section */}
        <footer className="relative z-20 pb-12 pt-8 border-t border-border bg-zinc-100 dark:bg-zinc-950">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-[#9d4edd]">Forsee AI</span>
              <span className="text-muted-foreground">— <span className="text-purple-500">The Predictor</span></span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Forsee AI. Predictive maintenance made simple.
            </p>
          </div>
        </footer>
      </section>
    </main>
  );
}
