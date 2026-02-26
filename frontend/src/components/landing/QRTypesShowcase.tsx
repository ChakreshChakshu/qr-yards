import { motion } from "framer-motion";
import { qrTypes } from "@/components/qr-generator/qr-types";

const QRTypesShowcase = () => {
  return (
    <section id="types" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            20+ QR Code Types
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Create QR codes for any purpose — from simple URLs to detailed contact cards
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
          {qrTypes.map((type, index) => (
            <motion.a
              key={type.id}
              href="#"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              viewport={{ once: true }}
              className="group flex flex-col items-center gap-3 p-4 rounded-xl border bg-card hover:shadow-lg hover:border-primary/30 transition-all duration-300"
              onClick={(e) => e.preventDefault()}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary group-hover:gradient-primary group-hover:text-primary-foreground transition-all duration-300">
                <type.icon className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium text-center">{type.label}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QRTypesShowcase;