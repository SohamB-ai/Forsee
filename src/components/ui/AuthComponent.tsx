import { cn } from "@/lib/utils";
import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle, useMemo, useCallback, createContext, Children } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight, Mail, Gem, Lock, Eye, EyeOff, ArrowLeft, X, AlertCircle, PartyPopper, Loader, User } from "lucide-react";
import { AnimatePresence, motion, useInView, Variants, Transition } from "framer-motion";
import confetti from "canvas-confetti";
import type { GlobalOptions as ConfettiGlobalOptions, CreateTypes as ConfettiInstance, Options as ConfettiOptions } from "canvas-confetti";
import { useNavigate } from "react-router-dom";

// --- CONFETTI LOGIC ---
type Api = { fire: (options?: ConfettiOptions) => void }
export type ConfettiRef = Api | null
const ConfettiContext = createContext<Api>({} as Api)

const Confetti = forwardRef<ConfettiRef, React.ComponentPropsWithRef<"canvas"> & { options?: ConfettiOptions; globalOptions?: ConfettiGlobalOptions; manualstart?: boolean }>((props, ref) => {
    const { options, globalOptions = { resize: true, useWorker: true }, manualstart = false, ...rest } = props
    const instanceRef = useRef<ConfettiInstance | null>(null)
    const canvasRef = useCallback((node: HTMLCanvasElement) => {
        if (node !== null) {
            if (instanceRef.current) return
            instanceRef.current = confetti.create(node, { ...globalOptions, resize: true })
        } else {
            if (instanceRef.current) {
                instanceRef.current.reset()
                instanceRef.current = null
            }
        }
    }, [globalOptions])
    const fire = useCallback((opts = {}) => instanceRef.current?.({ ...options, ...opts }), [options])
    const api = useMemo(() => ({ fire }), [fire])
    useImperativeHandle(ref, () => api, [api])
    useEffect(() => { if (!manualstart) fire() }, [manualstart, fire])
    return <canvas ref={canvasRef} {...rest} />
})
Confetti.displayName = "Confetti";

// --- TEXT LOOP ANIMATION COMPONENT ---
type TextLoopProps = { children: React.ReactNode[]; className?: string; interval?: number; transition?: Transition; variants?: Variants; onIndexChange?: (index: number) => void; stopOnEnd?: boolean; };
export function TextLoop({ children, className, interval = 2, transition = { duration: 0.3 }, variants, onIndexChange, stopOnEnd = false }: TextLoopProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const items = Children.toArray(children);
    useEffect(() => {
        const intervalMs = interval * 1000;
        const timer = setInterval(() => {
            setCurrentIndex((current) => {
                if (stopOnEnd && current === items.length - 1) {
                    clearInterval(timer);
                    return current;
                }
                const next = (current + 1) % items.length;
                onIndexChange?.(next);
                return next;
            });
        }, intervalMs);
        return () => clearInterval(timer);
    }, [items.length, interval, onIndexChange, stopOnEnd]);
    const motionVariants: Variants = {
        initial: { y: 20, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: -20, opacity: 0 },
    };
    return (
        <div className={cn('relative inline-block whitespace-nowrap', className)}>
            <AnimatePresence mode='popLayout' initial={false}>
                <motion.div key={currentIndex} initial='initial' animate='animate' exit='exit' transition={transition} variants={variants || motionVariants}>
                    {items[currentIndex]}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

// --- BUILT-IN BLUR FADE ANIMATION COMPONENT ---
interface BlurFadeProps { children: React.ReactNode; className?: string; variant?: { hidden: { y: number }; visible: { y: number } }; duration?: number; delay?: number; yOffset?: number; inView?: boolean; inViewMargin?: string; blur?: string; }
function BlurFade({ children, className, variant, duration = 0.4, delay = 0, yOffset = 6, inView = true, inViewMargin = "-50px", blur = "6px" }: BlurFadeProps) {
    const ref = useRef(null);
    const inViewResult = useInView(ref, { once: true, margin: inViewMargin as any });
    const isInView = !inView || inViewResult;
    const defaultVariants: Variants = {
        hidden: { y: yOffset, opacity: 0, filter: `blur(${blur})` },
        visible: { y: -yOffset, opacity: 1, filter: `blur(0px)` },
    };
    const combinedVariants = variant || defaultVariants;
    return (
        <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} exit="hidden" variants={combinedVariants} transition={{ delay: 0.04 + delay, duration, ease: "easeOut" }} className={className}>
            {children}
        </motion.div>
    );
}


// --- BUILT-IN GLASS BUTTON COMPONENT ---
const glassButtonVariants = cva("relative isolate all-unset cursor-pointer rounded-full transition-all", { variants: { size: { default: "text-base font-medium", sm: "text-sm font-medium", lg: "text-lg font-medium", icon: "h-10 w-10" } }, defaultVariants: { size: "default" } });
const glassButtonTextVariants = cva("glass-button-text relative block select-none tracking-tighter", { variants: { size: { default: "px-6 py-3.5", sm: "px-4 py-2", lg: "px-8 py-4", icon: "flex h-10 w-10 items-center justify-center" } }, defaultVariants: { size: "default" } });
export interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof glassButtonVariants> { contentClassName?: string; }
const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
    ({ className, children, size, contentClassName, onClick, ...props }, ref) => {
        const handleWrapperClick = (e: React.MouseEvent<HTMLDivElement>) => {
            const button = e.currentTarget.querySelector('button');
            if (button && e.target !== button) button.click();
        };
        return (
            <div className={cn("glass-button-wrap cursor-pointer rounded-full relative", className)} onClick={handleWrapperClick}>
                <button className={cn("glass-button relative z-10", glassButtonVariants({ size }))} ref={ref} onClick={onClick} {...props}>
                    <span className={cn(glassButtonTextVariants({ size }), contentClassName)}>{children}</span>
                </button>
                <div className="glass-button-shadow rounded-full pointer-events-none"></div>
            </div>
        );
    }
);
GlassButton.displayName = "GlassButton";


