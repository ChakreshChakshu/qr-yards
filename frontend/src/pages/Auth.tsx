import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import type { Provider } from "@supabase/supabase-js";
import { Github, LoaderCircle, Mail, QrCode } from "lucide-react";
import { toast } from "sonner";

import QRMarqueeBackground from "@/components/QRMarqueeBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { getAuthCallbackUrl } from "@/lib/auth";

const EASE_OUT = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];
const EASE_IN = [0.55, 0, 1, 0.45] as [number, number, number, number];

const formVariants: Variants = {
  enter: (dir: number) => ({
    opacity: 0,
    y: dir * 24,
    scale: 0.98,
    filter: "blur(4px)",
  }),
  center: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.4,
      ease: EASE_OUT,
      when: "beforeChildren",
      staggerChildren: 0.055,
    },
  },
  exit: (dir: number) => ({
    opacity: 0,
    y: dir * -20,
    scale: 0.98,
    filter: "blur(4px)",
    transition: {
      duration: 0.28,
      ease: EASE_IN,
    },
  }),
};

const fieldVariants: Variants = {
  enter: { opacity: 0, y: 12 },
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: EASE_OUT },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
};

const headingVariants: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 20, filter: "blur(3px)" }),
  center: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.35, ease: EASE_OUT },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir * -20,
    filter: "blur(3px)",
    transition: { duration: 0.25, ease: EASE_IN },
  }),
};

const Field = ({ children }: { children: ReactNode }) => (
  <motion.div variants={fieldVariants}>{children}</motion.div>
);

const googleIcon = (
  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
    <path fill="#EA4335" d="M12 10.2v3.9h5.4c-.2 1.3-1.5 3.9-5.4 3.9-3.2 0-5.9-2.7-5.9-6s2.7-6 5.9-6c1.8 0 3 .8 3.7 1.4l2.5-2.4C16.7 3.7 14.6 3 12 3 7 3 3 7 3 12s4 9 9 9c5.2 0 8.7-3.7 8.7-8.9 0-.6-.1-1.1-.2-1.9z" />
  </svg>
);

interface AuthFormState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const initialState: AuthFormState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const leftContent = [
  {
    eyebrow: "Campaign launch",
    title: "Build branded QR experiences fast.",
    body: "Create links, menus, events, contacts, and promos from one workspace built for quick publishing.",
  },
  {
    eyebrow: "Design control",
    title: "Shape every scan around your brand.",
    body: "Tune frames, colors, templates, and content types without slowing down the publishing flow.",
  },
];

