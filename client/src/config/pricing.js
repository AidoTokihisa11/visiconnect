/**
 * Single source of truth for VisioConnect pricing.
 * All amounts are in euro cents (for Stripe) unless noted.
 * Use `priceMonthly` / `priceAnnual` (human-readable €) for display.
 */
export const PLANS = {
  starter: {
    id: 'starter',
    name: 'Starter',
    priceMonthly: 0, // €/month displayed
    priceAnnual: 0, // €/year displayed
    amountMonthly: 0, // Stripe cents/month
    amountAnnual: 0, // Stripe cents/year
    participants: 3,
    duration: '45 min',
    recording: false,
    transcription: false,
    storage: null,
    support: 'Community',
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    priceMonthly: 15,
    priceAnnual: 144,
    amountMonthly: 1500,
    amountAnnual: 14400,
    participants: 50,
    duration: 'Unlimited',
    recording: true,
    transcription: '10h/month',
    storage: '5 Go',
    support: 'Email (24h)',
  },
  business: {
    id: 'business',
    name: 'Business',
    priceMonthly: 35,
    priceAnnual: 348,
    amountMonthly: 3500,
    amountAnnual: 34800,
    participants: 200,
    duration: 'Unlimited',
    recording: true,
    transcription: 'Unlimited',
    storage: 'Unlimited',
    support: 'Phone + Dedicated',
  },
};

/** Returns the display price string for a plan and billing cycle. */
export function getDisplayPrice(planId, cycle = 'monthly') {
  const plan = PLANS[planId];
  if (!plan) return '—';
  const price = cycle === 'annual' ? plan.priceAnnual : plan.priceMonthly;
  return price === 0 ? 'Gratuit' : `€${price}`;
}

/** Returns the Stripe amount in cents for a plan and billing cycle. */
export function getStripeAmount(planId, cycle = 'monthly') {
  const plan = PLANS[planId];
  if (!plan) return null;
  return cycle === 'annual' ? plan.amountAnnual : plan.amountMonthly;
}