// --- THEME-AWARE SVG GRADIENT BACKGROUND ---
const GradientBackground = () => (
    <>
        <style>
            {` 
            @keyframes float1 { 0% { transform: translate(0, 0); } 50% { transform: translate(-10px, 10px); } 100% { transform: translate(0, 0); } } 
            @keyframes float2 { 0% { transform: translate(0, 0); } 50% { transform: translate(10px, -10px); } 100% { transform: translate(0, 0); } } 
            `}
        </style>
        <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" className="absolute top-0 left-0 w-full h-full opacity-40">
            <defs>
                <linearGradient id="rev_grad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style={{ stopColor: '#9d4edd', stopOpacity: 0.8 }} /><stop offset="100%" style={{ stopColor: '#7b2cbf', stopOpacity: 0.6 }} /></linearGradient>
                <linearGradient id="rev_grad2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style={{ stopColor: '#5a189a', stopOpacity: 0.9 }} /><stop offset="50%" style={{ stopColor: '#3c096c', stopOpacity: 0.7 }} /><stop offset="100%" style={{ stopColor: '#240046', stopOpacity: 0.6 }} /></linearGradient>
                <radialGradient id="rev_grad3" cx="50%" cy="50%" r="50%"><stop offset="0%" style={{ stopColor: '#c77dff', stopOpacity: 0.8 }} /><stop offset="100%" style={{ stopColor: '#e0aaff', stopOpacity: 0.4 }} /></radialGradient>
                <filter id="rev_blur1" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="35" /></filter>
                <filter id="rev_blur2" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="25" /></filter>
                <filter id="rev_blur3" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="45" /></filter>
            </defs>
            <g style={{ animation: 'float1 20s ease-in-out infinite' }}>
                <ellipse cx="200" cy="500" rx="250" ry="180" fill="url(#rev_grad1)" filter="url(#rev_blur1)" transform="rotate(-30 200 500)" />
                <rect x="500" y="100" width="300" height="250" rx="80" fill="url(#rev_grad2)" filter="url(#rev_blur2)" transform="rotate(15 650 225)" />
            </g>
            <g style={{ animation: 'float2 25s ease-in-out infinite' }}>
                <circle cx="650" cy="450" r="150" fill="url(#rev_grad3)" filter="url(#rev_blur3)" opacity="0.7" />
                <ellipse cx="50" cy="150" rx="180" ry="120" fill="#9d4edd" filter="url(#rev_blur2)" opacity="0.8" />
            </g>
        </svg>
    </>
);


