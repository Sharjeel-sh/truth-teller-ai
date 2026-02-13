import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    {/* Background layers */}
    <div className="absolute inset-0">
      <img src={heroBg} alt="" className="w-full h-full object-cover opacity-20" />
      <div className="absolute inset-0 bg-radial-glow" />
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/60 to-background" />
    </div>

    <div className="relative z-10 container mx-auto px-4 pt-24 pb-16 text-center">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium text-primary mb-8"
      >
        <Sparkles size={14} />
        <span>Trusted by 50,000+ users worldwide</span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] max-w-4xl mx-auto mb-6"
      >
        Detect AI Content{" "}
        <span className="text-gradient">Instantly</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
      >
        Advanced AI detection engine that identifies ChatGPT, Claude, Gemini & more.
        Get sentence-level analysis with confidence scores.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <Link to="/analyze">
          <Button size="lg" className="glow-primary text-base px-8 h-12 gap-2">
            Start Analyzing <ArrowRight size={18} />
          </Button>
        </Link>
        <Link to="/pricing">
          <Button variant="outline" size="lg" className="text-base px-8 h-12">
            View Pricing
          </Button>
        </Link>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto"
      >
        {[
          { value: "99.2%", label: "Accuracy" },
          { value: "2M+", label: "Scans" },
          { value: "<1s", label: "Speed" },
        ].map((stat) => (
          <div key={stat.label}>
            <div className="text-2xl md:text-3xl font-bold text-gradient">{stat.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default Hero;
