import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';

const app = express();
app.use(cors());
app.use(express.json());

// Load and sanitize environment values (strip surrounding quotes if present)
const rawStripeKey = process.env.STRIPE_SECRET_KEY || '';
const stripeKey = rawStripeKey.replace(/^"|"$/g, '').replace(/^'|'$/g, '');
if (!stripeKey) {
  console.error('Missing STRIPE_SECRET_KEY in environment');
  process.exit(1);
}

const stripe = new Stripe(stripeKey, { apiVersion: '2022-11-15' });

app.post('/api/create-checkout-session', async (req, res) => {
  // Allow client to pass a priceId (or a friendly alias), otherwise fall back to server env.
  const rawEnvPrice = process.env.STRIPE_PRICE_ID || '';
  const envPriceId = rawEnvPrice.replace(/^"|"$/g, '').replace(/^'|'$/g, '');

  // Map friendly aliases used by the frontend to real Stripe Price IDs stored in env.
  const aliasMap = {
    pro_monthly: envPriceId,
  };

  let priceId = req.body.priceId || envPriceId;
  if (!priceId) return res.status(400).json({ error: 'Missing priceId' });

  // If the client sent a friendly alias, resolve it to the actual price id.
  if (aliasMap[priceId]) {
    priceId = aliasMap[priceId];
  }

  try {
    const origin = req.headers.origin || `http://localhost:5173`;
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err);
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 4242;
app.listen(port, () => console.log(`Checkout server listening on http://localhost:${port}`));
