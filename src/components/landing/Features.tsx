import { motion } from "framer-motion";
import { Shield, Zap, BarChart3, FileText, Lock, Globe } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Multi-Model Detection",
    description: "Detects content from ChatGPT, Claude, Gemini, Llama, and more with high accuracy.",
  },
  {
    icon: BarChart3,
    title: "Sentence-Level Analysis",
    description: "Each sentence is scored individually, with suspicious passages highlighted in your text.",
  },
  {
    icon: Zap,
    title: "Real-Time Results",
    description: "Get instant analysis with detailed confidence scores in under one second.",
  },
  {
    icon: FileText,
    title: "Detailed Reports",
    description: "Export comprehensive PDF reports with breakdowns, charts, and highlights.",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "Your content is never stored or shared. Analysis happens in secure, isolated sessions.",
  },
  {
    icon: Globe,
    title: "API Access",
    description: "Integrate detection into your workflow with our RESTful API and SDKs.",
  },
];

const Features = () => (
  <section id="features" className="py-24 relative">
    <div className="absolute inset-0 bg-radial-glow opacity-50" />
    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Everything you need to <span className="text-gradient">verify content</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Our detection engine uses multiple neural networks to provide industry-leading accuracy.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-xl p-6 hover:border-primary/30 transition-colors group"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <feature.icon size={20} className="text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
