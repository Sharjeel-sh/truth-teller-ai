import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, AlertTriangle, CheckCircle, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface SentenceResult {
  text: string;
  aiProbability: number;
}

interface AnalysisResult {
  aiScore: number;
  humanScore: number;
  confidence: number;
  sentences: SentenceResult[];
}

// Local analysis engine (no API needed) — uses heuristic signals
function analyzeText(text: string): AnalysisResult {
  const sentences = text
    .replace(/([.!?])\s+/g, "$1|||")
    .split("|||")
    .filter((s) => s.trim().length > 0);

  const sentenceResults: SentenceResult[] = sentences.map((s) => {
    let score = 0.5;
    const words = s.trim().split(/\s+/);
    const avgWordLen = words.reduce((a, w) => a + w.length, 0) / words.length;

    // Heuristic signals for AI-generated text
    if (avgWordLen > 5.5) score += 0.1;
    if (words.length > 20 && words.length < 35) score += 0.08;
    if (/\b(furthermore|moreover|consequently|additionally|significantly)\b/i.test(s)) score += 0.15;
    if (/\b(it is important to note|in conclusion|as a result)\b/i.test(s)) score += 0.12;
    if (/\b(leverage|utilize|facilitate|implement|comprehensive)\b/i.test(s)) score += 0.1;
    if (s.includes(",") && s.split(",").length > 3) score += 0.05;
    // Human signals
    if (/\b(I think|I feel|honestly|basically|like|kinda|gonna)\b/i.test(s)) score -= 0.2;
    if (words.length < 6) score -= 0.1;
    if (/[!]{2,}|[?]{2,}|\.{3,}/.test(s)) score -= 0.15;

    return { text: s.trim(), aiProbability: Math.max(0, Math.min(1, score)) };
  });

  const avgAi = sentenceResults.reduce((a, s) => a + s.aiProbability, 0) / sentenceResults.length;
  const aiScore = Math.round(avgAi * 100);
  const humanScore = 100 - aiScore;
  const confidence = Math.round(70 + Math.abs(aiScore - 50) * 0.6);

  return { aiScore, humanScore, confidence: Math.min(confidence, 99), sentences: sentenceResults };
}

const TextAnalyzer = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = () => {
    if (text.trim().length < 50) {
      toast.error("Please enter at least 50 characters for accurate analysis.");
      return;
    }
    setLoading(true);
    setResult(null);
    // Simulate processing delay
    setTimeout(() => {
      const res = analyzeText(text);
      setResult(res);
      setLoading(false);
      toast.success("Analysis complete!");
    }, 1500);
  };

  const getColor = (score: number) => {
    if (score < 30) return "text-success";
    if (score < 60) return "text-warning";
    return "text-destructive";
  };

  const getSentenceBg = (prob: number) => {
    if (prob < 0.3) return "";
    if (prob < 0.6) return "bg-warning/10 border-l-2 border-warning/40 pl-2";
    return "bg-destructive/10 border-l-2 border-destructive/40 pl-2";
  };

  return (
    <div className="space-y-6">
      <div className="glass rounded-xl p-6">
        <Textarea
          placeholder="Paste your text here to analyze for AI-generated content... (minimum 50 characters)"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[200px] bg-background/50 border-border/50 resize-none text-sm leading-relaxed"
        />
        <div className="flex items-center justify-between mt-4">
          <span className="text-xs text-muted-foreground">
            {text.split(/\s+/).filter(Boolean).length} words · {text.length} characters
          </span>
          <Button onClick={handleAnalyze} disabled={loading || text.trim().length < 50} className="glow-sm gap-2">
            {loading ? <Loader2 size={16} className="animate-spin" /> : <BarChart3 size={16} />}
            {loading ? "Analyzing..." : "Analyze Text"}
          </Button>
        </div>
      </div>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Score cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="glass rounded-xl p-6 text-center">
              <div className={`text-3xl font-bold ${getColor(result.aiScore)}`}>{result.aiScore}%</div>
              <div className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1">
                <AlertTriangle size={12} /> AI Probability
              </div>
            </div>
            <div className="glass rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-success">{result.humanScore}%</div>
              <div className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1">
                <CheckCircle size={12} /> Human Score
              </div>
            </div>
            <div className="glass rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-primary">{result.confidence}%</div>
              <div className="text-xs text-muted-foreground mt-1">Confidence</div>
            </div>
          </div>

          {/* Probability bar */}
          <div className="glass rounded-xl p-6">
            <h3 className="text-sm font-medium mb-3">Detection Breakdown</h3>
            <div className="h-4 rounded-full bg-muted overflow-hidden flex">
              <div
                className="h-full bg-gradient-to-r from-success to-success/80 transition-all duration-700"
                style={{ width: `${result.humanScore}%` }}
              />
              <div
                className="h-full bg-gradient-to-r from-destructive/80 to-destructive transition-all duration-700"
                style={{ width: `${result.aiScore}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>Human: {result.humanScore}%</span>
              <span>AI: {result.aiScore}%</span>
            </div>
          </div>

          {/* Sentence analysis */}
          <div className="glass rounded-xl p-6">
            <h3 className="text-sm font-medium mb-4">Sentence-Level Analysis</h3>
            <div className="space-y-2">
              {result.sentences.map((s, i) => (
                <div key={i} className={`rounded-lg p-3 text-sm leading-relaxed transition-colors ${getSentenceBg(s.aiProbability)}`}>
                  <span className="text-foreground/90">{s.text}</span>
                  <span className={`ml-2 text-xs font-mono ${getColor(Math.round(s.aiProbability * 100))}`}>
                    {Math.round(s.aiProbability * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TextAnalyzer;
