"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment | BoostSeller",
  description: "This is Payment Selection Page for BoostSeller",
  // other metadata
};

export default function PaymentSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId) return;

    fetch("/api/payment/confirm", {
      method: "POST",
      body: JSON.stringify({ sessionId }),
      headers: { "Content-Type": "application/json" },
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          router.push("/"); // or next step
        } else {
          console.error(data.message);
        }
      });
  }, [sessionId, router]);

  return (
		<>
			<section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
				<div className="container">
					<div className="shadow-three mx-auto max-w-[500px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px]">
						<h2 className="text-2xl font-bold mb-6">Your Payment is Successfully Done!</h2>
					</div>
				</div>
			</section>
		 
		</>
   
  );
}