const rightContent = [
  {
    stat: "10+",
    label: "QR formats ready",
    body: "Handle websites, Wi-Fi, text, events, contact cards, coupons, and more from one builder.",
  },
  {
    stat: "1 scan",
    label: "Clear next action",
    body: "Give customers one clean path to menus, offers, bookings, product pages, or instant contact.",
  },
];

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, loading, isConfigured } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<AuthFormState>(initialState);

  useEffect(() => {
    const mode = searchParams.get("mode");
    setIsLogin(mode !== "register");
  }, [searchParams]);

  useEffect(() => {
    if (!loading && user) {
      navigate("/qr-generator", { replace: true });
    }
  }, [loading, navigate, user]);

  const cardKey = useMemo(() => (isLogin ? "card-login" : "card-register"), [isLogin]);

  const updateField = (key: keyof AuthFormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleMode = () => {
    const goingToRegister = isLogin;
    setDirection(goingToRegister ? 1 : -1);
    setForm(initialState);
    navigate(`/auth?mode=${isLogin ? "register" : "login"}`);
  };

  const handleEmailAuth = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!supabase) {
      toast.error("Supabase not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
      return;
    }

    if (!form.email || !form.password) {
      toast.error("Email and password required.");
      return;
    }

    setIsSubmitting(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        });

        if (error) throw error;
        toast.success("Signed in.");
        navigate("/qr-generator", { replace: true });
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: {
            data: {
              first_name: form.firstName,
              last_name: form.lastName,
            },
            emailRedirectTo: getAuthCallbackUrl(),
          },
        });

        if (error) throw error;

        if (data.session) {
          toast.success("Account created.");
          navigate("/qr-generator", { replace: true });
        } else {
          toast.success("Check your email to confirm your account.");
          navigate("/auth?mode=login", { replace: true });
        }
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Authentication failed.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOAuth = async (provider: Provider) => {
    if (!supabase) {
      toast.error("Supabase not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: getAuthCallbackUrl(),
      },
    });

    if (error) {
      toast.error(error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <QRMarqueeBackground />
      </div>

      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),_transparent_28%),linear-gradient(120deg,rgba(9,12,20,0.85),rgba(9,12,20,0.68),rgba(9,12,20,0.88))] backdrop-blur-sm" />

      <div className="relative z-20 mx-auto grid min-h-screen w-full max-w-[1600px] grid-cols-1 items-center gap-y-10 px-6 py-8 lg:grid-cols-[minmax(260px,1fr)_minmax(420px,520px)_minmax(260px,1fr)] lg:gap-x-16 lg:px-10 xl:gap-x-24 xl:px-16 2xl:gap-x-32">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="hidden h-full flex-col justify-between py-10 lg:flex"
        >
          <div className="max-w-sm space-y-5 self-end pr-2 xl:pr-6">
            <div className="inline-flex w-fit items-center rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70">
              QR Generation Platform
            </div>
            <div>
              <h2 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-white xl:text-5xl">
                Turn every
                <br />
                scan into
                <span className="text-accent"> action.</span>
              </h2>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/72">
                QRYARDS helps teams publish beautiful QR touchpoints for campaigns, packaging, events, storefronts, and real-world journeys.
              </p>
            </div>
          </div>

          <div className="flex max-w-sm flex-col gap-5 self-end pr-2 xl:pr-6">
            {leftContent.map((item) => (
              <div
                key={item.title}
                className="rounded-[28px] border border-white/12 bg-white/8 p-6 shadow-[0_18px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/45">{item.eyebrow}</p>
                <h3 className="mt-3 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{item.body}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="flex w-full items-center justify-center px-0 py-6 lg:px-4 lg:py-0 xl:px-6">
          <motion.div
            key={cardKey}
            animate={{ scale: [1, 0.992, 1] }}
            transition={{ duration: 0.4, ease: "easeInOut", times: [0, 0.5, 1] }}
            className="w-full max-w-md overflow-hidden rounded-[32px] border border-white/12 bg-[linear-gradient(180deg,rgba(18,21,34,0.82),rgba(12,14,24,0.92))] p-8 shadow-[0_24px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-10"
          >
            <Link to="/" className="mb-7 flex w-fit items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-accent/30 bg-accent/15">
                <QrCode className="h-5 w-5 text-accent" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">QRYARDS</span>
            </Link>

            {!isConfigured && (
              <div className="mb-6 rounded-2xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
                Add Supabase keys in `frontend/.env` from `frontend/.env.example`.
              </div>
            )}

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
                <h1 className="mb-1 text-3xl font-bold leading-tight text-white">
                  {isLogin ? "Welcome back" : "Create account"}
                </h1>
                <p className="text-sm text-white/50">
                  {isLogin
                    ? "Sign in with email/password or OAuth."
                    : "Create account with email/password, or jump in with OAuth."}
                </p>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.form
                key={isLogin ? "login" : "signup"}
                custom={direction}
                variants={formVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-4"
                onSubmit={handleEmailAuth}
              >
                {!isLogin && (
                  <Field>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80">First Name</label>
                        <Input
                          value={form.firstName}
                          onChange={(event) => updateField("firstName", event.target.value)}
                          placeholder="John"
                          className="h-11 rounded-xl border-white/15 bg-white/8 text-white placeholder:text-white/30"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80">Last Name</label>
                        <Input
                          value={form.lastName}
                          onChange={(event) => updateField("lastName", event.target.value)}
                          placeholder="Doe"
                          className="h-11 rounded-xl border-white/15 bg-white/8 text-white placeholder:text-white/30"
                        />
                      </div>
                    </div>
                  </Field>
                )}

                <Field>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Email Address</label>
                    <Input
                      value={form.email}
                      onChange={(event) => updateField("email", event.target.value)}
                      placeholder="name@example.com"
                      type="email"
                      autoComplete="email"
                      className="h-11 rounded-xl border-white/15 bg-white/8 text-white placeholder:text-white/30"
                    />
                  </div>
                </Field>

                <Field>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Password</label>
                    <Input
                      value={form.password}
                      onChange={(event) => updateField("password", event.target.value)}
                      placeholder={isLogin ? "Enter your password" : "Create a strong password"}
                      type="password"
                      autoComplete={isLogin ? "current-password" : "new-password"}
                      className="h-11 rounded-xl border-white/15 bg-white/8 text-white placeholder:text-white/30"
                    />
                  </div>
                </Field>

                <Field>
                  <Button
                    type="submit"
                    className="mt-1 h-11 w-full rounded-xl bg-primary font-semibold text-primary-foreground shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90"
                    disabled={isSubmitting || loading || !isConfigured}
                  >
                    {isSubmitting ? (
                      <>
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                        Working...
                      </>
                    ) : isLogin ? "Sign In" : "Create Account"}
                  </Button>
                </Field>

                <Field>
                  <div className="relative py-1 text-center text-xs uppercase tracking-[0.3em] text-white/35">
                    <span className="relative z-10 bg-sidebar/60 px-3">or continue with</span>
                    <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/10" />
                  </div>
                </Field>

                <Field>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleOAuth("google")}
                      disabled={isSubmitting || loading || !isConfigured}
                      className="h-11 rounded-xl border-white/15 bg-white/8 text-white hover:bg-white/12"
                    >
                      {googleIcon}
                      Google
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleOAuth("github")}
                      disabled={isSubmitting || loading || !isConfigured}
                      className="h-11 rounded-xl border-white/15 bg-white/8 text-white hover:bg-white/12"
                    >
                      <Github className="h-4 w-4" />
                      GitHub
                    </Button>
                  </div>
                </Field>
              </motion.form>
            </AnimatePresence>

            <div className="mt-6 space-y-3">
              <p className="text-sm text-white/55">
                {isLogin ? "No account yet?" : "Already have an account?"}{" "}
                <button type="button" onClick={toggleMode} className="font-medium text-accent hover:underline">
                  {isLogin ? "Create one" : "Sign in"}
                </button>
              </p>

              <p className="flex items-center gap-2 text-xs text-white/35">
                <Mail className="h-3.5 w-3.5" />
                Build once, reuse across flyers, tables, packaging, pop-ups, and every physical touchpoint.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="hidden h-full flex-col justify-between py-10 lg:flex"
        >
          <div className="ml-auto flex max-w-sm flex-col gap-5 self-start pl-2 xl:pl-6">
            {rightContent.map((item) => (
              <div
                key={item.label}
                className="rounded-[28px] border border-white/12 bg-sidebar/55 p-6 text-right shadow-[0_18px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl"
              >
                <p className="text-3xl font-bold tracking-tight text-accent">{item.stat}</p>
                <h3 className="mt-2 text-lg font-semibold text-white">{item.label}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="ml-auto max-w-sm self-start rounded-[32px] border border-white/12 bg-white/8 p-6 pl-2 shadow-[0_18px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl xl:pl-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/45">Project focus</p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-white/75">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Link and landing page QR</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Menus and promo campaigns</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Event and Wi-Fi sharing</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Contact and coupon flows</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
