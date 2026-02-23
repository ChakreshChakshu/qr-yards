import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, QrCode } from "lucide-react";
import { Link } from "react-router-dom";
import QRMarqueeBackground from "@/components/QRMarqueeBackground";

/* ── Shared animation variants ─────────────────────────────────────────── */

// Direction-aware slide: login → register goes up, register → login goes down
const EASE_OUT = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];
const EASE_IN = [0.55, 0, 1, 0.45] as [number, number, number, number];

const formVariants: Variants = {
    enter: (dir: number) => ({
        opacity: 0,
        y: dir * 24,
        scale: 0.98,
        filter: 'blur(4px)',
    }),
    center: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        transition: {
            duration: 0.4,
            ease: EASE_OUT,
            when: 'beforeChildren',
            staggerChildren: 0.055,
        },
    },
    exit: (dir: number) => ({
        opacity: 0,
        y: dir * -20,
        scale: 0.98,
        filter: 'blur(4px)',
        transition: {
            duration: 0.28,
            ease: EASE_IN,
        },
    }),
};

// Each field fades + rises in sequence
const fieldVariants: Variants = {
    enter: { opacity: 0, y: 12 },
    center: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: EASE_OUT },
    },
    exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
};

// Heading slides sideways based on direction
const headingVariants: Variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 20, filter: 'blur(3px)' }),
    center: {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.35, ease: EASE_OUT },
    },
    exit: (dir: number) => ({
        opacity: 0,
        x: dir * -20,
        filter: 'blur(3px)',
        transition: { duration: 0.25, ease: EASE_IN },
    }),
};

/* ── Reusable animated field wrapper ───────────────────────────────────── */
const Field = ({ children }: { children: React.ReactNode }) => (
    <motion.div variants={fieldVariants}>{children}</motion.div>
);

