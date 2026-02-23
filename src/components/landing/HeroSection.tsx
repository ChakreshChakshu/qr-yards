import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, QrCode, Sparkles } from "lucide-react";
import StarBorder from "@/components/ui/StarBorder";

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-28 overflow-hidden bg-linear-to-b from-sidebar to-secondary/20">
      {/* Dot grid */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-size-[20px_20px] opacity-10" />

      {/* Radial glow behind headline */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-4">
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
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            QR codes for everything
          </motion.div>

          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
            Create Stunning{" "}
            <span className="text-primary relative inline-block">
              QR Codes
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
              </svg>
            </span>{" "}
            in Seconds
          </h1>

          <p className="text-lg text-white/70 max-w-xl mx-auto mb-10 leading-relaxed">
            Design beautiful, customizable QR codes for your business. Choose from 20+ content types,
            customize colors and shapes, and download in any format.
          </p>

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
                className="inline-flex items-center gap-2 text-white/80 hover:text-white border border-white/20 hover:border-white/40 font-medium text-base px-7 py-4 rounded-2xl backdrop-blur-sm transition-all"
              >
                Sign up free
              </motion.button>
            </Link>
          </div>

          {/* Subtle trust line */}
          <p className="mt-6 text-xs text-white/40 tracking-wide">
            No credit card required · 2M+ QR codes created · Free forever plan
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;