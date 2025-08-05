"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);
const VerifyForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Verification failed");

      // selectedPlan from localStorage
			const selectedPlan = localStorage.getItem("selectedPlan");
			if (!selectedPlan) {
				throw new Error("Plan not selected. Please go back to pricing.");
			}
			
			if (selectedPlan === "Free") {
				console.log("Free plan selected");
				// ➕ Handle free plan
				const freeRes = await fetch("/api/payment/complete-free", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email, selectedPlan }),
				});
			
				const freeData = await freeRes.json();
				if (!freeRes.ok) throw new Error(freeData.message);
			
				router.push("https://cp.boostseller.ai"); // Or your success page
			} else {
				console.log("Pro plan selected", selectedPlan);
				// 🔁 Handle paid plan via Stripe
				const checkoutRes = await fetch("/api/payment/stripe", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email, selectedPlan }),
				});
			
				const { sessionId }  = await checkoutRes.json();
				const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe failed to initialize");

      await stripe.redirectToCheckout({ sessionId });
			}

    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="shadow-three mx-auto max-w-[500px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px]">
              <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                Verify with your Email
              </h3>
              <p className="mb-11 text-center text-base font-medium text-body-color">
                Please input OTP code sent to your email.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="mb-8">
                  <label
                    htmlFor="otp"
                    className="mb-3 block text-sm text-dark dark:text-white"
                  >
                    Verification Code
                  </label>
                  <input
                    type="text"
                    name="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                  />
                </div>
                <div className="mb-6">
                  <button className="shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white duration-300 hover:bg-primary/90">
                    Verify
                  </button>
                </div>
              </form>
              {error && <p className="text-red-500 text-center">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifyForm;
