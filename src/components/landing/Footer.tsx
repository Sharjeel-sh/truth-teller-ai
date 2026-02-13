import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border/50 bg-card/30">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <div className="w-4 h-4 rounded-sm bg-primary" />
            </div>
            <span className="text-lg font-bold">DetectAI</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Industry-leading AI content detection powered by advanced machine learning.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-3">Product</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/#features" className="hover:text-foreground transition-colors">Features</Link></li>
            <li><Link to="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
            <li><Link to="/analyze" className="hover:text-foreground transition-colors">Analyze</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><span className="hover:text-foreground transition-colors cursor-pointer">About</span></li>
            <li><span className="hover:text-foreground transition-colors cursor-pointer">Blog</span></li>
            <li><span className="hover:text-foreground transition-colors cursor-pointer">Careers</span></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-3">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><span className="hover:text-foreground transition-colors cursor-pointer">Privacy</span></li>
            <li><span className="hover:text-foreground transition-colors cursor-pointer">Terms</span></li>
          </ul>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-border/30 text-center text-xs text-muted-foreground">
        © 2026 DetectAI. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