// --- CHILD COMPONENTS ---
const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="w-6 h-6"> <g fillRule="evenodd" fill="none"> <g fillRule="nonzero" transform="translate(3, 2)"> <path fill="#4285F4" d="M57.8123233,30.1515267 C57.8123233,27.7263183 57.6155321,25.9565533 57.1896408,24.1212666 L29.4960833,24.1212666 L29.4960833,35.0674653 L45.7515771,35.0674653 C45.4239683,37.7877475 43.6542033,41.8844383 39.7213169,44.6372555 L39.6661883,45.0037254 L48.4223791,51.7870338 L49.0290201,51.8475849 C54.6004021,46.7020943 57.8123233,39.1313952 57.8123233,30.1515267"></path> <path fill="#34A853" d="M29.4960833,58.9921667 C37.4599129,58.9921667 44.1456164,56.3701671 49.0290201,51.8475849 L39.7213169,44.6372555 C37.2305867,46.3742596 33.887622,47.5868638 29.4960833,47.5868638 C21.6960582,47.5868638 15.0758763,42.4415991 12.7159637,35.3297782 L12.3700541,35.3591501 L3.26524241,42.4054492 L3.14617358,42.736447 C7.9965904,52.3717589 17.959737,58.9921667 29.4960833,58.9921667"></path> <path fill="#FBBC05" d="M12.7159637,35.3297782 C12.0932812,33.4944915 11.7329116,31.5279353 11.7329116,29.4960833 C11.7329116,27.4640054 12.0932812,25.4976752 12.6832029,23.6623884 L12.6667095,23.2715173 L3.44779955,16.1120237 L3.14617358,16.2554937 C1.14708246,20.2539019 0,24.7439491 0,29.4960833 C0,34.2482175 1.14708246,38.7380388 3.14617358,42.736447 L12.7159637,35.3297782"></path> <path fill="#EB4335" d="M29.4960833,11.4050769 C35.0347044,11.4050769 38.7707997,13.7975244 40.9011602,15.7968415 L49.2255853,7.66898166 C44.1130815,2.91684746 37.4599129,0 29.4960833,0 C17.959737,0 7.9965904,6.62018183 3.14617358,16.2554937 L12.6832029,23.6623884 C15.0758763,16.5505675 21.6960582,11.4050769 29.4960833,11.4050769"></path> </g> </g></svg>);

const modalSteps = [
    { message: "Verifying...", icon: <Loader className="w-12 h-12 text-primary animate-spin" /> },
    { message: "Securing connection...", icon: <Loader className="w-12 h-12 text-primary animate-spin" /> },
    { message: "Finalizing...", icon: <Loader className="w-12 h-12 text-primary animate-spin" /> },
    { message: "Access Granted!", icon: <PartyPopper className="w-12 h-12 text-green-500" /> }
];
const TEXT_LOOP_INTERVAL = 1.5;

const DefaultLogo = () => (<div className="bg-primary text-primary-foreground rounded-md p-1.5 shadow-[0_0_10px_rgba(157,78,221,0.5)]"> <Gem className="h-4 w-4" /> </div>);

// --- MAIN COMPONENT ---
interface AuthComponentProps {
    logo?: React.ReactNode;
    brandName?: string;
    mode?: 'signin' | 'signup';
    onAuth: (data: any) => Promise<void>;
    onGoogleLogin: () => Promise<void>;
    onSwitchMode: () => void;
    onLegalClick: () => void;
}

