import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

// --- HELPER COMPONENTS (ICONS) ---

const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
        <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C36.971 39.801 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
    </svg>
);


// --- TYPE DEFINITIONS ---

interface SignUpPageProps {
    title?: React.ReactNode;
    description?: React.ReactNode;
    heroImageSrc?: string;
    onSignUp?: (name: string, email: string, password: string) => void;
    onGoogleSignUp?: () => void;
    onSignIn?: () => void;
}

// --- SUB-COMPONENTS ---

const GlassInputWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="rounded-2xl border border-border bg-foreground/5 backdrop-blur-sm transition-colors focus-within:border-cyan-400/70 focus-within:bg-cyan-500/10">
        {children}
    </div>
);

// --- MAIN COMPONENT ---

export const SignUpPage: React.FC<SignUpPageProps> = ({
    title = <span className="font-light text-foreground tracking-tighter">Create Account</span>,
    description = "Join Forsee AI and start predicting the future",
    heroImageSrc = "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=2160&q=80",
    onSignUp,
    onGoogleSignUp,
    onSignIn,
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }
        setError('');
        onSignUp?.(name, email, password);
    };

    return (
        <div className="h-[100dvh] flex flex-col md:flex-row font-sans w-[100dvw] bg-background">
            {/* Left column: sign-up form */}
            <section className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <div className="flex flex-col gap-6">
                        <h1 className="animate-element animate-delay-100 text-4xl md:text-5xl font-semibold leading-tight">{title}</h1>
                        <p className="animate-element animate-delay-200 text-muted-foreground">{description}</p>

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="animate-element animate-delay-300">
                                <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                                <GlassInputWrapper>
                                    <input
                                        name="name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter your full name"
                                        className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none text-foreground"
                                        required
                                    />
                                </GlassInputWrapper>
                            </div>

                            <div className="animate-element animate-delay-400">
                                <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                                <GlassInputWrapper>
                                    <input
                                        name="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email address"
                                        className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none text-foreground"
                                        required
                                    />
                                </GlassInputWrapper>
                            </div>

                            <div className="animate-element animate-delay-500">
                                <label className="text-sm font-medium text-muted-foreground">Password</label>
                                <GlassInputWrapper>
                                    <div className="relative">
                                        <input
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Create a password"
                                            className="w-full bg-transparent text-sm p-4 pr-12 rounded-2xl focus:outline-none text-foreground"
                                            required
                                        />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-3 flex items-center">
                                            {showPassword ? <EyeOff className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" /> : <Eye className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />}
                                        </button>
                                    </div>
                                </GlassInputWrapper>
                            </div>

                            <div className="animate-element animate-delay-600">
                                <label className="text-sm font-medium text-muted-foreground">Confirm Password</label>
                                <GlassInputWrapper>
                                    <div className="relative">
                                        <input
                                            name="confirmPassword"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Confirm your password"
                                            className="w-full bg-transparent text-sm p-4 pr-12 rounded-2xl focus:outline-none text-foreground"
                                            required
                                        />
                                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-3 flex items-center">
                                            {showConfirmPassword ? <EyeOff className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" /> : <Eye className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />}
                                        </button>
                                    </div>
                                </GlassInputWrapper>
                            </div>

                            {error && (
                                <p className="text-red-400 text-sm">{error}</p>
                            )}

                            <button type="submit" className="animate-element animate-delay-700 w-full rounded-2xl bg-primary py-4 font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                                Create Account
                            </button>
                        </form>

                        <div className="animate-element animate-delay-800 relative flex items-center justify-center">
                            <span className="w-full border-t border-border"></span>
                            <span className="px-4 text-sm text-muted-foreground bg-background absolute">Or continue with</span>
                        </div>

                        <button onClick={onGoogleSignUp} className="animate-element animate-delay-900 w-full flex items-center justify-center gap-3 border border-border rounded-2xl py-4 hover:bg-secondary transition-colors text-foreground">
                            <GoogleIcon />
                            Continue with Google
                        </button>

                        <p className="animate-element animate-delay-1000 text-center text-sm text-muted-foreground">
                            Already have an account? <button type="button" onClick={onSignIn} className="text-cyan-400 hover:underline transition-colors">Sign In</button>
                        </p>
                    </div>
                </div>
            </section>

            {/* Right column: hero image */}
            <section className="hidden md:block flex-1 relative p-4">
                <div className="animate-slide-right animate-delay-300 absolute inset-4 rounded-3xl bg-cover bg-center" style={{ backgroundImage: `url(${heroImageSrc})` }}></div>
            </section>
        </div>
    );
};

export default SignUpPage;
