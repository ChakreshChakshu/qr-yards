import { motion } from "framer-motion";
import { MousePointerClick, Palette, Download } from "lucide-react";

const steps = [
  {
    icon: MousePointerClick,
    title: "Choose Content",
    description: "Select from 20+ QR code types — URLs, vCards, Wi-Fi, social media, and more.",
    step: "01",
  },
  {
    icon: Palette,
    title: "Customize Design",
    description: "Pick your colors, shapes, and add your logo to create a unique branded QR code.",
    step: "02",
  },
  {
    icon: Download,
    title: "Download & Share",
    description: "Export your QR code in PNG or SVG format, ready to print or share anywhere.",
    step: "03",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Create your perfect QR code in three simple steps
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary text-primary-foreground mb-6">
                <step.icon className="h-7 w-7" />
              </div>
              <div className="text-xs font-bold text-primary/60 uppercase tracking-wider mb-2">
                Step {step.step}
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;