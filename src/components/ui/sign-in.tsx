import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

// --- HELPER COMPONENTS (ICONS) ---

const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-2.641-.21-5.236-.611-7.743z" />
        <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.022 35.026 44 30.038 44 24c0-2.641-.21-5.236-.611-7.743z" />
    </svg>
);


// --- TYPE DEFINITIONS ---

export interface Testimonial {
    avatarSrc: string;
    name: string;
    handle: string;
    text: string;
}

interface SignInPageProps {
    title?: React.ReactNode;
    description?: React.ReactNode;
    heroImageSrc?: string;
    testimonials?: Testimonial[];
    onSignIn?: (event: React.FormEvent<HTMLFormElement>) => void;
    onGoogleSignIn?: () => void;
    onResetPassword?: () => void;
    onCreateAccount?: () => void;
    onLegalClick?: () => void;
}

// --- SUB-COMPONENTS ---

const GlassInputWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="rounded-2xl border border-purple-500/30 bg-white/5 backdrop-blur-sm transition-colors focus-within:border-purple-400 focus-within:bg-purple-500/10">
        {children}
    </div>
);

const TestimonialCard = ({ testimonial, delay }: { testimonial: Testimonial, delay: string }) => (
    <div className={`animate-element ${delay} flex items-start gap-3 rounded-3xl bg-black/60 backdrop-blur-xl border border-purple-500/20 p-5 w-64`}>
        <img src={testimonial.avatarSrc} className="h-10 w-10 object-cover rounded-2xl" alt="avatar" />
        <div className="text-sm leading-snug">
            <p className="flex items-center gap-1 font-medium text-white">{testimonial.name}</p>
            <p className="text-purple-300">{testimonial.handle}</p>
            <p className="mt-1 text-gray-300">{testimonial.text}</p>
        </div>
    </div>
);

// --- MAIN COMPONENT ---

export const SignInPage: React.FC<SignInPageProps> = ({
    title = <span className="font-light text-white tracking-tighter">Welcome to <span className="text-purple-400 font-semibold">Forsee AI</span></span>,
    description = "Sign in to access your predictive intelligence dashboard",
    heroImageSrc,
    testimonials = [],
    onSignIn,
    onGoogleSignIn,
    onResetPassword,
    onCreateAccount,
    onLegalClick,
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-black w-full">
            {/* Left column: sign-in form */}
            <section className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <div className="flex flex-col gap-6">
                        <h1 className="animate-element text-4xl md:text-5xl font-semibold leading-tight">{title}</h1>
                        <p className="animate-element text-gray-400">{description}</p>

                        <form className="space-y-5" onSubmit={onSignIn}>
                            <div className="animate-element">
                                <label className="text-sm font-medium text-gray-400">Email Address</label>
                                <GlassInputWrapper>
                                    <input name="email" type="email" placeholder="Enter your email address" className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none text-white placeholder:text-gray-500" />
                                </GlassInputWrapper>
                            </div>

                            <div className="animate-element">
                                <label className="text-sm font-medium text-gray-400">Password</label>
                                <GlassInputWrapper>
                                    <div className="relative">
                                        <input name="password" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" className="w-full bg-transparent text-sm p-4 pr-12 rounded-2xl focus:outline-none text-white placeholder:text-gray-500" />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-3 flex items-center">
                                            {showPassword ? <EyeOff className="w-5 h-5 text-gray-500 hover:text-white transition-colors" /> : <Eye className="w-5 h-5 text-gray-500 hover:text-white transition-colors" />}
                                        </button>
                                    </div>
                                </GlassInputWrapper>
                            </div>

                            <div className="animate-element flex items-center justify-between text-sm">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" name="rememberMe" className="accent-purple-500 w-4 h-4" />
                                    <span className="text-gray-300">Keep me signed in</span>
                                </label>
                                <a href="#" onClick={(e) => { e.preventDefault(); onResetPassword?.(); }} className="hover:underline text-purple-400 transition-colors">Reset password</a>
                            </div>

                            <button type="submit" className="animate-element w-full rounded-2xl bg-purple-600 py-4 font-medium text-white hover:bg-purple-500 transition-colors shadow-[0_0_20px_rgba(157,78,221,0.3)]">
                                Sign In
                            </button>
                        </form>

                        <div className="animate-element relative flex items-center justify-center">
                            <span className="w-full border-t border-gray-700"></span>
                            <span className="px-4 text-sm text-gray-500 bg-black absolute">Or continue with</span>
                        </div>

                        <button onClick={onGoogleSignIn} className="animate-element w-full flex items-center justify-center gap-3 border border-gray-700 rounded-2xl py-4 text-white hover:bg-white/5 transition-colors">
                            <GoogleIcon />
                            Continue with Google
                        </button>

                        <p className="animate-element text-center text-sm text-gray-400">
                            New to Forsee AI? <a href="#" onClick={(e) => { e.preventDefault(); onCreateAccount?.(); }} className="text-purple-400 hover:underline transition-colors">Create Account</a>
                        </p>

                        <div className="animate-element pt-4 text-center">
                            <button
                                onClick={(e) => { e.preventDefault(); onLegalClick?.(); }}
                                className="inline-flex items-center px-6 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-gray-400 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300 backdrop-blur-sm"
                            >
                                Privacy & Terms
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Right column: hero image + testimonials */}
            {heroImageSrc && (
                <section className="hidden md:block flex-1 relative p-4">
                    <div className="absolute inset-4 rounded-3xl bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url(${heroImageSrc})` }}>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    </div>
                    {testimonials.length > 0 && (
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 px-8 w-full justify-center">
                            <TestimonialCard testimonial={testimonials[0]} delay="" />
                            {testimonials[1] && <div className="hidden xl:flex"><TestimonialCard testimonial={testimonials[1]} delay="" /></div>}
                            {testimonials[2] && <div className="hidden 2xl:flex"><TestimonialCard testimonial={testimonials[2]} delay="" /></div>}
                        </div>
                    )}
                </section>
            )}
        </div>
    );
};
