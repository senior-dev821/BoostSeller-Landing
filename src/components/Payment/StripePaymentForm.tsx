"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/payment/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerEmail: "leodone113@gmail.com", // You can make this dynamic
          items: [{ name: "Pro Plan", price: 99000, quantity: 1}],
        }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Failed to create checkout session");
      }

      const { sessionId } = await res.json();

      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe failed to initialize");

      await stripe.redirectToCheckout({ sessionId });
    } catch (err: any) {
      console.error("Checkout error:", err.message);
      alert("Something went wrong during checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Buy Sample Product</h1>
      <button
        onClick={handleCheckout}
        disabled={loading}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Redirecting..." : "Checkout ($20)"}
      </button>
    </div>
  );
}