import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";

import { ConnectionLoader } from "@/components/auth/ConnectionLoader";

export default function LoginPage() {
    const { login, loginWithGoogle } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [isLoading, setIsLoading] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [termsAccepted, setTermsAccepted] = useState(false);

    const handleGoogleSignIn = async () => {
        try {
            await loginWithGoogle();
            setIsConnecting(true);
        } catch (error: any) {
            toast.error("Google sign in failed.");
        }
    };

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!termsAccepted) {
            toast.error("Please accept the Privacy Policy and Terms and Conditions.");
            return;
        }
        setIsLoading(true);
        try {
            await login(formData.email, formData.password);
            setIsConnecting(true);
        } catch (error: any) {
            toast.error(error.message || "Invalid credentials. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const onConnectionComplete = () => {
        toast.success("Welcome back!");
        navigate(from, { replace: true });
    };

    return (
        <>
            <ConnectionLoader isVisible={isConnecting} onComplete={onConnectionComplete} />
            <AuthLayout
                title="Welcome back"
                description="Enter your credentials to access your dashboard"
            >
                <form onSubmit={handleSignIn} className="space-y-5 text-left">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="name@company.com"
                            required
                            className="bg-background/50"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                            <button type="button" className="text-xs text-primary hover:underline font-medium">
                                Forgot password?
                            </button>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            required
                            className="bg-background/50"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="terms"
                            checked={termsAccepted}
                            onCheckedChange={(checked) => setTermsAccepted(!!checked)}
                        />
                        <label
                            htmlFor="terms"
                            className="text-[12px] font-medium leading-none text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            I agree to the{" "}
                            <Link to="/legal" className="text-primary hover:underline">
                                Privacy Policy
                            </Link>{" "}
                            and{" "}
                            <Link to="/legal" className="text-primary hover:underline">
                                Terms and Conditions
                            </Link>
                        </label>
                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-[#9d4edd] hover:bg-[#8b3dc7] text-white font-bold h-11"
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
                    </Button>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-border" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground font-medium">Or continue with</span>
                        </div>
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        className="w-full h-11 border-border bg-background/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 flex items-center justify-center gap-3"
                        onClick={handleGoogleSignIn}
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                        Google
                    </Button>

                    <div className="text-center text-sm pt-2 flex flex-col gap-2">
                        <div>
                            <span className="text-muted-foreground">Don't have an account? </span>
                            <button
                                type="button"
                                onClick={() => navigate("/signup")}
                                className="text-primary hover:underline font-semibold"
                            >
                                Sign up
                            </button>
                        </div>
                        <button
                            type="button"
                            onClick={() => navigate("/admin-login")}
                            className="text-[10px] text-muted-foreground/30 hover:text-primary transition-colors uppercase tracking-[0.2em] font-black"
                        >
                            Admin
                        </button>
                    </div>
                </form>
            </AuthLayout>
        </>
    );
}
