import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BarChart3, FileText, Zap, ArrowUpRight, Clock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";

const mockHistory = [
  { id: 1, preview: "The impact of artificial intelligence on modern society...", aiScore: 87, date: "2 hours ago" },
  { id: 2, preview: "I went to the store yesterday and honestly it was...", aiScore: 12, date: "5 hours ago" },
  { id: 3, preview: "Furthermore, the implementation of these strategies...", aiScore: 94, date: "1 day ago" },
  { id: 4, preview: "My dog jumped over the fence again lol, can't believe...", aiScore: 8, date: "2 days ago" },
];

const getScoreColor = (score: number) => {
  if (score < 30) return "text-success";
  if (score < 60) return "text-warning";
  return "text-destructive";
};

const Dashboard = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="container mx-auto px-4 pt-24 pb-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-1">Welcome back! Here's your usage overview.</p>
          </div>
          <Link to="/analyze">
            <Button className="glow-sm gap-2">
              <Zap size={16} /> New Scan
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: BarChart3, label: "Scans Today", value: "3 / 5", sub: "Free plan" },
            { icon: FileText, label: "Total Scans", value: "47", sub: "All time" },
            { icon: TrendingUp, label: "Avg AI Score", value: "62%", sub: "Across all scans" },
            { icon: Clock, label: "Last Scan", value: "2h ago", sub: "87% AI detected" },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon size={18} className="text-primary" />
                </div>
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Subscription */}
        <div className="glass rounded-xl p-6 mb-8 flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Free Plan</h3>
            <p className="text-sm text-muted-foreground">5 scans/day · 1,000 word limit</p>
          </div>
          <Link to="/pricing">
            <Button variant="outline" size="sm" className="gap-1">
              Upgrade <ArrowUpRight size={14} />
            </Button>
          </Link>
        </div>

        {/* Scan history */}
        <div className="glass rounded-xl p-6">
          <h3 className="font-semibold mb-4">Recent Scans</h3>
          <div className="space-y-3">
            {mockHistory.map((scan) => (
              <div
                key={scan.id}
                className="flex items-center justify-between p-4 rounded-lg bg-background/50 hover:bg-muted/30 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{scan.preview}</p>
                  <span className="text-xs text-muted-foreground">{scan.date}</span>
                </div>
                <div className={`text-sm font-mono font-semibold ml-4 ${getScoreColor(scan.aiScore)}`}>
                  {scan.aiScore}% AI
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </div>
);

export default Dashboard;
