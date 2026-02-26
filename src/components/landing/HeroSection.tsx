import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, QrCode, Sparkles } from "lucide-react";
import StarBorder from "@/components/ui/StarBorder";
import GridMotion from "@/components/GridMotion";
import { useTheme } from "next-themes";

const HeroSection = () => {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme !== 'light';
  const gridItems = [
    "/qr10.svg", "URL", "vCard", "PDF", "/qr5.svg",
    "Images", "Video", "Audio", "/qr6.svg", "Wi-Fi", "Crypto",
    "/qr7.svg", "WhatsApp", "Telegram", "Email", "/qr1.svg",
    "SMS", "Viber", "Twitter", "/qr2.svg", "Facebook", "App Store",
    "/qr3.svg", "Play Store", "Events", "Menu", "/qr8.svg",
    "Location", "Feedback", "Landing Page", "/qr4.svg", "Dynamic QR",
    "Static QR", "Design", "/qr9.svg"
  ];

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center pt-32 pb-28 overflow-hidden bg-background text-foreground transition-colors duration-300">
      {/* Grid Motion Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <GridMotion
          items={gridItems}
          gradientColor={isDark ? "rgba(0, 0, 0, 0.4)" : "rgba(255, 255, 255, 0.4)"}
        />
        <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px]" />
      </div>

      {/* Radial glow behind headline */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/20 rounded-full blur-[140px] z-0 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 text-foreground/80 dark:text-white/80 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            QR codes for everything
          </motion.div>

          <div className="bg-white/40 dark:bg-black/40 backdrop-blur-md px-6 py-8 md:px-10 md:py-12 rounded-3xl border border-black/5 dark:border-white/10 mb-10 shadow-2xl transition-colors">
            <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-6 text-foreground">
              Create Stunning{" "}
              <span className="text-primary relative inline-block">
                QR Codes
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </span>{" "}
              in Seconds
            </h1>

            <p className="text-lg text-foreground/80 dark:text-white/80 max-w-xl mx-auto leading-relaxed">
              Design beautiful, customizable QR codes for your business. Choose from 20+ content types,
              customize colors and shapes, and download in any format.
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <StarBorder
                as={Link}
                to="/qr-generator"
                color="hsl(var(--primary))"
                speed="4s"
                className="font-bold"
              >
                <span className="flex items-center gap-2.5">
                  <QrCode className="w-5 h-5" />
                  Create your QR
                  <ArrowRight className="w-4 h-4" />
                </span>
              </StarBorder>
            </motion.div>

            <Link to="/auth?mode=register">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 text-foreground/80 dark:text-white/80 hover:text-foreground dark:hover:text-white border border-black/20 dark:border-white/20 hover:border-black/40 dark:hover:border-white/40 font-medium text-base px-7 py-4 rounded-2xl backdrop-blur-sm transition-all"
              >
                Sign up free
              </motion.button>
            </Link>
          </div>

          {/* Subtle trust line */}
          <p className="mt-6 text-xs text-foreground/40 dark:text-white/40 tracking-wide transition-colors">
            No credit card required · 2M+ QR codes created · Free forever plan
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;