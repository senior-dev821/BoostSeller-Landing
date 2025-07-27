'use client';

import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function StripePage() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    const response = await fetch(`cp.boostseller.ai/api/admin/payment/stripe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan: 'pro_monthly' }),
    });

    const data = await response.json();

    const stripe = await stripePromise;
    await stripe?.redirectToCheckout({ sessionId: data.sessionId });
  };

  return (
    <div className="text-center space-y-6">
      <h2 className="text-xl font-semibold">Stripe Checkout</h2>
      <button
        onClick={handleCheckout}
        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
        disabled={loading}
      >
        {loading ? 'Redirecting…' : 'Pay $149 (Pro Monthly)'}
      </button>
    </div>
  );
}
