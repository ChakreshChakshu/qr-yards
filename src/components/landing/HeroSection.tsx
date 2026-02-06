import { motion } from "framer-motion";
import QRGeneratorWidget from "@/components/qr-generator/QRGeneratorWidget";

const HeroSection = () => {
  return (
    <section className="relative pt-28 pb-16 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
            <span>✨ Free QR Code Generator</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Create Stunning{" "}
            <span className="gradient-text">QR Codes</span>{" "}
            in Seconds
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Design beautiful, customizable QR codes for your business. Choose from 20+ content types,
            customize colors and shapes, and download in any format.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <QRGeneratorWidget />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;