/* ── Component ─────────────────────────────────────────────────────────── */
const Auth = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [direction, setDirection] = useState(1); // 1 = going to register, -1 = going to login
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const mode = searchParams.get("mode");
        if (mode === "register") {
            setIsLogin(false);
        } else {
            setIsLogin(true);
        }
    }, [searchParams]);

    const toggleMode = () => {
        const goingToRegister = isLogin;
        setDirection(goingToRegister ? 1 : -1);
        const newMode = isLogin ? "register" : "login";
        navigate(`/auth?mode=${newMode}`);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1500);
    };

    return (
        <div className="relative w-full h-screen overflow-hidden">

            {/* ── Full-screen Marquee Background ── */}
            <div className="absolute inset-0 z-0">
                <QRMarqueeBackground />
            </div>

            {/* ── Scrim ── */}
            <div className="absolute inset-0 z-10 backdrop-blur-sm bg-sidebar/30" />

            {/* ── Three-column layout: Left | Form | Right ── */}
            <div className="relative z-20 flex items-center justify-between w-full h-full px-6 lg:px-16 gap-8">

                {/* LEFT — Brand headline */}
                <motion.div
                    initial={{ opacity: 0, x: -32 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                    className="hidden lg:flex flex-col flex-1 gap-6 max-w-xs"
                >
                    <div>
                        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-white mb-3">QR Generation Platform</p>
                        <h2 className="text-4xl font-extrabold text-white leading-[1.15] tracking-tight">
                            One platform.<br />
                            <span className="text-foreground">Infinite</span><br />
                            possibilities.
                        </h2>
                        <p className="mt-4 text-sm text-white leading-relaxed">
                            From menus to business cards, events to storefronts — create smart QR codes for everything.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3">
                        {[
                            { emoji: "🎨", label: "Custom designs & brand colors" },
                            { emoji: "📊", label: "Real-time scan analytics" },
                            { emoji: "🔗", label: "Dynamic links, edit anytime" },
                            { emoji: "📁", label: "PDF, URL, vCard & more" },
                        ].map(({ emoji, label }) => (
                            <div key={label} className="flex items-center gap-3 bg-sidebar/60 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/10 shadow-sm">
                                <span className="text-lg">{emoji}</span>
                                <span className="text-sm font-medium text-white/80">{label}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* CENTER — Glass Form Card */}
                <div className="shrink-0 w-full max-w-md">
                    <motion.div

                        // Card subtly "breathes" when mode changes
                        animate={{ scale: [1, 0.992, 1] }}
                        transition={{ duration: 0.4, ease: "easeInOut", times: [0, 0.5, 1] }}
                        key={isLogin ? "card-login" : "card-register"}
                        className="w-full h-screen max-w-md bg-sidebar/60 backdrop-blur-xl rounded-3xl shadow-[0_8px_60px_rgba(0,0,0,0.45)] border border-accent/15 p-8 md:p-10 overflow-hidden"
                    >
                        {/* Logo — never animates */}
                        <Link to="/" className="flex items-center gap-2 mb-7 w-fit">
                            <div className="w-9 h-9 bg-accent/15 border border-accent/30 rounded-xl flex items-center justify-center">
                                <QrCode className="h-5 w-5 text-accent" />
                            </div>
                            <span className="font-bold text-xl tracking-tight text-white">QRYARDS</span>
                        </Link>

                        {/* ── Heading ── */}
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={isLogin ? "h-login" : "h-register"}
                                custom={direction}
                                variants={headingVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="mb-7"
                            >
                                <h1 className="text-3xl font-bold text-white leading-tight mb-1">
                                    {isLogin ? "Welcome back" : "Create account"}
                                </h1>
                                <p className="text-sm text-white/50">
                                    {isLogin
                                        ? "Sign in to manage your QR campaigns."
                                        : "Join thousands of brands using smart QR codes."}
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        {/* ── Forms ── */}
                        <AnimatePresence mode="wait" custom={direction}>
                            {isLogin ? (
                                <motion.form
                                    key="login"
                                    custom={direction}
                                    variants={formVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    className="space-y-4"
                                    onSubmit={handleSubmit}
                                >
                                    <Field>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-white/80">Email or Username</label>
                                            <Input
                                                placeholder="name@example.com"
                                                className="h-11 rounded-xl bg-white/8 border-white/15 text-white placeholder:text-white/30 focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all"
                                            />
                                        </div>
                                    </Field>

                                    <Field>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-white/80">Password</label>
                                            <div className="relative">
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="••••••••"
                                                    className="h-11 rounded-xl bg-white/8 border-white/15 text-white placeholder:text-white/30 focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all pr-10"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
                                                >
                                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                </button>
                                            </div>
                                        </div>
                                    </Field>

                                    <Field>
                                        <div className="flex items-center justify-between pt-1">
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id="remember"
                                                    className="border-white/30 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                                                />
                                                <label htmlFor="remember" className="text-sm text-white/60 cursor-pointer select-none">Remember me</label>
                                            </div>
                                            <Link to="#" className="text-sm font-medium text-accent hover:underline transition-all">
                                                Forgot password?
                                            </Link>
                                        </div>
                                    </Field>

                                    <Field>
                                        <Button
                                            type="submit"
                                            className="w-full h-11 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm shadow-lg hover:-translate-y-0.5 transition-all duration-200 mt-1"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? "Signing in…" : "Sign In"}
                                        </Button>
                                    </Field>
                                </motion.form>
                            ) : (
                                <motion.form
                                    key="signup"
                                    custom={direction}
                                    variants={formVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    className="space-y-4"
                                    onSubmit={handleSubmit}
                                >
                                    <Field>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-white/80">First Name</label>
                                                <Input placeholder="John" className="h-11 rounded-xl bg-white/8 border-white/15 text-white placeholder:text-white/30 focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-white/80">Last Name</label>
                                                <Input placeholder="Doe" className="h-11 rounded-xl bg-white/8 border-white/15 text-white placeholder:text-white/30 focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all" />
                                            </div>
                                        </div>
                                    </Field>

                                    <Field>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-white/80">Email Address</label>
                                            <Input placeholder="name@example.com" type="email" className="h-11 rounded-xl bg-white/8 border-white/15 text-white placeholder:text-white/30 focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all" />
                                        </div>
                                    </Field>

                                    <Field>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-white/80">Password</label>
                                            <Input placeholder="Create a strong password" type="password" className="h-11 rounded-xl bg-white/8 border-white/15 text-white placeholder:text-white/30 focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all" />
                                        </div>
                                    </Field>

                                    <Field>
                                        <div className="flex items-center space-x-2 pt-1">
                                            <Checkbox
                                                id="terms"
                                                className="border-white/30 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                                            />
                                            <label htmlFor="terms" className="text-sm text-white/60 leading-none">
                                                I agree to the{" "}
                                                <Link to="#" className="text-accent font-medium hover:underline">Terms of Service</Link>
                                            </label>
                                        </div>
                                    </Field>

                                    <Field>
                                        <Button
                                            type="submit"
                                            className="w-full h-11 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm shadow-lg hover:-translate-y-0.5 transition-all duration-200 mt-1"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? "Creating Account…" : "Create Account"}
                                        </Button>
                                    </Field>
                                </motion.form>
                            )}
                        </AnimatePresence>

                        {/* Divider */}
                        <motion.div layout className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/15" />
                            </div>
                            <div className="relative flex justify-center text-xs text-white/40">
                                <span className="px-3 bg-sidebar/85 rounded-full">or continue with</span>
                            </div>
                        </motion.div>

                        {/* Google SSO */}
                        <button className="w-full h-11 rounded-xl border border-white/15 bg-white/8 hover:bg-white/12 transition-all flex items-center justify-center gap-3 text-sm font-medium text-white/80 hover:text-white shadow-sm hover:-translate-y-0.5 duration-200">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Continue with Google
                        </button>

                        {/* Mode switcher */}
                        <p className="mt-6 text-center text-sm text-white/50">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                            <button
                                onClick={toggleMode}
                                className="font-semibold text-accent hover:underline transition-colors"
                            >
                                {isLogin ? "Sign up" : "Log in"}
                            </button>
                        </p>
                    </motion.div>
                </div>
                {/* ── end CENTER ── */}

                {/* RIGHT — Social proof & tagline */}
                <motion.div
                    initial={{ opacity: 0, x: 32 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                    className="hidden lg:flex flex-col flex-1 items-end gap-8 max-w-xs text-right"
                >
                    <div>
                        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-white mb-3">Trusted worldwide</p>
                        <h2 className="text-4xl font-extrabold text-white leading-[1.15] tracking-tight">
                            Scan more.<br />
                            <span className="text-accent">Grow</span><br />
                            faster.
                        </h2>
                        <p className="mt-4 text-sm text-white leading-relaxed">
                            Track every scan, understand your audience, and iterate — all from one clean dashboard.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-col gap-4 w-full">
                        {[
                            { value: "2M+", label: "QR codes generated" },
                            { value: "98%", label: "Uptime guaranteed" },
                            { value: "150+", label: "Countries reached" },
                            { value: "4.9★", label: "Average user rating" },
                        ].map(({ value, label }) => (
                            <div key={label} className="flex items-center justify-end gap-4 bg-sidebar/60 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/10 shadow-sm">
                                <span className="text-sm font-medium text-white/70">{label}</span>
                                <span className="text-lg font-extrabold text-accent min-w-12 text-right">{value}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

            </div>{/* ── end three-column ── */}
        </div>
    );
};

export default Auth;
