import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Info, Grid3X3, LayoutDashboard, Activity, MessageCircle, Menu, X, CreditCard, User, AlertTriangle, Sparkles } from "lucide-react";
import { UserAvatar } from "@/components/ui/user-avatar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  path: string;
  roles?: string[];
}

const navItems: NavItem[] = [
  { id: "nav-home", icon: Home, label: "Home", path: "/" },
  { id: "nav-systems", icon: Grid3X3, label: "Systems", path: "/systems" },
  { id: "nav-dashboard", icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { id: "nav-output", icon: Activity, label: "Output", path: "/output-preview" },
  { id: "nav-pricing", icon: CreditCard, label: "Pricing", path: "/pricing" },
  { id: "nav-chatbot", icon: MessageCircle, label: "Chatbot", path: "/chatbot" },
  { id: "nav-admin", icon: AlertTriangle, label: "Admin", path: "/admin", roles: ["admin"] },
  { id: "nav-god", icon: Sparkles, label: "God Mode", path: "/god-mode", roles: ["admin"] },
];

export function BubbleNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isAuthenticated, userRole, user } = useAuth();

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsMobileOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between relative">
        {/* Left: Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <span className="text-2xl font-bold tracking-tight text-[#9d4edd] group-hover:text-[#b388ff] transition-colors">
            Forsee <span className="text-foreground">AI</span>
          </span>
        </div>

        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-4 p-1 rounded-2xl">
          {navItems
            .filter(item => {
              const hasRole = !item.roles || (userRole && item.roles.includes(userRole));
              if (!hasRole) return false;
              if (item.id === 'nav-god') return user?.id === 'admin-soham-god';
              return true;
            })
            .map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.path)}
                  className={`relative group p-2.5 rounded-xl transition-all duration-300 ${active
                    ? "bg-[#9d4edd]/20 text-[#9d4edd] border border-[#9d4edd]/30"
                    : "text-foreground/60 hover:text-foreground"
                    }`}
                  aria-label={item.label}
                >
                  <Icon className="h-6 w-6 relative z-10" />

                  {/* Tooltip */}
                  <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none px-2 py-1 rounded-md bg-card border border-border text-[10px] text-foreground whitespace-nowrap z-50 uppercase tracking-widest font-bold">
                    {item.label}
                  </div>
                </button>
              );
            })}
        </nav>

        {/* Right: Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          {!isAuthenticated ? (
            <div className="flex items-center gap-6">
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
              >
                <User className="h-4 w-4" />
                <span>Login</span>
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="px-6 py-2 rounded-xl bg-[#9d4edd] hover:bg-[#8b3dc7] text-white text-sm font-bold transition-all shadow-[0_0_20px_rgba(157,78,221,0.3)] active:scale-95"
              >
                Sign Up
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              {userRole && (
                <div className={cn(
                  "hidden lg:flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] border transition-all duration-500",
                  userRole === 'engineer' && "bg-blue-500/10 text-blue-500 border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.1)]",
                  userRole === 'viewer' && "bg-amber-500/10 text-amber-500 border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]",
                  userRole === 'admin' && "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]"
                )}>
                  <div className={cn(
                    "w-1 h-1 rounded-full animate-pulse",
                    userRole === 'engineer' && "bg-blue-500 shadow-[0_0_5px_#3b82f6]",
                    userRole === 'viewer' && "bg-amber-500 shadow-[0_0_5px_#f59e0b]",
                    userRole === 'admin' && "bg-emerald-500 shadow-[0_0_5px_#10b981]"
                  )} />
                  {userRole}
                </div>
              )}
              <UserAvatar />
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button
            className="p-2 text-zinc-400 hover:text-white transition-colors"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute top-[calc(100%+0.5rem)] left-4 right-4 bg-background/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl md:hidden z-50"
          >
            <nav className="flex flex-col gap-2">
              {navItems
                .filter(item => {
                  const hasRole = !item.roles || (userRole && item.roles.includes(userRole));
                  if (!hasRole) return false;
                  if (item.id === 'nav-god') return user?.id === 'admin-soham-god';
                  return true;
                })
                .map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.path)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${active
                        ? "bg-[#9d4edd]/20 text-[#9d4edd] border border-[#9d4edd]/20"
                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                        }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}

              {!isAuthenticated && (
                <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-white/5">
                  <button
                    onClick={() => handleNavClick("/login")}
                    className="py-3 text-sm font-medium text-zinc-400 hover:text-white text-center"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleNavClick("/signup")}
                    className="py-3 rounded-xl bg-[#9d4edd] text-white text-sm font-bold text-center"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
