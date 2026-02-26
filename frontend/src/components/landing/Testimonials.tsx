import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Marketing Director",
    company: "TechFlow Inc.",
    quote: "QRYards made it incredibly easy to create branded QR codes for all our marketing campaigns. The customization options are fantastic!",
    rating: 5,
    avatar: "SC",
  },
  {
    name: "Marcus Rivera",
    role: "Restaurant Owner",
    company: "Bella Cucina",
    quote: "We switched our entire menu system to QR codes using QRYards. The Wi-Fi and menu QR types are exactly what we needed.",
    rating: 5,
    avatar: "MR",
  },
  {
    name: "Emily Watson",
    role: "Event Planner",
    company: "EventSpark",
    quote: "The event QR codes with location and details built in have been a game-changer for our conferences. So professional!",
    rating: 5,
    avatar: "EW",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Loved by Creators Worldwide
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See what our users are saying about QRYards
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-card border hover:shadow-lg transition-all duration-300"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {t.role} · {t.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;