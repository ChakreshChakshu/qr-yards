import { motion } from "framer-motion";
import { Zap, Shield, BarChart3, Layers, RefreshCw, Smartphone } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Generate QR codes instantly — everything runs client-side for maximum speed and privacy.",
  },
  {
    icon: Layers,
    title: "20+ Content Types",
    description: "From URLs and vCards to Wi-Fi passwords and event details. Every QR type you'll ever need.",
  },
  {
    icon: Shield,
    title: "Full Customization",
    description: "Custom colors, gradients, shapes, and logo placement. Make every QR code uniquely yours.",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description: "Create and download QR codes from any device. Fully responsive on mobile, tablet, and desktop.",
  },
  {
    icon: RefreshCw,
    title: "Real-Time Preview",
    description: "See your QR code update live as you type and customize. What you see is what you get.",
  },
  {
    icon: BarChart3,
    title: "Multiple Formats",
    description: "Download as PNG for quick sharing or SVG for perfect print quality at any size.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Your All-in-One QR Platform
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to create, customize, and share professional QR codes
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-card border hover:shadow-lg hover:border-primary/20 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;