export const AuthComponent = ({
    logo = <DefaultLogo />,
    brandName = "Forsee AI",
    mode = 'signin',
    onAuth,
    onGoogleLogin,
    onSwitchMode,
    onLegalClick
}: AuthComponentProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [authStep, setAuthStep] = useState(mode === 'signup' ? "name" : "email");
    const [modalStatus, setModalStatus] = useState<'closed' | 'loading' | 'error' | 'success'>('closed');
    const [modalErrorMessage, setModalErrorMessage] = useState('');
    const confettiRef = useRef<ConfettiRef>(null);
    const navigate = useNavigate();

    const isEmailValid = /\S+@\S+\.\S+/.test(email);
    const isPasswordValid = password.length >= 6;
    const isConfirmPasswordValid = confirmPassword.length >= 6;
    const isNameValid = name.trim().length >= 2;

    const nameInputRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const confirmPasswordInputRef = useRef<HTMLInputElement>(null);

    const fireSideCanons = () => {
        const fire = confettiRef.current?.fire;
        if (fire) {
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };
            const particleCount = 50;
            fire({ ...defaults, particleCount, origin: { x: 0, y: 1 }, angle: 60 });
            fire({ ...defaults, particleCount, origin: { x: 1, y: 1 }, angle: 120 });
        }
    };

    const handleAuthSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (modalStatus !== 'closed') return;

        if (mode === 'signup' && password !== confirmPassword) {
            setModalErrorMessage("Passwords do not match!");
            setModalStatus('error');
            return;
        }

        setModalStatus('loading');
        try {
            if (mode === 'signup') {
                await onAuth({ name, email, password });
            } else {
                await onAuth({ email, password });
            }

            const loadingStepsCount = modalSteps.length - 1;
            const totalDuration = loadingStepsCount * TEXT_LOOP_INTERVAL * 1000;

            setTimeout(() => {
                setModalStatus('success');
                fireSideCanons();
            }, totalDuration);

        } catch (error: any) {
            setModalErrorMessage(error.message || "Authentication failed. Please try again.");
            setModalStatus('error');
        }
    };

    const handleProgressStep = () => {
        if (authStep === 'name') {
            if (isNameValid) setAuthStep("email");
        } else if (authStep === 'email') {
            if (isEmailValid) setAuthStep("password");
        } else if (authStep === 'password') {
            if (isPasswordValid) {
                if (mode === 'signup') setAuthStep("confirmPassword");
                else handleAuthSubmit(new Event('submit') as any);
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleProgressStep();
        }
    };

    const handleGoBack = () => {
        if (authStep === 'confirmPassword') setAuthStep('password');
        else if (authStep === 'password') setAuthStep('email');
        else if (authStep === 'email' && mode === 'signup') setAuthStep('name');
    };

    const closeModal = () => {
        setModalStatus('closed');
        setModalErrorMessage('');
    };

    useEffect(() => {
        if (authStep === 'email') setTimeout(() => emailInputRef.current?.focus(), 500);
        else if (authStep === 'password') setTimeout(() => passwordInputRef.current?.focus(), 500);
        else if (authStep === 'confirmPassword') setTimeout(() => confirmPasswordInputRef.current?.focus(), 500);
        else if (authStep === 'name') setTimeout(() => nameInputRef.current?.focus(), 500);
    }, [authStep]);

    useEffect(() => {
        if (modalStatus === 'success') {
            fireSideCanons();
        }
    }, [modalStatus]);

    const Modal = () => (
        <AnimatePresence>
            {modalStatus !== 'closed' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md">
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-black/40 border border-white/10 rounded-2xl p-8 w-full max-w-sm flex flex-col items-center gap-4 mx-4 shadow-2xl">
                        {(modalStatus === 'error' || modalStatus === 'success') && <button onClick={closeModal} className="absolute top-4 right-4 p-1 text-muted-foreground hover:text-foreground transition-colors"><X className="w-5 h-5" /></button>}
                        {modalStatus === 'error' && <>
                            <AlertCircle className="w-12 h-12 text-red-500" />
                            <p className="text-lg font-medium text-foreground text-center">{modalErrorMessage}</p>
                            <GlassButton onClick={closeModal} size="sm" className="mt-4">Try Again</GlassButton>
                        </>}
                        {modalStatus === 'loading' &&
                            <TextLoop interval={TEXT_LOOP_INTERVAL} stopOnEnd={true}>
                                {modalSteps.slice(0, -1).map((step, i) =>
                                    <div key={i} className="flex flex-col items-center gap-4">
                                        {step.icon}
                                        <p className="text-lg font-medium text-foreground">{step.message}</p>
                                    </div>
                                )}
                            </TextLoop>
                        }
                        {modalStatus === 'success' &&
                            <div className="flex flex-col items-center gap-4">
                                {modalSteps[modalSteps.length - 1].icon}
                                <p className="text-lg font-medium text-foreground">{mode === 'signup' ? "Account Created!" : "Access Granted!"}</p>
                            </div>
                        }
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return (
        <div className="bg-background min-h-screen w-full flex flex-col text-foreground overflow-hidden">
            <style>{`
            input[type="password"]::-ms-reveal, input[type="password"]::-ms-clear { display: none !important; } input[type="password"]::-webkit-credentials-auto-fill-button, input[type="password"]::-webkit-strong-password-auto-fill-button { display: none !important; } input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, input:-webkit-autofill:active { -webkit-box-shadow: 0 0 0 30px #000 inset !important; -webkit-text-fill-color: var(--foreground) !important; background-color: transparent !important; background-clip: content-box !important; transition: background-color 5000s ease-in-out 0s !important; color: var(--foreground) !important; caret-color: var(--foreground) !important; } input:autofill { background-color: transparent !important; background-clip: content-box !important; -webkit-text-fill-color: var(--foreground) !important; color: var(--foreground) !important; } input:-internal-autofill-selected { background-color: transparent !important; background-image: none !important; color: var(--foreground) !important; -webkit-text-fill-color: var(--foreground) !important; } input:-webkit-autofill::first-line { color: var(--foreground) !important; -webkit-text-fill-color: var(--foreground) !important; }
            @property --angle-1 { syntax: "<angle>"; inherits: false; initial-value: -75deg; } @property --angle-2 { syntax: "<angle>"; inherits: false; initial-value: -45deg; }
            .glass-button-wrap { --anim-time: 400ms; --anim-ease: cubic-bezier(0.25, 1, 0.5, 1); --border-width: clamp(1px, 0.0625em, 4px); position: relative; z-index: 2; transform-style: preserve-3d; transition: transform var(--anim-time) var(--anim-ease); } .glass-button-wrap:has(.glass-button:active) { transform: rotateX(25deg); } .glass-button-shadow { --shadow-cutoff-fix: 2em; position: absolute; width: calc(100% + var(--shadow-cutoff-fix)); height: calc(100% + var(--shadow-cutoff-fix)); top: calc(0% - var(--shadow-cutoff-fix) / 2); left: calc(0% - var(--shadow-cutoff-fix) / 2); filter: blur(clamp(2px, 0.125em, 12px)); transition: filter var(--anim-time) var(--anim-ease); pointer-events: none; z-index: 0; } .glass-button-shadow::after { content: ""; position: absolute; inset: 0; border-radius: 9999px; background: linear-gradient(180deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05)); width: calc(100% - var(--shadow-cutoff-fix) - 0.25em); height: calc(100% - var(--shadow-cutoff-fix) - 0.25em); top: calc(var(--shadow-cutoff-fix) - 0.5em); left: calc(var(--shadow-cutoff-fix) - 0.875em); padding: 0.125em; box-sizing: border-box; mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); mask-composite: exclude; transition: all var(--anim-time) var(--anim-ease); opacity: 1; }
            .glass-button { -webkit-tap-highlight-color: transparent; backdrop-filter: blur(clamp(1px, 0.125em, 4px)); transition: all var(--anim-time) var(--anim-ease); background: linear-gradient(-75deg, rgba(93, 63, 211, 0.1), rgba(93, 63, 211, 0.2), rgba(93, 63, 211, 0.1)); border: 1px solid rgba(157, 78, 221, 0.3); box-shadow: inset 0 0.125em 0.125em rgba(255,255,255,0.05), inset 0 -0.125em 0.125em rgba(0,0,0,0.2), 0 0.25em 0.125em -0.125em rgba(0,0,0,0.5); } .glass-button:hover { transform: scale(0.975); backdrop-filter: blur(0.01em); border-color: rgba(157, 78, 221, 0.6); } .glass-button-text { color: rgba(255,255,255,0.9); text-shadow: 0em 0.25em 0.05em rgba(0,0,0,0.2); } .glass-button:hover .glass-button-text::after { background-position: 25% 50%; } .glass-button:active .glass-button-text::after { background-position: 50% 15%; --angle-2: -15deg; }
            .glass-input { display: flex; position: relative; width: 100%; align-items: center; gap: 0.5rem; border-radius: 9999px; padding: 0.25rem; -webkit-tap-highlight-color: transparent; backdrop-filter: blur(clamp(1px, 0.125em, 4px)); transition: all 400ms cubic-bezier(0.25, 1, 0.5, 1); background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); box-shadow: inset 0 0.125em 0.125em rgba(0,0,0,0.2); } 
            .glass-input:focus-within { border-color: rgba(157, 78, 221, 0.5); box-shadow: 0 0 15px rgba(157, 78, 221, 0.2); }
        `}</style>

            <Confetti ref={confettiRef} manualstart className="fixed top-0 left-0 w-full h-full pointer-events-none z-[999]" />
            <Modal />

            <div className={cn("fixed top-8 left-8 z-50 flex items-center gap-3", "md:left-1/2 md:-translate-x-1/2")}>
                {logo}
                <h1 className="text-xl font-bold text-white tracking-widest uppercase">{brandName}</h1>
            </div>

            <div className={cn("flex w-full flex-1 h-full items-center justify-center bg-black", "relative overflow-hidden")}>
                <div className="absolute inset-0 z-0"><GradientBackground /></div>
                <fieldset disabled={modalStatus !== 'closed'} className="relative z-10 flex flex-col items-center gap-8 w-full max-w-sm mx-auto p-6">
                    <AnimatePresence mode="wait">
                        {authStep === "name" && <motion.div key="name-content" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="w-full flex flex-col items-center gap-6">
                            <div className="text-center"><p className="font-serif font-light text-4xl sm:text-5xl md:text-6xl tracking-tight text-white leading-tight">Join the Future</p></div>
                            <p className="text-sm font-medium text-purple-300/70">Create your enterprise account</p>
                            <div className="flex items-center justify-center gap-4 w-full mt-2">
                                <GlassButton onClick={() => onGoogleLogin().then(() => setModalStatus('loading'))} contentClassName="flex items-center justify-center gap-3" size="sm"><GoogleIcon /><span className="font-semibold text-white">Google</span></GlassButton>
                            </div>
                            <div className="flex items-center w-full gap-3 py-2 px-10"><hr className="w-full border-white/10" /><span className="text-[10px] font-bold text-white/40 tracking-widest uppercase">OR</span><hr className="w-full border-white/10" /></div>
                        </motion.div>}

                        {(authStep === "email" && mode === 'signin') && <motion.div key="signin-email-content" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="w-full flex flex-col items-center gap-6">
                            <div className="text-center"><p className="font-serif font-light text-4xl sm:text-5xl md:text-6xl tracking-tight text-white leading-tight">Initiate Access</p></div>
                            <p className="text-sm font-medium text-purple-300/70">Predictive intelligence awaits</p>
                            <div className="flex items-center justify-center gap-4 w-full mt-2">
                                <GlassButton onClick={() => onGoogleLogin().then(() => setModalStatus('loading'))} contentClassName="flex items-center justify-center gap-3" size="sm"><GoogleIcon /><span className="font-semibold text-white">Google</span></GlassButton>
                            </div>
                            <div className="flex items-center w-full gap-3 py-2 px-10"><hr className="w-full border-white/10" /><span className="text-[10px] font-bold text-white/40 tracking-widest uppercase">OR</span><hr className="w-full border-white/10" /></div>
                        </motion.div>}

                        {authStep === "password" && <motion.div key="password-title" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="w-full flex flex-col items-center text-center gap-3">
                            <p className="font-serif font-light text-4xl tracking-tight text-white">Secure Access</p>
                            <p className="text-sm font-medium text-purple-300/60 uppercase tracking-widest">Verification Required</p>
                        </motion.div>}

                        {authStep === "confirmPassword" && <motion.div key="confirm-title" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="w-full flex flex-col items-center text-center gap-3">
                            <p className="font-serif font-light text-4xl tracking-tight text-white">Final Step</p>
                            <p className="text-sm font-medium text-purple-300/60 uppercase tracking-widest">Confirm credentials</p>
                        </motion.div>}
                    </AnimatePresence>

                    <form onSubmit={handleAuthSubmit} className="w-full space-y-6">
                        <div className="space-y-6">
                            {authStep === "name" && <BlurFade key="name-field" className="w-full">
                                <div className="glass-input"><div className="w-10 pl-3 flex items-center justify-center text-purple-400"><User className="h-5 w-5" /></div>
                                    <input ref={nameInputRef} type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} onKeyDown={handleKeyDown} className="h-12 w-full bg-transparent text-white placeholder:text-white/30 focus:outline-none" />
                                    <div className={cn("transition-all", isNameValid ? "w-10 pr-1 opacity-100" : "w-0 opacity-0 overflow-hidden")}><GlassButton type="button" onClick={handleProgressStep} size="icon" contentClassName="text-white"><ArrowRight className="w-5 h-5" /></GlassButton></div>
                                </div>
                            </BlurFade>}

                            {authStep === "email" && <BlurFade key="email-field" className="w-full">
                                <div className="glass-input"><div className="w-10 pl-3 flex items-center justify-center text-purple-400"><Mail className="h-5 w-5" /></div>
                                    <input ref={emailInputRef} type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={handleKeyDown} className="h-12 w-full bg-transparent text-white placeholder:text-white/30 focus:outline-none" />
                                    <div className={cn("transition-all", isEmailValid ? "w-10 pr-1 opacity-100" : "w-0 opacity-0 overflow-hidden")}><GlassButton type="button" onClick={handleProgressStep} size="icon" contentClassName="text-white"><ArrowRight className="w-5 h-5" /></GlassButton></div>
                                </div>
                                {mode === 'signup' && <button type="button" onClick={handleGoBack} className="mt-4 flex items-center gap-2 text-xs text-white/40 hover:text-white transition-colors uppercase tracking-widest"><ArrowLeft className="w-3 h-3" /> Identity</button>}
                            </BlurFade>}

                            {authStep === "password" && <BlurFade key="password-field" className="w-full">
                                <div className="glass-input"><div className="w-10 pl-3 flex items-center justify-center text-purple-400 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</div>
                                    <input ref={passwordInputRef} type={showPassword ? "text" : "password"} placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown} className="h-12 w-full bg-transparent text-white placeholder:text-white/30 focus:outline-none" />
                                    <div className={cn("transition-all", isPasswordValid ? "w-10 pr-1 opacity-100" : "w-0 opacity-0 overflow-hidden")}><GlassButton type="button" onClick={handleProgressStep} size="icon" contentClassName="text-white"><ArrowRight className="w-5 h-5" /></GlassButton></div>
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <button type="button" onClick={handleGoBack} className="flex items-center gap-2 text-xs text-white/40 hover:text-white transition-colors uppercase tracking-widest"><ArrowLeft className="w-3 h-3" /> Contact</button>
                                    {mode === 'signin' && <button type="button" className="text-xs text-purple-400/70 hover:text-purple-400 transition-colors font-medium">Reset Credentials?</button>}
                                </div>
                            </BlurFade>}

                            {authStep === "confirmPassword" && <BlurFade key="confirm-password-field" className="w-full">
                                <div className="glass-input"><div className="w-10 pl-3 flex items-center justify-center text-purple-400 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</div>
                                    <input ref={confirmPasswordInputRef} type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="h-12 w-full bg-transparent text-white placeholder:text-white/30 focus:outline-none" />
                                    <div className={cn("transition-all", isConfirmPasswordValid ? "w-10 pr-1 opacity-100" : "w-0 opacity-0 overflow-hidden")}><GlassButton type="submit" size="icon" contentClassName="text-white"><ArrowRight className="w-5 h-5" /></GlassButton></div>
                                </div>
                                <button type="button" onClick={handleGoBack} className="mt-4 flex items-center gap-2 text-xs text-white/40 hover:text-white transition-colors uppercase tracking-widest"><ArrowLeft className="w-3 h-3" /> Back</button>
                            </BlurFade>}
                        </div>
                    </form>

                    <div className="w-full text-center space-y-4 pt-4 border-t border-white/5">
                        <p className="text-xs text-white/30 uppercase tracking-widest">
                            {mode === 'signin' ? "Don't have an enterprise account?" : "Already managing assets?"}{' '}
                            <button onClick={onSwitchMode} className="text-purple-400 hover:text-purple-300 font-bold ml-1 transition-colors">
                                {mode === 'signin' ? "JOIN NOW" : "AUTHENTICATE"}
                            </button>
                        </p>
                        <button onClick={onLegalClick} className="text-xs text-white/40 hover:text-white/60 transition-colors uppercase tracking-[0.2em] font-medium">
                            Privacy Protocols & Legal Framework
                        </button>
                    </div>
                </fieldset>
            </div>
        </div>
    );
};
