import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, ShieldAlert } from "lucide-react";

import { ConnectionLoader } from "@/components/auth/ConnectionLoader";

export default function AdminLoginPage() {
    const { setRole, setUser } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [formData, setFormData] = useState({ username: "", passkey: "" });

    const handleAdminSignIn = async (e: React.FormEvent) => {
        e.preventDefault();

        // Admin Verification Manifest
        const admins: Record<string, { name: string; email: string; passkey: string }> = {
            "soham#dev": { name: "Soham Dev", email: "soham@forsee.ai", passkey: "aaaaaaaa" },
            "aastha#dev": { name: "Aastha Dev", email: "aastha@forsee.ai", passkey: "aaaaaaaa" },
            "sans#dev": { name: "Sans Dev", email: "sans@forsee.ai", passkey: "aaaaaaaa" },
            "soham#god": { name: "Soham God", email: "soham.god@forsee.ai", passkey: "ahambrahmasmi" }
        };

        const admin = admins[formData.username];

        if (admin && formData.passkey === admin.passkey) {
            setIsLoading(true);
            // Simulate secure verification delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            const adminUser = {
                id: `admin-${formData.username.replace('#', '-')}`,
                name: admin.name,
                email: admin.email,
                avatarUrl: '/avatar.png'
            };

            // Update Context State
            setRole("admin");
            setUser(adminUser);

            // Persist for refresh
            localStorage.setItem('forsee_user', JSON.stringify(adminUser));
            localStorage.setItem('forsee_role', 'admin');

            setIsConnecting(true);
            setIsLoading(false);
        } else {
            toast.error("Invalid Credentials", {
                description: "Please check your username and passkey."
            });
        }
    };

    const onConnectionComplete = () => {
        toast.success("Admin access granted.", {
            description: "Accessing central command..."
        });
        navigate("/dashboard");
    };

    return (
        <div className="relative">
            <ConnectionLoader isVisible={isConnecting} onComplete={onConnectionComplete} />
            <AuthLayout
                title="Secure Shell"
                description="Restricted Admin Tunnel"
            >
                <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center gap-3">
                    <ShieldAlert className="w-5 h-5 text-amber-500" />
                    <span className="text-xs text-amber-500/80 font-medium">Entering governance mode. All actions are logged.</span>
                </div>

                <form onSubmit={handleAdminSignIn} className="space-y-5 text-left">
                    <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            type="text"
                            placeholder="admin#id"
                            required
                            className="bg-background/50 border-white/10 focus:border-primary/50"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="passkey">Passkey</Label>
                        <Input
                            id="passkey"
                            type="password"
                            placeholder="••••••••"
                            required
                            className="bg-background/50 border-white/10 focus:border-primary/50"
                            value={formData.passkey}
                            onChange={(e) => setFormData({ ...formData, passkey: e.target.value })}
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold h-11 shadow-[0_0_20px_rgba(217,119,6,0.2)]"
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify Credentials"}
                    </Button>

                    <div className="text-center pt-4">
                        <button
                            type="button"
                            onClick={() => navigate("/login")}
                            className="text-xs text-muted-foreground hover:text-white transition-colors"
                        >
                            Return to Public Terminal
                        </button>
                    </div>
                </form>
            </AuthLayout>
        </div>
    );
}
