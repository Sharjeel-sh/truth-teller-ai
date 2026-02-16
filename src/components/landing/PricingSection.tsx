import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Get started with basic detection",
    features: ["5 scans per day", "1,000 word limit", "Basic analysis", "Community support"],
    cta: "Start Free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "For professionals and creators",
    features: [
      "100 scans per day",
      "10,000 word limit",
      "Sentence-level highlights",
      "PDF export",
      "Scan history",
      "Priority support",
    ],
    cta: "Upgrade to Pro",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "$49",
    period: "/month",
    description: "For teams and organizations",
    features: [
      "Unlimited scans",
      "Unlimited words",
      "API access",
      "Batch processing",
      "Custom integrations",
      "Dedicated support",
      "Admin dashboard",
    ],
    cta: "Contact Sales",
    highlight: false,
  },
];

const PricingSection = () => {
  const navigate = useNavigate();

  return (
  <section id="pricing" className="py-24">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Simple, transparent <span className="text-gradient">pricing</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Choose the plan that fits your needs. Upgrade or cancel anytime.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-xl p-8 flex flex-col ${
              plan.highlight
                ? "glass glow-primary border-primary/30 relative"
                : "glass"
            }`}
          >
            {plan.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                Most Popular
              </div>
            )}
            <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
            <div className="mb-6">
              <span className="text-4xl font-bold">{plan.price}</span>
              <span className="text-muted-foreground text-sm">{plan.period}</span>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm">
                  <Check size={16} className="text-primary shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
            {/* CTA: if Pro plan, check auth and start checkout; otherwise default to signup/contact */}
            <div>
              <Button
                onClick={async () => {
                  if (plan.name === "Pro") {
                    try {
                      const {
                        data: { user },
                      } = await supabase.auth.getUser();
                      if (!user) {
                        navigate('/signup');
                        return;
                      }
                      // Start checkout on backend (endpoint must be implemented)
                      const res = await fetch('/api/create-checkout-session', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        // Send a friendly alias that the backend maps to the real price id.
                        body: JSON.stringify({ priceId: 'pro_monthly' }),
                      });
                      const json = await res.json();
                      if (res.ok && json.url) {
                        window.location.href = json.url;
                      } else {
                        // Show backend message if available for easier debugging
                        const msg = json?.error || json?.message || 'Unable to start checkout.';
                        toast.error(`Checkout error: ${msg}`);
                      }
                    } catch (err) {
                      toast.error('Checkout error.');
                    }
                  } else if (plan.name === 'Enterprise') {
                    // Contact sales placeholder
                    window.location.href = 'mailto:sales@example.com';
                  } else {
                    // Free plan: if user is already logged in, send them to dashboard;
                    // otherwise prompt signup.
                    try {
                      const {
                        data: { user },
                      } = await supabase.auth.getUser();
                      if (!user) {
                        navigate('/signup');
                        return;
                      }
                      navigate('/dashboard');
                    } catch (err) {
                      navigate('/signup');
                    }
                  }
                }}
                className={`w-full ${plan.highlight ? "glow-sm" : ""}`}
                variant={plan.highlight ? "default" : "outline"}
              >
                {plan.cta}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default PricingSection;
