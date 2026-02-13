import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CardStack, CardStackItem } from "@/components/ui/card-stack";
import { ZoomParallax } from "@/components/ui/zoom-parallax";
import { systemCards as defaultSystemCards } from "@/components/home/SystemsSection";
import { ArrowRight, Plus, Loader2, CheckCircle2, X, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addRequest } from "@/lib/systemRequests";

export default function SystemsCatalog() {
  const navigate = useNavigate();
  const { userRole, user } = useAuth();
  const [localSystemCards, setLocalSystemCards] = useState<CardStackItem[]>(defaultSystemCards);
  const [activeItem, setActiveItem] = useState<CardStackItem>(defaultSystemCards[0]);
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Admin Add System state
  const [showAddForm, setShowAddForm] = useState(false);
  const [addSystemName, setAddSystemName] = useState("");
  const [addSystemDescription, setAddSystemDescription] = useState("");
  const [addSystemFields, setAddSystemFields] = useState("");
  const [addSystemImage, setAddSystemImage] = useState("");
  const [isAddingSystem, setIsAddingSystem] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);
  const addFormRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showAddForm && addFormRef.current) {
      setTimeout(() => {
        addFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [showAddForm]);

  const handleRequestSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("https://formspree.io/f/mgolvpll", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Also save to local store so admin dashboard can see it
        addRequest({
          systemName: formData.get('systemName') as string || 'Unknown System',
          details: formData.get('details') as string || '',
          submittedBy: user?.name || user?.email || 'Engineer',
        });
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          setIsRequestOpen(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Failed to make request", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddSystem = async () => {
    if (!addSystemName.trim()) return;
    setIsAddingSystem(true);

    // Simulate a brief delay for visual feedback
    await new Promise(resolve => setTimeout(resolve, 800));

    const slug = addSystemName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const newSystem: CardStackItem = {
      id: slug,
      title: addSystemName.trim(),
      description: addSystemDescription.trim() || `Predict failures and monitor health for ${addSystemName.trim()}.`,
      imageSrc: addSystemImage.trim() || "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&auto=format&fit=crop",
      href: `/system/${slug}`,
    };

    setLocalSystemCards(prev => [...prev, newSystem]);
    setIsAddingSystem(false);
    setAddSuccess(true);

    setTimeout(() => {
      setAddSuccess(false);
      setShowAddForm(false);
      setAddSystemName("");
      setAddSystemDescription("");
      setAddSystemFields("");
      setAddSystemImage("");
    }, 1800);
  };

  // Select 7 diverse images for the parallax effect
  const parallaxImages = localSystemCards.slice(0, 7).map(card => ({
    src: card.imageSrc,
    alt: card.title
  }));

  return (
    <div className="min-h-screen w-full relative">
      {/* Dynamic background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-white via-slate-50 to-purple-100/40 dark:from-black dark:via-[#0c051a] dark:to-black pointer-events-none transition-all duration-700" />

      <ZoomParallax images={parallaxImages} />
      <div className="min-h-screen w-full relative z-10 flex flex-col items-center justify-center py-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-semibold text-foreground tracking-tight mb-4">
            Operational Systems
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-lg mx-auto">
            Swipe or click cards to explore available systems.
          </p>
        </div>
        <div className="max-w-4xl w-full px-6">
          <CardStack
            items={localSystemCards}
            cardWidth={window.innerWidth < 640 ? 300 : 400}
            cardHeight={window.innerWidth < 640 ? 250 : 300}
            activeScale={1.1}
            overlap={0.5}
            autoAdvance={true}
            intervalMs={1500}
            onChangeIndex={(_, item) => setActiveItem(item)}
          />
        </div>

        <div className="mt-20 flex flex-col items-center gap-8">
          <button
            onClick={() => activeItem.href && navigate(activeItem.href)}
            className="group relative flex items-center gap-2 px-8 py-4 bg-[#8B4BFF] hover:bg-[#9D66FF] text-white font-bold rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(139,75,255,0.3)] hover:shadow-[0_0_30px_rgba(139,75,255,0.5)] active:scale-95"
          >
            <span>Predict in {activeItem.title}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />

            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
          </button>

          {/* Admin: Add a System */}
          {userRole === 'admin' && (
            <>
              <Button
                variant="outline"
                onClick={() => setShowAddForm(!showAddForm)}
                className="px-10 py-7 text-lg font-bold text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 border-slate-200 dark:border-white/10 gap-3 transition-all rounded-full shadow-sm hover:shadow-md"
              >
                <Plus className="w-5 h-5" /> Add a System
              </Button>

              <AnimatePresence>
                {showAddForm && (
                  <motion.div
                    ref={addFormRef}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="w-full max-w-lg"
                  >
                    <div className="relative bg-white/90 dark:bg-[#0a0a0a]/95 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden">
                      {/* Background glow */}
                      <div className="absolute -top-20 -right-20 w-52 h-52 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />
                      <div className="absolute -bottom-20 -left-20 w-52 h-52 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />

                      {/* Close button */}
                      <button
                        onClick={() => setShowAddForm(false)}
                        className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors z-10"
                      >
                        <X className="w-5 h-5" />
                      </button>

                      {addSuccess ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="py-10 flex flex-col items-center justify-center text-center space-y-4"
                        >
                          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center">
                            <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-500" />
                          </div>
                          <div className="space-y-1">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">System Added!</h3>
                            <p className="text-sm text-slate-500 dark:text-zinc-400">"{addSystemName}" has been added to the catalog.</p>
                          </div>
                        </motion.div>
                      ) : (
                        <div className="relative z-10 space-y-6">
                          {/* Header */}
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Sparkles className="w-5 h-5 text-purple-500" />
                              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Add New System</h3>
                            </div>
                            <p className="text-sm text-slate-500 dark:text-zinc-400">
                              Add a new operational system directly to the catalog.
                            </p>
                          </div>

                          {/* System Name */}
                          <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400">
                              System Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              value={addSystemName}
                              onChange={(e) => setAddSystemName(e.target.value)}
                              placeholder="e.g. Hydraulic Press V4"
                              className="h-12 bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 focus:border-purple-500 dark:focus:border-purple-500 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600"
                            />
                          </div>

                          {/* Description */}
                          <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400">
                              Description
                            </Label>
                            <Textarea
                              value={addSystemDescription}
                              onChange={(e) => setAddSystemDescription(e.target.value)}
                              placeholder="Brief description of the system and its failure modes..."
                              className="min-h-[80px] bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 focus:border-purple-500 dark:focus:border-purple-500 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600 resize-none"
                            />
                          </div>

                          {/* Input Fields */}
                          <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400">
                              Input Fields (comma-separated)
                            </Label>
                            <Input
                              value={addSystemFields}
                              onChange={(e) => setAddSystemFields(e.target.value)}
                              placeholder="e.g. Temperature, Pressure, Vibration, RPM"
                              className="h-12 bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 focus:border-purple-500 dark:focus:border-purple-500 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600"
                            />
                            {addSystemFields && (
                              <div className="flex flex-wrap gap-2 mt-2">
                                {addSystemFields.split(',').map((field, i) => field.trim() && (
                                  <span
                                    key={i}
                                    className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300 text-xs font-semibold border border-purple-200 dark:border-purple-500/20"
                                  >
                                    {field.trim()}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Image URL (optional) */}
                          <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400">
                              Image URL <span className="text-slate-400 dark:text-zinc-600 font-normal normal-case tracking-normal">(optional)</span>
                            </Label>
                            <Input
                              value={addSystemImage}
                              onChange={(e) => setAddSystemImage(e.target.value)}
                              placeholder="https://images.unsplash.com/..."
                              className="h-12 bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 focus:border-purple-500 dark:focus:border-purple-500 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600"
                            />
                          </div>

                          {/* Submit */}
                          <Button
                            onClick={handleAddSystem}
                            disabled={!addSystemName.trim() || isAddingSystem}
                            className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
                          >
                            {isAddingSystem ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Adding System...
                              </>
                            ) : (
                              <>
                                <Plus className="w-4 h-4 mr-2" /> Add System to Catalog
                              </>
                            )}
                          </Button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}

          {/* Engineer: Request New System */}
          {userRole === 'engineer' && (
            <Dialog open={isRequestOpen} onOpenChange={setIsRequestOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="px-10 py-7 text-lg font-bold text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 border-slate-200 dark:border-white/10 gap-3 transition-all rounded-full shadow-sm hover:shadow-md"
                >
                  <Plus className="w-5 h-5" /> Request New System
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-white dark:bg-[#0a0a0a] border-slate-200 dark:border-white/10">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-slate-900 dark:text-white">Request System Integration</DialogTitle>
                  <DialogDescription className="text-slate-500 dark:text-zinc-400">
                    Submit a request for a new industrial system implementation. Our engineering team will review your specs.
                  </DialogDescription>
                </DialogHeader>

                {isSuccess ? (
                  <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-500" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Request Sent!</h3>
                      <p className="text-sm text-slate-500 dark:text-zinc-400">We've received your system proposal.</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleRequestSubmit} className="grid gap-6 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="systemName" className="text-slate-900 dark:text-white">System Name</Label>
                      <Input
                        id="systemName"
                        name="systemName"
                        placeholder="e.g. Hydraulic Press V4"
                        className="bg-slate-50 dark:bg-black/40 border-slate-200 dark:border-white/10 focus:border-purple-500"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="details" className="text-slate-900 dark:text-white">Technical Specifications & Details</Label>
                      <Textarea
                        id="details"
                        name="details"
                        placeholder="Describe the system architecture, sensors, and required prediction models..."
                        className="min-h-[120px] bg-slate-50 dark:bg-black/40 border-slate-200 dark:border-white/10 focus:border-purple-500"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending Request...
                        </>
                      ) : (
                        "Submit Request"
                      )}
                    </Button>
                  </form>
                )}
              </DialogContent>
            </Dialog>
          )}

          {/* Quick Access Quick Links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mt-12 max-w-4xl px-10">
            {localSystemCards.map((card) => (
              <button
                key={card.id}
                onClick={() => card.href && navigate(card.href)}
                className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground hover:text-[#8B4BFF] transition-all relative group"
              >
                {card.title}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#8B4BFF] group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
