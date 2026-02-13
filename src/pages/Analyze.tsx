import Navbar from "@/components/layout/Navbar";
import TextAnalyzer from "@/components/analysis/TextAnalyzer";
import { motion } from "framer-motion";

const Analyze = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="container mx-auto px-4 pt-24 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-2">
          AI Content <span className="text-gradient">Analyzer</span>
        </h1>
        <p className="text-muted-foreground mb-8">
          Paste your text below to detect AI-generated content with sentence-level analysis.
        </p>
        <TextAnalyzer />
      </motion.div>
    </div>
  </div>
);

export default Analyze;
