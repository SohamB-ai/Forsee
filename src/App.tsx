import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { BubbleNav } from "@/components/navigation/BubbleNav";
import ScrollToTop from "@/components/navigation/ScrollToTop";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { DashboardProvider } from "@/context/DashboardContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { RoleSelectionModal } from "@/components/auth/RoleSelectionModal";
import HomePage from "./pages/HomePage";
import SystemsCatalog from "./pages/SystemsCatalog";
import SystemPage from "./pages/SystemPage";
import Dashboard from "./pages/Dashboard";
import ChatbotPage from "./pages/ChatbotPage";
import OutputPreview from "./pages/OutputPreview";
import FutureScalability from "./pages/FutureScalability";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PricingPage from "./pages/PricingPage";
import LegalPage from "./pages/LegalPage";
import { CursorGlow } from "@/components/ui/cursor-glow";
import SystemResultPage from "./pages/SystemResultPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import GodMode from "./pages/GodMode";
import { SmoothScroll } from "@/components/ui/smooth-scroll";

const queryClient = new QueryClient();

// Protected route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

// App routes wrapper (needs to be inside BrowserRouter for useLocation)
function AppRoutes() {
  const location = useLocation();
  const hideNav = (location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/admin-login');

  return (
    <>
      {!hideNav && <BubbleNav />}
      <RoleSelectionModal />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/legal" element={<LegalPage />} />

        {/* Protected routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/systems" element={<ProtectedRoute><SystemsCatalog /></ProtectedRoute>} />

        <Route path="/system/:slug" element={<ProtectedRoute><SystemPage /></ProtectedRoute>} />
        <Route path="/system/:slug/prediction" element={<ProtectedRoute><SystemResultPage /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/output-preview" element={<ProtectedRoute><OutputPreview /></ProtectedRoute>} />
        <Route path="/future-scalability" element={<ProtectedRoute><FutureScalability /></ProtectedRoute>} />
        <Route path="/chatbot" element={<ProtectedRoute><ChatbotPage /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/god-mode" element={<ProtectedRoute><GodMode /></ProtectedRoute>} />
        <Route path="/pricing" element={<ProtectedRoute><PricingPage /></ProtectedRoute>} />

        {/* Legacy routes redirect */}
        <Route path="/wind-turbines" element={<ProtectedRoute><SystemPage /></ProtectedRoute>} />
        <Route path="/power-transformers" element={<ProtectedRoute><SystemPage /></ProtectedRoute>} />
        <Route path="/industrial-motors" element={<ProtectedRoute><SystemPage /></ProtectedRoute>} />
        <Route path="/bridges" element={<ProtectedRoute><SystemPage /></ProtectedRoute>} />
        <Route path="/servers" element={<ProtectedRoute><SystemPage /></ProtectedRoute>} />
        <Route path="/icu-monitoring" element={<ProtectedRoute><SystemPage /></ProtectedRoute>} />
        <Route path="/cnc-machines" element={<ProtectedRoute><SystemPage /></ProtectedRoute>} />
        <Route path="/hvac-systems" element={<ProtectedRoute><SystemPage /></ProtectedRoute>} />

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <SmoothScroll>
        <TooltipProvider>
          <CursorGlow />
          <Toaster />
          <Sonner />
          <AuthProvider>
            <DashboardProvider>
              <BrowserRouter>
                <ScrollToTop />
                <AppRoutes />
              </BrowserRouter>
            </DashboardProvider>
          </AuthProvider>
        </TooltipProvider>
      </SmoothScroll>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
